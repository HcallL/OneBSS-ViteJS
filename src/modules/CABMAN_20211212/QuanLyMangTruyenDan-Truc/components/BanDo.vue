<template>
  <div>
    <div style="height: 910px;">
      <vue-simple-context-menu
        elementId="menuMap"
        :options="optionsMenuMap"
        ref="menuMap"
        @option-clicked="menuMap_Clicked"/>
      <vue-simple-context-menu
        elementId="menuRoute"
        :options="optionsRouteMenu"
        ref="menuRoute"
        @option-clicked="menuRoute_Clicked"/>
      <vue-simple-context-menu
        elementId="menuDiemUon"
        :options="optionsMenuDiemUon"
        ref="menuDiemUon"
        @option-clicked="menuDiemUon_Clicked"/>
      <vue-simple-context-menu
        elementId="menuNode"
        :options="optionsMenuNode"
        ref="menuNode"
        @option-clicked="menuNode_Clicked"/>
      <GmapMap
            id="map"
            ref="oneBSSGmap"
            :zoom="zoomLevel"
            @idle="OnFirstIdle"
            :options="mapOptions"
            :center="getPositionCenter"
            @click="LeftclickMap($event)"
            @rightclick="RightclickMap($event)"
            style="width: 100%; height: calc(100% - 26px);">
            <GmapMarker
                v-for="Node in getlistNode"
                :key="Node.Id"
                :position="Node.Position"
                :icon="Node.GetIcon()"
                :label="Node.GetLabel()"
                @mouseover="MouseOverNode($event, Node)"
                @mouseout="MouseOutNode($event, Node)"
                :draggable="Node.AllowMove && allowMove"
                @drag="dragPositionNode($event,Node)"
                @dragend="dragendPositionNode($event,Node)"
                @rightclick="rightclickNode($event, Node)"
                @dblclick="dblclickNode($event, Node)"
            >
            </GmapMarker>
             <GmapMarker
                  v-for="Node in getlistNodeDiemUon"
                  :key="Node.id"
                  :position="Node.Position"
                  :draggable="Node.AllowMove"
                  :icon="Node.GetIcon()"
                  @drag="dragPositionNode($event,Node)"
                  @dragend="dragendPositionNode($event,Node)"
                  @rightclick="rightclickNodeDiemUon($event, Node)"
                  >
            </GmapMarker>
            <GmapPolyline
                  v-for="Route in getlistRoute"
                  :key="Route.Id"
                  :path.sync="Route.Positions"
                  geodesic: true
                  :options="Route.RouteOptions()"
                  @mouseover="MouseOverRoute($event, Route)"
                  @mouseout="MouseOutRoute($event, Route)"
                  @rightclick="rightclickRoute($event, Route)"
                  @dblclick="dblclickRoute($event, Route)"
            >
            </GmapPolyline>
            <GmapInfoWindow
                :options="infoOptionsNode"
                :position="infoPositionNode"
                :opened="infoOpenedNode"
                @closeclick="infoOpenedNode = false">
                <span v-html="infoContentNode"></span>
            </GmapInfoWindow>
            <GmapInfoWindow
                :options="infoOptionsRoute"
                :position="infoPositionRoute"
                :opened="infoOpenedRoute"
                @closeclick="infoOpenedRoute = false">
                <span v-html="infoContentRoute"></span>
            </GmapInfoWindow>
      </GmapMap>
    </div>
      <DauNoiThietBi id="popupDauNoiThietBi" :doiTuong="doiTuong"/>
      <QLCap id="popupQuanLyCap" :capObj="thongTinCap.capObj" :taomoi="thongTinCap.taomoi" :editable="thongTinCap.editable"></QLCap>
      <QuanLyTramThietBi id="popupTramThietBi" :tramTb_id="tramTb_id"/>
      <ChonDoiTuong id="popupChonDoiTuongDich" @chon="ChonDT" :listObj="listObj"/>
      <QLKetCuoi modalID="QLKetCuoi" ref="QLKetCuoi"/>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getterName, actionName, statePropertyName } from '../store'
