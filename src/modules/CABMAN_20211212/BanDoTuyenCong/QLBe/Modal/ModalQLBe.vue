<template src="./ModalQLBe.html"></template>
<script>
import moment from 'moment'
import ModalAnhChup from '../../AnhChup/Modal'
import ModalCsht from '../../Csht/Modal'
import ModalChonDiaChi from "../../ChonDiaChi/Modal"
// import ToaDo from "../../../BanDoTuyenCot/ToaDo/Modal"
import ToaDo from '../../ToaDo/Modal'
import {minLength,maxLength,numeric, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
    name: "ModalQLBe",
    props: ["modalId", "data"],
    components: {ToaDo,ModalChonDiaChi,ModalCsht, ModalAnhChup, moment},
    data: function () {
        return {
            fields: { text: "TEN_DV", value: "donViId" },
            //cotid: 0,
            dsChuQuan:[],
            dsLoaiBC:[],
            dsViTriDB:[],
            dsHuongTD:[],
            dsLoaiDuong:[],
            dsTaiSan:[],
            dsDuAn:[],
            dsTTSD:[],
            dataSend:{},
            dataSelected: {
                beCapId:null,
                loaiBeCapId: 1,
                viTriDatBeId: 1,
                huongTamDanId: 1,
                loaiDuongId: 1,
                chuQuanId: 1,
                taiSanId: null,
                duAnId: null,
                trangThaiSuDungId:1,
                maBC:"",
                tenBC:"",
                kyHieu:"",
                diaChi:"",
                soHuongBe:1,
                soTamDan:0,
                chieuDai:0,
                chieuRong:0,
                tinhTrangNuoc:'',
                maVach:'',
                ngayLapDat:Date,
                ngaySuDung:Date,
                tuyenCBId:null,
                donViId:null,
                kinhDo:null,
                viDo:null,
                maCSHT:null,
                diaChiId:null,
                tinhId:null,
                quanId:null,
                phuongId:null,
                phoId:null,
                apId:null,
                khuId: null,
                dacDiemId:null,
                soNha:""
            },
            category:{
                phanloai:0,
                dinhdanh:0,
                dactinh:0,
                lienket:0,
                kiemke:0,
                chuquan:0,
                bando:0,
                macsht:0,
                ngaythang:0
            },
            waterMark : 'Chọn ngày',
            dateVal : new Date(),
            dateFormat : 'dd/MM/yyyy',
            donviql:[]
        }
    },
    validations: {
        dataSelected: {
            kinhDo: {
                required
            },
            viDo: {
                required
            },
            trangThaiSuDungId: {
                required
            },
            soHuongBe: {
                required
            },
            diaChi: {
                required
            },
            tenBC: {
                required
            },
            kyHieu: {
                required
            },
            loaiDuongId: {
                required
            },
            huongTamDanId: {
                required
            },
            viTriDatBeId: {
                required
            },
            loaiBeCapId: {
                required
            }
        }
    },
  created: async function () {
      //await this.initForm()
  },
  watch:{

  },
  computed: {
      objToaDo: function () {
          return {
              diachi: this.dataSelected.diaChi,
              toado: this.dataSelected.viDo + "," + this.dataSelected.kinhDo,
          };
      },
  },
  methods: {
      focusMyElement: async function () {
          //console.log(this.data)
          try{
              this.$root.showLoading(true)
              await this.initForm()
              if (this.data.beCapId != null) {
                  this.dataSelected.beCapId = this.data.beCapId
                  this.dataSend.beCapId = this.data.beCapId
                  this.dataSelected.tuyenCBId= this.data.tuyenCongId
                  this.donviql= this.data.dvql
                  this.dataSelected.donViId =  this.donviql.id
                  if(this.dataSelected.beCapId!=null)
                      await this.chiTietBeCap()
              } else {
                  this.donviql= this.data.dvql
                  this.dataSelected.beCapId = null
                  this.dataSelected.donViId =  this.donviql.id
                  this.dataSelected.tuyenCBId= this.data.tuyenCongId
                  //this.dataSelected.loaiBeCapId = null
                  //this.dataSelected.viTriDatBeId = null
                  //this.dataSelected.huongTamDanId = null
                  //this.dataSelected.loaiDuongId = null
                  this.dataSelected.chuQuanId = null
                  this.dataSelected.taiSanId = null
                  this.dataSelected.duAnId = null
                  //this.dataSelected.trangThaiSuDungId = null
                  this.dataSelected.maBC = null
                  this.dataSelected.tenBC = null
                  this.dataSelected.kyHieu = null
                  this.dataSelected.kyHieu = null
                  this.dataSelected.diaChi = null
                  this.dataSelected.soHuongBe = 1
                  this.dataSelected.soTamDan = 0
                  this.dataSelected.chieuDai = 0
                  this.dataSelected.chieuRong = 0
                  this.dataSelected.tinhTrangNuoc = null
                  this.dataSelected.maVach = null
                  this.dataSelected.ngayLapDat = new Date
                  this.dataSelected.ngaySuDung = new Date
                  this.dataSelected.kinhDo = 0
                  this.dataSelected.viDo = 0
                  this.dataSelected.maCSHT = null
                  this.dataSelected.diaChiId = null

                  this.dataSelected.tinhId = null
                  this.dataSelected.quanId = null
                  this.dataSelected.phuongId = null
                  this.dataSelected.phoId = null
                  this.dataSelected.apId = null
                  this.dataSelected.khuId = null
                  this.dataSelected.dacDiemId = null
                  this.dataSelected.soNha = null
              }
          }catch(er){}
          finally{
              this.$root.showLoading(false)
          }
      },

      chiTietBeCap: async function () {
          try {
              let rs = await this.$root.context.get(
                  "/web-cabman/BanDoTuyenCong/chi-tiet-be-cap?beCapId=" + this.dataSelected.beCapId
              )
              if(rs.data !=null)
                  this.mapDataBeCap(rs.data)
          } catch (error) {
          } finally {
          }
      },

      initForm: async function () {
          try {
              let rs = await this.$root.context.get(
                  "/web-cabman/BanDoTuyenCong/lay-cac-danh-muc-be-cap"
              )
              if(rs.data!=null){
                  this.dsChuQuan =rs.data.dsChuQuan
                  this.dsLoaiBC =rs.data.dsLoaiBC
                  this.dataSelected.loaiBeCapId = this.dsLoaiBC[0].LOAIBC_ID
                  this.dsViTriDB =rs.data.dsViTriDB
                  this.dataSelected.viTriDatBeId = this.dsViTriDB[0].VITRIDB_ID
                  this.dsHuongTD =rs.data.dsHuongTD
                  this.dataSelected.huongTamDanId = this.dsHuongTD[0].HUONGTD_ID
                  this.dsLoaiDuong =rs.data.dsLoaiDuong
                  this.dataSelected.loaiDuongId = this.dsLoaiDuong[0].LOAIDUONG_ID
                  this.dsTTSD =rs.data.dsTTSD
                  this.dataSelected.trangThaiSuDungId = this.dsTTSD[0].TTSD_ID
                  this.dsDuAn =rs.data.dsDuAn
                  this.dsTaiSan =rs.data.dsTaiSan
              }
          } catch (error) {
          } finally {
          }
      },

      mapDataBeCap: function(data){
          if (data!=null){
              this.dataSend.tenBC = data.TEN_BC
              this.dataSend.tenBeCap = data.TEN_BC
              this.dataSelected.loaiBeCapId = data.LOAIBC_ID
              this.dataSelected.viTriDatBeId = data.VITRIDB_ID
              this.dataSelected.huongTamDanId = data.HUONGTD_ID
              this.dataSelected.loaiDuongId = data.LOAIDUONG_ID
              this.dataSelected.chuQuanId = data.CHUQUAN_ID
              this.dataSelected.taiSanId = data.TAISAN_ID
              this.dataSelected.duAnId = data.DUAN_ID
              this.dataSelected.trangThaiSuDungId = data.TTSD_ID
              this.dataSelected.maBC = data.MA_BC
              this.dataSelected.tenBC = data.TEN_BC
              this.dataSelected.kyHieu = data.KYHIEU
              this.dataSelected.kyHieu = data.KYHIEU
              this.dataSelected.diaChi = data.DIACHI
              this.dataSelected.soHuongBe = data.SOHUONGBE
              this.dataSelected.soTamDan = data.SOTAMDAN
              this.dataSelected.chieuDai = data.CHIEUDAI
              this.dataSelected.chieuRong = data.CHIEURONG
              this.dataSelected.tinhTrangNuoc = data.TT_NUOC
              this.dataSelected.maVach = data.MA_VACH
              this.dataSelected.ngayLapDat = data.NGAY_LD
              this.dataSelected.ngaySuDung = data.NGAY_SD
              this.dataSelected.kinhDo = data.KINHDO
              this.dataSelected.viDo = data.VIDO
              this.dataSelected.maCSHT = data.MA_CSHT
              this.dataSelected.diaChiId = data.DIACHI_ID

              this.dataSelected.tinhId = data.TINH_ID
              this.dataSelected.quanId = data.QUAN_ID
              this.dataSelected.phuongId = data.PHUONG_ID
              this.dataSelected.phoId = data.PHO_ID
              this.dataSelected.apId = data.AP_ID
              this.dataSelected.khuId = data.KHU_ID
              this.dataSelected.dacDiemId = data.DACDIEM_ID
              this.dataSelected.soNha = data.SONHA

          }
      },

      getDiaChi: function (data) {
          this.dataSelected.diaChi = data.diachimoi
          this.dataSelected.tinhId = data.tinh_id
          this.dataSelected.quanId = data.quan_id
          this.dataSelected.phuongId = data.phuong_id
          this.dataSelected.phoId = data.pho_id
          this.dataSelected.apId = data.ap_id
          this.dataSelected.khuId = data.khu_id
          this.dataSelected.dacDiemId = data.dacdiem_id
          this.dataSelected.soNha = data.so_nha
      },

      getToaDo: function (toado) {
          if (toado != null) {
              this.dataSelected.viDo = toado.split(",")[0]
              this.dataSelected.kinhDo = toado.split(",")[1]
          }
      },

      ghiLai:async function(){
          if (this.dataSelected.beCapId != null)
              this.capNhat()
          else
              this.themMoi()
      },
      capNhat: async function(){
          try {
              this.$root.showLoading(true)
              if(this.validateData(this.dataSelected)){
                  return
              }
              //console.log(this.dataSelected)
              this.dataSelected.ngayLapDat = moment(this.dataSelected.ngayLapDat, "yyyy-MM-dd").toDate()
              this.dataSelected.ngaySuDung = moment(this.dataSelected.ngaySuDung, "yyyy-MM-dd").toDate()

              let rs = await this.$root.context.post(
                  "/web-cabman/BanDoTuyenCong/cap-nhat-be-cap", this.dataSelected
              )
              if(rs.error_code == 'BSS-00000000') {
                  this.$toast.success("Cập nhật bể cáp thành công")
                  let obj = {
                      beId: this.dataSelected.beCapId
                  }
                  this.$emit('xacNhan', obj)
                  this.$bvModal.hide(this.modalId)
              }  else {
                  this.$toast.error("Cập nhật bể cáp thất bại")
              }

          } catch (error) {
              console.log(error)
              this.$toast.error("Cập nhật bể cáp thất bại")
          } finally {
              this.$root.showLoading(false)
          }
      },
      themMoi: async function(){
          try {
              this.$root.showLoading(true);
              //console.log(this.dataSelected)
              // this.dataSelected.ngayLapDat= this.convertDate(this.dataSelected.ngayLapDat);
              // this.dataSelected.ngaySuDung= this.convertDate(this.dataSelected.ngaySuDung);
              if(this.validateData(this.dataSelected)){
                  return
              }
              let rs = await this.$root.context.post(
                  "/web-cabman/BanDoTuyenCong/them-be-cap", this.dataSelected
              );
              if(rs.error_code == 'BSS-00000000')
              {
                  this.$toast.success("Thêm bể cáp thành công")
                  this.dataSelected.beCapId = rs.data.BECAP_ID
                  let obj = {
                      beId: this.dataSelected.beCapId
                  }
                  this.$emit('xacNhan', obj)
                  this.$bvModal.hide(this.modalId)
              }
              else
                  this.$toast.error("Thêm bể cáp thất bại")
          } catch (error) {
              console.log(error)
              this.$toast.error("Thêm bể cáp thất bại")
          } finally {
              this.$root.showLoading(false)
          }
      },
      getdiaChi: function(diaChi){
          //Chờ lấy địa chỉ
          //console.log(diaChi);
      },
      convertDate:function(date){
          return new  Date(date).toLocaleDateString("en-US", { day: 'numeric' })+ "/"+
              new Date(date).toLocaleDateString("en-US", { month: 'numeric' })+
              "/" + new  Date(date).toLocaleDateString("en-US", { year: 'numeric' })
      },
      xoaMaCSHT: function(){
          this.dataSelected.maCSHT =""
      },
      xoaMaTS:function(){
          this.dataSelected.taiSanId =""
      },
      xoaMaDA:function(){
          this.dataSelected.duAnId =""
      },
      getMaCsht: function(args){
          this.dataSelected.maCSHT =args
      },
      validateData(data) {
          this.$v.$touch()
          let flag= false
          let errorMessage = []

          if (data.kyHieu == null || data.kyHieu == '') {
              errorMessage.push("Ký hiệu không được trống.")
              if(!flag)
                  this.$refs['ky_hieu'].focus()
              flag = true
          }

          if (data.tenBC == null || data.tenBC == '') {
              errorMessage.push("Tên bể cáp không được trống.")
              if(!flag)
                  this.$refs['ten_be_cap'].focus()
              flag = true
          }

          if (data.diaChi == null || data.diaChi == '') {
              errorMessage.push("Địa chỉ không được trống.")
              if(!flag)
                  this.$refs['dia_chi'].focus()
              flag = true
          }

          if (data.soHuongBe == null || data.soHuongBe == '') {
              errorMessage.push("Số hướng bể không được trống.")
              if(!flag)
                  this.$refs['so_huong_be'].focus()
              flag = true
          }

          if (data.kinhDo == null || data.kinhDo == '') {
              errorMessage.push("Kinh độ không được trống.")
              if(!flag)
                  this.$refs['kinh_do'].focus()
              flag = true
          }

          if (data.viDo == null || data.viDo == '') {
              errorMessage.push("Vĩ độ không được trống.")
              if(!flag)
                  this.$refs['vi_do'].focus()
              flag = true
          }



          if (errorMessage.length > 0) {
              this.$toast.error(errorMessage.join('\n'))
              return true
          }else {
              return false
          }
      }
  },
  mounted:function(){
    // document.addEventListener('click',function(event){
    //     console.log(event.target);
    // })

  }
};
</script>
<style>
div#popupQLBe___BV_modal_outer_ {
  z-index: 10 !important;
  margin-top: 100px;
}
.dashboard-header {
  z-index: 9 !important;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
