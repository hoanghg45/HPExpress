

function showtable(idpr, datetime, search, depart, userid,status ,page) {
    
    var id = idpr
    $.ajax({
        type: "get",
        url: HOST_URL + 'api/data',
        data: {
            id: id,
            page: page,
            date: datetime,
            search: search,
            dep: depart,
            usid: userid,
            stt: status
        },
        datatype: 'json',
        beforeSend: function () {
          /*  $('#loading').show();*/
        },
        complete: function () {
                $('#loading').hide();
        },
        success: function (data) {
         
            $("#billtable").empty();


            let table = '<thead class="thead-light">'

            table += '<tr>'

            table += '<th scope="col">Mã phiếu</th>'
            table += '<th scope="col">Ngày gửi</th>'
            table += '<th scope="col">Người gửi</th>'
            table += '<th scope="col">Người nhận</th>'
            table += '<th scope="col">Công ty nhận</th>'
            table += '<th scope="col">Địa chỉ</th>'
            table += '<th scope="col">Nội dung</th>'
            table += '<th scope="col">Loại hình gửi</th>'
            table += '<th scope="col">Đơn vị vận chuyển</th>'
          
            table += '<th scope="col">Phân loại</th>'
            table += '<th scope="col">Số kiện</th>'
            
            table += '<th scope="col">Trạng thái</th>'
            table += '<th scope="col"></th>'

            table += '</tr>'

            table += '</thead>'

            table += '<tbody id="datatable">'
            
           
            
            $.each(data.data, function (i, d, p) {
                table += '<tr id="' + d.Id + '">'
                var sl = d.Id.slice(0, 4)
                if (sl != "bill") {
                    table += '<th id="' + d.Id + '">' + d.Id + '</th>'
                }
                else {
                    table += '<th id="' + d.Id + '">Phiếu chưa được gán mã</th>'
                }
                
                if (d.Dateship != null) {
                    table += '<th>' + formatDate(d.Dateship.substr(6)) + '</th>'
                }
                else {
                    table += '<th style=" width: 72px; ">' + 'Chưa gửi' + '</th>'
                }
                table += '<th>' + d.Owner + '</th>'

                var cus_inf = d.Cusinf.split('|')
                table += '<th>' + cus_inf[0] + '</th>'
                table += '<th>' + cus_inf[1] + '</th>'
                table += '<th>' + cus_inf[2] + '</th>'
                table += '<th>' + d.Content + '</th>'
                table += '<th>' + d.Trans + '</th>'
                var prov = {
                    1: {
                        'title': 'NetPost',
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': 'ViettelPost',
                        'class': ' label-light-warning'
                    },
                    3: {
                        'title': 'Tasetco',
                        'class': ' label-light-success'
                    },

                };
                table += '<th>' + '<span class="label label-inline ' + prov[d.ProviderID].class + ' font-weight-bold">' + prov[d.ProviderID].title + '</span >' + '</th>'

                table += '<th>' + d.Category + '</th>'
                table += '<th>' + d.Package + '</th>'
                
                var stt = {
                    'Chưa hoàn thành': {
                        'title': 'Chưa hoàn thành',
                        'class': 'danger'

                    },
                    'Chờ gửi': {
                        'title': 'Chờ gửi',
                        'class': 'info'

                    },
                    'Đã gửi': {
                        'title': 'Đã gửi',
                        'class': 'success'
                    },
                    'Chờ In': {
                        'title': 'Chờ in',
                        'class': 'warning'
                    }


                };
                table += '<th style="width: 80px;"> '
                var RoleID = $("#scrUserInf").data('roleid')
                var span = '<span class="label label-' + stt[d.StatusName.trim()].class + ' label-dot mr-2"></span><span class="font-weight-bold text-' + stt[d.StatusName.trim()].class + '">' +
                    stt[d.StatusName.trim()].title + '</span>'
                var currentUser = $("#UserID").val()
               

                var lstPer = getPer()
                table += span
                table += '</span> </th>'
                table += '<td> ';
                
                if (d.StatusName.trim() == "Chờ In" && lstPer.includes("PrintBill")) {
                    table += '\
                        <div class="dropdown dropdown-inline">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Chọn hành động:\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="javascript:;"  data-id=' + d.Id + ' class="navi-link btnChangeID">\
                                            <span class="navi-icon"><i class="la la-pen"></i></span>\
                                            <span class="navi-text">Sửa mã đơn</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="javascript:;"  data-id=' + d.Id + ' class="navi-link rollback">\
                                            <span class="navi-icon"><i class="la la-undo"></i></span>\
                                            <span class="navi-text">Trở về trạng thái <b>Chưa hoàn thành</b> </span>\
                                        </a>\
                                    </li>\
                                 </ul>\
                            </div>\
                        </div>\
                       </tr>\
                       \
                    ';
                } else
                    if (d.StatusName.trim() == "Chưa hoàn thành" && lstPer.includes("CreateBill")) {
                        table += '\
                        <div class="dropdown dropdown-inline">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Chọn hành động:\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link finishBtn">\
                                            <span class="navi-icon"><i class="la la-check"></i></span>\
                                            <span class="navi-text">Xác nhận hoàn thành</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link editBtn">\
                                            <span class="navi-icon"><i class="la la-edit"></i></span>\
                                            <span class="navi-text">Chỉnh sửa phiếu</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link removeBtn">\
                                            <span class="navi-icon"><i class="la la-trash"></i></span>\
                                            <span class="navi-text">Hủy phiếu</span>\
                                        </a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                       </tr>\
                       \
                    ';
                    } else
                        if (d.StatusName.trim() == "Chờ gửi" && lstPer.includes("ShipBill")) {
                            table += '\
                        <div class="dropdown dropdown-inline">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Chọn hành động:\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link shipBill">\
                                            <span class="navi-icon"><i class="la la-shipping-fast"></i></span>\
                                            <span class="navi-text">Gửi phiếu</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item changeID">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link printBtn">\
                                            <span class="navi-icon"><i class="la la-print"></i></span>\
                                            <span class="navi-text">In phiếu</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link removeBtn">\
                                            <span class="navi-icon"><i class="la la-trash"></i></span>\
                                            <span class="navi-text">Hủy phiếu</span>\
                                        </a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                       </tr>\
                       \
                    ';
                        } else {
                            table += '\
                        <div class="dropdown dropdown-inline">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Chọn hành động:\
                                    </li>\
                                    <li class="navi-item ">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link detailBill">\
                                            <span class="navi-icon"><i class="la la-file-text-o"></i></span>\
                                            <span class="navi-text">Chi tiết phiếu</span>\
                                        </a>\
                                    </li>\
                                   </ul>\
                            </div>\
                        </div>\
                       </tr>\
                       \
                    ';
                        }
                    
               
                    table += '</td>';
                    table += '</tr>';
                });
            

            
            

            table += '</tbody>'
           

            $('#billtable').append(table);
          
            $('#empty').empty()
            if (data.total < 1) {
                $('#empty').append('<div id="empty" class="alert alert-danger" role = "alert"> Không có dữ liêu với truy vấn này! </div>');
                $('#billtable').empty()
                $('#billnote').empty()
                $('#billpagi').empty()
            } else {
                $('#billpagi').empty();
                var size = data.size;
                var total = data.total;
                var pageCurrent = data.pageCurrent;
                /*var numSize = data.numSize;*/
                var numSize = data.numSize;
                var billpagi = ""
                if (pageCurrent > 1) {
                    billpagi += ' <a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 "data-page=1><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    billpagi += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious + ' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
                } else {
                    billpagi += ' <a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled "data-page=1 ><i class="ki ki-bold-double-arrow-back icon-xs" ></i></a>'
                    var pagePrevious = pageCurrent - 1;
                    billpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + pagePrevious + ' disabled> <i class="ki ki-bold-arrow-back icon-xs "></i></a > '
                }
                var limit = 3;
                if (numSize >= limit) {

                    if (pageCurrent != numSize) {
                        for (i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                            if (i == pageCurrent) {
                                billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                            } else {
                                billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                            }
                        }
                    } else {
                        for (i = pageCurrent - 2; i <= pageCurrent; i++) {
                            if (i == pageCurrent) {
                                billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                            } else {
                                billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                            }
                        }
                    }



                } else {
                    if (numSize > 1) {
                        if (pageCurrent != 1) {
                            for (i = pageCurrent - 1; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        } else {
                            for (i = pageCurrent; i <= numSize; i++) {
                                if (i == pageCurrent) {
                                    billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                                } else {
                                    billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                                }
                            }
                        }

                    } else {
                        billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + pageCurrent + '>' + pageCurrent + '</a>'
                    }

                }



                if (pageCurrent > 0 && pageCurrent < numSize) {
                    var nextPage = pageCurrent + 1;
                    billpagi += '<a href = "javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    billpagi += '<a href="javascript:;" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                } else {
                    var nextPage = pageCurrent + 1;
                    billpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                    billpagi += '<a  class="btn btn-icon btn-sm btn-light-primary mr-2 my-1 disabled"  data-page=' + numSize + ' ><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
                }

                $('#billpagi').append(billpagi);

                $('#billnote').empty();
                var billnote = '<span class="text-muted">Hiển thị ' + data.from + '-' + data.to + ' trên ' + total + ' kết quả</span>'
                $('#billnote').append(billnote)
            }
           
            ///Funtion chức năng
            
            function getPer() {
                var currentUser = $("#UserID").val()
                var result = "";
                $.ajax({
                    type: "Get",
                    url: HOST_URL + 'Account/DetailAccount/',
                    data: {
                        "id": currentUser
                    },
                    async: false,
                    datatype: 'json',
                    success: function (data) {
                        result = data.Per;
                    }


                });
                return result;
            }
                      

            $('.shipBill').click(function (event) {
                var lstPer = getPer()
                if (lstPer.includes("ShipBill"))
                {
                    var barcode = $(this).data('id');
                    console.log(barcode)
                    Swal.fire({
                        title: "Gửi phiếu " + barcode + " ?",
                        text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Có!",
                        cancelButtonText: "Không!",
                        reverseButtons: true,
                        heightAuto: false,
                    }).then(function (result) {
                        var page = $("#billpagi a.active").data('page')
                        var RoleID = $("#scrUserInf").data('roleid')
                        var DepID = $("#scrUserInf").data('depid')
                        var UserID = $("#UserID").val()
                        if (result.value) {
                            $.ajax({
                                type: "post",
                                url: HOST_URL + 'Waybill/updateStatus',
                                data: {
                                    id: barcode
                                },
                                datatype: 'json',

                                success: function (data) {
                                    if (data.status == "success") {
                                        Swal.fire({

                                            icon: "success",
                                            title: "Phiếu đã được cập nhật trạng thái",
                                            showConfirmButton: false,
                                            heightAuto: false,
                                            timer: 2000
                                        }).then(function () {
                                            billsearch(page, RoleID, DepID, UserID)
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: data.message,
                                            showConfirmButton: false,
                                            heightAuto: false,
                                            timer: 2000
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
                            Swal.fire({
                                icon: "success",
                                title: "Dữ liệu vẫn an toàn",
                                showConfirmButton: false,
                                heightAuto: false,
                                timer: 2000
                            }).then(function () {

                                billsearch(page, RoleID, DepID, UserID)


                            })
                        }
                    });
                }
                

                
            });

            $('.finishBtn').click(function (event) {
                var barcode = $(this).data('id')
                console.log(barcode)
                Swal.fire({
                    title: "Bạn muốn hoàn thành phiếu ?",
                    text: "Vui lòng kiểm tra kỹ thông tin phiếu!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có!",
                    cancelButtonText: "Không!",
                    reverseButtons: true,
                    heightAuto: false,
                }).then(function (result) {
                    var page = $("#billpagi a.active").data('page')
                    var RoleID = $("#scrUserInf").data('roleid')
                    var DepID = $("#scrUserInf").data('depid')
                    var UserID = $("#UserID").val()
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Waybill/updateStatus',
                            data: {
                                id: barcode
                            },
                            datatype: 'json',

                            success: function (data) {
                                if (data.status == "success") {
                                    Swal.fire({

                                        icon: "success",
                                        title: "Phiếu đã được cập nhật trạng thái",
                                        showConfirmButton: false,
                                        heightAuto: false,
                                        timer: 2000
                                    }).then(function () {
                                        billsearch(page, RoleID, DepID, UserID)
                                    })
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: data.message,
                                        showConfirmButton: false,
                                        heightAuto: false,
                                        timer: 2000
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
                        Swal.fire({
                            icon: "success",
                            title: "Dữ liệu vẫn an toàn",
                            showConfirmButton: false,
                            heightAuto: false,
                            timer: 2000
                        }).then(function () {

                            billsearch(page, RoleID, DepID, UserID)


                        })
                    }
                });


            });

            $('.removeBtn').click(function (event) {
                var barcode = $(this).data('id')
                console.log(barcode)
                Swal.fire({
                    title: "Bạn muốn xóa phiếu ?",
                    text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có!",
                    cancelButtonText: "Không!",
                    reverseButtons: true,
                    heightAuto: false,
                }).then(function (result) {
                    var page = $("#billpagi a.active").data('page')
                    var RoleID = $("#scrUserInf").data('roleid')
                    var DepID = $("#scrUserInf").data('depid')
                    var UserID = $("#UserID").val()
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            url: HOST_URL + 'Waybill/Remove',
                            data: {
                                id: barcode
                            },
                            datatype: 'json',

                            success: function (data) {
                                if (data.status == "success") {
                                    Swal.fire({

                                        icon: "success",
                                        title: "Xóa thành công",
                                        showConfirmButton: false,
                                        heightAuto: false,
                                        timer: 2000
                                    }).then(function () {
                                        billsearch(page, RoleID, DepID, UserID)
                                    })
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: data.message,
                                        showConfirmButton: false,
                                        heightAuto: false,
                                        timer: 2000
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
                        Swal.fire({
                            icon: "success",
                            title: "Dữ liệu vẫn an toàn",
                            showConfirmButton: false,
                            heightAuto: false,
                            timer: 2000
                        }).then(function () {

                            billsearch(page, RoleID, DepID, UserID)


                        })
                    }
                });


            });

            $("#billpagi a").click(function (event) {
                var value = $('#searchInput').val().toLowerCase();
                var page = $(this).data('page');
                var RoleID = $('#scrUserInf').data('roleid')
                var DepID =  $("#scrUserInf").data('depid')
                var UserID = $("#UserID").val()

                billsearch(page, RoleID, DepID, UserID)

                
                
            });

            $('.printBtn').click(function (event) {


                var idbill = $(this).data('id')
                var check = idbill.slice(0, 4)

                if (check == "bill") {
                    Swal.fire({
                        title: "Phiếu chưa có mã?",
                        text: "Vui lòng nhập mã đơn trước khi in!",
                        icon: "info",
                        showConfirmButton: false,
                        heightAuto: false,
                        timer: 2000
                    })
                } else {
                 

                    var proid = $(this).data('proid')
                    switch (proid) {
                        case 1: printNetPost(idbill)

                            break;
                        case 2: printViettelPost(idbill)
                            break;
                        case 3: printTasetco()
                            break;
                        default:
                            break;
                    }
                }
             
                

              
            });
            

            function savebill(id) {
                
                var check = true
                var value = $('input[name=' + id + ']').val()
                var span = $('#vali_' + id + '')
                span.text('')
                if (value.length < 8 || value.length > 13) {
                    span.text('Mã phải có độ dài từ 8 - 13 ký tự!')
                    check = false
                }
                if (check) {
                    Swal.fire({
                        title: "Bạn có chắc muốn thay đổi?",
                        text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Có!",
                        cancelButtonText: "Không!",
                        reverseButtons: true,
                        heightAuto: false

                    }).then(function (result) {
                        var page = $("#billpagi a.active").data('page')
                        var RoleID = $("#scrUserInf").data('roleid')
                        var DepID = $("#scrUserInf").data('depid')
                        var UserID = $("#UserID").val()
                        if (result.value) {
                            $.ajax({
                                type: "post",
                                url: HOST_URL + 'Waybill/changeBillID',
                                data: {
                                    oldid: id,
                                    newid: value
                                },
                                datatype: 'json',

                                success: function (data) {
                                    if (data.status == "success") {
                                        Swal.fire({
                                            title: "Thay đổi thành công!",
                                            text: data.message,
                                            icon: "success",
                                            showCancelButton: false,
                                            confirmButtonText: "Có!",
                                            cancelButtonText: "Không!",
                                            reverseButtons: true,
                                            heightAuto: false

                                        }                                         
                                        ).then(function () {

                                            billsearch(page, RoleID, DepID, UserID)


                                        })
                                    } else {
                                        Swal.fire(
                                            "Đã có lỗi!",
                                            data.message,
                                            "error"
                                        )
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
                            ).then(function () {

                                billsearch(page, RoleID, DepID, UserID)


                            })
                        }
                    });
                }

            }
            /////
            
            ///Đổi mã vận đơn
            $('.btnChangeID').click(function () {

                var idbill = $(this).data('id')
                idbill = $.trim(idbill);

                var thopen = $('th[data-check="true"]')
                if (thopen != null) {
                    thopen.empty()
                    
                        thopen.append(thopen.attr('id'))
                    thopen.removeAttr('data-check')
                
                }
                var th = $("#" + idbill).children(":first")
                
                th.empty()
                var editable = '<div id="' + idbill + '"> <div style = "display:flex;justify-content:left" > <input  class="txtbillid" required oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength = "10" name= "' + idbill + '" style="margin-right:10px;width: 90px" value="' + idbill + '" ><a class="btnsavebillid"  href="javascript:;"> <i class="fas fa-save text-success icon-md"></i></a></div></div> <span style="font-size: 11px;" id="vali_' + idbill + '" class="text-danger"></span>'
                th.append(editable)
                th.attr('data-check', 'true');
                $('.btnsavebillid').click(function () {
                    id = $(this).parent().parent().attr('id')
                        savebill(id)
                })
               
            });

            //Rollback
            $('.rollback').click(function (event) {
                    var barcode = $(this).data('id');
                    
                    Swal.fire({
                        title: "Trả phiếu về trạng thái Chưa hoàn thành ?",
                        text: "Thao tác này có thể ảnh hưởng đến dữ liệu hệ thống!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Có!",
                        cancelButtonText: "Không!",
                        reverseButtons: true,
                        heightAuto: false,
                    }).then(function (result) {
                        var page = $("#billpagi a.active").data('page')
                        var RoleID = $("#scrUserInf").data('roleid')
                        var DepID = $("#scrUserInf").data('depid')
                        var UserID = $("#UserID").val()
                        if (result.value) {
                            $.ajax({
                                type: "post",
                                url: HOST_URL + 'Waybill/updateStatus',
                                data: {
                                    id: barcode,
                                    rollback: true
                                },
                                datatype: 'json',

                                success: function (data) {
                                    if (data.status == "success") {
                                        Swal.fire({

                                            icon: "success",
                                            title: "Phiếu đã được cập nhật trạng thái",
                                            showConfirmButton: false,
                                            heightAuto: false,
                                            timer: 2000
                                        }).then(function () {
                                            billsearch(page, RoleID, DepID, UserID)
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: data.message,
                                            showConfirmButton: false,
                                            heightAuto: false,
                                            timer: 2000
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
                            Swal.fire({
                                icon: "success",
                                title: "Dữ liệu vẫn an toàn",
                                showConfirmButton: false,
                                heightAuto: false,
                                timer: 2000
                            }).then(function () {

                                billsearch(page, RoleID, DepID, UserID)


                            })
                        }
                    });
                



            });

            //Edit
            $('.editBtn').click(function (event) {
                var barcode = $(this).data('id')
                var pro_id = $(this).data('proid')
                switch (pro_id) {
                    case 1: modalNetPost(barcode)
                         break;
                    case 2: modalViettelPost(barcode)
                        break;
                    case 3: printTasetco()
                        break;
                    default:
                        break;
                }

               
            });

            function modalNetPost(id) {
                $.ajax({
                    type: "Get",
                    url: HOST_URL + 'Waybill/Details/',
                    data: {
                        "id": id
                    },
                    async: false,
                    datatype: 'json',
                    success: function (data) {
                        if (data.status == "success") {
                            $("#net_owner_id").val(data.OwnerID).change();
                            $("#net_comp_phone").val(data.Phone);
                            $("#net_bill_id").val(data.BillID);
                            $("#net_user_id").val(data.UserID);
                            var cus_inf = data.CustomerInf.split('|');
                            $("#net_customer_name").val(cus_inf[0]);
                            $("#net_customer_comp").val(cus_inf[1]);
                            $("#net_customer_add").val(cus_inf[2]);
                            $("#net_cus_phone").val(cus_inf[3]);
                            $("#net_content").val(data.BillContent);
                            $("#net_package_numb").val(data.ProductPakage);
                            $("#net_pro_wei").val(data.ProductWeight);
                            var leng = (data.Lenght == null) ? "" : data.Lenght
                            var wid = (data.Width == null) ? "" : data.Width
                            var hei = (data.Heigh == null) ? "" : data.Heigh

                            $("#net_pro_leng").val(leng);
                            $("#net_pro_wid").val(wid);
                            $("#net_pro_hei").val(hei);

                            var cate = data.Category;
                            $("input[name='CatBox']").prop('checked', false)
                            $.each(cate, function (k, v) {
                                var check = $("input#net_CatBox" + v)
                                check.prop('checked', true);

                            })
                            $("input#net_transRadio" + data.TransID).prop('checked', true);
                            $("input#net_paymentRadio" + data.PaymentID).prop('checked', true);
                            if (data.ServiceID != null) {
                                $("input#net_serviceRadio" + data.ServiceID).prop('checked', true);
                            }
                            
                               
                            
                        }
                    }


                });
                $("#NetpostModal").modal()

            }

            function modalViettelPost(id) {
                $.ajax({
                    type: "Get",
                    url: HOST_URL + 'Waybill/Details/',
                    data: {
                        "id": id
                    },
                    async: false,
                    datatype: 'json',
                    success: function (data) {
                        if (data.status == "success") {
                            $("#vt_bill_id").val(data.BillID);
                            $("#vt_user_id").val(data.UserID);
                            $("#vt_owner_id").val(data.OwnerID).change();
                            $("#vt_comp_phone").val(data.Phone);
                            var cus_inf = data.CustomerInf.split('|');
                            $("#vt_customer_name").val(cus_inf[0]);
                            $("#vt_customer_comp").val(cus_inf[1]);
                            $("#vt_customer_add").val(cus_inf[2]);
                            $("#vt_cus_phone").val(cus_inf[3]);
                            $("#vt_content").val(data.BillContent);
                            $("#vt_package_numb").val(data.ProductPakage);
                            $("#vt_pro_wei").val(data.ProductWeight);
                            var leng = (data.Lenght == null) ? "" : data.Lenght
                            var wid = (data.Width == null) ? "" : data.Width
                            var hei = (data.Heigh == null) ? "" : data.Heigh

                            $("#vt_pro_leng").val(leng);
                            $("#vt_pro_wid").val(wid);
                            $("#vt_pro_hei").val(hei);

                            var cate = data.Category;
                            $("input[name='CatBox']").prop('checked', false)
                            $.each(cate, function (k, v) {
                                var check = $("input#vt_CatBox" + v)
                                check.prop('checked', true);

                            })
                            $("input#vt_transRadio" + data.TransID).prop('checked', true);
                            $("input#vt_paymentRadio" + data.PaymentID).prop('checked', true);
                            if (data.ServiceID != null) {
                                $("input#vt_serviceRadio" + data.ServiceID).prop('checked', true);
                            }



                        }
                    }


                });
                $("#ViettelPostModal").modal()

            }

            $('.detailBill').click(function () {
                var idbill = $(this).data('id')
                var idpro = $(this).data('proid')
                if (idpro == 1) {
                    $('#proName').html('<b><span style="color: #7d2f2f; ">NET</span><span style="color:#ea3639;">POST</span></b>');
                } else if (idpro == 2) {
                    $('#proName').html('<b><span style="color: #01766b;">VIETTEL</span><span style="color: #f27510;">POST</span></b>');
                }
                $.ajax({
                    type: "Get",
                    url: HOST_URL + 'Waybill/Details/',
                    data: {
                        "id": idbill
                    },
                    async: false,
                    datatype: 'json',
                    success: function (data) {
                        if (data.status == "success") {
                           
                            var sl = data.BillID.slice(0, 4)
                            var bid = sl == 'bill' ? 'Phiếu chưa gán mã' : data.BillID
                            $("#billID").text(bid);
                            var ds = data.DateShip == null ? 'Chưa gửi' : formatDate(data.DateShip.substr(6))
                            $("#dateShip").text(ds)
                            var cus_inf = data.CustomerInf.split('|');
                            $("#cusInfo").html( cus_inf[1] + ' - ' + cus_inf[2] + '</br>' + cus_inf[0] + ' - ' + cus_inf[3] + '');


                            
                            var tr = '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Người tạo phiếu:</td><td class="font-weight-boldest text-right pt-7">' + data.CreateBy + '</td> </tr >'
                            if (data.ShipBy != null) {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Người gửi phiếu:</td><td class="font-weight-boldest text-right pt-7">' + data.ShipBy + '</td> </tr >'
                            }
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Người sở hữu:</td><td class="font-weight-boldest text-right pt-7">' + data.Owner + '</td> </tr >'
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Ngày tạo:</td><td class="font-weight-boldest text-right pt-7">' + data.CreateAT + '</td> </tr >'
                            if (data.PrintAt != 'null') {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Ngày in:</td><td class="font-weight-boldest text-right pt-7">' + data.PrintAt + '</td> </tr >'
                            }
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Nội dung:</td><td class="font-weight-boldest text-right pt-7">' + data.BillContent + '</td> </tr >'
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Phương thức vận chuyển:</td><td class="font-weight-boldest text-right pt-7">' + data.Trans + '</td> </tr >'
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Số kiện:</td><td class="font-weight-boldest text-right pt-7">' + data.ProductPakage + '</td> </tr >'
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Cân nặng:</td><td class="font-weight-boldest text-right pt-7">' + data.ProductWeight + 'kg</td> </tr >'
                            if (data.Heigh != null) {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Chiều cao:</td><td class="font-weight-boldest text-right pt-7">' + data.Heigh + 'kg</td> </tr >'
                            } if (data.Lenght != null) {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Chiều dài:</td><td class="font-weight-boldest text-right pt-7">' + data.Lenght + 'kg</td> </tr >'
                            } if (data.Width != null) {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Chiều rộng:</td><td class="font-weight-boldest text-right pt-7">' + data.Width + 'kg</td> </tr >'
                            } if (data.Service != null) {
                                tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Dịch vụ:</td><td class="font-weight-boldest text-right pt-7">' + data.Service + 'kg</td> </tr >'
                            }
                            tr += '<tr class=" border-bottom-0" ><td class="pl-0 pt-7">Phân loại:</td><td class="font-weight-boldest text-right pt-7">' + data.CategoryName + '</td> </tr >'

                            $("#bodyTable").empty()
                            $("#bodyTable").append(tr)
                            
                                                       




                        }
                    }


                });
                $('#DetailsNetModal').modal()
            })

            

            function printNetPost(idbill) {
                $.ajax({
                    type: "post",
                    url: HOST_URL + 'Waybill/PrintByID/',
                    data: {
                        "id": idbill
                    },
                    datatype: 'json',
                    success: function (data) {
                        console.log(data)
                        var table = ''
                    
                        table = '<table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" align="left" width="682" style="width:511.35pt;background:white;border-collapse:collapse; border:none;margin-left:6.75pt;margin-right:6.75pt"> <tbody> <tr style="height:11.35pt"> <td width="193" colspan="5" style="width:144.65pt;border:solid windowtext 1.0pt; border-right:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm; margin-left:6.0pt;margin-bottom:.0001pt;text-indent:-6.0pt;line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif;color:black">&nbsp;</span></p> </td> <td width="145" colspan="4" valign="bottom" style="width:108.6pt;border:solid windowtext 1.0pt; border-left:none;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;text-indent:7.1pt;line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif;color:black">7001018</span></p> </td> <td width="344" colspan="2" valign="top" style="width:258.1pt;border:solid windowtext 1.0pt; border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p class="MsoNormal" align="right" style="margin-top:0cm;margin-right:0cm; margin-bottom:0cm;margin-left:6.0pt;margin-bottom:.0001pt;text-align:right; text-indent:-6.0pt;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">&nbsp;</span></p> </td> </tr> <tr style="height:11.35pt"> <td width="338" colspan="9" valign="top" style="width:253.25pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="user_name" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black"></span></p> </td> <td width="344" colspan="2" valign="top" style="width:258.1pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:18pt"> <p id="cus_name" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;text-indent:36.75pt;line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif;color:black"></span></p> </td> </tr> <tr style="height:31.2pt"> <td width="338" colspan="9" valign="top" style="width:253.25pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:31.2pt"> <p class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:right;line-height:normal"><span style="font-size:10.0pt;font-family: Arial,sans-serif;color:black">Công ty TMCP HAPHAN</span></p> </td> <td width="344" colspan="2" valign="top" style="width:258.1pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:31.2pt"> <p id="cus_comp" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:0cm; margin-bottom:0cm;margin-left:-5.65pt;margin-bottom:.0001pt;text-align:right; text-indent:21.3pt;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black"></span></p> </td> </tr> <tr style="height:36.95pt"> <td width="338" colspan="9" valign="top" style="width:253.25pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:36.95pt"> <p class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:right;text-indent:36.75pt;line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif;color:black">Số 758/25/2b Xô Viết Nghệ Tĩnh, Phường 25, Quận Bnh Thạnh, TP. Hồ Chí Minh</span></p> </td> <td width="344" colspan="2" valign="top" style="width:258.1pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:36.95pt"> <p id="cus_add" class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:right;text-indent:8.55pt;line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif;color:black"> </span></p> </td> </tr> <tr style="height:11.35pt"> <td width="338" colspan="9" valign="bottom" style="width:253.25pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">028 7109 9599</span></p> </td> <td width="344" colspan="2" valign="bottom" style="width:258.1pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="cus_phone" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black"></span></p> </td> </tr> <tr style="height:11.35pt"> <td width="103" valign="top" style="width:77.3pt;border:solid windowtext 1.0pt; border-top:none;background:white;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"></td> <td width="102" colspan="5" valign="top" style="width:76.45pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_cat1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:13.85pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size:10.0pt">&nbsp;</p> </td> <td width="133" colspan="3" valign="top" style="width:99.5pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_cat2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:19.5pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt">&nbsp;</p> </td> <td width="151" valign="top" style="width:113.35pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> </tr> <tr style="height:11.35pt"> <td width="103" style="width:77.3pt;border:solid windowtext 1.0pt;border-top: none;background:white;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal;font-size: 10pt;"></p> </td> <td width="102" colspan="5" valign="top" style="width:76.45pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="133" colspan="3" valign="top" style="width:99.5pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="151" rowspan="7" valign="top" style="width:113.35pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:37.05pt;margin-bottom:.0001pt;text-align:right; text-indent:1.6pt;line-height:normal;font-size:10.0pt">&nbsp;</p> </td> </tr> <tr style="height:11.35pt"> <td width="103" valign="top" style="width:77.3pt;border-top:none;border-left: solid windowtext 1.0pt;border-bottom:none;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> </td> <td width="102" colspan="5" rowspan="2" style="width:76.45pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_weight" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">45kg</span></p> </td> <td width="133" colspan="3" rowspan="2" valign="top" style="width:99.5pt;border-top: none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt">&nbsp;</p> </td> </tr> <tr style="height:11.35pt"> <td width="103" valign="top" style="width:77.3pt;border:solid windowtext 1.0pt; border-bottom:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_8" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt;">&nbsp;</p> </td> </tr> <tr style="height:11.35pt"> <td width="103" rowspan="4" style="width:77.3pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="bill_content" class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:right;line-height:normal"><span style="font-size:10.0pt;font-family: Arial,sans-serif;color:black"></span></p> </td> <td width="34" colspan="2" rowspan="4" valign="top" style="width:25.5pt;border-top: none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="49" valign="top" style="width:36.85pt;border:solid windowtext 1.0pt; border-left:none;padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="49" colspan="3" valign="top" style="width:36.85pt;border:solid windowtext 1.0pt; border-left:none;padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="49" valign="top" style="width:37.05pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="53" valign="top" style="width:39.7pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt">&nbsp;</p> </td> </tr> <tr style="height:11.35pt"> <td width="49" rowspan="3" style="width:36.85pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_length" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">dai</span></p> </td> <td width="49" colspan="3" rowspan="3" style="width:36.85pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_height" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">cao</span></p> </td> <td width="49" rowspan="3" style="width:37.05pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_width" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">rong</span></p> </td> <td width="53" rowspan="3" style="width:39.7pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="pro_package" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:center;line-height:normal"><span style="font-size:10.0pt; font-family:Arial,sans-serif;color:black">kien</span></p> </td> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt">&nbsp;</p> </td> </tr> <tr style="height:11.35pt"> <td width="193" style="width:144.75pt;border-top:none;border-left:none; border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="trans_5" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal; font-size:10.0pt">&nbsp;</p> </td> </tr> <tr style="height:25.55pt"> <td width="193" valign="top" style="width:144.55pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm;"> <p id="trans_6"' +
                                ' class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.3pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal;font-size: 8pt">&nbsp;</p> </td> </tr> <tr style="height:31pt"> <td width="285" colspan="8" valign="top" style="width:213.55pt;border:solid windowtext 1.0pt; border-top:none;background:white;padding:0cm 0cm 0cm 0cm"> </td> <td width="204" colspan="2" valign="top" style="width:153.05pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm"> </td> <td width="193" valign="top" style="width:144.75pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; background:white;padding:0cm 0cm 0cm 0cm"> </td> </tr> <tr style="height:11.35pt"> <td width="117" colspan="2" valign="top" style="width:87.85pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 0cm 0cm 5.4pt;height:11.35pt"> <p id="pays_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:6.6pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> <td width="168" colspan="6" style="width:125.7pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="pays_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:10.05pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> <td width="204" colspan="2" style="width:153.05pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="timedate" class="MsoNormal" style="margin-bottom: 0cm; margin-bottom: .0001pt; line-height: normal;"> &nbsp;&nbsp; <span id="timehour" style="font-size:10.0pt"></span> &nbsp;&nbsp; <span id="timeminu" style="font-size:10.0pt"></span> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="dateday" style="font-size:10.0pt"></span>                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="datemonth" style="font-size:10.0pt"></span> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="dateyear" style="font-size:10.0pt"></span>                            </p> </td> <td width="193" rowspan="6" valign="top" style="width:144.75pt;border-top:none; border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height: normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black">&nbsp;</span></p> </td> </tr> <tr style="height:11.35pt"> <td width="285" colspan="8" valign="top" style="width:213.55pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="pays_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.45pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> <td width="204" colspan="2" rowspan="5" valign="top" style="width:153.05pt; border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt; border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> </td> </tr> <tr style="height:11.35pt"> <td width="285" colspan="8" valign="top" style="width:213.55pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="pays_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.45pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> </tr> <tr style="height:25.35pt"> <td width="285" colspan="8" style="width:213.55pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;"> </td> </tr> <tr style="height:11.35pt"> <td width="117" colspan="2" style="width:87.85pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="service_1" class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt; text-align:right;line-height:normal"><span style="font-size:10.0pt;font-family: Arial,sans-serif;color:black"></span></p> </td> <td width="168" colspan="6" style="width:125.7pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 5.4pt 0cm 5.4pt;height:11.35pt"> <p id="service_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.45pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> </tr> <tr style="height:11.35pt"> <td width="117" colspan="2" style="width:87.85pt;border:solid windowtext 1.0pt; border-top:none;padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="service_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:6.6pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> <td width="168" colspan="6" style="width:125.7pt;border-top:none;border-left: none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt; padding:0cm 0cm 0cm 0cm;height:11.35pt"> <p id="service_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:16.6pt; margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right; line-height:normal"><span style="font-size:10.0pt;font-family:Arial,sans-serif; color:black"></span></p> </td> </tr> <tr height="0"> <td width="103" style="border:none"></td> <td width="14" style="border:none"></td> <td width="20" style="border:none"></td> <td width="49" style="border:none"></td> <td width="7" style="border:none"></td> <td width="12" style="border:none"></td> <td width="30" style="border:none"></td> <td width="49" style="border:none"></td> <td width="53" style="border:none"></td> <td width="151" style="border:none"></td> <td width="193" style="border:none"></td> </tr> </tbody> </table>'
                        


                        $('#billform').empty();
                        $('#billform').append(table);
                        //ten nguoi nhap
                        $("#user_name").text("");
                        $("#cus_name").text(data.customer_name);
                        $("#cus_comp").children().text(data.customer_comp);
                        $("#cus_add").children().text(data.customer_address);
                        $("#cus_phone").children().text(data.customer_phone);
                        $("#bill_content").text(data.bill_content);
                        
                        $("#pro_weight").children().text(data.pro_wei);
                        $("#pro_length").children().text(data.pro_leng);
                        $("#pro_width").children().text(data.pro_wid);
                        $("#pro_height").children().text(data.pro_hei);
                        $("#pro_package").children().text(data.package_numb);

                        if (data.cate1) {
                            $("#pro_cat1").text("V");
                        }
                        if (data.cate2) {
                            $("#pro_cat2").text("V");
                        }


                        if (data.service != null) {
                            $("#service_" + data.service).children().text("V");
                        }

                        if (data.trans != null) {
                            $("#trans_" + data.trans).text("V");
                        }
                        if (data.payment != null) {
                            $("#pays_" + data.payment).children().text("V");
                        }

                        var datadate = data.date;
                        if (data.date != null || data.date != "") {

                            var datetime = data.date.split(" ");
                            var date = datetime[0].split("/");
                            var time = datetime[1].split(":");

                            $("#timedate").children("#timehour").text(time[0]);
                            $("#timedate").children("#timeminu").text(time[1]);
                            $("#timedate").children("#dateday").text(date[0]);
                            $("#timedate").children("#datemonth").text(date[1]);
                            $("#timedate").children("#dateyear").text(date[2].slice(-2));
                        }
                        printDiv()
                        
                        location.reload();


                    }
                });
            }
            var a ="hkjhkj@"
            function printViettelPost(idbill) {
                $.ajax({
                    type: "post",
                    url: HOST_URL + 'Waybill/PrintByID/',
                    data: {
                        "id": idbill
                    },
                    datatype: 'json',
                    success: function (data) {
                        console.log(data)

                        if (data.status == 0) {
                            Swal.fire("Lỗi!", data.message, "error");
                        }
                        var table = ''

                        table = '<table id="datatable" class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" align="left" width="718" style="border-collapse:collapse;border:none;margin-left:6.75pt;\n        margin-right:6.75pt">\n        <tbody><tr style="height:30.45pt">\n            <td width="287" style="text-align: center; width:215.0pt;border:solid windowtext 1.0pt;padding:\n   0cm 5.4pt 0cm 5.4pt;height:30.45pt">\n     <svg id="barcode"></svg>    \n    </td>\n            <td width="241" colspan="3" style="width:180.75pt;border:solid windowtext 1.0pt;\n         border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:30.45pt">\n                <p class="MsoNormal" align="center" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:11.35pt;margin-bottom:.0001pt;text-align:center;\n         line-height:normal"><b><span style="font-size:20.0pt">PHIẾU GỬI</span></b></p>\n            </td>\n            <td width="191" colspan="2" style="width:142.9pt;border:solid windowtext 1.0pt;\n         border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:30.45pt">\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:1.9pt;margin-bottom:.0001pt;text-indent:7.1pt;line-height:normal"><b><span style="font-size:20.0pt">ViettelPost</span></b></p>\n            </td>\n        </tr>\n        <tr style="height:68.05pt">\n            <td width="287" valign="top" style="width:215.0pt;border:solid windowtext 1.0pt;\n         border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:68.05pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:15.3pt;margin-bottom:.0001pt;text-align:justify;text-indent:\n         -15.3pt;line-height:normal"><b><span style="font-size:8.0pt">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></b><b><span style="font-size:8.0pt">Người gửi</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">Họ tên người gửi: Công ty cổ phần thương mại Hà Phan</span></b></p>\n\n                <p class="MsoNormal" style="margin-left: 11.35pt;margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span style="font-size:8.0pt"> Địa chỉ: Số 758/25/2b Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh</span></b></p>\n\n\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">Điện thoại: 028 7109 9599</span></b></p>\n            </td>\n            <td width="432" colspan="5" rowspan="2" valign="top" style="width:323.65pt;\n         border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;\n         border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:68.05pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:14.2pt;margin-bottom:.0001pt;text-indent:-14.2pt;line-height:\n         normal"><b><span style="font-size:8.0pt">3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;\n         </span></span></b><b><span style="font-size:8.0pt">Địa chỉ</span></b></p>\n            </td>\n        </tr>\n        <tr style="height:73.7pt">\n            <td width="287" valign="top" style="width:215.0pt;border:solid windowtext 1.0pt;\n         border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:73.7pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:14.2pt;margin-bottom:.0001pt;text-indent:-14.2pt;line-height:\n         normal"><b><span style="font-size:8.0pt">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;\n         </span></span></b><b><span style="font-size:8.0pt">Người nhận</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">Họ tên người nhận:&nbsp;<span id="cus_name"></span></span></b></p>\n\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">Địa chỉ:&nbsp;<span id="cus_add"></span></span></b></p>\n\n\n                <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;\n         margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">Điện thoại:&nbsp;<span id="cus_phone"></span></span></b></p>\n            </td>\n        </tr>\n        <tr style="height:39.75pt">\n            <td width="287" rowspan="2" valign="top" style="width:215.0pt;border:solid windowtext 1.0pt;\n         border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:39.75pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:17.35pt;margin-bottom:.0001pt;text-indent:-17.35pt;\n         line-height:normal"><b><span style="font-size:8.0pt">4.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></b><b><span style="font-size:8.0pt">Nội dung hàng hóa</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span id="bill_content" style="font-size:8.0pt">&nbsp;</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span id="bill_number" style="font-size:8.0pt">&nbsp;</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span id="bill_number" style="font-size:8.0pt">&nbsp;</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span style="font-size:8.0pt">Số kiện:&nbsp;<span id="pro_package"></span></span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n          normal"><b><span style="font-size:8.0pt">Phân loại:&nbsp;<span id="cat"></span></span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span style="font-size:8.0pt">Trọng lượng:&nbsp;<span id="pro_weight"></span></span></b></p>\n            </td>\n            <td width="200" colspan="2" valign="top" style="width:150.1pt;border-top:none;\n         border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n         padding:0cm 5.4pt 0cm 5.4pt;height:39.75pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:14.15pt;margin-bottom:.0001pt;text-indent:-14.15pt;\n         line-height:normal"><b><span style="font-size:8.0pt">5.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></b><b><span style="font-size:8.0pt">Dịch vụ cộng thêm</span></b></p>\n                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span id="service" style="font-size:8.0pt">&nbsp;</span></b></p>\n            </td>\n            <td width="231" colspan="3" valign="top" style="width:173.55pt;border-top:none;\n         border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n         padding:0cm 5.4pt 0cm 5.4pt;height:39.75pt">\n                <p class="MsoListParagraph" style="margin-top:0cm;margin-right:0cm;margin-bottom:\n         0cm;margin-left:14.15pt;margin-bottom:.0001pt;text-indent:-15.25pt;\n         line-height:normal"><b><span style="font-size:8.0pt">6.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></b><b><span style="font-size:8.0pt">Cước phí</span></b></p>\n                <p class="MsoNormal" style="margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><b><span  style="font-size:8.0pt">Thanh toán cước:&nbsp;<span id="payment"></span></span></b></p>\n            </td>\n        </tr>\n        <tr style="height:82.1pt">\n            <td width="117" style="width:87.5pt;border-top:none;border-left:none;\n         border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n         padding:0cm 5.4pt 0cm 5.4pt;height:82.1pt">\n  <svg style=" height: 70pt; width: 70pt;"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="qrcode"/> </svg>   \n            </td>\n            <td width="145" colspan="3" valign="top" style="width:108.7pt;border-top:none;\n         border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n         padding:0cm 5.4pt 0cm 5.4pt;height:82.1pt">\n                <p class="MsoListParagraphCxSpFirst" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:11.35pt;margin-bottom:.0001pt;text-indent:-10.9pt;\n         line-height:normal"><span style="font-size:8.0pt">7.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;\n         </span></span><b><span style="font-size:8.0pt">Ngày gửi</span></b></p>\n                <p class="MsoListParagraphCxSpMiddle" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><span id="timedate" style="font-size:8.0pt">..</span></p>\n                <p class="MsoListParagraphCxSpMiddle" align="center" style="margin-top:0cm;\n         margin-right:0cm;margin-bottom:0cm;margin-left:8pt;margin-bottom:.0001pt;\n         text-align:center;text-indent:-7.4pt;line-height:normal"><b><span style="font-size:6.0pt">Họ tên chữ ký người gửi</span></b></p>\n                <p class="MsoListParagraphCxSpMiddle" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><span style="font-size:8.0pt">&nbsp;</span></p>\n                <p class="MsoListParagraphCxSpMiddle" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:11.35pt;margin-bottom:.0001pt;line-height:normal"><b><span style="font-size:8.0pt">&nbsp;</span></b></p>\n            </td>\n            <td width="170" valign="top" style="width:127.45pt;border-top:none;border-left:\n         none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n         padding:0cm 5.4pt 0cm 5.4pt;height:82.1pt">\n                <p class="MsoListParagraphCxSpLast" style="margin-top:0cm;margin-right:0cm;\n         margin-bottom:0cm;margin-left:12.85pt;margin-bottom:.0001pt;text-indent:-12.85pt;\n         line-height:normal"><b><span style="font-size:8.0pt">8.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp; </span></span></b><b><span style="font-size:8.0pt">Ngày nhận</span></b></p>\n                <p class="MsoNormal" style="text-align: center;margin-top:0cm;margin-bottom:.0001pt;line-height:\n         normal"><span style="font-size:8.0pt">......h....../......../...../20....</span></p>\n                <p class="MsoNormal" align="center" style="margin-top:0cm;margin-bottom:.0001pt;\n         text-align:center;line-height:normal"><b><span style="font-size:6.0pt">Họ\n         tên chữ ký người nhận</span></b></p>\n            </td>\n        </tr>\n        <tr height="0">\n            <td width="287" style="border:none"></td>\n            <td width="117" style="border:none"></td>\n            <td width="83" style="border:none"></td>\n            <td width="41" style="border:none"></td>\n            <td width="21" style="border:none"></td>\n            <td width="170" style="border:none"></td>\n        </tr>\n    </tbody></table>'



                        $('#billform').empty();
                        $('#billform').append(table);
                        ////ten nguoi nhap
                        JsBarcode("#barcode", idbill, {
                            textAlign: "center",
                            fontSize: 10,
                            width: 2,
                            height: 40,
                        });

                        makeQR(idbill)
                        $("#cus_name").text(data.customer_name +' | '+ data.customer_comp);                     
                        $("#cus_add").text(data.customer_address);
                        $("#cus_phone").text(data.customer_phone);
                        $("#bill_content").text(data.bill_content);
                        $("#bill_number").text(data.contract_numb);
                        $("#pro_weight").text(data.pro_wei+"kg");
                       
                        $("#pro_package").text(data.package_numb);
                        $("#cat").text(data.cate);

                       


                        
                        $("#service").text(data.service);
                        

                     

                        $("#payment").text(data.payment);
                        

                        $("#timedate").text(data.date) ;
                        

                        printDiv()
                        location.reload();


                    }
                });
            }
            function printTasetco() {
                Swal.fire("Thông báo!", "Chức năng này sẽ được cập nhật sau!", "info");
            }

            function makeQR(id) {
                var QR_CODE = new QRCode(document.getElementById("qrcode"), {
                   
                    useSVG: true,

                    correctLevel: QRCode.CorrectLevel.H,
                });
                var qrid = id+'';
                QR_CODE.makeCode(qrid);
                console.log(typeof (qrid))
            }

            

        }
       



    });

}
function AuthRole(DepID, UserID) {
    
   
    $.ajax({
        type: "Get",
        url: HOST_URL + 'Account/DetailAccount/',
        data: {
            "id": UserID
        },
        async: false,
        datatype: 'json',
        success: function (data) {
            var Role = data.RoleName
            if (Role == "Admin") {
                showtable("", "", "", "", "")
            }
            if (Role == "Manager") {
                showtable("", "", "", DepID, "")
            }
            if (Role == "Staff") {
                showtable("", "", "", "", UserID)
            }
            if (Role == "BillManager") {
                showtable("", "", "", "", "")
            }
        }


    });

    
}



