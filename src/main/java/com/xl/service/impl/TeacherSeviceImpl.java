package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.xl.entity.THngyNotice;
import com.xl.entity.THngyTeacherInfo;
import com.xl.repository.impl.MainRepositoryImpl;
import com.xl.repository.impl.TeacherRepositoryImpl;
import com.xl.service.TeacherService;
import com.xl.utils.MainUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TeacherSeviceImpl implements TeacherService {
    @Autowired
    MainRepositoryImpl mainRepository;

    @Autowired
    TeacherRepositoryImpl teacherRepository;
    /**
     * 以Json形式返回用户个人信息以及公告
     *
     * @param id HttpSession中的id
     * @return 返回ModelAndView数据
     */
    @Override
    public ModelAndView getUserHomePageInfo(Long id) {
        ModelAndView modelAndView = new ModelAndView("user");
        String hql = "from THngyNotice";
        List<Object> list = mainRepository.simpleQuery(null, hql);
        THngyNotice notice = (THngyNotice) list.get(list.size() - 1);
        //教研室名                       学院名          已经接工作数
        hql = "select staff.staffRoomName,department.departmentName,count (work.workTaskId) from THngyTeacherInfo as teacher,THngyStaffRoom as staff,THngyDepartment as department,THngyLink as link,THngyWorkTask as work where teacher.teacherId = ? and teacher.staffRoomId=staff.staffRoomId and staff.departmentId = department.departmentId and link.teacherId = ? and link.workTaskId = work.workTaskId";
        List<Object[]> list1= mainRepository.complexQuery(new Object[]{id,id},hql);
        Object[] otherInfo = list1.get(0);
        System.out.println(list1.size());
        //已完成工作数
        hql = "select count(work.workTaskSchedule)from THngyLink as link,THngyWorkTask as work where link.teacherId = ? and link.workTaskId = work.workTaskId and work.workTaskSchedule='已完成'";
        Object OK = mainRepository.singleQuery(new Object[]{id},hql);
        Object NO = Integer.parseInt(String.valueOf(otherInfo[2])) - Integer.parseInt(String.valueOf(OK));
        THngyTeacherInfo teacherInfo = teacherRepository.get(id);
        modelAndView.addObject("email", teacherInfo.getTeacherEmail());
        modelAndView.addObject("time", new SimpleDateFormat("yyyy年 MM月 dd日").format(new Date()));
        modelAndView.addObject("name", teacherInfo.getTeacherName());
        modelAndView.addObject("staffRoom", otherInfo[0]);
        modelAndView.addObject("department", otherInfo[1]);
        modelAndView.addObject("countWork", otherInfo[2]);
        modelAndView.addObject("OKWork", OK);
        modelAndView.addObject("NOWork", NO);
        modelAndView.addObject("notice", notice.getNoticeText());
        return modelAndView;
    }

    /**
     * 返回用户个人信息
     *
     * @param id HttpSession中的id
     * @return 返回ModelAndView数据
     */
    @Override
    public ModelAndView getUserInfo(Long id) {
        ModelAndView modelAndView = new ModelAndView("userinfo");
        THngyTeacherInfo teacherInfo = teacherRepository.get(id);
        modelAndView.addObject("id", id);
        modelAndView.addObject("email", teacherInfo.getTeacherEmail());
        modelAndView.addObject("name", teacherInfo.getTeacherName());
        modelAndView.addObject("phone", teacherInfo.getTeacherPhone());
        return modelAndView;
    }

    /**
     * 修改用户个人信息
     *
     * @param id    HttpSession中的id
     * @param email
     * @param phone
     * @param pwd
     * @return 返回状态码
     */
    @Override
    public String updateUserInfo(Long id, String email, String phone, String pwd) {
        THngyTeacherInfo teacherInfo = teacherRepository.get(id);
        teacherInfo.setTeacherEmail(email);
        teacherInfo.setTeacherPhone(phone);
        teacherInfo.setTeacherPassword(pwd.length()>0?pwd:teacherInfo.getTeacherPassword());
        return "201";
    }

    /***
     * 根据时间和用户session中的用户ID查询任务报表
     * @param id 用户id
     * @param date1 开始时间
     * @param date2 结束时间
     * @return json格式数据
     */
    @Override
    public String getUserTask(Long id, java.sql.Date date1, java.sql.Date date2) {
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work.workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink as link,THngyTeacherInfo as teacher where link.workTaskId = work.workTaskId and link.teacherId = teacher.teacherId and  teacher.teacherId ="+id+" and work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskTime desc";
        String json = JSONArray.toJSONString(MainUtil.getWorkInfoUtil(mainRepository.dateQuery(date1,date2,hql)));
        return json;
    }
}
