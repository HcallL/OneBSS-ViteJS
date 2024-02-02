<template src="./index.template.html"></template>

<script>
import './../../../../utils/gmaps'
import BanDo from '../components/BanDo.vue'
import ModalChonDiaChi from '../ChonDiaChi/Modal'
export default {
  components: {BanDo, ModalChonDiaChi},
  name: 'Modal',
  props: {
    modalShow: Boolean,
    data: Object
  },

  computed: {
    getMarkers () {
      return this.markers
    },
    radiusObj () {
      return this.radius
    }
  },

  data () {
    return {
      dsBlock: [],
      cicles: {},
      ketquaTK: '',
      bankinhTK: 1000,
      value: 1000,
      viDo: -1,
      kinhDo: -1,
      validated: 1,
      diachi: '',
      dataSelected: {
        diachi_id: null,
        tinh_id: null,
        quan_id: null,
        phuong_id: null,
        pho_id: null,
        ap_id: null,
        khu_id: null,
        dac_diem_id: null,
        so_nha: ''
      },
      markers: [],
      radius: [],
      mapType: 'ROADMAP',
      dsThuoctinh: [],
      lat: -1,
      lng: -1,
      center: {
        lat: this.lat,
        lng: this.lng
      },
      defaultRadius: -1,
    }
  },
  watch: {
    mapType (val) {
      this.$refs.map.setmapType(val)
    },
    value (val) {
      this.defaultRadius = Math.round((val * this.value) / 10)
      //this.chieudaicap_sau = this.chieudaicap - this.chieudaicap_truoc
      this.changeAuto(this.defaultRadius)
      console.log('value ',this.defaultRadius)
    }
  },
  methods: {
    thaydoiMapType () {
      if (this.mapType === 'ROADMAP') {
        this.mapType = 'SATELLITE'
      } else {
        this.mapType = 'ROADMAP'
      }
    },
    changeRadius: function () {
      this.radius = []
      if (this.defaultRadius > 1000){
        this.defaultRadius = 1000
      }
      if (this.defaultRadius <=0){
        this.defaultRadius = 1
      }
      const r = parseInt(this.defaultRadius, 10)
       this.radius.push({
      position: { lat: this.lat, lng: this.lng },
      r: r
    })
    },
    changeAuto: function (rd) {
      this.radius = []
      const r = parseInt(rd, 10)
      this.radius.push({
      position: { lat: this.lat, lng: this.lng },
      r: r
    })
    },
    closeModal: function () {
      this.$emit('closeModal', this.modalShow)
    },
    timKiemKC: async function () {
      try {
        this.loading(true)
        let data = {
          P_PHANVUNG_ID: this.$root.token.getPhanVungID(),
          P_LAT: this.lat,
          P_LNG: this.lng,
          P_BANKINH: this.defaultRadius,
          P_PHANLOAIKC_ID: 1,
          P_ISLAYKCCON: 1,
          PROCEDURE_NAME: 'ECMS.PKG_TRACUUBANDO_MNV.SP_LAY_DS_KETCUOI_TRONG_BANKINH_V3'
        }
         console.log('data', data)
        let res = await this.$root.context.post('/web-cabman/ban-do-mang-cap/execute1', data)
        console.log('timKiemKC', res.data)
        let ds = res.data

        let soKetCuoi
        if (ds.length > 0) {
          // for (let i = 0; i < ds.length; i++) {
          //   if (ds[i].SODOIROI === 0) {
          //     ds.splice(i, 1)
          //   }
          // }
          soKetCuoi = ds.length
          console.log('so ket cuoi ', soKetCuoi)
        }
        if (soKetCuoi > 0) { this.ketquaTK = 'Tìm thấy ' + soKetCuoi + ' kết cuối trong bán kính ' + this.defaultRadius + ' m' } else {
          this.defaultRadius = 'Không tìm thấy kết cuối nào.'
        }

        this.viDo = data.lat
        this.kinhDo = data.lng

        this.markers = []
        ds.forEach(element => {
          var ThuocTinhObject = this.getThuocTinhObject(10, element.LOAIKC_ID, element.PHANLOAIKC_ID)
          // console.log('ThuocTinhObject', ThuocTinhObject)
          var StyleThuocTinhObject = this.getStyleThuocTinhObject(ThuocTinhObject)
          // console.log('StyleThuocTinhObject', StyleThuocTinhObject)
          StyleThuocTinhObject = {
            ToolTip: '<b>Kết cuối: ' + element.KYHIEU + '</b><br>' + (element.SODOIROI !== 0 ? 'Số vị trí rỗi: ' + element.SODOIROI : 'Số vị trí rỗi: Không còn'),
            ...StyleThuocTinhObject}
          this.markers.push({
            KETCUOI_ID: element.KETCUOI_ID,
            VIDO: parseFloat(element.VIDO),
            KINHDO: parseFloat(element.KINHDO),
            KYHIEU: element.KYHIEU,
            STYLE: StyleThuocTinhObject
          })
        })
      } catch (error) {
        this.$root.toastError(' ' + error.response.data.message_detail)
      } finally {
        this.loading(false)
      }
    },
    getThuocTinhObject (DoiTuongMC, LoaiDoiTuong, PhanLoaiDoiTuong) {
      var result = this.dsThuoctinh.filter(obj => {
        return obj.DOITUONG_MC === DoiTuongMC & obj.LOAI_DT === LoaiDoiTuong & obj.PHANLOAI_DT === PhanLoaiDoiTuong
      })
      return result.length > 0 ? result[0] : {}
    },
    getStyleThuocTinhObject (ThuocTinhObject) {
      var StyleThuocTinhObject = {}
      if (ThuocTinhObject.GRAPHIC_TYPE === 'DIEM') {
        StyleThuocTinhObject.MauVien = ThuocTinhObject.BORDER_COLOR
        StyleThuocTinhObject.MauNen = ThuocTinhObject.S_COLOR
        if (ThuocTinhObject.IMAGE !== null) {
          const image = Buffer.from(ThuocTinhObject.IMAGE, 'base64')
          const blob = new Blob([image], {type: 'image/png'})
          const imgurl = window.URL.createObjectURL(blob)
          StyleThuocTinhObject.ImageUrl = imgurl
        } else {
          StyleThuocTinhObject.ImageUrl = '/static/icons/icon100x100/CHUA_XAC_DINH.jpg'
        }
        StyleThuocTinhObject.WIDTH = ThuocTinhObject.WIDTH
        StyleThuocTinhObject.HEIGHT = ThuocTinhObject.HEIGHT
      }
      return StyleThuocTinhObject
    },
    getThuocTinh: async function () {
      try {
        let rs = await this.$root.context.get('/web-ecms/tracuubando/lay-ds-thuoctinh')
        if (rs.error_code == 'BSS-00000000') {
          console.log('getThuocTinh', rs.data)
          this.dsThuoctinh = rs.data
        }
      } catch (error) {
        this.$root.toastError('' + error)
      }
    },
    getDiaChi: function (data) {
      this.diachi = data.diachimoi
      this.dataSelected.diachi = data.diachimoi
      this.dataSelected.tinh_id = data.tinh_id
      this.dataSelected.quan_id = data.quan_id
      this.dataSelected.phuong_id = data.phuong_id
      this.dataSelected.pho_id = data.pho_id
      this.dataSelected.ap_id = data.ap_id
      this.dataSelected.khu_id = data.khu_id
      this.dataSelected.dac_diem_id = data.dacdiem_id
      this.dataSelected.so_nha = data.so_nha
    },
    getThongTinMap: async function () {
      try {
        this.$root.showLoading(true)
        var rs = await this.$root.context.get(
          '/web-cabman/bando_matdo/thongtin_bando'
        )
        if (rs.data != null && rs.data.length > 0) {
          this.lat = parseFloat(rs.data[0].C_LATITUS)
          this.lng = parseFloat(rs.data[0].C_LONGTITUS)
          this.center.lat = parseFloat(rs.data[0].C_LATITUS)
          this.center.lng = parseFloat(rs.data[0].C_LONGTITUS)
          this.defaultRadius = rs.data[0].RADIUS
        }
        console.log('getThongTinMap ',rs.data)
      } catch (error) {
      } finally {
        this.$root.showLoading(false)
      }
    },
    formatTooltip (val) {
      let v = Math.round(this.bankinhTK * val / 100)
      return v.toString()
    },
    changeR: function(v){
      let a = Math.round(this.bankinhTK * v / 10)
      console.log('changeR', a)
      this.defaultRadius = a;
      //this.changeRadius()
    },
    isHere: function () {
      this.markers = []
      const address = this.diachi
      const geocoder = new window.google.maps.Geocoder()
      console.log('address', address)
      geocoder.geocode({ address: address })
        .then((response) => {
          if (response.results[0]) {
            this.point = response.results[0].geometry.location.lat() + ',' + response.results[0].geometry.location.lng()
            this.address = response.results[0].formatted_address
            // this.markers.push({
            //   KETCUOI_ID: 'KETCUOI_1',
            //   VIDO: response.results[0].geometry.location.lat(),
            //   KINHDO: response.results[0].geometry.location.lng(),
            //   KYHIEU: 'KC_01'
            // })
            this.center.lat = response.results[0].geometry.location.lat()
            this.center.lng = response.results[0].geometry.location.lng()
            this.lat = response.results[0].geometry.location.lat()
            this.lng = response.results[0].geometry.location.lng()
            const r = parseInt(this.bankinhTK, 10)
            this.radius = []
            this.radius.push({
              position: {
                lat: response.results[0].geometry.location.lat(),
                lng: response.results[0].geometry.location.lng()
              },
              r: r
            })
          } else {
            this.$root.toastInfo('Không tìm thấy')
          }
        })
        .catch((e) => this.$root.toastError('Lỗi phát sinh: ' + e))
    },
    addMarker: function () {
      try {
        this.loading(true)
        this.isHere()
      } catch (error) {
        this.$root.toastError('Lỗi phát sinh: ' + error)
      } finally {
        this.loading(false)
      }
    }
  },
  async mounted () {
    await this.getThongTinMap()
    this.radius.push({
      position: { lat: this.lat, lng: this.lng },
      r: this.defaultRadius
    })
    this.viDo = this.lat
    this.kinhDo = this.lng
    this.value = this.defaultRadius
    console.log('this.radius',this.radius)
  },
  async created () {
    await this.getThuocTinh()
  }
}
</script>
<style>
.el-slider.is-vertical .el-slider__runway {
    width: 6px;
    margin: 5px 20px;
    height: 275px;
    float: right;
    margin-right: 0px;
}
</style>