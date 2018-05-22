package com.xl.controller;

import com.xl.service.impl.TeacherServiceImpl;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class TeacherAjaxController {
    @Autowired
    TeacherServiceImpl teacherSevice;

    /***
     * 修改用户的个人信息
     * @param email 用户邮箱
     * @param phone 用户手机
     * @param pwd 用户密码
     * @return 状态码，200成功，201失败
     */
    @PostMapping(value = "/modifyUserInfo")
    @ResponseBody
    public String modifyUserInfo(String email, String phone, String pwd, HttpSession session) {
        String code = Config.Code201;
        String id = (String) session.getAttribute("id");
        System.out.println(email + " " + phone + " " + pwd + " ");
        if (pwd.length() != 0){
            session.setAttribute("inputPassword", pwd);
        }
        code = teacherSevice.updateUserInfo(Long.valueOf(id), email, phone, pwd);
        return code;
    }

    /***
     * 根据时间和用户session中的用户ID查询任务报表
     * @param year 年
     * @param hyear 学期
     * @return
     */
    @RequestMapping(value = "userTaskQuery", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String userTaskQuery(String year, String hyear, HttpSession session) {
        Long id = Long.valueOf(String.valueOf(session.getAttribute("id")));
//        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : String.valueOf(Integer.parseInt(year) + 10) +"-08-01");
//        String dateStr2 = ("上学期".equals(hyear) ? year + "-08-01" : String.valueOf(Integer.parseInt(year) + 10) +
//                "-02-01");
        java.sql.Date date1 = java.sql.Date.valueOf("2010-02-01");
        java.sql.Date date2 = java.sql.Date.valueOf("2020-02-01");
        return teacherSevice.getUserTask(Long.valueOf(id), date1, date2);
    }

    /**
     * 获取未完成的任务信息
     * @param session
     * @return
     */
    @RequestMapping(value = "userNotFinish", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String userNotFinish(HttpSession session) {
        Long id = Long.valueOf(String.valueOf(session.getAttribute("id")));
//        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : String.valueOf(Integer.parseInt(year) + 10) +"-08-01");
//        String dateStr2 = ("上学期".equals(hyear) ? year + "-08-01" : String.valueOf(Integer.parseInt(year) + 10) +
//                "-02-01");
        java.sql.Date date1 = java.sql.Date.valueOf("2010-02-01");
        java.sql.Date date2 = java.sql.Date.valueOf("2020-02-01");
        return teacherSevice.getNotFinis(Long.valueOf(id), date1, date2);
    }

    /**
     * 查该老师任务列表
     * @param session
     * @return
     */
    @RequestMapping(value = "getTaskList", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String getTaskList(HttpSession session) {
        String json = teacherSevice.getTaskList(session.getAttribute("id")+"");
        return json;
    }

}
