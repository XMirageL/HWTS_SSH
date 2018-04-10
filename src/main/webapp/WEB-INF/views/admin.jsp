<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/20
  Time: 20:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html class=" JS no-touch" lang="zh" style=""><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>管理员后台</title>
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
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>

    <!-- Related styles of various icon packs and plugins -->
    <link rel="stylesheet" href="./css/plugins.css">

    <!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->
    <link rel="stylesheet" href="./css/main.css">

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
                                <a id="user" href="/admin" class="active"><i class="fa fa-child sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">管理员中心</span></a>
                            </li>
                            <li>
                                <a id="adminissue" href="/adminissue"><i class="fa fa-users sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">发布任务</span></a>
                            </li>
                            <li>
                                <a id="help" href="/adminquery"><i class="fa fa-users sidebar-nav-icon"></i><span
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
                                <h2>管理员后台</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>资料修改</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form role="form" class="form-horizontal" method="post" id="adminInfo">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-address-card"></i>&nbsp;管理员UID：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control"  disabled="disabled" id="adminId">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-address-card-o"></i>&nbsp;管理员名称：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control"  disabled="disabled" id="adminName">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-envelope-open"></i>&nbsp;绑定邮箱：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control"  placeholder="请填写真实的邮箱地址" maxlength="18" id="email" name="email">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-qq"></i>&nbsp;绑定QQ：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control"  placeholder="请填写真实的QQ号" maxlength="11"  id="qq" name="qq">
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-edit" style="font-size:19px"></i>新密码：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" name="pwd" placeholder="不修改请留空" id="pwd">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <input class="btn btn-sm btn-primary pull-right m-t-n-xs" id="modify-submit" type="button" value="保存修改"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>前台信息修改</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form role="form" class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-bullhorn"></i>&nbsp;教师页面公告内容：</label>
                                            <div class="col-lg-8">
                                                <textarea type="text" class="form-control" rows="11" id="notice-text"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <input class="btn btn-sm btn-primary pull-right m-t-n-xs" id="notice-submit" type="button" value="保存修改"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12" id="tableQuery" style="display: none">
                        <!--动态获取表格-->
                    </div>
                    <%--<div class="col-sm-12">--%>
                        <%--<div class="widget">--%>
                            <%--<div class="widget-content themed-background text-light-op">--%>
                                <%--<i class="fa fa-fw fa-pencil"></i> <strong>最近任务</strong>--%>
                            <%--</div>--%>
                            <%--<div class="widget-content padded">--%>
                                <%--<div class="form-group">--%>
                                    <%--&lt;%&ndash;<form action="?" method="post">&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;<div class="formrow">&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;<input type="hidden" name="do" value="reg">&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;<input type="submit" name="submit" value="领取奖励" class="btn btn btn-block btn-info">&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;</form>&ndash;%&gt;--%>
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
                                        <%--<c:forEach items="${work}" var="item">--%>
                                        <%--<tr>--%>
                                        <%--<td align="center">${item.get("0")}</td>--%>
                                        <%--<td align="center">${item.get("1")}</td>--%>
                                        <%--<td align="center">${item.get("2")}</td>--%>
                                        <%--<td align="center"><span class="text-${item.get("3")=="已完成"?"success":"info"}">${item.get("3")}</span></td>--%>
                                        <%--</tr>--%>
                                        <%--</c:forEach>--%>
                                        <%--</tbody>--%>
                                    <%--</table>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>

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


<script src="./JS/admin.js"></script>
<script src="./JS/app.js"></script>
</body>
</html>