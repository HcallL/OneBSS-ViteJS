<template src="./index.template.html"></template>
<script>
import xlsx from "xlsx";
import DateTimeLib from "../../../utils/DateTimeLib";
import { Sort, Filter, ExcelExport } from "@syncfusion/ej2-vue-grids";
import FormDiaChi from "../nhap-cot-doancong-becap-theofile/DiaChi/FormDiaChi.vue";
import RowCotTemplate from "../nhap-cot-doancong-becap-theofile/RowTemplate/cot.vue";
import RowCongTemplate from "../nhap-cot-doancong-becap-theofile/RowTemplate/cong.vue";
import RowBeTemplate from "../nhap-cot-doancong-becap-theofile/RowTemplate/be.vue";
import FormToaDo from "../nhap-cot-doancong-becap-theofile/ToaDo/FormToaDo.vue";
import { L10n } from "@syncfusion/ej2-base";
L10n.load({
  "vi-VN": {
    grid: {
      EmptyRecord: "Không có bản ghi nào để hiển thị",
      Item: "Bản ghi",
      Items: "Bản ghi",
      FilterbarTitle: "",
    },
  },
});
export default {
  provide: {
    grid: [Sort, Filter, ExcelExport],
  },
  components: {
    FormDiaChi,
    FormToaDo,
  },
  data: function () {
    return {
      dsCot: [],
      danhSachCot: [],
      dsCong: [],
      danhSachCong: [],
      dsBe: [],
      danhSachBe: [],
      fileExcel: null,
      dsLoaiBe: null,
      dsViTri: null,
      dsHuongTamDan: null,
      dsLoaiDuong: null,
      dsLoaiCong: null,
      dsLoaiCot: null,
      dsChuQuan: null,
      dsKieuCot: null,
      dsTTSD: null,
      dsDuAn: null,
      rowTemplateCotOption: function (e) {
        return {
          template: RowCotTemplate,
        };
      },
      rowTemplateCongOption: function (e) {
        return {
          template: RowCongTemplate,
        };
      },
      rowTemplateBeOption: function (e) {
        return {
          template: RowBeTemplate,
        };
      },
      currentData: null,
      doiTuongCap: "COT",
    };
  },
  computed: {
    enabledThucThi: function () {
      if (this.doiTuongCap == "COT") {
        if (!(this.danhSachCot == null || this.danhSachCot.length == 0)) {
          return this.danhSachCot.length > 0;
        }
        return false;
      }
      if (this.doiTuongCap == "CONG") {
        if (!(this.danhSachCong == null || this.danhSachCong.length == 0)) {
          return this.danhSachCong.length > 0;
        }
        return false;
      } else {
        if (!(this.danhSachBe == null || this.danhSachBe.length == 0)) {
          return this.danhSachBe.length > 0;
        }
        return false;
      }
    },
  },
  watch: {
    fileExcel: async function (value) {
      await this.buttonReadFile_Click();
    },
  },
  methods: {
    linkTaiFileMau_Click: function () {
      window.location.href = "/static/files/MauFile_Update_Cot_Cong_Be.xlsx";
    },
    convertToDsCotItems: async function () {
      let r = [];
      if (this.dsCot != null) {
        let dsID_EXCEL = [];
        let dsSO_HIEU_EXCEL = [];
        for (let j = 0; j < this.dsCot.length; j++) {
          const cot = this.dsCot[j];
          if (!(this.isNullOrEmpty(cot.A) || dsID_EXCEL.includes(cot.A))) {
            dsID_EXCEL.push(cot.A);
          }
          if (!(this.isNullOrEmpty(cot.B) || dsSO_HIEU_EXCEL.includes(cot.B))) {
            dsSO_HIEU_EXCEL.push(cot.B);
          }
        }
        if (
          dsID_EXCEL.length == this.dsCot.length ||
          dsSO_HIEU_EXCEL.length == this.dsCot.length
        ) {
          let dsItemUpdate = [];
          let useID = false;
          if (dsID_EXCEL.length == this.dsCot.length) {
            dsItemUpdate = await this.getDsCotUpdate(0, dsID_EXCEL);
            useID = true;
          } else {
            dsItemUpdate = await this.getDsCotUpdate(1, dsSO_HIEU_EXCEL);
          }
          for (let i = 0; i < this.dsCot.length; i++) {
            let currentItem = null;
            if (useID)
              currentItem = dsItemUpdate.find(
                (x) => x.COT_ID == this.dsCot[i].A
              );
            else
              currentItem = dsItemUpdate.find(
                (x) => x.SO_HIEU == this.dsCot[i].B
              );
            if (!(currentItem == null || currentItem == undefined)) {
              let v = await this.convertToCotItem(this.dsCot[i], currentItem);
              v.STT = i + 1;
              r.push(v);
            }
          }
        } else {
          this.$root.toastError(
            "Trường cột id hoặc số hiệu cột đang bị thiếu dữ liệu. \nVui lòng bổ sung và thử lại."
          );
        }
      }
      return r;
    },
    convertToCotItem: async function (dataItem, currentItem) {
      // A: 'Cột ID'
      // B: 'Số hiệu'
      // C: 'Tên cột'
      // D: 'Độ cao'
      // E: 'Địa chỉ'
      // F: 'Tuyến cột'
      // G: 'Ngày lắp đặt'
      // H: 'Ngày sử dụng'
      // I: 'Loại cột'
      // J: 'Kiểu cột'
      // K: 'Cột sau'
      // L: 'Khoảng cách cột sau'
      // M: 'Trạng thái sử dụng'
      // N: 'Tổ kỹ thuật quản lý'
      // O: 'Chủ quản'
      // P: 'Kinh độ'
      // Q: 'Vĩ độ'
      // R: 'Dự án'
      // S: 'Tài sản'
      let msg = {};
      let kinhDo = 0;
      if (!this.isNullOrEmpty(dataItem.P)) {
        if (!this.validateDouble(dataItem.P)) {
          //msg += "<div>Vui lòng nhập đúng định dạng kinh độ (số thực)</div>";
        } else kinhDo = dataItem.P;
      } else {
        kinhDo = currentItem.KINHDO;
      }
      let viDo = 0;
      if (!this.isNullOrEmpty(dataItem.Q)) {
        if (!this.validateDouble(dataItem.Q)) {
          //msg += "<div>Vui lòng nhập đúng định dạng vĩ độ (số thực)</div>";
        } else viDo = dataItem.Q;
      } else {
        viDo = currentItem.VIDO;
      }
      let ngayLapDat = null;
      if (!this.isNullOrEmpty(dataItem.G)) {
        if (!this.validateDate(dataItem.G)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày lắp đặt (dd/MM/yyyy)</div>";
        } else ngayLapDat = DateTimeLib.toDateObject(dataItem.G);
      } else {
        ngayLapDat = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_LD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let ngaySuDung = null;
      if (!this.isNullOrEmpty(dataItem.H)) {
        if (!this.validateDate(dataItem.H)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày sử dụng (dd/MM/yyyy)</div>";
        } else ngaySuDung = DateTimeLib.toDateObject(dataItem.H);
      } else {
        ngaySuDung = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_SD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let tuyenCotID = null;
      let tuyenCot = "";
      if (!this.isNullOrEmpty(dataItem.F)) {
        let v1 = await this.getTuyenCotTheoMa(dataItem.F);
        if (v1 != null) {
          tuyenCotID = v1.TUYENCOT_ID;
          tuyenCot = v1.TUYEN_COT;
        } else {
          tuyenCotID = null;
          msg.tuyenCot =
            "Tuyến cột không tồn tại. Kiểm tra lại mã tuyến cột trong file nhập vào";
        }
      } else {
        tuyenCotID = currentItem.TUYENCOT_ID;
      }
      let cotSauID = null;
      if (!this.isNullOrEmpty(dataItem.K)) {
        let v = await this.getTuyenCotTheoSoHieu(dataItem.K);
        if (v != null) cotSauID = v.COT_ID;
        else {
          //msg += "<div>Cột không tồn tại. Kiểm tra lại số hiệu cột sau trong file nhập vào</div>";
        }
      } else {
        cotSauID = currentItem.COTSAU_ID;
      }
      let donViID = null;
      let donVi = "";
      if (!this.isNullOrEmpty(dataItem.N)) {
        let v2 = await this.getDonViTheoTen(dataItem.N);
        if (v2 != null) {
          donViID = v2.DONVI_ID;
          donVi = v2.TEN_DV;
        } else {
          donViID = null;
          msg.donVi =
            "Không tìm thấy tổ kỹ thuật có mã hoặc tên như trong file nhập vào";
        }
      } else {
        donViID = currentItem.DONVI_ID;
      }

      let duAnID = null;
      let taiSanID = null;
      if (!this.isNullOrEmpty(dataItem.R) && !this.isNullOrEmpty(dataItem.S)) {
        let v = await this.getTaiSanDuAnTheoMa(dataItem.S, dataItem.R);
        if (v != null) {
          duAnID = v.DUAN_ID;
          taiSanID = v.TAISAN_ID;
        } else {
          //msg += "<div>Không tìm thấy tài sản và dự án tương ứng</div>";
        }
      } else {
        taiSanID = currentItem.TAISAN_ID;
        if (!this.isNullOrEmpty(dataItem.R)) {
          let r = await this.getDuAnTheoSoHieu(dataItem.R);
          if (r != null) {
            duAnID = r.DUAN_ID;
          } else {
            //msg += "<div>Không tìm thấy dự án tương ứng</div>";
          }
        } else {
          duAnID = currentItem.DUAN_ID;
        }
      }
      let result = {
        ID: dataItem.A,
        MA_COT: currentItem.MA_COT,
        SO_HIEU: this.isNullOrEmpty(dataItem.B)
          ? currentItem.SO_HIEU
          : dataItem.B,
        TEN_COT: this.isNullOrEmpty(dataItem.C)
          ? currentItem.TEN_COT
          : dataItem.C,
        DOCAO: this.isNullOrEmpty(dataItem.D) ? currentItem.DOCAO : dataItem.D,
        DIACHI: this.isNullOrEmpty(dataItem.E)
          ? currentItem.DIACHI
          : dataItem.E,
        TUYENCOT: tuyenCot,
        TUYENCOT_ID: tuyenCotID,
        NGAY_LD: ngayLapDat,
        NGAY_SD: ngaySuDung,
        LOAICOT_ID: this.isNullOrEmpty(dataItem.I)
          ? currentItem.LOAICOT_ID
          : dataItem.I,
        LOAICOT_TEXT: "",
        KIEUCOT_ID: this.isNullOrEmpty(dataItem.J)
          ? currentItem.KIEUCOT_ID
          : dataItem.J,
        KIEUCOT_TEXT: "",
        COTSAU_ID: cotSauID,
        KC_COTSAU: this.isNullOrEmpty(dataItem.L)
          ? currentItem.COTSAU_ID
          : dataItem.L,
        TTSD_ID: this.isNullOrEmpty(dataItem.M)
          ? currentItem.TTSD_ID
          : dataItem.M,
        TTSD_TEXT: "",
        DONVI: donVi,
        DONVI_ID: donViID,
        CHUQUAN_TEXT: "",
        CHUQUAN_ID: this.isNullOrEmpty(dataItem.O)
          ? currentItem.CHUQUAN_ID
          : dataItem.O,
        KINHDO: kinhDo,
        VIDO: viDo,
        DUAN_ID: duAnID,
        DUAN_TEXT: "",
        TAISAN_ID: taiSanID,
        TAISAN_TEXT: "",
        DIACHI_ID: currentItem.DIACHI_ID,
        TINH_ID: currentItem.TINH_ID,
        QUAN_ID: currentItem.QUAN_ID,
        PHUONG_ID: currentItem.PHUONG_ID,
        PHO_ID: currentItem.PHO_ID,
        AP_ID: currentItem.AP_ID,
        KHU_ID: currentItem.KHU_ID,
        DACDIEM_ID: currentItem.DACDIEM_ID,
        SONHA: currentItem.SONHA,
        MESSAGE: msg,
        TRANGTHAI: "Sẵn sàng",
        ITEM_TYPE: "COT",
        IS_EDIT: true,
      };
      this.validateCot(result);
      return result;
    },
    validateCots: function () {
      let rs = true;
      if (this.danhSachCot != null) {
        for (let i = 0; i < this.danhSachCot.length; i++) {
          let r = this.validateCot(this.danhSachCot[i]);
          if (rs) rs = r;
        }
      }
      return rs;
    },
    validateCot: function (item) {
      let rs = true;
      if (this.isNullOrEmpty(item.SO_HIEU)) {
        item.MESSAGE.soHieu = "Số hiệu không được để trống";
        rs = false;
      } else item.MESSAGE.soHieu = "";
      if (this.isNullOrEmpty(item.TEN_COT)) {
        item.MESSAGE.tenCot = "Tên cột không được để trống";
        rs = false;
      } else item.MESSAGE.tenCot = "";
      if (this.isNullOrEmpty(item.DIACHI)) {
        item.MESSAGE.diaChi = "Địa chỉ không được để trống";
        rs = false;
      } else item.MESSAGE.diaChi = "";
      if (rs) {
        if (
          !this.isNullOrEmpty(item.MESSAGE.donVi) ||
          !this.isNullOrEmpty(item.MESSAGE.tuyenCot)
        )
          rs = false;
      }
      // if (!rs) item.TRANGTHAI = "Lỗi dữ liệu";
      // else {
      //   item.TRANGTHAI = "Sẵn sàng";
      //   // if (item.ID == null) item.TRANGTHAI = "Sẵn sàng";
      //   // else item.TRANGTHAI = "Đã lưu";
      // }
      item.MESSAGE.isValid = rs;

      let i1 = this.dsLoaiCot.find((x) => x.LOAICOT_ID == item.LOAICOT_ID);
      if (!(i1 == undefined || i1 == null)) {
        item.LOAICOT_TEXT = i1.LOAI_COT;
      }
      let i2 = this.dsKieuCot.find((x) => x.KIEUCOT_ID == item.KIEUCOT_ID);
      if (!(i2 == undefined || i2 == null)) {
        item.KIEUCOT_TEXT = i2.KIEU_COT;
      }
      let i3 = this.dsTTSD.find((x) => x.TTSD_ID == item.TTSD_ID);
      if (!(i3 == undefined || i3 == null)) {
        item.TTSD_TEXT = i3.TRANGTHAI_SD;
      }
      let i4 = this.dsChuQuan.find((x) => x.CHUQUAN_ID == item.CHUQUAN_ID);
      if (!(i4 == undefined || i4 == null)) {
        item.CHUQUAN_TEXT = i4.TENCHUQUAN;
      }
      let i5 = this.dsDuAn.find((x) => x.DUAN_ID == item.DUAN_ID);
      if (!(i5 == undefined || i5 == null)) {
        item.DUAN_TEXT = i5.MA_CT;
      }
      this.updateStatus(item);
      return rs;
    },
    convertToDsCongItems: async function () {
      let r = [];
      if (this.dsCong != null) {
        let dsID_EXCEL = [];
        let dsSO_HIEU_EXCEL = [];
        for (let j = 0; j < this.dsCong.length; j++) {
          const cong = this.dsCong[j];
          if (!(this.isNullOrEmpty(cong.A) || dsID_EXCEL.includes(cong.A))) {
            dsID_EXCEL.push(cong.A);
          }
          if (
            !(this.isNullOrEmpty(cong.B) || dsSO_HIEU_EXCEL.includes(cong.B))
          ) {
            dsSO_HIEU_EXCEL.push(cong.B);
          }
        }
        if (
          dsID_EXCEL.length == this.dsCong.length ||
          dsSO_HIEU_EXCEL.length == this.dsCong.length
        ) {
          let dsItemUpdate = [];
          let useID = false;
          if (dsID_EXCEL.length == this.dsCong.length) {
            dsItemUpdate = await this.getDsCongUpdate(0, dsID_EXCEL);
            useID = true;
          } else {
            dsItemUpdate = await this.getDsCongUpdate(1, dsSO_HIEU_EXCEL);
          }
          for (let i = 0; i < this.dsCong.length; i++) {
            let currentItem = null;
            if (useID)
              currentItem = dsItemUpdate.find(
                (x) => x.DOANCONG_ID == this.dsCong[i].A
              );
            else
              currentItem = dsItemUpdate.find(
                (x) => x.KYHIEU == this.dsCong[i].B
              );
            if (!(currentItem == null || currentItem == undefined)) {
              let v = await this.convertToCongItem(this.dsCong[i], currentItem);
              v.STT = i + 1;
              r.push(v);
            }
          }
        } else {
          this.$root.toastError(
            "Trường cống id hoặc ký hiệu cống đang bị thiếu dữ liệu. \nVui lòng bổ sung và thử lại."
          );
        }
      }
      return r;
    },
    convertToCongItem: async function (dataItem, currentItem) {
      // A: 'Cống ID'
      // B: 'Ký hiệu'
      // C: 'Tên đoạn cống'
      // D: 'Tuyến cống bể'
      // E: 'Ngày lắp đặt'
      // F: 'Ngày sử dụng'
      // G: 'Số dòng mặt cắt'
      // H: 'Số cột mặt cắt'
      // I: 'Đường kính ống cống (mm)'
      // J: 'Chiều dài (m)'
      // K: 'Độ sâu'
      // L: 'Ký hiệu bể A'
      // M: 'Ký hiệu bể B'
      // N: 'Dự án'
      // O: 'Tài sản'
      // P: 'Loại cống'
      // Q: 'Trạng thái sử dụng'
      // R: 'Tổ kỹ thuật quản lý'
      let msg = {};
      let ngayLapDat = null;
      if (!this.isNullOrEmpty(dataItem.E)) {
        if (!this.validateDate(dataItem.E)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày lắp đặt (dd/MM/yyyy)</div>";
        } else ngayLapDat = DateTimeLib.toDateObject(dataItem.E);
      } else {
        ngayLapDat = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_LD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let ngaySuDung = null;
      if (!this.isNullOrEmpty(dataItem.F)) {
        if (!this.validateDate(dataItem.F)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày sử dụng (dd/MM/yyyy)</div>";
        } else ngaySuDung = DateTimeLib.toDateObject(dataItem.F);
      } else {
        ngaySuDung = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_SD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let tuyenCBID = null;
      let tuyenCB = "";
      if (!this.isNullOrEmpty(dataItem.D)) {
        let v1 = await this.getTuyenCBTheoMaTCB(dataItem.D);
        if (v1 != null) {
          tuyenCBID = v1.TUYENCB_ID;
          tuyenCB = v1.TUYEN_CB;
        } else {
          tuyenCBID = null;
          msg.tuyenCB =
            "Tuyến cống bể không tồn tại. Kiểm tra lại mã tuyến cống bể trong file nhập vào";
        }
      } else {
        tuyenCBID = currentItem.TUYENCB_ID;
      }
      let beCapAID = null;
      let beCapA = "";
      if (!this.isNullOrEmpty(dataItem.L)) {
        let v2 = await this.getBeCapTheoKyHieu(dataItem.L);
        if (v2 != null) {
          beCapAID = v2.BECAP_ID;
          beCapA = v2.KYHIEU;
        } else {
          beCapAID = null;
          msg.beCapA = "Không tồn tại bể cáp A với ký hiệu như trong file";
        }
      } else {
        beCapAID = currentItem.BECAP_A_ID;
      }

      let beCapBID = null;
      let beCapB = "";
      if (!this.isNullOrEmpty(dataItem.M)) {
        let v3 = await this.getBeCapTheoKyHieu(dataItem.M);
        if (v3 != null) {
          beCapBID = v3.BECAP_ID;
          beCapB = v3.KYHIEU;
        } else {
          beCapBID = null;
          msg.beCapB = "Không tồn tại bể cáp B với ký hiệu như trong file";
        }
      } else {
        beCapBID = currentItem.BECAP_B_ID;
      }

      if (
        !this.isNullOrEmpty(tuyenCBID) &&
        !this.isNullOrEmpty(beCapAID) &&
        !this.isNullOrEmpty(beCapBID)
      ) {
        let r_a = this.getBeCapTheoTuyenCB(beCapAID, tuyenCBID);
        let r_b = this.getBeCapTheoTuyenCB(beCapBID, tuyenCBID);
        if (
          (r_a == null || r_a.length == 0) &&
          (r_b == null || r_b.length == 0)
        ) {
          msg.beCapA =
            "Phải có ít nhất một bể cáp nằm cùng 1 tuyến cống bể với đoạn cống";
          msg.beCapB = msg.beCapA;
        }
      }
      let donViID = null;
      let donVi = "";
      if (!this.isNullOrEmpty(dataItem.R)) {
        let v4 = await this.getDonViTheoTen(dataItem.R);
        if (v4 != null) {
          donViID = v4.DONVI_ID;
          donVi = v4.TEN_DV;
        } else {
          donViID = null;
          msg.donVi =
            "Không tìm thấy tổ kỹ thuật có mã hoặc tên như trong file nhập vào";
        }
      } else {
        donViID = currentItem.DONVI_ID;
      }
      let duAnID = null;
      let taiSanID = null;
      if (!this.isNullOrEmpty(dataItem.O) && !this.isNullOrEmpty(dataItem.N)) {
        let v = await this.getTaiSanDuAnTheoMa(dataItem.O, dataItem.N);
        if (v != null) {
          duAnID = v.DUAN_ID;
          taiSanID = v.TAISAN_ID;
        } else {
          //msg += "<div>Không tìm thấy tài sản và dự án tương ứng</div>";
        }
      } else {
        taiSanID = currentItem.TAISAN_ID;
        if (!this.isNullOrEmpty(dataItem.N)) {
          let r = await this.getDuAnTheoSoHieu(dataItem.N);
          if (r != null) {
            duAnID = r.DUAN_ID;
          } else {
            //msg += "<div>Không tìm thấy dự án tương ứng</div>";
          }
        } else {
          duAnID = currentItem.DUAN_ID;
        }
      }
      let result = {
        ID: dataItem.A,
        MA_DC: currentItem.MA_DC,
        KYHIEU: this.isNullOrEmpty(dataItem.B)
          ? currentItem.KYHIEU
          : dataItem.B,
        TEN_DC: this.isNullOrEmpty(dataItem.C)
          ? currentItem.TEN_DC
          : dataItem.C,
        TUYENCB: tuyenCB,
        TUYENCB_ID: tuyenCBID,
        NGAY_LD: ngayLapDat,
        NGAY_SD: ngaySuDung,
        SODONG_MC: this.isNullOrEmpty(dataItem.G)
          ? currentItem.SODONG_MC
          : dataItem.G,
        SOCOT_MC: this.isNullOrEmpty(dataItem.H)
          ? currentItem.SOCOT_MC
          : dataItem.H,
        DUONGKINH_OC: this.isNullOrEmpty(dataItem.I)
          ? currentItem.DUONGKINH_OC
          : dataItem.I,
        CHIEUDAI: this.isNullOrEmpty(dataItem.J)
          ? currentItem.CHIEUDAI
          : dataItem.J,
        DOSAU: this.isNullOrEmpty(dataItem.K) ? currentItem.DOSAU : dataItem.K,
        BECAP_A: beCapA,
        BECAP_A_ID: beCapAID,
        BECAP_A_HUONG: dataItem.HUONGBE_A,
        BECAP_B: beCapB,
        BECAP_B_ID: beCapBID,
        BECAP_B_HUONG: dataItem.HUONGBE_B,
        DUAN_ID: duAnID,
        DUAN_TEXT: "",
        TAISAN_ID: taiSanID,
        TAISAN_TEXT: "",
        LOAICONG_ID: this.isNullOrEmpty(dataItem.P)
          ? currentItem.LOAICONG_ID
          : dataItem.P,
        LOAICONG_TEXT: "",
        TTSD_ID: this.isNullOrEmpty(dataItem.Q)
          ? currentItem.TTSD_ID
          : dataItem.Q,
        TTSD_TEXT: "",
        DONVI: donVi,
        DONVI_ID: donViID,
        CHUQUAN_ID: dataItem.CHUQUAN_ID,
        CHUQUAN_TEXT: "",
        GHICHU: dataItem.GHICHU,
        MESSAGE: msg,
        TRANGTHAI: "Sẵn sàng",
        ITEM_TYPE: "CONG",
        IS_EDIT: true,
      };
      this.validateCong(result);
      return result;
    },
    validateCongs: function () {
      let rs = true;
      if (this.danhSachCong != null) {
        for (let i = 0; i < this.danhSachCong.length; i++) {
          let r = this.validateCong(this.danhSachCong[i]);
          if (rs) rs = r;
        }
      }
      return rs;
    },
    validateCong: function (item) {
      let rs = true;
      if (this.isNullOrEmpty(item.KYHIEU)) {
        item.MESSAGE.kyHieu = "Ký hiệu không được để trống";
        rs = false;
      } else item.MESSAGE.kyHieu = "";
      if (rs) {
        if (
          !this.isNullOrEmpty(item.MESSAGE.beCapA) ||
          !this.isNullOrEmpty(item.MESSAGE.beCapB) ||
          !this.isNullOrEmpty(item.MESSAGE.donVi) ||
          !this.isNullOrEmpty(item.MESSAGE.tuyenCB)
        )
          rs = false;
      }
      // if (!rs) item.TRANGTHAI = "Lỗi dữ liệu";
      // else {
      //   item.TRANGTHAI = "Sẵn sàng";
      //   // if (item.ID == null) item.TRANGTHAI = "Sẵn sàng";
      //   // else item.TRANGTHAI = "Đã lưu";
      // }
      item.MESSAGE.isValid = rs;

      let i2 = this.dsLoaiCong.find((x) => x.LOAICONG_ID == item.LOAICONG_ID);
      if (!(i2 == undefined || i2 == null)) {
        item.LOAICONG_TEXT = i2.LOAI_CONG;
      }

      let i3 = this.dsTTSD.find((x) => x.TTSD_ID == item.TTSD_ID);
      if (!(i3 == undefined || i3 == null)) {
        item.TTSD_TEXT = i3.TRANGTHAI_SD;
      }
      let i4 = this.dsChuQuan.find((x) => x.CHUQUAN_ID == item.CHUQUAN_ID);
      if (!(i4 == undefined || i4 == null)) {
        item.CHUQUAN_TEXT = i4.TENCHUQUAN;
      }
      let i5 = this.dsDuAn.find((x) => x.DUAN_ID == item.DUAN_ID);
      if (!(i5 == undefined || i5 == null)) {
        item.DUAN_TEXT = i5.MA_CT;
      }
      this.updateStatus(item);
      return rs;
    },
    convertToDsBeItems: async function () {
      let r = [];
      if (this.dsBe != null) {
        for (let i = 0; i < this.dsBe.length; i++) {
          let v = await this.convertToBeItem(this.dsBe[i]);
          v.STT = i + 1;
          r.push(v);
        }
      }
      return r;
    },
    convertToDsBeItems: async function () {
      let r = [];
      if (this.dsBe != null) {
        let dsID_EXCEL = [];
        let dsSO_HIEU_EXCEL = [];
        for (let j = 0; j < this.dsBe.length; j++) {
          const be = this.dsBe[j];
          if (!(this.isNullOrEmpty(be.A) || dsID_EXCEL.includes(be.A))) {
            dsID_EXCEL.push(be.A);
          }
          if (!(this.isNullOrEmpty(be.B) || dsSO_HIEU_EXCEL.includes(be.B))) {
            dsSO_HIEU_EXCEL.push(be.B);
          }
        }
        if (
          dsID_EXCEL.length == this.dsBe.length ||
          dsSO_HIEU_EXCEL.length == this.dsBe.length
        ) {
          let dsItemUpdate = [];
          let useID = false;
          if (dsID_EXCEL.length == this.dsBe.length) {
            dsItemUpdate = await this.getDsBeUpdate(0, dsID_EXCEL);
            useID = true;
          } else {
            dsItemUpdate = await this.getDsBeUpdate(1, dsSO_HIEU_EXCEL);
          }
          for (let i = 0; i < this.dsBe.length; i++) {
            let currentItem = null;
            if (useID)
              currentItem = dsItemUpdate.find(
                (x) => x.BECAP_ID == this.dsBe[i].A
              );
            else
              currentItem = dsItemUpdate.find(
                (x) => x.KYHIEU == this.dsBe[i].B
              );
            if (!(currentItem == null || currentItem == undefined)) {
              let v = await this.convertToBeItem(this.dsBe[i], currentItem);
              v.STT = i + 1;
              r.push(v);
            }
          }
        } else {
          this.$root.toastError(
            "Trường bể cáp id hoặc ký hiệu bể đang bị thiếu dữ liệu. \nVui lòng bổ sung và thử lại."
          );
        }
      }
      return r;
    },
    convertToBeItem: async function (dataItem, currentItem) {
      // A: 'Bể ID'
      // B: 'Ký hiệu'
      // C: 'Tên bể cáp'
      // D: 'Địa chỉ'
      // E: 'Số hướng bể'
      // F: 'Số tấm đan'
      // G: 'Chiều dài'
      // H: 'Chiều sâu'
      // I: 'Chiều rộng'
      // J: 'Tuyến cống bể'
      // K: 'Ngày lắp đặt'
      // L: 'Ngày sử dụng'
      // M: 'Tình trạng nước'
      // N: 'Loại bể cáp'
      // O: 'Vị trí đặt bể'
      // P: 'Hướng tâm đan'
      // Q: 'Loại đường'
      // R: 'Trạng thái sử dụng'
      // S: 'Kinh độ'
      // T: 'Vĩ độ'
      // U: 'Dự án'
      // V: 'Tài sản'
      // W: 'Tổ kỹ thuật quản lý'
      // X: 'Chủ quản'
      let msg = {};
      let kinhDo = 0;
      if (!this.isNullOrEmpty(dataItem.S)) {
        if (!this.validateDouble(dataItem.S)) {
          //msg += "<div>Vui lòng nhập đúng định dạng kinh độ (số thực)</div>";
        } else kinhDo = dataItem.S;
      } else {
        kinhDo = currentItem.KINHDO;
      }
      let viDo = 0;
      if (!this.isNullOrEmpty(dataItem.T)) {
        if (!this.validateDouble(dataItem.T)) {
          //msg += "<div>Vui lòng nhập đúng định dạng vĩ độ (số thực)</div>";
        } else viDo = dataItem.T;
      } else {
        viDo = currentItem.VIDO;
      }
      let ngayLapDat = null;
      if (!this.isNullOrEmpty(dataItem.K)) {
        if (!this.validateDate(dataItem.K)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày lắp đặt (dd/MM/yyyy)</div>";
        } else ngayLapDat = DateTimeLib.toDateObject(dataItem.K);
      } else {
        ngayLapDat = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_LD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let ngaySuDung = null;
      if (!this.isNullOrEmpty(dataItem.L)) {
        if (!this.validateDate(dataItem.L)) {
          //msg += "<div>Vui lòng nhập đúng định dạng ngày sử dụng (dd/MM/yyyy)</div>";
        } else ngaySuDung = DateTimeLib.toDateObject(dataItem.L);
      } else {
        ngaySuDung = DateTimeLib.toDateTimeObjectWithFormat(
          currentItem.NGAY_SD,
          "YYYY-MM-DD HH:mm:ss.S"
        );
      }
      let tuyenCBID = null;
      let tuyenCB = "";
      if (!this.isNullOrEmpty(dataItem.J)) {
        let v1 = await this.getTuyenCBTheoMaTCB(dataItem.J);
        if (v1 != null) {
          tuyenCBID = v1.TUYENCB_ID;
          tuyenCB = v1.TUYEN_CB;
        } else {
          tuyenCBID = null;
          msg.tuyenCB +=
            "Tuyến cống bể không tồn tại. Kiểm tra lại mã tuyến cống bể trong file nhập vào";
        }
      } else {
        tuyenCBID = currentItem.TUYENCB_ID;
      }

      let donViID = null;
      let donVi = "";
      if (!this.isNullOrEmpty(dataItem.W)) {
        let v4 = await this.getDonViTheoTen(dataItem.W);
        if (v4 != null) {
          donViID = v4.DONVI_ID;
          donVi = v4.TEN_DV;
        } else {
          donViID = null;
          msg.donVi =
            "Không tìm thấy tổ kỹ thuật có mã hoặc tên như trong file nhập vào";
        }
      } else {
        donViID = currentItem.DONVI_ID;
      }

      let duAnID = null;
      let taiSanID = null;
      if (!this.isNullOrEmpty(dataItem.V) && !this.isNullOrEmpty(dataItem.U)) {
        let v = await this.getTaiSanDuAnTheoMa(dataItem.V, dataItem.U);
        if (v != null) {
          duAnID = v.DUAN_ID;
          taiSanID = v.TAISAN_ID;
        } else {
          //msg += "<div>Không tìm thấy tài sản và dự án tương ứng</div>";
        }
      } else {
        taiSanID = currentItem.TAISAN_ID;
        if (!this.isNullOrEmpty(dataItem.U)) {
          let r = await this.getDuAnTheoSoHieu(dataItem.U);
          if (r != null) {
            duAnID = r.DUAN_ID;
          } else {
            //msg += "<div>Không tìm thấy dự án tương ứng</div>";
          }
        } else {
          duAnID = currentItem.DUAN_ID;
        }
      }
      let result = {
        ID: dataItem.A,
        MA_BC: currentItem.MA_BC,
        KYHIEU: this.isNullOrEmpty(dataItem.B)
          ? currentItem.KYHIEU
          : dataItem.B,
        TEN_BC: this.isNullOrEmpty(dataItem.C)
          ? currentItem.TEN_BC
          : dataItem.C,
        DIACHI: this.isNullOrEmpty(dataItem.D)
          ? currentItem.DIACHI
          : dataItem.D,
        SOHUONGBE: this.isNullOrEmpty(dataItem.E)
          ? currentItem.SOHUONGBE
          : dataItem.E,
        SOTAMDAN: this.isNullOrEmpty(dataItem.F)
          ? currentItem.SOTAMDAN
          : dataItem.F,
        CHIEUDAI: this.isNullOrEmpty(dataItem.G)
          ? currentItem.CHIEUDAI
          : dataItem.G,
        CHIEUSAU: dataItem.H,
        CHIEURONG: this.isNullOrEmpty(dataItem.I)
          ? currentItem.CHIEURONG
          : dataItem.I,
        TUYENCB: tuyenCB,
        TUYENCB_ID: tuyenCBID,
        NGAY_LD: ngayLapDat,
        NGAY_SD: ngaySuDung,
        TT_NUOC: this.isNullOrEmpty(dataItem.M)
          ? currentItem.TT_NUOC
          : dataItem.M,
        MAVACH: currentItem.MA_VACH,
        LOAIBC_ID: this.isNullOrEmpty(dataItem.N)
          ? currentItem.LOAIBC_ID
          : dataItem.N,
        LOAIBC_TEXT: "",
        VITRIDB_ID: this.isNullOrEmpty(dataItem.O)
          ? currentItem.VITRIDB_ID
          : dataItem.O,
        VITRIDB_TEXT: "",
        HUONGTD_ID: this.isNullOrEmpty(dataItem.P)
          ? currentItem.HUONGTD_ID
          : dataItem.P,
        HUONGTD_TEXT: "",
        LOAIDUONG_ID: this.isNullOrEmpty(dataItem.Q)
          ? currentItem.LOAIDUONG_ID
          : dataItem.Q,
        LOAIDUONG_TEXT: "",
        TTSD_ID: this.isNullOrEmpty(dataItem.R)
          ? currentItem.TTSD_ID
          : dataItem.R,
        TTSD_TEXT: "",
        KINHDO: kinhDo,
        VIDO: viDo,
        DUAN_ID: duAnID,
        DUAN_TEXT: "",
        TAISAN_ID: taiSanID,
        TAISAN_TEXT: "",
        DONVI: donVi,
        DONVI_ID: donViID,
        CHUQUAN_ID: this.isNullOrEmpty(dataItem.X)
          ? currentItem.CHUQUAN_ID
          : dataItem.X,
        CHUQUAN_TEXT: "",
        DIACHI_ID: currentItem.DIACHI_ID,
        TINH_ID: currentItem.TINH_ID,
        QUAN_ID: currentItem.QUAN_ID,
        PHUONG_ID: currentItem.PHUONG_ID,
        PHO_ID: currentItem.PHO_ID,
        AP_ID: currentItem.AP_ID,
        KHU_ID: currentItem.KHU_ID,
        DACDIEM_ID: currentItem.DACDIEM_ID,
        SONHA: currentItem.SONHA,
        MESSAGE: msg,
        TRANGTHAI: "Sẵn sàng",
        ITEM_TYPE: "BE",
        IS_EDIT: true,
      };
      this.validateBe(result);
      return result;
    },
    validateBes: function () {
      let rs = true;
      if (this.danhSachBe != null) {
        for (let i = 0; i < this.danhSachBe.length; i++) {
          let r = this.validateBe(this.danhSachBe[i]);
          if (rs) rs = r;
        }
      }
      return rs;
    },
    validateBe: function (item) {
      let rs = true;
      if (this.isNullOrEmpty(item.KYHIEU)) {
        item.MESSAGE.kyHieu = "Ký hiệu không được để trống";
        rs = false;
      } else item.MESSAGE.kyHieu = "";
      if (this.isNullOrEmpty(item.TEN_BC)) {
        item.MESSAGE.tenBC = "Tên bể cáp không được để trống";
        rs = false;
      } else item.MESSAGE.tenBC = "";
      if (this.isNullOrEmpty(item.DIACHI)) {
        item.MESSAGE.diaChi = "Địa chỉ không được để trống";
        rs = false;
      } else item.MESSAGE.diaChi = "";
      if (rs) {
        if (
          !this.isNullOrEmpty(item.MESSAGE.donVi) ||
          !this.isNullOrEmpty(item.MESSAGE.tuyenCB)
        )
          rs = false;
      }
      // if (!rs) item.TRANGTHAI = "Lỗi dữ liệu";
      // else {
      //   item.TRANGTHAI = "Sẵn sàng";
      //   // if (item.ID == null) item.TRANGTHAI = "Sẵn sàng";
      //   // else item.TRANGTHAI = "Đã lưu";
      // }
      item.MESSAGE.isValid = rs;

      let i3 = this.dsTTSD.find((x) => x.TTSD_ID == item.TTSD_ID);
      if (!(i3 == undefined || i3 == null)) {
        item.TTSD_TEXT = i3.TRANGTHAI_SD;
      }
      let i4 = this.dsChuQuan.find((x) => x.CHUQUAN_ID == item.CHUQUAN_ID);
      if (!(i4 == undefined || i4 == null)) {
        item.CHUQUAN_TEXT = i4.TENCHUQUAN;
      }
      let i5 = this.dsDuAn.find((x) => x.DUAN_ID == item.DUAN_ID);
      if (!(i5 == undefined || i5 == null)) {
        item.DUAN_TEXT = i5.MA_CT;
      }
      let i6 = this.dsLoaiBe.find((x) => x.LOAIBC_ID == item.LOAIBC_ID);
      if (!(i6 == undefined || i6 == null)) {
        item.LOAIBC_TEXT = i6.LOAI_BC;
      }
      let i7 = this.dsViTri.find((x) => x.VITRIDB_ID == item.VITRIDB_ID);
      if (!(i7 == undefined || i7 == null)) {
        item.VITRIDB_TEXT = i7.TENVT_DB;
      }
      let i8 = this.dsHuongTamDan.find((x) => x.HUONGTD_ID == item.HUONGTD_ID);
      if (!(i8 == undefined || i8 == null)) {
        item.HUONGTD_TEXT = i8.HUONG_TD;
      }
      let i9 = this.dsLoaiDuong.find(
        (x) => x.LOAIDUONG_ID == item.LOAIDUONG_ID
      );
      if (!(i9 == undefined || i9 == null)) {
        item.LOAIDUONG_TEXT = i9.LOAI_DUONG;
      }
      this.updateStatus(item);
      return rs;
    },
    getBeCapTheoKyHieu: async function (kyHieu) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getBeCapTheoKyHieu",
        {
          kyHieu: kyHieu.toString(),
        }
      );
      return rs.data;
    },
    getBeCapTheoTuyenCB: async function (beCapID, tuyenCBID) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getBeCapTheoTuyenCB",
        {
          beCapID: beCapID,
          tuyenCBID: tuyenCBID,
        }
      );
      return rs.data;
    },
    getDonViTheoTen: async function (tenDonVi) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getDonViTheoTen",
        {
          tenDonVi: tenDonVi.toString(),
        }
      );
      return rs.data;
    },
    getDonVi: async function (donViID) {
      let rs = await this.$root.context.post("/web-cabman/donvi/getDonVi", {
        id: donViID,
      });
      return rs.data;
    },
    getDuAnTheoSoHieu: async function (soHieuCT) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getDuAnTheoSoHieu",
        {
          soHieuCT: soHieuCT.toString(),
        }
      );
      return rs.data;
    },
    getTaiSanDuAnTheoMa: async function (maTS, soHieuCT) {
      //maTS: mã tài sản
      //soHieuCT: số hiệu chứng từ dự án
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getTaiSanDuAnTheoMa",
        {
          maTS: maTS.toString(),
          soHieuCT: soHieuCT.toString(),
        }
      );
      return rs.data;
    },
    getTuyenCotTheoMa: async function (maTC) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getTuyenCotTheoMa",
        {
          maTC: maTC.toString(),
        }
      );
      return rs.data;
    },
    getTuyenCotTheoSoHieu: async function (soHieu) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getTuyenCotTheoSoHieu",
        {
          soHieu: soHieu,
        }
      );
      return rs.data;
    },
    getTuyenCBTheoMaTCB: async function (maTCB) {
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/getTuyenCBTheoMaTCB",
        {
          maTCB: maTCB,
        }
      );
      return rs.data;
    },
    getDsDuAn: async function () {
      let rs = await this.$root.context.post("/web-cabman/danhmuc/layDsDuAn");
      return rs.data;
    },
    getDsTaiSan: async function (duAnID) {
      if (duAnID != null) {
        let rs = await this.$root.context.post(
          "/web-cabman/danhmuc/layDsTaiSan",
          {
            id: duAnID,
          }
        );
        return rs.data;
      } else return [];
    },
    getDsLoaiCot: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsLoaiCot"
      );
      return rs.data;
    },
    getDsKieuCot: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsKieuCot"
      );
      return rs.data;
    },
    getDsTrangThaiSuDung: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsTrangThaiSuDung"
      );
      return rs.data;
    },
    getDsChuQuan: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsChuQuan"
      );
      return rs.data;
    },
    getDsLoaiCong: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsLoaiCong"
      );
      return rs.data;
    },
    getDsLoaiBeCap: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsLoaiBeCap"
      );
      return rs.data;
    },
    getDsViTriDatBe: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsViTriDatBe"
      );
      return rs.data;
    },
    getDsHuongTamDan: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsHuongTamDan"
      );
      return rs.data;
    },
    getDsLoaiDuong: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsLoaiDuong"
      );
      return rs.data;
    },
    validateFields: function (dataItem) {
      let keys = Object.keys(dataItem);
      let rs = "";
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.toUpperCase() != "MESSAGE") {
          if (this.isNullOrEmpty(dataItem[key])) {
            if (rs != "") rs += ", ";
            rs += key;
          }
        }
      }
      return rs;
    },
    validateDate: function (value) {
      if (value == undefined || value == null) return null;
      else {
        let regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return value.match(regEx);
      }
    },
    validateDouble: function (value) {
      if (value == undefined || value == null) return null;
      else {
        let regEx = /^(?!0\d)\d*(\.\d+)?$/;
        return value.toString().match(regEx);
      }
    },
    isNullOrEmpty: function (value) {
      return (
        value == undefined || value == null || value.toString().trim() == ""
      );
    },
    getDsCotUpdate: async function (loai, danhSach) {
      let param = {
        loai: loai,
        dsCotId: loai == 0 ? danhSach : null,
        dsSoHieu: loai == 1 ? danhSach : null,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/get-ds-thongtin-cot",
        param
      );
      return rs.data;
    },
    getDsCongUpdate: async function (loai, danhSach) {
      let param = {
        loai: loai,
        dsDoanCongId: loai == 0 ? danhSach : null,
        dsKyHieu: loai == 1 ? danhSach : null,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/get-ds-thongtin-doancong",
        param
      );
      return rs.data;
    },
    getDsBeUpdate: async function (loai, danhSach) {
      let param = {
        loai: loai,
        dsBeCapId: loai == 0 ? danhSach : null,
        dsKyHieu: loai == 1 ? danhSach : null,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/get-ds-thongtin-becap",
        param
      );
      return rs.data;
    },
    getTuyenCot: async function (tuyenCotID) {
      let rs = await this.$root.context.post(
        "/web-cabman/TuyenCot/getTuyenCot",
        { id: tuyenCotID }
      );
      return rs.data;
    },
    capNhatDsCot: async function () {
      let count = 0;
      for (let i = 0; i < this.danhSachCot.length; i++) {
        if (this.danhSachCot[i].MESSAGE.isValid === true) {
          this.danhSachCot[i].TRANGTHAI = "Đang lưu...";
          let r = await this.capNhatCot(this.danhSachCot[i]);
          if (r != null) {
            count++;
            this.danhSachCot[i].TRANGTHAI = "Đã lưu";
          } else {
            this.danhSachCot[i].TRANGTHAI = "Lưu thất bại!";
          }
        }
      }
      return count;
    },
    capNhatCot: async function (dataItem) {
      let data = {
        apId: dataItem.AP_ID,
        chuquanId: dataItem.CHUQUAN_ID,
        cotId: dataItem.ID,
        cotsauId: dataItem.COTSAU_ID,
        dacdiemId: dataItem.DACDIEM_ID,
        diachi: dataItem.DIACHI,
        diachiId: dataItem.DIACHI_ID,
        doCao: dataItem.DOCAO,
        donviId: dataItem.DONVI_ID,
        duanId: dataItem.DUAN_ID,
        kcCotsau: dataItem.KC_COTSAU,
        khuId: dataItem.KHU_ID,
        kieucotId: dataItem.KIEUCOT_ID,
        kinhdo: dataItem.KINHDO,
        loaicotId: dataItem.LOAICOT_ID,
        maCot: dataItem.MA_COT,
        ngayLd:
          dataItem.NGAY_LD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_LD)
            : null,
        ngaySd:
          dataItem.NGAY_SD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_SD)
            : null,
        phoId: dataItem.PHO_ID,
        phuongId: dataItem.PHUONG_ID,
        quanId: dataItem.QUAN_ID,
        soHieu: dataItem.SO_HIEU,
        sonha: dataItem.SONHA,
        taisanId: dataItem.TAISAN_ID,
        tenCot: dataItem.TEN_COT,
        tinhId: dataItem.TINH_ID,
        ttssdId: dataItem.TTSD_ID,
        tuyencotId: dataItem.TUYENCOT_ID,
        vido: dataItem.VIDO,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/capnhat-cot",
        data
      );
      return rs.data;
    },
    capNhatDsCong: async function () {
      let count = 0;
      for (let i = 0; i < this.danhSachCong.length; i++) {
        if (this.danhSachCong[i].MESSAGE.isValid === true) {
          this.danhSachCong[i].TRANGTHAI = "Đang lưu...";
          let r = await this.capNhatCong(this.danhSachCong[i]);
          if (r != null) {
            count++;
            this.danhSachCong[i].TRANGTHAI = "Đã lưu";
          } else {
            this.danhSachCong[i].TRANGTHAI = "Lưu thất bại!";
          }
        }
      }
      return count;
    },
    capNhatCong: async function (dataItem) {
      let data = {
        becapaId: dataItem.BECAP_A_ID,
        becapbId: dataItem.BECAP_B_ID,
        chieuDai: dataItem.CHIEUDAI,
        doSau: dataItem.DOSAU,
        doancongId: dataItem.ID,
        donviId: dataItem.DONVI_ID,
        duanId: dataItem.DUAN_ID,
        duongkinhOc: dataItem.DUONGKINH_OC,
        huongbeA: dataItem.BECAP_A_HUONG,
        huongbeB: dataItem.BECAP_B_HUONG,
        kyHieu: dataItem.KYHIEU,
        loaicongId: dataItem.LOAICONG_ID,
        maDc: dataItem.MA_DC,
        ngayLd:
          dataItem.NGAY_LD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_LD)
            : null,
        ngaySd:
          dataItem.NGAY_SD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_SD)
            : null,
        soCap: 0,
        socotMc: dataItem.SOCOT_MC,
        sodongMc: dataItem.SODONG_MC,
        taisanId: dataItem.TAISAN_ID,
        tenDc: dataItem.TEN_DC,
        ttsdId: dataItem.TTSD_ID,
        tuyencbId: dataItem.TUYENCB_ID,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/capnhat-doancong",
        data
      );
      return rs.data;
    },
    capNhatDsBe: async function () {
      let count = 0;
      for (let i = 0; i < this.danhSachBe.length; i++) {
        if (this.danhSachBe[i].MESSAGE.isValid === true) {
          this.danhSachBe[i].TRANGTHAI = "Đang lưu...";
          let r = await this.capNhatBe(this.danhSachBe[i]);
          if (r != null) {
            count++;
            this.danhSachBe[i].TRANGTHAI = "Đã lưu";
          } else {
            this.danhSachBe[i].TRANGTHAI = "Lưu thất bại!";
          }
        }
      }
      return count;
    },
    capNhatBe: async function (dataItem) {
      let data = {
        apId: dataItem.AP_ID,
        becapId: dataItem.ID,
        chieuDai: dataItem.CHIEUDAI,
        chieuRong: dataItem.CHIEURONG,
        chuquanId: dataItem.CHUQUAN_ID,
        // cotsauId: null,
        dacdiemId: dataItem.DIACHI_ID,
        diaChi: dataItem.DIACHI,
        diachiId: dataItem.DIACHI_ID,
        donviId: dataItem.DONVI_ID,
        duanId: dataItem.DUAN_ID,
        huongtdId: dataItem.HUONGTD_ID,
        khuId: dataItem.KHU_ID,
        kinhDo: dataItem.KINHDO,
        kyHieu: dataItem.KYHIEU,
        loaibcId: dataItem.LOAIBC_ID,
        loaiduongId: dataItem.LOAIDUONG_ID,
        maBc: dataItem.MA_BC,
        maVach: dataItem.MAVACH,
        ngayLd:
          dataItem.NGAY_LD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_LD)
            : null,
        ngaySd:
          dataItem.NGAY_SD != null
            ? DateTimeLib.toDateDisplay(dataItem.NGAY_SD)
            : null,
        phoId: dataItem.PHO_ID,
        phuongId: dataItem.PHUONG_ID,
        quanId: dataItem.QUAN_ID,
        soNha: dataItem.SONHA,
        sohuongBe: dataItem.SOHUONGBE,
        sotamDan: dataItem.SOTAMDAN,
        taisanId: dataItem.TAISAN_ID,
        tenBc: dataItem.TEN_BC,
        tinhId: dataItem.TINH_ID,
        ttNuoc: dataItem.TT_NUOC,
        ttsdId: dataItem.TTSD_ID,
        tuyencbId: dataItem.TUYENCB_ID,
        viDo: dataItem.VIDO,
        vitridbId: dataItem.VITRIDB_ID,
      };
      let rs = await this.$root.context.post(
        "/web-cabman/cot-cong-be/capnhat-becap",
        data
      );
      return rs.data;
    },
    buttonReadFile_Click: async function () {
      if (this.fileExcel != null) {
        let s = this.fileExcel.name.toLowerCase();
        if (s.endsWith(".xlsx") || s.endsWith(".xls")) {
          let reader = new FileReader();
          reader.onload = async (e) => {
            /* Parse data */
            const data = e.target.result;
            const workBook = xlsx.read(data, { type: "binary" });
            if (workBook != null) {
              for (let i = 0; i < workBook.SheetNames.length; i++) {
                const sheetName = workBook.SheetNames[i];
                switch (sheetName.toUpperCase()) {
                  case "COT":
                    this.dsCot = xlsx.utils.sheet_to_json(
                      workBook.Sheets[sheetName],
                      { header: "A" }
                    );
                    this.dsCot.shift(); // remove first item
                    break;
                  case "CONG":
                    this.dsCong = xlsx.utils.sheet_to_json(
                      workBook.Sheets[sheetName],
                      { header: "A" }
                    );
                    this.dsCong.shift(); // remove first item
                    break;
                  case "BE":
                    this.dsBe = xlsx.utils.sheet_to_json(
                      workBook.Sheets[sheetName],
                      { header: "A" }
                    );
                    this.dsBe.shift(); // remove first item
                    break;
                  default:
                    break;
                }
              }
            }
            this.$root.showLoading(true);
            try {
              if (this.dsLoaiBe == null)
                this.dsLoaiBe = await this.getDsLoaiBeCap();
              if (this.dsViTri == null)
                this.dsViTri = await this.getDsViTriDatBe();
              if (this.dsHuongTamDan == null)
                this.dsHuongTamDan = await this.getDsHuongTamDan();
              if (this.dsLoaiDuong == null)
                this.dsLoaiDuong = await this.getDsLoaiDuong();
              if (this.dsLoaiCong == null)
                this.dsLoaiCong = await this.getDsLoaiCong();
              if (this.dsLoaiCot == null)
                this.dsLoaiCot = await this.getDsLoaiCot();
              if (this.dsChuQuan == null)
                this.dsChuQuan = await this.getDsChuQuan();
              if (this.dsKieuCot == null)
                this.dsKieuCot = await this.getDsKieuCot();
              if (this.dsTTSD == null)
                this.dsTTSD = await this.getDsTrangThaiSuDung();
              if (this.dsDuAn == null) this.dsDuAn = await this.getDsDuAn();
              this.danhSachCot = await this.convertToDsCotItems();
              this.danhSachCong = await this.convertToDsCongItems();
              this.danhSachBe = await this.convertToDsBeItems();
            } finally {
              this.$root.showLoading(false);
            }
          };
          reader.readAsBinaryString(this.fileExcel);
        } else {
          this.$root.toastError(
            "File không đúng định dạng cho phép(xls, xlsx) hoặc không đúng biểu mẫu.\nVui lòng thử lại."
          );
        }
      } else this.$root.toastError("Chưa chọn tệp dữ liệu");
    },
    buttonExportFile_Click: function () {
      let cked = $('input[name="radioDoiTuong"]:checked').val();
      let r = false;
      //let workBook = xlsx.utils.book_new();
      if (cked == "COT") {
        if (this.danhSachCot.length > 0) {
          r = true;
          this.$refs.gridCot.excelExport();
        }
        // if (this.danhSachCot.length > 0) {
        //   r = true;
        //   let dataExcel = [];
        //   this.danhSachCot.forEach((cot) => {
        //     dataExcel.push({
        //       "Cột ID": cot.ID,
        //       "Số hiệu": cot.SO_HIEU,
        //       "Tên cột": cot.TEN_COT,
        //       "Độ cao": cot.DOCAO,
        //       "Địa chỉ": cot.DIACHI,
        //       "Tuyến cột(Nhập chính xác mã tuyến cột)": cot.TUYENCOT_ID,
        //       "Ngày lắp đặt (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
        //         cot.NGAY_LD
        //       ),
        //       "Ngày sử dụng (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
        //         cot.NGAY_SD
        //       ),
        //       "Loại cột": cot.LOAICOT_ID,
        //       "Kiểu cột": cot.KIEUCOT_ID,
        //       "Cột sau (Nhập chính xác số hiệu cột sau)": cot.COTSAU_ID,
        //       "Tổ kỹ thuật quản lý (Nhập chính xác tên hoặc mã đơn vị)":
        //         cot.DONVI_ID,
        //       "Chủ quản": cot.CHUQUAN_ID,
        //       "Kinh độ": cot.KINHDO,
        //       "Vĩ độ": cot.VIDO,
        //       "Dự án (Nhập chính xác mã dự án)": cot.DUAN_ID,
        //       "Tài sản (Nhập chính xác mã tài sản)": cot.TAISAN_ID,
        //     });
        //   });
        //   let sheet = xlsx.utils.json_to_sheet(dataExcel);
        //   xlsx.utils.book_append_sheet(workBook, sheet, "cot");
        // }
      } else if (cked == "CONG") {
        if (this.danhSachCong.length > 0) {
          r = true;
          this.$refs.gridCong.excelExport();
          // let dataExcel = [];
          // this.danhSachCong.forEach((cong) => {
          //   dataExcel.push({
          //     "Cống ID": cong.ID,
          //     "Ký hiệu": cong.KYHIEU,
          //     "Tên đoạn cống": cong.TEN_DC,
          //     "Tuyến cống bể (Nhập chính xác mã tuyến cống bể)":
          //       cong.TUYENCB_ID,
          //     "Ngày lắp đặt (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
          //       cong.NGAY_LD
          //     ),
          //     "Ngày sử dụng (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
          //       cong.NGAY_SD
          //     ),
          //     "Số dòng mặt cắt": cong.SODONG_MC,
          //     "Số cột mặt cắt": cong.SOCOT_MC,
          //     "Đường kính ống cống(mm)": cong.DUONGKINH_OC,
          //     "Chiều dài(m)": cong.CHIEUDAI,
          //     "Độ sâu": cong.DOSAU,
          //     "Ký hiệu bể A": cong.BECAP_A,
          //     "Ký hiệu bể B": cong.BECAP_B,
          //     "Dự án (Nhập chính xác mã dự án)": cong.DUAN_ID,
          //     "Tài sản (Nhập chính xác mã tài sản)": cong.TAISAN_ID,
          //     "Loại cống": cong.LOAICONG_ID,
          //     "Trạng thái sử dụng": cong.TTSD_ID,
          //     "Tổ kỹ thuật quản lý (Nhập chính xác tên hoặc mã đơn vị)":
          //       cong.DONVI_ID,
          //   });
          // });
          // let sheet = xlsx.utils.json_to_sheet(dataExcel);
          // xlsx.utils.book_append_sheet(workBook, sheet, "cong");
        }
      } else if (cked == "BE") {
        if (this.danhSachBe.length > 0) {
          r = true;
          this.$refs.gridBe.excelExport();
          // let dataExcel = [];
          // this.danhSachBe.forEach((be) => {
          //   dataExcel.push({
          //     "Bể ID": be.ID,
          //     "Ký hiệu": be.KYHIEU,
          //     "Tên bể cáp": be.TEN_BC,
          //     "Địa chỉ": be.DIACHI,
          //     "Số hướng bể": be.SOHUONGBE,
          //     "Số tấm đan": be.SOTAMDAN,
          //     "Chiều dài": be.CHIEUDAI,
          //     "Chiều sâu": be.CHIEUSAU,
          //     "Chiều rộng": be.CHIEURONG,
          //     "Tuyến cống bể (Nhập chính xác mã tuyến cống bể)": be.TUYENCB_ID,
          //     "Ngày lắp đặt (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
          //       be.NGAY_LD
          //     ),
          //     "Ngày sử dụng (ngày/tháng/năm)": DateTimeLib.toDateDisplay(
          //       be.NGAY_SD
          //     ),
          //     "Tình trạng nước": be.TT_NUOC,
          //     "Loại bể cáp": be.LOAIBC_ID,
          //     "Vị trí đặt bể": be.VITRIDB_ID,
          //     "Hướng tâm đan": be.HUONGTD_ID,
          //     "Loại đường": be.LOAIDUONG_ID,
          //     "Trạng thái sử dụng": be.TTSD_ID,
          //     "Kinh độ": be.KINHDO,
          //     "Vĩ độ": be.VIDO,
          //     "Dự án (Nhập chính xác mã dự án)": be.DUAN_ID,
          //     "Tài sản (Nhập chính xác mã tài sản)": be.TAISAN_ID,
          //     "Tổ kỹ thuật quản lý (Nhập chính xác tên hoặc mã đơn vị)":
          //       be.DONVI_ID,
          //     "Chủ quản": be.CHUQUAN_ID,
          //   });
          // });
          // let sheet = xlsx.utils.json_to_sheet(dataExcel);
          // xlsx.utils.book_append_sheet(workBook, sheet, "be");
        }
      }
      if(!r)
        this.$root.toastInfo("Không có dữ liệu để xuất file");
      // if (r) xlsx.writeFile(workBook, "du-lieu.xlsx");
      // else {
      //   this.$root.toastInfo("Không có dữ liệu để xuất file");
      // }
      // if (
      //   this.danhSachCot.length > 0 ||
      //   this.danhSachCong.length > 0 ||
      //   this.danhSachBe.length > 0
      // ) {
      //   let workBook = xlsx.utils.book_new();
      //   let sheetCot = xlsx.utils.json_to_sheet(this.danhSachCot);
      //   xlsx.utils.book_append_sheet(workBook, sheetCot, "cot");
      //   let sheetCong = xlsx.utils.json_to_sheet(this.danhSachCong);
      //   xlsx.utils.book_append_sheet(workBook, sheetCong, "cong");
      //   let sheetBe = xlsx.utils.json_to_sheet(this.danhSachBe);
      //   xlsx.utils.book_append_sheet(workBook, sheetBe, "be");
      //   // export Excel file
      //   xlsx.writeFile(workBook, "du-lieu.xlsx");
      // } else {
      //   this.$root.toastInfo("Không có dữ liệu để xuất file");
      // }
    },
    buttonExecute_Click: async function () {
      this.$root.showLoading(true);
      try {
        let count = 0;
        let total = 0;
        let boqua = 0;
        if (this.doiTuongCap == "COT") {
          total = this.danhSachCot.length;
          count = await this.capNhatDsCot();
          this.$refs.gridCot.refresh();
        } else if (this.doiTuongCap == "CONG") {
          total = this.danhSachCong.length;
          count = await this.capNhatDsCong();
          this.$refs.gridCong.refresh();
        } else if (this.doiTuongCap == "BE") {
          total = this.danhSachBe.length;
          count = await this.capNhatDsBe();
          this.$refs.gridBe.refresh();
        }
        boqua = total - count;
        let msg =
          "Tổng cộng " +
          total +
          " đối tượng trên danh sách:\n-Bỏ qua: " +
          boqua +
          " đối tượng\n-Cập nhật thành công: " +
          count +
          " đối tượng";
        this.$root.toastSuccess(msg);
      } finally {
        this.$root.showLoading(false);
      }
    },
    showModalDiaChi: function (arg) {
      this.currentData = arg;
      this.$refs.modalDiaChi.show();
    },
    modalDiaChi_Ok: function (arg) {
      if (
        this.$refs.formDiaChi.PHO_ID > 0 ||
        this.$refs.formDiaChi.AP_ID > 0 ||
        this.$refs.formDiaChi.KHU_ID > 0
      ) {
        this.currentData.DIACHI_ID = this.$refs.formDiaChi.DIACHI_ID;
        this.currentData.TINH_ID = this.$refs.formDiaChi.TINH_ID;
        this.currentData.QUAN_ID = this.$refs.formDiaChi.QUAN_ID;
        this.currentData.PHUONG_ID = this.$refs.formDiaChi.PHUONG_ID;
        this.currentData.PHO_ID = this.$refs.formDiaChi.PHO_ID;
        this.currentData.AP_ID = this.$refs.formDiaChi.AP_ID;
        this.currentData.KHU_ID = this.$refs.formDiaChi.KHU_ID;
        this.currentData.DACDIEM_ID = this.$refs.formDiaChi.DACDIEM_ID;
        this.currentData.SONHA = this.$refs.formDiaChi.SONHA;
        this.currentData.DIACHI = this.$refs.formDiaChi.DIACHI;

        if (this.currentData.TINH_ID == 0) this.currentData.TINH_ID = null;
        if (this.currentData.QUAN_ID == 0) this.currentData.QUAN_ID = null;
        if (this.currentData.PHUONG_ID == 0) this.currentData.PHUONG_ID = null;
        if (this.currentData.PHO_ID == 0) this.currentData.PHO_ID = null;
        if (this.currentData.AP_ID == 0) this.currentData.AP_ID = null;
        if (this.currentData.KHU_ID == 0) this.currentData.KHU_ID = null;
        if (this.currentData.DACDIEM_ID == 0)
          this.currentData.DACDIEM_ID = null;
        if (this.currentData.DIACHI_ID == 0) this.currentData.DIACHI_ID = null;
        if (this.currentData.SONHA == "") this.currentData.SONHA = null;
        if (this.currentData.DIACHI == "") this.currentData.DIACHI = null;

        this.updateDataSource(this.currentData);
      } else {
        arg.preventDefault();
        this.$bvModal.msgBoxOk("Hãy chọn Phố, Ấp, Khu!", {
          title: "Thông báo",
          size: "sm",
          centered: true,
          okTitle: "Đóng",
          buttonSize: "sm",
        });
      }
    },
    modalDiaChi_Show: async function () {
      await this.$refs.formDiaChi.bindData(this.currentData);
    },
    updateDataSource: function (dataItem) {
      if (dataItem.ITEM_TYPE == "COT") {
        let item = this.danhSachCot.find((x) => x.STT == dataItem.STT);
        this.updateData(item, dataItem);
        this.validateCot(item);
        //this.updateStatus(item);
        this.$refs.gridCot.refresh();
      } else if (dataItem.ITEM_TYPE == "CONG") {
        let item = this.danhSachCong.find((x) => x.STT == dataItem.STT);
        this.updateData(item, dataItem);
        this.validateCong(item);
        //this.updateStatus(item);
        this.$refs.gridCong.refresh();
      } else if (dataItem.ITEM_TYPE == "BE") {
        let item = this.danhSachBe.find((x) => x.STT == dataItem.STT);
        this.updateData(item, dataItem);
        this.validateBe(item);
        //this.updateStatus(item);
        this.$refs.gridBe.refresh();
      }
    },
    updateData: function (item, newItem) {
      if (item != null) {
        let keys = Object.keys(item);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (item[key] != newItem[key]) item[key] = newItem[key];
        }
      }
    },
    updateStatus: function (item) {
      let keys = Object.keys(item.MESSAGE);
      let msg = "";
      if (keys != null) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key != "isValid") {
            if (!this.isNullOrEmpty(item.MESSAGE[key]))
              msg += item.MESSAGE[key] + "; ";
          }
        }
      }
      if (msg != "") {
        item.TRANGTHAI = msg.trim();
        item.MESSAGE.isValid = false;
      } else {
        item.TRANGTHAI = "Sẵn sàng";
        item.MESSAGE.isValid = true;
      }
    },
    showModalToaDo: function (arg) {
      this.currentData = arg;
      this.$refs.modalToaDo.show();
    },
    modalToaDo_Ok: function () {
      this.currentData.KINHDO = this.$refs.formToaDo.lng;
      this.currentData.VIDO = this.$refs.formToaDo.lat;
    },
    modalToaDo_Show: async function () {
      await this.$refs.formToaDo.bindData(
        this.currentData.KINHDO,
        this.currentData.VIDO,
        this.currentData.DIACHI
      );
    },
    btnInBanDo_Click: function () {
      this.$refs.formToaDo.printMap();
    },
  },
};
</script>
