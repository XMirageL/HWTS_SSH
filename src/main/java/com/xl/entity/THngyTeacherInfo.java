package com.xl.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_TeacherInfo", schema = "HNGY", catalog = "")
public class THngyTeacherInfo {
    private long teacherId;
    private String teacherName;
    private long staffRoomId;
    private String teacherEmail;
    private String teacherPhone;
    private String teacherPassword;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;
    private String spare5;
    private String spare6;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Teacher_ID")
    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    @Basic
    @Column(name = "Teacher_NAME")
    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    @Basic
    @Column(name = "Staff_room_ID")
    public long getStaffRoomId() {
        return staffRoomId;
    }

    public void setStaffRoomId(long staffRoomId) {
        this.staffRoomId = staffRoomId;
    }

    @Basic
    @Column(name = "Teacher_EMAIL")
    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }

    @Basic
    @Column(name = "Teacher_PHONE")
    public String getTeacherPhone() {
        return teacherPhone;
    }

    public void setTeacherPhone(String teacherPhone) {
        this.teacherPhone = teacherPhone;
    }

    @Basic
    @Column(name = "Teacher_PASSWORD")
    public String getTeacherPassword() {
        return teacherPassword;
    }

    public void setTeacherPassword(String teacherPassword) {
        this.teacherPassword = teacherPassword;
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

    @Basic
    @Column(name = "spare5")
    public String getSpare5() {
        return spare5;
    }

    public void setSpare5(String spare5) {
        this.spare5 = spare5;
    }

    @Basic
    @Column(name = "spare6")
    public String getSpare6() {
        return spare6;
    }

    public void setSpare6(String spare6) {
        this.spare6 = spare6;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        THngyTeacherInfo that = (THngyTeacherInfo) o;
        return teacherId == that.teacherId &&
                staffRoomId == that.staffRoomId &&
                Objects.equals(teacherName, that.teacherName) &&
                Objects.equals(teacherEmail, that.teacherEmail) &&
                Objects.equals(teacherPhone, that.teacherPhone) &&
                Objects.equals(teacherPassword, that.teacherPassword) &&
                Objects.equals(spare1, that.spare1) &&
                Objects.equals(spare2, that.spare2) &&
                Objects.equals(spare3, that.spare3) &&
                Objects.equals(spare4, that.spare4) &&
                Objects.equals(spare5, that.spare5) &&
                Objects.equals(spare6, that.spare6);
    }

    @Override
    public int hashCode() {

        return Objects.hash(teacherId, teacherName, staffRoomId, teacherEmail, teacherPhone, teacherPassword, spare1, spare2, spare3, spare4, spare5, spare6);
    }
}
