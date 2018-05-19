package com.xl.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_SAdminInfo", schema = "HNGY", catalog = "")
public class THngySAdminInfo {
    private long sAdminId;
    private String sAdminName;
    private String sAdminPassWord;
    private String sAdminEmail;
    private String sAdminQq;
    private String sAdminPhone;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SAdmin_ID")
    public long getsAdminId() {
        return sAdminId;
    }

    public void setsAdminId(long sAdminId) {
        this.sAdminId = sAdminId;
    }

    @Basic
    @Column(name = "SAdmin_NAME")
    public String getsAdminName() {
        return sAdminName;
    }

    public void setsAdminName(String sAdminName) {
        this.sAdminName = sAdminName;
    }

    @Basic
    @Column(name = "SAdmin_PassWord")
    public String getsAdminPassWord() {
        return sAdminPassWord;
    }

    public void setsAdminPassWord(String sAdminPassWord) {
        this.sAdminPassWord = sAdminPassWord;
    }

    @Basic
    @Column(name = "SAdmin_EMAIL")
    public String getsAdminEmail() {
        return sAdminEmail;
    }

    public void setsAdminEmail(String sAdminEmail) {
        this.sAdminEmail = sAdminEmail;
    }

    @Basic
    @Column(name = "SAdmin_QQ")
    public String getsAdminQq() {
        return sAdminQq;
    }

    public void setsAdminQq(String sAdminQq) {
        this.sAdminQq = sAdminQq;
    }

    @Basic
    @Column(name = "SAdmin_Phone")
    public String getsAdminPhone() {
        return sAdminPhone;
    }

    public void setsAdminPhone(String sAdminPhone) {
        this.sAdminPhone = sAdminPhone;
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
        THngySAdminInfo that = (THngySAdminInfo) o;
        return sAdminId == that.sAdminId &&
                Objects.equals(sAdminName, that.sAdminName) &&
                Objects.equals(sAdminPassWord, that.sAdminPassWord) &&
                Objects.equals(sAdminEmail, that.sAdminEmail) &&
                Objects.equals(sAdminQq, that.sAdminQq) &&
                Objects.equals(sAdminPhone, that.sAdminPhone) &&
                Objects.equals(spare1, that.spare1) &&
                Objects.equals(spare2, that.spare2) &&
                Objects.equals(spare3, that.spare3) &&
                Objects.equals(spare4, that.spare4);
    }

    @Override
    public int hashCode() {

        return Objects.hash(sAdminId, sAdminName, sAdminPassWord, sAdminEmail, sAdminQq, sAdminPhone, spare1, spare2, spare3, spare4);
    }
}
