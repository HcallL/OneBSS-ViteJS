<template>
  <ejs-dialog :enableResize="true" :allowDragging="true" :visible="false" :isModal="true" ref="CatHuyUserPharmacy" :position="position" :header="'Cắt giảm số lượng cửa hàng'" showCloseIcon="true" width="75%" target="#app .main-wrapper">
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="#" @click.prevent="btnGhiLai_Click"> <span class="icon one-save"> </span>Ghi lại</a>
        </li>
        <li>
          <a href="#"> <span class="icon nc-icon-glyph ui-1_circle-remove"></span>Xóa </a>
        </li>
        <li>
          <a href="#" @click.prevent="btnKichHoat_Click"> <span class="icon one-luong"></span>Kích hoạt</a>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-sm-12 col-12">
        <div class="box-move-select-table">
          <div class="box-col box-form">
            <div class="legend-title">Danh sách tài khoản cắt hủy</div>
            <div class="table-content" style="height: 400px;">
              <DataGrid v-bind:columns="DsTaiKhoanCatHuy.cols" v-bind:dataSource="DsTaiKhoanCatHuy.list" :enable-paging-server="false" :allowPaging="true" :showFilter="true" :enabledSelectFirstRow="false" :showColumnCheckbox="true" ref="DsTaiKhoanCatHuy"> </DataGrid>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Số lượng tài khoản đã đăng ký cắt hủy trên phiếu</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="soluong_user_dangky_cathuy" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Số lượng tài khoản đã khởi tạo đăng ký cắt hủy</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="soluong_user_dangky" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Số lượng tài khoản chưa khởi tạo đăng ký cắt hủy</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="soluong_user_chua_khoitao" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="actions">
            <button class="btn">
              <span class="fa fa-angle-left" @click.prevent="btnDangky_Click"></span>
            </button>
            <button class="btn">
              <span class="fa fa-angle-right" @click..prevent="btnHuyDangKy_ClicK"></span>
            </button>
          </div>
          <div class="box-col box-form">
            <div class="legend-title">Danh sách tài khoản</div>
            <div class="table-content" style="height: 400px;">
              <DataGrid v-bind:columns="DsTaiKhoan.cols" v-bind:dataSource="DsTaiKhoan.list" :enable-paging-server="false" :allowPaging="true" :showFilter="true" :enabledSelectFirstRow="false" :showColumnCheckbox="true" ref="DsTaiKhoan"> </DataGrid>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Tổng số lượng tài khoản</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="this.DsTaiKhoan.value.QUOTA" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Số lượng tài khoản đã khởi tạo</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="this.DsTaiKhoan.value.PO_TOTAL" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-12">
                <div class="info-row">
                  <div class="key" style="width: 220px;">Số lượng tài khoản có thể hủy</div>
                  <div class="value">
                    <input type="text" class="form-control" readonly v-model="this.DsTaiKhoan.value.REMOVABLE" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ejs-dialog>
</template>

