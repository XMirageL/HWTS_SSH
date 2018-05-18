$(document).ready(function () {


    $("#find_bt").click(function () {
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $("#tbod").html("");
        var find_name = $("#find_name").val();
        var find_select = $("#find_select").val();
        if (find_name == "" && find_select == 0) {
            allAdmininfo();
            layer.close(ii);
        } else {
            condi_select(find_name, find_select);
            layer.close(ii);
        }
    })
    $("#modify-submit").click(function () {
        var department = $("#department").val();
        var sadmin_name = $("#adminName").val();
        var sadmin_pwd = $("#adminPwd").val();
        var sadmin_email = $("#email").val();
        var sadmin_qq = $("#qq").val();
        var sadmin_phone = $("#phone").val();
        if (department == "" || sadmin_name == "" || sadmin_pwd == "" || sadmin_email == "" || sadmin_qq == "" || sadmin_phone == "") {
            swal("添加错误", "请保证每个输入框都不要留空哦", "error");
            return;
        } else {

            // swal({
            //     title: "Ajax请求示例",
            //     text: "提交运行ajax请求",
            //     type: "info",
            //     showCancelButton: true,
            //     closeOnConfirm: false,
            //     showLoaderOnConfirm: true,
            // }, function () {
            //     setTimeout(function () {
            //         swal("Ajax请求完成！");
            //     }, 2000);
            // });

            swal({
                title: "确认添加吗？",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }, function () {
                addAdmin();
            });
        }
    });
    var ii = layer.load(2, {shade: [0.1, '#fff']});
    $.ajax({
        type: "get",
        url: "/sadmin_getInfo_departments",
        dataType: "json",
        success: function (data) {
            var html_text = "";
            for (var i = 0; i < data.length; i++) {
                html_text += ("<option value=\"" + data[i].departmentId + "\" id=\"opt_" + data[i].departmentId + "\">" + data[i].departmentName + "</option>");
            }
            var find_text = $("#find_select").html();
            $("#find_select").html(find_text + html_text);
            $("#department").html(html_text);
            $("#modal_department").html(html_text);
        },
        error: function () {
            alert("服务器错误");
        }
    });
    allAdmininfo();

    function allAdmininfo() {
        $.ajax({
            type: "get",
            url: "/sadmin_getInfo_admin",
            dataType: "json",
            success: function (data) {
                var tbody_text = "";
                for (var i = 0; i < data.length; i++) {
                    tbody_text += "\n" +
                        "                                                <tr>\n" +
                        "                                                    <td><input type=\"checkbox\" id=\"cb_" + data[i][0] + "\" name=\"checkbox\" value=\"" + data[i][0] + "\"><b>" + data[i][0] + "</b></td>\n" +
                        "                                                    <td><span id=\"adminame_" + data[i][0] + "\">" + data[i][1] + "</span></td>\n" +
                        "                                                    <td><span id=\"admindepartment_" + data[i][0] + "\" value=\"" + data[i][7] + "\">" + data[i][2] + "</span></td>\n" +
                        "                                                    <td><span id=\"admindpwd_" + data[i][0] + "\">" + data[i][3] + "</span></td>\n" +
                        "                                                    <td id=\"adminmail_" + data[i][0] + "\">" + data[i][4] + "</td>\n" +
                        "                                                    <td id=\"adminqq_" + data[i][0] + "\">" + data[i][5] + "</td>\n" +
                        "                                                    <td id=\"adminphone_" + data[i][0] + "\">" + data[i][6] + "</td>\n" +
                        "                                                    <td><span id=\"bt_edit_" + data[i][0] + "\" class=\"btn btn-danger btn-xs\" data-toggle=\"modal\"\n" +
                        "                                                              data-target=\"#modalEdit\" onclick=\"setModel(" + data[i][0] + ")\">修改</span></td>\n" +
                        "                                                </tr>";
                    $("#tbod").html(tbody_text);
                }
                layer.close(ii);
            },
            error: function () {
                layer.close(ii);
                alert("服务器错误");
            }
        });
    }

    function condi_select(find_name, find_select) {
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $.ajax({
            url: "/sadmin_findadmin",
            type: "POST",
            data: {
                find_name: find_name,
                find_select: find_select
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 202 || data.code == "202") {
                    var tbody_text = "";
                    tbody_text = "\n" +
                        "                                                <tr>\n" +
                        "                                                    <td>-</td>\n" +
                        "                                                    <td><span>-</span></td>\n" +
                        "                                                    <td><span>-</span></td>\n" +
                        "                                                    <td><span>-</span></td>\n" +
                        "                                                    <td>-</td>\n" +
                        "                                                    <td>-</td>\n" +
                        "                                                    <td>-</td>\n" +
                        "                                                    <td>无</td>\n" +
                        "                                                </tr>"
                    $("#tbod").html(tbody_text);
                } else if (data.code == 200 || data.code == "200") {
                    var objJSON = JSON.parse(data.msg);
                    var tbody_text = "";
                    for (var i = 0; i < objJSON.length; i++) {
                        tbody_text += "\n" +
                            "                                                <tr>\n" +
                            "                                                    <td><input type=\"checkbox\" id=\"cb_" + objJSON[i].adminInfoId + "\" name=\"checkbox\" value=\"" + objJSON[i].adminInfoId + "\"><b>" + objJSON[i].adminInfoId + "</b></td>\n" +
                            "                                                    <td ><span id=\"adminame_" + objJSON[i].adminInfoId + "\">" + objJSON[i].adminInfoName + " </span></td>\n" +
                            "                                                    <td><span id=\"admindepartment_" + objJSON[i].adminInfoId + "\" value=\"" + objJSON[i].departmentId + "\">" + getDepartmentName(objJSON[i].departmentId) + "</span></td>\n" +
                            "                                                    <td><span id=\"admindpwd_" + objJSON[i].adminInfoId + "\">" + objJSON[i].adminInfoPassWord + "</span></td>\n" +
                            "                                                    <td id=\"adminmail_" + objJSON[i].adminInfoId + "\">" + objJSON[i].adminInfoEmail + "</td>\n" +
                            "                                                    <td id=\"adminqq_" + objJSON[i].adminInfoId + "\">" + objJSON[i].adminInfoQq + "</td>\n" +
                            "                                                    <td id=\"adminphone_" + objJSON[i].adminInfoId + "\">" + objJSON[i].adminInfoPhone + "</td>\n" +
                            "                                                    <td><span id=\"bt_edit_" + objJSON[i].adminInfoId + "\" class=\"btn btn-danger btn-xs\" data-toggle=\"modal\"\n" +
                            "                                                              data-target=\"#modalEdit\" onclick=\"setModel(" + objJSON[i].adminInfoId + ")\" >修改</span></td>\n" +
                            "                                                </tr>"
                        $("#tbod").html(tbody_text);
                    }
                }
                layer.close(ii);
            },
            error: function (data) {
                layer.close(ii);
                swal("网络错误", "请重新尝试", "error");
            }
        });
    }

    function addAdmin() {
        var department = $("#department").val();
        var sadmin_name = $("#adminName").val();
        var sadmin_pwd = $("#adminPwd").val();
        var sadmin_email = $("#email").val();
        var sadmin_qq = $("#qq").val();
        var sadmin_phone = $("#phone").val();
        $.ajax({
            url: "/sadmin_addadmin",
            type: "POST",
            data: {
                department: department,
                sadmin_name: sadmin_name,
                sadmin_pwd: sadmin_pwd,
                sadmin_email: sadmin_email,
                qq: sadmin_qq,
                sadmin_phone: sadmin_phone
            },
            dataType: "json",
            success: function (data) {
                if (data == "121") {
                    swal("添加失败", "用户名已存在", "error");
                } else if (data == "122") {
                    swal("添加失败", "该邮箱已存在", "error");
                } else if (data == "123") {
                    swal("添加失败", "该QQ已存在", "error");
                } else if (data == "120") {
                    swal("添加成功", "该管理员已成功创建", "success");
                } else if (data == "124") {
                    swal("添加失败", "未知错误,code:" + data, "error");
                }
            },
            error: function (data) {
                swal("网络错误", "请重新尝试", "error");
            }
        });
    }


    function getDepartmentName(id) {
        var text = $("#opt_" + id).html();
        return text;
    };

    //alert(value);

});

