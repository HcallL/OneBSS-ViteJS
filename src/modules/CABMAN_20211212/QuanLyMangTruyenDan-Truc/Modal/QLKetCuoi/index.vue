<template src="./index.template.html"></template>
<script>

import ModalChonDiaChi from '../../../BanDoTuyenCot/ChonDiaChi/Modal'
import ModalChonToaDo from '../../../BanDoMangCap/modal/ChonToaDo'
import BssErrorMarker from '@/components/BssErrorMarker'
import BssRequiredMarker from '@/components/BssRequiredMarker'
import { required, minValue, maxValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: 'QLKetCuoi',
  props: { modalID: null },
  components: {
    ModalChonToaDo, BssErrorMarker, BssRequiredMarker, ModalChonDiaChi
  },
  created: async function () {
  },
  validations: {
    dataSelected:
    {
      KYHIEU: {
        required
      },
      LOAIKC_ID: {
        required
      },
      TEN_KC: {
        required
      },
      DIACHI: {
        required
      },
      KINHDO: {
        required
      },
      VIDO: {
        required
      },
      TONGSO_DD: {
        required
      }
    }

  },
  watch: {
    'dataSelected.DUAN_ID' (val) {
      this.$root.context.get(
        '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TAISAN', option: this.dataSelected.DUAN_ID === null ? 0 : this.dataSelected.DUAN_ID}
      ).then((rs) => {
        this.dsTaiSan = rs.data
      })
    },
    'dataSelected.KYHIEU' (val) {
      this.dataSelected.TEN_KC = val
    }
  },
  computed: {
    getPosition () {
      try {
        return {
          lat: parseFloat(this.dataSelected.VIDO),
          lng: parseFloat(this.dataSelected.KINHDO)
        }
      } catch (error) {
        return {
          lat: 0,
          lng: 0
        }
      }
    },
    getDiachi () {
      try {
        return this.dataSelected.DIACHI
      } catch (error) {
        return null
      }
    }
  },
  methods: {
    show (themmoi, ketcuoi) {
      return new Promise((resolve, reject) => {
        this.dataSelected = ketcuoi
        console.log('dataSelected', ketcuoi)
        this.themmoi = themmoi
        this.$bvModal.show(this.modalID)
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    closeModal: function () {
      this.resolvePromise({ok: false, data: null})
      this.$bvModal.hide(this.modalID)
    },
    XacNhanToaDo (position) {
      this.dataSelected.VIDO = position.lat
      this.dataSelected.KINHDO = position.lng
    },
    resetModal: async function () {
      try {
        this.$root.showLoading(true)
        await this.initForm()
        this.$v.$reset()
        if (this.themmoi) {

        } else {

        }
        // if (this.dataQLKetCuoi != null) {
        //   if (this.dataQLKetCuoi.cmd === 'SuaKetcuoi') {
        //     this.dataSelected.ketcuoi_id = this.dataQLKetCuoi.data.ketcuoi_id
        //     this.dataSelected.phanloaikc_id = this.dataQLKetCuoi.data.phanloaikc_id
        //     await this.initForm()
        //     if (this.dataSelected.ketcuoi_id != null) { await this.thongtinKetCuoi() }
        //   } else {
        //     this.init()
        //     this.dataSelected.ketcuoi_id = this.dataQLKetCuoi.data.ketcuoi_id
        //     this.dataSelected.phanloaikc_id = this.dataQLKetCuoi.data.phanloaikc_id
        //     this.dataSelected.donvi_id = this.dataQLKetCuoi.data.donvi_id
        //     this.dataSelected.capgoc_kyhieu = this.dataQLKetCuoi.data.capgoc.KYHIEU
        //     this.dataSelected.capgoc_id = this.dataQLKetCuoi.data.capgoc.CAP_ID

        //     if (this.dataQLKetCuoi.data.cap_id !== undefined) { this.dataSelected.cap_id = this.dataQLKetCuoi.data.cap_id }
        //     if (this.dataQLKetCuoi.data.nguondich !== undefined) { this.dataSelected.nguondich = this.dataQLKetCuoi.data.nguondich }

        //     if (this.dataQLKetCuoi.data.ketcuoi_truoc_id !== null) {
        //       let rs = await this.$root.context.get(
        //         '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'KETCUOI', option: this.dataQLKetCuoi.data.ketcuoi_truoc_id}
        //       )
        //       if (rs.data && rs.data.length > 0) {
        //         this.dataSelected.kinhdo = rs.data[0].KINHDO
        //         this.dataSelected.vido = rs.data[0].VIDO
        //       }
        //     }
        //     await this.initForm()
        //   }
        // }
      } catch (er) {} finally {
        this.$root.showLoading(false)
      }
    },
    init () {
      Object.keys(this.dataSelected).forEach((i) => this.dataSelected[i] = null)
      this.dataSelected.NGAY_SD = new Date()
      this.dataSelected.NGAY_LD = new Date()
    },
    initForm: async function () {
      try {
        var rs = null
        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'PHANLOAI_KC', option: ''}
        )
        this.dsPHANLOAI_KC = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'LOAI_KC', option: ''}
        )
        this.dsLOAI_KC = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TRANGTHAI_SD', option: ''}
        )
        this.dsTRANGTHAI_SD = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'KIEU_LAP', option: ''}
        )
        this.dsKIEU_LAP = rs.data

        if (this.dsKIEU_LAP.length > 0) {
          this.dataSelected.KIEULAP_ID = this.dsKIEU_LAP[0].KIEULAP_ID
        }

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'NOI_SX', option: ''}
        )
        this.dsNOI_SX = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'VITRI', option: ''}
        )
        this.dsVITRI = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'LOAI_VO', option: ''}
        )
        this.dsLOAI_VO = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'DUAN', option: ''}
        )
        this.dsDuAn = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'CHUQUAN', option: ''}
        )
        this.dsChuQuan = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TOQL', option: ''}
        )
        this.dsTOQL = rs.data
      } catch (error) {
      } finally {
      }
    },
    // mapDataKetCuoi: function (data) {
    //   if (data != null) {
    //     console.log('mapDataKetCuoi', data)
    //     this.dataSelected.phanloaikc_id = data.PHANLOAIKC_ID
    //     this.dataSelected.loaikc_id = data.LOAIKC_ID
    //     this.dataSelected.cap_sp = data.CAP_SP

    //     this.dataSelected.capgoc_id = data.CAPGOC_ID
    //     this.dataSelected.capgoc_kyhieu = data.CAPGOC_KYHIEU

    //     this.dataSelected.tongso_dd = data.TONGSO_DD
    //     this.dataSelected.dungluong = data.DUNGLUONG

    //     this.dataSelected.sl_port_dadung = data.SL_PORT_DADUNG
    //     this.dataSelected.sl_port_roi = data.SL_PORT_ROI
    //     this.dataSelected.sl_port_tb = data.SL_PORT_TB

    //     this.dataSelected.kieulap_id = data.KIEULAP_ID
    //     this.dataSelected.noisx_id = data.NOISX_ID
    //     this.dataSelected.vitri_id = data.VITRI_ID
    //     this.dataSelected.loaivo_id = data.LOAIVO_ID

    //     this.dataSelected.chuquan_id = data.CHUQUAN_ID
    //     this.dataSelected.taisan_id = data.TAISAN_ID
    //     this.dataSelected.duan_id = data.DUAN_ID
    //     this.dataSelected.ttsd_id = data.TTSD_ID

    //     this.dataSelected.ma_kc = data.MA_KC
    //     this.dataSelected.ten_cot = data.TEN_KC
    //     this.dataSelected.kyhieu = data.KYHIEU

    //     this.dataSelected.diachi = data.DIACHI

    //     this.dataSelected.donvi_id = data.DONVI_ID

    //     this.dataSelected.ngay_ld = data.NGAY_LD
    //     this.dataSelected.ngay_sd = data.NGAY_SD

    //     this.dataSelected.kinhdo = data.KINHDO
    //     this.dataSelected.vido = data.VIDO

    //     this.dataSelected.ma_csht = data.MA_CSHT
    //     this.dataSelected.ims_id = data.IMS_ID
    //     this.dataSelected.ghichu = data.GHICHU
    //     this.dataSelected.diachi_id = data.DIACHI_ID

    //     this.dataSelected.tinh_id = data.TINH_ID
    //     this.dataSelected.quan_id = data.QUAN_ID
    //     this.dataSelected.phuong_id = data.PHUONG_ID
    //     this.dataSelected.pho_id = data.PHO_ID
    //     this.dataSelected.ap_id = data.AP_ID
    //     this.dataSelected.khu_id = data.KHU_ID
    //     this.dataSelected.dac_diem_id = data.DACDIEM_ID
    //     this.dataSelected.so_nha = data.SONHA
    //   }
    // },
    ghiLai: async function () {
      if (!this.themmoi) { this.capNhat() } else { this.themMoi() }
    },
    capNhat: async function () {
      try {
        if (!this.validateData()) return
        console.log('capnhat', this.dataSelected)
        var ngay_ld = this.dataSelected.NGAY_LD && this.convertDate(this.dataSelected.NGAY_LD)
        var ngay_sd = this.dataSelected.NGAY_SD && this.convertDate(this.dataSelected.NGAY_SD)
        // var data = {
        //   ketcuoi_id: this.dataSelected.ketcuoi_id,
        //   ten_kc: this.dataSelected.ten_kc,
        //   kyhieu: this.dataSelected.kyhieu,
        //   tongso_dd: this.dataSelected.tongso_dd,
        //   dungluong: this.dataSelected.dungluong,
        //   ngay_ld: ngay_ld,
        //   ngay_sd: ngay_sd,
        //   ttsd_id: this.dataSelected.ttsd_id,
        //   kieulap_id: this.dataSelected.kieulap_id,
        //   noisx_id: this.dataSelected.noisx_id,
        //   vitri_id: this.dataSelected.vitri_id,
        //   loaivo_id: this.dataSelected.loaivo_id,
        //   donvi_id: this.dataSelected.donvi_id,
        //   taisan_id: this.dataSelected.taisan_id,
        //   duan_id: this.dataSelected.duan_id,
        //   kinhdo: this.dataSelected.kinhdo,
        //   vido: this.dataSelected.vido,
        //   diachi: this.dataSelected.diachi
        // }
        //   this.$root.showLoading(true)
        //   if (this.dataSelected.ngay_ld != null) { this.dataSelected.ngay_ld = this.convertDate(this.dataSelected.ngay_ld) }
        //   if (this.dataSelected.ngay_sd != null) { this.dataSelected.ngay_sd = this.convertDate(this.dataSelected.ngay_sd) }
        //   console.log('capNhat dataSelected', JSON.stringify(this.dataSelected))
        let data = {
          KETCUOI_ID: this.dataSelected.KETCUOI_ID,
          KYHIEU: this.dataSelected.KYHIEU,
          TEN_KC: this.dataSelected.TEN_KC,
          MA_KC: this.dataSelected.MA_KC
        }
        var rs = await this.$root.context.post(
          '/web-cabman/mang-truyen-dan/capnhat-ketcuoitd', this.dataSelected
        )
        if (rs.data != null) {
          this.$root.$toast.success('Cập nhật kết cuối thành công')
          this.resolvePromise({ok: true, data: rs.data})
          this.$bvModal.hide(this.modalID)
        } else { this.$root.$toast.error('Cập nhật kết cuối thất bại') }
      } catch (error) {
        this.$alert(error.response.data.message_detail, error.response.data.message, {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'Đóng',
          type: 'error'
        })
      } finally {
        this.$root.showLoading(false)
      }
    },
    themMoi: async function () {
      try {
        if (!this.validateData()) return
        this.$root.showLoading(true)
        var ngay_ld = this.dataSelected.NGAY_LD && this.convertDate(this.dataSelected.NGAY_LD)
        var ngay_sd = this.dataSelected.NGAY_SD && this.convertDate(this.dataSelected.NGAY_SD)
        // var data = {
        //   ten_kc: this.dataSelected.ten_kc,
        //   kyhieu: this.dataSelected.kyhieu,
        //   tongso_dd: this.dataSelected.tongso_dd,
        //   dungluong: this.dataSelected.dungluong,
        //   ngay_ld: ngay_ld,
        //   ngay_sd: ngay_sd,
        //   ttsd_id: this.dataSelected.ttsd_id,
        //   kieulap_id: this.dataSelected.kieulap_id,
        //   noisx_id: this.dataSelected.noisx_id,
        //   vitri_id: this.dataSelected.vitri_id,
        //   loaivo_id: this.dataSelected.loaivo_id,
        //   capgoc_id: this.dataSelected.capgoc_id,
        //   loaikc_id: this.dataSelected.loaikc_id,
        //   phanloaikc_id: this.dataSelected.phanloaikc_id,
        //   donvi_id: this.dataSelected.donvi_id,
        //   taisan_id: this.dataSelected.taisan_id,
        //   duan_id: this.dataSelected.duan_id,
        //   toanha_id: this.dataSelected.toanha_id,
        //   kinhdo: this.dataSelected.kinhdo,
        //   vido: this.dataSelected.vido,
        //   ketcuoi_cha_id: this.dataSelected.ketcuoi_cha_id,
        //   cap_sp: this.dataSelected.cap_sp,
        //   ghichu: this.dataSelected.ghichu,
        //   diachi: this.dataSelected.diachi,
        //   tinh_id: this.dataSelected.tinh_id,
        //   quan_id: this.dataSelected.quan_id,
        //   phuong_id: this.dataSelected.phuong_id,
        //   pho_id: this.dataSelected.pho_id,
        //   ap_id: this.dataSelected.ap_id,
        //   khu_id: this.dataSelected.khu_id,
        //   dacdiem_id: this.dataSelected.dacdiem_id,
        //   sonha: this.dataSelected.sonha,
        //   tramtbi_id: this.dataSelected.tramtbi_id,
        //   cap_id: this.dataSelected.cap_id,
        //   nguondich: this.dataSelected.nguondich,
        //   chuquan_id: this.dataSelected.chuquan_id,
        //   cot_id: this.dataSelected.cot_id,
        //   becap_id: this.dataSelected.becap_id,
        //   ma_csht: this.dataSelected.ma_csht,
        //   ims_id: this.dataSelected.ims_id
        // }
        // console.log('themMoi data', JSON.stringify(data))
        // var rs = await this.$root.context.post(
        //   '/web-cabman/ketcuoi/themmoi', data
        // )
        // console.log('themmoi', rs)
        // this.$root.showLoading(false)
        // if (rs.data != null) {
        //   this.$root.$toast.success('Thêm kết cuối thành công')
        //   this.resolvePromise({ok: true, data: rs.data})
        //   this.$bvModal.hide(this.modalID)
        // } else { this.$root.$toast.error('Thêm kết cuối thất bại') }
      } catch (error) {
        this.$alert(error.response.data.message_detail, error.response.data.message, {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'Đóng',
          type: 'error'
        })
      } finally {
        this.$root.showLoading(false)
      }
    },
    validateData () {
      this.$v.$touch()

      if (this.$v.$invalid && !this.$v.dataSelected.KYHIEU.required) {
        this.$root.$toast.warning('Ký hiệu không được để trống')
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.TEN_KC.required) {
        this.$root.$toast.warning('Tên kết cuối không được để trống')
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.DIACHI.required) {
        this.$root.$toast.warning('Địa chỉ không được để trống')
        return false
      }

      // if (this.$v.$invalid && !this.$v.dataSelected.tongso_dd.required) {
      //   this.$root.$toast.warning('Dung lượng không được để trống')
      //   return false
      // }

      // if (this.$v.$invalid && !this.$v.dataSelected.tongso_dd.minValue) {
      //   this.$root.$toast.warning('Dung lượng không được nhỏ hơn 1')
      //   return false
      // }

      // if (this.$v.$invalid && !this.$v.dataSelected.tongso_dd.maxValue) {
      //   this.$root.$toast.warning('Dung lượng không được lớn hơn 99999')
      //   return false
      // }

      if (this.$v.$invalid && !this.$v.dataSelected.KINHDO.required) {
        this.$root.$toast.warning('Kinh độ không được để trống')
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.VIDO.required) {
        this.$root.$toast.warning('Vĩ độ không được để trống')
        return false
      }
      return true
    },
    getDiaChi: function (data) {
      this.dataSelected.DIACHI = data.diachimoi
      this.dataSelected.TINH_ID = data.tinh_id
      this.dataSelected.QUAN_ID = data.quan_id
      this.dataSelected.PHUONG_ID = data.phuong_id
      this.dataSelected.PHO_ID = data.pho_id
      this.dataSelected.AP_ID = data.ap_id
      this.dataSelected.KHU_ID = data.khu_id
      this.dataSelected.DAC_DIEM_ID = data.dacdiem_id
      this.dataSelected.SO_NHA = data.so_nha
    },
    convertDate: function (date) {
      return new Date(date).toLocaleDateString('en-US', { day: '2-digit' }) + '/' + new Date(date).toLocaleDateString('en-US', { month: '2-digit' }) + '/' + new Date(date).toLocaleDateString('en-US', { year: 'numeric' })
    },
    xoaMaCSHT: function () {
      this.dataSelected.MA_CSHT = null
    },
    xoaMaTS: function () {
      this.dataSelected.TAISAN_ID = null
    },
    xoaMaDA: function () {
      this.dataSelected.DUAN_ID = null
    },
    getMaCsht: function (args) {
      this.dataSelected.MA_CSHT = args
    },
    xoaTOQL: function () {
      this.dataSelected.DONVI_ID = null
    }
  },
  data: function () {
    return {
      dataSelected: {
        BECAP_ID: null,
        CAPGOC_ID: null,
        CAP_SP: null,
        CHIEUCAO: null,
        CHIEUDAI: null,
        CHIEURONG: null,
        CHUQUAN_ID: 1,
        COT_ID: null,
        CSHT_ID: null,
        DIACHI: null,
        DIACHI_ID: null,
        DONVI_ID: null,
        DUAN_ID: null,
        DUNGLUONG: 96,
        GHICHU: null,
        IMS_ID: null,
        JUMPER_AO: null,
        KETCUOI_CHA_ID: null,
        KETCUOI_ID: null,
        KIEULAP_ID: null,
        KINHDO: null,
        KYHIEU: null,
        LOAIKC_ID: null,
        LOAIVO_ID: null,
        MA_CSHT: null,
        MA_DA: null,
        MA_KC: null,
        MA_TS: null,
        MA_VACH: null,
        MOINOI_ID: null,
        MOTA: null,
        NGAY_LD: new Date(),
        NGAY_SD: new Date(),
        NHANVIEN_ID: null,
        NOISX_ID: null,
        PHANLOAIKC_ID: null,
        PHANVUNG_ID: null,
        SODOI_SD: null,
        SO_DH: null,
        TAISAN_ID: null,
        TEN_KC: null,
        TMP: null,
        TOADO_VPV: null,
        TOANHA_ID: null,
        TONGSO_DD: null,
        TRAMTBI_ID: null,
        TTSD_ID: null,
        TT_DUYET: null,
        TUYENCAP_ID: null,
        VIDO: null,
        VITRI_ID: null,
        // Dia chi
        TINH_ID: null,
        QUAN_ID: null,
        PHUONG_ID: null,
        PHO_ID: null,
        AP_ID: null,
        KHU_ID: null,
        DAC_DIEM_ID: null,
        SO_NHA: null
        // Dia chi
      },
      dsPHANLOAI_KC: [],
      dsLOAI_KC: [],
      dsCAP_SP: [],
      dsTRANGTHAI_SD: [],
      dsNOI_SX: [],
      dsKIEU_LAP: [],
      dsVITRI: [],
      dsLOAI_VO: [],
      dsDuAn: [],
      dsTaiSan: [],
      dsChuQuan: [],
      dsTOQL: [],
      dsNHANVIEN: [],
      category: {
        phanloai: 0,
        dinhdanh: 0,
        dactinh: 0,
        lienket: 1,
        kiemke: 1,
        vitri: 1,
        chuquan: 1,
        bando: 0,
        macsht: 1,
        ngaythang: 0
      },
      waterMark: 'Chọn ngày',
      dateVal: new Date(),
      dateFormat: 'dd/MM/yyyy',
      resolvePromise: null,
      rejectPromise: null,
      themmoi: false
    }
  },
  mounted: function () {
  }
}
</script>
<style>
 /* div#popupQLKetCuoi___BV_modal_outer_{
   z-index: 10 !important;
  margin-top: 100px;
}
a.disabled {
  pointer-events: none;
  cursor: default;
  color: #6c757d !important;
}
.table-result td, .table-result th {
    padding: 0px 0px !important;
}
.error-boarder {
  border-color: red;
} */
</style>
