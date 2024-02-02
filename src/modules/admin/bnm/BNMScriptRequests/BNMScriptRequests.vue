<template>
  <div>
	  <breadcrumb v-if="!dulieu || dulieu.isPopup == false" :header="header" />
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="javascript:;" @click="isShowForm = !isShowForm">
            <span class="icon fa bold" :class="{'fa-angle-up': isShowForm, 'fa-angle-down': !isShowForm,}"></span>Tạo Script
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true" @click="btnShowLog_click">
            <span class="icon one-file-detail"></span> Log thay đổi Script
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true && isEdit == false" @click="isEdit = !isEdit">
            <span class="icon one-edit"></span> Sửa
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true && isEdit == false" @click="isEdit = !isEdit">
            <span class="icon one-file-check"></span> Test
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true && isEdit == true">
            <span class="icon one-save"></span> Lưu
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true && isEdit == true">
            <span class="icon one-trash"></span>Xóa
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="isShowForm == true && isEdit == true" @click="isEdit = !isEdit">
            <span class="fa fa-remove f20 inline vcenter"></span> Hủy
          </a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="box-form">
        <div class="legend-title">Thông tin kịch bản BNM</div>
        <div class="row">
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key" style="width: 100px !important">{{ cboTinh.text }}</div>
              <div class="value" style="width: calc(100% - 100px) !important">
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
              <div class="key" style="width: 100px !important">{{ cboHangSX.text }}</div>
              <div class="value" style="width: calc(100% - 100px) !important">
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
              <div class="key" style="width: 100px !important">{{ cboDichVu.text }}</div>
              <div class="value" style="width: calc(100% - 100px) !important">
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
              <div class="key" style="width: 100px !important">{{ cboLoaiCH.text }}</div>
              <div class="value" style="width: calc(100% - 100px) !important">
                <div class="select-custom" ref="cboLoaiCH">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboLoaiCH'] }"
                    v-model="cboLoaiCH.value" class="select2"
                    :options="cboLoaiCH.Items && cboLoaiCH.Items.length > 0 ? cboLoaiCH.Items.map(e=>({id:e.ID, text:`[ ${e.ID} ] ${e.TEN_LOAICH}`})) : []">
                  </select2>
                </div>
              </div>                  
            </div>
          </div> 
        </div>        
      </div>   

      <div class="box-form">
        <div class="legend-title">Danh sách yêu cầu</div>
        <div class="row"> 
          <DataGrid :columns="grdBNMRequests.header"
            :dataSource="grdBNMRequests.list" :enable-paging-server="false" :allowPaging="true"
            :showFilter="true" :showColumnCheckbox="false" :enabledSelectFirstRow="true" ref="grdBNMRequests" panelDataHeight="200px"
            @selectedItemsChanged="grdBNMRequests_SelectionChanged"/>
        </div>
      </div>

      <div class="box-form">        
        <div class="row" v-if="isShowForm == true">
          <div class="col-sm-4 col-12" style="vertical-align: baseline">
            <div class="box-form">
              <div class="legend-title">PARAMS BSS</div>
              <div class="info-row">
                <div class="value">
                  <DataGrid class="table-result table-gachle" :columns="gridParamBSS.header"
                    :dataSource="gridParamBSS.list" :enable-paging-server="false" :allowPaging="true"
                    :showFilter="true" :showColumnCheckbox="false" :enabledSelectFirstRow="false" ref="gridParamBSS"/>
                </div>
              </div>
              <br>
              <div class="legend-title">THÔNG TIN PORT BỔ SUNG</div>
              <div class="list-actions-top" style="position: unset !important">
                <ul class="list">
                  <li>
                    <a href="javascript: void(0)" @click="btnThemDK_click">
                      <span class="-ap icon icon-plus"></span>Thêm điều kiện
                    </a>
                  </li>
                </ul>
              </div>
              <div class="value" :key="gridPort.key">
                <DataGrid class="table-result table-gachle" :columns="gridPort.header"
                  :dataSource="gridPort.list" :enable-paging-server="false" :allowPaging="true"
                  :showFilter="true" :showColumnCheckbox="false" :enabledSelectFirstRow="false" ref="gridPort"
                  :commandColumn="{headerText: '', width: 40, cellCssClass: 'center', firstColumn: true, show: true}"
                  :commands="gridPort.commands" @commandClicked="gridCommand_gridPort"/>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-12" style="vertical-align: baseline">
            <div class="box-form">
              <div class="legend-title">LỆNH TEMP</div>
              <div class="info-row">
                <div class="value">
                  <pre v-html="JSON.stringify(scriptTemp, null, 2)" v-if="isEdit == false"></pre>
                  <textarea name="scriptTemp" class="form-control" style="height: 300px;" v-bind:value="scriptTemp"
                    @change="e => scriptTemp = e.target.value" v-if="isEdit == true"></textarea>
                </div>                  
              </div>
            </div>          
          </div>      
          <div class="col-sm-4 col-12" style="vertical-align: baseline">        
            <div class="box-form">
              <div class="legend-title">KẾT QUẢ</div>
              <div class="info-row">
                <div class="value">
                  <pre v-html="JSON.stringify(scriptResult, null, 2)"></pre>
                </div>                  
              </div>
            </div>
          </div> 
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
import KDataGrid from "@/components/kylq_components/KDataGrid";
import api from './API.js'

