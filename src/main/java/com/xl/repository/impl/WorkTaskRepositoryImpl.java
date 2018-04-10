package com.xl.repository.impl;

import com.xl.entity.THngyWorkTask;
import com.xl.repository.WorkTaskRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkTaskRepositoryImpl implements WorkTaskRepository{
    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession(){
        return this.sessionFactory.getCurrentSession();
    }
    @Override
    public THngyWorkTask load(Long id) {
        return null;
    }

    @Override
    public THngyWorkTask get(Long id) {
        return null;
    }

    @Override
    public List<THngyWorkTask> findAll() {
        String hql = "from THngyWorkTask";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyWorkTask entity) {

    }

    @Override
    public Long save(THngyWorkTask entity) {
        return null;
    }

    @Override
    public void saveOrUpdate(THngyWorkTask entity) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }
}
