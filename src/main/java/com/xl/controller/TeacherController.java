package com.xl.controller;


import com.xl.dao.MainDaoImpl;
import com.xl.service.impl.TeacherSeviceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class TeacherController {

    @Autowired
    TeacherSeviceImpl teacherSevice;
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
        String id = String.valueOf(httpSession.getAttribute("id"));
        return teacherSevice.getUserHomePageInfo(Long.valueOf(id));
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
