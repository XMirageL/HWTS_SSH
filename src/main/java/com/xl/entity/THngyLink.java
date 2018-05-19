package com.xl.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_Link", schema = "HNGY", catalog = "")
public class THngyLink {
    private long linkId;
    private long workTaskId;
    private long teacherId;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Link_ID")
    public long getLinkId() {
        return linkId;
    }

    public void setLinkId(long linkId) {
        this.linkId = linkId;
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
    @Column(name = "Teacher_ID")
    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
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
        THngyLink tHngyLink = (THngyLink) o;
        return linkId == tHngyLink.linkId &&
                workTaskId == tHngyLink.workTaskId &&
                teacherId == tHngyLink.teacherId &&
                Objects.equals(spare1, tHngyLink.spare1) &&
                Objects.equals(spare2, tHngyLink.spare2) &&
                Objects.equals(spare3, tHngyLink.spare3) &&
                Objects.equals(spare4, tHngyLink.spare4);
    }

    @Override
    public int hashCode() {

        return Objects.hash(linkId, workTaskId, teacherId, spare1, spare2, spare3, spare4);
    }
}
