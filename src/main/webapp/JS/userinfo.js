$(document).ready(function () {
//修改用户信息
    $('#modify-submit').click(function () {
        //判断是否填写内容
        var email = $('#email').val();
        var pwd = $('#pwd').val();
        var phone = $("#phone").val();
        if (email == "") {
            swal("提交失败", "邮箱内容为空", "error");
            $('#email').focus();
        } else if (phone == "") {
            swal("提交失败", "电话为空", "error");
            $('#phone').focus();
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
                    $.post("modifyUserInfo", $('#userInfo').serialize(), function (data) {
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
});