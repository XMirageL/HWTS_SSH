<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String real_url = "/login";
    String url = request.getParameter("tzurl");
    if (url != null && !url.equals("/404")) {
        real_url = "/login?tzurl="+url;
    }

%>
<html>
<head>
    <title>Title</title>
    <!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <style type="text/css">* {
        padding: 0;
        margin: 0;
    }

    .think_default_text {
        padding: 4px 48px;
    }

    a {
        color: #2E5CD5;
        cursor: pointer;
        text-decoration: none
    }

    a:hover {
        text-decoration: underline;
    }

    body {
        background: #fff;
        font-family: "Century Gothic", "Microsoft yahei";
        color: #333;
        font-size: 18px
    }

    h1 {
        font-size: 100px;
        font-weight: normal;
        margin-bottom: 12px;
    }

    p {
        line-height: 1.6em;
        font-size: 42px
    }</style>
</head>
<body>
<div style="padding: 24px 48px;"><h1>:(</h1>
    <p> 未登录，正在跳回 登录页</p><span style="font-size:22px;">离<a href="
                <%=real_url%>">跳转</a>还有<span id="tiao">3</span>秒</span></div>
</body>
</html>
<script>

    $(document).ready(function () {
        var i = 2;
        setInterval(function () {
            $('#tiao').html(i--);
            if (i == -1) {
                window.location = "<%=real_url%>"
            }
        }, 1000);
    });
</script>

