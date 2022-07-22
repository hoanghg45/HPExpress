"use strict";

// Class Definition
var edtViettelpost = function () {




    var _handleForm = function () {
        var validation;
        const form = document.getElementById('edt_viettel_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('edt_viettel_form'),
            {
                fields: {
                  
                  
                    comp_phone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại '
                            },
                            phone: {
                                message: 'Số điện thoại không hợp lệ',
                                country: 'US',
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
                    customer_comp: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên công ty hoặc khách lẻ'
                            }
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
                            greaterThan: {
                                message: 'Trọng lượng của hàng phải lớn hơn 0',
                                min: 1,
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
                            greaterThan: {
                                message: 'Trọng lượng của hàng phải lớn hơn 0',
                                min: 0.01,
                            },
                        },

                    },
                    pro_wid: {
                        validators: {
                            greaterThan: {
                                message: 'Chiều rộng của hàng phải lớn hơn 0',
                                min: 0.01,
                            },
                        },

                    },
                    pro_hei: {
                        validators: {
                            greaterThan: {
                                message: 'Chiều cao của hàng phải lớn hơn 0',
                                min: 0.01,
                            },
                        },
                    },
                    pro_leng: {
                        validators: {
                            greaterThan: {
                                message: 'Chiều dài của hàng phải lớn hơn 0',
                                min: 0.01,
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


        $('#vt_save').on('click', function (e) {
            e.preventDefault();
            
            UpdateViettel()
        });
       



        function UpdateViettel() {
            validation.validate().then(function (status) {
                if (status == 'Valid') {
                    var formdata =
                        $("#edt_viettel_form").serialize()
                    var page = $("#billpagi a.active").data('page')
                    var RoleID = $("#scrUserInf").data('roleid')
                    var DepID = $("#scrUserInf").data('depid')
                    var UserID = $("#UserID").val()
                    $.ajax({
                        type: "post",
                        url: HOST_URL + "Waybill/Edit",
                        data: formdata,
                        datatype: 'json',

                        success: function (data) {
                            if (data.status == "success") {
                                swal.fire({
                                    title: "Thành công",
                                    text: data.message,
                                    icon: "success",
                                    showCancelButton: false,

                                    buttonsStyling: true,

                                    heightAuto: false,
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }

                                }).then(function () {

                                    billsearch(page, RoleID, DepID, UserID)

                                    $("#ViettelPostModal").modal('hide')
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

                                    billsearch(page, RoleID, DepID, UserID)
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
    edtViettelpost.init();
});
