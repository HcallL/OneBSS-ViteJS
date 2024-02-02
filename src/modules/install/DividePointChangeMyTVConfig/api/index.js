export default {
  getDanhSachNhanVienGiaoViec: (axios, donViId) => axios.get(`/web-quantri/danhmuc/ds_nhanvien_donvi/${donViId}`),
  getGiaTriBangPhanQuyen: (axios, nguoiDungId) => axios.get(`/web-quantri/quyen/dk_theo_bang/DICHVU_VT/${nguoiDungId}`),
  getDanhSachDichVuVienThong: (axios) => axios.get('/web-quantri/danhmuc-chung/CSS_DICHVU_VT'),
  getDanhSachKieuYeuCau: (axios, { loaiHopDongId, loaiThueBaoId }) => axios.get(`/web-hopdong/danhmuc/ds_kieu_ld/${loaiHopDongId}/${loaiThueBaoId}`),
  getDanhSachQuyTrinh: (axios, data) => axios.post('/web-hopdong/danhmuc/ds_quytrinh', data),
  getDanhSachHuongGiao: (axios, { quyTrinhId, trangThaiHopDong }) => axios.get(`/web-hopdong/danhmuc/ds_huonggiao/${quyTrinhId}/${trangThaiHopDong}`),
  getDanhSachPhieuHC: (axios, data) => axios.post('/web-ccdv/tiepnhanhopdong/ds_phieu_hc', data),
  getDanhSachThaoTacTheoLuong: (axios, data) => axios.post('/web-hopdong/thanhly/sp_lay_ds_thaotac_theo_luong_id_code', data),
  getThaoTacControl: (axios, data) => axios.post('/web-hopdong/thanhly/sp_lay_ct_thaotac_control', data),
  getDanhSachNhanVienTheoPhieu: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_ds_nhanvien_theo_phieu_id', data),
  getDanhSachLoaiThueBaoByDVVT: (axios) => axios.get('/web-quantri/danhmuc-chung/CSS_LOAIHINH_TB'),
  getDanhSachKieuLapDat: (axios) => axios.get('/web-quantri/danhmuc-chung/CSS_KIEU_LD'),
  layThongTinTrangBiV2: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/lay_tt_trangbi_v2', data),
  capNhat: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/fn_capnhat_hthsthaydoimytv', data),
  getThongTinTheoHDTB: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/sp_lay_thongtin_theo_hdtb', data),
  kichHoatMyTV: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/kichhoat_mytv', data),
  hoanCongHoSoThayDoiTSMyTV: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/fn_hoancong_hthsthaydoimytv', data),
  hoanThienHoSoThayDoiTSMyTV: (axios, data) => axios.post('/web-ccdv/hoanthien_hoso_thaydoi_tsmytv/fn_hoanthien_hthsthaydoimytv', data),
  getThongTinHdtb: (axios, body) => axios.post('web-tratruoc/thongtin_tratruoc_dn/fn_tt_hd_thuebao', body)
}
