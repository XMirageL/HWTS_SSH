$(document).ready(function () {

    $("#inputEmail").blur(function () {
        var userName = $("#inputEmail").val();
        if (userName == "") {
            $("#d1").attr("class", "form-group has-error");
            $("#helpBlock1").attr("style", "");
            return;
        } else {
            $("#d1").attr("class", "form-group has-success");
            $("#helpBlock1").attr("style", "display:none");
        }
    });
    $("#inputPassword").blur(function () {
        var passWord = $("#inputPassword").val();
        if (passWord == "") {
            $("#d2").attr("class", "form-group has-error");
            $("#helpBlock2").attr("style", "");
        } else {
            $("#d2").attr("class", "form-group has-success");
            $("#helpBlock2").attr("style", "display:none");
        }
    });

});

