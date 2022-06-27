

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
            $('#loading').show();
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
            table += '<th scope="col">Người nhận</th>'
            table += '<th scope="col">Công ty nhận</th>'
            table += '<th scope="col">Địa chỉ</th>'
            table += '<th scope="col">Nội dung</th>'
            table += '<th scope="col">Loại hình gửi</th>'
            table += '<th scope="col">Đơn vị vận chuyển</th>'
          
            table += '<th scope="col">Phân loại</th>'
            table += '<th scope="col">Số kiện</th>'
            table += '<th scope="col">Cân nặng</th>'
            table += '<th scope="col">Trạng thái</th>'
            table += '<th scope="col"></th>'

            table += '</tr>'

            table += '</thead>'

            table += '<tbody id="datatable">'
            
           
            
            $.each(data.data, function (i, d, p) {
                table += '<tr>'

                table += '<th id="' + d.Id +'">'+ d.Id+'</th>'
                    table += '<th>' + formatDate(d.Dateship.substr(6)) + '</th>'
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
                table += '<th>' + d.Weight + 'kg </th>'
                var stt = {
                    1: {
                        'title': 'Chờ gửi',
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': 'Đã gửi',
                        'class': ' label-light-success'
                    }


                };
                table += '<th>' + '<span style="width: 60px;" class="label label-inline ' + stt[d.StatusID].class + ' font-weight-bold">' + stt[d.StatusID].title + '</span >' + '</th>'

                table += '<td> ';
                var currentUser = $("#UserID").val()
                if (currentUser == d.UserID) {
                    table += '\
                        <div class="dropdown dropdown-inline">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Chọn hành động:\
                                    </li>\
                                    <li class="navi-item changeID">\
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link printBtn">\
                                            <span class="navi-icon"><i class="la la-print"></i></span>\
                                            <span class="navi-text">Print</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="javascript:;"  data-id=' + d.Id + ' class="navi-link btnChangeID">\
                                            <span class="navi-icon"><i class="la la-pen"></i></span>\
                                            <span class="navi-text">Sửa mã đơn</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-excel-o"></i></span>\
                                            <span class="navi-text">Excel</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-text-o"></i></span>\
                                            <span class="navi-text">CSV</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-pdf-o"></i></span>\
                                            <span class="navi-text">PDF</span>\
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
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/>\
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
                                        <a href="#"  data-id=' + d.Id + ' data-proid=' + d.ProviderID + ' class="navi-link printBtn">\
                                            <span class="navi-icon"><i class="la la-print"></i></span>\
                                            <span class="navi-text">Print</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-excel-o"></i></span>\
                                            <span class="navi-text">Excel</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-text-o"></i></span>\
                                            <span class="navi-text">CSV</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-file-pdf-o"></i></span>\
                                            <span class="navi-text">PDF</span>\
                                        </a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                       </tr>\
                       \
                    ';}
                    
               
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
                var numSize = data.numSize;
                var billpagi = ""
                if (pageCurrent > 1) {
                    var pagePrevious = pageCurrent - 1;
                    billpagi += '<a href = "#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious + ' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
                }

                for (i = 1; i <= numSize; i++) {
                    if (i == pageCurrent) {
                        billpagi += '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                    } else {
                        billpagi += '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1" data-page= ' + i + '>' + i + '</a>'
                    }
                }

                if (pageCurrent > 0 && pageCurrent < numSize) {
                    var nextPage = pageCurrent + 1;
                    billpagi += '<a href = "#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + nextPage + ' ><i class="ki ki-bold-arrow-next icon-xs"></i></a>'
                }

                $('#billpagi').append(billpagi);

                $('#billnote').empty();
                var billnote = '<span class="text-muted">Hiển thị ' + data.from + '-' + data.to + ' trên ' + total + ' kết quả</span>'
                $('#billnote').append(billnote)
            }
           
            ///Funtion chức năng
            
            

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
                var proid = $(this).data('proid')
                switch (proid) {
                    case 1: printNetPost(idbill)
                        
                        break;
                    case 2: printViettelPost(idbill)
                        
                    default:
                        break;
                }
                

              
            });

            function savebill(id) {
                
                var check = true
                var value = $('input[name=' + id + ']').val()
                var span = $('#vali_' + id + '')
                span.text('')
                if (value.length < 8 || value.length > 10) {
                    span.text('Mã phải có độ dài từ 8 - 10 ký tự!')
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
                        reverseButtons: true
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
                                        Swal.fire(
                                            "Thay đổi thành công!",
                                            data.message,
                                            "success"
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
                var th = $("th#" + idbill + "")
                
                th.empty()
                var editable = '<div id="' + idbill + '"> <div style = "display:flex;justify-content:left" > <input  class="txtbillid" required oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type = "number" maxlength = "10" name= "' + idbill + '" style="margin-right:10px;width: 90px" value="' + idbill + '" ><a class="btnsavebillid"  href="javascript:;"> <i class="fas fa-save text-success icon-md"></i></a></div></div> <span style="font-size: 11px;" id="vali_' + idbill + '" class="text-danger"></span>'
                th.append(editable)
                th.attr('data-check', 'true');
                $('.btnsavebillid').click(function () {
                    id = $(this).parent().parent().attr('id')
                        savebill(id)
                })
               
            });

         

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
function AuthRole(RoleID, UserID, DepID) {

    if (RoleID == 1) {
        showtable("", "", "", "", "")
    }
    if (RoleID == 2) {
        showtable("", "", "", DepID, "")
    }
    if (RoleID == 3) {
        showtable("", "", "", "", UserID)
    }
}



