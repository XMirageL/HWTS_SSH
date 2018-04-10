package com.xl.dao;

import com.xl.utils.Config;
import com.xl.utils.GetSession;
import com.xl.utils.MainUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import com.xl.entity.*;

import java.util.*;

/***
 * 操作数据库的实现类
 * author:臧胜
 */
public class MainDaoImpl implements MainDao {

    private static SessionFactory factory;

    public static final ThreadLocal session = new ThreadLocal();

    public static Session currentSession() {
        Session s = (Session) session.get();
        //open a new session,if this session has none
        if (s == null) {
            s = factory.openSession();
            session.set(s);
        }
        return s;
    }

    public MainDaoImpl() {
        try {
            factory = new Configuration().configure().buildSessionFactory();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /***
     * *****************************************************查询普通用户主页的基本信息
     * @param id id
     * @return 返回object数组类型的查询结果
     */
    @Override
    public Object[] QueryPersonalHomepageInformation(String id) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        //教师姓名，         教研室名                       学院名          已经接工作数
        String hql = "select teacher.teacherName,staff.staffRoomName,department.departmentName,count (work.workTaskId) from THngyTeacherInfo as teacher,THngyStaffRoom as staff,THngyDepartment as department,THngyLink as link,THngyWorkTask as work where teacher.teacherId = ? and teacher.staffRoomId=staff.staffRoomId and staff.departmentId = department.departmentId and link.teacherId = ? and link.workTaskId = work.workTaskId";
        Query query = session.createQuery(hql).setParameter(0, Long.valueOf(id)).setParameter(1, Long.valueOf(id));
        List<Object[]> lists = query.list();
        System.out.println(lists.size());
        Object[] objects = lists.get(0);
        System.out.println("总" + objects[3]);
        //已完成工作数
        hql = "select count(work.workTaskSchedule)from THngyLink as link,THngyWorkTask as work where link.teacherId = ? and link.workTaskId = work.workTaskId and work.workTaskSchedule='已完成'";
        query = session.createQuery(hql).setParameter(0, Long.valueOf(id));
        Object OK = query.uniqueResult();
        session.close();
        g.close();
        Object NO = Integer.parseInt(String.valueOf(objects[3])) - Integer.parseInt(String.valueOf(OK));
        System.out.println("OK" + OK);
        System.out.println("NO" + NO);
        Object[] object = {objects[0], objects[1], objects[2], objects[3], OK, NO};
        return object;
    }

    /***
     * *****************************************************查询学期任务
     * @return 返回list集合类型查询结果
     */
    @Override
    public List<Map<String, Object>> QueryPersonalAdminWorkHomepageInformation(Date date1, Date date2) {
        MainUtil util = new MainUtil();
        Session session = factory.openSession();
        Transaction tx = null;
        List<Object[]> listWork = null;
        try {
            tx = session.beginTransaction();
            String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work.workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink as link,THngyTeacherInfo as teacher where link.workTaskId = work.workTaskId and link.teacherId = teacher.teacherId and work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskTime desc";
            Query query = session.createQuery(hql);
            query.setParameter(0, date1);
            query.setParameter(1, date2);
            listWork = query.list();
            tx.commit();
        } catch (HibernateException e) {
            if (tx != null) tx.rollback();
            System.out.println("查询出错,数据库未返回数据");
            e.printStackTrace();
        } finally {
            session.close();
        }
        if (listWork.size() == 0) {
            return null;
        }

        return util.getWorkInfoUtil(listWork);
    }

    /***
     * *****************************************************查询任务
     * @param id
     * @return 返回list集合类型查询结果
     */
    @Override
    public List<Map<String, Object>> QueryTaskInfo(Long id) {
        MainUtil util = new MainUtil();
        GetSession g = new GetSession();
        Session session = g.getSession();
        String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work.workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink as link,THngyTeacherInfo as teacher where link.workTaskId = work.workTaskId and link.teacherId = teacher.teacherId and work.workTaskId = ? order by work.workTaskTime desc";
        Query query = session.createQuery(hql);
        query.setParameter(0, id);
        List<Object[]> listWork = null;
        listWork = query.list();
        session.close();
        g.close();
        if (listWork.size() == 0) {
            return null;
        }

        return util.getWorkInfoUtil(listWork);
    }

    /***
     * *****************************************************查询用户最近任务
     * @param id
     * @return 返回list集合类型查询结果
     */
    @Override
    public List<Map<String, Object>> QueryUserTaskInfo(Long id, Date date1, Date date2) {
        MainUtil util = new MainUtil();
        GetSession g = new GetSession();
        Session session = g.getSession();
        List<Object[]> listWork = null;
        try {
            String hql = "select work.workTaskId,work.workTaskTime,work.workTaskName,teacher.teacherName,work.workTaskSchedule,teacher.teacherId,work.qq,work.workTaskText from THngyWorkTask as work ,THngyLink as link,THngyTeacherInfo as teacher where link.workTaskId = work.workTaskId and link.teacherId = teacher.teacherId and  teacher.teacherId =? and work.workTaskTime>=? and work.workTaskTime<=? order by work.workTaskTime desc";
            Query query = session.createQuery(hql);
            query.setParameter(0, id);
            query.setParameter(1, date1);
            query.setParameter(2, date2);
            listWork = query.list();
        } catch (Exception e) {
            System.out.printf("管理员：查询用户最近任务出错,无返回结果");
            e.printStackTrace();
        } finally {
            session.close();
            g.close();
        }
        if (listWork.size() == 0) {
            return null;
        }
        return util.getWorkInfoUtil(listWork);
    }



    /***
     * 查询某用户参与的工作
     * @param id
     * @param year
     * @param term
     * @return
     */
    @Override
    public List<Map<String, Object>> QueryUserParticipationWork(String id, String year, String term) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        String hql = "select work.workTaskId,teacher.teacherId, work.workTaskTime,work.workTaskName,work.workTaskSchedule,teacher.teacherName from THngyTeacherInfo as teacher,THngyLink as link, THngyWorkTask as work where teacher.teacherId = ? and link .teacherId = teacher.teacherId and link.workTaskId = work.workTaskId and work.workTaskTerm = ? and YEAR(work.workTaskTime) = ?";
        Query query = session.createQuery(hql).setParameter(0, Long.valueOf(id)).setParameter(1, term).setParameter(2, Integer.parseInt(year));
        List<Object[]> listWork = query.list();
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < listWork.size(); ++i) {
            Map<String, Object> map = new HashMap<String, Object>();
            Object[] object1 = listWork.get(i);
            map.put("0", object1[0]);
            map.put("0", object1[1]);
            map.put("0", object1[2]);
            map.put("0", object1[3]);
            map.put("0", object1[4]);
            map.put("0", object1[5]);
            list.add(map);
        }
        session.close();
        g.close();
        return list;
    }


    /***
     * *****************************************************查询用户个人基本信息
     * @param id
     * @return
     */
    @Override
    public Object[] QueryUserInfo(String id) {
        //System.out.println(id);
        GetSession g = new GetSession();
        Session session = g.getSession();
        String hql = "select teacher.teacherName ,teacher.teacherPhone,teacher.teacherEmail from THngyTeacherInfo as teacher where teacher.teacherId = ?";
        Query query = session.createQuery(hql).setParameter(0, Long.valueOf(id));
        List<Object[]> lists = null;
        try {
            lists = query.list();
            if (lists.size() == 0) {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            session.close();
            g.close();
        }
        Object[] objects = lists != null ? lists.get(0) : null;
        return objects;
    }


    /***
     * *****************************************************查询网站的公告
     * @return 返回公告内容
     */
    @Override
    public String QueryNotice() {
        Session session = factory.openSession();
        Transaction tx = null;
        String Notice = "";
        try {
            tx = session.beginTransaction();
            String hql = "select notice.noticeText from THngyNotice as notice where notice.noticeId = 1000";
            Query query = session.createQuery(hql);
            Notice = (String) query.uniqueResult();
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
        return Notice;
    }

    /***
     * *****************************************************修改公告
     * @param notice 公告内容
     * @return 是否修改成功
     */
    @Override
    public String modifyNotice(String notice) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        Transaction tx = null;
        try {
            session.beginTransaction();
            String hql = "update THngyNotice as notice set notice.noticeText = ? where notice.id = 1000";
            Query query = session.createQuery(hql).setParameter(0, notice);
            query.executeUpdate();
            tx.commit();
        } catch (Exception e) {
            if (tx != null)
                tx.rollback();
            e.printStackTrace();
            return Config.NO;
        } finally {
            session.close();
            g.close();
        }
        return Config.OK;
    }

    /***
     * *****************************************************修改管理员信息
     * @param id 管理员id
     * @param email 管理员邮箱
     * @param qq 管理员qq
     * @param pwd 管理员密码
     * @return 返回一个状态码
     */
    @Override
    public String modifyAdminInfo(String id, String email, String qq, String pwd) {

        try {
            GetSession g = new GetSession();
            Session session = g.getSession();
            Transaction transaction = session.beginTransaction();
            Query query = null;
            String hql = null;
            if (pwd == null || pwd.length() <= 0) {
                hql = "update THngyAdminInfo as admin set admin.adminInfoEmail = ? ,admin.adminInfoQq = ? where admin.id = ?";
                query = session.createQuery(hql).setParameter(0, email).setParameter(1, qq).setParameter(2, Long.parseLong(id));
            } else {
                hql = "update THngyAdminInfo as admin set admin.adminInfoEmail = ? ,admin.adminInfoQq = ?,admin.adminInfoPassWord = ? where admin.id = ?";
                query = session.createQuery(hql).setParameter(0, email).setParameter(1, qq).setParameter(2, pwd).setParameter(3, Long.parseLong(id));
            }
            query.executeUpdate();
            transaction.commit();
            session.close();
            g.close();
        } catch (Exception e) {
            return Config.NO;
        }
        return Config.OK;
    }

    /***
     * *****************************************************修改用户信息
     * @param id 用户id
     * @param email 用户email
     * @param phone 用户手机
     * @param pwd 用户密码
     * @return 状态码
     */
    @Override
    public String modifyUserInfo(String id, String email, String phone, String pwd) {
        //System.out.println(id+"--"+email+"--"+phone+"--"+pwd+"--");
        GetSession g = new GetSession();
        Session session = g.getSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            Query query = null;
            String hql = null;
            if (pwd == null || pwd.length() <= 0) {
                hql = "update THngyTeacherInfo  set teacherEmail = ?,teacherPhone = ? where teacherId = ?";
                query = session.createQuery(hql).setParameter(0, email).setParameter(1, phone).setParameter(2, Long.parseLong(id));
            } else {
                hql = "update THngyTeacherInfo set teacherEmail = ?,teacherPhone = ?,teacherPassword = ? where teacherId = ?";
                query = session.createQuery(hql).setParameter(0, email).setParameter(1, phone).setParameter(2, pwd).setParameter(3, Long.parseLong(id));
            }
            query.executeUpdate();
            tx.commit();

        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();
            return Config.NO;
        } finally {
            session.close();
            g.close();
        }
        return Config.OK;
    }

    /***
     * 查询用户用户的id，名字，已接工作数，未完成工作数，以便管理员发布任务
     * @return
     */
    @Override
    public List<Map<String, Object>> QueryUserID_Name_WorkCount(Date date1, Date date2) {
        return null;
    }

    /***
     * 发布任务，把任务写入数据库
     * @param teacherId 参与工作的id
     * @param tHngyWorkTask 工作表实体类
     * @return
     */
    @Override
    public String insertIssueTasks(List<Long> teacherId, THngyWorkTask tHngyWorkTask) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        Transaction transaction = session.beginTransaction();
        try {

            session.save(tHngyWorkTask);
            transaction.commit();
            session.clear();
        } catch (Exception e) {
            System.out.println(e);
            return Config.Code101;
        }
        String hql = "select max (work.workTaskId) from THngyWorkTask as work";
        Query query = session.createQuery(hql);
        Long o = Long.valueOf(String.valueOf(query.uniqueResult()));
        System.out.println(o);
        for (int i = 0; i < teacherId.size(); ++i) {
            THngyLink tHngyLink = new THngyLink();
            tHngyLink.setTeacherId(teacherId.get(i));
            tHngyLink.setWorkTaskId(o);
            try {

                transaction = session.beginTransaction();
                session.save(tHngyLink);
                transaction.commit();
                session.clear();
            } catch (Exception e) {
                System.out.println(e);
                return Config.Code101;
            }
        }
        session.close();
        g.close();
        return Config.Code100 + "," + String.valueOf(o);
    }

    /***
     * 更新任务
     * @param tHngyWorkTask 工作表实体类
     * @return
     */
    @Override
    public String updataTask(THngyWorkTask tHngyWorkTask) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(tHngyWorkTask);
            transaction.commit();
        } catch (Exception e) {
            System.out.println(e);
            return Config.Code101;
        } finally {
            session.close();
            g.close();
        }
        return Config.Code100;
    }

    /***
     * 根据用户名查询用户Id
     * @param teacherName
     * @return
     */
    @Override
    public Long QueryUserIdByName(String teacherName) {
        GetSession g = new GetSession();
        Session session = g.getSession();
        String hql = "select teacher.teacherId from THngyTeacherInfo as teacher where teacher.teacherName =?";
        Query query = session.createQuery(hql);
        query.setParameter(0, teacherName);
        List<Long> id = query.list();
        session.close();
        g.close();
        return id.get(0);
    }
}
