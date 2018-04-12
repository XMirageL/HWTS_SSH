package com.xl.service;

import org.springframework.web.servlet.ModelAndView;

public interface TeacherService {
    /**
     * 以Json形式返回用户个人信息以及公告
     *
     * @param id HttpSession中的id
     * @return 返回ModelAndView数据
     */
    ModelAndView getUserHomePageInfo(Long id);
}
