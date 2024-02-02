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

            getCSHT: async function () {
                try {
                    this.$root.showLoading(true);
                    var rs = await this.$root.context.get(
                        "/web-cabman/bando_tuyencot/ds_csht",
                        {
                            ma_csht: this.txtQuery,
                            page_index: this.pNo,
                            page_size: this.pSize,
                        }
                    );
                    this.dsCsht = rs.data;
                    //  console.log(this.dsCsht);
                } catch (error) {
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
            setPageSize: function (size) {
                this.pSize = size;
            },
            checkpNo: function () {
                if (this.pNo > 1) this.pNo = this.pNo - 1;
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
            openMap:function(args){
                console.log("openMap:" + args)
            }
        },
        data: function () {
            return {
                dsCsht: [],
                txtQuery: "",
                ma_csht: "",
                pNo: 1,
                pSize: 10,
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
