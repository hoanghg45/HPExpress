"use strict";

// Class Definition
var Add = function () {
   

   

    var _handleSignInForm = function () {
        var validation;
        const form = document.getElementById('kt_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('kt_form'),
            {
                fields: {
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên đăng nhập'
                            },
                            stringCase: {
                                message: 'Tên đăng nhập vui lòng không viết hoa',
                                case: 'lower',
                            },
                        }
                    },
                    fullname: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên nhân viên'
                            }
                        }
                    },
                    UserPass: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mật khẩu'
                            },
                            stringLength: {
                                min: 6,
                                message: 'Mật khẩu phải có độ dài tên 6 ký tự',
                            },
                        }
                    },
                    confirmPass: {
                        validators: {
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="UserPass"]').value;
                                },
                                message: 'Không trùng khớp với mật khẩu',
                            },
                        },
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
                    UserEmail: {
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
        form.querySelector('[name="UserPass"]').addEventListener('input', function () {
            fv.revalidateField('confirmPass');
        });

        $('#addnew').on('click', function (e) {
            e.preventDefault();
            var returnUrl = HOST_URL + "Account/CreateAcc"
            addUser(returnUrl)
        });
        $('#exit').on('click', function (e) {
            e.preventDefault();
            var returnUrl = HOST_URL + "Account/ListUser"
            addUser(returnUrl)
        });

        

        function addUser(returnUrl) {
            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    //var formdata = {
                    //    Username: $("#username").val(),
                    //    Password: $("#password").val()
                    //} 
                    var formdata =
                        $('#kt_form').serialize() + '&returnUrl=' + returnUrl

                    console.log(formdata)
                    $.ajax({
                        type: "post",
                        url: HOST_URL + 'account/createacc',
                        dataType: "json",

                        data: formdata,

                        success: function (data) {
                            if (data.status == "success") {
                                swal.fire({
                                    title: "Thành công",
                                    text: data.message,
                                    icon: "success",
                                    buttonsStyling: false,
                                    /*confirmButtonText: "Ok, got it!",*/
                                    heightAuto: false,
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }

                                }).then(function () {
                                    window.location.href = data.returnURL;
                                    KTUtil.scrollTop();
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

                                    KTUtil.scrollTop();
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

    

    // Public Functions
    return {
        // public functions
        init: function () {
           

            _handleSignInForm();
         
        }
    };
}();

// Class Initialization
jQuery(document).ready(function () {
    Add.init();
});
