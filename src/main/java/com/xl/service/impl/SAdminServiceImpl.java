package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.xl.entity.THngyDepartment;
import com.xl.repository.impl.AdminRepositoryImpl;
import com.xl.repository.impl.DepartmentRepositoryImpl;
import com.xl.repository.impl.MainRepositoryImpl;
import com.xl.repository.impl.SAdminRepositoryImpl;
import com.xl.service.SAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class SAdminServiceImpl implements SAdminService {
    @Autowired
    MainRepositoryImpl mainRepository;

    @Autowired
    SAdminRepositoryImpl sAdminRepository;

    @Autowired
    DepartmentRepositoryImpl departmentRepository;

    @Autowired
    AdminRepositoryImpl adminRepository;

    /***
     * 获取当前所有系部
     *
     * @return
     */
    @Override
    public String getAllDepartment() {
//        String sql = "select a.departmentName from THngyDepartment as a ";
//        String sstring = mainRepository.singleQuery(sql).toString();
        List<THngyDepartment> tHngyDepartments = new LinkedList<>();
        tHngyDepartments = departmentRepository.findAll();
        return JSONArray.toJSONString(tHngyDepartments);
    }

    /***
     * 获取所有管理员信息
     * @return
     */
    @Override
    public String getAllAdmin() {
        String sql = "SELECT a.departmentId as departmentId,a.adminInfoName as adminInfoName,b.departmentName as departmentName,a.adminInfoPassWord as adminInfoPassWord,a.adminInfoEmail as adminInfoEmail,a.adminInfoQq as adminInfoQq,a.adminInfoPhone as adminInfoPhone FROM THngyAdminInfo as a,THngyDepartment as b WHERE a.departmentId = b.departmentId";
        List<Object> list = mainRepository.simpleQuery(null, sql);
        return JSONArray.toJSONString(list);
    }
}
