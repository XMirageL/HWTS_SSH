<%@ page import="java.util.List" %><%--
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
    <title>任务管理</title>
    <meta name="description" content="AppUI is a Web App Bootstrap Admin Template. ">
    <meta name="author" content="pixelcave">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">

    <link rel="stylesheet" href="./appui/css/bootstrap.min-2.1.css">
    <link rel="stylesheet" href="./appui/css/plugins-2.1.css">
    <link rel="stylesheet" href="./appui/css/main-2.1.css">
    <link rel="stylesheet" href="./appui/css/themes-2.1.css">

    <script src="./appui/js/vendor/modernizr-2.8.3.min.js"></script>


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
                                <h2>管理员查找</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>全系查询</strong>
                            </div>
                            <div class="widget-content padded">
                                <div class="widget-content padded">
                                    <form action="./" role="form" method="post">
                                        <input type="hidden" name="do" value="add">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>时间：</strong></div>
                                                <input type="text" id="select_hyear"
                                                       class="form-control input-datepicker"
                                                       data-date-format="yyyy-mm-dd">
                                                <div class="input-group-addon"><strong>至</strong></div>
                                                <input type="text" id="select_hyear_1"
                                                       class="form-control input-datepicker"
                                                       data-date-format="yyyy-mm-dd">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>完成状态：</strong></div>
                                                <select class="form-control btn-block" id="status">
                                                    <option value="0" id="st_0">-</option>
                                                    <option value="1" id="st_2">已完成</option>
                                                    <option value="2" id="st_3">未完成</option>
                                                </select>
                                                <div class="input-group-addon"><strong>发布者：</strong></div>
                                                <select class="form-control btn-block" id="admin">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input type="button" name="submit" value="查任务"
                                            <%--onclick="if(!confirm('是否确认？')) return false;"--%>
                                                   class="btn btn-primary btn-block" id="btn_taskQuery">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--资料卡结束-->


                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>查教师工作次数</strong>
                            </div>
                            <div class="widget-content padded">
                                <div class="widget-content padded">
                                    <form action="./" role="form" method="post">
                                        <input type="hidden" name="do" value="add">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>时间：</strong></div>
                                                <input type="text" id="sign_hyear"
                                                       class="form-control input-datepicker"
                                                       data-date-format="yyyy-mm-dd">
                                                <div class="input-group-addon"><strong>至</strong></div>
                                                <input type="text" id="sign_hyear_1"
                                                       class="form-control input-datepicker"
                                                       data-date-format="yyyy-mm-dd">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-addon"><strong>指定教师：</strong></div>
                                                <select name="example-chosen-multiple" class="select-chosen"
                                                        id="teacher" data-placeholder="指定教师..." style="width: 250px;" multiple>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input type="button" name="submit" value="查次数"
                                            <%--onclick="if(!confirm('是否确认？')) return false;"--%>
                                                   class="btn btn-info btn-block" id="btn_teacherQuery">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="block full" id="select_finsh_1">
                    <div class="block-title">
                        <h2>
                            任务列表&nbsp;<a href="downloadTask?year=2018&amp;hyear=上学期&amp;year_1=2018&amp;hyear_1=下学期"
                                         class="btn btn-info btn-xs"><i class="fa fa-file-excel-o"></i> 查询结果以Excel导出</a>
                        </h2>
                    </div>
                    <div class="table-responsive">
                        <table id="example-datatable" class="table table-striped table-bordered table-vcenter">
                            <thead>
                            <tr>
                                <th class="text-center" style="width: 50px;">
                                    ID
                                </th>
                                <th>
                                    时间(年/月/日)
                                </th>
                                <th>
                                    任务名称
                                </th>
                                <th style="width: 120px;">
                                    所属教师
                                </th>
                                <th>
                                    发布者
                                </th>
                                <th>
                                    状态
                                </th>
                                <th class="text-center" style="width: 75px;">
                                    <i class="fa fa-flash"></i>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="tboo">
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="block full" id="select_finsh_2" style="display:none;">
                    <div class="block-title">
                        <h2>
                            教师任务次数列表&nbsp;<a href="downloadTask?year=2018&amp;hyear=上学期&amp;year_1=2018&amp;hyear_1=下学期"
                                             class="btn btn-info btn-xs"><i class="fa fa-file-excel-o"></i> 查询结果以Excel导出</a>
                        </h2>
                    </div>
                    <div class="table-responsive">
                        <table id="example-datatable_1"
                               class="table table-striped table-bordered table-vcenter leetable">
                            <thead>
                            <tr>
                                <th>
                                    教师名称
                                </th>
                                <th>
                                    任务次数
                                </th>
                                <th>
                                    未完成数
                                </th>
                            </tr>
                            </thead>
                            <tbody id="tboo1">
                            </tbody>
                        </table>
                    </div>
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
<script src="./appui/js/plugins/ckeditor/ckeditor.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script src="./JS/adminque.js"></script>
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
