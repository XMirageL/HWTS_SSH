package com.xl.service.impl;

import com.xl.entity.THngyNotice;
import com.xl.entity.THngyTeacherInfo;
import com.xl.repository.impl.MainRepositoryImpl;
import com.xl.repository.impl.TeacherRepositoryImpl;
import com.xl.service.TeacherService;
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
}
