package com.xl.repository.impl;

import com.xl.entity.THngyKindsTask;
import com.xl.repository.KindsOfTaskRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class KindsOfTaskRepositoryImpl implements KindsOfTaskRepository {
    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyKindsTask load(Long id) {
        return getSession().get(THngyKindsTask.class, id);
    }

    @Override
    public THngyKindsTask get(Long id) {
        return getSession().get(THngyKindsTask.class, id);
    }

    @Override
    public List<THngyKindsTask> findAll() {
        String hql = "FROM THngyKindsTask";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyKindsTask entity) {

    }

    @Override
    public Long save(THngyKindsTask entity) {
        return (long) getSession().save(entity);
    }


    @Override
    @Transactional
    public void saveOrUpdate(THngyKindsTask entity) {
        getSession().update(entity);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(getSession().load(THngyKindsTask.class, id));
    }

    @Override
    public void flush() {
        getSession().flush();
    }
}
