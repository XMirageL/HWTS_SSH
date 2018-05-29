package com.xl.controller;

import com.xl.service.impl.AdminServiceImpl;
import com.xl.service.impl.MainServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

/***
 * 本类主要是用来查询数据再显示视图的，任何需要显示视图的页面都需要通过本类显示，不可以直接跳转过去
 * author:臧胜
 */
@Controller
public class MainController {
    @Autowired
    private AdminServiceImpl adminService;

    @Autowired
    private MainServiceImpl mainService;
    private Logger logger = LogManager.getLogger("sys_out");

    /***
     * 显示首页
     */
    @GetMapping(value = "")
    public String index() {
        return "index";
    }


    /***
     * 显示登录页面
     * @return 登录页面的路径
     */
    @GetMapping(value = "/login")
    public String login(HttpServletRequest request, HttpSession session, HttpServletResponse response) {
        String userType = "";
        String userName = "";
        String userPwd = "";
        boolean flag = false;
        // 获得当前路径以及"直接父路径"的所有Cookie对象,如果没有任何Cookie的话,则返回null
        Cookie[] cookies = request.getCookies();

        // 遍历数组,获得具体的Cookie
        if (cookies != null) {

            for (Cookie cookie : cookies
                    ) {
                // 获得Cookie的名称
                String name = cookie.getName();
                String value = cookie.getValue();
                if (name.equals("userName")) {
                    userName = value;
                } else if (name.equals("userPwd")) {
                    userPwd = value;
                } else if (name.equals("userType")) {
                    userType = value;
                }

            }
            if (userName.length() > 0 && userPwd.length() > 0) {
                String sCode = mainService.VerificationLogin(userName, userPwd, "0", session, response);
                if (!sCode.equals("101")) {
                    flag = true;
                    logger.debug("用户自动登录成功 UserType:" + userType);
                } else {
                    loginOut(session, request, response);
                    return "redirect:notLogin";
                }
            }

            if (flag) {
                if (userType.equals("0")) {
                    return "redirect:admin";
                } else if (userType.equals("1")) {
                    return "redirect:user";
                } else {
                    return "redirect:admin";
                }
            }

        }
        return "login";
    }

    /***
     * 退出登录
     * @return 主页的路径
     */
    @RequestMapping("loginOut")
    public String loginOut(HttpSession httpSession, HttpServletRequest request, HttpServletResponse response) {
        // 获得当前路径以及"直接父路径"的所有Cookie对象,如果没有任何Cookie的话,则返回null
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies
                ) {
            // 获得Cookie的名称
//            String name = cookie.getName();
//            String value = cookie.getValue();
//            System.out.println(name+"_____"+value);
            // 清除
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
        httpSession.invalidate();
        return "redirect:/";
    }

    /**
     * 根据用户类型返回相应的界面
     */
    @GetMapping(value = "/taskInfo")
    public String taskInfo(HttpSession session,HttpServletRequest req) {
        String userType = (String) session.getAttribute("userType");

        if (userType.equals("0")) {
            //获取当前时间
            String time = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            int M = Integer.parseInt((String) time.subSequence(5, 7));
            int Y = Integer.parseInt((String) time.subSequence(0, 4));
            String dateStr1 = null;
            String dateStr2 = null;
            if (M < 2 && M > 8)//下学期
            {
                dateStr1 = String.valueOf(Y) + "-08-01";
                dateStr2 = String.valueOf(Y + 1) + "-02-01";
            } else//上学期
            {
                dateStr1 = String.valueOf(Y) + "-02-01";
                dateStr2 = String.valueOf(Y) + "-08-01";
            }
            //将字符串转为数据库能识别的时间
            java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
            java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
            System.out.println(date1 + "\n" + date2);

            req.setAttribute("allTeacherInfo", adminService.teacherReportsQuery("" + session.getAttribute("department"),
                    date1, date2, ""));
            return "taskInfo_admin";
        } else {
            return "taskInfo_user";
        }
    }

    /**
     * 404页面
     */
    @GetMapping(value = "/404")
    public String Error404(HttpSession session) {

        return "404";

    }

    /**
     * TEST测试
     */
    @GetMapping(value = "/test")
    public String testNew(HttpSession session) {

        return "test";

    }

    @GetMapping(value = "notLogin")
    public String notLogin(HttpServletRequest request) {
        return "notLogin";
    }


}