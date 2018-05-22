<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/21
  Time: 19:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html class=" JS no-touch" lang="zh" style=""><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>发布任务</title>
    <meta name="applicable-device" content="pc,mobile">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- Jquery In Here -->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <!-- bootcss select  CSS & JS in here -->
    <script src="./JS/bootstrap-select.js"></script>
    <link href="./css/bootstrap-select.css" rel="stylesheet">

    <!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->
    <link rel="stylesheet" href="./css/main.css">

    <!-- Bootstrap is included in its original form, unaltered -->
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">

    <!-- Related styles of various icon packs and plugins -->
    <link rel="stylesheet" href="./css/plugins.css">


    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>

    <script>
        $(window).on('load', function () {
            $('.selectpicker').selectpicker({
                'selectedText': 'cat'
            });
        });
    </script>

    <style>
        .navbar.navbar-inverse.navbar-glass {
            background: #7D7D7D;
        }

        .navbar.navbar-inverse,
        .navbar.navbar-inverse.navbar-glass:hover {
            background: #7D7D7D;
        }

        .sidebar-title {
            background: #7D7D7D;
        }

        .themed-background {
            background: #7D7D7D !important;
        }
    </style>
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
        <div id="sidebar">
            <!-- Sidebar Brand -->
            <div id="sidebar-brand" class="themed-background">
                <a href="./" class="sidebar-title">
                    <i class="fa fa-cloud"></i> <span class="sidebar-nav-mini-hide">任务分发系统 V1.0</span>
                </a>
            </div>
            <!-- END Sidebar Brand -->

            <!-- Wrapper for scrolling functionality -->
            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 516px;">
                <div id="sidebar-scroll" style="overflow: hidden; width: auto; height: 516px;">
                    <!-- Sidebar Content -->
                    <div class="sidebar-content">
                        <!-- Sidebar Navigation -->
                        <ul class="sidebar-nav">

                            <li>
                                <a id="user" href="/admin"><i class="fa fa-child sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">管理员中心</span></a>
                            </li>
                            <li>
                                <a id="plan" href="" class="active"><i class="fa fa-users sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">发布任务</span></a>
                            </li>
                            <li>
                                <a id="select" href="/adminquery"><i
                                        class="fa fa-calendar-check-o sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">信息查询</span></a>
                            </li>
                            <li>
                                <a id="import" href="/importInfo"><i
                                        class="fa fa-sign-in sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">批量注册</span></a>
                            </li>
                            <li>
                                <a id="index" href="/loginOut"><i class="fa fa-power-off sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">注销登录</span></a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" id="gongdan" class="sidebar-nav-menu"><i
                                        class="fa fa-chevron-left sidebar-nav-indicator sidebar-nav-mini-hide"></i><i
                                        class="fa fa-info sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">关于我们</span></a>
                                <ul>
                                    <li>
                                        <a href="http://www.hunangy.com/">湖南工院</a>
                                    </li>
                                    <li>
                                        <a href="./">软件协会</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <!-- END Sidebar Navigation -->

                    </div>
                    <!-- END Sidebar Content -->
                </div>
            </div>
            <!-- END Wrapper for scrolling functionality -->

            <!-- Sidebar Extra Info -->
            <div id="sidebar-extra-info" class="sidebar-content sidebar-nav-mini-hide">
                <div class="text-center">
                    <small><a target="_blank">任务分发系统 V1.0</a><br></small>
                    <small><span>2017</span> &copy; <a href="./" target="_blank">RJXH</a></small>
                </div>
            </div>
            <!-- END Sidebar Extra Info -->
        </div>
        <!-- END Main Sidebar -->

        <!-- Main Container -->
        <div id="main-container">
            <!-- Header -->
            <header class="navbar navbar-inverse navbar-fixed-top navbar-glass">
                <!-- Left Header Navigation -->
                <ul class="nav navbar-nav-custom">
                    <!-- Main Sidebar Toggle Button -->
                    <li>
                        <a href="javascript:void(0)" onClick="App.sidebar('toggle-sidebar');this.blur();">
                            <i class="fa fa-ellipsis-v fa-fw animation-fadeInRight" id="sidebar-toggle-mini"></i>
                            <i class="fa fa-bars fa-fw animation-fadeInRight" id="sidebar-toggle-full"></i>菜单
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" onClick="javascript:history.go(-1);">
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

            <div id="page-content" style="min-height: 640px;">
                <div class="content-header">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h2>管理员后台</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>编辑台</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form action="#" role="form" id="form1" class="form-horizontal" method="post">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-align-justify"></i>&nbsp;任务标题：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" maxlength="18" id="title"
                                                       value=""
                                                       placeholder="输入任务标题（4-18字左右）">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i
                                                    class="fa fa-users sidebar-nav-icon"></i>&nbsp;参与老师：</label>
                                            <div class="col-lg-8">
                                                <select style="height: 100px;" multiple="multiple" id="select_teacher"
                                                        class="selectpicker" data-size="10"
                                                        data-live-search="true" data-width="100%">
                                                    <option disabled="true" text-decoration="underline">输入关键字出现联想,红色的表示还有未完成的任务</option>
                                                    <%
                                                        List<Map<String, Object>> teachers = (List<Map<String, Object>>) request.getAttribute("allTeacherInfo");
                                                        int tCount = teachers.size();
                                                        //获取完成任务次数的最大值
                                                        String maxCountStr = String.valueOf(teachers.get(tCount-1).get("taskCount"));
                                                        int maxCount = Integer.parseInt(maxCountStr);
                                                        for (int i = 0; i <= maxCount; i++){%>
                                                    <optgroup label="该学期安排任务次数：<%=i%> ：">
                                                        <%
                                                            for (int j = 0; j < tCount; j++)
                                                            {
                                                                Map<String, Object> teacher = teachers.get(j);
                                                                if (teacher.get("taskCount").toString().equals(String.valueOf(i)))
                                                                {
                                                        %>
                                                        <option style="color: <%=(String.valueOf(teacher.get("unfinished")).equals("0")?"":"red")%>">
                                                            <%=teacher.get("teacherName")%>
                                                        </option>
                                                        <%}%>
                                                        <%}%>
                                                    </optgroup>
                                                    <%}%>
                                                </select>
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-pencil-square"
                                                                                     style="font-size:18px"></i>&nbsp;任务详情：</label>

                                            <div class="col-lg-8">
                                                <textarea type="text" id="details" maxlength="250" class="form-control"
                                                          rows="8" placeholder="输入任务详情"></textarea>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i
                                                    class="fa fa-qq"></i>&nbsp;发布者QQ：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" id="web_qq" name="web_qq"
                                                       maxlength="11" disabled
                                                       placeholder="用于向受任老师提供咨询服务">
                                            </div>
                                        </div>
                                        <span class="help-block text-center"><a
                                                href="http://shang.qq.com/v3/widget.html" target="_blank">需开通QQ在线沟通组件权限，已开通的请忽略</a></span>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                                        type="button" id="task_submit">确认发布
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

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

</body>
<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="./JS/app.js"></script>
<script>
    $.ajax({
        type: "POST",
        url: "/getAdminQQ",
        data: {},
        dataType: "json",
        success: function (data) {
            $("#web_qq").val(data);
        },
        error: function (data) {

        }
    });
</script>
<script src="./JS/adminissue.js"></script>
</html>
