export default {
    getDSTimKiem: (axios,) => axios.get(`/web-qlvt/api/tra-cuu-serial-thietbi/ds-kieu-tim-kiem`),
    getDSChungTu: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-chungtu`, data),
    getDSTamUng: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-tam-ung`, data),
    getDSThueBao: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-thue-bao`, data),
    getDSDangKyHopDong: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-thongtin-dki-hd`, data),
    getDSMaThietBi: (axios, maThietBi) => axios.get(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-thiet-bi?maThietBi=${maThietBi}`),
    getDSTongHop: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-tt-tonghop`, data),
    getDSSerialGP: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-serialgp`, data),
    getDSSerialTheoSerialGP: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-ds-serial`, data),
    getDSThamSoMD: (axios, kieuId) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tham-so-mac-dinh/${kieuId}`),
    getThongTinQuyetToanSerial: (axios, serial) => axios.get(`/web-qlvt/api/tra-cuu-serial-thietbi/lay-thong-tin-quyet-toan?serial=${serial}`),
    capNhatTrangThaiSerial: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-serial-thietbi/cap-nhat-trang-thai-serial-phieu-vt`, data),
    getHinhAnh: (axios, phieuvt_id) => axios.get(`/web-qlvt/api/cap-vat-tu-thue-bao/lay-ds-hinh-anh/${phieuvt_id}`),
    testTree: (axios,) => axios.get(`/web-qlvt/api/dang-ky-cap-phat/ds-vat-tu-dk-mucdich/882/0`),
}