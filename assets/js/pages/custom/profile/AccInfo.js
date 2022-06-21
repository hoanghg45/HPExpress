jQuery(document).ready( function showInf() {

    var idUser = $('#UserID').val();
    
    $.ajax({
        type: "get",
        url:'/Account/DetailAccount',
        dataType: "json",

        data: { id:idUser },

        success: function (data) {
            
            if (data.status == "success") {
                var n = data.FullName.split(" ")
                
                if (data.Gender == 1) {
                    $("#UserName").text("Mr. "+n[n.length - 1]);
                } else {
                    $("#UserName").text("Mrs. " + n[n.length - 1]);
                }

                
                           
                $("#UserAva").text((n[n.length - 1]).charAt(0));
               
                $("#popUserName").text(data.FullName);
                
                $("#popUserRole").text(data.Role + " - " + data.Department);
                $("#popUserEmail").text(data.Email);
                
            } 
        },
        error: function (errorResult) {
            console.log(errorResult.responseText)
        }
    });
})