﻿"use strict";

// Class Definition
var Netpost = function () {




    var _handleForm = function () {
        var validation;
        const form = document.getElementById('netpost_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('netpost_form'),
            {
                fields: {
                    barcode: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mã phiếu'
                            },
                            stringLength: {
                                max: 10,
                                min:8,
                                message: 'Mã phiếu có độ dài từ 8 - 10 chữ số',
                            },
                        }
                    },
                    date: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng chọn ngày gửi'
                            }
                        }
                    },
                    comp_phone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại '
                            },
                            
                        }
                    },
                    customer_name: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên người nhận'
                            }
                        }
                    },
                    cus_phone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại người nhận'
                            },
                            phone: {
                                message: 'Số điện thoại không hợp lệ',
                                country: 'US',
                            },
                        }
                    },
                    customer_add: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập địa chỉ người nhận',

                            },
                         
                        }
                    },
                    content: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập nội dung phiếu gửi',

                            },
                         
                        }
                    },
                    package_numb: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số kiện',

                            },
                         
                        }
                    },
                    'CatBox': {
                        validators: {
                            choice: {
                                min: 1,
                                
                                message: 'Vui lòng chọn loại hàng hóa',
                            },
                        },
                    },
                    pro_wei: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập trọng lượng',

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
        

        $('#save').on('click', function (e) {
            e.preventDefault();
            var returnUrl = HOST_URL + "WayBill"
            addNetPost(returnUrl)
        });
        $('#exit').on('click', function (e) {
            e.preventDefault();
            var returnUrl = HOST_URL + "WayBill"
            window.location.href = returnUrl;
        });



        function addNetPost(returnUrl) {
            validation.validate().then(function (status) {
                if (status == 'Valid') {
                var formdata =
                        $("#netpost_form").serialize() + '&returnUrl=' + returnUrl
                    console.log(formdata)
                    $.ajax({
                        type: "post",
                        url: HOST_URL + "Waybill/Create",
                        data: formdata,
                        datatype: 'json',
                         
                        success: function (data) {
                            if (data.status == "success") {
                                swal.fire({
                                    title: "Thành công",
                                    text: data.message,
                                    icon: "success",
                                    showCancelButton: true,   
                                    
                                    buttonsStyling: false,
                                    confirmButtonText: "Tiếp tục tạo!",
                                    cancelButtonText: "Trở trang danh sách!",
                                    heightAuto: false,
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }

                                }).then(function (result) {
                                    if (!result.value) {
                                        window.location.href = data.returnURL;
                                    }
                                    else {
                                        location.reload(true)
                                        KTUtil.scrollTop();
                                    }                                  
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


            _handleForm();

        }
    };
}();

// Class Initialization
jQuery(document).ready(function () {
    Netpost.init();
});
