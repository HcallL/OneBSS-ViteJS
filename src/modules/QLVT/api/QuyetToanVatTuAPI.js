export default {
    getDSDonViTheoDichVu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/don-vi-theo-loai-dich-vu`, data),
    getDSDichVuVatTu: (axios,) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/dich-vu-vat-tu`),
    getDSThueBaoCapVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/thue-bao-cap-vat-tu`, data),
    getDSLoaiHopDong: (axios,) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/loai-hop-dong`),
    getDSKhoTheoNhanVienId: (axios, nhanVienId) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/kho-theo-nhan-vien?nhan-vien-id=${nhanVienId}`),
    getDSVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/ds-phieu-vt-thue-bao`, data),
    getDSVatTuQuyetToan: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/phieu-vat-tu`, data),
    huyTraPhieuQuyetToan: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/huy-tra-phieu-quyet-toan-vat-tu`, data),
    getDSPhieuVTThueBao: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/ds-phieu-vt-thue-bao`, data),
    quyetToanVatTuV2: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/quyet-toan-giao-phieu-v2`, data),
    huyQuyetToanVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/huy-quy-trinh-giao-phieu`, data),
    getMucDichXuat: (axios, maMucDich) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/lay-muc-dich-xuat?ma-muc-dich=${maMucDich}`),
    getDSDonViNhan: (axios,) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/don-vi-nhan`),
    kiemTraHanChungTu: (axios, data) => axios.post(`/web-qlvt/api/duyet-dang-ky-cap-phat/kiem-tra-han-chung-tu`, data),
    taoPhieuChungTuV2: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/tao-phieu-chung-tu-v2`, data),
    quyetToanVatTuThueBao: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/quyet-toan-vat-tu-thue-bao`, data),
    xoaChungTu: (axios, chungTuId) => axios.delete(`/web-qlvt/api/nhap-xuat-vt/xoa-chung-tu?chung-tu-id=${chungTuId}`),
    xoaPhieuVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/xoa-phieu-vat-tu`, data),
    xoaAllChiTietPhieuVatTu: (axios, chungTuId) => axios.get(`/web-qlvt/api/duyet-dang-ky-cap-phat/xoa-chi-tiet-chung-tu?chung-tu-id=${chungTuId}`),
    kiemTraPhieuTra: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/kiem-tra-phieu-tra`, data),
    getDSPhieuKDCSUA: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/phieu-vat-tu-kdcsua`, data),
    kiemTraSuDungVatTu: (axios, thueBaoId) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/kiem-tra-su-dung-vat-tu?thue-bao-id=${thueBaoId}`),
    kiemTraSuaVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/kiem-tra-sua-vat-tu`, data),
    getDSKhoTheoNhanVien: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu/ds-kho-theo-nhanvien/${data.nhanVienId}/${data.donViId}`),
    getDSKhoTheoDonVi: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/danh-sach-kho-don-vi?nhan-vien-id=${data.nhanVienId}&don-vi-id=${data.donViId}`),
    getTSMacDinh: (axios, tsmd) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/lay-ds-thamso-md-mats/${tsmd}`),
    huyQuyetToanGiaoPhieuVatTu: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/huy-quyet-toan-giao-phieu-vt`, data),
    quyetToanVatTuTheoDonVi: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/quyet-toan-vat-tu-thue-bao-theo-don-vi`, data),
    taoPhieuChungTuGiaoPhieu: (axios, data) => axios.post(`/web-qlvt/api/nhap-kho-th/tao-phieu-chung-tu-giao-phieu`, data),
    capNhatChungTuQuyetToan: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/cap-nhat-chung-tu-qt`, data),
    getDSTimKiemNangCao: (axios, data) => axios.get(`/web-qlvt/api/quyet-toan-vat-tu/tim-kiem-nang-cao-qt-vat-tu`),
    getDSQuyetToanNangCao: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/ds-thue-bao-qt-nang-cao`, data),
    hoanTamUng: (axios, data) => axios.post(`/web-qlvt/api/quyet-toan-vat-tu/hoan_tamung`, data),
    getDSKhoTheoCBoDonVi: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-vat-tu/ds-kho-quyettoan-theo-nhanvien/${data.nhanVienId}/${data.donViId}`),
}