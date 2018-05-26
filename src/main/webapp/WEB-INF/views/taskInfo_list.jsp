<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/17
  Time: 12:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html class=" JS no-touch" lang="zh" style=""><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>任务列表</title>
    <meta name="applicable-device" content="pc,mobile">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">

    <!-- Stylesheets -->
    <!-- Bootstrap is included in its original form, unaltered -->
    <link rel="stylesheet" href="./css/bootstrap.min.css">


    <!-- Related styles of various icon packs and plugins -->
    <link rel="stylesheet" href="./css/plugins.css">

    <!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->
    <link rel="stylesheet" href="./css/main.css">

    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>


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

            <div id="page-content" style="min-height: 640px;">
                <div class="content-header">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="header-section">
                                <h2>任务列表</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-section text-center">
                    <div class="btn-group gallery-filter">
                        <a href="javascript:void(0)" id="galler_click" class="btn btn-effect-ripple btn-primary active"
                           data-category="all"
                           style="overflow: hidden; position: relative;"><span class="btn-ripple animate"
                                                                               style="height: 54px; width: 54px; top: -11px; left: -19.2656px;"></span>全部</a>

                        <a href="javascript:void(0)" class="btn btn-effect-ripple btn-primary "
                           data-category="ywc" style="overflow: hidden; position: relative;"><span
                                class="btn-ripple animate"
                                style="height: 68px; width: 68px; top: -19px; left: -1.76563px;"></span>已完成</a>

                        <a href="javascript:void(0)" class="btn btn-effect-ripple btn-primary" data-category="wwc"
                           style="overflow: hidden; position: relative;"><span class="btn-ripple animate"
                                                                               style="height: 68px; width: 68px; top: -22px; left: 23px;"></span>未完成</a>

                        <%--<a href="javascript:void(0)" class="btn btn-effect-ripple btn-primary" data-category="hlw"--%>
                        <%--style="overflow: hidden; position: relative;"><span class="btn-ripple animate"--%>
                        <%--style="height: 82px; width: 82px; top: -28px; left: 24px;"></span>腾讯视频</a>--%>
                    </div>
                </div>
                <div class="row gallery" id="gal_body">

                    <%--<div class="col-lg-4">--%>
                        <%--<a href="taskInfo?id=modal-37"--%>
                           <%--class="widget gallery-image-container animation-fadeInQuick" data-toggle="modal"--%>
                           <%--data-category="ywc">--%>
                            <%--<div class="widget-image widget-image-xs">--%>
                                <%--<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1521433057,1623959565&fm=58"--%>
                                     <%--style="width: 100%;height: 100%;min-width: 300px;" alt="image">--%>
                                <%--<div class="widget-image-content">--%>
                                    <%--<h3 class="widget-heading text-light"><strong>任务名称</strong></h3>--%>
                                    <%--<h4 class="widget-heading text-light-op">--%>
                                        <%--任务描述</h4>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="widget-content">--%>
                                <%--<div class="row">--%>
                                    <%--<div class="col-xs-5">--%>
                                        <%--<div class="text-muted"><em>时间 #任务时间</em></div>--%>
                                        <%--<div class="text-dark push-bit">发布者：XX</div>--%>
                                    <%--</div>--%>
                                    <%--<div class="col-xs-7 text-right">--%>
                                        <%--<h2><strong style="color:#afde5c">已完成</strong></h2>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</a>--%>
                    <%--</div>--%>
                    <%--<div class="col-lg-4">--%>
                        <%--<a href="taskInfo?id=modal-37"--%>
                           <%--class="widget gallery-image-container animation-fadeInQuick" data-toggle="modal"--%>
                           <%--data-category="wwc">--%>
                            <%--<div class="widget-image widget-image-xs">--%>
                                <%--<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1521433057,1623959565&fm=58"--%>
                                     <%--style="width: 100%;height: 100%;min-width: 300px;" alt="image">--%>
                                <%--<div class="widget-image-content">--%>
                                    <%--<h3 class="widget-heading text-light"><strong>任务名称1</strong></h3>--%>
                                    <%--<h4 class="widget-heading text-light-op">--%>
                                        <%--任务描述</h4>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <%--<div class="widget-content">--%>
                                <%--<div class="row">--%>
                                    <%--<div class="col-xs-5">--%>
                                        <%--<div class="text-muted"><em>时间 #任务时间</em></div>--%>
                                        <%--<div class="text-dark push-bit">发布者：XX</div>--%>
                                    <%--</div>--%>
                                    <%--<div class="col-xs-7 text-right">--%>
                                        <%--<h2><strong>未完成</strong></h2>--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        <%--</a>--%>
                    <%--</div>--%>
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

<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="./JS/jquery-2.2.0.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
<script src="./JS/app.js"></script>
<script src="./JS/plugins.js"></script>
<script src="./JS/compGallery.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script>
    $(function () {
        CompGallery.init();
    });
    var ii = layer.load(2, {shade: [0.1, '#fff']});
    $.ajax({
        type: "POST",
        url: "/getTaskList",
        data: {},
        dataType: "json",
        error: function () {
            alert("服务器错误");
        },
        success: function (data) {
            var text = ""
            for (var i = 0; i < data.length; i++) {
                var text_color = "";
                var text_status = "wwc"
                var time_length = data[i].taskTime.length;
                var time_text = data[i].taskTime.substring(0, time_length - 2);
                if (data[i].taskStatus == "已完成") {
                    text_color = "#afde5c";
                    text_status = "ywc";
                }
                text += "\n" +
                    "                    <div class=\"col-lg-4\">\n" +
                    "                        <a href=\"taskInfo?id=" + data[i].taskID + "\"\n" +
                    "                           class=\"widget gallery-image-container animation-fadeInQuick\" data-toggle=\"modal\"\n" +
                    "                           data-category=\"" + text_status + "\">\n" +
                    "                            <div class=\"widget-image widget-image-xs\">\n" +
                    "                                <img src=\"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1521433057,1623959565&fm=58\"\n" +
                    "                                     style=\"width: 100%;height: 100%;min-width: 300px;\" alt=\"image\">\n" +
                    "                                <div class=\"widget-image-content\">\n" +
                    "                                    <h3 class=\"widget-heading text-light\"><strong>" + data[i].taskName + "</strong></h3>\n" +
                    "                                    <h4 class=\"widget-heading text-light-op\">\n" +
                    "                                        " + data[i].taskText + "</h4>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"widget-content\">\n" +
                    "                                <div class=\"row\">\n" +
                    "                                    <div class=\"col-xs-5\">\n" +
                    "                                        <div class=\"text-muted\"><em>时间 #" + time_text + "</em></div>\n" +
                    "                                        <div class=\"text-dark push-bit\">发布者：" + data[i].adminName + "</div>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"col-xs-7 text-right\">\n" +
                    "                                        <h2><strong style=\"color:" + text_color + "\">" + data[i].taskStatus + "</strong></h2>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </a>\n" +
                    "                    </div>"
            }
            $("#gal_body").html(text);
            layer.close(ii);
        }
    });
</script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
</body>
</html>