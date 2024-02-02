const collumns = {
    collumnsTreeChude: [
        {
            fieldName: "parentid",
            headerText: "",
            isGroupedColumn: true,
            allowSorting: false,
            allowFiltering: true,
            width: "150",
            textAlign: 'left',
            autoFit: "true",
        },
        {
            fieldName: "name",
            headerText: "Mảng thi/Chủ đề",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
    ],
    collumnsCauhoi: [
        {
            fieldName: "cauhoi_id",
            headerText: "ID",
            allowFiltering: true,
            width: "40",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "mangthi",
            headerText: "Mảng thi",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "chude",
            headerText: "Chủ đề",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "noidung",
            headerText: "Nội dung câu hỏi",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "hienthi",
            headerText: "Hiển thị",
            headerTemplate:"<th class='w60'>Hiển thị</th>",
            cellCreatedEventEnabled:true,
            allowSorting: false,
            allowFiltering: true,
            dataValueType:"checkbox",
            filterTemplate:"<th class='w60'>Hiển thị</th>",
            textAlign:'center',
            width: "40",
            autoFit: "true",
        },
    ],
    collumnsDapan: [
        {
            fieldName: "dapan_id",
            headerText: "Số thứ tự",
            allowFiltering: true,
            width: "30",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "noidung",
            headerText: "Nội dung",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ketqua",
            headerText: "Kết quả",
            allowFiltering: true,
            headerTemplate:"<th class='w60'>Kết quả</th>",
            cellCreatedEventEnabled:true,
            autoFit: "true",
            width: "30",
            textAlign: 'center',
        },
    ],
    collumnsDSChude: [
        {
            fieldName: "chude_id",
            headerText: "ID",
            allowFiltering: true,
            width: "40",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "chude",
            headerText: "Chủ đề",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        }
    ],
    collumnsDSMangthi: [
        {
            fieldName: "mangthi_id",
            headerText: "ID",
            allowFiltering: true,
            width: "30",
            autoFit: "true",
            textAlign: 'center',
        },
        {
            fieldName: "mangthi",
            headerText: "Mảng thi",
            allowFiltering: true,
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        }
    ],
}

export default collumns