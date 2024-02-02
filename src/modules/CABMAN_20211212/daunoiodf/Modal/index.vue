<template src="./index.html"></template>
<style src="./modal.css" lang="css"></style>
<script>
import {CommandColumn, Edit, Filter, Page, Sort} from "@syncfusion/ej2-vue-grids";
import XLSX from "xlsx";
//var dsThietBi3 = []

var itemCapTemplate= function () {
  return {
    template: {
      template: `
      <div  style="display: inline-flex;align-items: center;">
            <div class="pull-left"  style=" width: 70px;display:block;overflow: hidden;text-overflow: ellipsis;"> {{value}}</div>
                                                <div style="margin-left: 5px" class="pull-right" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-more_horiz"></span>
                                                    </button>
                                                </div>
                        </div>`,
      data() {
        return {
          data: { }
        }
      },
      computed: {
        parent() {
          return this.$parent.$parent.$parent.$parent
        },
        value() {
          return `${this.data.CAP_VAO === null ?"":this.data.CAP_VAO}`
        },id(){
          return `${this.data.CONG_VAO}`
        }
      },methods:{
        onClick() {
          console.log(this.id)
        }
      }
    }
  }
}
var columnTemplateChonNhieuPhieuDauVao = function ()
{
  return {
    template: {
      template: `
                            <div class="check-action">
                                <input
                                    type="checkbox"
                                    class="check"
                                    v-model="parent.dsIdDauVao"
                                    :value="value"/>
                                <span class="name"></span>

                            </div>`,
      data() {
        return {
          data: { }
        }
      },
      computed: {
        parent() {
          return this.$parent.$parent.$parent.$parent
        },
        value() {
          return `${this.data.CONG_VAO}`
        }
      }
    }
  }
}
var itemCapTemplate = function () {
  return {
    template: {
      template: `
      <div  style="display: inline-flex;align-items: center;">
            <div class="pull-left"  style=" width: 70px;display:block;overflow: hidden;text-overflow: ellipsis; white-space: nowrap"> {{value}}</div>
                                                <div style="margin-left: 10px" class="pull-right" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-more_horiz"></span>
                                                    </button>
                                                </div>
                        </div>`,
      data() {
        return {
          data: { }
        }
      },
      computed: {
        parent() {
          return this.$parent.$parent.$parent.$parent
        },
        value() {
          return `${this.data.CAP_VAO === null ?"":this.data.CAP_VAO}`
        },id(){
          return `${this.data.CONG_VAO}`
        }
      },methods:{
        onClick() {
          console.log(this.id)
        }
      }
    }
  }
}
var itemCapRaTemplate = function () {
  return {
    template: {
      template: `
      <div  style="display: inline-flex;align-items: center;">
            <div class="pull-left"  style=" width: 70px;display:block;overflow: hidden;text-overflow: ellipsis; white-space: nowrap"> {{value}}</div>
                                                <div class="pull-right" style="margin-left: 10px" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-more_horiz"></span>
                                                    </button>
                                                </div>
                        </div>`,
      data() {
        return {
          data: { }
        }
      },
      computed: {
        parent() {
          return this.$parent.$parent.$parent.$parent
        },
        value() {
          return `${this.data.CAP_RA === null ?"":this.data.CAP_RA}`
        },id(){
          return `${this.data.CONG_RA}`
        }
      },methods:{
        onClick() {
          console.log(this.id)
        }
      }
    }
  }
}
var itemGhiChutemplate= function () {
  return {
    template: {
      template: `
        <div class="table-result ghi-chu" style="background: transparent;">
          <div style="display: inline-flex;align-items: center;justify-content: space-around;" class="mb-1 ghi-chu-item">
            <div class="pull-left" style="margin-right: 3px" @click="onClickXoa">
              <button class="btn btn-second lh12 pad2">
                <span class="-ap icon-close"></span>
              </button>
            </div>
            <input type="text" class="form-control" v-model="textChange">
            <div style="margin-left: 3px" class="pull-right" @click="onClick">
              <button class="btn btn-second lh12 pad2">
                <span class="-ap icon-check3"></span>
              </button>
            </div>
          </div>

          <div v-if="parent.checkGhiChu2 === true" class="border-top ghi-chu-item" style="margin-left: -7px;margin-right: -7px; display: flex">
            <div style="margin-left: 7px;margin-right: 7px; align-self: center">
              {{ ghiChu2 }}
            </div>
          </div>

        </div>`,
      data() {
        return {
          data: { },
          textChange: ''
        }
      },
      computed: {
        parent() {
          return this.$parent.$parent.$parent.$parent
        },id(){
          return `${this.data.CONG_VAO}`
        },ghiChu2(){
          return `${this.data.GHICHU_2 === null ?"":this.data.GHICHU_2}`
        }
      },methods:{
        onClickXoa() {
          this.parent.UpdateGhiChu(this.id,'')
          console.log(this.id + " " + this.textChange)
        },
        onClick() {
          this.parent.UpdateGhiChu(this.id,this.textChange)
          console.log(this.id + " " + this.textChange)
        }
      },mounted() {
        this.textChange = this.data.GHICHU === null ?"":this.data.GHICHU
      }
    }
  }
}
var columnTemplateChonNhieuPhieuDauRa = function () {
  return {
    template: {
      template: `
              <div class="check-action">
              <input
                type="checkbox"
                class="check"
                v-model="parent.dsIdDauRa"
                :value="value"/>
              <span class="name"></span>
              </div>
            `,
      data() {
        return {
          data: { }
        }
      },
      computed: {
        parent() {
          console.log(this.$parent)

          return this.$parent.$parent.$parent.$parent
        },
        value() {
          return `${this.data.CONG_RA}`
        }
      }
    }
  }
}

