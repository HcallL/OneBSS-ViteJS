export default {
    CSS_DICHVU_VT: async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/CSS_DICHVU_VT', data,header),
    CSS_LOAIHINH_TB : async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/CSS_LOAIHINH_TB', data,header),
    ds_thamso_md : async (axios, data,header) => axios.get('/web-quantri/danhmuc/ds_thamso_md/0', data,header),
    CSS_KIEU_LD : async (axios, data,header) => axios.get('/web-quantri/danhmuc-chung/CSS_KIEU_LD', data,header),
    lay_danhba_theo_matb : async (axios, data,header) => axios.post('/web-danhba/chuanhoa_chuquan/lay_danhba_theo_matb', data,header),
    dstb_dk_goi_dadv_theo_hdkh : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/dstb_dk_goi_dadv_theo_hdkh', data, header),
    fn_kiemtra_goi_dadv_lhtb : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/fn_kiemtra_goi_dadv_lhtb', data, header),
    lay_ds_goi_cv_vnp_v1 : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/lay_ds_goi_cv_vnp_v1', data, header),
    sp_lay_mota_goidadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_lay_mota_goidadv', data, header),
    kiemtra_tb_dk_hths_goi_dadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/kiemtra_tb_dk_hths_goi_dadv', data, header),
    lay_ds_thamso : async (axios, data,header) => axios.get('/web-quantri/diaban_nvkd/lay_ds_thamso', data, header),
    lay_ds_goi_cv_vnp : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/lay_ds_goi_cv_vnp', data, header),
    sp_lay_tocdo_muccuoc_adsl : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_lay_tocdo_muccuoc_adsl', data, header),
    fn_kiemtra_goi_dadv_lhtb_1 : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/fn_kiemtra_goi_dadv_lhtb_1', data, header),
    lay_tt_dangky_k_addon : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/lay_tt_dangky_k_addon', data, header),
    lay_ds_hopdong_theo_matb : async (axios, data,header) => axios.post('/web-hopdong/hopdong/lay_ds_hopdong_theo_matb', data, header),

    kiemtra_makh_matt_magd : async (axios, data,header) => axios.post('/web-hopdong/hopdong/kiemtra_makh_matt_magd', data, header),
    kiemtra_dangky_goi_dadv : async (axios, data,header) => axios.post('/web-hopdong/hopdong/kiemtra_dangky_goi_dadv', data, header),
    kt_goi_dadv_hieuluc : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/kt_goi_dadv_hieuluc', data, header),
    kiemtra_dk_trunggoi : async (axios, data,header) => axios.post('/web-hopdong/hopdong/kiemtra_dk_trunggoi', data, header),
    sp_add_hdtb_goi_dadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_add_hdtb_goi_dadv', data, header),
    sp_update_hdtb_goidadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_update_hdtb_goidadv', data, header),
    tudong_gan_ctv_tinhluong_khdn : async (axios, data,header) => axios.post('/web-hopdong/hopdong/tudong_gan_ctv_tinhluong_khdn', data, header),
    //an toan thong tin
    fn_tt_nhanvien : async (axios, data,header) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_nhanvien', data, header),
    get_keys : async (axios, data,header) => axios.post('/web-ccdv/tien_trinh_bao_hong/get_keys', data, header),
    sinh_magd_v2 : async (axios, data,header) => axios.post('/web-hopdong/khoiphucthanhly/sinh_magd_v2', data, header),
    sinh_magd : async (axios, data,header) => axios.post('/web-hopdong/khoiphucthanhly/sinh_magd', data, header),
    layhuonggiao_tiepnhan_2 : async (axios, data,header) => axios.post('/web-hopdong/chuyendich/layhuonggiao_tiepnhan_2', data, header),
    sp_themmoi_hdtb_goidadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_themmoi_hdtb_goidadv', data, header),
    //sp_update_hdtb_goidadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_update_hdtb_goidadv', data, header),
    b2a_ht_phieucskhdv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/b2a_ht_phieucskhdv', data, header),
    lay_ds_hopdong_theo_ma_gd : async (axios, data,header) => axios.post('/web-hopdong/khoiphucthanhly/lay_ds_hopdong_theo_ma_gd', data, header),
    kiemtra_hdtb_khi_themmoi : async (axios, data,header) => axios.post('/web-hopdong/hopdong/kiemtra_hdtb_khi_themmoi', data, header),
    xoa_hopdong : async (axios, data,header) => axios.post('/web-hopdong/hopdong/khoa_mo_thuebao_no_cuoc/xoa_hopdong', data, header),

    fn_kiemtra_add_hdtb_goidadv : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/fn_kiemtra_add_hdtb_goidadv', data, header),

    changePlanId : async (axios, data,header) => axios.post('/tichhop/visa-app/changePlanId', data, header),
    registKplus : async (axios, data,header) => axios.post('/tichhop/visa-app/changePlanId', data, header),
    registAddOn : async (axios, data,header) => axios.post('/tichhop/vasc/registAddOn', data, header),
    sp_capnhat_trangthai_nhieu_hdtb : async (axios, data,header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_capnhat_trangthai_nhieu_hdtb', data, header),
    Lay_goivasc_goi_dadv : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/lay_tt_dangky_k_addon', data, header),

    lay_ds_goi_mytvtitan : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/lay_ds_goi_mytvtitan', data, header),
    fn_tt_tocdo_adsl_v2 : async (axios, data,header) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_tocdo_adsl_v2', data, header),

    changeMegaVNN : async (axios, data,header) => axios.post('/tichhop/vasc/changeMegaVNN', data, header),
    get_app_config : async (axios, data,header) => axios.post('/web-hopdong/hopdong/get_app_config', data, header),

    sp_lay_ds_thamso_md_mats : async (axios, data,header) => axios.post('/web-quantri/diaban-nvkt/sp_lay_ds_thamso_md_mats', data, header),
    xoa_hdtb : async (axios, data,header) => axios.post('/web-hopdong/khoiphucthanhly/xoa_hdtb', data, header),
    fn_hoanthien_hoso : async (axios, data,header) => axios.post('/web-hopdong/goi-da-dichvu/fn_hoanthien_hoso', data, header),

    sp_giahan_kplus_p1 : async (axios, data, header) => axios.post('/web-hopdong/dk_goi_dadichvu/sp_giahan_kplus_p1', data, header),
    giahan_goi_dadv_kplus : async (axios, data, header) => axios.post('/web-hopdong/dk_goi_dadichvu/giahan_goi_dadv_kplus', data, header),
    lay_sl_theo_goi_id : async (axios, data, header) => axios.get('/web-hopdong/hopdong/lay_sl_theo_goi_id', data, header),
}   
    