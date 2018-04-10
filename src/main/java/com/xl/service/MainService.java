package com.xl.service;


import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface MainService {
    //返回数据库中用户数量和任务数量
    String QueryTeacherNumAndWorkNum();

    String VerificationLogin(String inputEmail, String inputPassword, String autoLogin, HttpSession httpSession, HttpServletResponse response);
}
