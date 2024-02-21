<template>
  <div>
      <ejs-diagram style='display:block' ref="diagram" id="diagram"
              :width='width'
              :height='height'
              :layout='layout'
              :getConnectorDefaults='getConnectorDefaults'
              :getNodeDefaults='getNodeDefaults'
              :tool='tool'
              :mouseOver="mouseOver"
              :mouseLeave="mouseLeave"
              :snapSettings='snapSettings'
              :selectedItems='selectedItems'
              enableAnimation="true"
              :click="onClick"
              :contextMenuSettings='contextMenuSettings'
              :contextMenuOpen="contextMenuOpen"
              :contextMenuClick="contextMenuClick"
              :doubleClick="onDbClick"
              mode="SVG"
              backgroundColor='white'
            >
      </ejs-diagram>
      <QuanLyCapReNhanh id="popupQuanLyCapReNhanh" :midspanObject="getMidspanObject"></QuanLyCapReNhanh>
      <DaunoiThietBi id="gpopupDauNoiTbi" :doiTuong="doiTuong"></DaunoiThietBi>
      <!-- <QuanLyTramThietBi
        id="popupTramThietBiGianDo"
        :tramTb_id="TramTb_id"
        @isOk="QuanLyTramThietBiIsOk"
      ></QuanLyTramThietBi> -->
  </div>
</template>

<style scoped>
.image-pattern-style {
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  height: 45px;
  width: calc((100% - 13px) / 3);
  cursor: pointer;
  border: 1px solid #d5d5d5;
  background-position: center;
  float: left;
}

.image-pattern-style:hover {
  border-color: gray;
  border-width: 2px;
}

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.row-header {
  font-size: 13px;
  font-weight: 500;
}

.e-checkbox-wrapper .e-label {
  font-size: 12px;
}

.col-xs-6 {
  padding-left: 0px;
  padding-right: 0px;
}

.e-selected-style {
  border-color: #006ce6;
  border-width: 2px;
}
</style>

<script>
import Vue from 'vue'
import EventBus from '@/utils/eventBus'

import {
  // Node,
  // MindMap,
  // TextElement,
  // HierarchicalTree,
  ComplexHierarchicalTree,
  ConnectorConstraints,
  NodeConstraints,
  // Segments,
  // StackPanel,
  // PointPortModel,
  // Connector,
  // BasicShapeModel,
  SelectorConstraints,
  DiagramPlugin,
  Diagram,
  // NodeModel,
  // ConnectorModel,
  // randomId,
  // PortVisibility,
  // StrokeStyleModel,
  ChildArrangement,
  DiagramTools,
  ConnectionPointOrigin,
  LineDistribution,
  SnapConstraints,
  DiagramConstraints,
  LineRouting,
  PrintAndExport,
  DiagramContextMenu
} from '@syncfusion/ej2-vue-diagrams'

import { PageSettings } from '@syncfusion/ej2-diagrams/src/diagram/diagram/page-settings'
import QuanLyCapReNhanh from '../../QuanLyCapReNhanh/QuanLyCapReNhanh'
import DaunoiThietBi from '../../daunoi-thietbi/Modal'
// import DaunoiThietBi from '../../QuanLyMangTruyenDan-Minh/daunoi-thietbi/Modal'

// import QuanLyTramThietBi from '../../QuanLyMangTruyenDan-Cuong/QuanLyTramThietBi'
import { mapActions, mapState, mapGetters } from 'vuex'
import { getterName, actionName, statePropertyName } from './../store'

Vue.use(DiagramPlugin)
Diagram.Inject(LineRouting)
let diagramInstance