export default {
  name: 'Modal',
  props: {
    modalShow: Boolean,
    odfId: {
      type: Number,
      default: 601
    },
    ten_odf: String
  },

  provide:{
    grid:[Page,Edit, Filter, Sort, CommandColumn]
  },
  data () {
    return {
      dsThietBi3: [],
      checkGhiChu2:false,
      idaaaa:'',
      soMayThueBao:'',
      checkAllDauVao:false,
      dsIdDauVao:[],
      contentDayNhay:[],
      kyHieuDayNhay:'',
      showTextDauTat:'',
      contentCapRa:[],
      ghiChu:[],
      checkAllDauRa:false,
      activetab: 1,
      dsIdDauRa:[],
      headerTemplateChonNhieuDauVao: function() {
        return {
          template: {
            template: `
                            <div class="check-action">
                                <input type="checkbox" v-model="parent.checkAllDauVao" class="check"/>
                                <span class="name"></span>
                            </div>
                        `,
            data: function () {
              return { }
            },
            computed: {
              parent() {
                return this.$parent.$parent.$parent.$parent
              }
            }
          }
        }
      },
      itemCapTemplate: function () {
        return {
          template: {
            template: `
      <div  style="display: inline-flex;align-items: center;">
            <div class="pull-left"  style=" width: 70px;display:block;overflow: hidden;text-overflow: ellipsis;"> {{value}}</div>
                                                <div style="margin-left: 5px" class="pull-right" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-more_horiz"></span>
                                                    </button>
                                                </div>
                        </div>`,
            data() {
              return {
                data: { }
              }
            },
            computed: {
              parent() {
                return this.$parent.$parent.$parent.$parent
              },
              value() {
                return `${this.data.CAP_VAO === null ?"":this.data.CAP_VAO}`
              },id(){
                return `${this.data.CONG_VAO}`
              }
            },methods:{
              onClick() {
                console.log(this.id)
              }
            }
          }
        }
      },
      itemCapRaTemplate: function () {
        return {
          template: {
            template: `
      <div  style="display: inline-flex;align-items: center;">
            <div class="pull-left"  style=" width: 70px;display:block;overflow: hidden;text-overflow: ellipsis;"> {{value}}</div>
                                                <div class="pull-right" style="margin-left: 5px" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-more_horiz"></span>
                                                    </button>
                                                </div>
                        </div>`,
            data() {
              return {
                data: { }
              }
            },
            computed: {
              parent() {
                return this.$parent.$parent.$parent.$parent
              },
              value() {
                return `${this.data.CAP_RA === null ?"":this.data.CAP_RA}`
              },id(){
                return `${this.data.CONG_RA}`
              }
            },methods:{
              onClick() {
                console.log(this.id)
              }
            }
          }
        }
      },
      itemGhiChutemplate: function () {
        return {
          template: {
            template: `
      <div style="display: inline-flex;align-items: center;justify-content: space-around;">
      <div class="pull-left" style="margin-right: 3px" @click="onClickXoa">
        <button class="btn btn-second lh12 pad2" >
          <span class="-ap icon-close"></span>
        </button>
      </div>
          <input type="text"  class="form-control" v-model="textChange">
                                                <div style="margin-left: 3px"class="pull-right" @click="onClick">
                                                    <button class="btn btn-second lh12 pad2" >
                                                        <span class="-ap icon-check3"></span>
                                                    </button>
                                                </div>
                        </div>`,
            data() {
              return {
                data: { },
                textChange: ''
              }
            },
            computed: {
              parent() {
                return this.$parent.$parent.$parent.$parent
              },id(){
                return `${this.data.CONG_VAO}`
              }
            },methods:{
              onClickXoa() {
                this.parent.UpdateGhiChu(this.id,'')
                console.log(this.id + " " + this.textChange)
              },
              onClick() {
                this.parent.UpdateGhiChu(this.id,this.textChange)
                console.log(this.id + " " + this.textChange)
              }
            },mounted() {
              this.textChange = this.data.GHICHU === null ?"":this.data.GHICHU
            }
          }
        }
      },
      headerTemplateChonNhieuDauRa: function() {
        return {
          template: {
            template: `
                            <div class="check-action">
                                <input type="checkbox" v-model="parent.checkAllDauRa" class="check"/>
                                <span class="name"></span>
                            </div>
                        `,
            data: function () {
              return { }
            },
            computed: {
              parent() {
                return this.$parent.$parent.$parent.$parent
              }
            }
          }
        }
      },
      columnTemplateChonNhieuPhieuDauRa: function () {
        return {
          template: {
            template: `
              <div class="check-action">
              <input
                type="checkbox"
                class="check"
                v-model="parent.dsIdDauRa"
                :value="value"/>
              <span class="name"></span>
              </div>
            `,
            data() {
              return {
                data: { }
              }
            },
            computed: {
              parent() {
                console.log(this.$parent)

                return this.$parent.$parent.$parent.$parent
              },
              value() {
                return `${this.data.CONG_RA}`
              }
            }
          }
        }
      },

      // odfId : 657,
      // odfId : 601,
      donviId : '',
      isShowLayout1: true,
      isShowLayout3: true,
      tab4Radio: 1,
      split1Size:15,
      split2Size:70,
      split3Size:15,
      dsLoaithietBi:[],
      dsLoaithietBi2:[],
      dsDayNhayCbo:[],
      dsThietBi:[],
      dsThietBi2:[],

      dsCapgoc:[],
      dsMaKetNoi:[],
      dsSoiDayNhay:[],
      dsSoi:[],
      dsDauNoi:[],
      maKetNoiCheck:[],
      maSoiCheck:[],
      capGocId:'',
      dayNhayId:'',
      loaiThietBiID:"",
      loaiThietBiID2:"",
      loaiThietBiID3:"",
      thietBiID:"",
      thietBiID2:"",
      thietBiID3:"",
      maKetNoiId:"",
      soiId:"",
      idDauNoi:"",
      show:false,
      // editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' },
      // selectionOptions:{ type: 'Multiple' ,enableSimpleMultiRowSelection: false},
      pageSettings: { pageSizes: ['10','20','50','100','All'], pageCount: 3, pageSize: 10 },
      // filterOptions: { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate', operators: '%', immediateModeDelay: 100, showFilterBarStatus:false},
      dauVaoColum:[
        {
          field: 'CAP_VAO',
          headerText: 'Dây nhảy / thuê bao',
          allowEditing: false,
          width: '20%',
          template : itemCapTemplate,
          textAlign: 'Center',
          minWidth: 10
        },
        {
          field: 'SOI_VAO',
          allowEditing: false,
          headerText: 'Sợi',
          width: '10%',
          textAlign: 'Center',
          minWidth: 10
        },
      ],
      matTruocColum: [
        {
          headerText: 'Chọn',
          template : columnTemplateChonNhieuPhieuDauVao,
          width: '10%',
          minWidth: 10,
        },
        {
          field: 'VITRI',
          headerText: 'Vị Trí',
          width: '10%',
          allowEditing: false,
          textAlign: 'Center',
          minWidth: 10
        },
      ],
      matSauColum: [
        {
          field: 'VITRI',
          headerText: 'Vị Trí',
          allowEditing: false,
          width: '10%',
          textAlign: 'Center',
          minWidth: 10
        },
        {
          headerText: 'Chọn',
          template : columnTemplateChonNhieuPhieuDauRa,
          allowEditing: false,
          width: '10%',
          minWidth: 10,
        }
      ],
      dauRaColum: [
        {
          field: 'CAP_RA',
          headerText: 'Cáp ra',
          width: '17%',
          textAlign: 'Center',
          template : itemCapRaTemplate,
          allowEditing: false,
          minWidth: 10
        },
        {
          field: 'SOI_RA',
          headerText: 'Sợi',
          width: '13%',
          textAlign: 'Center',
          allowEditing: false,
          minWidth: 10
        },
      ],
      thongTinCongColum: [
        {
          field: 'GHICHU',
          headerText: 'Ghi chú',
          width: '20%',
           template : itemGhiChutemplate,
          textAlign: 'Center',
          minWidth: 10
        },
      ],
      commandChucNang:[
        {
          type: "Tra Cứu",
          buttonOption: {
            cssClass: "-ap icon-more_horiz",
          },
        },
      ]
    }
  },
  computed: {
    fields() {
      return {
        dataSource: this.dsThietBi3,
        value: 'KEY',
        text: 'TEN_TB',
        parentValue:"PKEY",
        hasChildren: 'HAS_CHILD'
      }
    },
  },
  watch: {

    checkAllDauVao(newVal) {
      if(newVal){
        this.dsIdDauVao = [...this.dsDauNoi].map(value =>  value.CONG_VAO)
      } else {
        this.dsIdDauVao = []
      }

    },checkAllDauRa(newVal){
      if(newVal){
        this.dsIdDauRa = [...this.dsDauNoi].map(value =>  value.CONG_RA)
      } else {
        this.dsIdDauRa = []
      }
    }
  },
  destroyed() {
    this.show = false
  },
  methods: {
   async changeThietBi3 (node, instanceId) {
      console.log(node)
      console.log(instanceId)
      let  idTong = node.itemData.id
      if(idTong){
        this.loaiThietBiID3 = idTong.split("#")[0]
        this.thietBiID3 = idTong.split("#")[1]
      }
     console.log( this.loaiThietBiID3)
     console.log(this.thietBiID3)

      await this.napCongDichVu()

      // console.log(this.thietBiID3)
    },
    async onclickTab(currentActivetab){
      this.maKetNoiCheck = []
      this.dsMaKetNoi = []
    this.activetab = currentActivetab
      if(this.activetab ===1 ){
        await this.getDsLoaiThietbi()
        await this.getDsThietbi()
        await this.napMaKetNoi()
      }else if(this.activetab ===2){
        await this.getDayNhayCbo()
        await this.napSoiDayNhay()
      }else if(this.activetab ===3){
        await this.getDsLoaiThietbi2()
        await this.napDsThietBi2()
        await this.napDsThietBi3()
      }
    console.log(this.activetab)
    },
    async onShownModal() {
      this.show = true
      await this.napDanhSachDauNoi()
      await this.getTrangThaiOdf()
      await this.napCapGoc()
      if(this.activetab ===1 ){
        await this.getDsLoaiThietbi()
        await this.getDsThietbi()
        if(this.thietBiID !== ""){
          await this.napMaKetNoi()
        }
      }else if(this.activetab ===2){
        await this.getDayNhayCbo()
        await this.napSoiDayNhay()
      }else if(this.activetab ===3){
        await this.getDsLoaiThietbi2()
        await this.napDsThietBi2()
        await this.napDsThietBi3()
      }else if(this.activetab ===4){
      }
      await this.napSoiKetNoi()
    },async onChangeDayNhayCbo(event){
      this.dayNhayId = event
      await this.napSoiDayNhay()
    },
    async onChangeLoaiThietBi (event) {
    this.loaiThietBiID = event
    await this.getDsThietbi()
      await this.napMaKetNoi()

    },
    async onChangeLoaiThietBi2 (event) {
    this.loaiThietBiID2 = event
    await this.napDsThietBi2()
      await this.napDsThietBi3()

    },
    async onChangeThietBi2 (event) {
    this.thietBiID2 = event
      await this.napDsThietBi3()

    }, commandTTClick: async function(args){
     console.log(args.rowData)

    },
  dauNoiCapRowSelected(args){
    // this.dsDauNoiCap[args.rowIndex].CHON = 1
  },
  dauNoiCapRowDeselected(args){
    // this.dsDauNoiCap[args.rowIndex].CHON = 0
  },
    async onChangeThietBi (event) {
    console.log('onChangeThietBi', event)
    this.thietBiID = event
      await this.napMaKetNoi()

    },async onChangeCapGoc (event) {
      console.log('cap goc', event)
      await this.napSoiKetNoi()
    },
    closeModal: function () {
      this.$emit('closeModal', this.modalShow)
    },async getDsLoaiThietbi(){
      this.loading(true)

      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/lay-ds-loai-thietbi?odf_id=${this.odfId}`
      ).then(res =>{
        this.dsLoaithietBi = res.data
        if(res.data){
          this.loaiThietBiID  = this.dsLoaithietBi[0].LOAITBI_ID
        }
        this.loading(false)

      }).catch(e=> {
        this.loading(false)
      })
    },async getDsThietbi(){
      this.loading(true)

      await this.$root.context.get(
      `/web-cabman/dau-noi-odf/lay-ds-thiet-bi?loaiTbiId=${this.loaiThietBiID}&donViId=${this.donviId}`
    ).then(res =>{
      this.dsThietBi = res.data
      if(res.data){
        this.thietBiID  = this.dsThietBi[0].THIETBI_ID
      }
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
  },async getTrangThaiOdf(){

      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-tt-odf?odfId=${this.odfId}`
      ).then(res =>{
        if(res.data){
          this.donviId = res.data[0].DONVI_ID
        }
      }).catch(e=> {

      })
    },async napCapGoc(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-cap-goc?odf=${this.odfId}&donViId=${this.donviId}`
      ).then(res =>{
        this.dsCapgoc = res.data
        if(res.data){
          this.capGocId  = this.dsCapgoc[0].CAP_ID
        }
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async napMaKetNoi(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ma-ketnoi?loaiTbiId=${this.loaiThietBiID}&thietBiId=${this.thietBiID}&donViId=${this.donviId}`
      ).then(res =>{
        this.dsMaKetNoi = res.data
        this.loading(false)
      }).catch(e=> {
        this.dsMaKetNoi = []
        this.loading(false)
        console.log(e)
      })
    },async napSoiKetNoi(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ds-soi?capId=${this.capGocId}&donViId=${this.donviId}`
      ).then(res =>{
        this.dsSoi = res.data
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async napDanhSachDauNoi(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/lay-ds-daunoi?odf_id=${this.odfId}`
      ).then(res =>{
        this.dsDauNoi = res.data
        if(this.dsDauNoi){
          this.idDauNoi =  this.dsDauNoi[0]
        }
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      }).finally({

      })
    },async getDsLoaiThietbi2(){
    this.loading(true)

    await this.$root.context.get(
      `/web-cabman/dau-noi-odf/nap-loai-tbi2`
    ).then(res =>{
      this.dsLoaithietBi2 = res.data
      if(res.data){
        this.loaiThietBiID2  = this.dsLoaithietBi2[0].LOAITBI_ID
      }
      this.loading(false)
    }).catch(e=> {
      this.loading(false)
    })
  },async napDsThietBi2(){
    this.loading(true)

    await this.$root.context.get(
      `/web-cabman/dau-noi-odf/nap-thietbi2?loaiThietBi=${this.loaiThietBiID2}&donVi=${this.donviId}`
    ).then(res =>{
      this.dsThietBi2 = res.data
      if(res.data){
        this.thietBiID2  = this.dsThietBi2[0].THIETBI_ID
      }
      this.loading(false)
    }).catch(e=> {
      this.loading(false)
    })
  },async napDsThietBi3(){
      if(!this.thietBiID2){
        return
      }
      if(!this.loaiThietBiID2){
        return
      }
      this.loading(true)
      await this.$root.context.get(
      `/web-cabman/dau-noi-odf/nap-thietbi3?doiTuongMapId=${this.thietBiID2}&loaiDoiTuong=${this.loaiThietBiID2}`
    ).then(res =>{
      if(res.data){

        let mapKey = [...res.data].map(item => item.KEY)

        let ar1 = [...res.data].map(item =>{
          if(!mapKey.some(someVal => someVal === item.PKEY)){
            item.PKEY = null
            item.HAS_CHILD = true
          }
          return item
        })
         this.dsThietBi3 = ar1
        //this.fields.dataSource = this.dsThietBi3
        console.log('this.dsThietBi3', this.dsThietBi3)
      }else {
        this.dsMaKetNoi = []
      }
      this.loading(false)
    }).catch(e=> {
      this.loading(false)
    })
  },async loadThongTinAfterGanGo(){
      await this.napDanhSachDauNoi()
      // await this.getTrangThaiOdf()
      if(this.activetab ===1){
        if(!this.thietBiID){
          await this.napMaKetNoi()
        }
      }else if (this.activetab ===2){
        await this.getDayNhayCbo()
        await this.napSoiDayNhay()
      }else if (this.activetab ===3){

      }else {

      }
    },async loadThongTinAfterGanGoRa(){
      await this.napDanhSachDauNoi()
      await this.napSoiKetNoi()
    },async dauNoiTabMaKetNoi(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }
      if(this.dsIdDauVao.length !== this.maKetNoiCheck.length){
        this.$root.toastError("Số cổng và số vị trí vào không tương đồng.");
        return
      }
      this.loading(true)
      let array = [...this.dsIdDauVao].map(value => value)
      let arraySoi = [...this.maKetNoiCheck].map(value => value)
      let data ={
      donvi_id : this.donviId,
      odf_id : this.odfId,
      ds_vitrivao : array.toString(),
      ds_soivao: arraySoi.toString()
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/gan-dauvao-ketnoi',data
    ).then(res =>{
      this.$root.toastSuccess("Gán cổng thành công.");
      this.resetDauVao()
      this.loading(false)

      this.loadThongTinAfterGanGo()
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gán cổng thất bại" + e);

    })
  },async dau_txrx_ketnoi(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }
      this.loading(true)
      let array = [...this.dsIdDauVao].map(value => value)
      let arraySoi = [...this.maKetNoiCheck].map(value => value)
      let data ={
      donvi_id : this.donviId,
      odf_id : this.odfId,
      ds_vitrivao : array.toString(),
      ds_soivao: arraySoi.toString()
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/dau-txrx-ketnoi',data
    ).then(res =>{
      if(res.data.result){
        this.$root.toastSuccess("Gán cổng thành công.");
        this.resetDauVao()
        this.loadThongTinAfterGanGo()
      }else{
        this.$root.toastError("Gán cổng thất bại");
      }

      this.loading(false)
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gán cổng thất bại" + e);

    })
  },async ganDauVaoDayNhay(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }

      if(this.dsIdDauVao.length !== this.maKetNoiCheck.length){
        this.$root.toastError("Số cổng và số vị trí vào không tương đồng.");
        return
      }
      this.loading(true)
      let array = [...this.dsIdDauVao].map(value => value)
      let arraySoi = [...this.maKetNoiCheck].map(value => value)
      let data ={
        donvi_id : this.donviId,
        odf_id : this.odfId,
        ds_vitrivao : array.toString(),
        ds_soivao: arraySoi.toString(),
        daynhay_id_dv:this.dayNhayId
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/gan-dauvao-daynhay',data
      ).then(res =>{
        if(res.data.result){
          this.$root.toastSuccess("Gán cổng thành công.");
          this.resetDauVao()
          this.loadThongTinAfterGanGo()
        }else{
          this.$root.toastError("Gán cổng thất bại");
        }

        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        this.$root.toastError("Gán cổng thất bại" + e);

      })
    },async dau_txrx_tbi(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }
      this.loading(true)
      let data ={
        donvi_id : this.donviId,
        odf_id : this.odfId,
        ds_vitrivao : this.dsIdDauVao.toString(),
        ds_soivao: this.maKetNoiCheck.toString(),
        loaitbi_id_dv_3: this.loaiThietBiID3,
        thietbi_id_dv_3: this.thietBiID3,
        loaitbi_id_dv_2: this.loaiThietBiID2,
        thietbi_id_dv_2: this.thietBiID2,
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/dau-txrx-tbi',data
      ).then(res =>{
        if(res.data.result){
          this.$root.toastSuccess("Gán cổng thành công.");
          this.loadThongTinAfterGanGo()
        }else {
          this.$root.toastSuccess("Gán cổng thất bại.");
        }
        this.resetDauVao()
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        this.$root.toastError("Gán cổng thất bại" + e);

      })
    },async gan_dauvao_tbi1(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }
      this.loading(true)
      let data ={
        donvi_id : this.donviId,
        odf_id : this.odfId,
        ds_vitrivao : this.dsIdDauVao.toString(),
        ds_soivao: this.maKetNoiCheck.toString(),
        loaitbi_id_dv_3: this.loaiThietBiID3,
        thietbi_id_dv_3: this.thietBiID3,
        loaitbi_id_dv_2: this.loaiThietBiID2,
        thietbi_id_dv_2: this.thietBiID2,
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/gan-dauvao-thietbi1',data
      ).then(res =>{
        if(res.data.result){
          this.$root.toastSuccess("Gán cổng thành công.");
          this.loadThongTinAfterGanGo()
        }else {
          this.$root.toastSuccess("Gán cổng thất bại.");
        }
        this.resetDauVao()
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        this.$root.toastError("Gán cổng thất bại" + e);

      })
    },async ganDauVaoTabThueBao(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maKetNoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn cổng để gán.");
        return
      }
      // if(this.dsIdDauVao.length !== this.maKetNoiCheck.length){
      //   this.$root.toastWarning("Số cổng và số vị trí vào không tương đồng.");
      //   return
      // }
      this.loading(true)
      let data ={
        donvi_id : this.donviId,
        odf_id : this.odfId,
        ds_vitrivao : this.dsIdDauVao.toString(),
        ds_soivao: this.maKetNoiCheck.toString(),
        cbo_diemdau: this.tab4Radio
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/gan-dauvao-thuebao',data
      ).then(res =>{
        if(res.data.result){
          this.$root.toastSuccess("Gán cổng thành công.");
          this.loadThongTinAfterGanGo()
        }else {
          this.$root.toastSuccess("Gán cổng thất bại.");
        }
        this.resetDauVao()
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        this.$root.toastError("Gán cổng thất bại" + e);

      })
    },async ganDauVao(){
      if(this.activetab ===1){
        console.log(this.maKetNoiCheck.length  + "1  2" +  this.dsIdDauVao.length  )
        if(2 * this.maKetNoiCheck.length === this.dsIdDauVao.length ){

          await this.dau_txrx_ketnoi()
        }else if(this.dsIdDauVao.length === this.maKetNoiCheck.length){
          await this.dauNoiTabMaKetNoi()
        }else {
          this.$root.toastError("Số cổng và số vị trí vào không tương đồng.");
        }

      }else if(this.activetab ===2){
        await this.ganDauVaoDayNhay()
      }else if(this.activetab === 3 ){

        if(2 * this.maKetNoiCheck.length === this.dsIdDauVao.length ){
          //dau noi 2 vs 1
          await this.dau_txrx_tbi()
        }else if(this.dsIdDauVao.length === this.maKetNoiCheck.length){
          // dau noi  1 vs 1 đấu dây nhảy riêng case =1
           await this.gan_dauvao_tbi1()
        }else {
          this.$root.toastError("Số cổng và số vị trí vào không tương đồng.");
        }

      }else if(this.activetab ===4){
        await this.ganDauVaoTabThueBao()
      }
      this.resetDauVao()
      await this.loadThongTinAfterGanGo()
    },async goDauVao(){
      if(this.activetab ===4){
        await this.goDauVaoThueBao()
      }else {
        await this.goDauVaoConLai()
      }
      this.resetDauVao()
    },async goDauVaoThueBao(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gỡ.");
        return
      }
      this.loading(true)
      let array = [...this.dsIdDauVao].map(value => value)
      let data ={
      odf_id : this.odfId,
      ds_vitrivao : array.toString(),
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/go-dauvao-thuebao',data
    ).then(res =>{
      if(res.data.result){
        this.$root.toastSuccess("Gỡ cổng thành công.");
        this.loadThongTinAfterGanGo()
      }else {
        this.$root.toastSuccess("Gỡ cổng thất bại.");
      }
      this.loading(false)
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gỡ cổng thất bại" + e);

    })
  },async goDauVaoConLai(){
      if(this.dsIdDauVao.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gỡ.");
        return
      }
      this.loading(true)
      let array = [...this.dsIdDauVao].map(value => value)
      let data ={
      odf_id : this.odfId,
      ds_vitrivao : array.toString(),
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/go-dauvao',data
    ).then(res =>{
      if(res.data.result){
        this.$root.toastSuccess("Gỡ cổng thành công.");
        this.loading(false)
        this.loadThongTinAfterGanGo()
      }
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gỡ cổng thất bại" + e);

    })
  },async ganDauRa(){
      if(this.dsIdDauRa.length<=0){
        this.$root.toastError("Vui lòng chọn vị trí để gán.");
        return
      }

      if(this.maSoiCheck.length<=0){
        this.$root.toastError("Vui lòng chọn Sợi để gán.");
        return
      }
      if(this.dsIdDauRa.length !== this.maSoiCheck.length){
        this.$root.toastError("Số sợi và số vị trí ra không tương đồng.");
        return
      }
      this.loading(true)
      let data ={
        odf_id : this.odfId,
        p_capgoc_id_dr : this.capGocId,
        ds_soira : this.maSoiCheck.toString(),
        p_ds_vitrira : this.dsIdDauRa.toString(),
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/gan-daura',data
    ).then(res =>{
      this.$root.toastSuccess("Gán cổng thành công.");
      this.loadThongTinAfterGanGoRa()
      this.resetDauRa()

      this.loading(false)
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gán cổng thất bại" );
      console.log(e)
    })
  },resetDauRa(){
      this.dsIdDauRa = []
    },resetDauVao(){
      this.dsIdDauVao = []
      this.maKetNoiCheck = []
    },async goDauRaSoi(){
    if(this.dsIdDauRa.length<=0){
      this.$root.toastError("Vui lòng chọn vị trí để gỡ.");
      return
    }
    this.loading(true)
    let data ={
      odf_id : this.odfId,
      p_ds_vitrira : this.dsIdDauRa.toString(),
    }
    await this.$root.context.post(
      '/web-cabman/dau-noi-odf/go-daura',data
    ).then(res =>{
      this.$root.toastSuccess("Gỡ đầu ra thành công.");
      this.loadThongTinAfterGanGo()
      this.resetDauRa()
      this.loading(false)
    }).catch(e=> {
      this.loading(false)
      this.$root.toastError("Gỡ đầu ra thất bại" + e);

    })
  },async getDayNhayCbo(){
      this.loading(true)

      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ds-daynhay-dv?odf_id=${this.odfId}`
      ).then(res =>{
        this.dsDayNhayCbo = res.data
        if(res.data){
          this.dayNhayId  = this.dsDayNhayCbo[0].CAPTD_ID
        }
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
      })
    },async napSoiDayNhay(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ds-soidaynhay-dv?daynhay_id_dv=${this.dayNhayId}`
      ).then(res =>{

        this.dsMaKetNoi = res.data.map(item => {
          return {
            PORTVL_ID:  item.SOICAP,
            MA_KN:  item.SOICAP
          }
        } )
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async napCongDichVu(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ds-cong-tbi-dv?loaitbi_id_dv_3=${this.loaiThietBiID3}&thietbi_id_dv_3=${this.thietBiID3}`
      ).then(res =>{

        this.dsMaKetNoi = res.data.map(item => {
          return {
            PORTVL_ID:  item.VITRI,
            MA_KN:  item.VITRI_TEXT
          }
        } )
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async napSoMayThueBao(){
      if(!this.soMayThueBao){
        this.$root.toastError('Bạn phải nhập mã thuê bao.');
        return
      }
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/nap-ds-thuebao-dv?ma_tbao=${this.soMayThueBao}&cbo_diem=${this.tab4Radio}`
      ).then(res =>{

        this.dsMaKetNoi = res.data.map(item => {
          return {
            PORTVL_ID:  item.THUEBAO_ID,
            MA_KN:  item.MA_TB
          }
        } )
        this.loading(false)
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },dauTat(){
      if(this.dsIdDauVao.length!==2){
        this.$root.toastError('Hãy chọn 2 vị trí bất kì trên mặt trước để đấu dây nhảy.');
        return
      }
      this.$bvModal.show('modal-dautat')
    },async dauTatDayNhayOdf(){
      if(!this.kyHieuDayNhay){
        this.nameState = false
        this.$root.toastError('Bạn phải nhập Ký hiệu dây nhảy.');
        return
      }
      let data = {
        kyhieu: this.kyHieuDayNhay,
        odf_id: this.odfId,
        vitri_1: this.dsIdDauVao[0],
        vitri_2: this.dsIdDauVao[1]
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/dau-daynhay-odf',data
      ).then(res =>{
        this.$bvModal.hide('modal-dautat')

        this.loading(false)
        this.napDanhSachDauNoi()
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async UpdateGhiChu(vitriQu,ghiChu){

      let data = {
        vitri_qu: vitriQu,
        odf_id: this.odfId,
        ghichu: ghiChu
      }
      await this.$root.context.post(
        '/web-cabman/dau-noi-odf/capnhat-ghichu',data
      ).then(res =>{
        this.$bvModal.hide('modal-dautat')

        this.loading(false)
        this.napDanhSachDauNoi()
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async xuatGD(){
      this.loading(true)
      await this.$root.context.get(
        `/web-cabman/dau-noi-odf/lay-dando-truyendan?odf_id=${this.odfId}`
      ).then(res =>{
        this.loading(false)
        if(res.data) {
          //xuaats exxcel
          let data = XLSX.utils.json_to_sheet(Object.values(res.data));
        let wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, data, "XUAT_GD"); // sheetAName is name of Worksheet
        // export Excel file
        XLSX.writeFile(wb, "XuatGD.xlsx");
        }else {
          this.$toast.error('Không có dữ liệu xuất.')
        }
      }).catch(e=> {
        this.loading(false)
        console.log(e)
      })
    },async xuatDl(){
        if(this.dsDauNoi) {
          //xuaats exxcel
          let data = XLSX.utils.json_to_sheet(Object.values(this.dsDauNoi));
          let wb = XLSX.utils.book_new(); // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, data, "XUAT_DL"); // sheetAName is name of Worksheet
          // export Excel file
          XLSX.writeFile(wb, "XUAT_DL.xlsx");
        }else {
          this.$toast.error('Không có dữ liệu xuất.')
        }
    },resetModalDauTat(){
      this.kyHieuDayNhay = ''
    },xoaDayNhay(){
      if(!this.dayNhayId){
        return
      }
      this.$bvModal.msgBoxConfirm('Bạn có thực sự muốn xóa dây nhảy?', {
        size: 'sm',
        okTitle: 'Đồng ý',
        cancelTitle: 'Hủy',
      }).then(async v => {
        if(v) {
          try {
            this.loading(true);
            var rs = await this.$root.context.post(`/web-cabman/daunoi-thietbi/xoa-cap-td?captd_id=${this.dayNhayId}`);
            if(rs.data.result) {
              this.$root.toastSuccess("Xóa dữ liệu thành công!");
              await this.loadThongTinAfterGanGo()
            }
          } catch (error) {
            this.$root.toastError(error.response.data.message_detail);
          } finally {
            this.loading(false);
          }
        }
      }).catch(err => {
        this.$toast.toastError('Xóa thất bại');
      })
    }
  },
  async mounted () {

    // this.dataCheck =[
    //   // { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    //   // { id: 2, pid: 1, name: 'Hot Singles' },
    //   // { id: 3, pid: 1, name: 'Rising Artists' },
    //   // { id: 4, pid: 1, name: 'Live Music' },
    //   // { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    //   // { id: 7, name: 'Sales and Events', hasChild: true },
    //   // { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    //   // { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    //   // { id: 10, pid: 7, name: 'CD Deals' },
    //   // { id: 11, name: 'Categories', hasChild: true },
    //   // { id: 12, pid: 11, name: 'Songs' },
    //   // { id: 13, pid: 11, name: 'Bestselling Albums' },
    //   // { id: 14, pid: 11, name: 'New Releases' },
    //   // { id: 15, pid: 11, name: 'Bestselling Songs' },
    //   // { id: 16, name: 'MP3 Albums', hasChild: true },
    //   // { id: 17, pid: 16, name: 'Rock' },
    //   // { id: 18, pid: 16, name: 'Gospel' },
    //   // { id: 19, pid: 16, name: 'Latin Music' },
    //   // { id: 20, pid: 16, name: 'Jazz' },
    //   // { id: 21, name: 'More in Music', hasChild: true },
    //   { id: 22, name: 'Music Trade-In' },
    //   { id: 23, pid: 21, name: 'Redeem a Gift Card' },
    //   { id: 24, pid: 21, name: 'Band T-Shirts' },
    // ]
    // this.fields= { dataSource: this.dataCheck, value: 'id', text: 'name', parentValue:"pid", hasChildren: 'hasChild' }
    // dataSource: this.dsThietBi3
    // this.fields= { dataSource: this.dsThietBi3,   value: 'KEY', text: 'TEN_TB', parentValue:"PKEY", hasChildren: 'HAS_CHILD' }

    // var dataCheck = [
    //   {TEN_TB: "QUTR03_10", LOAITB_ID: 23, MA_LTB: "PHIEN_DOC", CO_PORT: 1, KEY: "23#3359", hasChild: true},
    //   {TEN_TB: "QUTR03_190", LOAITB_ID: 23, MA_LTB: "PHIEN_DOC", CO_PORT: 1, KEY: "20#523", PKEY: "23#3359"}
    //   // {TEN_TB: "QUTR03_180", LOAITB_ID: 23, MA_LTB: "PHIEN_DOC", CO_PORT: 1, KEY: "23#3351", PKEY: "23#3359", hasChild: false}
    // ]
    // [{
    //   TEN_TB: "HPG17QTU.vnpt.vn",
    //   LOAITB_ID: 17,
    //   MA_LTB: "MANE",
    //   CO_PORT: 0,
    //   KEY: "17#39580",
    //   PKEY: null,
    //   HAS_CHILD: true
    // },
    //   {
    //     TEN_TB: "#01 7600-ES20-10G3C [JAE13208UGF]",
    //     LOAITB_ID: 21,
    //     MA_LTB: "CARD_MANE",
    //     CO_PORT: 1,
    //     KEY: "21#23",
    //     PKEY: "17#39580"
    //   }]
  },
  async created() {

  }
}
</script>

