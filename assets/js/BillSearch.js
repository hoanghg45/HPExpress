function search(page,RoleID,DepID,UserID) {
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
        case 1: showtable(id, date, value, depart, userid, page)
            break;
        case 2: showtable(id, date, value, DepID, userid, page)
            break;
        case 3: showtable(id, date, value, "", UserID, page)
            break;
        default:
            break;
    }

}