export default Vue.extend({
  components: {QuanLyCapReNhanh, DaunoiThietBi},
  data: function () {
    return {
      optionsMenuTRAM: [
        {name: '<span class="icon text-main f20 one-daunoi"></span> Đấu nối thiết bị', slug: 'dau_noi_thiet_bi'},
        {name: '<span class="icon text-main f20 one-taocap"></span> Tạo cáp', slug: 'tao_cap'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 -ap icon-info"></span> Thuộc tính', slug: 'thuoc_tinh_cap'}
      ],
      optionsMenuCAP2: [
        {name: '<span class="icon text-main f20 one-daucuoi"></span> Đấu nối 2 đầu cáp', slug: 'dau_noi_2_dau_cap'},
        {name: '<span class="icon text-main f20 one-taomid"></span> Tạo Mid-Span', slug: 'tao_mid_span'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 one-trash"></span> Xoá cáp', slug: 'xoa_cap'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 one-chuyencap"></span> Chuyển nhánh cáp', slug: 'chuyen_nhanh_cap'},
        {name: '<span class="icon text-main f20 one-chenbe"></span> Chèn kết cuối', slug: 'chen_ket_cuoi'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 one-daochieu"></span> Đảo chiều cáp', slug: 'dao_chieu_cap'},
        {name: '<span class="icon text-main f20 -ap icon-apps"></span> Thuê bao đi qua cáp', slug: 'thue_bao_thuoc_cap'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 -ap icon-info"></span> Thuộc tính', slug: 'thuoc_tinh_cap'}
      ],
      optionsMenuKETCUOI: [
        {name: '<span class="icon text-main f20 one-daunoi"></span> Tạo kết cuối mới và nối cáp tới', slug: 'tao_ket_cuoi'},
        {name: '<span class="icon text-main f20 one-taocap"></span> Tạo cáp tới kết cuối cùng tuyến', slug: 'tao_cap_toi_ket_cuoi_cung_tuyen'},
        {name: '<span class="icon text-main f20 one-taokn"></span> Tạo cáp kết nối kết cuối khác tuyến', slug: 'tao_cap_toi_ket_cuoi_khac_tuyen'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 one-daunoi1"></span> Đấu nối bên trong', slug: 'dau_noi_ben_trong'},
        {name: '<span class="icon text-main f20 one-chuyen"></span> Chuyển vào trong kết cuối/trạm thiết bị', slug: 'chuyen_vao_trong'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 -ap icon-apps"></span> Thuê bao trên kết cuối', slug: 'thue_bao_thuoc_ket_cuoi'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 one-trash"></span> Xóa kết cuối', slug: 'xoa_ket_cuoi'},
        {type: 'divider'},
        {name: '<span class="icon text-main f20 -ap icon-info"></span> Thuộc tính', slug: 'thuoc_tinh_ket_cuoi'}
      ],
      contextMenuOpen: function (args) {
        if (this.selectedItems.nodes.length > 0) {
          // console.log('this.selectedItems.nodes', this.selectedItems.nodes)
          if (this.selectedItems.nodes[0].id.startsWith('TRAM_')) {
            // console.log('this.selectedItems.nodes', this.selectedItems.nodes[0].id)
            for (let index = 0; index < this.contextMenuSettings.items.length; index++) {
              const element = this.contextMenuSettings.items[index]
              if (element.group && element.group !== 'TRAM') {
                args.hiddenItems.push(element.id)
              }
            }
            // console.log('this.selectedItems.nodes', args)
          } else {
            // console.log('this.selectedItems.nodes', this.selectedItems.nodes[0].id)this.selectedItems.nodes
            for (let index = 0; index < this.contextMenuSettings.items.length; index++) {
              const element = this.contextMenuSettings.items[index]
              if (element.group && element.group !== 'KETCUOI') {
                args.hiddenItems.push(element.id)
              }
            }
            // console.log('this.selectedItems.nodes', args)
          }
        } else if (this.selectedItems.connectors.length > 0) {
          this.contextMenuSettings.items.forEach(element => {
            if (element.group && element.group !== 'CAP') {
              args.hiddenItems.push(element.id)
            }
          })
        } else {
          // console.log('contextMenuOpen')
          this.contextMenuSettings.items.forEach(element => {
            args.hiddenItems.push(element.id)
          })
          args.cancel = true
        }
      },
      contextMenuSettings: {
        show: true,
        items: [
          // CAP
          {
            text: 'Đấu nối 2 đầu cáp',
            id: 'MENU_CAP_DAUNOI_2DC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-daucuoi',
            group: 'CAP'
          },
          {
            text: 'Tạo Mid-Span',
            id: 'MENU_CAP_TAO_MIDSPAN',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-taomid',
            group: 'CAP'
          },
          {
            id: 'MENU_CAP_ITEM_SEPARATOR_1',
            separator: true,
            group: 'CAP'
          },
          {
            text: 'Xoá cáp',
            id: 'MENU_CAP_XOA_CAP',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-trash',
            group: 'CAP'
          },
          {
            id: 'MENU_CAP_ITEM_SEPARATOR_2',
            separator: true,
            group: 'CAP'
          },
          {
            text: 'Chuyển nhánh cáp',
            id: 'MENU_CAP_CHUYEN_NHANH_CAP',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-chuyencap',
            group: 'CAP'
          },
          {
            text: 'Chèn kết cuối',
            id: 'MENU_CAP_CHEN_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-chenbe',
            group: 'CAP'
          },
          {
            text: 'Đảo chiều cáp',
            id: 'MENU_CAP_DAOCHIEU_CAP',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-daochieu',
            group: 'CAP'
          },
          {
            id: 'MENU_CAP_ITEM_SEPARATOR_3',
            separator: true,
            group: 'CAP'
          },
          {
            text: 'Thuê bao đi qua cáp',
            id: 'MENU_CAP_TB_DIQUA_CAP',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 -ap icon-apps',
            group: 'CAP'
          },
          {
            id: 'MENU_CAP_ITEM_SEPARATOR_4',
            separator: true,
            group: 'CAP'
          },
          {
            text: 'Thuộc tính',
            id: 'MENU_CAP_THUOCTINH',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 -ap icon-info',
            group: 'CAP'
          },
          // TRAM
          {
            text: 'Đấu nối thiết bị',
            id: 'MENU_TRAM_DAUNOI_TB',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-daunoi',
            group: 'TRAM'
          },
          {
            text: 'Tạo cáp',
            id: 'MENU_TRAM_TAO_CAP',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-taocap',
            group: 'TRAM'
          },
          {
            id: 'MENU_TRAM_ITEM_SEPARATOR_1',
            separator: true,
            group: 'TRAM'
          },
          {
            text: 'Thuộc tính',
            id: 'MENU_TRAM_THUOC_TINH_TRAM',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 -ap icon-info',
            group: 'TRAM'
          },
          // KETCUOI
          {
            text: 'Tạo kết cuối mới và nối cáp tới',
            id: 'MENU_TAO_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-daunoi',
            group: 'KETCUOI'
          },
          {
            id: 'MENU_ITEM_SEPARATOR_2',
            separator: true,
            group: 'KETCUOI'
          },
          {
            text: 'Tạo cáp tới kết cuối cùng tuyến',
            id: 'MENU_TAO_CAP_KC_CUNG_TUYEN',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-taocap',
            group: 'KETCUOI'
          },
          {
            text: 'Tạo cáp kết nối kết cuối khác tuyến',
            id: 'MENU_TAO_CAP_KC_KHAC_TUYEN',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-taokn',
            group: 'KETCUOI'
          },
          {
            id: 'MENU_ITEM_SEPARATOR_3',
            separator: true,
            group: 'KETCUOI'
          },
          {
            text: 'Đấu nối bên trong',
            id: 'MENU_DAU_NOI_BEN_TRONG',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-daunoi1',
            group: 'KETCUOI'
          },
          {
            text: 'Chuyển vào trong kết cuối/trạm thiết bị',
            id: 'MENU_CHUYEN_VAO_TRONG_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-chuyen',
            group: 'KETCUOI'
          },
          {
            id: 'MENU_ITEM_SEPARATOR_4',
            separator: true,
            group: 'KETCUOI'
          },
          {
            text: 'Thuê bao trên kết cuối',
            id: 'MENU_THUE_BAO_TREN_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 -ap icon-apps',
            group: 'KETCUOI'
          },
          {
            id: 'MENU_ITEM_SEPARATOR_5',
            separator: true,
            group: 'KETCUOI'
          },
          {
            text: 'Xóa kết cuối',
            id: 'MENU_XOA_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 one-trash',
            group: 'KETCUOI'
          },
          {
            id: 'MENU_ITEM_SEPARATOR_6',
            separator: true,
            group: 'KETCUOI'
          },
          {
            text: 'Thuộc tính',
            id: 'MENU_THUOC_TINH_KC',
            target: '.e-diagramcontent',
            iconCss: 'icon text-main f20 -ap icon-info',
            group: 'KETCUOI'
          }
        ],
        showCustomMenuOnly: true
      },
      midspanObject: {
        MIDSPAN_ID: null,
        CAP_ID: null,
        KETCUOI_N_ID: null,
        KETCUOI_D_ID: null,
        KYHIEU_KETCUOI_N: null,
        KYHIEU_KETCUOI_D: null,
        DONVI_ID: null,
        DONVI_TD_ID: null,
        TEN_DV: null,
        TEN_DV_TD: null,
        LOPMC_ID: null,
        LOP_MC: null,
        KIEUDC_ID: null,
        KIEUCAP_ID: null,
        KIEU_CAP: null,
        KYHIEU: '',
        CHIEUDAI: null,
        DS_SOI: ''
      },
      TramTb_id: 0,
      doiTuong: {},
      vdoituong_id: null,
      // vnguon_id: null,
      // vdich_id: null,
      // vaction: 'None',
      toast: null,
      previousNode: null,
      width: '100%',
      tool: DiagramTools.SingleSelect | DiagramTools.ZoomPan,
      height: 900,
      nodes: [],
      refresh: false,
      connectors: [],
      actualObject: null,
      constraints: DiagramConstraints.Default | DiagramConstraints.LineRouting,
      selectedItems: {
        constraints:
          SelectorConstraints.None
      },
      layout: {
        arrangement: ChildArrangement.Linear,
        type: 'ComplexHierarchicalTree',
        connectionPointOrigin: ConnectionPointOrigin.DifferentPoint,
        orientation: 'LeftToRight',
        verticalSpacing: 100,
        horizontalSpacing: 270,
        margin: { left: 10, right: 0, top: 50, bottom: 0 },
        enableRouting: true
      },
      snapSettings: {
        horizontalGridlines: {lineColor: '#cdcdcd', dotIntervals: [0.95, 20.75], lineIntervals: [0.95, 20.75], snapIntervals: [10]},
        verticalGridlines: {lineColor: '#cdcdcd', dotIntervals: [0.95, 20.75], lineIntervals: [0.95, 20.75], snapIntervals: [10]},
        gridType: 'Dots',
        constraints: SnapConstraints.SnapToLines | SnapConstraints.ShowLines
      },
      getNodeDefaults: (obj) => {
        obj.constraints = (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly | NodeConstraints.Select) & ~NodeConstraints.Drag & ~NodeConstraints.Resize
      },
      getConnectorDefaults: (obj) => {
        // obj.type = 'Bezier'
        // obj.type = 'Straight'
        // obj.cornerRadius = 7
        obj.type = 'Orthogonal'
        obj.constraints = (ConnectorConstraints.Default | ConnectorConstraints.Tooltip | ConnectorConstraints.ReadOnly) & ~ConnectorConstraints.Drag
        obj.targetDecorator = {shape: 'None'}
      }
    }
  },
  provide: {
    diagram: [PrintAndExport, DiagramContextMenu, ComplexHierarchicalTree, LineDistribution]
  },
  watch: {
    refresh: function (value) {
      if (diagramInstance.width === '100%') { diagramInstance.width = '99.9%' } else { diagramInstance.width = '100%' }
    }
  },
  computed: {
    ...mapState('cabman/BanDoMangCap', statePropertyName),
    ...mapState('cabman', ['BanDoMangCap']),
    ...mapGetters('cabman/BanDoMangCap', getterName),
    getNodes () {
      return [...this.nodes]
    },
    getConnectors () {
      return [...this.connectors]
    },
    getMidspanObject () {
      return this.midspanObject
    },
    gettramTb_id () { return this.tramTb_id }
  },
  mounted: function () {
    diagramInstance = this.$refs.diagram.ej2Instances
    diagramInstance.fitToPage()
  },
  methods: {
    ...mapActions('cabman/BanDoMangCap', actionName),
    // onClick (args) {
    //   let clickedItem = args.actualObject
    //   console.log('onClick', args)
    //   if (clickedItem && clickedItem.id) {
    //     var vdoituong_id = clickedItem.id.split('_')
    //     if (vdoituong_id[0] === 'THIEU') {
    //       var loai_dt = vdoituong_id[1] // Trạm | Kết cuối
    //       var nguondich = vdoituong_id[2] // Nguồn | Đích
    //       var cap_id = vdoituong_id[3] // Cáp cần thêm

    //       if (loai_dt === 'KETCUOI') {
    //         if (nguondich === 'DICH') {
    //           this.$emit('taoKetCuoiDich', cap_id)
    //         }
    //       }
    //     }
    //   }
    // },
    onClick (args) {
      console.log('onClick', args)
      // if (args.element && !this.previousNode) {
      //   args.element.style.strokeColor = 'red'
      //   this.previousNode = args.element
      // } else if (args.element.id === 'diagram') {
      //   this.previousNode.style.strokeColor = 'white'
      //   this.previousNode = null
      // }
      let clickedItem = args.actualObject
      if (clickedItem) {
        this.vdoituong_id = clickedItem.id.split('_')
        console.log('vdoituong_id', this.vdoituong_id)
        if (args.button === 'Left') {
          if (this.vdoituong_id[0] === 'THIEU') {
            let loai_dt = this.vdoituong_id[1] // Trạm | Kết cuối
            let nguondich = this.vdoituong_id[2] // Nguồn | Đích
            let cap_id = this.vdoituong_id[3] // Cáp cần thêm
            if (loai_dt === 'KETCUOI') {
              if (nguondich === 'DICH') {
                this.$emit('taoKetCuoiDich', cap_id)
              } else {
                this.$alert('Chức năng hiện chưa hỗ trợ chọn kết cuối nguồn !', 'Thông báo', {
                  confirmButtonText: 'Đóng',
                  type: 'warning',
                  callback: action => {
                  }
                })
              }
            } else {
              this.$alert('Chức năng đang được xây dựng !', 'Thông báo', {
                confirmButtonText: 'Đóng',
                type: 'warning',
                callback: action => {
                }
              })
            }
          } else {

          }
        }
        if (args.button === 'Right') {
          if (this.vdoituong_id[0] === 'THIEU') {
            let loai_dt = this.vdoituong_id[1] // Trạm | Kết cuối
            let nguondich = this.vdoituong_id[2] // Nguồn | Đích
            let cap_id = this.vdoituong_id[3] // Cáp cần thêm
            if (nguondich === 'DICH') {
              this.$emit('taoKetCuoiDich', cap_id)
            } else {
              this.$alert('Chức năng hiện chưa hỗ trợ chọn kết cuối nguồn !', 'Thông báo', {
                confirmButtonText: 'Đóng',
                type: 'warning',
                callback: action => {
                }
              })
            }
          }
        }
        if (this.vaction !== 'None') {
          if (this.vaction === 'TaoCapMidSpan') {
            if (this.vnguon_id[0] !== this.vdoituong_id[0] || this.vnguon_id[1] !== this.vdoituong_id[1]) {
              this.hideToast()
              this.setState({key: 'vdich_id', value: this.vdoituong_id})

              var donvi_id = null
              var ketcuoi_n_id = null
              var ketcuoi_d_id = null
              var donvi_td_id = null
              if (this.vnguon_id[2] === 'TRAM') { donvi_id = this.vnguon_id[2] } else { ketcuoi_n_id = this.vnguon_id[2] }
              if (this.vdich_id[0] === 'TRAM') { donvi_td_id = this.vdich_id[1] } else { ketcuoi_d_id = this.vdich_id[1] }
              this.midspanObject.CAP_ID = this.vnguon_id[3]
              this.midspanObject.DONVI_ID = donvi_id
              this.midspanObject.DONVI_TD_ID = donvi_td_id
              this.midspanObject.KETCUOI_N_ID = ketcuoi_n_id
              this.midspanObject.KETCUOI_D_ID = ketcuoi_d_id
              this.midspanObject.KIEUCAP_ID = 0
              console.log('TaoCapMidSpan', this.midspanObject)
              this.$bvModal.show('popupQuanLyCapReNhanh')

              this.setState({key: 'vaction', value: 'None'})
              this.setState({key: 'vnguon_id', value: null})
              this.setState({key: 'vdich_id', value: null})
            }
          }
        }
      } else {
        diagramInstance.selectedItems.connectors.length = 0
        diagramInstance.selectedItems.nodes.length = 0
        diagramInstance.selectedItems.connectors = []
        diagramInstance.selectedItems.nodes = []
      }
      // console.log('onClick', args)
      // if (clickedItem && clickedItem.id) {
      //   var vdoituong_id = clickedItem.id.split('_')
      //   if (vdoituong_id[0] === 'THIEU') {
      //     var loai_dt = vdoituong_id[1] // Trạm | Kết cuối
      //     var nguondich = vdoituong_id[2] // Nguồn | Đích
      //     var cap_id = vdoituong_id[3] // Cáp cần thêm

      //     if (loai_dt === 'KETCUOI') {
      //       if (nguondich === 'DICH') {
      //         this.$emit('taoKetCuoiDich', cap_id)
      //       }
      //     }
      //   }
      // }
    },
    QuanLyTramThietBiIsOk (data) {
      // let tramtb = diagramInstance.selectedItems.nodes[0]
      console.log('QuanLyTramThietBiIsOk', data)
      // this.$emit('SUA_THUOCTINH_TRAM_TB', tramtb.id, data)
    },
    contextMenuClick: function (args) {
      console.log('contextMenuClick', args)
      // KETCUOI

      if (args.element.id === 'MENU_DAU_NOI_BEN_TRONG') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('🚀 ~ file: GianDo.vue ~ line 628 ~ diagramInstance.selectedItems.nodes[0]', diagramInstance.selectedItems.nodes[0].annotations[0].content)
          let node = {
            KETCUOI_ID: id,
            KYHIEU_KC: diagramInstance.selectedItems.nodes[0].annotations[0].content
          }
          console.log('contextMenuClick', node)
          this.$emit('dauNoiBenTrong', node)
        }
        return
      }

      if (args.element.id === 'MENU_THUE_BAO_TREN_KC') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id)
          // alert('Call MENU_TAO_KC')
          this.$emit('thueBaoThuocKetCuoi', id)
        }
        return
      }

      if (args.element.id === 'MENU_TAO_KC') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id)
          // alert('Call MENU_TAO_KC')
          this.$emit('taoKetcuoi', id)
        }
        return
      }
      if (args.element.id === 'MENU_XOA_KC') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id)
          // alert('Call MENU_XOA_KC')
          this.$emit('xoaKetcuoi', id)
        }
        return
      }

      //
      // TRAM
      if (args.element.id === 'MENU_TRAM_DAUNOI_TB') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id)
          // Minh Call WinUITruyenDan.frmDauNoiTBI
          var doituong = id.split('_')
          this.doiTuong.tramtb_id = doituong[1]
          this.$bvModal.show('gpopupDauNoiTbi')
        }
        return
      }

      if (args.element.id === 'MENU_TRAM_THUOC_TINH_TRAM') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id.split('_')[1])
          // this.TramTb_id = 765
          // // Hong Quan Call WinUITruyenDan.frmQLTramTB
          // // alert('https://cntt.vnpt.vn/browse/BSS-20393')
          // this.tramTb_id = parseFloat(id.split('_')[1])
          this.$emit('TramThietBi', parseFloat(id.split('_')[1]))
          // this.$bvModal.show('popupTramThietBiGianDo')
        }
        return
      }
      // CAP

      if (args.element.id === 'MENU_CAP_THUOCTINH') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          this.$emit('suaCap', id)
        }
        return
      }

      if (args.element.id === 'MENU_CAP_XOA_CAP') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          this.$emit('xoaCap', id)
        }
        return
      }

      if (args.element.id === 'MENU_CAP_TAO_MIDSPAN') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', diagramInstance.selectedItems.connectors[0])
          let nguon_id = (diagramInstance.selectedItems.connectors[0].targetID + '_' + this.vdoituong_id[1]).split('_')
          console.log('contextMenuClick', nguon_id)
          this.setState({key: 'vaction', value: 'TaoCapMidSpan'})
          this.setState({key: 'vnguon_id', value: nguon_id})
          console.log('contextMenuClick vnguon_id', this.vnguon_id)
          console.log('contextMenuClick vaction', this.vaction)
          this.toast && this.toast.close()
          this.showToast('Tạo Mid-Span', 'Chọn kết cuối / trạm thiết bị đích<br><b>Nhấn ESC để hủy<b>')
        }
        return
      }
      if (args.element.id === 'MENU_CAP_DAOCHIEU_CAP') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          this.$emit('daochieuCap', id)
        }
        return
      }

      if (args.element.id === 'MENU_CAP_CHEN_KC') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          this.$emit('chenketcuoi', id)
        }
        return
      }
      if (args.element.id === 'MENU_CAP_CHUYEN_NHANH_CAP') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          // CaoCuong code
          this.$emit('chuyennhanhcap', id)
        }
        return
      }

      if (args.element.id === 'MENU_CAP_TB_DIQUA_CAP') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          // CaoCuong code
          this.$emit('thueBaoThuocCap', id)
        }
        return
      }
      if (args.element.id === 'MENU_CAP_DAUNOI_2DC') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          // Truc code
          this.$emit('dauNoiCap', id)
        }
        return
      }
      if (args.element.id === 'MENU_THUOC_TINH_CAP') {
        if (diagramInstance.selectedItems.connectors.length > 0) {
          let id = diagramInstance.selectedItems.connectors[0].id
          console.log('contextMenuClick', id)
          this.$emit('suaCap', id)
        }
        return
      }
      if (args.element.id === 'MENU_THUOC_TINH_KC') {
        if (diagramInstance.selectedItems.nodes.length > 0) {
          let id = diagramInstance.selectedItems.nodes[0].id
          console.log('contextMenuClick', id)
          this.$emit('suaKetcuoi', id)
        }
      }
    },
    optionClicked (event) {
      switch (event.option.slug) {
        case 'thuoc_tinh_ket_cuoi':
          this.$emit('suaKetcuoi', event.item.id)
          break
        case 'thuoc_tinh_cap':
          this.$emit('suaCap', event.item.id)
          break
      }
    },
    onDbClick (args) {
      const id = args['source'].id
      if (id) {
        console.log('onDbClick', id)
        if (id.startsWith('CAP_')) {
          this.$emit('suaCap', id)
        }
        if (id.startsWith('KETCUOI_')) {
          this.$emit('suaKetcuoi', id)
        }
        if (id.startsWith('TRAM_')) {
          this.$emit('TramThietBi', parseFloat(id.split('_')[1]))
        }
      }
    },
    setNodes (nodes) {
      this.nodes = nodes
    },
    setConnectors (connectors) {
      this.connectors = connectors
    },
    setRefresh () {
      this.refresh = !this.refresh
    },
    mouseOver: (args) => {
      this.actualObject = args.actualObject
      if (this.actualObject.constructor.name === 'Connector') {
        let connect = diagramInstance.connectors.find(x => x.id === this.actualObject.id)
        if (connect) {
          connect.style.strokeColor = 'red'
        }
      }
    },
    mouseLeave: (args) => {
      this.actualObject = args.element
      if (this.actualObject.constructor.name === 'Connector') {
        let connect = diagramInstance.connectors.find(x => x.id === this.actualObject.id)
        if (connect) {
          connect.style.strokeColor = connect.styleCap.strokeColor
        }
      }
    },
    showToast (title, msg) {
      this.toast = this.$notify.success({
        title: title,
        message: msg,
        showClose: false,
        dangerouslyUseHTMLString: true,
        duration: 0
      })
      console.log('this.toast', this.toast)
    },
    hideToast () {
      this.toast && this.toast.close()
      console.log('hideToast diagramInstance.selectedItems.connectors', diagramInstance.selectedItems.connectors)
      console.log('hideToast diagramInstance.selectedItems.nodes', diagramInstance.selectedItems.nodes)
      diagramInstance.selectedItems.connectors = []
      diagramInstance.selectedItems.nodes = []
      // this.vaction = 'None'
      // this.vnguon_id = null
      // this.vdich_id = null
    },
    inGiando (file) {
      console.log('IN_GIANDO')
      let printOptions = {}
      printOptions.mode = 'Data'
      printOptions.region = 'PageSettings'
      printOptions.multiplePage = false
      printOptions.pageHeight = 800
      printOptions.pageWidth = 800
      diagramInstance.print(printOptions)
    },
    addNode (Node) {
      diagramInstance.addNode(Node)
    },
    addConnector (Connector) {
      try {
        diagramInstance.addConnector(Connector)
      } catch (error) {
        console.log('addConnector', error)
      }
    },
    doLayout () {
      diagramInstance.doLayout()
      diagramInstance.fitToPage()
    },
    clear () {
      diagramInstance.clear()
    },
    zoomIn () {
      const zoomOptions = {
        type: 'ZoomIn',
        zoomFactor: 0.1
      }
      diagramInstance.zoomTo(zoomOptions)
    },
    zoomOut () {
      const zoomOptions = {
        type: 'ZoomOut',
        zoomFactor: 0.1
      }
      diagramInstance.zoomTo(zoomOptions)
    }
  },
  updated () {
    diagramInstance.refresh()
  },
  async created () {
    EventBus.$on('IN_GIANDO', this.inGiando)
    EventBus.$on('GIANDO_ZOOMIN', this.zoomIn)
    EventBus.$on('GIANDO_ZOOMOUT', this.zoomOut)
    let that = this
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.hideToast()
      }
    })
  },
  destroyed () {
    EventBus.$off('IN_GIANDO', this.inGiando)
    EventBus.$off('GIANDO_ZOOMIN', this.zoomIn)
    EventBus.$off('GIANDO_ZOOMOUT', this.zoomOut)
  }
})
</script>
