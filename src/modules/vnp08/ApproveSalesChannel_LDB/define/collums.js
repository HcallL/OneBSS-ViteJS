const collumns = {
    collumnsDSBLMOI: [
        {
            fieldName: "ten_loaibl",
            headerText: "Loại: ",
            allowFiltering: true,
            isGroupedColumn: true,
            showColumnCheckbox:true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "so_bl",
            headerText: "Số biên lai",
            allowSorting: false,
            allowFiltering: true,
            width: "150",
            textAlign: 'right',
            autoFit: "true",
        },
        {
            fieldName: "luotgiaobl_id",
            headerText: "Lượt giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ten_kho_giao",
            headerText: "Kho giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "150",
            autoFit: "true",
        },
        {
            fieldName: "ngay_giao",
            headerText: "Ngày giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_giao",
            headerText: "Người giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nd_giao",
            headerText: "Nội dung",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_ten",
            headerText: "Trạng thái",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_id",
            headerText: "",
            visible: false,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "bienlai_id",
            headerText: "",
            visible: false,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
    ],
    collumnsDSBL_DAGIAOKHO: [
        {
            fieldName: "so_bl",
            headerText: "Số biên lai",
            allowFiltering: true,
            cellRenderer: "agGroupCellRenderer",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "luotgiaobl_id",
            headerText: "Lượt giao",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "ten_kho_giao",
            headerText: "Kho giao",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_giao",
            headerText: "Ngày giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_giao",
            headerText: "Người giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nd_giao",
            headerText: "Nội dung",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ten_kho_nhan",
            headerText: "Kho nhận",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_nhan",
            headerText: "Ngày nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_nhan",
            headerText: "Người nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nd_giao",
            headerText: "Trạng thái trả",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ttph_nhan_ten",
            headerText: "Trạng thái nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_id",
            headerText: "Trạng thái BL_ID",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_ten",
            headerText: "Trạng thái biên lai",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
    ],
    collumnsDSBL_TRONGKHO: [
        {
            fieldName: "ten_loaibl",
            headerText: "Loại: ",
            allowFiltering: true,
            isGroupedColumn: true,
            showColumnCheckbox:true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "so_bl",
            headerText: "Số biên lai",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "luotgiaobl_id",
            headerText: "Lượt giao",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "ten_kho_giao",
            headerText: "Kho giao",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_giao",
            headerText: "Ngày giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_giao",
            headerText: "Người giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ten_kho_nhan",
            headerText: "Kho nhận",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ngay_nhan",
            headerText: "Ngày nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nguoi_nhan",
            headerText: "Người nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ttph_nhan_ten",
            headerText: "Trạng thái nhận",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
        {
            fieldName: "ttbl_ten",
            headerText: "Trạng thái biên lai",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "120",
            autoFit: "true",
        },
    ],
    collumnsDSBienlai: [
        {
            fieldName: "ten_loaibl",
            headerText: "Loại: ",
            allowFiltering: true,
            isGroupedColumn: true,
            showColumnCheckbox:true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "luotgiaobl_id",
            headerText: "Lượt giao biên lai",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "loai_luot",
            headerText: "Loại lượt",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "tu_so",
            headerText: "Từ số",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'right',
        },
        {
            fieldName: "den_so",
            headerText: "Đến số",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'right',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ten_kho_giao",
            headerText: "Tên kho giao",
            allowSorting: false,
            allowFiltering: true,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "nhanvien_giao",
            headerText: "Nhân viên giao",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        }
    ]
}

export default collumns
