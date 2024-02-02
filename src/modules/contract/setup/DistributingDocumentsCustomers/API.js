export default {
    capnhat_bohs: async (axios,ma_nghiepvu, data) => axios.post('/web-hopdong/CapNhatBHS/capnhat_bohs_danhmuc/'+ma_nghiepvu, data),
    sp_lay_ds_nhanvien_qldl: async (axios, data) => axios.post('web-hopdong/CapNhatBHS/sp_lay_ds_nhanvien_qldl',data),
    sp_lay_ds_nhanvien_theo_donvi: async (axios,data) => axios.post('web-hopdong/CapNhatBHS/sp_lay_ds_nhanvien_theo_donvi',data),
    sp_ht_ds_giaoviec_bo_hs: async (axios,data) => axios.post('/web-hopdong/CapNhatBHS/sp_ht_ds_giaoviec_bo_hs',data),
    CAPNHAT_BOHS_TT_HEN_KH: async (axios,data) => axios.post('/web-hopdong/CapNhatBHS/capnhat_bohs_danhmuc/CAPNHAT_BOHS_TT_HEN_KH',data),
    sp_lay_ds_file_hs: async (axios,data) => axios.post('/web-hopdong/CapNhatBHS/sp_lay_ds_file_hs',data),
    sp_lay_ds_phieu_phatkh: async (axios,data) => axios.post('/web-hopdong/CapNhatBHS/sp_lay_ds_phieu_phatkh',data),
    capnhat_bohs_tt_loai_nv: async (axios) => axios.get('/web-hopdong/CapNhatBHS/capnhat_bohs_tt_loai_nv'),
    xacnhan_bohoso: async (axios,data) => axios.post('/web-quantri/hoso/xacnhan_bohoso',data),
    fn_nghiemthu_bhscapphat: async (axios,data) => axios.post('/web-quantri/hoso/fn_nghiemthu_bhscapphat',data),
    capnhat_file_hoso: async (axios, data) => axios.post('/web-hopdong/hopdong/capnhat_file_hoso', data),
    xoa_file_bsh_theo_fileid: async (axios,data) => axios.post('/web-hopdong/hopdong/xoa_file_bsh_theo_fileid',data),
    them_hs_thue_bao: async (axios, data) => axios.post('/web-hopdong/hopdong/them_hs_thue_bao',data),
    upload_file_hoso: async (axios, data,header) => axios.post('/web-quantri/upload', data,header),
    fn_capnhat_bhs_giaoviec: async (axios, data) => axios.post('/web-hopdong/CapNhatBHS/fn_capnhat_bhs_giaoviec', data),
    fn_capnhat_bhs_hen_kh: async (axios,data) => axios.post('/web-hopdong/CapNhatBHS/fn_capnhat_bhs_hen_kh',data),
    xoa_giaoviec: async (axios,data) => axios.post('/web-quantri/hoso/xoa_giaoviec',data),
    xoa_hen_kh: async (axios,data) => axios.post('/web-quantri/hoso/xoa_hen_kh',data),
}    