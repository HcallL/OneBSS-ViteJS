export default {
  getDanhMucVT_DVT: (axios, data) => axios.get('/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/danh-muc-vat-tu-don-vi-tinh'),
  getDanhMucVT_KieuTB: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/kieu-thiet-bi`),
  getDSKhoGiao: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/danh-sach-kho-giao?kieu=${data.kieu}&nhan-vien-id=${data.nhan_vien_id}&status=${data.status}`),
  getDSKhoNhan: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/danh-sach-kho-nhan?kieu=${data.kieu}&nhan-vien-id=${data.nhan_vien_id}`),
  getDSLoHang: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/danh-sach-lo-hang`),
  getDSQuyetToanCT: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/quyet-toan-chung-tu`, data),
  getDSPhieuVatTuQTCT: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/phieu-vat-tu-qtct`, data),
  getMucDichXuat: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/lay-muc-dich-xuat?ma-muc-dich=${data.ma_muc_dich}`),
  getMucDichNhapBH: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/lay-muc-dich-xuat?ma-muc-dich=${data.ma_muc_dich}`),
  KiemTraHanChungTu: (axios, data) => axios.post(`/web-qlvt/api/duyet-dang-ky-cap-phat/kiem-tra-han-chung-tu`, data),
  TaoPhieuChungTuV2: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/tao-phieu-chung-tu-v2`, data),
  QuyetToanVatTuCT: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/quyet-toan-vat-tu-cong-trinh`, data),
  XoaChungTuID: (axios, data) => axios.delete(`/web-qlvt/api/nhap-xuat-vt/xoa-chung-tu?chung-tu-id=${data.chung_tu_id}`),
  KiemTraSerialThuHoi: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/kiem-tra-serial-thu-hoi`, data),
  KiemTraKhoThuHoi: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/kiem-tra-kho-thu-hoi`, data),
  ThuHoiVatTuCongTrinh: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/thu-hoi-vat-tu-cong-trinh`, data),
  // LaySLPhieuTrongDS: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/danh-sach-lo-hang`),
  CapNhatPhieuVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/kiem-tra-va-cap-nhat-phieu-vat-tu`, data),
  CapMaVatTuPVT: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/cap-ma-vat-tu-pvt`, data),

  QuyetToanVatTuCTAll: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/quyettoan-vattu-cong-trinh`, data),
  ThuHoiCTAll: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/hoantamung-vattu-cong-trinh`, data),
  ThayDoiVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/cap-ma-vat-tu-pvt`, data),
  capNhatMaVT: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu-cong-trinh/cap-nhat-ma-pvt`, data),
}