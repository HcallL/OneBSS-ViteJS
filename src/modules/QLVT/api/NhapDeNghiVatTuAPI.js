export default {
    getDSKhoDenNghiVT: (axios) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/ds-kho-de-nghi-vt`),
    getDSKhoDonViVT: (axios) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/ds-kho-don-vi-vt`),
    getDSVatTuMucDich: (axios) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/ds-vt-muc-dich`),
    getDSThamSoMacDinh: (axios) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tham-so-mac-dinh/0`),
    getDSLoaiPhieu: (axios,data) => axios.post(`/web-qlvt/api/de-nghi/danh-muc-ql-dn`,data),
    getDSDangKyVT: (axios,data) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/ds-de-nghi/${data.loaiPhieuId}/${data.daNop}`),
    getDSVatTuDaDk: (axios,denghi_id) => axios.get(`/web-qlvt/api/de-nghi/ds-de-nghi-ct?deNghiId=${denghi_id}`),
    xoaDeNghi: (axios,denghi_id) => axios.post(`/web-qlvt/api/nhap-de-nghi-vt/xoa-de-nghi?deNghiId=${denghi_id}`),
    getQuyTrinhHuongGiaoTheoDeNghiId: (axios,denghi_id) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/huong-giao-tiep-theo-id/${denghi_id}`),
    getQuyTrinhHuongGiaoTiepTheo: (axios,huongGiaoId) => axios.get(`/web-qlvt/api/nhap-xuat-vt/huong-giao-tiep-theo?huong-giao-id=${huongGiaoId}`),
    capNhatDenghi: (axios,data) => axios.post(`/web-qlvt/api/nhap-de-nghi-vt/cap-nhat-de-nghi`,data),
    getKey: (axios, data) => axios.post('/web-qlvt/api/cap-phat-ccdc/get-key', data),
    getHuongGiaoTiepTheo: (axios,denghi_id) => axios.get(`/web-qlvt/api/nhap-de-nghi-vt/huong-giao-tiep-theo-id/${denghi_id}`),
    getDSDonViFMIS: (axios, ) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-don-vi-fmis`),
    getDSDeNghiV2: (axios, data) => axios.post('/web-qlvt/api/nhap-de-nghi-vt/ds-denghi-v2', data),
    getDSChungTuHoanUng: (axios, data) => axios.post('/web-qlvt/api/quyet-toan-vat-tu/ds-ct-hoan-ung', data),
    xoaDeNghiChungTu: (axios, data) => axios.post('/web-qlvt/api/nhap-de-nghi-vt/xoa-de-nghi-ct', data),
    kiemTraHanChungTuV3: (axios, data) => axios.post('/web-qlvt/api/nhap-de-nghi-vt/kiem-tra-han-chung-tu', data),
    dongBoDeNghi: (axios, data) => axios.post('/web-qlvt/api/quyet-toan-vat-tu/nh-chung-tu-de-nghi', data),
    capNhatDongBoChungTu: (axios, data) => axios.post('/web-qlvt/api/nhap-de-nghi-vt/cap-nhat-dong-bo-ct-de-nghi', data),
    xoaChungTuDongBo: (axios, data) => axios.post('/web-qlvt/api/quyet-toan-vat-tu/xoa-chung-tu-de-nghi', data),
    getLinkFile: (axios, data) => axios.post(`/web-qlvt/api/storage/getPresignedUrl`,data),
    checkFileExist: (axios, data) => axios.post(`/web-qlvt/api/storage/checkExistsFile`,data),   
    getDSFile: (axios,denghi_id) => axios.get(`/web-qlvt/api/giao-phieu/info-mo-ta-giao-phieu/${denghi_id}`),

    capNhatDenghiV2: (axios,data) => axios.post(`/web-qlvt/api/nhap-de-nghi-vt/cap-nhat-de-nghi-v2`,data),
    getDSDonViDeNghi: (axios, ) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-don-vi-de-nghi`),
    getDSTinh: (axios, ) => axios.get(`/web-qlvt/api/luanchuyen-vattu/ds-tinh`),   
    themSuaXoaDieuChuyen: (axios,data) => axios.post(`/web-qlvt//api/luanchuyen-vattu/ins-upd-luanchuyen`,data),
    getMaBC: (axios,baocao_id) => axios.get(`/web-qlvt/api/dang-ky-cap-phat/ds-bao-cao/${baocao_id}`),
};