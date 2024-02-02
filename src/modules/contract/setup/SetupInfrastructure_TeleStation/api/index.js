export default{
    Lay_TT_ND: (axios, data) => axios.post('/quantri/user/thongtin_nguoidung2', data),
    getKenhThu: (axios, data) => axios.get('web-quantri/danhmuc-chung/CSS_KENHTHU', data),
    getKieuHD: (axios, data) => axios.get('web-quantri/danhmuc-chung/CSS_KIEU_HD', data),
    getLoaiHD: (axios, data) => axios.get('web-quantri/danhmuc-chung/CSS_LOAI_HD', data),
    getNguoiGiaoViec: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_ds_nhanvien_theo_donvi', data),
    getTocDoADSL: (axios, data) => axios.post('web-hopdong/hths-thaydoi-tocdo/lay_ds_tocdo_adsl', data),
    getMucCuoc: (axios, data) => axios.get('web-quantri/danhmuc-chung/CSS_MUCCUOC', data),
    getDoiTac: (axios, data) => axios.post('web-thicong/tramvt_thicongdv/sp_ds_doitac', data),
    getLoaiCSHT: (axios, data) => axios.get('web-quantri/danhmuc-chung/CSS_LOAI_CSHT', data),
    get_QuyTrinh_V2: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_ds_quytrinh_v2', data),
    get_HuongGiaoTheoQuyTrinh: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/sp_lay_huonggiao_theo_quytrinh', data),
    PHAILAM: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/phailam', data),
    get_DSPHIEU_HC_DVVT: (axios, data) => axios.post('web-thicong/tramvt_thicongdv/lay_ds_phieu_hc_dv_htvt', data),
    get_ThongTin_LHE_LDAT: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_thongtin_lh_lapdat', data),
    get_TongTien_Theo_HDKH: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_tongtien_theo_hdkh_id', data),
    get_TT_NhanVien: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_thongtin_nhanvien', data),
    get_KenhThu: (axios, data) => axios.post('web-thicong/hoancongmegawan/sp_lay_kenhthu_theo_hdkh', data),
    KiemTra_Hen: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/kiemtra_hen_hdtb', data),
    HT_PhieuTra: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/sp_ht_phieu_tra', data),
    getTocDoADSL_LoaiTB_ID: (axios, data) => axios.post('web-thicong/tramvt_thicongdv/sp_ht_tocdo_adsl_combobox_byloaitb', data),
    getDanhSachNV_TheoPhieuID: (axios, data) => axios.post('web-thicong/hoinghi_truyenhinh/lay_ds_nhanvien_theo_phieu_id', data),
    CapNhat: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/fn_capnhat_hoanconghtvt', data),
    HoanCong_HTVT: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/fn_hoancong_hoanconghtvt', data),
    lay_luong_thaotac: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_luong_thaotac', data),
    lay_ct_thaotac_control: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_ct_thaotac_control', data),
    SP_LAY_DS_HDTB_DV_KIEUDV: (axios, data,hdtbId) => axios.get('/web-hopdong/hopdong/lay_ds_hopdong_thuebao_tls?hdtbId=' +hdtbId, data),
    KichHoat: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/capnhat_ngaykh_status_v2', data),
    sp_ds_hdtb_csht: (axios, data) => axios.post('/web-ccdv/khaibaotsl/sp_ds_hdtb_csht', data),
    lay_huonggiao_theo_luong_id: (axios, data) => axios.post('/web-ccdv/khaibaotsl/lay_huonggiao_theo_luong_id', data),
    fn_map_id: (axios, data) => axios.post('/web-thicong/hths-thaydoi-tocdo/fn_map_id', data),
    update_nd_thuchien: (axios, data) => axios.post('/web-hopdong/thaydoi_thongso_megawan/update_nd_thuchien', data),
    fn_capnhat_hoanconghtvt: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/fn_capnhat_hoanconghtvt', data),
    
    
    //
    lay_ds_ttvt_theo_nv: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/lay_ds_ttvt_theo_nv', data),
    sp_ds_tokt: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_ds_tokt', data),
    sp_ds_cap_chuquan: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_ds_cap_chuquan', data),
    sp_ds_cap_goc: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_ds_cap_goc', data),
    sp_ds_tram: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_ds_tram', data),
    sp_lay_ds_tokt_theo_nv: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_lay_ds_tokt_theo_nv', data),
    lay_ds_tuyen_theo_toql: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/lay_ds_tuyen_theo_toql', data),
    sp_lay_ds_hatang: (axios, data) => axios.post('/web-thicong/tramvt_thicongdv/sp_lay_ds_hatang', data),
    
    //
    //lay_ds_file_hdtb: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_ds_file_hdtb', data),
    sp_nap_thongtin_phieu_hientai: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_nap_thongtin_phieu_hientai', data),
    SP_LAY_DS_TOKT_THEO_NV: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_ds_tokt_theo_nv', data),
    SP_LAY_DS_DVTC_THEO_PHIEU_ID: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_ds_dvtc_theo_phieu_id', data),
    NAP_DS_PHIEU: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_nap_ds_phieu_giaophieuphoihop', data),
    
    KIEMTRA_GIAOPHIEU: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/fn_kiemtra_giaophieuphoihop', data),
    GIAOPHIEU_PHOIHOP: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/giaophieu_phoihop_thicong', data),
    XOA_PHIEU_PHOIHOP: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/fn_huy_giao_giaophieuphoihop', data),

    
    //LAY_DS_DVTC_THEO_PHIEU_ID: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_ds_tokt_theo_nv', data),
    fn_tt_hd_thuebao: (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_hd_thuebao', data),
    sp_insert_hdtb_csht: (axios, data) => axios.post('/web-ccdv/khaibaotsl/sp_insert_hdtb_csht', data),
    sp_delete_hdtb_csht: (axios, data) => axios.post('/web-ccdv/khaibaotsl/sp_delete_hdtb_csht', data),
    
  }