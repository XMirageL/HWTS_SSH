package com.xl.controller;


import com.alibaba.fastjson.JSONArray;
import com.xl.dao.MainDao;
import com.xl.dao.MainDaoImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class TeacherController {

    @GetMapping(value = "/teacherInfo")
    public String teacherInfo() {
        return "teacherInfo";
    }
    /***
     * 显示用户登录的首页，同时查询用户的基本信息和网站公告
     * @param httpSession
     * @return
     */
    @GetMapping(value = "/user")
    public ModelAndView user(HttpSession httpSession) {
        String email = (String) httpSession.getAttribute("inputEmail");
        String id = String.valueOf(httpSession.getAttribute("id"));
        MainDaoImpl mainDao = new MainDaoImpl();
        Object[] objects = mainDao.QueryPersonalHomepageInformation(id);
        String notic = mainDao.QueryNotice();
        ModelAndView modelAndView = new ModelAndView("user");
        modelAndView.addObject("email", email);
        modelAndView.addObject("time", new SimpleDateFormat("yyyy年 MM月 dd日").format(new Date()));
        modelAndView.addObject("name", objects[0]);
        modelAndView.addObject("staffRoom", objects[1]);
        modelAndView.addObject("department", objects[2]);
        modelAndView.addObject("countWork", objects[3]);
        modelAndView.addObject("OKWork", objects[4]);
        modelAndView.addObject("NOWork", objects[5]);
        modelAndView.addObject("notice", notic);
        return modelAndView;
    }

    /***
     * 用户信息页面，查询用户个人的基本信息
     * @param httpSession
     * @return
     */
    @GetMapping(value = "/userinfo")
    public ModelAndView userinfo(HttpSession httpSession) {
        String id = String.valueOf(httpSession.getAttribute("id"));
        ModelAndView modelAndView = new ModelAndView("userinfo");
        MainDaoImpl mainDao = new MainDaoImpl();
        Object[] objects = mainDao.QueryUserInfo(id);
        modelAndView.addObject("id", id);
        modelAndView.addObject("email", objects[2]);
        modelAndView.addObject("name", objects[0]);
        modelAndView.addObject("phone", objects[1]);
        return modelAndView;
    }

    /**
     * 显示用户的任务页面
     *
     * @return
     */
    @GetMapping(value = "/userplan")
    public ModelAndView userplan() {
        ModelAndView modelAndView = new ModelAndView("userplan");

        return modelAndView;
    }


}