function pushName() {
    if ($("#pl_edit").val() == 0) {
        swal("请选择一个事件", "", "info");
        return;
    } else if ($("#pl_edit").val() == 1 || $("#pl_edit").val() == "1") {
        var id = document.getElementsByName('checkbox');
        var value = new Array();
        for (var i = 0; i < id.length; i++) {
            if (id[i].checked)
                value.push(id[i].value);
        }
        $.ajax({
            url: "/sadmin_del",
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
                layer.close(ii);
                alert("服务器错误");
            }
        });
    }
}

function setModel(model_id) {

    $("#modal_adminid").text(model_id);
    $("#modal_department").val($("#admindepartment_" + model_id).attr("value"));
    $("#modal_adminName").val($("#adminame_" + model_id).html());
    $("#modal_adminPwd").val($("#admindpwd_" + model_id).html());
    $("#modal_email").val($("#adminmail_" + model_id).html());
    $("#modal_qq").val($("#adminqq_" + model_id).html());
    $("#modal_phone").val($("#adminphone_" + model_id).html());

};

function meth() {
    var ii = layer.load(2, {shade: [0.1, '#fff']});
    var id = $("#modal_adminid").text();
    var dep = $("#modal_department").val();
    var name = $("#modal_adminName").val();
    var pwd = $("#modal_adminPwd").val();
    var email = $("#modal_email").val();
    var qq = $("#modal_qq").val();
    var phone = $("#modal_phone").val();
    if (name == "" || pwd == "" || email == "" || qq == "" || phone == "") {
        swal("修改错误", "请保证每个输入框都不要留空哦", "error");
        return;
    }
    // alert(dep + " " + name + " " + pwd + " " + email + " " + qq + " " + phone);
    $.ajax({
        url: "/sadmin_update",
        type: "POST",
        data: {
            id: id,
            dep: dep,
            name: name,
            pwd: pwd,
            email: email,
            qq: qq,
            phone: phone
        },
        dataType: "json",
        success: function (data) {
            if (data == 200) {
                layer.alert('修改成功');
            } else {
                layer.alert('未知错误，修改失败');
            }
            layer.close(ii);
            setTimeout(function () {
                location.reload();
            }, 1000);
        },
        error: function () {
            layer.close(ii);
            alert("服务器错误");
        }
    });
}