export default {
  ht_kieu_ld_combobox: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/ht_kieu_ld_combobox", data),
  get_map_id: (axios, data) =>
    axios.post("/web-hopdong/thongtin_tratruoc_dn/map_id", data),
  load_dm_tocdo_adsl: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/load_dm_tocdo_adsl", data),
  load_dm_tocdo_adsl_dc: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/load_dm_tocdo_adsl_dc", data),
  formload_frmtocdomuccuoc: (axios, data) =>
    axios.post("/web-hopdong/TocDoMucCuoc/formload_frmtocdomuccuoc", data),
  ht_loai_tb_lhtb_combobox: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/ht_loai_tb_lhtb_combobox", data),
  load_dm_doi_tuong: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/load_dm_doi_tuong", data),
  load_dm_trang_bi: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/load_dm_trang_bi", data),
  lay_diachi_dbtb_bancheo: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/lay_diachi_dbtb_bancheo", data),
  lay_ds_muccuoc_tb_ban_frmtocdomuccuoc: (axios, data) =>
    axios.post(
      "/web-hopdong/TocDoMucCuoc/lay_ds_muccuoc_tb_ban_frmtocdomuccuoc",
      data
    ),
  lay_ds_mucuoc_tb_v2: (axios, data) =>
    axios.post("/web-bancheo/tracuu/lay_ds_mucuoc_tb_v2", data),
  lay_ds_mucuoc_tb: (axios, data) =>
    axios.post("/web-bancheo/tracuu/lay_ds_mucuoc_tb", data),
  ht_tocdo_thuc_adsl_theo_tocdo_id: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/ht_tocdo_thuc_adsl_theo_tocdo_id", data),
  laydmtocdotinhtctheomatocdo: (axios, data) =>
    axios.post("/web-bancheo/danhmuc/laydmtocdotinhtctheomatocdo", data),
  laydmtocdotinhtctheomatocdo_dc: (axios, data) =>
    axios.post(
      "/web-hopdong/chuyen-dich-ban-cheo/laydmtocdotinhtctheomatocdo_dc",
      data
    ),
  check_map_id: (axios, data) => axios.post("/web-bancheo/tracuu/map_id", data),
  fn_tt_loaihinh_tb: (axios, data) =>
    axios.post("/web-tratruoc/thongtin_tratruoc_dn/fn_tt_loaihinh_tb", data),
  fn_tt_kieu_ld: (axios, data) =>
    axios.post("/web-tratruoc/thongtin_tratruoc_dn/fn_tt_kieu_ld", data)
};
