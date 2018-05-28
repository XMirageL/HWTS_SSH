package com.xl.repository;

import org.hibernate.Session;

import java.sql.Date;
import java.util.List;

public interface MainRepository {
    Session getSession();
    Object singleQuery(Object [] objects,String hql);
    Object singleQuery(String hql);
    List<Object>  simpleQuery(Object[] objects,String hql);
    List<Object[]> complexQuery(Object[] objects,String hql);
    List<Object[]> dateQuery(Date date1, Date date2, String hql);
    Long save(Object o);
    void update(Object o);
}
