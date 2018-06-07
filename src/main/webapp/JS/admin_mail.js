$(document).ready(function () {
    $("#mail_testsend").click(function () {
        var acoount = $("#mail_account").val();
        var pwd = $("#mail_pwd").val();
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $.ajax({
            type: "POST",
            url: "/setMailTest",
            error: function () {

            },
            data: {acoount: acoount, pwd: pwd},
            success: function (data) {
                layer.close(ii);
                if (data == 200 || data == "200") {
                    swal("已发送", "", "success");
                } else {
                    swal("发送失败", "未配置正确，请检查授权码是否错误，并查看【详情帮助】", "warning");
                }
            }
        });
    });
    $("#btn_mail1").click(function () {
        var template_text = $("#template").val();
        if (template_text == "") {
            swal("不可留空", "", "warning");
            return;
        }
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $.ajax({
            type: "POST",
            url: "/updateMainInfo1",
            error: function (data) {
                layer.close(ii);
                swal("保存失败", "code:" + data, "warning");
            },
            data: {template_text: template_text},
            success: function (data) {
                layer.close(ii);
                if (data == 200 || data == "200") {
                    swal("已保存", "", "success");
                } else {
                }
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        });
    });
    $("#btn_mail").click(function () {
        var acoount = $("#mail_account").val();
        var pwd = $("#mail_pwd").val();
        if (acoount == "" || pwd == "") {
            swal("不可留空", "请保证帐号密码都正确输入", "warning");
            return;
        }
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $.ajax({
            type: "POST",
            url: "/updateMainInfo",
            error: function (data) {
                layer.close(ii);
                swal("保存失败", "code:" + data, "warning");
            },
            data: {acoount: acoount, pwd: pwd},
            success: function (data) {
                layer.close(ii);
                if (data == 200 || data == "200") {
                    swal("已保存", "", "success");
                } else {
                }
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        });
    });
    var ii = layer.load(2, {shade: [0.1, '#fff']});
    $.ajax({
        type: "POST",
        url: "/getMailInfo",
        error: function () {
        },
        data: {},
        success: function (data) {
            if (data == 201 || data == "201") {
                $("#template").val("请先配置好发信信息");
                $("#template").attr("disabled",true);
            } else {
                // alert(data.substring(1,data.length-1));
                var jsonObj = JSON.parse(data.substring(1, data.length - 1));
                $("#mail_account").val(jsonObj.account);
                $("#mail_pwd").val(jsonObj.pwd);
                $("#template").val(jsonObj.template_text)
                $("#mail_testsend").html("[给 " + jsonObj.account + " 发一封测试邮件]");
                $("#mail_testsend").show();
            }
            layer.close(ii);
        }
    });
});