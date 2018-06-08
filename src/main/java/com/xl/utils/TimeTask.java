package com.xl.utils;

import java.util.TimerTask;

import javax.servlet.ServletContext;

/**
 * 继承 定时器任务类
 */
public class TimeTask extends TimerTask {

    public TimeTask() {
        super();
    }

    private ServletContext context = null;

    public TimeTask(ServletContext context) {
        this.context = context;
    }

    public void run() {
//        context.log("开始执行指定任务");

        /**
         * 此处写执行任务代码
         */
        // new YouCode().changeState();
        System.out.println("我被执了!!!");
//        context.log("指定任务执行结束");
    }

}
