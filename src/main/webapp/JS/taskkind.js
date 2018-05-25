$(document).ready(function () {

    $("#kind_submit").click(function () {
        var kind_name = $("#kind_name").val();
        if (kind_name.length == "0" || kind_name.length == 0){
            swal("请不要留空！", "","warning")
        }
        swal({
            title: "确定添加吗？",
            text: "",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: "/sadmin_update",
                type: "POST",
                data: {
                    kind_name: kind_name
                },
                dataType: "json",
                success: function (data) {
                },
                error: function () {
                }
            });
        });
    })

});
