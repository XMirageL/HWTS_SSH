package com.xl.repository.impl;

import com.xl.entity.THngyDepartment;
import com.xl.repository.DepartmentRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DepartmentRepositoryImpl implements DepartmentRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyDepartment load(Long id) {
        return getSession().get(THngyDepartment.class, id);
    }

    @Override
    public THngyDepartment get(Long id) {
        return getSession().get(THngyDepartment.class, id);
    }

    @Override
    public List<THngyDepartment> findAll() {
        String hql = "FROM THngyDepartment";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyDepartment entity) {

    }

    @Override
    public Long save(THngyDepartment entity) {
        return (Long) getSession().save(entity);
    }

    @Override
    public void saveOrUpdate(THngyDepartment entity) {
        saveOrUpdate(entity);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void flush() {

    }
}
