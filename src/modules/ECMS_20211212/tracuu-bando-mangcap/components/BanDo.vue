<template>
  <div style="height: 800px;">
<vue-simple-context-menu
        elementId="menuMap"
        :options="optionsMapMenu"
        ref="vueSimpleContextMenuMap"
        @option-clicked="menuMap_Clicked"
      />
      <GmapMap
            id="map"
            ref="oneBSSGmap"
            :zoom="zoomLevel"
            :options="mapOptions"
            :center="getPositionCenter"
            @dblclick="dblclickMap($event)"
            @rightclick="rightclickMap($event)"
            style="width: 100%; height: calc(100% - 36px);"
      >

      <gmap-marker
        :key="index+'m1'"
        v-for="(m, index) in getMarkers"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
         @mouseover="mouseoverNode($event, m)"
                  @mouseout="mouseoutNode($event, m)"
      ></gmap-marker>

       <gmap-marker
        :key="index+'m2'"
        v-for="(m, index) in getRadiusObj"
        :position="m.position"
        @click="center=m.position"
        :clickable="true"
      ></gmap-marker>

      <gmap-circle
          v-for="(pin, index) in getRadiusObj"
          :key="index+'circle'"
          :center="pin.position"
          :radius="pin.r"
          :visible="true"
          :options="{fillOpacity:0.5,strokeWeight: 0.5,  fillColor: '#FF0000'}">
      </gmap-circle>

       <GmapInfoWindow
                :options="infoOptionsNode"
                :position="infoPositionNode"
                :opened="infoOpenedNode"
                @closeclick="infoOpenedNode = false">
                <span v-html="infoContentNode"></span>
        </GmapInfoWindow>

      </GmapMap>
  </div>
</template>
<script>

import {getGoogleMapsAPI} from 'gmap-vue'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import MeasureTool from 'measuretool-googlemaps-v3'
export default {
  components: {'vue-simple-context-menu': VueSimpleContextMenu, MeasureTool},
  name: 'BanDo',
  props: {
    markers: [],
    radiusObj: {},
    center: {}
  },
  watch: {
    center: function (value) {
      console.log('watch', this.center)
    }
  },
  computed: {
    google: getGoogleMapsAPI,
    // getPositionCenter () { return this.markers.length > 0 ? {lat: this.markers[0].VIDO, lng: this.markers[0].KINHDO} : this.center },
    getPositionCenter () { return this.center },
    getRadiusObj () {
      console.log('getRadiusObj', this.radiusObj)
      return this.radiusObj
    },
    getMarkers () {
      console.log('getMarkers', this.markers)
      let nodes = []
      for (let index = 0; index < this.markers.length; index++) {
        const marker = this.markers[index]
        if (marker.KETCUOI_ID === 'KETCUOI_1') {
          nodes.push({
            id: marker.KETCUOI_ID,
            position: {
              lat: marker.VIDO,
              lng: marker.KINHDO
            },
            title: marker.KYHIEU,
            icon: null
          })
        } else {
          nodes.push({
            id: marker.KETCUOI_ID,
            position: {
              lat: marker.VIDO,
              lng: marker.KINHDO
            },
            title: marker.KYHIEU,
            tooltipText: marker.STYLE.ToolTip,
            icon: {
              url: marker.STYLE.ImageUrl,
              size: new window.google.maps.Size(marker.STYLE.WIDTH, marker.STYLE.HEIGHT),
              scaledSize: new window.google.maps.Size(marker.STYLE.WIDTH, marker.STYLE.HEIGHT),
              labelOrigin: { x: 16, y: 40 },
              anchor: new window.google.maps.Point(15, 15)
            }
          })
        }
      }
      console.log('getMarkers nodes', nodes)
      return nodes
    }
  },
  async created () {
    await this.$gmapApiPromiseLazy()
  },
  data () {
    return {
      optionsMapMenu:
      [
        {
          name: '<span class="icon text-main f20 one-chuyencap"></span> Đo khoảng cách',
          slug: 'dokhoangcach'
        },
        {
          name: '<span class="icon text-main f20 one-taodiemuon"></span> Xóa phép đo',
          slug: 'xoaphepdo'
        }


      ],
      zoomLevel: 15,
      mapOptions: {
        zoomControl: false,
        scaleControl: true,
        disableDefaultUi: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        maxZoom: this.maxZoom
      },
      location: {lat: 16.07511849179389, lng: 108.2093338123915},
      maxZoom: 20,
      map: null,
      infoOptionsNode: {
        shouldFocus: false,
        pixelOffset: {
          width: 0,
          height: -10
        }
      },
      infoContentNode: null,
      infoPositionNode: null,
      infoOpenedNode: false
    }

  },
  async  mounted () {
    let vm = this
    this.$refs.oneBSSGmap.$mapPromise.then((map) => {
      vm.map = map
      this.measureTool = new MeasureTool(this.map, {
        contextMenu: false,
        unit: MeasureTool.UnitTypeId.METRIC,
        tooltip: false
      })
      var polygon = new this.google.maps.Polygon({
          clickable: true
        })
      this.measureTool.addListener('measure_start', () => {
          console.log('started')
          polygon.setOptions({clickable: false})
      })
      this.measureTool.addListener('measure_end', (e) => {
        console.log('ended', e.result)
        polygon.setOptions({clickable: true})
      })
      this.measureTool.addListener('measure_change', (e) => {
        console.log('changed', e.result)
      })
    })
    // this.geolocate()
  },
  methods: {
    mouseoverNode (event, node) {
      this.infoPositionNode = event.latLng
      this.infoContentNode = node.tooltipText
      this.infoOpenedNode = true
    },
    mouseoutNode (event, node) {
      this.infoOpenedNode = false
    },
    setmapType (type) {
      if (type === 'ROADMAP') {
        this.map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)
      } else {
        this.map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
      }
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
    dblclickMap (event) {
      const idx = this.nodes.findIndex(obj => obj.id === 'x')
      if (idx > -1) {
        this.nodes[idx].position.lat = event.latLng.lat()
        this.nodes[idx].position.lng = event.latLng.lng()
      } else {
        this.nodes.push({
          id: 'x',
          position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        })
      }
      this.$emit('dblclickMap', { lat: event.latLng.lat(), lng: event.latLng.lng() })
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
    rightclickMap (event) {
      console.log('rightclickMap', event)
      this.locationrightclickMap = event.latLng
      this.$refs.vueSimpleContextMenuMap && this.$refs.vueSimpleContextMenuMap.hideContextMenu()
      this.$refs.vueSimpleContextMenuMap.showMenu(event)
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
    menuMap_Clicked (event) {
      console.log('menuMap_Clicked', event)
      switch (event.option.slug) {
        case 'dokhoangcach':
          this.measureTool && this.measureTool.start()
          break
        case 'xoaphepdo':
        this.measureTool && this.measureTool.end()
          break
        // case 'tim_dia_diem':
        //   // this.showSearchDiaDiem = !this.showSearchDiaDiem
        //   this.$bvModal.show('modal-bankinh');
        //   break
        case 'day_la_dau':
          console.log('day_la_dau', this.locationrightclickMap.lat(), this.locationrightclickMap.lng());
          this.$bvModal.show('modal-whereareyou');
          break
      }
    },
    // addMarker () {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     }
    //     this.markers.push({ position: marker })
    //     this.places.push(this.currentPlace)
    //     this.center = marker
    //     this.currentPlace = null
    //   }
    // },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
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
