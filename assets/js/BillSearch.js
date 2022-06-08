function search() {
    var value = $('#searchInput').val().toLowerCase();
    var id = $('#kt_datatable_search_status').val()
    var date = $('#kt_daterangepicker_2 input').val()
    showtable(id, date, value)
}
