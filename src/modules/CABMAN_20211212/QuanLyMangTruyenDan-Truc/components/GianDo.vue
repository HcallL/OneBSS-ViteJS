<template>
        <ejs-diagram
              style='display:block'
              id="diagram"
              ref="diagram"
              :click="diagramClick"
              :height='height'
              :snapSettings='snapSettings'
              :tool="tool"
              :getConnectorDefaults='getConnectorDefaults'
              :getNodeDefaults='getNodeDefaults'
              :width='width'
              :keyDown="keyDown"
              :keyUp="keyUp"
              :mouseOver="mouseOver"
              :contextMenuOpen="contextMenuOpen"
              :contextMenuClick="contextMenuClick"
              :mouseLeave="mouseLeave"
              :selectedItems='selectedItems'
              :contextMenuSettings='contextMenuSettings'
               mode="SVG"
               backgroundColor='white'
              enableAnimation="true"
         >
         </ejs-diagram>
</template>
<script>
import Vue from 'vue'
import EventBus from '@/utils/eventBus'
import {
  Diagram,
  NodeModel,
  Node,
  ConnectorConstraints,
  Connector,
  PortVisibility,
  ConnectorEditing,
  DataBinding,
  SnapConstraints,
  SnapSettingsModel,
  DiagramContextMenu,
  Snapping,
  NodeConstraints,
  DiagramConstraints,
  UndoRedo,
  SelectorConstraints,
  DiagramTools,
  ZoomPanTool,
  ConnectionPointOrigin,
  ChildArrangement,
  PortConstraints,
  ComplexHierarchicalTree,
  HierarchicalTree,
  LineDistribution,
  LayoutOrientation,
  LineRouting,
  DiagramPlugin
} from '@syncfusion/ej2-vue-diagrams'
import {ContextMenuComponent} from '@syncfusion/ej2-vue-navigations'

import Point from '../class/Point'
import Link from '../class/Link'
import DiagramLib from '@/utils/DiagramLib'

Vue.use(DiagramPlugin)
Diagram.Inject(LineRouting)
let diagramInstance

