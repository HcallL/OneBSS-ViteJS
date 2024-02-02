<template>
  <div>
    <div class="page-content">      
      <div class="box-form">
        <div class="legend-title">Thông tin kịch bản BNM</div>
        <div class="row">
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboTinh.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboTinh">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboTinh'] }"
                    v-model="cboTinh.value" class="select2" :disabled="!cboTinh.Enabled"
                    :options="cboTinh.Items && cboTinh.Items.length > 0 ? cboTinh.Items.map(e=>({id:e.MA_TINH,text:e.TINH})) : []">
                  </select2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboHangSX.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboHangSX">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboHangSX'] }"
                    v-model="cboHangSX.value" class="select2" :disabled="!cboHangSX.Enabled"
                    :options="cboHangSX.Items && cboHangSX.Items.length > 0 ? cboHangSX.Items.map(e=>({id:e.MA, text:`[ ${e.MA} ] ${e.HANGSX}`})) : []">
                  </select2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">          
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboDichVu.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboDichVu">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboDichVu'] }"
                    v-model="cboDichVu.value" class="select2" :disabled="!cboDichVu.Enabled"
                    :options="cboDichVu.Items && cboDichVu.Items.length > 0 ? cboDichVu.Items.map(e=>({id:e.ID, text:`[ ${e.ID} ] ${e.TEN_DVVT}`})) : []">
                  </select2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboLoaiCH.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboLoaiCH">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboLoaiCH'] }"
                    v-model="cboLoaiCH.value" class="select2" :disabled="!cboLoaiCH.Enabled"
                    :options="cboLoaiCH.Items && cboLoaiCH.Items.length > 0 ? cboLoaiCH.Items.map(e=>({id:e.ID, text:`[ ${e.ID} ] ${e.TEN_LOAICH}`})) : []">
                  </select2>
                </div>
              </div>
            </div>
          </div>   
        </div>
        <div class="row">          
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ dtpNgayTao.text }}</div>
              <div class="value">
                <DatePicker :format="dateFormat" ref="dtpNgayTao" :value-type="'format'"
                  v-model="dtpNgayTao.value" :disabled="!dtpNgayTao.Enabled">
                </DatePicker>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ txtNguoiTao.text }}</div>
              <div class="value">
                <input type="text" class="form-control" v-bind:value="txtNguoiTao.value"
                  @change="e => txtNguoiTao.value = e.target.value" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="dulieu && dulieu.parrent == 'BNMScriptRequests'" class="row">
        <div class="col-sm-12 col-12">
          <div class="box-form">
            <div class="legend-title">PARAM BSS</div>
            <div class="info-row">
              <div class="value">
                <pre v-html="JSON.stringify(formBSS, null, 2)"></pre>
              </div>                  
            </div>
          </div>          
        </div>         
      </div>      

      <div class="row">
        <div class="col-sm-12 col-12">
          <div class="box-form">
            <div class="legend-title">SCRIPT</div>
            <div class="info-row">
              <div class="value">
                <pre v-html="JSON.stringify(formBSS, null, 2)"></pre>
              </div>                  
            </div>
          </div>          
        </div>          
      </div>  
    </div>
  </div>
</template>
<style src="../../BNMScripts/BNMScripts.scss"></style>

<script>
import breadcrumb from "@/components/breadcrumb";
import moment from 'moment'
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi.js";
import "vue2-datepicker/index.css";
import DataGrid from "@/components/Controls/DataGrid";
import api from '../API.js'

