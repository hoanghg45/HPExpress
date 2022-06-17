jQuery(document).ready( function showInf() {

    var idUser = $('#UserID').val();
    
    $.ajax({
        type: "get",
        url:'/Account/DetailAccount',
        dataType: "json",

        data: { id:idUser },

        success: function (data) {
            
            if (data.status == "success") {
                $("#UserName").text(data.FullName);
                var ava = data.FullName.indexOf(" ")
                $("#UserAva").text(data.FullName.charAt(ava+1));
                $("#popUserName").text(data.FullName);
                $("#popUserRole").text(data.Role + " - " + data.Department);
                $("#popUserEmail").text(data.Email);
                console.log(data.FullName)
            } else {
                
            }
        },
        error: function (errorResult) {
            console.log(errorResult.responseText)
        }
    });
})