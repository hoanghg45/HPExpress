function searchUser(page, RoleID, DepID) {
    var value = $('#searchUser').val().toLowerCase();
    var depart = $('#datable_search_department').val()
    var role = $('#datable_search_role').val()
    var stt = $('#datable_search_status').val()

   
    switch (RoleID) {
        case 1: showUserTable(value, depart, role, stt, page)
                break;
            case 2: showUserTable(value, DepID, 3 ,stt, page)
                break;

            default:
                break;
        }
    


}

