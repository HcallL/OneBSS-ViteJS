<template src="./index.template.html"></template>
<script>
import '@/utils/gmaps'
import { mapActions, mapState, mapGetters } from 'vuex'
import { getterName, actionName, statePropertyName } from './../store'
import BanDo from '../components/BanDo.vue'
import GianDo from '../components/GianDo.vue'
import GraphPolyline from '../structures/GraphPolyline'
import GraphNode from '../structures/GraphNode'
import DiagramLib from '../../../../utils/DiagramLib'
import ModalTracnghiemExt from '../modal/TracNghiemExt'
import ModalChonDSKetCuoiExt from '../modal/ChonDSKetCuoiExt'
import ModalQLKetCuoiExt from '../modal/QLKetCuoiExt'
import ModalChonTramThietBiExt from '../modal/ChonTramThietBiExt'
import ModalQLCapExt from '../modal/QLCapExt'
import ModalPhanChiaDoanCapChenKetCuoi from '../modal/PhanChiaDoanCapChenKetCuoi'

import DauNoiCap from '../../DauNoiCap/DauNoiCap'
import TraCuuTBaoCap from '../../tracuu-thuebao-theo-cap/TraCuuTBao'
import TraCuuTBaoKetCuoi from '../../tracuu-thuebao-theo-ketcuoi/TraCuuTBao'

import QuanLyCapReNhanh from '../../QuanLyCapReNhanh/QuanLyCapReNhanh'
import QuanLyTramThietBi from '../../QuanLyMangTruyenDan-Cuong/QuanLyTramThietBi'

import EventBus from '@/utils/eventBus'
import {debounce} from './debounce'

import GraphVizControl from '../components/GraphVizControl.vue'

