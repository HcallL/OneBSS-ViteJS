<template>
  <div>
	  <breadcrumb v-if="!dulieu || dulieu.isPopup == false" :header="header" />
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="javascript:;">
            <span class="icon one-file-attach"></span>Lấy TT
          </a>
        </li>
        <!-- <li>
          <a href="javascript:;">
            <span class="icon one-file-plus"></span>Nhập mới
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="icon one-file-plus"></span>Convert
          </a>
        </li>
        <li>
          <a href="javascript:;" >
            <span class="icon one-save"></span>Ghi lại
          </a>
        </li>
        <li>
          <a href="javascript:;" >
            <span class="icon one-trash"></span>Xóa
          </a>
        </li> -->
      </ul>
    </div>
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
                    v-model="cboTinh.value" class="select2"
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
                    v-model="cboHangSX.value" class="select2"
                    :options="cboHangSX.Items && cboHangSX.Items.length > 0 ? cboHangSX.Items.map(e=>({id:e.MA, text:`[ ${e.MA} ] ${e.HANGSX}`})) : []">
                  </select2>
                </div>
              </div>                  
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboDichVu.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboDichVu">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboDichVu'] }"
                    v-model="cboDichVu.value" class="select2"
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
                    v-model="cboLoaiCH.value" class="select2"
                    :options="cboLoaiCH.Items && cboLoaiCH.Items.length > 0 ? cboLoaiCH.Items.map(e=>({id:e.ID, text:`[ ${e.ID} ] ${e.TEN_LOAICH}`})) : []">
                  </select2>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ dtpTuNgay.text }}</div>
              <div class="value">
                <div class="select-custom" ref="dtpTuNgay">
                  <DatePicker :format="dateFormat" :value-type="'format'" v-model="dtpTuNgay.value"
										:input-attr="{required: 'true', title: 'Bạn chưa nhập từ ngày!'}" @change="changeNgayBD"
										:disabled="!dtpTuNgay.Enabled">
									</DatePicker>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ dtpDenNgay.text }}</div>
              <div class="value">
                <div class="select-custom" ref="dtpDenNgay">
                  <DatePicker :format="dateFormat" :value-type="'format'" v-model="dtpDenNgay.value"
										:input-attr="{required: 'true', title: 'Bạn chưa nhập đến ngày!'}" @change="changeNgayKT"
										:disabled="!dtpDenNgay.Enabled">
									</DatePicker>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>

      <div class="box-form">
        <div class="legend-title">Danh sách thay đổi Script</div>
        <div class="row"> 
          <DataGrid :columns="grdBNMRequests.header"
            :dataSource="grdBNMRequests.list" :enable-paging-server="false" :allowPaging="true"
            :showFilter="true" :showColumnCheckbox="false" :enabledSelectFirstRow="true" ref="grdBNMRequests" panelDataHeight="200px"
            @selectedItemsChanged="grd_SelectionChanged"/>
        </div>
      </div>
    </div>

    <b-modal id="popupComponents" size="huge" :title="popupComponentHeader" :hide-header="popupComponentHeader?false:true"
      hide-footer modal-class="modal-custom" body-class="modal-body p-0">
      <component :is="popupComponent" ref="generalPopup" :dulieu="popupComponentData" v-bind="popupComponentAttr"
        isPopup="true" v-on="popupComponentEvts"></component>
    </b-modal>
  </div>
</template>
<style src="../BNMScripts/BNMScripts.scss"></style>

<script>
import breadcrumb from "@/components/breadcrumb";
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/vi.js'
import 'vue2-datepicker/index.css'
import DataGrid from "@/components/Controls/DataGrid";
import api from './API.js'

