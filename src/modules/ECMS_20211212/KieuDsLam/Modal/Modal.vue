<template src="./Modal.html"></template>

<script>

export default {
  name: 'Modal',
  props: ['modalId'],

  computed: {
    //...mapState("ecms/dsLam", statePropertyName),
    // dsLoaiTBiPagingFilter(){
    //   return this.dsLoaiThietBi.filter(row => {
    //     const name = row.LOAI_TBI;
    //     const note = row.GHICHU;
    //     var searchName = this.filter;
    //     var searchNote = this.filterNote;
    //     if(note != null)
    //       return name.includes(searchName) && note.includes(searchNote) ;
    //     else
    //       return name.includes(searchName)
    //   });
    // }
  },
  destroyed () {
  },
  methods: {
    getDsKieuDslam: async function () {
      console.log('test')
      this.$root.showLoading(true)
      try {
        var rs = await this.$root.context.get(
          '/web-ecms/kieuDslam/danhsach'
        )
        this.dsDsLam = rs.data
      } catch (error) {
      } finally {
        this.$root.showLoading(false)
      }
    },
    grid1_selectedRowChanged: function (row) {
      this.isCreateNew = false
      this.kieuDslam = row.KIEU_DSLAM
      this.kieuDslamId = row.KIEUDSLAM_ID
    },
    themMoi: async function () {
      this.$root.showLoading(true)
      try {
        if (this.isCreateNew) {
          let dataIns = {
            kieuDslam: this.kieuDslam
          }
          var them = await this.$root.context.post('/web-ecms/kieuDslam/themKieuDsLam', dataIns)
            .then((res) => {
              console.log(res)
              if (res.error_code === 'BSS-00000000') {
                this.$toast.success('Thêm thành công!')
                this.resetForm()
                this.getDsKieuDslam()
              } else {
                this.$toast.error(res.error)
                this.getDsKieuDslam()
              }
              this.$root.showLoading(false)
            })
          console.log('dataIns', them)
        } else {
          let dataUpd = {
            kieuDslam: this.kieuDslam,
            kieuDslamId: this.kieuDslamId
          }
          var capNhat = await this.$root.context.post('/web-ecms/kieuDslam/capNhatKieuDsLam', dataUpd)
            .then((res) => {
              console.log(res)
              if (res.error_code === 'BSS-00000000') {
                this.$toast.success('Cập nhật thành công!')
                this.resetForm()
                this.getDsKieuDslam()
              } else {
                this.$toast.error(res.error)
                this.getDsKieuDslam()
              }
              this.$root.showLoading(false)
            })
          console.log('dataUpd', capNhat)
        }

      } catch (error) {
      } finally {
        this.$root.showLoading(false)
      }
    },
    xoa: async function () {
      this.$root.showLoading(true)
      try {
        var xoa = await this.$root.context.post(`/web-ecms/kieuDslam/xoaKieuDsLam?id=${this.kieuDslamId}`)
          .then((res) => {
            console.log(res)
            if (res.error_code === 'BSS-00000000') {
              this.$toast.success('Xóa thành công!')
              this.resetForm()
              this.getDsKieuDslam()
            } else {
              this.$toast.error(res.error)
              this.getDsKieuDslam()
            }
            this.$root.showLoading(false)
          })
        console.log('dataIns', xoa)
      } catch (error) {
      } finally {
        this.$root.showLoading(false)
      }
    },
    resetForm () {
      this.isCreateNew = true
      this.kieuDslam = null
      this.setDisableBtn(false, false, false, false)
    },
    setDisableBtn: function (isNhapmoi, isGhilai, isHuy, isXoa) {
      this.isDisableBtnNhapMoi = isNhapmoi
      this.isDisableBtnGhiLai = isGhilai
      this.isDisableBtnHuy = isHuy
      this.isDisableBtnXoa = isXoa
    }
  },

  created: function () {
    this.resetForm()
    console.log('data', this.getDsKieuDslam())
  },
  data: function () {
    return {
      dsDsLam: [],
      kieuDslam: null,
      kieuDslamId: null,
      selected: null,
      isCreateNew: true,
      isDisableBtnNhapMoi: false,
      isDisableBtnGhiLai: true,
      isDisableBtnHuy: true,
      isDisableBtnXoa: true,
    }
  },
}
</script>
