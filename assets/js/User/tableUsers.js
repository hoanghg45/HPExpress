function showUserTable(search,depart,role,page) {
    $.ajax({
        type: "get",
        url: HOST_URL + '/account/Accounts',
        data: {
            search: search,
            depart: depart,
            role: role,
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

            table += '<th scope="col">Mã Tài khoản</th>'
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

                table += '<th >' + d.Id + '</th>'
                table += '<th >' + d.Name + '</th>'
                table += '<th >' + d.FullName + '</th>'
                table += '<th >' + d.Role + '</th>'
                table += '<th >' + d.Department + '</th>'
                table += '<th >' + d.Email + '</th>'
                table += '<th >' + d.Phone + '</th>'
                var stt = {
                    1: {
                        'title': 'Unactive',
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': 'Actived',
                        'class': ' label-light-success'
                    },


                };
                table += '<th>' + '<span class="label label-inline ' + stt[d.Status].class + ' font-weight-bold">' + stt[d.Status].title + '</span >' + '</th>';
                if (d.LastLogin != null) {
                    var lastLogin = new Date(parseInt(d.LastLogin.substr(6)))
                    table += '<th >' + timeCal(lastLogin + "") + '</th>'
                }
                else {
                    table += '<th >'+ 'Chưa từng đăng nhập' +'</th>'
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
	                                        <a href="#"  data-userID='+ d.Id +' class="navi-link btnUpdate" >\
	                                            <span class="navi-icon"><i class="la la-pen"></i></span>\
	                                            <span class="navi-text">Chỉnh sửa</span>\
	                                        </a>\
	                                    </li>\
                                         <li class="navi-item">\
	                                        <a href="#" class="navi-link">\
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
                $('#empty').append('<div id="empty" class="alert alert-danger" role = "alert"> Không có dữ liêu với truy vấn này! </div>');
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
                    var pagePrevious = pageCurrent - 1;
                    userpagi += '<a href = "#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious + ' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
                }

                for (i = 1; i <= numSize; i++) {
                    if (i == pageCurrent) {
                        userpagi += '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                    } else {
                        userpagi += '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                    }
                }

                if (pageCurrent > 0 && pageCurrent < numSize) {
                    var nextPage = pageCurrent + 1;
                    userpagi += '<a href = "#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
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
                    url: HOST_URL + '/Account/DetailAccount',
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
                            $("input[name=Gendermodel][value=" + data.Gender + "]").prop('checked', true)
                            
                        
                        }
                    },
                    error: function (errorResult) {
                        console.log(errorResult.responseText)
                    }
                })
                
            })



            $("#usernote a").click(function (event) {
                
                var page = $(this).data('page');
                
                var search = $("#searchUser").val()

                var depart = $('#datable_search_department').val()
                var role = $('#datable_search_role').val()

                

                showUserTable(search,depart,role,page)



            });


        }




    });
}

function AuthRoleUser(RoleID, DepID) {

    if (RoleID == 1) {
        showUserTable("", "", "", "")
    }
    if (RoleID == 2) {
        showUserTable("", DepID, "", "")
    }
   
}