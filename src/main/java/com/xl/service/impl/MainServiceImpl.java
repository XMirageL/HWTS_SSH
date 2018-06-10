package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xl.entity.THngyAdminInfo;
import com.xl.entity.THngyCronInfo;
import com.xl.entity.THngyTeacherInfo;
import com.xl.entity.THngyWorkTask;
import com.xl.repository.impl.*;
import com.xl.service.MainService;
import com.xl.utils.Config;
import com.xl.utils.MainUtil;
import com.xl.utils.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private MainRepositoryImpl mainRepository;

    @Autowired
    private TeacherRepositoryImpl teacherRepository;

    @Autowired
    private AdminRepositoryImpl adminRepository;

    @Autowired
    private WorkTaskRepositoryImpl workTaskRepository;

    @Autowired
    private CronInfoRepositoryImpl cronInfoRepository;

    //返回数据库中用户数量和任务数量
    @Override
    public String QueryTeacherNumAndWorkNum() {
        List<Long> list = new ArrayList<>();
        String hql1 = "select count (*) from THngyTeacherInfo";
        String hql2 = "select count (*) from THngyWorkTask";
        list.add((long) mainRepository.singleQuery(hql1));
        list.add((long) mainRepository.singleQuery(hql2));
        Map map = new HashMap();
        map.put("teacherNum", list.get(0));
        map.put("workNum", list.get(1));
        String json = JSONArray.toJSONString(map);
        return json;
    }


    /**
     * 判断管理员或者用户名和密码是否匹配
     *
     * @param inputEmail    普通用户输入的是邮箱号，管理员是输入的用户名
     * @param inputPassword 密码
     * @param httpSession   把查询到用户或管理员信息存到session里，以便拦截某些需要登录的页面
     * @return 返回一个状态码（在utils包里的Config类里都这些状态码）
     */
    @Override
    public String VerificationLogin(String inputEmail, String inputPassword, String autoLogin, HttpSession
            httpSession, HttpServletResponse response) {
        System.out.println("自动登录:" + inputEmail + " " + inputPassword);
        if (inputEmail == null || inputPassword == null)//如果邮箱或密码为空，直接结束
        {
            return null;
        }
        Object[] objects = {inputEmail, inputPassword};

        //默认返回登录失败代码
        String code = Config.Code101;
        String userType = "1";
        Object userid = null;
        String userdep = "0";
        //判断是不是管理员登录
        if (inputEmail.length() > 7) {
            if (inputEmail.substring(0, 5).equals("admin")) {
                String hql = "select adminInfoId,departmentId from THngyAdminInfo  where adminInfoName = ? and " +
                        "adminInfoPassWord=?";
                Object text = mainRepository.singleQuery(objects, hql);
                if (!JSONObject.toJSONString(text).equals("null")) {
                    JSONArray jsonArray = JSONArray.parseArray(JSONObject.toJSONString(text));
                    userid = jsonArray.getString(0);
                    userdep = jsonArray.getString(1);
                    code = Config.Code103;
                    userType = "0";
                }
            }
        } else if (inputEmail.length() > 2) {
            if (inputEmail.length() >= 6) {
                if (inputEmail.substring(0, 6).equals("SAdmin")) {
                    System.out.println("进入超管判断登录");
                    String hql = "select a.sAdminId from THngySAdminInfo as a where a.sAdminName = ? and a" +
                            ".sAdminPassWord= ?";
                    userid = mainRepository.singleQuery(objects, hql);
                    if (userid != null) {
                        code = Config.Code104;
                        userType = "9";
                    }
                }
            } else {
                System.out.println("进入老师判断登录");
                String hql = "select a.teacherId, b.departmentId from THngyTeacherInfo as a, THngyStaffRoom as b " +
                        "where a.teacherName = ? and a.teacherPassword = ? and a.staffRoomId = b.staffRoomId";
                Object text = mainRepository.singleQuery(objects, hql);
                if (!JSONObject.toJSONString(text).equals("null")) {
                    JSONArray jsonArray = JSONArray.parseArray(JSONObject.toJSONString(text));
                    userid = jsonArray.getString(0);
                    userdep = jsonArray.getString(1);
                    code = Config.Code100;
                    userType = "1";
                }
            }
        }

        //判断数据库是否有数据返回
        if (userid != null) {
            if (autoLogin.equals("1")) {
                Cookie cookieName = new Cookie("userName", inputEmail);
                Cookie cookiePwd = new Cookie("userPwd", inputPassword);
                Cookie cookieType = new Cookie("userType", userType);
                cookieName.setMaxAge(60 * 60 * 24 * 7);
                cookiePwd.setMaxAge(60 * 60 * 24 * 7);
                cookieType.setMaxAge(60 * 60 * 24 * 7);
                response.addCookie(cookieType);
                response.addCookie(cookieName);
                response.addCookie(cookiePwd);
            }
            httpSession.setAttribute("id", userid);
            httpSession.setAttribute("inputEmail", inputEmail);
            httpSession.setAttribute("inputPassword", inputPassword);
            httpSession.setAttribute("userType", userType);//0为管理员
            httpSession.setAttribute("department", userdep);//系部 超管该值为0
        }
        return code;
    }

    /**
     * 根据id获取用户数据
     *
     * @param id 用户id
     * @return json
     */
    @Override
    public String getTeacherInfo(Long id) {
        THngyTeacherInfo teacherInfo = teacherRepository.get(id);
        String json = JSONArray.toJSONString(teacherInfo);
        return json;
    }

    /**
     * 获取管理员信息
     *
     * @param name
     * @return
     */
    @Override
    public String getAdminInfo(String name) {
        String hql = "select admin.adminInfoId from THngyAdminInfo as admin where admin.adminInfoName = ?";
        Object object = mainRepository.singleQuery(new Object[]{name}, hql);
        System.out.println(object + "");
        THngyAdminInfo tHngyAdminInfo = adminRepository.get(Long.parseLong(object + ""));
        String json = JSONArray.toJSONString(tHngyAdminInfo);

        return json;
    }

    /**
     * 监控操作1 轮训检查是否有符合条件的任务 有则入库
     *
     * @return
     */
    @Override
    public String saveCronInfo() {
        String code = Config.NO;
        String now_date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String task_date1 = "";
        String task_date2 = "";
        List<THngyWorkTask> list = workTaskRepository.findAll();
        for (int i = 0; i < list.size(); i++) {
            THngyWorkTask workTask = list.get(i);
            // 任务开始时间
            task_date1 = workTask.getWorkTaskTime1().toString().substring(0, workTask.getWorkTaskTime1().toString()
                    .length() - 2);
            // 任务结束时间
            task_date2 = workTask.getWorkTaskTime3().toString().substring(0, workTask.getWorkTaskTime3().toString()
                    .length() - 2);
            if (MainUtil.getGapCount(task_date1, now_date) == 0) {
                //到达任务开始日期
                if (saveCronInfo_fun1(workTask.getWorkTaskId(), "1") == Config.OK) {
                    System.out.println("监控守护：检测到符合条件任务，ID：" + workTask.getWorkTaskId() + "状态：已达任务开始日期，已入库");
                } else {
                }
            }
            if (MainUtil.getGapCount(task_date2, now_date) == Config.Cron_day + 1) {
                //到了任务结束日前 Cron_day 个日 (结尾要+1 因为是前天检测 隔天再通知 否则当天将无限循环)
                if (saveCronInfo_fun1(workTask.getWorkTaskId(), "4") == Config.OK) {
                    System.out.println("监控守护：检测到符合条件任务，ID：" + workTask.getWorkTaskId() + "状态：已达任务前【" + Config
                            .Cron_day + "】+1个日期，已入库");
                } else {
                }
            }
            if (MainUtil.getGapCount(task_date2, now_date) == 0) {
                //到了任务结束日
                if (saveCronInfo_fun1(workTask.getWorkTaskId(), "3") == Config.OK) {
                    System.out.println("监控守护：检测到符合条件任务，ID：" + workTask.getWorkTaskId() + "状态：已达任务结束日，已入库");
                } else {
                }
            }
        }
        code = Config.OK;
        return code;
    }

    @Override
    public String saveCronInfo_fun1(Long task_id, String status) {
        String sql = "select cron.cronId FROM THngyCronInfo as cron where cron.workTaskId = ? and cron.cronStatus = ?";
        List<Object[]> list1 = mainRepository.complexQuery(new Object[]{task_id, status}, sql);
        if (list1.size() == 0) {
            String t = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            THngyCronInfo cronInfo = new THngyCronInfo();
            cronInfo.setCronStatus(status);
            cronInfo.setWorkTaskId(Long.parseLong(String.valueOf(task_id)));
            System.out.println(t);
            cronInfo.setCronAddTime(java.sql.Timestamp.valueOf(t));
            cronInfoRepository.save(cronInfo);
            return Config.OK;
        }
        return Config.NO;
    }

    /***
     * 监控操作2
     * status : 1 = 已开始 4 = 临近结束第几天 3 = 已结束
     * @return
     */
    @Override
    public String updateCronSend() {
        String sql = "SELECT cron.cronId, cron.workTaskId, cron.cronStatus FROM THngyCronInfo as cron WHERE cron" +
                ".cronStatus != '0'";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{}, sql);
        for (int i = 0; i < list.size() && i < 5; i++) {
            //每次限5封发送 以免邮箱判断频繁不给发送
            Object[] objects = list.get(i);
            String hql = "SELECT mail.mailAccount, mail.mailPwd, mail.mailTemplate FROM THngyCronInfo as cron, " +
                    "THngyWorkTask as work, THngyAdminInfo as admin, THngyMailInfo as mail WHERE cron.workTaskId = " +
                    "work.workTaskId and work.qq = admin.adminInfoQq and admin.adminInfoId = mail.adminInfoId and " +
                    "cron.cronId = ?";
            List<Object[]> list1 = mainRepository.complexQuery(new Object[]{Long.parseLong(objects[0].toString())},
                    hql);
            if (list1.size() == 0) {
                System.out.println("监控守护：任务ID" + objects[1].toString() + "发送失败，原因：该任务归属的管理员未配置发信信息");
                continue;
            } else {
                System.out.println("该管理员配置了发信信息" + list1.size());
            }
            Object[] objects1 = list1.get(0);
            String mail_Account = objects1[0].toString();
            String mail_Pwd = objects1[1].toString();
            String mail_Template = objects1[2].toString();
            sql = "SELECT link.teacherId, teacher.teacherName , work.workTaskName, work.workTaskTime1, work" +
                    ".workTaskTime3, teacher.teacherEmail FROM THngyWorkTask as work , THngyLink as link, " +
                    "THngyTeacherInfo as teacher WHERE work.workTaskId = link.workTaskId and link.teacherId = teacher" +
                    ".teacherId and work.workTaskId = ?";
            List<Object[]> list_teacher = mainRepository.complexQuery(new Object[]{Long.parseLong(objects[1].toString
                    ())}, sql);
            String[] teacher_id = new String[list_teacher.size()];     //存储所有要发送邮件的教师的id
            String[] teacher_name = new String[list_teacher.size()];     //存储所有要发送邮件的教师的名称
            String[] teacher_mail = new String[list_teacher.size()];     //存储所有要发送邮件的教师的邮件地址
            String taskTitle = "";                                  //存放 任务标题
            String taskTime1 = "";                                  //存放 任务起始时间
            String taskTime2 = "";                                  //存放 任务结束时间
            for (int j = 0; j < list_teacher.size(); j++) {
                Object[] object_teacher = list_teacher.get(j);
                teacher_id[j] = object_teacher[0].toString();
                teacher_name[j] = object_teacher[1].toString();
                teacher_mail[j] = object_teacher[5].toString();
                taskTitle = object_teacher[2].toString();
                taskTime1 = object_teacher[3].toString().substring(0, object_teacher[3].toString().length() - 2);
                taskTime2 = object_teacher[4].toString().substring(0, object_teacher[4].toString().length() - 2);
            }
            String[] text = MainUtil.getTemplateToText(mail_Template, objects[2] + "", teacher_name, taskTitle,
                    taskTime1,
                    taskTime2);   //模板转换后的文本
            SendMail sendMail = new SendMail();
            for (int j = 0; j < list_teacher.size(); j++) {
                String[] too = new String[1];
                too[0] = teacher_mail[j];
                if (!sendMail.send1("任务分发系统提醒", text[j], too, mail_Account, mail_Pwd)) {
                    System.out.println(teacher_name[j] + "发送邮件失败");
                    return "202";
                } else {
                    System.out.println(teacher_name[j] + "已成功发送邮件");
                }
            }
            String t = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            THngyCronInfo cronInfo = new THngyCronInfo();
            cronInfo.setCronId(Long.parseLong(objects[0].toString()));
            cronInfo.setWorkTaskId(Long.parseLong(objects[1].toString()));
            cronInfo.setCronAddTime(java.sql.Timestamp.valueOf(t));
            cronInfo.setCronStatus("0");
            mainRepository.update(cronInfo);
        }
        return Config.OK;
    }

}
