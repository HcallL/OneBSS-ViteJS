<template>
  <div>
	  <breadcrumb :header="header" />
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="javascript:;" @click="btnLayTT_Click">
            <span class="icon one-file-attach"></span>Lấy TT
          </a>
        </li>
        <li>
          <a href="javascript:;" :class="{ disabled: !button.btnNhapMoi }" @click="btnNhapMoi_Click">
            <span class="icon one-file-plus"></span>Nhập mới
          </a>
        </li>
        <li>
          <a href="javascript:;" :class="{ disabled: !button.btnGhiLai }" @click="btnGhiLai_Click">
            <span class="icon one-save"></span>Ghi lại
          </a>
        </li>
        <li>
          <a href="javascript:;" :class="{ disabled: !button.btnXoa }" @click="btnXoa_Click">
            <span class="icon one-trash"></span>Xóa
          </a>
        </li>
        <li>
          <a href="javascript:;" :class="{ disabled: !button.btnHuyBo }" @click="btnHuyBo_Click">
            <span class="icon nc-icon-glyph ui-1_circle-remove"></span>Hủy
          </a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="box-form">
        <div class="legend-title">Thông tin profile thiết bị</div>
        <div class="row">
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ cboHangSX.text }}</div>
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
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtGemProfile.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtGemProfile.value" @change="e => txtGemProfile.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtUserTelnet.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtUserTelnet.value" @change="e => txtUserTelnet.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtPasswordTelnet.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtPasswordTelnet.value" @change="e => txtPasswordTelnet.value = e.target.value">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtFTTHBandwidth.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtFTTHBandwidth.value" @change="e => txtFTTHBandwidth.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtFTTHShaper.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtFTTHShaper.value" @change="e => txtFTTHShaper.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtMyTVBandwidth.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtMyTVBandwidth.value" @change="e => txtMyTVBandwidth.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtMyTVShaper.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtMyTVShaper.value" @change="e => txtMyTVShaper.value = e.target.value">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtIMSBandwidth.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtIMSBandwidth.value" @change="e => txtIMSBandwidth.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtIMSShaper.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtIMSShaper.value" @change="e => txtIMSShaper.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtTCONIMS.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtTCONIMS.value" @change="e => txtTCONIMS.value = e.target.value">
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-12">
            <div class="info-row">
              <div class="key w150">{{ txtTCONProfile.text }}</div>
              <div class="value">
                <input type="text" class="form-control bold" v-bind:value="txtTCONProfile.value" @change="e => txtTCONProfile.value = e.target.value">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="box-form">
        <div class="legend-title">Danh sách profile thiết bị</div>
        <KDataGrid class="table-result table-gachle" :columns="gridDSThietBi.header" :dataSource="gridDSThietBi.list" :allowResizing="true"
          :enable-paging-server="false" :allowPaging="true" :showFilter="true" :showColumnCheckbox="false" :allowGrouping="true"
          :enabledSelectFirstRow="false" ref="gridDSThietBi" @selectedItemsChanged="gridDSThietBi_FocusedRowChanged"
          panelDataHeight="300px"/>
      </div>  
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
import moment from 'moment'
import KDataGrid from "@/components/kylq_components/KDataGrid";
export default {
  name: "BNMDeviceParams",
  components: {
    breadcrumb,
    KDataGrid,
  },
  props: ['dulieu'],
  data: () => ({
    header: {
      title: "Khai báo profile thiết bị",
      list: [
        {
          name: 'Khai báo profile thiết bị',
          link: { 
            name: 'Ui.buttons',
            active: true 
          }
        }
      ],
    },
    button: {
      btnNhapMoi: false,
      btnGhiLai: false,
      btnXoa: false,
      btnHuyBo: false,
    },
    cboHangSX: {text: 'Hãng SX', value: '', Items: []},
    txtGemProfile: {text: 'TR-69 Gem Profile', value: ''},
    txtUserTelnet: {text: 'User Telnet', value: ''},
    txtPasswordTelnet: {text: 'Password Telnet', value: ''},
    txtFTTHBandwidth: {text: 'FTTH Bandwidth', value: ''},
    txtFTTHShaper: {text: 'FTTH Shaper', value: ''},
    txtMyTVBandwidth: {text: 'MyTV Bandwidth', value: ''},
    txtMyTVShaper: {text: 'MyTV Shaper', value: ''},
    txtIMSBandwidth: {text: 'IMS Bandwidth', value: ''},
    txtIMSShaper: {text: 'IMS Shaper', value: ''},
    txtTCONIMS: {text: 'TCON IMS', value: ''},
    txtTCONProfile: {text: 'TCON Profile', value: ''},
    gridDSThietBi: {
      header: [
        {
          fieldName: "vendor_name",
          headerText: "Hãng SX",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "TR-69 Gem Profile",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "User Telnet",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "Password Telnet",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "FTTH Bandwidth",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "FTTH Shaper",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "MyTV Bandwidth",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "MyTV Shaper",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "IMS Bandwidth",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "IMS Shaper",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "TCON IMS",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "TCON Profile",
          allowFiltering: true,
        },
      ],
      list: [],
    },
  }),
  async mounted() {    
    try {
      this.loading(true);
    } catch (e) {
      await this.formLoad()
    } finally {
      this.loading(false);
    }
  },
  methods: {
    formLoad: async function () {
      this.SetButton(0)
    },
    gridDSThietBi_FocusedRowChanged: function () {},
    SetButton: function (kieu) {
      this.button.btnNhapMoi = false;
      this.button.btnGhiLai = false;
      this.button.btnXoa = false;
      this.button.btnHuyBo = false;
      if (kieu == -1) {
        //Bat dau
        this.button.btnGhiLai = true;
        this.button.btnHuyBo = true;
      }
      if (kieu == 0) {
        //Bat dau
        this.button.btnNhapMoi = true;
        this.Clear();
      }
      if (kieu == 1) {
        //Them moi
        this.button.btnGhiLai = true;
        this.button.btnHuyBo = true;
        this.Clear();
      }
      if (kieu == 2) {
        //Huy
        this.button.btnNhapMoi = true;
        this.button.btnXoa = true;
        this.Clear();
      }
      if (kieu == 3) {
        //Edit
        this.button.btnNhapMoi = true;
        this.button.btnXoa = true;
        this.button.btnGhiLai = true;
        this.button.btnHuyBo = true;
      }
    },
    Clear: function () {
      this.cboHangSX.value = ''
      this.txtGemProfile.value = ''
      this.txtUserTelnet.value = ''
      this.txtPasswordTelnet.value = ''
      this.txtFTTHBandwidth.value = ''
      this.txtFTTHShaper.value = ''
      this.txtMyTVBandwidth.value = ''
      this.txtMyTVShaper.value = ''
      this.txtIMSBandwidth.value = ''
      this.txtIMSShaper.value = ''
      this.txtTCONIMS.value = ''
      this.txtTCONProfile.value = ''
      this.gridDSThietBi.list = []
    },
    btnLayTT_Click: function () {},
    btnNhapMoi_Click: function () {
      this.SetButton(1)
    },
    btnGhiLai_Click: function () {},
    btnXoa_Click: function () {},
    btnHuy_Click: function () {},
  },
  watch: {
    "dulieu"(val) {
      if (val) {
      }
    }
  }
}
</script>
<style>
.full-w {
  width: 100% !important;
}
</style>