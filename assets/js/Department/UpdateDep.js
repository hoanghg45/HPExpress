"use strict";

// Class Definition
var Update = function () {

    var _handleSignInForm = function () {
        var validation;
        const form = document.getElementById('editdep_form');
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('editdep_form'),
            {
                fields: {
                    editDepName: {
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
        


        $('#btnSaveDep').on('click', function (e) {
            e.preventDefault();
            var name = $('#editDepName').val()
            var id = $('#editDepID').val()
            editDepartment(id, name)
        });



        function editDepartment(id, newname) {
            validation.validate().then(function (status) {
                if (status == 'Valid') {

                    $.ajax({
                        type: "post",
                        url: HOST_URL + "Department/Edit",
                        data: {
                            id: id,
                            newname: newname
                        },
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

                                }).then(function (result) {
                                    var page = $("#deppagi a.active").data('page')
                                    showtable(page)
                                    $('#EditDep').modal('hide')

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


            _handleSignInForm();

        }
    };
}();


// Class Initialization
jQuery(document).ready(function () {
    Update.init();
});




