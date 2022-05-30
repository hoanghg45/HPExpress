

$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        $(this).val($(this).is(':checked'));
    });
});

function printDiv() {
    var printContents = document.getElementById("billtable").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

}