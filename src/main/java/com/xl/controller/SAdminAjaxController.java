package com.xl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SAdminAjaxController {

    /***
     * 进入超管页面
     * @return
     */
    @GetMapping(value = "/sadmin")
    public String sadmin() {
        return "sadmin";
    }
}
