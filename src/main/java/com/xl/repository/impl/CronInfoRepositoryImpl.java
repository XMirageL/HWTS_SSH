package com.xl.repository.impl;

import com.xl.entity.THngyCronInfo;
import com.xl.repository.CronInfoRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CronInfoRepositoryImpl implements CronInfoRepository {
    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyCronInfo load(Long id) {
        return getSession().get(THngyCronInfo.class, id);
    }

    @Override
    public THngyCronInfo get(Long id) {
        return getSession().get(THngyCronInfo.class, id);
    }

    @Override
    public List<THngyCronInfo> findAll() {
        String hql = "FROM THngyCronInfo";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyCronInfo entity) {

    }

    @Override
    public Long save(THngyCronInfo entity) {
        return (Long) getSession().save(entity);
    }


    @Override
    @Transactional
    public void saveOrUpdate(THngyCronInfo entity) {
        getSession().update(entity);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(getSession().load(THngyCronInfo.class, id));
    }

    @Override
    public void flush() {
        getSession().flush();
    }
}
