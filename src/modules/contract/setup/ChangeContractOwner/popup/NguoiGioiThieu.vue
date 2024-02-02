<template>
  <div class="modal-content popup-box">
    <div class="popup-header">
        <div class="title"><span class="icon one-notepad"></span>Chọn người giới thiệu</div>
        <div @click="$emit('form-close', true)" class="close -ap icon-close" data-dismiss="modal">
        </div>
    </div>
    <div class="list-actions-top">
      <ul class="list">
        <li>
          <a href="#" v-on:click.prevent="PopUpNguoiGioiThieu_ChapNhan"> 
            <span class="icon nc-icon-glyph ui-1_check-circle-08"></span>Chấp nhận</a>
        </li>
        <li>
          <a href="#" v-on:click.prevent="PopUpNguoiGioiThieu_Thoat">
            <span class="icon nc-icon-glyph ui-1_circle-remove"></span>Thoát
          </a>
        </li>
      </ul>
    </div>
    <div class="popup-body">
      <div class="row">
        <div class="col-sm-12 col-12">
          <div class="box-form">
            <div class="legend-title">
              <span>Thông tin tìm kiếm</span>
              <span class="pull-right" style="color: red">{{ ten_ht }}</span>
            </div>
            <div class="info-row">
              <div class="key w100">Nhóm</div>
              <div class="value">
                <div class="select-custom">
                  <Select2 v-model="nhomngt_id" :options="DmNhom_NGT" v-on:change="DmNhom_NGT_onChange"/>
                </div>
              </div>
            </div>
            <div class="info-row">
              <div class="key w100">
                <div class="key">
                  <div class="check-action">
                    <input type="checkbox" class="check" v-model="chkDonViQL_NGT" />
                    <span class="name">Đơn vị QL</span>
                  </div>
                </div>
              </div>
              <div class="value">
                <div class="select-custom">
                  <Select2 :disabled="!NGTDonViQLStatus" v-model="donviql_ngt_id" :options="DmDonViQL_NGT" v-on:change="DmDonViQL_NGT_onChange"/>
                </div>
              </div>
            </div>
          </div>
          <div class="box-form">
            <div class="legend-title">Danh sách nhân viên</div>           
            <DataGrid v-bind:columns="PopNguoiGioiThieu.headers" v-bind:dataSource="PopNguoiGioiThieu.data"
                        :showColumnCheckbox="false" :enable-paging-server="false" :allowPaging="true"
                        dataKeyField="" :showFilter="true"  @selectedRowChanged="onNhanVienSelected">
            </DataGrid>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gridView from "@/modules/prepaid/ChoosePreapaidNumber/components/gridview.vue";
import treegridView from "@/modules/contract/setup/ManageSelfcareContract/components/treegridview.vue";
import breadcrumb from "@/components/breadcrumb";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi.js";
import "vue2-datepicker/index.css";
import api from "../Api";
export default {
  name: "NguoiGioiThieu",
  props: [],
  components: {
    breadcrumb,
    gridView,
    treegridView,
    moment,
    DatePicker,
  },
  data() {
    return {
      chkDonViQL_NGT: false,
      donviql_ngt_id: -1,
      NGTDonViQLStatus: false,
      DmDonViQL_NGT: [],
      nhomngt_id: -1,
      DmNhom_NGT: [],

      nhanvien_id: 0,
      ma_nv: '',
      ma_dv: '',
      diachi_nv: '',
      ma_the: '',
      so_dt: '',
      ten_dv: '',
      ten_ht: '',
      ten_nv: '',

      PopNguoiGioiThieu: {
        headers: [
          { fieldName: "stt", headerText: "STT", allowFiltering: true, allowSorting: false, width: 50, },
          { fieldName: "ma_the", headerText: "Mã thẻ", allowFiltering: true, allowSorting: false, width: 100, },
          { fieldName: "ma_nv", headerText: "Mã nhân viên", allowFiltering: true, allowSorting: false, width: 100, },
          { fieldName: "ma_dv", headerText: "Mã đơn vị", allowFiltering: true, allowSorting: false, width: 100, },
          { fieldName: "ten_nv", headerText: "Tên nhân viên", allowFiltering: true, allowSorting: false, width: 100, },
          { fieldName: "ten_dv", headerText: "Tên đơn vị", allowFiltering: true, allowSorting: false, width: 100, },
        ],
        data: [],
        selected: 0,
        checked: [],
      },
    };
  },
  watch: {
    chkDonViQL_NGT: function(val){
      if(val)
      {
        this.NGTDonViQLStatus = val
      }else{
        this.NGTDonViQLStatus = val
      }
    }

  },
  created() {
    this.getDsNhom(),
    this.getDsDonViQL(),
    // this.DmDonViQL_NGT_onChange()
    this.getDsNhanVien()
  },
  computed: {},
  mounted() {},
  methods: {
     PopUpNguoiGioiThieu_Thoat() {      
       this.$emit('PopUpNguoiGioiThieu_Thoat')
    },

    async PopUpNguoiGioiThieu_ChapNhan(){
          this.$emit('acceptChangeNGT',
          { 
              nhanvien_id: this.PopNguoiGioiThieu.selected.nhanvien_id, 
              ten_ht: this.PopNguoiGioiThieu.selected.ten_ht,
              rowData: this.PopNguoiGioiThieu.selected
          });
    },

    getDsNhom: async function(){
      var input = {}
      let data = this.GetData(await api.getDsNhom(this.axios, input))
      if(data && data.length > 0){
        this.DmNhom_NGT = data.filter(x=>x.NHOMLNV_ID==11).map((x)=>({id:x.LOAINV_ID,text:x.TEN}))  //NHOMLNV_ID: 11 la nguoi gioi thieu
        this.DmNhom_NGT.unshift({id: 0,text: '--Tất cả--' })
      }
    },

    getDsDonViQL: async function(){
      var input = {}
      let data = this.GetData(await api.getDsDonViQL(this.axios, input))
      if(data && data.length > 0){
        this.DmDonViQL_NGT = data.map((x)=>({id:x.donvi_id,text:x.ten_dv}))
        // this.donviql_ngt_id = data[0].donvi_id
        this.DmDonViQL_NGT.unshift({id: 0,text: '' })
      }
     
    },

    getDsNhanVien: async function(){
      this.$root.loading(true)
      var input = {"donvi_id":this.donviql_ngt_id, "loainv_id":this.nhomngt_id}
      let data = this.GetData(await api.getDsNhanVien(this.axios, input))
      if(data && data.length > 0){
        this.PopNguoiGioiThieu.data = data
      }else{
        this.$root.toastError("Không có dữ liệu thông tin nhân viên!");
        this.PopNguoiGioiThieu.data = data
      }
      this.$root.loading(false)
    },

    DmNhom_NGT_onChange(loainv_id){
      this.loainv_id = loainv_id
      this.getDsNhanVien()
    },

    DmDonViQL_NGT_onChange(donviql_ngt_id){
      this.donviql_ngt_id = donviql_ngt_id
      this.getDsNhanVien()
    },

    onNhanVienSelected(e) {
        if (e !== null) {
            this.PopNguoiGioiThieu.selected = e;   
            this.nhanvien_id = e.nhanvien_id
            this.ma_nv = e.ma_nv
            this.ten_ht = e.ten_ht            
        }
    },

  GetData: function (response) {
      if (response.data.error === 200 || response.data.error === "200") {
        return response.data.data;
      } else {
        console.log(response.data.error_code);
      }
      return [];
    },
  },
};
</script>