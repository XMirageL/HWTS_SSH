$(document).ready(function () {

    $("#inputEmail").blur(function () {
        var userName = $("#inputEmail").val();
        if (userName == "") {
            $("#d1").attr("class", "form-group has-error");
            $("#helpBlock1").attr("style", "");
            return;
        } else {
            $("#d1").attr("class", "form-group has-success");
            $("#helpBlock1").attr("style", "display:none");
        }
    });
    $("#inputPassword").blur(function () {
        var passWord = $("#inputPassword").val();
        if (passWord == "") {
            $("#d2").attr("class", "form-group has-error");
            $("#helpBlock2").attr("style", "");
        } else {
            $("#d2").attr("class", "form-group has-success");
            $("#helpBlock2").attr("style", "display:none");
        }
    });

});

function getLogin() {
    $("#btn_login").attr("disabled", true);
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
                $("#btn_login").attr("disabled", false);
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

                }
            });
    }
}
