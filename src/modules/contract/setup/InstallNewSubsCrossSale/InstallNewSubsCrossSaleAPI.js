export default{
  post_lay_danhmuc_lapmoi_tt_chung_v8 : async (axios, data) => axios.post('/web-danhba/lapdatmoi/lay_danhmuc_lapmoi_tt_chung_v8', data),
  post_lay_ds_nganhnghe : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_nganhnghe', data),
  post_sp_ht_chitietdv_ims : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_chitietdv_ims', data),
  post_sp_ht_phantach_tocdo : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_phantach_tocdo', data),
  post_lay_thamso_macdinh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_thamso_macdinh', data),
  post_lay_thamso_md : async (axios, data) => axios.post('/web-thicong/hoancongmegawan/sp_lay_ds_thamso_md', data),
  post_lay_ds_dvk_macdinh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_dvk_macdinh', data),
  post_lay_ds_dl_nghiepvu : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_dl_nghiepvu', data),
  post_lay_danhmuc_lapmoi_mgw_tsl : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_danhmuc_lapmoi_mgw_tsl', data),
  post_lay_danhmuc_lapmoi_internet : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_danhmuc_lapmoi_internet', data),
  post_lay_ds_mucuoc_tb_v2 : async (axios, data) => axios.post('/web-hopdong/TocDoMucCuoc/lay_ds_mucuoc_tb_v2', data),
  // post_lay_ds_mucuoc_tb_v2 : async (axios, data) => axios.post('/web-bancheo/tracuu/lay_ds_mucuoc_tb_v2', data),
  get_lay_ds_ma_thanhtoan : async (axios, data) => axios.get('/web-hopdong/hopdong/lay_ds_ma_thanhtoan', data),
  post_lay_khuyenmai_hdtb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_khuyenmai_hdtb', data),
  post_lay_db_theo_matb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_db_theo_matb', data),
  post_lay_ds_hopdong_theo_ma_gd : async (axios, data) => axios.post('/web-hopdong/hopdong/lay_ds_hopdong_theo_ma_gd',data),
  post_fn_ht_tt_hd_khachhang : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_ht_tt_hd_khachhang',data),
  post_get_keys : async (axios, data) => axios.post('/web-quantri/donvitinh/get_keys',data),
  post_fn_lay_tt_taodl_hdkh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdkh',data),
  post_fn_lay_tt_taodl_hdtt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtt',data),
  post_ht_nvtc_theodc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ht_nvtc_theodc',data),
  post_ht_nvtc_theodc_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ht_nvtc_theodc_v2',data),
  post_fn_lay_tt_taodl_hdtb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb',data),
  post_lay_huonggiao_tiepnhan : async (axios, data) => axios.post('/web-hopdong/hopdong/lay_huonggiao_tiepnhan',data),
  post_fn_lay_tt_taodl_diachi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_diachi',data),
  post_fn_kt_laytt_capnhat_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kt_laytt_capnhat_datmoi',data),
  post_fn_lay_ds_ht_capnhat_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_ds_ht_capnhat_datmoi',data),
  get_lay_ds_diachi_theo_hdtbid : async (axios, data) => axios.get('/web-thicong/thuebao/lay_ds_diachi_theo_hdtbid',data),
  post_fn_lay_tt_hdtb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_hdtb',data),
  post_fn_lay_tt_giaodien_dvi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_giaodien_dvi',data),
  // post_fn_lay_tt_giaodien_dvi : async (axios, data) => axios.post('/web-bancheo/tracuu/fn_lay_tt_giaodien_dvi',data),
  post_fn_lay_donvi_theo_loaidv_diachi_ld_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_donvi_theo_loaidv_diachi_ld_v2',data),
  post_lay_tien_khoanmuc_ld_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_tien_khoanmuc_ld_v2',data),
  post_fn_lay_tt_hdtt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_hdtt',data),
  post_sp_lay_nhanvien_ql : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_nhanvien_ql',data),
  post_ctkm_dvgt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ctkm_dvgt',data),
  post_fn_lay_cho_ht_thietbi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_cho_ht_thietbi',data),
  post_fn_hienthi_tt_morong : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_hienthi_tt_morong',data),
  post_fn_lay_tt_danhba : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_danhba_clob',data),
  post_fn_ins_update_hd_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_ins_update_hd_datmoi',data),
  post_fn_lay_tt_taodl_hdtb_cd : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb_cd',data),
  post_lay_dbtt_theo_matt_khid : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_dbtt_theo_matt_khid',data),
  post_fn_lay_tt_combo_loaikh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_combo_loaikh',data),
  post_lay_ds_nhanvien_ql_am_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_nhanvien_ql_am_v2',data),
  post_fn_lay_tt_nvql_am : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_nvql_am',data),
  post_lay_chitiet_km_dungthu_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_chitiet_km_dungthu_v2',data),
  post_fn_lay_tt_diachi_thanhtoan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_diachi_thanhtoan',data),
  post_lay_ds_tieunganh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_tieunganh',data),
  post_sp_lay_danhsach_tiencamket : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_danhsach_tiencamket',data),
  post_fn_them_hopdong_thuebao : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_them_hopdong_thuebao',data),
  post_fn_lay_tt_kt_xoa_hopdong : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_kt_xoa_hopdong',data),
  post_fn_xoa_hopdong_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_xoa_hopdong_datmoi',data),
  post_fn_kiemtra_xoa_thuebao : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kiemtra_xoa_thuebao',data),
  post_fn_xoa_thuebao_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_xoa_thuebao_datmoi',data),
  post_lay_ds_hopdong_tb_theo_hdkh_id : async (axios, data) => axios.post('/web-hopdong/khuyenmai_tocdo_internet/lay_ds_hopdong_tb_theo_hdkh_id',data),
  post_fn_lay_tt_th_diachi_ld  : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_th_diachi_ld',data),
  post_sp_lay_ds_tram_thicong_theo_donvi  : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_ds_tram_thicong_theo_donvi',data),
  post_lay_ds_tien_kmtt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_tien_kmtt',data),
  post_lay_khoanmuc_tt_theo_loaihd : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_khoanmuc_tt_theo_loaihd',data),
  post_sp_layds_tb_trung_dcld : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_layds_tb_trung_dcld',data),
  post_sp_lay_cong_van_theo_danh_sach_km : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_cong_van_theo_danh_sach_km',data),
  get_kiemTraThoiHanKM : async (axios, data) => axios.get('/web-tratruoc/hoanCongThuTienPS/kiemTraThoiHanKM',data),
  post_lay_ngaykt_km  : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ngaykt_km',data),
  post_fn_lay_thang_sd : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_thang_sd',data),
  // post_lay_ds_hopdong_tb_theo_hdtb_id : async (axios, data) => axios.post('/web-quantri/thutienphatsinh/lay_ds_hopdong_tb_theo_hdtb_id',data),
  post_lay_ds_hopdong_tb_theo_hdtb_id : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/lay_ds_hopdong_tb_theo_hdtb_id',data),
  post_fn_kiemtra_dl_thanhtoan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kiemtra_dl_thanhtoan',data),
  get_ds_hopdong_tt_theo_hdkh_id : async (axios, data) => axios.get('/web-tracuu/hopdong/ds_hopdong_tt_theo_hdkh_id',data),
  post_fn_them_hopdong_thanhtoan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_them_hopdong_thanhtoan',data),
  post_lay_ds_hopdong_tt_theo_hdtt_id : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_hopdong_tt_theo_hdtt_id',data),
  post_fn_xoa_hopdong_thanhtoan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_xoa_hopdong_thanhtoan',data),
  post_fn_lay_tt_load_dssochinh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_load_dssochinh',data),
  post_fn_lay_tt_chon_sm : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_chon_sm',data),
  post_sp_lay_thongtin_hdkh_tuvan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_thongtin_hdkh_tuvan',data),
  post_fn_lay_tt_matn_wan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_matn_wan',data),
  post_lay_ds_tram_bts : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_tram_bts',data),
  post_sp_ht_kv_cskh_theo_diaban : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_kv_cskh_theo_diaban',data),
  post_ds_huong_kn_vrf1 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ds_huong_kn_vrf1',data),
  post_ds_huong_kn_vrf2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ds_huong_kn_vrf2',data),
  post_sinh_malt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sinh_malt',data),
  post_fn_lay_tt_taodl_hdtb_mgwan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb_mgwan',data),
  post_fn_sinhma_dvvt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_sinhma_dvvt',data),
  post_sp_lay_ds_thietbi_dc_lhtb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_ds_thietbi_dc_lhtb',data),
  post_sp_ht_tocdo_fsecure : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_tocdo_fsecure',data),
  post_sp_ht_tocdo_adsl_theo_loaitb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_tocdo_adsl_theo_loaitb',data),
  post_tocdo_thuc_adsl_theo_tocdoid : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/tocdo_thuc_adsl_theo_tocdoid',data),
  post_lay_ds_thuebao_chinh : async (axios, data) => axios.post('/web-hopdong/thaydoithongtinkhuyenmai/lay_ds_thuebao_chinh',data),
  post_kiemtra_ma_toc_do_doi_tuong_khachhang_ut : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_ma_toc_do_doi_tuong_khachhang_ut',data),
  post_kiemtra_matb : async (axios, data) => axios.post('/web-hopdong/hopdong/kiemtra_matb',data),
  post_lookupRASAccount : async (axios, data) => axios.post('/tichhop/visa-app/lookupRASAccountOtherProvince',data),
  post_getSubscriberInfo : async (axios, data) => axios.post('/tichhop/vasc/getSubscriberInfoBC',data),
  post_fn_lay_tt_taodl_hdtb_adsl : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb_adsl',data),
  post_reserveRASAccount : async (axios, data) => axios.post('/tichhop/visa-app/reserveRASAccount',data),
  post_reReservedAccount : async (axios, data) => axios.post('/tichhop/visa-app/reReservedAccount',data),
  post_fn_lay_tt_mytv_vao_goigd : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_mytv_vao_goigd',data),
  post_sp_insert_hdtb_goi_dadv : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_insert_hdtb_goi_dadv',data),
  post_lay_tt_fs_kem_ftth_v2 : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_tt_fs_kem_ftth_v2',data),
  post_lay_danhsach_thuoctinh_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_danhsach_thuoctinh_datmoi',data),
  post_fn_lay_tt_taodl_hdtb_cntt_fs_kem : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb_cntt_fs_kem',data),
  post_fn_lay_thongtin_tc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_thongtin_tc',data),
  post_kiemtra_dungthu_mytv_moi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_dungthu_mytv_moi',data),
  post_unReservedAccount : async (axios, data) => axios.post('/tichhop/visa-app/unReservedAccount',data),
  post_kiemtra_vmp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_vmp',data),
  post_lay_tt_khuvuc_theo_thuebao_id : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_tt_khuvuc_theo_thuebao_id',data),
  post_huonggiao_ldv : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/huonggiao_ldv',data),
  post_lay_ds_thamso_md : async (axios, data) => axios.post('/web-quantri/khuyenmai/lay_ds_thamso_md',data),
  post_sp_tt_nhanvien : async (axios, data) => axios.post('/web-hopdong/laydulieu/sp_tt_nhanvien',data),
  post_sinh_matb_doitac : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sinh_matb_doitac',data),
  post_fn_hienthi_tt_diachi_tsl : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_hienthi_tt_diachi_tsl',data),
  post_ht_ds_tb_chinh_ims : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/ht_ds_tb_chinh_ims',data),
  post_fn_lay_tt_taodl_hdtb_ims : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_taodl_hdtb_ims',data),
  post_sp_ht_goicuoc_dd : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_ht_goicuoc_dd',data),
  post_fn_kiemtra_hdld_tbdd_tratruoc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kiemtra_hdld_tbdd_tratruoc',data),
  post_fn_lay_tt_ins_tbld_vnp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_ins_tbld_vnp',data),
  post_fn_lay_tt_hdld_vinaphone : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_hdld_vinaphone',data),
  post_log_action : async (axios, data) => axios.post('/web-tracuu/e_invoice_vtt/log_action',data),
  post_fn_lay_tt_update_hdld_vnp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_update_hdld_vnp',data),
  post_fn_lay_tt_update_tbld_vnp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_update_tbld_vnp',data),
  post_fn_lay_tt_update_hd_chuyentinh_vnp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_update_hd_chuyentinh_vnp',data),
  post_sp_huonggiao_runsql : async (axios, data) => axios.post('/web-danhba/huonggiao/sp_huonggiao_runsql',data),
  get_lay_dk_bang : async (axios, data) => axios.get('/web-ccdv/hoanthien-hs-tachnhap-tbao/lay_dk_bang',data),
  post_lay_thongso_kt_goicuoc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_thongso_kt_goicuoc',data),
  post_lay_ds_mucuoc_tb : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_mucuoc_tb',data),
  post_fn_lay_ds_dvgt_macdinh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_ds_dvgt_macdinh',data),
  post_ts_laphd_hoamangmoi_lay_ds_thuebao : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_lay_ds_thuebao',data),
  post_ts_laphd_chuyentinh_new_thuebao_cts : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_chuyentinh_new_thuebao_cts',data),
  post_ts_laphd_hoamangmoi_laphd : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_laphd',data),
  post_ts_laphd_hoamangmoi_themtb_mnp : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_themtb_mnp',data),
  post_ts_laphd_hoamangmoi_layds_cuocld : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_layds_cuocld',data),
  post_ts_laphd_hoamangmoi_xoa : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_xoa',data),
  post_ts_laphd_hoamangmoi_capnhat : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_capnhat',data),
  post_ts_laphd_hoamangmoi_capnhatthuebao : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_capnhatthuebao',data),
  post_ts_laphd_chuyentinh_laytt_tb : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_chuyentinh_laytt_tb',data),
  post_ts_laphd_chuyentinh_edit_thuebao_cts : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_chuyentinh_edit_thuebao_cts',data),
  post_ts_laphd_chuyentinh_del_thuebao_cts : async (axios, data) => axios.post('/ccbs/executor/ts_laphd_chuyentinh_del_thuebao_cts',data),
  post_lay_tt_goi_gdvp : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_tt_goi_gdvp',data),
  post_fn_lay_tt_tu_hd_b2a : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_tu_hd_b2a',data),
  post_lay_ds_thamso_md_mats : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_thamso_md_mats',data),
  post_delete_package_css : async (axios, data) => axios.post('/ccbs/gdvp/delete-package-css',data),
  post_kiemtra_thaydoi_km : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_thaydoi_km',data),
  post_lay_ds_phieu_chuatt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_phieu_chuatt',data),
  post_fn_sua_tt_khuyenmai : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_sua_tt_khuyenmai',data),
  post_sp_capnhat_tdtt_hd_thuebao : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_capnhat_tdtt_hd_thuebao',data),
  post_fn_lay_tt_capnhat_hddt_dc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_capnhat_hddt_dc',data),
  post_map_id : async (axios, data) => axios.post('/web-danhba/thamso/map_id',data),
  post_lay_ds_tinh_thicong_combobox : async (axios, data) => axios.post('/web-hopdong/bss_group1/lay_ds_tinh_thicong_combobox',data),
  post_lay_tinh_thi_cong : async (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_tinh_thi_cong',data),
  post_kiemtra_nhanvien_vti_khdn : async (axios, data) => axios.post('/web-bancheo/tracuu/kiemtra_nhanvien_vti_khdn',data),
  post_DS_TINH_THICONG : async (axios, data) => axios.post('/web-hopdong/TocDoMucCuoc/danhmuc_cn_tratruoc/DS_TINH_THICONG',data),
  post_lay_khachhangid_thicong : async (axios, data) => axios.post('/web-bancheo/tracuu/lay_khachhangid_thicong',data),
  post_get_key : async (axios, data) => axios.post('/web-bancheo/tracuu/get_key',data),
  post_kiemtra_thuebao_sd_madoicap : async (axios, data) => axios.post('/web-bancheo/tracuu/kiemtra_thuebao_sd_madoicap',data),
  post_bc_map_id : async (axios, data) => axios.post('/web-bancheo/tracuu/map_id',data),
  get_sinh_pass_random : async (axios, data, kieu) => axios.get('/web-hopdong/khoiphucthanhly/sinh_pass_random?kieu='+kieu,data),
  post_lay_thongtin_sl_ip_mp : async (axios, data) => axios.post('/web-bancheo/tracuu/lay_thongtin_sl_ip_mp',data),
  post_lay_ds_db_megawan_theo_tbid : async (axios, data) => axios.post('/web-bancheo/tracuu/lay_ds_db_megawan_theo_tbid',data),
  post_sinh_matb_bc : async (axios, data) => axios.post('/web-bancheo/tracuu/sinh_matb',data),
  post_sinh_malt_bc : async (axios, data) => axios.post('/web-bancheo/tracuu/sinh_malt',data),
  post_sinh_vfi_vrf_v2 : async (axios, data) => axios.post('/web-bancheo/tracuu/sinh_vfi_vrf_v2',data),
  post_sp_lay_ma_kh_web : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/sp_lay_ma_kh_web',data),
  post_tracuuno_khachhang : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/tracuuno_khachhang',data),
  post_sp_lay_doituong_tb : async (axios, data) => axios.post('/web-hopdong/tachnhapthuebao/sp_lay_doituong_tb',data),
  post_fn_kiemtra_ma_tb_thueso : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kiemtra_ma_tb_thueso',data),
  post_layhuonggiao_tiepnhan_v2 : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/layhuonggiao_tiepnhan_v2',data),
  get_kiemtra_matb_khoso : async (axios, data) => axios.get('/web-hopdong/chuyendich/kiemtra_matb_khoso',data),
  post_kiemtra_matb : async (axios, data) => axios.post('/web-hopdong/hopdong/kiemtra_matb',data),
  post_capnhat_khoso_v2 : async (axios, data) => axios.post('/web-hopdong/chuyendich/capnhat_khoso_v2',data),
  post_kiemtra_matb_khoso_ao : async (axios, data) => axios.post('/web-hopdong/thong-tin-kenh-trang/kiemtra_matb_khoso_ao',data),
  post_lay_ds_thuebao_theo_malt : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/lay_ds_thuebao_theo_malt',data),
  post_layhuonggiao_tiepnhan : async (axios, data) => axios.post('/web-bancheo/danhmuc/layhuonggiao_tiepnhan',data),
  post_kiemtra_matb_khoso : async (axios, data) => axios.post('/web-bancheo/tracuu/kiemtra_matb_khoso',data),
  post_fn_ins_update_hd_datmoi_bancheo : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/fn_ins_update_hd_datmoi_bancheo',data),
  get_lay_ds_hopdong_tb_theo_hdkh_id : async (axios, data) => axios.get('/web-hopdong/thanhly-thuebao-bancheo/lay_ds_hopdong_tb_theo_hdkh_id',data),
  get_lay_ds_hopdong_thanhtoan_theo_hdkh : async (axios, data) => axios.get('/web-hopdong/hopdong/lay_ds_hopdong_thanhtoan_theo_hdkh',data),
  post_kiemtra_dungthu_mytv_moi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_dungthu_mytv_moi',data),
  post_kiemtra_km_dt : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/kiemtra_km_dt',data),
  post_kiemtra_ma_tb_lap_hopdong_khac : async (axios, data) => axios.post('/web-hopdong/thaydoitocdoadsl/kiemtra_ma_tb_lap_hopdong_khac',data),
  post_kiemtra_update_thuebao : async (axios, data) => axios.get('/web-hopdong/hopdong/kiemtra_update_thuebao',data),
  post_fn_lay_ds_dvgt_macdinh_bc : async (axios, data) => axios.post('/web-bancheo/tracuu/lay_ds_thuebao_dichvu',data),
  post_fn_tt_hd_khachhang : async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_hd_khachhang',data),
  post_kiemtra_magd_bancheo : async (axios, data) => axios.post('/web-bancheo/tracuu/kiemtra_magd_bancheo',data),
  post_get_thuebao_kn_id : async (axios, data) => axios.post('/web-bancheo/tracuu/get_thuebao_kn_id',data),
  post_lay_tt_gan_thongso_bancheo_hdtb : async (axios, data) => axios.post('/web-hopdong/TocDoMucCuoc/lay_tt_gan_thongso_bancheo_hdtb',data),
  get_lay_thongtin_ds_hdtb_kieu_nt : async (axios, data) => axios.post('/web-hopdong/hopdong/lay_thongtin_ds_hdtb_kieu_nt',data),
  get_lay_thongtin_ds_hdtb_loaiip : async (axios, data) => axios.get('/web-hopdong/hopdong/lay_thongtin_ds_hdtb_loaiip',data),
  post_lay_diachi_theo_diachi_id : async (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/lay_diachi_theo_diachi_id',data),
  post_fn_lay_tt_hopdong_chuaht : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_hopdong_chuaht',data),
  post_xoa_hdtb_bc : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/xoa_hdtb_bc',data),
  post_get_thang_tien_ck : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/get_thang_tien_ck',data),
  post_fn_kiemtra_truoc_thanhtoan : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_kiemtra_truoc_thanhtoan',data),
  post_lay_ds_makh_theo_sogt : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_makh_theo_sogt',data),
  post_get_phanloai_dv : async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/get_phanloai_dv',data),
  post_get_app_config : async (axios, data) => axios.post('/web-hopdong/hopdong/get_app_config',data),
  kiemtra_thanhtoan_lh: async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_thanhtoan_lh',data),
  // post_lay_ds_donviql : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/lay_ds_donviql',data),
  post_lay_ds_donviql : async (axios, data) => axios.post('/web-bancheo/danhmuc/lay_ds_donviql',data),
  post_sp_lay_donvi_id : async (axios, data) => axios.post('/web-bancheo/danhmuc/sp_lay_donvi_id',data),
  post_sp_ht_donvi_ldv: async (axios, data) => axios.post('/web-bancheo/danhmuc/sp_ht_donvi_ldv',data),
  post_fn_lay_tt_dvi_daucuoi : async (axios, data) => axios.post('/web-bancheo/danhmuc/fn_lay_tt_dvi_daucuoi',data),
  post_fn_tt_kieu_ld : async (axios, data) => axios.post('/web-bancheo/tracuu/fn_tt_kieu_ld',data),
  post_kiemtra_khachhang_theo_mst: async (axios, data) => axios.post(`/web-tracuu/tracuu-thuebao/kiemtra_khachhang_theo_mst`,data),
  post_fn_lay_tt_them_thuebao_datmoi : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/fn_lay_tt_them_thuebao_datmoi',data),
  kiemtra_tao_hopdong_dungthu_v2: async (axios, data) => axios.post('/web-hopdong/thanhly-thuebao-bancheo/kiemtra_tao_hopdong_dungthu_v2',data),
  get_lay_tt_khdn_theo_makh:async (axios, data) => axios.get('/web-bancheo/khdn/lay_tt_khdn_theo_makh',data),
  get_fn_ktra_tocdo_dk_greennet: async (axios, data) => axios.get('/web-tracuu/hopdong/fn_ktra_tocdo_dk_greennet',data),
  post_sp_lay_cuoctk_cuoctc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_cuoctk_cuoctc',data),
  post_search_khtn : async (axios, data) => axios.post('/tichhop/khdn/search_khtn',data),
  post_getivan_tinh : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/getivan_tinh',data),
  // Bo sung phuc vu phan CNTT
  post_lay_ds_hdtb_cntt_theo_hdtb_id_bc : async (axios, data) => axios.post('/web-tracuu/tracuu-thuebao/lay_ds_hdtb_cntt_theo_hdtb_id_bc',data),
  post_tudong_tinhsothang_sd_theo_goicuoc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/tudong_tinhsothang_sd_theo_goicuoc',data),
  post_tudong_tinhthuoctinh_tocdo_adsl : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/tudong_tinhthuoctinh_tocdo_adsl',data),
  post_kiemtra_dichvu_tudong_thuoctinh_goicuoc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kiemtra_dichvu_tudong_thuoctinh_goicuoc',data),
  post_dt_tocdo_goicuoc : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/dt_tocdo_goicuoc',data),
  post_kt_chon_goicuoc_ca : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/kt_chon_goicuoc_ca',data),
  post_loaihinh_tb_edu_api : async (axios, data) => axios.post('/web-hopdong/lapdatmoi/loaihinh_tb_edu_api',data),
  get_tocdo_adsl: async (axios, data) => axios.get('/web-hopdong/lapdatmoi/tocdo_adsl',data),
  post_sp_lay_tt_theo_dvvt: async (axios, data) => axios.post('/web-hopdong/lapdatmoi/sp_lay_tt_theo_dvvt',data),

  post_ts_laphd_hoamangmoi_laytt_sosim: async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_laytt_sosim',data),
  post_ts_laphd_hoamangmoi_layds_loaitb: async (axios, data) => axios.post('/ccbs/executor/ts_laphd_hoamangmoi_layds_loaitb',data),
  post_ts_tracuu_laytt_tb: async (axios, data) => axios.post('/ccbs/tracuu/ts_tracuu_laytt_tb',data),
  post_ts_tracuu_laytt_tb_ts: async (axios, data) => axios.post('/ccbs/executor/ts_tracuu_laytt_tb_ts',data),
  post_sp_tt_goicuoc_dd: async (axios, data) => axios.post('/web-quantri/lay-dulieu/sp_tt_goicuoc_dd',data),
  
  post_fn_tt_dbkh_sub: async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_dbkh_sub', data),
  post_sinh_ma_nhom_hdtb_sub: async (axios, data) => axios.post('/web-bancheo/tracuu/sinh_ma_nhom_hdtb_sub', data),
  post_lay_ma_nhom_hnth: async (axios, data) => axios.post('/web-bancheo/tracuu/lay_ma_nhom_hnth', data),
  post_fn_tt_hdtb_sub:  async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_hdtb_sub', data),

  post_lay_ds_thuebao_dichvu_tocdo: async (axios, data) => axios.post('/web-hopdong/sua-tien-hop-dong/lay_ds_thuebao_dichvu_tocdo', data),
  post_sp_lay_ds_thuebao_dichvu_linhvuc: async (axios, data) => axios.post('/web-hopdong/thaydoidichvu/sp_lay_ds_thuebao_dichvu_linhvuc', data),
  post_lay_ds_thuebao_dichvu: async (axios, data) => axios.post('/web-hopdong/hopdong/lay_ds_thuebao_dichvu', data),
  post_lay_ds_thuebao_dichvu_bc: async (axios, data) => axios.post('/web-bancheo/tracuu/lay_ds_thuebao_dichvu', data),
}
