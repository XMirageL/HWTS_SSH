package com.xl.utils;

import com.alibaba.fastjson.JSONObject;
import com.xl.entity.WorkInfo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class MainUtil {
    public static List<Map<String, Object>> getWorkInfoUti_main(List<Object[]> listWork, Object[] objects) {
        WorkInfo workInfo = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < listWork.size(); ++i) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            for (int k = 0; k < objects.length; k++) {
                map.put(objects[k] + "", object1[k].toString());
            }
            list.add(map);
        }
        return list;
    }


    public static List<Map<String, Object>> getWorkInfoUti5(List<Object[]> listWork, Object[] objects) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = new HashMap<String, Object>();
        Object[] object1 = listWork.get(0);

        map.put("taskId", object1[0].toString());
        map.put("taskDate", String.valueOf(object1[1]).substring(0, String.valueOf(object1[1]).length() - 2));
        String tName = "";
        String tId = "";
        for (int i = 0; i < listWork.size(); i++) {
            Object[] objects2 = listWork.get(i);
            tName += objects2[3];
            tName += ",";
            tId += objects2[5];
            tId += ",";
        }
        map.put("taskName", object1[2].toString());
        map.put("teachers", tName.substring(0, tName.length() - 1));
        map.put("teachersId", tId.substring(0, tId.length() - 1));
        map.put("taskState", object1[4].toString());
        map.put("qq", object1[6].toString());
        map.put("taskText", object1[7].toString());
        map.put("kindId", object1[9].toString());
        map.put("kindText", object1[8].toString());
        map.put("taskDate1", String.valueOf(object1[10]).substring(0, String.valueOf(object1[10]).length() - 2));
        if (object1[11] == null) {
            map.put("taskDate2", "");
        } else {
            map.put("taskDate2", String.valueOf(object1[11]).substring(0, String.valueOf(object1[11]).length() - 2));
        }
        map.put("taskDate3", String.valueOf(object1[12]).substring(0, String.valueOf(object1[12]).length() - 2));
        list.add(map);

        return list;
    }

    public static List<Map<String, Object>> getWorkInfoUtil(List<Object[]> listWork) {
        WorkInfo workInfo = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Object flag = null;
        for (int i = 0; i < listWork.size(); ++i) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            flag = object1[0];
            workInfo = new WorkInfo();
            while (flag.equals(object1[0])) {
                workInfo.addWork(object1);
                if (++i == listWork.size()) {
                    break;
                }
                object1 = listWork.get(i);
            }
            --i;
            String tName = workInfo.getTeacherName().substring(1, workInfo.getTeacherName().length());
            String tId = workInfo.getTeacherId().substring(1, workInfo.getTeacherId().length());

            map.put("taskId", workInfo.getWorkId());
            map.put("taskKinds", workInfo.getWorkKinds());
            map.put("taskDate", workInfo.getWorkTaskTime());
            map.put("taskName", workInfo.getWorkTaskName());
            map.put("teachers", tName);
            map.put("teachersId", tId);
            map.put("taskState", workInfo.getWorkTaskSchedule());
            map.put("qq", workInfo.getQq());
            map.put("taskText", workInfo.getTaskText());
            list.add(map);
        }
        return list;
    }

    public static List<Map<String, Object>> getWorkInfoUtil5(List<Object[]> listWork, String status) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Object flag = null;
        String teacherName = "";
        String teacherId = "";
        for (int i = 0; i < listWork.size(); i++) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            if (!object1[7].toString().equals(status)) {
                continue;
            }
            flag = object1[0];

            teacherName += object1[3];
            teacherId += object1[4];
            teacherName += ",";
            teacherId += ",";
            if (i != listWork.size() - 1) {
                Object[] objects = listWork.get(i + 1);
                if (flag.equals(objects[0])) {
                    continue;
                }
            }

            map.put("taskId", object1[0]);
            map.put("taskTime", object1[1].toString().substring(0, 10));
            map.put("taskName", object1[2]);
            map.put("taskTeacherName", teacherName.substring(0, teacherName.length() - 1));
            map.put("taskTeacherID", teacherId.substring(0, teacherId.length() - 1));
            map.put("taskAdminName", object1[5]);
            map.put("taskAdminId", object1[6]);
            map.put("taskStatus", object1[7]);
            list.add(map);
            teacherId = "";
            teacherName = "";
        }
        return list;
    }

    public static List<Map<String, Object>> getWorkInfoUtil1(List<Object[]> listWork) {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Object flag = null;
        String teacherName = "";
        String teacherId = "";
        for (int i = 0; i < listWork.size(); i++) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            flag = object1[0];

            teacherName += object1[3];
            teacherId += object1[4];
            teacherName += ",";
            teacherId += ",";
            if (i != listWork.size() - 1) {
                Object[] objects = listWork.get(i + 1);
                if (flag.equals(objects[0])) {
                    continue;
                }
            }

            map.put("taskId", object1[0]);
            map.put("taskTime", object1[1].toString().substring(0, 10));
            map.put("taskName", object1[2]);
            map.put("taskTeacherName", teacherName.substring(0, teacherName.length() - 1));
            map.put("taskTeacherID", teacherId.substring(0, teacherId.length() - 1));
            map.put("taskAdminName", object1[5]);
            map.put("taskAdminId", object1[6]);
            map.put("taskStatus", object1[7]);
            map.put("startDate", object1[8].toString().substring(0, 10));
            map.put("endDate", object1[9].toString().substring(0, 10));
            list.add(map);
            teacherId = "";
            teacherName = "";
        }
        return list;
    }


    public static List<Map<String, Object>> getWorkInfoUti2(List<Object[]> listWork) {
        WorkInfo workInfo = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Object flag = null;
        for (int i = 0; i < listWork.size(); ++i) {

            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            flag = object1[0];
            workInfo = new WorkInfo();
            while (flag.equals(object1[0])) {
                workInfo.addWork(object1);
                if (++i == listWork.size()) {
                    break;
                }
                object1 = listWork.get(i);
            }
            --i;
            String tName = workInfo.getTeacherName().substring(1, workInfo.getTeacherName().length());
            String tId = workInfo.getTeacherId().substring(1, workInfo.getTeacherId().length());

            if (workInfo.getWorkTaskSchedule().equals("已完成")) {
                continue;
            }
            map.put("taskId", workInfo.getWorkId());
            map.put("taskDate", workInfo.getWorkTaskTime());
            map.put("taskName", workInfo.getWorkTaskName());
            map.put("teachers", tName);
            map.put("teachersId", tId);
            map.put("taskState", workInfo.getWorkTaskSchedule());
            map.put("qq", workInfo.getQq());
            map.put("taskText", workInfo.getTaskText());
            map.put("adminName", object1[8]);
            list.add(map);
        }
        return list;
    }

    public static List<Map<String, Object>> getWorkInfoUti3(List<Object[]> listWork) {
        WorkInfo workInfo = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Object flag = null;
        for (int i = 0; i < listWork.size(); ++i) {

            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
//            for(int j = 0 ; j < object1.length ; j++){
//                System.out.println(":::"+object1[j].toString());
//            }
            map.put("taskID", object1[0].toString());
            map.put("taskTime", object1[1].toString());
            map.put("taskName", object1[2].toString());
            map.put("taskStatus", object1[3].toString());
            map.put("taskText", object1[4].toString());
            map.put("adminName", object1[5].toString());
            list.add(map);
        }
        return list;
    }

    public static List<Map<String, Object>> getWorkInfoUti4(List<Object[]> listWork) {
        WorkInfo workInfo = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < listWork.size(); ++i) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            map.put("kindId", object1[0].toString());
            map.put("kindName", object1[1].toString());
            list.add(map);
        }
        return list;
    }

    public static String[] getTemplateToText(String template, String status, String[] teacher_name, String
            task_title, String task_time1, String task_time2) {
        String[] text = new String[teacher_name.length];
        String sta = "";
        System.out.println("::::::::::::" + status);
        if (status.equals("0")) {
            sta = "已下发";
        } else if (status.equals("1")) {
            sta = "已开始";
            System.out.println("::::::::::::" + sta);
        } else if (status.equals("2")) {
            sta = "已完成";
        } else if (status.equals("3")) {
            sta = "已结束";
        } else if (status.equals("4")) {
            sta = "离结束还有" + Config.Cron_day + "天";
        }
        for (int i = 0; i < text.length; i++) {
            String tem = template;
            tem = tem.replace("[teacher_name]", teacher_name[i]);
            tem = tem.replace("[work_name]", task_title);
            tem = tem.replace("[status]", sta);
            tem = tem.replace("[work_time_start]", task_time1);
            tem = tem.replace("[work_time_end]", task_time2);
            System.out.println(tem);
            text[i] = tem;
        }
        return text;
    }

    public static int getGapCount(String startDate, String endDate) {
        Date adddate = null;
        Date enddate = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            adddate = sdf.parse(startDate);
            enddate = sdf.parse(endDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return (int) ((adddate.getTime() - enddate.getTime()) / (1000 * 60 * 60 * 24));
    }
}
