package com.xl.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;
import  com.xl.entity.*;

/**
 * 操作数据库的接口
 * author:臧胜
 */
public interface MainDao
{

    /***
     * 查询普通用户主页的基本信息
     * @param id id
     * @return 返回object数组类型的查询结果
     */
    public Object[] QueryPersonalHomepageInformation(String id);

    /***
     * 查询管理员主页预览任务
     * @return 返回list集合类型查询结果
     */
    public List<Map<String, Object>> QueryPersonalAdminWorkHomepageInformation(Date date1, Date date2);

    /***
     * 普通用户查询自己参与的工作
     * @param id
     * @param year
     * @param term
     * @return
     */
    public List<Map<String, Object>> QueryUserParticipationWork(String id, String year, String term);


    /***
     * 查询网站的公告
     * @return 返回公告内容
     */
    public String QueryNotice();

    /***
     * 修改公告
     * @param notice 公告内容
     * @return 是否修改成功
     */
    public String modifyNotice(String notice);

    /***
     * 修改管理员信息
     * @param id 管理员id
     * @param email 管理员邮箱
     * @param qq 管理员qq
     * @param pwd 管理员密码
     * @return 返回一个状态码
     */
    public String modifyAdminInfo(String id, String email, String qq, String pwd);

    /***
     * 查询用户基本信息
     * @param id
     * @return
     */
    public Object[] QueryUserInfo(String id);

    /***
     * 修改用户信息
     * @param id 用户id
     * @param email 用户email
     * @param phone 用户手机
     * @param pwd 用户密码
     * @return 状态码
     */
    public String modifyUserInfo(String id, String email, String phone, String pwd);

    /***
     * 查询用户用户的id，名字，已接工作数，未完成工作数，以便管理员发布任务
     * @return
     */
    public List<Map<String, Object>> QueryUserID_Name_WorkCount(Date date1, Date date2);

    /***
     * 发布任务，把任务写入数据库
     * @param teacherId 参与工作的id
     * @param tHngyWorkTask 工作表实体类
     * @return
     */
    public String insertIssueTasks(List<Long> teacherId, THngyWorkTask tHngyWorkTask);

    /***
     * 根据用户名查询用户Id
     * @param teacherName
     * @return
     */
    public Long QueryUserIdByName(String teacherName);


    /***
     * 根据id查任务信息
     * @param id
     * @return
     */
    public List<Map<String, Object>> QueryTaskInfo(Long id);


    /***
     * 更新任务数据
     * @param tHngyWorkTask 任务对象
     * @return
     */
    public String updataTask(THngyWorkTask tHngyWorkTask);


    /***
     * 查询用户最近任务数据
     * @param id 任务对象
     * @param date1
     * @param date2
     * @return
     */
    public List<Map<String, Object>> QueryUserTaskInfo(Long id, Date date1,Date date2);


}
