$(document).ready(function () {
    var ii = layer.load(2, {shade:[0.1,'#fff']});
    $.ajax({
        type: "get",
        url: "/sadmin_getInfo_departments",
        dataType: "json",
        success: function (data) {
            var html_text = "";
            for (var i = 0; i < data.length; i++) {
                html_text += ("<option id=\"" + data[i].departmentId + "\">" + data[i].departmentName + "</option>");
            }
            $("#department").html(html_text);
        },
        error: function () {
            layer.close(ii);
            alert("服务器错误");
        }
    });
    $.ajax({
        type: "get",
        url: "/sadmin_getInfo_admin",
        dataType: "json",
        success: function (data) {
            // alert(data[0][1]);
            var tbody_text = "";
            for (var i = 0; i < data.length; i ++){
                tbody_text += "\n" +
                    "                                                <tr>\n" +
                    "                                                    <td><input type=\"checkbox\" name=\"checkbox\" value=\""+ data[i][0] +"\"><b>1</b></td>\n" +
                    "                                                    <td><span>"+ data[i][1] +" </span></td>\n" +
                    "                                                    <td><span>"+ data[i][2] +"</span></td>\n" +
                    "                                                    <td><span>"+ data[i][3] +"</span></td>\n" +
                    "                                                    <td>"+ data[i][4] +"</td>\n" +
                    "                                                    <td>"+ data[i][5] +"</td>\n" +
                    "                                                    <td>"+ data[i][6] +"</td>\n" +
                    "                                                    <td><span id=\"bt_edit_"+ data[i][0] +"\" class=\"btn btn-danger btn-xs\" data-toggle=\"modal\"\n" +
                    "                                                              data-target=\"#modalEdit\">修改</span></td>\n" +
                    "                                                </tr>"
                $("#tbod").html(tbody_text);
            }
            layer.close(ii);
        },
        error: function () {
            layer.close(ii);
            alert("服务器错误");
        }
    });
})
