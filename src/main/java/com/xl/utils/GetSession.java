package com.xl.utils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/***
 * 获取hibernate的session
 */

public class GetSession {

    private SessionFactory sessionFactory;

    public  Session getSession() {
        sessionFactory = new Configuration().configure().buildSessionFactory();
        return this.sessionFactory.openSession();
    }

    public void close() {
        sessionFactory.close();
    }
}
