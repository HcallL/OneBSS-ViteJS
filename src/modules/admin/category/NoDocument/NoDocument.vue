<template src="./NoDocument.html"></template>
<style src="./NoDocument.scss"></style>
<script>

import breadcrumb from '@/components/breadcrumb'
import gridview from '@/components/Shared/gridview'
import NoDocumentAPI from './NoDocumentAPI'
import bssFlatPicker from "@/components/BssDatePicker";
import moment from "moment";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi.js";
import "vue2-datepicker/index.css";

//import gridview from './gridview'
//CSS
import '@/assets/vendor/bootstrap-table/bootstrap-table.min.css';
import '@/assets/vendor/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.css';
//JS
import '@/assets/vendor/jquery/split'
import '@/assets/vendor/bootstrap-table/bootstrap-table.min'
import '@/assets/vendor/bootstrap-table/extensions/fixed-columns/bootstrap-table-fixed-columns.min'
//

export default {
  components: { breadcrumb, gridview, DatePicker, },
  name: 'NoDocumentAPI',
  mounted () {
    //load loại công văn
    NoDocumentAPI.lay_loai_cv(this.axios, {}).then((response) => {
    if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data) {
        this.listbox.loai_cv.list = response.data.data;
        }
      }
    );
    //load loại công văn vnp
    NoDocumentAPI.lay_loai_cv_vnp(this.axios, {}).then((response) => {
    if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data) {
        this.CV_VNP.data = response.data.data;
        this.CV_VNP.data.unshift("");
        }
      }
    );   
    this.btnSearchClicked();
  },
  destroyed () {},
  data () {
    return {
      header: {
        title: 'THÔNG TIN CÔNG VĂN',
        list: [
          { name: 'Dư liệu', link: { name: 'Ui.cards' } },
          {
            name: 'Phát triển thuê bao',
            link: { name: 'Ui.buttons' }
          },
          {
            name: 'Bảng giá - Khuyến mại - Gói cước',
            link: { name: 'Ui.buttons' }
          },
          {
            name: 'Số công văn',
            link: { name: 'Ui.buttons' }
          },
        ]
      },
      dateFormat: "DD/MM/YYYY",
      txtSoCongVan: "",
      txtTenCongVan: "",
      txtNoiDung: "",
      txtNam: "",
      dtpNgayQD: "",
      hieuluc: "",
      CongVan: "",
      statusNhapMoi: true,
      statusXoa: true,
      statusGhiLai: true,
      statusHuy: true,
      booleanValue: false,
      CV_VNP: {
        valueField: 'POST_PACKAGE_ID',
        textField: 'PACKAGE_NAME',
        panelDataHeight: 'auto',
        KhuVucId: 0,
        data: [],
        headers: [
          {
            fieldName: 'PACKAGE_NAME',
            headerText: 'Tên gói',
            allowFiltering: true,
            allowSorting: false
          },
          {
            fieldName: 'POST_PACKAGE_ID',
            headerText: 'Công văn VNP',
            cssClass: 'text-right',
            width: '50px',
            allowFiltering: true,
            allowSorting: false
          }
        ]
      },

      listbox: {
        loai_cv:{
          list:[],
          value: 1,
          isEnabled:false,
        },
        loai_cv_vnp: {
          list:[],
          value: "",
          isEnabled:false,
          cols: [
                  {fieldName: 'PACKAGE_NAME', headerText: 'Tên gói', allowFiltering: true, allowSorting: false},
                  {fieldName: 'POST_PACKAGE_ID', headerText: 'Công văn VNP', allowFiltering: true, cellCssClass: 'text-right', width: "100px"},
                ],
        },
        ds_kieu_so: {
          list:[],
           value: "",
          isEnabled:false,
        },
        ds_host: {
          list:[],
          value: "",
          isEnabled:false,
        },
        ketquatimkiem: {
          list:[],
          value: "",
          header: [{name:'stt',text:'STT'},{name:'nam',text:'Năm'},{name:'socongvan',text:'Công văn'},{name:'ten_cv',text:'Tên công văn'},{name:'hieuluc',text:'Hiệu lực'},{name:'noidung',text:'Nội dung'},{name:'cv_vnp_id',text:'Công văn VNP'}],
          cols: [
                  {fieldName: 'stt', headerText: 'STT', allowFiltering: true, allowSorting: false, width: "100px"},
                  {fieldName: 'nam', headerText: 'Năm', allowFiltering: true, cellCssClass: 'text-right', width: "100px"},
                  {fieldName: 'ngay_qd', headerText: 'Ngày quyết định', allowFiltering: true, cellCssClass: 'text-right', width: "100px"},
                  {fieldName: 'socongvan', headerText: 'Công văn', allowFiltering: true},
                  {fieldName: 'ten_cv', headerText: 'Tên công văn', allowFiltering: true},
                  {fieldName: 'hieuluc', headerText: 'Hiệu lực', allowFiltering: true, cellCssClass: 'text-right', width: "100px"},
                  {fieldName: 'noidung', headerText: 'Nội dung', allowFiltering: true},
                  {fieldName: 'cv_vnp_id', headerText: 'Công văn VNP', allowFiltering: true, cellCssClass: 'text-right'},
                ],
        },
        ketquatimkiem1: {
          list:[],
          value: "",
          header: [],
        },
        ketquatimkiem_temp: {
          list: [],
          header:[],
          value: {},
          isEnabled: true,
        },
      },
      dateConfig: {
        altInput: true,
        dateFormat: 'd/m/Y',
        altFormat: 'd/m/Y'
      },
      from_date: new Date(),
      to_date: new Date()
    }
  },
  methods: {
    // nhap moi
    NhapMoi(){
      this.$refs.txtSoCongVan.focus();
      this.statusNhapMoi = false;
      this.statusXoa = false;
      this.statusGhiLai = true;
      this.statusHuy = true;
      this.txtSoCongVan = "";
      this.txtTenCongVan = "";
      this.txtNoiDung = "";
      this.txtNam = "";
      this.dtpNgayQD = "";
      this.listbox.loai_cv_vnp.value = "";
    },
    btnSearchClicked() {
      this.reset_input();
     // this.listbox.ketquatimkiem.list = null;
      var pdata = {};
      pdata.loai_cv = this.listbox.loai_cv.value;
      NoDocumentAPI.tracuu(this.axios, pdata).then((response) => {
        if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data) {
            this.listbox.ketquatimkiem.list = response.data.data;
        }
      });
      this.statusNhapMoi = true;
      this.statusXoa = true;
      this.statusGhiLai = true;
      this.statusHuy = true;
    },
    GhiLai() {
      this.reset_input();
      var pdata = {};
      if(this.statusNhapMoi==false) {
       pdata.congvan_id = 1;
       pdata.kieu = 1;
      }
      else {
       pdata.congvan_id = this.listbox.ketquatimkiem1.list.congvan_id;
       pdata.kieu = 2;
      }
      var thongbao = "";
      if(this.txtSoCongVan.length==0 || this.txtTenCongVan.length==0 || this.txtNam.length==0 || !this.dtpNgayQD) {
        if(this.txtSoCongVan.length==0){
          thongbao = thongbao + "Hãy nhập số công văn"
          document.getElementById('socongvan').style.border = '1px solid #f55959'
         // this.$toast.error("Hãy nhập số công văn");
        }
        if(this.txtTenCongVan.length==0){
          thongbao = (thongbao ? (thongbao + "\n") : thongbao) + "Hãy nhập tên công văn"
          document.getElementById('tencongvan').style.border = '1px solid #f55959'
         // this.$toast.error("Hãy nhập tên công văn");
        }
        if(this.txtNam.length==0){
          thongbao = (thongbao ? (thongbao + "\n") : thongbao) + "Hãy nhập năm"
          document.getElementById('nam').style.border = '1px solid #f55959'
        //  this.$toast.error("Hãy nhập năm");
        }
        // if (!this.dtpNgayQD) {
        //   thongbao = (thongbao ? (thongbao + "\n") : thongbao) + "Hãy nhập Ngày quyết định"
        //   document.getElementById('dtpNgayQD').style.border = '1px solid #f55959'
        // }
        this.$toast.error(thongbao);
      }
      else {
        var json_data = {};
        json_data.SOCONGVAN = this.txtSoCongVan.trim();
        json_data.TEN_CV = this.txtTenCongVan.trim();
        if (this.txtNoiDung != null) {
          this.txtNoiDung = this.txtNoiDung.trim();
        }
        json_data.NOIDUNG = this.txtNoiDung;
        if (this.booleanValue == true) {
          json_data.HIEULUC = 1;
        } else json_data.HIEULUC = 0;
        json_data.LOAI_CV = this.listbox.loai_cv.value;
        json_data.NAM = this.txtNam;
        json_data.NGAY_QD = this.dtpNgayQD;
        json_data.NGUOI_CN = this.$auth.getUserName();
        json_data.MAY_CN = "PC";
        json_data.CV_VNP_ID = this.CV_VNP.KhuVucId;
        var a = new Array(json_data);
        pdata.json_data= a;
        NoDocumentAPI.ghi_lai(this.axios, pdata).then((response) => {
          if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data) {
            this.$toast.success("Cập nhật công văn thành công!");
            this.statusNhapMoi = true;
            this.statusXoa = true;
            this.btnSearchClicked();
          }
        });
      }
    },
    grdKhachHangChanged(obj) {
      this.reset_input();
      this.statusNhapMoi = true;
      this.statusXoa = true;
      this.statusGhiLai = true;
      this.statusHuy = true;
      this.listbox.ketquatimkiem.value = obj;
      this.listbox.ketquatimkiem1.list = obj;
      this.txtTenCongVan = this.listbox.ketquatimkiem1.list.ten_cv;
      this.txtSoCongVan = this.listbox.ketquatimkiem1.list.socongvan;
      this.txtNoiDung = this.listbox.ketquatimkiem1.list.noidung;
      this.txtNam = this.listbox.ketquatimkiem1.list.nam;
      this.dtpNgayQD = this.listbox.ketquatimkiem1.list.ngay_qd ? moment(this.listbox.ketquatimkiem1.list.ngay_qd).format('DD/MM/YYYY') : '';
      this.CV_VNP.KhuVucId = this.listbox.ketquatimkiem1.list.cv_vnp_id;
      if (this.listbox.ketquatimkiem1.list.hieuluc == 0){
        this.booleanValue = false;
      }
      else this.booleanValue = true;
    },
    BtnXoa(){
      this.$bvModal.msgBoxConfirm('Bạn có muốn xóa công văn này không?', {
                	title: '',
                	size: 'sm',
                	okTitle: 'Đồng ý',
                	cancelTitle: 'Hủy',
            	    }).then(async v => {
                	if(!v) {
                  	return;
                	}
		            // Xử lý code ở đây
               var pdata = {
                    "kieu": 3,
                    "congvan_id": this.listbox.ketquatimkiem1.list.congvan_id,
                }
                NoDocumentAPI.ghi_lai(this.axios, pdata).then((response) => {
                        if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data=="Công văn đã được sử dụng. Bạn không thể xóa") {
                          this.$toast.error("Công văn đã được sử dụng. Bạn không thể xóa");
                        }
                        else if(response && response.data && response.data.data && response.data.error && response.data.error_code === 'BSS-00000000' && response.data.data) {
                          this.$toast.success("Xóa dữ liệu thành công");
                          this.btnSearchClicked();
                        }
                      });
            	});
    },
    Huy(){
      this.reset_input();
      this.statusNhapMoi = true;
      this.statusXoa = false;
      this.statusGhiLai = false;
      this.statusHuy = false;
      this.txtSoCongVan = "";
      this.txtTenCongVan = "";
      this.txtNoiDung = "";
      this.txtNam = "";
      this.dtpNgayQD = "";
      this.listbox.loai_cv_vnp.value = "";
    },
    reset_input(){
      document.getElementById('socongvan').style.border = '1px solid #ced4da';
      document.getElementById('tencongvan').style.border = '1px solid #ced4da';
      document.getElementById('nam').style.border = '1px solid #ced4da';
      document.getElementById('dtpNgayQD').style.border = '1px solid #ced4da';
    },
    onChangeNgayQD(value_) {
      if (!moment(value_, "DD/MM/YYYY").isValid()) {
        this.dtpNgayQD = "01/01/2000";
      } else {
        this.dtpNgayQD = value_;
      }
    },
    created: async function () {
      this.loading(true);
      this.loadData();
      this.loading(false);
    },
  },
};

</script>
