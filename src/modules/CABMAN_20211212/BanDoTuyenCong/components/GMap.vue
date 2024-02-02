<template>
  <div>
<!--    <el-tooltip class="item" effect="light"  content="Di chuyển đối tượng" placement="top">-->
<!--      <el-button ref="ctrlDuyChuyenDoiTuong" type="info" plain  icon="el-icon-rank" size="small" class="control-map"></el-button>-->
<!--    </el-tooltip>-->
    <el-tooltip class="item" effect="light"  content="Lưu tọa độ bản đồ" placement="top">
      <el-button ref="ctrlLuuToaDoBanDo" type="info"  plain  icon="el-icon-s-tools"  size="small" class="control-map"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="light"  content="Thay đổi nguồn dữ liệu bản đồ" placement="top">
      <el-button ref="ctrlThayDoiNguonDuLieu" type="info"  plain  icon="el-icon-s-order"  size="small" class="control-map"></el-button>
    </el-tooltip>
    <div style="height: 800px;">
      <transition name="slide-fade" v-if="showSearchDiaDiem">
        <gmap-autocomplete
          ref="SearchDiaDiem"
          placeholder="Gõ để tìm kiếm địa điểm"
          class="form-control"
          :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
          @place_changed="onSearchDiaDiem"/>
      </transition>
      <vue-simple-context-menu
        elementId="menuPolyline"
        :options="optionsPolylineMenu"
        ref="vueSimpleContextMenuPolyline"
        @option-clicked="menuPolyline_Clicked"/>
      <vue-simple-context-menu
        elementId="menuNodeDiemUon"
        :options="optionsNodeDiemUonMenu"
        ref="vueSimpleContextMenuNodeDiemUon"
        @option-clicked="menuNodeDiemUon_Clicked"/>
      <vue-simple-context-menu
        elementId="menuMap"
        :options="optionsMapMenu"
        ref="vueSimpleContextMenuMap"
        @option-clicked="menuMap_Clicked"/>
      <vue-simple-context-menu
        elementId="menuNode"
        :options="optionsNodeMenu"
        ref="vueSimpleContextMenuNode"
        @option-clicked="menuNode_Clicked"/>
      <GmapMap
        id="map"
        ref="oneBSSGmap"
        :zoom="zoomLevel"
        :options="mapOptions"
        :center="getPositionCenter"
        @rightclick="rightclickMap($event)"
        @click="clickMap($event)"
        style="width: 100%; height: calc(100% - 26px);">
        <GmapMarker
          v-for="node in getlistNode"
          :key="node.id"
          :position="node.position"
          :icon="node.getIcon()"
          @mouseover="mouseoverNode($event, node)"
          @mouseout="mouseoutNode($event, node)"
          @drag="dragPositionNode($event,node)"
          @click="leftclickNode($event, node)"
          @rightclick="rightclickNode($event, node)"
          @dragend="dragendPositionNode($event,node)"
          :draggable="node.draggable && draggable"
          :label="node.getLabel()">
        </GmapMarker>
        <GmapMarker
          v-for="node in getlistNodeDiemUon"
          :key="node.id"
          :position="node.position"
          :draggable="node.draggable"
          :icon="node.getIcon()"
          @drag="dragPositionNode($event,node)"
          @dragend="dragendPositionNode($event,node)"
          @rightclick="rightclickNodeDiemUon($event, node)"
        >
        </GmapMarker>
        <!--        :label="getLabel(node.symbol)"-->
        <GmapPolyline
          v-for="polyline in getlistPolyline"
          :key="polyline.id"
          :path.sync="polyline.path"
          geodesic: true

          @mouseover="mouseoverPolyline($event, polyline)"
          @mouseout="mouseoutPolyline($event, polyline)"
          @dblclick="dblclickPolyline($event, polyline)"
          @rightclick="rightclickPolyline($event, polyline)"
          :options="polyline.polylineOptions()">
        </GmapPolyline>
        <!--        :label="getLabel(polyline.label)"-->
        <GmapInfoWindow
          :options="infoOptionsNode"
          :position="infoPositionNode"
          :opened="infoOpenedNode"
          @closeclick="infoOpenedNode = false">
          <span v-html="infoContentNode"></span>
        </GmapInfoWindow>
        <GmapInfoWindow
          :options="infoOptionsPolyline"
          :position="infoPositionPolyline"
          :opened="infoOpenedPolyline"
          @closeclick="infoOpenedPolyline = false">
          <span v-html="infoContentPolyline"></span>
        </GmapInfoWindow>
      </GmapMap>
    </div>
  </div>
