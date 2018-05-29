function span_press(sp) {
    var ii = layer.load(2, {shade: [0.1, '#fff']});
    var sp_id = $(sp).attr("value");
    var status = $("#sp_" + sp_id).attr("status");
    $.ajax({
        type: "POST",
        url: "/setTaskStatus",
        error: function () {

        },
        data: {status: status, taskId: sp_id},
        success: function (data) {
            if (status == 1 || status == "1") {
                $("#sp_" + sp_id).removeClass("label-success").addClass('label-warning');
                $("#sp_" + sp_id).html("未完成");
                $("#sp_" + sp_id).attr("status", "0");
            } else {
                $("#sp_" + sp_id).removeClass("label-warning").addClass('label-success');
                $("#sp_" + sp_id).html("已完成")
                $("#sp_" + sp_id).attr("status", "1");
            }
            layer.close(ii);
        }
    });
}

function deltask(task) {
    var taskid = $(task).attr("value");
    // alert(taskid);
    var task_title = $("#title_" + taskid).html();
    swal({
        title: "确认删除'" + task_title + "'吗？",
        text: "删除后不可恢复",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
    }, function () {
        $.ajax({
            type: "POST",
            url: "/delTask",
            error: function () {

            },
            data: {taskId: taskid},
            success: function (data) {
                swal("删除成功", "此任务已经永远消失在银河", "success");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        });
    });
}

$(document).ready(function () {

    var ii = layer.load(2, {shade: [0.1, '#fff']});
    $.ajax({
        type: "POST",
        url: "/getAllInfo",
        error: function () {

        },
        data: {},
        dataType: "json",
        success: function (data) {
            var text = "<option value=\"0\" id=\"admin_0\">-</option>";
            for (var i = 0; i < data.length; i++) {
                text += "<option value=\"" + data[i].adminId + "\" id=\"admin_" + data[i].adminId + "\">" + data[i].adminName + "</option>"
            }
            $("#admin").html(text);
            ajax_3();
        }
    });

    function ajax_2() {
        $.ajax({
            type: "POST",
            url: "/getAllTeacher",
            error: function () {

            },
            data: {},
            dataType: "json",
            success: function (data) {
                var text = "";
                for (var i = 0; i < data.length; i++) {
                    text += "<option value=\"" + data[i].teacherId + "\" id=\"admin_" + data[i].teacherId + "\">" + data[i].teacherName + "</option>"
                }
                $("#teacher").html(text);
                ajax_3();
            }
        });
    }

    function ajax_3() {
        $.ajax({
            type: "POST",
            url: "/taskQueryAll",
            error: function () {
            },
            data: {},
            dataType: "json",
            success: function (data) {
                var text = "";
                for (var i = data.length - 1; i >= 0; i--) {
                    var teacher = "";
                    var teacher_name = data[i].taskTeacherName.split(",");
                    var teacher_id = data[i].taskTeacherID.split(",");
                    for (var k = 0; k < teacher_id.length; k++) {
                        teacher += "<a href=\"teacherInfo?id=" + teacher_id[k] + "\">" + teacher_name[k] + "</a>,"
                    }
                    text += "<tr>\n" +
                        "                                <td class=\"text-center\">\n" +
                        "                                    " + data[i].taskId + "" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <strong>" + data[i].taskTime + "</strong>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <a id=\"title_" + data[i].taskId + "\"  href=\"/taskInfo?id=" + data[i].taskId + "\">" + data[i].taskName + "</a>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                   " + teacher.substring(0, teacher.length - 2) + "\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <a href=\"teacherInfo?id=" + data[i].taskAdminName + "\">" + data[i].taskAdminName + "</a>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <span status=\"" + (data[i].taskStatus == "未完成" ? "0" : "1") + "\" id=\"sp_" + data[i].taskId + "\" onclick=\"span_press(this)\" value=\"" + data[i].taskId + "\" class=\"label label-" + (data[i].taskStatus == "未完成" ? "warning" : "success") + "\">" + data[i].taskStatus + "</span>\n" +
                        "                                </td>\n" +
                        "                                <td class=\"text-center\">\n" +
                        "                                    <a href=\"/taskInfo?id=" + data[i].taskId + "\" \n" +
                        "                                       class=\"btn btn-effect-ripple btn-xs btn-success\">\n" +
                        "                                        <i class=\"fa fa-pencil\"></i></a><a href=\"javascript:void(0)\"\n" +
                        "                                                                           onclick=\"deltask(this)\" \n" +
                        "                                                                            value=\"" + data[i].taskId + "\"\n" +
                        "                                                                           class=\"btn btn-effect-ripple btn-xs btn-danger\"><i\n" +
                        "                                        class=\"fa fa-times\">\n" +
                        "                                </i></a>\n" +
                        "                                </td>\n" +
                        "                            </tr>"
                }
                $('#example-datatable').DataTable().destroy();
                // $('#example-datatable').empty();
                $("#tboo").html(text);
                UiTables.init();
                layer.close(ii);
            }
        });
    }

    $("#btn_taskQuery").click(function () {
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $("#select_finsh_1").css("display", "");
        $("#select_finsh_2").css("display", "none");
        var year = $("#select_hyear").val();
        var hyear = $("#select_hyear_1").val();
        var status = $("#status").val();
        var admin = $("#admin").val();
        $.ajax({
            type: "POST",
            url: "/taskQuery2",
            error: function () {

            },
            data: {year: year, hyear: hyear, status: status, admin: admin},
            dataType: "json",
            success: function (data) {
                var text = "";
                for (var i = data.length - 1; i >= 0; i--) {
                    var teacher = "";
                    var teacher_name = data[i].taskTeacherName.split(",");
                    var teacher_id = data[i].taskTeacherID.split(",");
                    for (var k = 0; k < teacher_id.length; k++) {
                        teacher += "<a href=\"teacherInfo?id=" + teacher_id[k] + "\">" + teacher_name[k] + "</a>,"
                    }
                    text += "<tr>\n" +
                        "                                <td class=\"text-center\">\n" +
                        "                                    " + data[i].taskId + "" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <strong>" + data[i].taskTime + "</strong>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <a id=\"title_" + data[i].taskId + "\" href=\"/taskInfo?id=" + data[i].taskId + "\">" + data[i].taskName + "</a>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                   " + teacher.substring(0, teacher.length - 2) + "\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <a href=\"teacherInfo?id=" + data[i].taskAdminName + "\">" + data[i].taskAdminName + "</a>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <span id=\"sp_" + data[i].taskId + "\" status=\"" + (data[i].taskStatus == "未完成" ? "0" : "1") + "\" onclick=\"span_press(this)\" value=\"" + data[i].taskId + "\" class=\"label label-" + (data[i].taskStatus == "未完成" ? "warning" : "success") + "\">" + data[i].taskStatus + "</span>\n" +
                        "                                </td>\n" +
                        "                                <td class=\"text-center\">\n" +
                        "                                    <a href=\"/taskInfo?id=" + data[i].taskId + "\" \n" +
                        "                                       class=\"btn btn-effect-ripple btn-xs btn-success\">\n" +
                        "                                        <i class=\"fa fa-pencil\"></i></a><a href=\"javascript:void(0)\"\n" +
                        "                                                                           onclick=\"deltask(this)\" \n" +
                        "                                                                            value=\"" + data[i].taskId + "\"\n" +
                        "                                                                           class=\"btn btn-effect-ripple btn-xs btn-danger\"><i\n" +
                        "                                        class=\"fa fa-times\">\n" +
                        "                                </i></a>\n" +
                        "                                </td>\n" +
                        "                            </tr>"
                }
                $('#example-datatable').DataTable().destroy();
                // $('#example-datatable').empty();
                $("#tboo").html(text);
                UiTables.init();
                // $("#excel_1").attr("href","downloadTask?year="+year+"&hyear="+hyear+"");
                document.getElementById("excel_1").href = "downloadTask?year=" + year + "&hyear=" + hyear + "";
                layer.close(ii);
            }
        });
    })

    $("#btn_teacherQuery").click(function () {
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        $("#select_finsh_1").css("display", "none");
        $("#select_finsh_2").css("display", "");
        var year = $("#sign_hyear").val();
        var hyear = $("#sign_hyear_1").val();
        var teacher = $("#teacher").val();
        if (teacher != null) {
            teacher = teacher.toString();
        }
        // alert($("#teacher").val());
        $.ajax({
            type: "POST",
            url: "/teacherQuery",
            error: function () {
                //服务器返回失败调用的方法
                $("#btn_teacherQuery").attr("disabled", false);
                alert("服务器错误");
                layer.close(ii);
            },
            data: {year: year, hyear: hyear, teacher: teacher},
            dataType: "json",
            success: function (data) {
                var text = "";
                for (var i = 0; i < data.length; i++) {
                    text += "\n" +
                        "                            <tr>\n" +
                        "                                <td>\n" +
                        "                                    <a href=\"teacherInfo?id=" + data[i].teacherId + "\">" + data[i].teacherName + "</a>\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    " + data[i].taskCount + "\n" +
                        "                                </td>\n" +
                        "                                <td>\n" +
                        "                                    <span class=\"" + (data[i].unfinished == "0" ? " " : "text-danger") + "\">" + data[i].unfinished + "</span>\n" +
                        "                                </td>\n" +
                        "                            </tr>"
                }
                $("#tboo1").html(text);
                // $("#excel_2").attr("href","downloadTeacher?year="+year+"&hyear="+hyear+"");
                document.getElementById("excel_2").href = "downloadTeacher?year=" + year + "&hyear=" + hyear + "";
                layer.close(ii);
            }
        });

    })


});
