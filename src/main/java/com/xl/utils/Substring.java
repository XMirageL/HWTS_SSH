package com.xl.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Substring
{
    /***
     * 把老师id截取出来
     * @param teacherID
     * @return
     */
    public List<Map<String, Long>> getTeacherId(String teacherID)
    {
        List<Map<String, Long>> list = new ArrayList<>();
        String str = "";
        while (teacherID.indexOf(")") != -1)
        {
            Map<String, Long> map = new HashMap<>();
            str = (String) teacherID.subSequence(teacherID.indexOf("(") + 1, teacherID.indexOf(")"));
            map.put("id", Long.parseLong(str));
            list.add(map);
            teacherID = teacherID.substring(teacherID.indexOf(")") + 1);
        }
        for (int i = 0;i<list.size();++i){
            System.out.println(list.get(i).get("id"));
        }
        return list;
    }
}
