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