package com.xl.controller;

import com.xl.service.impl.AdminServiceImpl;
import com.xl.service.impl.SAdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
        System.out.println(args);
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
        System.out.println(args);
        return args;
    }
}
