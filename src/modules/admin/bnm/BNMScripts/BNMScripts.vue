<template>
  <div>
	  <breadcrumb :header="header" />
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="javascript:;" @click="btnLayTT_click">
            <span class="icon one-file-attach"></span>Lấy TT
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="btnNhapMoi_click">
            <span class="icon one-file-plus"></span>Tạo mới kịch bản
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="btnXemChiTiet_click">
            <span class="icon one-eye"></span>Xem chi tiết
          </a>
        </li>
        <!-- <li>
          <a href="javascript:;" @click="btnGhiLai_click">
            <span class="icon one-edit"></span>Sửa kịch bản
          </a>
        </li> -->
        <li>
          <a href="javascript:;" @click="btnShowLog_click">
            <span class="icon one-file-history2"></span>Lịch sử khai báo
          </a>
        </li>
      </ul>
    </div>
    <div class="page-content">
      <div class="box-form">
        <div class="legend-title">
          <span>Thông tin kịch bản BNM</span>
        </div>
        <div class="row">
          <div class="col-sm-6 col-12">
            <div class="info-row">
              <div class="key w100">{{ cboTinh.text }}</div>
              <div class="value">
                <div class="select-custom" ref="cboTinh">
                  <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboTinh'] }"
                    v-model="cboTinh.value" class="select2"
                    :options="cboTinh.Items">
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
                    :options="cboHangSX.Items">
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
                    :options="cboDichVu.Items">
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
                    :options="cboLoaiCH.Items">
                  </select2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-form">
        <div class="legend-title">Danh sách kịch bản BNM</div>
        <div class="row"> 
          <DataGrid class="table-result table-gachle" :columns="grdBNMScripts.header"
            :dataSource="grdBNMScripts.list" :enable-paging-server="false" :allowPaging="true"
            :showFilter="true" :showColumnCheckbox="false" :enabledSelectFirstRow="true" ref="grdBNMScripts" 
            @selectedItemsChanged="grdBNMScripts_SelectionChanged"/>
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
<style src="./BNMScripts.scss"></style>

<script setup>

</script>
<script>
import breadcrumb from "@/components/breadcrumb";
import moment from 'moment'
import DataGrid from "@/components/Controls/DataGrid";
import api from './API.js'

