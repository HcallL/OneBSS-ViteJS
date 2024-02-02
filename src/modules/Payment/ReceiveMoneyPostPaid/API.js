export default{
    sp_lay_ds_nv_nguoinop: async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_lay_ds_nv_nguoinop', data,header),
    sp_lay_ds_loai_bangke: async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_lay_ds_loai_bangke', data,header),
    lay_ds_donvi_ctv: async (axios, data,header) => axios.post('/web-thicong/hoso_datcoc_theofile/lay_ds_donvi_ctv', data,header),
    admin_loai_nv: async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/ADMIN_LOAI_NV', data,header),
    danh_sach_to_thi_cong : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_ht_vetinh', data,header),
    sp_lay_ds_nhanvien_ctv: async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_lay_ds_nhanvien_ctv', data,header),
    danh_sach_nhan_vien_thi_cong : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_lay_ds_nhanvien_tc', data,header),
    ds_hop_dong_thu_tien : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/lay_ds_hdkh_dagan_bk1', data,header),
    hop_dong_chua_thu_tien: async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/lay_ds_hd_trasau_chuathutien', data,header),
    danh_sach_bang_ke : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/lay_ds_bangke1', data,header),
    danh_sach_thue_bao : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/lay_ds_hdtb_trasau', data, header),
    xoa_bang_ke : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/sp_xoa_bangke_id', data, header),
    lay_max_stt : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/lay_max_stt', data, header),
    fn_capnhat_bangke : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/fn_capnhat_bangke', data, header),
    get_keys : async (axios, data,header) => axios.post('/web-hopdong/khoiphucthanhly/get_keys', data,header),
    fn_nhanbk_bangke : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/fn_nhanbk_bangke', data,header),

    in_phieuthu_bangke : async (axios, data,header) => axios.post('/web-ccdv/nhantra_tiensau/in_phieuthu_bangke', data,header),
}