<template src="./index.template.html"></template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getterName, actionName, statePropertyName } from './../store'

import EventBus from '@/utils/eventBus'
import Vue from 'vue'

import ModalChonDSKetCuoiExt from '../modal/ChonDSKetCuoiExt'
import ModalQLKetCuoiExt from '../modal/QLKetCuoiExt'
import ModalQLCapExt from '../modal/QLCapExt'
import QuanLyTramThietBi from '../../QuanLyMangTruyenDan-Cuong/QuanLyTramThietBi'

export default {
  name: 'leftPaneContent',
  components: {QuanLyTramThietBi, ModalChonDSKetCuoiExt, ModalQLKetCuoiExt, ModalQLCapExt},
  computed: {
    ...mapState('cabman/BanDoMangCap', statePropertyName),
    ...mapState('cabman', ['BanDoMangCap']),
    ...mapGetters('cabman/BanDoMangCap', getterName),
    getSoKetCuoiChuaDauCap () {
      return `Kết cuối chưa đấu cáp (${this.ds_ketcuoi_cnc.length})`
    },
    getSoKetCuoiChuaCoToaDo () {
      return `Kết cuối chưa có tọa độ (${this.ds_ketcuoi_ctd.length})`
    },
    getDSKetCuoiChuaCoToaDo () {
      return [...this.ds_ketcuoi_ctd]
    }
  },
  data () {
    return {
      tramTb_id: null,
      LockEvents: false,
      selectedTTVT: {
        DONVI_ID: null,
        TEN_DV: null
      },
      selectedTOKT: {
        DONVI_ID: null,
        TEN_DV: null
      },
      selectedTRAM: {
        DONVI_ID: null,
        TEN_DV: null
      },
      ds_nhom: [{
        ID: 0,
        TEN: 'Cáp đồng'
      }, {
        ID: 1,
        TEN: 'Cáp quang'
      }],
      nhomlc_id: 1,
      showGridKCCNC: false,
      showGridKCCTD: false,
      pageSettings: { pageSize: 20 },
      customAttributes: {class: 'customcss'},
      columnTemplate: function () {
        return {
          template: {
            template: '<span :id="data.index" :style="{display: display }" style="font-size: 12px;" class="col-mark-selected-row fa fa-play text-main"></span>',
            data () {
              return {
                data: { }
              }
            },
            computed: {
              display () {
                return parseInt(this.data.index) === this.$parent.getSelectedRowIndexes()[0] ? 'block' : 'none'
              }
            }
          }
        }
      },
      filterBarTemplate: {
        create: function (args) {
          let div = document.createElement('div')
          div.classList.add('input-icon-right')

          let input = document.createElement('input')
          input.classList.add('form-control')
          input.id = args.column.foreignKeyField

          let span = document.createElement('span')
          span.classList.add('icon', 'nc-icon-outline', 'ui-1_zoom')

          div.append(input)
          div.append(span)

          return div
        },
        write: function (args) {
          args.element.querySelector('input').addEventListener('input', (args) => {
            let value = args.currentTarget.value

            if (!value) {
              this.parent.removeFilteredColsByField(args.currentTarget.id)
            } else {
              this.parent.filterByColumn(args.currentTarget.id, 'contains', value)
            }
          })
        }
      },
      templateCmd: function () {
        return { template: Vue.component('columnTemplate', {
          template: `<div>          
                      <a @click.prevent="suaKetCuoi(item)" href="#" class="btn btn-main pad4 lh14">
                        <span class="-ap icon-more_horiz"></span>
                      </a>
          
                      <a @click.prevent="ghimKetCuoiBanDo(item)" href="#" class="btn btn-main pad4 lh14">
                        <span class="-ap icon-chevron-thin-right"></span>
                      </a>
                    </div>`,
          data: function () {
            return {
              data: {}
            }
          },
          methods: {
            suaKetCuoi (item) {
              console.log('suaKetCuoi', item)
              // alert('Sửa thông tin kết cuối')
              EventBus.$emit('SUA_KETCUOI', item.FULL_ID)
            },
            ghimKetCuoiBanDo (item) {
              // alert('Chọn và ghim lên bản đồ')
              // console.log('ghimKetCuoiBanDo', item)
              EventBus.$emit('GHIM_KETCUOI', item)
            }
          },
          computed: {
            item: function () {
              return this.data
            }
          }
        })}
      },
      templateLocation: function () {
        return { template: Vue.component('columnTemplate', {
          template: `<div>
                     <a href="#" class="link one-location_crosshair f20"></a>
                    </div>`,
          data: function () {
            return {
              data: {}
            }
          },
          methods: {
          },
          computed: {
          }
        })}
      }
    }
  },
  provide: {

  },
  methods: {
    ...mapActions('cabman/BanDoMangCap', actionName),
    cboTRAMButtonClick () {
      // alert(this.selectedTRAM.DONVI_ID)
      this.tramTb_id = this.selectedTRAM.DONVI_ID
      this.$bvModal.show('popupTramThietBiGianDo2')
    },
    QuanLyTramThietBiIsOk () {},
    async ChonKCChuaNoiCap () {
      console.log(this.capgoc)
      if (Object.keys(this.capgoc).length === 0) {
        this.$alert('Chưa chọn cáp gốc, <b>Click Double</b> vào 1 cáp gốc từ danh sách để chọn.', 'Kết cuối chưa nối cáp', {
          confirmButtonText: 'Đóng',
          type: 'warning',
          dangerouslyUseHTMLString: true,
          callback: action => {

          }
        })
      } else {
        if (this.capgoc.CAP_ID !== null) {
          this.$refs.ModalChonDSKetCuoiExt.show(1).then(result => {
            if (result.ok) {
              console.log('Chọn danh sách kết cuối chưa đấu cáp', result)
              this.$root.context.post(
                '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_CAPGOC_ID: this.capgoc.CAP_ID, P_KETCUOI_ID: result.selectedRow.KETCUOI_ID, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_CAPNHAT_CAPGOC_CHO_KETCUOI'}
              ).then((rs) => {
                console.log('ChonKCChuaNoiCap1', rs)
                if (rs.data.length > 0) {
                  if (rs.data[0].RESULT === 1) {
                    this.$root.context.post(
                      '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_CAPGOC_ID: this.capgoc.CAP_ID, P_KETCUOI_ID: result.selectedRow.KETCUOI_ID, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_CAPNHAT_CAPGOC_CHO_CAP'}
                    ).then((rs) => {
                      console.log('ChonKCChuaNoiCap2', rs)
                      this.napGianDo(null)
                    })
                  }
                }
              })
            } else {
              console.log('Cancel')
            }
          })
        }
      }
    },
    grid3_onCommandClicked (name, dataItem) {
      console.log('grid3_onCommandClicked', name, dataItem)
      if (name === 'SUA_KETCUOI') {
        EventBus.$emit('SUA_KETCUOI', dataItem.FULL_ID)
        return
      }
      if (name === 'GHIM_KETCUOI') {
        EventBus.$emit('GHIM_KETCUOI', dataItem)
      }
    },
    grid2_onCommandClicked (name, dataItem) {
      console.log('grid2_onCommandClicked', name, dataItem)
      const ketcuoi_id = dataItem.KETCUOI_ID
      if (name === 'SUA_KETCUOI') {
        var dataQLKetCuoi = {}
        dataQLKetCuoi.cmd = 'SuaKetcuoi'
        dataQLKetCuoi.data = {
          ketcuoi_id: ketcuoi_id,
          phanloaikc_id: this.phanloaikc_id
        }
        this.$refs.ModalQLKetCuoiExt.show(dataQLKetCuoi).then((result) => {
          if (result.ok) {
            console.log('Sửa kết cuối', result)
            if (result.ok) {
              if (result.data.result) {
                this.NAP_DS_KETCUOI_CNC()
              }
            }
          } else {

          }
        })
        return
      }
      if (name === 'XOA_KETCUOI') {
        this.$confirm(`Bạn có muốn xóa kết cuối đang chọn không ?`,
          'Giản đồ mạng cáp',
          {
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            type: 'warning'
          }).then(() => {
          this.loading(true)
          this.api_set_xoa_ketcuoi({ketcuoi_id: ketcuoi_id, xoa_batbuoc: 1}).then((rep) => {
            this.loading(false)
            this.$root.$toast.success('Xóa kết cuối thành công')
            this.NAP_DS_KETCUOI_CNC()
          }).catch((error) => {
            this.loading(false)
            !error.response && this.$toast.error(error.message)
            error.response && this.$alert(error.response.data.message_detail, error.response.data.message, {
              dangerouslyUseHTMLString: true,
              confirmButtonText: 'Đóng',
              type: 'error'
            })
          })
        }).catch((e) => { this.loading(false) })
      }
      if (name === 'LOAIBO_KETCUOI') {
        this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_KETCUOI_ID: ketcuoi_id, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_LOAIBO_CAPGOC_CHO_KETCUOI'}
        ).then((rs) => {
          if (rs.data.length > 0) {
            this.$root.context.post(
              '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_KETCUOI_ID: ketcuoi_id, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_LOAIBO_CAPGOC_CHO_CAP'}
            ).then((rs) => {
              this.NAP_DS_KETCUOI_CNC()
            })
          }
        })
      }
      if (name === 'TAO_CAP') {
        var DT = ('KETCUOI_' + dataItem.KETCUOI_ID).split('_')
        if (this.vaction === 'None') {
          this.setState({key: 'vaction', value: 'TaoCap'})
          this.setState({key: 'vnguon_id', value: DT})
          this.setState({key: 'vdich_id', value: null})
          // graGianDo.ShowToast('info', 'Chọn kết cuối / trạm thiết bị đích\r\nNhấn ESC để hủy')
          return
        }
        if (this.vaction === 'TaoCap') {
          if (this.vnguon_id[0] !== DT[0] || this.vnguon_id[1] !== DT[1]) {
            this.setState({key: 'vdich_id', value: DT})
            var donvi_id = null
            var ketcuoi_n_id = null
            var ketcuoi_d_id = null
            var donvi_td_id = null
            if (this.vnguon_id[0] === 'TRAM') { donvi_id = this.vnguon_id[1] } else { ketcuoi_n_id = this.vnguon_id[1] }
            if (this.vdich_id[0] === 'TRAM') { donvi_td_id = this.vdich_id[1] } else { ketcuoi_d_id = this.vdich_id[1] }

            var data = {
              capgoc: this.capgoc,
              donvi: donvi_id,
              donvi_td_id: donvi_td_id,
              ketcuoi_n_id: ketcuoi_n_id,
              ketcuoi_d_id: ketcuoi_d_id,
              kieucap_id: 0,
              toql: this.toql
            }
            console.log('taoCap', data)
            this.$refs.ModalQLCap.taoCap(data).then((result) => {
              if (result.ok) {
                console.log('taoCap', result)
                if (result.data.CAP_ID !== null) { this.napGianDo() }
              } else {

              }
              this.setState({key: 'vaction', value: 'None'})
              this.setState({key: 'vnguon_id', value: null})
              this.setState({key: 'vdich_id', value: null})
            })
            // graGianDo.HideToast();
          }
        }
        if (this.vaction === 'TaoCapMidSpan') {
          if (this.vnguon_id[0] !== DT[0] || this.vnguon_id[1] !== DT[1]) {
            this.setState({key: 'vdich_id', value: DT})
            var donvi_id = null
            var ketcuoi_n_id = null
            var ketcuoi_d_id = null
            var donvi_td_id = null
            if (this.vnguon_id[0] == 'TRAM') { donvi_id = this.vnguon_id[1] } else { ketcuoi_n_id = this.vnguon_id[1] }
            if (this.vdich_id[0] == 'TRAM') { donvi_td_id = this.vdich_id[1] } else { ketcuoi_d_id = this.vdich_id[1] }

            var data = {
              capgoc: this.capgoc,
              donvi: donvi_id,
              donvi_td_id: donvi_td_id,
              ketcuoi_n_id: ketcuoi_n_id,
              ketcuoi_d_id: ketcuoi_d_id,
              kieucap_id: 0,
              toql: this.toql
            }
            console.log('taoCap', data)
            this.$refs.ModalQLCap.taoCap(data).then((result) => {
              if (result.ok) {
                console.log('taoCap', result)
                if (result.data.CAP_ID !== null) { this.napGianDo() }
              } else {

              }
              this.setState({key: 'vaction', value: 'None'})
              this.setState({key: 'vnguon_id', value: null})
              this.setState({key: 'vdich_id', value: null})
            })
            // graGianDo.HideToast();
          }
        }
      }
    },
    async selectedKCCNC (args) {

    },
    async onDoubleClick (args) {
      try {
        var rowData = args.rowData
        this.set_cap_goc(rowData).then(() => {
          this.napGianDo(null)
        })
      } catch (error) {
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    // async set_state (val) {
    //   console.log('set_state', val)
    // },
    async napGianDo () {
      // if (Object.keys(this.capgoc).length === 0 || this.capgoc.CAP_ID === null) return
      // this.loading(true)
      // this.api_get_gian_do_cap(this.capgoc.CAP_ID).then(() => {
      //   this.NAP_DS_KETCUOI_CNC()
      //   this.loading(false)
      // }).catch((e) => {
      //   this.loading(false)
      //   this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      // })
      try {
        if (Object.keys(this.capgoc).length === 0 || this.capgoc.CAP_ID === null) return
        this.loading(true)
        await this.api_get_gian_do_cap(this.capgoc.CAP_ID)
        await this.NAP_DS_KETCUOI_CNC()
        this.loading(false)
      } catch (error) {
        this.loading(false)
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    async NAP_DS_KETCUOI_CNC () {
      try {
        await this.api_get_ds_ketcuoi_chua_nhapcap(this.capgoc.CAP_ID)
      } catch (error) {
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    async loadData () {
      try {
        await this.api_get_ds_ttvt(this.$root.token.getPhanVungID())
        if (this.ds_ttvt.length > 0) {
          this.selectedTTVT = this.ds_ttvt[0]
        } else {
          this.selectedTTVT.DONVI_ID = null
          this.selectedTTVT.TEN_DV = null
        }
      } catch (error) {
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    async getDsToKT () {
      try {
        await this.api_get_ds_tokt(this.selectedTTVT.DONVI_ID)
        if (this.ds_tokt.length > 0) {
          this.selectedTOKT = this.ds_tokt[0]
        } else {
          this.selectedTOKT.DONVI_ID = null
          this.selectedTOKT.TEN_DV = null
        }
      } catch (error) {
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    async getDsTram () {
      try {
        await this.api_get_ds_tram(this.selectedTOKT.DONVI_ID)
        if (this.ds_tram.length > 0) {
          this.selectedTRAM = this.ds_tram[0]
        } else {
          this.selectedTRAM.DONVI_ID = null
          this.selectedTRAM.TEN_DV = null
        }
      } catch (error) {
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    grid1_rowSelected (data) {
      console.log('grid1_rowSelected', data)
    },
    async getDsCap () {
      try {
        this.setState({key: 'capgoc', value: {}})
        if (this.nhomlc_id === null || this.donvi.DONVI_ID === null) return
        let data = {donvi_id: this.donvi.DONVI_ID, nhomlc_id: this.nhomlc_id}
        console.log('getDsCap', data)
        await this.api_get_ds_cap(data)
        this.LockEvents = false
      } catch (error) {
        console.log('getDsCap', error)
        this.$root.$toast.error('Lỗi thực hiện nạp dữ liệu giản đồ mạng cáp')
      }
    },
    async SET_STATE (data) {
      this.LockEvents = true
      console.log('SET_STATE dsTTVTS', data.dsTTVTS)
      console.log('SET_STATE dsTOKT', data.dsTOKT)
      console.log('SET_STATE dsTONGDAI', data.dsTONGDAI)
      console.log('SET_STATE dsDOITUONG', data.dsDOITUONG)
      this.setState({ key: 'ds_ttvt',
        value: data.dsTTVTS.map(item => {
          return {
            DONVI_ID: item.ID,
            TEN_DV: item.NAME
          }
        }) })
      const i1 = data.dsTTVTS.find(e => e.SELECTED === 1)
      if (i1) {
        this.selectedTTVT = { DONVI_ID: i1.ID, TEN_DV: i1.NAME }
      }

      this.setState({ key: 'ds_tokt',
        value: data.dsTOKT.map(item => {
          return {
            DONVI_ID: item.ID,
            TEN_DV: item.NAME
          }
        }) })
      const i2 = data.dsTOKT.find(e => e.SELECTED === 1)
      if (i2) {
        this.selectedTOKT = { DONVI_ID: i2.ID, TEN_DV: i2.NAME }
      }

      this.setState({ key: 'ds_tram',
        value: data.dsTONGDAI.map(item => {
          return {
            DONVI_ID: item.ID,
            TEN_DV: item.NAME
          }
        }) })
      const i3 = data.dsTONGDAI.find(e => e.SELECTED === 1)
      if (i3) {
        this.selectedTRAM = { DONVI_ID: i3.ID, TEN_DV: i3.NAME }
        await this.set_donvi({ DONVI_ID: i3.ID, TEN_DV: i3.NAME })
        await this.getDsCap()
        // console.log('SET_STATE this.ds_cap', JSON.stringify(this.ds_cap))
        for (let index = 0; index < this.ds_cap.length; index++) {
          const element = this.ds_cap[index]
          var cap_id = element.CAP_ID
          var kyhieu = element.KYHIEU
          if (cap_id === data.dsDOITUONG[0].CAPGOC_ID) {
            console.log('element', element.CAP_ID)
            setTimeout(() => {
              this.$refs.grid1.setCurrentSelectedRow(index || 0)
            }, 500)
            this.set_cap_goc(element).then(() => {
              this.napGianDo(null).then(() => {

              })
            })
            break
          }
        }
      }
    }
  },
  watch: {
    LockEvents: function (val) {
      console.log('watch LockEvents', val)
    },
    selectedTTVT: function (val) {
      if (this.LockEvents) return
      console.log('watch selectedTTVT', val)
      this.clearState_ds_cap()
      this.getDsToKT()
    },
    selectedTOKT: function (val) {
      if (this.LockEvents) return
      console.log('watch selectedTOKT', val)
      this.clearState_ds_cap()
      this.set_tokt(val)
      this.getDsTram()
    },
    selectedTRAM: function (val) {
      if (this.LockEvents) return
      console.log('watch selectedTRAM', val)
      this.clearState_ds_cap()
      this.set_donvi(val)
      this.getDsCap()
    },
    getDSKetCuoiChuaCoToaDo (val) {
      console.log('getDSKetCuoiChuaCoToaDo', val)
    },
    ds_cap (val) {
      console.log('ds_cap', val)
      this.setState({key: 'gian_do_cap', value: []})
      this.setState({key: 'ds_ketcuoi_cnc', value: []})
      this.setState({key: 'ds_ketcuoi_ctd', value: []})
    }
  },
  created () {
    this.clearState()
    this.createApiManager()
    this.loadData()
  },
  beforeDestroy () {
    this.napGianDo && EventBus.$off('NAP_GIANDO', this.napGianDo)
    this.getDsCap && EventBus.$off('NAP_DS_CAP', this.getDsCap)
  },
  async mounted () {
    EventBus.$on('NAP_GIANDO', this.napGianDo)
    EventBus.$on('NAP_DS_CAP', this.getDsCap)
    EventBus.$on('SET_STATE', this.SET_STATE)
  }
}
</script>

<style>
#grid2 .e-grid .e-gridheader .e-columnheader{
        display: none;
    }
#grid3 .e-grid .e-gridheader .e-columnheader{
        display: none;
    }
</style>
