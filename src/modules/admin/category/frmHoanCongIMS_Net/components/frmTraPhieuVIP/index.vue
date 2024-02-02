<template>
  <div>
    <div class="list-actions-top">
      <ul class="list">
        <li v-if="btnTraphieu.visible" :class="{ disabledInput: !btnTraphieu.enabled }" @click="btnTraphieu_Click">
          <a> <span class="icon one-file-back"></span>Trả phiếu</a>
        </li>
      </ul>
    </div>
    <div class="popup-body">
      <div class="box-form">
        <div class="legend-title" style="display: flex; align-items: center;">
          <div class="pull-left">
            Thông tin khách hàng
          </div>
          <div class="clearfix"></div>
        </div>
        <b-collapse visible id="collapse-ttkh">
          <div class="row">
            <div class="col-sm-12 col-12">
              <div class="info-row">
                <div class="key w80">
                  Nội dung trả
                </div>
                <div class="value">
                  <textarea :disabled="!txtNDTra.enabled" v-model="txtNDTra.value" name="" class="form-control" style="height: 100px; resize: none;"></textarea>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-12">
              <div class="info-row">
                <div class="key w80">
                  Lý do trả
                </div>
                <div class="value">
                  <div class="select-custom">
                    <SelectExt :disabled="!cboLyDoTra.enabled" class="" v-model="cboLyDoTra.value" :dataSource="cboLyDoTra.list" dataTextField="lydotra" dataValueField="lydotra_id" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-12">
              <div class="info-row">
                <div class="key w80">
                  Ghi chú
                </div>
                <div class="value">
                  <textarea :disabled="!txtGhichu.enabled" v-model="txtGhichu.value" name="" class="form-control" style="height: 100px; resize: none;"></textarea>
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import api from './api'
export default {
  emits: ['onBtnTraphieuClicked'],
  props: {
    tinh_ph: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    phieu_id: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    phieu_tinh_id: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    vma_tb: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    vso_dt_giao: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    hdtb_id: {
      type: [String, Number],
      defaul: null,
      require: false
    },
    vloaitb_id: {
      type: [String, Number],
      defaul: null,
      require: false
    }
  },
  data() {
    return {
      localLoading: 0,
      btnTraphieu: { enabled: true, visible: true },
      txtNDTra: { enabled: true, visible: true, value: null },
      cboLyDoTra: { enabled: true, visible: true, list: [], value: null },
      txtGhichu: { enabled: true, visible: true, value: null }
    }
  },
  computed: {},
  watch: {
    localLoading(val) {
      if (val > 0) this.loading(true)
      else this.loading(false)
    }
  },
  methods: {
    async callApiWrapper(action, body) {
      let result = null
      try {
        this.localLoading++
        result = await action(this.axios, body)
        console.log('result')
        console.log(result.data.data)
        return result.data.data ? result.data.data : null
      } catch (e) {
        console.log('LOI ROI')
        console.log(e)
        if (e.data != null) {
          this.$toast.error(`${e.data.message}`)
        } else {
          this.$toast.error(`Có lỗi gọi API`)
        }
        return 'error'
      } finally {
        setTimeout(() => {
          this.localLoading--
        }, 500)
      }
      return null
    },
    async btnTraphieu_Click() {
      if (this.txtNDTra.value == '') {
        this.$toast.warning('Bạn chưa nhập nội dung trả!')
        return
      }
      if (this.cboLyDoTra.value == '0') {
        this.$toast.warning('Hãy chọn lý do trả!')
        return
      }
      if (!confirm('Bạn thật sự muốn trả lại phiếu đã nhận không ?')) return
      await this.TraPhieu()
    },
    async TraPhieu() {
      let dt = await this.callApiWrapper(api.bc_kt_va_lay_tt_phieu, {
        vphanvung_id: this.tinh_ph,
        vphieu_id: this.phieu_tinh_id
      })
      if (dt.length == 0) {
        this.$toast.warning('Không tìm thấy phiếu tại tỉnh')
        return
      } else {
        // this.$toast.success('Thành công')
      }
      if (dt[0].fail) {
        this.$toast.warning(dt[0].fail)
        return
      }
      let dt_nv =  await this.callApiWrapper(api.select_nv_sdt, { 
        nhanvien_id: this.$root.token.getNhanVienID()
      })
      if(dt_nv.length == null || dt_nv.length == 0) return
      let kq_bc_tra_phieu_vip =await this.callApiWrapper(api.bc_tra_phieu_vip, {
        vphanvung_id: this.tinh_ph,
        vphieu_id: this.phieu_tinh_id,
        vphieu_cha_id: 0,
        vnd_tra: `${this.txtNDTra.value} | Người Trả: ${dt_nv[0]['tt']}`,
        vghichu: `${this.txtGhichu.value}`,
        vlydotra_id: `${this.cboLyDoTra.value}`,
        vtthd_id: `${dt[0]['tthd_id']}`,
        vhdtb_id: this.hdtb_id
      })
      if(kq_bc_tra_phieu_vip != 'ok') return
      let kq_bc_tra_phieu_vip_khdn_v2 = await this.callApiWrapper(api.bc_tra_phieu_vip_khdn_v2, {
        vphieu_id: this.phieu_id,
        vtinh_id: this.tinh_ph,
        vnd_tra: `${this.txtNDTra.value}`,
        vghichu: `${this.txtGhichu.value}`,
        vlydotra_id: `${this.cboLyDoTra.value}`
      })
      if(kq_bc_tra_phieu_vip_khdn_v2 != 'ok') return
      this.chapnhan = true
      let kq_tra_phieu_net_sms_vip_ph = await this.callApiWrapper(api.tra_phieu_net_sms_vip_ph, {
        vhdtb_id: 0,
        vphieu_id: this.phieu_id,
        vnoidung: `${this.txtNDTra.value}`
      })
      if(kq_tra_phieu_net_sms_vip_ph != 'ok') return
      this.$toast.success('Trả phiếu thành công')
      this.$emit('onBtnTraphieuClicked')
    },

    async frmTraPhieuVIP_Load() {
      let dt = await this.callApiWrapper(api.sp_lay_ds_lydotra_vip, {
        phanvung_id: this.$root.token.getPhanVungID()
      })
      if (dt.length > 0) {
        this.cboLyDoTra.list = dt
      } else this.cboLyDoTra.list = []
    }
  },
  async mounted() {
    await this.frmTraPhieuVIP_Load()
  }
}
</script>
<style scoped></style>