export default {
  name: 'BNMScripts',
  components: {
    breadcrumb,
    DataGrid
  },
  data: () => ({
    header: {
      title: "Danh sách kịch bản lệnh BNM",
      list: [
        {
          name: 'Danh sách kịch bản lệnh BNM',
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
    tt_nd: {
      phanvung_id: 0, //this.$root.token.getPhanVungID(),
      donvi_id: 0, //this.$root.token.getDonviID(),
      nhanvien_id: 0, //this.$root.token.getNhanVienID(),
      ip_cn: "",
      may_cn: "",
      nguoi_cn: "",
    },
    kichban_id: 0,
    cboTinh: {text: 'Tỉnh', value: '', Items: []},
    cboHangSX: {text: 'Hãng SX', value: '', Items: []},
    cboDichVu: {text: 'Dịch vụ', value: '', Items: []},
    cboLoaiCH: {text: 'Loại cấu hình', value: '', Items: []},
    
    txtNgayKhoiTao: {text: 'Ngày Khởi tạo', value: ''},
    txtNgayCapNhat: {text: 'Ngày cập nhật', value: ''},
    txtNguoiTao: {text: 'Người tạo', value: ''},
    grdBNMScripts: {
      list: [],
      header: [
        {
          fieldName: "id",
          headerText: "ID",
          allowFiltering: true,
          width: 80,
        },
        {
          fieldName: "province_name",
          headerText: "Tỉnh",
          allowFiltering: true,
        },
        {
          fieldName: "vendor_name",
          headerText: "Hãng SX",
          allowFiltering: true,
        },
        {
          fieldName: "service_name",
          headerText: "Dịch vụ",
          allowFiltering: true,
        },        
        {
          fieldName: "config_name",
          headerText: "Loại cấu hình",
          allowFiltering: true,
        },
        {
          fieldName: "created_date",
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
      selected: {},
      isEnabled: true,
      checked: [],
    },
  }),
  created: async function () {
  },
  watch: {},
  computed: {},
  mounted () {
    this.formLoad()
  },
  methods: {
    formLoad: async function () {
      try {
        this.tt_nd = {
          phanvung_id: Number(await this.$root.token.getPhanVungID()),
          donvi_id: Number(await this.$root.token.getDonViID()),
          nhanvien_id: Number(await this.$root.token.getNhanVienID()),
          ip_cn: await this.$root.token.getIP(),
          may_cn: await this.$root.token.getMachine(),
          nguoi_cn: await this.$root.token.getUserName(),
        };
        // await Promise.all([
        //   this.getDSTinh(),
        //   this.getHangSX(),
        //   this.getDSDichVu(),
        //   this.getDSLoaiCH(),
        // ]);
        this.cboTinh.value = this.cboTinh.Items[0]?.id || 0
        this.cboHangSX.value = this.cboHangSX.Items[0]?.id || 0
        this.cboDichVu.value = this.cboDichVu.Items[0]?.id || 0
        this.cboLoaiCH.value = this.cboLoaiCH.Items[0]?.id || 0

        await this.getDSKichBanBNM();
      } catch (e) {
        this.$toast.error('Lỗi ' + e?.data?.faultString || e)
      } finally {}
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
    getDSKichBanBNM: async function () {
      try {
        // this.grdBNMScripts.list = []
        // var input = {
        //   province_id: this.cboTinh.value,
        //   vendor_id: this.cboHangSX.value,
        //   service_id: this.cboDichVu.value,
        //   config_type: this.cboLoaiCH.value
        // };
        // let res = await api.GetListScriptTempBNM(this.axios, input);
        // if (res.data.errorCode != 0) {
        //   this.$toast.error(res.data.faultString)
        // }
        // if (res.data.data && res.data.data.length > 0) {
        //   for (let item of res.data.data) {
        //     item.province_name = this.cboTinh.Items?.find(e => e.id == item.province_id) || null
        //     item.vendor_name = this.cboHangSX.Items?.find(e => e.id == item.vendor_id) || null
        //     item.service_name = this.cboDichVu.Items?.find(e => e.id == item.service_id) || null
        //     item.config_name = this.cboLoaiCH.Items?.find(e => e.id == item.config_type) || null
        //   }
        //   this.grdBNMScripts.list =  res.data.data
        // }
        this.grdBNMScripts.list = [
          {
            "id": 208,
            "service_id": 59,
            "service_name": 'test',
            "vendor_id": 8,
            "vendor_name": 'test',
            "province_id": 1057,
            "province_name": 'test',
            "config_type": 1,
            "config_name": 'test',
            "script_temp": "{if(bss.loai_onu_id=5801)}enable]#;config]#;btv]#;multicast-vlan 99]<K> };13]#;undo igmp multicast-vlan member service-port {service_port_mytv}]#;quit]#;btv]#;igmp user delete service-port {service_port_mytv}]Failure=y=[n];y]#;quit]#;undo service-port {service_port_mytv}]#;undo service-port {service_port_ftth}]#;undo service-port {service_port_ims}]#;interface gpon 0/{bss.slot}]#;ont delete {bss.port} {bss.onu_num}]#;quit]#;quit]#;config]#;interface gpon 0/{bss.slot}]#;ont add {bss.port} {bss.onu_num} password-auth {bss.password_ftth} always-on omci ont-lineprofile-id 301 ont-srvprofile-id 3 desc {bss.account_ftth}]<cr>|fiber-route<K>|ont-type<K> };13]#;ont port native-vlan {bss.port} {bss.onu_num} eth 4 vlan 12 priority 4]<K> };13]#;quit]#;service-port {service_port_ftth} vlan {bss.vlan_hsi} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 1 multi-service user-vlan 11 tag-transform translate inbound traffic-table index 301 outbound traffic-table index 301]#;service-port {service_port_mytv} vlan {bss.vlan_vod} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 2 multi-service user-vlan 12 tag-transform translate inbound traffic-table index 100 outbound traffic-table index 101]#;service-port {service_port_gnms} vlan {bss.vlan_tr069_2} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 6 multi-service user-vlan 4000 tag-transform translate inbound traffic-table index 70 outbound traffic-table index 70]#;btv]#;igmp user add service-port {service_port_mytv}]<K> };13]#;multicast-vlan 99]<K> };13]#;igmp multicast-vlan member service-port {service_port_mytv}]#;quit]#;quit]#;{else}enable]#;config]#;btv]#;multicast-vlan 99]#;undo igmp multicast-vlan member service-port {service_port_mytv}]#;quit]#;btv]#;igmp user delete service-port {service_port_mytv}]Failure=y=[n];y]#;quit]#;undo service-port {service_port_mytv}]#;undo service-port {service_port_ftth}]#;undo service-port {service_port_ims}]#;undo service-port {service_port_gnms}]#;interface gpon 0/{bss.slot}]#;ont delete {bss.port} {bss.onu_num}]#;quit]#;quit]#;]#;enable]#;config]#;interface gpon 0/{bss.slot}]#;{if(bss.loai_onu_id=5800)}ont add {bss.port} {bss.onu_num} password-auth {bss.password_ftth} always-on omci ont-lineprofile-id 301 ont-srvprofile-id 3 desc {bss.account_ftth}]<cr>|ont-type<K> };13]#;{else}ont add {bss.port} {bss.onu_num} password-auth {bss.password_ftth} always-on omci ont-lineprofile-id 301 ont-srvprofile-id 3 desc {bss.account_ftth}]#;{endif}]#;ont port native-vlan {bss.port} {bss.onu_num} eth 4 vlan 11 priority 0]#;quit]#;service-port {service_port_ftth} vlan {bss.vlan_hsi} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 1 multi-service user-vlan 11 tag-transform translate inbound traffic-table index 301 outbound traffic-table index 301]#;]#;service-port {service_port_gnms} vlan {bss.vlan_tr069_2} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 6 multi-service user-vlan 4000 tag-transform translate inbound traffic-table index 70 outbound traffic-table index 70]#;]#;service-port {service_port_mytv} vlan {bss.vlan_vod} gpon 0/{bss.slot}/{bss.port} ont {bss.onu_num} gemport 2 multi-service user-vlan 12 tag-transform translate inbound traffic-table index 100 outbound traffic-table index 101]#;]#;quit]#;{endif}",
            "created_date": "2023-09-18T09:02:11",
            "updated_date": "2023-09-18T09:02:11",
            "user_update": "lvquang",
          }
        ]
      } catch (ex) {
        this.ShowError("Lỗi lấy danh sách kịch bản BNM: " + ex?.data?.faultString || ex);
      }
    },
    kiemtra_capnhat: function () {
      if (!this.cboTinh.value) {
        this.ShowError("Bạn chưa chọn Tỉnh/TP");
        return false
      }

      if (!this.cboHangSX.value) {
        this.ShowError("Bạn chưa chọn Hãng sản xuất");
        return false
      }

      if (!this.cboDichVu.value) {
        this.ShowError("Bạn chưa chọn Dịch vụ");
        return false
      }

      if (!this.cboLoaiCH.value) {
        this.ShowError("Bạn chưa chọn Loại cấu hình");
        return false
      }

      return true
    },
    CAPNHAT: async function () {
      try {
        
      } catch (ex) {
        console.log(ex);
        this.ShowError("Lỗi ghi lại: " + ex);
      }
    },
    grdBNMScripts_SelectionChanged: function (item) {
      if (item && item.length > 0) {
        this.grdBNMScripts.selected = item[0]
        this.kichban_id = item[0].id;
        this.cboTinh.value = item[0].province_id;
        this.cboHangSX.value = item[0].vendor_id;
        this.cboDichVu.value = item[0].service_id;
        this.cboLoaiCH.value = item[0].config_type;
        this.txtNgayKhoiTao.value = item[0].created_date;
        // this.txtNgayCapNhat.value = item[0].NGAY_CN;
        // this.txtNguoiTao.value = item[0].NGUOI_TAO;
      }      
    },
    clearForm: function () {
      this.kichban_id = 0;
      this.cboTinh.value = 0;
      this.cboHangSX.value = 0;
      this.cboDichVu.value = 0;
      this.cboLoaiCH.value = 0;
      
      this.txtNgayKhoiTao.value = moment(new Date()).format('DD/MM/YYYY');
      this.txtNgayCapNhat.value = moment(new Date()).format('DD/MM/YYYY');
      this.txtNguoiTao.value = '';
    },
    ShowSuccess: function (msg) {
      this.$toast.success(msg);
    },
    ShowError: function (msg) {
      this.$toast.error(msg);
    },
    Popup(modalId) {
      this.$bvModal.show(modalId);
    },
    ClosePopup(modalId) {
      this.$bvModal.hide(modalId);
      this.popupComponent = null;
    },
    async popupClosed(val) {
      if (!val) {
        this.ClosePopup("popupComponents");
        return;
      }
      this.loading(true);
      try {
        switch (this.popupComponentName) {
          case "popup_DSYeuCauTaoScript": 
            console.log(val)
            break;
        }
      } catch (ex) {
        if (ex.data && ex.data.message_detail) {
          this.$toast.error("" + ex.data.message_detail);
        } else {
          this.$toast.error("" + ex);
        }
      } finally {
        this.ClosePopup("popupComponents");
        this.loading(false);
      }
    },
    btnChitiet_click: function (item) {
      this.popupComponent = () =>
        import(
          "@/modules/admin/bnm/BNMScriptRequests/BNMScriptRequests.vue"
        );
      this.popupComponentName = "popup_DSYeuCauTaoScript";
      this.popupComponentHeader = 'Chi tiết kịch bản BNM và khai báo Script';
      this.popupComponentData = {
        isPopup: true,
        ...item  
      }; 
      this.Popup("popupComponents");
    },
    btnLayTT_click: async function () {
      try {
        this.loading(true);
        this.clearForm();
        await this.formLoad();
      } catch (e) {} finally { this.loading(false) }
    },
    btnNhapMoi_click: function () {
      this.popupComponent = () =>
        import(
          "@/modules/admin/bnm/BNMScriptRequests/BNMScriptRequests.vue"
        );
      this.popupComponentName = "popup_DSYeuCauTaoScript";
      this.popupComponentHeader = 'Tạo mới kịch bản BNM và khai báo Script';
      this.popupComponentData = {
        isPopup: true
      }; 
      this.Popup("popupComponents");
    },
    btnXemChiTiet_click: function () {
      this.popupComponent = () =>
        import(
          "@/modules/admin/bnm/BNMScriptRequests/BNMScriptRequests.vue"
        );
      this.popupComponentName = "popup_DSYeuCauTaoScript";
      this.popupComponentHeader = 'Chi tiết kịch bản BNM và khai báo Script';
      this.popupComponentData = {
        isPopup: true,
        ...this.grdBNMScripts.selected
      }; 
      this.Popup("popupComponents");
    },
    btnGhiLai_click: function () {
      if (!this.kiemtra_capnhat()) return;
      
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
        v_script: this.grdBNMScripts.selected,
        v_request: item  
      }; 
      this.Popup("popupComponents");
    },
  }
}
</script>



