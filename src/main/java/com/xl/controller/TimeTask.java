package com.xl.controller;

import com.xl.repository.impl.MainRepositoryImpl;
import com.xl.service.impl.MainServiceImpl;
import com.xl.utils.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;

import javax.servlet.ServletContext;

/**
 * 继承 定时器任务类
 */

@Controller
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
        ApplicationContext act =
                new ClassPathXmlApplicationContext("Spring/applicationContext.xml");
        MainServiceImpl mainService = (MainServiceImpl) act.getBean("mainServiceImpl");

        /**
         * 此处写执行任务代码
         */
        Date date = new Date();
        if (date.getHours() == Config.Cron_Send_Time && date.getMinutes() <= 60) {
            // 发信时间段
            if (mainService.getCronSend() == Config.OK) {
                String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                System.out.println("======监控守护：此次发信任务已完成，时间：" + time+"======");
            }
        } else {
            // 循环检测时间段
            if (mainService.saveCronInfo() == Config.OK) {
                String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                System.out.println("======监控守护：此次监控任务已完成，时间：" + time+"======");
            }
        }
//        context.log("指定任务执行结束");
    }

}
