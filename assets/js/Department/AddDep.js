"use strict";

// Class Definition
var addDep = function () {




    var _handleForm = function () {
        var validation;
        const form = document.getElementById('adddep_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('adddep_form'),
            {
                fields: {
                    DepName: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập tên phòng ban'
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


        $('#btnCreateDep').on('click', function (e) {
            e.preventDefault();
           var data= $('#DepName').val()
            addDepartment(data)
        });
       



        function addDepartment(id) {
            validation.validate().then(function (status) {
                if (status == 'Valid') {
                    
                    $.ajax({
                        type: "post",
                        url: HOST_URL + "Department/Create",
                        data: {
                            nameDep: id
                        },
                        datatype: 'json',

                        success: function (data) {
                            if (data.status == "success") {
                                swal.fire({
                                    title: "Thành công",
                                    text: "Thêm phiếu thành công, tiếp theo bạn muốn?",
                                    icon: "success",
                                    showCancelButton: false,

                                    buttonsStyling: true,
                                   
                                    heightAuto: false,
                                    customClass: {
                                        confirmButton: "btn font-weight-bold btn-light-primary"
                                    }

                                }).then(function (result) {
                                    var page = $("#deppagi a.active").data('page')
                                    showtable(page)
                                    $('#CreateDep').modal('hide')
                                        
                                })
                            
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
    addDep.init();
});
