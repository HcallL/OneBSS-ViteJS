<template src="./index.template.html"></template>
<script>
import XLSX from "xlsx";
export default {
  data: function () {
    return {
      dsTTVT: [],
      dsToKT: [],
      dsVeTinh: [],
      kqTimKiem: [],
      kqGoiNhac: [],
      capKetCuoiID: 0,
      checkboxVetinhChecked: {
        type: Boolean,
        default: false,
      },
      checkboxTTVTChecked: {
        type: Boolean,
        default: false,
      },
    };
  },
  created: async function () {
    this.$root.showLoading(true);
    try {
      await this.getDsTTVT();
      await this.getToKT();
      await this.getDsVeTinh();
      this.checkboxVetinhChecked = false;
      this.checkboxTTVTChecked = true;
      $("#inputSearch").focus();
    } catch (error) {
    } finally {
      this.$root.showLoading(false);
    }
  },
  computed: {
    haveData: function(){
      return !(this.kqTimKiem == null || this.kqTimKiem.length == 0);
    }
  },
  methods: {
    getDsTTVT: async function () {
      let rs = await this.$root.context.post(
        "/web-ecms/danhmuc/layDsTTVTTrongToken"
      );
      this.dsTTVT = rs.data;
    },
    getToKT: async function () {
      let rs = await this.$root.context.post("/web-ecms/danhmuc/layDsToKT", {
        id: $("#selectTTVT").val(),
      });
      this.dsToKT = rs.data;
    },
    getKqTK: async function () {
      if (this.capKetCuoiID != 0) {
        this.$root.showLoading(true);
        try {
          var loai_dt = $("#selectLoaiTraCuu").val() == 1 ? 0 : 1;
          let rs = await this.$root.context.post(
            "/web-cabman/thueBaoCapKetCuoi/dsthuebaocapketcuoi",
            {
              doituong_id: this.capKetCuoiID,
              loaidt_id: loai_dt,
              vitri_bd: $("#inputTuViTri").val(),
              vitri_kt: $("#inputDenViTri").val(),
            }
          );
          this.kqTimKiem = rs.data;
        } catch (error) {
        } finally {
          this.$root.showLoading(false);
        }
      } else {
        this.$root.toastError(
          "Vui lòng chọn cáp hoặc kết cuối trước khi tra cứu"
        );
      }
    },
    getKqGoiNhac: async function () {
      this.kqTimKiem = [];
      this.capKetCuoiID = 0;
      let txt =
        $("#inputSearch").val().toLowerCase().trim() +
        "|PHANLOAIKC_ID=" +
        $("#selectNhom").val() +
        ",TOQL_ID=" +
        $("#selectToKT").val() +
        ",TRAMTBI_ID=" +
        ($("#selectVeTinh").val() != 0 ? $("#selectVeTinh").val() : "NULL");
      let rs = await this.$root.context.post(
        "/web-cabman/thueBaoCapKetCuoi/goiNhacTimKiem",
        { searchQuery: txt, types: $("#selectLoaiTraCuu").val() }
      );
      this.kqGoiNhac = rs.data;
      var loai_dt = $("#selectLoaiTraCuu").val() == 1 ? 0 : 1;
      if (rs.data.length > 0) {
        $("#inputTuViTri").val(1);
        if (loai_dt == 0) {
          //Ket cuoi : doituong = KETCUOI_ID
          await this.getKetCuoi(rs.data[0].SEARCH_QUERY);
        } else {
          //Cap doituong = S2-HUVUG01B02;
          await this.getCap(rs.data[0].SEARCH_QUERY);
        }
      } else {
        let msg = "Không tìm thấy thông tin ";
        if (loai_dt == 0) msg += "kết cuối";
        else msg += "cáp";
        msg += ". Vui lòng kiểm tra lại thông tin tra cứu";
        this.$root.toastError(msg);
      }
    },
    getKetCuoi: async function (stringValue) {
      var itemID = stringValue.split("|")[1];
      let rs = await this.$root.context.post(
        "/web-cabman/thueBaoCapKetCuoi/layKetCuoiTheoID",
        {
          id: itemID,
        }
      );
      if (rs.data != null) {
        $("#inputDenViTri").val(rs.data.TONGSO_DD);
        this.capKetCuoiID = rs.data.KETCUOI_ID;
      }
    },
    getCap: async function (stringValue) {
      var itemID = stringValue.split("|")[1];
      let rs = await this.$root.context.post(
        "/web-cabman/thueBaoCapKetCuoi/layCapTheoID",
        {
          id: itemID,
        }
      );
      if (rs.data != null) {
        $("#inputDenViTri").val(rs.data.SODOIDAY);
        this.capKetCuoiID = rs.data.CAP_ID;
      }
    },
    getDsVeTinh: async function () {
      let rs = await this.$root.context.post("/web-ecms/danhmuc/layDsVeTinh", {
        id: $("#selectToKT").val(),
      });
      if(!(rs.data == null || rs.data.length == 0))
        this.dsVeTinh = rs.data;
      else
        this.dsVeTinh = [{DONVI_ID: 0, TEN_DV: "(Lựa chọn ...)"}];
    },
    selectTTVT_changed() {
      this.$root.showLoading(true);
      try {
        this.getToKT();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    async selectToKT_changed() {
      this.$root.showLoading(true);
      try {
        await this.getDsVeTinh();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    async goinhacKQ_click() {
      this.$root.showLoading(true);
      try {
        await this.getKqGoiNhac();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    xuatExcel(){
      if(!(this.kqTimKiem == null || this.kqTimKiem.length == 0)){
        let file = XLSX.utils.json_to_sheet(this.kqTimKiem);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, file, "DATA");
        // export Excel file
        XLSX.writeFile(wb, "du-lieu.xlsx");
      }
      else {
        this.$root.toastError(
          "Không có dữ liệu tra cứu để xuất file"
        );
      }
    }
  },
};
</script>
