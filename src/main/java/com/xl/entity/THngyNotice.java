package com.xl.entity;

import javax.persistence.*;

@Entity
@Table(name = "T_HNGY_Notice", schema = "dbo", catalog = "HNGY")
public class THngyNotice {
    private long noticeId;
    private String noticeText;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "Notice_ID")
    public long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(long noticeId) {
        this.noticeId = noticeId;
    }

    @Basic
    @Column(name = "Notice_TEXT")
    public String getNoticeText() {
        return noticeText;
    }

    public void setNoticeText(String noticeText) {
        this.noticeText = noticeText;
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

        THngyNotice that = (THngyNotice) o;

        if (noticeId != that.noticeId) return false;
        if (noticeText != null ? !noticeText.equals(that.noticeText) : that.noticeText != null) return false;
        if (spare1 != null ? !spare1.equals(that.spare1) : that.spare1 != null) return false;
        if (spare2 != null ? !spare2.equals(that.spare2) : that.spare2 != null) return false;
        if (spare3 != null ? !spare3.equals(that.spare3) : that.spare3 != null) return false;
        if (spare4 != null ? !spare4.equals(that.spare4) : that.spare4 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (noticeId ^ (noticeId >>> 32));
        result = 31 * result + (noticeText != null ? noticeText.hashCode() : 0);
        result = 31 * result + (spare1 != null ? spare1.hashCode() : 0);
        result = 31 * result + (spare2 != null ? spare2.hashCode() : 0);
        result = 31 * result + (spare3 != null ? spare3.hashCode() : 0);
        result = 31 * result + (spare4 != null ? spare4.hashCode() : 0);
        return result;
    }
}
