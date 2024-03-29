const collumns = {
    collumnsDSBL: [
        {
            fieldName: "stt",
            headerText: "STT",
            width: "80",
            textAlign: 'center',
            autoFit: "true",
        },
        {
            fieldName: "so_bl",
            headerText: "Số biên lai",
            allowSorting: false,
            allowFiltering: true,
            width: "150",
            textAlign: 'center',
            autoFit: "true",
        },
        {
            fieldName: "ten_kho",
            headerText: "Kho biên lai",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ten_loaibl",
            headerText: "Tên loại biên lai",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "150",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_ten",
            headerText: "Trạng thái",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ma_luottao",
            headerText: "Lượt tạo",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ngay_tao",
            headerText: "Ngày tạo",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_tao",
            headerText: "Người tạo",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_id",
            headerText: "",
            visible: false,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "kho_id",
            headerText: "",
            visible: false,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "quyen",
            headerText: "Quyển",
            visible: false,
            textAlign: 'center',
            width: "100",
            autoFit: "true",
        },     
    ],
    collumnsDSLTBL: [
        {
            fieldName: "group_luot",
            headerText: "Nhóm lượt tạo",
            allowFiltering: true,
            isGroupedColumn: true,
            showColumnCheckbox: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "ma_luottao",
            headerText: "Mã lượt tạo",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "tu_so",
            headerText: "Từ số",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "den_so",
            headerText: "Đến số",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "tong_so",
            headerText: "Tổng số",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "ten_loaibl",
            headerText: "Tên loại biên lai",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "kyhieu",
            headerText: "Ký hiệu",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "loaibienlai_id",
            headerText: "",
            allowFiltering: true,
            visible: false,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "luottao_id",
            headerText: "",
            allowFiltering: true,
            visible: false,
            width: "100",
            autoFit: "true",
            textAlign: 'center',
        },
    ]
}

export default collumns
