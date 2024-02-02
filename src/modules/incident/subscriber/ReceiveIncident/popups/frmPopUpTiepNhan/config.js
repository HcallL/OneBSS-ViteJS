export default {
  gridTienTrinhCols: [
    {
      fieldName: "nguoi_cn",
      headerText: "Người CN",
      allowFiltering: true,
      allowSorting: false,
      freeze: 'left',
      width: 100
    },
    {
      fieldName: "ngay_cn",
      headerText: "Ngày CN",
      allowFiltering: true,
      allowSorting: false,
      textAlign: 'right',
      width: 120,
      format: 'dd/MM/yyyy HH:mm:ss',
      type: 'date',
      freeze: 'left',
    },
    {
      fieldName: "donvi_cn",
      headerText: "Đơn vị",
      allowFiltering: true,
      allowSorting: false,
      width: 120,
    },
    {
      fieldName: "noidung",
      headerText: "Nội dung",
      allowFiltering: true,
      allowSorting: false,
      width: 120,
    },
    { fieldName: "sms_command", headerText: "SMS", allowHtml: true, textAlign: 'center', width: 70 },
    { fieldName: "sua_command", headerText: "Sửa", allowHtml: true, textAlign: 'center', width: 70 },
    { fieldName: "xoa_command", headerText: "Xóa", allowHtml: true, textAlign: 'center', width: 70 },
  ],

  gridDanhSachCols: [
    {
      fieldName: "ma_tb",
      headerText: "Số máy/ACC",
      allowFiltering: true,
      allowSorting: false,
      freeze: 'left',
      width: 100,
    },
    {
      fieldName: "ma_lt",
      headerText: "Số ảo",
      allowFiltering: true,
      allowSorting: false,
      freeze: 'left',
      width: 100,
    },
    {
      fieldName: "tram_vt",
      headerText: "Tổ thi công",
      allowFiltering: true,
      allowSorting: false,
      freeze: 'left',
      width: 150,
    },
    {
      fieldName: "ngay_yc",
      headerText: "Ngày BH",
      allowFiltering: true,
      allowSorting: false,
      textAlign: 'right'
    },
    {
      fieldName: "ngaygiao_td",
      headerText: "Ngày giao TĐ",
      allowFiltering: true,
      allowSorting: false,
      format: 'dd/MM/yyyy HH:mm:ss',
      type: 'date',
      textAlign: 'right'
    },
    {
      fieldName: "thoigian_ck",
      headerText: "Thời gian CK",
      allowFiltering: true,
      allowSorting: false,
      textAlign: 'right'
    },
    {
      fieldName: "gio_conlai",
      headerText: "Giờ còn lại",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ten_tb",
      headerText: "Tên thuê bao",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "diachi_ld",
      headerText: "Địa chỉ lắp đặt",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "loahinh_tb",
      headerText: "Loại hình",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "goi_kt",
      headerText: "Gói KT",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "mucdo",
      headerText: "Mức độ",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "chitieu_tg",
      headerText: "Chỉ tiêu TG",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "nguoi_dh",
      headerText: "Người ĐH",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "thongtin_dh",
      headerText: "Thông tin ĐH",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ten_kv",
      headerText: "Khu vực",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "nhanvien_tc",
      headerText: "Nhân viên TC",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "so_dt",
      headerText: "Điện thoại KH",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "luot_bh",
      headerText: "Lượt BH",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "lan_pa",
      headerText: "KH gọi",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "lan_ks",
      headerText: "Lần KS",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "trangthai_hd",
      headerText: "Trạng thái HĐ",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "trangthai_tb",
      headerText: "Trạng thái TB",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ngay_ht",
      headerText: "Ngày HT",
      allowFiltering: true,
      allowSorting: false,
      textAlign: 'right'
    },
    {
      fieldName: "ten_dt",
      headerText: "Đối tượng",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "nhanvien_tn",
      headerText: "NV tiếp nhận",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "donvi_tn",
      headerText: "ĐV tiếp nhận",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ghichu_tb",
      headerText: "Ghi chú TB",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "tinhtrang",
      headerText: "Trạng thái",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "lydoton",
      headerText: "Lý do tồn",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ghichu_ton",
      headerText: "Ghi chú tồn",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ngay_bt",
      headerText: "Ngày báo tồn",
      allowFiltering: true,
      allowSorting: false,
      type: 'date',
      format: 'dd/MM/yyyy HH:mm:ss',
      textAlign: 'right'
    },
    {
      fieldName: "nguoi_cn",
      headerText: "Người CN",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ngay_cn",
      headerText: "Ngày CN",
      allowFiltering: true,
      allowSorting: false,
      textAlign: 'right'
    },
    {
      fieldName: "ten_kieuld",
      headerText: "Kiểu YC",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "tt_port",
      headerText: "TT Port",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ten_cap",
      headerText: "Cáp gốc",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "doi_cap",
      headerText: "Đôi số",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "ten_kc",
      headerText: "Kết cuối",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "Vị trí",
      headerText: "vitri",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "giohen_tu",
      headerText: "Giờ hẹn đầu",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "giohen_den",
      headerText: "Giờ hẹn cuối",
      allowFiltering: true,
      allowSorting: false,
    },
    {
      fieldName: "nhanvien_hen",
      headerText: "Người hẹn",
      allowFiltering: true,
      allowSorting: false,
    },
  ],
}
