export default {
    lay_ds_dichvu: async (axios) => axios.post('/web-thicong/hths-dangky-multisim/lay_ds_dichvu'),
    tt_ts_get_tb_esim: async (axios, data) => axios.post('/ccbs/executor/tt_ts_get_tb_esim', data),
    lay_ds_hths_multisim: async (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/lay_ds_hths_multisim', data),
    Lay_ds_hopdong_theo_ma_gd: (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/lay_ds_hopdong_theo_ma_gd', data),
    lay_ds_hdtb_thaydoi_sosim: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/lay_ds_hdtb_thaydoi_sosim', data),
    fn_tt_tinh: (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_tinh', data),
    ts_tracuu_laytt_tb: (axios, data) => axios.post('/ccbs/tracuu/ts_tracuu_laytt_tb', data),
    lay_loaihinh_tbdatmoi: async (axios,data) =>axios.get('/web-thicong/hths-dangky-multisim/lay_loaihinh_tbdatmoi?vdichvuvt_id='+data.vdichvuvt_id),
    Lay_ds_hopdong_tb_theo_hdkh_id: (axios, data) => axios.post('/web-hopdong/khuyenmai_tocdo_internet/lay_ds_hopdong_tb_theo_hdkh_id', data),
    getDmKieuYC: async (axios, data) => axios.get(`web-hopdong/danhmuc/ds_kieu_ld/${data.loaihd_id}/${data.loaitb_id}`, data),
    lay_tien_hd_km_theo_hdtb: async (axios, data) => axios.get(`web-hopdong/hoanthien-hs-doisim/lay_tien_hd_km_theo_hdtb/${data.hdtb_id}`, data),
    fn_tt_hdtb_multisim: (axios, data) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_hdtb_multisim', data),
    capnhat_hdtb_status: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/capnhat_hdtb_status', data),
    lay_ds_hdtb_multisim: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/lay_ds_hdtb_multisim', data),
    multisim_dichvu_tt_thuebao: (axios, data) => axios.post('/ccbs/multisim/multisim_ds_thuebao', data),
    Lay_ds_hopdong_theo_ma_tb: (axios, data) => axios.post('/web-hopdong/khoiphucthanhly/lay_ds_hopdong_theo_ma_tb', data),
    multisim_tt_thuebao: (axios, data) => axios.post('/ccbs/executor/multisim_tt_thuebao', data),
    multisim_doisim_ttsimcu: (axios, data) => axios.post('/ccbs/executor/multisim_doisim_ttsimcu', data),
    multisim_dichvu_khoitaosim: (axios, data) => axios.post('/ccbs/executor/multisim_dichvu_khoitaosim', data),
    multisim_dichvu_kt_thuebao: (axios, data) => axios.post('/ccbs/executor/multisim_dichvu_kt_thuebao', data),
    capnhat_hdtb_multisim_da_khoitao: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/capnhat_hdtb_multisim_da_khoitao', data),
    multisim_dichvu_huysim: (axios, data) => axios.post('/web-hopdong/hopdong/fn_didong', { vinput : data, vtype: 5, vhdtb_id: data.hdtb_id }),
    capnhat_hdtb_trangthaihd: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/capnhat_hdtb_trangthaihd', data),
    capnhat_giaophieu_ttph: (axios, data) => axios.post('/web-thicong/hths-dangky-multisim/capnhat_giaophieu_ttph', data),
    getTTDanhBa_MaTB:async (axios, data) => axios.post('/web-hopdong/hopdong/lay_danhba_theo_matb', data),

}
