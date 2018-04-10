package com.xl.entity;


public class WorkInfo {
    private String workId = "";
    private String workTaskTime = "";
    private String workTaskName = "";
    private String teacherName = "";
    private String teacherId = "";
    private String qq = " ";
    private String taskText = "";

    public String getTaskText() {
        return taskText;
    }

    public void setTaskText(String taskText) {
        this.taskText = taskText;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getWorkId() {
        return workId;
    }

    public void setWorkId(String workId) {
        this.workId = workId;
    }

    private String workTaskSchedule = "";

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public WorkInfo() {

    }

    @Override
    public String toString() {
        return "WorkInfo{" +
                "workId='" + workId + '\'' +
                ", workTaskTime='" + workTaskTime + '\'' +
                ", workTaskName='" + workTaskName + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", workTaskSchedule='" + workTaskSchedule + '\'' +
                '}';
    }

    public void addWork(Object[] objects) {
        this.workId = String.valueOf(objects[0]);
        this.workTaskTime = String.valueOf(objects[1]);
        this.workTaskName = String.valueOf(objects[2]);
        this.teacherName += "," + String.valueOf(objects[3]);
        this.teacherId += "," + String.valueOf(objects[5]);
        //this.teacherName = this.teacherName + " <a href=\"homepage?id=\""+"这里放老师id"+" \"\">" + String.valueOf(objects[3])+"</a>";
        this.workTaskSchedule = String.valueOf(objects[4]);
        this.qq = String.valueOf(objects[6]);
        this.taskText = String.valueOf(objects[7]);
    }

    public String getWorkTaskTime() {
        return workTaskTime;
    }

    public void setWorkTaskTime(String workTaskTime) {
        this.workTaskTime = workTaskTime;
    }

    public String getWorkTaskName() {
        return workTaskName;
    }

    public void setWorkTaskName(String workTaskName) {
        this.workTaskName = workTaskName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getWorkTaskSchedule() {
        return workTaskSchedule;
    }

    public void setWorkTaskSchedule(String workTaskSchedule) {
        this.workTaskSchedule = workTaskSchedule;
    }
}
