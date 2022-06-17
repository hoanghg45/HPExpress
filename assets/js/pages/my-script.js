$(window).ready(function() {
    var current = location.pathname;
    $("div.aside,.aside-left,.aside-fixed,.d-flex,.flex-column,.flex-row-auto li a").each(function () {
        if ($(this).attr('href') === location.pathname) {
            $(this).parent().addClass("menu-item-active");
        }
    })
    $(".menu-item-active").parents('.menu-submenu').removeAttr('style');
    $(".menu-item-active").parents('.menu-item-submenu').addClass('menu-item-open');
})
function setUserByDepart(id) {
    $.ajax({
        type: "get",
        url: '/Waybill/filterUser',
        data: {
            id: id,

        },
        datatype: 'json',
        success: function (data) {

            $("#datable_search_user").empty();


            var option = '<option value="">All</option>'
            $.each(data.data, function (i, d, p) {

                option += '<option value="' + d.UserID + '">' + d.UserName + '</option>'

            });


            $("#datable_search_user").append(option)
        }
    });
}