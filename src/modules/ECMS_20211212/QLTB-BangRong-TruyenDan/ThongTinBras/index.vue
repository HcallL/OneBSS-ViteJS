<template src="./index.html"> </template>

<script>
import { maxLength, required, numeric } from "@vuelidate/validators";
export default {
  data() {
    return {
      brasData: {
          bras_id: 0,
          tenbras: "",
          caidat_md: "0",
          ip: "",
          bras_vdc_id: "",
          so_slot: "",
          so_subslot: "",
          used: false,
          slot_bd: "",
          subslot_bd: "",
          turack_id: 0,// Luôn có dữ liệu
          slot_visa: "",
          port_visa: "",
          slotbd: ""
      },
      currentItem:{},
      isEnable: true,
      isTaoMoi: false,
      isXoa: false,
      isGhiLai: false,
      isHuyBo: false,
    };
  },
  validations: {
    brasData:{
    tenbras: {
      required,
      maxLength: maxLength(100)
      },
      ip:{required} ,
      bras_vdc_id:{required},
      so_slot:{required} ,
      slot_bd:{required} ,
      so_subslot:{required} ,
      subslot_bd:{required} ,
      slot_visa:{required} ,
      port_visa:{required}
    }
    },
    methods: {
      bindData: function(bras_id){
          this.getChitietBras(bras_id)
          this.isEnable =false
      },
      getChitietBras: async function(id) {
        try {
          this.$root.showLoading(true);
          this.isTaoMoi = false;
          let data= await this.layBras(id)
          if (data != null) {
            let bras = data;
            this.brasData = {
              bras_id: bras.BRAS_ID,
              tenbras: bras.TENBRAS,
              caidat_md: bras.CAIDAT_MD,
              ip: bras.IP,
              bras_vdc_id: bras.BRAS_VDC_ID,
              so_slot: bras.SO_SLOT,
              so_subslot: bras.SO_SUBSLOT,
              used: bras.USED == 1 ? true : false,
              slot_bd: bras.SLOT_BD,
              subslot_bd: bras.SUBSLOT_BD,
              turack_id: bras.TURACK_ID,
              slot_visa: bras.SLOT_VISA,
              port_visa: bras.PORT_VISA,
              slotbd: bras.SLOT_BD
            };
          }
        } catch (error) {
        } finally {
          this.$root.showLoading(false);
        }
      },
      setTuRack_id: function(turack_id,isNew){
       this.brasData.turack_id = turack_id
       if(isNew)
       this.formNhapMoi()
      },
      themMoi: async function() {
        try {
          this.$root.showLoading(true);
          let rs = await this.$root.context.post(
            "web-ecms/quanlythietbi/themBras",
            this.brasData
          );
          if(rs.error_code=="BSS-00000000"){
            this.$root.toastSuccess('Thêm mới Bras thành công')
             this.currentItem={BRAS_ID : rs.data.bras_id,
                               TEN_BRAS : rs.data.tenbras,
                               TURACK_ID : rs.data.turack_id}
            return true
          }else{
            this.$root.toastError('Thêm mới Bras lỗi')
            return false
          }
        } catch (err) {
          this.$root.toastError(err.response.data.message_detail)
           return false
        } finally {
          this.$root.showLoading(false);
        }
      },
      capNhat: async function() {
        try {
          this.$root.showLoading(true);
          let rs = await this.$root.context.post(
            "web-ecms/quanlythietbi/capNhatBras",
            this.brasData
          );
           if(rs.error_code=="BSS-00000000"){
            this.$root.toastSuccess('Cập nhật Bras thành công')
            this.currentItem={BRAS_ID : this.brasData.bras_id,
                               TEN_BRAS : this.brasData.tenbras,
                               TURACK_ID :  this.brasData.turack_id,}
            return true
          }else{
            this.$root.toastError('Cập nhập Bras lỗi')
            return false
          }
        } catch (err) {
           this.$root.toastError(err.response.data.message_detail)
          return false
        } finally {
          this.$root.showLoading(false);
        }
      },
      xoa: async function() {
        try {

          this.$root.showLoading(true);
          let rs = await this.$root.context.post(
            "web-ecms/quanlythietbi/xoaBras",
            { id: this.brasData.bras_id }
          );
           if(rs.error_code=="BSS-00000000"){
            this.$root.toastSuccess('Xóa Bras thành công')
            return true
          }else{
            this.$root.toastError('Không thể xóa bản ghi này')
            return false
          }
        } catch (err) {
           this.$root.toastError(err.response.data.message_detail)
          return false
        } finally {
          this.$root.showLoading(false);
        }
      },
      ghiLai: async function() {
        if (this.brasData.used )
        this.brasData.used=1
        else
        this.brasData.used=0
        if(!this.validateData()){
        if (this.brasData.bras_id==0) return await this.themMoi();
        else return await this.capNhat();}
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
      formNhapMoi: function() {
        this.brasData = {
          bras_id: 0,
          tenbras: "",
          caidat_md: 0,
          ip: "",
          bras_vdc_id: 0,
          so_slot: "0",
          so_subslot: "0",
          used: false,
          slot_bd: "0",
          subslot_bd: "0",
          slot_visa: "0",
          port_visa: "0",
          slotbd: "0"
        };
        this.isEnable = true;
        this.$v.$reset();
      },
      formGhiLai:async function(){
         return await this.ghiLai()
      },
      formXoa:async function(){
         return await this.xoa()
      },
      validateData: function(data) {
        this.$v.$touch();
        let errorMessage = [];
        if (this.$v.$invalid) {
          if (!this.$v.brasData.tenbras.required)
            errorMessage.push("Tên Bras không được để trống !");
          if (!this.$v.brasData.tenbras.maxLength)
            errorMessage.push("Tên Bras không được quá 100 kí tự.");
          if (!this.$v.brasData.bras_vdc_id.required)
            errorMessage.push("ID Bras trên VDC không được để trống !");
          if (!this.$v.brasData.ip.required)
            errorMessage.push("IP Bras không được để trống !");
           if(this.brasData.used){
             if (!this.$v.brasData.so_slot.required)
             errorMessage.push("Tham số slot không được để trống !");
             if (!this.$v.brasData.slot_bd.required)
             errorMessage.push("Tham số slot bắt đầu không được để trống !");
              if (!this.$v.brasData.so_subslot.required)
             errorMessage.push("Tham số subslot không được để trống !");
             if (!this.$v.brasData.subslot_bd.required)
             errorMessage.push("Tham số subslot bắt đầu không được để trống !");
              if (!this.$v.brasData.slot_visa.required)
             errorMessage.push("Tham số slot visa không được để trống !");
             if (!this.$v.brasData.port_visa.required)
             errorMessage.push("Tham số port visa bắt đầu không được để trống !");
           }else{
             this.$v.brasData.so_slot.$reset()
             this.$v.brasData.slot_bd.$reset()
             this.$v.brasData.so_subslot.$reset()
             this.$v.brasData.subslot_bd.$reset()
             this.$v.brasData.slot_visa.$reset()
             this.$v.brasData.port_visa.$reset()
           }
          if (errorMessage.length > 0)
            this.$root.toastError(errorMessage.join("\n"));
          return true;
        }
        return false;
      },
      NumbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
      },
      formHuyBo: function(){
           this.$v.$reset();
       if (this.isTaoMoi) this.formNhapMoi();
            else this.getChitietBras(this.brasData.bras_id);
      }
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>
