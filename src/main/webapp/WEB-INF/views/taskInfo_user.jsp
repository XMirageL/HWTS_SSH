<%--
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
    <title>任务详情</title>
    <meta name="applicable-device" content="pc,mobile">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <!-- Jquery In Here -->
    <script src="./JS/jquery-2.2.0.min.js"></script>
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
                                <a id="user" href="/user"><i class="fa fa-child sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">用户中心</span></a>
                            </li>
                            <li>
                                <a id="plan" href="/userplan"><i
                                        class="fa fa-calendar-check-o sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">工作进度</span></a>
                            </li>
                            <li>
                                <a id="list" href="/taskInfo_list"><i
                                        class="fa fa-list sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">任务列表</span></a>
                            </li>
                            <li>
                                <a id="help" href="/userinfo"><i class="fa fa-info-circle sidebar-nav-icon"></i><span
                                        class="sidebar-nav-mini-hide">个人资料</span></a>
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
                                <h2>任务详情</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>任务详情</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form action="#" role="form" class="form-horizontal" method="post">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-align-justify"></i>&nbsp;任务标题：</label>

                                            <div class="col-lg-7">
                                                <input type="text" class="form-control" maxlength="18" id="title"
                                                       value=""
                                                       placeholder="输入任务标题（4-18字左右）" disabled>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-cubes"></i>&nbsp;任务分类：</label>

                                            <div class="col-lg-7">
                                                <select class="form-control" id="kinds"
                                                        disabled>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i
                                                    class="fa fa-users sidebar-nav-icon"></i>&nbsp;参与老师：</label>
                                            <div class="col-lg-7" id="teachers">
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-pencil-square"
                                                                                     style="font-size:18px"></i>&nbsp;任务详情：</label>

                                            <div class="col-lg-7">
                                                <textarea type="text" id="details" maxlength="250" class="form-control"
                                                          rows="8" placeholder="任务详情（250字以内）" disabled></textarea>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i
                                                    class="fa fa-qq"></i>&nbsp;发布者：</label>

                                            <div class="col-lg-7" style="top:6px;">

                                                &nbsp;<a target="_blank" id="qq2">XXXX</a><span id="sp_1"
                                                                                                style="display: none"></span>
                                            </div>
                                        </div>

                                        <div class="form-group">

                                            <label class="col-lg-3 control-label">
                                                <i class="fa fa-calendar-check-o sidebar-nav-icon"></i>
                                                &nbsp;工作进度：
                                            </label>
                                            <div class="col-lg-7">
                                                <select class="form-control" id="taskState" disabled>
                                                    <option style="color: red" value="未完成">未完成</option>
                                                    <option style="color: green" value="已完成">已完成</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-calendar-o"></i>&nbsp;发布日期：</label>

                                            <div class="col-lg-7">
                                                <input type="text" class="form-control" id="date"
                                                       value="" disabled>
                                            </div>
                                        </div>
                                        <%--<span class="help-block text-center"><a--%>
                                        <%--href="http://shang.qq.com/v3/widget.html" target="_blank">需开通QQ在线沟通组件权限，已开通的请忽略</a></span>--%>
                                        <%--<div class="form-group">--%>
                                        <%--<div class="col-lg-offset-3 col-lg-7" style="display: none">--%>
                                        <%--<button class="btn btn-sm btn-primary pull-right m-t-n-xs"--%>
                                        <%--type="button" >确认修改--%>
                                        <%--</button>--%>
                                        <%--</div>--%>
                                        <%--</div>--%>
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

</body>
<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="./JS/app.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script>

    var ii = layer.load(2, {shade: [0.1, '#fff']});
    var id = window.location.href.split("id=")[1];
    if (id != null) {
        $.ajax({
            type: "POST",
            url: "/getTaskInfo",
            error: function () {
                //服务器返回失败调用的方法
                alert("服务器错误");
            },
            data: {id: id},
            dataType: "json",
            success: function (data) {
                var info = data[0];
                $("#title").val(info.taskName);
                $("#details").val(info.taskText);
                $("#kinds").html("<option>" + info.kindText + "</option>");
                $("#sp_1").html(info.qq);
                var taskDate = info.taskDate.split("-");
                $("#date").val(taskDate[0] + "年" + taskDate[1] + "月" + taskDate[2] + "日");
                var tsStr = "";
                var teachers = info.teachers.split(",");
                var teachersId = info.teachersId.split(",");
                for (var j = 0; j < teachers.length; j++) {
                    tsStr += "<a href=\"teacherInfo?id=" + teachersId[j] + "\" class=\"btn btn-sm btn-info \" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"查看老师信息\">" + teachers[j] + "</a>  ";
                }
                $("#teachers").append(tsStr);
                if (info.taskState == "已完成") {
                    $("#taskState option[value='已完成']").attr("selected", true);
                    $("#taskState").css("color", "green");
                } else {
                    $("#taskState option[value='未完成']").attr("selected", true);
                    $("#taskState").css("color", "red");
                }
                var qq_text = $("#sp_1").html();
                dataSetName(qq_text)
            }
        });

        function dataSetName(qq) {
            $.ajax({
                type: "POST",
                url: "/getTaskInfo_1",
                data: {qq: qq},
                dataType: "json",
                error: function (data) {
                    //服务器返回失败调用的方法
                    $("#qq2").html(data.mes);
                    $("#qq2").attr("href", "teacherInfo?id=" + data.mes);
                    layer.close(ii);
                },
                success: function (data) {
                    $("#qq2").html(data.mes);
                    $("#qq2").attr("href", "teacherInfo?id=" + data.mes);
                    layer.close(ii);
                }
            });
        }
    }
</script>
</html>
