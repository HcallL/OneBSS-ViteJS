<template src="./ModalQLDoanCong.html"></template>
<script>
    import moment from 'moment'
    import ModalTreocap from '../../ChuiCapQuaOngCong/Modal'
    import ModalAnhChup from '../../AnhChup/Modal'
    import {minLength,maxLength,numeric, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

    export default {
        name: "ModalQLDoanCong",
        props: ["modalId", "data"],
        components: {ModalTreocap,ModalAnhChup,moment},
        data: function () {
            return {
                fields: { text: "TEN_DV", value: "donViId" },
                //cotid: 0,
                dsChuQuan:[],
                dsLoaiCong:[],
                dsTaiSan:[],
                dsDuAn:[],
                dsTTSD:[],
                dsHuongBeA:[],
                dsHuongBeB:[],
                dataSelected: {
                    doanCongId:null,
                    loaiCongId: 1,
                    chuQuanId: 1,
                    taiSanId: null,
                    duAnId: null,
                    trangThaiSuDungId:1,
                    maDoanCong:"",
                    tenDoanCong:"",
                    kyHieu:"",
                    soDongMatCat:1,
                    soCotMatCat:1,
                    soOngCong:1,
                    matCat:'1x2',
                    duongKinhOngCong:1,
                    chieuDai:0,
                    doSau:0,
                    soCapDiQua:0,
                    beCapA:'',
                    beCapAId:null,
                    beCapB:'',
                    beCapBId:null,
                    tenhuongBeA:null,
                    tenhuongBeB:null,
                    ngayLapDat:Date,
                    ngaySuDung:Date,
                    tuyenCongBeId:null,
                    donViQlId:null,
                    ghiChu:''
                },
                category:{
                    phanloai:0,
                    dinhdanh:0,
                    dactinh:0,
                    boTri:0,
                    ketNoiA:0,
                    ketNoiB:0,
                    lienket:0,
                    kiemke:0,
                    chuquan:0,
                    khac:0,
                    ngaythang:0
                },
                waterMark : 'Chọn ngày',
                dateVal : new Date(),
                dateFormat : 'dd/MM/yyyy',
                donviql:[]
            };
        },
        validations: {
            dataSelected: {
                tenDoanCong: {
                    required
                },
                kyHieu: {
                    required
                }
            }
        },
        created: async function () {
            //await this.initForm()
        },
        watch:{

        },
        computed: {},
        methods: {
            focusMyElement: async function () {
                //console.log('data',this.data)
                try{
                    this.$root.showLoading(true)
                    await this.initForm()
                    if (this.data != null) {
                        this.dataSelected.beCapA = this.data.dataBeA.KYHIEU
                        this.dataSelected.beCapAId = this.data.dataBeA.BECAP_ID
                        this.dataSelected.beCapB = this.data.dataBeB.KYHIEU
                        this.dataSelected.beCapBId = this.data.dataBeB.BECAP_ID
                        this.dataSelected.tuyenCongBeId= this.data.tuyenCongId
                        this.donviql= this.data.dvql
                        this.dataSelected.donViQlId =  this.donviql.id
                        await this.getHuongBe(this.dataSelected.beCapAId, 1)
                        await this.getHuongBe(this.dataSelected.beCapBId, 2)
                    }
                }catch(er){}
                finally{
                    this.$root.showLoading(false)
                }
            },

            getHuongBe: async function (beCapId, loai) {
                try {
                    let rs = await this.$root.context.get(
                        "/web-cabman/BanDoTuyenCong/danh-sach-huong-be?beCapId=" + beCapId
                    )
                    if (rs.data !=null) {
                        switch (loai) {
                            case 1:
                                this.dsHuongBeA = rs.data
                                this.dataSelected.huongBeA = this.dsHuongBeA[0].HUONG
                                break
                            case 2:
                                this.dsHuongBeB = rs.data
                                this.dataSelected.huongBeB = this.dsHuongBeB[0].HUONG
                                break
                        }
                    }
                } catch (error) {
                } finally {
                }
            },

            initForm: async function () {
                try {
                    this.dataSelected.taiSanId = null
                    this.dataSelected.duAnId = null
                    this.dataSelected.maDoanCong= null
                    this.dataSelected.tenDoanCong = null
                    this.dataSelected.kyHieu = null
                    this.dataSelected.soDongMatCat = 1
                    this.dataSelected.soCotMatCat = 1
                    this.dataSelected.soOngCong = 1
                    this.dataSelected.matCat = '1x2'
                    this.dataSelected.duongKinhOngCong = 1
                    this.dataSelected.chieuDai = 0
                    this.dataSelected.doSau = 0
                    this.dataSelected.soCapDiQua = 0
                    this.dataSelected.ghiChu = null
                    let rs = await this.$root.context.get(
                        "/web-cabman/BanDoTuyenCong/lay-cac-danh-muc-doan-cong"
                    )
                    if(rs.data!=null){
                        this.dsChuQuan = rs.data.dsChuQuan
                        //this.dataSelected.chuQuanId = this.dsChuQuan[0].CHUQUAN_ID
                        this.dsLoaiCong = rs.data.dsLoaiCong
                        this.dataSelected.loaiCongId = this.dsLoaiCong[0].LOAICONG_ID
                        this.dsTTSD =rs.data.dsTTSD
                        this.dataSelected.trangThaiSuDungId = this.dsTTSD[0].TTSD_ID
                        this.dsDuAn =rs.data.dsDuAn
                        //this.dataSelected.duAnId = this.dsDuAn[0].DUAN_ID
                        this.dsTaiSan =rs.data.dsTaiSan
                        //this.dataSelected.taiSanId = this.dsTaiSan[0].TAISAN_ID
                    }
                } catch (error) {
                } finally {
                }
            },

            ghiLai:async function(){
                this.themMoi()
            },

            themMoi: async function(){
                try {
                    this.$root.showLoading(true);
                    //console.log(this.dataSelected)
                    if(this.validateData(this.dataSelected)){
                        return
                    }
                    // this.dataSelected.ngayLapDat= this.convertDate(this.dataSelected.ngayLapDat);
                    // this.dataSelected.ngaySuDung= this.convertDate(this.dataSelected.ngaySuDung);
                    let rs = await this.$root.context.post(
                        "/web-cabman/BanDoTuyenCong/them-doan-cong", this.dataSelected
                    )
                    if(rs.error_code == 'BSS-00000000')
                    {
                        this.$toast.success("Thêm đoạn cống thành công")
                        this.$emit('xacNhan')
                        this.$bvModal.hide('popupQLDoanCong')
                    }
                    else
                        this.$toast.error("Thêm đoạn cống thất bại")
                } catch (error) {
                    this.$toast.error("Thêm đoạn cống thất bại")
                } finally {
                    this.$root.showLoading(false)
                }
            },

            // convertDate:function(date){
            //     return new  Date(date).toLocaleDateString("en-US", { day: 'numeric' })+ "/"+
            //         new Date(date).toLocaleDateString("en-US", { month: 'numeric' })+
            //         "/" + new  Date(date).toLocaleDateString("en-US", { year: 'numeric' })
            // },
            xoaMaTS:function(){
                this.dataSelected.taiSanId =""
            },
            xoaMaDA:function(){
                this.dataSelected.duAnId =""
            },
            validateData(data) {
                this.$v.$touch()
                let flag= false
                let errorMessage = []

                if (data.kyHieu == null || data.kyHieu == '') {
                    errorMessage.push("Ký hiệu không được trống.")
                    if(!flag)
                        this.$refs['kyHieu'].focus()
                    flag = true
                }

                if (data.tenDoanCong == null || data.tenDoanCong == '') {
                    errorMessage.push("Tên đoạn cống không được trống.")
                    if(!flag)
                        this.$refs['tenDoanCong'].focus()
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
  .modal-fullscreen .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
  }
</style>
