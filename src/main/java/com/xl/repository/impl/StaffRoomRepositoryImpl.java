package com.xl.repository.impl;

import com.xl.entity.THngyStaffRoom;
import com.xl.repository.StaffRoomRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StaffRoomRepositoryImpl implements StaffRoomRepository {


    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyStaffRoom load(Long id) {
        return getSession().get(THngyStaffRoom.class, id);
    }

    @Override
    public THngyStaffRoom get(Long id) {
        return getSession().get(THngyStaffRoom.class, id);
    }

    @Override
    public List<THngyStaffRoom> findAll() {
        String hql = "from THngyStaffRoom ";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyStaffRoom entity) {
    }

    @Override
    public Long save(THngyStaffRoom entity) {
        return (Long) getSession().save(entity);
    }

    @Override
    public void saveOrUpdate(THngyStaffRoom entity) {
        saveOrUpdate(entity);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(getSession().get(THngyStaffRoom.class, id));
    }

    @Override
    public void flush() {

    }
}
