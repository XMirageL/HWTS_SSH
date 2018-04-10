package com.xl.controller;

import com.alibaba.fastjson.JSONArray;
import com.xl.dao.MainDao;
import com.xl.dao.MainDaoImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class TeacherAjaxController {
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
        //System.out.println(email+"\n"+phone+"\n"+pwd);
        String id = (String) session.getAttribute("id");
        MainDaoImpl dao = new MainDaoImpl();
        return dao.modifyUserInfo(id, email, phone, pwd);
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
        MainDao dao = new MainDaoImpl();
        Long id = Long.valueOf(String.valueOf(session.getAttribute("id")));
        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : "-08-01");
        String dateStr2 = ("上学期".equals(hyear) ? year + "-08-01" : String.valueOf(Integer.parseInt(year) + 1) + "-02-01");
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        //输出
        System.out.println(date1 + "\n" + date2);
        List<Map<String, Object>> list = dao.QueryUserTaskInfo(id, date1, date2);
        if (list == null) {
            return "101";
        }
        String json = JSONArray.toJSONString(list);
        System.out.println(json);
        return json;
    }
}
