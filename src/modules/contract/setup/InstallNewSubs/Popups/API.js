export default{
    fn_lay_ds_dvgt_macdinh: async (axios, data,header) => axios.post('web-hopdong/lapdatmoi/fn_lay_ds_dvgt_macdinh', data,header),
    lay_ds_dichvu_khac: async (axios, data,header) => axios.post('web-hopdong/lapdatmoi/lay_ds_dichvu_khac', data,header),
    lay_ds_thietbi: async (axios, data,header) => axios.post('web-hopdong/lapdatmoi/lay_ds_thietbi', data,header),
    getDanhSachPhuongTheoQuan: async (axios, data) => axios.get('web-thuno/api/thu-no/danh-muc/lay-danh-sach-phuong-theo-quan', { params: data}),
    getDanhSachPhoApKhuTheoPhuong: async (axios, data) => axios.get('web-thuno/api/thu-no/danh-muc/lay-danh-sach-pho-ap-khu-theo-phuong', { params: data}),    
    getDanhBaNVTNTheoDiaDanh: async (axios, data) => axios.get('web-thuno/api/thu-no/tra-cuu-danh-ba/nhan-vien-thu-no/dia-danh', { params: data }),
    getDanhSachDacDiem: async (axios, data) => axios.get('web-thuno/api/thu-no/thong-tin-khach-hang/lay-danh-muc-dac-diem', { params: data}),
    sp_ht_ds_nhanvien_theo_nhomlnv: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/sp_ht_ds_nhanvien_theo_nhomlnv', data,header),
    lay_hdkh_sub_theo_hdkh_id: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/lay_hdkh_sub_theo_hdkh_id', data,header),
    sp_insert_hdkh_sub: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/sp_del_insert_hdkh_sub', data,header),
    kiemtra_so_hd_khdn: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/kiemtra_so_hd_khdn', data,header),
    sinh_so_hd_khdn: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/sinh_so_hd_khdn', data,header),
    CSS_LOAI_HDKH: async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/CSS_LOAI_HDKH', data,header),
    CSS_TINHTRANG_HD: async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/CSS_TINHTRANG_HD', data,header),
    ADMIN_LOAI_NV: async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/ADMIN_LOAI_NV', data,header),
    lay_ds_nhanvien_chuagan: async (axios, data,header) => axios.get('/web-thicong/thuebao/lay_ds_nhanvien_chuagan', data,header),
    timkiem_ds_hopdong: async (axios, data,header) => axios.get('/web-thicong/thuebao/timkiem_ds_hopdong', data,header),
    lay_ds_combobox_loai_nhanvien: async (axios, data,header) => axios.post('/web-thicong/thuebao/lay_ds_combobox_loai_nhanvien', data,header),
    gan_nhanvienql_dbhd: async (axios, data,header) => axios.post('/web-thicong/thuebao/gan_nhanvienql_dbhd', data,header),
    lay_thuebao_thueso: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/lay_thuebao_thueso', data,header),
    sp_lay_thongtin_hdtb_thueso: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/sp_lay_thongtin_hdtb_thueso', data,header),
    layds_tragop_thietbi: async (axios, data,header) => axios.post('/web-hopdong/lapdatmoi/layds_tragop_thietbi', data,header),
    fn_kiemtra_hienthi_thietbi_theo_loaitb: async (axios, data) => axios.post('/web-hopdong/dichvu-cntt-gtgt/fn_kiemtra_hienthi_thietbi_theo_loaitb', data),
    get_sp_lay_ds_loaigt: async (axios, data) => axios.get('/web-hopdong/lapdatmoi/sp_lay_ds_loaigt', data),
    get_sp_lay_tt_hdtb_sub: async (axios, data) => axios.get('/web-hopdong/lapdatmoi/sp_lay_tt_hdtb_sub', data),
    post_capnhat_hdtb_sub_ca: async (axios, data) => axios.post('/web-hopdong/lapdatmoi/capnhat_hdtb_sub_ca', data),
}    