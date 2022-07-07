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
                th += '<th class="getIdPer" id="' + d.PermissionID + '">' + d.PermissionName + '</th>'
               
            });
            $.each(data.data, function (i, d, p) {
                let tr = '<tr class="RoleID" id="' + d.idRole + '"> '
                tr += '<th scope="row" >' + d.nameRole + '</td>'
                var PerInRole = d.Permission;
                $.each(data.per, function (i, d, p) {
                    var checkbox = 
                    tr += '<td class="getIdCheck" id="' + d.PermissionID + '">'

                    if (PerInRole.includes(d.PermissionID)) {
                        
                        tr += '<div class="form-check"><input class="form-check-input" type = "checkbox" value = "" id = "flexCheckChecked" checked ></div>'
                    }
                    else {
                        tr += '<div class="form-check"><input class="form-check-input" type = "checkbox" value = "" id = "flexCheckChecked"  ></div>'
                    }
                    tr += '</td>'
                });
                
                tr += ' </tr>'
                $("#tbody").append(tr)
            });
            $("#PerName").append(th)

            //var ids = $('.getPermission').map(function (_, x) { return x.id }).get();
            //for (let i = 0; i < ids.length; i++) {
            //    if (ids[i].length >= 1 || ids[i] != null) {

            //        var m = ids[i].split(',');
            //        var idss = $('.getIdPer').map(function (_, x) { return x.id }).get();                      
            //            for (let j = 0; j < idss.length; j++) {
            //                var result = m.includes(idss[j])
                           
            //            }
            //    }
               
            //}
            
         }
    })
    

}
$(document).ready(function() {
    showtable();
})