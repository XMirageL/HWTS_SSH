<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/3/15
  Time: 10:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html class=" JS no-touch" lang="zh" style="">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>导入教师注册信息</title>
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
                                <a id="plan" href="/adminissue"><i class="fa fa-users sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">发布任务</span></a>
                            </li>
                            <li>
                                <a id="select" href="/adminquery"><i
                                        class="fa fa-calendar-check-o sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">信息查询</span></a>
                            </li>
                            <li>
                                <a id="import" href="" class="active"><i
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
                            <img src="./css/Logo.png" alt="logo">
                        </a>
                    </li>
                    <!-- END User Dropdown -->
                </ul>
                <!-- END Right Header Navigation -->
            </header>

            <div id="page-content" style="min-height: 959px;">
                <!-- Widgets Header -->
                <div class="content-header">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h1>批量导入</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Widgets Header -->
                <!-- Content -->
                <div class="row">

                    <div class="col-md-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>Excel表批量注册</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form id="file_form" action="./importInfo" role="form"
                                          class="form-horizontal form-bordered" enctype="multipart/form-data"
                                          method="post">

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">文件格式：</label>

                                            <div class="col-lg-8">
                                                <select name="isyaoqing" class="form-control">
                                                    <option value="1">.xls</option>
                                                    <option value="0">.txt</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 control-label" for="file_input">选择文件</label>
                                            <div class="col-md-9">
                                                <input type="file" id="file_input" name="record" required="">
                                                <span class="help-block">必须严格要求格式，否则注册失败</span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <button id="bt_import"
                                                        class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                                        type="button">保存提交
                                                </button>
                                                <button
                                                        class="btn btn-sm btn-info pull-right m-t-n-xs"
                                                        data-toggle="modal" data-target="#Help" type="button">提交帮助
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>手动注册</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form action="#" role="form" class="form-horizontal" method="post">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">教师ID：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="web_name"  id="teacherid"
                                                       disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">教师姓名：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="web_name" id="techername"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">归属教研室：</label>

                                            <div class="col-lg-8">
                                                <select name="isyaoqing" class="form-control" id="teacherstaff">
                                                    <option value="1">5306教室</option>
                                                    <option value="0">5305教室</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">教师邮箱：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="web_name" id="teacheremail"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">教师手机号：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="web_name"
                                                       onkeyup="value=value.replace(/[^\d]/g,'')" id="teacherphone"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">登录密码：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="web_name" value="123456" id="teacherpwd"
                                                >
                                            </div>
                                            <br>
                                        </div>
                                        <div class="form-group">
                                            <span class="help-block text-center">教师密码默认设置为123456，当教师初次登录时会强制要改新密码</span>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                                        type="button" id="bt_add">保存提交
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="Help" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        ×
                                    </button>
                                    <h4 class="modal-title" id="day_ModalLabel">
                                        怎么用Excel批量注册教师信息
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <strong> Excel表要求文件格式：</strong>.xls<br><br>
                                    <strong> Excel表名字要求：</strong>无要求<br><br>
                                    <strong> Excel表大小要求：</strong>无限制<br><br>
                                    <strong> Excel表内容格式要求：</strong>3 x *  （ 列限制3格 行无限）<br><br>
                                    每行4列<br>第一列为<strong>教师姓名</strong><br>第二列为教师归属<strong>教师邮箱</strong><br>第三列为<strong>教师联系电话</strong><br>
                                    <br><strong>教师密码</strong>不需设置，统一默认设置为<strong>123456</strong><br><br>
                                    <strong>格式符合的Excel表 可直接选择上传</strong><br>
                                    例子截图如下：<br>
                                    <img width="95%" src="./images/help_1.png" alt="说明截图">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                    </button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                    </div>

                </div>
                <!-- End Content -->
            </div>


        </div>
    </div>
</div>
</body>

<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="./JS/app.js"></script>
<script src="./JS/importInfo.js"></script>
</html>
