$(document).ready(function () {
    window.onload = function () {
        var mydate = new Date();
        var now_year = mydate.getFullYear();
        var now_month = mydate.getMonth() + 1;
        var select_year = "<option value=" + now_year + " selected>" + now_year + "</option>";
        for (var i = now_year + 2; i > 2010; i--) {
            select_year += "<option value=" + i + ">" + i + "</option>";
        }
        $("#select_year").append(select_year);
        $("#select_year_1").append(select_year);
        if (now_month < 8 && now_month > 2) {
            $("#fHalf").attr("selected", "selected");
        } else {
            $("#sHalf").attr("selected", "selected");
        }
        if (now_month < 8 && now_month > 2) {
            $("#fHalf_1").attr("selected", "selected");
        } else {
            $("#sHalf_1").attr("selected", "selected");
        }
    }
    $('#btn_taskQuery').click(function () {
        $("#btn_taskQuery").attr("disabled", true);
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        var year = $("#select_year").val();
        var hyear = $("#select_hyear").val();
        var year_1 = $("#select_year_1").val();
        var hyear_1 = $("#select_hyear_1").val();
        $('#tableQuery').show();
        $("#tableQuery").empty();
        $.ajax({
            type: "POST",
            url: "/taskQuery",
            error: function () {
                $("#btn_taskQuery").attr("disabled", false);
                //服务器返回失败调用的方法
                layer.close(ii);
                alert("服务器错误");
            },
            data: {year: year, hyear: hyear, year_1: year_1, hyear_1: hyear_1},
            dataType: "json",
            success: function (data) {
                if (data == "101") {
                    swal("没有查找到数据");
                    $("#btn_taskQuery").attr("disabled", false);
                } else {
                    taskQueryResult(data);
                }
                layer.close(ii);
            }
        });
    });

    $('#btn_teacherQuery').click(function () {
        $("#btn_teacherQuery").attr("disabled", true);
        var ii = layer.load(2, {shade: [0.1, '#fff']});
        var year = $("#select_year").val();
        var hyear = $("#select_hyear").val();
        var year_1 = $("#select_year_1").val();
        var hyear_1 = $("#select_hyear_1").val();
        $('#tableQuery').show();
        $("#tableQuery").empty();
        $.ajax({
            type: "POST",
            url: "/teacherQuery",
            error: function () {
                //服务器返回失败调用的方法
                $("#btn_teacherQuery").attr("disabled", false);
                alert("服务器错误");
                layer.close(ii);
            },
            data: {year: year, hyear: hyear, year_1: year_1, hyear_1: hyear_1},
            dataType: "json",
            success: function (data) {
                if (data == "101") {
                    swal("没有查找到数据");
                    $("#btn_teacherQuery").attr("disabled", false);
                } else {
                    teachersQueryResult(data);
                }
                layer.close(ii);
            }
        });
    });


    //查询任务表结果显示
    function taskQueryResult(data) {
        var year = $("#select_year").val();
        var hyear = $("#select_hyear").val();
        var year_1 = $("#select_year_1").val();
        var hyear_1 = $("#select_hyear_1").val();
        var tableStr = " <div class=\"widget\">" +
            "                            <div class=\"widget-content themed-background text-light-op\">" +
            "                                <i class=\"fa fa-fw fa-pencil\"></i> <strong>任务详情表</strong>&nbsp;" +
            "<a href=\"downloadTask?year=" + year + "&hyear=" + hyear + "&year_1=" + year_1 + "&hyear_1=" + hyear_1 + "\" class=\"btn btn-info btn-xs\">下载</a>" +
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
        for (var i = 0; i < data.length; i++) {
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
                tsStr += "<a href=\"teacherInfo?id=" + teachersId[j] + "\">" + teachers[j] + "</a>,";
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
            $("#btn_taskQuery").attr("disabled", false);
        }, 200);
    }


    //查询教师表详情显示
    function teachersQueryResult(data) {
        var year = $("#select_year").val();
        var hyear = $("#select_hyear").val();
        var tableStr = " <div class=\"widget\">" +
            "                            <div class=\"widget-content themed-background text-light-op\">" +
            "                                <i class=\"fa fa-fw fa-pencil\"></i> <strong>教师详情表</strong>&nbsp;" +
            "<a href=\"downloadTeacher?year=" + year + "&hyear=" + hyear + "\" class=\"btn btn-info btn-xs\">下载</a>" +
            "                                <div class=\"pull-right\">" +
            "                                    <i id=\"idown2\" class=\"fa fa-chevron-down sidebar-nav-indicator sidebar-nav-mini-hide  \"></i>" +
            "                                </div>" +
            "                            </div>" +
            "                            <div id=\"text2\" class=\"widget-content padded\">" +
            "                                <div class=\"form-group\">" +
            "                                    <table class=\"table table-bordered\">" +
            "                                        <tbody>" +
            "                                        <tr>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>教师名称</b></span>" +
            "                                            </td>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>已安排任务数</b></span>" +
            "                                            </td>" +
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>未完成数</b></span>" +
            "                                            </td>" +
            "                                        </tr>";
        for (var i = 0; i < data.length; i++) {
            //获取老师名字
            var teacherName = data[i].teacherName;
            var teacherId = data[i].teacherId;
            var taskCount = data[i].taskCount;
            var unfinished = data[i].unfinished;

            var teacherStr = "<a href=\"/teacherInfo?id=" + teacherId + "\">" + teacherName + "</a>";
            tableStr += "<tr>" +
                "<td align=\"center\">" + teacherStr + "</td>" +
                "<td align=\"center\">" + taskCount + "</td>" +
                "<td align=\"center\"><span class=\"" + (unfinished == "0" ? " " : "text-danger") + "\">" + unfinished + "</span></td>";
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
            $("#btn_teacherQuery").attr("disabled", false);
        }, 200);
    }
});
