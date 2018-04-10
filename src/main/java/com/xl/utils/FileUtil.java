package com.xl.utils;


import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Iterator;

public class FileUtil {

    public static String upload(HttpServletRequest req, String sPath) {
        //        上传文件的全路径
        String filePath = null;
        File newFile = null;
        //获取服务器路径并指定文件存储路径
        String path = req.getSession().getServletContext().getRealPath(sPath+"/");
        if(!new File(path).exists()){
            new File(path).mkdirs();
        }
        System.out.println(path);
        //创建一个通用的多部分解析器
        CommonsMultipartResolver resolver = new CommonsMultipartResolver(req.getSession().getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if (resolver.isMultipart(req)) {
            //转换成多部分request
            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) (req);
            //取得request中的所有文件名
            Iterator<String> it = multipartHttpServletRequest.getFileNames();
            while (it.hasNext()) {
                //取得上传文件
                MultipartFile file = multipartHttpServletRequest.getFile(it.next());
                if (file != null) {
                    //取得当前上传文件的文件名称
                    String fileName = file.getOriginalFilename();
                    //定义文件路径和文件名
                    filePath = path + fileName;
                    newFile = new File(filePath);
                }
                try {
                    if (newFile != null) {
                        //将文件存入指定路径
                        file.transferTo(newFile);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }
        }
        return filePath;
    }

    public static boolean delete(String filPath){
        File file = new File(filPath);
        if (file.exists()) {
            if (file.delete()) {
                file.delete();
                return true;
            }
        }
        return false;
    }
}
