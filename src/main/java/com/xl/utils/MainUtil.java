package com.xl.utils;

import com.xl.entity.WorkInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainUtil {
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
}
