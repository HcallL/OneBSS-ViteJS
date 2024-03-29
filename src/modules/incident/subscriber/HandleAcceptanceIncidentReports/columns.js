const columns = {
    columnsNVXL: [
        { fieldName: "ten_nv", headerText: "Tên nhân viên", textAlign: "left", width: "200px" },
        { fieldName: "so_dt", headerText: "Điện thoại", textAlign: "left", autoFit: "true" },
        { fieldName: "nhiemvu", headerText: "Nhiệm vụ", textAlign: "left", autoFit: "true" },
        { fieldName: "ghichu", headerText: "Ghi chú", textAlign: "left", autoFit: "true" },
    ],
    columnsPBH: [
        { fieldName: "ngay_dkht", headerText: "Theo dõi đến", textAlign: "left", width: "200px", visible: true },
        { fieldName: "ma_tb", headerText: "Số máy/Acc", textAlign: "left", width: "150px" },
        { fieldName: "ma_lt", headerText: "Số ảo", textAlign: "left", autoFit: "true" },
        { fieldName: "loaihinh_tb", headerText: "Loại hình", textAlign: "left", autoFit: "true" },
        { fieldName: "dienthoai_lh", headerText: "Số liên hệ", textAlign: "left", autoFit: "true" },
        { fieldName: "dienthoai_bh", headerText: "Điện thoại báo hỏng", textAlign: "left", autoFit: "true" },
        { fieldName: "nguoi_bh", headerText: "Người báo hỏng", textAlign: "left", autoFit: "true" },
        { fieldName: "ngay_bh", headerText: "Ngày báo hỏng", textAlign: "center", autoFit: "true" },
        { fieldName: "ghichu_hong", headerText: "Ghi chú BH", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_dv", headerText: "ĐV giao", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "nvkt_db", headerText: "Nhân viên KT", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_tb", headerText: "Tên thuê bao", textAlign: "left", autoFit: "true" },
        { fieldName: "diachi_ld", headerText: "Địa chỉ LĐ", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "diachi_dau", headerText: "Địa chỉ LĐ (Điểm đầu)", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "goi_kt", headerText: "Gói KT", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_plkh", headerText: "Phân loại KH", textAlign: "left", autoFit: "true" },
        { fieldName: "diachi_cuoi", headerText: "Địa chỉ LĐ (Điểm cuối)", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "kenh_tn", headerText: "Kênh tiếp nhận", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "chitieu_tg", headerText: "Chỉ tiêu TG", textAlign: "left", autoFit: "true" },
        { fieldName: "tgxl", headerText: "Giờ XL", textAlign: "left", autoFit: "true" },
        { fieldName: "gio_conlai_t", headerText: "Giờ còn lại", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "gio_conlai", headerText: "Giờ còn lại", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "gio_ck", headerText: "Giờ CK", textAlign: "center", autoFit: "true" },
        { fieldName: "mucdo", headerText: "Mức độ", textAlign: "left", autoFit: "true" },
        { fieldName: "ds_nhanvien_th", headerText: "Nhân viên TH", textAlign: "left", autoFit: "true" },
        { fieldName: "donvinhan", headerText: "Đơn vị nhận", textAlign: "left", autoFit: "true" },
        { fieldName: "tinhtrang", headerText: "Tình trạng", textAlign: "left", autoFit: "true" },
        { fieldName: "luot_bh", headerText: "Lượt BH", textAlign: "left", autoFit: "true" },
        { fieldName: "lan_pa", headerText: "KH gọi", textAlign: "left", autoFit: "true" },
        { fieldName: "nguyennhan", headerText: "Nguyên nhân", textAlign: "left", autoFit: "true", visible: true },
        { fieldName: "ngaygiao", headerText: "Ngày giao", textAlign: "left", autoFit: "true" },
        { fieldName: "nd_giao", headerText: "Nội dung giao", textAlign: "left", autoFit: "true" },
        { fieldName: "lan_ks", headerText: "Lần khảo sát", textAlign: "left", autoFit: "true" },
        { fieldName: "ngay_sd", headerText: "Ngày SD", textAlign: "center", autoFit: "true" },
        { fieldName: "ghichu_hong", headerText: "Ghi chú hỏng", textAlign: "left", autoFit: "true" },
        { fieldName: "ghichu_th", headerText: "Ghi chú TH", textAlign: "left", autoFit: "true" },
        { fieldName: "lydoton", headerText: "Lý do tồn", textAlign: "left", autoFit: "true" },
        { fieldName: "ghichuton", headerText: "Ghi chú tồn", textAlign: "left", autoFit: "true" },
        { fieldName: "nhanvienql", headerText: "Nhân viên QL", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_cap", headerText: "Cáp gốc", textAlign: "left", autoFit: "true" },
        { fieldName: "doi_cap", headerText: "Đôi số", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_kc", headerText: "Kết cuối", textAlign: "left", autoFit: "true" },
        { fieldName: "vitri", headerText: "Vị trí", textAlign: "left", autoFit: "true" },
        { fieldName: "tientrinh", headerText: "Tiến trình", textAlign: "left", autoFit: "true" },
        { fieldName: "hensuatu", headerText: "Hẹn sửa từ", textAlign: "left", autoFit: "true" },
        { fieldName: "hensuaden", headerText: "Hẹn sửa đến", textAlign: "left", autoFit: "true" },
        { fieldName: "ten_kv", headerText: "Khu vực", textAlign: "left", autoFit: "true" },
        { fieldName: "nvkd_db", headerText: "Nhân viên kinh doanh", textAlign: "left", autoFit: "true" },
        { fieldName: "nd_tra_con", headerText: "Nội dung trả", textAlign: "left", autoFit: "true" },
        { fieldName: "ngaytra_con", headerText: "Ngày trả", textAlign: "left", autoFit: "true" },
        { fieldName: "chuyenmang", headerText: "NCC khác", textAlign: "left", autoFit: "true" },
        { fieldName: "nhom_kh", headerText: "Nhóm KH", textAlign: "left", autoFit: "true" },
    ]
}

export default columns
