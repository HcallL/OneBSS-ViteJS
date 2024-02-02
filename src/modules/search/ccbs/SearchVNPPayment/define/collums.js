const collumns = {
    collumnsVNP: [
        {
            fieldName: "row_stt",
            headerText: "STT",
            allowFiltering: true,
            width: "100",
            textAlign: 'center',
            autoFit: "true",
        },
        {
            fieldName: "ma_kh",
            headerText: "Mã TT Neo",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "somay",
            headerText: "Số máy",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "tientra",
            headerText: "Tiền trả",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass: "tragoc-color",
        },
        {
            fieldName: "thangtra",
            headerText: "Tháng trả",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'thangtra-color'
        },
        {
            fieldName: "chukyno",
            headerText: "Chu kỳ nợ",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'chukyno-color'
        },
        {
            fieldName: "chietkhau",
            headerText: "Chiết khấu",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "seri",
            headerText: "Seri",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "soseri",
            headerText: "Số seri",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_tt",
            headerText: "Ngày TT",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "chungtu",
            headerText: "Chứng từ",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_thuc",
            headerText: "Ngày thực",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "hinhthuc",
            headerText: "Hình thức TT",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "phieu_id",
            headerText: "Phiếu ID Neo",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            freeze:"right"
        },
        {
            fieldName: "chitiet",
            headerText: "Chi tiết",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
            freeze:"right"
        },
    ],
    collumnsVNP_CTTB: [
        {
            fieldName: "ma_tb",
            headerText: "Số máy",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "tientra",
            headerText: "Tiền trả",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'tientra-color'
        },
        {
            fieldName: "tragoc",
            headerText: "Trả gốc",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'tragoc-color'
        },
        {
            fieldName: "trathue",
            headerText: "Trả thuế",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'trathue-color'
        },
        {
            fieldName: "chihoahong",
            headerText: "Chi hoa hồng",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "chukyno",
            headerText: "Chu kỳ nợ",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "tenkhoanmuc",
            headerText: "Khoản mục",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "",
            allowSorting: false,
            allowFiltering: false,
            headerTextAlign:'right',
            headerTemplate:'<div style="text-align:right"><button class="btn pad4 w-auto lh14 h-auto" > <span class="-ap icon-filter2"></span> </button></div>',
            width: "100",
            autoFit: "true",
        },
    ],
    collumnsVNP_CTTN: [
        {
            fieldName: "chukyno",
            headerText: "Chu kỳ nợ",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "tongtra",
            headerText: "Tiền trả",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'tientra-color'
        },
        {
            fieldName: "tientra",
            headerText: "Trả gốc",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'tragoc-color'
        },
        {
            fieldName: "trathue",
            headerText: "Trả thuế",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
            cssClass:'trathue-color'
        },
        {
            fieldName: "chihoahong",
            headerText: "Chi hoa hồng",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
    ],
}

export default collumns
