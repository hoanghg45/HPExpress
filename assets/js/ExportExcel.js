function exportExcel(id, datetime, search, depart, userid) {
    window.location.href = 'ExportExcel/?id=' + id +'&date=' + datetime + '&search=' + search + '&dep=' + depart + '&usid=' + userid
        /*? id = ' + id + ' & date=' + datetime + ' & search=' + search + ' & dep=' + depart + ' & usid=' + userid*/
}

function billExport( RoleID, DepID, UserID) {
    var value = $('#searchInput').val().toLowerCase();
    var id = $('#kt_datatable_search_status').val()
    var date = $('#kt_daterangepicker_2 input').val()
    var depart = $('#datable_search_department').val()
    var userid = $('#datable_search_user').val()
    

    //if (RoleID == 1) {
    //    showtable(id, date, value, depart, userid, page)
    //}
    //if (RoleID == 2) {
    //    showtable(id, date, value, DepID, userid, page)
    //}
    //if (RoleID == 3) {
    //    showtable(id, date, value, "", UserID, page)
    //}

    switch (RoleID) {
        case 1: exportExcel(id, date, value, depart, userid)
            break;
        case 2: exportExcel(id, date, value, DepID, userid)
            break;
        case 3: exportExcel(id, date, value, "", UserID)
            break;
        default:
            break;
    }

}