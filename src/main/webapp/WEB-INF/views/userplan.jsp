<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/21
  Time: 11:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html class=" JS no-touch" lang="zh" style=""><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>工作进度</title>
    <meta name="applicable-device" content="pc,mobile">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
    <script src="./JS/jquery-2.2.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">

    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
    <!-- Stylesheets -->
    <!-- Bootstrap is included in its original form, unaltered -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">

    <!-- Related styles of various icon packs and plugins -->
    <link rel="stylesheet" href="./css/plugins.css">

    <!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->
    <link rel="stylesheet" href="./css/main.css">


</head>
<body>
<!-- Page Wrapper -->
<div id="page-wrapper" class="page-loading-off">
    <!-- Preloader -->
    <div class="preloader">
        <div class="inner">
            <!-- Animation spinner for all modern browsers -->
            <div class="preloader-spinner themed-background hidden-lt-ie10"></div>

            <!-- Text for IE9 -->
            <h3 class="text-primary visible-lt-ie10"><strong>Loading..</strong></h3>
        </div>
    </div>
    <!-- END Preloader -->

    <!-- Page Container -->
    <div id="page-container" class="header-fixed-top sidebar-visible-lg-full">
        <!-- Main Sidebar -->
        <jsp:include page="head_teacher.jsp"/>
        <!-- END Main Sidebar -->

        <!-- Main Container -->
        <div id="main-container">
            <!-- Header -->
            <header class="navbar navbar-inverse navbar-fixed-top navbar-glass">
                <!-- Left Header Navigation -->
                <ul class="nav navbar-nav-custom">
                    <!-- Main Sidebar Toggle Button -->
                    <li>
                        <a href="javascript:void(0)" onclick="App.sidebar('toggle-sidebar');this.blur();">
                            <i class="fa fa-ellipsis-v fa-fw animation-fadeInRight" id="sidebar-toggle-mini"></i>
                            <i class="fa fa-bars fa-fw animation-fadeInRight" id="sidebar-toggle-full"></i>菜单
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" onclick="javascript:history.go(-1);">
                            <i class="fa fa-reply fa-fw animation-fadeInRight"></i> 返回
                        </a>
                    </li>
                    <!-- END Main Sidebar Toggle Button -->
                </ul>
                <!-- END Left Header Navigation -->

                <!-- Right Header Navigation -->
                <ul class="nav navbar-nav-custom pull-right">
                    <!-- User Dropdown -->
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="./images/Logo.png" alt="logo">
                        </a>
                    </li>
                    <!-- END User Dropdown -->
                </ul>
                <!-- END Right Header Navigation -->
            </header>
            <!-- END Header -->
            <!-- Page content -->

            <div id="page-content" style="min-height: 500px;">
                <div class="content-header">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h2>工作进度</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-bar-chart"></i> <strong>报表</strong>
                            </div>
                            <div class="widget-content padded">
                                <p>当前学期是：<span class="text-danger" id="xueqi"></span></p>
                                <small><span class="text-info">学期进度：</span></small>
                                <div class="progress progress-striped active">
                                    <div class="progress-bar progress-bar-info" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 80%;">
                                        <span class="sr-only">80% 完成（学期进度）</span>
                                    </div>
                                </div>
                                <small><span class="text-success">任务进度：</span></small>
                                <div class="progress progress-striped active">
                                    <div class="progress-bar progress-bar-success" role="progressbar"
                                         aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                         style="width: 90%;">
                                        <span class="sr-only">90% 完成（任务进度）</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--资料卡结束-->

                    <%--<div class="col-sm-6">--%>
                        <%--<div class="widget">--%>
                            <%--<div class="widget-content themed-background text-light-op">--%>
                                <%--<i class="fa fa-fw fa-pencil"></i> <strong>查询</strong>--%>
                            <%--</div>--%>
                            <%--<div class="widget-content padded">--%>
                                <%--<div class="widget-content padded">--%>
                                    <%--<form action="./" role="form" method="post">--%>
                                        <%--<input type="hidden" name="do" value="add">--%>
                                        <%--<div class="form-group">--%>
                                            <%--<div class="input-group">--%>
                                                <%--<select name="year" class="form-control">--%>
                                                    <%--<option value="2010">2010</option>--%>
                                                    <%--<option value="2011">2011</option>--%>
                                                    <%--<option value="2012">2012</option>--%>
                                                    <%--<option value="2013">2013</option>--%>
                                                <%--</select>--%>
                                                <%--<div class="input-group-addon"><strong>年</strong></div>--%>
                                                <%--<select name="hyear" class="form-control">--%>
                                                    <%--<option value="上半年">上半年</option>--%>
                                                    <%--<option value="下半年">下半年</option>--%>
                                                <%--</select>--%>
                                            <%--</div>--%>
                                        <%--</div>--%>
                                        <%--<div class="form-group">--%>
                                            <%--<input type="submit" name="submit" value="确认查询"--%>
                                            <%--&lt;%&ndash;onclick="if(!confirm('是否确认？')) return false;"&ndash;%&gt;--%>
                                                   <%--class="btn btn-primary btn-block">--%>
                                        <%--</div>--%>
                                    <%--</form>--%>
                                <%--</div>--%>
                                <%--<p>您当前查询的学期是：</p>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <%--<!--资料卡结束-->--%>

                    <div class="col-sm-12" id="tableQuery" style="display: none">
                        <!--动态获取表格-->
                    </div>
                    <%--<div class="col-sm-12">--%>
                        <%--<div class="widget">--%>
                            <%--<div class="widget-content themed-background text-light-op">--%>
                                <%--<i class="fa fa-bars"></i> <strong>查询-结果</strong>--%>
                            <%--</div>--%>
                            <%--<div class="widget-content padded">--%>
                                <%--<div class="form-group">--%>
                                    <%--<table class="table table-bordered">--%>
                                        <%--<tbody>--%>
                                        <%--<tr>--%>
                                            <%--<td align="center"><span style="color:silver;"><b>时间(月/日)</b></span>--%>
                                            <%--</td>--%>
                                            <%--<td align="center"><span style="color:silver;"><b>任务名称</b></span>--%>
                                            <%--</td>--%>
                                            <%--<td align="center"><span style="color:silver;"><b>所属教师</b></span>--%>
                                            <%--</td>--%>
                                            <%--<td align="center"><span style="color:silver;"><b>状态</b></span>--%>
                                            <%--</td>--%>
                                        <%--</tr>--%>
                                        <%--<tr>--%>
                                            <%--<td align="center">11月11日</td>--%>
                                            <%--<td align="center">16下半年单招活动</td>--%>
                                            <%--<td align="center">李俊成</td>--%>
                                            <%--<td align="center">未完成</td>--%>
                                        <%--</tr>--%>
                                        <%--<tr>--%>
                                            <%--<td align="center">11月12日</td>--%>
                                            <%--<td align="center">XXXXXXXX</td>--%>
                                            <%--<td align="center">XXX</td>--%>
                                            <%--<td align="center">XXX</td>--%>
                                        <%--</tr>--%>
                                        <%--</tbody>--%>
                                    <%--</table>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <!--资料卡结束-->
                </div>
            </div>

            <div class="text-center push-bit-top-bottom visible-xs">
                <small class="help-block">Made BY：<br>RJXH - 移软分部</small>
            </div>
            <!-- END Page Content -->
        </div>
        <!-- END Main Container -->
    </div>
    <!-- END Page Container -->
</div>
<!-- END Page Wrapper -->

<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="./JS/jquery-2.2.0.min.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script src="./JS/userPlan.js"></script>
<script src="./JS/app.js"></script>
</body>
</html>