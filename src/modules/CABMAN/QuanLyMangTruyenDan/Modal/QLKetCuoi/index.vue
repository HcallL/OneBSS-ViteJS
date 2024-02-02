<template src="./index.template.html"></template>
<script>

import ModalChonDiaChi from '@/modules/CABMAN/QuanLyMangTruyenDan/Modal/ChonDiaChi/Modal'
import ModalChonToaDo from '@/modules/CABMAN/BanDoMangCap/modal/ChonToaDo'
import BssErrorMarker from '@/components/BssErrorMarker'
import BssRequiredMarker from '@/components/BssRequiredMarker'
import { required, minValue, maxValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ModalDUAN from '@/modules/CABMAN/BanDoMangCap/modal/DuAn/Modal'

export default {
  name: 'QLKetCuoi',
  props: { modalID: null },
  components: {
    ModalChonToaDo, BssErrorMarker, BssRequiredMarker, ModalChonDiaChi, ModalDUAN
  },
  created: async function () {
  },
  validations: {
    TTVT_ID: {
      required
    },
    dataSelected:
    {
      DONVI_ID: {
        required
      },
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
    TTVT_ID (val) {
      this.dsTOQL_TTVT = []
      this.$root.context.get(
        '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'DS_TOVT_MTD', option: val}
      ).then((rs) => {
        this.dsTOQL_TTVT = rs.data
        if (this.dsTOQL_TTVT.length > 0) {
          this.dataSelected.DONVI_ID = this.dsTOQL_TTVT[0].DONVI_ID
        }
      })
    },
    'dataSelected.DUAN_ID' (val) {
      if (val != null) {
        this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TAISAN', option: this.dataSelected.DUAN_ID ? this.dataSelected.DUAN_ID : ''}
        ).then((rs) => {
          this.dsTaiSan = rs.data
        })
      } else {
        this.dsTaiSan = []
        this.dataSelected.TAISAN_ID = null
      }
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
    show (themmoi, ketcuoi, CHON_TOQL = false) {
      return new Promise((resolve, reject) => {
        if (ketcuoi !== null) {
          this.dataSelected = ketcuoi
        }
        this.themmoi = themmoi
        this.CHON_TOQL = CHON_TOQL
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
      this.$v.$reset()
    },
    resetModal: async function () {
      try {
        this.$root.showLoading(true)
        this.$v.$reset()
        if (this.themmoi) {
          this.init()
        } else {

        }
        await this.initForm()
      } catch (er) {} finally {
        this.$root.showLoading(false)
      }
    },
    getDUAN (args) {
      this.dataSelected.DUAN_ID = args.duan_id
      this.TEN_DUAN = args.ten_duan
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
        if (!this.dataSelected.PHANLOAIKC_ID) this.dataSelected.PHANLOAIKC_ID = 1
        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'LOAI_KC', option: ''}
        )
        this.dsLOAI_KC = rs.data
        if (!this.dataSelected.LOAIKC_ID) this.dataSelected.LOAIKC_ID = 0
        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TRANGTHAI_SD', option: ''}
        )
        this.dsTRANGTHAI_SD = rs.data
        if (!this.dataSelected.TTSD_ID) this.dataSelected.TTSD_ID = 1
        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'KIEU_LAP', option: ''}
        )
        this.dsKIEU_LAP = rs.data

        if (this.dsKIEU_LAP.length > 0) {
          if (!this.dataSelected.KIEULAP_ID) this.dataSelected.KIEULAP_ID = this.dsKIEU_LAP[0].KIEULAP_ID
        }

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'NOI_SX', option: ''}
        )
        this.dsNOI_SX = rs.data
        if (!this.dataSelected.NOISX_ID) this.dataSelected.NOISX_ID = 1

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'VITRI', option: ''}
        )
        this.dsVITRI = rs.data
        if (!this.dataSelected.VITRI_ID) this.dataSelected.VITRI_ID = 1

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'LOAI_VO', option: ''}
        )
        this.dsLOAI_VO = rs.data
        if (!this.dataSelected.LOAIVO_ID) this.dataSelected.LOAIVO_ID = 1

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'CHUQUAN', option: ''}
        )
        this.dsChuQuan = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'TOQL', option: ''}
        )
        this.dsTOQL = rs.data

        rs = await this.$root.context.get(
          '/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'DS_TTVT_MTD', option: ''}
        )
        this.dsTTVT = rs.data
        if (this.dsTTVT.length > 0) {
          this.TTVT_ID = this.dsTTVT[0].DONVI_ID
        }
        if (this.dataSelected.DUAN_ID !== null) {
          rs = await this.$root.context.get('/web-cabman/ban-do-mang-cap/danh-muc', {loai: 'DUAN_CT', option: this.dataSelected.DUAN_ID})
          if (rs && rs.data.length > 0) {
            this.TEN_DUAN = rs.data[0].MA_CT
          } else {
            this.TEN_DUAN = ''
          }
        } else {
          this.TEN_DUAN = ''
        }
      } catch (error) {
        console.log('🚀 ~ file: index.vue:210 ~ error:', error)
      } finally {
      }
    },
    ghiLai: async function () {
      if (!this.themmoi) { this.capNhat() } else { this.themMoi() }
    },
    capNhat: async function () {
      try {
        if (!this.validateData()) return
        this.$root.showLoading(true)
        var ngay_ld = this.dataSelected.NGAY_LD && this.convertDate(this.dataSelected.NGAY_LD)
        var ngay_sd = this.dataSelected.NGAY_SD && this.convertDate(this.dataSelected.NGAY_SD)
        let data = {
          KETCUOI_ID: this.dataSelected.KETCUOI_ID,
          MA_KC: this.dataSelected.MA_KC,
          TEN_KC: this.dataSelected.TEN_KC,
          KYHIEU: this.dataSelected.KYHIEU,
          CHIEUDAI: this.dataSelected.CHIEUDAI,
          CHIEURONG: this.dataSelected.CHIEURONG,
          CHIEUCAO: this.dataSelected.CHIEUCAO,
          DIACHI: this.dataSelected.DIACHI,
          TONGSO_DD: this.dataSelected.TONGSO_DD,
          NGAY_LD: ngay_ld,
          NGAY_SD: ngay_sd,
          TTSD_ID: this.dataSelected.TTSD_ID,
          KIEULAP_ID: this.dataSelected.KIEULAP_ID,
          NOISX_ID: this.dataSelected.NOISX_ID,
          VITRI_ID: this.dataSelected.VITRI_ID,
          LOAIVO_ID: this.dataSelected.LOAIVO_ID,
          LOAIKC_ID: this.dataSelected.LOAIKC_ID,
          PHANLOAIKC_ID: this.dataSelected.PHANLOAIKC_ID,
          TAISAN_ID: this.dataSelected.TAISAN_ID,
          DUAN_ID: this.dataSelected.DUAN_ID,
          MA_VACH: this.dataSelected.MA_VACH,
          KINHDO: this.dataSelected.KINHDO,
          VIDO: this.dataSelected.VIDO,
          MA_TS: this.dataSelected.MA_TS,
          MA_DA: this.dataSelected.MA_DA,
          DUNGLUONG: this.dataSelected.DUNGLUONG
        }
        console.log('🚀 ~ file: index.vue ~ line 318 ~ data', data)
        var rs = await this.$root.context.post(
          '/web-cabman/mang-truyen-dan/capnhat-ketcuoitdv2', data
        )
        if (rs.data != null) {
          this.$root.$toast.success('Ghi lại thành công')
          this.resolvePromise({ok: true, data: rs.data})
          this.$bvModal.hide(this.modalID)
        } else { this.$root.$toast.error('Ghi lại thất bại') }
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
        let data = {
          MA_KC: this.dataSelected.MA_KC,
          TEN_KC: this.dataSelected.TEN_KC,
          KYHIEU: this.dataSelected.KYHIEU,
          CHIEUDAI: this.dataSelected.CHIEUDAI,
          CHIEURONG: this.dataSelected.CHIEURONG,
          CHIEUCAO: this.dataSelected.CHIEUCAO,
          DIACHI: this.dataSelected.DIACHI,
          SODOI_SD: this.dataSelected.SODOI_SD,
          TONGSO_DD: this.dataSelected.TONGSO_DD,
          NGAY_LD: ngay_ld,
          NGAY_SD: ngay_sd,
          TTSD_ID: this.dataSelected.TTSD_ID,
          KIEULAP_ID: this.dataSelected.KIEULAP_ID,
          NOISX_ID: this.dataSelected.NOISX_ID,
          VITRI_ID: this.dataSelected.VITRI_ID,
          LOAIVO_ID: this.dataSelected.LOAIVO_ID,
          CAPGOC_ID: this.dataSelected.CAPGOC_ID,
          LOAIKC_ID: this.dataSelected.LOAIKC_ID,
          PHANLOAIKC_ID: this.dataSelected.PHANLOAIKC_ID,
          DONVI_ID: this.dataSelected.DONVI_ID,
          TAISAN_ID: this.dataSelected.TAISAN_ID,
          DUAN_ID: this.dataSelected.DUAN_ID,
          MA_VACH: this.dataSelected.MA_VACH,
          KINHDO: this.dataSelected.KINHDO,
          VIDO: this.dataSelected.VIDO,
          MA_TS: this.dataSelected.MA_TS,
          MA_DA: this.dataSelected.MA_DA,
          KETCUOI_CHA_ID: this.dataSelected.KETCUOI_CHA_ID,
          DUNGLUONG: this.dataSelected.DUNGLUONG
        }
        console.log('🚀 ~ file: index.vue ~ line 318 ~ data', data)
        var rs = await this.$root.context.post(
          '/web-cabman/mang-truyen-dan/tao-ketcuoitd', data
        )
        if (rs.data != null) {
          this.$root.$toast.success('Tạo mới thành công')
          this.resolvePromise({ok: true, data: rs.data})
          this.$bvModal.hide(this.modalID)
        } else { this.$root.$toast.error('Tạo mới thất bại') }
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
      this.$v.$reset()
      if (this.$v.$invalid && this.CHON_TOQL && !this.$v.TTVT_ID.required) {
        this.$root.$toast.warning('TTVT không được để trống')
        this.$v.TTVT_ID.$touch()
        return false
      }
      if (this.$v.$invalid && this.CHON_TOQL && !this.$v.dataSelected.DONVI_ID.required) {
        this.$root.$toast.warning('Tổ không được để trống')
        this.$v.dataSelected.DONVI_ID.$touch()
        return false
      }
      if (this.$v.$invalid && !this.$v.dataSelected.KYHIEU.$model) {
        this.$root.$toast.warning('Ký hiệu không được để trống')
        this.$v.dataSelected.KYHIEU.$touch()
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.TEN_KC.$model) {
        this.$root.$toast.warning('Tên kết cuối không được để trống')
        this.$v.dataSelected.TEN_KC.$touch()
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.DIACHI.$model) {
        this.$root.$toast.warning('Địa chỉ không được để trống')
        this.$v.dataSelected.DIACHI.$touch()
        return false
      }
      if (this.$v.$invalid && !this.$v.dataSelected.KINHDO.$model) {
        this.$root.$toast.warning('Kinh độ không được để trống')
        this.$v.dataSelected.KINHDO.$touch()
        return false
      }

      if (this.$v.$invalid && !this.$v.dataSelected.VIDO.$model) {
        this.$root.$toast.warning('Vĩ độ không được để trống')
        this.$v.dataSelected.VIDO.$touch()
        return false
      }
      return true
    },
    setDiaChi: function (data) {
      this.$v.$reset()
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
      this.TEN_DUAN = null
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
      dsTTVT: [],
      dsTOQL_TTVT: [],
      category: {
        toql: 0,
        phanloai: 0,
        dinhdanh: 0,
        dactinh: 0,
        lienket: 0,
        kiemke: 0,
        vitri: 0,
        chuquan: 0,
        bando: 0,
        macsht: 0,
        ngaythang: 0
      },
      waterMark: 'Chọn ngày',
      dateVal: new Date(),
      dateFormat: 'dd/MM/yyyy',
      resolvePromise: null,
      rejectPromise: null,
      themmoi: false,
      CHON_TOQL: false,
      TTVT_ID: null,
      TEN_DUAN: null
    }
  },
  mounted: function () {
  }
}
</script>
<style>
</style>
