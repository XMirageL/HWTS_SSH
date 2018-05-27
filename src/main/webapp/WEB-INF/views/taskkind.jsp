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
    <title>任务分类</title>
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
        <jsp:include page="head.jsp"></jsp:include>
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
                                <i class="fa fa-fw fa-pencil"></i> <strong>添加任务分类</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="ibox-content">
                                    <form action="#" role="form" class="form-horizontal" method="post">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label"><i class="fa fa-align-justify"></i>&nbsp;分类名称：</label>

                                            <div class="col-lg-8">
                                                <input type="text" class="form-control" id="kind_name"
                                                       value=""
                                                       placeholder="给新分类取个名称吧">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-lg-offset-3 col-lg-8">
                                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                                        type="button" id="kind_submit">确认添加
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="widget">
                            <div class="widget-content themed-background text-light-op">
                                <i class="fa fa-fw fa-pencil"></i> <strong>所有任务分类</strong>
                            </div>
                            <div class="widget-content block full">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>分类ID</th>
                                            <th>分类名称</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tbod">
                                        </tbody>
                                    </table>

                                    <input name="chkAll1" onclick="checkAll(this.checked)" type="checkbox"
                                           id="chkAll1" value="checkbox">&nbsp;全选&nbsp;
                                    <select class="table-responsive" id="pl_edit" name="status">
                                        <option value="0" selected="">-</option>
                                        <option value="1">删除</option>
                                    </select>
                                    <input type="button" name="Submit" value="确定" onclick="pushName()">
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
<%--<script src="./JS/taskkind.js"></script>--%>
<script src="//lib.baomitu.com/layer/2.3/layer.js"></script>
<script>
    function checkAll(checked) {
        var allCheckBoxs = document.getElementsByName("checkbox");
        for (var i = 0; i < allCheckBoxs.length; i++) {
            if (allCheckBoxs[i].type == "checkbox") {
                allCheckBoxs[i].checked = checked;
            }
        }
    }

    function pushName() {
        if ($("#pl_edit").val() == 0) {
            swal("请选择一个事件", "", "info");
            return;
        } else if ($("#pl_edit").val() == 1 || $("#pl_edit").val() == "1") {
            swal({
                title: "确认删除吗？",
                text: "删除该分类将会删除分类下的所有任务",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }, function () {
                var id = document.getElementsByName('checkbox');
                var value = new Array();
                for (var i = 0; i < id.length; i++) {
                    if (id[i].checked)
                        value.push(id[i].value);
                }
                $.ajax({
                    url: "/delKinds",
                    type: "POST",
                    data: {
                        text: value.toString()
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data == 200) {
                            swal("删除成功", "", "success");
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
                        } else {
                            swal("删除失败", "code:" + data, "success");
                        }
                    },
                    error: function () {
                        alert("服务器错误");
                    }
                });
            });
        }
    }

    function sp_click(sp) {
        var sp_id = $(sp).attr("value");
        $("#kindInput_" + sp_id).css("display", "");
        $("#kindInput_" + sp_id).focus()
        $("#kindInput_" + sp_id).select();
        $("#kindName_" + sp_id).css("display", "none");
        $(document).keypress(function (e) {
            // 回车键事件
            if (e.which == 13) {
                var ii = layer.load(2, {shade: [0.1, '#fff']});
                var kindName = $("#kindInput_" + sp_id).val();
                $.ajax({
                    url: "/updateKinds",
                    type: "POST",
                    data: {
                        kindId: sp_id,
                        kindName: kindName
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
        $("#kindInput_" + sp_id).blur(function () {
            var ii = layer.load(2, {shade: [0.1, '#fff']});
            var kindName = $("#kindInput_" + sp_id).val();
            $.ajax({
                url: "/updateKinds",
                type: "POST",
                data: {
                    kindId: sp_id,
                    kindName: kindName
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
//        alert($(sp).attr("value"));
    }

    $(document).ready(function () {


        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $.ajax({
            url: "/getAllKinds",
            type: "POST",
            data: {},
            dataType: "json",
            success: function (data) {
                if (data.length != 0) {
                    var text = "";
                    for (var i = 0; i < data.length; i++) {
                        text += "\n" +
                            "                                        <tr>\n" +
                            "                                            <td><input type=\"checkbox\" id=\"cb_" + data[i].kindsId + "\" name=\"checkbox\" value=\"" + data[i].kindsId + "\"><b>" + data[i].kindsId + "</b></td>\n" +
                            "                                            <td><span onclick=\"sp_click(this)\" id=\"kindName_" + data[i].kindsId + "\" value=\"" + data[i].kindsId + "\">" + data[i].kindsName + "</span>\n" +
                            "                                            <input style=\"width: 75px;display: none\" type=\"text\" id=\"kindInput_" + data[i].kindsId + "\" value=\"" + data[i].kindsName + "\"></td>\n" +
                            "                                            <td><span class=\"btn btn-warning btn-xs\">点击文字直接修改</span></td>\n" +
                            "                                        </tr>"
                    }
                    $("#tbod").html(text);
                }
                layer.close(ii);
            },
            error: function () {
            }
        });

        $("#kind_submit").click(function () {
            var kind_name = $("#kind_name").val();
            if (kind_name == "") {
                swal("请不要留空！", "", "warning");
                return;
            } else {
                swal({
                    title: "确定添加吗？",
                    text: "确定添加此分类吗",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false
                }, function () {
                    $.ajax({
                        url: "/addTaskKinds",
                        type: "POST",
                        data: {
                            kind_name: kind_name
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data == 200) {
                                swal("添加成功！", "", "success");
                                setTimeout(function () {
                                    location.reload();
                                }, 1000);
                            }
                        },
                        error: function () {
                        }
                    });
                });
            }
        })

    });

</script>
</html>
