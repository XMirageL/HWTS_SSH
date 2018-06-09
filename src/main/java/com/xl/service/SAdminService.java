package com.xl.service;

import com.xl.entity.THngyAdminInfo;

public interface SAdminService {

    /***
     * 获取当前所有系部
     *
     * @return
     */
    String getAllDepartment();

    /***
     * 获取所有管理员信息
     * @return
     */
    String getAllAdmin();

    /***
     * 添加管理员
     * @return
     */
    String addAdmin(String department, String sadmin_name, String sadmin_pwd, String sadmin_email, String qq, String sadmin_phone);

    /***
     * 条件查找管理员
     * @param find_name
     * @param find_select
     * @return
     */
    String findAdmin(String find_name, String find_select);

    /***
     * 更新管理员资料
     * @param tHngyAdminInfo
     * @return
     */
    String updateAdmin(THngyAdminInfo tHngyAdminInfo);

    /***
     * 批量删除管理
     * @param text
     * @return
     */
    String deleteAdmin(String text);

    /**
     * 增加系部
     * @param dep_name
     * @return
     */
    String addDepartment(String dep_name);

    String getDepartment();

    String updateDepartment(String dep_name, String dep_id);


}
