package com.xl.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_HNGY_MailInfo", schema = "HNGY", catalog = "")
public class THngyMailInfo {
    private long MailId;
    private long adminInfoId;
    private String MailAccount;
    private String MailPwd;
    private String MailTemplate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Mail_ID")
    public long getMailId() {
        return MailId;
    }

    public void setMailId(long mailId) {
        MailId = mailId;
    }

    @Basic
    @Column(name = "Admin_Info_ID")
    public long getAdminInfoId() {
        return adminInfoId;
    }

    public void setAdminInfoId(long adminInfoId) {
        this.adminInfoId = adminInfoId;
    }


    @Basic
    @Column(name = "Mail_Info_ACCOUNT")
    public String getMailAccount() {
        return MailAccount;
    }

    public void setMailAccount(String mailAccount) {
        MailAccount = mailAccount;
    }

    @Basic
    @Column(name = "Mail_Info_PassWord")
    public String getMailPwd() {
        return MailPwd;
    }

    public void setMailPwd(String mailPwd) {
        MailPwd = mailPwd;
    }

    @Basic
    @Column(name = "Mail_Info_Template")
    public String getMailTemplate() {
        return MailTemplate;
    }

    public void setMailTemplate(String mailTemplate) {
        MailTemplate = mailTemplate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        THngyMailInfo tHngyMailInfo = (THngyMailInfo) o;
        return MailId == tHngyMailInfo.MailId &&
                adminInfoId == tHngyMailInfo.adminInfoId &&
                Objects.equals(MailAccount, tHngyMailInfo.MailAccount) &&
                Objects.equals(MailPwd, tHngyMailInfo.MailPwd) &&
                Objects.equals(MailTemplate, tHngyMailInfo.MailTemplate);


    }

    @Override
    public int hashCode() {

        return Objects.hash(MailId, adminInfoId, MailAccount, MailPwd, MailTemplate);
    }
}
