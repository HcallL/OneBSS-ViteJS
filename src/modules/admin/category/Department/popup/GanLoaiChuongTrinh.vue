<template>
  <b-modal
    ref="popupGanChuongTrinh"
    size="xl"
    hide-header
    hide-header-close
    hide-footer
    body-class="p-0"
    no-close-on-backdrop
    @show="handleShowModal"
    @hide="handleHideModal"
  >
    <div class="modal-content popup-box">
      <div class="popup-header">
        <div class="title">
          <span class="icon one-appstore"></span> Gán loại chương trình
        </div>
        <div class="close -ap icon-close" @click="hideModal"></div>
      </div>
      <vue-nav>
        <ul class="list">
          <li>
            <a @click="btnCapNhat_Click()">
              <span class="icon one-reload1"></span> Cập nhật (F5)
            </a>
          </li>
        </ul>
      </vue-nav>
      <div class="popup-body">
        <b-row>
          <vue-card>
            <DataGridCustom
              ref="dtLoaiCT"
              v-bind:columns="collumnsLCT"
              v-bind:dataSource="options.dsLoaiChuongTrinh"
              :showColumnCheckbox="true"
              :showFilter="true"
              :enabledSelectFirstRow="false"
              :selectionSettings="{ checkboxMode: 'ResetOnRowClick' }"
              panelDataHeight="300"
              @selectedItemsChanged="select_selectedItemsChanged"
              @actionComplete="selectRowsChon"
              :allowPaging="true" :enablePagingServer="false"
            ></DataGridCustom>
          </vue-card>
        </b-row>
      </div>
    </div>
  </b-modal>
</template>

<script>
import collums from '../define/collums'
import VueElement from '../components/VueElement.vue'
import DepartmentAPI from '../API'
import DataGridCustom from '../components/DataGrid'

export default {
  components: {
    VueElement,
    DataGridCustom
  },
  props: {
    donviId: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  data () {
    return {
      ...collums,
      target: '.main-wrapper',
      model: {},
      checkedLCT: [],
      options: {
        dsLoaiChuongTrinh: []
      }
    }
  },
  mounted () {

  },
  computed: {},
  methods: {
    async handleShowModal () {
      try {
        await this.SP_DONVI_LCT_NAPDULIEU()
      } catch (e) {
        console.log(e)
        this.$root.$toast.error(e.data ? e.data.message : 'Có lỗi xảy ra')
      }
    },
    handleHideModal () {

    },
    showModal () {
      this.$refs.popupGanChuongTrinh.show()
    },
    hideModal () {
      this.$refs.popupGanChuongTrinh.hide()
    },
    selectRowsChon () {
      let selectedRows = []
      for (let index in this.options.dsLoaiChuongTrinh) {
        if (this.options.dsLoaiChuongTrinh[index].CHON == '1') {
          selectedRows.push(index)
        }
      }
      this.$refs.dtLoaiCT.$refs.grid.selectRows(selectedRows)
    },
    async btnCapNhat_Click () {
      this.loading(true)
      try {
        if (this.checkedLCT.length > 0) {
          let ds = '['
          for (let index in this.checkedLCT) {
            try {
              let ov = '{LOAICT_ID: ' + this.checkedLCT[index].LOAI_CT_ID + ', MA_DV: ' + this.checkedLCT[index].MA_DV + '}'
              if (index != this.checkedLCT.length - 1) ov += ','
              ds += ov
            } catch (e) {

            }
          }

          ds += ']'
          await this.SP_DONVI_LCT_CAPNHAT(ds)
        } else {
          await this.SP_DONVI_LCT_CAPNHAT('')
        }

        await this.SP_DONVI_LCT_NAPDULIEU()
      } catch (e) {
        console.log(e)
        this.$toast.error('Cập nhật thất bại ' + e)
      }
      this.loading(false)
    },
    select_selectedItemsChanged (dataKeys) {
      this.checkedLCT = dataKeys
      this.options.dsLoaiChuongTrinh.forEach(function (item) {
        if (dataKeys.filter(x => x.CHON == '1')) {
          item.ischecked = true
        } else {
          item.ischecked = false
        }
      })
    },
    async SP_DONVI_LCT_NAPDULIEU () {
      this.options.dsLoaiChuongTrinh = []
      const params = {p_donvi_id: this.donviId}
      const response = await DepartmentAPI.SP_DONVI_LCT_NAPDULIEU(this.axios, params)
      if (response && response.data && response.data.error_code === 'BSS-00000000') {
        this.checkedLCT = []
        this.options.dsLoaiChuongTrinh = response.data.data
        if (this.options.dsLoaiChuongTrinh != undefined && this.options.dsLoaiChuongTrinh.length > 0) {
          this.$refs.dtLoaiCT.setCurrentSelectedRow(0)
          for (let index in this.options.dsLoaiChuongTrinh) {
            if (this.options.dsLoaiChuongTrinh[index].CHON == '1') {
              this.$refs.dtLoaiCT.$refs.grid.selectRow(index)
            }
          }
        }
      }
    },
    async SP_DONVI_LCT_CAPNHAT (ds) {
      const params = {
        p_donvi_id: this.donviId,
        p_loaict_id: 0,
        p_ma_dv: ds
      }
      const response = await DepartmentAPI.SP_DONVI_LCT_CAPNHAT(this.axios, params)
      console.log(response)
    }
  },
  watch: {}
}
</script>
