$(document).ready(function () {


    $("#bt_add").click(function () {
        var teacherid = $("#teacherid").val();
        var techername = $("#techername").val();
        var teacherstaff = $('#teacherstaff option:selected').attr('value');
        var teacheremail = $("#teacheremail").val();
        var teacherphone = $("#teacherphone").val();
        var teacherpwd = $("#teacherpwd").val();
        if (teacherid.length == 0 || techername.length == 0 || teacherstaff.length == 0 || teacheremail.length == 0 || teacherphone.length == 0 || teacherpwd.length == 0) {
            swal("请不要留空", "", "error");
            return;
        }
        $.ajax({
            url: "/addTeacher",
            type: "POST",
            data: {
                teacherid: teacherid,
                techername: techername,
                teacherstaff: teacherstaff,
                teacheremail: teacheremail,
                teacherphone: teacherphone,
                teacherpwd: teacherpwd
            },
            dataType: "json",
            success: function (data) {
                if (data == 200) {
                    swal("注册成功", "", "success");
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                } else {
                    swal("注册失败", "code:" + data, "error");
                }
            },
            error: function (data) {
                swal("网络错误", "请重新尝试", "error");
            }
        });
    });

    $('#bt_import').click(function () {
        var fileName = $('#file_input').val();
        if (fileName === '') {
            swal("请选择文件", "", "error")
            return false;
        }
        var fileType = (fileName.substring(fileName
            .lastIndexOf(".") + 1, fileName.length))
            .toLowerCase();
        if (fileType !== 'xls') {
            swal("格式不支持", "仅支持.xls", "error")
            return false;
        }
        swal({
            title: "确认提交吗？",
            text: "提交Excel数据到数据库",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
        }, function () {
            setTimeout(function () {
                ajax_task();
            }, 1000);
        });
    });

    //ajax向后台发送请求
    function ajax_task() {
        // var title = $('#title').val();//任务标题
        var formData = new FormData($("#file_form")[0]);
        $.ajax({
            url: '/fileupload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            error: function (data) {
                if (data == 200) {
                    swal("插入成功", "教师信息已全部导入", "success")
                } else {
                    swal("插入失败", "请仔细检查Excel表是否符合格式", "error")
                }
            },
            success: function (data) {
                if (data == 200) {
                    swal("插入成功", "教师信息已全部导入", "success")
                } else {
                    swal("插入失败", "请仔细检查Excel表是否符合格式", "error")
                }
            }
        });
    }

    var ii = layer.load(2, {shade: [0.1, '#fff']});
    $.ajax({
        type: "get",
        url: "/getimportInfo",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                $("#teacherid").val(data.maxid);
                var select_text = "";
                var objson1 = data.staffid.split(",");
                var objson2 = data.staffname.split(",");
                for (var i = 0; i < objson1.length - 1; i++) {
                    // alert(objson1[i]);
                    select_text += "<option value=\"" + objson1[i] + "\" id=\"op_" + objson1[i] + "\">" + objson2[i] + "</option>";
                }
                $("#teacherstaff").html(select_text);
            }
            layer.close(ii);
        },
        error: function () {
            alert("服务器错误");
            layer.close(ii);
        }
    });
});
