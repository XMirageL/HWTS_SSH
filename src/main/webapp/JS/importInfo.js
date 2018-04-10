$(document).ready(function () {


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
            }, 2000);
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
                if (data != null){
                    swal("插入成功", "教师信息已全部导入", "success")
                } else {
                    swal("插入失败", "请仔细检查Excel表是否符合格式", "error")
                }
            },
            success: function (data) {
                if (data != null){
                    swal("插入成功", "教师信息已全部导入", "success")
                } else {
                    swal("插入失败", "请仔细检查Excel表是否符合格式", "error")
                }
            }
        });
    }
});