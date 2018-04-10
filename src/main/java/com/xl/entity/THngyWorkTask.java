package com.xl.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "T_HNGY_WorkTask", schema = "dbo", catalog = "HNGY")
public class THngyWorkTask {
    private long workTaskId;
    private String workTaskName;
    private String workTaskText;
    private Date workTaskTime;
    private String workTaskTerm;
    private String workTaskSchedule;
    private String qq;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "Work_task_ID")
    public long getWorkTaskId() {
        return workTaskId;
    }

    public void setWorkTaskId(long workTaskId) {
        this.workTaskId = workTaskId;
    }

    @Basic
    @Column(name = "Work_task_NAME")
    public String getWorkTaskName() {
        return workTaskName;
    }

    public void setWorkTaskName(String workTaskName) {
        this.workTaskName = workTaskName;
    }

    @Basic
    @Column(name = "Work_task_TEXT")
    public String getWorkTaskText() {
        return workTaskText;
    }

    public void setWorkTaskText(String workTaskText) {
        this.workTaskText = workTaskText;
    }

    @Basic
    @Column(name = "Work_task_TIME")
    public Date getWorkTaskTime() {
        return workTaskTime;
    }

    public void setWorkTaskTime(Date workTaskTime) {
        this.workTaskTime = workTaskTime;
    }

    @Basic
    @Column(name = "Work_task_TERM")
    public String getWorkTaskTerm() {
        return workTaskTerm;
    }

    public void setWorkTaskTerm(String workTaskTerm) {
        this.workTaskTerm = workTaskTerm;
    }

    @Basic
    @Column(name = "Work_task_SCHEDULE")
    public String getWorkTaskSchedule() {
        return workTaskSchedule;
    }

    public void setWorkTaskSchedule(String workTaskSchedule) {
        this.workTaskSchedule = workTaskSchedule;
    }

    @Basic
    @Column(name = "qq")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "spare1")
    public String getSpare1() {
        return spare1;
    }

    public void setSpare1(String spare1) {
        this.spare1 = spare1;
    }

    @Basic
    @Column(name = "spare2")
    public String getSpare2() {
        return spare2;
    }

    public void setSpare2(String spare2) {
        this.spare2 = spare2;
    }

    @Basic
    @Column(name = "spare3")
    public String getSpare3() {
        return spare3;
    }

    public void setSpare3(String spare3) {
        this.spare3 = spare3;
    }

    @Basic
    @Column(name = "spare4")
    public String getSpare4() {
        return spare4;
    }

    public void setSpare4(String spare4) {
        this.spare4 = spare4;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        THngyWorkTask that = (THngyWorkTask) o;

        if (workTaskId != that.workTaskId) return false;
        if (workTaskName != null ? !workTaskName.equals(that.workTaskName) : that.workTaskName != null) return false;
        if (workTaskText != null ? !workTaskText.equals(that.workTaskText) : that.workTaskText != null) return false;
        if (workTaskTime != null ? !workTaskTime.equals(that.workTaskTime) : that.workTaskTime != null) return false;
        if (workTaskTerm != null ? !workTaskTerm.equals(that.workTaskTerm) : that.workTaskTerm != null) return false;
        if (workTaskSchedule != null ? !workTaskSchedule.equals(that.workTaskSchedule) : that.workTaskSchedule != null)
            return false;
        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
        if (spare1 != null ? !spare1.equals(that.spare1) : that.spare1 != null) return false;
        if (spare2 != null ? !spare2.equals(that.spare2) : that.spare2 != null) return false;
        if (spare3 != null ? !spare3.equals(that.spare3) : that.spare3 != null) return false;
        if (spare4 != null ? !spare4.equals(that.spare4) : that.spare4 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (workTaskId ^ (workTaskId >>> 32));
        result = 31 * result + (workTaskName != null ? workTaskName.hashCode() : 0);
        result = 31 * result + (workTaskText != null ? workTaskText.hashCode() : 0);
        result = 31 * result + (workTaskTime != null ? workTaskTime.hashCode() : 0);
        result = 31 * result + (workTaskTerm != null ? workTaskTerm.hashCode() : 0);
        result = 31 * result + (workTaskSchedule != null ? workTaskSchedule.hashCode() : 0);
        result = 31 * result + (qq != null ? qq.hashCode() : 0);
        result = 31 * result + (spare1 != null ? spare1.hashCode() : 0);
        result = 31 * result + (spare2 != null ? spare2.hashCode() : 0);
        result = 31 * result + (spare3 != null ? spare3.hashCode() : 0);
        result = 31 * result + (spare4 != null ? spare4.hashCode() : 0);
        return result;
    }
}
