package com.xl.controller;

import com.xl.service.impl.TeacherSeviceImpl;
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
    TeacherSeviceImpl teacherSevice;

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
        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : "-08-01");
        String dateStr2 = ("上学期".equals(hyear) ? year + "-08-01" : String.valueOf(Integer.parseInt(year) + 1) +
                "-02-01");
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        return teacherSevice.getUserTask(Long.valueOf(id), date1, date2);
    }
}
