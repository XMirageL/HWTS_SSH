package com.xl.utils;

import com.alibaba.fastjson.JSONObject;
import com.xl.entity.WorkInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        map.put("teachers", tName.substring(0,tName.length()-1));
        map.put("teachersId", tId.substring(0, tId.length()-1));
        map.put("taskState", object1[4].toString());
        map.put("qq", object1[6].toString());
        map.put("taskText", object1[7].toString());
        map.put("kindId", object1[9].toString());
        map.put("kindText", object1[8].toString());
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
//            for (int k = 0 ; k < object1.length; k ++){
//                System.out.println(object1[k]);
//
//
//
//
//            }
//            System.out.println("");
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
}