export default Vue.extend({
  data: function () {
    return {
      previousConnector:null,
      previousNode:null,

      Points: [],
      Links: [],
      width: '100%',
      height: '100%',
      constraints: DiagramConstraints.Default | DiagramConstraints.LineRouting,
      layout:{},
      // layout: {
      //   arrangement: ChildArrangement.Linear,
      //   type: 'ComplexHierarchicalTree',
      //   connectionPointOrigin: ConnectionPointOrigin.DifferentPoint,
      //   orientation: 'LeftToRight',
      //   verticalSpacing: 100,
      //   horizontalSpacing: 270,
      //   margin: { left: 10, right: 0, top: 50, bottom: 0 },
      //   enableRouting: true
      // },
      snapSettings: {
        horizontalGridlines: {lineColor: '#cdcdcd', dotIntervals: [0.95, 20.75], lineIntervals: [0.95, 20.75], snapIntervals: [10]},
        verticalGridlines: {lineColor: '#cdcdcd', dotIntervals: [0.95, 20.75], lineIntervals: [0.95, 20.75], snapIntervals: [10]},
        gridType: 'Dots',
        constraints: SnapConstraints.SnapToLines | SnapConstraints.ShowLines
      },
      tool: DiagramTools.SingleSelect | DiagramTools.ZoomPan,
      selectedItems: {
        constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate & ~SelectorConstraints.ResizeAll
      },
      getNodeDefaults: (obj) => {
        obj.constraints = (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly | NodeConstraints.Select) & ~NodeConstraints.Drag & ~NodeConstraints.Resize & ~NodeConstraints.Rotate
      },
      getConnectorDefaults: (obj) => {
        // obj.type = 'Bezier'
        // obj.type = 'Orthogonal'
        obj.constraints = (ConnectorConstraints.Default | ConnectorConstraints.Tooltip | ConnectorConstraints.ReadOnly) & ~ConnectorConstraints.Drag
        obj.targetDecorator = {shape: 'None'}
      }, contextMenuSettings: {
        show: true ,
        items: [
          // MENU TRAM_TB
          {
            text: "Đấu nối thiết bị",
            id: "MENU_ITEM_DAU_NOI_THIET_BI",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            id: "MENU_ITEM_SEPARATOR_1",
            separator: true,
          },
          {
            text: "Đổi biểu tượng",
            id: "MENU_DOI_BIEU_TUONG",
            target: ".e-diagramcontent",
            iconCss: "fa fa-remove",
            items: [
              {
                text: "Host",
                id: "ICON_HOST",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
              {
                text: "Trạm MSAN,RSU có BTS",
                id: "ICON_MSAN_BTS",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },{
                text: "Trạm MSAN,RSU không có BTS",
                id: "ICON_MSAN_NO_BTS",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },{
                text: "Trạm BTS",
                id: "ICON_BTS",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              }]
          },
          {
            text: "Đổi đánh dấu",
            id: "MENU_DOI_DANH_DAU",
            target: ".e-diagramcontent",
            iconCss: "fa fa-remove",
            items: [
              {
                text: "Không có đánh dấu",
                id: "NO_TICK",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },{
                id: "MENU_ITEM_SEPARATOR_1",
                separator: true
              },
              {
                text: "Đánh dấu kiểu 1",
                id: "TICK_1",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },{
                text: "Đánh dấu kiểu 2",
                id: "TICK_2",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },{
                text: "Đánh dấu kiểu 3",
                id: "TICK_3",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              }]
          },
          {
            text: "Tạo cáp tới",
            id: "MENU_TAO_CAP_TOI",
            target: ".e-diagramcontent",
            iconCss: "fa fa-remove",
          },{
            id: "MENU_ITEM_SEPARATOR_1",
            separator: true,
          },{
            text: "Thuộc tính",
            id: "MENU_ITEM_THUOC_TINH",
            target: ".e-diagramcontent",
            iconCss: "fa fa-info-circle",
          },

          // MENU CAP
          {
            text: "Thêm điểm uốn",
            id: "MENU_ITEM_THEM_DIEMUON_CAP",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            text: "Xóa toàn bộ điểm uốn",
            id: "MENU_ITEM_XOA_TOANBO_DIEMUON",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            id: "MENU_ITEM_SEPARATOR_2",
            separator: true,
          },
          {
            text: "Chèn kết cuối",
            id: "MENU_ITEM_CHEN_KETCUOI",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            text: "Chi tiết đấu nối",
            id: "MENU_ITEM_CHITIET_DAUNOI",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            id: "MENU_ITEM_SEPARATOR_2",
            separator: true,
          },
          {
            text: "Chuyển kiểu cáp ...",
            id: "MENU_ITEM_CHUYEN_KIEUCAP",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
            items:[
              {
                text: "Cáp thuê bao",
                id: "MENU_ITEM_CAP_THUEBAO",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
              {
                text: "Cáp truyền dẫn",
                id: "MENU_ITEM_CAP_TRUYENDAN",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
            ]
          },
          {
            text: "Chuyển kiểu đi cáp ...",
            id: "MENU_ITEM_CHUYEN_KIEU_DI_CAP",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
            items:[
              {
                text: "Kéo cống",
                id: "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOCONG",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
              {
                text: "Kéo treo",
                id: "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOTREO",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
              {
                text: "Chôn",
                id: "MENU_ITEM_CHUYEN_KIEU_DI_CAP_CHON",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
              {
                id: "MENU_ITEM_SEPARATOR_2",
                separator: true,
              },
              {
                text: "Đề xuất kéo mới",
                id: "MENU_ITEM_CHUYEN_KIEU_DI_CAP_DEXUAT_KEOMOI",
                target: ".e-diagramcontent",
                iconCss: "fa fa-exchange",
              },
            ]
          },
          {
            text: "Xóa cáp",
            id: "MENU_ITEM_XOA_CAP",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
          {
            text: "Thuộc tính",
            id: "MENU_ITEM_THUOCTINH_CAP",
            target: ".e-diagramcontent",
            iconCss: "fa fa-exchange",
          },
        ],
        // Hides the default context menu items
        showCustomMenuOnly: true,
      },
      contextMenuOpen: function (args) {
        if (this.selectedItems.nodes.length > 0) {
          args.items.forEach(item =>{
            if (item.id !== "MENU_ITEM_DAU_NOI_THIET_BI" &&
                item.id !== "MENU_ITEM_SEPARATOR_1" &&
                item.id !== "MENU_DOI_BIEU_TUONG" &&
                item.id !== "ICON_HOST" &&
                item.id !== "ICON_MSAN_BTS" &&
                item.id !== "ICON_MSAN_NO_BTS" &&
                item.id !== "ICON_BTS" &&
                item.id !== "MENU_DOI_DANH_DAU" &&
                item.id !== "NO_TICK" &&
                item.id !== "TICK_1" &&
                item.id !== "TICK_2" &&
                item.id !== "TICK_3" &&
                item.id !== "MENU_TAO_CAP_TOI" &&
                item.id !== "MENU_ITEM_THUOC_TINH"
            ){
              args.hiddenItems.push(item.id)
            }
          })
        } else if (this.selectedItems.connectors.length > 0) {
          args.items.forEach(item =>{
            if (item.id !== "MENU_ITEM_THEM_DIEMUON_CAP" &&
                item.id !== "MENU_ITEM_XOA_TOANBO_DIEMUON" &&
                item.id !== "MENU_ITEM_CHEN_KETCUOI" &&
                item.id !== "MENU_ITEM_CHITIET_DAUNOI" &&
                item.id !== "MENU_ITEM_SEPARATOR_2" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEUCAP" &&
                item.id !== "MENU_ITEM_CAP_THUEBAO" &&
                item.id !== "MENU_ITEM_CAP_TRUYENDAN" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOCONG" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOTREO" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_CHON" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_DEXUAT_KEOMOI" &&
                item.id !== "MENU_ITEM_XOA_CAP" &&
                item.id !== "MENU_ITEM_THUOCTINH_CAP"){
              args.hiddenItems.push(item.id)
            }
          })
        } else {
          args.items.forEach(item =>{
            if (item.id !== "MENU_ITEM_DAU_NOI_THIET_BI" &&
                item.id !== "MENU_ITEM_SEPARATOR_1" &&
                item.id !== "MENU_DOI_BIEU_TUONG" &&
                item.id !== "ICON_HOST" &&
                item.id !== "ICON_MSAN_BTS" &&
                item.id !== "ICON_MSAN_NO_BTS" &&
                item.id !== "ICON_BTS" &&
                item.id !== "MENU_DOI_DANH_DAU" &&
                item.id !== "NO_TICK" &&
                item.id !== "TICK_1" &&
                item.id !== "TICK_2" &&
                item.id !== "TICK_3" &&
                item.id !== "MENU_TAO_CAP_TOI" &&
                item.id !== "MENU_ITEM_THUOC_TINH" &&

                item.id !== "MENU_ITEM_THEM_DIEMUON_CAP" &&
                item.id !== "MENU_ITEM_XOA_TOANBO_DIEMUON" &&
                item.id !== "MENU_ITEM_CHEN_KETCUOI" &&
                item.id !== "MENU_ITEM_CHITIET_DAUNOI" &&
                item.id !== "MENU_ITEM_SEPARATOR_2" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEUCAP" &&
                item.id !== "MENU_ITEM_CAP_THUEBAO" &&
                item.id !== "MENU_ITEM_CAP_TRUYENDAN" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOCONG" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOTREO" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_CHON" &&
                item.id !== "MENU_ITEM_CHUYEN_KIEU_DI_CAP_DEXUAT_KEOMOI" &&
                item.id !== "MENU_ITEM_XOA_CAP" &&
                item.id !== "MENU_ITEM_THUOCTINH_CAP"){
              args.hiddenItems.push(item.id)
            }
          })
        }
      },
    }
  },
  provide: {
    diagram: [DiagramContextMenu, ComplexHierarchicalTree, HierarchicalTree, LineDistribution ]
  },
  watch: {

  },
  computed: {

  },
  mounted: function () {
    diagramInstance = this.$refs.diagram.ej2Instances
    diagramInstance.fitToPage()
  },
  created () {

  },
  methods: {
    contextMenuClick: function (args) {
      /***
       * HANDLE MENU TRAM_TB
       */
      // ĐỔI BIỂU TƯỢNG
      if (args.element.id === "ICON_HOST") {
        let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
        if (idx > -1) {
          this.mniDoiBieuTuong_Click(parseInt(diagramInstance.nodes[idx].id.split("TRAM_TB_")[1], 10), 'HOST')
        }
      }
      if (args.element.id === "ICON_MSAN_BTS") {
        let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
        if (idx > -1) {
          this.mniDoiBieuTuong_Click(parseInt(diagramInstance.nodes[idx].id.split("TRAM_TB_")[1], 10), 'MSAN_RSU_BTS')
        }
      }
      if (args.element.id === "ICON_MSAN_NO_BTS") {
        let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
        if (idx > -1) {
          this.mniDoiBieuTuong_Click(parseInt(diagramInstance.nodes[idx].id.split("TRAM_TB_")[1], 10), 'MSAN_RSU')
        }
      }
      if (args.element.id === "ICON_BTS") {
        let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
        if (idx > -1) {
          this.mniDoiBieuTuong_Click(parseInt(diagramInstance.nodes[idx].id.split("TRAM_TB_")[1], 10), 'BTS')
        }
      }
      // ĐỔI ĐÁNH DẤU
      if (args.element.id === "NO_TICK") {
        this.mniDanhDau_Click(null, false)
      }
      if (args.element.id === "TICK_1") {
        this.mniDanhDau_Click(1, true)
      }
      if (args.element.id === "TICK_2") {
        this.mniDanhDau_Click(2, true)
      }
      if (args.element.id === "TICK_3") {
        this.mniDanhDau_Click(3, true)
      }

      /***
       * HANDLE MENU CAP
       */
      // CHUYỂN KIỂU CÁP
      if (args.element.id === "MENU_ITEM_CAP_THUEBAO") {
        this.$emit("mniChuyenKieuCap_Click",0, parseInt(diagramInstance.selectedItems.connectors[0].id,10))
      }
      if (args.element.id === "MENU_ITEM_CAP_TRUYENDAN") {
        this.$emit("mniChuyenKieuCap_Click",1, parseInt(diagramInstance.selectedItems.connectors[0].id,10))
      }
      // CHUYỂN KIỂU ĐI CÁP
      if (args.element.id === "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOCONG"){
        this.mniChuyenKieuDiCap_Click(2)
      }
      if (args.element.id === "MENU_ITEM_CHUYEN_KIEU_DI_CAP_KEOTREO"){
        this.mniChuyenKieuDiCap_Click(3)
      }
      if (args.element.id === "MENU_ITEM_CHUYEN_KIEU_DI_CAP_CHON"){
        this.mniChuyenKieuDiCap_Click(4)
      }
      if (args.element.id === "MENU_ITEM_CHUYEN_KIEU_DI_CAP_DEXUAT_KEOMOI"){
        this.mniChuyenKieuDiCap_Click(5)
      }
    },
    // CHUYỂN KIỂU CÁP
    mniChuyenKieuCap_Click(KIEU){
      //THAY ĐỔI TRÊN GIẢN ĐỒ
      let idx = diagramInstance.connectors.findIndex(x => x.id.toString() === diagramInstance.selectedItems.connectors[0].id.toString())
      if (idx > -1){
        const CAP_THUEBAO = 0, CAP_TRUYENDAN = 1
        if (KIEU === CAP_THUEBAO){
          diagramInstance.connectors[idx].style.strokeWidth = 2
          // cập nhật thông tin cáp
          diagramInstance.connectors[idx].Width = 1
          diagramInstance.connectors[idx].SelectedWidth = 2

          diagramInstance.connectors[idx].style.strokeWidth = diagramInstance.connectors[idx].SelectedWidth
        }else if (KIEU === CAP_TRUYENDAN){
          // cập nhật thông tin cáp
          diagramInstance.connectors[idx].Width = 3
          diagramInstance.connectors[idx].SelectedWidth = 5

          diagramInstance.connectors[idx].style.strokeWidth = diagramInstance.connectors[idx].SelectedWidth
        }
        diagramInstance.dataBind()
      }
    },
    // CHUYỂN KIỂU ĐI CÁP
    async mniChuyenKieuDiCap_Click(KIEUDC_ID){
      let idx = diagramInstance.connectors.findIndex(x => x.id.toString() === diagramInstance.selectedItems.connectors[0].id.toString())
      if (idx > -1){
        // CAPNHAT_KIEU_DC
        try {
          await this.$root.context.post("web-cabman/mang-truyen-dan/capnhat-kieudc", {KIEUDC_ID:KIEUDC_ID, CAP_ID:parseInt(diagramInstance.selectedItems.connectors[0].id,10)})
          .then(rs =>{
            if (rs.error === "200" && rs.error_code === "BSS-00000000" && rs.data.result === true){
              // THAY ĐỔI TRÊN GIẢN ĐỒ
              const KIEUDICAP_KEOCONG = 2, KIEUDICAP_KEOTREO = 3, KIEUDICAP_CHON  = 4, KIEUDICAP_DEXUAT_KEOMOI = 5
              let con = diagramInstance.connectors[idx]
              switch (KIEUDC_ID) {
                case KIEUDICAP_KEOCONG:
                  con.DashStyle = 'Dash'
                  con.SelectedDashStyle = 'Dash'
                  break
                case KIEUDICAP_KEOTREO:
                  con.DashStyle = 'Solid'
                  con.SelectedDashStyle = 'Solid'
                  break
                case KIEUDICAP_CHON:
                  con.DashStyle = 'DashDotDot'
                  con.SelectedDashStyle = 'DashDotDot'
                  break
                case KIEUDICAP_DEXUAT_KEOMOI:
                  con.DashStyle = 'Dot'
                  con.SelectedDashStyle = 'Dot'
                  break
              }
              this.CapNhatLink(con)
            }
          }).catch(e =>{
            this.$root.toastError("Có lỗi xảy ra khi cập nhật kiểu đi cáp")
              throw e
            })
        }catch (e){
          console.log(e)
        }
      }
    },
    // ĐỔI BIỂU TƯỢNG
    async mniDoiBieuTuong_Click(TRAMTB_ID, ICON){
      if (TRAMTB_ID && ICON){
        await this.$root.context.post("web-cabman/mang-truyen-dan/capnhat-icon-tramtb",{TRAMTB_ID:TRAMTB_ID, ICON:ICON})
          .then(rs =>{
            if (rs.error === "200" && rs.error_code === "BSS-00000000" && rs.data.result === true){
              let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
              if (idx > -1){
                diagramInstance.nodes[idx].shape.source = '/static/icons/icon100x100/'+ ICON +'.jpg'
                diagramInstance.nodes[idx].ImageKey = ICON
                diagramInstance.dataBind()
              }
            }
          }).catch(e => this.$root.toastError("Có lỗi xảy ra khi đổi biểu tượng"))
      }
    },
    // ĐỔI ĐÁNH DẤU
    mniDanhDau_Click(type, isMark){
      let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === diagramInstance.selectedItems.nodes[0].id.toString())
      if (!isMark){
        // diagramInstance.nodes[idx].style.fill = 'None'
        diagramInstance.nodes[idx].style.strokeColor = 'None'
      }else{
        switch (type){
          case 1: // RED
            // diagramInstance.nodes[idx].style.fill = 'Red'
            diagramInstance.nodes[idx].style.strokeColor = 'Red'
            break
          case 2: // GREEN
            // diagramInstance.nodes[idx].style.fill = 'Green'
            diagramInstance.nodes[idx].style.strokeColor = 'Green'
            break
          case 3: // BLUE
            // diagramInstance.nodes[idx].style.fill = 'Blue'
            diagramInstance.nodes[idx].style.strokeColor = 'Blue'
            break
        }
        // diagramInstance.nodes[idx].borderWidth = 5
        // diagramInstance.nodes[idx].borderColor = "Red"
        diagramInstance.nodes[idx].style.strokeWidth = 3
        diagramInstance.nodes[idx].style.bold = true
        // diagramInstance.nodes[idx].shape.shape = "Ellipse"
        // diagramInstance.nodes[idx].shape.cornerRadius = 20
      }
      diagramInstance.dataBind()
    },
    changeLayout(layoutType){
      if (layoutType === "") {
        diagramInstance.layout = {}
      }else {
        diagramInstance.layout = {
          arrangement: ChildArrangement.Nonlinear, // Linear/Nonlinear
          type: layoutType,
          connectionPointOrigin: ConnectionPointOrigin.SamePoint, // SamePoint/DifferentPoint
          orientation: 'TopToBottom',
          verticalSpacing: 200,
          horizontalSpacing: 100,
          margin: {left: 50, right: 50, top: 50, bottom: 50},
          // enableRouting: true
        }
      }

      diagramInstance.clear()
      diagramInstance.refresh()
    },
    CapNhatLink(cap){
      let idx = diagramInstance.connectors.findIndex(p => p.id.toString() === cap.id.toString())
      if (idx > -1){
        // NHOM LC
        diagramInstance.connectors[idx].style.strokeColor = cap.BackColor
        // KIỂU ĐI CÁP
        switch (cap.DashStyle){
          case "Dot":
            diagramInstance.connectors[idx].style.strokeDashArray = "2"
            break
          case "Solid":
            diagramInstance.connectors[idx].style.strokeDashArray = ""
            break
          case "Dash":
            diagramInstance.connectors[idx].style.strokeDashArray = "10"
            break
          case "DashDotDot":
            diagramInstance.connectors[idx].style.strokeDashArray = "10 2 2"
            break
        }
        // KIỂU CÁP
        // diagramInstance.connectors[idx].strokeWidth = cap.Width
        diagramInstance.connectors[idx].style.strokeWidth = cap.Width
        // THÔNG TIN CÁP
        diagramInstance.connectors[idx].BackColor = cap.BackColor
        diagramInstance.connectors[idx].DashStyle = cap.DashStyle
        diagramInstance.connectors[idx].DisplayName = cap.DisplayName
        diagramInstance.connectors[idx].Group = cap.Group
        diagramInstance.connectors[idx].Name = cap.Name
        diagramInstance.connectors[idx].RootId = cap.RootId
        diagramInstance.connectors[idx].SelectedBackColor = cap.SelectedBackColor
        diagramInstance.connectors[idx].SelectedDashStyle = cap.SelectedDashStyle
        diagramInstance.connectors[idx].SelectedWidth = cap.SelectedWidth
        diagramInstance.connectors[idx].ShowCaption = cap.ShowCaption
        diagramInstance.connectors[idx].Width = cap.Width
        diagramInstance.dataBind()
      }
    },
    mouseOver: (args) => {
      // this.actualObject = args.actualObject
      // if (this.actualObject.constructor.name === 'Node') {
      //   // let connect = diagramInstance.connectors.find(x => x.id === this.actualObject.id)
      //   // console.log('mouse Over connect', connect)
      //   // this.actualObject.style.strokeColor = 'red'
      //   console.log('mouse Over', args)
      // }
    },
    mouseLeave: (args) => {

    },
    // getNodeDefaults (obj) {
    //   // console.log('getNodeDefaults', obj)
    //   obj.constraints = (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly | NodeConstraints.Select) & ~NodeConstraints.Drag & ~NodeConstraints.Resize
    // },
    // getConnectorDefaults (obj) {
    //   // console.log('getConnectorDefaults', obj)
    //   // obj.type = 'Bezier'
    //   obj.constraints = (ConnectorConstraints.Default | ConnectorConstraints.Tooltip | ConnectorConstraints.ReadOnly) & ~ConnectorConstraints.Drag
    //   obj.targetDecorator = {shape: 'None'}
    // },
    scrollChange (e) {},
    onConnectionChange (e) {},
    keyDown (e) {
      // if (e.key === ' ') {
      //   this.tool = DiagramTools.ZoomPan
      // }
    },
    keyUp (e) {},
    diagramClick (args) {
      let clickedItem = args.actualObject
      if (clickedItem) {
        // set css for connector/node when selected

        //remove previous Node/Connector strokeColor
        if (this.previousNode){
          let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === this.previousNode.id.toString())
          if (idx > -1) {
            diagramInstance.nodes[idx].shape.source = diagramInstance.nodes[idx].shape.source.replace('_sel', '')
            this.previousNode = null
          }
        }
        if (this.previousConnector){
          let idx = diagramInstance.connectors.findIndex(x => x.id.toString() === this.previousConnector.id.toString())
          if (idx > -1) {
            diagramInstance.connectors[idx].style.strokeWidth = this.previousConnector.Width
            diagramInstance.connectors[idx].style.strokeColor = this.previousConnector.BackColor
            this.previousConnector = null
          }
        }

        if (clickedItem.propName === "connectors"){
          // set strokeColor selected
          let idx = diagramInstance.connectors.findIndex(x => x.id.toString() === clickedItem.id.toString())
          if (idx > -1) {
            diagramInstance.connectors[idx].style.strokeColor = diagramInstance.connectors[idx].SelectedBackColor
            diagramInstance.connectors[idx].style.strokeWidth = diagramInstance.connectors[idx].SelectedWidth
            this.previousConnector = diagramInstance.connectors[idx]
          }
        }
        if (clickedItem.propName === "nodes"){
          // set ICON selected
          let idx = diagramInstance.nodes.findIndex(x => x.id.toString() === clickedItem.id.toString())
          if (idx > -1){
            diagramInstance.nodes[idx].shape.source = diagramInstance.nodes[idx].shape.source.replace(diagramInstance.nodes[idx].ImageKey, diagramInstance.nodes[idx].ImageKey+'_sel')
            this.previousNode = diagramInstance.nodes[idx]
          }
        }
        diagramInstance.dataBind()


        if (args.button === 'Left') {

        }
        if (args.button === 'Right'){

        }
      }
    },
    onDrop (e) {},
    dragEnter (e) {},
    TimPoint (Id) {
      try {
        return diagramInstance.getNodeObject(Id)
      } catch (error) {
        console.log('TimPoint', error)
      }
    },
    TimLink (Id) {
      try {
        var obj = diagramInstance.getConnectorObject(Id)
        return obj
      } catch (error) {
        console.log('TimLink', error)
      }
    },
    taoNode: function (id, shape, ports, annotations) {
      let node = {
        id: id,
        constraints:
        NodeConstraints.Default &
        ~NodeConstraints.Rotate &
        ~NodeConstraints.Drag &
        ~NodeConstraints.Resize &
        ~NodeConstraints.Delete
      }
      if (!(typeof shape === 'undefined' || shape == null)) {
        node.shape = shape
      }
      if (!(typeof ports === 'undefined' || ports == null)) {
        node.ports = ports
      }
      if (!(typeof annotations === 'undefined' || annotations == null)) {
        node.annotations = annotations
      }
      return node
    },
    taoNodeTheoStyle: function (stringStyle, id, ports, annotations) {
      let node = this.taoNode(id, null, ports, annotations)
      let iconFile = '/static/icons/icon100x100/' + stringStyle + '.jpg'
      node.shape = {
        type: 'Image',
        source: iconFile,
        scale: 'None'
      }
      node.style = { fill: 'none', strokeWidth: 0 }
      node.height = 40
      node.width = 40
      return node
    },
    TaoPoint  (nodeID, text, stringStyle, tooltip) {
      let annotations = []
      annotations.push({ content: text, offset: { x: 0.5, y: 1 }, margin: { top: 15 }, style: { textWrapping: 'NoWrap', bold: true, fontfamily: 'Arial', fontsize: 12 } })
      let point = this.taoNodeTheoStyle(
        stringStyle,
        nodeID,
        null,
        annotations
      )
      point.tooltip = { content: tooltip,
        position: 'BottomCenter',
        relativeMode: 'Object'}
      return point
    },
    CapNhatPoint (Point) {
      diagramInstance.addNode(Point)
    },
    TaoLink (id, ketcuoi_n, ketcuoi_d, segments) {
      var link = new Link()
      link.id = id
      link.sourceID = ketcuoi_n.id
      link.targetID = ketcuoi_d.id
      if (segments.length > 0){
        let idx = segments.findIndex(p => p.li.toString() === id.toString())
        if (idx > -1){
          link.segments = segments[idx].points.map(item => ({type:'Straight', point:item}))
        }
      }
      diagramInstance.addConnector(link)
      return link
    },
    Clear () {
      diagramInstance.clear()
    },
    DoLayout () {
      diagramInstance.doLayout()
    }
  }
})
</script>
<style>
.context-menu {
  display: none;
  position: absolute;
  background-color: white;
}
</style>
<style scoped>
.e-diagram {
  height: 100% !important;
  min-height: 90vh;
}
</style>
