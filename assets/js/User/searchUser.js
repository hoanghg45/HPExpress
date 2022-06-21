function searchUser(page, RoleID, DepID) {
    var value = $('#searchUser').val().toLowerCase();
    var depart = $('#datable_search_department').val()
    var role = $('#datable_search_role').val()

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
        case 1: showUserTable(value,depart,role, page)
            break;
        case 2: showUserTable(value,DepID,3, page)
            break;
      
        default:
            break;
    }

}

