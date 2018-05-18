<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/20
  Time: 20:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html class=" JS no-touch" lang="zh" style=""><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>超管后台</title>
    <meta name="applicable-device" content="pc,mobile">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
    <script src="./JS/jquery-2.2.0.min.js"></script>

    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">

    <!-- Stylesheets -->
    <!-- Bootstrap is included in its original form, unaltered -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">

    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">

    <!-- Related styles of various icon packs and plugins -->
    <link rel="stylesheet" href="./css/plugins.css">

    <!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->
    <link rel="stylesheet" href="./css/main.css">

    <style>
        .navbar.navbar-inverse.navbar-glass {
            background: #e38e7b;
        }

        .navbar.navbar-inverse,
        .navbar.navbar-inverse.navbar-glass:hover {
            background: #e38e7b;
        }

        .sidebar-title {
            background: #e38e7b;
        }

        .themed-background {
            background: #e38e7b !important;
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
                                <a id="user" href="/sadmin" class="active"><i
                                        class="fa fa-child sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">超管中心</span></a>
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

            <div id="page-content" style="min-height: 640px;">
                <div class="content-header">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h2>超管后台</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>添加管理员</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form role="form" class="form-horizontal" method="post" id="adminInfo">

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-group"></i>&nbsp;归属系部：</label>

                                            <div class="col-lg-8">
                                                <select class="form-control" id="department">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-address-card"></i>&nbsp;管理员名称：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" id="adminName" value="admin-"
                                                       placeholder="为了统一格式，请务必以admin- 开头">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-lock"></i>&nbsp;管理员密码：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" id="adminPwd">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-envelope-open"></i>&nbsp;绑定邮箱：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" maxlength="18" id="email"
                                                       name="email">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i
                                                    class="fa fa-qq"></i>&nbsp;绑定QQ：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" maxlength="11" id="qq"
                                                       name="qq">
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-edit"
                                                                                     style="font-size:19px"></i>绑定手机号：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="phone" id="phone">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <input class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                                       id="modify-submit" type="button" value="添加"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 container-fluid">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>管理员信息修改</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form action="list.php" method="GET" class="form-inline">
                                        <div class="form-group">
                                            <label>搜索管理员</label>
                                            <input type="text" class="form-control" id="find_name"
                                                   placeholder="请直接输入管理员名称">
                                            <select name="type" class="form-control" id="find_select">
                                                <option value="0">全校</option>
                                            </select>
                                        </div>
                                        <button type="button" id="find_bt" class="btn btn-primary">搜索</button>&nbsp;
                                    </form>
                                    <form method="post" name="list1" id="adminInfo1">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>管理员ID</th>
                                                    <th>管理员名称</th>
                                                    <th>归属系部</th>
                                                    <th>密码</th>
                                                    <th>邮箱</th>
                                                    <th>QQ</th>
                                                    <th>手机号</th>
                                                </tr>
                                                </thead>
                                                <tbody id="tbod">
                                                </tbody>
                                            </table>
                                        </div>
                                        <input name="chkAll1" onclick="checkAll(this.checked)" type="checkbox"
                                               id="chkAll1" value="checkbox">&nbsp;全选&nbsp;
                                        <select class="table-responsive" id="pl_edit" name="status">
                                            <option value="0" selected="">-</option>
                                            <option value="1">删除</option>
                                        </select>
                                        <input type="button" name="Submit" value="确定" onclick="pushName()">
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
<!-- END Page Wrapper -->


<!-- 模态框（Modal） -->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    修改管理员【ID:<spam id="modal_adminid">*</spam>】
                </h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i class="fa fa-group"></i>&nbsp;归属系部：</label>
                    <div class="col-lg-8">
                        <select class="form-control" id="modal_department">
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i class="fa fa-address-card"></i>&nbsp;管理员名称：</label>

                    <div class="col-lg-8">
                        <input type="text" class="form-control" id="modal_adminName" value="admin-"
                               placeholder="为了统一格式，请务必以admin- 开头">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i class="fa fa-lock"></i>&nbsp;管理员密码：</label>

                    <div class="col-lg-8">
                        <input type="text" class="form-control" id="modal_adminPwd">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i class="fa fa-envelope-open"></i>&nbsp;绑定邮箱：</label>

                    <div class="col-lg-8">
                        <input type="text" class="form-control" maxlength="18" id="modal_email"
                               name="email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i
                            class="fa fa-qq"></i>&nbsp;绑定QQ：</label>

                    <div class="col-lg-8">
                        <input type="text" class="form-control" maxlength="11" id="modal_qq"
                               name="qq">
                    </div>

                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label"><i class="fa fa-edit"
                                                             style="font-size:19px"></i>绑定手机号：</label>

                    <div class="col-lg-8">
                        <input type="text" class="form-control" name="phone" id="modal_phone">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button type="button" onclick="meth()" class="btn btn-primary">
                    提交更改
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script src="./JS/sadmin.js" type="application/javascript"></script>
<script src="./JS/app.js"></script>
<script>


    function checkAll(checked) {
        var allCheckBoxs = document.getElementsByName("checkbox");
        for (var i = 0; i < allCheckBoxs.length; i++) {
            if (allCheckBoxs[i].type == "checkbox") {
                allCheckBoxs[i].checked = checked;
            }
        }
    }

</script>
</body>
</html>