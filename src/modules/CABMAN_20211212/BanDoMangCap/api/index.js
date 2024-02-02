export default function(RequestContext) {
  return {
    api_get_ds_ttvt: data =>
      RequestContext.post("/web-ecms/danhmuc/layDsTTVTTheoNVTrongToken"),
    // RequestContext.post(
    //   '/web-ecms/danhmuc/layDsTTVTTrongToken'
    // ),
    // RequestContext.post("/web-cabman/ban-do-mang-cap/execute1", {
    //   P_PHANVUNG_ID: data,
    //   PROCEDURE_NAME: "CABMAN.PKG_SINHDN.SP_LAY_DS_TTVT_THEO_PV"
    // }),

    api_get_ds_tokt: data =>
      RequestContext.post(
        "/web-ecms/danhmuc/layDsToKTTheoNVTrongTokenVaDonVi",
        { id: data }
      ),
    // RequestContext.post("/web-ecms/danhmuc/layDsToKT", { id: data }),
    // RequestContext.post("/web-cabman/ban-do-mang-cap/execute1", {
    //   P_PHANVUNG_ID: data.P_PHANVUNG_ID,
    //   P_DONVI_ID: data.P_DONVI_ID,
    //   PROCEDURE_NAME: "CABMAN.PKG_SINHDN.SP_LAY_DS_TOKT_THEO_DV"
    // }),
    api_get_ds_tram: data =>
      RequestContext.post("/web-ecms/danhmuc/layDsVeTinhTheoToQl", {
        id: data
      }),
    // RequestContext.post("/web-cabman/ban-do-mang-cap/execute1", {
    //   P_PHANVUNG_ID: data.P_PHANVUNG_ID,
    //   P_DONVI_ID: data.P_TOQL_ID,
    //   PROCEDURE_NAME: "CABMAN.PKG_SINHDN.SP_DS_TRAMTBI_THEO_TOQL"
    // }),
    api_get_ds_cap: data =>
      RequestContext.get("/web-cabman/ban-do-mang-cap/danh-sach-cap", {
        donvi_id: data.donvi_id,
        nhomlc_id: data.nhomlc_id
      }),
    api_get_ds_ketcuoi_chua_nhapcap: cap_id =>
      RequestContext.get(
        `/web-cabman/ban-do-mang-cap/ketcuoi-chua-nhap-cap/${cap_id}`
      ),
    api_get_gian_do_cap: cap_id =>
      RequestContext.get(`/web-cabman/ban-do-mang-cap/gian-do-cap/${cap_id}`),
    api_set_toado_doituong: data =>
      RequestContext.post(
        "/web-cabman/ban-do-mang-cap/cap-nhat-toado-doituong",
        data
      ),
    api_set_toado_cap: data =>
      RequestContext.post(
        "/web-cabman/ban-do-mang-cap/cap-nhat-toado-cap",
        data
      ),
    api_set_xoa_cap: data =>
      RequestContext.post(
        `/web-cabman/ban-do-mang-cap/xoa-cap?cap_id=${data.cap_id}&xoa_batbuoc=${data.xoa_batbuoc}`
      ),
    api_set_xoa_cap_midspan: data =>
      RequestContext.post(
        `/web-cabman/ban-do-mang-cap/xoa-cap-midspan?cap_id=${data.cap_id}&midspan_id=${data.midspan_id}`
      ),
    api_set_xoa_ketcuoi: data =>
      RequestContext.post(
        `/web-cabman/ban-do-mang-cap/xoa-ketcuoi?ketcuoi_id=${data.ketcuoi_id}&xoa_batbuoc=${data.xoa_batbuoc}`
      ),
    api_set_daochieu_cap: data =>
      RequestContext.post(
        `/web-cabman/ban-do-mang-cap/dao-chieu-cap/${data.cap_id}`
      ),
    api_set_chen_ketcuoi: data =>
      RequestContext.post(
        `/web-cabman/ban-do-mang-cap/chen-ket-cuoi?cap_id=${data.cap_id}&ketcuoi_id=${data.ketcuoi_id}&dodaicap1=${data.dodaicap1}&dodaicap2=${data.dodaicap2}`
      )
  };
}
