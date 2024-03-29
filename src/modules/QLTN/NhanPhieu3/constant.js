const GRID_COLUMS = {
  1: [
    {fieldName: 'MA_TT', headerText: 'Mã thanh toán', allowFiltering: true, allowSorting:false, width: 140},
    	{ fieldName: 'MATB_DD', headerText: 'Mã thuê bao', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'NGAY_DK', headerText: 'Ngày đăng ký', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'THANG_BD', headerText: 'Tháng bắt đầu', allowFiltering: true, allowSorting: false, width: 150 },
		{ fieldName: 'THANG_KT', headerText: 'Tháng kết thúc', allowFiltering: true, allowSorting: false, width: 150 },

		{ fieldName: 'NGAY_BDDC', headerText: 'Ngày bắt đầu', allowFiltering: true, allowSorting: false, width: 150 },
		{ fieldName: 'NGAY_KTDC', headerText: 'Ngày kết thúc', allowFiltering: true, allowSorting: false, width: 150 },

		{ fieldName: 'CUOC_DC', headerText: 'Tiền đặt cọc', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'TIEN_THOAI', headerText: 'Thoái đặt cọc', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'CUOC_TD', headerText: 'Tiền trừ dần', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'CUOC_PS', headerText: 'Cước phát sinh', allowFiltering: true, allowSorting: false, width: 120 },
		{ fieldName: 'TEN_KM', headerText: 'khuyến mãi', allowFiltering: true, allowSorting: false, width: 250 },
	
    {fieldName: 'TEN_TT', headerText: 'Tên thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'SL', headerText: 'SL kết quả', allowFiltering: true, allowSorting:false, width: 120},
    //{fieldName: 'SODT_LH', headerText: 'ĐT LH', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 140},
    {fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
    {fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false, width: 100},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, width: 250, cssClass: 'grid-green'},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'DIACHI_TT', headerText: 'Địa chỉ thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_TUYEN', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
		{fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false},
    {fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'THU_CPS', headerText: 'Thu CPS', allowFiltering: true, allowSorting:false, width: 120},
  ],
  2: [
    {fieldName: 'MA_TT', headerText: 'Mã thanh toán', allowFiltering: true, allowSorting:false, width: 140},
    {fieldName: 'MA_TT_NEO', headerText: 'Mã TT Neo', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'TEN_TT', headerText: 'Tên thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'SL', headerText: 'SL kết quả', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 140},
    {fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false, width: 100},
    {fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
    {fieldName: 'ND_THUCHIEN', headerText: 'NVQLTC xử lý', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
    {fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
    {fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
    {fieldName: 'DIACHI_TT', headerText: 'Địa chỉ TT', allowFiltering: true, allowSorting:false},
    {fieldName: 'TUYENTHU_ID', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
    {fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false},
    {fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false},
    {fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false, width: 130},
  ],
	3: [
		{fieldName: 'MA_TT', headerText: 'Mã TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_TUYEN', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false, width: 100},
		{fieldName: 'TEN_TT', headerText: 'Tên TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'DIACHI_TT', headerText: 'Địa chỉ TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false, width: 100},
		{fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false, width: 100},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false, width: 100},
		{fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'ND_THUCHIEN', headerText: 'NVQLTC xử lý', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'THUNO', headerText: 'Thu nợ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false, width: 130},
		{fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false, width: 120},
	],
	4: [
		{fieldName: 'MA_TT', headerText: 'Mã TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_TUYEN', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_TT', headerText: 'Tên TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'DIACHI_TT', headerText: 'Địa chỉ TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false},
		{fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false},
		{fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'ND_THUCHIEN', headerText: 'NVQLTC xử lý', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false},
		{fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUNO', headerText: 'Thu nợ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false},
	],
	5: [
		{fieldName: 'MA_TT', headerText: 'Mã TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_TUYEN', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number'},
		{fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_TT', headerText: 'Tên TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'DIACHI_TT', headerText: 'Địa chỉ TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false},
		{fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false},
		{fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'ND_THUCHIEN', headerText: 'NVQLTC xử lý', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUNO', headerText: 'Thu nợ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false},
	],
	6:[
		{fieldName: 'STT', headerText: 'STT', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAY_TT', headerText: 'Ngày trả', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_TT', headerText: 'Số phiếu', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIENTRA', headerText: 'Tiền trả', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false},
		{fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_TT', headerText: 'Tên TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'LANTRA', headerText: 'Lần trả', allowFiltering: true, allowSorting:false},
		{fieldName: 'DIACHI_TT', headerText: 'Địa chỉ TT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SOHOADON', headerText: 'Số hóa đơn', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGUOIGACH', headerText: 'Người gạch', allowFiltering: true, allowSorting:false},
		{fieldName: 'CHUNGTU', headerText: 'Số chứng từ', allowFiltering: true, allowSorting:false},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_TN', headerText: 'Thu ngân', allowFiltering: true, allowSorting:false},
		{fieldName: 'DTCC', headerText: 'ĐTCC', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAY_CN', headerText: 'Ngày cập nhật', allowFiltering: true, allowSorting:false},
		{fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false},
	],
	7:[
		{fieldName: 'DONVI_CPS', headerText: 'Giao CPS', allowFiltering: true, allowSorting:false},
		{fieldName: 'NHANVIEN_CPS', headerText: 'NV thực hiện CPS', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_TT', headerText: 'Mã TT', allowFiltering: true, allowSorting:false},
    {fieldName: 'TT_CHUYEN', headerText: 'Chuyển TT', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_TT_NEO', headerText: 'Mã TT Neo', allowFiltering: true, allowSorting:false},
    {fieldName: 'MATB_DD', headerText: 'Mã đại diện', allowFiltering: true, allowSorting:false},
    {fieldName: 'DIEMTINNHIEM', headerText: 'Điểm TN', allowFiltering: true, allowSorting:false},
    {fieldName: 'TEN_TT', headerText: 'Tên thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'SL', headerText: 'SL kết quả', allowFiltering: true, allowSorting:false},
    {fieldName: 'SODT_LH', headerText: 'ĐT LH', allowFiltering: true, allowSorting:false},
    {fieldName: 'SDTTT', headerText: 'SĐT Thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'NO_PS', headerText: 'Nợ PS', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_2', headerText: 'Nợ n-2', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_3', headerText: 'Nợ n-3', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_4', headerText: 'Nợ n-4', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_DK', headerText: 'Nợ ĐK', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'NVQLĐB_OB', headerText: 'NVQLĐB_OB', allowFiltering: true, allowSorting:false, allowHtml:true},
		{fieldName: 'SMS', headerText: 'SMS', allowFiltering: true, allowSorting:false},
		{fieldName: 'POPUP', headerText: 'Popup', allowFiltering: true, allowSorting:false},
		{fieldName: 'OUTBOUND', headerText: 'Outbound', allowFiltering: true, allowSorting:false},
		{fieldName: 'KQ_TTVT1', headerText: 'KQ nhắc TTVT 1', allowFiltering: true, allowSorting:false},
    {fieldName: 'KQ_TTVT2', headerText: 'KQ nhắc TTVT 2', allowFiltering: true, allowSorting:false},
    {fieldName: 'KH_YC_GIAHAN', headerText: 'KH yc gia hạn', allowFiltering: true, allowSorting:false},
		{fieldName: 'KQ_TTKD', headerText: 'KQ nhắc GDV', allowFiltering: true, allowSorting:false},
    {fieldName: 'KQ_800126', headerText: 'KQ nhắc 800126', allowFiltering: true, allowSorting:false},
    {fieldName: 'SOLAN_NN', headerText: 'Số lần NN', allowFiltering: true, allowSorting:false},
    {fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_2', headerText: 'HTTT n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'THANHTOAN_2', headerText: 'Thanh toán n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_3', headerText: 'HTTT n-3', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_3', headerText: 'Thanh toán n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_4', headerText: 'HTTT n-4', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_4', headerText: 'Thanh toán n-4', allowFiltering: true, allowSorting:false},
		{fieldName: 'TRANGTHAI_TB', headerText: 'Trạng thái TB', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_TB_CHEM', headerText: 'Mã TB chêm', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAY_CM', headerText: 'Ngày chêm/mở', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAY_GIAHAN_1', headerText: 'Ngày KH gia hạn 1', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAY_GIAHAN_2', headerText: 'Ngày KH gia hạn 2', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAY_THUHOI', headerText: 'Ngày thu hồi TBĐC', allowFiltering: true, allowSorting:false},
    {fieldName: 'TEN_TBI', headerText: 'Tên TBị', allowFiltering: true, allowSorting:false},
    {fieldName: 'USER_THUHOI', headerText: 'User thu hồi', allowFiltering: true, allowSorting:false},
    {fieldName: 'TEN_NVVT_THUHOI', headerText: 'Tên NVVT thu hồi', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_KHL', headerText: 'Mã KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_DVVT', headerText: 'Dịch vụ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MST', headerText: 'MST', allowFiltering: true, allowSorting:false},
    {fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false},
    {fieldName: 'DIACHI_GBC', headerText: 'Địa chỉ GBC', allowFiltering: true, allowSorting:false},
	],
  8:[
		{fieldName: 'MA_TT', headerText: 'Mã thanh toán', allowFiltering: true, allowSorting:false, width: 140},
    {fieldName: 'MA_TT_NEO', headerText: 'Mã TT Neo', allowFiltering: true, allowSorting:false, width: 120},
		{fieldName: 'MATB_DD', headerText: 'Mã TBĐD', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'TEN_TT', headerText: 'Tên thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'SL', headerText: 'SL kết quả', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'SODT_LH', headerText: 'ĐT LH', allowFiltering: true, allowSorting:false, width: 120},
    {fieldName: 'SO_SERI', headerText: 'Số Seri', allowFiltering: true, allowSorting:false},
    {fieldName: 'TIEN', headerText: 'Tiền nợ', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'TIEN_HD', headerText: 'Tiền hóa đơn', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
    {fieldName: 'NO_PS', headerText: 'Nợ PS', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_2', headerText: 'Nợ n-2', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_3', headerText: 'Nợ n-3', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_PS_4', headerText: 'Nợ n-4', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'NO_DK', headerText: 'Nợ ĐK', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'TIENNO_QL', headerText: 'Tiền nợ QL', allowFiltering: true, allowSorting:false, format: 'N0', type: 'number', width: 120},
		{fieldName: 'SO_THUNG', headerText: 'Số thùng', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT', headerText: 'HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_2', headerText: 'HTTT n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'THANHTOAN_2', headerText: 'Thanh toán n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_3', headerText: 'HTTT n-3', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_3', headerText: 'Thanh toán n-2', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_4', headerText: 'HTTT n-4', allowFiltering: true, allowSorting:false},
		{fieldName: 'HINHTHUC_TT_4', headerText: 'Thanh toán n-4', allowFiltering: true, allowSorting:false},
		{fieldName: 'TRANGTHAI_TB', headerText: 'Trạng thái TB', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAY_CM', headerText: 'Ngày chêm/mở', allowFiltering: true, allowSorting:false},
		{fieldName: 'MA_KHL', headerText: 'Mã KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_DVVT', headerText: 'Dịch vụ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MST', headerText: 'MST', allowFiltering: true, allowSorting:false},
		{fieldName: 'DONVI_BHKV', headerText: 'Phòng BHKV', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_DLTC', headerText: 'Tên ĐLTC', allowFiltering: true, allowSorting:false},
		{fieldName: 'SDT_DLTC', headerText: 'Số ĐT ĐLTC', allowFiltering: true, allowSorting:false},
		{fieldName: 'TO_KD', headerText: 'Tổ KD', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_QLDB', headerText: 'Tên QLĐB', allowFiltering: true, allowSorting:false},
		{fieldName: 'SDT_QLDB', headerText: 'SĐT QLĐB', allowFiltering: true, allowSorting:false},
		{fieldName: 'TO_KT', headerText: 'Đơn vị VT', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_NVVT', headerText: 'Tên NVVT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SDT_CNVT', headerText: 'SĐT CNVT', allowFiltering: true, allowSorting:false},
		{fieldName: 'SERI', headerText: 'Seri', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUTU_IN', headerText: 'Thứ tự in', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYHEN', headerText: 'Ngày hẹn', allowFiltering: true, allowSorting:false},
		{fieldName: 'NGAYNHAN_HD', headerText: 'Ngày nhận', allowFiltering: true, allowSorting:false},
		{fieldName: 'LYDOTRA_ID', headerText: 'Lý do', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU', headerText: 'Ghi chú', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'GHICHU_GDV', headerText: 'Ghi chú GDV', allowFiltering: true, allowSorting:false},
		{fieldName: 'ND_THUCHIEN', headerText: 'NVQLTC xử lý', allowFiltering: true, allowSorting:false, allowHtml:true, cssClass: 'grid-green'},
		{fieldName: 'SMS', headerText: 'SMS', allowFiltering: true, allowSorting:false},
		{fieldName: 'POPUP', headerText: 'Popup', allowFiltering: true, allowSorting:false},
		{fieldName: 'OUTBOUND', headerText: 'Outbound', allowFiltering: true, allowSorting:false},
		{fieldName: 'SOLAN_NN', headerText: 'Số lần NN', allowFiltering: true, allowSorting:false},
		{fieldName: 'KQ_TTVT', headerText: 'KQ nhắc TTVT', allowFiltering: true, allowSorting:false},
		{fieldName: 'KQ_TTKD', headerText: 'KQ nhắc GDV', allowFiltering: true, allowSorting:false},
    {fieldName: 'DIACHI_TT', headerText: 'Địa chỉ thanh toán', allowFiltering: true, allowSorting:false},
    {fieldName: 'MA_TUYEN', headerText: 'Tuyến thu', allowFiltering: true, allowSorting:false},
		{fieldName: 'MAIN_GHEP', headerText: 'Mã in ghép', allowFiltering: true, allowSorting:false},
		{fieldName: 'GIAOPHIEU_ID', headerText: 'Lượt giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'THUNO', headerText: 'Thu nợ', allowFiltering: true, allowSorting:false},
		{fieldName: 'MANV_TC', headerText: 'Mã NV/HTTT', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_LKHL', headerText: 'Loại KHL', allowFiltering: true, allowSorting:false},
		{fieldName: 'TENHT_GIAO', headerText: 'HT giao', allowFiltering: true, allowSorting:false},
		{fieldName: 'TEN_PLKH', headerText: 'Phân loại KH', allowFiltering: true, allowSorting:false},
    {fieldName: 'THU_CPS', headerText: 'Thu CPS', allowFiltering: true, allowSorting:false},
    {fieldName: 'HINHTHUC_TT_1', headerText: 'HTTT n-1', allowFiltering: true, allowSorting:false},
    {fieldName: 'NGAY_TT_1', headerText: '"Ngày TT n-1', allowFiltering: true, allowSorting:false},
	]
};

export default GRID_COLUMS;
