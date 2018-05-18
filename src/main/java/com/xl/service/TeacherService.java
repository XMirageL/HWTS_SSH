package com.xl.service;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.sql.Date;

public interface TeacherService {
    /**
     * 返回用户个人信息以及公告
     *
     * @param id HttpSession中的id
     * @return 返回ModelAndView数据
     */
    ModelAndView getUserHomePageInfo(HttpSession session, Long id);
    /**
     * 返回用户个人信息
     *
     * @param id HttpSession中的id
     * @return 返回ModelAndView数据
     */
    ModelAndView getUserInfo(Long id);

    /**
     * 修改用户个人信息
     *
     * @param id HttpSession中的id
     * @return 返回状态码
     */
    String updateUserInfo(Long id,String email, String phone, String pwd);
    /***
     * 根据时间和用户session中的用户ID查询任务报表
     * @param id 用户id
     * @param date1 开始时间
     * @param date2 结束时间
     * @return json格式数据
     */
    String getUserTask(Long id, Date date1,Date date2);
}
