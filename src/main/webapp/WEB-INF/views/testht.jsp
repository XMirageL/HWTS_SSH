<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <title>创建Cookie</title>
</head>

<body>
<%
    // 创建一个Cookie,包括(key,value).
    Cookie cookie = new Cookie("cookieName", "cookieValue");

    // 设置Cookie的生命周期,如果设置为负值的话,关闭浏览器就失效.
    cookie.setMaxAge(60*60*24*365);

    // 设置Cookie路径,不设置的话为当前路径(对于Servlet来说为request.getContextPath() + web.xml里配置的该Servlet的url-pattern路径部分)
    // cookie.setPath("/");

    // 输出Cookie
    response.addCookie(cookie);
%>
已创建Cookie. <br>
<a href="ShowCookie.jsp">查看Cookie</a>
</body>
</html>
ShowCookie.jsp
<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <title>读取客户端的Cookie信息</title>
</head>

<body>
读取客户端的Cookie信息. <br>
<%
    // 获得当前路径以及"直接父路径"的所有Cookie对象,如果没有任何Cookie的话,则返回null
    Cookie[] cookies = request.getCookies();

    // 遍历数组,获得具体的Cookie
    if(cookies == null) {
        out.print("没有Cookie信息");
    } else {
        for(int i=0; i<cookies.length; i++) {
            // 获得具体的Cookie
            Cookie cookie = cookies[i];
            // 获得Cookie的名称
            String name = cookie.getName();
            String value = cookie.getValue();
            out.print("Cookie名:"+name+" &nbsp; Cookie值:"+value+"<br>");
        }
    }
%>
</body>
</html>