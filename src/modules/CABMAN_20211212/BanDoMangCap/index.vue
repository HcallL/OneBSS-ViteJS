<template src="./index.template.html"></template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getterName, actionName, statePropertyName } from './store'

import Vue from 'vue'
import EventBus from '@/utils/eventBus'
import ModalQLCapExt from './modal/QLCapExt'

const leftPaneContent = Vue.component('leftPaneContent', require('./leftPane').default)
const rightPaneContent = Vue.component('rightPaneContent', require('./rightPane').default)

export default {
  components: { leftPaneContent, rightPaneContent, ModalQLCapExt },
  name: 'BanDoMangCap',
  computed: {
    ...mapState('cabman/BanDoMangCap', statePropertyName),
    ...mapState('cabman', ['BanDoMangCap']),
    ...mapGetters('cabman/BanDoMangCap', getterName),
    getKyHieuCapGoc () {
      if (this.capgoc.KYHIEU !== null & this.capgoc.KYHIEU !== undefined) return 'Cáp gốc: ' + this.capgoc.KYHIEU
      else return 'Cáp gốc: <chưa chọn>'
    }
  },
  data () {
    return {
      leftPaneContent: function () {
        return { template: leftPaneContent }
      },
      rightPaneContent: function () {
        return { template: rightPaneContent }
      },
      modalShow: false
    }
  },
  methods: {
    ...mapActions('cabman/BanDoMangCap', actionName),
    GIANDO_ZOOMIN () {
      if (this.isEmpty(this.capgoc)) return
      EventBus.$emit('GIANDO_ZOOMIN', 'GIANDO_ZOOMIN')
    },
    GIANDO_ZOOMOUT () {
      if (this.isEmpty(this.capgoc)) return
      EventBus.$emit('GIANDO_ZOOMOUT', 'GIANDO_ZOOMOUT')
    },
    huongDan () {
      this.$alert('Tài liệu đang được cập nhật', 'Thông báo', {
        confirmButtonText: 'Đóng',
        callback: action => {

        }
      })
    },
    isEmpty (inputObject) {
      return Object.keys(inputObject).length === 0
    },
    taoCapGoc () {
      if (this.ds_tram.length === 0) return
      var data = {
        cap_id: null,
        capgoc: Object, // this.capgoc,
        donvi: this.donvi, // Trạm thiết bị
        donvi_td_id: null, // Đơn vị truyền dẫn
        ketcuoi_n_id: null,
        ketcuoi_d_id: null,
        kieucap_id: 0, // Cáp thuê bao
        toql: this.toql // Đơn vị quản lý
      }
      this.$refs.ModalQLCapGoc.taoCap(data).then((result) => {
        if (result.ok) {
          EventBus.$emit('NAP_DS_CAP', 'NAP_DS_CAP')
        }
      })
    },
    napGianDo () {
      if (this.isEmpty(this.capgoc)) return
      EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
    },
    inGianDo () {
      var file = this.capgoc && this.capgoc.KYHIEU ? this.capgoc.KYHIEU : 'ban-do-mang-cap'
      if (this.tabPageIndex === 0) {
        EventBus.$emit('IN_GIANDO', file)
      } else {
        EventBus.$emit('IN_BANDO', file)
      }
    },
    getThongTinMap: async function () {
      try {
        this.$root.showLoading(true)
        var rs = await this.$root.context.get(
          '/web-cabman/bando_matdo/thongtin_bando'
        )
        if (rs.data != null && rs.data.length > 0) {
          this.setMap({
            lat: parseFloat(rs.data[0].C_LATITUS),
            lng: parseFloat(rs.data[0].C_LONGTITUS),
            zoom: rs.data[0].DEFAULT_ZOOM,
            mapTypeId: 'roadmap'
          })
        }
      } catch (error) {
      } finally {
        this.$root.showLoading(false)
      }
    }
  },
  watch: {
  },
  async created () {
    this.clearState()
    this.createApiManager()
    this.set_TabPageIndex(0)
    await this.getThongTinMap()
  },
  async mounted () {

  }
}
</script>
<style scoped src="./index.scss">
</style>
