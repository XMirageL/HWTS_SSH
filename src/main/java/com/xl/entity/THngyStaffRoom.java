package com.xl.entity;

import javax.persistence.*;

@Entity
@Table(name = "T_HNGY_StaffRoom", schema = "dbo", catalog = "HNGY")
public class THngyStaffRoom {
    private long staffRoomId;
    private String staffRoomName;
    private long departmentId;
    private String spare1;
    private String spare2;
    private String spare3;
    private String spare4;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "Staff_room_ID")
    public long getStaffRoomId() {
        return staffRoomId;
    }

    public void setStaffRoomId(long staffRoomId) {
        this.staffRoomId = staffRoomId;
    }

    @Basic
    @Column(name = "Staff_room_Name")
    public String getStaffRoomName() {
        return staffRoomName;
    }

    public void setStaffRoomName(String staffRoomName) {
        this.staffRoomName = staffRoomName;
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

        THngyStaffRoom that = (THngyStaffRoom) o;

        if (staffRoomId != that.staffRoomId) return false;
        if (departmentId != that.departmentId) return false;
        if (staffRoomName != null ? !staffRoomName.equals(that.staffRoomName) : that.staffRoomName != null)
            return false;
        if (spare1 != null ? !spare1.equals(that.spare1) : that.spare1 != null) return false;
        if (spare2 != null ? !spare2.equals(that.spare2) : that.spare2 != null) return false;
        if (spare3 != null ? !spare3.equals(that.spare3) : that.spare3 != null) return false;
        if (spare4 != null ? !spare4.equals(that.spare4) : that.spare4 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (staffRoomId ^ (staffRoomId >>> 32));
        result = 31 * result + (staffRoomName != null ? staffRoomName.hashCode() : 0);
        result = 31 * result + (int) (departmentId ^ (departmentId >>> 32));
        result = 31 * result + (spare1 != null ? spare1.hashCode() : 0);
        result = 31 * result + (spare2 != null ? spare2.hashCode() : 0);
        result = 31 * result + (spare3 != null ? spare3.hashCode() : 0);
        result = 31 * result + (spare4 != null ? spare4.hashCode() : 0);
        return result;
    }
}
