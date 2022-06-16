function showInf() {

    var id = '<%= Session["UserID"] %>';
    $.ajax({
        type: "post",
        url: HOST_URL + 'data/GetAccount',
        dataType: "json",

        data: id,

        success: function (data) {
            
            if (data.status == "success") {
                data.
            } else {
                
            }
        },
        error: function (errorResult) {
           
        }
    });
}