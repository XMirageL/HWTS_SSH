<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>个人主页</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
    <script src="./JS/jquery-2.2.0.min.js"></script>
    <link rel="stylesheet" href="./assets/css/main.css"/>
    <noscript>
        <link rel="stylesheet" href="./assets/css/noscript.css"/>
    </noscript>

    <!-- sweealert CSS & JS in here -->
    <link href="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
    <%--<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">--%>
    <%--</script>--%>
    <style>
        small {
            font-size: 4px;

        }

    </style>


    <!--页面加载前Loading提示 CSS & JS in here-->
    <link rel="stylesheet" href="http://lee.dkfirst.cn/lee_loading.css">
    <script src="http://lee.dkfirst.cn/lee_loading.js"></script>
</head>
<body class="is-loading">

<!-- Wrapper -->
<div id="wrapper">

    <!-- Main -->
    <section id="main">
        <header>
            <span class="avatar"><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1521433057,1623959565&fm=58" style="width:150px;height:150px" alt="头像" /></span>
            <h1 id="teacherName"></h1>
            <p>点击下方图标选择相应联系方式</p>
        </header>
        <footer>
            <ul class="icons">
                <li><a href="tel:<$教师电话>" class="fa-phone" id="teacherPhone">电话</a></li>
                <li><a href="mailto:<$教师QQ>@qq.com" class="fa fa-envelope" id="teacherEmail">邮箱</a></li>
                <!---QQ图标代码为："fa-qq" 替换上方即可--->
            </ul>
            <ul class="icons">
                <a id="phone">电话：13XXXXXXXXX</a>
            </ul>
            <ul class="icons">
                <a id="email">邮箱：XXX@XXXX.com</a>
            </ul>
        </footer>
    </section>
    <script>
        var id = window.location.href.split("id=")[1];
        if (id != null) {
            $.ajax({
                type: "POST",
                url: "/getTeacherInfo",
                error: function () {
                    //服务器返回失败调用的方法
                    alert("服务器错误");
                },
                data: {id: id},
                dataType: "json",
                success: function (data) {
                    if (data == "101") {
                        alert("获取数据失败");
                        window.history.go(-1);
                    } else {
                        $(document).attr("title",data.teacherName+" - 个人主页");
                        $("#teacherName").text(data.teacherName);
                        $("#phone").text("电话："+data.teacherPhone);
                        $("#email").text("邮箱: "+data.teacherEmail);
                        $("#teacherPhone").attr("href","tel:"+data.teacherPhone);
                        $("#teacherEmail").attr("href","mailto:"+data.teacherEmail);
                    }
                }
            });
        }
    </script>

    <!-- Footer -->
    <footer id="footer">
        <ul class="copyright">
            <small class="help-block">Made BY：<br>RJXH - 移软分部</small>
        </ul>
    </footer>

</div>

<script>
    if ('addEventListener' in window) {
        window.addEventListener('load', function () {
            document.body.className = document.body.className.replace(/\bis-loading\b/, '');
        });
        document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
    }
</script>

</body>
<script>
    function fun() {
        swal({
            title: "提示", text: "点开与该教师的QQ会话窗口前，请确认该教师QQ已开通在线沟通组件！", type: "info",
            showCancelButton: true, confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定", closeOnConfirm: false
        }, function () {
            window.open('http://wpa.qq.com/msgrd?v=3&uin=<$教师QQ>&site=qq&menu=yes')
        });
    }
</script>
</html>