function showtable(page) {
    

    $.ajax({

        type: "get",
        url: HOST_URL + '/Department/Departments',
        data: {
            
            page: page

        },
        beforeSend: function () {
            $('#loading').show();
        },
        complete: function () {
            $('#loading').hide();
        },
        success: function (data) {
            $("#thead").empty()
            var tr = ''
            tr += '<th scope="col">#</th>'
            tr += '<th scope="col">Tên phòng ban</th>'
            tr += '<th scope="col">Số tài khoản thuộc</th>'
            tr += '<th scope="col">Hành động</th>'
            $("#thead").append(tr)
            $("#tbody").empty()
            var td = ''
            $.each(data.data, function (k, v) {
                td += '<tr id="' + v.DepartmentID+'">'
                td += '<th scope="row">' + ((10 * (data.pageCurrent - 1)) + (k + 1))  + '</th>'
                td += '<td>' + v.DepartmentName+'</td>'
                td += '<td>' + v.Count+'</td>'
                td += '<td><a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2 btnEdit" title="Edit details "><span class="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path><rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect></g> </svg></span></a>'
                    +'<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btnDel" title="Delete"><span class="svg-icon svg-icon-md"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path><path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path></g></svg></span></a></td >'
                td += '</tr>'
            })
            $("#tbody").append(td)
          
            $('#empty').empty()
            if (data.total < 1) {
                $('#empty').append('<div id="empty" class="alert alert-danger" role = "alert"> Không có dữ liêu với truy vấn này! </div>');
                $('#depTable').empty()
                $('#depnote').empty()
                $('#deppagi').empty()
            } else {
                $('#deppagi').empty();
                /*var size = data.size;*/
                var size = data.size;
                var total = data.total;
                
                
                var numSize = data.numSize;
                var pageCurrent = data.pageCurrent;
                var departid = ""
                if (pageCurrent > 1) {
                    departid += ' <a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 "data-page=1><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    departid += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious + ' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
                } else {
                    departid += ' <a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled "data-page=1 ><i class="ki ki-bold-double-arrow-back icon-xs" ></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    departid += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + pagePrevious + ' disabled> <i class="ki ki-bold-arrow-back icon-xs "></i></a > '
                }
                var limit = 3;
                
                //for (i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                //    if (i == pageCurrent) {
                //        departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                //    } else {
                //        departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                //    }
                //}
                if (numSize >= limit) {
                    
                        if (pageCurrent != numSize) {
                            for (i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                                if (i == pageCurrent) {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        } else {
                            for (i = pageCurrent - 2; i <= pageCurrent; i++) {
                                if (i == pageCurrent) {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        }
                   
                    
                    
                } else {
                    if (numSize > 1) {
                        if (pageCurrent != 1) {
                            for (i = pageCurrent - 1; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        } else {
                            for (i = pageCurrent; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        }
                    
                    } else {
                        departid += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + pageCurrent + '>' + pageCurrent + '</a>'
                    }
                    
                }
                


                if (pageCurrent > 0 && pageCurrent < numSize) {
                    var nextPage = pageCurrent + 1;
                    departid += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    departid += '<a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                } else {
                    var nextPage = pageCurrent + 1;
                    departid += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    departid += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                }

                $('#deppagi').append(departid);

                $('#depnote').empty();
                var usernote = '<span class="text-muted">Hiển thị ' + data.from + '-' + data.to + ' trên ' + total + ' kết quả</span>'
                $('#depnote').append(usernote)
            }

            $(".btnDel").click(function (e) {
                e.preventDefault()
                var id = $(this).parents('tr').attr('id')
                
                var page = $("#deppagi a.active").data('page')
                Swal.fire({
                    title: "Bạn có chắc muốn xóa?",
                    text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có, xóa!",
                    cancelButtonText: "Không!",
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Department/Delete',
                            data: {
                                id: id
                            },
                            datatype: 'json',

                            success: function (data) {
                                if (data.status == "success") {
                                    Swal.fire(
                                        "Đã xóa!",
                                        "Dữ liệu đã xóa thành công!",
                                        "success"
                                    ).then(function () {

                                        showtable(page)
                                        KTUtil.scrollTop();

                                    })
                                }
                                else if (data.status == "error") {
                                        Swal.fire(
                                            "Có lỗi!",
                                            data.message,
                                            "error"
                                        ).then(function () {

                                            showtable(page)
                                            KTUtil.scrollTop();

                                    })
                                } else {
                                        Swal.fire({
                                            title: "Bạn có muốn xóa?",
                                            text: data.message,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonText: "Có!",
                                            cancelButtonText: "Không!",
                                            reverseButtons: true
                                        }).then(function (result) {
                                            if (result.value) {
                                                $.ajax({
                                                    type: "post",
                                                    url: HOST_URL + 'Department/Delete',
                                                    data: {
                                                        id: id,
                                                        check: true
                                                    },
                                                    datatype: 'json',

                                                    success: function (data) {
                                                        if (data.status == "success") {
                                                            Swal.fire(
                                                                "Đã xóa!",
                                                                "Dữ liệu đã xóa thành công!",
                                                                "success"
                                                            ).then(function () {

                                                                showtable(page)
                                                                KTUtil.scrollTop();

                                                            })
                                                        }
                                                        else if (data.status == "error") {
                                                            Swal.fire(
                                                                "Có lỗi!",
                                                                data.message,
                                                                "error"
                                                            ).then(function () {

                                                                showtable(page)
                                                                KTUtil.scrollTop();

                                                            })
                                                        }


                                                    },
                                                    error: function (errorResult) {
                                                        console.log(errorResult.responseText)
                                                    }
                                                })
                                            } else if (result.dismiss === "cancel") {
                                                Swal.fire(
                                                    "Đã hủy",
                                                    "Dữ liệu vẫn an toàn!",
                                                    "error"
                                                )
                                            }
                                        });
                                }

                            },
                            error: function (errorResult) {
                                console.log(errorResult.responseText)
                            }
                        })


                        // result.dismiss can be "cancel", "overlay",
                        // "close", and "timer"
                    } else if (result.dismiss === "cancel") {
                        Swal.fire(
                            "Đã hủy",
                            "Dữ liệu vẫn an toàn!",
                            "error"
                        )
                    }
                });
            });

            $(".btnEdit").click(function (e) {
                e.preventDefault()
                var id = $(this).parents('tr').attr('id')

                var page = $("#deppagi a.active").data('page')
                $.ajax({
                    type: "GET",
                    url: HOST_URL + 'Department/Details',
                    data: {
                        id: id
                    },
                    datatype: 'json',

                    success: function (data) {
                        if (data.status == "success") {
                            $('#editDepName').val(data.dep.DepartmentName)
                            $('#editDepID').val(data.dep.DepartmentID)
                            $('#EditDep').modal()
                        }
                        else {
                            Swal.fire(
                                "Có lỗi!",
                                data.message,
                                "error"
                            ).then(function () {

                               
                                KTUtil.scrollTop();

                            })
                        }


                    },
                    error: function (errorResult) {
                        console.log(errorResult.responseText)
                    }
                })
            });

            $("#deppagi a").click(function (event) {

                var page = $(this).data('page');
                showtable(page)



            });
        }
    })

    $('#ModalCreate').click(function () {
        $('#CreateDep').modal()
    })

  

}
$(document).ready(function () {
    showtable();
})