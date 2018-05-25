<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/17
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    String real_url = null;
    String url = request.getParameter("tzurl");
    if (url == null) {
        real_url = null;
    } else {
        real_url = url;
        System.out.println("LOGIN获取到的URL：" + real_url);
    }
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>用户登录</title>

    <link href="login.css" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="./css/signin.css" rel="stylesheet">

    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js

    "></script>
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">

    <link href="https://cdn.bootcss.com/Ladda/1.0.6/ladda.min.css" rel="stylesheet">


    <!--[if IE]>
    <script src="http://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <![endif]-->
    <style>
        .demo--label {
            /*margin: 20px 20px 0 0;*/
            margin-right: -30px;
            display: inline-block
        }

        .demo--radio {
            display: none
        }

        .demo--radioInput {
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 100%;
            display: inline-block;
            height: 18px;
            margin-right: 10px;
            margin-top: -1px;
            vertical-align: middle;
            width: 18px;
            line-height: 1
        }

        .demo--radio:checked + .demo--radioInput:after {
            background-color: #53b5e6;
            border-radius: 100%;
            content: "";
            display: inline-block;
            height: 12px;
            /*margin: 2px;*/
            margin-left: 2px;
            margin-top: 2px;
            width: 12px
        }

        .demo--checkbox.demo--radioInput, .demo--radio:checked + .demo--checkbox.demo--radioInput:after {
            border-radius: 0
        }
    </style>

</head>

<body>
<div class="container">
    <form class="form-signin">
        <h2 class="form-signin-heading">用户登录</h2>
        <div class="form-group" id="d1">
            <label for="inputEmail" class="sr-only">帐号</label>
            <input type="text" id="inputEmail" class="form-control" placeholder="邮箱" required autofocus>
            <span id="helpBlock1" class="help-block" style="display:none">不得为空</span>
        </div>

        <div class="form-group" id="d2">
            <label for="inputPassword" class="sr-only">密码</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="密码" required>
            <span id="helpBlock2" class="help-block" style="display:none">不得为空</span>
        </div>
        <div class="checkbox">
            <label class="demo--label" style="padding-left : 0px;">
                <input class="demo--radio" type="checkbox" value="remember-me" id="autoLogin">
                <span class="demo--checkbox demo--radioInput"></span><span onselectstart="return false;">七天之内自动登录</span>
            </label>
        </div>
        <center>
            <button class="btn btn-lg btn-primary btn-block ladda-button" id="btlg" data-color="blue"
                    data-style="zoom-out" type="button">登 录
            </button>
        </center>
        <div class="form-group" style="margin-top: 20px;">
            <center>
                - 也可以用以下方式登录 -
            </center>
        </div>
        <div class="form-group" style="margin-top: 20px;">
            <center>
                <a href="login.do" style="padding-left: 18px;padding-right: 18px;color: #00aef0;"><i class="fa fa-qq"
                                                                                                     style="font-size:35px;"></i></a>
                <a href="./" style="color: #ff6d73;padding-left: 18px;padding-right: 18px;"><i class="fa fa-weibo"
                                                                                               style="font-size:40px;"></i></a>
            </center>
        </div>
    </form>

</div> <!-- /container -->

</body>

<script src="https://cdn.bootcss.com/Ladda/1.0.6/spin.min.js"></script>
<script src="https://cdn.bootcss.com/Ladda/1.0.6/ladda.min.js"></script>
<script src="./JS/jquery.min.js"></script>
<script type="text/javascript" src="./JS/Login.js"></script>
<script>


    $(document).ready(function () {
        // Bind normal buttons
        Ladda.bind('#btlg', null);
        var Ladda_l = Ladda.create(document.querySelector('#btlg'));
        $("#btlg").click(function () {
            var regUserName = /[\u4e00-\u9fa5\w]{2,20}/;
            var regPwd = /^\w{6,18}$/;
            var userName = $("#inputEmail").val();
            var pwd = $("#inputPassword").val();
            if (userName == "") {
                $("#inputEmail").focus();
                $("#d1").attr("class", "form-group has-error");
                $("#helpBlock1").attr("style", "");
            } else if (pwd == "") {
                $("#inputPassword").focus();
                $("#d2").attr("class", "form-group has-error");
                $("#helpBlock2").attr("style", "");
            } else if (!regUserName.test(userName) || !regPwd.test(pwd)) {
                Ladda_l.stop();
                $("#inputEmail").focus();
                swal("登录失败", "用户名或密码错误", "error");
            } else {
                var autoLogin = "0";
                if ($('#autoLogin').is(':checked')) {
                    autoLogin = "1";
                }
                $.post("/VerificationLogin", {
                        inputEmail: $('#inputEmail').val(),
                        inputPassword: $('#inputPassword').val(),
                        autoLogin: autoLogin,
                    },
                    function (data) {
                        Ladda_l.stop();
                        if (data == "100") {
                            swal("登录成功", "", "success");
                            window.location.href = "/user";
                        } else if (data == "101") {
                            swal("登录失败", "用户名或密码错误", "error");
                        } else if (data == "103") {
                            swal({title: "欢迎回来！", text: "管理员已登入", imageUrl: "css/admin.png", confirmButtonText: "确定",});
                            setTimeout(function () {
                                window.location.href = "/admin";
                            }, 500)
                        } else if (data == "104") {
                            swal({title: "欢迎回来！", text: "超管已登入", imageUrl: "css/sadmin.png", confirmButtonText: "确定",});
                            setTimeout(function () {
                                window.location.href = "/sadmin";
                            }, 500)
                        } else {
                            swal("网络错误", "请重新尝试", "error")
                        }
                    });
            }
        });
    });


    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btlg").click();
        }
    });

</script>
</html>
