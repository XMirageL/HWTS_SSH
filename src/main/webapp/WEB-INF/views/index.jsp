<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/17
  Time: 12:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>任务分发系统-信息院</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
    <script src="./JS/jquery-2.2.0.min.js"></script>

    <!--全局CSS-->
    <link href="./css/front.css" rel="stylesheet">
    <link rel="stylesheet" media="all" href="./css/application.css" data-turbolinks-track="reload">
    <link rel="stylesheet" media="all" href="http://cdn.dkfirst.cn/Glyphicons.min.css">

    <!--导航栏下拉效果JS-->
    <script src="./JS/toggle.js" data-turbolinks-track="reload"></script>



</head>
<body>
<div id="header-holder" class="landing">
    <nav id="nav" class="navbar navbar-default navbar-full">
        <div class="container-fluid">
            <div class="container container-nav">
                <div class="row">
                    <div class="col-md-12">
                        <div class="navbar-header">
                            <button aria-expanded="false" type="button" class="navbar-toggle collapsed"
                                    data-toggle="collapse" data-target="#bs">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="logo-holder" href="./">
                                <div class="logo" style="width:124px;height:75px"></div>
                            </a>
                        </div>
                        <div style="height: 1px;" role="main" aria-expanded="false" class="navbar-collapse collapse"
                             id="bs">
                            <ul class="nav navbar-nav navbar-right">

                                <li><a href="http://www.hunangy.com/" target="_blank">湖南工院</a></li>
                                <li><a href="#articles">关于我们</a></li>

                                <%
                                    if (request.getSession().getAttribute("inputEmail") == null || request.getSession().getAttribute("id") == null) {
                                %>
                                <li class="support-button-holder"><a class="support-button" href="/login">登 录</a></li>
                                <%
                                } else {
                                        if (request.getSession().getAttribute("userType").equals("0")){
                                            %>
                                <li class="alpha-button-holder"><a class="alpha-button" href="/admin">管理中心</a></li> <%
                                        } else if (request.getSession().getAttribute("userType").equals("1")){
                            %>
                                <li class="alpha-button-holder"><a class="alpha-button" href="/user">管理中心</a></li> <%
                                        } else if (request.getSession().getAttribute("userType").equals("9")){
                            %>
                                <li class="alpha-button-holder"><a class="alpha-button" href="/sadmin">管理中心</a></li> <%
                                        }
                                    }
                                %>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div id="top-content" class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <h1 class="big-title"><span>任务分发系统</span><br>FOR 工院信息工程学院</h1>
                    <div style="color:white">目前我们正在为 <font color=red id="teacherNum"></font> 位老师提供了 <font color=red
                                                                                                          id="workNum"></font>
                        个任务分发服务,欢迎您的加入。
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>


<div id="info" class="container-fluid">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="info-text">
                    <p>该系统特点：</p>
                    <p><i class="fa fa-check"></i>&nbsp;1.老师可以登录查看任务</p>
                    <p><i class="fa fa-check"></i>&nbsp;2.管理员可分配给老师们新任务</p>
                    <p><i class="fa fa-check"></i>&nbsp;3.系统合理智能分配任务</p>
                </div>
            </div>
        </div>
    </div>

    <div class="main-visual">
        <div id="join-buttons">

        <span class="pre-sale completed">
            <%
                if (request.getSession().getAttribute("inputEmail") == null || request.getSession().getAttribute("id") == null) {
            %>
          <div><a href="/login" style="color:white;text-decoration:none;"><i class="fa fa-check"></i>立刻登录</a></div>
                                <%
                                } else {
                                    if (request.getSession().getAttribute("userType").equals("0")){
                                %>
          <div><a href="/admin" style="color:white;text-decoration:none;"><i class="fa fa-check"></i>管理中心</a></div><%
        } else if (request.getSession().getAttribute("userType").equals("1")){
        %>
          <div><a href="/user" style="color:white;text-decoration:none;"><i class="fa fa-check"></i>管理中心</a></div> <%
        } else if (request.getSession().getAttribute("userType").equals("9")){
        %>
          <div><a href="/sadmin" style="color:white;text-decoration:none;"><i class="fa fa-check"></i>管理中心</a></div> <%
                }
            }
        %>
        </span>
        </div>
    </div>
</div>

<div id="articles" class="container-fluid zebra">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row-title">制作团队</div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <div class="article-summary">
                    <a href="https://blog.digipulse.io/digipulse-foundations-decision-on-token-management-b07f3a150a28"
                       target="_blank">
                        <div class="article-img"
                             style="background-image:url(http://p.qlogo.cn/gh/175657290/175657290/)"></div>
                    </a>
                    <div class="article-title">
                        <a href="https://blog.digipulse.io/digipulse-foundations-decision-on-token-management-b07f3a150a28"
                           target="_blank">1 6 级 软 件 协 会 移 软 分 部</a>
                    </div>
                    <div class="article-links row">
                        <div class="col-xs-6">
                            <div class="date-holder">
                                &copy;RJXH
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>

<div id="join-slack">
    <div class="container">
        <div class="row text-center">
            <div class="col-sm-6 col-sm-offset-3">
                <h3>Fix & Repairs</h3>
                <p>该程序由三个没有网站开发经验的学生开发，或有许多使用上的问题/BUG，如您在使用上有疑惑请联系"网管" <a
                        href="http://wpa.qq.com/msgrd?v=3&uin=1308109287&site=qq&menu=yes" target="_blank">臧胜</a> 或者发邮件给<a
                        href="mailto:1308109287@qq.com">我们</a>.</p>
                <div>
                    <span id="message"></span>
                </div>
                <button onclick="window.location.href='mailto:1308109287@qq.com'" class="ybtn newsletter ybtn-white ybtn-shadow ybtn-icon">
                    <i class="fa fa-envelope"></i> Welcome to Email us
                </button>
            </div>
        </div>
    </div>
</div>

<div id="footer" class="container-fluid">
    <div class="container">
        <div class="row">
            <div class="col-xs-6 col-sm-2 col-md-3 col-md-offset-1">
                <div class="footer-menu-holder">
                    <h4>制作团队</h4>
                    <ul class="footer-menu">
                        <li><a href="./">软件协会</a></li>
                        <li><a href="./">软件协会-移软部</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-xs-6 col-sm-2 col-md-3">
                <div class="footer-menu-holder">
                    <h4>友情链接</h4>
                    <ul class="footer-menu">
                        <li><a href="http://www.hunangy.com/">湖南工院</a></li>
                        <li><a href="http://www.hunangy.com/">湖南工业职业技术学院</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-xs-6 col-sm-3 col-md-3">
                <div class="footer-menu-holder">
                    <h4>其他</h4>
                    <ul class="footer-menu">
                        <li><a href="https://github.com/XLwn/HWTS_SSH" target="_blank">下载本站源码</a></li>
                        <li><a href="./" target="_blank">下载本站APP</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12 contract">
        <small>Made By: <br><a href="./" target="_blank">软件协会</a></small>
    </div>
</div>

</body>
<script>
    $.post("getInfo/indexInfo", $('#adminInfo').serialize(), function (data) {
        var temp = jQuery.parseJSON(data);
        $("#teacherNum").text(temp.teacherNum);
        $("#workNum").text(temp.workNum);
    });
</script>
</html>
