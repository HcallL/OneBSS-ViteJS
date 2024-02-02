<template src="./portlogic.html"></template>
<script>
import {required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
  components: {},
  name: 'PortLogic',
  props: {
    modalShowPortLogic: Boolean,
      dslamId: Number,
    tramTbiId: Number
  },
  data: function () {
    return {
      dsPort: [],
      dsDichVu: [],
      dsSpliter: [],
      dsTrangThai: [],
      dsLoaiHinhDaGan: [],
      dsLoaiHinhChuaGan: [],
      dsSelectedDaGan: [],
      dsSelectedPort: [],
      dsSelectedChuaGan: [],
      isDisableBtnNhapMoi: false,
      isDisableBtnSua: false,
      isDisableBtnGhiLai: false,
      isDisableBtnHuyBo: false,
      isDisableBtnXoa: false,
      isDisableTenTuyenInput: false,
      isDisableCboLoaiTuyenTD: false,
      dataSelected :{
        portId : null,
        dichVuId : null,
        spliter : null,
        trangThaiPortID : null,
        loaiHinhDaGan : null,
        loaiHinhChuaGan : null,
        rpId : null,
      }
    }
  },


  watch: {
    'dataSelected.spliter': async function (val) {

    }

  },
  methods: {

    async onModalShown() {
      if(this.dslamId){
        await this.getDsPort(this.dslamId)
      }
      await this.getDichVu()
      await this.getTrangThaiPort()
      if (this.tramTbiId){
        await this.getSplitters(this.tramTbiId)

      }
    },

    hideModal: function () {
      this.$emit('hideModal')
    }, getDsPort: async function (dslamId) {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/layDsPortV2?dslamId=${dslamId}`
        )
        if (rs.data) {
          this.dsPort = rs.data
          this.dataSelected.portId = rs.data[0].PORT_ID
        } else {
          this.dsPort = []
          this.dataSelected.portId = null
        }

      } catch (error) {

      } finally {
        this.loading(false)
      }
    }, getDichVu: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          '/web-ecms/thongsoport/layDichVu'
        )
        if (rs.data) {
          this.dsDichVu = rs.data
          this.dataSelected.dichVuId = rs.data[0].DICHVUVT_ID
        } else {
          this.dsDichVu = []
          this.dataSelected.dichVuId = null
        }

      } catch (error) {

      } finally {
        this.loading(false)
      }
    },dichVuChange: async function(selectedIndex){
      this.dataSelected.dichVuId = this.dsDichVu[selectedIndex].DICHVUVT_ID
      if(this.dataSelected.rpId || this.dataSelected.dichVuId){
        await this.getDsLHChuaGan(this.dataSelected.rpId, this.dataSelected.dichVuId)
      }
    }, getTrangThaiPort: async function () {
    try {
      this.loading(true)
      var rs = await this.$root.context.get(
        '/web-ecms/thongsoport/dslaytrangthaiport'
      )

      if (rs.data) {
        this.dsTrangThai = rs.data
        this.dataSelected.trangThaiPortID = rs.data[0].TT_PORT_ID
      } else {
        this.dataSelected.trangThaiPortID = ""
      }

    } catch (error) {

    } finally {
      this.loading(false)
    }
  },trangThaiChange: async function(selectedIndex){

    }
    ,async danhSachPortChange(dataItem){
      if(dataItem){
        this.dataSelected.rpId = dataItem.RP_ID
         this.dataSelected.trangThaiPortID = dataItem.TRANGTHAI
        this.dataSelected.spliter = dataItem.KETCUOI_ID

        await this.getDsLHDaGan(dataItem.RP_ID)
        await this.getDsLHChuaGan(dataItem.RP_ID, this.dataSelected.dichVuId)
      }
    }, selectedRowChanged: function () {

    },
    selectedPort: function(data) {
      console.log("acasc" ,data)
      this.dsSelectedPort = data
    },
    selectedDsDaGan: function(data) {
      this.dsSelectedDaGan = data;
    },
    selectedDsChuaGan: function(data) {
      this.dsSelectedChuaGan = data;
    },
  addToDsChuaGan: function() {
    var arr = [];
    this.dsSelectedDaGan.map(val => {
      var idx = this.dsLoaiHinhDaGan.findIndex(v => v.LOAITB_ID == val);
      if(idx >= 0) {
        arr.push(this.dsLoaiHinhDaGan[idx]);
        this.dsLoaiHinhDaGan = this.dsLoaiHinhDaGan.filter(v => v.LOAITB_ID != val);
      }
    })
    this.dsLoaiHinhChuaGan = this.dsLoaiHinhChuaGan.concat(arr);
    this.dsSelectedDaGan = [];
  },
  addToDsDaGan: function() {
    var arr = [];
    this.dsSelectedChuaGan.map(val => {
      var idx = this.dsLoaiHinhChuaGan.findIndex(v => v.LOAITB_ID == val);
      if(idx >= 0) {
        arr.push(this.dsLoaiHinhChuaGan[idx]);
        this.dsLoaiHinhChuaGan = this.dsLoaiHinhChuaGan.filter(v => v.LOAITB_ID != val);
      }
    })
    this.dsLoaiHinhDaGan = this.dsLoaiHinhDaGan.concat(arr);
    this.dsSelectedChuaGan = [];
  }, getSplitters: async function (tramTbiId) {
    try {
      this.loading(true)
      var rs = await this.$root.context.get(
        `/web-ecms/thongsoport/laySpliterTheoTram?tramtbi=${tramTbiId}`
      )
      this.dsSpliter = rs.data
      if (rs.data) {
        this.dataSelected.spliter = rs.data[0].KETCUOI_ID
      } else {
        this.dataSelected.spliter = ""
      }

    } catch (error) {

    } finally {
      this.loading(false)
    }
  },btnDanhSach: async function (){
      await this.getDsPort(this.dslamId)
    },
    btnCapNhat: async function (){
      var arr = this.dsSelectedPort.map(val => val);
      console.log("aa1",arr)
      if(this.dsSelectedPort.length <=0){
        this.$toast.error("Bạn chưa chọn port.");
        return
      }
        await this.capNhatTTport(arr,  this.dataSelected.trangThaiPortID)
      this.$toast.success("Cập nhật thành công");
    },
    btnGanSplitter: async function (){
      var arr = this.dsSelectedPort.map(val => val);
      if(this.dsSelectedPort.length <=0){
        this.$toast.error("Bạn chưa chọn port.");
        return
      }
      await this.ganSplitter(arr, this.dataSelected.spliter)
    },
    btnGanLH: async function (){
      if(this.dsSelectedPort.length <=0){
        this.$toast.error("Bạn chưa chọn port.");
        return
      }
      if(this.dsLoaiHinhDaGan.length <=0) {
        this.$toast.error("Bạn chưa chọn loại hình.");
        return
      }
      if(this.dataSelected.rpId){
        var arr = this.dsLoaiHinhDaGan.map(val => val.LOAITB_ID);
        var arrId = this.dsSelectedPort.map(val => val);

        await this.ganLhChoPort(arrId, arr)
      }
    },getDsLHDaGan: async function (vrp_id) {
      try {

        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayLoaiHinhDaGan?vrpId=${vrp_id}`
        )
        if (rs.data.length > 0) {
          this.dsLoaiHinhDaGan = rs.data
          this.dataSelected.loaiHinhDaGan = rs.data[0].LOAITB_ID
        } else {
          this.dsLoaiHinhDaGan = []
          this.dataSelected.loaiHinhDaGan = null
        }

      } catch (error) {

      } finally {
        this.loading(false)
      }
    },getDsLHChuaGan: async function (vrpId,dichVuId) {
      try {

        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayLoaiHinhChuaGan?vrpId=${vrpId}&dichVuId=${dichVuId}`
        )
        if (rs.data.length > 0) {
          this.dsLoaiHinhChuaGan = rs.data
          this.dataSelected.loaiHinhChuaGan = rs.data[0].LOAITB_ID
        } else {
          this.dsLoaiHinhChuaGan = []
          this.dataSelected.loaiHinhChuaGan = null
        }

      } catch (error) {

      } finally {
        this.loading(false)
      }
    },capNhatTTport: async function (vrpId,trangThaiId) {
      try {
          let data ={
            vrpId : vrpId,
            trangThaiId : trangThaiId
          }
        this.loading(true)
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/capNhatTrangThaiPortV2',data
        )
        if (rs.data) {
          await  this.getDsPort(this.dslamId)
          this.$toast.success("Cập nhật thành công");
        } else {
          this.$toast.error("Có lỗi xảy ra");
        }

      } catch (error) {
        this.$toast.error(error.message);

      } finally {
        this.loading(false)
      }
    },ganSplitter: async function (vrpId,ketCuoiID) {
      try {
        let data ={
          vrpId : vrpId,
          ketCuoiId : ketCuoiID
        }
        if(!vrpId){
          this.$toast.error("Chưa chọn port");
          return
        }
        this.loading(true)
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/ganSplitterTheoPort',data
        )
        if (rs.data) {
        await  this.getDsPort(this.dslamId)
          this.$toast.success("gán Splitter thành công");
        } else {
          this.$toast.error("Có lỗi xảy ra");
        }

      } catch (error) {
        this.$toast.error(error.message);

      } finally {
        this.loading(false)
      }
    },ganLhChoPort: async function (vrpId,loaiTbId) {
      try {
        if(!vrpId){
          this.$toast.error("Chưa chọn port");
          return
        }
        this.loading(true)
        let data ={
          vrpId: vrpId,
          loaiTbId: loaiTbId
        }
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/ganLhChoPort',data
        )
        if (rs.data) {
          await this.getDsPort(this.dslamId)
          this.$toast.success("Gán loại hình thành công");
        } else {
          this.$toast.error("Có lỗi xảy ra");
        }

      } catch (error) {
        this.$toast.error(error.message);

      } finally {
        this.loading(false)
      }
    }
  },async mounted(){
  }
}
</script>
<style>

.modal-xxl{
  max-width: 70% !important;
}

.disable-btn:hover {
  background-color: white !important;
}

.disable-btn a {
  color: #6c757d !important;
}

.disable-btn a:hover {
  cursor: default;
  color: #6c757d;
}
</style>

