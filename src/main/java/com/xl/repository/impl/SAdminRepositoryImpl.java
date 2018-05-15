package com.xl.repository.impl;

import com.xl.entity.THngyAdminInfo;
import com.xl.entity.THngySAdminInfo;
import com.xl.repository.SAdminRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SAdminRepositoryImpl implements SAdminRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngySAdminInfo load(Long id) {
        return getSession().get(THngySAdminInfo.class, id);
    }

    @Override
    public THngySAdminInfo get(Long id) {
        return getSession().get(THngySAdminInfo.class, id);
    }

    @Override
    public List<THngySAdminInfo> findAll() {
        String hql = "FROM THngySAdminInfo";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngySAdminInfo entity) {

    }

    @Override
    public Long save(THngySAdminInfo entity) {
        return (Long) getSession().save(entity);
    }

    @Override
    public void saveOrUpdate(THngySAdminInfo entity) {
        saveOrUpdate(entity);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }
}