</template>
<script>

    import GraphNode from '../structures/GraphNode'
    import GraphPolyline from '../structures/GraphPolyline'
    import {getGoogleMapsAPI} from 'gmap-vue'
    import VueSimpleContextMenu from 'vue-simple-context-menu'
    import MeasureTool from 'measuretool-googlemaps-v3'
    import EventBus from '@/utils/eventBus'

    export default {
        components: {'vue-simple-context-menu': VueSimpleContextMenu},
        name: 'GMap',
        props: {
        },
        computed: {
            google: getGoogleMapsAPI,
            getPositionCenter () { return this.location },
            getlistNodeDiemUon () { return this.nodes.filter(n => n.visible === true && n.isDiemuon === true) },
            getlistNode () { return this.nodes.filter(n => n.visible === true && n.isDiemuon === false && n.position.lat * n.position.lng > 0) },
            getlistPolyline () { return this.polylines },
            optionsPolylineMenu () {
                let menu = []
                return [...this.optionsPolyline]
                // if (this.activePolyline) {
                //     if (!this.activePolyline.modified) {
                //         return [...this.optionsPolyline]
                //     } else {
                //         return [...this.optionsPolyline2]
                //     }
                // } else return [...this.optionsPolyline]
            }
        },
        async created () {
            await this.$gmapApiPromiseLazy()
        },
        data () {
            return {
                zoomLevel: 20,
                draggable: false,
                isMapChanged: false,
                mapOptions: {
                    zoomControl: true, scaleControl: true,
                    disableDefaultUi: true, streetViewControl: false,
                    mapTypeControl: false, fullscreenControl: false,
                    maxZoom: this.maxZoom,
                    disableDoubleClickZoom: true,
                    mapTypeId: 'roadmap',
                    draggableCursor: 'default',
                    draggingCursor: 'pointer'
                },
                nodes: [],
                polylines: [],
                location: {lat: -1, lng: -1},
                mouselatLng: {},
                maxZoom: 20,
                map: null,
                measureTool: null,
                loadingMap: true,
                searchDiaDiem: null,
                activePolyline: null,
                showSearchDiaDiem: false,
                infoOptionsNode: {
                    shouldFocus: false,
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                infoOptionsPolyline: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                infoContentNode: null,
                infoContentPolyline: null,
                infoPositionNode: null,
                infoPositionPolyline: null,
                infoOpenedNode: false,
                infoOpenedPolyline: false,
                optionsNodeMenu: [
                    {
                        name: '<span class="icon text-main f20 one-taocap"></span> Tạo cổng tới bể tiếp theo',
                        slug: 'taoCong'
                    },
                    {
                        name: '<span class="icon text-main f20 one-taokn"></span> Tạo cổng kết nối với bể khác tuyến',
                        slug: 'taoCongKhacTuyen'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '<span class="icon text-main f20 one-trash"></span> Xóa bể',
                        slug: 'xoaBe'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '<span class="icon text-main f20 -ap icon-info"></span> Thuộc tính',
                        slug: 'thuocTinhBe'
                    },
                    {
                        name: '<span class="icon text-main f20 one-forward"></span> Chuyển sang tuyến cống bể khác',
                        slug: 'chuyenTuyen'
                    },
                ],
                optionsMapMenu: [
                    {
                        name: '<span class="icon text-main f20 one-daucuoi"></span> Làm tươi',
                        slug: 'lamtuoi'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '<span class="icon text-main f20 one-trash"></span> Đây là đâu ?',
                        slug: 'dayladau'
                    },
                    {
                        name: '<span class="icon text-main f20 one-daochieu"></span> Tìm địa điểm',
                        slug: 'tim_dia_diem'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '<span class="icon text-main f20 one-chuyencap"></span> Đo khoảng cách',
                        slug: 'dokhoangcach'
                    },
                    {
                        name: '<span class="icon text-main f20 one-taodiemuon"></span> Xóa phép đo',
                        slug: 'xoaphepdo'
                    }
                ],
                optionsNodeDiemUonMenu: [
                    {
                        name: '<span class="icon one-td-app-outline"></span> Xóa điểm uốn',
                        slug: 'xoaDiemUonCong'
                    }
                ],
                optionsPolyline: [
                    {
                        name: '<span class="icon text-main f20 one-tc-chenbe"></span> Chèn bể',
                        slug: 'chenBe'
                    },
                    {
                        name: '<span class="icon text-main f20 one-tc-daochieu"></span> Đảo chiều đoạn cống',
                        slug: 'daoChieu'
                    },
                    {
                        name: '<span class="icon text-main f20 one-tc-chenbea"></span> Thay đổi bể A',
                        slug: 'doiBeA'
                    },
                    {
                        name: '<span class="icon text-main f20 one-tc-chenbeb"></span> Thay đổi bể B',
                        slug: 'doiBeB'
                    },
                    {
                        name: '<span class="icon text-main f20 one-trash"></span> Xóa cống',
                        slug: 'xoaCong'
                    },
                    {
                        type: 'divider'
                    },
                    // {
                    //     name: '<span class="icon text-main f20 one-tc-sua"></span> Sửa đường đi của cống',
                    //     slug: 'suaDuongDiCuaCong'
                    // },
                    {
                        name: '<span class="icon text-main f20 one-taomid"></span> Tạo điểm uốn',
                        slug: 'taoDiemUon'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '<span class="icon text-main f20 -ap icon-info"></span> Thuộc tính',
                        slug: 'thuocTinhDoanCong'
                    }
                ],
                isChonBe:false,
                atHere: null,
                isGhiToaDo:false,
                beChuaToaDo:Object
            }
        },
        watch: {
            polylines: {
                handler: function (val) {
                },
                deep: true},
            searchDiaDiem: {
                handler: function (val) {
                    this.location = {
                        lat: val.geometry.location.lat(),
                        lng: val.geometry.location.lng()
                    }
                },
                deep: true},
            nodes: {
                handler: function (val) {
                },
                deep: true},
            isMapChanged: function(val){
                if(val)
                    this.mapOptions.mapTypeId="satellite"
                else
                    this.mapOptions.mapTypeId="roadmap"
            }

        },
        async  mounted () {
            let vm = this
            this.$refs.oneBSSGmap.$mapPromise.then((map) => {
                vm.map = map
                // let ctrlDuyChuyenDoiTuong = this.$refs.ctrlDuyChuyenDoiTuong.$el
                // map.controls[this.google.maps.ControlPosition.TOP_RIGHT].push(ctrlDuyChuyenDoiTuong)
                // ctrlDuyChuyenDoiTuong.addEventListener('click', () => {
                //     this.draggable = !this.draggable
                // })

                let ctrlLuuToaDoBanDo = this.$refs.ctrlLuuToaDoBanDo.$el
                map.controls[this.google.maps.ControlPosition.RIGHT_TOP].push(ctrlLuuToaDoBanDo)
                ctrlLuuToaDoBanDo.addEventListener('click', () => {
                    this.luuToaDoBanDo()
                })

                let ctrlThayDoiNguonDuLieu = this.$refs.ctrlThayDoiNguonDuLieu.$el
                map.controls[this.google.maps.ControlPosition.RIGHT_TOP].push(ctrlThayDoiNguonDuLieu)
                ctrlThayDoiNguonDuLieu.addEventListener('click', () => {
                    if(vm.isMapChanged) vm.isMapChanged=false
                    else vm.isMapChanged=true
                })
                this.loading = false
                this.measureTool = new MeasureTool(this.map, {
                    contextMenu: false,
                    unit: MeasureTool.UnitTypeId.METRIC,
                    tooltip: false
                })

                let polygon = new this.google.maps.Polygon({
                    clickable: true
                    // other options...
                })

                this.measureTool.addListener('measure_start', () => {
                    polygon.setOptions({clickable: false})
                })
                this.measureTool.addListener('measure_end', (e) => {
                    polygon.setOptions({clickable: true})
                })
                this.measureTool.addListener('measure_change', (e) => {
                })
                window.addEventListener('keydown', function (e) {
                    if(vm.isChonBe){
                        if(e.key=="Escape"){
                            vm.isChonBe=false;
                            vm.$toast.info("Đã hủy thao tác tạo cống");}
                    }
                })
                EventBus.$on("ghiToaDo", (args) => {
                    vm.isGhiToaDo =true
                    vm.beChuaToaDo =args
                });
            })
        },
        methods: {
            menuNodeDiemUon_Clicked (event) {
                console.log('menuNodeDiemUon_Clicked', event)
                switch (event.option.slug) {
                    case 'xoaDiemUonCong':
                        const id_diemuon = event.item.id
                        const id_route = event.item.id_polyline
                        const objIndex = this.nodes.findIndex(obj => obj.id === id_diemuon)
                        if (objIndex > -1) {
                            const idx = this.polylines.findIndex(obj => obj.id === id_route)
                            if (idx < 0) return
                            let Positions = this.polylines[idx].path.splice(0)
                            const idx2 = Positions.findIndex(obj => obj.id === id_diemuon)
                            if (idx2 > -1) {
                                Positions.splice(idx2, 1)
                                this.polylines[idx].path = Positions.splice(0)
                                this.polylines[idx].modified = true
                                this.nodes.splice(objIndex, 1)
                            }
                        }
                        break
                }
            },
            rightclickNodeDiemUon (event, Node) {
                console.log('rightclickNodeDiemUon', event, Node)
                this.mouselatLng.lat = event.latLng.lat()
                this.mouselatLng.lng = event.latLng.lng()
                this.$refs.vueSimpleContextMenuPolyline && this.$refs.vueSimpleContextMenuPolyline.hideContextMenu()
                this.$refs.vueSimpleContextMenuNodeDiemUon && this.$refs.vueSimpleContextMenuNodeDiemUon.hideContextMenu()
                this.$refs.vueSimpleContextMenuMap && this.$refs.vueSimpleContextMenuMap.hideContextMenu()
                this.$refs.vueSimpleContextMenuNode && this.$refs.vueSimpleContextMenuNode.hideContextMenu()
                this.$refs.vueSimpleContextMenuNodeDiemUon.showMenu(event, Node)
                const menu = document.getElementById('menuNodeDiemUon')
                let pixelOffset = new window.google.maps.Point(10, -5)
                let mapDiv = this.map.getDiv()
                let mousePosition = this.fromLatLngToPixel(event.latLng)
                let mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
                let menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
                let left = mousePosition.x
                let top = mousePosition.y
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
            reload () {
                this.bounds = new window.google.maps.LatLngBounds()
                this.map.setZoom(20)
                this.map.setCenter(
                    new window.google.maps.LatLng(
                        this.location.lat,
                        this.location.lng
                    )
                )
            },
            latLng2Point (latLng, map) {
                let topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast())
                let bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest())
                let scale = Math.pow(2, map.getZoom())
                let worldPoint = map.getProjection().fromLatLngToPoint(latLng)
                return new window.google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale)
            },
            fromLatLngToPixel: function (position) {
                let scale = Math.pow(2, this.map.getZoom())
                let proj = this.map.getProjection()
                let bounds = this.map.getBounds()
                let nw = proj.fromLatLngToPoint(
                    new window.google.maps.LatLng(
                        bounds.getNorthEast().lat(),
                        bounds.getSouthWest().lng()
                    ))
                let point = proj.fromLatLngToPoint(position)
                return new window.google.maps.Point(
                    Math.floor((point.x - nw.x) * scale),
                    Math.floor((point.y - nw.y) * scale))
            },
            rightclickPolyline (event, polyline) {
                this.diemuonLatlng = event.latLng
                this.activePolyline = polyline
                this.mouselatLng.lat = event.latLng.lat()
                this.mouselatLng.lng = event.latLng.lng()
                this.$refs.vueSimpleContextMenuMap && this.$refs.vueSimpleContextMenuMap.hideContextMenu()
                this.$refs.vueSimpleContextMenuNode && this.$refs.vueSimpleContextMenuNode.hideContextMenu()
                this.$refs.vueSimpleContextMenuPolyline && this.$refs.vueSimpleContextMenuPolyline.hideContextMenu()
                this.$refs.vueSimpleContextMenuNodeDiemUon && this.$refs.vueSimpleContextMenuNodeDiemUon.hideContextMenu()
                this.$refs.vueSimpleContextMenuPolyline.showMenu(event, polyline)
                const menu = document.getElementById('menuPolyline')
                let pixelOffset = new window.google.maps.Point(10, -5)
                let mapDiv = this.map.getDiv()
                let mousePosition = this.fromLatLngToPixel(event.latLng)
                let mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
                let menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
                let left = mousePosition.x
                let top = mousePosition.y
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
            rightclickMap (event) {
                this.$refs.vueSimpleContextMenuMap && this.$refs.vueSimpleContextMenuMap.hideContextMenu()
                this.$refs.vueSimpleContextMenuNode && this.$refs.vueSimpleContextMenuNode.hideContextMenu()
                this.$refs.vueSimpleContextMenuPolyline && this.$refs.vueSimpleContextMenuPolyline.hideContextMenu()
                this.$refs.vueSimpleContextMenuNodeDiemUon && this.$refs.vueSimpleContextMenuNodeDiemUon.hideContextMenu()
                this.$refs.vueSimpleContextMenuMap.showMenu(event)
                const menu = document.getElementById('menuMap')
                let pixelOffset = new window.google.maps.Point(10, -5)
                let mapDiv = this.map.getDiv()
                let mousePosition = this.fromLatLngToPixel(event.latLng)
                let mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
                let menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
                let left = mousePosition.x
                let top = mousePosition.y
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
                this.atHere = event.latLng.lat() + "," + event.latLng.lng();
                menu.style.left = left + 'px'
                menu.style.top = top + 'px'
                menu.position = 'fixed'
                menu.classList.add('menu-context')
            },
            rightclickNode (event, node) {
                this.$refs.vueSimpleContextMenuMap && this.$refs.vueSimpleContextMenuMap.hideContextMenu()
                this.$refs.vueSimpleContextMenuNodeDiemUon && this.$refs.vueSimpleContextMenuNodeDiemUon.hideContextMenu()
                this.$refs.vueSimpleContextMenuPolyline && this.$refs.vueSimpleContextMenuPolyline.hideContextMenu()
                this.$refs.vueSimpleContextMenuNode.showMenu(event, node)
                const menu = document.getElementById('menuNode')
                let pixelOffset = new window.google.maps.Point(10, -5)
                let mapDiv = this.map.getDiv()
                let mousePosition = this.fromLatLngToPixel(event.latLng)
                let mapSize = new window.google.maps.Size(mapDiv.offsetWidth, mapDiv.offsetHeight)
                let menuSize = new window.google.maps.Size(menu.offsetWidth, menu.offsetHeight)
                let left = mousePosition.x
                let top = mousePosition.y
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
            leftclickNode (event, node) {
                if(this.isChonBe){
                    if (node.id != "") {
                        let obj = {
                            dataBe: node.dataBe,
                            type: "MENU_ITEM_LK_BE_TT_CHON",
                        }
                        this.$emit("taoDoanCong", obj)
                        this.isChonBe = false
                    }
                }
            },
            dblclickPolyline($event, polyline){
                let obj=Object;
                try{
                    if(polyline.id.includes("LINK_COT")){
                        let value =polyline.id.split("_");
                        obj={
                            cot_id :value[2],
                            cotsau_id:value[4]
                        }
                        this.$emit('Kc2Cot',obj);
                    }
                }catch(e){}
            },
            insertAt (arr, index, newItem) {
                return [
                    ...arr.slice(0, index),
                    newItem,
                    ...arr.slice(index)
                ]
            },
            menuNode_Clicked (event) {
                let type_action;
                switch (event.option.slug) {
                    case 'taoCong':
                        type_action =0
                        this.isChonBe=true
                        // this.$emit('lienketcotkhac', event.item.id)
                        break
                    case 'taoCongKhacTuyen':
                        type_action =1
                        // this.$emit('lienketcotkhac', event.item.id)
                        break
                    case 'xoaBe':
                        type_action =2
                        //  this.$emit('xoacot', event.item.id)
                        break
                    case 'thuocTinhBe':
                        type_action =3
                        //  this.$emit('thuoctinh', event.item.id)
                        break
                    case 'chuyenTuyen':
                        type_action =4
                        //  this.$emit('thuoctinh', event.item.id)
                        break
                }
                let  data={
                    type:type_action,
                    value: event.item.id,
                    dataBe: event.item.dataBe
                }
                this.$emit('node_action', data)
            },
            menuMap_Clicked (event) {
                switch (event.option.slug) {
                    case 'lamtuoi':
                        //this.showSearchDiaDiem = !this.showSearchDiaDiem
                        break
                    case 'dayladau':
                        this.isHere()
                        break
                    case 'tim_dia_diem':
                        this.showSearchDiaDiem = !this.showSearchDiaDiem
                        break
                    case 'dokhoangcach':
                        this.measureTool && this.measureTool.start()
                        break
                    case 'xoaphepdo':
                        this.measureTool && this.measureTool.end()
                        break
                }
            },
            menuPolyline_Clicked (event) {
                let type_action;;
                switch (event.option.slug) {
                    case 'chenBe':
                        type_action =0
                        this.isChonBe=true
                        // this.$emit('lienketcotkhac', event.item.id)
                        break
                    case 'daoChieu':
                        type_action =1
                        // this.$emit('lienketcotkhac', event.item.id)
                        break
                    case 'doiBeA':
                        type_action =2
                        //  this.$emit('xoacot', event.item.id)
                        break
                    case 'doiBeB':
                        type_action =3
                        //  this.$emit('thuoctinh', event.item.id)
                        break
                    case 'xoaCong':
                        type_action =4
                        //  this.$emit('thuoctinh', event.item.id)
                        break
                    case 'thuocTinhDoanCong':
                        type_action =5
                        //  this.$emit('thuoctinh', event.item.id)
                        break
                    case 'taoDiemUon':
                        const id_diemuon = this.diemuonAdd(event.item.id, {lat: this.diemuonLatlng.lat(), lng: this.diemuonLatlng.lng()}, true, true)
                        for (let i = 0; i < event.item.path.length - 1; i++) {
                            let node1 = event.item.path[i]
                            let node2 = event.item.path[i + 1]
                            let latLng1 = new window.google.maps.LatLng(node1.lat, node1.lng)
                            let latLng2 = new window.google.maps.LatLng(node2.lat, node2.lng)
                            const polylineCoords = [latLng1, latLng2]
                            let polyline = new window.google.maps.Polyline({ path: polylineCoords })
                            let chk = this.google.maps.geometry.poly.isLocationOnEdge(this.diemuonLatlng, polyline, 0.00001)
                            if (chk) {
                                let p = {
                                    id: id_diemuon,
                                    lat: this.diemuonLatlng.lat(),
                                    lng: this.diemuonLatlng.lng()
                                }
                                const result = this.insertAt(event.item.path, i + 1, p)

                                event.item.path = result.slice(0)
                                event.item.modified = true
                                break
                            }
                        }
                        break
                }
                let  data={
                    type:type_action,
                    value: event.item.id
                }
                this.$emit('polyline_action', data)
            },
            dragendPositionNode (event, node) {
                //this.isMapChanged = false
            },
            dragPositionNode (event, node) {
                //console.log(node)
                // console.log('dragPositionNode', this.nodes)
                try {
                    //this.isMapChanged = true
                    const nodeid = node.id
                    let lat = event.latLng.lat()
                    let lng = event.latLng.lng()
                    const objIndex = this.nodes.findIndex(obj => obj.id === nodeid)
                    if (objIndex < 0) return
                    this.nodes[objIndex].position.lat = lat
                    this.nodes[objIndex].position.lng = lng
                    this.nodes[objIndex].modified = true

                    const length = this.polylines.length
                    let copiedArray = new Array(length)
                    for (let i = 0; i < length; i++) {
                        let polyline = this.polylines[i]
                        if ((nodeid === polyline.dest || nodeid === polyline.source) || nodeid.startsWith('DIEMUON_')) {
                            //console.log('polyline diem uon',polyline)
                            let path = polyline.path.slice(0)
                            for (let j = 0; j < path.length; j++) {
                                if (path[j].id === nodeid) {
                                    path[j].lat = lat
                                    path[j].lng = lng
                                    polyline.modified = !!nodeid.startsWith('DIEMUON_')
                                    break
                                }
                            }
                            polyline.path = path
                            copiedArray[i] = polyline
                        } else {
                            copiedArray[i] = polyline
                        }
                    }
                    this.polylines = copiedArray.slice(0)
                } catch (error) {
                    console.log('dragPositionNode error', error)
                }
            },
            polylineOptions: function (polyline) {
                let style = polyline.style
                if (style === null) style = '0-0-0-1'
                let st = style.split('-')
                let opt = {strokeOpacity: 0, geodesic: true}

                let lineSymbol = {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    scale: 3
                }
                let doubleLine = {
                    path: 'M 0.5,-1 0.5,1 M -0.5,-1 -0.5,1',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    scale: 3
                }
                let color = ['#a52a2a', '#1064b4', '#000000']
                let icons = [
                    [{
                        icon: lineSymbol,
                        offset: '0%',
                        repeat: '6px'
                    }],
                    [{
                        icon: lineSymbol,
                        offset: '50%',
                        repeat: '15px'
                    }],
                    [{
                        icon: doubleLine,
                        offset: '0%',
                        repeat: '6px'
                    }],
                    [{
                        icon: lineSymbol,
                        offset: '50%',
                        repeat: '25px'
                    }]
                ]
                switch (st[0]) {
                    case '0':
                        opt = {
                            ...opt,
                            strokeWeight: 4
                        }
                        break
                    case '1':
                        opt = {
                            ...opt,
                            strokeWeight: 6
                        }
                        break
                    default:
                        opt = {
                            ...opt,
                            strokeWeight: 2
                        }
                }
                switch (st[1]) {
                    case '0':
                        opt = {
                            ...opt,
                            strokeColor: color[0]
                        }
                        break
                    case '1':
                        opt = {
                            ...opt,
                            strokeColor: color[1]
                        }
                        break
                    default:
                        opt = {
                            ...opt,
                            strokeColor: color[2]
                        }
                }
                switch (st[2]) {
                    case '2': // Kéo cống        [▬▬  ▬▬  ▬▬  ▬▬  ▬▬  ▬]
                        opt = {
                            ...opt,
                            icons: icons[1]
                        }
                        break
                    case '3': // Kéo treo        [▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬]
                        opt = {
                            ...opt,
                            icons: icons[0]
                        }
                        break
                    case '4': // Chôn        [▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬ ▬]
                        opt = {
                            ...opt,
                            icons: icons[3]
                        }
                        break
                    case '5': // Đề xuất kéo mới [▬▬▬ ▬ ▬▬▬ ▬ ▬▬▬ ▬ ▬▬▬]
                        opt = {
                            ...opt,
                            icons: icons[2]
                        }
                        break
                    default: // Không xác định   [• • • • • • • • • • •]
                        opt = {
                            ...opt,
                            icons: icons[1]
                        }
                }
                if (st[3] === '1') {
                    opt.strokeWeight = opt.strokeWeight / 2
                    opt = {
                        ...opt,
                        strokeOpacity: 0.5
                    }
                }
                return opt
            },
            getLabel (symbol) {
                return {'text': symbol, 'color': '#333333', 'fontSize': '12px', 'fontFamily': 'Roboto, Arial', 'fontWeight': 'bold'}
            },
            mouseoverNode (event, node) {
                // console.log('MouseOverNode', event)
                // console.log('MouseOverNode', Node)
                node.mouseover = true
                this.infoPositionNode = event.latLng
                this.infoContentNode = node.tooltipText !== null ? '<b>' + node.tooltipText.replaceAll('#', '<br>') + '</b>' : null
                this.infoOpenedNode = true
                this.infoOpenedPolyline = false
            },
            mouseoverNodeDiemUon (event, node) {
                // console.log('mouseoverNodeDiemUon')
                this.infoOpenedNode = false
                this.infoOpenedPolyline = false
            },
            mouseoutNode (event, node) {
                //console.log('mouseoutNode')
                node.mouseover = false
                this.infoOpenedNode = false
                this.infoOpenedPolyline = false
            },
            mouseoverPolyline (event, polyline) {
                //console.log('mouseoverPolyline')
                polyline.mouseover = true
                this.infoPositionNode = event.latLng
                this.infoContentNode = '<b>' + polyline.Name + '</b>'
                this.infoOpenedNode = false
                this.infoOpenedPolyline = true
            },
            mouseoutPolyline (event, polyline) {
                //console.log('mouseoutPolyline')
                polyline.mouseover = false
                this.infoOpenedNode = false
                this.infoOpenedPolyline = false
            },
            onSearchDiaDiem (data) {
                this.searchDiaDiem = data
            },
            luuToaDoBanDo () {
                let nodes = []
                for (let index = 0; index < this.nodes.length; index++) {
                    const node = this.nodes[index]
                    if (node.modified && !node.id.startsWith('DIEMUON_')) {
                        let arr = (node.getID()).split('_')
                        nodes.push({loai: arr[0], id: arr[1], lat: node.getPosition().lat.toString(), lng: node.getPosition().lng.toString()})
                    }
                }
                let polylines = []
                for (let index = 0; index < this.polylines.length; index++) {
                    const polyline = this.polylines[index]
                    if (polyline.modified) {
                        polylines.push({id: polyline.id,
                            day_toado: (polyline.path.filter(element => {
                                return String(element.id).startsWith('DIEMUON_')
                            }))})
                    }
                }
                this.$emit('luuToaDoBanDo', nodes, polylines)
            },
            // dragendPosition (event, node) {
            //     this.isMapChanged = true
            // },
            // dragPositionNode (event, Node) {
            //     try {
            //         const nodeid = Node.id
            //         let lat = event.latLng.lat()
            //         let lng = event.latLng.lng()
            //
            //         const objIndex = this.Nodes.findIndex(obj => obj.id === nodeid)
            //         if (objIndex < 0) return
            //         this.Nodes[objIndex].Position.lat = lat
            //         this.Nodes[objIndex].Position.lng = lng
            //         this.Nodes[objIndex].Modified = true
            //
            //         const length = this.Routes.length
            //         let copiedArray = new Array(length)
            //         for (let i = 0; i < length; i++) {
            //             let Route = this.Routes[i]
            //             if ((nodeid === Route.A.id || nodeid === Route.B.id) || nodeid.startsWith('DIEMUON_')) {
            //                 let path = Route.Positions.slice(0)
            //                 for (let j = 0; j < path.length; j++) {
            //                     if (path[j].id === nodeid) {
            //                         path[j].lat = lat
            //                         path[j].lng = lng
            //                         Route.Modified = !!nodeid.startsWith('DIEMUON_')
            //                         break
            //                     }
            //                 }
            //                 Route.Positions = path
            //                 copiedArray[i] = Route
            //             } else {
            //                 copiedArray[i] = Route
            //             }
            //         }
            //         this.Routes = copiedArray.slice(0)
            //     } catch (error) {
            //         console.log('dragPositionNode error', error)
            //     }
            // },
            setPositionNode (id, position) {
                const objIndex = this.nodes.findIndex(obj => obj.id === id)
                if (objIndex >= 0) {
                    this.nodes[objIndex].position.lat = parseFloat(position.lat)
                    this.nodes[objIndex].position.lng = parseFloat(position.lng)
                    this.nodes[objIndex].modified = true
                }
            },
            getPositionNode: function (id) {
                const objIndex = this.nodes.findIndex(obj => obj.id === id)
                if (objIndex >= 0) {
                    return {
                        lat: parseFloat(this.nodes[objIndex].position.lat),
                        lng: parseFloat(this.nodes[objIndex].position.lng)
                    }
                } else return null
            },
            setDraggableNode (id, draggable) {
                const objIndex = this.nodes.findIndex(obj => obj.id === id)
                if (objIndex >= 0) {
                    this.nodes[objIndex].draggable = draggable
                }
            },
            mousemove (event) {
                this.mouselatLng = {lat: event.latLng.lat(), lng: event.latLng.lng()}
            },
            getPositionPolyline: function (item) {
                return {
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng)
                }
            },
            panToMarker (pos) {
                this.$refs.oneBSSGmap.panTo(pos)
            },
            nodeCreate () {
                let node = new GraphNode()
                return node
            },
            create_UUID () {
                let dt = new Date().getTime()
                let uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    let r = (dt + Math.random() * 16) % 16 | 0
                    dt = Math.floor(dt / 16)
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
                })
                return uuid
            },
            diemuonAdd (id_polyline, position, visible, draggable) {
                let id = 'DIEMUON_' + this.create_UUID()
                let node = new GraphNode()
                node.id = id
                node.visible = visible
                //node.AllowMove = draggable
                node.draggable = draggable
                node.setPosition(position)
                node.isDiemuon = true
                node.id_polyline = id_polyline
                node.setIcon(100)
                this.nodeUpdate(node)
                //this.nodes.push(node)
                console.log('diem uon', this.nodes)
                return id
            },
            getNodes () {
                return this.nodes
            },
            getPolylines () {
                return this.polylines
            },
            nodeUpdate (node) {
                const objIndex = this.nodes.findIndex(obj => obj.id === node.id)
                if (objIndex >= 0) return false
                this.nodes.push(node)
                return true
            },
            setLocationEx (position) {
                if (position === null || position === 'undefined') {
                    if (this.nodes.length > 0) {
                        this.location = {
                            lat: this.nodes[0].position.lat,
                            lng: this.nodes[0].position.lng
                        }
                    }
                } else {
                    this.location = {
                        lat: position.lat,
                        lng: position.lng
                    }
                }
            },
            clear () {
                this.nodes.length = 0
                this.nodes = []
                this.polylines.length = 0
                this.polylines = []
            },
            polylineCreate () {
                let polyline = new GraphPolyline()
                return polyline
            },
            polylineUpdate (polyline) {
                const objIndex = this.polylines.findIndex(obj => obj.id === polyline.id)
                if (objIndex >= 0) return false
                this.polylines.push(polyline)
                return true
            },
            getPositionNodeId (id) {
                const objIndex = this.nodes.findIndex(obj => obj.id === id)
                if (objIndex >= 0) {
                    return this.nodes[objIndex].position
                } else return null
            },
            getPolylineById (id) {
                const objIndex = this.polylines.findIndex(obj => obj.id === id)
                if (objIndex >= 0) return this.polylines[objIndex]
                else return null
            },
            getNodeById (id) {
                const objIndex = this.nodes.findIndex(obj => obj.id === id)
                if (objIndex >= 0) return this.nodes[objIndex]
                else return null
            },
            setViewNodeSuaToaDoCap (id) {
                const polyline = this.getPolylineById(id)
                if (polyline !== null) {
                    const path = polyline.path
                    for (let index = 0; index < path.length; index++) {
                        const objIndex = this.nodes.findIndex(obj => obj.id === path[index].id)
                        if (objIndex >= 0) {
                            this.nodes[objIndex].visible = true
                            this.nodes[objIndex].draggable = true
                        }
                    }
                }
            },
            getPolylinePath (id) {
                const polyline = this.getPolylineById(id)
                if (polyline !== null) {
                    const path = polyline.path
                    let pathposition = []
                    for (let index = 0; index < path.length; index++) {
                        const position = this.getPositionNodeId(path[index])
                        if (position !== null) {
                            pathposition.push(position)
                        }
                    }
                    return pathposition
                } else return []
            },
            getIsMapChanged () {
                return this.isMapChanged
            },
            setNodes (nodes) {
                this.nodes = nodes
            },
            setPolylines (polylines) {
                this.polylines = polylines
            },
            isHere:function(){
                const latlng = {
                    lat: parseFloat(this.atHere.split(',')[0]),
                    lng: parseFloat(this.atHere.split(',')[1]),
                };
                const geocoder = new window.google.maps.Geocoder();
                geocoder
                    .geocode({ location: latlng })
                    .then((response) => {
                        if (response.results[0]) {
                            console.log('Đại chỉ:',response.results[0].formatted_address)
                            this.$root.toastInfo('Đây là: '+response.results[0].formatted_address);
                        } else {
                            this.$root.toastInfo("Không tìm thấy");
                        }
                    })
                    .catch((e) =>  this.$root.toastError("Lỗi phát sinh: " + e));
            },
            capnhatToaDo: async function(data){
                try {
                    this.$root.showLoading(true)
                    let rs = await this.$root.context.post(
                        "/web-cabman/BanDoTuyenCong/cap-nhat-toa-do-be-cap", data
                    )
                    if (rs.error_code == "BSS-00000000") {
                        this.$toast.success("Cập nhật tọa độ thành công")
                    }
                } catch (error) {
                    this.$toast.error(error.message);
                } finally {
                    this.$root.showLoading(false);
                }
            },
            ghiToaDo:async function(){
                if(this.beChuaToaDo !=null){
                    console.log('beChuaToaDo',this.beChuaToaDo)
                    let beId = this.beChuaToaDo.BECAP_ID
                    let kinhdo = this.atHere.split(',')[1]
                    let vido =this.atHere.split(',')[0]
                    let obj = {
                        beCapId:beId,
                        kinhDo: kinhdo,
                        viDo:vido
                    }
                    await this.capnhatToaDo(obj)
                }
            },
            clickMap: async  function  (event) {
                if(this.isGhiToaDo){
                    this.atHere = event.latLng.lat() + "," + event.latLng.lng();
                    this.isGhiToaDo=false
                    await this.ghiToaDo()
                    EventBus.$emit('refeshBanDo',true)
                }
            },
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
  .control-map{
    margin-top: 4px;
  }
</style>
