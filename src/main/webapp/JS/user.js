var ii = layer.load(2, {shade: [0.1, '#fff']});

$.ajax({
    type: "POST",
    url: "/getPwdCheck",
    data: {},
    dataType: "json",
    error: function () {
    },
    success: function (data) {
        if (data == 200) {
            swal({
                title: "请立即修改您的密码！",
                text: "检测到您的密码为初始密码，安全性较低，请立即修改密码！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "立即修改",
                cancelButtonText: "下次再说",
                closeOnConfirm: false
            }, function () {
                window.location.href = '/userinfo';
            });
        }
    }
});
$.ajax({
    type: "POST",
    url: "/userNotFinish",
    data: {},
    dataType: "json",
    error: function () {
        layer.close(ii);
        alert("服务器错误");
    },
    success: function (data) {
        layer.close(ii);
        if (data.length == 0) {
            $("#tbod").html("<tr>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>时间(年/月/日)</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>任务名称</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>发布人</b></span></td>\n" +
                "                                        </tr>\n" +
                "<tr>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>-</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b><font color='#5ccdde'>您已做完所有任务</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>-</b></span></td>\n" +
                "                                        </tr>")
        } else {
            var body = "\n" +
                "                                        <tr>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>时间(年/月/日)</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>任务名称</b></span></td>\n" +
                "                                            <td align=\"center\"><span style=\"color:silver;\"><b>发布人</b></span></td>\n" +
                "                                        </tr>";
            for (var i = 0; i < data.length; i++) {
                body += "\n" +
                    "                                        <tr>\n" +
                    "                                            <td align=\"center\">" + data[i].taskDate + "</td>\n" +
                    "                                            <td align=\"center\"><a href=\"/taskInfo?id=" + data[i].taskId + "\">" + data[i].taskName + "</a></td>\n" +
                    "                                            <td align=\"center\"><a target=\"_blank\" href=\"/teacherInfo?id=" + data[i].adminName + "\"> <span\n" +
                    "                                                    class=\"text-info\">" + data[i].adminName + "</span></a></td>\n" +
                    "                                        </tr>"
            }
            $("#tbod").html(body)
        }
    }
});

