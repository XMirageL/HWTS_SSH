package com.xl.repository;

import java.io.Serializable;
import java.util.List;

/**
 * 这个接口定义一些十分通用的方法
 * Created by XRom
 * On 11/16/2017.11:52 PM
 */
public interface DomainRepository<T, PK extends Serializable> {



    //根据ID获取Entity
    T load(PK id);

    //根据ID获取Entity
    T get(PK id);

    //获取表中所有数据
    List<T> findAll();

    void persist(T entity);

    //保存
    PK save(T entity);

    //保存或更新
    void saveOrUpdate(T entity);

    //删除
    void delete(PK id);

    void flush();
}