<script>
import api from '@/modules/contract/complete_profile/CompleteProfileITVAS/API/CompleteProfileAPI.js'
export default {
  data() {
    return {
      prop_dulieu: [],
      soluong_user_dangky_cathuy: '',
      soluong_user_chua_khoitao: 0,
      soluong_user_dangky: 0,
      position: 'top',
      status: '',
      ds_display: [{ is_ghilai: true }, { is_xoa: true }, { is_kichhhoat: false }],
      DsTaiKhoanCatHuy: {
        list: [],
        cols: [
          { fieldName: 'LOGIN_USERID', headerText: 'Tài khoản đăng nhập', allowFiltering: true, width: 'auto' },
          { fieldName: 'USER_NAME', headerText: 'Họ tên', allowFiltering: true, width: 'auto' },
          { fieldName: 'MOBILE', headerText: 'Số điện thoại', allowFiltering: true, width: 'auto' },
          { fieldName: 'DOB', headerText: 'Ngày sinh', allowFiltering: true, width: 'auto' },
          { fieldName: 'ADDRESS', headerText: 'Địa chỉ', allowFiltering: true, width: 'auto' },
          { fieldName: 'STATUS', headerText: 'Trạng thái', allowFiltering: true, width: 'auto' }
        ],
        value: {},
        isEnabled: true
      },
      DsTaiKhoan: {
        list: [],
        cols: [
          { fieldName: 'LOGIN_USERID', headerText: 'Tài khoản đăng nhập', allowFiltering: true, width: 'auto' },
          { fieldName: 'USER_NAME', headerText: 'Họ tên', allowFiltering: true, width: 'auto' },
          { fieldName: 'MOBILE', headerText: 'Số điện thoại', allowFiltering: true, width: 'auto' },
          { fieldName: 'DOB', headerText: 'Ngày sinh', allowFiltering: true, width: 'auto' },
          { fieldName: 'ADDRESS', headerText: 'Địa chỉ', allowFiltering: true, width: 'auto' },
          { fieldName: 'STATUS', headerText: 'Trạng thái', allowFiltering: true, width: 'auto' }
        ],
        value: {},
        isEnabled: true
      }
    }
  },
  methods: {
    async ConvertResApi(response_input) {
      let response = await response_input
      if (response.data.errorCode && response.data.errorCode != '' && response.data.errorCode != '0' && response.data.faultString && response.data.faultString != '') {
        throw response.data.faultString
      }

      if (response.data.error === 200 || response.data.error === '200' || response.data.errorCode === 0) {
        if (response.data.error_code === 'BSS-00000000') {
          return response.data.data
        }
      } else {
        if (response.data.error === '204' || response.data.error === 204) {
          return []
        } else return response.data.message
      }
    },
    async openPupup(data) {
      console.log(data)
      this.prop_dulieu.hdtb_id = data.vhdtb_id
      this.prop_dulieu.ma_tb = data.vma_tb
      this.soluong_user_dangky_cathuy = data.vsl_user_dangky_cathuy
      this.soluong_user_chua_khoitao = this.soluong_user_dangky_cathuy - this.soluong_user_dangky <= 0 ? 0 : this.soluong_user_dangky_cathuy - this.soluong_user_dangky
      await this.$refs['CatHuyUserPharmacy'].show()
      await this.formLoad()
    },
    async LayStatus() {
      try {
        this.loading(true)
        let response = await api.fn_get_status_hdtb(this.axios, { vhdtb_id: this.prop_dulieu.hdtb_id })
        if (response.data.error == 200 || response.data.errorCode === 0) {
          this.status = response.data.data
        }
        console.log(this.status)
        this.loading(false)
      } catch (error) {
        this.loading(false)
        this.$toast.error('Có lỗi: ' + res)
        return
      } finally {
        this.loading(false)
      }
    },
    async formLoad() {
      try {
        this.loading(true)
        await this.LayDsTaiKhoan()
        await this.LayDsTaiKhoanDaDangKy()
        await this.LayStatus()
        this.loading(false)
      } catch (error) {
        this.loading(false)
      } finally {
        this.loading(false)
      }
    },
    async LayDsTaiKhoanDaDangKy() {
      console.log('LayDstaiKhoanDaDangKy')
      const rs = await this.ConvertResApi(api.lay_thong_tin_da_dang_ky(this.axios, { vhdtb_id: this.prop_dulieu.hdtb_id }))
      var newData = rs.map(function(obj) {
        var newObj = {}
        Object.keys(obj).forEach(function(key) {
          newObj[key.toUpperCase()] = obj[key]
        })
        return newObj
      })
      console.log(rs)
      this.DsTaiKhoanCatHuy.list = newData
      this.soluong_user_dangky = rs.length
      this.soluong_user_chua_khoitao = this.soluong_user_dangky_cathuy - this.soluong_user_dangky <= 0 ? 0 : this.soluong_user_dangky_cathuy - this.soluong_user_dangky
    },
    async LayDsTaiKhoan() {
      try {
        console.log('Nhẩy vào lấy danh sách tài khoản')
        this.loading(true)
        //const data = '{"transId":"123456789","sme":{"subscriptionCode":"hcm_pharmacy_00000439","provinceCode":"HCM"}}'
        const kq = await this.ConvertResApi(api.fn_layDsUser_pharmacy(this.axios, { vma_tb: this.prop_dulieu.ma_tb }))
        if (kq && kq != '') {
          const obj_convert = JSON.parse(kq)
          obj_convert.map.rs.forEach(function(obj) {
            // Xóa các trường không mong muốn, bị chặn do thằng API Onebss nên phải xóa đi
            delete obj.CREATED_DATE
            delete obj.MODIFIED_DATE
            delete obj.CREATED_BY
          })
          this.DsTaiKhoan.list = obj_convert.map.rs
          this.DsTaiKhoan.value.PO_TOTAL = obj_convert.map.PO_TOTAL
          this.DsTaiKhoan.value.QUOTA = obj_convert.map.QUOTA
          this.DsTaiKhoan.value.REMOVABLE = obj_convert.map.REMOVABLE
          console.log(this.DsTaiKhoan.value)
        }
      } catch (error) {
        this.$toast.error(error.message)
        this.loadingd(false)
      } finally {
        this.loading(false)
      }
    },
    async btnDangky_Click() {
      try {
        if (this.status == 6) {
          this.$toast.error('Thuê bao đã được kích hoạt thành công')
          return
        }
        let ds_chon = []
        let ds_chon_add = []
        ds_chon = this.$refs.DsTaiKhoan.getSelectedRecords()
        console.log(ds_chon)
        if (ds_chon.length <= 0) {
          this.$toast.error('Hãy chọn tài khoản trước khi đăng ký hủy')
          return
        } else {
          //ds_chon_add = this.ds_chon_add.filter((x) => x.id != this.grcDSHocSinhDangKy.list.id)
          ds_chon_add = ds_chon.filter((x) => {
            let kq = !this.DsTaiKhoanCatHuy.list.find((y) => y.USERID === x.USERID)
            return kq
          })
          this.DsTaiKhoanCatHuy.list = [...this.DsTaiKhoanCatHuy.list, ...ds_chon_add]
          console.log(this.DsTaiKhoanCatHuy.list)
          this.loading(true)
          console.log({ vhdtb_id: this.prop_dulieu.hdtb_id, vds_hdtb_ct: this.DsTaiKhoanCatHuy.list, vkey: 'US' })
          const rs = await this.ConvertResApi(api.them_hd_thuebao_ct_common(this.axios, { vhdtb_id: this.prop_dulieu.hdtb_id, vds_hdtb_ct: this.DsTaiKhoanCatHuy.list, vkey: 'US' }))
          this.loading(false)
          this.soluong_user_dangky = this.DsTaiKhoanCatHuy.list.length
          this.soluong_user_chua_khoitao = this.soluong_user_dangky_cathuy - this.soluong_user_dangky <= 0 ? 0 : this.soluong_user_dangky_cathuy - this.soluong_user_dangky
        }
      } catch (ex) {
        this.loading(false)
        this.$toast.error(ex.message)
      }
    },
    async btnHuyDangKy_ClicK() {
      try {
        if (this.status == 6) {
          this.$toast.error('Thuê bao đã được kích hoạt thành công')
          return
        }
        let ds_chon = []
        let ds_chon_huy = []
        ds_chon = this.$refs.DsTaiKhoanCatHuy.getSelectedRecords()

        if (ds_chon.length <= 0) {
          this.$toast.error('Hãy chọn tài khoản trước khi hủy đăng ký')
          return
        } else {
          ds_chon_huy = this.DsTaiKhoanCatHuy.list.filter((x) => {
            let kq = !ds_chon.find((y) => y.USERID === x.USERID)
            return kq
          })
          this.DsTaiKhoanCatHuy.list = [...ds_chon_huy]
          const rs = await this.ConvertResApi(api.them_hd_thuebao_ct_common(this.axios, { vhdtb_id: this.prop_dulieu.hdtb_id, vds_hdtb_ct: this.DsTaiKhoanCatHuy.list, vkey: 'US' }))
          this.loading(false)
          this.soluong_user_dangky = this.DsTaiKhoanCatHuy.list.length
          this.soluong_user_chua_khoitao = this.soluong_user_dangky_cathuy - this.soluong_user_dangky <= 0 ? 0 : this.soluong_user_dangky_cathuy - this.soluong_user_dangky
        }
      } catch (err) {
        this.loading(false)
        this.$toast.error(err.message)
      }
    },
    async btnGhiLai_Click() {
      try {
        this.loading(true)
        const rs = await this.ConvertResApi(api.them_hd_thuebao_ct_common(this.axios, { vhdtb_id: this.prop_dulieu.hdtb_id, vds_hdtb_ct: this.DsTaiKhoanCatHuy.list, vkey: 'US' }))
        this.loading(false)
        console.log({ vhdtb_id: this.prop_dulieu.hdtb_id, vds_hdtb_ct: this.DsTaiKhoanCatHuy.list, vkey: 'US' })
        if (rs == 'ok') {
          this.$toast.success('Cập nhật thành công')
          return
        } else {
          this.$toast.error('Cập nhật không thành công: ' + rs)
          return
        }
      } catch (err) {
        this.loading(false)
        this.$toast.error(err.message)
      } finally {
        this.loading(false)
      }
    },
    async btnKichHoat_Click() {
      // Chuyển dùng chính thức
      try {
        if (this.status == 6) {
          this.$toast.error('Thuê bao đã được kích hoạt thành công')
          return
        }
        if (this.DsTaiKhoanCatHuy.list.length > this.soluong_user_dangky_cathuy) {
          this.$toast.error('Số lượng tài khoản hủy không được lớn hơn số lượng tài khoản đã đăng ký hủy trên hợp đồng')
          return
        }
        this.loading(true)
        const res = await this.ConvertResApi(api.fn_cathuytaikhoan_pharmacy(this.axios, { hdtb_id: this.prop_dulieu.hdtb_id }))
        const data_res = JSON.parse(res)
        this.loading(false)

        if (data_res.ErrorCode == '00') {
          this.$toast.success('Cắt tài khoản hàng thành công')
          await this.LayStatus()
          return
        } else {
          this.$toast.error('Hủy tài khoản không thành công: ' + res)
          return
        }
      } catch (error) {
        this.loading(false)
        this.$toast.error('Hủy tài khoản không thành công: ' + error.message)
        return
      } finally {
        this.loading(false)
      }
    }
  }
}
</script>

<style></style>
