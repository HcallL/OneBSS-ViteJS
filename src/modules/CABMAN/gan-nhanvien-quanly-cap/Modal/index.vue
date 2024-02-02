import { maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core';
<template src="./index.template.html"></template>
<script>
export default {
  components: {},
  name: 'Modal',
  props: {
    doiTuong: Object,
    id: String
  },

  computed: {
  },
  data () {
    return {
      key: 1,
      isShown: false,
      show: false,
      dsNhanVien: [],
      idNhanVien: [],
      selectedDS: [],
      itemClick: {},
      txtTimkiem: '',
      TEN_LOAI_DT: '',
      IsModified: false,
      idSelected: -1,
      nhanvien_id: -1
    }
  },
  watch: {
  },
  methods: {
    onHiddenModal () {
      this.isShown = false
      this.show = false
      this.key++
    },
    async onShownModal () {
      this.isShown = true
      this.show = true
      try {
        this.loading(true)
        this.TEN_LOAI_DT = (this.doiTuong.LOAI_DT === 'CAP' ? 'Cáp' : 'Kết cuối')
        await this.NAP_DS_NHANVIEN()
      } catch (e) {} finally {
        this.loading(false)
      }
    },
    onEnter: function () {
      this.GAN_NHANVIEN_QL()
    },
    selectedItems: async function (data) {
      console.log(data)
      this.itemClick = data
    },
    ganNV: async function () {
      await this.GAN_NHANVIEN_QL()
    },
    goGan: function (name, args) {
      if (name == 'xoa') {
        var isNew = this.itemClick.ISNEW
        if (isNew == 0) {
          const selected = this.dsNhanVien.map(obj =>
            obj.NHANVIEN_ID == this.itemClick.NHANVIEN_ID ? { ...obj, ISNEW: 2 } : obj
          )
          this.selectedDS = selected
          let grid = this.$refs.nhanvien
          let index = grid.$refs.grid.getSelectedRowIndexes()
          for (let i = 1; i < 4; i++) {
            let cell1 = grid.$refs.grid.getCellFromIndex(index[0], i)
            cell1.style.cssText += 'text-decoration: line-through; color:red !important;'
          }
        } else if (isNew == 1) {
        }
      }
    },
    async okChonIdNhanVien () {
      let nhanvien_id = this.idNhanVien.find(item => item.NHANVIEN_ID === this.idSelected).NHANVIEN_ID
      console.log('nhanvien_id', nhanvien_id)
      if (nhanvien_id === -1) return
      var data = {
        cap_id: this.doiTuong.DOITUONG_ID,
        nhanvien_id: nhanvien_id,
        kieu: this.doiTuong.LOAI_DT == 'CAP' ? 1 : 0
      }
      console.log(data)
      var rs = await this.$root.context.post('/web-cabman/gan-nhanvien-ql/gan-nhanvien-ketcuoi', data)
      console.log('gan-nhanvien-ketcuoi', rs)
      if (rs.error_code !== 'BSS-00000000') {
        let error = rs.message_detail
        let err = 'unique constraint'

        if (error.includes(err)) { this.$root.toastError('Nhân viên đã được gán quản lý ' + this.TEN_LOAI_DT + ' rồi.') } else { this.$root.toastError('' + error) }
        return
      }
      this.IsModified = true
      this.NAP_DS_NHANVIEN()
      this.$root.toastSuccess('Gán nhân viên quản lý thành công.')
    },
    onclickItem (data) {
      console.log(data)
      this.itemClick = data
    },
    ghiLai: async function () {
      var ds_nhanvien_xoa = []
      let grvNhanVien = this.selectedDS
      for (var i = 0; i < grvNhanVien.length; i++) {
        if (grvNhanVien[i].ISNEW == 2) { ds_nhanvien_xoa.push(grvNhanVien[i].NHANVIEN_ID) }
      }
      if (ds_nhanvien_xoa.length == 0) {
        return
      }
      if (grvNhanVien.length > 0) {
        this.$bvModal.msgBoxConfirm('Huỷ gán ' + ds_nhanvien_xoa.length + ' nhân viên quản lý ' + this.TEN_LOAI_DT + '?',
          {
            title: 'Xác nhận hành động',
            centered: true,
            size: 'sm'
          }).then(async (value) => {
          if (value) {
            try {
              this.loading(true)
              var data = {
                cap_id: this.doiTuong.DOITUONG_ID,
                nhanvien_id: ds_nhanvien_xoa.join(),
                kieu: this.doiTuong.LOAI_DT == 'CAP' ? 1 : 0
              }
              var rs = await this.$root.context.post('/web-cabman/gan-nhanvien-ql/huy-gan-nhanvien', data)
              if (rs.error_code !== 'BSS-00000000') {
                this.$root.toastError(rs.error_code)
                return
              }
              await this.NAP_DS_NHANVIEN()
              this.$root.toastSuccess('Gỡ gán nhân viên quản lý thành công.')
            } catch (error) {
              this.$root.toastError(' ' + error)
            } finally {
              this.loading(false)
            }
          } else {

          }
        })
      }
    },
    NAP_DS_NHANVIEN: async function () {
      try {
        this.loading(true)
        this.dsNhanVien = []
        if (this.doiTuong.LOAI_DT === 'CAP') {
          var rs = await this.$root.context.get('/web-cabman/gan-nhanvien-ql/nap-ds-nhanvien-cap', {cap_id: this.doiTuong.DOITUONG_ID})
          if (rs.data.length > 0) {
            this.dsNhanVien = rs.data
          }
        } else if (this.doiTuong.LOAI_DT === 'KETCUOI') {
          var rs = await this.$root.context.get('/web-cabman/gan-nhanvien-ql/nap-ds-nhanvien-ketcuoi', {ketcuoi_id: this.doiTuong.DOITUONG_ID})
          if (rs.data.length > 0) {
            this.dsNhanVien = rs.data
          }
        }
      } catch (error) {
        this.$root.toastError(' ' + error)
      } finally {
        this.loading(false)
      }
    },
    GAN_NHANVIEN_QL: async function () {
      try {
        this.loading(false)
        if (this.txtTimkiem == '') {
          this.$root.toastError('Hãy nhập vào mã nhân viên cần gán quản lý ' + this.TEN_LOAI_DT)
          return
        }
        var rs = await this.$root.context.get('/web-cabman/gan-nhanvien-ql/lay-nhanvien-id', {ma_nv: this.txtTimkiem.toLowerCase().trim()})
        if (rs.error_code !== 'BSS-00000000') {
          this.$root.toastError('Hãy nhập vào mã nhân viên cần gán quản lý ' + rs.error_code)
          return
        }

        if (rs.data.length == 0) {
          this.$root.toastError('Không tìm thấy nhân viên có mã ' + this.txtTimkiem)
          return
        }
        let nhanvien_id = -1
        if (rs.data.length == 1) {
          nhanvien_id = rs.data[0].NHANVIEN_ID
        }
        if (rs.data.length > 1) {
          this.idNhanVien = rs.data
          this.$bvModal.show('modal-chon-nhanvien')
        }
        if (nhanvien_id === -1) return
        var data = {}
        if (this.doiTuong.LOAI_DT == 'CAP') {
          data = {
            cap_id: this.doiTuong.DOITUONG_ID,
            capgoc_id: null,
            nhanvien_id: nhanvien_id,
            kieu: 1
          }
        } else {
          data = {
            cap_id: this.doiTuong.DOITUONG_ID,
            capgoc_id: this.doiTuong.CAPGOC_ID,
            nhanvien_id: nhanvien_id,
            kieu: 0
          }
        }
        var rs2 = await this.$root.context.post('/web-cabman/gan-nhanvien-ql/gan-nhanvien', data)
        console.log('🚀 ~ file: index.vue:215 ~ rs:', rs2)
        if (rs2.error_code !== 'BSS-00000000') {
          let error = rs2.message_detail
          let err = 'unique constraint'
          if (error.includes(err)) { this.$root.toastError('Nhân viên đã được gán quản lý ' + this.TEN_LOAI_DT + ' rồi.') } else { this.$root.toastError('' + error) }
          return
        }
        this.IsModified = true
        await this.NAP_DS_NHANVIEN()
        this.$root.toastSuccess('Gán nhân viên quản lý thành công.')
      } catch (error) {
        this.$root.toastError(' ' + error)
      } finally {
        this.loading(false)
      }
    }
  },
  async created () {
  }
}
</script>
