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
    <title>添加系部</title>
    <meta name="author" content="pixelcave">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">

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
        <jsp:include page="head_sa.jsp"/>
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
                    <div class="col-sm-6">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>添加系部</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form role="form" class="form-horizontal" method="post" id="adminInfo">

                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-address-card"></i>&nbsp;系部名称：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" id="dep_name"
                                                       placeholder="****学院">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <input class="btn btn-block btn-primary"
                                                       id="dep_add" type="button" value="添加"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-6 container-fluid">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>系部信息修改</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form method="post" name="list1" id="adminInfo1">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>系部ID</th>
                                                    <th>系部名称</th>
                                                </tr>
                                                <tbody id="tbod">
                                                </tbody>
                                            </table>
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
<!-- END Page Wrapper -->



<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script src="./JS/app.js"></script>
<script src="./JS/sadmin_dep.js" type="application/javascript"></script>
<script>
function setSweet() {
    swal("直接点击文字进行修改","","info");
}
function sp_click(sp) {
    var sp_id = $(sp).attr("value");
    $("#dpinput_" + sp_id).css("display", "");
    $("#dpinput_" + sp_id).focus()
    $("#dpinput_" + sp_id).select();
    $("#dep_" + sp_id).css("display", "none");
    $(document).keypress(function (e) {
        // 回车键事件
        if (e.which == 13) {
            var ii = layer.load(2, {shade: [0.1, '#fff']});
            var dep_name = $("#dpinput_" + sp_id).val();
            $.ajax({
                url: "/sadmin_update_dep",
                type: "POST",
                data: {
                    dep_Id: sp_id,
                    dep_name: dep_name
                },
                dataType: "json",
                success: function (data) {
                    if (data == 200) {
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        swal("修改失败！", "建议重新登录尝试code:" + data, "warning");
                    }
                },
                error: function () {
                }
            });
        }
    });
    $("#dpinput_" + sp_id).blur(function () {
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        var dep_name = $("#dpinput_" + sp_id).val();
        $.ajax({
            url: "/sadmin_update_dep",
            type: "POST",
            data: {
                dep_Id: sp_id,
                dep_name: dep_name
            },
            dataType: "json",
            success: function (data) {
                if (data == 200) {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                } else {
                    swal("修改失败！", "建议重新登录尝试code:" + data, "warning");
                }
            },
            error: function () {
            }
        });
    })
}
$("#dep_add").click(function () {
     var dep_name = $("#dep_name").val();
     if (dep_name == "") {
         swal("不可留空", "", "warning");
         return;
     }
     var ii = layer.load(2, {shade: [0.1, '#fff']});
     $.ajax({
         url: "/sadmin_add_dep",
         type: "POST",
         data: {
             dep_name: dep_name
         },
         dataType: "json",
         success: function (data) {
             if (data == 200 || data == "200") {
                 swal("添加成功", "", "success");
                 setTimeout(function () {
                     location.reload();
                 }, 1000);
             }
             layer.close(ii);
         },
         error: function () {
             alert("服务器错误");
         }
     });
})

</script>
</body>
</html>