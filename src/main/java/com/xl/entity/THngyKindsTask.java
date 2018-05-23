package com.xl.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_KindsOfTask", schema = "HNGY")
public class THngyKindsTask {
    private long KindsTaskID;
    private long departmentId;
    private String KindsTaskName;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Kinds_Task_ID")
    public long getKindsTaskID() {
        return KindsTaskID;
    }

    public void setKindsTaskID(long kindsTaskID) {
        KindsTaskID = kindsTaskID;
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
    @Column(name = "Kinds_Task_Name")
    public String getKindsTaskName() {
        return KindsTaskName;
    }

    public void setKindsTaskName(String kindsTaskName) {
        KindsTaskName = kindsTaskName;
    }

    

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        THngyKindsTask that = (THngyKindsTask) o;
        return KindsTaskID == that.KindsTaskID &&
                departmentId == that.departmentId &&
                Objects.equals(KindsTaskName, that.KindsTaskName) ;
    }

    @Override
    public int hashCode() {

        return Objects.hash(KindsTaskID,departmentId, KindsTaskName);
    }
}
