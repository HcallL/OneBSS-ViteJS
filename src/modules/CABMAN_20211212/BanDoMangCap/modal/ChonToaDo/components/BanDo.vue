<template>
  <div style="height: 800px;">
      <GmapMap
            id="map"
            ref="oneBSSGmap"
            :zoom="zoomLevel"
            :options="mapOptions"
            :center="getPositionCenter"
            @dblclick="dblclickMap($event)"
            @rightclick="rightclickMap($event)"
            style="width: 100%; height: calc(100% - 26px);">
              <GmapMarker
                  :position="getPositionCenter"
                  :icon="getMarkerIcon2()"
                  :label="getLabel2()">
              >
              </GmapMarker>
              <GmapMarker
                  v-for="node in getNodes"
                  :key="node.id"
                  :draggable="true"
                  :position="node.position"
                  :icon="getMarkerIcon()"
                  @dragend="dragendPositionNode($event,node)"
              >
              </GmapMarker>
      </GmapMap>
  </div>
</template>
<script>

import {getGoogleMapsAPI} from 'gmap-vue'

export default {
  components: {},
  name: 'BanDo',
  props: {
    position: null,
    diachi: null,
    mapTypeId: null,
    zoomDefault: null
  },
  computed: {
    google: getGoogleMapsAPI,
    getPositionCenter () { return this.positionCenter },
    getNodes () {
      return this.nodes
    }
  },
  async created () {
    await this.$gmapApiPromiseLazy()
  },
  data () {
    return {
      zoomLevel: this.zoomDefault,
      mapOptions: {
        zoomControl: false,
        scaleControl: true,
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        maxZoom: this.maxZoom,
        draggableCursor: 'default',
        draggingCursor: 'pointer',
        disableDoubleClickZoom: true
      },
      maxZoom: 20,
      map: null,
      nodes: [],
      positionCenter: this.position
    }
  },
  watch: {
    mapTypeId (val) {
      if (val === 'ROADMAP') {
        this.map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)
      } else {
        this.map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
      }
    }
  },
  async  mounted () {
    let vm = this
    this.$refs.oneBSSGmap.$mapPromise.then((map) => {
      vm.map = map
    })
  },
  methods: {
    searchLocation: function (searchAddressInput) {
      var geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({'address': searchAddressInput}, (results, status) => {
        console.log('searchLocation', status)
        if (status === 'OK') {
          var lat = results[0].geometry.location.lat()
          var lng = results[0].geometry.location.lng()
          const idx = this.nodes.findIndex(obj => obj.id === 'x')
          if (idx > -1) {
            this.nodes[idx].position.lat = lat
            this.nodes[idx].position.lng = lng
          } else {
            this.nodes.push({
              id: 'x',
              position: {
                lat: lat,
                lng: lng
              }
            })
          }
          var myLatlng = new window.google.maps.LatLng(lat, lng)
          this.map.panTo(myLatlng)
          this.$emit('dblclickMap', { lat: lat, lng: lng })
        }
      })
    },
    dragendPositionNode (event, node) {
      node.position.lat = event.latLng.lat()
      node.position.lng = event.latLng.lng()
      this.$emit('dblclickMap', { lat: event.latLng.lat(), lng: event.latLng.lng() })
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
    rightclickMap (event) { },
    getMarkerIcon () {
      return {
        url: require('../position.png'),
        size: {width: 40, height: 40, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 40, f: 'px', b: 'px'}
      }
    },
    getMarkerIcon2 () {
      return {
        labelOrigin: { x: 20, y: -10 },
        url: require('../placeholder.svg'),
        size: { width: 40, height: 40, f: 'px', b: 'px' },
        scaledSize: { width: 40, height: 40, f: 'px', b: 'px' }
      }
    },
    getLabel2 () {
      return ({'text': this.diachi !== null ? this.diachi : this.position.lat + ';' + this.position.lng, 'color': '#3225F6', 'fontSize': '12px', 'fontFamily': 'Arial', 'fontWeight': 'bold'})
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
