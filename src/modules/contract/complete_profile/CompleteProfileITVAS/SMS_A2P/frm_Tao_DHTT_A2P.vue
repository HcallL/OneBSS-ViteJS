<template>
  <b-modal
    ref="frm_Tao_DHTT_A2P"
    size="xl"
    hide-header
    hide-header-close
    hide-footer
    body-class="p-0"
  >
    <div class="modal-content popup-box">
      <div class="popup-header">
        <div class="title">
          <span class="icon one-notepad"></span>Tạo đơn hàng trả trước
        </div>
        <div
          class="close -ap icon-close"
          data-dismiss="modal"
          @click="hideModal"
        ></div>
      </div>
      <div class="list-actions-top">
        <ul class="list">
          <li >
            <a href="javascript:;" @click="btnNhapMoi_Click" v-if="btnNhapMoi.Visible">
              <span class="icon fa fa-plus-circle f20"></span> Nhập mới
            </a>
          </li>
          <li >
            <a href="javascript:;" @click="btnCapNhat_Click" v-if="btnCapNhat.Visible">
              <span class="icon one-save"></span> Cập nhật
            </a>
          </li>
        </ul>
      </div>
      <div class="popup-body">
        <div class="title padt5 padb25 bold h5">
          TẠO ĐƠN HÀNG TRẢ TRƯỚC
        </div>       
        <div class="row">
          <div class="col-sm-12 col-12">
            <div class="box-form">
              <div class="legend-title">Thông tin đơn hàng</div>
              <!-- Tên khách hàng -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ txtTenKhachHang.Text }}</div>
                    <div class="value">
                      <input type="text" class="form-control" v-bind:value="txtTenKhachHang.value"
                        @change="(e) => (txtTenKhachHang.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Loại gửi tin  -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ cboLoaiGuiTin.Text }}</div>
                    <div class="value">
                      <div class="select-custom" ref="cboLoaiGuiTin">
												<select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboLoaiGuiTin'] }" placeholder="Chưa chọn..." v-model="cboLoaiGuiTin.value" 
                          :options="cboLoaiGuiTin.DataSource.length > 0 ? cboLoaiGuiTin.DataSource.map(e => ({id: e.CONTRACT_TYPE_ID, text: e.CONTRACT_TYPE})) : []" >
												</select2>
											</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Loại khách hàng -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ cboLoaiKhachHang.Text }}</div>
                    <div class="value">
                      <div class="select-custom" ref="cboLoaiKhachHang">
												<select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboLoaiKhachHang'] }" placeholder="Chưa chọn..." v-model="cboLoaiKhachHang.value" 
                          :options="cboLoaiKhachHang.DataSource.length > 0 ? cboLoaiKhachHang.DataSource.map(e => ({id: e.AGENT_TYPE_ID, text: e.AGENT_TYPE})) : []" >
												</select2>
											</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Nhà mạng -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ cboNhaMang.Text }}</div>
                    <div class="value">
                      <div class="select-custom" ref="cboNhaMang">
												<select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboNhaMang'] }" placeholder="Chưa chọn..." v-model="cboNhaMang.value" 
                          :options="cboNhaMang.DataSource.length > 0 ? cboNhaMang.DataSource.map(e => ({id: e.TELCO_ID, text: e.TELCO_NAME})) : []" >
												</select2>
											</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Lĩnh vực  -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ cboLinhVuc.Text }}</div>
                    <div class="value">
                      <div class="select-custom" ref="cboLinhVuc">
                        <select2 :z-index="2000" :settings="{ dropdownParent: $refs['cboLinhVuc'] }" placeholder="Chưa chọn..." v-model="cboLinhVuc.value" 
                          :options="cboLinhVuc.DataSource.length > 0 ? cboLinhVuc.DataSource.map(e => ({id: e.LABEL_TYPE_ID, text: e.LABEL_TYPE_NAME})) : []" >
                        </select2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Số đơn hàng -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ txtTenDonHang.Text }}</div>
                    <div class="value">
                      <input type="text" class="form-control" v-bind:value="txtTenDonHang.value"
                        @change="(e) => (txtTenDonHang.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Sản lượng SMS -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ nmLimit.Text }}</div>
                    <div class="value">
                      <input type="number" class="form-control" v-bind:value="nmLimit.value"
                        @change="(e) => (nmLimit.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Đơn giá -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ nmDonGia.Text }}</div>
                    <div class="value">
                      <input type="number" class="form-control" v-bind:value="nmDonGia.value"
                        @change="(e) => (nmDonGia.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Giá trị dơn hàng -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ nmGiaTriDonHang.Text }}</div>
                    <div class="value">
                      <input type="number" class="form-control" v-bind:value="nmGiaTriDonHang.value"
                        @change="(e) => (nmGiaTriDonHang.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Ngày bắt đầu -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ dtpNgayBatDau.Text }}</div>
                    <div class="value">
                      <DatePicker
                        ref="dtpNgayBatDau"
                        :format="dateFormat"
                        :value-type="'format'"
                        v-model="dtpNgayBatDau.value"
                        :disabled="!dtpNgayBatDau.Enabled"
                        @change="ondtpNgayBatDau"
                      >
                      </DatePicker>               
                    </div>
                  </div>
                </div>
              </div>
              <!-- thời hạn -->
              <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ txtSoThang.Text }}</div>
                    <div class="value">
                      <input type="number" class="form-control" v-bind:value="txtSoThang.value"
                        @change="(e) => (txtSoThang.value = e.target.value)" />
                    </div>
                  </div>
                </div>
              </div>

               <!-- Ngày hết hạn -->
               <div class="row">
                <div class="col-sm-12 col-12">
                  <div class="info-row">
                    <div class="key w140">{{ dtpNgayKetThuc.Text }}</div>
                    <div class="value">
                      <DatePicker
                        ref="dtpNgayKetThuc"
                        :format="dateFormat"
                        :value-type="'format'"
                        v-model="dtpNgayKetThuc.value"
                        :disabled="!dtpNgayKetThuc.Enabled"
                        @change="ondtpNgayKetThuc"
                      >
                      </DatePicker>               
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>        
      </div>
    </div>
  </b-modal>
