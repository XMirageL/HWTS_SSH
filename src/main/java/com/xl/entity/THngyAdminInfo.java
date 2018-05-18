package com.xl.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_AdminInfo", schema = "HNGY", catalog = "")
public class THngyAdminInfo {
    private long adminInfoId;
    private long departmentId;
    private String adminInfoName;
    private String adminInfoPassWord;
    private String adminInfoEmail;
    private String adminInfoQq;
    private String adminInfoPhone;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Admin_Info_ID")
    public long getAdminInfoId() {
        return adminInfoId;
    }

    public void setAdminInfoId(long adminInfoId) {
        this.adminInfoId = adminInfoId;
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
    @Column(name = "Admin_Info_NAME")
    public String getAdminInfoName() {
        return adminInfoName;
    }

    public void setAdminInfoName(String adminInfoName) {
        this.adminInfoName = adminInfoName;
    }

    @Basic
    @Column(name = "Admin_Info_PassWord")
    public String getAdminInfoPassWord() {
        return adminInfoPassWord;
    }

    public void setAdminInfoPassWord(String adminInfoPassWord) {
        this.adminInfoPassWord = adminInfoPassWord;
    }

    @Basic
    @Column(name = "Admin_Info_EMAIL")
    public String getAdminInfoEmail() {
        return adminInfoEmail;
    }

    public void setAdminInfoEmail(String adminInfoEmail) {
        this.adminInfoEmail = adminInfoEmail;
    }

    @Basic
    @Column(name = "Admin_Info_QQ")
    public String getAdminInfoQq() {
        return adminInfoQq;
    }

    public void setAdminInfoQq(String adminInfoQq) {
        this.adminInfoQq = adminInfoQq;
    }

    @Basic
    @Column(name = "Admin_Info_Phone")
    public String getAdminInfoPhone() {
        return adminInfoPhone;
    }

    public void setAdminInfoPhone(String adminInfoPhone) {
        this.adminInfoPhone = adminInfoPhone;
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
        THngyAdminInfo that = (THngyAdminInfo) o;
        return adminInfoId == that.adminInfoId &&
                departmentId == that.departmentId &&
                Objects.equals(adminInfoName, that.adminInfoName) &&
                Objects.equals(adminInfoPassWord, that.adminInfoPassWord) &&
                Objects.equals(adminInfoEmail, that.adminInfoEmail) &&
                Objects.equals(adminInfoQq, that.adminInfoQq) &&
                Objects.equals(adminInfoPhone, that.adminInfoPhone) &&
                Objects.equals(spare1, that.spare1) &&
                Objects.equals(spare2, that.spare2) &&
                Objects.equals(spare3, that.spare3) &&
                Objects.equals(spare4, that.spare4);
    }

    @Override
    public int hashCode() {

        return Objects.hash(adminInfoId, departmentId, adminInfoName, adminInfoPassWord, adminInfoEmail, adminInfoQq, adminInfoPhone, spare1, spare2, spare3, spare4);
    }
}
