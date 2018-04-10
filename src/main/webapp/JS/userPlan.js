$(document).ready(function () {
    var hyear = "";
    var mydate = new Date();
    var now_year = mydate.getFullYear();
    var now_month = mydate.getMonth() + 1;
    if (now_month <= 8&&now_month>=2) {
        hyear = "上学期"
        $("#xueqi").text(now_year+"年"+"上学期");
        alert($("#xueqi").text());
    } else {
        hyear = "下学期";
        if(now_month <2){
            $("#xueqi").text(now_year+1+"年"+"下学期");
        }
        $("#xueqi").text(now_year+"年"+"下学期");
    }

    $('#tableQuery').show();
    $("#tableQuery").empty();
    $.ajax({
        type: "POST",
        url: "/userTaskQuery",
        error: function () {
            $("#btn_taskQuery").attr("disabled", false);
            //服务器返回失败调用的方法
            alert("服务器错误");
        },
        data: {year:now_year, hyear:hyear},
        dataType: "json",
        success: function (data) {
            taskQueryResult(data)
        }
    });

    //查询任务表结果显示
    function taskQueryResult(data) {
        var tableStr = " <div class=\"widget\">" +
            "                            <div class=\"widget-content themed-background text-light-op\">" +
            "                                <i class=\"fa fa-fw fa-pencil\"></i> <strong>我的最近任务</strong>&nbsp;"+
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
            "                                            <td align=\"center\"><span style=\"color:silver;\"><b>状态</b></span>" +
            "                                            </td>" +
            "                                        </tr>";
        for (var i = 0; i < data.length; i++) {
            //获取日期
            var taskDate = data[i].taskDate;
            //获取状态
            var taskState = data[i].taskState;
            //获取任务名称和id
            var taskName =  data[i].taskName;
            var taskId = data[i].taskId;

            var taskStr = "<a href=\"/taskInfo?id="+taskId+"\"data-toggle=\"tooltip\"\n" +
                "                                                       data-placement=\"top\" title=\"点击查看任务详情以及该任务的其他老师\">"+taskName+"</a>";

            tableStr +="<tr>" +
                "<td align=\"center\">"+taskDate+"</td>" +
                "<td align=\"center\">"+taskStr+"</td>" +
                "<td align=\"center\"><span class=\"text-"+(taskState=="未完成"?"info":"success")+"\">"+(taskState=="未完成"?"未完成":"已完成")+"</span></td>" +
                "</tr>";
        }
        tableStr+="</tbody>" +
            "                                    </table>" +
            "                                </div>" +
            "                            </div>" +
            "                        </div>";
        $('#tableQuery').append(tableStr);
        $("#text2").hide();

        setTimeout(function () {
            $("#text2").slideDown();
        },200);
    }
});