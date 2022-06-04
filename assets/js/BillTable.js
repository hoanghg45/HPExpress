
function showtable(idpr,page) {
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


            $.each(data.data, function (i, d ,p) {
                table += '<tr>'
                table += '<th>' + d.Id + '</th>'
                table += '<th>' + d.Dateship + '</th>'
                var cus_inf = d.Cusinf.split('|')
                table += '<th>' + cus_inf[0] + '</th>'
                table += '<th>' + cus_inf[1] + '</th>'
                table += '<th>' + cus_inf[2] + '</th>'
                table += '<th>' + d.Content + '</th>'
                table += '<th>' + d.Trans + '</th>'
                var prov =
                {
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
                                        <a href="#" class="navi-link">\
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
                billpagi += '<a href = "#" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1" data-page=' + pagePrevious +' > <i class="ki ki-bold-arrow-back icon-xs"></i></a > '
            }

            for (i = 1; i <= numSize; i++) {
                if (i == pageCurrent) {
                    billpagi += '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1" data-page= ' + i + '>' + pageCurrent + '</a>'
                }
                else {
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
            
        }
    })
}
