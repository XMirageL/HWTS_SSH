package com.xl.repository.impl;

import com.xl.entity.THngyMailInfo;
import com.xl.repository.MailInfoRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MailInfoRepositoryImpl implements MailInfoRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyMailInfo load(Long id) {
        return getSession().get(THngyMailInfo.class, id);
    }

    @Override
    public THngyMailInfo get(Long id) {
        return getSession().get(THngyMailInfo.class, id);
    }

    @Override
    public List<THngyMailInfo> findAll() {
        String hql = "FROM THngyMailInfo";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyMailInfo entity) {

    }

    @Override
    public Long save(THngyMailInfo entity) {
        return (Long) getSession().save(entity);
    }

    @Override
    public void saveOrUpdate(THngyMailInfo entity) {
        getSession().update(entity);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(getSession().get(THngyMailInfo.class, id));
    }

    @Override
    public void flush() {
        getSession().flush();
    }
}
