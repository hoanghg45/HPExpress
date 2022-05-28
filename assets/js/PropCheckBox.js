

$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        $(this).val($(this).is(':checked'));
    });
});