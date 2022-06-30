function searchUser(page, RoleID, DepID) {
    var value = $('#searchUser').val().toLowerCase();
    var depart = $('#datable_search_department').val()
    var role = $('#datable_search_role').val()
    var stt = $('#datable_search_status').val()
    var currUser = $('#scrUpdate').data('curid')

   
    switch (RoleID) {
        case 1: showUserTable(value, depart, role, stt, currUser, page)
            break;
        case 2: showUserTable(value, DepID, 3, stt, currUser, page)
            break;

            default:
                break;
        }
    


}

