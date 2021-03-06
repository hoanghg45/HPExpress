
    function jsonTodDate(jsonDate) {
        const backToDate = new Date(parseInt(jsonDate));
        return backToDate;
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(jsonDate) {
        var date = jsonTodDate(jsonDate)
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
}


function timeCal(lastlogin) {
    lastlogin = lastlogin.substring(4, 24)
    
    moment.locale('vi')
    var cal = moment(lastlogin).fromNow();

    return cal
}

