export default {
	LAY_DS_THAMSO_MD: async (axios, param) => axios.get(`/web-quantri/danhmuc/ds_thamso_md/${param}`),
	getds_tienkhoanmuc_loaihd: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_ds_tienkhoanmuc_loaihd', data),
	getds_dvvt_lapmoi: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_ds_dvvt_lapmoi', data),
	getds_tocdo_loaidv: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_ds_tocdo_loaidv', data),
	getds_loaihinhtb_loaidv: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_ds_loaihinhtb_loaidv', data),
	getds_hopdong_theo_ma_tb: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/lay_ds_hopdong_theo_ma_tb', data),
	getNhanvien_nvID: async (axios, nhanvien_id) => axios.get(`/web-hopdong/danhmuc/lay_thongtin_nhanvien/${nhanvien_id}`),
	getThongTinDBTBCNTT: async (axios, data) => axios.post('/web-hopdong/dichvu-ca/lay_ds_db_cntt_theo_tbid', data),
	getds_hdtb_tt_theo_hdkh: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/lay_ds_hdtb_tt_theo_hdkh', data),
	getds_db_matb: async (axios, data) => axios.post('/web-hopdong/tracu-danhba/LAY_DANHBA_THEO_MATB', data),
	getDSDiaChi_DBTBID: async (axios, data) => axios.post('/web-hopdong/dichvu-ca/lay_ds_diachi_theo_dbtbid', data),
	getdsdb_dichvu_thuebao: async (axios, data) => axios.get(`/web-tracuu/danhba/lay_ds_danhba_theo_dichvu_va_thuebao?thuebaoId=${data.thuebao_id}&dichvuvtId=${data.dichvuvt_id}`),
	getds_khuyenmai_hdtb: async (axios, data) => axios.post('/web-hopdong/khuyenmai_tocdo_internet/lay_khuyenmai_hdtb', data),
	getds_hopdong_magd: async (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_ds_hopdong_theo_ma_gd', data),
	getds_trangthaihd: async (axios, nhanvien_id) => axios.get(`/web-tracuu/danhmuc/trangthai_hd`),
	getchitiet_dc_hdtb_id: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/lay_chitiet_dc_theo_hdtb_id', data),
	gettienhd_km_theo_hdtb: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_Lay_tienhd_km_theo_hdtb', data),
	getThongTinHDTBCNTT: async (axios, data) => axios.post('/web-hopdong/dichvu-ca/lay_ds_hdtb_cntt_theo_hdtb_id', data),
	getKey: async (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/get_keys', data),
	GetKeyFacade_getKey: async (axios, data) => axios.post('/web-hopdong/goi-da-dichvu/get_keys', data),
	sinh_magd: async (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/sinh_magd', data),
	sinh_magd_v2: async (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/sinh_magd_v2', data),
	LayHuongGiao_TiepNhan: async (axios, data) => axios.post('/web-hopdong/hopdong/lay_huonggiao_tiepnhan', data),
	kiemtra_thoihan_khuyenmai: async (axios, data) => axios.post('/web-hopdong/thaydoithongtinkhuyenmai/kiemtra_thoihan_khuyenmai', data),
	post_lay_ngaykt_km: async (axios, khuyenmai_id) => axios.get(`/web-hopdong/HoanCongThuTienPhatSinh/fn_lay_ngay_kt_khuyenmai?p_khuyenmai_id_tt=${khuyenmai_id}`),
	LAY_DS_THAMSO_MD_MATS: async (axios, data) => axios.post(`/web-hopdong/thanhly/lay_thamso_macdinh?ma_ts=${data}`),
	// xoa_hdkh_v2: async (axios, data) => axios.post('/web-hopdong/hopdong/xoa_hdkh_v2', data),
	update_thuebao_datcoc: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/sp_thuebao_datcoc_update', data),
	xoa_hdtb: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/xoa_hdtb', data),
	fn_tsbtncapnhatdb_frmthuebao_datcoc: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/fn_tsbtncapnhatdb_frmthuebao_datcoc', data),
	kiemtra_km_2731: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/kiemtra_km_2731', data),
	log_action: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/log_action', data),
	STB_PROM_Register: async (axios, data) => axios.post('/tichhop/vasc/sTB_PROM_Register', data),
	STB_PROM_Active: async (axios, data) => axios.post('/tichhop/vasc/sTB_PROM_Active', data),
	kiemtra_dk_goidadv: async (axios, hdkh_id) => axios.get(`/web-hopdong/thaydoithongtinkhuyenmai/kiemtra_dk_goidadv?hdkh_id=${hdkh_id}`),
	fn_tt_loaihinh_tb: async (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_loaihinh_tb', data),
	lay_chitiet_datcoc: async (axios, data) => axios.post('/web-hopdong/thuebao_datcoc_thunghiem/lay_chitiet_datcoc', data),
	lay_ds_sudung_dvgt: async (axios, data) => axios.post('/web-quantri/thongsone/sp_lay_ds_sudung_dvgt', data),
	

	sp_load_KieuLD: async (axios) => axios.get(`/web-hopdong/datcoc-tratruoc/loadKieuLD`),
	layhuonggiao_tiepnhan: async (axios, data) => axios.post('/web-hopdong/goi-da-dichvu/sp_layhuonggiao_tiepnhan', data),
	sp_lay_tienkhoanmuc_loaihd: async (axios, data) => axios.post('/web-hopdong/tachnhapthuebao/sp_lay_tienkhoanmuc_loaihd', data),
	sp_lay_dl_dichvuvt: async (axios, nhanvien_id) => axios.get(`/web-hopdong/datcoc-tratruoc/sp_lay_dl_dichvuvt`),
	map_id_dk_tratruoc: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/fn_map_id_dk_tratruoc', data),
	sp_lay_tocdo_internet_theo_dv_id: async (axios, dichvuvt_id) => axios.get(`/web-hopdong/datcoc-tratruoc/lay_tocdo_internet_theo_dv_id?dichvuvt_id=${dichvuvt_id}`),
	sp_lay_ds_hdtb_tratruoc_theo_hdkh_id: async (axios, hdkh_id) => axios.get(`/web-hopdong/datcoc-tratruoc/lay_ds_hdtb_tratruoc_theo_hdkh_id?vhdkh_id=${hdkh_id}`),
	kiemtra_dulieu_thuebao_hopdong: async (axios, thuebao_id) => axios.get(`/web-hopdong/datcoc-tratruoc/kiemtra_dulieu_thuebao_hopdong?p_thuebao_id=${thuebao_id}`),
	sp_lay_danhba_theo_matb: async (axios, data) => axios.post('/web-hopdong/thongtin_tratruoc_dn/lay_danhba_theo_matb', { 
		"in_ma_tb":  data.in_ma_tb, 
		"in_dichvuvt_id": data.in_dichvuvt_id, 
		"in_donvi_dl_id": data.in_donvi_dl_id }),
	sp_lay_ds_diachi_theo_dbtbid: async (axios, data) => axios.post('/web-hopdong/dichvu-ca/lay_ds_diachi_theo_dbtbid', data),
	sp_lay_ds_hopdong_theo_ma_tb: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/lay_ds_hopdong_theo_ma_tb', data),
	sp_lay_ds_datcoc_theo_tbid: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/lay_ds_datcoc_theo_tbid', data),
	sp_check_chuahoa_cntt: async (axios, data) => axios.post('/web-hopdong/chuyendich/check_chuahoa_cntt', data),
	lay_danhsach_khuvuc_theo_thuebao_id: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/lay_danhsach_khuvuc_theo_thuebao_id', data),
	xoa_hdkh_v2: async (axios, input) => axios.post(`/web-hopdong/chuyendich/xoa_hdkh_v2?hdkh_id=${input.vhdkh_id}&loaihd_id=${input.vloaihd_id}`),
	sp_themmoi_thuebao_tratruoc: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/sp_themmoi_thuebao_tratruoc', data),
	sp_capnhat_thuebao_tratruoc: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/sp_capnhat_thuebao_tratruoc', data),
	sp_kiemtra_loaitb_id_db_thuebao: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/fn_kiemtra_loaitb_id_db_thuebao', data),
	sp_tracuuno_thuebao: async (axios, thuebao_id) => axios.get(`/web-hopdong/datcoc-tratruoc/tracuuno_thuebao?vthuebao_id=${thuebao_id}`),
	sp_kiemtra_tb_datcoc: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/fn_kiemtra_tb_datcoc', data),
	sp_kiemtra_datcoc_tyle_km_v1: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/kiemtra_datcoc_tyle_km_v1', data),
	kiemtra_km_2731_v2: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/kiemtra_km_2731_v2', data),
	lay_du_lieu_bao_cao: async (axios, baocao_id) => axios.get(`/web-hopdong/datcoc-tratruoc/lay_du_lieu_bao_cao?p_baocao_id=${baocao_id}`),
	sp_xoa_hdtb_datcoc_hienhuu: async (axios, data) => axios.post('/web-hopdong/datcoc-tratruoc/xoa_hdtb_datcoc_hienhuu', data),
	xoa_hdkd_v2: async (axios, data) => axios.post('/web-hopdong/xoa_hdkd_v2', data),
	lay_tt_chuyenquyen_theo_tbid: async (axios, baocao_id) => axios.get(`/web-hopdong/chuyendich/lay_tt_chuyenquyen_theo_tbid?thuebao_id${thuebao_id}`),

}
