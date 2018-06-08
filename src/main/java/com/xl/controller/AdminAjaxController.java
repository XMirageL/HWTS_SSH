package com.xl.controller;

import com.alibaba.fastjson.JSONArray;
import com.xl.entity.THngyWorkTask;
import com.xl.service.impl.AdminServiceImpl;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class AdminAjaxController {
    @Autowired
    private AdminServiceImpl adminService;

    /***
     * 修改公告
     * @param notice 公告内容
     * @return 返回状态码200成功，201失败
     */
    @RequestMapping(value = "/modifyNotice")
    @ResponseBody
    public String modifyNotice(String notice, HttpSession session) {
        String id = (String) session.getAttribute("id");
        String department = (String) session.getAttribute("department");
        long did = Long.valueOf(id);
        long ddepartment = Long.valueOf(department);
        return adminService.updateNotice(notice, did, ddepartment);
    }

    /***
     * 修改管理员信息，管理员密码可以为空，其他信息不能为空，其他信息一开始就传过去了的
     * @param email 管理员邮箱
     * @param qq 管理员qq
     * @param pwd 管理员密码
     * @return 状态码，200成功，201失败
     */
    @PostMapping(value = "/modifyAdminInfo")
    @ResponseBody
    public String modifyAdminInfo(HttpSession session, String email, String qq, String pwd) {
        String code = Config.Code201;
        if (email.length() > 0 && qq.length() > 0) {
            String id = String.valueOf(session.getAttribute("id"));
            code = adminService.updateAdminInfo(id, email, qq, pwd);
        }
        return code;
    }

    /**
     * 发布任务，插入任务的数据
     *
     * @param workName 工作名称
     * @param teacher  教师名字
     * @param workText 工作详情
     * @param qq       发布者qq号
     * @return
     */
    @RequestMapping(value = "/insertIssueTasks")
    @ResponseBody
    public String insertIssueTasks(HttpSession session, String workName, String teacher, String kinds, String
            workText, String
                                           qq, String startDate, String endDate) {
        String statusCode = Config.Code201;
        String taskId = "";
        long did = Long.parseLong("" + session.getAttribute("department"));
        if (workName.length() > 0 && teacher.length() > 0 && kinds.length() > 0 && workText.length() > 0 && qq.length
                () > 0) {
            taskId = adminService.saveTaskTeacherLinkInfo(did, workName, teacher, kinds, workText, qq, startDate,
                    endDate);
            statusCode = Config.Code200;
        }
        String json = "{\"sCode\":\"" + statusCode + "\",\"taskId\":\"" + taskId + "\"}";
        System.out.println(json);
        return json;
    }

    /**
     * 编辑保存任务，更新任务的数据
     */
    @RequestMapping(value = "/updateTask")
    @ResponseBody
    public String updateTask(HttpSession session, String workId, String workName, String startDate, String endDate,
                             String workKinds, String
                                     oldteacher, String teacher, String workText, String qq, String workState, String
                                     workTime) {
        if (workId.length() > 0 || workName.length() > 0 && workText.length() > 0 && qq.length() > 0
                && workState.length() > 0 && workTime.length() > 0) {
            System.out.println(workName + "\n" + workText + "\n" + qq + "\n" + workState + "\n");
            THngyWorkTask tHngyWorkTask = new THngyWorkTask();
            tHngyWorkTask.setWorkTaskId(Long.parseLong(workId));
            tHngyWorkTask.setWorkTaskName(workName);
            tHngyWorkTask.setWorkTaskKinds(Long.parseLong(workKinds));
            tHngyWorkTask.setWorkTaskText(workText);
            tHngyWorkTask.setWorkTaskTime1(java.sql.Timestamp.valueOf(startDate));
            if (workState.equals("已完成")) {

                String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                System.out.println(time);
                if (adminService.setMailSend1(session.getAttribute("id") + "", workId, "2").equals(Config.OK)) {
                    System.out.println("任务完成提醒邮件已群发至教师");
                } else {
                    System.out.println("任务完成提醒邮件群发失败");
                }
                tHngyWorkTask.setWorkTaskTime2(java.sql.Timestamp.valueOf(time));
            } else {
                tHngyWorkTask.setWorkTaskTime2(null);
            }
            tHngyWorkTask.setWorkTaskTime3(java.sql.Timestamp.valueOf(endDate));
            tHngyWorkTask.setWorkTaskTime(java.sql.Timestamp.valueOf(workTime));
            int M = Integer.parseInt(workTime.substring(5, 7));
            if (M < 2 && M > 8)//上学期
            {
                tHngyWorkTask.setWorkTaskTerm("上学期");
            } else//下学期
            {
                tHngyWorkTask.setWorkTaskTerm("下学期");
            }
            tHngyWorkTask.setWorkTaskSchedule(workState);
            tHngyWorkTask.setQq(qq);
            tHngyWorkTask.setDepartmentId(Long.parseLong(session.getAttribute("department") + ""));
            String[] old_t = oldteacher.split(",");
            String[] new_t = teacher.split(",");
            //检测新组里没有的老师 ，没有则代表 需要删除
            for (int i = 0; i < old_t.length; i++) {
                int sign = 0;
                for (int k = 0; k < new_t.length; k++) {
                    if (old_t[i].equals(new_t[k])) {
                        break;
                    } else {
                        sign++;
                    }
                }
                if (sign == new_t.length) {
                    adminService.deleteLinkWName(workId, old_t[i]);
                }
            }
            //检测旧组 如未有 则为新增
            for (int i = 0; i < new_t.length; i++) {
                int sign = 0;
                for (int k = 0; k < old_t.length; k++) {
                    if (old_t[k].equals(new_t[i])) {
                        break;
                    } else {
                        sign++;
                    }
                }
                if (sign == old_t.length) {
                    adminService.addLinkWName(workId, new_t[i]);
                }
            }
            return adminService.updateTask(tHngyWorkTask);
        }
        return "101";
    }

    /***
     * 根据时间查询任务报表a
     * @return
     */
    @RequestMapping(value = "getInfo/recentTaskInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String recentTaskInfo(HttpSession session) {
        return adminService.getAdminHomePageInfo_1("" + session.getAttribute("department"));
    }

    /***
     * 根据时间查询用户工作报表
     * @param year 年
     * @param hyear 学期
     * @return
     */
    @RequestMapping(value = "taskQuery", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String taskQuery(HttpSession session, String year, String hyear, String year_1, String hyear_1) {
        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : "-08-01");
        String dateStr2 = year_1 + ("上学期".equals(hyear_1) ? "-02-01" : "-08-01");
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        //输出
        System.out.println(date1 + "\n" + date2);
        String json = JSONArray.toJSONString(adminService.taskReportsQuery(session.getAttribute("department") + "",
                date1,
                date2));
        System.out.println(json);
        return json;
    }

    @RequestMapping(value = "taskQuery2", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String taskQuery2(HttpSession session, String year, String hyear, String status, String admin) {
        String json = "";
        java.sql.Date date1 = java.sql.Date.valueOf(year);
        java.sql.Date date2 = java.sql.Date.valueOf(hyear);
        System.out.println(date1 + "\n" + date2);
        json = JSONArray.toJSONString(adminService.taskReportsQuery2(session.getAttribute("department") + "",
                date1,
                date2, status, admin));
        System.out.println(json);
        return json;
    }

    //查询所有任务
    @RequestMapping(value = "taskQueryAll", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String taskQueryAll(HttpSession session) {
        String json = "";
        java.sql.Date date1 = java.sql.Date.valueOf("2000-01-01");
        java.sql.Date date2 = java.sql.Date.valueOf("2099-01-01");

        System.out.println(date1 + "\n" + date2);
        json = JSONArray.toJSONString(adminService.taskReportsQuery3(session.getAttribute("department") + "",
                date1,
                date2));
        System.out.println(json);
        return json;
    }

    /***
     * 根据时间查询用户工作报表
     * @param year 年
     * @param hyear 学期
     * @return
     */
    @RequestMapping(value = "teacherQuery", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String teacherQuery(HttpSession session, String year, String hyear, String teacher) {
        java.sql.Date date1 = java.sql.Date.valueOf(year);
        java.sql.Date date2 = java.sql.Date.valueOf(hyear);
        System.out.println(date1 + "\n" + date2);
        List<Map<String, Object>> list = adminService.teacherReportsQuery("" + session.getAttribute("department"),
                date1,
                date2, teacher);
        if (list == null) {
            return "101";
        }
        String json = JSONArray.toJSONString(list);
        System.out.println(json);
        return json;
    }

    /***
     * 从session中获取管理员id查询管理员所有信息并以json形式返回
     * @return
     */
    @RequestMapping(value = "/getInfo/adminInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String getAdminInfo(HttpSession httpSession) {
        String id = String.valueOf(httpSession.getAttribute("id"));
        String department = String.valueOf(httpSession.getAttribute("department"));
        return adminService.getAdminHomePageInfo(id, department);
    }

    /**
     * 根据id获取任务数据
     *
     * @return
     */
    @RequestMapping(value = "getTaskInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getTaskInfo(String id) {
        String json = adminService.getTaskInfoForAdmin(Long.valueOf(id));
        return json;
    }

    /***
     * 根据QQ号查管理员名称
     * @param qq
     * @return
     */
    @RequestMapping(value = "getTaskInfo_1", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getTaskInfo_1(String qq) {
        return adminService.getTaskInfoForAdmin_1(qq);
    }

    /**
     * 根据Session查管理员QQ
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "getAdminQQ", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getAdminQQ(HttpSession session) {
        return adminService.getAdminQQ(session.getAttribute("id") + "").toString();
    }

    /***
     * 查该系所有任务分类
     * @param session
     * @return
     */
    @RequestMapping(value = "getKindsTask", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getKindsTask(HttpSession session) {
        String json = adminService.getKindsTask(session.getAttribute("department") + "").toString();
        return json;
    }


    /***
     * 批量导入页面信息部署
     * @return
     */
    @RequestMapping(value = "getimportInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getimportInfo(HttpSession session) {
        String json = Config.NO;
        json = adminService.getInfo(session);
        return json;
    }

    /***
     * 注册老师
     * @param session
     * @return
     */
    @RequestMapping(value = "addTeacher", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String addTeacher(HttpSession session, String teacherid, String techername, String teacherstaff, String
            teacheremail, String teacherphone, String teacherpwd) {
        String json = Config.NO;
        json = adminService.addTeacher(teacherid, techername, teacherstaff, teacheremail, teacherphone, teacherpwd);
        return json;
    }

    /***
     * 添加任务分类
     *
     * @param session
     * @param kind_name
     * @return
     */
    @RequestMapping(value = "addTaskKinds", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String addTaskKinds(HttpSession session, String kind_name) {
        String json = Config.NO;
        json = adminService.addKinds(session.getAttribute("department") + "", kind_name);
        json = Config.OK;
        return json;
    }

    /***
     * 获取所有任务信息 展现在列表
     * @param session
     * @return
     */
    @RequestMapping(value = "getAllKinds", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getAllKinds(HttpSession session) {
        String json = Config.NO;
        json = adminService.getAllKinds(session.getAttribute("department") + "");
        return json;
    }

    /**
     * 修改分类
     *
     * @param session
     * @param kindId
     * @param kindName
     * @return
     */
    @RequestMapping(value = "updateKinds", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String updateKinds(HttpSession session, String kindId, String kindName) {
        String json = Config.NO;
        json = adminService.updateKinds(kindId, session.getAttribute("department") + "", kindName);
        return json;
    }

    /**
     * 批量删除分类
     *
     * @param session
     * @param text
     * @return
     */
    @RequestMapping(value = "delKinds", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String deleteKinds(HttpSession session, String text) {
        String json = Config.NO;
        json = adminService.deleteKinds(session.getAttribute("department") + "", text);
        return json;
    }

    /***
     * 获取本系所有管理员信息
     * @param session
     * @return
     */
    @RequestMapping(value = "getAllInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getAllInfo(HttpSession session) {
        String json = Config.NO;
        json = adminService.getAllInfo(session.getAttribute("department") + "");
        return json;
    }

    @RequestMapping(value = "setTaskStatus", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String setTaskStatus(HttpSession session, String status, String taskId) {
        String json = Config.NO;
        adminService.updateTaskStatus(status, taskId);
        if (status.equals("1")) {
        } else {
            if (adminService.setMailSend1(session.getAttribute("id") + "", taskId, "2").equals(Config.OK)) {
                System.out.println("任务完成提醒邮件已群发至教师");
            } else {
                System.out.println("任务完成提醒邮件群发失败");
            }
        }
        return Config.OK;
    }

    @RequestMapping(value = "delTask", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String delTask(HttpSession session, String taskId) {
        String json = Config.NO;
        adminService.deleteTask(taskId);
        return Config.OK;
    }

    @RequestMapping(value = "setMailTest", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String setMailSend(HttpSession session, String acoount, String pwd) {
        String json = Config.NO;
        return adminService.setMailTest(acoount, pwd);
    }

    @RequestMapping(value = "getMailInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String getMailInfo(HttpSession session) {
        return adminService.getMailInfo(session.getAttribute("id") + "");
    }

    @RequestMapping(value = "updateMainInfo", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String updateMainInfo(HttpSession session, String acoount, String pwd) {
        return adminService.updateMailInfo(session.getAttribute("id") + "", acoount, pwd);
    }

    @RequestMapping(value = "updateMainInfo1", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String updateMainInfo1(HttpSession session, String template_text) {
        return adminService.updateMailInfo1(session.getAttribute("id") + "", template_text);
    }

    @RequestMapping(value = "setMailSend1", produces = "text/html;charset=UTF-8;")
    @ResponseBody
    public String setMailSend1(HttpSession session, String id, String status) {
        return adminService.setMailSend1(session.getAttribute("id") + "", id, status);
    }

//    @RequestMapping(value = "getAllTeacher", produces = "text/html;charset=UTF-8;")
//    @ResponseBody
//    public String getAllTeacher(HttpSession session) {
//        String json = Config.NO;
//        json = adminService.getAllTeacher(session.getAttribute("department") + "");
//        return json;
//    }
}
