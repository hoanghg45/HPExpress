"use strict";

var KTSessionTimeoutDemo = function () {
    var initDemo = function () {
        $.sessionTimeout({
            title: 'Thông báo hệ thống',
            message: 'Phiên làm việc của bạn sắp hết',
            keepAliveUrl: HOST_URL + 'Account/RefreshSession',
            redirUrl: HOST_URL + 'Account/Logout',
            logoutUrl: HOST_URL + 'Account/LogOut',
            warnAfter: 590000, // Cảnh báo 10 giây trước khi hết session
            redirAfter: 600000, //chuyển trang sau khi hết session(10p),  
        
            ignoreUserActivity: true,
            countdownMessage: 'Đăng xuất sau {timer} giây',
            countdownBar: true
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            initDemo();
        }
    };
}();

jQuery(document).ready(function () {
    KTSessionTimeoutDemo.init();
});
