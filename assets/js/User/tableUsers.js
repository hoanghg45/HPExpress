function showUserTable(search,depart,role,stt,id,page) {
    $.ajax({
        type: "get",
        url: HOST_URL + '/account/Accounts',
        data: {
            search: search,
            depart: depart,
            role: role,
            stt: stt,
            id: id,
            page: page
            
        },
        datatype: 'json',
        beforeSend: function () {
            $('#loading').show();
        },
        complete: function () {
            $('#loading').hide();
        },
        success: function (data) {

            $("#usertable").empty();


            let table = '<thead class="thead-light">'

            table += '<tr>'

            table += '<th scope="col">#</th>'
            table += '<th scope="col">Tên tài khoản</th>'
            table += '<th scope="col">Tên nhân viên </th>'
            table += '<th scope="col">Quyền tài khoản</th>'
            table += '<th scope="col">Phòng - ban</th>'
            table += '<th scope="col">Email</th>'
            table += '<th scope="col">Số điện thoại</th>'
            table += '<th scope="col">Trạng thái</th>'
            table += '<th scope="col">Đăng nhập gần nhất</th>'
            table += '<th scope="col">Hành động</th>'

            table += '</tr>'

            table += '</thead>'

            table += '<tbody id="datatable">'



            $.each(data.data, function (i, d, p) {
               
                table += '<tr>'

                table += '<th >' + ((10 * (data.pageCurrent - 1)) + (i + 1)) + '</th>'
                table += '<th >' + d.Name + '</th>'
                table += '<th >' + d.FullName + '</th>'
                table += '<th >' + d.Role + '</th>'
                table += '<th >' + d.Department + '</th>'
                table += '<th >' + d.Email + '</th>'
                table += '<th >' + d.Phone + '</th>'
                var stt = {
                    1: {
                        'title': 'Hạn chế',
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': 'Kích hoạt',
                        'class': ' label-light-success'
                    },


                };
                table += '<th>' + '<a href="javascrip:;" class="status" data-userID=' + d.Id + ' >' + '<span  style="width: 50pt;height: 20pt;" class="label label-inline ' + stt[d.Status].class + ' font-weight-bold">' + stt[d.Status].title + '</span >' + '</a>' + '</th>';
                if (d.LastLogin != null) {
                    var lastLogin = new Date(parseInt(d.LastLogin.substr(6)))
                    table += '<th >' + timeCal(lastLogin + "") + '</th>'
                }
                else {
                    table += '<th >' + 'Chưa từng đăng nhập' + '</th>'
                }



                table += '<td style="text-align: center"> ';

                table += '\
	                        <div class="dropdown dropdown-inline" >\
	                            <a href="javascript:;" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" data-toggle="dropdown">\
									<span class="svg-icon svg-icon-md">\
										<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="svg-icon">\
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
												<rect x="0" y="0" width="24" height="24"/>\
												<path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"/>\
												<path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"/>\
											</g>\
										</svg>\
									</span>\
	                            </a>\
	                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
	                                <ul class="navi flex-column navi-hover py-2">\
	                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
	                                        Chọn hành động\
	                                    </li>\
	                                      <li class="navi-item">\
	                                        <a href="#"  data-userID='+ d.Id + ' class="navi-link btnUpdate" >\
	                                            <span class="navi-icon"><i class="la la-pen"></i></span>\
	                                            <span class="navi-text">Chỉnh sửa</span>\
	                                        </a>\
	                                    </li>\
                                         <li class="navi-item">\
	                                        <a href="#" data-userID='+ d.Id + ' data-RoleID=' + d.RoleID + ' data-DepartmentID=' + d.DepartmentID + ' class="navi-link btnDel">\
	                                            <span class="navi-icon"><i class="la la-trash"></i></span>\
	                                            <span class="navi-text">Xóa</span>\
	                                        </a>\
	                                    </li>\
	                                </ul>\
	                            </div>\
	                        </div>\ ';
                table += '</td>';
                table += '</tr>';
               
            });





            table += '</tbody>'



            $('#usertable').append(table);
            $('#empty').empty()
            if (data.total < 1) {
                $('#empty').append('<div class="alert alert-danger" role = "alert"> Không có dữ liêu với truy vấn này! </div>');
                $('#billtable').empty()
                $('#usernote').empty()
                $('#userpagi').empty()
            } else {
                $('#userpagi').empty();
                var size = data.size;
                var total = data.total;
                var pageCurrent = data.pageCurrent;
                var numSize = data.numSize;
                var userpagi = ""
                if (pageCurrent > 1) {
                    userpagi += ' <a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 "data-page=1><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    userpagi += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious + ' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
                } else {
                    userpagi += ' <a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled "data-page=1 ><i class="ki ki-bold-double-arrow-back icon-xs" ></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    userpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + pagePrevious + ' disabled> <i class="ki ki-bold-arrow-back icon-xs "></i></a > '
                }
                var limit = 3;
                if (numSize >= limit) {

                    if (pageCurrent != numSize) {
                        for (i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                            if (i == pageCurrent) {
                                userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                            } else {
                                userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                            }
                        }
                    } else {
                        for (i = pageCurrent - 2; i <= pageCurrent; i++) {
                            if (i == pageCurrent) {
                                userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                            } else {
                                userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                            }
                        }
                    }



                } else {
                    if (numSize > 1) {
                        if (pageCurrent != 1) {
                            for (i = pageCurrent - 1; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        } else {
                            for (i = pageCurrent; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        }

                    } else {
                        userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + pageCurrent + '>' + pageCurrent + '</a>'
                    }

                }



                if (pageCurrent > 0 && pageCurrent < numSize) {
                    var nextPage = pageCurrent + 1;
                    userpagi += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    userpagi += '<a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                } else {
                    var nextPage = pageCurrent + 1;
                    userpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    userpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                }

                $('#userpagi').append(userpagi);

                $('#usernote').empty();
                var usernote = '<span class="text-muted">Hiển thị ' + data.from + '-' + data.to + ' trên ' + total + ' kết quả</span>'
                $('#usernote').append(usernote)
            }

            ///Funtion chức năng
            $(".btnUpdate").click(function (e) {
                e.preventDefault()

                var id = $(this).data('userid')
                $.ajax({
                    type: "get",
                    url: HOST_URL + 'Account/DetailAccount',
                    data: {
                        id: id
                    },
                    datatype: 'json',

                    success: function (data) {

                        if (data.status == "success") {
                            $("#Modal").modal()
                            
                            $("#modal_userID").val(id)
                            $("#modal_username").val(data.Name)                          
                            $("#modal_fullname").val(data.FullName)
                            $("#modal_UserEmail").val(data.Email)
                            $("#modal_userphone").val(data.Phone)
                            $("#modal_DepartmentID").val(data.DepartmentID)
                            $("#modal_RoleID").val(data.RoleID)

                            $("input[name=modal_Gender][value=" + data.Gender + "]").prop('checked', true)
                            setRoleByDepartForModal(data.DepartmentID)
                            $("#modal_DepartmentID").on('change', function () {
                                setRoleByDepartForModal(data.DepartmentID)
                            })
                            $("#modal_UserPass").attr("hidden", true);;
                            $("#divConfirmPass").attr("hidden", true);;
                            $("#changePass").removeAttr("hidden");
                        }
                    },
                    error: function (errorResult) {
                        console.log(errorResult.responseText)
                    }
                })
                
            })
            $(".btnDel").click(function (e) {
                e.preventDefault()
                var id = $(this).data('userid')
                var RoleID = $("#scrUpdate").data('roleid')
                var DepID = $("#scrUpdate").data('depid')
                var page = $("#userpagi a.active").data('page')
                Swal.fire({
                    title: "Bạn có chắc muốn xóa?",
                    text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có, xóa!",
                    cancelButtonText: "Không!",
                    reverseButtons: true,
                    heightAuto: false,
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Account/DeleteAccount',
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

                                        searchUser(page, RoleID, DepID)
                                        KTUtil.scrollTop();

                                    })
                                }
                                else if (data.status == "error") {
                                        Swal.fire(
                                            "Có lỗi!",
                                            data.message,
                                            "error"
                                        ).then(function () {

                                            searchUser(page, RoleID, DepID)
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
                                            heightAuto: false,
                                            reverseButtons: true
                                        }).then(function (result) {
                                                if (result.value) {
                                                    $.ajax({
                                                        type: "post",
                                                        url: HOST_URL + 'Account/DeleteAccount',
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

                                                                    searchUser(page, RoleID, DepID)
                                                                    KTUtil.scrollTop();

                                                                })
                                                            }
                                                            else if (data.status == "error") {
                                                                Swal.fire(
                                                                    "Có lỗi!",
                                                                    data.message,
                                                                    "error"
                                                                ).then(function () {

                                                                    searchUser(page, RoleID, DepID)
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

            $(".status").click(function (e) {

                var id = $(this).data('userid');

                e.preventDefault()
                var id = $(this).data('userid')
                var RoleID = $("#scrUpdate").data('roleid')
                var DepID = $("#scrUpdate").data('depid')
                var page = $("#userpagi a.active").data('page')
                Swal.fire({
                    title: "Bạn có chắc muốn thay đổi trạng thái?",
                    text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có!",
                    cancelButtonText: "Không!",
                    heightAuto: false,
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Account/updateStatus',
                            data: {
                                id: id
                            },
                            datatype: 'json',

                            success: function (data) {
                                if (data.status == "success") {
                                    Swal.fire(
                                        "Đã thay đổi!",
                                        "Trạng thái đã thay đổi thành công!",
                                        "success"
                                    ).then(function () {

                                        searchUser(page, RoleID, DepID)
                                        KTUtil.scrollTop();

                                    })
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



            $("#userpagi a").click(function (event) {
                
                var page = $(this).data('page');
                
                var search = $("#searchUser").val()

                var depart = $('#datable_search_department').val()
                var role = $('#datable_search_role').val()
                var stt = $('#datable_search_status').val()
                var currUser = $('#scrUpdate').data('curid')

                showUserTable(search, depart, role, stt, currUser, page)



            });


        }




    });
}

function AuthRoleUser(RoleID, DepID) {
    var currUser = $('#scrUpdate').data('curid')
    if (RoleID == 1) {

        showUserTable("", "", "", "", currUser, "")
    }
    if (RoleID == 2) {
        showUserTable("", DepID, "", "", currUser,  "")
    }
   
}