export default {
    getDSDichVuVienThong: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-sach-dich-vu-vien-thong/${data.p_nguoi_dung_id}/${data.p_ten_bang}`),
    getDSLoaiHinhThueBao: (axios, dich_vu_id) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-sach-loai-hinh-thue-bao/${dich_vu_id}`),
    getDanhBaTheoMaThueBao: (axios, data) => axios.post('/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-ba-theo-ma-thue-bao',data),
    getDSVatTuThueBao: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-sach-vat-tu-thue-bao/${data.ma_tim_kiem}/${data.kieu}`),
    getBienDongVatTuThueBao: (axios, data) => axios.get('/web-qlvt/api/tra-cuu-vat-tu-thue-bao/bien-dong-vat-tu-thue-bao/?ma-thue-bao=' + data.ma_thue_bao + '&kieu=' + data.kieu),
    getDanhBaTheoMaThanhToan: (axios, data) => axios.post('/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-ba-theo-ma-thanh-toan',data),
    getDanhBaTheoKhachHangId: (axios, khach_hang_id) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu-thue-bao/danh-ba-theo-ma-khach-hang/${khach_hang_id}`),
    getDSLichSuVatTu: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu-thue-bao/ds-lich-su-don-gia/${data.kieu}/${data.vatTuId}`),
    getDSThamSoMacDinhTheoMaTS: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/lay-ds-thamso-md-mats/${data.maTS}`),   
    getHinhAnh: (axios, phieuvt_id) => axios.get(`/web-qlvt/api/cap-vat-tu-thue-bao/lay-ds-hinh-anh/${phieuvt_id}`), 
}