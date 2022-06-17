function search(page) {
    var value = $('#searchInput').val().toLowerCase();
    var id = $('#kt_datatable_search_status').val()
    var date = $('#kt_daterangepicker_2 input').val()
    var depart = $('#datable_search_department').val()
    var userid = $('#datable_search_user').val()
    showtable(id, date, value, depart, userid,page)
   

}

