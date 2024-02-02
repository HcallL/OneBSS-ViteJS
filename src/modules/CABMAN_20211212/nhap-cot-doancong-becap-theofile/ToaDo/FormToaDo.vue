<template>
  <div class="map-canvas-box">
    <div class="map-canvas-main">
      <GmapMap
        id="gmapMapControl"
        ref="gmapMap"
        :zoom="15"
        :options="mapOptions"
        :center="centerLocation"
        :mapTypeId="mapTypeId"
        style="width: 100%; height: 400px"
      >
        <GmapMarker
          ref="gmapMarker"
          :position="currentLocation"
          :draggable="true"
          @drag="gmapMarker_OnDrag"
        />
        <GmapInfoWindow
          :position="currentLocation"
          :options="{
            pixelOffset: {
              height: -45,
            },
          }"
        >
          <span v-html="address"></span>
        </GmapInfoWindow>
      </GmapMap>
      <div class="map-position bg-white">
        <div class="row">
          <div class="col-sm-4 col-12">
            <div class="info-row marb0">
              <div class="key w30 nowrap">Kinh độ</div>
              <div class="value">
                <input
                  type="text"
                  v-model="lat"
                  class="form-control bg-white text-primary"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-12">
            <div class="info-row marb0">
              <div class="key w30 nowrap">Vĩ độ</div>
              <div class="value">
                <input
                  type="text"
                  v-model="lng"
                  class="form-control bg-white text-primary"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-header">
      <div class="map-header-left">
        <div class="input-group input-group-search">
          <div class="input-text">
            <input
              type="text"
              class="form-control"
              v-model="txtSearch"
              @keyup.enter="btnSearch_Click"
            />
          </div>
          <div class="input-addon">
            <button class="btn" @click="btnSearch_Click">
              <span class="icon one-search"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="map-header-right">
        <button
          class="btn-changetype"
          :class="mapTypeId"
          @click="btnChangeMapType_Click"
        >
          <span class="fa fa-globe"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoogleMapsAPI } from "gmap-vue";
import html2canvas from "html2canvas";
export default {
  components: { html2canvas },
  data: function () {
    return {
      lat: 0,
      lng: 0,
      address: "",
      mapOptions: {
        zoomControl: true,
        scaleControl: true,
        disableDefaultUi: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        maxZoom: this.maxZoom,
        disableDoubleClickZoom: true,
      },
      centerLocation: { lng: 105.80942518391265, lat: 21.019324322184655 },
      txtSearch: "",
      map: null,
      mapTypeId: "roadmap",
    };
  },
  computed: {
    google: getGoogleMapsAPI,
    currentLocation: function () {
      return { lng: this.lng, lat: this.lat };
    },
  },
  // async created() {
  //   await this.$gmapApiPromiseLazy();
  // },
  // async mounted() {
  //   this.$refs.gmapMap.$mapPromise.then((map) => {
  //     this.map = map;
  //   });
  // },
  methods: {
    bindData: function (kinhDo, viDo, diaChi) {
      this.lng = kinhDo;
      this.lat = viDo;
      this.address = diaChi;
      this.centerLocation = { lng: kinhDo, lat: viDo };
    },
    gmapMarker_OnDrag: function (e) {
      try {
        this.lng = e.latLng.lng();
        this.lat = e.latLng.lat();
      } catch (error) {
        console.log("gmapMarker drag error", error);
      }
    },
    btnSearch_Click(arg) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.txtSearch }, (results, status) => {
        if (status === "OK") {
          this.bindData(
            results[0].geometry.location.lng(),
            results[0].geometry.location.lat(),
            results[0].formatted_address
          );
        } else {
          this.$root.toastError("Tìm kiếm không thành công vì: " + status);
        }
      });
    },
    btnChangeMapType_Click() {
      this.mapTypeId = this.mapTypeId == "roadmap" ? "satellite" : "roadmap";
    },
    printMap: function () {
      html2canvas($(".map-canvas-main")[0], {
        useCORS: true,
      }).then((canvas) => {
        let imgData = canvas.toDataURL("image/png");
        var newWindow = window.open("");
        $(newWindow.document.body)
          .html(
            "<img src=" +
              imgData +
              " style='width: " +
              canvas.width +
              "px'></img>"
          )
          .ready(function () {
            newWindow.focus();
            newWindow.print();
          });
      });
    },
  },
};
</script>
<style>
.gm-ui-hover-effect {
  display: none !important;
}
</style>