</template>

<script>
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi.js";
import "vue2-datepicker/index.css";
import api from "./PopUpApi.js";
import DataGrid from "@/components/Controls/DataGrid";

export default {
  name: "frm_Create_Agent_SMPP",
  components: { DatePicker, DataGrid },
  props: ["vhdtb_id"],
  data() {
    return {
      btnNhapMoi: { Visible: true },
      btnCapNhat: { Visible: true },
      tt_nd: {
        phanvung_id: 0,
        nhanvien_id: 0,
        may_cn: "",
        nguoi_cn: "",
        ip_cn: "",
        ngay_cn: moment(new Date()).format("DD/MM/YYYY"),
      },
      dateFormat: "DD/MM/YYYY",
      txtTenKhachHang: { Text: "Tên khách hàng", value: "" },
      cboLoaiGuiTin: { Text: "Loại gửi tin", value: "", DataSource: []},
      cboLoaiKhachHang: { Text: "Loại khách hàng", value: "", DataSource: []},
      cboNhaMang: { Text: "Nhà mạng", value: "", DataSource: []},
      cboLinhVuc: { Text: "Lĩnh vực", value: "", DataSource: []},
      txtTenDonHang: { Text: "Tên đơn hàng", value: ""},
      nmLimit: { Text: "Số lượng", value: 0},
      nmDonGia: { Text: "Đơn giá", value: 0},
      nmGiaTriDonHang: {Text: "Giá trị đơn hàng", value: 0},
      dtpNgayBatDau : {Text : "Ngày bắt đầu", value: ""},
      txtSoThang : {Text: "Số tháng", value: 0},
      dtpNgayKetThuc: {Text: "Ngày kết thúc", value: ""},
      adser_id: 0,
      agent_id: 0,
      contract_id: 0,
      vkieu: 0// 1 cap nhat
    };
  },
  methods: {
    frm_TAO_DHTT_A2P_Load: async function () {
      try {
        this.hdtb_id = this.vhdtb_id ? Number(this.vhdtb_id) : -1;
        await this.LoadThongTin();
        await this.LoadDonHang();
      } catch (e) {}
    },

    LoadThongTin: async function () {
      await this.sp_load_danhmuc_dhtt_smsbrn();
    },

    sp_load_danhmuc_dhtt_smsbrn: async function () {
      try {        
        this.cboLoaiKhachHang.DataSource = []
        this.cboLoaiGuiTin.DataSource = []
        this.cboNhaMang.DataSource = []
        let response = await api.sp_load_danhmuc_dhtt_smsbrn(this.axios);
        if (
          response &&
          response.data &&
          response.data.error_code &&
          response.data.error_code == "BSS-00000000"
        ) {          
          if (response.data.data) {   
            this.cboLoaiKhachHang.DataSource = this.UpperCasePropertyList(response.data.data["loai_kh"]);
            this.cboLoaiGuiTin.DataSource = this.UpperCasePropertyList(response.data.data["loai_gui"]);
            this.cboNhaMang.DataSource = this.UpperCasePropertyList(response.data.data["nha_mang"]);
          }          
        } else if (response.data.error_code == "BSS-00000204") {
            this.$toast.error("Không load được danh mục. Hãy kiểm tra lại.");
        } else {
          this.ShowError(response.data.message);          
        }
      } catch (ex) {
        console.log(ex);        
      }
     },
    LoadDonHang: async function () {
      try {
        var dt = await this.sp_lay_dulieu_khachhang_dhtt_smsbrn(this.hdtb_id);
        if (dt && dt.length > 0) {
          if (dt[0]["vkieu"].toString() == "0")
          {
            this.btnNhapMoi.Visible = true;
            this.btnCapNhat.Visible = false;
          }
          else
          {
            this.btnNhapMoi.Visible = false;
            this.btnCapNhat.Visible = true;
          }
          var row = dt[0];
          this.txtTenKhachHang.value = row["ten_kh"];
          this.cboLoaiKhachHang.value = row["agent_type_id"];
          this.cboLoaiGuiTin.value = row["contract_type_id"];
          this.cboLoaiKhachHang.value = row["agent_type_id"];
          this.agent_id = Number(row["agent_id"]);
          this.adser_id = Number(row["adser_id"]);
          this.contract_id = Number(row["contract_id"]);
        }
      } catch (e) {}
    },
    sp_lay_dulieu_khachhang_dhtt_smsbrn: async function (vhdtb_id) {
      try {        
        let response = await api.sp_lay_dulieu_khachhang_dhtt_smsbrn(this.axios, vhdtb_id);
        if (
          response &&
          response.data &&
          response.data.error_code &&
          response.data.error_code == "BSS-00000000"
        ) {
          return response.data.data
        } else if (response.data.error_code == "BSS-00000204") {
            this.$toast.error('Không tìm thấy khách hàng. ')
        } else {
          this.ShowError(response.data.message);
          return
        }
      } catch (ex) {
        console.log(ex);
        return
      }
    },
   
    
    // TAO_KHTT: async function (data) {
    //   try {       
    //     var input = {
    //       hdtb_id: this.hdtb_id,
    //       agent_id: this.agent_id,
    //       adser_id: this.adser_id,
    //       contract_id: this.contract_id,
    //       username: this.txtUsername.value,
    //       password: this.txtMatKhau.value,
    //       json: JSON.stringify(data)
    //     } 
    //     let response = await api.fn_capnhat_khachhang_daily_brn(this.axios, input);        
    //     if (
    //       response &&
    //       response.data &&
    //       response.data.error_code &&
    //       response.data.error_code == "BSS-00000000"
    //     ) {
    //       this.ShowSuccess("Tạo khách hàng đại lý thành công");
    //     } else {
    //       this.ShowError(response.data.message + ". Liên hệ admin để được hỗ trợ");
    //     }
    //   } catch (ex) {
    //     console.log(ex);
    //     this.ShowError(ex + ". Liên hệ admin để được hỗ trợ");
    //   }
    // },
    // UPDATE_KHTT: async function (data) {
    //   try {       
    //     var input = {
    //       hdtb_id: this.hdtb_id,
    //       json: JSON.stringify(data)
    //     } 
    //     let response = await api.fn_capnhat_thongtin_khachhang_daily_brn(this.axios, input);        
    //     if (
    //       response &&
    //       response.data &&
    //       response.data.error_code &&
    //       response.data.error_code == "BSS-00000000"
    //     ) {
    //       this.ShowSuccess("Cập nhật khách hàng đại lý thành công");
    //     } else {
    //       this.ShowError(response.data.message + ". Liên hệ admin để được hỗ trợ");
    //     }
    //   } catch (ex) {
    //     console.log(ex);
    //     this.ShowError(ex + ". Liên hệ admin để được hỗ trợ");
    //   }
    // },
    // btnNhapMoi_Click: async function () {
    //   try {
    //     var data = {
    //       agent_name: this.txtTenKH.value,
    //       description: this.txtMoTa.value,
    //       username: this.txtUsername.value,
    //       agent_type: 0,
    //       contract_type_id: this.cboLoaiHD.value ? Number(this.cboLoaiHD.value) : 0,
    //       province_id: this.tt_nd.phanvung_id,
    //       payment_type_id: this.cboHTThanhToan.value ? Number(this.cboHTThanhToan.value) : 0,
    //       address: this.txtDiaChi.value,
    //       paper_number: this.txtSoGiayTo.value,
    //       phone_number: this.txtSoDienThoai.value,
    //       email: this.txtEmail.value,
    //       status: 1,
    //       limit_mt: this.chkLimitMT.Checked ? 1 : 0,
    //       deposits: Number(this.txtSoTienDatCoc.value),
    //       contract_number: this.txtSoHopDong.value,
    //       contract_name: this.txtTenHopDong.value,
    //       contract_date: this.dtpNgayKyHD.value,
    //       contract_end_date: this.dtpNgayKyHD.value,
    //       contract_start_date: this.dtpNgayBD.value
    //     };
    //     if(data != null) {          
    //       await this.TAO_KHTT(data);  
                 
    //     }
    //     this.LoadThongTinKhachHang();
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    // btnCapNhat_Click: async function () {
    //   try {
    //     var objCapnhatKHTT = {
    //       agent_name: this.txtTenKH.value,
    //       description: this.txtMoTa.value,
    //       username: this.txtUsername.value,
    //       agent_type: 0,
    //       contract_type_id: Number(this.cboLoaiHD.value),
    //       province_id: this.tt_nd.phanvung_id,
    //       payment_type_id: Number(this.cboHTThanhToan.value),
    //       address: this.txtDiaChi.value,
    //       paper_number: this.txtSoGiayTo.value,
    //       phone_number: this.txtSoDienThoai.value,
    //       email: this.txtEmail.value,
    //       status: 1,
    //       limit_mt: this.chkLimitMT.Checked ? 1 : 0,
    //       deposits: Number(this.txtSoTienDatCoc.value),
    //       contract_number: this.txtSoHopDong.value,
    //       contract_name: this.txtTenHopDong.value,
    //       contract_date: this.dtpNgayKyHD.value,
    //       contract_end_date: this.dtpNgayKyHD.value,
    //       contract_start_date: this.dtpNgayBD.value,
    //       adser_id: this.adser_id,
    //       agent_id: this.agent_id
    //     };
    //     if (objCapnhatKHTT != null && this.agent_id != 0)
    //     {
    //       await this.UPDATE_KHTT(objCapnhatKHTT);          
    //     }
    //     this.LoadThongTinKhachHang();
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    // btnThoat_Click: function () {
    //   this.hideModal();
    // },
    // cboHTThanhToan_EditValueChanged: function () {
    //   if (this.cboHTThanhToan.value.toString() == "0")
    //   {
    //     this.txtSoTienDatCoc.Enabled = true;
    //   } else {
    //     this.txtSoTienDatCoc.Enabled = false;
    //     this.txtSoTienDatCoc.value = "0";
    //   }
    // },
    ondtpNgayKetThuc(value_) {
      if (!moment(value_, "DD/MM/YYYY").isValid()) {
        this.dtpNgayKetThuc.value = "01/01/2000";
      } else {
        this.dtpNgayKetThuc.value = value_;
      }
    },
    ondtpNgayBatDau(value_) {
      if (!moment(value_, "DD/MM/YYYY").isValid()) {
        this.dtpNgayBatDau.value = "01/01/2000";
      } else {
        this.dtpNgayBatDau.value = value_;
      }
    },
    clear() {
      this.txtTenKH.value = ""
      this.chkLimitMT.Checked = false
      this.txtMoTa.value = ""
      this.cboHTThanhToan.value = 0
      this.txtSoTienDatCoc.value = ""
      this.cboLoaiHD.value = 0
      this.txtDiaChi.value = ""
      this.txtSoGiayTo.value = ""
      this.txtSoDienThoai.value = ""
      this.txtEmail.value = ""
      this.txtSoHopDong.value = ""
      this.dtpNgayKyHD.value = ""
      this.txtTenHopDong.value = ""
      this.dtpNgayBD.value = ""
      this.dtpNgayKT.value = ""
      this.txtUsername.value = ""
      this.txtMatKhau.value = ""
      this.adser_id = 0
      this.agent_id = 0
      this.contract_id = 0
    },
    // showModal: async function () {
    //   this.clear();
    //   this.$refs["frm_Create_Agent_SMPP"].show();
    //   this.loading(true);
    //   try {
    //     this.tt_nd.phanvung_id = Number(this.$root.token.getPhanVungID());
    //     this.tt_nd.nhanvien_id = Number(this.$root.token.getNhanVienID());
    //     this.tt_nd.may_cn = await this.$root.token.getMachine();
    //     this.tt_nd.nguoi_cn = await this.$root.token.getMaNhanVien();
    //     this.tt_nd.ip_cn = await this.$root.token.getIP();

    //     await Promise.all([this.frm_TAO_DHTT_A2P_Load()]);
    //     this.loading(false);
    //   } catch (ex) {
    //     this.loading(false);
    //   }
    // },
    // hideModal: function () {
    //   this.$refs["frm_Create_Agent_SMPP"].hide();
    // },
    // GetData: function (response) {
    //   if (response.data && response.data.error_code == "BSS-00000000") {
    //     return response.data.data;
    //   } else {
    //     // console.log(response.data.error_code);
    //     // this.ShowError(response.data.message);
    //   }
    //   return [];
    // },
    // ShowSuccess: function (msg) {
    //   this.$toast.success(msg);
    // },
    // ShowError: function (msg) {
    //   this.$toast.error(msg);
    // },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    numberWithCommas(n) {
      var parts = n.toString().split(".");
      return (
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (parts[1] ? "." + parts[1] : "")
      );
    },
    // LowerCasePropertyList(obj) {
    //   return obj.map(function (item) {
    //     for (var key in item) {
    //       var upper = key.toLowerCase();
    //       // check if it already wasn't uppercase
    //       if (upper !== key) {
    //         item[upper] = item[key];
    //         delete item[key];
    //       }
    //     }
    //     return item;
    //   });
    // },
    // UpperCasePropertyList(obj) {
    //   return obj.map(function (item) {
    //     for (var key in item) {
    //       var upper = key.toUpperCase();
    //       // check if it already wasn't uppercase
    //       if (upper !== key) {
    //         item[upper] = item[key];
    //         delete item[key];
    //       }
    //     }
    //     return item;
    //   });
    // },
  },
  mounted() {},
  computed: {
    cp_tienDC: {
      get() {
        return this.numberWithCommas(this.txtSoTienDatCoc.value);
      },
      set(value) {
        const replaced = value.replaceAll(",", "");
        this.txtSoTienDatCoc.value = Number(replaced);
      },
    },
  },
  watch: {
    "cboHTThanhToan.value"(val) {
      if (val.toString() == "0") {
        this.txtSoTienDatCoc.Enabled = true;
      } else {
        this.txtSoTienDatCoc.Enabled = false;
        // this.txtSoTienDatCoc.value = "0";
      }
    }
  },
};
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
  color: gray !important;
}
.mx-datepicker {
  width: 100% !important;
}
.select2 {
  display: table !important;
  width: 100% !important;
  table-layout: fixed !important;
}
</style>