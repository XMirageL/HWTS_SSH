package com.xl.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_WorkTask", schema = "HNGY", catalog = "")
public class THngyWorkTask {
    private long workTaskId;
    private String workTaskName;
    private long workTaskKinds;
    private String workTaskText;
    private Timestamp workTaskTime;
    private String workTaskTerm;
    private String workTaskSchedule;
    private String qq;
    private long departmentId;
    private String spare2;
    private String spare3;
    private String spare4;
    private String spare1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "Kinds_Task_ID")
    public long getWorkTaskKinds() {
        return workTaskKinds;
    }

    public void setWorkTaskKinds(long workTaskKinds) {
        this.workTaskKinds = workTaskKinds;
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
    public Timestamp getWorkTaskTime() {
        return workTaskTime;
    }

    public void setWorkTaskTime(Timestamp workTaskTime) {
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
    @Column(name = "Department_ID")
    public long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
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

    @Basic
    @Column(name = "spare1")
    public String getSpare1() {
        return spare1;
    }

    public void setSpare1(String spare1) {
        this.spare1 = spare1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        THngyWorkTask that = (THngyWorkTask) o;
        return workTaskId == that.workTaskId &&
                departmentId == that.departmentId &&
                workTaskKinds == that.workTaskKinds &&
                Objects.equals(workTaskName, that.workTaskName) &&
                Objects.equals(workTaskText, that.workTaskText) &&
                Objects.equals(workTaskTime, that.workTaskTime) &&
                Objects.equals(workTaskTerm, that.workTaskTerm) &&
                Objects.equals(workTaskSchedule, that.workTaskSchedule) &&
                Objects.equals(qq, that.qq) &&
                Objects.equals(spare2, that.spare2) &&
                Objects.equals(spare3, that.spare3) &&
                Objects.equals(spare4, that.spare4) &&
                Objects.equals(spare1, that.spare1);
    }

    @Override
    public int hashCode() {

        return Objects.hash(workTaskId, workTaskName, workTaskKinds, workTaskText, workTaskTime, workTaskTerm,
                workTaskSchedule, qq, departmentId, spare2, spare3, spare4, spare1);
    }
}
