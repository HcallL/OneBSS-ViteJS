<template src="./index.template.html"></template>
<script>
import popupChonThueBao from "./chon-thuebao";
import report from "./report";
export default {
  components: {
    popupChonThueBao,
    report,
  },
  data: function () {
    return {
      dsThueBao: [],
      thongTinTB: {
        type: Object,
        default: null,
      },
      thongTinTBTraCuu: {},
      thongTinGianDo: [],
      thongTinBaoHong: [],
      doRenderPDF: false,
      showPanelReport: false,
    };
  },
  created: async function () {},
  computed: {},
  methods: {
    popupChonThueBao_ok: async function () {
      this.$root.showLoading(true);
      try {
        await this.chonThueBao();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    chonThueBao: async function () {},
    popupChonThueBao_selectedRowChanged: function (dataItem) {
      this.thongTinTB = dataItem;
    },
    inputThueBao_enter: async function () {
      this.$root.showLoading(true);
      try {
        this.thongTinTB = {};
        this.dsThueBao = await this.getDsThueBao();
        let showModal = false;
        if (this.dsThueBao.length > 0) {
          if (this.dsThueBao.length == 1) this.thongTinTB = this.dsThueBao[0];
          else showModal = true;
        } else {
          showModal = true;
          this.$root.toastError(
            "Không tìm thấy thông tin thuê bao " + $("#inputThueBao").val()
          );
        }
        if (showModal) this.$bvModal.show("modal-ChonThueBao");
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    inputThueBao_onChange: function () {
      this.thongTinTB = {};
    },
    getDsThueBao: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsThueBaoTheoMaTB",
        {
          maThueBao: $("#inputThueBao").val().trim(),
          kieu: $("input[name='radioDBorHD']:checked").val(),
        }
      );
      return rs.data;
    },
    getLyLichDayMay: async function (thueBaoID) {
      let rs = await this.$root.context.post(
        "/web-cabman/tracuu/traCuuLyLichDayMay",
        {
          id: thueBaoID,
        }
      );
      return rs.data;
    },
    getThongTinBaoHong: async function (thueBaoID) {
      //thueBaoID = 1680477
      let rs = await this.$root.context.post(
        "/web-cabman/tracuu/traCuuLichSuBaoHongThueBao",
        {
          id: thueBaoID,
        }
      );
      return rs.data;
    },
    showReport: async function () {
      let rs = await this.getLyLichDayMay(this.thongTinTB.THUEBAO_ID);
      this.thongTinTBTraCuu = rs.ThongTinThueBao[0];
      this.thongTinGianDo = rs.DanDoCap;

      let rsBaoHong = await this.getThongTinBaoHong(this.thongTinTB.THUEBAO_ID);
      this.thongTinBaoHong = rsBaoHong;

      this.doRenderPDF = !this.doRenderPDF;
      this.showPanelReport = true;
    },
    btnTraCuu_Click: async function () {
      this.$root.showLoading(true);
      try {
        if (this.thongTinTB.THUEBAO_ID == undefined) {
          this.dsThueBao = await this.getDsThueBao();
          if (this.dsThueBao.length > 0) {
            this.thongTinTB = this.dsThueBao[0];
          }
        }
        if (this.thongTinTB.THUEBAO_ID != undefined) {
          await this.showReport();
        } else {
          this.$root.toastError(
            "Không tìm thấy thông tin thuê bao " + $("#inputThueBao").val()
          );
        }
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnInLyLich_Click: function () {
      if($("#apppdf iframe").length !== 0)
        $("#apppdf iframe")[0].contentWindow.print();
    },
  },
};
</script>
<style>
.pdf-content {
  width: 100%;
  background: #fff;
  font-size: 13px;
  line-height: 185%;
}
.pdf-content .report-info {
  margin-top: 15px;
  width: 100%;
  display: block;
}
.pdf-content .rp-row {
  width: 100%;
  display: flex;
}
.pdf-content .rp-col {
  width: 50%;
  display: flex;
}
.pdf-content .report-header .rp-title {
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 0;
}
.pdf-content .report-header .rp-somay,
.pdf-content .report-header .rp-tongdai {
  width: 33%;
  border: 1px solid #9e9e9e;
  padding: 10px;
  display: flex;
  flex-flow: column;
}
.pdf-content .report-header .rp-somay .label,
.pdf-content .report-header .rp-tongdai .label {
  width: auto;
  flex-grow: 1;
  font-weight: normal;
}
.pdf-content .report-info .info-header {
  font-weight: bold;
  text-decoration: underline;
}
.pdf-content .rp-row .label {
  white-space: nowrap;
}
.pdf-content .rp-row .value {
  padding-left: 5px;
}
.pdf-content .rp-row .label {
  width: 115px;
  flex: none;
  font-weight: bold;
}
.pdf-content .rp-cus .label {
  width: auto;
}
.pdf-content .text-right {
  text-align: right;
}
.pdf-content .text-center {
  text-align: center;
}
.pdf-content .text-bold {
  font-weight: bold;
}
.pdf-content .rp-table {
  width: 100%;
}
.pdf-content .rp-table th,
.pdf-content .rp-table td {
  padding: 5px;
  line-height: 140%;
  border-right: 1px solid #999;
}
.pdf-content .rp-table tr th:first-child,
.pdf-content .rp-table tr td:first-child {
  border-left: 1px solid #999;
}
.pdf-content .rp-table th {
  text-align: center;
}
.pdf-content .rp-table tr {
  page-break-inside: avoid;
  border-bottom: 1px solid #999;
}
.pdf-content .rp-table tr:first-child {
  border-top: 1px solid #999;
}
</style>
