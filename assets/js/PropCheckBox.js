

$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        $(this).data('check', $(this).is(':checked'));
        var a = $(this).data('check')
        console.log(a)
    });
});

function printDiv() {
    var printContents = document.getElementById("billform").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    /*location.reload(true)*/
}