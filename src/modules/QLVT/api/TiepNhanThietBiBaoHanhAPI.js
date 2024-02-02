export default {
    getDSDonViTheoNVLoaiDV: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/nhan-vien-theo-dv', data),
    getDSKieuBaoHanh: (axios, data) => axios.get('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/kieu-bao-hanh'),
    getDSTinhTrang: (axios, data) => axios.get('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tinh-trang-bao-hanh'),
    getDSNhomThietBi: (axios, data) => axios.get('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/nhom-thiet-bi'),
    getDSLoaiThietBi: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/loai-thiet-bi/${data}`),
    getDSVatTu: (axios, data) => axios.get('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/vat-tu'),
    getDSTiepNhanBH: (axios, data) => axios.post(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/bao-hanh-thiet-bi`,data.params),
    getDSThamSoMacDinh: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tham-so-mac-dinh/${data}`),
    getThongTinBaoHanhTB: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/thong-tin-bao-hanh-thiet-bi',data),
    getMapID: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/vat-tu-bao-hanh/${data.baoHanhId}`,),
    getTinhTrangBHTheoID: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tinh-trang-bao-hanh-theo-id/${data}`),
    kiemTraSerialChoTiepNhan: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/serial-dang-cho-tiep-nhan',data),
    kiemTraSerialBH: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/serial-dang-cho-bao-hanh/${data}`),
    getKey: (axios, data) => axios.post('/web-qlvt/api/cap-phat-ccdc/get-key',data),
    getQuyTrinhBH: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/quy-trinh-bao-hanh/${data}`),
    getDonViBH: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/don-vi-bao-hanh',data),
    getDonViTheoKho: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/don-vi-bao-hanh-theo-kho',data),
    getToBHSuaChua: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/to-bao-hanh/${data}`),
    updateDSBaoHanh: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/cap-nhat-danh-sach-bao-hanh',data),
    insertBaoHanhDV: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tao-danh-sach-bao-hanh-dv',data),
    insertDSBaoHanh: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tao-danh-sach-bao-hanh', data),
    xoaBaoHanhDV: (axios, data) => axios.delete(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/xoa-bao-hanh-dich-vu/${data}`),
    xoaBaoHanhTinhTrang: (axios, data) => axios.delete(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/xoa-bao-hanh-tinh-trang/${data}`),
    insertBaoHanhTinhTrang: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/them-bao-hanh-tinh-trang',data),
    giaoPhieuTNBaoHanh: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/giao-phieu-bao-hanh/${data}`),
    updateBaoHanh: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/cap-nhat-bao-hanh',data),
    getThongTinVTTheoSerial: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/vat-tu-theo-serial/${data}`),
    getHuongGiaoQuyTrinh: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/huong-giao-quy-trinh/${data.quyTrinhId}/${data.thuTuId}`),
    getDanhSachHuongGiao: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/danh-sach-huong-giao',data),
    getDKChoBang: (axios, data) => axios.post('/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/lay-dieu-kien',data),
    tiepNhanBaoHanh: (axios, data) => axios.post('/web-qlvt/api/giao-phieu-bao-hanh/tiep-nhan-bao-hanh',data),
    xoaBaoHanh: (axios, baoHanhId) => axios.delete(`/web-qlvt/api/giao-phieu-bao-hanh/xoa-bao-hanh/${baoHanhId}`),
  }