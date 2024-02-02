export default {
  get_danhsach_tinh: (axios) => axios.get('/web-quantri/danhmuc-chung/CSS_TINH'),
  get_danhsach_nganhang: (axios) => axios.post('/web-quantri/donvi/SP_GETBANKS', {}),
  get_donvi: (axios, data) => axios.post('/web-quantri/donvi/SP_GETDONVI', data),
  get_loai_don_vi: (axios, data) => axios.post('/web-quantri/donvi/SP_HIENTHI_LOAIDV', data),
  getDonViTreeView: (axios) => axios.get('/web-quantri/danhmuc-chung/ADMIN_DONVI'),
  SP_GIAOSIM_GET_TREEVIEW: (axios, data) => axios.post('/web-quantri/donvi/SP_GIAOSIM_GET_TREEVIEW', data),
  check_ma_don_vi: (axios, data) => axios.post('/web-quantri/donvi/FN_CHECK_MA_DV', data),
  deleteDonVi: (axios, data) => axios.post('web-quantri/donvi/SP_XOA_DON_VI', data),
  loadCbb_ChucDanh: (axios) => axios.get('/web-quantri/vitrinhanvien/ds_chucdanh'),
  SP_DONVI_VTRI_LAYDS: (axios, data) => axios.post('/web-quantri/donvi/SP_DONVI_VTRI_LAYDS', data),
  SP_DONVI_VTRI_GHILAI: (axios, data) => axios.post('/web-quantri/donvi/SP_DONVI_VTRI_GHILAI', data),
  saveOrUpdate: (axios, data) => axios.post('/web-quantri/donvi/SP_INSERT_OR_UPDATE_DONVI', data),
  SP_DONVI_LCT_NAPDULIEU: (axios, data) => axios.post('/web-quantri/donvi/SP_DONVI_LCT_NAPDULIEU', data),
  SP_DONVI_LCT_CAPNHAT: (axios, data) => axios.post('/web-quantri/donvi/SP_DONVI_LCT_CAPNHAT', data),
  CAPNHAT_LOG_DONVI_LDV_JSON: (axios, data) => axios.post('/web-quantri/donvi/CAPNHAT_LOG_DONVI_LDV_JSON', data),
  sp_lay_ds_donvi_donvicha: (axios, req) => axios.post('/web-quantri/donvi/SP_LAY_DS_DONVI_DONVICHA', req),
  FN_TT_DONVI: (axios, req) => axios.post('/web-tratruoc/thongtin_tratruoc_dn/fn_tt_donvi', req)
}
