package com.xl.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xl.entity.THngyAdminInfo;
import com.xl.entity.THngyDepartment;
import com.xl.repository.impl.AdminRepositoryImpl;
import com.xl.repository.impl.DepartmentRepositoryImpl;
import com.xl.repository.impl.MainRepositoryImpl;
import com.xl.repository.impl.SAdminRepositoryImpl;
import com.xl.service.SAdminService;
import com.xl.utils.Config;
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
    AdminRepositoryImpl AdminRepository;

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
        String sql = "SELECT a.adminInfoId as departmentId,a.adminInfoName as adminInfoName,b.departmentName as " +
                "departmentName,a.adminInfoPassWord as adminInfoPassWord,a.adminInfoEmail as adminInfoEmail,a" +
                ".adminInfoQq as adminInfoQq,a.adminInfoPhone as adminInfoPhone, a.departmentId as departmentID FROM " +
                "THngyAdminInfo as a," +
                "THngyDepartment as b WHERE a.departmentId = b.departmentId ORDER BY a.adminInfoId";
        List<Object> list = mainRepository.simpleQuery(null, sql);
        return JSONArray.toJSONString(list);
    }

    /***
     * 添加管理员
     * @return
     */
    @Override
    public String addAdmin(String department, String sadmin_name, String sadmin_pwd, String sadmin_email, String qq,
                           String sadmin_phone) {
        String code = Config.Code124;
        List<THngyAdminInfo> tHngyAdminInfos = adminRepository.findAll();
        for (int i = 0; i < tHngyAdminInfos.size(); i++) {
//            if (tHngyAdminInfos.get(i).getAdminInfoName().equals(sadmin_name)) {
//                    return Config.Code121;
//            }
            if (tHngyAdminInfos.get(i).getAdminInfoEmail().equals(sadmin_email)) {
                return Config.Code122;
            } else if (tHngyAdminInfos.get(i).getAdminInfoQq().equals(qq)) {
                return Config.Code123;
            }
        }
        THngyAdminInfo tHngyAdminInfo = new THngyAdminInfo();
        tHngyAdminInfo.setDepartmentId(Long.parseLong(department));
        tHngyAdminInfo.setAdminInfoName(sadmin_name);
        tHngyAdminInfo.setAdminInfoPassWord(sadmin_pwd);
        tHngyAdminInfo.setAdminInfoEmail(sadmin_email);
        tHngyAdminInfo.setAdminInfoQq(qq);
        tHngyAdminInfo.setAdminInfoPhone(sadmin_phone);
        if (mainRepository.save(tHngyAdminInfo) != 0) {
            return Config.Code120;
        }
        return code;
    }

    /***
     * 条件查找管理员
     * @param find_name
     * @param find_select
     * @return
     */
    @Override
    public String findAdmin(String find_name, String find_select) {
        System.out.println("::::::::" + find_name + "::::::::" + find_select);
        String code = Config.NO;
        List<Object[]> list = new LinkedList<>();
        if (find_name.length() == 0 && Integer.parseInt(find_select) > 0) {
            //无名字 有系部
//            String hql = "SELECT * FROM THngyAdminInfo as a WHERE  a.departmentId = ? ORDER BY a.adminInfoId";
            String sql = "from THngyAdminInfo as a where a.departmentId = ? ";
            Long long_find_select = Long.parseLong(find_select);
            list = mainRepository.complexQuery(new Object[]{long_find_select}, sql);
        } else if (Integer.parseInt(find_select) == 0 && find_name.length() > 0) {
            //有名字 无系部 = 全校查
            String sql = "from THngyAdminInfo as a where a.adminInfoName = ? ";
            list = mainRepository.complexQuery(new Object[]{find_name}, sql);
        } else if (Integer.parseInt(find_select) > 0 && find_name.length() > 0) {
            //有名字 有系部 = 避免不同系同名
            String sql = "from THngyAdminInfo as a where a.adminInfoName = ? and a.departmentId = ?";
            Long long_find_select = Long.parseLong(find_select);
            list = mainRepository.complexQuery(new Object[]{find_name, long_find_select}, sql);
        }
        code = JSONArray.toJSONString(list);
        JSONObject jsonObject = new JSONObject();
        if (code.equals("[]")) {
            jsonObject.put("code", Config.NULL);
        } else {
            jsonObject.put("code", Config.OK);
        }
        jsonObject.put("msg", code);
        code = jsonObject.toJSONString();
        return code;
    }

    /***
     * 更新管理员资料
     * @param tHngyAdminInfo
     * @return
     */
    @Override
    public String updateAdmin(THngyAdminInfo tHngyAdminInfo) {
        mainRepository.update(tHngyAdminInfo);
        return Config.Code200;
    }

    /***
     * 批量删除管理
     * @param text
     * @return
     */
    @Override
    public String deleteAdmin(String text) {

        String[] ss = text.split(",");
        for (int i = 0; i < ss.length; i++) {
            adminRepository.delete(Long.parseLong((ss[i])));
        }
//        System.out.println(ob.toString());
        return Config.Code200;
    }
}
