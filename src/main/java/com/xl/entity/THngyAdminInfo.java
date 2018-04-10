package com.xl.entity;

import javax.persistence.*;

@Entity
@Table(name = "T_HNGY_AdminInfo", schema = "dbo", catalog = "HNGY")
public class THngyAdminInfo {
    private long adminInfoId;
    private String adminInfoName;
    private String adminInfoPassWord;
    private String adminInfoEmail;
    private String adminInfoQq;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "Admin_Info_ID")
    public long getAdminInfoId() {
        return adminInfoId;
    }

    public void setAdminInfoId(long adminInfoId) {
        this.adminInfoId = adminInfoId;
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

        if (adminInfoId != that.adminInfoId) return false;
        if (adminInfoName != null ? !adminInfoName.equals(that.adminInfoName) : that.adminInfoName != null)
            return false;
        if (adminInfoPassWord != null ? !adminInfoPassWord.equals(that.adminInfoPassWord) : that.adminInfoPassWord != null)
            return false;
        if (adminInfoEmail != null ? !adminInfoEmail.equals(that.adminInfoEmail) : that.adminInfoEmail != null)
            return false;
        if (adminInfoQq != null ? !adminInfoQq.equals(that.adminInfoQq) : that.adminInfoQq != null) return false;
        if (spare1 != null ? !spare1.equals(that.spare1) : that.spare1 != null) return false;
        if (spare2 != null ? !spare2.equals(that.spare2) : that.spare2 != null) return false;
        if (spare3 != null ? !spare3.equals(that.spare3) : that.spare3 != null) return false;
        if (spare4 != null ? !spare4.equals(that.spare4) : that.spare4 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (adminInfoId ^ (adminInfoId >>> 32));
        result = 31 * result + (adminInfoName != null ? adminInfoName.hashCode() : 0);
        result = 31 * result + (adminInfoPassWord != null ? adminInfoPassWord.hashCode() : 0);
        result = 31 * result + (adminInfoEmail != null ? adminInfoEmail.hashCode() : 0);
        result = 31 * result + (adminInfoQq != null ? adminInfoQq.hashCode() : 0);
        result = 31 * result + (spare1 != null ? spare1.hashCode() : 0);
        result = 31 * result + (spare2 != null ? spare2.hashCode() : 0);
        result = 31 * result + (spare3 != null ? spare3.hashCode() : 0);
        result = 31 * result + (spare4 != null ? spare4.hashCode() : 0);
        return result;
    }
}
