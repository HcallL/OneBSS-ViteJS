<template src="./taodaiport.html"></template>
<script>
import {numeric, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  components: {},
  name: 'TaoDaiPort',
  props: {
    modalShowTaoDaiport: Boolean,
    dslamId: Number,
    inforPort: {},
    tramTbiId: Number
  },
  data: function () {
    return {
      DONVIQL_LD: 3,
      TRAM_VT: 5,
      DONVI_ID: 0,
      GPON: 3,
      DSLAM: 1,
      MANE: 17,
      SWITCH: 2,
      TRAM_PORT: 39,
      TT_PORT: '',
      dsDonViQuanLy: [],
      dsTrangThaiPort: [],
      dsRackShelf: [],
      dsRackShelf1: [],
      dsTramThiCong: [],
      dsTramTB: [],
      dsCheckDsLam: [],
      dsDsLamTinh: [],
      dsVciDaGan: [],
      dsvciChuaGan: [],
      dsLoaiHinhDaGan: [],
      dsLoaiHinhChuaGan: [],
      dsBras: [],
      dslamVdc: [],
      dsCard: [],
      dsPort: [],
      dsDichVu: [],
      dslamChitiet: [],
      dsLoaiTbId : '',
      fixport: '',
      thamso: '',
      dsSelectedDaGan: [],
      dsSelectedChuaGan: [],
      disableSelfid01: false,
      disableSelfid02: false,
      disableSelfid03: false,
      disableSelfid04: false,
      disableCard: false,
      isDisableBtnNhapMoi: false,
      isDisableBtnCapNhat: false,
      isDisableBtnHuy: false,
      isDisableBtnXoa: false,
      system: '',
      portMdf: '',
      slotBd: '',
      slotKt: '',
      portBd: '',
      portKt: '',
      rack: '',
      shelf: '',
      VpiSvlanBD: '',
      VpiCvlanBD: '',
      VpiSvlanKT: '',
      VpiCvlanKT: '',
      Sel1: null,
      Sel2: null,
      Sel3Bd: null,
      Sel3Kt: null,
      Sel4Bd: null,
      Sel4Kt: null,
      modalShowPortLogic: false,
      isFirst: false,
      isFirstBras: false,
    //  modalShowTaoDaiport: false,
      dataSelected: {
        dichVuId: null,
        donViQuanLy: null,
        trangthai: null,
        rackShelfId: null,
        rackShelfValue: null,
        tramThiCong: null,
        tramThietBi: null,
        dslamTinh: null,
        vciDaGan: null,
        vciChuaGan: null,
        loaiHinhDaGan: null,
        bras: null,
        dslamVdc: null,
        loaiTBiId: null,
        cardId: null,
        portId: null,
      }, detailcard: {
        vitri: null
      }
    }
  },

  watch: {
    'dataSelected.donViQuanLy': async function (val) {
      await this.getTramTc()
    }, 'dataSelected.tramThiCong': async function (val) {

      await this.getTramTb()
    },
    'dataSelected.tramThietBi': async function (val) {

      await this.getDslamTinhTheoTramTbi()
      await this.checkDsLam()
      // if (this.dsCheckDsLam.length <= 0) {
      //   await this.hienThiDanhSachVciVpi(0)
      // }
    }, 'dataSelected.dslamTinh': async function (val) {

    }, 'dataSelected.bras': async function (val) {
      if (val) {
        this.getDslamVdc(val)
      }
    }

  },
  methods: {

    async onModalShown () {
      this.isFirst = true
      this.isFirstBras = true
      await this.getDonViQl()
      this.getDichVu()

      await this.getTramTc()
      await this.getTramTb()
      await this.getDslamTinhTheoTramTbi()
      await this.getRackShelf()

      await this.getBrasAdsl()
      await this.getDslamVdc(this.dataSelected.bras)
    },

    hideModal: function () {
      this.portMdf = ''
      this.slotBd = ''
      this.slotKt = ''
      this.portBd = ''
      this.portMdf = ''
      this.VpiSvlanBD = ''
      this.VpiSvlanKT = ''
      this.VpiCvlanKT = ''
      this.VpiCvlanBD = ''
      this.$emit('hideModal')
    }, selectedRowChanged: function () {

    }, getLHChuaGanV2: async function (dichVuId, dsLoaiTbId) {
    try {
      this.loading(true)
      let rs = await this.$root.context.get(
        `/web-ecms/thongsoport/dsLayLoaiHinhChuaGanV2?dichVuId=${dichVuId}&dsloaitbId=`
      )

      if (rs.data.length > 0) {
        this.dsLoaiHinhChuaGan = rs.data

      } else {
        this.dsLoaiHinhChuaGan = []
      }

    } catch (error) {
      console.log('loadData error', error)
    } finally {
      this.loading(false)
    }

  },addToDsChuaGan: function() {
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
    },
    selectedDsDaGan: function (data) {
      this.dsSelectedDaGan = data
    },
    selectedDsChuaGan: function (data) {
      this.dsSelectedChuaGan = data
    }, getDonViQl: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.post(
          `/web-ecms/thongsoport/dsdonviquanly?donviId=${this.DONVI_ID}&loaidvId=${this.DONVIQL_LD}`
          // `/web-ecms/thongsoport/dsdonviquanly?donviId=0&loaidvId=3`
        )
        if (rs.data.length > 0) {
          this.dsDonViQuanLy = rs.data
          if(this.inforPort.DONVI_ID){
            this.dataSelected.donViQuanLy =this.inforPort.DONVI_ID
          }else {
            this.dataSelected.donViQuanLy = rs.data[0].DONVI_ID
          }
        } else {
          this.dataSelected.donViQuanLy = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    }, dslamTinhChange: async function (selectedIndex) {
      //  this.dataSelected.dslamTinh = this.dslamTinh[selectedIndex]
      this.dataSelected.loaiTBiId = this.dsDsLamTinh[selectedIndex].LOAITBI_ID
      this.getTTDslam()

      if (this.dataSelected.loaiTBiId === this.GPON || this.dataSelected.loaiTBiId === this.DSLAM || this.dataSelected.loaiTBiId === this.MANE || this.dataSelected.loaiTBiId === this.SWITCH) {
        this.getDsCard(this.dataSelected.dslamTinh, this.dataSelected.loaiTBiId)

      } else {
        this.dsCard = []
      }

    }, rackShelfChange: async function (selectedIndex) {
      this.dataSelected.rackShelfId = this.dsRackShelf[selectedIndex].RACK_ID
      this.dataSelected.rackShelfValue = this.dsRackShelf[selectedIndex].RACK_SHELF
      if (this.dataSelected.rackShelfValue) {
        this.rack = this.dataSelected.rackShelfValue.split(' - ')[0]
        this.shelf = this.dataSelected.rackShelfValue.split(' - ')[1]
      }
    }, dichVuChange: async function (selectedIndex) {
      await this.getLHChuaGanV2(this.dataSelected.dichVuId)
    }, dsCardChange: async function (selectedIndex) {
      this.dataSelected.cardId = this.dsCard[selectedIndex].CARD_ID
      this.slotBd = this.dsCard[selectedIndex].VITRI
      this.slotKt = this.dsCard[selectedIndex].VITRI
      this.portBd = this.dsCard[selectedIndex].PORT_BD
      this.portKt = this.dsCard[selectedIndex].SO_PORT

    }, getTramTc: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayTramTc?donviId=${this.dataSelected.donViQuanLy}&loaidvId=${this.TRAM_VT}`
        )
        this.dsTramThiCong = rs.data
        if (rs.data.length > 0) {
        //  await this.getTramTb()
          if(this.inforPort.TRAM_TC_ID && this.isFirst){
            this.dataSelected.tramThiCong = this.inforPort.TRAM_TC_ID
          }else {
            this.dataSelected.tramThiCong = rs.data[0].DONVI_ID

          }
        } else {
          this.dataSelected.tramThiCong = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    }, checkDsLam: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayDslam?donviId=${this.dataSelected.tramThietBi}`
        )
        if (rs.data.length > 0) {
          this.dsCheckDsLam = rs.data
        } else {
          this.dsCheckDsLam = []
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    }, getTramTb: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayTramTb?donviId=${this.dataSelected.tramThiCong}&loaidvId=${this.TRAM_PORT}`
        )
        this.dsTramTB = rs.data
        if (rs.data.length > 0) {
          if(this.inforPort.TRAM_TB_ID && this.isFirst){
            this.dataSelected.tramThietBi = this.inforPort.TRAM_TB_ID
          }else {
            this.dataSelected.tramThietBi = rs.data[0].DONVI_ID
          }
        } else {
          this.dataSelected.tramThietBi = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    }, getBrasAdsl: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          '/web-ecms/thongsoport/dslaybrasadsl'
        )
        if (rs.data.length > 0) {
          this.dsBras = rs.data
          if(this.inforPort.BRAS_ID){
            this.dataSelected.bras = this.inforPort.BRAS_ID
          }else {
            this.dataSelected.bras = rs.data[0].BRAS_ID
          }
        } else {
          this.dsBras = []
          this.dataSelected.bras = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }

    }, getDsCard: async function (dslamId, loaiTbId) {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayDsCard?dslamId=${dslamId}&loaiTbId=${loaiTbId}`
        )
        if (rs.data.length > 0) {
          this.dsCard = rs.data
          this.dataSelected.cardId = rs.data[0].CARD_ID
          this.slotBd = this.dsCard[0].VITRI
          this.slotKt = this.dsCard[0].VITRI
          this.portBd = this.dsCard[0].PORT_BD
          this.portKt = this.dsCard[0].SO_PORT
        } else {
          this.dsCard = []
          this.dataSelected.cardId = null
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
           }
    }, getRackShelf: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          '/web-ecms/thongsoport/dslayrackshelf'
        )
        this.dsRackShelf = rs.data
        this.dsRackShelf1 = rs.data

        if (rs.data) {

          if(this.inforPort.RACK_ID){
            this.dataSelected.rackShelfId = this.inforPort.RACK_ID
            this.dataSelected.rackShelfValue = rs.data.filter(item => item.RACK_ID === this.inforPort.RACK_ID)[0].RACK_SHELF
          }else {
            this.dataSelected.rackShelfId = rs.data[0].RACK_ID
            this.dataSelected.rackShelfValue = rs.data[0].RACK_SHELF
          }
          if (this.dataSelected.rackShelfValue) {
            this.rack = this.dataSelected.rackShelfValue.split(' - ')[0]
            this.shelf = this.dataSelected.rackShelfValue.split(' - ')[1]
          }
        } else {
          this.dataSelected.rackShelfId = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }

    }, getDslamVdc: async function (brasId) {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayDsLamVdc?brasId=${brasId}&kieu=2`
        )
        if (rs.data.length > 0) {
          this.dslamVdc = rs.data
          if(this.inforPort.DSLAM_VDC && this.isFirstBras){

            this.dataSelected.dslamVdc = this.inforPort.DSLAM_VDC
          }else {
            this.dataSelected.dslamVdc = rs.data[0].DSLAM_ID
          }
        } else {
          this.dslamVdc = []
          this.dataSelected.dslamVdc = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.isFirstBras = false
        this.loading(false)
      }
    }, getDslamTinhTheoTramTbi: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.post(
          `/web-ecms/thongsoport/dsLayDsLamTinhTheoTramTbi?donViId=${this.dataSelected.tramThietBi}`
        )
        if (rs.data) {
          this.dsDsLamTinh = rs.data
          if(this.inforPort.DSLAM_TINH_ID && this.isFirst){
            this.dataSelected.dslamTinh = this.inforPort.DSLAM_TINH_ID
          }else {
            this.dataSelected.dslamTinh = rs.data[0].DSLAM_ID
          }
          if (this.dataSelected.loaiTBiId === this.GPON || this.dataSelected.loaiTBiId === this.DSLAM || this.dataSelected.loaiTBiId === this.MANE || this.dataSelected.loaiTBiId === this.SWITCH) {
            await this.getDsCard(this.dataSelected.dslamTinh, this.dataSelected.loaiTBiId)

          } else {
            this.dsCard = []
          }
        } else {
          this.dsDsLamTinh = []
          this.dataSelected.dslamTinh = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.isFirst = false
        this.loading(false)
      }
    }, getDichVu: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          '/web-ecms/thongsoport/dsLayDichVuV2'
        )
        if (rs.data) {
          this.dsDichVu = rs.data
          this.dataSelected.dichVuId = rs.data[0].DICHVUVT_ID
          await this.getLHChuaGanV2(this.dataSelected.dichVuId)
        } else {
          this.dsDichVu = []
          this.dataSelected.dichVuId = null
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    },kiemTraDuLieu : function (){

      },btnDanhSach: async function (){
        await this.layDsPort()
    },btnTaoDs: async function (){
      // if(this.dsLoaiHinhDaGan.length <=0 ){
      //   if(this.fixport !== 0){
      //     this.$toast.error('Hãy gán loại hình thuê bao tạo port.')
      //     return
      //   }
      // }
    var arr = this.dsLoaiHinhDaGan.map(val => val.LOAITB_ID)
      console.log(arr)
      if(this.validateData()){
        return
      }
      this.$bvModal.msgBoxConfirm('Bạn có thật sự muốn tạo port không ?',
        {
          title: 'Xác nhận hành động',
          centered: true,
          size: 'sm',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy'
        }).then((value) => {
        if (value) {
          this.TaoDaiPort(arr)
        }
      })

  },btnXoa: async function (){
      if(this.validateData()){
        return
      }
      this.$bvModal.msgBoxConfirm('Bạn có muốn xóa port không ?',
        {
          title: 'Xác nhận hành động',
          centered: true,
          size: 'sm'
        }).then((value) => {
        if (value) {
          this.XoaDaiPort()
        }
      })
  }, getTTDslam: async function () {
      try {
        this.loading(true)
        var rs = await this.$root.context.get(
          `/web-ecms/thongsoport/dsLayTTDslam?dslamId=${this.dataSelected.dslamTinh}`
        )
        if (rs.data) {
          this.dslamChitiet = rs.data[0]
          this.fixport = rs.data[0].FIXPORT
          this.thamso = rs.data[0].THAMSO
        } else {
          this.dslamChitiet = []
          this.fixport = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    },async danhSachPortChange(dataItem){


         this.portMdf =dataItem.PORT_MDF,
         this.VpiCvlanBD =dataItem.VCI,
         this.VpiCvlanKT =dataItem.VCI,
        this.VpiSvlanBD =dataItem.VPI,
         this.VpiSvlanKT =dataItem.VPI
    }, layDsPort: async function () {
      try {
        this.loading(true)
        let data = {
          dslamId: this.dataSelected.dslamTinh,
          portBd: this.portBd,
          portKt: this.portKt,
          rackId: this.dataSelected.rackShelfId,
          slotBd: this.slotBd,
          slotKt: this.slotKt,
        }
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/layDsDaiPort?',data
        )
        if (rs.data) {
          this.dsPort = rs.data
       //   this.dataSelected.portId = rs.data[0].
        } else {
          this.dsPort = []
      //    this.fixport = ''
        }

      } catch (error) {
        console.log('loadData error', error)

      } finally {
        this.loading(false)
      }
    },defaultValue: function (){
      if (this.Sel3Bd === "" || !this.Sel3Bd )
        this.Sel3Bd = "0";
      if (this.Sel3Kt === "" || !this.Sel3Kt )
        this.Sel3Kt = "0";
      if (this.Sel4Bd === "" || !this.Sel4Bd )
        this.Sel4Bd = "0";
      if (this.Sel4Kt === "" || !this.Sel4Kt )
        this.Sel4Kt = "0";

    }, TaoDaiPort: async function (dsLoaiThietBi) {

      try {

        this.defaultValue()

        this.loading(true)
        let data = {
          card_id: this.dataSelected.cardId,
          dslam_id: this.dataSelected.dslamTinh,
          dslam_vdc_id: this.dataSelected.dslamVdc,
          dsloaitb_id: dsLoaiThietBi ,
          port_bd: this.portBd,
          port_kt: this.portKt,
          port_mdf: this.portMdf,
          rack_id: this.dataSelected.rackShelfId,
          selfid01: this.Sel1,
          selfid02: this.Sel2,
          selfid03_bd: this.Sel3Bd,
          selfid03_kt:  this.Sel3Kt,
          selfid04_bd:  this.Sel4Bd,
          selfid04_kt:  this.Sel4Kt,
          slot_bd: this.slotBd,
          slot_kt: this.slotKt,
          vci_bd: this.VpiCvlanBD,
          vci_kt: this.VpiCvlanKT,
          vpi_bd: this.VpiSvlanBD,
          vpi_kt: this.VpiSvlanKT
        }
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/TaoDsDaiPort',data
        )
        if (rs.data) {
          this.$toast.success('Tạo dải thành công')
          await this.layDsPort()
        } else {
          this.$toast.error('Tạo dải thất bại')
        }

      } catch (error) {
        this.$toast.error('Thất bại' + error)

      } finally {
        this.loading(false)
      }
    }, validateData() {
      let errorMessage = []

      if (this.dsTramThiCong.length <= 0) {
          errorMessage.push('Hãy chọn trạm thi công.')
      }

      if (this.dsTramTB.length <= 0) {
        errorMessage.push('Hãy chọn trạm thiết bị.')
      }

      if (!this.VpiSvlanKT) {
        this.$refs.VpiSvlanKT.focus()
        errorMessage.unshift('Trường vpi kết thúc bắt buộc nhập dữ liệu.')
      }

      if (!this.VpiSvlanBD) {
        this.$refs.VpiSvlanBD.focus()
        errorMessage.unshift('Trường vpi bắt đầu bắt buộc nhập dữ liệu.')
      }

      if (!this.VpiCvlanKT) {
        this.$refs.VpiCvlanKT.focus()

        errorMessage.unshift('Trường vci kết thúc bắt buộc nhập dữ liệu.')
      }

      if (!this.VpiCvlanBD) {
        this.$refs.VpiCvlanBD.focus()

        errorMessage.unshift('Trường vci bắt đầu bắt buộc nhập dữ liệu.')
      }

      if (!this.portKt) {
        this.$refs.portKt.focus()

        errorMessage.unshift('Trường port kết thúc bắt buộc nhập dữ liệu.')
      }

      if (!this.portBd) {
        this.$refs.portBd.focus()

        errorMessage.unshift('Trường port bắt đầu bắt buộc nhập dữ liệu.')
      }
      if (!this.slotKt) {
        this.$refs.slotKt.focus()
        errorMessage.unshift('Trường slot kết thúc bắt buộc nhập dữ liệu.')
      }

      if (!this.slotBd) {
        this.$refs.slotBd.focus()
        errorMessage.unshift('Trường slot bắt đầu bắt buộc nhập dữ liệu.')
      }

      if (!this.portMdf) {
        this.$refs.portMdf.focus()
        errorMessage.unshift('Trường port mdf bắt buộc nhập dữ liệu.')
      }


      if (errorMessage.length > 0) {
        this.$toast.error(errorMessage.join('\n'))
        return true
      } else {
        return false
      }
    }
    , XoaDaiPort: async function () {

      try {

        this.defaultValue()
        this.loading(true)
        let data = {

          dslam_id: this.dataSelected.dslamTinh,
          port_bd: this.portBd,
          port_kt: this.portKt,
          rack_id: this.dataSelected.rackShelfId,
          selfid01: this.Sel1,
          selfid02: this.Sel2,
          selfid03_bd: this.Sel3Bd,
          selfid03_kt:  this.Sel3Kt,
          selfid04_bd:  this.Sel4Bd,
          selfid04_kt:  this.Sel4Kt,
          slot_bd: this.slotBd,
          slot_kt: this.slotKt,
          thamso: this.thamso,
          vci_bd: this.VpiCvlanBD,
          vci_kt: this.VpiCvlanKT,
          vpi_bd: this.VpiSvlanBD,
          vpi_kt: this.VpiSvlanKT
        }
        var rs = await this.$root.context.post(
          '/web-ecms/thongsoport/XoaDaiPort',data
        )
        if (rs.message === 'Thành công') {
          this.$toast.success('Xoá dải thành công')
          await this.layDsPort()
        } else {
          this.$toast.error('Xoá dải thất bại')
        }


      } catch (error) {
        this.$toast.error('Thất bại' + error)

      } finally {
        this.loading(false)
      }
    }

}
}
</script>
<style>
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
.modal-xxl{
  max-width: 80% !important;
}

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
</style>

