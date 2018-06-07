<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/21
  Time: 19:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 9]> <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js">
<!--<![endif]-->
<head>
    <meta charset="utf-8">
    <title>发信配置</title>
    <meta name="author" content="pixelcave">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">

    <link rel="stylesheet" href="./appui/css/bootstrap.min-2.1.css">
    <link rel="stylesheet" href="./appui/css/plugins-2.1.css">
    <link rel="stylesheet" href="./appui/css/main-2.1.css">
    <link rel="stylesheet" href="./appui/css/themes-2.1.css">

    <script src="./appui/js/vendor/modernizr-2.8.3.min.js"></script>
    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>


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
<div id="page-wrapper" class="page-loading-off">
    <div class="preloader">
        <div class="inner">
            <div class="preloader-spinner themed-background hidden-lt-ie10">
            </div>
            <h3 class="text-primary visible-lt-ie10">
                <strong>Loading..</strong></h3>
        </div>
    </div>
    <div id="page-container" class="header-fixed-top sidebar-visible-lg-full enable-cookies">
        <jsp:include page="head.jsp"></jsp:include>
        <div id="main-container">
            <header class="navbar navbar-inverse navbar-fix ed-top">
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
                <ul class="nav navbar-nav-custom pull-right">
                    <!-- User Dropdown -->
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="../images/Logo.png" alt="logo">
                        </a>
                    </li>
                    <!-- END User Dropdown -->
                </ul>
            </header>
            <div id="page-content">
                <div class="content-header" style="margin-top: -70px;">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h2>发信配置</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>发信信息配置</strong>
                            </div>
                            <div class="widget-content padded">
                                <div class="widget-content padded">
                                    <form action="./" role="form" method="post">
                                        <div class="alert alert-info alert-dismissable" style="background: #d9edf7;color: #31708f;">
                                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                ×</button>
                                            <p>
                                                每个管理员需要配置自己的发信信息，用于发布任务时作提醒邮件发送<br>【注意：任何修改QQ密码的操作，都将重置QQ邮箱授权码，所以如果改了QQ密码，请重新获取并设置授权码】</p>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>发信模式：</strong></div>
                                                <select class="form-control" name="mail_cloud" default="0">
                                                    <option value="0">QQ邮箱</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>邮箱SMTP服务器：</strong></div>
                                                <input type="text" class="form-control" name="mail_stmp"
                                                       value="smtp.qq.com" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>邮箱SMTP端口：</strong></div>
                                                <input type="text" class="form-control" name="mail_port" value="465"
                                                       disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>邮箱账号：</strong></div>
                                                <input id="mail_account" type="text" class="form-control" name="mail_name"
                                                       >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>邮箱授权码：</strong></div>
                                                <input id="mail_pwd" type="text" class="form-control" name="mail_pwd"
                                                       >
                                            </div>
                                        </div>
                                        <span class="help-block text-center">如果为QQ邮箱需先开通SMTP，且要填写QQ邮箱独立密码。邮箱SMTP服务器可以百度一下，例如QQ邮箱的即为 smtp.qq.com。邮箱SMTP端口默认为25，SSL的端口是465。<a
                                                href="http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256" target="_blank">【详情帮助】</a></span>
                                        <div class="form-group">
                                            <input type="button" name="submit" value="保存设置"
                                            <%--onclick="if(!confirm('是否确认？')) return false;"--%>
                                                   class="btn btn-info btn-block" id="btn_mail">
                                        </div>
                                        <a id="mail_testsend" style="display: none">[给 438893761@qq.com 发一封测试邮件]</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--资料卡结束-->


                </div>

            </div>
            <div class="text-center push-bit-top-bottom visible-xs">
                <small class="help-block">Made BY：<br>RJXH - 移软分部</small>
            </div>
        </div>
    </div>
</div>

<script src="./appui/jquery/2.1.1/jquery.min.js"></script>
<script src="./appui/js/vendor/bootstrap.min-2.1.js"></script>
<script src="./appui/js/plugins-2.1.js"></script>
<script src="./appui/js/app-2.1.js"></script>
<script src="./appui/js/plugins/ckeditor/ckeditor.js"></script>
<script src="./appui/js/pages/formsComponents.js"></script>
<script src="./appui/js/pages/uiTables.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script src="./JS/admin_mail.js"></script>
<script>
    $(function () {
        FormsComponents.init();
    });
    $(function () {
        UiTables.init();
    });
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth();
    var strDate = date.getDate();
    var month_1 = month + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (month_1 >= 1 && month_1 <= 9) {
        month_1 = "0" + month_1;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    $("#select_hyear").val(year + seperator1 + month + seperator1 + strDate);
    $("#select_hyear_1").val(year + seperator1 + month_1 + seperator1 + strDate);
    $("#sign_hyear").val(year + seperator1 + month + seperator1 + strDate);
    $("#sign_hyear_1").val(year + seperator1 + month_1 + seperator1 + strDate);
</script>
</body>
</html>
