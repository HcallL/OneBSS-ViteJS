
export default {

    LayDSMauHoaDonDaDangKy: (axios, data) => axios.post(`/tichhop/hddt/LayDSMauHoaDonDaDangKy`, data),
    LayThongTinKHHDDT: (axios, data) => axios.get(`/tichhop/hddt/LayThongTinKHHDDT`, data),
    XoaMauHoaDon: (axios, data) => axios.post(`/tichhop/hddt/XoaMauHoaDon`, data),
    DangKyMauHoaDon: (axios, data) => axios.post(`/tichhop/hddt/DangKyMauHoaDon`, data),
    LayDanhMucLoaiHoaDon: (axios, data) => axios.get(`/tichhop/hddt/LayDanhMucLoaiHoaDon`, data),
    LayDanhMucMauHoaDon: (axios, data) => axios.get(`/tichhop/hddt/LayDanhMucMauHoaDon`, data),
    HTMLMauHoaDon: (axios, data) => axios.get(`/tichhop/hddt/LayChiTietMauHoaDon`, data),
    DangKyKhachHang: (axios, data) => axios.post(`/tichhop/hddt/DangKyKhachHang`, data),
    KhoiTaoDemo: (axios, data) => axios.post(`/tichhop/hddt/KhoiTaoDemo`, data),
    KhoiTaoHeThongThat: (axios, data) => axios.post(`/tichhop/hddt/KhoiTaoHeThongThat`, data),


    sp_loadmaudadangky_hdtb_cntt: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/sp_loadmaudadangky_hdtb_cntt`, data),
    lay_soluong_hddt_dk: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/lay_soluong_hddt_dk`, data),
    lay_thongtin_tao_hddt: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/lay_thongtin_tao_hddt`, data),
    layds_mau_hddt_dangky: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/layds_mau_hddt_dangky`, data),
    capnhat_thongtin_kh_hddt: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/capnhat_thongtin_kh_hddt`, data),
    capnhat_hddt_da_dk: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/capnhat_hddt_da_dk`, data),
    sp_update_hd_thuebao_kieu_ld: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/sp_update_hd_thuebao_kieu_ld`, data),
    them_hd_thuebao_ct_common: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/them_hd_thuebao_ct_common`, data),
    kiemtra_trangthai_jira_hths_v2: (axios, data) => axios.post(`/web-thicong/hoinghi_truyenhinh/kiemtra_trangthai_jira_hths_v2`, data),

    tao_req_cntt: async (axios, data,header) => axios.post('/web-thicong/hoinghi_truyenhinh/tao_req_cntt', data, header),
    cap_nhat_status_hdtb: async (axios, data,header) => axios.post('/web-ccdv/tram-thicong-dv-cntt/cap_nhat_status_hdtb', data, header),
    fn_get_status_hdtb: async (axios, vhdtb_id, header) => axios.post('/web-thicong/hoinghi_truyenhinh/fn_get_status_hdtb', {vhdtb_id }, header),


    //add them
    MuaThemHoaDon: (axios, data) => axios.post(`/tichhop/hddt/MuaThemHoaDon`, data),
  lay_thongso_dkmua_them_hd: (axios, data) => axios.post(`/web-ccdv/tram-thicong-dv-cntt/lay_thongso_dkmua_them_hd`, data),
  update_hd_thuebao: (axios, data) => axios.post(`/web-ccdv/tram-thicong-dv-cntt/update_hd_thuebao`, data),
  sp_insert_log_cntt: async (axios, data, header) => axios.post('/web-hopdong/dichvu-ca/sp_insert_log_cntt', data, header),
}
