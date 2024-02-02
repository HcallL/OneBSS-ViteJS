<template>
  <b-modal
    ref="popupDiaChi"
    size="lg"
    hide-header
    hide-header-close
    hide-footer
    body-class="p-0"
    no-close-on-backdrop
    @show="handleShowModal"
  >
    <div class="modal-content popup-box">
      <div class="popup-header">
        <div class="title"><span class="icon one-notepad"></span> Địa chỉ</div>
        <div class="close -ap icon-close" @click="hideModal"></div>
      </div>
      <div class="popup-body">
        <div class="box-form">
          <div class="row">
							<div class="col-sm-12 col-12">
                <div class="info-row">
                    <div class="key w100"></div>
                    <div class="value" style="color:blue">{{diachi_bandau}}</div>
								</div>
							</div>
						</div>
          <div class="row">
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100">Tỉnh/TP <k-required-marker/></div>
                <div class="value">
                  <multiselect
                      :options="danhSachTinh"
                      placeholder="Chọn tỉnh"
                      @input="changeTinh"
                      :showLabels="false"
                      :allowEmpty="false"
                      :value="tinh_selected"
                      label="tentinh"
                      track-by="tinh_id">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.tentinh }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Quận/Huyện <k-required-marker/></div>
                <div class="value">
                  <multiselect
                      :options="danhSachQuan"
                      placeholder="Chọn quận"
                      @input="changeQuan"
                      :showLabels="false"
                      :allowEmpty="false"
                      :value="quan_selected"
                      label="NAME"
                      track-by="ID">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.NAME }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Phường/Xã <k-required-marker/></div>
                <div class="value">
                  <multiselect
                      :options="danhSachPhuong"
                      placeholder="Chọn phường"
                      @input="changePhuong"
                      :showLabels="false"
                      :allowEmpty="false"
                      :value="phuong_selected"
                      label="TEN_PHUONG"
                      track-by="PHUONG_ID">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.TEN_PHUONG }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Số nhà</div>
                <div class="value">
                  <input type="text" v-model="result.sonha" class="form-control bold" />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100">Đường/Phố</div>
                <div class="value padt7 w20">
                  <div class="check-action">
                    <input type="checkbox" class="check" v-model="checkBox.pho" />
                    <span class="name"></span>
                  </div>
                </div>
                <div class="value">
                  <multiselect
                      :options="danhSachPho"
                      placeholder="Chọn phố"
                      @input="changePho"
                      :showLabels="false"
                      :allowEmpty="false"
                      :disabled="!checkBox.pho"
                      :value="pho_selected"
                      label="TEN_PHO"
                      track-by="PHO_ID">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.TEN_PHO }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Ngõ/Ấp</div>
                <div class="value padt7 w20">
                  <div class="check-action">
                    <input type="checkbox" class="check" v-model="checkBox.ap" />
                    <span class="name"></span>
                  </div>
                </div>
                <div class="value">
                  <multiselect
                      :options="danhSachAp"
                      placeholder="Chọn ấp"
                      @input="changeAp"
                      :showLabels="false"
                      :allowEmpty="false"
                      :disabled="!checkBox.ap"
                      :value="ap_selected"
                      label="TEN_PHO"
                      track-by="PHO_ID">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.TEN_PHO }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Khu</div>
                <div class="value padt7 w20">
                  <div class="check-action">
                    <input type="checkbox" class="check" v-model="checkBox.khu"/>
                    <span class="name"></span>
                  </div>
                </div>
                <div class="value">
                  <multiselect
                      :options="danhSachKhu"
                      placeholder="Chọn khu"
                      @input="changeKhu"
                      :showLabels="false"
                      :allowEmpty="false"
                      :disabled="!checkBox.khu"
                      :value="khu_selected"
                      label="TEN_PHO"
                      track-by="PHO_ID">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.TEN_PHO }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
              <div class="info-row">
                <div class="key w100">Đặc điểm</div>
                <div class="value padt7 w20">
                  <div class="check-action">
                    <input type="checkbox" class="check" :disabled="disabledCheckDacDiem" v-model="checkBox.dacdiem" />
                    <span class="name"></span>
                  </div>
                </div>
                <div class="value">
                  <multiselect
                      :options="danhSachDacDiem"
                      placeholder="Chọn đặc điểm"
                      @input="changeDacDiem"
                      :showLabels="false"
                      :allowEmpty="false"
                      :disabled="!checkBox.dacdiem"
                      :value="dacdiem_selected"
                      label="dacdiem"
                      track-by="dacdiem_id">
                      <template #noOptions>
                          Không tìm thấy thông tin
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        <strong>{{ option.dacdiem }}</strong>
                      </template>
                  </multiselect>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-form">
          <div class="legend-title">Thông tin thêm</div>
          <div class="row">
            <div class="col-sm-4 col-12">
              <div class="info-row">
                <div class="key w100">Block(lô/toà)</div>
                <div class="value">
                  <input type="text" v-model="result.block" class="form-control bold" />
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-12">
              <div class="info-row">
                <div class="key w70">Tầng/lầu</div>
                <div class="value">
                  <input type="text" v-model="result.tang" class="form-control bold" />
                </div>
              </div>
            </div>
            <div class="col-sm-5 col-12">
              <div class="info-row">
                <div class="key w140">Số căn hộ/sạp/phòng</div>
                <div class="value">
                  <input type="text" v-model="result.sophong" class="form-control bold" />
                </div>
              </div>
            </div>
          </div>
          <div class="info-row">
            <div class="key w100">Mô tả thêm</div>
            <div class="value">
              <input type="text" v-model="result.motathem" class="form-control bold" />
            </div>
          </div>
          <div class="info-row">
            <div class="key w100">Địa chỉ</div>
            <div class="value">
              <textarea
                v-model="input_diachi"
                readonly
                class="form-control highlight bold"
                style="height: 100px; resize: none"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="group-buttons -bottom center">
          <button
            class="btn btn-outline-secondary nocorner"
            style="width: 120px"
            v-b-modal.ModalChonToaDo
          >
            <span class="icon one-map-location1"></span> Vị trí
          </button>
          <button class="btn btn-second nocorner" @click="accept" style="width: 120px">
            <span class="icon nc-icon-glyph ui-1_check-circle-08"></span> Chấp
            nhận
          </button>
        </div>
      </div>
      <!-- Modal -->
      <ModalChonToaDo  idModalChonToaDo="ModalChonToaDo" @XacNhanToaDo="XacNhanToaDo" :position="getPosition" :diachi="result.diachi"></ModalChonToaDo>
    </div>
  </b-modal>
