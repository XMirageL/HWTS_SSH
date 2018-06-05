package com.xl.repository.impl;

import com.xl.entity.THngyAdminInfo;
import com.xl.repository.MainRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@Repository
public class MainRepositoryImpl implements MainRepository {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Session getSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Override
    public Object singleQuery(Object[] objects, String hql) {
        Query query = getSession().createQuery(hql);
        for (int i = 0; i < objects.length; i++) {
            query.setParameter(i, objects[i]);
        }
        return query.uniqueResult();
    }

    @Override
    public Object singleQuery(String hql) {
        return getSession().createQuery(hql).uniqueResult();
    }

    @Override
    public List<Object> simpleQuery(Object[] objects, String hql) {
        Query query = getSession().createQuery(hql);
        if (objects != null)
            for (int i = 0; i < objects.length; i++) {
                query.setParameter(i, objects[i]);
            }
        return query.list();
    }

    @Override
    public List<Object[]> complexQuery(Object[] objects, String hql) {
        Query query = getSession().createQuery(hql);
        for (int i = 0; i < objects.length; i++) {
            query.setParameter(i, objects[i]);
        }
        return query.list();
    }

    @Override
    public List<Object[]> dateQuery(Date date1, Date date2, String hql) {
        return getSession().createQuery(hql).setParameter(0, date1).setParameter(1, date2).list();
    }

    @Override
    public Long save(Object o) {
        long l = (long) getSession().save(o);
        return l;
    }

    @Override
    public void update(Object o) {
        getSession().update(o);
    }

    public void hqltest() {
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work" +
                ".workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText, kind.kindsTaskName, kind.kindsTaskID " +
                ", work.workTaskTime1, work.workTaskTime2, work.workTaskTime3 from THngyWorkTask as work ,THngyLink " +
                "as link,THngyTeacherInfo as teacher,THngyKindsTask as kind where link.workTaskId = work.workTaskId " +
                "and link.teacherId = " +
                "teacher.teacherId and work.workTaskId = ? and work.workTaskKinds = kind.kindsTaskID order by work" +
                ".workTaskTime desc";
        Query query = getSession().createQuery(hql);
    }

}
