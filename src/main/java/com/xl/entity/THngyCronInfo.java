package com.xl.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_CronInfo", schema = "HNGY", catalog = "")
public class THngyCronInfo {
    private long CronId;
    private long workTaskId;
    private String CronStatus;
    private Timestamp CronAddTime;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cron_Id")
    public long getCronId() {
        return CronId;
    }

    public void setCronId(long cronId) {
        CronId = cronId;
    }

    @Basic
    @Column(name = "Work_task_ID")
    public long getWorkTaskId() {
        return workTaskId;
    }

    public void setWorkTaskId(long workTaskId) {
        this.workTaskId = workTaskId;
    }

    @Basic
    @Column(name = "Cron_Status")
    public String getCronStatus() {
        return CronStatus;
    }

    public void setCronStatus(String cronStatus) {
        CronStatus = cronStatus;
    }

    @Basic
    @Column(name = "Cron_Add_Time")
    public Timestamp getCronAddTime() {
        return CronAddTime;
    }

    public void setCronAddTime(Timestamp cronAddTime) {
        CronAddTime = cronAddTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        THngyCronInfo that = (THngyCronInfo) o;
        return CronId == that.CronId &&
                workTaskId == that.workTaskId &&
                Objects.equals(CronStatus, that.CronStatus) &&
                Objects.equals(CronAddTime, that.CronAddTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(CronId, workTaskId, CronStatus, CronAddTime);
    }
}
