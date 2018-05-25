package com.xl.repository.impl;

import com.xl.entity.THngyLink;
import com.xl.repository.LinkRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LinkRepostoryImpl implements LinkRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public THngyLink load(Long id) {
        return getSession().get(THngyLink.class, id);
    }

    @Override
    public THngyLink get(Long id) {
        return getSession().get(THngyLink.class, id);
    }

    @Override
    public List<THngyLink> findAll() {
        String hql = "FROM THngyLink";
        return getSession().createQuery(hql).list();
    }

    @Override
    public void persist(THngyLink entity) {

    }

    @Override
    public Long save(THngyLink entity) {
        return (Long) getSession().save(entity);
    }

    @Override
    public void saveOrUpdate(THngyLink entity) {
        saveOrUpdate(entity);
    }

    @Override
    public void delete(Long id) {
        getSession().delete(getSession().get(THngyLink.class, id));
    }

    @Override
    public void flush() {

    }
}
