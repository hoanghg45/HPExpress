"use strict";

// Class Definition
var UpdateProfile = function () {




    var _handleSignInForm = function () {
        var validation;
        const form = document.getElementById('profile_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('profile_form'),
            {
                fields: {
                    
                    fullname: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên nhân viên'
                            }
                        }
                    },
                   
                    userphone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại'
                            },
                            phone: {
                                message: 'Số điện thoại không hợp lệ',
                                country: 'US',
                            },
                        }
                    },
                    useremail: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập Email',

                            },
                            emailAddress: {
                                message: 'Vui lòng nhập đúng định dạng Email',
                            },
                        }
                    },


                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                        valid: 'fa fa-check',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-refresh',
                    }),
                }
            }
        );

        
      


        $('.btnUpdatePro').on('click', function (e) {
            e.preventDefault();
            var formdata = $(this).parent().parent().serialize();
            var type = $(this).attr("id");
            
            UpdatePro(formdata)
        });


            function UpdatePro(formdata) {
             
            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    //var formdata = {
                    //    Username: $("#username").val(),
                    //    Password: $("#password").val()
                    //} 
                    

                    AjaxPost(formdata)
                    

                } else {

                    swal.fire({
                        title: "Có lỗi!",
                        text: "Vui lòng điền đẩy đủ thông tin",
                        icon: "error",
                        heightAuto: false,
                        buttonsStyling: false,
                        confirmButtonText: "Ok!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        KTUtil.scrollTop();
                    });
                }
            });
        }
    }

    var _handlePassForm = function () {
        var validation;
        const form = document.getElementById('pass_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('pass_form'),
            {
                fields: {

                    oldpass: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mật khẩu hiện tại'
                            },
                            stringLength: {
                                min: 6,
                                message: 'Mật khẩu phải có độ dài tên 6 ký tự',
                            },
                        }
                    },
                    newpass: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mật khẩu mới'
                            },
                            stringLength: {
                                min: 6,
                                message: 'Mật khẩu phải có độ dài tên 6 ký tự',
                            },
                        }
                    },
                    confirmpasss: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập xác nhận'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="newpass"]').value;
                                },
                                message: 'Không trùng khớp với mật khẩu',
                            },
                        },
                    },


                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                        valid: 'fa fa-check',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-refresh',
                    }),
                }
            }
        );
        form.querySelector('[name="newpass"]').addEventListener('input', function () {
        fv.revalidateField('confirmpasss');
        });
        $('.btnUpdatePro').on('click', function (e) {
            e.preventDefault();
            var formdata = $(this).parent().parent().serialize();
            var type = $(this).attr("id");
            console.log(type)
            /*UpdatePro(formdata, type)*/
        });


        function UpdatePro(formdata, type) {
            
            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    //var formdata = {
                    //    Username: $("#username").val(),
                    //    Password: $("#password").val()
                    //} 

                    console.log(formdata)
                    AjaxPost(formdata)


                } else {

                    swal.fire({
                        title: "Có lỗi!",
                        text: "Vui lòng điền đẩy đủ thông tin",
                        icon: "error",
                        heightAuto: false,
                        buttonsStyling: false,
                        confirmButtonText: "Ok!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        KTUtil.scrollTop();
                    });
                }
            });
        }
    }
  

    function AjaxPost(formdata) {
        $.ajax({
            type: "post",
            url: HOST_URL + 'account/UpdateProfile',
            dataType: "json",

            data: formdata,

            success: function (data) {
                if (data.status == "success") {
                    swal.fire({
                        title: "Thành công",
                        text: "Thay đổi thông tin thành công!",
                        icon: "success",
                        buttonsStyling: false,
                        /*confirmButtonText: "Ok, got it!",*/
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }

                    }).then(function () {

                    });
                } else {
                    swal.fire({
                        title: "Có lỗi!",
                        text: data.message,
                        icon: "error",
                        buttonsStyling: false,
                        /*confirmButtonText: "Ok, got it!",*/
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }

                    }).then(function () {

                    });
                }
            },
            error: function (errorResult) {
                swal.fire({
                    title: "Có lỗi!",
                    text: errorResult.responseText,
                    icon: "error",
                    heightAuto: false,
                    buttonsStyling: false,
                    confirmButtonText: "Ok!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function () {
                    KTUtil.scrollTop();
                });
            }
        });
    }
    // Public Functions
    return {
        // public functions
        init: function () {


            _handleSignInForm();
            _handlePassForm();

        }
    };
}();

// Class Initialization
jQuery(document).ready(function () {
    UpdateProfile.init();
});




