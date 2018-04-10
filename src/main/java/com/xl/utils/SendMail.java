package com.xl.utils;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import java.util.Properties;

/***
 *发送邮件的工具类
 * author:臧胜
 */
public class SendMail
{
    public InternetAddress[] getInternetAddresses(String[] Email) throws AddressException
    {
        InternetAddress[] internetAddresses = new InternetAddress[Email.length];
        for (int i = 0; i < Email.length; ++i)
        {
            System.out.println("第"+i+"个是"+Email[i]);
            internetAddresses[i] = new InternetAddress(Email[i]);
        }
        return internetAddresses;
    }


// //Test
//    public static void main(String args[]){
//        String[] toEmail = new String[1];
//        toEmail[0] = "1278991552@qq.com";
//        new SendMail().send("傻逼","傻逼",toEmail);
//    }

    public  boolean send(String Subject, String Text, String[] toEmail)
    {

        //返回一个标识，邮件是否发送成功了
        boolean right = true;
        try
        {
            InternetAddress[] internetAddresses = getInternetAddresses(toEmail);
            Properties properties = new Properties();
            properties.put("mail.transport.protocol", "smtp");// 连接协议
            properties.put("mail.smtp.host", "smtp.qq.com");// 主机名
            properties.put("mail.smtp.port", 465);// 端口号
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.ssl.enable", "true");// 设置是否使用ssl安全连接 ---一般都使用
            properties.put("mail.debug", "true");// 设置是否显示debug信息 true 会在控制台显示相关信息
            // 得到会话对象
            Session session = Session.getInstance(properties);
            Message message = new MimeMessage(session);
            // 设置发件人邮箱地址
            message.setFrom(new InternetAddress(Config.FromMail));
            // 设置收件人地址
            message.setRecipients(RecipientType.TO, internetAddresses);
            // 设置邮件标题和内容
            message.setSubject(Subject);
            message.setText(Text);
            Transport transport = session.getTransport();
            transport.connect(Config.FromMail, Config.EmailPassWorld);// 密码为授权码
            transport.sendMessage(message, message.getAllRecipients());// 发送邮件
        } catch (Exception e)
        {
            right = false;
            e.printStackTrace();
            System.err.println("！！！！！！邮件发送出现异常，club.zslsj.utils包下SendMail类的send方法！！！！！！");
        }
        return right;
    }
}