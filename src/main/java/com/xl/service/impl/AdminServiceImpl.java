package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xl.entity.*;
import com.xl.repository.impl.*;
import com.xl.service.AdminService;
import com.xl.utils.Config;
import com.xl.utils.ExcelUtil;
import com.xl.utils.MainUtil;
import com.xl.utils.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.rmi.runtime.Log;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepositoryImpl adminRepository;

    @Autowired
    private TeacherRepositoryImpl teacherRepository;

    @Autowired
    private StaffRoomRepositoryImpl staffRoomRepository;

    @Autowired
    private MainRepositoryImpl mainRepository;

    @Autowired
    private LinkRepostoryImpl linkRepostory;

    @Autowired
    private KindsOfTaskRepositoryImpl kindsOfTaskRepository;

    @Autowired
    private WorkTaskRepositoryImpl workTaskRepository;

    @Autowired
    private MailInfoRepositoryImpl mailInfoRepository;

    /**
     * 以Json形式返回管理员个人信息以及公告
     *
     * @param id HttpSession中的id
     * @return 返回json格式的数据
     */
    @Override
    public String getAdminHomePageInfo(String id, String department) {
        String json = Config.Code101;
        THngyAdminInfo admin = adminRepository.get(Long.parseLong(id));
        String hql = "from THngyNotice";
        List<Object> list = mainRepository.simpleQuery(null, hql);
        THngyNotice notice = new THngyNotice();
        for (int i = list.size() - 1; i >= 0; i--) {
            //从后往前 获取最新该系公告
            notice = (THngyNotice) list.get(i);
            if (String.valueOf(notice.getDepartmentId()).equals(department)) {
                break;
            }
        }
        String text = "select a.departmentName from THngyDepartment as a,THngyAdminInfo as b where a.departmentId = b" +
                ".departmentId and b.departmentId = ?";
        List<Object[]> list1 = new LinkedList<>();
        list1 = mainRepository.complexQuery(new Object[]{admin.getDepartmentId()}, text);
        if (admin != null && notice != null) {
            Map<String, Object> map = new HashMap();
            map.put("adminName", admin.getAdminInfoName());
            map.put("adminDep", list1.get(0));
            map.put("adminId", admin.getAdminInfoId());
            map.put("adminEmail", admin.getAdminInfoEmail());
            map.put("adminQQ", admin.getAdminInfoQq());
            map.put("notice_text", notice.getNoticeText());
            json = JSONArray.toJSONString(map);
        }
        return json;
    }

    /**
     * 以Json形式返回管理员主页最近任务信息
     *
     * @return 返回json格式的数据
     */
    @Override
    public String getAdminHomePageInfo_1(String dep) {
        String json = Config.Code101;
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work" +
                ".workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink " +
                "as link,THngyTeacherInfo as teacher where link.workTaskId = work.workTaskId and link.teacherId = " +
                "teacher.teacherId and work.departmentId = " + dep + " order by work.workTaskTime DESC";
        List<Map<String, Object>> list = MainUtil.getWorkInfoUtil(mainRepository.complexQuery(new Object[]{}, hql));
        if (list.size() > 0) {
            json = JSONArray.toJSONString(list);
        }
        return json;
    }

    /**
     * 修改管理员信息
     *
     * @param id    管理员基本信息
     * @param email
     * @param qq
     * @param pwd
     * @return 返回CONFIG类中的状态码
     */
    @Override
    public String updateAdminInfo(String id, String email, String qq, String pwd) {
        THngyAdminInfo admin = adminRepository.get(Long.parseLong(id));
        admin.setAdminInfoEmail(email);
        admin.setAdminInfoQq(qq);
        if (pwd.length() >= 6)
            admin.setAdminInfoPassWord(pwd);
        adminRepository.saveOrUpdate(admin);
        return Config.Code200;
    }

    /***
     * 修改公告
     * @param notice 公告内容
     * @return 返回状态码200成功，201失败
     */
    @Override
    public String updateNotice(String notice, long did, long department) {
        String code = Config.Code201;
        THngyNotice notice1 = new THngyNotice();
        notice1.setNoticeText(notice);
        notice1.setDepartmentId(department);
//        long sign = mainRepository.save(notice1) ;
//        System.out.println(sign);
        if (mainRepository.save(notice1) == 0) {
            code = Config.Code200;
        }
        return code;
    }

    /***
     * 根据时间获取教师工作状态(查询时间内完成任务数)
     * @return 报表
     */
    @Override
    public List<Map<String, Object>> teacherReportsQuery(String dep, java.sql.Date date1, java.sql.Date date2, String
            teacher) {
        List<Map<String, Object>> list = new ArrayList<>();
        String[] teacher_sp = new String[10];
        if (teacher.length() != 0) {
            teacher_sp = teacher.split(",");
            for (int i = 0; i < teacher_sp.length; i++) {
                System.out.println(teacher_sp[i]);
            }
        }

        //某原因 需要加1才是实际查询日期 后期排查修复
        date2.setDate(date2.getDate() + 1);
        //查没有任务的
        String hql = "select teacher.teacherId,teacher.teacherName from THngyTeacherInfo as teacher, THngyStaffRoom  " +
                "as staff where teacher.staffRoomId = staff.staffRoomId and staff.departmentId = " + dep + " and " +
                "teacher" +
                ".teacherId not in (select link.teacherId from THngyLink as link,THngyWorkTask as work where link" +
                ".workTaskId=work.workTaskId and work.workTaskTime>=? and work.workTaskTime<=? )";
        List<Object[]> listTeacher = mainRepository.dateQuery(date1, date2, hql);
        if (listTeacher.size() != 0) {
            for (int i = 0; i < listTeacher.size(); ++i) {
                Object[] object1 = listTeacher.get(i);
                Map<String, Object> map = new HashMap<>();
                if (teacher.length() != 0) {
                    int sign = 0;
                    for (int k = 0; k < teacher_sp.length; k++) {
                        if (teacher_sp[k].equals(String.valueOf(object1[0]))) {
                            sign++;
                        }
                    }
                    if (sign == 0) {
                        continue;
                    }
                }
                map.put("teacherId", String.valueOf(object1[0]));
                map.put("teacherName", String.valueOf(object1[1]));
                map.put("taskCount", 0);
                map.put("unfinished", 0);
                list.add(map);
            }
        }
        //查有任务的
        hql = "select teacher.teacherId,teacher.teacherName,count (*) ,( select count(*) from THngyWorkTask as w," +
                "THngyLink as l where l.teacherId = teacher.teacherId and l.workTaskId = w.workTaskId and w" +
                ".workTaskSchedule = '未完成') from THngyTeacherInfo as teacher,THngyLink as link,THngyStaffRoom as " +
                "staff,THngyWorkTask as work " +
                "where staff.departmentId = teacher.staffRoomId and staff.departmentId = " + dep + " and teacher" +
                ".teacherId = link.teacherId and  link.workTaskId = work.workTaskId and work" +
                ".workTaskTime>=? and work.workTaskTime<=? group by teacher.teacherId,teacher.teacherName order by " +
                "count (work.workTaskId) asc ";
        List<Object[]> listWork = mainRepository.dateQuery(date1, date2, hql);
        System.out.println("第二个size" + listWork.size());
        if (listWork.size() != 0) {
            for (int i = 0; i < listWork.size(); ++i) {
                Object[] object1 = listWork.get(i);
                Map<String, Object> map = new HashMap<>();
                if (teacher.length() != 0) {
                    int sign = 0;
                    for (int k = 0; k < teacher_sp.length; k++) {
                        if (teacher_sp[k].equals(String.valueOf(object1[0]))) {
                            sign++;
                        }
                    }
                    if (sign == 0) {
                        continue;
                    }
                }
                map.put("teacherId", String.valueOf(object1[0]));
                map.put("teacherName", String.valueOf(object1[1]));
                map.put("taskCount", object1[2]);
                map.put("unfinished", object1[3]);
                list.add(map);
            }
        }
        return list;
    }

    /***
     * Excel批量注册 教师信息
     *
     * @param filePath
     * @return
     */
    @Override
    public String importExcelInfo(String filePath) {
        String statusCode = Config.Code201;

        List<THngyStaffRoom> list1 = staffRoomRepository.findAll();
        List<THngyTeacherInfo> list = ExcelUtil.getTeacherInfo(filePath, list1);
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i).getTeacherName() + " " + list.get(i).getStaffRoomId() + " " + list.get(i)
                    .getTeacherPhone() + " " + list.get(i).getTeacherEmail() + " " + list.get(i).getTeacherPassword());
            THngyTeacherInfo teacherInfo = new THngyTeacherInfo();
            teacherInfo.setTeacherName(list.get(i).getTeacherName());
            teacherInfo.setStaffRoomId(list.get(i).getStaffRoomId());
            teacherInfo.setTeacherEmail(list.get(i).getTeacherEmail());
            teacherInfo.setTeacherPhone(list.get(i).getTeacherPhone());
            teacherInfo.setTeacherPassword(list.get(i).getTeacherPassword());
            Long sign = mainRepository.save(teacherInfo);
            if (sign == 0) {
                return Config.Code201;
            } else {
                statusCode = Config.Code200;
            }
        }
        return statusCode;
    }

    /***
     * 发布任务
     * @param workName 任务标题
     * @param teacher 管理员指定的多个教师,以","隔开
     * @param workText 任务详情
     * @param qq 发布任务的管理员的qq
     * @return 任务的id 前台跳转到相应任务页面
     *
     */
    @Override
    public String saveTaskTeacherLinkInfo(long did, String workName, String teacher, String kinds, String workText,
                                          String qq, String startDate, String endDate) {
        //获取当前时间,保存任务信息
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        int M = Integer.parseInt((String) time.subSequence(5, 7));
        THngyWorkTask tHngyWorkTask = new THngyWorkTask();
        tHngyWorkTask.setWorkTaskTime(java.sql.Timestamp.valueOf(time));
        tHngyWorkTask.setWorkTaskTime1(java.sql.Timestamp.valueOf(startDate + " 00:00:00"));
        tHngyWorkTask.setWorkTaskTime2(null);
        tHngyWorkTask.setWorkTaskTime3(java.sql.Timestamp.valueOf(endDate + " 00:00:00"));
        tHngyWorkTask.setWorkTaskName(workName);
        tHngyWorkTask.setWorkTaskKinds(Long.parseLong(kinds));
        tHngyWorkTask.setWorkTaskText(workText);
        tHngyWorkTask.setWorkTaskSchedule("未完成");
        tHngyWorkTask.setQq(qq);
        tHngyWorkTask.setDepartmentId(did);
        if (M < 2 && M > 8)//上学期
        {
            tHngyWorkTask.setWorkTaskTerm("上学期");
        } else//下学期
        {
            tHngyWorkTask.setWorkTaskTerm("下学期");
        }
        long workId = mainRepository.save(tHngyWorkTask);

        //获取全部教师的id,将教师id与对应的任务id存如Link表
        String[] teachers = teacher.split(",");
        for (int i = 0; i < teachers.length; i++) {
            String hql = "select t.id from THngyTeacherInfo t where teacherName = ?";
            Object[] objects = {teachers[i]};
            THngyLink link = new THngyLink();
            link.setWorkTaskId(workId);
            link.setTeacherId((long) mainRepository.singleQuery(objects, hql));
            mainRepository.save(link);
        }
        return String.valueOf(workId);
    }

    /**
     * 根据id获取任务数据
     *
     * @return json数据
     */
    @Override
    public String getTaskInfoForAdmin(long id) {
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work" +
                ".workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText, kind.kindsTaskName, kind.kindsTaskID " +
                ", work.workTaskTime1, work.workTaskTime2, work.workTaskTime3 from THngyWorkTask as work ,THngyLink " +
                "as link,THngyTeacherInfo as teacher,THngyKindsTask as kind where link.workTaskId = work.workTaskId " +
                "and link.teacherId = " +
                "teacher.teacherId and work.workTaskId = ? and work.workTaskKinds = kind.kindsTaskID order by work" +
                ".workTaskTime desc";
        Object[] objects = {id};
        List<Object[]> listWork = mainRepository.complexQuery(objects, hql);
        String json = JSONArray.toJSONString(MainUtil.getWorkInfoUti5(listWork, null));
        return json;
    }

    /***
     * 根据QQ获取管理员名称
     * @param qq
     * @return
     */
    @Override
    public String getTaskInfoForAdmin_1(String qq) {
        String hql = "select admin.adminInfoName from THngyAdminInfo as admin where admin.adminInfoQq = " + qq;
        List<THngyAdminInfo> list = new LinkedList<>();
        list = adminRepository.findAll();
        String qq_admin = "";
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getAdminInfoQq().equals(qq)) {
                qq_admin = list.get(i).getAdminInfoName();
                break;
            }
        }
