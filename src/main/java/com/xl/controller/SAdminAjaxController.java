package com.xl.controller;

import com.xl.entity.THngyAdminInfo;
import com.xl.service.impl.SAdminServiceImpl;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SAdminAjaxController {

    @Autowired
    SAdminServiceImpl sAdminService;

    /***
     * 进入超管页面
     * @return
     */
    @GetMapping(value = "/sadmin")
    public String sadmin() {

        return "sadmin";
    }

    /***
     * 获取当前所有系部
     * @return
     */
    @GetMapping(value = "/sadmin_getInfo_departments", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_getInfo_departments() {
        String args = sAdminService.getAllDepartment();
        return args;
    }

    /***
     * 获取所有管理员的信息
     * @return
     */
    @GetMapping(value = "/sadmin_getInfo_admin", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_getInfo_admin() {
        String args = sAdminService.getAllAdmin();
        return args;
    }

    /***
     * 添加管理员POST
     * @return
     */
    @RequestMapping(value = "/sadmin_addadmin", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_addadmin(String department, String sadmin_name, String sadmin_pwd, String sadmin_email,
                                  String qq, String sadmin_phone) {
        String code = Config.Code124;
        code = sAdminService.addAdmin(department, sadmin_name, sadmin_pwd, sadmin_email,
                qq, sadmin_phone);
        return code;
    }

    /***
     * 条件查找管理员
     * @return
     */
    @RequestMapping(value = "/sadmin_findadmin", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_findadmin(String find_name, String find_select) {
        String code = "{\n" +
                "    \"code\": \"201\",\n" +
                "    \"mes\": \"\"\n" +
                "}";
        code = sAdminService.findAdmin(find_name, find_select);
        return code;
    }

    /***
     * 更新管理员信息
     * @param id
     * @param dep
     * @param name
     * @param pwd
     * @param email
     * @param qq
     * @param phone
     * @return
     */
    @RequestMapping(value = "/sadmin_update", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_update(String id, String dep, String name, String pwd, String email, String qq,
                                String phone) {
        String code = Config.Code201;
        THngyAdminInfo tHngyAdminInfo = new THngyAdminInfo();
        System.out.println(":::::::::" + id);
//        System.out.println(":::::::::" + session.getAttribute("id"));
        tHngyAdminInfo.setAdminInfoId(Long.parseLong(id));
        tHngyAdminInfo.setDepartmentId(Long.parseLong(dep));
        tHngyAdminInfo.setAdminInfoName(name);
        tHngyAdminInfo.setAdminInfoPassWord(pwd);
        tHngyAdminInfo.setAdminInfoEmail(email);
        tHngyAdminInfo.setAdminInfoQq(qq);
        tHngyAdminInfo.setAdminInfoPhone(phone);
        code = sAdminService.updateAdmin(tHngyAdminInfo);
        return code;
    }

    /***
     * 批量删除
     * @param text
     * @return
     */
    @RequestMapping(value = "/sadmin_del", produces = "text/html;charset=UTF-8;")
    @ResponseBody//表示直接输出返回内容，不进行jsp或html跳转，本例是为了写接口，这里直接返回json
    public String sadmin_del(String text) {
        String code = Config.Code201;
        code = sAdminService.deleteAdmin(text);
        return code;
    }
}
