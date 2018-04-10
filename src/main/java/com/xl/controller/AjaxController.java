package com.xl.controller;

import com.xl.dao.MainDao;
import com.xl.dao.MainDaoImpl;
import com.alibaba.fastjson.JSONArray;
import com.xl.service.MainService;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;


import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;


/***
 * 本类主要处理显示视图的业务，如验证用户登录信息，或者前端需要查询的某些数据，一般是通过ajax发请求过来，根据需求返回数据
 * author:徐磊
 */
@Controller
public class AjaxController {

    @Autowired
    private MainService mainService;



    /**
     * 主页数据
     *
     * @return
     */
    @RequestMapping(value = "getInfo/indexInfo")
    @ResponseBody
    public String getIndexInfo() {
        return mainService.QueryTeacherNumAndWorkNum();
    }


    /**
     * 判断管理员或者用户名和密码是否匹配
     *
     * @param inputEmail    普通用户输入的是邮箱号，管理员是输入的用户名
     * @param inputPassword 密码
     * @param httpSession   把查询到用户或管理员信息存到session里，以便拦截某些需要登录的页面
     * @return 返回一个状态码（在utils包里的Config类里都这些状态码）
     */
    @RequestMapping(value = "/VerificationLogin")
    @ResponseBody
    public String VerificationLogin(String inputEmail, String inputPassword, String autoLogin, HttpSession httpSession, HttpServletResponse response) {

        return mainService.VerificationLogin(inputEmail, inputPassword, autoLogin, httpSession, response);
    }


}
