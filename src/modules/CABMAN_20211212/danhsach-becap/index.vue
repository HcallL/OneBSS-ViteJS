<template src="./index.template.html"></template>
<script>
import ModalQLBe from "../BanDoTuyenCong/QLBe/Modal";
export default {
  components: {
    ModalQLBe
  },
  data: function () {
    return {
      dsTTVT: [],
      selectedTTVT: 0,
      dsToKT: [],
      selectedToKT: 0,
      dsTuyenCong: [],
      selectedTuyenCong: 0,
      inputTuyenCongChecked: false,
      kqTraCuu: [],
      beItem: {}
    };
  },
  created: async function () {
    this.$root.showLoading(true);
    try {
      this.dsTTVT = await this.getDsTTVT();
      if (!(this.dsTTVT == null || this.dsTTVT.length == 0)) {
        this.selectedTTVT = this.dsTTVT[0].DONVI_ID;
        this.dsToKT = await this.getDsToKT();
      }
    } catch (error) {
    } finally {
      this.$root.showLoading(false);
    }
  },
  methods: {
    getDsTTVT: async function () {
      let rs = await this.$root.context.post(
        "/web-ecms/danhmuc/layDsTTVTTrongToken"
      );
      return rs.data;
    },
    getDsToKT: async function () {
      let rs = await this.$root.context.post("/web-ecms/danhmuc/layDsToKT", {
        id: this.selectedTTVT,
      });
      return rs.data;
    },
    getDsTuyenCong: async function () {
      let rs = await this.$root.context.post(
        "/web-cabman/danhmuc/layDsTuyenCongTheoToQL",
        {
          toQLID: this.selectedToKT,
          loaiTuyen: 1,
        }
      );
      return rs.data;
    },
    getDsBeCap: async function () {
      let tuyenCot = null;
      if (this.inputTuyenCongChecked) {
        if (this.selectedTuyenCong > 0) tuyenCot = this.selectedTuyenCong;
      }
      let rs = await this.$root.context.post(
        "/web-cabman/danhsachdoancong/lietKeDanhSachBeCap",
        {
          tuyencot_id: tuyenCot,
          toql_id: this.selectedToKT > 0 ? this.selectedToKT : null,
          query: $("#inputTimKiem").val(),
        }
      );
      return rs.data;
    },
    selectTTVT_OnChange: async function () {
      this.$root.showLoading(true);
      try {
        this.selectedToKT = 0;
        this.dsToKT = await this.getDsToKT();
        this.selectedTuyenCong = 0;
        this.dsTuyenCong = [];
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    selectToKT_OnChange: async function () {
      this.$root.showLoading(true);
      try {
        this.selectedTuyenCong = 0;
        this.dsTuyenCong = await this.getDsTuyenCong();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnTraCuu_onClick: async function () {
      this.$root.showLoading(true);
      try {
        this.kqTraCuu = await this.getDsBeCap();
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    grid_onCommandClicked: function (name, dataItem) {
      this.beItem = {
        beCapId: dataItem.BECAP_ID,
        tuyenCongId: dataItem.TUYENCB_ID,
        dvql: {
          id: dataItem.DONVI_ID,
        },
      };
      this.$bvModal.show("popupQLBe");
    },
    popupQLBe_XacNhan: async function () {
      await btnTraCuu_onClick();
    }
  },
};
</script>