export default {
  name: 'rightPaneContent',
  components: { GraphVizControl, QuanLyTramThietBi, BanDo, GianDo, QuanLyCapReNhanh, TraCuuTBaoCap, TraCuuTBaoKetCuoi, ModalChonTramThietBiExt, ModalTracnghiemExt, ModalChonDSKetCuoiExt, ModalQLKetCuoiExt, ModalQLCapExt, ModalPhanChiaDoanCapChenKetCuoi, DauNoiCap },
  data () {
    return {
      dataGraphVizControl: null,
      height: 200,
      width: 200,
      totalMemory: 16777216 * 2,
      graphviz: null,
      code: {
        type: String,
        default: 'digraph {a -> b}'
      },
      sizeAreaL: 100,
      nodeDauNoi: {},
      ds_dv: [],
      tramTb_id: null,
      showtabpane: true,
      dsLoaiDT: [{
        value: 0,
        label: 'Tất cả',
        photo: ''
      }, {
        value: 1,
        label: 'Kết cuối',
        photo: ''
      }, {
        value: 2,
        label: 'Cáp',
        photo: ''
      }, {
        value: 3,
        label: 'Thuê bao',
        photo: ''
      }],
      valueLoaiDT: 0,
      timKiemDT: false,
      txtTimKiem: '',
      debouncedtxtTimKiem: '',
      dsDT: [],
      showKetQuaTimKiem: false,
      search_query: '',
      infoMapDefault: {},
      thongtinbando: {},
      capObject: {
        CAP_ID: '',
        MIDSPAN_ID: ''
      },
      doiTuongCap: {cap_id: ''},
      doiTuongKetCuoi: {
        ketcuoi_id: '',
        vitri: -1,
        mat: 2
      },
      bottomactions: false,
      midspanObject: {
        MIDSPAN_ID: null,
        CAP_ID: null,
        KETCUOI_N_ID: null,
        KETCUOI_D_ID: null,
        KYHIEU_KETCUOI_N: null,
        KYHIEU_KETCUOI_D: null,
        DONVI_ID: null,
        DONVI_TD_ID: null,
        TEN_DV: null,
        TEN_DV_TD: null,
        LOPMC_ID: null,
        LOP_MC: null,
        KIEUDC_ID: null,
        KIEUCAP_ID: null,
        KIEU_CAP: null,
        KYHIEU: '',
        CHIEUDAI: null,
        DS_SOI: ''
      }
    }
  },
  computed: {
    ...mapState('cabman/BanDoMangCap', statePropertyName),
    ...mapState('cabman', ['BanDoMangCap']),
    ...mapGetters('cabman/BanDoMangCap', getterName),
    getNodeDauNoi () { return this.nodeDauNoi.KYHIEU_KC }
  },
  watch: {
    debouncedtxtTimKiem (val) {
      let txtTimKiem = val.trim()
      if (txtTimKiem.length > 3) {
        var typeList = '1,2,3'
        if (this.valueLoaiDT !== 0) {
          typeList = this.valueLoaiDT.toString()
        }
        this.queryDT(txtTimKiem, typeList)
      }
    },
    txtTimKiem: debounce(function (newVal) {
      this.debouncedtxtTimKiem = newVal
    }, 500),
    showtabpane (val) {
      let TabPageIndex = 0
      if (val) {
        TabPageIndex = 0
      } else {
        TabPageIndex = 1
      }
      this.set_TabPageIndex(TabPageIndex)
    },
    gian_do_cap: function (val) {
      console.log('gian_do_cap', JSON.stringify(val))
      // console.log('gian_do_cap', (val))
      let data = [...val]
      var map = this.$refs.map
      var giando = this.$refs.giando

      var nodes = []
      var polylines = []

      map.clear()
      giando.clear()
      for (let i = 0; i < data.length; i++) {
        var node_n = new GraphNode()

        var ten_n = data[i].TEN_N
        var nguon_id = data[i].NGUON_ID
        var lopmc_id = data[i].LOPMC_ID
        var icon_n = data[i].ICON_N
        if (ten_n === null) {
          if (lopmc_id === 1 || lopmc_id === 4) {
            nguon_id = 'THIEU_TRAM_NGUON_' + data[i].CAP_ID
            ten_n = 'Nhấn vào đây để tạo trạm nguồn'
          } else {
            nguon_id = 'THIEU_KETCUOI_NGUON_' + data[i].CAP_ID
            ten_n = 'Nhấn vào đây để tạo kết cuối nguồn'
          }
          icon_n = 'ADD'
        }
        node_n.id = nguon_id
        node_n.id_polyline = 'CAP_' + data[i].CAP_ID
        node_n.label = ten_n
        node_n.style = icon_n
        node_n.symbol = data[i].KYHIEU_N === null ? ten_n : data[i].KYHIEU_N
        node_n.tooltipText = ten_n
        node_n.setPosition(data[i].TOADO_N)
        node_n.setIcon(icon_n)
        node_n.draggable = true

        let objIndex = nodes.findIndex(obj => obj.id === node_n.id)
        if (objIndex < 0) nodes.push(node_n)

        var polyline = new GraphPolyline()
        let lat
        let lng
        if (data[i].TOADO_N === null) {
          lat = 0
          lng = 0
        } else {
          lat = parseFloat(data[i].TOADO_N.split(',')[0])
          lng = parseFloat(data[i].TOADO_N.split(',')[1])
        }
        polyline.path.push({id: nguon_id, lat: lat, lng: lng})
        let DAY_TOADO = data[i].DAY_TOADO
        if (DAY_TOADO) {
          let arr = DAY_TOADO.split(';')
          for (let j = 0; j < arr.length; j++) {
            let arr2 = arr[j].split(',')
            let lat = parseFloat(arr2[0])
            let lng = parseFloat(arr2[1])
            var id = 'DIEMUON_' + this.create_UUID()
            var node = new GraphNode()
            node.id = id
            node.visible = false
            node.draggable = true
            node.setPosition(arr[j])
            node.isDiemuon = true
            node.id_polyline = 'CAP_' + data[i].CAP_ID
            let objIndex = nodes.findIndex(obj => obj.id === node.id)
            if (objIndex < 0) nodes.push(node)
            polyline.path.push({id: id, lat: lat, lng: lng})
          }
        }

        var node_d = new GraphNode()

        var ten_d = data[i].TEN_D
        var dich_id = data[i].DICH_ID
        var icon_d = data[i].ICON_D
        if (ten_d === null) {
          if (lopmc_id === 3 || lopmc_id === 4) {
            dich_id = 'THIEU_TRAM_DICH_' + data[i].CAP_ID
            ten_d = 'Nhấn vào đây để tạo trạm đích'
          } else {
            dich_id = 'THIEU_KETCUOI_DICH_' + data[i].CAP_ID
            ten_d = 'Nhấn vào đây để tạo kết cuối đích'
          }
          icon_d = 'ADD'
        }
        let lat2
        let lng2
        if (data[i].TOADO_D === null) {
          lat2 = 0
          lng2 = 0
        } else {
          lat2 = parseFloat(data[i].TOADO_D.split(',')[0])
          lng2 = parseFloat(data[i].TOADO_D.split(',')[1])
        }
        polyline.path.push({id: dich_id, lat: lat2, lng: lng2})
        polyline.id = 'CAP_' + data[i].CAP_ID
        polyline.label = data[i].TEN_CAP
        polyline.source = nguon_id
        polyline.dest = dich_id
        polyline.style = data[i].STYLE
        objIndex = polylines.findIndex(obj => obj.id === polyline.id)
        if (objIndex < 0) polylines.push(polyline)

        node_d.id = dich_id
        node_d.id_polyline = 'CAP_' + data[i].CAP_ID
        node_d.label = ten_d
        node_d.style = icon_d
        node_d.symbol = data[i].KYHIEU_D === null ? ten_d : data[i].KYHIEU_D
        node_d.tooltipText = ten_d
        node_d.setPosition(data[i].TOADO_D)
        node_d.setIcon(icon_d)
        node_d.draggable = true
        objIndex = nodes.findIndex(obj => obj.id === node_d.id)
        if (objIndex < 0) nodes.push(node_d)
      }

      map.setNodes(nodes.slice(0))
      map.setPolylines(polylines.slice(0))
      map.setLocationEx(null)

      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index]
        if (!element.isDiemuon) {
          let node = this.taoNode(element.id, element.symbol, element.style, element.label)
          giando.addNode(node)
        }
      }
      console.log('nodes', nodes)
      var ds_ketcuoi_ctd = []
      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index]
        if (!element.id.startsWith('KETCUOI')) continue
        if (element.position.lat * element.position.lat !== 0) continue
        if (element.id.split('_').length === 1) continue
        ds_ketcuoi_ctd.push({
          FULL_ID: element.id,
          KETCUOI_ID: element.id.split('_')[1],
          LOAIKC_ID: 1,
          KYHIEU: element.symbol
        })
      }
      this.set_ds_ketcuoi_ctd(ds_ketcuoi_ctd)

      polylines.forEach(line => {
        let idx = line.label.indexOf('Chiều dài:')
        let chieudai = ''
        if (idx > -1) {
          chieudai = line.label && line.label.substring(idx + ('Chiều dài:').length).trim()
        }
        let connector = this.taoConnector(line.id, line.source, line.dest, chieudai, line.style, line.label)
        giando.addConnector(connector)
      })
      giando.doLayout()
    }
  },
  methods: {
    ...mapActions('cabman/BanDoMangCap', actionName),
    zoomIn () { this.$refs.giando.zoomIn() },
    zoomOut () { this.$refs.giando.zoomOut() },
    BanDoZoomIn () { this.$refs.map.zoomIn() },
    BanDoZoomOut () { this.$refs.map.zoomOut() },
    ctrlDuyChuyenDoiTuong () { this.$refs.map.ctrlDuyChuyenDoiTuong() },
    ctrlLuuToaDoBanDo () { this.$refs.map.ctrlLuuToaDoBanDo() },
    ctrlPhanCapMang () { this.$refs.map.ctrlPhanCapMang() },
    ctrlThayDoiNguonDuLieu () { this.$refs.map.ctrlThayDoiNguonDuLieu() },
    taoCap () {
      if (this.vaction !== 'TaoCap') {
        this.setState({key: 'vaction', value: 'TaoCap'})
        this.setState({key: 'vnguon_id', value: null})
        this.setState({key: 'vdich_id', value: null})
        // graGianDo.ShowToast('info', 'Chọn kết cuối / trạm thiết bị nguồn\r\nNhấn ESC để hủy')
      }
    },
    compareNumbers (a, b) {
      return parseInt(b.split('_')[2]) - parseInt(a.split('_')[2])
    },
    compareNumbers2 (a, b) {
      return b.VITRI - a.VITRI
    },
    compareNumbers3 (a, b) {
      return parseInt(b.split('_')[1]) - parseInt(a.split('_')[1])
    },
    Format (fmtstr) {
      var args = Array.prototype.slice.call(arguments, 1)
      return fmtstr.replace(/\{(\d+)\}/g, function (match, index) {
        return args[index]
      })
    },
    onReload () {

    },
    async dauNoiBenTrong (node) {
      try {
        this.sizeAreaL = 50
        this.nodeDauNoi.KYHIEU_KC = node.KYHIEU_KC
        this.nodeDauNoi.KETCUOI_ID = node.KETCUOI_ID
        this.$refs.GraphVizControl.setNode(node)
        await this.$refs.GraphVizControl.loadData()
      } catch (error) {
        this.$root.showLoading(false)
        console.log('🚀 ~ file: index.vue ~ line 335 ~ dauNoiBenTrong ~ error', error)
      }
    },
    interactive () {

    },
    HidePanelDauNoi () {
      this.sizeAreaL = 100
      this.nodeDauNoi = {}
    },
    isEmptyObj (Obj) {
      var isEmptyObj = !Object.keys(Obj).length
      return isEmptyObj
    },
    getSizeAreaL () { return this.sizeAreaL },
    getSizeAreaR () { return 100 - this.sizeAreaL },
    taoketCuoi () {
      var dataQLKetCuoi = {}
      dataQLKetCuoi.cmd = 'TaoKetCuoi'
      dataQLKetCuoi.data = {
        capgoc_id: this.capgoc.CAP_ID,
        donvi_id: this.toql.DONVI_ID,
        phanloaikc_id: this.phanloaikc_id,
        kinhdo: 0,
        vido: 0,
        capgoc: this.capgoc,
        ketcuoi_id: null,
        ketcuoi_truoc_id: null
      }
      console.log('dataQLKetCuoi', dataQLKetCuoi)
      this.$refs.ModalQLKetCuoiExt.show(dataQLKetCuoi).then((result) => {
        if (result.ok) {
          console.log('Tạo kết cuối mới', result.data.KETCUOI_ID)
          if (result.data.KETCUOI_ID !== null) {
            EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
          }
        } else {

        }
      })
    },
    setThongTinMap: async function () {
      try {
        let map = this.$refs.map
        map.setinfoMapDefault(this.map)
      } catch (error) {
      } finally {
      }
    },
    setTxtTimKiem (value, searchquery, loai) {
      this.txtTimKiem = value
      this.TIMKIEM_DOITUONG(searchquery, loai)
    },
    async TIMKIEM_DOITUONG (searchquery, loai) {
      var query = searchquery + '|NGUOIDUNG_ID=' + this.$root.token.getNguoiDungID()
      console.log('TIMKIEM_DOITUONG', query)
      try {
        var rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/timkiem-doituong-v2', { query: query }
        )
        console.log('TIMKIEM_DOITUONG rs', rs.data)
        if (rs.data.dsDOITUONG.length === 0) {
          await this.$alert('Không tìm thấy tuyến cáp của đối tượng', 'Thông báo', {
            confirmButtonText: 'Đóng',
            type: 'error'
          })
          return
        } else {
          // Kiểm tra quyền thao tác với tuyến của tổ kỹ thuật khác
          if (this.ds_dv.length === 0) {
            this.ds_dv = await this.ds_donvi()
            console.log('ds_dv', this.ds_dv)
          }
          if (rs.data.dsTOKT.length > 0 && this.ds_dv.length > 0) {
            var tmp = rs.data.dsTOKT.filter((e) => { return e.SELECTED === 1 })
            console.log('ds_dv tmp', tmp)
            if (tmp.length > 0) {
              var isPermitted = false
              for (let index = 0; index < tmp.length; index++) {
                const DONVI_ID = tmp[index].ID
                const idx = this.ds_dv.findIndex((e) => e.DONVI_ID === DONVI_ID)
                if (idx > -1) {
                  isPermitted = true
                  break
                }
              }
              if (!isPermitted) {
                await this.$alert('Đối tượng thuộc quản lý của tổ kỹ thuật ' + tmp[0].NAME + ', bạn không có quyền thao tác.', 'Thông báo', {
                  confirmButtonText: 'Đóng',
                  type: 'error'
                })
                return
              }
            }
          }
          // End Kiểm tra quyền thao tác với tuyến của tổ kỹ thuật khác
          var dsDOITUONG = rs.data.dsDOITUONG
          if (dsDOITUONG.NHOMLC_ID === 0) { this.set_nhomlc(0) } else { this.set_nhomlc(1) }
          EventBus.$emit('SET_STATE', { dsTTVTS: rs.data.dsTTVTS, dsTOKT: rs.data.dsTOKT, dsTONGDAI: rs.data.dsTONGDAI, dsDOITUONG: rs.data.dsDOITUONG })
        }
      } catch (error) {
        console.log('TIMKIEM_DOITUONG', error)
      }
    },
    onTimKiem () {
      var typeList = '1,2,3'
      if (this.valueLoaiDT !== 0) {
        typeList = this.valueLoaiDT.toString()
      }
      var txtTimKiem = this.txtTimKiem.trim()
      if (txtTimKiem.length > 3) {
        this.queryDT(txtTimKiem, typeList)
      }
    },
    queryDT: async function (txtTimKiem, typeList) {
      try {
        var rs = await this.$root.context.post(
          '/web-cabman/thueBaoCapKetCuoi/goiNhacTimKiem', {searchQuery: txtTimKiem, types: typeList}
        )
        this.dsDT = rs.data
      } catch (error) {
      } finally {
      }
    },
    ds_donvi: async function () {
      try {
        var rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-sach-dv-nv'
        )
        return rs.data
      } catch (error) {
        return []
      } finally {
      }
    },
    hideTimKiem () {
      this.timKiemDT = false
    },
    showTimKiem () {
      this.timKiemDT = !this.timKiemDT
    },
    closeModaltracnghiem: function () {
      this.modalShowtracnghiem = !this.modalShowtracnghiem
    },
    closeModalChonDSKetCuoi: function () {
      this.modalShowChonDSKetCuoi = false
    },
    closeModalQLKetCuoi: function () {
      this.modalShowQLKetCuoi = !this.modalShowQLKetCuoi
    },
    async onChonKetCuoi (data) {
      let ketcuoi_id_new = data.KETCUOI_ID
      let cap_id = this.cap_id.split('_')[1]
      if (ketcuoi_id_new !== null) {
        let chieudaicap = 100
        let rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/chieu-dai-cap?cap_id=' + cap_id
        )
        if (rs.data && rs.data.length > 0) {
          chieudaicap = parseInt(rs.data[0].CHIEUDAI)
        }
        console.log('chieudaicap', chieudaicap)
        var cap1Length = Math.round(chieudaicap / 2)
        var cap2Length = Math.round(chieudaicap - cap1Length)

        console.log('cap1Length 1', cap1Length)
        console.log('cap2Length 1', cap2Length)

        this.$refs.ModalPhanChiaDoanCapChenKetCuoi.show(chieudaicap).then((result) => {
          if (result.ok) {
            cap1Length = result.data.chieudaicap_truoc
            cap2Length = result.data.chieudaicap_sau
          } else {

          }
          console.log('cap1Length 2', cap1Length)
          console.log('cap2Length 2', cap2Length)

          this.$confirm(`Sau khi chèn kết cuối thành công, thông tin đấu nối vào đích của cáp hiện tại sẽ bị gỡ bỏ. Bạn có chắc muốn thực hiện ?`,
            'Giản đồ mạng cáp',
            {
              confirmButtonText: 'Có',
              cancelButtonText: 'Không',
              type: 'warning'
            }).then(() => {
            this.loading(true)
            this.api_set_chen_ketcuoi({ cap_id: cap_id, ketcuoi_id: ketcuoi_id_new, dodaicap1: cap1Length, dodaicap2: cap2Length }).then((rep) => {
              this.loading(false)
              this.$root.$toast.success('Chèn kết cuối thành công')
              EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
            }).catch((e) => {
              this.loading(false)
              this.$root.$toast.error(e.message)
            })
          }).catch((e) => {})
        })
      }
    },
    taoConnector: function (id, source_id, dest_id, text, style, tooltip) {
      let sourceID = source_id
      let targetID = dest_id
      let text2 =
                "<div style='position: absolute; top: -40px; left: -20px;'><div class='text-nowrap' style='padding: 7px 10px; border: 1px solid #E0E0E0; background-color: #F5F5F5; display: inline-table; border-radius: 5px;'>" +
                tooltip +
                '</div></div>'
      let annotations = [
        {
          height: 10,
          width: 30,
          content: text,
          margin: { top: 20 },
          style: {
            textWrapping: 'NoWrap',
            fill: '#F5F5F5',
            strokeWidth: 1,
            strokeColor: '#E0E0E0'
          }
        }
      ]
      let annotations2 = [
        { template: text2, style: { textWrapping: 'NoWrap' } }
      ]
      let ketNoi = DiagramLib.taoKetNoiTheoStyle(
        style,
        id,
        sourceID,
        targetID, null, null,
        annotations
      )
      ketNoi.tooltip = { content: tooltip,
        position: 'BottomCenter',
        relativeMode: 'Object',
        animation: {
          open: { effect: 'FadeZoomIn', delay: 0 },
          close: { effect: 'FadeZoomOut', delay: 0 }
        }
      }
      ketNoi.styleCap = ketNoi.style
      return ketNoi
    },
    taoNode: function (nodeID, text, stringStyle, tooltip) {
      let annotations2 = []
      annotations2.push({ content: text, offset: { x: 0.5, y: 1 }, margin: { top: 15 }, style: { textWrapping: 'NoWrap', bold: true, fontfamily: 'Arial', fontsize: 12 } })
      let node = DiagramLib.taoNodeTheoStyle(
        stringStyle,
        nodeID,
        null,
        annotations2
      )
      // node.height = 50
      // node.width = 50
      node.tooltip = { content: tooltip,
        position: 'TopCenter',
        relativeMode: 'Object',
        animation: {
          open: { effect: 'FadeZoomIn', delay: 0 },
          close: { effect: 'FadeZoomOut', delay: 0 }
        }
      }
      return node
    },
    getPosition: function (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    create_UUID () {
      var dt = new Date().getTime()
      var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    async suaCap (id) {
      var arr = id.split('_')
      if (arr[2] === '0') {
        var data = {
          cap_id: arr[1]
        }
        console.log('suaCap', data)
        this.$refs.ModalQLCap.suaCap(data).then((result) => {
          if (result.ok) {
            console.log('suaCap', result)
            EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
          } else {
            console.log('Cancel')
          }
        })
      } else {
        // Cap mid-span
        this.midspanObject.MIDSPAN_ID = arr[2]
        this.$bvModal.show('popupQuanLyCapReNhanh')
      }
    },
    async xoaCap (id) {
      const vdoituongid = id.split('_')
      if (vdoituongid[2] === '0') {
        this.$confirm(`Bạn có muốn xóa cáp đang chọn không ?`,
          'Giản đồ mạng cáp',
          {
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            type: 'warning'
          }).then(() => {
          this.loading(true)
          this.api_set_xoa_cap({cap_id: vdoituongid[1], xoa_batbuoc: 1}).then((rep) => {
            this.loading(false)
            this.$root.$toast.success('Xóa cáp thành công')
            EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
          }).catch((error) => {
            this.loading(false)
            !error.response && this.$toast.error(error.message)
            error.response && this.$alert(error.response.data.message_detail, error.response.data.message, {
              dangerouslyUseHTMLString: true,
              confirmButtonText: 'Đóng',
              type: 'error'
            })
          })
        }).catch((e) => {})
      } else {
        if (vdoituongid[2] !== '0') {
          this.$confirm(`Bạn có muốn xóa cáp mid-span đang chọn không ?`,
            'Giản đồ mạng cáp',
            {
              confirmButtonText: 'Có',
              cancelButtonText: 'Không'
            }).then(() => {
            this.loading(true)
            this.api_set_xoa_cap_midspan({cap_id: vdoituongid[1], midspan_id: vdoituongid[2]}).then((rep) => {
              this.loading(false)
              this.$root.$toast.success('Xóa cáp midspan thành công')
              EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
            }).catch((error) => {
              this.loading(false)
              !error.response && this.$toast.error(error.message)
              error.response && this.$alert(error.response.data.message_detail, error.response.data.message, {
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'Đóng',
                type: 'error'
              })
            })
          }).catch((e) => {})
        }
      }
    },
    async chenketcuoi (id) {
      if (id) {
        this.cap_id = id
        var tracnghiem = {
          title: 'Chèn kết cuối',
          caption: 'Bước 1: Chọn nguồn kết cuối muốn chèn',
          options: ['Kết cuối chưa nối cáp', 'Tạo kết cuối mới'],
          data: id
        }
        this.$refs.ModalTracnghiemExt.show(tracnghiem)
          .then(result => {
            if (result.ok) {
              console.log('Chèn kết cuối', result)
              if (result.option === 0) {
                this.$refs.ModalChonDSKetCuoiExt.show(1).then(result => {
                  if (result.ok) {
                    console.log('Chọn danh sách kết cuối chưa đấu cáp', result)
                    this.onChonKetCuoi(result.selectedRow)
                  } else {
                    console.log('Cancel')
                  }
                })
              } else {
                var dataQLKetCuoi = {}
                dataQLKetCuoi.cmd = 'TaoKetCuoi'
                dataQLKetCuoi.data = {
                  capgoc_id: this.capgoc.CAP_ID,
                  donvi_id: this.toql.DONVI_ID,
                  phanloaikc_id: this.phanloaikc_id,
                  kinhdo: 0,
                  vido: 0,
                  capgoc: this.capgoc,
                  ketcuoi_id: null,
                  ketcuoi_truoc_id: null
                }
                this.$refs.ModalQLKetCuoiExt.show(dataQLKetCuoi).then((result) => {
                  if (result.ok) {
                    console.log('Tạo kết cuối mới', result.data.KETCUOI_ID)
                    if (result.data.KETCUOI_ID !== null) {
                      this.onChonKetCuoi({KETCUOI_ID: result.data.KETCUOI_ID})
                    }
                  } else {

                  }
                })
              }
            } else {
              console.log('Cancel')
            }
          })
      }
    },
    async thueBaoThuocCap (id) {
      // Cao Cuong code
      // alert(id)
      this.doiTuongCap.cap_id = id.split('_')[1]
      this.$bvModal.show('popupTraCuuTBaoCap')
    },
    async thueBaoThuocKetCuoi (id) {
      // Cao Cuong code
      // alert(id)
      this.doiTuongKetCuoi.ketcuoi_id = id.split('_')[1]
      this.$bvModal.show('popupTraCuuTBaoKetCuoi')
    },
    QuanLyTramThietBiIsOk (data) {
      console.log('QuanLyTramThietBiIsOk', data)
      EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
    },
    chuyennhanhcap (id) {
      if (id) {
        this.cap_id = id
        var tracnghiem = {
          title: 'Chuyển cáp',
          caption: 'Chọn kết cuối nguồn hoặc trạm thiết bị nguồn cần chuyển cáp tới',
          options: ['Trạm thiết bị nguồn', 'Kết cuối nguồn'],
          data: id
        }
        var doituong_nguon_id = -1
        var loai_nguon = null
        this.$refs.ModalTracnghiemExt.show(tracnghiem)
          .then(result => {
            if (result.ok) {
              if (result.option === 0) {
                loai_nguon = 'TRAM'
                this.$refs.ModalChonTramThietBiExt.show(null).then((result) => {
                  if (result.ok) {
                    doituong_nguon_id = result.selectedRow.DONVI_ID
                    if (doituong_nguon_id !== -1 && loai_nguon !== null) {
                      this.$confirm(`Sau khi chuyển cáp thành công, thông tin đấu nối vào nguồn của cáp hiện tại sẽ bị gỡ bỏ. Bạn có chắc muốn thực hiện ?`,
                        'Giản đồ mạng cáp',
                        {
                          confirmButtonText: 'Có',
                          cancelButtonText: 'Không'
                        }).then(() => {
                        this.CHUYEN_CAP(this.cap_id, doituong_nguon_id, loai_nguon)
                      }).catch((e) => {})
                    }
                  } else {
                    console.log('Cancel')
                  }
                })
              } else {
                loai_nguon = 'KETCUOI'
                this.$refs.ModalChonDSKetCuoiExt.show(0).then(result => {
                  if (result.ok) {
                    console.log('Chọn danh sách kết cuối đã đấu cáp', result)
                    doituong_nguon_id = result.selectedRow.KETCUOI_ID
                    if (doituong_nguon_id !== -1 && loai_nguon !== null) {
                      this.$confirm(`Sau khi chuyển cáp thành công, thông tin đấu nối vào nguồn của cáp hiện tại sẽ bị gỡ bỏ. Bạn có chắc muốn thực hiện ?`,
                        'Giản đồ mạng cáp',
                        {
                          confirmButtonText: 'Có',
                          cancelButtonText: 'Không'
                        }).then(() => {
                        this.CHUYEN_CAP(this.cap_id, doituong_nguon_id, loai_nguon)
                      }).catch((e) => {})
                    }
                  } else {
                    console.log('Cancel')
                  }
                })
              }
            } else {
              console.log('Cancel')
            }
          })
      }
    },
    async CHUYEN_CAP (cap_id, doituong_nguon_id, loai_nguon) {
      console.log(cap_id, doituong_nguon_id, loai_nguon)
      // try {
      //   var doituong = cap_id.split('_')
      //   this.$root.context.post(
      //     '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_CAP_ID: doituong[1], P_DOITUONG_NGUON_ID: doituong_nguon_id, P_LOAI_NGUON: loai_nguon, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_CHUYEN_CAP'}
      //   ).then((rs) => {
      //     console.log('CHUYEN_CAP', rs)
      //     this.TIMKIEM_DOITUONG('CAP|' + doituong[1] + '|TIM_THEO_ID', 2)
      //   })
      // } catch (error) {
      //   this.$root.$toast.error(error.message)
      // }

      try {
        var doituong = cap_id.split('_')
        var rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), P_CAP_ID: doituong[1], P_DOITUONG_NGUON_ID: doituong_nguon_id, P_LOAI_NGUON: loai_nguon, PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_CHUYEN_CAP'}
        )
        console.log('CHUYEN_CAP', rs)
        this.TIMKIEM_DOITUONG('CAP|' + doituong[1] + '|TIM_THEO_ID', 2)
      } catch (error) {
        this.$root.$toast.error(error.message)
      }
    },
    async taoKetCuoiDich (id) {
      if (id) {
        this.cap_id = id
        var tracnghiem = {
          title: 'Chọn kết cuối đích',
          caption: 'Chọn kết cuối đích',
          options: ['Tạo kết cuối mới', 'Chọn 1 kết cuối đang có trên giản đồ'],
          data: id
        }
        this.$refs.ModalTracnghiemExt.showWithSetChecked(tracnghiem, 0)
          .then(result => {
            if (result.ok) {
              if (result.option === 0) {
                var dataQLKetCuoi = {}
                dataQLKetCuoi.cmd = 'TaoKetCuoi'
                dataQLKetCuoi.data = {
                  donvi_id: this.toql.DONVI_ID,
                  phanloaikc_id: this.phanloaikc_id,
                  kinhdo: 0,
                  vido: 0,
                  capgoc: this.capgoc,
                  ketcuoi_id: null,
                  cap_id: id,
                  ketcuoi_truoc_id: null,
                  nguondich: 'DICH'
                }
                this.$refs.ModalQLKetCuoiExt.taoKetCuoiThieu(dataQLKetCuoi).then((result) => {
                  if (result.ok) {
                    const ketcuoi_id_new = result.data.KETCUOI_ID
                    console.log('Tạo kết cuối ketcuoi_id_new', ketcuoi_id_new)
                    if (ketcuoi_id_new !== null) {
                      EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
                    }
                  } else {

                  }
                })
              } else {
                //  vaction = GianDoActions.KetNoiKetCuoiThieu;
                //  graGianDo.ShowToast("info", "Chọn kết cuối đích\r\nNhấn ESC để hủy");
              }
            } else {
              console.log('Cancel')
            }
          })
      }
    },
    async TramThietBi (id) {
      this.tramTb_id = id
      this.$bvModal.show('popupTramThietBiGianDo')
    },
    async daochieuCap (id) {
      const vdoituongid = id.split('_')
      this.$confirm(`Sau khi đảo chiều cáp thành công, thông tin đấu nối vào 2 đầu của cáp hiện tại sẽ bị gỡ bỏ. Bạn có chắc muốn thực hiện ?`,
        'Giản đồ mạng cáp',
        {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          type: 'warning'
        }).then(() => {
        this.loading(true)
        this.api_set_daochieu_cap({cap_id: vdoituongid[1]}).then((rep) => {
          this.loading(false)
          this.$root.$toast.success('Đảo chiều cáp thành công')
          EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
        }).catch((error) => {
          this.loading(false)
          !error.response && this.$toast.error(error.message)
          error.response && this.$alert(error.response.data.message_detail, error.response.data.message, {
            dangerouslyUseHTMLString: true,
            confirmButtonText: 'Đóng',
            type: 'error'
          })
        })
      }).catch((e) => {})
    },
    async xoaKetcuoi (id) {
      console.log('xoaKetcuoi', id)
      const vdoituongid = id.split('_')
      this.$confirm(`Bạn có muốn xóa kết cuối đang chọn không ?`,
        'Giản đồ mạng cáp',
        {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          type: 'warning'
        }).then(() => {
        this.loading(true)
        this.api_set_xoa_ketcuoi({ketcuoi_id: vdoituongid[1], xoa_batbuoc: 1}).then((rep) => {
          this.loading(false)
          this.$root.$toast.success('Xóa kết cuối thành công')
          EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
        }).catch((error) => {
          this.loading(false)
          !error.response && this.$toast.error(error.message)
          error.response && this.$alert(error.response.data.message_detail, error.response.data.message, {
            dangerouslyUseHTMLString: true,
            confirmButtonText: 'Đóng',
            type: 'error'
          })
        })
      }).catch((e) => {})
    },
    async taoKetcuoi (id) {
      var ketcuoi_n_id = id.split('_')[1]
      var dataQLKetCuoi = {}
      dataQLKetCuoi.cmd = 'TaoKetCuoi'
      dataQLKetCuoi.data = {
        donvi_id: this.toql.DONVI_ID,
        phanloaikc_id: this.phanloaikc_id,
        kinhdo: 0,
        vido: 0,
        capgoc: this.capgoc,
        ketcuoi_id: null,
        ketcuoi_truoc_id: ketcuoi_n_id
      }
      this.$refs.ModalQLKetCuoiExt.show(dataQLKetCuoi).then((result) => {
        if (result.ok) {
          const ketcuoi_id_new = result.data.KETCUOI_ID
          console.log('Tạo kết cuối ketcuoi_id_new', ketcuoi_id_new)
          if (ketcuoi_id_new !== null) {
            var data = {
              capgoc: this.capgoc,
              donvi: null,
              donvi_td_id: null,
              ketcuoi_n_id: ketcuoi_n_id,
              ketcuoi_d_id: ketcuoi_id_new,
              kieucap_id: 0,
              toql: this.toql
            }
            console.log('taoCap', data)
            this.$refs.ModalQLCap.taoCap(data).then((result) => {
              if (result.ok) {
                console.log('taoCap', result)
                if (result.data.CAP_ID !== null) { EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO') }
              } else {

              }
            })
          }
        } else {

        }
      })
    },
    async dauNoiCap (id) {
      // alert('dauNoiCap' + id)
      // Truc code
      var doituong = id.split('_')
      this.capObject.CAP_ID = doituong[1]
      this.capObject.MIDSPAN_ID = doituong[2]
      this.$bvModal.show('popupDauNoiCap')
    },
    async suaTram (id) {
      // alert(id)
      this.tramTb_id = id.split('_')[1]
      this.$bvModal.show('popupTramThietBiGianDo')
    },
    async suaKetcuoi (id) {
      var dataQLKetCuoi = {}
      dataQLKetCuoi.cmd = 'SuaKetcuoi'
      // dataQLKetCuoi.cmd = 'ViewKetcuoi'
      dataQLKetCuoi.data = {
        ketcuoi_id: id.split('_')[1],
        phanloaikc_id: this.phanloaikc_id
      }
      this.$refs.ModalQLKetCuoiExt.show(dataQLKetCuoi).then((result) => {
        if (result.ok) {
          console.log('Sửa kết cuối', result)
          EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
        } else {

        }
      })
    },
    async luuToaDoBanDo (nodes, polylines) {
      if (polylines.length === 0 && nodes.length === 0) return
      this.$confirm(`Bạn có muốn lưu tọa độ cáp và kết cuối ?`,
        'Giản đồ mạng cáp',
        {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          type: 'warning'
        }).then(() => {
        try {
          this.loading(true)
          if (nodes && nodes.length > 0) {
            const myData = JSON.stringify(nodes)
            this.api_set_toado_doituong(myData).then((rep) => {
              EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
            }).catch((e) => {
              this.$root.$toast.error(e.message)
            })
          }
          if (polylines && polylines.length > 0) {
            var json = []
            for (let index = 0; index < polylines.length; index++) {
              const element = polylines[index]
              var day_toado = element.day_toado
              var data = []
              for (let index = 0; index < day_toado.length; index++) {
                const e = day_toado[index]
                data.push(e.lat + ',' + e.lng)
              }
              if (data.length > 0) {
                json.push({id: element.id, json: data.join(';') })
              } else {
                json.push({id: element.id, json: null })
              }
            }
            if (json.length > 0) {
              let data = JSON.stringify(json)
              this.api_set_toado_cap(data).then((rep) => {
                EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
              }).catch((e) => {
                this.$root.$toast.error(e.message)
              })
            }
          }
          this.loading(false)
          EventBus.$emit('NAP_GIANDO', 'NAP_GIANDO')
        } catch (e) {
          this.loading(false)
          this.$root.$toast.error(e.message)
        }
      }).catch(() => {})
    },
    isDuplicateKey (id, arr) {
      let isDupl = false
      for (let i = 0; i < arr.length; i += 1) {
        const obj = arr[i]
        if (obj.info.id === id) {
          isDupl = true
          break
        }
      }
      return isDupl
    },

    getUniqueId (prefix) {
      var d = new Date().getTime()
      d += (parseInt(Math.random() * 100)).toString()
      if (undefined === prefix) {
        prefix = 'uid-'
      }
      d = prefix + d
      return d
    }
  },
  async mounted () {
    try {
      this.setThongTinMap()
    } catch (error) {
      console.log('error', error)
    }
  },
  created () {
    EventBus.$on('SUA_KETCUOI', this.suaKetcuoi)
  },
  beforeDestroy () {
    this.napGianDo && EventBus.$off('SUA_KETCUOI', this.suaKetcuoi)
  }
}
</script>

<style>
  #map {

  }
</style>
