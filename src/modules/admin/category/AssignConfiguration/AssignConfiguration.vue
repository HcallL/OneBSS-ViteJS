<template src="./template.html"> </template>

<script>
import breadcrumb from '@/modules/contract/setup/DeclareLandline/components/breadcrumb.vue'
import api from './API.js'
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      dsDonViDaGan: [],
      dsDonViChuaGan: [],
      phanvung_id: null,
      cbbQuyTrinh: {
        options: [],
        value: null
      },
      cbbLuong: {
        options: [],
        value: null
      },
      cbbLoaiKH: {
        options: [],
        value: null
      },
      cbbNguonDon: {
        options: [],
        value: null
      },
      cbbDichVuVT: {
        options: [],
        value: null
      },
      cbbLoaiHinh: {
        options: [],
        value: null
      },
      cbbHinhThuc: {
        options: [],
        value: null
      }
    }
  },
  methods: {
    assign_selected() {
      const selected = this.dsDonViDaGan
        .filter((item) => item.check)
        .map((item) => {
          return {
            ...item,
            check: false
          }
        })
      this.dsDonViChuaGan = this.dsDonViChuaGan.concat(selected)
      this.dsDonViDaGan = this.dsDonViDaGan.filter((item) => !item.check)
    },
    assign_all() {
      const selected = this.dsDonViDaGan.map((item) => {
        return {
          ...item,
          check: false
        }
      })
      this.dsDonViChuaGan = this.dsDonViChuaGan.concat(selected)
      this.dsDonViDaGan = []
    },
    unassign_selected() {
      const selected = this.dsDonViChuaGan
        .filter((item) => item.check)
        .map((item) => {
          return {
            ...item,
            check: false
          }
        })
      this.dsDonViDaGan = this.dsDonViDaGan.concat(selected)
      this.dsDonViChuaGan = this.dsDonViChuaGan.filter((item) => !item.check)
    },
    unassign_all() {
      this.dsDonViChuaGan.forEach((item, index) => {
        this.dsDonViDaGan.push(item)
      })
      this.dsDonViChuaGan = []
    },
    async get_combo() {
      try {
        this.loading(true)
        let res
        res = await api.getDSQuyTrinh(this.axios, {
          p_phanvung_id: this.phanvung_id,
          p_loaihd: 38
        })
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbQuyTrinh.options = res.data.data.map((item) => {
            return {
              id: item.quytrinh_id,
              text: item.quytrinh
            }
          })
          this.cbbQuyTrinh.value = this.cbbQuyTrinh.options[0].id
        }

        res = await api.getDSLoaiKH(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbLoaiKH.options = res.data.data.map((item) => {
            return {
              id: item.loaikh_id,
              text: item.loai_kh
            }
          })
          this.cbbLoaiKH.value = this.cbbLoaiKH.options[0].id
        }

        res = await api.getDSNguonDon(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbNguonDon.options = res.data.data.map((item) => {
            return {
              id: item.ungdung_id,
              text: item.ten_ungdung
            }
          })
          this.cbbNguonDon.value = this.cbbNguonDon.options[0].id
        }

        res = await api.getDSDichVuVT(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbDichVuVT.options = res.data.data.map((item) => {
            return {
              id: item.dichvuvt_id,
              text: item.ten_dvvt
            }
          })
          this.cbbDichVuVT.value = this.cbbDichVuVT.options[0].id
        }

        res = await api.getDSLoaiHinh(this.axios,this.cbbDichVuVT.value)
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbLoaiHinh.options = res.data.data.map((item) => {
            return {
              id: item.loaitb_id,
              text: item.loaihinh_tb
            }
          })
          this.cbbLoaiHinh.value = this.cbbLoaiHinh.options[0].id
        }


        res = await api.getDSHinhThuc(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbHinhThuc.options = this.cbbHinhThuc.options.concat(res.data.data.map((item) => {
            return {
              id: item.hinhthucdh_id,
              text: item.hinhthuc_dh
            }
          })
          )
          this.cbbHinhThuc.value = this.cbbHinhThuc.options[0].id
        }
      } catch (error) {
      } finally {
        this.loading(false)
      }
    },
    async get_dsdonvi() {
      try {
        this.dsDonViDaGan = []
        this.dsDonViChuaGan = []
        this.loading(true)
        //get ds dv da gan
        let res = await api.getDSDonVi(this.axios, {
          p_phanvung_id: this.phanvung_id,
          p_kieu: 1,
          p_luong_id: this.cbbLuong.value,
          p_khdn: this.cbbLoaiKH.value,
          p_ungdung_id: this.cbbNguonDon.value,
          p_loaitb_id: this.cbbLoaiHinh.value,
          p_hinhthuc_dh: this.cbbHinhThuc.value
        })

        if (res.data.error_code == 'BSS-00000000') {
          this.dsDonViDaGan = res.data.data.map((item) => {
            return {
              ...item,
              check: false
            }
          })
        }

        //get ds dv chua gan
        let res1 = await api.getDSDonVi(this.axios, {
          p_phanvung_id: this.phanvung_id,
          p_kieu: 0,
          p_luong_id: this.cbbLuong.value,
          p_khdn: this.cbbLoaiKH.value,
          p_ungdung_id: this.cbbNguonDon.value,
          p_loaitb_id: this.cbbLoaiHinh.value,
          p_hinhthuc_dh: this.cbbHinhThuc.value
        })
        if (res1.data.error_code == 'BSS-00000000') {
          this.dsDonViChuaGan = res1.data.data.map((item) => {
            return {
              ...item,
              check: false
            }
          })
        }
      } catch (error) {
      } finally {
        this.loading(false)
      }
    },
    async update_cauhinh(){
      const updateDV = this.dsDonViDaGan.map((item) => {
        return {
          donvi_id: item.donvi_id,
        }
      })
      let res = await api.updateCauHinh(this.axios,{
        p_phanvung_id: this.phanvung_id,
          p_luong_id: this.cbbLuong.value,
          p_khdn: this.cbbLoaiKH.value,
          p_ungdung_id: this.cbbNguonDon.value,
          p_loaitb_id: this.cbbLoaiHinh.value,
          p_hinhthuc_dh: this.cbbHinhThuc.value,
          p_json_donvi: JSON.stringify(updateDV)
      })
      if(res.data.error_code == 'BSS-00000000'){
        this.$toast.success('Cập nhật thành công')
        this.get_dsdonvi()
    }
    },
  },

  async mounted() {
    this.phanvung_id = (await this.$root.token.getPhanVungID()) * 1
    this.get_combo()
    // this.get_dsdonvi()
  },
  watch: {
    'cbbQuyTrinh.value': async function(val) {
      let res = await api.getDSLuong(this.axios, {
        p_quytrinh_id: val,
        p_phanvung_id: this.phanvung_id
      })
      if (res.data.error_code == 'BSS-00000000') {
        this.cbbLuong.options = res.data.data.map((item) => {
          return {
            id: item.luong_id,
            text: item.luong
          }
        })
        this.cbbLuong.value = this.cbbLuong.options[0].id
      }
    },
    'cbbDichVuVT.value': async function(val) {
      let res = await api.getDSLoaiHinh(this.axios,val)
      if (res.data.error_code == 'BSS-00000000') {
        this.cbbLoaiHinh.options = res.data.data.map((item) => {
          return {
            id: item.loaitb_id,
            text: item.loaihinh_tb
          }
        })
        this.cbbLoaiHinh.value = this.cbbLoaiHinh.options[0].id
      }
    },
    'cbbLuong.value': async function(val) {
      this.get_dsdonvi()
    },
    'cbbLoaiKH.value': async function(val) {
      this.get_dsdonvi()
    },
    'cbbNguonDon.value': async function(val) {
      this.get_dsdonvi()
    },
    'cbbLoaiHinh.value': async function(val) {
      this.get_dsdonvi()
    },
    'cbbHinhThuc.value': async function(val) {
      this.get_dsdonvi()
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
