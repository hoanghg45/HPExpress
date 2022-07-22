function billsearch(page,RoleID,DepID,UserID) {
    var value = $('#searchInput').val().toLowerCase();
    var id = $('#kt_datatable_search_status').val()
    var date = $('#kt_daterangepicker_2 input').val()
    var depart = $('#datable_search_department').val()
    var userid = $('#datable_search_user').val()
    var stt = $('#datable_search_stt').val()
    
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
        case 1: showtable(id, date, value, depart, userid, stt, page)
            break;
        case 2: showtable(id, date, value, DepID, userid, stt, page)
            break;
        case 3: showtable(id, date, value, "", UserID,stt, page)
            break;
        case 4: showtable(id, date, value, depart, userid, stt, page)
            break;
        default:
            break;
    }

}

function billsearchForDep(page, RoleID, DepID, UserID) {
    var value = $('#searchInput').val().toLowerCase();
    var id = $('#kt_datatable_search_status').val()
    var date = $('#kt_daterangepicker_2 input').val()
    var depart = $('#datable_search_department').val()
    var userid = $('#datable_search_user').val()
    var stt = $('#datable_search_stt').val()
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
        case 1: showtable(id, date, value, depart, "",stt, page)
            break;
        case 2: showtable(id, date, value, DepID, userid,stt, page)
            break;
        case 3: showtable(id, date, value, "", UserID,stt, page)
            break;
        case 4: showtable(id, date, value, depart, userid, stt, page)
            break;
        default:
            break;
    }

}

