<template src="./index.template.html"></template>

<script>
import GianDo from "./GianDo";
import ModalTreocap from "./TreoCap/Modal";
import ModalQLCot from "./QLCot/Modal";
import ModalDsCot from "./DanhSachCot/Modal";
import ModalKCCot from "./KhoangCachHaiCot/Modal";
import MapControl from "./MapControl";
import DiagramLib from "../../../utils/DiagramLib";
import BanDo from "./BanDo";
import html2canvas from "html2canvas";
import EventBus from '@/utils/eventBus'
import {
  GridPlugin,
  Page,
  Filter,
  CommandColumn,
  Resize,
} from "@syncfusion/ej2-vue-grids";
import { Diagram } from "@syncfusion/ej2-diagrams";
export default {
  provide: {
    grid: [Filter, Page, CommandColumn, Resize],
  },
  components: {
    GridPlugin,
    ModalTreocap,
    ModalQLCot,
    ModalDsCot,
    MapControl,
    GianDo,
    DiagramLib,
    ModalKCCot,
    BanDo,
    html2canvas
  },

  data: function () {
    return {
      //#region "Khai báo chung"
      dsTTVT: [],
      dsToQL: [],
      dsTuyenCot: [],
      dsdataTem: [],
      dataSelected: {
        ttvt: 0,
        toql: 0,
      },
      dscot: [],
      dataSend: Object, //Gửi dữ liệu cho modal Quản lý cột
      datakcCot: Object, //Gửi dữ liệu cho modal KHoảng cách 2 cột
      dsCotChuaCoToaDo: [],
      dscotToaDo: [],
      tuyencot_id: null,
      ten_tuyen: "",
      cot_id: null,
      cot_id_thao_tac: null,
      cotsau_id: null,
      showcotChuaTD: false,
      txttimkiem: "",
      dsCotSearch:[],
      url: "#/cabman/tuyencot?id=",
      countAction: 0,
      isSearch: 0,
      isClose: false,
      stateBtn: {
        isDisableBtnTaoCot: true,
      },
      ok: false,
      //#endregion
      //#region "Giản đồ"
      dsNodes: [],
      dsConnectors: [],
      gianDoRefresh: false,
      hienThiGianDo: false,
      isTaoLienKet:false,
      repeat:0,
      showDataSearch:false
      //#endregion
    };
  },
  created: async function () {
    await this.getTTVT();
  },
  watch: {
    dscot: function (value) {
      try{
       this.refreshGianDo()
       this.veGianDo();
        
      }catch(e){
        this.refreshGianDo()
      }finally{
        this.refreshGianDo()
      }
    },
    txttimkiem: function(val){
      try{
       this.dsCotSearch =[...this.dscot]
      if(val!=""){     
      let sleep = ms => new Promise(resolve => setTimeout(resolve, 100))
      this.dsCotSearch=this.dsCotSearch.filter(x=>x.SO_HIEU.
                    toLowerCase().includes(val.toLowerCase()))
      }
      }catch(e){
         this.dsCotSearch =[...this.dscot]
      }
    }
  },
  computed: {},
  mounted(){
     let vm = this
    EventBus.$on("refeshBanDo", (data) => {
      if(data)
       vm.getGianDoCot() 
    });
    EventBus.$on("NAP_GIAN_DO", async (themCot, success) => {
      if(success){
      if(themCot){
      await vm.getdsTuyenCot() 
      await vm.getGianDoCot()}
      else{
      await vm.getGianDoCot()
      }
      }
    });
    window.addEventListener('beforeunload', function (e) {
      if(vm.showcotChuaTD){
     // Cancel the event
     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
     // Chrome requires returnValue to be set
     e.returnValue = '';  
     // Người dùng tự bấm lưu  
      }
    });
    window.addEventListener('keypress', function (e) {
        if(e.key=="F5"){
           if(vm.showcotChuaTD){
             e.preventDefault(); 
             e.returnValue = ''; 
             } 
         }       
      })
  },
   destroyed() {
    EventBus.$off("refeshBanDo");
     EventBus.$off("NAP_GIAN_DO");
  },
  methods: {
    //#region "Hàm chung"
    setDisableBtn: function (isTaoCot) {
      this.stateBtn.isDisableBtnTaoCot = isTaoCot;
    },
    getTTVT: async function () {
      try {
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/dsttvt_theonv"
        );
        this.dsTTVT = rs.data;
      } catch (error) {
      } finally {
      }
    },
    getToQL: async function () {
      try {
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/ds_to_kythuat_theonv/" +
            this.dataSelected.ttvt
        );
        this.dsToQL = rs.data;
      } catch (error) {
      } finally {
      }
    },
    getdsTuyenCot: async function () {
      try {
        this.$root.showLoading(true);
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/ds_tuyencot/" + this.dataSelected.toql
        );
        this.dsTuyenCot = rs.data;
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.$root.showLoading(false);
      }
    },
    onChangeTTVT: async function () {
      this.tuyencot_id =-1
      this.dsTuyenCot =[]
     await this.getGianDoCot()
     await this.getToQL();
    },
    onChangeToQL: async function () {
      this.tuyencot_id =-1
      this.dsTuyenCot =[]
      await this.getGianDoCot()
      await this.getdsTuyenCot();
    },
    toQLSelectEvent: function (event) {
      this.dataSend.dvql = {
        id: event.id,
        name: event.text,
      };
    },
    getGianDoCot: async function () {
      try {
        this.$root.showLoading(true);
        this.showDataSearch = false
         this.dscot = []
        this.dsCotSearch = []
        this.dsCotChuaCoToaDo = []
        this.dscotToaDo = []
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/gian_do_cot/" + this.tuyencot_id
        );
        if(rs.data.dscot!=null && rs.data.dscot.length>0){
        rs.data.dscot.sort(function (a, b) {
          return a.COT_ID < b.COT_ID ? -1 : 1;
        });
        this.dscot = rs.data.dscot;
        this.dsCotSearch = [... this.dscot]
        this.dsCotChuaCoToaDo = rs.data.dscot.filter((cot) => cot.TOADO == '0,0');
        this.dscotToaDo = rs.data.dscot.filter((cot) => cot.TOADO != '0,0');
        }
      } catch (error) {
      } finally {
        this.$root.showLoading(false);
      }
    },
    grid_onRowDoubleClicked: function (rowIndex, dataItem) {
      if (dataItem != null) {
        this.tuyencot_id = dataItem.TUYENCOT_ID;
        this.ten_tuyen = dataItem.MA_TC;
        this.setDisableBtn(false);
        this.dataSend.tuyencot_id = dataItem.TUYENCOT_ID;
        this.dataSend.ten_tuyen = "["+dataItem.MA_TC+"] "+dataItem.TUYEN_COT;
        this.isClose = true;
        this.getGianDoCot();
      }
    },
    huongdan: function () {
       this.$root.toastError("Tài liệu đang được cập nhật");
    },
    taocot: function(){
      if(this.tuyencot_id!=null){
       this.dataSend.cot_id = null;
       this.$bvModal.show('popupQLCot')}
       else{
         this.$root.toastError("Chưa chọn tuyến cột");
       }
    },
    //#endregion

    //#region "Liên quan tới cột"
    chitietCot: async function (cot_id) {
      try {
        var rs = await this.$root.context.get(
          "/web-cabman/bando_tuyencot/chitiet_cot_theo_id/" + cot_id
        );
      } catch (error) {
      } finally {
      }
    },
    lienketCot: async function (cot_id, cot_sau_id) {
      try {
        var rs = await this.$root.context.post(
          "/web-cabman/bando_tuyencot/tao_lienket_cot",
          {
            cot_id: cot_id,
            cot_sau_id: cot_sau_id,
          }
        );
        if (rs.error_code === "BSS-00000000") {
          this.$toast.success(
            "Liên kết tới cột thành công"
          );
          if (!this.showcotChuaTD) {
            this.refreshGianDo();
            this.getGianDoCot();
          } else {
            this.getGianDoCot();
          }
          this.cot_id_thao_tac = null;
          this.cotsau_id = null;
        } else
          this.$toast.error("Liên kết tới cột thất bại");
      } catch (error) {
      } finally {
      }
    },
    xacnhanCot: function (obj) {
      if (obj != null) {
        this.cot_id_thao_tac = obj.cot_id;
        if (obj.type == "MENU_ITEM_THUOC_TINH") {
          this.dataSend.cot_id = obj.cot_id;
          this.$bvModal.show("popupQLCot");
        }
      }
    },
    getcotSau: function (cotsau_id) {
      if (cotsau_id != null) {
        this.lienketCot(this.cot_id_thao_tac, cotsau_id);
      }
    },
    huy_lien_ket: async function () {
      try {
        if (this.cot_id_thao_tac != null) {
          var rs = await this.$root.context.post(
            "/web-cabman/bando_tuyencot/huy_lienket_cot",
            {
              cot_id: this.cot_id_thao_tac,
            }
          );
          if (rs.error_code === "BSS-00000000") {
            this.$toast.success(
              "Hủy liên kết cột thành công"
            );
            if (!this.showcotChuaTD) {
              this.refreshGianDo();
              this.getGianDoCot();
            } else {
              this.getGianDoCot();
            }
            this.cot_id_thao_tac = null;
          } else
            this.$toast.error(
              "Hủy liên kết cột thất bại"
            );
        }
      } catch (error) {
        this.$toast.error(
          "Hủy liên kết cột thất bại"
        );
      } finally {
      }
    },
    xoaCot: async function () {
      try {
        if (this.cot_id_thao_tac != null) {
          var rs = await this.$root.context.post(
            "/web-cabman/bando_tuyencot/xoa_cot",
            {
              cot_id: this.cot_id_thao_tac,
            }
          );
          if (rs.error_code === "BSS-00000000") {
            this.$toast.success(
              "Xóa cột thành công"
            );
            if (!this.showcotChuaTD) {
              this.refreshGianDo();
              await this.getdsTuyenCot()
              await this.getGianDoCot()
            } else {
              await this.getdsTuyenCot()
              await this.getGianDoCot()
            }
          } else
            this.$toast.error("Xóa cột thất bại");
        }
      } catch (error) {
        this.$toast.error(error.response.data.message_detail);
      } finally {
      }
    },
    getCot: async function (cot) {
       if(cot != null){
      this.txttimkiem = cot.SO_HIEU;
      this.$refs.giando.selectedCot(cot.COT_ID)
      }
    },
    gridCotChuaCoTD_onCommandClicked: function (name, args) {
      if (name == "SuaCot") {
        this.dataSend.cot_id = args.COT_ID.split("_")[1];
         this.$bvModal.show("popupQLCot");
      }
      if (name == "GhiToaDo") {
         this.$root.toastError('Nhấn chuột trái lên vị trí bản đồ để ghim tọa độ cột.')
       EventBus.$emit("ghiToaDo",args);
      }
    },
    gridTC_onCommandClicked: function (name, args) {
      if (name == "SuaTC") {
        window.open(this.url + args.TUYENCOT_ID, "_blank");
      }
    },
    Refesh: function () {
      this.$confirm(`Bạn có chắc muốn nạp lại giản đồ/bản đồ?`,
        'Giản đồ tuyến cột',
        {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không'
        }).then(() => {
        try {
        this.$root.showLoading(true);
        if (!this.showcotChuaTD) {
          this.refreshGianDo();
          this.getGianDoCot();
        } else {
          this.getGianDoCot();
        }
      } catch (er) {
      } finally {
        this.$root.showLoading(false);
      }
    }).catch(() => {})
    },
    chonCotKhacTuyen: function (dataCot) {
      if (dataCot != null) {
        this.lienketCot(this.cot_id_thao_tac, dataCot.COT_ID);
      }
    },
    kc2cot: function (obj) {
      if (obj != null) {
        this.datakcCot = obj;
        this.$bvModal.show("popupKcHaiCot");
        if (!this.showcotChuaTD) {
          this.refreshGianDo();
          this.getGianDoCot();
        } else {
          this.getGianDoCot();
        }
      }
    },
    //#endregion

    //#region "Hàm Giãn đồ"
    veGianDo: function () {
      try {
        let nodes = [];
        let connectors = [];
        let index = 0;
        let dsChuaLienKet = this.laydsCotChuaLienKet();
        // Các cột chưa có liên kết
        if(dsChuaLienKet.length>0)
        for(let i=0;i<dsChuaLienKet.length;i++){
          let node;
          node = this.TaoDuLieuNode(dsChuaLienKet[i], true, index, i);
          nodes.push(node);
        }
        
        index++
        // Phần chuỗi liên kết
        let dsDauChuoiLienKet = this.laydsCot_DauCuaChuoiLienKet()
         for (let i = 0; i < dsDauChuoiLienKet.length; i++) {
         let dt=   this.taoChuoiLienKet(dsDauChuoiLienKet[i],nodes,connectors,index);
         nodes= dt[0]
         connectors=dt[1]
         index = dt[2]
         }
        for (let i = 0; i < this.dscot.length; i++) {
        let dt=   this.taoChuoiLienKet(this.dscot[i],nodes,connectors,index);
         nodes= dt[0]
         connectors=dt[1]
         index = dt[2]
        }
        this.dsNodes = nodes;
        this.dsConnectors = connectors;
      } catch (err) {
        console.log(err)
      }
    },
    taoNode: function (nodeID, text, stringStyle) {
      if (text == null) text = "null";
      text =
        "<div style='position: absolute; top: -70px; left: -40px; right: -50px'><div class='text-nowrap'"+
         " style='padding: 1px 1px; border: 1px solid #E0E0E0; background-color: #F5F5F5;"+
         " display: inline-table; border-radius: 5px;text-align:center'>" +
        text +
        "</div></div>";
      let ports = [];
      ports.push(DiagramLib.taoPort(nodeID + "_port_1", DiagramLib.PORT_TRAI));
      ports.push(DiagramLib.taoPort(nodeID + "_port_2", DiagramLib.PORT_PHAI));
      ports.push(DiagramLib.taoPort(nodeID + "_port_3", DiagramLib.PORT_TREN));
      ports.push(DiagramLib.taoPort(nodeID + "_port_4", DiagramLib.PORT_DUOI));
      let annotations = [];
      annotations.push({ template: text, style: { textWrapping: "NoWrap" }});
      let node = DiagramLib.taoNodeTheoStyle(
        stringStyle,
        nodeID,
        ports,
        annotations
      );
      node.height =25
      node.width=25
      return node;
    },
    taoKetNoi: function (id, nodeSource, nodeTarget, text, portN, portD) {
      let sourceID = nodeSource.id;
      let sourcePortID = portN; //nodeSource.ports[1].id;
      let targetID = nodeTarget.id;
      let targetPortID = portD; //nodeTarget.ports[0].id;
      //let style = { strokeWidth: 4, strokeColor: "#0176FF", fill: "#0176FF", strokeDashArray: "20" };
      let annotations = [
        {
          height: 20,
          width: 30,
          content: text,
          margin: { top: 20 },
          style: {
            textWrapping: "NoWrap",
            fill: "#F5F5F5",
            strokeWidth: 1,
            strokeColor: "#E0E0E0",
          },
        },
      ];
      let ketNoi = DiagramLib.taoKetNoiTheoStyle(
        "0-1-4-0",
        id,
        sourceID,
        targetID,
        sourcePortID,
        targetPortID,
        annotations
      );
      ketNoi.targetDecorator = {
        shape: "None",
      };
      ketNoi.type = "Orthogonal";
      return ketNoi;
    },
    refreshGianDo: function () {
      this.gianDoRefresh = !this.gianDoRefresh;
    },
    getcotByID: function (Cot_id) {
      return this.dscot.filter((x) => x.COT_ID == Cot_id)[0];
    },
    TaoDuLieuNode(cot, sau, i, count) {
      let COT_ID = cot.COT_ID;
      let icon = cot.ICON_STYLE;
     // let ten = cot.SO_HIEU;
      let ten = cot.SO_HIEU + "<br> " + cot.DIACHI;
      //do icon = COT_VUONG chưa có hình, đang chờ ERP gửi nên dùng tạm icon_d = 3
     // icon = "3";
      let node = this.taoNode(COT_ID, ten, icon);
      
      if (!sau)
      if(!this.hienThiGianDo)
      node.offsetX = 50;
      else
       node.offsetX = 2000;
      else
       if(!this.hienThiGianDo)
      node.offsetX = 250 * count + 50;
      else
      node.offsetX = 1500- 250 * count;
      if(i==0)
      node.offsetY = 100 
      else
      node.offsetY = 100+ 200*(i);
      return node;
    },
    xacnhanTuyChon: function () {
      if (this.hienThiGianDo) {
        if (this.dscot != null && this.dscot.length > 0) {
          this.refreshGianDo();
          this.getGianDoCot();
        } else  this.$root.toastError("Giản đồ chưa được nạp.");
      }else
      {
         this.refreshGianDo();
         this.getGianDoCot();
      }
    },
    laydsCotChuaLienKet: function () {
      let list = [];
      let dsCotChuaLK = this.dscot.filter((x) => x.COTSAU_ID == null);
      for (let i = 0; i < dsCotChuaLK.length; i++) {
        if (
          this.dscot.filter((y) => y.COTSAU_ID == dsCotChuaLK[i].COT_ID)
            .length == 0
        )
          list.push(dsCotChuaLK[i]);
      }
      return list;
    },
    laydsCot_DauCuaChuoiLienKet: function () {
      let list = [];
      let dsCotChuaLK = this.dscot.filter((x) => x.COTSAU_ID != null);
      for (let i = 0; i < dsCotChuaLK.length; i++) {
        if (
          this.dscot.filter((y) => y.COTSAU_ID == dsCotChuaLK[i].COT_ID)
            .length == 0
        )
          list.push(dsCotChuaLK[i]);
      }
      return list;
    },
    luuToaDoBanDo:async function(nodes){      
      var flag = true;
     if(nodes!=null && nodes.length>0){
       this.$root.showLoading(true);
       for(let i=0;i<nodes.length;i++){
        try {
         let obj={
           cot_id: nodes[i].id,
           kinhdo: nodes[i].lng,
           vido: nodes[i].lat
         } 
        var rs = await this.$root.context.post(
          "/web-cabman/bando_tuyencot/capnhat_toado",obj
        );
       }  
       catch (error) {
        flag=false
      } finally {
        this.$root.showLoading(false);
      }   
       }
     } 
    },
    tao_lien_ket:function(){
      this.isTaoLienKet=true
       this.$root.toastError("Chọn cột nguồn\r\nNhấn ESC để hủy");
    },
    tao_lien_ket_v2: function(doituong){
     if(doituong!=null && doituong.length==2){
       this.lienketCot(doituong[0],doituong[1]);
     }
     this.isTaoLienKet=false
    },
    taoChuoiLienKet:function(cot,nodes,connectors,index){
        let nodeN;
        let dsCotTruoc=[]
      if (
            nodes.length == 0 ||
            nodes.filter((x) => x.id == cot.COT_ID).length == 0
          ) {
            nodeN = this.TaoDuLieuNode(cot, false, index, 0);           
            nodes.push(nodeN);
                       
            let count = 0;
            while (cot.COTSAU_ID != null) {
              let cot_sau = this.getcotByID(cot.COTSAU_ID);
              count++;
              let nodeD;
              nodeD = this.TaoDuLieuNode(cot_sau, true, index, count);
            //   if(this.checkCoCotTruoc(cot.COTSAU_ID)){
            //   dsCotTruoc = this.laydsCotTruoc(cot.COTSAU_ID)
            //  //console.log('Truoc ',cot.COTSAU_ID,': ',dsCotTruoc)
            // }
              let link_id = "LINK_" + nodeN.id + "_" + nodeD.id;
              if (
                connectors.length == null ||
                connectors.filter((x) => x.id == link_id).length == 0
              ) {
                if (nodes.filter((x) => x.id == cot_sau.COT_ID).length == 0) {
                  nodes.push(nodeD);
                  connectors.push(
                    this.taoKetNoi(
                      link_id,
                      nodeN,
                      nodeD,
                      cot.KC_COTSAU == null
                        ? " "
                        : cot.KC_COTSAU.toString() + " m",
                      nodeN.ports[1].id,
                      nodeD.ports[0].id
                    )
                  );
                } else {
                  connectors.push(
                    this.taoKetNoi(
                      link_id,
                      nodeN,
                      nodeD,
                      cot.KC_COTSAU == null
                        ? " "
                        : cot.KC_COTSAU.toString() + " m",
                      nodeN.ports[2].id,
                      nodeD.ports[3].id
                    )
                  );
                  break
                }
              }
              cot = cot_sau;
              nodeN = nodeD;
            }
            index++;
          }
          let doituong=[]
          doituong.push(nodes);
          doituong.push(connectors)
          doituong.push(index)
      return doituong
    },
    checkCoCotTruoc: function(id){
      return this.dscot.filter(x=>x.COTSAU_ID == id).length > 1
    },
    laydsCotTruoc: function(id){
      return this.dscot.filter(x=>x.COTSAU_ID == id)
    },
    //#endregion

    //#region "Xử lý nghiệp vụ"
    zoomIn: function () {
    if(!this.showcotChuaTD)
    this.$refs.giando.ZoomIn()
    else
    this.setZoomMap(1)
    },
    zoomOut: function () {
       if(!this.showcotChuaTD)
         this.$refs.giando.ZoomOut()
         else
    this.setZoomMap(-1)
    },
    zoomReset: function () {
       if(!this.showcotChuaTD)
       this.$refs.giando.ZoomReset()
       else
    this.setZoomMap(0)
    },
    setZoomMap: function(step){
     this.$refs.bando.setZoomMap(step)
    },
    print() {
        if(!this.showcotChuaTD){
            let diagramInstance = Diagram;
        let diagramObj = document.getElementById("diagram");
        diagramInstance = diagramObj.ej2_instances[0];
        let printOptions = {};
        printOptions.mode = "Data";
        printOptions.region = "PageSettings";
        printOptions.multiplePage = true;
        printOptions.pageHeight = 400;
        printOptions.pageWidth = 400;
        diagramInstance.print(printOptions);
        }else{
     var fin = document.getElementById('bando')     
      html2canvas(fin, {
        useCORS: true,
        allowTaint: false,
        ignoreElements: (node) => {
          return node.nodeName === 'IFRAME'
        }}).then(function (canvas) {
        var imgSrc = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        var link = document.createElement('a')
        link.href = imgSrc
        link.download = 'bando.png'
        link.click()
      })
        }
      // }
    },
    //#endregion
  },
};
</script>
<style>
.grid-stack-box {
  background-color: transparent;
}
a.disabled {
  pointer-events: none;
  cursor: default;
  color: #6c757d !important;
}
.wrapper {
  display: flex;
  margin: 0 auto;
  position: relative;
}
</style>
