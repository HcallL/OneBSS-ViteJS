export default {
  header: {
    title: "Đơn giá thù lao phát giấy báo cước",
    list: [{
        name: "Lập hợp đồng",
        link: {
          name: "Ui.cards"
        }
      },
      {
        name: "Lắp đặt mới",
        link: {
          name: "Ui.buttons"
        },
      },
    ],
  },
  txtDonGia_PBC: null,
  txtDonGia: null,
  pageSize: 10,
  pageIndex: 0,
  totalRecords: 0,
  kyhoadon_left: 0,
  DONGIA_PBC_ID: null,
  options: {
    danh_sach_thu_lao: []
  },
  button: {
    nhapmoi:false,
    ghilai:false,
    xoa:false,
    huybo: false
  },
  selectionOptions: { type: 'Multiple' },
  left: {
    kyhoadon: [],
    loainhanvien: [],
    khuvuc: []
  },
  right: {
    kyhoadon: [],
    loainhanvien: [],
    khuvuc: []
  },
  collumns: {
    danh_sach_thu_lao: [
      {
        fieldName: "stt",
        headerText: "STT",
        allowSorting: true,
        width: "70"
      },
      {
        fieldName: "dongia_pbc",
        headerText: "Nội dung",
        allowSorting: true,
        autoFit: "true",
      },
      {
        fieldName: "dongia",
        headerText: "Đơn giá",
        allowSorting: true,
        autoFit: "true",
        width: "70"
      }
    ]
  }
}