//        Object object = mainRepository.singleQuery(hql);
        System.out.println("" + qq_admin);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", Config.OK);
        jsonObject.put("mes", qq_admin);
        return jsonObject.toJSONString();
    }

    /***
     * 根据ID查管理员QQ
     * @param id
     * @return
     */
    @Override
    public String getAdminQQ(String id) {
        String qq = "";
        System.out.println("管理员ID：" + id);
        List<THngyAdminInfo> list = new LinkedList<>();
        list = adminRepository.findAll();
        for (int i = 0; i < list.size(); i++) {
            if (String.valueOf(list.get(i).getAdminInfoId()).equals(id)) {
                qq = list.get(i).getAdminInfoQq();
                break;
            }
        }
        return qq;
    }

    /***
     * 查该系所有任务分类
     * @param id
     * @return
     */
    @Override
    public String getKindsTask(String id) {
        Long lo_id = Long.parseLong(id);
        String sql = "select kind.kindsTaskID, kind.kindsTaskName from THngyKindsTask as kind where kind.departmentId" +
                " = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{lo_id}, sql);
//        for (int i = 0; i < list.size(); i++) {
//            Object object = list.get(i);
//            System.out.println(JSONObject.toJSONString(object));
//        }
        return JSONArray.toJSONString(MainUtil.getWorkInfoUti_main(list, new Object[]{"kindId", "kindName"}));
    }

    /**
     * 编辑保存任务，更新任务的数据
     *
     * @param workTask
     * @return 状态码
     */
    @Override
    public String updateTask(THngyWorkTask workTask) {
        mainRepository.update(workTask);
        return "100";
    }

    /**
     * 根据时间查询工作报表
     *
     * @param date1
     * @param date2
     * @return 表单集合
     */
    @Override
    public List<Map<String, Object>> taskReportsQuery(String dep, java.sql.Date date1, java.sql.Date date2) {
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work" +
                ".workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink " +
                "as link,THngyTeacherInfo as teacher where work.departmentId = " + dep + " and link.workTaskId = work" +
                ".workTaskId and link.teacherId = " +
                "teacher.teacherId and work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskTime desc";
        List<Map<String, Object>> list = MainUtil.getWorkInfoUtil(mainRepository.dateQuery(date1, date2, hql));
        return list;
    }

    @Override
    public List<Map<String, Object>> taskReportsQuery2(String dep, java.sql.Date date1, java.sql.Date date2, String
            status, String admin) {
        //某原因 需要加1才是实际查询日期 后期排查修复
        date2.setDate(date2.getDate() + 1);

        System.out.println(status + " " + admin);
        String hql = "";
        if (status.equals("0") && admin.equals("0")) {
            //两个 -
            hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,teacher.teacherId, " +
                    "admin.adminInfoName, admin.adminInfoId, work.workTaskSchedule from THngyWorkTask as work ," +
                    "THngyLink " +
                    "as link,THngyTeacherInfo as teacher, THngyAdminInfo as admin where work.departmentId = " + dep +
                    " and link.workTaskId = work" +
                    ".workTaskId and link.teacherId = " +
                    "teacher.teacherId and work.qq = admin.adminInfoQq and work.workTaskTime>=? and work" +
                    ".workTaskTime<=? order by work.workTaskId " +
                    "desc";
        } else if (!status.equals("0") && admin.equals("0")) {
            //状态有 管理员-
            String sta = "";
            if (status.equals("1")) {
                System.out.println("筛选所有已完成任务");
                sta = "已完成";
            } else if (status.equals("2")) {
                System.out.println("筛选所有未完成任务");
                sta = "未完成";
            }
            hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,teacher.teacherId, " +
                    "admin.adminInfoName, admin.adminInfoId, work.workTaskSchedule, work.workTaskTime1, work" +
                    ".workTaskTime3 from THngyWorkTask as work ," +
                    "THngyLink " +
                    "as link,THngyTeacherInfo as teacher, THngyAdminInfo as admin where work.departmentId = " + dep +
                    " and link.workTaskId = work" +
                    ".workTaskId and link.teacherId = " +
                    "teacher.teacherId and work.qq = admin.adminInfoQq and work.workTaskSchedule = '" + sta + "' and " +
                    "work.workTaskTime>=? and work" +
                    ".workTaskTime<=? order by work.workTaskId " +
                    "desc";
        } else if (status.equals("0") && !admin.equals("0")) {
            //状态- 管理员无
            hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,teacher.teacherId, " +
                    "admin.adminInfoName, admin.adminInfoId, work.workTaskSchedule, work.workTaskTime1, work" +
                    ".workTaskTime3 from THngyWorkTask as work ," +
                    "THngyLink " +
                    "as link,THngyTeacherInfo as teacher, THngyAdminInfo as admin where work.departmentId = " + dep +
                    " and link.workTaskId = work.workTaskId and link.teacherId = " +
                    "teacher.teacherId and work.qq = admin.adminInfoQq and admin.adminInfoId = " + Long.parseLong
                    (admin) + " and " +
                    "work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskId desc";
        } else {
            String sta = "";
            if (status.equals("1")) {
                sta = "已完成";
            } else if (status.equals("2")) {
                sta = "未完成";
            }
            //状态- 管理员-
            hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,teacher.teacherId, " +
                    "admin.adminInfoName, admin.adminInfoId, work.workTaskSchedule, work.workTaskTime1, work" +
                    ".workTaskTime3 from THngyWorkTask as work ," +
                    "THngyLink " +
                    "as link,THngyTeacherInfo as teacher, THngyAdminInfo as admin where work.departmentId = " + dep +
                    " and link.workTaskId = work.workTaskId and link.teacherId = " +
                    "teacher.teacherId and work.qq = admin.adminInfoQq and admin.adminInfoId = " + Long.parseLong
                    (admin) + " and work.workTaskSchedule = '" + sta + "' and " +
                    "work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskId desc";
        }
        List<Map<String, Object>> list = MainUtil.getWorkInfoUtil1(mainRepository.dateQuery(date1, date2, hql));
        return list;
    }

    @Override
    public List<Map<String, Object>> taskReportsQuery3(String dep, java.sql.Date date1, java.sql.Date date2) {
        String hql = "";
        hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,teacher.teacherId, " +
                "admin.adminInfoName, admin.adminInfoId, work.workTaskSchedule, work.workTaskTime1, work" +
                ".workTaskTime3 from THngyWorkTask as work ,THngyLink " +
                "as link,THngyTeacherInfo as teacher, THngyAdminInfo as admin where work.departmentId = " + dep +
                " and link.workTaskId = work" +
                ".workTaskId and link.teacherId = " +
                "teacher.teacherId and work.qq = admin.adminInfoQq and work.workTaskTime>=? and work" +
                ".workTaskTime<=? order by work.workTaskId " +
                "desc";
        List<Map<String, Object>> list = MainUtil.getWorkInfoUtil1(mainRepository.dateQuery(date1, date2, hql));
        return list;
    }

    /**
     * 根据时间查询工作报表
     *
     * @param response
     * @param list
     * @param fileName
     * @param columnNames
     * @param keys
     */
    @Override
    public void downloadReports(HttpServletResponse response, List<Map<String, Object>> list, String fileName,
                                String[] columnNames, String[] keys) {
        try {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            //调用工具类创建excel工作簿
            ExcelUtil.createWorkbook(list, keys, columnNames)
                    .write(os);
            byte[] content = os.toByteArray();
            InputStream is = new ByteArrayInputStream(content);

            // 设置response参数，可以打开下载页面
            response.reset();
            response.setContentType("application/vnd.ms-excel;charset=utf-8");
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + new String((fileName + ".xlsx").getBytes(), "iso-8859-1"));
            OutputStream out = response.getOutputStream();
            //下载传输
            byte[] b = new byte[2048];
            int length;
            while ((length = is.read(b)) > 0) {
                out.write(b, 0, length);
            }

            // 关闭
            os.flush();
            os.close();
            is.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /***
     * 批量导入页信息部署
     * @return
     */
    @Override
    public String getInfo(HttpSession session) {
        String staffid = "";
        String staffname = "";
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", Config.OK);
        String sql = "SELECT max (teacher.teacherId) from THngyTeacherInfo as teacher";
        Object object = mainRepository.singleQuery(sql);
        List<THngyStaffRoom> list = staffRoomRepository.findAll();
        for (int i = 0; i < list.size(); i++) {
            if (session.getAttribute("department").equals("" + (list.get(i).getDepartmentId()))) {
                staffid += list.get(i).getStaffRoomId();
                staffid += ",";
                staffname += list.get(i).getStaffRoomName();
                staffname += ",";
            }
        }
        jsonObject.put("maxid", Integer.parseInt(object + "") + 1);
        jsonObject.put("staffid", staffid);
        jsonObject.put("staffname", staffname);
        return jsonObject.toJSONString();
    }

    /***
     * 添加教师
     * @param teacherid
     * @param techername
     * @param teacherstaff
     * @param teacheremail
     * @param teacherphone
     * @param teacherpwd
     * @return
     */
    @Override
    public String addTeacher(String teacherid, String techername, String teacherstaff, String teacheremail, String
            teacherphone, String teacherpwd) {
        String code = Config.NO;
        THngyTeacherInfo tHngyTeacherInfo = new THngyTeacherInfo();
        tHngyTeacherInfo.setTeacherName(techername);
        tHngyTeacherInfo.setStaffRoomId(Long.parseLong(teacherstaff));
        tHngyTeacherInfo.setTeacherEmail(teacheremail);
        tHngyTeacherInfo.setTeacherPhone(teacherphone);
        tHngyTeacherInfo.setTeacherPassword(teacherpwd);
        Long sign = teacherRepository.save(tHngyTeacherInfo);
        if (sign != 0) {
            code = Config.OK;
        }
        return code;
    }

    /***
     * 根据教师名称删除相应Link行
     * @return
     */
    @Override
    public String deleteLinkWName(String wordId, String teachName) {
        String hql = "select link.linkId from THngyLink as link,THngyTeacherInfo as teacher where link.workTaskId = ?" +
                " and link.teacherId = teacher.teacherId and teacher.teacherName = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(wordId), teachName}, hql);
        linkRepostory.delete(Long.parseLong(String.valueOf(list.get(0))));
        return "";
    }

    /***
     * 根据教师名称增加Link
     * @param wordId
     * @param teachName
     * @return
     */
    @Override
    public String addLinkWName(String wordId, String teachName) {
        String hql = "select teacher.teacherId from THngyTeacherInfo as teacher where teacher.teacherName = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{teachName}, hql);
        THngyLink link = new THngyLink();
        link.setWorkTaskId(Long.parseLong(wordId));
        link.setTeacherId(Long.parseLong(String.valueOf(list.get(0))));
        linkRepostory.save(link);
        return "";
    }

    /***
     * 增加新分类
     * @param dep
     * @param kindsname
     * @return
     */
    @Override
    public String addKinds(String dep, String kindsname) {
        THngyKindsTask kindsTask = new THngyKindsTask();
        kindsTask.setDepartmentId(Long.parseLong(dep));
        kindsTask.setKindsTaskName(kindsname);
        kindsOfTaskRepository.save(kindsTask);
        return "";
    }

    /**
     * 获取所有任务分类
     *
     * @param dep
     * @return
     */
    @Override
    public String getAllKinds(String dep) {
        String json = "";
        String sql = "select kinds.kindsTaskID, kinds.kindsTaskName from THngyKindsTask as kinds where kinds" +
                ".departmentId = ?";
        List<Object[]> objects = mainRepository.complexQuery(new Object[]{Long.parseLong(dep)}, sql);
        json = JSONArray.toJSONString(MainUtil.getWorkInfoUti_main(objects, new Object[]{"kindsId", "kindsName"}));
        return json;
    }

    @Override
    public String updateKinds(String kindId, String dep, String kindname) {
        THngyKindsTask kindsTask = new THngyKindsTask();
        kindsTask.setKindsTaskID(Long.parseLong(kindId));
        kindsTask.setDepartmentId(Long.parseLong(dep));
        kindsTask.setKindsTaskName(kindname);
        kindsOfTaskRepository.saveOrUpdate(kindsTask);
        return Config.OK;
    }

    /**
     * 批量删除分类
     *
     * @param dep
     * @param text
     * @return
     */
    @Override
    public String deleteKinds(String dep, String text) {
        String[] ss = text.split(",");
        for (int i = 0; i < ss.length; i++) {
            String hql = "select link.linkId from THngyLink as link, THngyWorkTask as work where link.workTaskId = " +
                    "work.workTaskId and work.workTaskKinds = ?";
            List<Object[]> list1 = mainRepository.complexQuery(new Object[]{Long.parseLong(ss[i])}, hql);
            for (int k = 0; k < list1.size(); k++) {
                Long aLong = Long.parseLong(String.valueOf(list1.get(k)));
                linkRepostory.delete(aLong);
            }
            hql = "select task.workTaskId from THngyWorkTask as task where task.workTaskKinds = ?";
            List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(ss[i])}, hql);
            for (int k = 0; k < list.size(); k++) {
                Long l = Long.parseLong(String.valueOf(list.get(k)));
                workTaskRepository.delete(l);
            }
            kindsOfTaskRepository.delete(Long.parseLong(ss[i]));
        }
        return Config.OK;
    }

    /**
     * 获取所有管理员信息
     *
     * @param dep
     * @return
     */
    @Override
    public String getAllInfo(String dep) {
        String hql = "select admin.adminInfoId, admin.adminInfoName from THngyAdminInfo as admin WHERE admin" +
                ".departmentId = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(dep)}, hql);
        String json = JSONArray.toJSONString(MainUtil.getWorkInfoUti_main(list, new Object[]{"adminId", "adminName"
        }));
        return json;
    }

    /***
     * 获取所有老师
     * @param dep
     * @return
     */
    @Override
    public List<Map<String, Object>> getAllTeacher(String dep) {
        List<Map<String, Object>> listMap = new ArrayList<>();
        String hql = "select teacher.teacherId, teacher.teacherName from THngyTeacherInfo as teacher ,THngyStaffRoom " +
                "as staff WHERE teacher.staffRoomId = staff.staffRoomId and staff.departmentId = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(dep)}, hql);
//        String json = JSONArray.toJSONString(MainUtil.getWorkInfoUti_main(list, new Object[]{"teacherId",
// "teacherName"
//        }));
        if (list.size() != 0) {
            for (int i = 0; i < list.size(); i++) {
                Object[] objects = list.get(i);
                Map<String, Object> map = new HashMap<>();
                map.put("teacherId", String.valueOf(objects[0]));
                map.put("teacherName", String.valueOf(objects[1]));
                listMap.add(map);
            }
        }
        return listMap;
    }

    @Override
    public String updateTaskStatus(String status, String taskI) {
        String sta = "";
        if (status.equals("0")) {
            sta = "已完成";
        } else {
            sta = "未完成";
        }
        System.out.println(status + sta);
        List<THngyWorkTask> tHngyWorkTask = workTaskRepository.findAll();
        for (int i = 0; i < tHngyWorkTask.size(); i++) {
            THngyWorkTask tHngyWorkTask1 = tHngyWorkTask.get(i);
            if (tHngyWorkTask1.getWorkTaskId() == Long.parseLong(taskI)) {
                tHngyWorkTask1.setWorkTaskSchedule(sta);
                if (status.equals("0")) {
                    String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                    tHngyWorkTask1.setWorkTaskTime2(java.sql.Timestamp.valueOf(time));
                } else {
                    tHngyWorkTask1.setWorkTaskTime2(null);
                }
                workTaskRepository.save(tHngyWorkTask1);
                System.out.println("任务状态已更新");
                break;
            }
        }
        return Config.OK;
    }

    @Override
    public String deleteTask(String taskid) {
        String hql = "select link.linkId, link.workTaskId from THngyLink as link, THngyWorkTask as task WHERE link" +
                ".workTaskId = task" +
                ".workTaskId and task.workTaskId = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(taskid)}, hql);
        for (int i = 0; i < list.size(); i++) {
            Object[] o = list.get(i);
            System.out.println("删除关联link：" + o[0]);
            linkRepostory.delete(Long.parseLong(String.valueOf(o[0])));
        }
        workTaskRepository.delete(Long.parseLong(taskid));
        System.out.println("删除任务：" + taskid);
        return Config.OK;
    }

    @Override
    public String setMailTest(String acoount, String pwd) {
        SendMail sendMail = new SendMail();
        String[] toWho = new String[1];
        toWho[0] = acoount;
        if (sendMail.send1("湖南工院任务分发系统", "这是一份来自【任务分发系统】的发信配置测试邮件", toWho, acoount, pwd)) {
            return Config.OK;
        } else {
            return Config.NO;
        }
    }

    @Override
    public String getMailInfo(String id) {
        String sql = "select mail.mailAccount, mail.mailPwd, mail.mailTemplate from THngyMailInfo as mail where mail" +
                ".adminInfoId = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(id)}, sql);
        if (list.size() == 0) {
            return Config.NO;
        }
        return JSONArray.toJSONString(MainUtil.getWorkInfoUti_main(list, new Object[]{"account", "pwd",
                "template_text"}));
    }

    @Override
    public String updateMailInfo(String id, String acoount, String pwd) {
        List<THngyMailInfo> list = mailInfoRepository.findAll();
        for (int i = 0; i < list.size(); i++) {
            THngyMailInfo mailInfo = list.get(i);
            if (String.valueOf(mailInfo.getAdminInfoId()).equals(id)) {
                System.out.println("邮箱信息修改");
                mailInfo.setMailAccount(acoount);
                mailInfo.setMailPwd(pwd);
                mainRepository.update(mailInfo);
//                mailInfoRepository.save(mailInfo);
                return Config.OK;
            }
        }
        System.out.println("邮箱信息增加");
        THngyMailInfo mailInfo1 = new THngyMailInfo();
        mailInfo1.setMailAccount(acoount);
        mailInfo1.setAdminInfoId(Long.parseLong(id));
        mailInfo1.setMailPwd(pwd);
        mailInfo1.setMailTemplate("<h2>您好，[teacher_name]，您的任务[work_name][status]，开始时间为[work_time_start" +
                "]，结束时间为[work_time_end]，请知悉。</h2>");
        mainRepository.save(mailInfo1);
        return Config.OK;
    }

    @Override
    public String updateMailInfo1(String id, String template_text) {
        List<THngyMailInfo> list = mailInfoRepository.findAll();
        for (int i = 0; i < list.size(); i++) {
            THngyMailInfo mailInfo = list.get(i);
            if (String.valueOf(mailInfo.getAdminInfoId()).equals(id)) {
                mailInfo.setMailTemplate(template_text);
                mainRepository.update(mailInfo);
//                mailInfoRepository.save(mailInfo);
                return Config.OK;
            }
        }
        return Config.OK;
    }

    /**
     * 发信请求方法
     *
     * @param adminId 发信人ID (管理员)
     * @param task_id 任务ID
     * @param status  任务要通知的状态(0 已下发, 1 已开始, 2 已完成 3 已结束)
     * @return 201 = 此管理员未配置发信信息
     */
    @Override
    public String setMailSend1(String adminId, String task_id, String status) {
        String sql = "SELECT mail.mailAccount, mail.mailPwd, mail.mailTemplate from THngyMailInfo as mail where mail" +
                ".adminInfoId = ?";
        List<Object[]> list = mainRepository.complexQuery(new Object[]{Long.parseLong(adminId)}, sql);
        if (list.size() == 0) {
            return Config.NO;
        }
        Object[] objects = list.get(0);
        String mail_Account = objects[0].toString();            //发信帐号
        String mail_pwd = objects[1].toString();                //发信授权码
        String mail_template = objects[2].toString();           //发信模板
        sql = "SELECT link.teacherId, teacher.teacherName , work.workTaskName, work.workTaskTime1, work" +
                ".workTaskTime3, teacher.teacherEmail FROM THngyWorkTask as work , THngyLink as link, " +
                "THngyTeacherInfo as teacher WHERE work.workTaskId = link.workTaskId and link.teacherId = teacher" +
                ".teacherId and work.workTaskId = ?";
        List<Object[]> list_teacher = mainRepository.complexQuery(new Object[]{Long.parseLong(task_id)}, sql);
        String[] teacher_id = new String[list_teacher.size()];     //存储所有要发送邮件的教师的id
        String[] teacher_name = new String[list_teacher.size()];     //存储所有要发送邮件的教师的名称
        String[] teacher_mail = new String[list_teacher.size()];     //存储所有要发送邮件的教师的邮件地址
        String taskTitle = "";                                  //存放 任务标题
        String taskTime1 = "";                                  //存放 任务起始时间
        String taskTime2 = "";                                  //存放 任务结束时间
        for (int i = 0; i < list_teacher.size(); i++) {
            Object[] object_teacher = list_teacher.get(i);
            teacher_id[i] = object_teacher[0].toString();
            teacher_name[i] = object_teacher[1].toString();
            taskTitle = object_teacher[2].toString();
            taskTime1 = object_teacher[3].toString().substring(0, object_teacher[2].toString().length() - 2);
            taskTime2 = object_teacher[4].toString().substring(0, object_teacher[2].toString().length() - 2);
            teacher_mail[i] = object_teacher[5].toString();
        }
        String[] text = MainUtil.getTemplateToText(mail_template, status, teacher_name, taskTitle, taskTime1,
                taskTime2);   //模板转换后的文本
        SendMail sendMail = new SendMail();
        for (int i = 0; i < list_teacher.size(); i++) {
            String[] to = new String[1];
            to[0] = teacher_mail[i];
            if (sendMail.send1("任务分发系统提醒", text[i], to, mail_Account, mail_pwd)){
                System.out.println(teacher_name[i]+"已成功发送邮件");
            } else {
                System.out.println(teacher_name[i]+"发送邮件失败");
                return "202";
            }
        }
        return Config.OK;
    }
}