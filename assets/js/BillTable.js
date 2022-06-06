function showtable(idpr, page) {
    var id = idpr
    $.ajax({
        type: "post",
        url: HOST_URL + 'data',
        data: {
            id: id,
            page: page
        },
        datatype: 'json',
        success: function (data) {
            
            console.log(data)

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
            table += '<th scope="col">Số HĐ</th>'
            table += '<th scope="col">Phân loại</th>'
            table += '<th scope="col">Số kiện</th>'
            table += '<th scope="col">Cân nặng</th>'
            table += '<th scope="col"></th>'

            table += '</tr>'

            table += '</thead>'

            table += '<tbody id="datatable">'


            $.each(data.data, function (i, d, p) {
                table += '<tr>'
                table += '<th >' + d.Id + '</th>'
                table += '<th>' + d.Dateship + '</th>'
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
                table += '<th>' + '<span class="label label-inline ' + prov[d.Provider].class + ' font-weight-bold">' + prov[d.Provider].title + '</span >' + '</th>'
                table += '<th>' + d.Billnum + '</th>'
                var cat = d.Category.join(', ')
                table += '<th>' + cat + '</th>'
                table += '<th>' + d.Package + '</th>'
                table += '<th>' + d.Weight + 'kg </th>'
                table += '<td> ';

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
                                    <li class="navi-item">\
                                        <a href="#"  data-id=' + d.Id + ' class="navi-link printBtn">\
                                            <span class="navi-icon"><i class="la la-print"></i></span>\
                                            <span class="navi-text">Print</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" class="navi-link">\
                                            <span class="navi-icon"><i class="la la-copy"></i></span>\
                                            <span class="navi-text">Copy</span>\
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
                       \
                    ';
                table += '</td>';
                table += '</tr>';
            });
            table += '</tr>'

            table += '</tbody>'


            $('#billtable').append(table);
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
            /* var billnote = '<span class="text-muted">Hiển thị ' + pageCurrent * size + ' trên ' + total + ' kết quả</span>'*/
            $('#billnote').append(billnote)
            $("#billpagi a").click(function (event) {

                var page = $(this).data('page');
                var filter = $("#kt_datatable_search_status").val()
                console.log(page)
                console.log(filter)
                if (filter != "") {
                    showtable(filter, page);
                } else {
                    showtable("", page);
                }
            });

            $('.printBtn').click(function (event) {

                var idbill = $(this).data('id')
                console.log(id)
                $.ajax({
                    type: "post",
                    url: HOST_URL + 'PrintByID/',
                    data: {
                        "id": idbill
                    },
                    datatype: 'json',
                    success: function (data) {
                        console.log(data)
                        var table = '<table class="MsoTableGrid" id="billform" cellspacing="0" cellpadding="0" width="688" style="width:18.2cm;border-collapse:collapse;border:none; margin-left:6.75pt;margin-right:6.75pt">\n                        <tbody><tr style="height:0.5cm">\n                            <td width="9cm" colspan="8" style="width:9cm;border:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height: 0.5cm;">\n                                <p class="MsoNormal" style="margin-top:0cm;margin-right:0;margin-bottom:\n              0cm;margin-left:-7.1pt;margin-bottom:.0001pt;text-indent:7.1pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="9.2cm" colspan="2" valign="top" style="width:9.2cm;border:solid windowtext 1.0pt;\n              border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="right" style="margin-top:0cm;margin: right 0;\n              margin-bottom:0cm;margin-left:6.0pt;margin-bottom:.0001pt;text-align:right;\n              text-indent:-6.0pt;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="9cm" colspan="8" valign="top" style="width:9cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="9.2cm" colspan="2" valign="top" style="width:9.2cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="cus_name" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;text-indent:36.75pt;line-height:normal"><span style="font-size:10.0pt">Ms Hoa</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:2.3cm">\n                            <td width="9cm" colspan="8" valign="top" style="width:9cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="9.2cm" colspan="2" valign="top" style="width:9.2cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt">\n                                <p id="cus_inf" class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:right;text-indent:36.75pt;line-height:normal">\n\n                                    <span id="cus_comp" style="font-size:10.0pt">\n\n                                    </span>\n                                    <br>\n                                    <span id="cus_add" style="font-size:10.0pt">\n\n                                    </span>\n                                </p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="9cm" colspan="8" valign="top" style="width:9cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="9.2cm" colspan="2" style="width:9.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="customer_phone" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">123456789</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="106" valign="top" style="width:2.8cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="right" style="margin-top:0cm;margin-right:8.95pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="102" colspan="3" valign="top" style="width:3.7cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_cat1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:13pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="132" colspan="4" valign="top" style="width:99.1pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 6.5pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_cat2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:16pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="151" valign="top" style="width:4.0cm;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:right;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:right;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="106" rowspan="3" style="width:2.8cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="bill_content" class="MsoNormal" align="center" style="margin-top:0cm;margin-right:8.95pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:center;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="102" colspan="3" valign="top" style="width:3.7cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n\n\n                            </td>\n                            <td width="132" colspan="4" valign="top" style="width:99.1pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt"></span></p>\n\n                            </td>\n                            <td width="151" valign="bottom" style="width:4.0cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="102" colspan="3" rowspan="2" valign="top" style="width:3.7cm;border-top:\n              none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_weight" class="MsoNormal" style="margin-top: 5pt;margin-bottom:.0001pt;\n                                              line-height:\n                                              normal;\n                                              text-align: center;">\n                                    <span style="font-size:10.0pt"></span>\n                                </p>\n                            </td>\n                            <td width="132" colspan="4" rowspan="2" valign="top" style="width:99.1pt;border-top:\n              none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n\n                            </td>\n                            <td width="151" valign="top" style="width:4.0cm;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="151" rowspan="4" valign="top" style="width:4.0cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="106" rowspan="3" style="width:2.8cm;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="bill_HD" class="MsoNormal" align="right" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:right;line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="73" colspan="2" rowspan="3" valign="top" style="width:54.95pt;border-top:\n              none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="29" valign="top" style="width:21.6pt;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="44" valign="top" style="width:33.0pt;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="34" valign="top" style="width:25.15pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="55" colspan="2" valign="top" style="width:40.95pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="29" rowspan="2" style="width:21.6pt;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_length" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="44" rowspan="2" style="width:33.0pt;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_height" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="34" rowspan="2" style="width:25.15pt;border-top:none;border-left:none;\n              border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_width" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="55" colspan="2" rowspan="2" style="width:40.95pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pro_package" class="MsoNormal" align="center" style="margin-bottom:0cm;margin-bottom:.0001pt;\n              text-align:center;line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_5" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="trans_6" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:1.85pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.3cm">\n                            <td colspan="6" valign="top" style="width:214.05pt;border:solid windowtext 1.0pt;\n              border-top:none;">\n                            </td>\n                            <td colspan="3" valign="top" style="width:154.35pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              ">\n                            </td>\n                            <td valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n             ">\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="113" colspan="2" valign="top" style="width:85.0pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 0pt 0cm 5.4pt">\n                                <p id="pays_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:0pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="172" colspan="4" style="width:129.05pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;">\n                                <p id="pays_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:10.65pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="206" colspan="3" style="width:154.35pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;">\n                                <p id="timedate" class="MsoNormal" style="margin-bottom: 0cm; margin-bottom: .0001pt; line-height: normal;">\n                                    &nbsp;&nbsp;\n                                    <span id="timehour" style="font-size:10.0pt"></span>\n                                    &nbsp;&nbsp;\n                                    <span id="timeminu" style="font-size:10.0pt"></span>\n                                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    <span id="dateday" style="font-size:10.0pt"></span>\n                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    <span id="datemonth" style="font-size:10.0pt"></span>\n                                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                                    <span id="dateyear" style="font-size:10.0pt"></span>\n                                </p>\n                            </td>\n                            <td width="197" valign="top" style="width:5.2cm;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;">\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="286" colspan="7" valign="top" style="width:214.5pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pays_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.8pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="205" colspan="2" rowspan="3" valign="top" style="width:153.9pt;border-top:\n              none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="197" rowspan="7" valign="top" style="width:5.2cm;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="286" colspan="7" valign="top" style="width:214.5pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="pays_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.8pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="286" colspan="7" valign="top" style="width:214.5pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="113" colspan="2" style="width:85.0pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="cantship_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:2pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="173" colspan="5" style="width:129.5pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="cantship_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:12pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="205" colspan="2" valign="top" style="width:153.9pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="286" colspan="7" valign="top" style="width:214.5pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" align="right" style="margin-top:0cm;margin-right:11.8pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                            <td width="205" colspan="2" valign="top" style="width:153.9pt;border:none;\n              border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="113" colspan="2" style="width:85.0pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="service_1" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:2pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="172" colspan="4" style="width:129.05pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="service_2" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:12pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="206" colspan="3" valign="top" style="width:154.35pt;border:none;\n              border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr style="height:0.5cm">\n                            <td width="113" colspan="2" valign="top" style="width:85.0pt;border:solid windowtext 1.0pt;\n              border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="service_3" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:2pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="172" colspan="4" style="width:129.05pt;border-top:none;border-left:\n              none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p id="service_4" class="MsoNormal" align="right" style="margin-top:0cm;margin-right:12pt;\n              margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:right;\n              line-height:normal"><span style="font-size:10.0pt"></span></p>\n                            </td>\n                            <td width="206" colspan="3" valign="top" style="width:154.35pt;border-top:none;\n              border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\n              padding:0cm 5.4pt 0cm 5.4pt;height:0.5cm">\n                                <p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:\n              normal"><span style="font-size:10.0pt">&nbsp;</span></p>\n                            </td>\n                        </tr>\n                        <tr height="0">\n                            <td width="106" style="border:none"></td>\n                            <td width="8" style="border:none"></td>\n                            <td width="66" style="border:none"></td>\n                            <td width="29" style="border:none"></td>\n                            <td width="44" style="border:none"></td>\n                            <td width="34" style="border:none"></td>\n                            <td width="1" style="border:none"></td>\n                            <td width="54" style="border:none"></td>\n                            <td width="151" style="border:none"></td>\n                            <td width="197" style="border:none"></td>\n                        </tr>\n                    </tbody></table>'
                        $('#billform').empty();
                        $('#billform').append(table);

                        $("#cus_name").children().text(data.customer_name);
                        $("#cus_inf").children('#cus_comp').text(data.customer_comp);
                        $("#cus_inf").children('#cus_add').text(data.customer_address);
                        $("#cus_phone").children().text(data.customer_phone);
                        $("#bill_content").children().text(data.bill_content);
                        $("#bill_HD").children().text(data.contract_numb);
                        $("#pro_weight").children().text(data.pro_wei);
                        $("#pro_length").children().text(data.pro_leng);
                        $("#pro_width").children().text(data.pro_wid);
                        $("#pro_height").children().text(data.pro_hei);
                        $("#pro_package").children().text(data.package_numb);

                        if (data.cate1) {
                            $("#pro_cat1").children().text("V");
                        }
                        if (data.cate2) {
                            $("#pro_cat2").children().text("V");
                        }


                        if (data.trans != null) {
                            $("#service_" + data.trans).children().text("V");
                        }

                        if (data.trans != null) {
                            $("#trans_" + data.trans).children().text("V");
                        }
                        if (data.payment != null) {
                            $("#pays_" + data.payment).children().text("V");
                        }

                        if (data.cantship != null) {
                            $("#cantship_" + data.cantship).children().text("V");
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


                        printDiv();
                        //location.reload(true);
                    }
                });
            });
           


        }




    });

}
