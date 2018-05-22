package com.xl.controller;

import com.xl.service.impl.AdminServiceImpl;
import com.xl.utils.Config;
import com.xl.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    /***
     * 显示管理员首页信息
     * @return
     */
    @GetMapping(value = "/admin")
    public String admin() {
        return "admin";
    }


    /***
     * 管理员发布任务的页面
     * @param req
     * @return
     */
    @GetMapping(value = "/adminissue")
    public String adminissue(HttpServletRequest req, HttpSession session) {
        //获取当前时间
        String time = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        int M = Integer.parseInt((String) time.subSequence(5, 7));
        int Y = Integer.parseInt((String) time.subSequence(0, 4));
        String dateStr1 = null;
        String dateStr2 = null;
        if (M < 2 && M > 8)//下学期
        {
            dateStr1 = String.valueOf(Y) + "-08-01";
            dateStr2 = String.valueOf(Y + 1) + "-02-01";
        } else//上学期
        {
            dateStr1 = String.valueOf(Y) + "-02-01";
            dateStr2 = String.valueOf(Y) + "-08-01";

        }
        //将字符串转为数据库能识别的时间
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        System.out.println(date1 + "\n" + date2);

        req.setAttribute("allTeacherInfo", adminService.teacherReportsQuery("" + session.getAttribute("department"),
                date1, date2));
        return "adminissue";
    }

    /***
     * 下载任务详情表
     * @param response
     * @param year 年
     * @param hyear 学期
     * @return
     */
    @RequestMapping(value = "/downloadTask")
    public void downloadTask(HttpServletResponse response, HttpSession session, String year, String hyear, String
            year_1, String hyear_1) {
        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : "-08-01");
        String dateStr2 = year_1 + ("上学期".equals(hyear_1) ? "-02-01" : "-08-01");
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        //输出
        System.out.println("下载" + date1 + "~" + date2 + "任务详情表");
        String fileName = year + hyear + "任务详情表";
        String columnNames[] = {"时间(年/月/日)", "任务名称", "所属教师", "状态"};// 列名
        String keys[] = {"taskDate", "taskName", "teachers", "taskState"};// map中的key
        adminService.downloadReports(response, adminService.taskReportsQuery(session.getAttribute("department") + "",
                date1, date2), fileName, columnNames,
                keys);
    }

    /***
     * 下载教师详情表
     * @param response
     * @param year 年
     * @param hyear 学期
     * @return
     */
    @RequestMapping(value = "/downloadTeacher")
    public void downloadTeacher(HttpServletResponse response, HttpSession session, String year, String
            hyear) {
        String dateStr1 = year + ("上学期".equals(hyear) ? "-02-01" : "-08-01");
        String dateStr2 = ("上学期".equals(hyear) ? year + "-08-01" : String.valueOf(Integer.parseInt(year) + 1) +
                "-02-01");
        java.sql.Date date1 = java.sql.Date.valueOf(dateStr1);
        java.sql.Date date2 = java.sql.Date.valueOf(dateStr2);
        //输出
        System.out.println("下载" + date1 + "~" + date2 + "教师详情表");
        String fileName = year + hyear + "教师详情表";
        String columnNames[] = {"ID", "姓名", "已安排任务数", "未完成数"};// 列名
        String keys[] = {"teacherId", "teacherName", "taskCount", "unfinished"};// map中的key
        adminService.downloadReports(response, adminService.teacherReportsQuery("" + session.getAttribute
                        ("department"), date1, date2), fileName, columnNames,
                keys);
    }


    /**
     * Excel批量注册
     * NOTE:THngyImportInfo 为教师用户信息实体类，追加字符段需要修改此实体类
     * 并需要在 选择插入判断 处对应修改
     *
     * @param request
     */
    @RequestMapping("fileupload")
    @ResponseBody
    public String fileupload(HttpServletRequest request) {
        String filePath = FileUtil.upload(request, "temp/excel");
        String statusCode = Config.Code201;
        if (filePath != null) {
            statusCode = adminService.importExcelInfo(filePath);
        }
        if (!FileUtil.delete(filePath)) {
            System.out.println("删除临时文件失败");
        }
        return statusCode;
    }

    /***
     * Excel批量导入页面
     * @return
     */
    @RequestMapping(value = "/importInfo")
    public String importInfo() {

        return "importInfo";
    }

    @GetMapping(value = "adminquery")
    public String adminquery() {
        return "adminquery";
    }
}
