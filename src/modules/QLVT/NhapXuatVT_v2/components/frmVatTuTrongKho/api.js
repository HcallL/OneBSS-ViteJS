export default {
    ds_quyen_nd: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-quyen-nd/${data.nguoidung_id}`,),
    ds_ten_tham_so: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-ten-tham-so/${data.maThamSo}`,),
    ds_kho_nhan_vien: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-kho-nhan-vien/${data.nhanvien_id}`,),
    ds_kho_nha_cung_cap: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-kho-nha-cung-cap/${data.nhanvien_id}`,),
    ds_thietbi_tonkho: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-thietbi-tonkho/${data.kho_id}`,),
    ds_hangsx: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-hangsx`, data),
    ds_linhvuc: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-linhvuc`, data),
    kiem_tra_trang_thai_vt: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/kiem-tra-trang-thai-vt`,data),
    ds_vattu_ton_kho_v3: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-vattu-ton-kho-v3`,data),
    ds_vattu_ton_kho: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-vattu-ton-kho`,data),
    ds_loai_khotd: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-loai-khotd`, data),
    ds_khotd: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-khotd`,),
    ds_dangky_theo_dk: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-dangky-theo-dk`,data),
    ds_da_dangky: (axios, data) => axios.get (`/web-qlvt/api/tra-cuu-ton-kho-user/ds-da-dangky/${data.dangky_id}`,),
    xoa_soluong_duyet_vattu: (axios, data) => axios.put(`/web-qlvt/api/tra-cuu-ton-kho-user/xoa-soluong-duyet-vattu/${data.dangky_id}`,),
    ds_vattu_thdk: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-vattu-thdk/${data.vattu_dk_id}`,),
    vattu_da_dang_ky: (axios, data) => axios.put(`/web-qlvt/api/tra-cuu-ton-kho-user/vattu-da-dang-ky/${data.soLuongDuyet}/${data.vatTuDkId}`,),
    vattu_da_dang_ky_khi_xoa: (axios, data) => axios.put(`/web-qlvt/api/tra-cuu-ton-kho-user/vattu-da-dang-ky-khi-xoa/${data.vatTuDkId}`,),
    ds_dangky_theo_dktt: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-dangky-theo-dktt`,data),
    vattu_dang_ky_tra_phieu: (axios, data) => axios.put(`/web-qlvt/api/tra-cuu-ton-kho-user/vattu-dang-ky-tra-phieu/${data.dangKyId}`,),
    ds_vttb_chua_hoan_tamung: (axios, data) => axios.get (`/web-qlvt/api/tra-cuu-ton-kho-user/ds-vttb-chua-hoan-tamung/${data.khoId}/${data.thietBiId}`,),
    ds_dong_tbi: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-dong-tbi`,data),
    ds_he_thong: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-he-thong/${data.linhVucId}`,),
    kiem_tra_trang_thai_vt: (axios, data) => axios.post(`/web-qlvt/api/tra-cuu-ton-kho-user/kiem-tra-trang-thai-vt`,data),
}
