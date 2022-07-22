function showtable() {
    var stt = 1;

    $.ajax({

        type: "get",
        url: HOST_URL + '/Roles/Roles',

        beforeSend: function () {
            $('#loading').show();
        },
        complete: function () {
            $('#loading').hide();
        },
        success: function (data) {
            $("#PerName").empty();
            $("#tbody").empty();
            let th = '<th> Quyền </th>'
            $.each(data.per, function (i, d, p) {
                th += '<th class="getIdPer" id="' + d.PermissionID + '">' + d.PermissionDesc + '</th>'
               
            });
            $.each(data.data, function (i, d, p) {
                let tr = '<tr class="RoleID" id="' + d.idRole + '"> '
                tr += '<th scope="row" >' + d.nameRole + '</td>'
                var PerInRole = d.Permission;
                $.each(data.per, function (i, d, p) {
                    var checkbox = 
                    tr += '<td  id="' + d.PermissionID + '">'

                    if (PerInRole.includes(d.PermissionID)) {

                        tr += '<label class="checkbox checkbox-outline checkbox-primary"><input type="checkbox" class="getIdCheck" name="Checkboxes15" value=' + d.PermissionID + ' checked="checked" /><span></span></label>'
                    }
                    else {
                        tr += '<label class="checkbox checkbox-outline checkbox-primary"><input type="checkbox" class="getIdCheck" name="Checkboxes15" value=' + d.PermissionID + '  /><span></span></label>'
                    }
                    tr += '</td>'
                });
                
                tr += ' </tr>'
                $("#tbody").append(tr)
            });
            $("#PerName").append(th)

            $(".getIdCheck").change(function () {
                var perid = $(this).val()
                var roleid = $(this).parents("tr.RoleID").attr('id')
                console.log(roleid + "-" + perid)
                Swal.fire({
                    title: "Bạn có chắc muốn thay đổi quyền?",
                    text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có!",
                    cancelButtonText: "Không!",
                    heightAuto: false,
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Roles/SetPerbyRole',
                            data: {
                                roleID: roleid,
                                perID: perid
                            },
                            datatype: 'json',

                            success: function (data) {
                                if (data.status == "success") {
                                    Swal.fire({
                                        title: "Thành công",
                                        text: data.message,
                                        icon: "success",
                                        heightAuto: false
                                    }).then(function () {

                                        showtable();
                                        KTUtil.scrollTop();

                                    })
                                }
                            },
                            error: function (errorResult) {
                                console.log(errorResult.responseText)
                            }
                        })


                        // result.dismiss can be "cancel", "overlay",
                        // "close", and "timer"
                    } else if (result.dismiss === "cancel") {
                        Swal.fire({
                            title: "Đã hủy",
                            text: "Dữ liệu vẫn an toàn!",
                            icon: "warning",
                            heightAuto: false
                        }).then(function () {
                            showtable();
                        })
                          
                    }
                });

                
            })
            
         }
    })
    

}
$(document).ready(function() {
    showtable();
})