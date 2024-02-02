export default {
    getDSMucDich: (axios) => axios.get(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-muc-dich-ccdc`),
    getDSDonVi: (axios, nhanVienId) => axios.get(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/danh-muc-don-vi-ccdc/${nhanVienId}`),
    getDSNhanVien: (axios) => axios.get(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-nv-dieu-chuyen-ccdc`),
    getDSChungTuCCDC: (axios, data) => axios.post(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-ct-ccdc`,data),
    getDSChiTietVatTu: (axios, nxccId) => axios.get(`/web-qlvt/api/cap-phat-ccdc/danh-sach-chi-tiet-nxcc/${nxccId}`),
    getDSTongHop: (axios, nxccId) => axios.get(`/web-qlvt/api/cap-phat-ccdc/danh-sach-tong-hop-nxcc/${nxccId}`),
    xoaChungTuCCDC: (axios, nxccId) => axios.post(`/web-qlvt/api/cap-phat-ccdc/xoa-ccdc/${nxccId}`),
    hoanThienCCDC: (axios, data) => axios.post(`/web-qlvt/api/cap-phat-ccdc/hoan-thien-ccdc`,data),
    ThemMoiChungTuCCDC: (axios, data) => axios.post(`/web-qlvt/api/cap-phat-ccdc/them-moi-ct-ccdc`,data),
    CapNhapChungTuCCDC: (axios, data) => axios.post(`/web-qlvt/api/cap-phat-ccdc/cap-nhat-ct-ccdc`,data),
    getDSNVSuDungCCDC: (axios, Thang) => axios.get(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-su-dung-ccdc?dTp=${Thang}`),
    getDSCayDonVi: (axios, donViId) => axios.get(`/web-qlvt/api/chon-nhanvien-ccdc/ds-donvi-ccdc-v2/${donViId}`),
    kiemTraToTruong: (axios, donViId) => axios.get(`/web-qlvt/api/chon-nhanvien-ccdc/kiem-tra-to-truong/${donViId}`),
    getDSDonViThiCong: (axios, donViId) => axios.get(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-don-vi-thi-cong/${donViId}`),
    getDSNVTheoMucDichDonVi: (axios, data) => axios.post(`/web-qlvt/api/dieu-chuyen-thu-hoi-ccdc/ds-nv-theo-mucdich-dv`,data),
}