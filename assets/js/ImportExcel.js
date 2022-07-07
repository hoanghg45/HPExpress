
function uploadFile() {
    var data = new FormData();
    var files = $('#filename').get(0).files;

    if (files.length > 0) {
        data.append("UploadedFile", files[0])
    }
    
    if (isExcel(files[0].name)) {
        $.ajax({
            url: '/WayBill/ReadExcelData',
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.status == "success") {
                    Swal.fire({

                        icon: "success",
                        title: "Lưu thành công!",
                        html: "Đã thêm dữ liệu từ file <b>" + files[0].name + "</b> thành công!",
                        showConfirmButton: false,
                        timer: 2000
                    }

                    ).then(function () {
                        $("#body").empty()
                        $("#footer").empty()

                        var table = '<table class="table">';
                        table += ' <thead class="thead-light" >'
                        table += '<tr>'

                        table += '<th scope="col">#</th>'
                        table += '<th scope="col">Ngày gửi</th>'
                        table += '<th scope="col">Mã phiếu</th>'
                        table += '<th scope="col">Trọng lượng</th>'
                        table += '<th scope="col">Đơn vị vận chuyển</th>'
                        table += '<th scope="col">Người nhận</th>'
                        table += '<th scope="col">Loại hình gửi</th>'

                       

                        table += '</tr>'
                        table += '</thead>'

                        table += '<tbody>'
                        $.each(result.data, function (index, value) {
                            table += '<tr>'
                            table += '<th scope="row">' + (index + 1) + '</th>'
                            table += '<td>' + formatDate(value.Dateship.substr(6))+ '</th>'
                            table += '<td>' + value.Id + '</th>'
                            table += '<td>' + value.Weight + 'kg</th>'
                            var prov = {
                                1: {
                                    'title': 'NetPost',
                                    'class': ' label-light-danger'
                                },
                                2: {
                                    'title': 'ViettelPost',
                                    'class': ' label-light-warning'
                                },
                                3: {
                                    'title': 'Tasetco',
                                    'class': ' label-light-success'
                                },

                            };
                            table += '<th>' + '<span class="label label-inline ' + prov[value.ProviderID].class + ' font-weight-bold">' + prov[value.ProviderID].title + '</span >' + '</th>'
                            table += '<td>' + value.Cusinf + '</th>'
                            table += '<td>' + value.Transpot + '</th>'
                            table += '</tr>'
                            
                        })


                        
                        table += '</tbody>'
                        table += '</table>'
                        var total = '<span>Tổng cộng <b>' + result.count + '</b> dữ liệu đã được thêm</span>'
                        $("#body").append(table)
                        $("#footer").append(total)
                        searchUser(page, RoleID, DepID)
                    })
                }
                else {
                    Swal.fire(
                        "Có lỗi!",
                        result.message,
                        "error"
                    ).then(function () {

                        billsearch(page, RoleID, DepID, UserID)


                    })
                }
            }
        })
    } else {
        Swal.fire(
            "Có lỗi!",
            "File của bạn không hợp lệ, vui lòng kiểm tra lại!",
            "error"
        ).then(function () {

            billsearch(page, RoleID, DepID, UserID)


        })
    }
    

}


function isExcel(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'xlsx':
        case 'xls':
        case 'xlsm':
                  //etc
            return true;
    }
    return false;
}
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
$(document).ready(function () {
    $('#openExcel').click(function () {
        
        $("#body").empty()
        $("#footer").empty()
        var body = '<form><label class="form-label" for="customFile"> Chọn file Excel:</label><input type="file" class="form-control" id="filename" accept=".xls,.xlsx"/></form>'
        var footer = '<button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Đóng</button><button type = "button" id = "saveExcel" onclick = "uploadFile()" class="btn btn-primary font-weight-bold" > Lưu dữ liệu</button>'
        $("#body").append(body)
        $("#footer").append(footer)
        $('#importFile').modal()
    })
})