export default {
  name: "BNMRequestDetail",
  components: {
    breadcrumb,
    DatePicker,
    DataGrid
  },
  props: ['dulieu'],
  data: () => ({
    header: {
      title: "Chi Tiết Request Từ BSS",
      list: [
        {
          name: 'Chi Tiết Request Từ BSS',
          link: { 
            name: 'Ui.buttons',
            active: true 
          }
        }
      ],
    },
    btnSave: {text: 'Cập nhật', Visibled: true},
    btnDelete: {text: 'Xóa', Visibled: true},
    dateFormat: "DD/MM/YYYY HH:mm:ss",
    kichban_id: 0,
    cboTinh: {text: 'Tỉnh', value: '', Items: [], Enabled: false},
    cboHangSX: {text: 'Hãng SX', value: '', Items: [], Enabled: false},
    cboDichVu: {text: 'Dịch vụ', value: '', Items: [], Enabled: false},
    cboLoaiCH: {text: 'Loại cấu hình', value: '', Items: [], Enabled: false},
    dtpNgayTao: {text: 'Ngày tạo', value: '', Enabled: false},
    txtNguoiTao: {text: 'User thay đổi', value: '', Enabled: false},
    formBSS: {
      txtParam1: {text: 'param1', value: ''},      
      txtParam2: {text: 'param2', value: '', readOnly: true},
      txtParam3: {text: 'param3', value: ''},
    },
  }),
  mounted () {
    this.formLoad()
  },
  methods: {
    formLoad: function () {
      this.getDSTinh();
      this.getHangSX();
      this.getDSDichVu();
      this.getDSLoaiCH();

      if (this.dulieu) {
        this.kichban_id = this.dulieu?.v_script?.ID || this.dulieu?.v_script?.id || null
        this.cboTinh.value = this.dulieu?.v_script?.TINH || this.dulieu?.v_script?.province_id || null
        this.cboHangSX.value = this.dulieu?.v_script?.HANGSX || this.dulieu?.v_script?.vendor_id || null
        this.cboDichVu.value = this.dulieu?.v_script?.DICHVUVT_ID || this.dulieu?.v_script?.service_id || null
        this.cboLoaiCH.value = this.dulieu?.v_script?.LOAICH_ID || this.dulieu?.v_script?.config_id || null
      }
      console.log(this.dulieu)
    },
    getDSTinh: function () {
      this.cboTinh.Items = api.list_tinh
    },
    getHangSX: function () {
      this.cboHangSX.Items = api.list_hangsx
    },
    getDSDichVu: function () {
      this.cboDichVu.Items = [
        { ID: "61", TEN_DVVT: "FTTH - MyTV"},
        { ID: "58", TEN_DVVT: "FTTH - Fiber"},
        { ID: "3", TEN_DVVT: "Mesh"},
        { ID: "4", TEN_DVVT: "Megawan"},
      ]
    },
    getDSLoaiCH: function () {
      this.cboLoaiCH.Items = [
        { ID: "1", TEN_LOAICH: "Tạo mới & khai báo dv"},
        { ID: "2", TEN_LOAICH: "Hủy dv & đổi port"},
        { ID: "3", TEN_LOAICH: "Thay đổi thiết bị"},
      ]
    },
    closeForm: function (val) {
      if (val) this.$emit("form-close", val)
    },
    
    clearForm: function () {
    },
    ShowSuccess: function (msg) {
      this.$toast.success(msg);
    },
    ShowError: function (msg) {
      this.$toast.error(msg);
    },
    btnChitiet_click: function (item) {
      console.log('chitiet')
      // console.log(item)
      // this.$refs.popupBNMDetailScript.showModal(true)
      // this.popupComponent = () =>
      //   import(
      //     "@/modules/admin/bnm/BNMScriptRequests/BNMScriptRequests.vue"
      //   );
      // this.popupComponentName = "popup_DSYeuCauTaoScript";
      // this.popupComponentHeader = 'Danh sách yêu cầu tạo scripts từ BNM';
      // this.popupComponentData = {
      //   isPopup: true,
      //   ...item  
      // }; 
      // this.Popup("popupComponents");
    },
  },
  watch: {
    "dulieu"(val) {
      if (val) {
        this.kichban_id = val?.v_script?.ID || val?.v_script?.id || null
        this.cboTinh.value = val?.v_script?.TINH || val?.v_script?.province_id || null
        this.cboHangSX.value = val?.v_script?.HANGSX || val?.v_script?.vendor_id || null
        this.cboDichVu.value = val?.v_script?.DICHVUVT_ID || val?.v_script?.service_id || null
        this.cboLoaiCH.value = val?.v_script?.LOAICH_ID || val?.v_script?.config_id || null
      }
    }
  }
}
</script>
