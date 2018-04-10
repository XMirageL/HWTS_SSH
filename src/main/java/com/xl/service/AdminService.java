package com.xl.service;

import org.springframework.http.HttpRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface AdminService {
    /**
     * 以Json形式返回管理员个人信息以及公告
     *
     * @param id HttpSession中的id
     * @return 返回json格式的数据
     */
    String getAdminHomePageInfo(String id);

    /**
     * 以Json形式返回管理员主页最近任务信息
     * @return 返回json格式的数据
     */
    String getAdminHomePageInfo();

    /**
     * 修改管理员信息
     * @param id 管理员基本信息
     * @return 返回CONFIG类中的状态码
     */
    String updateAdminInfo(String id,String email, String qq, String pwd);

    /***
     * 修改公告
     * @param notice 公告内容
     * @return 返回状态码200成功，201失败
     */
    String updateNotice(String notice);


    /***
     * 获取全部教师当前学期工作状态
     * 将List放入request中,前台调用
     */
    void getTeacherWrokStatus(HttpServletRequest req);

    /***
     * Excel批量注册 教师信息
     *
     * @param filePath
     * @return
     */
    String importExcelInfo(String filePath);

    /***
     * 发布任务
     * @param workName 任务标题
     * @param workText 任务详情
     * @param teacher 管理员指定的多个教师,以","隔开
     * @param qq 发布任务的管理员的qq
     * @return
     */
    String saveTaskTeacherLinkInfo(String workName, String teacher, String workText, String qq);

    /**
     * 根据id获取任务数据
     * @return json数据
     */
    String getTaskInfoForAdmin(long id);
}
