export default {
    lay_ds_router_cu_moi: (axios) => axios.post('/web-hopdong/thaydoi_thongso_megawan/post_list_v2'),
    lay_ds_dichvu_vienthong: async (axios, data) => axios.post('/web-hopdong/danhmuc/dichvu_vienthong', data),
    lay_ds_loaihinh_thuebao: async (axios, data) => axios.post('/web-hopdong/danhmuc/loaihinh_thuebao', data),
    lay_ds_loai_kenh:async (axios, data) => axios.get('/web-hopdong/thaydoimegawan/loai_kenh', data),
    lay_ds_loai_tb_megawan: (axios, data) => axios.get('/web-hopdong/thaydoimegawan/lay_ds_loai_tb_megawan', data),
    lay_chitiettb_matb: (axios, data) => axios.post('/web-hopdong/thaydoi_thongso_megawan/sp_lay_danhba_theo_matb_siteid', data),
    fn_lay_text_huongketnoi: (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/fn_lay_text_huongketnoi', data),
    sp_lay_ds_tinh_kn: (axios, data) => axios.get('/web-hopdong/thaydoimegawan/sp_lay_ds_tinh_kn', data),
    //lay_danhba_theo_matb:(axios, data) => axios.get('/web-hopdong/khoiphucthanhly/lay_danhba_theo_matb', data),

    sp_tt_dbtb_dv: async (axios, data) => axios.post('/web-hopdong/laydulieu/sp_tt_dbtb_dv',data),
    fn_tt_diachi_tb: async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_diachi_tb',data),
    fn_tt_diachi_hdtb: async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_diachi_hdtb',data),

    sp_lay_thongso_kt: async (axios, data) => axios.post('/web-thicong/hoancongmegawan/sp_lay_thongso_kt',data),
    fn_tt_donvi: async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_donvi', data),

    lay_danhba_theo_matb: async (axios, data) => axios.post('/web-danhba/chuanhoa_chuquan/lay_danhba_theo_matb', data),
    

    //
    sp_ktra_dk_port: async (axios, data) => axios.post('/web-ccdv/khaibaoims/sp_ktra_dk_port', data),
    fn_capnhat_trangthai_port: async (axios, data) => axios.post('/web-ccdv/khaibaoims/fn_capnhat_trangthai_port', data),
    fn_capnhat_trangthai_portid: async (axios, data) => axios.post('/web-ccdv/khaibaoims/fn_capnhat_trangthai_portid', data),
    fn_capnhat_ds_matb: async (axios, data) => axios.post('/web-ccdv/khaibaoims/fn_capnhat_ds_matb', data),
    Capnhat_port_vatly: async (axios, data) => axios.post('/web-ccdv/dongbo-visa-vasc/Capnhat_port_vatly', data),

    fn_taodulieu_mgwan: async (axios, data) => axios.post('/web-hopdong/thaydoi_thongso_megawan/fn_taodulieu_mgwan', data),
    capnhat_doi_tskt_mgwan_v3: async (axios, data) => axios.post('/web-hopdong/thaydoi_thongso_megawan/capnhat_doi_tskt_mgwan_v3', data),
    
    lay_ds_hopdong_theo_matb: async (axios, data) => axios.post('web-hopdong/hopdong/lay_ds_hopdong_theo_ma_tb_tdts', data),
    lay_ds_hopdong_thuebao_mgwan: async (axios, hdtb_id) => axios.get(`web-hopdong/hopdong/lay_ds_hopdong_thuebao_mgwan?hdtbId=${hdtb_id}`),

    //fn_lay_text_huongketnoi: async (axios, data) => axios.get('web-ccdv/khoiphucthanhly/fn_lay_text_huongketnoi', data),
    
    
}