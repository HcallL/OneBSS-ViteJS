import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

const state = {
  listLoaiHDvaPL: [],
  listDMDichVu: [],
  listDMNhanVien: [],
  listDMKho: [],
  listDMKieuTB: [],
  listDMTinhTrangTBCap: [],
  listDMLyDoTon: [],
  listDMLyDoCap: [],
  listDMTrangBi: [],
  listDMMucDichLyDo: [],
  listDMTenThietBi: [],
  listQuyenNguoiDungCVTTB: [],
  listThueBaoCapVT: [],
  listThueBaoCapVTTruyenSoLieu: [],
  listDMThaoTac: [],
  listDMTinhTrangVTThuHoi: [],
  DSVatTuDaCap: [],
  DSVatTuThueBaoSuDung: [],
  DSVatTuTrongKho: [],
  kiemTraHuyPhieuGiao: "",
  ngayBatDauDungThu: [],
  themMoiPhieuCapVT: "",
  keyDKVTMuaSam: "",
  DSNhanVienTheoID: [],
  deleteLichSuVTStatus: "",
  KTTTHongVT: "",
  KTDinhMuc: [],
  KIEMTRA_VTCAPRA_V2: [],
  KIEMTRA_VTDACAPTB: [],
  DSThamSoMacDinh: [],
  listTBSuDungVT: [],
  statusTBDaCapTheoSerial: [],
  statusKTSoLuongVTTBDangSD: [],
  statusCapNhatSuDungVT_TH: "",
  soLuong_DD: "",
  soluong_HT: "",
  statusCAPNHAT_PHIEUVT_THUHOI: "",
  thamSoMacDinh: "",
  mAP_ID: [],
  kiemTraMaTBCoTonTai: "",
  value_LAY_PORT_THEO_TBID: [],
  value_LAY_DS_PORT_THEOHD_TB: [],
  infoTamUngVT: [],
  value_ht_phieu_kkhongvt: "",
  value_KT_TB_DA_ThuHoiVT: [],
  value_KT_TB_BaoHong_DA_ThuHoiVT: [],
  giaTriDoKiem: "",
  thongTinPhieuCapVTTB: "",
  thongTinPhieuCapVTTB_BaoHong: "",
  value_KT_SR_GPON: "",
  value_TT_ONT_Theo_Account: [],
  value_deleteLyDo: "",
  value_ThongTinModemCTS: [],
  value_GIAOPHIEU_TD_TAOPHIEU_QLVT: "",
  value_updateCTS: "",
  value_TaoDL_Ton_Khong_ThuHoi_Duoc: "",
  value_UpdateKQGiaoPhieu: "",
  themMoiDSPhieuTon: "",
  value_kt_thuhoi_khongvt: "",
  value_DSTheoSerialOrSoAcc: {},
  value_taoDL_Ton_Khong_ThuHoi_Duoc: "",
  valueDSLoaiHopDongMucDich: [],
  value_ParamsBaoCao: [],
  value_BtnCapVatTu: []
};

const namespaced = true;

export const capvattuthuebao = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