export default {
  name: "BNMScriptRequests",
  components: {
    breadcrumb,
    KDataGrid
  },
  props: ['dulieu'],
  data: () => ({
    header: {
      title: "Tạo mới kịch bản BNM và khai báo Script",
      list: [
        {
          name: 'Tạo mới kịch bản BNM và khai báo Script',
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
    isShowForm: true,
    isEdit: false,
    btnSave: {text: 'Cập nhật', Visibled: true},
    btnDelete: {text: 'Xóa', Visibled: true},
    kichban_id: 0,
    cboTinh: {text: 'Tỉnh', value: '', Items: []},
    cboHangSX: {text: 'Hãng SX', value: '', Items: []},
    cboDichVu: {text: 'Dịch vụ', value: '', Items: []},
    cboLoaiCH: {text: 'Loại cấu hình', value: '', Items: []},

    PARAM_BSS: {
      txtParam1: {text: 'param1', value: ''},      
      txtParam2: {text: 'param2', value: '', readOnly: true},
      txtParam3: {text: 'param3', value: ''},
    }, 
    scriptTemp: "", 
    scriptResult: {
      txtParam1: {text: 'param1', value: ''},      
      txtParam2: {text: 'param2', value: '', readOnly: true},
      txtParam3: {text: 'param3', value: ''},
    },
    gridParamBSS: {
      list: [],
      header: [
        {
          fieldName: "FIELD",
          headerText: "PARAM",
          allowFiltering: true,
        },
        {
          fieldName: "VALUE",
          headerText: "VALUE",
          allowFiltering: true,
        },
      ]
    },
    gridPort: {
      key: 1,
      list: [],
      commands: [
        { name: 'delete', cssClass: 'pad3 mar5 lh14 icon -ap icon-delete btn-danger btn-plus', iconCss: 'fa fa-times', width: 100 },
      ],
      header: [
        {
          fieldName: "FIELD",
          headerText: "PARAM",
          allowFiltering: true,
          template: () => {
            return {
              template: {
                template: `<div>
                    <input type="text" class="form-control text" :value="data.FIELD" @change="onChangeText">
                  </div>`,
                data: function () {
                  return {
                    data: {},
                  };
                },
                computed: {
                  parent() {
                    return this.$parent.$parent.$parent;
                  },           
                },
                methods: {
                  onChangeText: function (e) {
                    var index = this.parent.gridPort.list.findIndex(e => e.ID == this.data.ID)
                    this.parent.gridPort.list[index].FIELD = e.target.value
                  },
                },
              },
            };
          },
        },
        {
          fieldName: "VALUE",
          headerText: "VALUE",
          allowFiltering: true,
          template: () => {
            return {
              template: {
                template: `<div>
                    <input type="text" class="form-control text" :value="data.VALUE" @change="onChangeText">
                  </div>`,
                data: function () {
                  return {
                    data: {},
                  };
                },
                computed: {
                  parent() {
                    return this.$parent.$parent.$parent;
                  },           
                },
                methods: {
                  onChangeText: function (e) {
                    var index = this.parent.gridPort.list.findIndex(e => e.ID == this.data.ID)
                    this.parent.gridPort.list[index].VALUE = e.target.value
                  },
                },
              },
            };
          },
        },
      ]
    },
    grdBNMRequests: {
      list: [],
      header: [
        {
          fieldName: "ID",
          headerText: "ID",
          allowFiltering: true,
        },
        {
          fieldName: "NGAY_TAO",
          headerText: "Ngày Khởi tạo",
          allowFiltering: true,
        },
        {
          fieldName: "PARAM_BSS",
          headerText: "Param BSS",
          allowFiltering: true,
        },
        {
          fieldName: "SCRIPT",
          headerText: "Script",
          allowFiltering: true,
        },
        {
          fieldName: "NOTE",
          headerText: "Ghi chú",
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

      if (this.dulieu) {
        this.kichban_id = this.dulieu?.v_script?.ID || this.dulieu?.v_script?.id || null
        this.cboTinh.value = this.dulieu?.v_script?.TINH || this.dulieu?.v_script?.province_id || null
        this.cboHangSX.value = this.dulieu?.v_script?.HANGSX || this.dulieu?.v_script?.vendor_id || null
        this.cboDichVu.value = this.dulieu?.v_script?.DICHVUVT_ID || this.dulieu?.v_script?.service_id || null
        this.cboLoaiCH.value = this.dulieu?.v_script?.LOAICH_ID || this.dulieu?.v_script?.config_id || null
      }
      console.log(this.dulieu)

      this.grdBNMRequests.list = [
        { ID: "1", PARAM_BSS: "123", SCRIPT: 'abc', NOTE: 'test', NGAY_TAO: "01/05/2023 10:10:10"},
        { ID: "2", PARAM_BSS: "234", SCRIPT: 'bcd', NOTE: 'test', NGAY_TAO: "02/05/2023 10:10:10"},
        { ID: "3", PARAM_BSS: "345", SCRIPT: 'ghi', NOTE: 'test', NGAY_TAO: "03/05/2023 10:10:10"},
        { ID: "4", PARAM_BSS: "456", SCRIPT: 'ikl', NOTE: 'test', NGAY_TAO: "04/05/2023 10:10:10"},
      ]

      this.gridParamBSS.list = [
        {
          FIELD: 'slot',
          VALUE: '1'
        },
        {
          FIELD: 'port',
          VALUE: '1'
        },
        {
          FIELD: 'slot_onu',
          VALUE: 'tbh123'
        }
      ]

      this.gridPort.list = [
        {
          ID: '1',
          FIELD: 'service_port_fth_1',
          VALUE: '1000'
        },
        {
          ID: '2',
          FIELD: 'service_port_gnms',
          VALUE: '10'
        },
        {
          ID: '3',
          FIELD: 'service_port_fth_2',
          VALUE: '2000'
        }
      ]
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
    Popup(modalId) {
      this.$bvModal.show(modalId);
    },
    ClosePopup(modalId) {
      this.$bvModal.hide(modalId);
      this.popupComponent = null;
    },
    grdBNMRequests_SelectionChanged: function (item) {
      if (item && item.length > 0) {
        // this.kichban_id = item[0].ID;
        // this.cboTinh.value = item[0].TINH;
        // this.cboLoaiTBI.value = item[0].LOAITBI;
        // this.cboHangSX.value = item[0].HANGSX;
        // this.txtNgayKhoiTao.value = item[0].NGAY_TAO;
        // this.txtNgayCapNhat.value = item[0].NGAY_CN;
        // this.txtNguoiTao.value = item[0].NGUOI_TAO;
        this.PARAM_BSS = item[0].PARAM_BSS
      }      
    },
    btnThemDK_click: function() {
      var row = {}
      row.ID = Math.random().toString(36).slice(2, 7),
      row.FIELD = ''
      row.VALUE = ''
      
      this.gridPort.list.push(row)
      this.gridPort.key += 1
    },
    gridCommand_gridPort: function (type, dataItem) {
      if (type == 'delete') {
        this.gridPort.list = this.gridPort.list.filter(e => e.ID != dataItem.ID)
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
        parrent: 'BNMScriptRequests',
        v_script: this.dulieu,
        v_request: item  
      }; 
      this.Popup("popupComponents");
    },
    btnShowLog_click: function (item) {
      console.log('Show Log')
      // console.log(item)
      this.popupComponent = () =>
        import(
          "@/modules/admin/bnm/BNMLogScripts/BNMLogScripts.vue"
        );
      this.popupComponentName = "popup_BNMLogScripts";
      this.popupComponentHeader = 'Danh sách log thay đổi Script';
      this.popupComponentData = {
        isPopup: true,
        parrent: '',
        v_script: this.dulieu,
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