export default {
  name: "BNMLogScripts",
  components: {
    breadcrumb,
    DatePicker,
    DataGrid
  },
  props: ['dulieu'],
  data: () => ({
    header: {
      title: "Danh sách lịch sử thay đổi Script",
      list: [
        {
          name: 'Danh sách lịch sử thay đổi Script',
          link: { 
            name: 'Ui.buttons',
            active: true 
          }
        }
      ],
    },
    popupComponentName: '',
    popupComponentHeader: '',
    popupComponent: null,
    popupComponentData: null,
    popupComponentAttr: {},
    popupComponentEvts: {
      
    },
    dateFormat: 'DD/MM/YYYY HH:mm:ss',
    btnSave: {text: 'Cập nhật', Visibled: true},
    btnDelete: {text: 'Xóa', Visibled: true},
    cboTinh: {text: 'Tỉnh', value: '', Items: [], Enabled: false},
    cboHangSX: {text: 'Hãng SX', value: '', Items: [], Enabled: false},
    cboDichVu: {text: 'Dịch vụ', value: '', Items: [], Enabled: false},
    cboLoaiCH: {text: 'Loại cấu hình', value: '', Items: [], Enabled: false},
    dtpTuNgay: {text: 'Từ ngày', value: '', Enabled: true},
    dtpDenNgay: {text: 'Đến ngày', value: '', Enabled: true},
   
    grdBNMRequests: {
      list: [],
      header: [
        {
          fieldName: "ID",
          headerText: "ID",
          allowFiltering: true,
        },
        {
          fieldName: "TINH",
          headerText: "Tỉnh/Thành phố",
          allowFiltering: true,
        },
        {
          fieldName: "HANG_SX",
          headerText: "Hãng sản xuất",
          allowFiltering: true,
        },
        {
          fieldName: "LOAITBI",
          headerText: "Loại thiết bị",
          allowFiltering: true,
        },
        {
          fieldName: "SCRIPT",
          headerText: "Script",
          allowFiltering: true,
        },
        {
          fieldName: "USER",
          headerText: "User",
          allowFiltering: true,
        },
        {
          fieldName: "NGAY_TAO",
          headerText: "Ngày Khởi tạo",
          allowFiltering: true,
        },        
        {
          fieldName: "action",
          headerText: "",
          textAlign: "center",
          width: 70,
          template: () => {
            return {
              template: {
                template: `<div>
                    <button type="button" class="btn btn-primary" @click="onbtnChitiet_Click">
                      Chi tiết
                    </button>
                  </div>`,
                data: function () {
                  return {
                    data: {},
                  };
                },
                methods: {
                  onbtnChitiet_Click() {
                    this.$parent.$parent.$parent.btnChitiet_click(this.data);
                  },
                },
              },
            };
          },
        },
      ],
      value: {},
      isEnabled: true,
      checked: [],
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

      if (this.dulieu && this.dulieu.isPopup == true) {
        this.kichban_id = this.dulieu?.v_script?.ID || this.dulieu?.v_script?.id || null
        this.cboTinh.value = this.dulieu?.v_script?.TINH || this.dulieu?.v_script?.province_id || null
        this.cboHangSX.value = this.dulieu?.v_script?.HANGSX || this.dulieu?.v_script?.vendor_id || null
        this.cboDichVu.value = this.dulieu?.v_script?.DICHVUVT_ID || this.dulieu?.v_script?.service_id || null
        this.cboLoaiCH.value = this.dulieu?.v_script?.LOAICH_ID || this.dulieu?.v_script?.config_id || null
      }

      if (!this.dulieu || this.dulieu.isPopup == false) {
        this.cboTinh.value = this.cboTinh.Items[0]?.id || 0
        this.cboHangSX.value = this.cboHangSX.Items[0]?.id || 0
        this.cboDichVu.value = this.cboDichVu.Items[0]?.id || 0
        this.cboLoaiCH.value = this.cboLoaiCH.Items[0]?.id || 0

        this.cboTinh.Enabled = true;
        this.cboHangSX.Enabled = true;
        this.cboDichVu.Enabled = true
        this.cboLoaiCH.Enabled = true
      }

      this.grdBNMRequests.list = [
        { ID: "1", TINH: "GSW", HANG_SX: "H", LOAITBI: 30, SCRIPT: 'abc', USER: 'test', NGAY_TAO: "01/05/2023 10:10:10"},
        { ID: "2", TINH: "LAL", HANG_SX: "IBM", LOAITBI: 6, SCRIPT: 'bcd', USER: 'test', NGAY_TAO: "02/05/2023 10:10:10"},
        { ID: "3", TINH: "BKN", HANG_SX: "H", LOAITBI: 7, SCRIPT: 'ghi', USER: 'test', NGAY_TAO: "03/05/2023 10:10:10"},
        { ID: "4", TINH: "MIL", HANG_SX: "G", LOAITBI: 34, SCRIPT: 'ikl', USER: 'test', NGAY_TAO: "04/05/2023 10:10:10"},
      ]

      console.log(this.dulieu)
    },
    getDSTinh: async function () {      
      try {
        this.cboTinh.Items = []
        var res = await api.GetListProvince(this.axios)
        if (res.data.errorCode != 0) {
          this.$toast.error(res.data.faultString)
          return false
        }
        this.cboTinh.Items =  res?.data?.data?.map(e => ({...e, text: (e.code + ' - ' + e.name)})) || []
      } catch (error) {
        console.log('🚀 ~ file: BNMScripts.vue:2169 ~ GetListProvince ~ error:', error)
      }
    },
    getHangSX: async function () {
      this.cboHangSX.Items = []
      try {
        var res = await api.GetListVendor(this.axios)
        if (res.data.errorCode != 0) {
          this.$toast.error(res.data.faultString)
          return false
        }
        this.cboHangSX.Items =  res?.data?.data?.map(e => ({...e, id: e.vendor_id, text:`${e.vendor_id} - ${e.vendor_name}`})) || []
      } catch (error) {
        console.log('🚀 ~ file: BNMScripts.vue:2169 ~ GetListVendor ~ error:', error)
      }
    },
    getDSDichVu: async function () {
      this.cboDichVu.Items = []
      try {
        var res = await api.GetListService(this.axios)
        if (res.data.errorCode != 0) {
          this.$toast.error(res.data.faultString)
          return false
        }
        this.cboDichVu.Items =  res?.data?.data?.map(e => ({...e, id: e.service_id, text:`${e.service_id} - ${e.service_name}`})) || []
      } catch (error) {
        console.log('🚀 ~ file: BNMScripts.vue:2169 ~ GetListService ~ error:', error)
      }
    },
    getDSLoaiCH: async function () {
      this.cboLoaiCH.Items = []
      try {
        var res = await api.GetListConfig(this.axios)
        if (res.data.errorCode != 0) {
          this.$toast.error(res.data.faultString)
          return false
        }
        this.cboLoaiCH.Items =  res?.data?.data?.map(e=>({...e, id: e.config_type, text:`${e.config_type} - ${e.service_name}`})) || []
      } catch (error) {
        console.log('🚀 ~ file: BNMScripts.vue:2169 ~ GetListConfig ~ error:', error)
      }
    },
    changeNgayBD: function(value_) {
      if (!moment(value_, 'DD/MM/YYYY HH:mm:ss').isValid()) {
        this.dtpTuNgay.value = '01/01/2000 00:00:00'
      } else {
        this.dtpTuNgay.value = value_
      }
    },
    changeNgayKT: function(value_) {
      if (!moment(value_, 'DD/MM/YYYY HH:mm:ss').isValid()) {
        this.dtpDenNgay.value = '01/01/2000 00:00:00'
      } else {
        this.dtpDenNgay.value = value_
      }
    },
    closeForm: function (val) {
      if (val) this.$emit("form-close", val)
    },
    Popup(modalId) {
      this.$bvModal.show(modalId);
    },
    ClosePopup(modalId) {
      this.$bvModal.hide(modalId);
      this.popupComponent = null;
    },
    grd_SelectionChanged: function (item) {
      if (item && item.length > 0) {
        // this.kichban_id = item[0].ID;
        // this.cboTinh.value = item[0].TINH;
        // this.cboLoaiTBI.value = item[0].LOAITBI;
        // this.cboHangSX.value = item[0].HANGSX;
        // this.txtNgayKhoiTao.value = item[0].NGAY_TAO;
        // this.txtNgayCapNhat.value = item[0].NGAY_CN;
        // this.txtNguoiTao.value = item[0].NGUOI_TAO;
      }      
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
      this.popupComponent = () =>
        import(
          "@/modules/admin/bnm/BNMScriptRequests/popup/BNMRequestDetail.vue"
        );
      this.popupComponentName = "popup_ChiTietYeuCau";
      this.popupComponentHeader = 'Chi Tiết Request Từ BSS';
      this.popupComponentData = {
        isPopup: true,
        parrent: 'BNMLogScripts',
        v_script: {
          province_id: this.cboTinh.value, 
          vendor_id: this.cboHangSX.value,
          service_id: this.cboDichVu.value,
          config_id: this.cboLoaiCH.value,
        },
        v_request: item  
      }; 
      this.Popup("popupComponents");
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

<style>
.disabled {
  cursor: not-allowed;
  color: #666 !important;
}
.mx-datepicker {
  width: 100% !important;
}

.mx-input.disabled,
.mx-input:disabled {
  color: #666 !important;
}

.hoso-dientu .page-content {
  position: unset;
}

@media (min-width: 992px) {
  .modal .modal-huge {
    max-width: 95% !important;
    width: 100% !important;
  }
}
@media (min-width: 576px) {
  .modal .modal-huge {
    max-width: 95% !important;
    width: 100% !important;
  }
}
</style>