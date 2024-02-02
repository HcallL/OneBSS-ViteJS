<template src='./index.html'></template>
<script>
import DsLamSwitchGpon from './DSLAM-Switch-Gpon'
import ThongTinBras from './ThongTinBras'
import ThongTinPortSwitch from './ThongTinPortSwitch'
import HuongKetNoi from './HuongKetNoi'
import EventBus from '@/utils/eventBus'
import ModalChuyenTram from './ChuyenTram/Modal'
import ModalLoaiDongBo from './LoaiDongBo/Modal'
import ModalDMDongBo from './DMDongBo/Modal'
import ModalDMRing from './DMRing/Modal'
import ModalDDCTruyenDan from './DDCTruyenDan/Modal'
import TuRack from './TuRack'
import DsLamFrame from './DSLAM-Frame'
import DsLamShelf from './DSLAM-Shelf'
import DsLamCard from './DSLAM-Card'
import DsLamModule from './DSLAM-Module'
import ThongTinFrameTD from './ThongTinFrameTruyenDan'
import ThongTinODF from './ThongTinODF'
import CaySoDoThietBi from "../CaySoDoThietBi/index.vue";
import ThietBi from "../CaySoDoThietBi/ThietBi";
const ACTION_VIEW = "VIEW";
const ACTION_NEW = "NEW";
export default {
    components: {
        DsLamSwitchGpon,
        ThongTinBras,
        ThongTinPortSwitch,
        HuongKetNoi,
        ModalChuyenTram,
        ModalLoaiDongBo,
        ModalDMDongBo,
        ModalDMRing,
        ModalDDCTruyenDan,
        TuRack,
        DsLamFrame,
        DsLamShelf,
        DsLamModule,
        DsLamCard,
        ThongTinFrameTD,
        ThongTinODF,
        CaySoDoThietBi
    },
    created:  function () {},
    data() {
      return {
      dataSend:null,
      currentItem:{},// Sẽ sử dụng để truyền dữ liệu
      kieuTu:2,
      turack_id: 0,
      view:0,
      modalThongBao: false,
      thongbao: "",
      dslam_id: 0,
      framedsl_id: 0,
      shelfdsl_id: 0,
      carddsl_id: 0,
      donvi_id: 0,
      menu:{
        tu_rack:false,  
        bras:false,
        shelf:false,
        dslamcard:false,
        dslam:false,
        mane:false,
        frametd:false,
        odf:false,
        gpon:false,
        frame:false,
        dslamRack:false,
        module:false,
        chuyenDslam:false,
        switch:false,
        new:true,
        delete:true,
        cancel:true,
        save:true
      },
    };
    },
    computed:{
      enabledSave: function () {
        return (
          this.currentItem.action == ACTION_NEW ||
          this.currentItem.action == ACTION_VIEW 
        );
      },
      enabledNew: function () {
        return this.currentItem.action == ACTION_VIEW;
      },
      enabledDelete: function () {
        return this.currentItem.action == ACTION_VIEW;
      },
      showEmpty: function () {
        return this.currentItem.itemID == undefined 
          &&  this.currentItem.itemType== undefined;
      },
      showTuRack: function() {
        return ( this.currentItem.itemID != undefined && this.currentItem.nhatram_id && this.currentItem.itemType == ThietBi.PRE_TURACK );
      },
      showDsLamSwitchGpon: function() {
        return ( this.currentItem.itemID != undefined && this.currentItem.turack_id && (
          this.currentItem.itemType == ThietBi.PRE_DSLAM || this.currentItem.itemType == ThietBi.PRE_GPON || this.currentItem.itemType == ThietBi.PRE_SWITCH) );
      },
      showBras: function () {
        return (
          this.currentItem.itemID != undefined &&
          this.currentItem.itemType == ThietBi.PRE_BRAS
        );
      },
      showPortSwitch: function(){
        return (
          this.currentItem.itemID != undefined &&(
          this.currentItem.itemType == ThietBi.PRE_SWITCH_PORT
          || this.currentItem.itemType == ThietBi.PRE_SWITCH_CARD_PORT )
          && !this.currentItem.upLink
        );
      },
      showHKN: function(){
        return (
          this.currentItem.itemID != undefined &&(
            this.currentItem.itemType == ThietBi.PRE_SWITCH_PORT
          || this.currentItem.itemType == ThietBi.PRE_SWITCH_CARD_PORT
          || this.currentItem.itemType == ThietBi.PRE_GPON_CARD_PORT
          || this.currentItem.itemType == ThietBi.PRE_MANE_CARD_PORT
          || this.currentItem.itemType == ThietBi.PRE_MANE_CARD_MODULE_PORT
          || this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_PORT
          || this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE_PORT )
          && this.currentItem.upLink
        );
      },
      showFrameTD: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.nhatram_id && this.currentItem.turack_id && this.currentItem.itemType == ThietBi.PRE_FRAME)
      },
      showODF: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.turack_id != undefined && this.currentItem.itemType == ThietBi.PRE_ODF)
      },
      showDsLamFrame: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.dslam_id && this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME)
      },
      showDsLamShelf: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.framedsl_id && this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF)
      },
      showDsLamCard: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.shelfdsl_id && this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD)
      },
      showDsLamModule: function() {
        return (this.currentItem.itemID != undefined && this.currentItem.carddsl_id && this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE)
      },
    },
    methods:{
    //#region  "CRUD"
      btnNhapMoi_Click: function () {
        this.currentItem.itemID = 0;
        this.currentItem.action = ACTION_NEW;
        if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
          this.$refs.formTuRack.themMoi();
        } 
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM || this.currentItem.itemType == ThietBi.PRE_GPON || this.currentItem.itemType == ThietBi.PRE_SWITCH) {
          this.$refs.formDsLamSwitchGpon.themMoi();
        }
        else if (this.currentItem.itemType == ThietBi.PRE_BRAS) {
          this.$refs.formBras.formNhapMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_FRAME) {
          this.$refs.formFrameTD.themMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_ODF) {
          this.$refs.formODF.themMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME) {
          this.$refs.formDsLamFrame.themMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF) {
          this.$refs.formDsLamShelf.themMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD) {
          this.$refs.formDsLamCard.themMoi()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE) {
          this.$refs.formDsLamModule.themMoi()
        }
      },
      btnGhiLai_Click:async function () {
         this.isGhiLai = true;
         this.isXoa = false;
         this.modalThongBao = true;
         this.thongbao = "Bạn có muốn cập nhật dữ liệu?";
      },
      ghiLai:async function(){
        try{
           this.$root.showLoading(true)
           if (this.currentItem.itemType == ThietBi.PRE_TURACK) {          
            let rs = await this.$refs.formTuRack.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formTuRack.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  this.$refs.formTuRack.currentItem.tentu,
                  this.$refs.formTuRack.currentItem.nhatram_id,
                  ThietBi.PRE_DONVI,
                  true
                );
                this.currentItem.itemID = this.$refs.formTuRack.currentItem.turack_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formTuRack.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  this.$refs.formTuRack.currentItem.tentu,
                  this.$refs.formTuRack.currentItem.nhatram_id,
                  ThietBi.PRE_DONVI,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM || this.currentItem.itemType == ThietBi.PRE_GPON || this.currentItem.itemType == ThietBi.PRE_SWITCH) {
            let rs = await this.$refs.formDsLamSwitchGpon.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formDsLamSwitchGpon.currentItem.dslam_id,
                  this.currentItem.itemType,
                  this.$refs.formDsLamSwitchGpon.currentItem.ten_dslam,
                  this.$refs.formDsLamSwitchGpon.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
                this.currentItem.itemID = this.$refs.formDsLamSwitchGpon.currentItem.dslam_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formDsLamSwitchGpon.currentItem.dslam_id,
                  this.currentItem.itemType,
                  this.$refs.formDsLamSwitchGpon.currentItem.ten_dslam,
                  this.$refs.formDsLamSwitchGpon.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_BRAS) {              
               let rs = await this.$refs.formBras.formGhiLai();
           if (rs == true) {
            if (this.currentItem.itemID == 0) {
              this.$refs.caySoDoThietBi.addNode(
                this.$refs.formBras.currentItem.BRAS_ID,
                ThietBi.PRE_BRAS,
                this.$refs.formBras.currentItem.TEN_BRAS,
                this.$refs.formBras.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                true
              );
              this.currentItem.itemID =
                this.$refs.formBras.currentItem.BRAS_ID;
            } else {
              this.$refs.caySoDoThietBi.updateNode(
                this.$refs.formBras.currentItem.BRAS_ID,
                ThietBi.PRE_BRAS,
                this.$refs.formBras.currentItem.TEN_BRAS,
                this.$refs.formBras.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                true
              );
            }
            this.currentItem.action = ACTION_VIEW;  
           }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_FRAME) {
            let rs = await this.$refs.formFrameTD.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formFrameTD.currentItem.frame_id,
                  ThietBi.PRE_FRAME,
                  this.$refs.formFrameTD.currentItem.tenFrame,
                  this.$refs.formFrameTD.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
                this.currentItem.itemID = this.$refs.formFrameTD.currentItem.frame_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formFrameTD.currentItem.frame_id,
                  ThietBi.PRE_FRAME,
                  this.$refs.formFrameTD.currentItem.tenFrame,
                  this.$refs.formFrameTD.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_ODF) {
            let rs = await this.$refs.formODF.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formODF.currentItem.odf_id,
                  ThietBi.PRE_ODF,
                  this.$refs.formODF.currentItem.ten_odf,
                  this.$refs.formODF.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
                this.currentItem.itemID = this.$refs.formODF.currentItem.odf_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formODF.currentItem.odf_id,
                  ThietBi.PRE_ODF,
                  this.$refs.formODF.currentItem.ten_odf,
                  this.$refs.formODF.currentItem.turack_id,
                  ThietBi.PRE_TURACK,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME) {
            let rs = await this.$refs.formDsLamFrame.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formDsLamFrame.currentItem.framedsl_id,
                  ThietBi.PRE_DSLAM_FRAME,
                  this.$refs.formDsLamFrame.currentItem.tenFrame,
                  this.$refs.formDsLamFrame.currentItem.dslam_id,
                  ThietBi.PRE_DSLAM,
                  true
                );
                this.currentItem.itemID = this.$refs.formDsLamFrame.currentItem.framedsl_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formDsLamFrame.currentItem.framedsl_id,
                  ThietBi.PRE_DSLAM_FRAME,
                  this.$refs.formDsLamFrame.currentItem.tenFrame,
                  this.$refs.formDsLamFrame.currentItem.dslam_id,
                  ThietBi.PRE_DSLAM,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF) {
            let rs = await this.$refs.formDsLamShelf.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formDsLamShelf.currentItem.shelfdsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF,
                  this.$refs.formDsLamShelf.currentItem.ten_shelf,
                  this.$refs.formDsLamShelf.currentItem.framedsl_id,
                  ThietBi.PRE_DSLAM_FRAME,
                  true
                );
                this.currentItem.itemID = this.$refs.formDsLamShelf.currentItem.shelfdsl_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formDsLamShelf.currentItem.shelfdsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF,
                  this.$refs.formDsLamShelf.currentItem.ten_shelf,
                  this.$refs.formDsLamShelf.currentItem.framedsl_id,
                  ThietBi.PRE_DSLAM_FRAME,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD) {
            let rs = await this.$refs.formDsLamCard.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formDsLamCard.currentItem.carddsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
                  this.$refs.formDsLamCard.currentItem.tenCard,
                  this.$refs.formDsLamCard.currentItem.shelfdsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF,
                  true
                );
                this.currentItem.itemID = this.$refs.formDsLamCard.currentItem.carddsl_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formDsLamCard.currentItem.carddsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
                  this.$refs.formDsLamCard.currentItem.tenCard,
                  this.$refs.formDsLamCard.currentItem.shelfdsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
          else if(this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE) {
            let rs = await this.$refs.formDsLamModule.ghiLai();
            if(rs) {
              if(!this.currentItem.itemID) {
                this.$refs.caySoDoThietBi.addNode(
                  this.$refs.formDsLamModule.currentItem.moduledsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE,
                  this.$refs.formDsLamModule.currentItem.loai_module,
                  this.$refs.formDsLamModule.currentItem.carddsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
                  true
                );
                this.currentItem.itemID = this.$refs.formDsLamModule.currentItem.moduledsl_id;
              }
              else {
                this.$refs.caySoDoThietBi.updateNode(
                  this.$refs.formDsLamModule.currentItem.moduledsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE,
                  this.$refs.formDsLamModule.currentItem.loai_module,
                  this.$refs.formDsLamModule.currentItem.carddsl_id,
                  ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
                  true
                );
              }
              this.currentItem.action = ACTION_VIEW;
            }
          }
        }catch(e){
        }finally{
           this.$root.showLoading(false)
        }
      },
      btnHuy_Click: function () {
        if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
          this.$refs.formTuRack.clearForm();
        } 
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM || this.currentItem.itemType == ThietBi.PRE_GPON || this.currentItem.itemType == ThietBi.PRE_SWITCH) {
          this.$refs.formDsLamSwitchGpon.clearForm();
        }
        else if (this.currentItem.itemType == ThietBi.PRE_BRAS) {
          this.$refs.formBras.formHuyBo()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_FRAME) {
          this.$refs.formFrameTD.clearForm()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_ODF) {
          this.$refs.formODF.clearForm()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME) {
          this.$refs.formDsLamFrame.clearForm()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF) {
          this.$refs.formDsLamShelf.clearForm()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD) {
          this.$refs.formDsLamCard.clearForm()
        }
        else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE) {
          this.$refs.formDsLamModule.clearForm()
        }
      },
      btnXoa_Click:async function () {
        this.isGhiLai = false;
         this.isXoa = true;
         this.modalThongBao = true;
         this.thongbao = "Bạn có muốn xóa dữ liệu không?";
      },
      xoa: async function(){
        try {
          this.$root.showLoading(true);
          if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
            let rs = await this.$refs.formTuRack.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_TURACK
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM || this.currentItem.itemType == ThietBi.PRE_GPON || this.currentItem.itemType == ThietBi.PRE_SWITCH) {
            let rs = await this.$refs.formDsLamSwitchGpon.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                this.currentItem.itemType
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_BRAS) {
            let rs = await this.$refs.formBras.formXoa();
            if (rs == true) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_BRAS
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_FRAME) {
            let rs = await this.$refs.formFrameTD.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_FRAME
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_ODF) {
            let rs = await this.$refs.formODF.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_ODF
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME) {
            let rs = await this.$refs.formDsLamFrame.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_DSLAM_FRAME
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF) {
            let rs = await this.$refs.formDsLamShelf.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_DSLAM_FRAME_SHELF
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD) {
            let rs = await this.$refs.formDsLamCard.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_DSLAM_FRAME_SHELF_CARD
              );
              this.currentItem = {};
            }
          }
          else if (this.currentItem.itemType == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE) {
            let rs = await this.$refs.formDsLamModule.xoa();
            if(rs) {
              this.$refs.caySoDoThietBi.deleteNode(
                this.currentItem.itemID,
                ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE
              );
              this.currentItem = {};
            }
          }
        } finally {
          this.$root.showLoading(false);
        }
      },
      xacNhan:async function() {
        if (this.isGhiLai) this.ghiLai();
        else if (this.xoa) this.xoa();
      },
      caySoDoThietBi_nodeSelected: async function (args) {
        console.log('args:',args)
        if(args!=null && args.itemData!=null){
        this.$root.showLoading(true);
        try {
        let type = args.itemData.itemType
        let id = args.itemData.itemID
        await this.showMenu(type,args.node.ariaLevel)
        if ( type == ThietBi.PRE_DONVI) {
          this.donvi_id = id;
        }
        else if ( type == ThietBi.PRE_TURACK) {  
          this.turack_id  = id // Để lưu giữ tủ rack id dùng cho các form khác
          // this.show_TuRack(id)
          this.currentItem = {
            itemID: id,
            nhatram_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_TURACK,
            action: ACTION_VIEW
          };
          await this.$refs.formTuRack.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_ODF){
          let rs = await this.layTuRack(args.itemData.itemParentID);
          this.currentItem = {
            itemID: id,
            nhatram_id: rs.DONVI_ID,
            turack_id: 0,
            itemType: ThietBi.PRE_ODF,
            action: ACTION_VIEW
          };
          await this.$refs.formODF.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_BRAS){
           this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_BRAS,
            action: ACTION_VIEW,
          };
          await this.$refs.formBras.bindData(args.itemData.itemID);
        }
        else if(type == ThietBi.PRE_BRAS_CARD){
           this.show_Bras_Card(id)
        }
        else if(type == ThietBi.PRE_BRAS_CARD_PORT){
           this.showBras_Card_Port(id)
        }
        else if(type == ThietBi.PRE_GPON){
          //  this.show_Gpon(id)
          this.dslam_id = id;
          this.currentItem = {
            itemID: id,
            loaiTb_id: 3,
            turack_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_GPON,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamSwitchGpon.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_GPON_CARD){
           this.show_Gpon_Card(id)
        }
        else if(type == ThietBi.PRE_GPON_CARD_PORT){         
           let rs = await this.layGponCard(args.itemData.itemParentID)
           if(rs==null)
           return
           let port = await this.layGponPort(args.itemData.itemID)
           if(port==null)
           return
           let edit=false
            if(rs==null || port==null)
            return
          if(rs.NHOMCARD_ID ==2 || rs.NHOMCARD_ID ==3){
            // form Hướng Kết Nối
            if(port.LINK_CODE == 0){
              if(port.TT_PORT_ID != 1 && Port.TT_PORT_ID != 5)
              return
            }
            if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_GPON_CARD_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:rs.TEN_CARD,
              thietbi_n_id:rs.GPON_ID,
              loai_tbi_n:3, //GPON:3
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_GPON_CARD_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
          }else{
            // Hiển thị frmGpon_Port
          }
        }
        else if(type == ThietBi.PRE_MANE){
           this.show_Mane(id)
        }
        else if(type == ThietBi.PRE_MANE_CARD){
           this.show_Mane_Card(id)
        }
        else if(type == ThietBi.PRE_MANE_CARD_PORT){
           // Hiển thị form upLink
            let edit=false
            let card= await this.layManeCard(args.itemData.itemParentID)
            if(card==null)
            return
            let port = await this.layManePort(args.itemData.itemID)
            if(port==null)
            return
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_MANE_CARD_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:card.LOAI_CARD,
              thietbi_n_id:card.DSLAM_ID,
              loai_tbi_n:17, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_MANE_CARD_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
        }
        else if(type == ThietBi.PRE_MANE_CARD_MODULE){
           this.show_Mane_Card_Module(id)
        }
        else if(type == ThietBi.PRE_MANE_CARD_MODULE_PORT){
          // Hiển thị form upLink
            let edit=false
            let module= await this.layManeModule(args.itemData.itemParentID)
            if(module==null)
            return
            let port = await this.layManeModulePort(args.itemData.itemID)
            if(port==null)
            return
            if(port.LINK_CODE == 0){
              if(port.TT_PORT_ID != 1 && Port.TT_PORT_ID != 5)
              return
            }
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_MANE_CARD_MODULE_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:module.LOAI_MODULE,
              thietbi_n_id:0,//module.MODULEMANE_ID,
              loai_tbi_n:17, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_MANE_CARD_MODULE_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
        }
        else if(type == ThietBi.PRE_SWITCH){
          //  this.show_Switch(id)
          this.dslam_id = id;
          this.currentItem = {
            itemID: id,
            loaiTb_id: 3,
            turack_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_SWITCH,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamSwitchGpon.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_SWITCH_PORT){
          let rs = await this.checkPortSwitch(args.itemData.itemID) 
          if(rs >0){
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_SWITCH_PORT,
            action: ACTION_VIEW,
            upLink: false
          };
          await this.$refs.formPortSwitch.bindData(args.itemData.itemID,0);
          }else{
            // Hiển thị form upLink
            let edit=false
            let port = await this.laySwitchPort(args.itemData.itemID)
            if(port==null)
            return
            let sw = await this.layDslamGponSwitch(args.itemData.itemParentID,2)
            if(sw==null)
            return 
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_SWITCH_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:sw.TENDSLAM,
              thietbi_n_id:sw.DSLAM_ID,
              loai_tbi_n:2, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_SWITCH_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
          }
        }
        else if(type == ThietBi.PRE_SWITCH_CARD){
          this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_SWITCH_CARD,
            action: ACTION_VIEW,
          };
          
          // this.show_Switch_Card(id)
        }
        else if(type == ThietBi.PRE_SWITCH_CARD_PORT){
          let rs = await this.laySwitchCard(args.itemData.itemParentID) 
          if(!(rs.NHOMCARD_ID == 2 || rs.NHOMCARD_ID == 3)){
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_SWITCH_CARD_PORT,
            action: ACTION_VIEW,
            upLink: false
          };
          await this.$refs.formPortSwitch.bindData(args.itemData.itemID,1);
          }else{
            // Hiển thị form upLink
            let edit=false
            let cardsw= await this.laySwitchCard(args.itemData.itemParentID)
            if(cardsw==null)
            return
            let sw = await this.layDslamGponSwitch(cardsw.SWITCH_ID,2)
             if(sw==null)
             return
            let port = await this.laySwitchPort(args.itemData.itemID)
            if(port==null)
            return
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_SWITCH_CARD_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:sw.TENDSLAM,
              thietbi_n_id:sw.DSLAM_ID,
              loai_tbi_n:2, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_SWITCH_CARD_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);          
          }
        }
        else if(type == ThietBi.PRE_DSLAM){
          //  this.show_Dslam(id)
          this.dslam_id = id;
          this.currentItem = {
            itemID: id,
            loaiTb_id: 1,
            turack_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_DSLAM,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamSwitchGpon.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_DSLAM_FRAME){
          //this.show_Dslam_Frame(id)
          this.framedsl_id = id;
          this.currentItem = {
            itemID: id,
            dslam_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_DSLAM_FRAME,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamFrame.bindData(this.currentItem);
        } 
        else if(type == ThietBi.PRE_DSLAM_FRAME_SHELF){
          //  this.show_Dslam_Frame_Shelf(id)
          this.shelfdsl_id = id;
          this.currentItem = {
            itemID: id,
            framedsl_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_DSLAM_FRAME_SHELF,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamShelf.bindData(this.currentItem);
        }
        else if(type == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD){
          //this.show_Dslam_Frame_Shelf_Card(id)
          this.carddsl_id = id;
          this.currentItem = {
            itemID: id,
            shelfdsl_id: args.itemData.itemParentID,
            vitri: 1,
            itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamCard.bindData(this.currentItem);
        }     
        else if(type == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_PORT){
              // Hiển thị form upLink
            let edit=false
            let card= await this.layDslamCard(args.itemData.itemParentID)
            if(card==null)
            return
            let port = await this.layDslamPort(args.itemData.itemID)
            if(port==null)
            return
            if(port.LINK_CODE == 0){
              if(port.TT_PORT_ID != 1 && Port.TT_PORT_ID != 5)
              return
            }
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:card.LOAI_CARD,
              thietbi_n_id:0,//card.DSLAM_ID,
              loai_tbi_n:1, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
        }
        else if(type == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE){
          //this.show_Dslam_Frame_Shelf_Card_Module(id)
           this.currentItem = {
            itemID: id,
            carddsl_id: args.itemData.itemParentID,
            itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE,
            action: ACTION_VIEW
          };
          await this.$refs.formDsLamModule.bindData(this.currentItem);
        }     
        else if(type == ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE_PORT){
             // Hiển thị form upLink
            let edit=false
            let module= await this.layDslamModule(args.itemData.itemParentID)
            if(module==null)
            return
            let port = await this.layDslamModulePort(args.itemData.itemID)
            if(port==null)
            return
            if(port.LINK_CODE == 0){
              if(port.TT_PORT_ID != 1 && Port.TT_PORT_ID != 5)
              return
            }
             if(port.LINK_CODE == 1 || port.LINK_CODE == 2)
              edit=true
            let data={
               connect:port.LINK_CODE,
               view:1,
               port_DsLam:{
               vitri:port.VITRI,
               ma_dslamPort:port.PORTVL_ID
               },
              edit:edit,
              fkey:ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE_PORT+"_"+port.PORTVL_ID,
              ten_tbi_nguon:module.LOAI_MODULE,
              thietbi_n_id:0,//module.MODULEDSL_ID,
              loai_tbi_n:1, //DSLAM:1;SWITCH:2;GPON:3;MANE:17
              loai_tbi_d:0,
              port_dich:0    
            }
            this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE_PORT,
            action: ACTION_VIEW,
            upLink: true
          };
          await this.$refs.formHKN.bindData(data);
        }
        else if(type == ThietBi.PRE_FRAME){
          //  this.show_Frame(id)
          let rs = await this.layTuRack(args.itemData.itemParentID);
           this.currentItem = {
            itemID: id,
            turack_id: args.itemData.itemParentID,
            nhatram_id: rs.DONVI_ID,
            itemType: ThietBi.PRE_FRAME,
            action: ACTION_VIEW
          };
          await this.$refs.formFrameTD.bindData(this.currentItem);
        }     
        else if(type == ThietBi.PRE_FRAME_CARD){
           this.show_Frame_Card(id)
        }     
        else {
         this.currentItem = {};
        }} 
        finally {
          this.$root.showLoading(false);
        }
      }
      },
      showMenu:async function(code,level){
        this.menu={
      tu_rack:false,  
      bras:false,
      shelf:false,
      dslamcard:false,
      dslam:false,
      mane:false,
      frametd:false,
      odf:false,
      gpon:false,
      frame:false,
      dslamRack:false,
      module:false,
      chuyenDslam:false,
      switch:false,
      new:true,
      delete:true,
      cancel:true,
      save:true
      }
         if(level=='1'||level=='2')
         return
         switch(code){
           case ThietBi.PRE_DONVI :
             this.menu.tu_rack = true
             break;
           case ThietBi.PRE_TURACK:
             this.menu.bras= true
             this.menu.dslam= true
             this.menu.gpon= true
             this.menu.switch= true
             this.menu.mane= true
             this.menu.odf= true
             this.menu.frametd= true
             break  
           case ThietBi.PRE_DSLAM:
             this.menu.frame= true
             this.menu.chuyenDslam= true
             break
           case ThietBi.PRE_FRAME:
             this.menu.chuyenDslam= true
             break  
           case ThietBi.PRE_ODF:
             this.menu.chuyenDslam= true
             break 
            case ThietBi.PRE_FRAME:
             this.menu.shelf= true
             break  
            case ThietBi.PRE_DSLAM_FRAME_SHELF_CARD:
             this.menu.module= true
             this.menu.cancel=false
             this.menu.new=false
             break 
            case ThietBi.PRE_MANE_CARD:
             this.menu.module= true
             this.menu.cancel=false
             this.menu.new=false
             break 
            case ThietBi.PRE_GPON_CARD:
             this.menu.cancel=false
             this.menu.new=false
             break  
            case ThietBi.PRE_FRAME_CARD:
             this.menu.cancel=false
             this.menu.new=false
             break   
            case ThietBi.PRE_MANE:
             this.menu.chuyenDslam= true
             break
            case ThietBi.PRE_SWITCH_CARD_PORT:
             this.menu.cancel=false
             this.menu.new=false
             this.menu.delete=false
             this.menu.save=false
             break   
             case ThietBi.PRE_DSLAM_FRAME_SHELF:
             this.menu.dslamcard=true
             this.menu.new=false
             this.menu.cancel=false
             break   
             default:
             break
         }
      },
      //#endregion
     
     //#region "Show thông tin"
      thongTinBras: function(){
        this.$refs.formBras.setTuRack_id(this.turack_id, true)
        this.currentItem={itemID : 0,
                  itemType : ThietBi.PRE_BRAS,
                  action: ACTION_NEW,}
      },
      thongTinDslam: function() {
        this.currentItem={
          itemID : 0,
          loaiTb_id: 1,
          turack_id: this.turack_id,
          itemType : ThietBi.PRE_DSLAM,
          action: ACTION_NEW
        }
        this.$refs.formDsLamSwitchGpon.setTuRack_id(this.turack_id, this.currentItem.loaiTb_id);
      },
      thongTinFrameTD: async function() {
        let rs = await this.layTuRack(this.turack_id);
        this.currentItem={
          itemID : 0,
          turack_id: this.turack_id,
          nhatram_id: rs.DONVI_ID,
          itemType : ThietBi.PRE_FRAME,
          action: ACTION_NEW
        }
        this.$refs.formFrameTD.bindData(this.currentItem);
      },
      thongTinODF: async function() {
        let rs = await this.layTuRack(this.turack_id);
        this.currentItem={
          itemID : 0,
          turack_id: this.turack_id,
          nhatram_id: rs.DONVI_ID,
          itemType : ThietBi.PRE_ODF,
          action: ACTION_NEW
        }
        this.$refs.formODF.bindData(this.currentItem);
      },
      thongTinDslamFrame: async function() {
        this.currentItem={
          itemID : 0,
          dslam_id: this.dslam_id,
          itemType : ThietBi.PRE_DSLAM_FRAME,
          action: ACTION_NEW
        }
        this.$refs.formDsLamFrame.bindData(this.currentItem);
      },
      thongTinDslamShelf: async function() {
        this.currentItem={
          itemID: 0,
          framedsl_id: this.framedsl_id,
          itemType: ThietBi.PRE_DSLAM_FRAME_SHELF,
          action: ACTION_VIEW
        }
        this.$refs.formDsLamShelf.bindData(this.currentItem);
      },
      thongTinDslamCard: async function() {
        this.currentItem = {
          itemID: 0,
          shelfdsl_id: this.shelfdsl_id,
          vitri: 1,
          itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
          action: ACTION_VIEW
        };
        await this.$refs.formDsLamCard.bindData(this.currentItem);
      },
      thongTinDslamModule: async function() {
        this.currentItem = {
          itemID: 0,
          carddsl_id: this.carddsl_id,
          itemType: ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE,
          action: ACTION_VIEW
        };
        await this.$refs.formDsLamModule.bindData(this.currentItem);
      },
      thongTinGPON: function() {
        this.currentItem={
          itemID : 0,
          loaiTb_id: 3,
          turack_id: this.turack_id,
          itemType : ThietBi.PRE_GPON,
          action: ACTION_NEW
        }
        this.$refs.formDsLamSwitchGpon.setTuRack_id(this.turack_id, this.currentItem.loaiTb_id);
      },
      thongTinSwitch: function() {
        this.currentItem={
          itemID : 0,
          loaiTb_id: 2,
          turack_id: this.turack_id,
          itemType : ThietBi.PRE_GPON,
          action: ACTION_NEW
        }
        this.$refs.formDsLamSwitchGpon.setTuRack_id(this.turack_id, this.currentItem.loaiTb_id);
      },
      thongTinTuRack: async function() {
        this.currentItem = {
            itemID: 0,
            nhatram_id: this.donvi_id,
            itemType: ThietBi.PRE_TURACK,
            action: ACTION_VIEW
          };
          await this.$refs.formTuRack.bindData(this.currentItem);
      },
     //#endregion
    //#region "Hàm show node"
    show_TuRack: async function(id){
       let itemData = await this.layTuRack(id);
          if (itemData != null) {        
            this.currentItem = {
              // donvi_id: 6,
              // toql_id: 179,
              turack_id: itemData.TURACK_ID,
              kieu: itemData.KIEUTU,
              nhatram_id: itemData.DONVI_ID,
            };   
            // let obj= { donvi_id: 6,
            //   toql_id: 179,
            //   nhatram_id: 674,
            //   kieu: 2,
            //   turack_id: 1502 }  

          await this.$refs.formBras.bindData(args.itemData.itemID);
          }
    },
    show_Odf: async function(id){
     let itemData = await this.layOdf(id);
    },
    show_Bras: async function(id){
    let itemData = await this.layBras(id);
    },
    show_Bras_Card: async function(id){
     let itemData = await this.layBrasCard(id);
    },
    show_Bras_Card_Port: async function(id){
    let itemData = await this.layBrasPort(id);
    },
    show_Gpon: async function(id){
     let itemData = await this.layDslamGponSwitch(id,3);
    },
    show_Gpon_Card: async function(id){
     let itemData = await this.layGponCard(id);
    },
    show_Gpon_Card_Port: async function(id){
      let itemData = await this.layGponPort(id);
    },
    show_Mane: async function(id){
     let itemData = await this.layDslamGponSwitch(id,17);
    },
    show_Mane_Card: async function(id){
     let itemData = await this.layManeCard(id);
    },
    show_Mane_Card_Port: async function(id){
      let itemData = await this.layManePort(id);
    },
    show_Mane_Card_Module: async function(id){
      let itemData = await this.layManeModule(id);
    },
    show_Mane_Card_Module_Port: async function(id){
      let itemData = await this.layManeModulePort(id);
    },
    show_Switch: async function(id){
      let itemData = await this.layDslamGponSwitch(id,2);
    },
    show_Switch_Port: async function(id){
      let itemData = await this.laySwitchPort(id);
    },
    show_Switch_Card: async function(id){
    let itemData = await this.laySwitchCard(id);
    },
    show_Switch_Card_Port: async function(id){
    let itemData = await this.laySwitchCardPort(id);
    },
    show_Dslam: async function(id){
    let itemData = await this.layDslamGponSwitch(id,1);
    },
    show_Dslam_Frame: async function(id){
    let itemData = await this.layDslamFrame(id);
    },
    show_Dslam_Frame_Shelf: async function(id){
    let itemData = await this.layDslamShelf(id);
    },
    show_Dslam_Frame_Shelf_Card: async function(id){
    let itemData = await this.layDslamCard(id);
    },
    show_Dslam_Frame_Shelf_Card_Port: async function(id){
    let itemData = await this.layDslamPort(id);
    },
    show_Dslam_Frame_Shelf_Card_Module: async function(id){
    let itemData = await this.layDslamModule(id);
    },
    show_Dslam_Frame_Shelf_Card_Module_Port: async function(id){
    let itemData = await this.layDslamModulePort(id);
    },
    show_Frame: async function(id){
    let itemData = await this.layFrameTruyenDan(id);
    },
    show_Frame_Card: async function(id){
    let itemData = await this.layFrameCard(id);
    },
    //#endregion
    
    //#region "Hàm lấy api đối tượng theo id"
    layTuRack: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/danhmuc/turack/chitiet",
        {
          turack_id: id
        })
      return result.data; 
      }catch(e){
        return null
      }
    },
    layBras: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/bras-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layBrasCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/bras-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layBrasPort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/bras-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamGponSwitch: async function(id,loaitbi){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/bras-theo-id",{
          id:id,
          loaitbi:loaitbi
        })       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layGponCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/gpon-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layGponPort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/gpon-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layManeCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/mane-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layManePort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/mane-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layManeModule: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/mane-module-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layManeModulePort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/mane-module-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    laySwitchCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/switch-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    laySwitchPort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/switch-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
     laySwitchCardPort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/switch-card-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamFrame: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-frame-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamShelf: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-shelf-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamPort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamModule: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-module-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layDslamModulePort: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/dslam-module-port-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layFrameTruyenDan: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/frame-td-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layFrameCard: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/frame-card-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    layOdf: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/odf-theo-id/"+id)       
      return result.data; 
      }catch(e){
        return null
      }
    },
    checkPortSwitch: async function(id){ 
      try{
      let result = await this.$root.context.get(
        "/web-ecms/thietbi-truyendan/check-port-switch/"+id)       
      return result.data.RS; 
      }catch(e){
        return 0
      }
    },
    //#endregion
    
    },
    watch: {},
    async mounted(){
      try {
        this.loading(true);
          let vm= this
          await vm.$refs['caySoDoThietBi'].loadNodes()
      } catch (error) {
        
      } finally {
        this.loading(false);
      }
      },
      destroyed() {
      }
}
</script>
<style>
a.disable-btn {
  pointer-events: none;
  cursor: default;
  color: #6c757d !important;
}
</style>