</template>
<script>
// param prop object data
// {
//  diachi_id:0,
//     tinh_id:0,
//     quan_id:0,
//     phuong_id:0,
//     pho_id:0,
//     ap_id:0,
//     khu_id:0,
//     dacdiem_id:0,
//     sonha:'',
//     block:'',
//     tang:'',
//     sophong:'',
//      motathem:'',
//     diachi:'',
//     kinhdo:0,
//     vido:0
// }
import ModalChonToaDo from '@/modules/CABMAN/XetDuyetPhanTuMangHoDanThuThap/ChonToaDo'
import KRequiredMarker from '@/components/kylq_components/KRequiredMarker.vue'
import API from './API'
export default {
  name: 'DiaChiModal',
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    ModalChonToaDo,
    KRequiredMarker
  },
  computed: {
    diachi_created () {
      return this.block_created + this.tang_created + this.sophong_created + this.sonha_created + this.pho_created + this.ap_created + this.khu_created + this.phuong_created + this.quan_created + this.tinh_created
    },
    block_created () {
      return (this.result.block != undefined && this.result.block.trim() != '') ? this.result.block.trim() + ', ' : ''
    },
    tang_created () {
      return (this.result.tang != undefined && this.result.tang.trim() != '') ? this.result.tang.trim() + ', ' : ''
    },
    sophong_created () {
      return (this.result.sophong != undefined && this.result.sophong.trim() != '') ? this.result.sophong.trim() + this.motathem_created + ', ' : ''
    },
    motathem_created () {
      return (this.result.motathem != undefined && this.result.motathem.trim() != '') ? '( ' + this.result.motathem.trim() + ')' : ''
    },
    sonha_created () {
      return (this.result.sonha != undefined && this.result.sonha.trim() != '') ? this.result.sonha.trim() + ', ' : ''
    },
    pho_created () {
      if (this.result.pho_id == undefined || this.result.pho_id == 0 || !this.checkBox.pho) {
        return ''
      }
      let pho = this.danhSachPho.find(x => x.PHO_ID == this.result.pho_id)
      if (pho != undefined) {
        return pho.TEN_PHO + ', '
      }
      return ''
    },
    ap_created () {
      if (this.result.ap_id == undefined || this.result.ap_id == 0 || !this.checkBox.ap) {
        return ''
      }
      let ap = this.danhSachAp.find(x => x.PHO_ID == this.result.ap_id)
      if (ap != undefined) {
        return ap.TEN_PHO + ', '
      }
      return ''
    },
    khu_created () {
      if (this.result.khu_id == undefined || this.result.khu_id == 0 || !this.checkBox.khu) {
        return ''
      }
      let khu = this.danhSachKhu.find(x => x.PHO_ID == this.result.khu_id)
      if (khu != undefined) {
        return khu.TEN_PHO + ', '
      }
      return ''
    },
    phuong_created () {
      if (this.result.phuong_id == undefined || this.result.phuong_id == 0) {
        return ''
      }
      let phuong = this.danhSachPhuong.find(x => x.PHUONG_ID == this.result.phuong_id)
      if (phuong != undefined) {
        return phuong.TEN_PHUONG + ', '
      }
      return ''
    },
    quan_created () {
      if (this.result.quan_id == undefined || this.result.quan_id == 0) {
        return ''
      }
      let quan = this.danhSachQuan.find(x => x.ID == this.result.quan_id)
      if (quan != undefined) {
        return quan.NAME + ', '
      }
      return ''
    },
    tinh_created () {
      if (this.result.tinh_id == undefined || this.result.tinh_id == 0) {
        return ''
      }
      let tinh = this.danhSachTinh.find(x => x.tinh_id == this.result.tinh_id)
      if (tinh != undefined) {
        return tinh.tentinh
      }
      return ''
    },
    tinh_selected () {
      const tinh = this.danhSachTinh.find(x => x.tinh_id == this.result.tinh_id)
      return tinh != undefined ? tinh : null
    },
    quan_selected () {
      const quan = this.danhSachQuan.find(x => x.ID == this.result.quan_id)
      return quan != undefined ? quan : null
    },
    phuong_selected () {
      const phuong = this.danhSachPhuong.find(x => x.PHUONG_ID == this.result.phuong_id)
      return phuong != undefined ? phuong : null
    },
    pho_selected () {
      const pho = this.danhSachPho.find(x => x.PHO_ID == this.result.pho_id)
      return pho != undefined ? pho : null
    },
    ap_selected () {
      const ap = this.danhSachAp.find(x => x.PHO_ID == this.result.ap_id)
      return ap != undefined ? ap : null
    },
    khu_selected () {
      const khu = this.danhSachKhu.find(x => x.PHO_ID == this.result.khu_id)
      return khu != undefined ? khu : null
    },
    dacdiem_selected () {
      const dacdiem = this.danhSachDacDiem.find(x => x.dacdiem_id == this.result.dacdiem_id)
      return dacdiem != undefined ? dacdiem : null
    },
    getPosition () {
      return {
        lat: parseFloat(this.result.vido),
        lng: parseFloat(this.result.kinhdo)
      }
    }
  },
  data () {
    return {
      result: this.data,
      danhSachTinh: [],
      danhSachQuan: [],
      danhSachPhuong: [],
      danhSachPho: [],
      danhSachAp: [],
      danhSachKhu: [],
      danhSachDacDiem: [],
      checkBox: {
        pho: false,
        ap: false,
        khu: false,
        dacdiem: false
      },
      disabledCheckDacDiem: true,
      diachi_bandau: '',
      input_diachi: ''
    }
  },
  methods: {
    showModal () {
      this.$refs['popupDiaChi'].show()
    },
    hideModal () {
      this.$refs['popupDiaChi'].hide()
    },
    accept () {
      if (!this.checkBox.pho && !this.checkBox.ap && !this.checkBox.khu) {
        this.$alert('Hãy chọn Phố, Ấp, Khu!', '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'OK',
          type: 'warning'
        })
        return
      }
      // check dữ liệu trả về
      let data = Object.assign({}, this.result)
      this.$emit('accept', Object.assign(data, {
        pho_id: this.checkBox.pho ? this.result.pho_id : 0,
        ap_id: this.checkBox.ap ? this.result.ap_id : 0,
        khu_id: this.checkBox.khu ? this.result.khu_id : 0,
        dacdiem_id: this.checkBox.dacdiem ? this.result.dacdiem_id : 0,
        diachi: this.input_diachi
      }))
      this.hideModal()
    },
    handleShowModal () {
      this.result = this.data
      this.checkBox = {
        pho: false,
        ap: false,
        khu: false,
        dacdiem: false
      }
      this.disabledCheckDacDiem = true
      this.clear()
      this.diachi_bandau = '' + this.result.diachi
      setTimeout(() => {
        this.layDanhSachTinh()
      }, 200)
    },
    clear () {
      this.danhSachTinh = []
      this.danhSachQuan = []
      this.danhSachPhuong = []
      this.danhSachPho = []
      this.danhSachAp = []
      this.danhSachKhu = []
      this.danhSachDacDiem = []
    },
    XacNhanToaDo (position) {
      this.result.vido = position.lat
      this.result.kinhdo = position.lng
    },
    async layDanhSachTinh () {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_tinh(this.axios)
        console.log('🚀 ~ file: DiaChiModal.vue ~ line 509 ~ layDanhSachTinh ~ response', response)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachTinh = response.data.data
          if (this.result.tinh_id && this.result.tinh_id != 0) {
            this.layDanhSachQuanTheoTinh(this.result.tinh_id)
          }
        } else {
          this.danhSachTinh = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách tỉnh')
      }
    },
    async layDanhSachQuanTheoTinh (tinh_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_quan_theo_tinh(this.axios, tinh_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachQuan = response.data.data
          if (this.result.quan_id && this.result.quan_id != 0) {
            this.layDanhSachPhuongTheoQuan(this.result.quan_id)
          }
        } else {
          this.danhSachQuan = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách quận/huyện')
      }
    },
    async layDanhSachPhuongTheoQuan (quan_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_phuong(this.axios, quan_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachPhuong = response.data.data
          if (this.result.phuong_id && this.result.phuong_id != 0) {
            await this.lay_danhsach_pho(this.result.phuong_id)
            await this.lay_danhsach_ap(this.result.phuong_id)
            await this.lay_danhsach_khu(this.result.phuong_id)
          }
        } else {
          this.danhSachPhuong = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách phường')
      }
    },
    async lay_danhsach_pho (phuong_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_pho(this.axios, phuong_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachPho = response.data.data
          if (this.result.pho_id && this.result.pho_id != 0) {
            this.checkBox.pho = true
            this.lay_danhsach_dacdiem(this.result.pho_id, phuong_id)
          } else {
            this.checkBox.pho = false
          }
        } else {
          this.danhSachPho = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách phố')
      }
    },
    async lay_danhsach_ap (phuong_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_ap(this.axios, phuong_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachAp = response.data.data
          if (this.result.ap_id && this.result.ap_id != 0) {
            this.checkBox.ap = true
            this.lay_danhsach_dacdiem(this.result.ap_id, phuong_id)
          } else {
            this.checkBox.ap = false
          }
        } else {
          this.danhSachAp = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách ấp')
      }
    },
    async lay_danhsach_khu (phuong_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_khu(this.axios, phuong_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachKhu = response.data.data
          if (this.result.khu_id && this.result.khu_id != 0) {
            this.checkBox.khu = true
            this.lay_danhsach_dacdiem(this.result.khu_id, phuong_id)
          } else {
            this.checkBox.khu = false
          }
        } else {
          this.danhSachKhu = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách khu')
      }
    },
    async lay_danhsach_dacdiem (pho_id, phuong_id) {
      try {
        this.loading(true)
        let response = await API.lay_danhsach_dacdiem(this.axios, pho_id, phuong_id)
        this.loading(false)
        if (response && response.data && response.data.error_code && response.data.error_code == 'BSS-00000000' && response.data.data) {
          this.danhSachDacDiem = response.data.data
          if (this.result.dacdiem_id && this.result.dacdiem_id != 0) {
            this.checkBox.dacdiem = true
          } else {
            this.checkBox.dacdiem = false
          }
        } else {
          this.danhSachDacDiem = []
        }
      } catch (e) {
        this.loading(false)
        this.$toast.error('Không load được danh sách đặc điểm')
      }
    },
    changeTinh (data) {
      this.result.tinh_id = data.tinh_id
      this.result.quan_id = 0
      this.result.phuong_id = 0
      this.result.pho_id = 0
      this.result.ap_id = 0
      this.result.khu_id = 0
      this.result.dacdiem_id = 0
      this.danhSachQuan = []
      this.danhSachPhuong = []
      this.danhSachPho = []
      this.danhSachAp = []
      this.danhSachKhu = []
      this.danhSachDacDiem = []
      this.layDanhSachQuanTheoTinh(data.tinh_id)
    },
    changeQuan (data) {
      this.result.quan_id = data.ID
      this.result.phuong_id = 0
      this.result.pho_id = 0
      this.result.ap_id = 0
      this.result.khu_id = 0
      this.result.dacdiem_id = 0
      this.danhSachPhuong = []
      this.danhSachPho = []
      this.danhSachAp = []
      this.danhSachKhu = []
      this.danhSachDacDiem = []
      this.layDanhSachPhuongTheoQuan(data.ID)
    },
    async changePhuong (data) {
      this.result.phuong_id = data.PHUONG_ID
      this.result.pho_id = 0
      this.result.ap_id = 0
      this.result.khu_id = 0
      this.result.dacdiem_id = 0
      this.danhSachPho = []
      this.danhSachAp = []
      this.danhSachKhu = []
      this.danhSachDacDiem = []
      await this.lay_danhsach_pho(data.PHUONG_ID)
      await this.lay_danhsach_ap(data.PHUONG_ID)
      await this.lay_danhsach_khu(data.PHUONG_ID)
    },
    changePho (data) {
      this.result.pho_id = data.PHO_ID
      this.result.dacdiem_id = 0
      this.danhSachDacDiem = []
      this.lay_danhsach_dacdiem(data.PHO_ID, this.result.phuong_id)
    },
    changeAp (data) {
      this.result.ap_id = data.PHO_ID
      this.result.dacdiem_id = 0
      this.danhSachDacDiem = []
      this.lay_danhsach_dacdiem(data.PHO_ID, this.result.phuong_id)
    },
    changeKhu (data) {
      this.result.khu_id = data.PHO_ID
      this.result.dacdiem_id = 0
      this.danhSachDacDiem = []
      this.lay_danhsach_dacdiem(data.PHO_ID, this.result.phuong_id)
    },
    changeDacDiem (data) {
      this.result.dacdiem_id = data.dacdiem_id
    }
  },
  mounted () {

  },
  watch: {
    data: function (newVal, oldVal) {
      this.result = newVal
      this.diachi_bandau = '' + this.result.diachi
    },
    diachi_created (val) {
      this.input_diachi = val
    },
    'checkBox.pho': function (val) {
      if (val || this.checkBox.ap || this.checkBox.khu) {
        this.disabledCheckDacDiem = false
      } else {
        this.disabledCheckDacDiem = true
      }
    },
    'checkBox.ap': function (val) {
      if (this.checkBox.pho || val || this.checkBox.khu) {
        this.disabledCheckDacDiem = false
      } else {
        this.disabledCheckDacDiem = true
      }
    },
    'checkBox.khu': function (val) {
      if (this.checkBox.pho || this.checkBox.ap || val) {
        this.disabledCheckDacDiem = false
      } else {
        this.disabledCheckDacDiem = true
      }
    }
  }
}
</script>
<style>
.multiselect, .multiselect__input, .multiselect__single {
    font-size: 1rem !important;
}
.multiselect__tags{
    min-height: 32px !important;
    border: 1px solid #ced4da !important;
    padding: 6px 32px 0 6px;
    border-radius: 4px;
}
.multiselect__placeholder {
    margin-bottom: 5px!important;
    padding-top: 0px!important;
}
.multiselect__select{
    top: 0px!important;
    padding: 10px 9px!important;
}
.multiselect--disabled{
  background: none!important;
}
.multiselect--disabled .multiselect__current, .multiselect--disabled .multiselect__select{
  background: none!important;
}
</style>
