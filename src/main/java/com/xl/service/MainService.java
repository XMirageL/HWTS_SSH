package com.xl.service;


import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface MainService {
    //返回数据库中用户数量和任务数量
    String QueryTeacherNumAndWorkNum();

    /**
     * 判断管理员或者用户名和密码是否匹配
     *
     * @param inputEmail    普通用户输入的是邮箱号，管理员是输入的用户名
     * @param inputPassword 密码
     * @param httpSession   把查询到用户或管理员信息存到session里，以便拦截某些需要登录的页面
     * @return 返回一个状态码（在utils包里的Config类里都这些状态码）
     */
    String VerificationLogin(String inputEmail, String inputPassword, String autoLogin, HttpSession httpSession, HttpServletResponse response);

    /**
     * 根据id获取用户数据
     *
     * @return
     */
    String getTeacherInfo(Long id);
}
