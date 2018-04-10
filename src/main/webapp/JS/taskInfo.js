var id = window.location.href.split("id=")[1];
if (id != null) {
    $.ajax({
        type: "POST",
        url: "/getTaskInfo",
        error: function () {
            //服务器返回失败调用的方法
            alert("服务器错误");
        },
        data: {id: id},
        dataType: "json",
        success: function (data) {

            var info = data[0];
            if(info == null){
                alert("获取数据失败");
                window.history.go(-1);
            }
            $("#title").val(info.taskName);
            $("#details").val(info.taskText);
            $("#qq").val(info.qq);
            var taskDate = info.taskDate.split("-");
            $("#date").val(taskDate[0] + "年" + taskDate[1] + "月" + taskDate[2] + "日");
            var tsStr = "";
            var teachers = info.teachers.split(",");
            var teachersId = info.teachersId.split(",");
            for (var j = 0; j < teachers.length; j++) {
                tsStr += "<a href=\"teacherInfo?id=" + teachersId[j] + "\" class=\"btn btn-sm btn-warning \" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"查看老师信息\">" + teachers[j] + "</a>  ";
            }
            $("#teachers").append(tsStr);
            if (info.taskState == "已完成") {
                $("#taskState option[value='已完成']").attr("selected", true);
                $("#taskState").css("color", "green");
            } else {
                $("#taskState option[value='未完成']").attr("selected", true);
                $("#taskState").css("color", "red");
            }
        }
    });
}

$("#sendEmail").click(function () {
    swal({
        title: "该功能正在内测中",
    });
})

$("#editInfo").click(function () {
    $("#editInfo").attr("disabled", true);
    $("#saveInfo").attr("disabled", false);

    $("#title").attr("disabled", false);
    $("#details").attr("disabled", false);
    $("#notice-text").attr("disabled", false);
    $("#qq").attr("disabled", false);
    $("#taskState").attr("disabled", false);
});

$("#saveInfo").click(function () {
    var workName = $("#title").val();
    var workText = $("#details").val();
    var qq = $("#qq").val();
    var workState = $("#taskState").find("option:selected").text();
    var date = $("#date").val();
    date = date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10);
    if (workName == "") {
        $('#title').focus();
        swal("保存错误", "标题未输入", "error");
    } else if (workText == "") {
        $("#details").focus();
        swal("保存错误", "任务详情未输入", "error");
    } else if (qq == "") {
        $("#qq").focus();
        swal("保存错误", "QQ未输入", "error");
    } else {
        if (id != null) {
            swal({
                title: "确认保存吗？",
                text: "提交运行ajax请求",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }, function () {
                $.ajax({
                    type: "POST",
                    url: "/editSaveTask",
                    error: function () {
                        //服务器返回失败调用的方法
                        alert("服务器错误");
                    },
                    data: {
                        workId: id,
                        workName: workName,
                        workText: workText,
                        qq: qq,
                        workState: workState,
                        workTime: date
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data = "100") {
                            swal("保存成功", "", "success");

                            setTimeout(function () {
                                window.location.reload();
                            }, 2000)
                        } else {
                            swal("保存失败", "错误代码" + data, "error");
                        }
                    }
                });
            });

        } else {
            swal("保存错误", "无法获取当前任务信息", "error");
        }
    }


});