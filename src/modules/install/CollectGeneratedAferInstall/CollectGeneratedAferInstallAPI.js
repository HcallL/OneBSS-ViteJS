export default{
  DSDichVu: async (axios, data, header) => axios.get('/web-quantri/danhmuc-chung/CSS_DICHVU_VT', data, header),
  DSQuyTrinh: async (axios, data, header) => axios.post('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_DS_QUYTRINH_V2', data, header),
  DSKQXuLy: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_KETQUA_XULY', { params: data }),
  DSHopDong: async (axios, data, header) => axios.post('/web-ccdv/HoanCongThuTienPhatSinh/LAY_DS_HDTB_GIAODEN_THUTIEN', data, header),
  DSNhanVienTheoDonVi: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_DS_NHANVIEN_THEO_DONVI', { params: data }),
  DSNhanVienThucHien: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/LAY_DS_NHANVIEN_THEO_PHIEU_ID', { params: data }),
  DSTocDo: async (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_THONGTIN_TOCDO_ADSL_TSL', { params: data }),
  DSKhuyenMai: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_DS_KHUYENMAI', { params: data }),
  LayHuongGiaoTheoQuyTrinh: async (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_HUONGGIAO_THEO_QUYTRINH', { params: data }),
  LayChiTietKhuyenMai: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/lay_chitiet_km_theo_hdtb_id', { params: data }),
  thongTinTocDoCuaHopDong: async (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_TOCDO_CU_TOCDO_MOI', { params: data }),
  TienKhoanMucTheoLoaiHD: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/SP_LAY_TIENKHOANMUC_LOAIHD', { params: data }),
  TienKhoanMucTheoHDTB: (axios, data) => axios.get('/web-ccdv/HoanCongThuTienPhatSinh/LAY_TIENHD_KM_THEO_HDTB', { params: data }),
  CapNhatNoiDungGiaoPhieu: async (axios, data, header) => axios.post('/web-ccdv/HoanCongThuTienPhatSinh/CAPNHAT_NOIDUNG_GIAOPHIEU', data, header),
  CapNhat: async (axios, data, header) => axios.post('/web-ccdv/HoanCongThuTienPhatSinh/FN_FM_HCTIENPS_CAPNHAT', data, header),
  HoanCong: async (axios, data, header) => axios.post('/web-ccdv/HoanCongThuTienPhatSinh/FN_FM_HCTIENPS_HOANCONG', data, header),
  // ///// FN_LAY_KHUYENMAI_SOTHANG_SD LAY_HUONGGIAO_THEO_LUONG_ID
  dsKMTheoTocDoMucCuocLoaiTB: async (axios, data, header) => axios.post('/web-tratruoc/danhMuc/dsKMTheoTocDoMucCuocLoaiTB', data, header),
  dsHDTBGiaoDenThuTien: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/dsHDTBGiaoDenThuTien', data, header),
  capNhatThayDoiTocDo: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/capNhatThayDoiTocDo', data, header),
  capNhatTienThuKhac: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/capNhatTienThuKhac', data, header),
  ddsDichVu: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsDichVu', data, header),
  dsHuongGiaoTheoQuyTrinh: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsHuongGiaoTheoQuyTrinh', data, header),
  dsKetQuaXL: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsKetQuaXL', data, header),
  dsNhanVienTheoDonVi: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsNhanVienTheoDonVi', data, header),
  dsTienKhoanMuc: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsTienKhoanMuc', data, header),
  kiemTraHuongGiaoPhaiLam: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/kiemTraHuongGiaoPhaiLam', data, header),
  dsTocDoDvADSL: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsTocDoDvADSL', data, header),
  dsTocDoKenh: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsTocDoKenh', data, header),
  dsTocDoCuMoi: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsTocDoCuMoi', data, header),
  kiemTraThoiHanKM: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/kiemTraThoiHanKM', data, header),
  dsNhanVienTheoPhieu: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/dsNhanVienTheoPhieu', data, header),
  capNhatThongTinPhieu: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/capNhatThongTinPhieu', data, header),
  dsDonViGiaoPhieu: async (axios, data, header) => axios.get('/web-tratruoc/danhMuc/dsDonViGiaoPhieu', data, header),
  kiemTraPhieuDaGiao: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/kiemTraPhieuDaGiao', data, header),
  thanhToanThuKhac: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/thanhToanThuKhac', data, header),
  giaoPhieu: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/giaoPhieu', data, header),
  capNhatTrangThaiPhieu: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/capNhatTrangThaiPhieu', data, header),
  hoanCongHDThuKhac: async (axios, data, header) => axios.post('/web-tratruoc/hoanCongThuTienPS/hoanCongHDThuKhac', data, header),
  laySoThangSuDung: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/laySoThangSuDung', data, header),
  capNhatNDGiaoPhieu: async (axios, data, header) => axios.post('/web-quantri/hoanCongThuTienPS/capNhatNDGiaoPhieu', data, header),
  layNgayKM: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/layNgayKM', data, header),
  layTienVatKhoanMuc: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/layTienVatKhoanMuc', data, header),
  layChiTietKMTheoHDTB: async (axios, data, header) => axios.get('/web-tratruoc/hoanCongThuTienPS/layChiTietKMTheoHDTB', data, header)
}
