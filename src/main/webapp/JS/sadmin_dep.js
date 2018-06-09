var ii = layer.load(2, {shade: [0.1, '#fff']});
$.ajax({
    url: "/sadmin_get_dep",
    type: "POST",
    async: false,
    data: {},
    dataType: "json",
    success: function (data) {
        if (data != null) {
            var text = "";
            for (var i = 0; i < data.length; i++) {
                text += "\n" +
                    "                                                <tr>\n" +
                    "                                                    <td><b>" + data[i].departmentId + "</b></td>\n" +
                    "                                                    <td><span id=\"dep_" + data[i].departmentId + "\" value=\"" + data[i].departmentId + "\" onclick=\"sp_click(this)\">" + data[i].departmentName + "</span><input style=\"width: 85px;display: none\" type=\"text\" id=\"dpinput_" + data[i].departmentId + "\" value=\"" + data[i].departmentName + "\"></td>\n" +
                    "                                                    <td><span id=\"bt_edit_" + data[i].departmentId + "\" class=\"btn btn-danger btn-xs\"\n" +
                    "                                                              data-toggle=\"modal\" data-target=\"#modalEdit\"\n" +
                    "                                                              onclick=\"setSweet()\">修改</span></td>\n" +
                    "                                                </tr>"
            }
            $("#tbod").html(text);
        }
        layer.close(ii);
    },
    error: function () {
        alert("服务器错误");
    }
});