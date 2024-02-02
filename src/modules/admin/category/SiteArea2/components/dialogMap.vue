<template>
  <b-modal
  size="xl"
  :id="idModalChonToaDo"
  no-close-on-backdrop
  hide-footer
  hide-header
  hide-header-close
  v-model="visible"
  body-class="modal-body p-0">
    <div class="modal-content popup-box" v-if="visible">
        <div class="popup-header">
            <div class="title"><span class="icon one-notepad"></span>Khu vực: Test</div>
            <div class="close -ap icon-close" data-dismiss="modal" @click="$bvModal.hide(idModalChonToaDo)">
            </div>
        </div>
        <div class="list-actions-top">
            <ul class="list">
                <li>
                    <a href="javascript:void(0)" @click="XacNhanToaDo()">
                        <span class="icon nc-icon-glyph ui-1_check-circle-08"></span> Xác nhận
                    </a>
                </li>
                <li>
                            <a href="#">
                                <span class="icon one-design-per"></span> Tạo vùng
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon one-edit"></span> Sửa vùng
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon one-trash"></span> Xoá vùng
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon one-reload1"></span> Cập nhật
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon one-file-refresh"></span> Nạp lại
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon one-circle-question"></span> Trợ giúp
                            </a>
                        </li>
                <!-- <li>
                    <a href="javascript:void(0)" @click="InBanDo()">
                        <span class="icon one-print"></span> In bản đồ
                    </a>
                </li> -->
            </ul>
        </div>
        <div class="popup-body">
            <div class="box-form">
                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <div class="info-row marb0">
                                    <div class="key w30 nowrap">Địa chỉ</div>
                                    <div class="value">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-12">
                                <div class="info-row marb0">
                                    <div class="key w30 nowrap">Vĩ độ</div>
                                    <div class="value">
                                        <input type="text" class="form-control" :value="positionKetCuoi.lat">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3 col-12">
                                <div class="info-row marb0">
                                    <div class="key w30 nowrap">Kinh độ</div>
                                    <div class="value">
                                        <input type="text" class="form-control" :value="positionKetCuoi.lng">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <div class="box-form">
                <div class="map-canvas-box">
                    <BanDo ref="BanDo" :diachi="diachi" :ten_kc="ten_kc" @dblclickMap="dblclickMap" :position="getPosition" :zoomDefault="zoomDefault" :mapTypeId="mapTypeId"></BanDo>
                    <div class="search-box">
                        <div class="input-group">
                            <div class="input-text">
                                <div class="input-icon-left">
                                    <input type="text" class="form-control" v-model="searchAddressInput" v-on:keyup.enter="searchLocation">
                                    <span class="icon one-search"></span>
                                </div>
                            </div>
                            <div class="input-addon">
                                <button class="btn" @click="searchLocation()">
                                    <span class="-ap icon-more_horiz"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="action-right">
                        <a href="javascript:void(0)" class="change-type" @click="changetypeMap">
                            <img src="@/assets/img/icons/image3.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</b-modal>
</template>
<script>
import "@/utils/gmaps"
import BanDo from './BanDo.vue'
export default {
  components: {
    BanDo
  },
  data: () => ({
    visible: false,
    idModalChonToaDo: "idModalChonToaDo",
    diachi: null,
    ten_kc: null,
    getPosition: { lat: 1.380, lng: 103.800 },
    zoomDefault: 15,
    mapTypeId: 'ROADMAP',
    positionKetCuoi: {
      lat: null,
      lng: null
    },
    khuvuc_id: null,
    searchAddressInput: ''
  }),
  computed: {
  },
  async mounted () {
    this.loadData()
  },
  methods: {
    show (visible, data) {
      this.visible = visible
      this.khuvuc_id = data.khuvuc_id
      console.log('khuvuc_id', this.khuvuc_id)
    },
    async loadData () {
    },
    XacNhanToaDo () {

    },
    InBanDo () {

    },
    dblclickMap () {

    },
    searchLocation () {},
    changetypeMap () {}
  },
  watch: {
  }
}
</script>
