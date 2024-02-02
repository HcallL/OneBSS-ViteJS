<template src="./DistributingDocumentsCustomers.html"></template>
<style>
  .e-grid .e-rowcell.magiaodich{
    color: blue;
    font-weight: bold;
  }
  .e-grid .e-rowcell.solo{
    color: red;
    font-weight: bold;
  }
  .e-grid .e-rowcell.mabohs{
    color: brown;
    font-weight: bold;
  }

</style>
<script src="@/static/vendor/jquery/split.js"></script>
<script>
import breadcrumb from "@/components/breadcrumb";
import API from "./API";
import moment from "moment";
import "@/assets/vendor/jquery/split";
import Vue from "vue";
import { DialogPlugin } from "@syncfusion/ej2-vue-popups";
import {LoaiNV} from './ThamSo'
import axios from 'axios';
Vue.use(DialogPlugin);
export default {
  components: {
    breadcrumb
  },
  data: function () {
    return {
      header: {
        title: "QUẢN LÝ CẤP PHÁT BỘ HỒ SƠ",
      },
       list: [
          {name: 'Lập hợp đồng', link: {name: 'Ui.cards'}},
          {
            name: 'Lắp đặt mới',
            link: {name: 'Ui.buttons'}
          }
        ],
      datetimeconfig: {
        altFormat: "d/m/Y H:i:S",
        altInput: true,
        dateFormat: "d/m/Y H:i:S",
        allowInput: true,
        enableTime: true,
      },
      popupComponent: null,
      popupComponentData: null,
      popupComponentName: "",
      popupComponentEvents: {
        "form-close": "popupClosed"
      },
      listTTTimKiem:{
          ma_kh: '',
          trangthai_options: [],
          trangthai: null,
          tungay: new Date(),
          denngay: new Date(),
          isGiaoTuNgay: false,
      },
      listChiTietBoHS:{
          nhomfile_options: [],
          nhomfile: null,
          loaifile_options: [],
          loaifile: null,
          duongdan: "",
          ghichu: null,
          chitietbohs_table:[],
          listItemChecked:[],
      },
      listTTGiaoViec:{
          qldaily_options:[],
          qldaily: null,
          nvphaths_options:[],
          nvphaths:null,
          ndgiao: "",
          dsgiaoviec_table: [],
      },
      listTTHenKH:{
          hentungay:new Date(),
          hendenngay:new Date(),
          lydoton_options:[],
          lydoton:null,
          ndhen: "",
          dshenkh_table:[],
      },
       params: {
        today: new Date(),
        ds_quyen: [],
        quyen: 0,//0 la nguoi bt
        tag_frm: "2", //WinUI.WinUIQLHoSo.frmCapPhatBHS,PTTB.exe,2
        quyen_dl: 0,
        vbohs_id: null,
        v_phieu_luoi:null,
      },
      listBoHS:{
        ds_bohoso_table:[],
        listItemChecked:[],
      },      
      soMayColumns:[
        {
          field: 'ma_tb',
          headerText: 'Acc',
          width: '20%',
          headerAlign:'Center',
          textAlign: 'Center',
          minWidth: 10
        },
      ],
      commandChucNang:[
        {
          type: "Xem",
          buttonOption: {
            cssClass: "one-search lh14",
          },
        },
        {
          type: "Tải về",
          buttonOption: {
            cssClass: "fa fa-angle-down lh14",
          },
        },
      ],
      cmdDaXacNhan:[
        {
          type: "DaXacNhan",
          buttonOption: {
            cssClass: "text-warning one-alert f20",
          },
        },
      ],
      button:{
        btnHenKH: true,
        btnNhapMoi: true,
        btnXoaFile: true,
        tsbtnXacNhan: true,
        tsbtnHoanCong: true,
        btnGiaoViec: true,
        tsbtnThemFile: 0,
        btnHuyBo: 0,
        btnHuyPhieu:0,
        loaifile:false,
        duongdan:false,
        ghichu:false
      },
      selectionSettings: {checkboxMode: 'ResetOnRowClick'},
    };
    
  },
  computed: {
      chkGiaoTuNgay: {
        get() {
            return this.listTTTimKiem.isGiaoTuNgay;
        },
        set(value) {
            this.listTTTimKiem.isGiaoTuNgay = value;
        },
      },
  },
  created() {
    if (
      this.$route.params &&
      this.$route.params.tag !== null &&
      this.$route.params.tag !== undefined
    ) {
      this.tag_frm = this.$route.params.tag;
    }
   this.loadTrangThai();
   this.loadNhomFile();
   this.loadLoaiFile();
   this.loadNVPhatHS();
   this.loadLyDoTon();
  
   this.loadDaiLy();
   this.THIETLAP_QUYEN();
   this.KHOAMO_FORM(false)
  },
  methods: {
    CLEAR(){
        rcFileHS.DataSource = null;
        this.listChiTietBoHS.loaifile = null;
        this.listChiTietBoHS.ghichu = "";
        this.listChiTietBoHS.duongdan = "";
        this.listTTGiaoViec.dsgiaoviec_table = null;
        this.listTTHenKH.lydoton=null;
        this.listTTTimKiem.tungay =new Date();
        this.listTTTimKiem.denngay = new Date();
    },
    loadTrangThai() {
        this.listTTTimKiem.trangthai_options = [];
        this.listTTTimKiem.trangthai = null;
      API.capnhat_bohs(this.axios,'capnhat_bohs_trangthai',{})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.TRANGTHAI_ID, text: item.TEN_TRANGTHAI });
              });
                this.listTTTimKiem.trangthai_options = items;
                this.listTTTimKiem.trangthai = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    loadNhomFile() {
        this.listChiTietBoHS.nhomfile_options = [];
        this.listChiTietBoHS.nhomfile = null;
      API.capnhat_bohs(this.axios,'CAPNHAT_BOHS_NHOM_FILE',{})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.NHOMFILE_ID, text: item.NHOM_FILE });
              });
                this.listChiTietBoHS.nhomfile_options = items;
                this.listChiTietBoHS.nhomfile = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    loadLoaiFile() {
        this.listChiTietBoHS.loaifile_options = [];
        this.listChiTietBoHS.loaifile = null;
      API.capnhat_bohs(this.axios,'CAPNHAT_BOHS_LOAI_FILE',{})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.LOAIFILE_ID, text: item.LOAI_FILE });
              });
                this.listChiTietBoHS.loaifile_options = items;
                this.listChiTietBoHS.loaifile = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    loadDaiLy() {
        this.listTTGiaoViec.qldaily_options = [];
        this.listTTGiaoViec.qldaily = null;
      API.sp_lay_ds_nhanvien_qldl(this.axios,{ "p_nguoidung_id":null})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.nhanvien_id, text: item.ten_nv });
              });
                this.listTTGiaoViec.qldaily_options = items;
                this.listTTGiaoViec.qldaily = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    loadNVPhatHS() {
        this.listTTGiaoViec.nvphaths_options = [];
        this.listTTGiaoViec.nvphaths = null;
      API.sp_lay_ds_nhanvien_theo_donvi(this.axios,{ "p_donvi_id":this.$root.token.getDonViID()})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.nhanvien_id, text: item.ten_nv });
              });
                this.listTTGiaoViec.nvphaths_options = items;
                this.listTTGiaoViec.nvphaths = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    
    loadLyDoTon() {
        this.listTTHenKH.lydoton_options = [];
        this.listTTHenKH.lydoton = null;
      API.capnhat_bohs(this.axios,'CAPNHAT_BOHS_LYDOTON_TC',{})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            let items = [];
            if (response.data.data !== undefined) {
              response.data.data.forEach(function (item) {
                items.push({id: item.LYDOTONTC_ID, text: item.LYDOTON_TC });
              });
                this.listTTHenKH.lydoton_options = items;
                this.listTTHenKH.lydoton = items[0].id;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    LOADFILE_HS(bohs_id) {
      this.listChiTietBoHS.chitietbohs_table=[]
      API.sp_lay_ds_file_hs(this.axios,{"p_bohs_id": bohs_id})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            if (response.data.data !== undefined) {
                this.listChiTietBoHS.chitietbohs_table =  response.data.data ;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    cmdClickChiTietBoHS: async function(args) {
      try {
        switch (args.commandColumn.type){
          case "Xem":
            window.open(args.rowData.url)
            break
          case "Tải về":
             window.open(args.rowData.url)
            break
        }
      } catch (e) {
      }
    },
    HT_DS_GIAOVIEC(v_phieu_luoi) {
      this.listTTGiaoViec.dsgiaoviec_table=[];
      API.sp_ht_ds_giaoviec_bo_hs(this.axios,{"p_phieu_id": v_phieu_luoi})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            if (response.data.data !== undefined) {
              this.listTTGiaoViec.dsgiaoviec_table =  response.data.data ;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }, 
    btnDel_GV_ButtonClick(name, dataItem) {
      if(this.params.v_phieu_luoi.length == 0){
        this.$toast.warning("Bạn chưa chọn phiếu để thực hiện hẹn với khách hàng")
        return false;
      }
      API.xoa_giaoviec(this.axios,{
          "kieu": dataItem.kieu,
          "nhanvien_th_id": dataItem.nhanvien_th_id,
          "phieu_id": this.params.v_phieu_luoi
        })
        .then((response) => {
          if (response.data.error_code === "BSS-00000000" && response.data.data !== undefined
          ) {
            this.$toast.success("Xóa giao việc thành công cho mã GD "+this.listBoHS.listItemChecked.ma_gd);
            this.HT_DS_GIAOVIEC(this.params.v_phieu_luoi);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    HT_DS_HENKH() {
         this.listTTHenKH.dshenkh_table = []
      API.CAPNHAT_BOHS_TT_HEN_KH(this.axios,{})
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            if (response.data.data !== undefined) {
              this.listTTHenKH.dshenkh_table =  response.data.data ;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    btnDelHen_ButtonClick(name, dataItem) {
      if(this.params.v_phieu_luoi.length == 0){
        this.$toast.warning("Bạn chưa chọn phiếu để xóa hẹn")
        return false;
      }
      API.xoa_hen_kh(this.axios,{"rid": dataItem.RID})
        .then((response) => {
          if (response.data.error_code === "BSS-00000000" &&  response.data.data !== undefined ) {
            this.$toast.success("Xóa hẹn khách hàng thành của mã GD: "+this.listBoHS.listItemChecked.ma_gd)
            this.HT_DS_HENKH();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    TIMKIEM() {
      this.listBoHS.ds_bohoso_table= []
      API.sp_lay_ds_phieu_phatkh(this.axios,{
          "p_denngay": moment(this.listTTTimKiem.denngay).format("DD/MM/YYYY"),
          "p_huonggiao_id": 0,
          "p_kieu": this.params.quyen_dl,
          "p_ma_gd": this.listTTTimKiem.ma_kh,
          "p_phieu_id": 0,
          "p_timngay": this.listTTTimKiem.isGiaoTuNgay ? 1 : 0,
          "p_ttph_id": this.listTTTimKiem.trangthai ==null ? 0 : this.listTTTimKiem.trangthai,
          "p_tungay": moment(this.listTTTimKiem.tungay).format("DD/MM/YYYY")
      })
      .then((response) => {
        if (
          response.data.error_code === "BSS-00000000" &&
          response.data.data !== undefined &&
          response.data.data.length > 0
        ) {
          if (response.data.data !== undefined) {
              this.listBoHS.ds_bohoso_table =   response.data.data ;
               this.HT_DS_HENKH();
            }else{
              this.$toast.warning("Không tìm thấy thông tin phiếu giao đến");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Có lỗi khi tìm kiếm giao phiếu ")
        })
        .finally(() => {});
    },
    THIETLAP_QUYEN(){
      API.capnhat_bohs_tt_loai_nv(this.axios)
        .then((response) => {
          if (
            response.data.error_code === "BSS-00000000" &&
            response.data.data !== undefined &&
            response.data.data.length > 0
          ) {
            if (response.data.data !== undefined) {
              this.params.ds_quyen = response.data.data.map(function(tag) {
                  return tag['loainv_id'];
                });
              this.button.btnNhapMoi = 0;
              this.button.btnXoaFile = 0;
              this.button.tsbtnXacNhan = 0;
              this.button.tsbtnHoanCong = 0;

              this.button.btnGiaoViec = false;
              this.button.btnHenKH = false;
              console.log("tag_frm: "+this.params.tag_frm)
              console.log("ds_quyen: "+this.params.ds_quyen)
              if(this.params.ds_quyen.includes(LoaiNV.NHANVIEN_QL_AM) && this.params.tag_frm =="1"){
                this.params.quyen_dl =1;
                this.button.tsbtnXacNhan = true;
                this.button.btnGiaoViec = true;
              }
              if(this.params.ds_quyen.includes(LoaiNV.NHANVIEN_QLDL) && this.params.tag_frm =="2"){
                this.params.quyen_dl =2;
                this.button.btnHenKH = true;
                this.button.btnNhapMoi = 1;
                this.button.btnXoaFile = 1;
                this.button.tsbtnXacNhan = 1;
                this.button.tsbtnHoanCong = 1;
                this.button.btnGiaoViec = true;
              }
            }
          }else{
            this.params.quyen_dl = 0;
            this.button.btnNhapMoi = 0;
              this.button.btnXoaFile = 0;
              this.button.tsbtnXacNhan = 0;
              this.button.tsbtnHoanCong = 0;

              this.button.btnGiaoViec = false;
              this.button.btnHenKH = false;
            this.$toast.warning("Bạn không có quyền vào chức năng này ");
          }
        })
        .catch((error) => {
          this.$toast.error("Có lỗi khi lấy danh sách quyền "+error)
          console.log(error);
        })
        .finally(() => {});
    },
    KHOAMO_FORM(mo){
      this.button.loaifile = mo;
      this.button.duongdan = mo;
      this.button.ghichu = mo;
    },
    THAOTAC_NUT(kieu){
      this.button.tsbtnThemFile=0
      this.button.huybo =0
      if (kieu == 1)
      {
        //Nhập mới
        this.KHOAMO_FORM(true);
        // Cập nhật nút
        this.button.btnNhapMoi = false;
        this.button.tsbtnThemFile = 1;
        this.button.btnHuyBo= 1;
        // Chọn control nhập
        this.$refs.inputMaGD.focus();
      }
      else if (kieu == 3)
      {
        // Hủy nhập
        // Xóa form
        this.KHOAMO_FORM(false);
        // Cập nhật nút
        this.button.btnNhapMoi = true;
      }
    },
    async XACNHAN_DS(){
      if(!await this.KIEMTRA_PHIEU(0)) return;
      this.$alert("Bạn chắc chắn muốn xác nhận danh sách bộ hồ sơ không ?", "Thông báo", {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        showCloseButton: true,
        type: "warning",
      }).then(async (v) => {
          if (!v) {return;}
          let ds=[]
          this.listBoHS.ds_bohoso_table.forEach(function(item){
          ds.push({
            bhs_id: item.bohs_id,
            dvgiao_id: item.donvi_giao_id,
            dvnext_id: item.dvnext_id,
            dvtt_id: item.dvtt_id,
            lhs_id: item.lohs_id,
            malhs: item.malo_hs,
            nv_nhan: item.nv_nhan,
            phieu_id: item.phieu_id,
            phieu_id_cha : item.phieu_cha_id,
            tthu_id : item.tuyenthu_id
            });
          });
          API.xacnhan_bohoso(this.axios, 
          {
            "danhsach": ds,
            "huonggiao_id": this.listBoHS.listItemChecked.huonggiao_id,
            "kieu":2, 
            "noidung": "",
            "xn_gv": this.params.quyen_dl
          }
          ).then((response) => {
          if(response.data.error_code === "BSS-00000000" && response.data.data !== undefined &&
              response.data.data.length > 0 && response.data.data ==="1") {
            this.$toast.success("Thực hiện xác nhận thành công");
            this.TIMKIEM();
          }
        });
        });
    },
    KIEMTRA_PHIEU(kieu){
      let dt = this.listBoHS.ds_bohoso_table;
      if(dt.length==0){
        this.$toast.warning("Không có danh sách phiếu để thực hiện")
        return false;
      }
      if(this.listBoHS.listItemChecked.length <=0){
        this.$toast.warning("Bạn chưa chọn phiếu để thực hiện")
        return false;
      }
      if(kieu != 1){
        return true;
      }
      return true;
    },
    CAPNHAT_FILE(){
      this.$refs.inputMaGD.focus();
      if(this.params.vbohs_id.length ==0){
        this.$toast.warning("Không tìm thấy bộ hồ sơ để thêm file.");
        return false;
      }
      if(this.listChiTietBoHS.loaifile == -1){
        this.$toast.warning("Bạn chưa chọn loại file.");
        return false;
      }
      if(this.listChiTietBoHS.duongdan.trim() =="" ){
        this.$toast.warning("Bạn chưa nhập đường dẫn file");
        return false;
      }
      /* if(this.button.btnNhapMoi == false){
        if(this.listChiTietBoHS.chitietbohs_table.length ==0){
          this.$toast.warning("Bạn bắt buộc phải gán thuê bao với loại file " +this.listChiTietBoHS.loaifile_options.filter(x =>x.id == this.listChiTietBoHS.loaifile)[0].text);
          return false;
        }
      } */
      this.$alert("Bạn có muốn upload file xác nhận của khách hàng cho mã GD: " + this.listTTTimKiem.ma_kh + " không ?", "Thông báo", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'Đồng ý',
        showCloseButton: true,
        type: "warning",
      }).then(async (v) => {
          if (!v) {return true;}
          this.fu_UploadCompleted();
        });
    },
    onMaKHEnter(){
      this.TIMKIEM();
    },
    async fu_UploadCompleted(){
      this.loading(true);
      if(!this.button.btnNhapMoi){
        await API.capnhat_file_hoso(this.axios, {
        "bohoso_id": this.params.vbohs_id,
        "file_id": 0,
        "file_url": this.listChiTietBoHS.duongdan,
        "files": [],
        "ghichu": this.listChiTietBoHS.ghichu,
        "hoso_id": 0,
        "kieu": 4,
        "loaifile_id": this.listTTTimKiem.loaifile
      }).then((response) => {
        if(response && response.data && response.data.data && response.data.error_code && response.data.error_code === 'BSS-00000000') {
           this.$toast.success("Thêm mới file hồ sơ thành công!");
              this.listChiTietBoHS.ghichu = "";
              this.listChiTietBoHS.duongdan = "";
              this.LOADFILE_HS(this.params.vbohs_id);
              this.THAOTAC_NUT(3)
        }else{
          //DeleteFileOnServer(vurl);
          this.$toast.error(response.data.message)
        }
      });
      }
      this.loading(false)
    },
    UploadFileHoSo(){
      let formData = new FormData();
        for (var file of this.$refs.files.files) {
          formData.append('files', file);
        }
        this.loading(true);
        API.upload_file_hoso(this.axios, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          if (response.data.error_code && response.data.error_code === 'BSS-00000000') {
            this.listChiTietBoHS.duongdan = response.data.data.join('|');
          }
        }).catch(function () {
          //console.log('Upload file hồ sơ không thành công!');
        }).finally(()=>{ this.loading(false); });
    },
    HOANTHANH(){
      let dt = [];
      if(this.listBoHS.ds_bohoso_table.length ==0){
        this.$toast.warning("Không có danh sách phiếu để thực hiện")
        return false;
      }
      this.listBoHS.ds_bohoso_table.forEach(function(item){
        dt.push({
          PHIEU_ID: item.phieu_id,
          BOHS_ID: item.bohs_id
        });
      });
      if(!dt.includes(1)){
        API.fn_nghiemthu_bhscapphat(this.axios, {
        "vkieu": 1,
        "vdanhsach": JSON.stringify(dt),
        "vngay_nt": moment(this.listTTHenKH.hentungay).format("DD/MM/YYYY"),
        "vghichu": this.listChiTietBoHS.ghichu
        }).then((response) => {
          if(response.data.error_code === "BSS-00000000" && response.data.data !== undefined && //response.data.data ==="1"
              response.data.data.length > 0) {
            this.$toast.success(response.data.data);
          }else{
            this.$toast.warning("Không có thông tin trả về khi thực hiện giao phiếu");
          }
        });
      }
    },
    async XOA_FILE(){
      try{
        let ischeck = this.listChiTietBoHS.listItemChecked.filter(x =>x.ischeck ==0);//ischeck ==1
       if(ischeck.length == 0){
         this.$toast.warning("Bạn phải chọn ít nhất một file để xóa")
       }else{
         this.$refs.inputMaGD.focus();
        let files=[];
        this.listChiTietBoHS.listItemChecked.forEach(function(item){
         files.push({
          file_id: item.file_id,
          hdtb_id: item. hdtb_id,
          thuebao_id: item. thuebao_id,
          trangthaihs_id: item. trangthaihs_id
         })
        });
        this.$alert("Bạn có chắc chắn xóa nhiều file hồ sơ được chọn không?", "Thông báo", {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy bỏ',
          showCloseButton: true,
          type: "warning",
        }).then(async (v) => {
          if (!v) {return;}
            await API.capnhat_file_hoso(this.axios, {
            "bohoso_id": this.params.vbohs_id,
            "file_id": files[0].file_id,
            "file_url": "",
            "files": files,
            "ghichu": this.listChiTietBoHS.ghichu,
            "hoso_id": 0,
            "kieu": 5,
            "loaifile_id": this.listTTTimKiem.loaifile
          }).then((response) => {
          if(response && response.data && response.data.data && response.data.error_code && response.data.error_code === 'BSS-00000000') {
            this.$toast.success("Xóa thành công file hồ sơ");
            this.LOADFILE_HS(this.params.vbohs_id);
          }else{
            this.$toast.error(response.data.message) 
          }
          });
        });
       } 
      }catch(error){} 
    },
    async HUYPHIEU(){
      let dt = [];
      if(this.listBoHS.ds_bohoso_table.length ==0){
        this.$toast.warning("Không có danh sách phiếu để thực hiện")
        return false;
      }
      this.listBoHS.ds_bohoso_table.forEach(function(item){
        dt.push({
          PHIEU_ID: item.phieu_id,
          BOHS_ID: item.bohs_id
        });
      });
      if(!dt.includes(1)){
        await API.fn_nghiemthu_bhscapphat(this.axios, {
        "vkieu": 2,
        "vdanhsach": JSON.stringify(dt),
        "vngay_nt": moment(this.listTTHenKH.hentungay).format("DD/MM/YYYY"),
        "vghichu": this.listChiTietBoHS.ghichu
        }).then((response) => {
          if(response.data.error_code === "BSS-00000000" && response.data.data !== undefined && //response.data.data ==="1"
              response.data.data.length > 0) {
            if(response.data.data==1){
              this.$toast.success("Hủy phiếu thành công");
              this.TIMKIEM();
            }
          }else{
            this.$toast.warning("Không có thông tin trả về khi thực hiện giao phiếu");
          }
        });
      }
    },
    btnLayTT_Click(){
     this.TIMKIEM();
    },
    btnNhapMoi_Click(){
      this.THAOTAC_NUT(1);
    },
    btnHuyPhieu_Click(){
      if(this.listBoHS.ds_bohoso_table.length ==0){
        this.$toast.warning("Không có danh sách phiếu để thực hiện")
        return false;
      }
      this.$alert("Bạn có muốn hủy danh sách phiếu này không?", "Thông báo", {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        showCloseButton: true,
        type: "warning",
      }).then(async (v) => {
          if (!v) {return;}
          this.HUYPHIEU();
        });
    },
    btnHuyBo_Click(){
      this.THAOTAC_NUT(3);
    },
    tsbtnXacNhan_Click(){
      this.XACNHAN_DS();
    },
    tsbtnHoanCong_Click(){
      this.HOANTHANH();
    },
    tsbtnThemFile_Click(){
      this.CAPNHAT_FILE()
    },
    btnXoaFile_Click(){
      this.XOA_FILE();
    },
    btnGiaoViec_Click(){
      let dsphieu =[];
      let dt = this.listBoHS.ds_bohoso_table;
      let ischeck = this.listBoHS.listItemChecked.ischeck ==1;//ischeck ==1
       this.listBoHS.ds_bohoso_table.forEach(function(item){
        dsphieu.push({
          PHIEU_ID: item.phieu_id
        });
      });
      if(dt.length ==0){
        this.$toast.warning("Không có danh sách để giao việc");
        return false;
      }
      if(ischeck.length == 0){
        this.$toast.warning("Bạn chưa chọn danh sách. Không thể giao việc");
        return false;
      }
      if(this.listTTGiaoViec.ndgiao.trim() == ""){
        this.$toast.warning("Bạn chưa điền nội dung giao");
        return false;
      }
      if(this.params.quyen_dl == 0){
        this.$toast.warning("Bạn không có quyền thao tác ");
        return false;
      }
       API.fn_capnhat_bhs_giaoviec(this.axios,{
        "p_ds": dsphieu,
        "p_nd_giao": this.listTTGiaoViec.ndgiao,
        "p_nhanvien_th_id": this.listTTGiaoViec.nvphaths,
        "p_quyen_dl_id": this.params.quyen_dl
       })
        .then((response) => {
          if (response.data.error_code === "BSS-00000000" && response.data.data.length > 0){
            this.$toast.success("Giao việc thành công ");
            this.HT_DS_GIAOVIEC(this.params.v_phieu_luoi);
          }else{
            this.$toast.error(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Có lỗi khi giao việc "+error)
        })
        .finally(() => {});
    },
    btnHenKH_Click(){
      if(this.listTTHenKH.hentungay > this.listTTHenKH.hendenngay){
        this.$toast.warning("Ngày hẹn từ phải nhỏ hơn hoặc bằng ngày hẹn đến");
        return false;
      }
      if(this.params.v_phieu_luoi.length == 0){
        this.$toast.warning("Bạn chưa chọn phiếu để thực hiện hẹn với khách hàng")
        return false;
      }
      if(this.listTTHenKH.lydoton == -1){
        this.$toast.warning("Bạn chưa chọn lý do tồn hẹn với khách hàng");
        return false;
      }
      if(this.listTTHenKH.ndhen.trim() == ""){
        this.$toast.warning("Bạn chưa nhập nội dung hẹn");
        return false;
      }
      API.fn_capnhat_bhs_hen_kh(this.axios, 
      {
        "lydotontc_id": this.listTTHenKH.lydoton,
        "p_bohs_id": this.params.vbohs_id,
        "p_nd_hen": this.listTTHenKH.ndhen,
        "p_ngayden": moment(this.listTTHenKH.hendenngay).format("DD/MM/YYYY HH:mm:ss"),
        "p_ngaytu": moment(this.listTTHenKH.hentungay).format("DD/MM/YYYY HH:mm:ss"),
        "p_phieu_id": this.params.v_phieu_luoi
      }
      ).then((response) => {
          if(response.data.error_code === "BSS-00000000" && response.data.data !== undefined && //response.data.data ==="1"
              response.data.data.length > 0) {
            this.$toast.success("Hẹn với KH thành công ");
            this.listTTHenKH.ndhen="";
            this.HT_DS_HENKH();
          }
        });
    },
    onDataCheckChiTietBoHS(data){
      this.listChiTietBoHS.listItemChecked = data;
    },
    onDataCheckDSBoHS(data) {
      this.listBoHS.listItemChecked = data;
      this.params.v_phieu_luoi = data.phieu_id;
      this.params.vbohs_id = this.listBoHS.listItemChecked.bohs_id;
      this.HT_DS_GIAOVIEC(this.params.v_phieu_luoi);
      this.LOADFILE_HS(this.params.vbohs_id);
       this.HT_DS_HENKH();
    },
    cboTrangThai_EditValueChanged(args){
      this.THAOTAC_NUT(3);
      if(args.id == 1){
        if(this.params.quyen_dl == 1){
          this.button.tsbtnXacNhan = true;
          this.button.btnGiaoViec = true;
          console.log(this.params.quyen_dl)
        }
        if(this.params.quyen_dl == 2){
          this.button.btnHenKH = true;
          this.button.btnNhapMoi = 1;
          this.button.btnXoaFile = 1;
          this.button.tsbtnXacNhan = 1;
          this.button.tsbtnHoanCong = 1;
          this.button.btnGiaoViec = true;
           console.log(this.params.quyen_dl)
        }else{
          this.button.btnHenKH = false;
          this.button.btnNhapMoi = 0;
          this.button.btnXoaFile = 0;
          this.button.tsbtnXacNhan = 0;
          this.button.tsbtnHoanCong = 0;
          this.button.btnGiaoViec = false;
           console.log(this.params.quyen_dl)
        }
      }else{
        this.button.btnHenKH = false;
        this.button.btnNhapMoi = 0;
        this.button.btnXoaFile = 0;
        this.button.tsbtnXacNhan = 0;
        this.button.tsbtnHoanCong = 0;
        this.button.btnGiaoViec = false;
        // console.log(args.id)
      }
    }

  },
};
</script>