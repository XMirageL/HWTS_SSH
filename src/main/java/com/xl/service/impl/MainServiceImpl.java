package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xl.entity.THngyTeacherInfo;
import com.xl.repository.MainRepository;
import com.xl.repository.TeacherRepository;
import com.xl.service.MainService;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private MainRepository mainRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    //返回数据库中用户数量和任务数量
    @Override
    public String QueryTeacherNumAndWorkNum() {
        List<Long> list = new ArrayList<>();
        String hql1 = "select count (*) from THngyTeacherInfo";
        String hql2 = "select count (*) from THngyWorkTask";
        list.add((long) mainRepository.singleQuery(hql1));
        list.add((long) mainRepository.singleQuery(hql2));
        Map map = new HashMap();
        map.put("teacherNum", list.get(0));
        map.put("workNum", list.get(1));
        String json = JSONArray.toJSONString(map);
        return json;
    }


    /**
     * 判断管理员或者用户名和密码是否匹配
     *
     * @param inputEmail    普通用户输入的是邮箱号，管理员是输入的用户名
     * @param inputPassword 密码
     * @param httpSession   把查询到用户或管理员信息存到session里，以便拦截某些需要登录的页面
     * @return 返回一个状态码（在utils包里的Config类里都这些状态码）
     */
    @Override
    public String VerificationLogin(String inputEmail, String inputPassword, String autoLogin, HttpSession
            httpSession, HttpServletResponse response) {
        System.out.println("自动登录:" + inputEmail + " " + inputPassword);
        if (inputEmail == null || inputPassword == null)//如果邮箱或密码为空，直接结束
        {
            return null;
        }
        Object[] objects = {inputEmail, inputPassword};

        //默认返回登录失败代码
        String code = Config.Code101;
        String userType = "1";
        Object userid = null;
        String userdep = "0";
        //判断是不是管理员登录
        if (inputEmail.length() > 7) {
            if (inputEmail.substring(0, 5).equals("admin")) {
                String hql = "select adminInfoId,departmentId from THngyAdminInfo  where adminInfoName = ? and " +
                        "adminInfoPassWord=?";
                Object text = mainRepository.singleQuery(objects, hql);
                if (!JSONObject.toJSONString(text).equals("null")) {
                    JSONArray jsonArray = JSONArray.parseArray(JSONObject.toJSONString(text));
                    userid = jsonArray.getString(0);
                    userdep = jsonArray.getString(1);
                    code = Config.Code103;
                    userType = "0";
                }
            }
        } else if (inputEmail.length() > 2) {
            if (inputEmail.length() >= 6) {
                if (inputEmail.substring(0, 6).equals("SAdmin")) {
                    System.out.println("进入超管判断登录");
                    String hql = "select a.sAdminId from THngySAdminInfo as a where a.sAdminName = ? and a" +
                            ".sAdminPassWord= ?";
                    userid = mainRepository.singleQuery(objects, hql);
                    if (userid != null) {
                        code = Config.Code104;
                        userType = "9";
                    }
                }
            } else {
                System.out.println("进入老师判断登录");
                String hql = "select a.teacherId, b.departmentId from THngyTeacherInfo as a, THngyStaffRoom as b " +
                        "where a.teacherName = ? and a.teacherPassword = ? and a.staffRoomId = b.staffRoomId";
                Object text = mainRepository.singleQuery(objects, hql);
                if (!JSONObject.toJSONString(text).equals("null")) {
                    JSONArray jsonArray = JSONArray.parseArray(JSONObject.toJSONString(text));
                    userid = jsonArray.getString(0);
                    userdep = jsonArray.getString(1);
                    code = Config.Code100;
                    userType = "1";
                }
            }
        }

        //判断数据库是否有数据返回
        if (userid != null) {
            if (autoLogin.equals("1")) {
                Cookie cookieName = new Cookie("userName", inputEmail);
                Cookie cookiePwd = new Cookie("userPwd", inputPassword);
                Cookie cookieType = new Cookie("userType", userType);
                cookieName.setMaxAge(60 * 60 * 24 * 7);
                cookiePwd.setMaxAge(60 * 60 * 24 * 7);
                cookieType.setMaxAge(60 * 60 * 24 * 7);
                response.addCookie(cookieType);
                response.addCookie(cookieName);
                response.addCookie(cookiePwd);
            }
            httpSession.setAttribute("id", userid);
            httpSession.setAttribute("inputEmail", inputEmail);
            httpSession.setAttribute("inputPassword", inputPassword);
            httpSession.setAttribute("userType", userType);//0为管理员
            httpSession.setAttribute("department", userdep);//系部 超管该值为0
        }
        return code;
    }

    /**
     * 根据id获取用户数据
     *
     * @param id 用户id
     * @return json
     */
    @Override
    public String getTeacherInfo(Long id) {
        THngyTeacherInfo teacherInfo = teacherRepository.get(id);
        String json = JSONArray.toJSONString(teacherInfo);
        return json;
    }
}
