package com.xl.entity;

import javax.persistence.*;

@Entity
@Table(name = "T_HNGY_TeacherInfo", schema = "dbo", catalog = "HNGY")
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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
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

        if (teacherId != that.teacherId) return false;
        if (staffRoomId != that.staffRoomId) return false;
        if (teacherName != null ? !teacherName.equals(that.teacherName) : that.teacherName != null) return false;
        if (teacherEmail != null ? !teacherEmail.equals(that.teacherEmail) : that.teacherEmail != null) return false;
        if (teacherPhone != null ? !teacherPhone.equals(that.teacherPhone) : that.teacherPhone != null) return false;
        if (teacherPassword != null ? !teacherPassword.equals(that.teacherPassword) : that.teacherPassword != null)
            return false;
        if (spare1 != null ? !spare1.equals(that.spare1) : that.spare1 != null) return false;
        if (spare2 != null ? !spare2.equals(that.spare2) : that.spare2 != null) return false;
        if (spare3 != null ? !spare3.equals(that.spare3) : that.spare3 != null) return false;
        if (spare4 != null ? !spare4.equals(that.spare4) : that.spare4 != null) return false;
        if (spare5 != null ? !spare5.equals(that.spare5) : that.spare5 != null) return false;
        if (spare6 != null ? !spare6.equals(that.spare6) : that.spare6 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (teacherId ^ (teacherId >>> 32));
        result = 31 * result + (teacherName != null ? teacherName.hashCode() : 0);
        result = 31 * result + (int) (staffRoomId ^ (staffRoomId >>> 32));
        result = 31 * result + (teacherEmail != null ? teacherEmail.hashCode() : 0);
        result = 31 * result + (teacherPhone != null ? teacherPhone.hashCode() : 0);
        result = 31 * result + (teacherPassword != null ? teacherPassword.hashCode() : 0);
        result = 31 * result + (spare1 != null ? spare1.hashCode() : 0);
        result = 31 * result + (spare2 != null ? spare2.hashCode() : 0);
        result = 31 * result + (spare3 != null ? spare3.hashCode() : 0);
        result = 31 * result + (spare4 != null ? spare4.hashCode() : 0);
        result = 31 * result + (spare5 != null ? spare5.hashCode() : 0);
        result = 31 * result + (spare6 != null ? spare6.hashCode() : 0);
        return result;
    }
}
