<template src="./ModalCsht.html"></template>
<script>
import {
  GridPlugin,
  Page,
  Filter,
  CommandColumn,
  Resize,
} from "@syncfusion/ej2-vue-grids";
import ToaDo from "../../ToaDo/Modal";
export default {
  name: "ModalCsht",
  props: ["modalId"],
  provide: {
    grid: [Filter, Page, CommandColumn, Resize],
  },
  created: async function () {},
  components: {
    ToaDo,
  },
  computed: {},
  methods: {
    focusMyElement: async function () {
      try {
        this.$root.showLoading(true);
      } catch (er) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    hiddenModal: function(){
    this.txtQuery = ''
    this.dsCsht = []
    this.totalRow = 0
    },
    getCSHT: async function (pNo =1,pSize=10) {
      try {
        this.$root.showLoading(true);
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/ds_csht",
          {
            ma_csht: this.txtQuery,
            page_index: pNo,
            page_size: pSize,
          }
        );
        if(rs.data!=null && rs.data.length>0){
        this.dsCsht = rs.data;
        this.totalRow = this.dsCsht.length}
      } catch (err) {
        this.$root.toastError(err.response.data.message_detail)
      } finally {
        this.$root.showLoading(false);
      }
    },
    grid_selectedRowChanged: function (data) {
      if (data != null) {
        this.ma_csht = data.maCSHT;
        this.objToaDo.toado = data.toaDo;
        this.objToaDo.diachi = data.diaChi;
      }
    },
    chonMa: function () {
      this.$emit("xacnhan", this.ma_csht);
      this.$bvModal.hide(this.modalId);
    },
    grid_dataGridCellCreated(e) {
      e.cellAllowHtml = true;
      $(e.cellElement).append(
        '<span class="btn btn-main btn-open-map nc-icon-glyph location_map-pin"></span>'
      );
      $(".btn-open-map").on("click", (e) => {
        this.$bvModal.show("popupToaDo");
    });
    },
    csht_PageChanged:async function(args){
    this.$root.showLoading(true);
      try {
        await this.getCSHT(args.pageIndex +1, args.pageSize);
      } finally {
        this.$root.showLoading(false);
      }
   },
  },
  data: function () {
    return {
      dsCsht: [],
      txtQuery: "",
      ma_csht: "",
      pNo: 1,
      pSize: 10,
      totalRow:0,
      objToaDo: {
        toado: "0,0",
        diachi: "",
      },
    };
  },
};
</script>
<style>
div#popupTCTTTB___BV_modal_outer_ {
  z-index: 10 !important;
  margin-top: 100px;
}
.dashboard-header {
  z-index: 9 !important;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>