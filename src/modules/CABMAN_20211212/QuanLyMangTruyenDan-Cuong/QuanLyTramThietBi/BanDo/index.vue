<template src="./index.template.html"></template>
<script>

import '@/utils/gmaps'
import BanDo from './components/BanDo.vue'
import EventBus from '@/utils/eventBus'

export default {
  components: { BanDo },
  name: 'ModalChonToaDo',
  props: {
    idModalChonToaDo: String,
    vitriToaDo: Object,
    isShow: Boolean
  },
  computed: {
    getPosition () {
      if (this.position === null || (this.position.lat * this.position.lng === 0)) {
        return {...this.positionDefault}
      } else return {...this.position}
    }
  },
  async mounted () {
    this.position = Object.assign({}, this.vitriToaDo);
    this.positionKetCuoi = Object.assign({}, this.vitriToaDo);
  },
  data () {
    return {
      position: {
        lat: 0, lng: 0
      },
      diachi: null,
      mapTypeId: 'ROADMAP',
      positionDefault: {
        lat: 0, lng: 0
      },
      zoomDefault: 15,
      positionKetCuoi: {
        lat: 0, lng: 0
      },
      thongtinbando: {},
      searchAddressInput: this.positionDefault,
      resolvePromise: null,
      rejectPromise: null
    }
  },
  methods: {
    InBanDo () {
      var file = 'map_' + new Date().toISOString().slice(0, 10)
      EventBus.$emit('IN_BANDO', file)
    },
    closeModal: function () {
      this.$emit('closeModalToaDo');
    },
    searchLocation () {
      var map = this.$refs.BanDo
      map.searchLocation(this.searchAddressInput.trim())
    },
    XacNhanToaDo () {
      this.$bvModal.msgBoxConfirm('Cập nhật tọa độ trạm thiết bị?', {
          size: 'sm',
          centered: true,
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy',
      })
      .then(async val => {
          if(val) {
            this.$emit('XacNhanToaDo', {...this.positionKetCuoi})
          }
      })
      .catch(err => {
          this.$root.toastError('Cập nhật tọa độ thất bại.');
      })
    },
    changetypeMap () {
      if (this.mapTypeId === 'ROADMAP') {
        this.mapTypeId = 'SATELLITE'
      } else {
        this.mapTypeId = 'ROADMAP'
      }
    },
    dblclickMap (event) {
      console.log(event);
      this.positionKetCuoi.lat = event.lat
      this.positionKetCuoi.lng = event.lng
    }
  },
  watch: {
    diachi (val) {
      this.searchAddressInput = val
    }
  },
  created () {

  }
}
</script>

<style scoped>
.modal-fullscreen .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
}
.btn-lg {
    background: #AED6F1 ;
    color: #000;
    border:2px solid;
}
</style>