import {getGoogleMapsAPI} from 'gmap-vue'
import MeasureTool from 'measuretool-googlemaps-v3'
import EventBus from '@/utils/eventBus'
import html2canvas from 'html2canvas'
import Node from '../class/Node'
import Route from '../class/Route'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import DauNoiThietBi from '../../QuanLyMangTruyenDan-Minh/daunoi-thietbi/Modal'
import QLCap from '../../QLCap/QLCap'
import QuanLyTramThietBi from '../../QuanLyMangTruyenDan-Cuong/QuanLyTramThietBi'
import ChonDoiTuong from '../../QuanLyMangTruyenDan-Cuong/ChonDoiTuongDich/Modal'
import QLKetCuoi from '../Modal/QLKetCuoi'
export default {
  components: { MeasureTool, html2canvas, 'vue-simple-context-menu': VueSimpleContextMenu, DauNoiThietBi, QLCap, QuanLyTramThietBi, ChonDoiTuong, QLKetCuoi },
  name: 'BanDo',
  props: {
  },
  computed: {
    google: getGoogleMapsAPI,
    getPositionCenter () { return this.location },
    optionsRouteMenu () {
      return this.optionsMenu
    },
    getlistNodeDiemUon () { return this.Nodes.filter(n => n.Visible === true && n.IsDiemuon === true) },
    getlistNode () {
      return this.Nodes.filter(n => n.Visible === true && n.IsDiemuon === false && n.Position.lat * n.Position.lng > 0)
    },
    getlistRoute () {
      return this.Routes.filter(n => n.Visible === true)
    }
  },
  async created () {
    await this.$gmapApiPromiseLazy()
  },
  destroyed () {

  },
  data () {
    return {
      allowMove: false,
      mouselatLng: {},
      activePolyline: null,
      diemuonLatlng: null,
      optionsMenu: [
        {
          name: '<span class="icon nc-icon-outline ui-1_simple-add"></span> Thêm điểm uốn',
          slug: 'tao_diem_uon_cap'
        },
        {
          type: 'divider'
        },
        {
          name: '<span class="icon one-m-edit"></span> Sửa tọa độ cáp',
          slug: 'sua_toa_do_cap'
        },
        {
          name: '<span class="icon one-save1"></span> Kết thúc sửa',
          slug: 'ket_thuc_sua_cap'
        },
        {
          name: '<span class="icon one-reload-next"></span> Làm lại tuyến',
          slug: 'lam_lai_tuyen_cap'
        },
        {
          type: 'divider'
        },
        {
          name: '<span class="icon -ap icon-info_outline"></span> Thuộc tính',
          slug: 'thuoc_tinh_cap'
        }
      ],
      optionsMenuDiemUon: [
        {
          name: '<span class="icon one-td-app-outline"></span> Xóa điểm uốn',
          slug: 'xoa_diem_uon_cap'
        },
        {
          name: '<span class="icon nc-icon-outline ui-1_simple-add"></span> Chèn kết cuối',
          slug: 'chen_ket_cuoi'
        }
      ],
      optionsMenuNode: [
        // Huu Minh - add đấu nối thiết bị
        {
          name: '<span class="icon one-td-journey2"></span> Đấu nối thiết bị',
          slug: 'dau_noi_tbi'
        },
        {
          type: 'divider'
        },
        // Huu Minh - end
        {
          name: '<span class="icon nc-icon-outline arrows-1_tail-right"></span> Tạo cáp tới...',
          slug: 'tao_cap_toi_ketcuoi'
        },
        {
          name: '<span class="icon one-map-location1"></span> Cập nhật tọa độ...',
          slug: 'cap_nhat_toado_ketcuoi'
        },
        {
          type: 'divider'
        },
        {
          name: '<span class="icon -ap icon-info_outline"></span> Thuộc tính',
          slug: 'thuoc_tinh_ketcuoi'
        }
      ],
      optionsMenuMap: [
        {
          name: '<span class="icon one-reload-next"></span> Làm tươi',
          slug: 'lam_tuoi'
        },
        {
          type: 'divider'
        },
        {
          name: '<span class="icon one-map-location1"></span> Đây là đâu ?',
          slug: 'day_la_dau'
        },
        {
          name: '<span class="icon -ap icon-info_outline"></span> Tìm địa điểm',
          slug: 'tim_dia_diem'
        }
      ],
      locationrightclickMap: null,
      mapTypeId: 'ROADMAP',
      zoomLevel: 20,
      location: {lat: -1, lng: -1},
      mouselatLng: {},
      maxZoom: 20,
      map: null,
      mapOptions: {
        zoomControl: false,
        scaleControl: true,
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        maxZoom: this.maxZoom,
        disableDoubleClickZoom: true,
        draggableCursor: 'default',
        draggingCursor: 'pointer'
      },
      Nodes: [],
      Routes: [],
      infoOptionsNode: {
        shouldFocus: false,
        pixelOffset: {
          width: 0,
          height: -15
        }
      },
      infoOptionsRoute: {
        pixelOffset: {
          width: 0,
          height: -15
        }
      },
      infoPositionNode: null,
      infoOpenedNode: false,
      infoContentNode: null,

      infoPositionRoute: null,
      infoOpenedRoute: false,
      infoContentRoute: null,
      doiTuong: {},
      thongTinCap: {
        capObj: {},
        taomoi: false,
        editable: false
      },
      tramTb_id: null,
      listObj: {}
    }
  },
  watch: {
    mapTypeId (val) {
      if (val === 'ROADMAP') {
        this.map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)
      } else {
        this.map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
      }
    },
    Nodes (val) {
      console.log('map Nodes', val)
    },
    Routes (val) {
      console.log('map Routes', val)
    }
  },
  async  mounted () {
    let vm = this
    this.$refs.oneBSSGmap.$mapPromise.then((map) => {
      vm.map = map
    })
  },
  methods: {
    ...mapActions('cabman/QuanLyMangTruyenDan', actionName),
    // Cac fn xử lý sự hiện
    dblclickNode (event, Node) {
      this.tramTb_id = parseInt(Node.id.split('_')[2])
      this.$bvModal.show('popupTramThietBi')
    },
    dblclickRoute (event, Route) {
      console.log('dblclickPolyline', event, Route)
      // alert('thuoc tinh cap: ' + Route.id)
      // TRUCNT - ráp update thông tin cáp
      this.thongTinCap.capObj.CAP_ID = Route.id
      this.thongTinCap.taomoi = false
      this.thongTinCap.editable = true
      this.$bvModal.show('popupQuanLyCap')
    },
    dragendPositionNode (event, Node) {},
    dragPositionNode (event, Node) {
      try {
        const nodeid = Node.id
        let lat = event.latLng.lat()
        let lng = event.latLng.lng()

        const objIndex = this.Nodes.findIndex(obj => obj.id === nodeid)
        if (objIndex < 0) return
        this.Nodes[objIndex].Position.lat = lat
        this.Nodes[objIndex].Position.lng = lng
        this.Nodes[objIndex].Modified = true

        const length = this.Routes.length
        let copiedArray = new Array(length)
        for (let i = 0; i < length; i++) {
          let Route = this.Routes[i]
          if ((nodeid === Route.A.id || nodeid === Route.B.id) || nodeid.startsWith('DIEMUON_')) {
            let path = Route.Positions.slice(0)
            for (let j = 0; j < path.length; j++) {
              if (path[j].id === nodeid) {
                path[j].lat = lat
                path[j].lng = lng
                Route.Modified = !!nodeid.startsWith('DIEMUON_')
                break
              }
            }
            Route.Positions = path
            copiedArray[i] = Route
          } else {
            copiedArray[i] = Route
          }
        }
        this.Routes = copiedArray.slice(0)
      } catch (error) {
        console.log('dragPositionNode error', error)
      }
    },
    fromLatLngToPixel: function (position) {
      var scale = Math.pow(2, this.map.getZoom())
      var proj = this.map.getProjection()
      var bounds = this.map.getBounds()
      var nw = proj.fromLatLngToPoint(
        new window.google.maps.LatLng(
          bounds.getNorthEast().lat(),
          bounds.getSouthWest().lng()
        ))
      var point = proj.fromLatLngToPoint(position)
      return new window.google.maps.Point(
        Math.floor((point.x - nw.x) * scale),
        Math.floor((point.y - nw.y) * scale))
    },
    rightclickNode (event, Node) {
      console.log('rightclickNode', event, Node)
      this.mouselatLng.lat = event.latLng.lat()
      this.mouselatLng.lng = event.latLng.lng()

      this.$refs.menuRoute && this.$refs.menuRoute.hideContextMenu()
      this.$refs.menuDiemUon && this.$refs.menuDiemUon.hideContextMenu()
      this.$refs.menuMap && this.$refs.menuMap.hideContextMenu()
      this.$refs.menuNode && this.$refs.menuNode.hideContextMenu()

      this.$refs.menuNode.showMenu(event, Node)
      const menu = document.getElementById('menuNode')
      let pixelOffset = new window.google.maps.Point(10, -5)
      let mapDiv = this.map.getDiv()
      var mousePosition = this.fromLatLngToPixel(event.latLng)
      var mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
      var menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
      var left = mousePosition.x
      var top = mousePosition.y
      if (mousePosition.x > mapSize.width - menuSize.width - pixelOffset.x) {
        left = left - menuSize.width - pixelOffset.x
      } else {
        left += pixelOffset.x
      }
      if (mousePosition.y > mapSize.height - menuSize.height - pixelOffset.y) {
        top = top - menuSize.height - pixelOffset.y
      } else {
        top += pixelOffset.y
      }
      menu.style.left = left + 'px'
      menu.style.top = top + 'px'
      menu.position = 'fixed'
      menu.classList.add('menu-context')
    },
    rightclickNodeDiemUon (event, Node) {
      console.log('rightclickNodeDiemUon', event, Node)
      this.mouselatLng.lat = event.latLng.lat()
      this.mouselatLng.lng = event.latLng.lng()
      this.$refs.menuRoute && this.$refs.menuRoute.hideContextMenu()
      this.$refs.menuDiemUon && this.$refs.menuDiemUon.hideContextMenu()
      this.$refs.menuMap && this.$refs.menuMap.hideContextMenu()
      this.$refs.menuNode && this.$refs.menuNode.hideContextMenu()
      this.$refs.menuDiemUon.showMenu(event, Node)
      const menu = document.getElementById('menuDiemUon')
      let pixelOffset = new window.google.maps.Point(10, -5)
      let mapDiv = this.map.getDiv()
      var mousePosition = this.fromLatLngToPixel(event.latLng)
      var mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
      var menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
      var left = mousePosition.x
      var top = mousePosition.y
      if (mousePosition.x > mapSize.width - menuSize.width - pixelOffset.x) {
        left = left - menuSize.width - pixelOffset.x
      } else {
        left += pixelOffset.x
      }
      if (mousePosition.y > mapSize.height - menuSize.height - pixelOffset.y) {
        top = top - menuSize.height - pixelOffset.y
      } else {
        top += pixelOffset.y
      }
      menu.style.left = left + 'px'
      menu.style.top = top + 'px'
      menu.position = 'fixed'
      menu.classList.add('menu-context')
    },
    rightclickRoute (event, Route) {
      console.log('rightclickRoute', event, Route)
      this.diemuonLatlng = event.latLng
      this.activePolyline = Route
      this.mouselatLng.lat = event.latLng.lat()
      this.mouselatLng.lng = event.latLng.lng()

      this.$refs.menuRoute && this.$refs.menuRoute.hideContextMenu()
      this.$refs.menuDiemUon && this.$refs.menuDiemUon.hideContextMenu()
      this.$refs.menuMap && this.$refs.menuMap.hideContextMenu()
      this.$refs.menuNode && this.$refs.menuNode.hideContextMenu()

      this.$refs.menuRoute.showMenu(event, Route)
      const menu = document.getElementById('menuRoute')
      let pixelOffset = new window.google.maps.Point(10, -5)
      let mapDiv = this.map.getDiv()
      var mousePosition = this.fromLatLngToPixel(event.latLng)
      var mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
      var menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
      var left = mousePosition.x
      var top = mousePosition.y
      if (mousePosition.x > mapSize.width - menuSize.width - pixelOffset.x) {
        left = left - menuSize.width - pixelOffset.x
      } else {
        left += pixelOffset.x
      }
      if (mousePosition.y > mapSize.height - menuSize.height - pixelOffset.y) {
        top = top - menuSize.height - pixelOffset.y
      } else {
        top += pixelOffset.y
      }
      menu.style.left = left + 'px'
      menu.style.top = top + 'px'
      menu.position = 'fixed'
      menu.classList.add('menu-context')
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
    diemuonAdd (id_route, position, visible, draggable) {
      var id = 'DIEMUON_' + this.create_UUID()
      var node = new Node()
      node.id = id
      node.Visible = visible
      node.AllowMove = draggable
      node.Position = { lat: position.lat, lng: position.lng }
      node.IsDiemuon = true
      node.Id_Route = id_route
      node.SetIcon('DIEMUON')
      this.Nodes.push(node)
      return id
    },
    insertAt (arr, index, newItem) {
      return [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
      ]
    },
    async LAY_TT_KETCUOI (ketcuoi_id) {
      try {
        let rs = await this.api_execute({ data: { VPHANVUNG_ID: this.$root.token.getPhanVungID(), VKETCUOI_ID: ketcuoi_id}, function: 'CABMAN.DANHMUC_TD_V2.LAY_TT_KETCUOI' })
        console.log('LAY_TT_KETCUOI', rs.data)
        if (rs.data.length) return rs.data[0]
      } catch (error) {
        return null
      }
    },
    async quanLyKetCuoi (ketcuoi_id) {
      var ketcuoi = await this.LAY_TT_KETCUOI(ketcuoi_id)
      if (ketcuoi) {
        this.$refs.QLKetCuoi.show(false, ketcuoi).then((result) => {
          if (result.ok) {

          } else {

          }
        })
      }
    },
    menuNode_Clicked (event) {
      console.log('menuNode_Clicked', event)
      switch (event.option.slug) {
        case 'tao_cap_toi_ketcuoi':
          let dsketcuoi = '536268,536272, 536275, 536278, 536279'
          let dstram = '331,332,333, 334, 335, 336, 337, 338, 339, 340,341'
          this.listObj = {dsketcuoi, dstram}
          this.$bvModal.show('popupChonDoiTuongDich')
          break
        case 'cap_nhat_toado_ketcuoi':
          alert('cap_nhat_toado_ketcuoi: ' + event.item.id)
          break
        // Hong Quan - add form quan ly tram thiet bi
        case 'thuoc_tinh_ketcuoi':
          if (event.item.Group === 'KETCUOI') {
            var ketcuoi_id = parseInt(event.item.id.split('_')[1])
            this.quanLyKetCuoi(ketcuoi_id)
            break
          }
          this.tramTb_id = parseInt(event.item.id.split('_')[2])
          this.$bvModal.show('popupTramThietBi')
          break
          // Huu Minh - add đấu nối thiết bị
        case 'dau_noi_tbi':
          if (event.item.Group === 'TRAM_TB') {
            let tram_tbi_id = event.item.id.split('_')[2]
            this.doiTuong = {
              tramtb_id: tram_tbi_id
            }
            this.$bvModal.show('popupDauNoiThietBi')
          }
          break
         // Huu Minh - end
      }
    },
    menuMap_Clicked (event) {
      console.log('menuMap_Clicked', event)
      switch (event.option.slug) {
        case 'lam_tuoi':
          break
        case 'day_la_dau':
          break
        case 'tim_dia_diem':
          break
      }
    },
    menuDiemUon_Clicked (event) {
      console.log('menuDiemUon_Clicked', event)
      switch (event.option.slug) {
        case 'xoa_diem_uon_cap':
          const id_diemuon = event.item.id
          const id_route = event.item.Id_Route
          const objIndex = this.Nodes.findIndex(obj => obj.id === id_diemuon)
          if (objIndex > -1) {
            const idx = this.Routes.findIndex(obj => obj.id === id_route)
            if (idx < 0) return
            var Positions = this.Routes[idx].Positions.splice(0)
            const idx2 = Positions.findIndex(obj => obj.id === id_diemuon)
            if (idx2 > -1) {
              Positions.splice(idx2, 1)
              this.Routes[idx].Positions = Positions.splice(0)
              this.Routes[idx].Modified = true
              this.Nodes.splice(objIndex, 1)
            }
          }
          break
      }
    },
    menuRoute_Clicked (event) {
      console.log('menuRoute_Clicked', event)
      switch (event.option.slug) {
        case 'thuoc_tinh_cap':
          // TRUCNT - ráp update thông tin cáp
          // alert('thuoc_tinh_cap: ' + event.item.id)
          this.thongTinCap.capObj.CAP_ID = event.item.id
          this.thongTinCap.taomoi = false
          this.thongTinCap.editable = true
          this.$bvModal.show('popupQuanLyCap')

          break
        case 'lam_lai_tuyen_cap':
          alert('lam_lai_tuyen_cap: ' + event.item.id)
          break
        case 'ket_thuc_sua_cap':
          var id_cap = event.item.id
          for (let index = 0; index < this.Nodes.length; index++) {
            if (this.Nodes[index].Id_Route === id_cap && this.Nodes[index].IsDiemuon === true) {
              this.Nodes[index].Visible = false
            }
          }
          break
        case 'sua_toa_do_cap':
          event.item.Modified = true
          var id_cap = event.item.id
          var idx = this.Routes.findIndex(p => p.id === id_cap)
          if (idx > -1) {
            for (let index = 1; index < this.Routes[idx].Positions.length - 1; index++) {
              let id = this.Routes[idx].Positions[index].id
              let idx2 = this.Nodes.findIndex(p => p.id === id)
              if (idx2 < 0) {
                let node = new Node()
                node.id = id
                node.Visible = true
                node.AllowMove = true
                node.Position = { lat: this.Routes[idx].Positions[index].lat, lng: this.Routes[idx].Positions[index].lng }
                node.IsDiemuon = true
                node.Id_Route = id_cap
                node.SetIcon('DIEMUON')
                this.Nodes.push(node)
              }
            }
            for (let index = 0; index < this.Nodes.length; index++) {
              if (this.Nodes[index].Id_Route === id_cap && this.Nodes[index].IsDiemuon === true) {
                this.Nodes[index].Visible = true
              }
            }
          }
          break
        case 'tao_diem_uon_cap':
          const id_diemuon = this.diemuonAdd(event.item.id, {lat: this.diemuonLatlng.lat(), lng: this.diemuonLatlng.lng()}, true, true)
          for (let i = 0; i < event.item.Positions.length - 1; i++) {
            let node1 = event.item.Positions[i]
            let node2 = event.item.Positions[i + 1]
            let latLng1 = new window.google.maps.LatLng(node1.lat, node1.lng)
            let latLng2 = new window.google.maps.LatLng(node2.lat, node2.lng)
            const polylineCoords = [latLng1, latLng2]
            var polyline = new window.google.maps.Polyline({ path: polylineCoords })
            let chk = this.google.maps.geometry.poly.isLocationOnEdge(this.diemuonLatlng, polyline, 0.00001)
            if (chk) {
              let p = {
                id: id_diemuon,
                lat: this.diemuonLatlng.lat(),
                lng: this.diemuonLatlng.lng()
              }
              const result = this.insertAt(event.item.Positions, i + 1, p)
              event.item.Positions = result.slice(0)
              event.item.Modified = true
              break
            }
          }
          break
      }
    },
    OnFirstIdle () { console.log('onFirstIdle') },
    LeftclickMap (event) {
      console.log('leftclickMap', event)
    },
    RightclickMap (event) {
      console.log('rightclickMap', event)
      this.locationrightclickMap = event.latLng
      this.$refs.menuRoute && this.$refs.menuRoute.hideContextMenu()
      this.$refs.menuDiemUon && this.$refs.menuDiemUon.hideContextMenu()
      this.$refs.menuMap && this.$refs.menuMap.hideContextMenu()
      this.$refs.menuNode && this.$refs.menuNode.hideContextMenu()

      this.$refs.menuMap.showMenu(event)
      const menu = document.getElementById('menuMap')
      let pixelOffset = new window.google.maps.Point(10, -5)
      let mapDiv = this.map.getDiv()
      var mousePosition = this.fromLatLngToPixel(event.latLng)
      var mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
      var menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
      var left = mousePosition.x
      var top = mousePosition.y
      if (mousePosition.x > mapSize.width - menuSize.width - pixelOffset.x) {
        left = left - menuSize.width - pixelOffset.x
      } else {
        left += pixelOffset.x
      }
      if (mousePosition.y > mapSize.height - menuSize.height - pixelOffset.y) {
        top = top - menuSize.height - pixelOffset.y
      } else {
        top += pixelOffset.y
      }
      menu.style.left = left + 'px'
      menu.style.top = top + 'px'
      menu.position = 'fixed'
      menu.classList.add('menu-context')
    },
    MouseOverNode (event, Node) {
      console.log('MouseOverNode', event)
      console.log('MouseOverNode', Node)
      Node.MouseOver = true
      this.infoPositionNode = event.latLng
      this.infoContentNode = Node.Tooltip !== null ? '<b>' + Node.Tooltip.replaceAll('#', '<br>') + '</b>' : null
      this.infoOpenedNode = true
      this.infoOpenedRoute = false
    },
    MouseOutNode (event, Node) {
      Node.MouseOver = false
      this.infoOpenedNode = false
      this.infoOpenedRoute = false
    },
    MouseOverRoute (event, Route) {
      Route.MouseOver = true
      this.infoPositionRoute = event.latLng
      this.infoContentRoute = '<b>' + Route.Name + '</b>'
      this.infoOpenedNode = false
      this.infoOpenedRoute = true
    },
    MouseOutRoute (event, Route) {
      Route.MouseOver = false
      this.infoOpenedNode = false
      this.infoOpenedRoute = false
    },
    //
    DuyChuyenDenViTri (location) {
      this.location = location
    },
    ThamSoMacDinhBanDo (infoMapDefault) {
      this.location.lat = (infoMapDefault.center.lat)
      this.location.lng = (infoMapDefault.center.lng)
      this.zoomLevel = (infoMapDefault.zoom)
    },
    TaoNode () {
      var node = new Node()
      this.Nodes.push(node)
      return node
    },
    TimNode (Id) {
      var index = this.Nodes.findIndex(p => p.id === Id)
      if (index > -1) return this.Nodes[index]
      else return null
    },
    TaoRoute () {
      var route = new Route()
      this.Routes.push(route)
      return route
    },
    TaoRoute2 () {
      var route = new Route()
      return route
    },
    CapNhatRoute (route) {
      this.Routes.push(route)
    },
    Clear () {
      this.Nodes = []
      this.Routes = []
    },
    getNodes () { return this.Nodes },
    getRoutes () { return this.Routes },
    getPixelLocation (currentLatLng) {
      var scale = Math.pow(2, this.map.getZoom())
      var nw = new this.google.maps.LatLng(
        this.map.getBounds().getNorthEast().lat(),
        this.map.getBounds().getSouthWest().lng()
      )
      var worldCoordinateNW = this.map.getProjection().fromLatLngToPoint(nw)
      var worldCoordinate = this.map.getProjection().fromLatLngToPoint(currentLatLng)
      var currentLocation = new this.google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
      )
      console.log('currentLocation', currentLocation)
      return currentLocation
    },
    allowMoveNode () { this.allowMove = !this.allowMove },
    luuToaDoBanDo () { },
    phanCapCap (phancapcap_id) {
      if (phancapcap_id === 0) {
        for (let index = 0; index < this.Routes.length; index++) {
          this.Routes[index].Visible = true
        }
      } else {
        for (let index = 0; index < this.Routes.length; index++) {
          if (this.Routes[index].Layer === phancapcap_id) { this.Routes[index].Visible = true } else {
            this.Routes[index].Visible = false
          }
        }
      }
    },
    thaydoiMapType () {
      if (this.mapTypeId === 'ROADMAP') {
        this.mapTypeId = 'SATELLITE'
      } else {
        this.mapTypeId = 'ROADMAP'
      }
    },
    FitBounds () {
      if (this.Nodes.length > 0) {
        this.location = {
          lat: this.Nodes[0].Position.lat,
          lng: this.Nodes[0].Position.lng
        }
      }
    },
    ChonDT (data) {
      console.log('data from child ', data)
      console.log('Nodes ', this.Nodes)
      return data
    }
  }
}
</script>
<style>
  .vue-simple-context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    z-index: 1000000;
    background-color: #ecf0f1;
    border-bottom-width: 0px;
    font-family: "Roboto", Arial;
    font-size: 1rem;
    box-shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
    border-radius: 4px;
  }
  .vue-simple-context-menu--active {
    display: block;
  }
  .vue-simple-context-menu__item {
    display: flex;
    color: #333;
    cursor: pointer;
    padding: 5px 15px;
    align-items: center;
  }
  .vue-simple-context-menu__item:hover {
    background-color: #f5f5f5;
  }
  .vue-simple-context-menu__divider {
    box-sizing: content-box;
    height: 1px;
    background-color: #c0cdd1;
    padding: 4px 0;
    background-clip: content-box;
    pointer-events: none;
  }
  .vue-simple-context-menu li:first-of-type {
    margin-top: 4px;
  }
  .vue-simple-context-menu li:last-of-type {
    margin-bottom: 4px;
  }
  .gm-style-iw > button {
  display: none !important;
  }
  .gm-style-iw {

  }
  .control-map{
    margin-top: 4px;
  }
</style>
