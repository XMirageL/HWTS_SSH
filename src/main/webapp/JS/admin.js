$(document).ready(function () {

    //修改管理员信息
    $('#modify-submit').click(function () {
        //判断是否填写内容
        var email = $('#email').val();
        var qq = $('#qq').val();
        var pwd = $('#pwd').val();
        if (email == "") {
            swal("提交失败", "邮箱内容为空", "error");
            $('#email').focus();
        } else if (qq == "") {
            swal("提交失败", "qq内容为空", "error");
            $('#qq').focus();
        } else if (pwd != "" && pwd.length < 6) {
            swal("提交失败", "密码长度必须为6位及以上", "error");
            $('#pwd').focus();
        } else {

            swal({
                    title: "确定修改吗？",
                    text: "修改前的数据无法找回",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    confirmButtonText: "确定！",
                    cancelButtonText: "取消！",
                },
                function () {
                    $.post("modifyAdminInfo", $('#adminInfo').serialize(), function (data) {
                        if (data == "200") {
                            $("#pwd").val("");
                            swal("修改信息成功", " ", "success");
                        } else if (data == "201") {
                            swal("修改信息失败", "服务器错误", "error");
                        } else {
                            swal("修改信息失败", "未知原因", "error");
                        }
                    });
                });

        }
    });
    //发布公告
    $('#notice-submit').click(function () {
        var noticeText = $('#notice-text').val(); //获取公告内容
        //判断内容是否为空
        if (noticeText == "") {
            swal("提交失败", "公告内容为空", "error");
        } else {
            swal({
                    title: "确定发布公告吗？",
                    text: " ",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    confirmButtonText: "确定！",
                    cancelButtonText: "取消！",
                },
                function () {
                    //向后台发送请求
                    $.post("modifyNotice", {
                        notice: noticeText
                    }, function (data) {
                        if (data == "201") {
                            swal("发布公告成功", " ", "success");
                        } else if (data == "200") {
                            swal("发布公告失败", "服务器错误", "error");
                        } else {
                            swal("发布公告失败", "未知原因", "error");
                        }
                    });

                });

        }
    });


    $.post("/getInfo/adminInfo", $('#adminInfo').serialize(), function (data) {
        var temp = jQuery.parseJSON(data);
        $("#adminId").val(temp.adminId);
        $("#adminDep").val(temp.adminDep);
        $("#adminName").val(temp.adminName);
        $("#email").val(temp.adminEmail);
        $("#qq").val(temp.adminQQ);
        $("#notice-text").val(temp.notice_text)
    });

    var year = "";
    var hyear = "";
    var mydate = new Date();
    year = mydate.getFullYear();
    var now_month = mydate.getMonth() + 1;
    if (now_month < 8 && now_month > 2) {
        hyear = "上学期"
    } else {
        hyear = "下学期";
    }

    $('#tableQuery').show();
    $("#tableQuery").empty();
    $.ajax({
        type: "POST",
        url: "getInfo/recentTaskInfo",
        error: function () {
            $("#btn_taskQuery").attr("disabled", false);
            //服务器返回失败调用的方法
            alert("服务器错误");
        },
        data: {},
        dataType: "json",
        success: function (data) {
            taskQueryResult(data)
        }
    });

    //查询任务表结果显示
    function taskQueryResult(data) {
        var tableStr = " <div class=\"widget\">" +
            "                            <div class=\"widget-content themed-background text-light-op\">" +
            "                                <i class=\"fa fa-fw fa-pencil\"></i> <strong>最新10个任务</strong>&nbsp;<a href=\"./adminque\"\n" +
            "                                             class=\"btn btn-info btn-xs\">查看全部</a>" +
            // "<a href=\"downloadTask?year="+year+"&hyear="+hyear+"\" class=\"btn btn-info btn-xs\">下载</a>" +
            "                                <div class=\"pull-right\">" +
            "                                    <i id=\"idown2\" class=\"fa fa-chevron-down sidebar-nav-indicator sidebar-nav-mini-hide  \"></i>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div id=\"text2\" class=\"widget-content padded\">" +
            "                                <div class=\"form-group\">" +
            "                                    <table class=\"table table-bordered\">" +
            "                                        <tbody>" +
            "                                        <tr>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>时间(年/月/日)</b></span>" +
            "                                            </td>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>任务名称</b></span>" +
            "                                            </td>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>所属教师</b></span>" +
            "                                            </td>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>状态</b></span>" +
            "                                            </td>" +
            "                                        </tr>";
        for (var i = 0; i < 10; i++) {
            //获取日期
            var taskDate = data[i].taskDate;
            //获取状态
            var taskState = data[i].taskState;
            //获取任务名称和id
            var taskName = data[i].taskName;
            var taskId = data[i].taskId;

            var taskStr = "<a href=\"/taskInfo?id=" + taskId + "\">" + taskName + "</a>";
            //获取所有教师并设置a标签的链接
            var tsStr = "";
            var teachers = data[i].teachers.split(",");
            var teachersId = data[i].teachersId.split(",");
            for (var j = 0; j < teachers.length; j++) {
                tsStr += "<a target='_blank' href=\"teacherInfo?id=" + teachersId[j] + "\">" + teachers[j] + "</a>,";
            }
            tsStr = tsStr.substring(0, tsStr.length - 1);

            tableStr += "<tr>" +
                "<td align=\"center\">" + taskDate + "</td>" +
                "<td align=\"center\">" + taskStr + "</td>" +
                "<td align=\"center\">" + tsStr + "</td>" +
                "<td align=\"center\"><span class=\"text-" + (taskState == "未完成" ? "info" : "success") + "\">" + (taskState == "未完成" ? "未完成" : "已完成") + "</span></td>" +
                "</tr>";
        }
        tableStr += "</tbody>" +
            "                                    </table>" +
            "                                </div>" +
            "                            </div>" +
            "                        </div>";
        $('#tableQuery').append(tableStr);
        $("#text2").hide();

        setTimeout(function () {
            $("#text2").slideDown();
        }, 200);
        layer.close(ii);
    }

});
