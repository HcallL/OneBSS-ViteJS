<template>
<div>
    <script src="https://unpkg.com/@hpcc-js/wasm/dist/index.min.js" type="application/javascript"></script>
    <div class="graph-container">
      <div id="graph" style="text-align: center;" />
      <vue-simple-context-menu
        elementId="menuNodeDauNoi"
        :options="getoptionsNodeMenu"
        ref="menuNodeDauNoi"
        @option-clicked="menuNode_Clicked"
      />
    </div>
</div>
</template>

<script>
import DotGraph from './dot'
import {graphviz} from 'd3-graphviz'
import {select as d3_select, selectAll as d3_selectAll, pointer as d3_pointer} from 'd3-selection'
import { transition as d3_transition} from 'd3-transition'
import { dispatch as d3_dispatch} from 'd3-dispatch'
import { zoomIdentity as d3_zoomIdentity, zoomTransform as d3_zoomTransform} from 'd3-zoom'
import VueSimpleContextMenu from 'vue-simple-context-menu'

export default {
  props: {
    defaultEdgeAttributes: {
      type: Object,
      default: null
    },
    transitionDuration:
    {
      type: Number,
      default: 1
    },
    fit:
    {
      type: Boolean,
      default: true
    },
    dotSrc:
    {
      type: String,
      default: `digraph G
      {  
        a -> b;        
      }`
    }
  },
  components: {'vue-simple-context-menu': VueSimpleContextMenu},
  computed: {
    getoptionsNodeMenu () {
      console.log('selectedComponents', this.selectedComponents)
      var menu = [
        {
          type: 'divider'
        },
        {
          name: '<span class="icon text-main f20 one-daucuoi"></span> Kết nối từ',
          slug: 'node_ket_noi_tu'
        },
        {
          name: '<span class="icon text-main f20 one-daucuoi"></span> Kết nối đến',
          slug: 'node_ket_noi_den'
        },
        {
          name: '<span class="icon text-main f20 one-chuyencap"></span> Đấu thuê bao',
          slug: 'node_dau_thue_bao'
        },
        {
          name: '<span class="icon text-main f20 one-taodiemuon"></span> Danh sách thuê bao',
          slug: 'node_ds_thue_bao'
        },
        {
          name: '<span class="icon text-main f20 -ap icon-info"></span> Tra dẫn độ',
          slug: 'node_tra_dan_do'
        },
        {
          name: '<span class="icon text-main f20 one-daochieu"></span> Trạng thái',
          slug: 'node_trang_thai'
        },
        {
          name: '<span class="icon text-main f20 one-daochieu"></span> Hủy tạo kết nối',
          slug: 'node_huy_tao_ket_noi'
        }
      ]
      var menu2 = []
      if (this.startNode === null) {
        menu2.push(menu[1])
        menu2.push(menu[0])
        menu2.push(menu[3])
        menu2.push(menu[4])
        menu2.push(menu[0])
        menu2.push(menu[5])
        menu2.push(menu[0])
        menu2.push(menu[6])
      } else {
        if (this.endNode === null) {
          menu2.push(menu[2])
          menu2.push(menu[0])
          menu2.push(menu[7])
        }
      }
      return menu2
    }
  },
  data () {
    return {
      dispatch: null,
      point: {},
      DAUNOI_CAP_VAO: [],
      DAUNOI_CAP_RA: [],
      node: null,
      latestEdgeAttributes: {},
      edgeIndex: null,
      graph0: null,
      dataGraphviz: null,
      totalMemory: 16777216 * 2,
      svg: null,
      selectedComponents: null,
      div: null,
      graphviz: null,
      renderGraphReady: false,
      rendering: false,
      pendingUpdate: false,
      prevFit: false,
      selectRects: null,
      selectNames: null,
      prelDotGraph: null,
      dotGraph: null,
      state: {
        busy: false
      },
      isDrawingEdge: false,
      originalViewBox: {},
      startNode: null,
      endNode: null
    }
  },
  mounted () {
    this.svg = d3_select(null)
    this.selectedComponents = d3_selectAll(null)
    this.div = d3_select('#graph')
    this.selectRects = d3_select(null)
  },
  watch: {
    dataGraphviz (value) {
      this.createGraph()
    }
  },
  methods: {
    menuNode_Clicked (event) {
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 114 ~ menuNode_Clicked ~ event.option.slug', event.option.slug)
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 114 ~ menuNode_Clicked ~ event.option.slug', event)
      if (event.option.slug === 'node_ket_noi_tu') {
        this.startNode = event.item
        return
      }
      if (event.option.slug === 'node_ket_noi_den') {
        this.endNode = event.item
        this.DAU_NOI()
        return
      }
      if (event.option.slug === 'node_huy_tao_ket_noi') {
        this.startNode = null
        this.endNode = null
      }
    },
    setNode (node) { this.node = node },
    compareNumbers (a, b) {
      return parseInt(b.split('_')[2]) - parseInt(a.split('_')[2])
    },
    compareNumbers2 (a, b) {
      return b.VITRI - a.VITRI
    },
    compareNumbers3 (a, b) {
      return parseInt(b.split('_')[1]) - parseInt(a.split('_')[1])
    },
    Format (fmtstr) {
      var args = Array.prototype.slice.call(arguments, 1)
      return fmtstr.replace(/\{(\d+)\}/g, function (match, index) {
        return args[index]
      })
    },
    async loadData () {
      this.$root.showLoading(true)
      var chkToiUuGianDo = false
      let ketcuoi_id = this.node.KETCUOI_ID.split('_')[1]
      let rs = await this.$root.context.get(
        '/web-cabman/ban-do-mang-cap/lay-gd-ketcuoi-con' + '?ketcuoi_id=' + ketcuoi_id
      )
      let ds = rs.data
      console.log('🚀 ~ file: index.vue ~ line 334 ~ dauNoiBenTrong ~ ds', ds)
      this.DAUNOI_CAP_VAO = ds.dsDN_CAP_VAO
      this.DAUNOI_CAP_RA = ds.dsDN_CAP_RA
      if (ds.dsKC.length > 0) {
        if (ds.dsKC[0].LOAIKC_ID === 5) {

        }
      }
      var firstInputPair = ''
      var firstOutputPair = ''
      var firstJumper = ''
      var lastJumper = ''
      var rankGroup = ''
      var sw = `digraph G\n`
      sw = sw + `{\n`
      sw = sw + ` graph [id=\"gd\" pad=1 splines=curve rankdir=\"LR\" clusterrank=local fontname=\"Courier New\" fontsize=14 bold=true margin=5 nodesep=0.05];\n`
      sw = sw + ` node [width=0.3 height=0.3 fontname=\"Courier New\" fontsize=14 shape=circle style=filled fillcolor=white color=black margin=0 fixedsize=shape];\n`

      // Cáp vào(s)
      sw = sw + ` subgraph cluster_capvaos {\n`
      sw = sw + ` graph [label=\"Cáp vào\" style=dashed bgcolor=white margin=20 fontsize=18 pencolor=\"Gray40\"];\n`

      ds.dsCAPVAO.forEach(cap => {
        var node_tmps = []
        var tmp = ds.dsDN_CAP_VAO.filter(function (x) { return x.CAP_ID === cap.CAP_ID })
        tmp.forEach(soivao => {
          var midspan = soivao.MIDSPAN === null ? ' ' : soivao.MIDSPAN
          var node_tmp = this.Format('capvao{0}_{1}_node_tmp1|capvao{0}_{1}_node_tmp2|{2}', soivao.CAP_ID, soivao.MIDSPAN_ID, midspan)
          if (!node_tmps.includes(node_tmp)) { node_tmps.push(node_tmp) }
        })
        sw = sw + `   subgraph cluster_capvao_${cap.CAP_ID}\n`
        sw = sw + `{\n`
        sw = sw + this.Format('      graph [id="capvao_{0}" label="{1}" style=rounded bgcolor=lightgrey fontsize=14];\n', cap.CAP_ID, cap.KYHIEU)
        // Vẽ đoạn cáp ở đầu
        sw = sw + `      node [style=filled label=\"\" width=0.2 height=0.2 fillcolor=black];`
        node_tmps.forEach(node_tmp => {
          sw = sw + this.Format('      {0} [style=invis];', node_tmp.split('|')[0])
          sw = sw + this.Format('      {0}->{1} [penwidth=7 dir=none label="{2}"]', node_tmp.split('|')[0], node_tmp.split('|')[1], node_tmp.split('|')[2])
          sw = sw + `  node [style=filled margin=0 width=0.3 height=0.3];`
        })
        // Vẽ các node đầu sợi cáp
        sw = sw + '\n'
        var svNodes = []
        tmp.forEach(soivao => {
          // ID của sợi cáp vào có cấu trúc: sv_capid_midspanid_soi
          var nodeName = this.Format('soivao{0}_{1}_{2}', soivao['CAP_ID'], soivao['MIDSPAN_ID'], soivao['SOI'])
          var nodeID = this.Format('sv_{0}_{1}_{2}', soivao['CAP_ID'], soivao['MIDSPAN_ID'], soivao['SOI'])
          if (firstInputPair === '') {
            firstInputPair = nodeName
          }
          var pairColor = 'white'
          if (soivao.READONLY === 1) {
            pairColor = 'Gray60'
          } else {
            if (soivao.DNN && soivao.DNN === 1) {
              pairColor = 'yellow'
            }
          }
          sw = sw + this.Format('      {0} [label="{1}" id="{2}" fillcolor={3}];\n', nodeName, soivao['SOI'], nodeID, pairColor)
          svNodes.push(nodeName)
        })
        // Sắp xếp đầu các sợi cáp trên 1 hàng dọc
        rankGroup = svNodes.join('; ')
        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + ' }\n'
        }
        if (svNodes.length > 1) {
          let tmp = Array.from(svNodes).sort(this.compareNumbers)
          sw = sw + '  ' + tmp.join(' -> ') + ' [style=invis];\n'
        }

        // Kết nối từ đoạn cáp ra các đầu sợi cáp
        sw = sw + `      edge [dir=none];\n`
        svNodes.forEach(node => {
          node_tmps.forEach(node_tmp => {
            if (node.startsWith(node_tmp.split('|')[1].replace('capvao', 'soivao').replace('node_tmp2', ''))) {
              sw = sw + this.Format('      {1} -> {0};\n', node, node_tmp.split('|')[1])
            }
          })
        })
        var tmp1 = node_tmps.map(e => { return e.split('|')[0] })
        rankGroup = tmp1.join('; ')

        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + '; }\n'
        }
        tmp1 = node_tmps.map(e => { return e.split('|')[1] })
        rankGroup = tmp1.join('; ')
        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + '; }\n'
        }
        sw = sw + '  }\n'
      })
      sw = sw + '  }\n'

      // Kết cuối(s)
      sw = sw + `  subgraph cluster_ketcuois  {\n`
      sw = sw + `  graph [label=\"Kết cuối\" style=dashed bgcolor=white margin=20 fontsize=18 pencolor=\"Gray40\"];\n`
      if (ds.dsKC.length > 0) {
        if (!ds.dsKC[0].hasOwnProperty('OLT_PORT_ID')) {
          ds.dsKC = ds.dsKC.map(obj => ({ ...obj, OLT_PORT_ID: 0 }))
        }
        for (let index = 0; index < ds.dsKC.length; index++) {
          const kc = ds.dsKC[index]
          // Kết cuối
          var clusterBgColor = 'lightgrey'
          // Kiểm tra xem SP đã thông về OLT hay chưa
          // KC là Splitter
          var isSplitter = kc.LOAIKC_ID && kc.LOAIKC_ID === 5
          // Thông về cáp gốc
          let tmpVITRI = ds.dsVT.filter(e => { return e.KETCUOI_ID === kc.KETCUOI_ID && e.VITRI === 1 && e.MAT === 1 && e.IS_ONLINE !== 0 })
          var isOnline = tmpVITRI.length > 0
          // Nếu SP thông về cáp gốc thì kiểm tra xem có thông về OLT hay không
          if (isSplitter && isOnline) {
            let data = {
              P_PHANVUNG_ID: this.$root.token.getPhanVungID(),
              VKETCUOI_ID: kc.KETCUOI_ID,
              VMAT: 1,
              VVITRI: 1,
              VKIEU: 1,
              PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.SP_LAY_PORT_OLT_THEOCAP'
            }
            let portOLTInfo = await this.$root.context.post(
              '/web-cabman/ban-do-mang-cap/execute1', data
            )
            if (portOLTInfo.data.length > 0) {
              if (portOLTInfo.data[0].KETQUA > 0) {
                kc.OLT_PORT_ID = portOLTInfo.data[0].KETQUA
                clusterBgColor = '#90a6ec'
              }
            }
          }
          sw = sw + `  subgraph cluster_${kc.KETCUOI_ID}`
          sw = sw + '      {\n'
          sw = sw + this.Format('      graph [id=\"kc_{0}\" label=\"{1}\" style=boxed bgcolor=\"' + clusterBgColor + '\" fontsize=14];\n', kc['KETCUOI_ID'], kc['KYHIEU'])
          if (firstJumper === '') {
            firstJumper = `\"p${kc.KETCUOI_ID}_1_1\"`
          }
          lastJumper = `\"p${kc.KETCUOI_ID}_1_2\"`

          var tmpdsVT = ds.dsVT.filter(e => { return e.KETCUOI_ID === kc.KETCUOI_ID })
          for (let index = 0; index < tmpdsVT.length; index++) {
            const vt = tmpdsVT[index]
            // Msquare
            var nodeStyle = ''
            // shape
            if (vt['DNTB'] !== 0) {
              // Có thuê bao đấu trực tiếp
              nodeStyle = 'shape=Msquare '
            } else {
              if (vt.TBDQ && vt.TBDQ !== 0) {
                nodeStyle = 'shape=Mcircle '
              }
            }
            // fillcolor
            if (vt['TRANGTHAI'] === 2)// Port hỏng
            {
              nodeStyle += 'fillcolor=pink '
            } else if (vt.TRANGTHAI === 3)// Port dự phòng
            {
              nodeStyle += 'fillcolor=skyblue '
            } else if (vt.IS_ONLINE && vt.IS_ONLINE !== 0) {
              nodeStyle += 'fillcolor=chartreuse '
            } else if (vt.DNC === 1)// Có đấu nối
            {
              nodeStyle += 'fillcolor=yellow '
            } else if (vt.DNTB !== 0)// Có thuê bao
            {
              nodeStyle += 'fillcolor=yellow '
            } else nodeStyle += 'fillcolor=white '
            sw = sw + this.Format('      \"p{0}_{1}_{2}\" [label=\"{1}\" {3} id=\"vt_{0}_{1}_{2}\"];\n', vt['KETCUOI_ID'], vt['VITRI'], vt['MAT'], nodeStyle)
          }

          for (let m = 1; m <= 2; m++) {
            sw = sw + `      { rank=same; `
            var q = ds.dsVT.filter(e => { return e.KETCUOI_ID === kc.KETCUOI_ID && e.MAT === m }).sort(this.compareNumbers2)
            q.forEach(vt => {
              sw = sw + `\"p${vt.KETCUOI_ID}_${vt.VITRI}_${vt.MAT}\"; `
            })
            sw = sw + `      }\n`
            if (q.length >= 2) {
              for (var i = 0; i < q.length; i++) {
                if (i !== 0) { sw = sw + ' -> ' }
                sw = sw + this.Format('\"p{0}_{1}_{2}\"', q[i]['KETCUOI_ID'], q[i]['VITRI'], q[i]['MAT'])
              }
              sw = sw + ` [style=invis];\n`
            }
          }
          sw = sw + `      }\n`
        }
        sw = sw + `      }\n`
      }
      // Cáp ra(s)
      sw = sw + `  subgraph cluster_capras  {\n`
      sw = sw + `  graph [label=\"Cáp ra\" style=dashed bgcolor=white margin=20 fontsize=18 pencolor=\"Gray40\"];\n`
      for (let index = 0; index < ds.dsCAPRA.length; index++) {
        const cap = ds.dsCAPRA[index]
        var node_tmps = []
        var tmp = ds.dsDN_CAP_RA.filter(function (x) { return x.CAP_ID === cap.CAP_ID })
        tmp.forEach(soivao => {
          var midspan = soivao.MIDSPAN === null ? ' ' : soivao.MIDSPAN
          var node_tmp = `capra${soivao.CAP_ID}_${soivao.MIDSPAN_ID}_node_tmp1|capra${soivao.CAP_ID}_${soivao.MIDSPAN_ID}_node_tmp2|${midspan}`
          if (!node_tmps.includes(node_tmp)) { node_tmps.push(node_tmp) }
        })
        sw = sw + `   subgraph cluster_capra_${cap.CAP_ID}\n`
        sw = sw + `{`
        sw = sw + `      graph [id=\"capra_${cap.CAP_ID}\" label=\"${cap.KYHIEU}\" style=rounded bgcolor=lightgrey fontsize=14];\n`

        // Vẽ các node đầu sợi cáp
        var svNodes = []
        tmp.forEach(soira => {
          var nodeName = `soira${soira.CAP_ID}_${soira.MIDSPAN_ID}_${soira.SOI}`
          var nodeID = `sr_${soira.CAP_ID}_${soira.MIDSPAN_ID}_${soira.SOI}`
          if (firstOutputPair === '') {
            firstOutputPair = nodeName
          }
          sw = sw + `      ${nodeName} [label=\"${soira.SOI}\" fillcolor=white id=\"${nodeID}\"];\n`
          svNodes.push(nodeName)
        })

        // Sắp xếp đầu các sợi cáp trên 1 hàng dọc
        rankGroup = svNodes.join('; ')
        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + ' }\n'
        }
        if (svNodes.length > 1) {
          let tmp = Array.from(svNodes).sort(this.compareNumbers3)
          sw = sw + '  ' + tmp.join(' -> ') + ' [style=invis];\n'
        }
        sw = sw + `      node [style=filled label=\"\" width=0.2 height=0.2 fillcolor=black];\n`
        node_tmps.forEach(node_tmp => {
          sw = sw + `  ${node_tmp.split('|')[0]} [style=invis];`
          sw = sw + `  ${node_tmp.split('|')[1]}->${node_tmp.split('|')[0]} [penwidth=7 dir=none label=\"${node_tmp.split('|')[2]}\"]`
          sw = sw + `  node [style=filled margin=0 width=0.3 height=0.3];`
        })

        var tmp1 = node_tmps.map(e => { return e.split('|')[1] })
        rankGroup = tmp1.join('; ')
        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + '; }\n'
        }
        tmp1 = node_tmps.map(e => { return e.split('|')[0] })
        rankGroup = tmp1.join('; ')
        if (rankGroup.length > 0) {
          sw = sw + '      { rank = same; ' + rankGroup + '; }\n'
        }

        // Kết nối từ đoạn cáp ra các đầu sợi cáp
        sw = sw + `      edge [dir=none];\n`
        svNodes.forEach(node => {
          node_tmps.forEach(node_tmp => {
            if (node.startsWith(node_tmp.split('|')[1].replace('capra', 'soira').replace('node_tmp2', ''))) {
              sw = sw + `      ${node} -> ${node_tmp.split('|')[1]};\n`
            }
          })
        })
        sw = sw + `  }\n`
      }
      sw = sw + `  }\n`
      if (firstInputPair !== '') { sw = sw + `  ${firstInputPair}->${firstJumper} [style=invis];\n` }

      if (firstOutputPair !== '') { sw = sw + `  ${lastJumper}->${firstOutputPair} [style=invis];\n` }
      // Đấu nối kết cuối
      var tmpdsDN = ds.dsDN.filter(e => { return e.LOAITBI_N_ID === 25 && e.LOAITBI_D_ID === 25 })
      tmpdsDN.forEach(dn => {
        var f1 = dn.THIETBI_N_ID === dn.THIETBI_D_ID
        // Đấu nối ngược thì set constraint=false
        var disableConstraint = (!f1 && dn.MAT_N === 2 && dn.MAT_D === 2)
        var t = (f1 ? ' style="dashed"' : '') + (disableConstraint ? ' constraint=false' : '')
        sw = sw + this.Format('    \"p{0}_{1}_{2}\" -> \"p{3}_{4}_{5}\" [id=\"dn_{0}_{1}_{2}_{3}_{4}_{5}\"{6} color=DarkBlue]\n', dn['THIETBI_N_ID'], dn['VITRI_N'], dn['MAT_N'], dn['THIETBI_D_ID'], dn['VITRI_D'], dn['MAT_D'], t)
      })

      // Đấu nối cáp-kết cuối
      for (let index = 0; index < ds.dsDN_CAP_VAO.length; index++) {
        const dn = ds.dsDN_CAP_VAO[index]
        if (dn.THIETBI_D_ID === null || dn.VITRI_D === null) { continue }
        let t = chkToiUuGianDo ? ' ' : ' constraint=false'
        sw = sw + this.Format('    soivao{0}_{1}_{2} -> \"p{3}_{4}_{5}\" [id=\"dv_{0}_{1}_{2}_{3}_{4}_{5}\"{6} dir=none];\n', dn['CAP_ID'], dn['MIDSPAN_ID'], dn['SOI'], dn['THIETBI_D_ID'], dn['VITRI_D'], dn['MAT_D'], t)
        sw = sw + ` soivao${dn.CAP_ID}_${dn.MIDSPAN_ID}_${dn.SOI} [fillcolor=yellow]\n`
      }
      for (let index = 0; index < ds.dsDN_CAP_RA.length; index++) {
        const dn = ds.dsDN_CAP_RA[index]
        if (dn.THIETBI_N_ID === null || dn.VITRI_N === null) { continue }
        let t = chkToiUuGianDo ? ' ' : ' constraint=false'
        sw = sw + this.Format('    \"p{3}_{4}_{5}\" -> soira{0}_{1}_{2} [id=\"dr_{0}_{1}_{2}_{3}_{4}_{5}\"{6} dir=none];\n', dn['CAP_ID'], dn['MIDSPAN_ID'], dn['SOI'], dn['THIETBI_N_ID'], dn['VITRI_N'], dn['MAT_N'], t)
        sw = sw + ` soira${dn.CAP_ID}_${dn.MIDSPAN_ID}_${dn.SOI} [fillcolor=yellow]\n`
      }

      // Cáp vòng
      ds.dsCAPVAO.forEach(capvao => {
        ds.dsCAPRA.forEach(capra => {
          if (capvao.CAP_ID === capra.CAP_ID) {
            let isVong = ds.dsDN_CAP_VAO.filter(e => { return e.CAP_ID === capvao.CAP_ID && e.MIDSPAN !== null && e.MIDSPAN !== 0 }).length > 0
            if (isVong) {
              isVong = ds.dsDN_CAP_RA.filter(e => { return e.CAP_ID === capvao.CAP_ID && e.MIDSPAN !== null && e.MIDSPAN !== 0 }).length > 0
            }
            if (isVong) {
              sw = sw + `  capra${capvao.CAP_ID}_0_node_tmp1->capvao${capvao.CAP_ID}_0_node_tmp1 [constraint=fals penwidth=7 style=dashed];\n`
            }
          }
        })
      })
      // End Cáp vòng
      sw = sw + '}\n'
      this.setDataGraphviz(sw)
      this.$root.showLoading(false)
    },
    setDataGraphviz (data) {
      this.dataGraphviz = data
    },
    createGraph () {
      this.graphviz = graphviz('#graph', {useWorker: true, totalMemory: this.totalMemory})
        .onerror(() => this.handleError())
        .on('initEnd', () => this.renderGraph())
    },
    unFitGraph () {
      let width = this.div.node().parentElement.clientWidth
      let height = this.div.node().parentElement.clientHeight
      this.svg.attr('viewBox', `0 0 ${(width * 3) / 4} ${(height * 3) / 4}`)
    },
    fitGraph () {
      this.svg.attr('viewBox', `0 0 ${this.originalViewBox.width} ${this.originalViewBox.height}`
      )
    },
    setZoomScale (scale, center = false, reset = false) {
      let viewBox = this.svg.attr('viewBox').split(' ')
      let bbox = this.graph0.node().getBBox()
      let { x, y, k } = d3_zoomTransform(this.graphviz.zoomSelection().node())
      let [x0, y0, scale0] = [x, y, k]
      let xOffset0 = x0 + bbox.x * scale0
      let yOffset0 = y0 + bbox.y * scale0
      let xCenter = viewBox[2] / 2
      let yCenter = viewBox[3] / 2
      let xOffset
      let yOffset
      if (center) {
        xOffset = (viewBox[2] - bbox.width * scale) / 2
        yOffset = (viewBox[3] - bbox.height * scale) / 2
      } else if (reset) {
        xOffset = 0
        yOffset = 0
      } else {
        xOffset = xCenter - ((xCenter - xOffset0) * scale) / scale0
        yOffset = yCenter - ((yCenter - yOffset0) * scale) / scale0
      }
      x = -bbox.x * scale + xOffset
      y = -bbox.y * scale + yOffset
      let transform = d3_zoomIdentity.translate(x, y).scale(scale)
      this.graphviz.zoomSelection().call(this.graphviz.zoomBehavior().transform, transform)
    },
    setState (state) {
      this.state = state
    },
    handleError (errorMessage) {
      if (!errorMessage) return
      let line = errorMessage.replace(/.*error in line ([0-9]*) .*\n/, '$1')
      this.$emit('onError', {message: errorMessage, line: line})
      this.rendering = false
      this.setState({busy: false})
      if (this.pendingUpdate) {
        this.pendingUpdate = false
        this.$forceUpdate()
      }
    },
    renderGraph () {
      let fit = this.fit
      if (this.dataGraphviz.length === 0) {
        this.svg.remove()
        this.svg = d3_select(null)
        this.$emit('onError', null)
        this.renderGraphReady = false
        return
      }
      if (this.rendering) {
        this.pendingUpdate = true
        return
      }
      if (this.fit !== this.prevFit) {
        if (this.renderGraphReady) {
          if (this.prevFit) {
            this.unFitGraph()
            this.setZoomScale(1, true)
          } else {
            this.setZoomScale(1, false, true)
            this.fitGraph()
          }
        }
        this.prevFit = this.fit
      }
      this.prevDataGraphviz = this.dataGraphviz
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 162 ~ renderGraph ~ this.prevDataGraphviz', this.prevDataGraphviz)
      try {
        this.prelDotGraph = new DotGraph(this.dataGraphviz)
        this.$emit('onError', null)
        console.log('🚀 ~ file: DotLanguage.vue ~ line 251 ~ renderGraph ~ this.prelDotGraph', this.prelDotGraph)
      } catch (error) {
        console.log('🚀 ~ file: GraphVizControl.vue ~ line 165 ~ renderGraph ~ error', error)
        if (!error.location) {
          throw error
        }
        let {
          location: {
            start: { line }
          },
          message
        } = error
        this.$emit('onError', { message: message, line: line })
      }
      this.rendering = true
      this.setState({ busy: true })
      this.graphviz.fit(fit).dot(this.dataGraphviz, () => this.handleDotLayoutReady()).on('renderEnd', () => this.handleRenderStaged()).render(() => this.handleRenderGraphReady())
    },
    addEventHandlers () {
      let self = this
      this.graphviz.zoomBehavior().filter(function () {
        if (event.type === 'mousedown' && !event.ctrlKey) {
          if (self.isDrawingEdge) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })
      var nodes = this.svg.selectAll('.node')
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 196 ~ addEventHandlers ~ nodes', nodes)
      var edges = this.svg.selectAll('.edge')
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 199 ~ addEventHandlers ~ edges', edges)

      this.div.on('click', (d) => this.handleClickDiv())
      this.div.on('contextmenu', (d) => this.handleRightClickDiv(d))

      nodes.on('click mousedown', (d, i) => this.handleClickNode(d, i))
      nodes.on('contextmenu', (d, i) => this.handleRightClickNode(d, i))
      nodes.on('dblclick', (d, i) => this.handleDblClickNode(d, i))
    },
    handleClickDiv () {
      document.activeElement.blur()
      event.preventDefault()
      event.stopPropagation()
      this.$refs.menuNodeDauNoi && this.$refs.menuNodeDauNoi.hideContextMenu()
      if (!(event.which === 1 && (event.ctrlKey || event.shiftKey))) {
        this.unSelectComponents()
      }
    },
    async DAU_NOI () {
      var startPort = this.startNode.node().id
      var endPort = this.endNode.node().id
      if (startPort === endPort) return
      // Dau noi ket cuoi
      if (startPort.startsWith('vt') && endPort.startsWith('vt')) {
        startPort = startPort.substring(3)
        endPort = endPort.substring(3)
        if (startPort === endPort) {

        } else {
          startPort = startPort + '_25'
          endPort = endPort + '_25'
          if (!this.CHECK_PERMIT_AND_MESSAGE()) return
          var ketqua = await this.TAO_KETNOI_DN_V2(startPort.split('_'), endPort.split('_'))
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 248 ~ handleDblClickNode ~ ketqua', ketqua)
          if (ketqua) {
            this.unSelectComponents()
            this.startNode = null
            this.endNode = null
            this.loadData()
          }
        }
      } else if (!startPort.startsWith('vt') && !endPort.startsWith('vt')) {
        // Msg.ShowWarning("Không được phép nối 2 sợi cáp với nhau");
      } else {
        if (startPort !== endPort) {
          var kcPort = startPort
          var capPort = endPort
          if (!kcPort.startsWith('vt')) {
            kcPort = endPort
            capPort = startPort
          }
          var src = []
          var dst = []
          var vcap_id
          var vmidspan_id
          var soi
          var vitri_n = 'null'
          var vitri_d = 'null'
          var dtDauNoiCap = capPort.startsWith('sv') ? this.DAUNOI_CAP_VAO : this.DAUNOI_CAP_RA
          var svRecord = dtDauNoiCap.filter(m => `${m.CAP_ID}_${m.MIDSPAN_ID}_${m.SOI}` === capPort.substring(3))
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 607 ~ handleDblClickNode ~ svRecord', svRecord)
          if (svRecord.length === 0) { return }
          if (svRecord[0].READONLY && svRecord[0].READONLY === 1) {
            return
          }
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 613 ~ handleDblClickNode ~ capPort', capPort)
          if (capPort.startsWith('sv')) {
            // Cáp vào
            if (svRecord[0].THIETBI_D_ID !== null) { return }

            kcPort = kcPort.substring(3)
            capPort = capPort.substring(3)
            dst.push('MAT')
            dst.push(kcPort.split('_')[0])
            dst.push(kcPort.split('_')[2])
            vitri_d = kcPort.split('_')[1]
          } else {
            // Cáp ra
            if (svRecord[0].THIETBI_N_ID !== null) { return }
            kcPort = kcPort.substring(3)
            capPort = capPort.substring(3)
            src.push('MAT')
            src.push(kcPort.split('_')[0])
            src.push(kcPort.split('_')[2])
            vitri_n = kcPort.split('_')[1]
          }
          vcap_id = capPort.split('_')[0]
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 633 ~ handleDblClickNode ~ vcap_id', vcap_id)
          vmidspan_id = capPort.split('_')[1]
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 635 ~ handleDblClickNode ~ vmidspan_id', vmidspan_id)
          soi = capPort.split('_')[2]
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 637 ~ handleDblClickNode ~ soi', soi)
          var data = []
          data.push(`select soi, vitri_n, vitri_d from cabman.daunoi_cap where phanvung_id=${this.$root.token.getPhanVungID()} and 1 = 0`)
          data.push(` union all select ${soi}, ${vitri_n}, ${vitri_d} from dual`)
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 641 ~ handleDblClickNode ~ data', data)
          if (!this.CHECK_PERMIT_AND_MESSAGE()) return
          ketqua = await this.DAUNOI_CAP(vcap_id, vmidspan_id, data.join(' '), src, dst, true)
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 645 ~ handleDblClickNode ~ ketqua', ketqua)
          if (ketqua) {
            this.unSelectComponents()
            this.startNode = null
            this.endNode = null
            this.loadData()
          }
        }
      }
    },
    async handleDblClickNode (d, i) {
      document.activeElement.blur()
      event.preventDefault()
      event.stopPropagation()
      this.unSelectComponents()
      if (this.isDrawingEdge) {
        // console.log('🚀 ~ file: DotLanguage.vue ~ line 438 ~ startNode', this.startNode.node().id)
        // var endNode = d3_select(`#${i.attributes.id}`)
        // console.log('🚀 ~ file: DotLanguage.vue ~ line 434 ~ endNode', endNode)
        // var startNodeName = this.startNode
        //   .selectWithoutDataPropagation('title')
        //   .text()
        // var endNodeName = endNode
        //   .selectWithoutDataPropagation('title')
        //   .text()
        // if (startNodeName === endNodeName) return
        // try {
        //   this.graphviz.insertDrawnEdge(startNodeName + '->' + endNodeName)
        //   console.log("🚀 ~ file: GraphVizControl.vue ~ line 227 ~ handleDblClickNode ~ startNodeName + '->' + endNodeName", startNodeName + '->' + endNodeName)
        // } catch (error) {
        //   console.log('🚀 ~ file: DotLanguage.vue ~ line 452 ~ error', error)
        // }
        // this.latestEdgeAttributes = Object.assign({}, this.defaultEdgeAttributes)
        // this.dotGraph.insertEdge(startNodeName, endNodeName, this.latestEdgeAttributes)
        // this.dataGraphviz = this.dotGraph.dotSrc
        var startPort = this.startNode.node().id
        var endNode = d3_select(`#${i.attributes.id}`)
        var endPort = endNode.node().id
        if (startPort === endPort) return
        // Dau noi ket cuoi
        if (startPort.startsWith('vt') && endPort.startsWith('vt')) {
          startPort = startPort.substring(3)
          endPort = endPort.substring(3)
          if (startPort === endPort) {

          } else {
            startPort = startPort + '_25'
            endPort = endPort + '_25'
            if (!this.CHECK_PERMIT_AND_MESSAGE()) return
            var ketqua = await this.TAO_KETNOI_DN_V2(startPort.split('_'), endPort.split('_'))
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 248 ~ handleDblClickNode ~ ketqua', ketqua)
            if (ketqua) {
              this.loadData()
            }
          }
        } else if (!startPort.startsWith('vt') && !endPort.startsWith('vt')) {
          // Msg.ShowWarning("Không được phép nối 2 sợi cáp với nhau");
        } else {
          if (startPort !== endPort) {
            var kcPort = startPort
            var capPort = endPort
            if (!kcPort.startsWith('vt')) {
              kcPort = endPort
              capPort = startPort
            }
            var src = []
            var dst = []
            var vcap_id
            var vmidspan_id
            var soi
            var vitri_n = 'null'
            var vitri_d = 'null'
            var dtDauNoiCap = capPort.startsWith('sv') ? this.DAUNOI_CAP_VAO : this.DAUNOI_CAP_RA
            var svRecord = dtDauNoiCap.filter(m => `${m.CAP_ID}_${m.MIDSPAN_ID}_${m.SOI}` === capPort.substring(3))
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 607 ~ handleDblClickNode ~ svRecord', svRecord)
            if (svRecord.length === 0) { return }
            if (svRecord[0].READONLY && svRecord[0].READONLY === 1) {
              return
            }
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 613 ~ handleDblClickNode ~ capPort', capPort)
            if (capPort.startsWith('sv')) {
              // Cáp vào
              if (svRecord[0].THIETBI_D_ID !== null) { return }

              kcPort = kcPort.substring(3)
              capPort = capPort.substring(3)
              dst.push('MAT')
              dst.push(kcPort.split('_')[0])
              dst.push(kcPort.split('_')[2])
              vitri_d = kcPort.split('_')[1]
            } else {
              // Cáp ra
              if (svRecord[0].THIETBI_N_ID !== null) { return }
              kcPort = kcPort.substring(3)
              capPort = capPort.substring(3)
              src.push('MAT')
              src.push(kcPort.split('_')[0])
              src.push(kcPort.split('_')[2])
              vitri_n = kcPort.split('_')[1]
            }
            vcap_id = capPort.split('_')[0]
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 633 ~ handleDblClickNode ~ vcap_id', vcap_id)
            vmidspan_id = capPort.split('_')[1]
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 635 ~ handleDblClickNode ~ vmidspan_id', vmidspan_id)
            soi = capPort.split('_')[2]
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 637 ~ handleDblClickNode ~ soi', soi)
            var data = []
            data.push(`select soi, vitri_n, vitri_d from cabman.daunoi_cap where phanvung_id=${this.$root.token.getPhanVungID()} and 1 = 0`)
            data.push(` union all select ${soi}, ${vitri_n}, ${vitri_d} from dual`)
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 641 ~ handleDblClickNode ~ data', data)
            if (!this.CHECK_PERMIT_AND_MESSAGE()) return
            ketqua = await this.DAUNOI_CAP(vcap_id, vmidspan_id, data.join(' '), src, dst, true)
            console.log('🚀 ~ file: GraphVizControl.vue ~ line 645 ~ handleDblClickNode ~ ketqua', ketqua)
            if (ketqua) {
              this.loadData()
            }
          }
        }
      }
      this.isDrawingEdge = false
    },
    async DAUNOI_CAP (vcap_id, vmidspan_id, sData, src, dst, ktTruocKhiDauNoi) {
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 654 ~ DAUNOI_CAP ~ dst', dst)
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 654 ~ DAUNOI_CAP ~ src', src)
      try {
        var vdaucapvao = dst.length === 0 ? 0 : 1
        var vdaucapra = src.length === 0 ? 0 : 1
        var VLOAITBI_N_ID, VTHIETBI_N_ID, VMAT_N
        var VLOAITBI_D_ID, VTHIETBI_D_ID, VMAT_D

        if (src.length > 0) {
          switch (src[0].toString()) {
            case 'MAT':
              VLOAITBI_N_ID = 25
              VTHIETBI_N_ID = src[1]
              VMAT_N = src[2]
              break
            case 'PHIEN_DOC':
              VLOAITBI_N_ID = 23
              VTHIETBI_N_ID = src[1]
              VMAT_N = 2
              break
            case 'ODF':
              VLOAITBI_N_ID = 18
              VTHIETBI_N_ID = src[1]
              VMAT_N = 2
              break
            case 'CARD_DSL':
              VLOAITBI_N_ID = 6
              VTHIETBI_N_ID = src[1]
              VMAT_N = 2
              break
            case 'CARD_GPON':
              VLOAITBI_N_ID = 10
              VTHIETBI_N_ID = src[1]
              VMAT_N = 2
              break
            case 'SWITCH':
              VLOAITBI_N_ID = 2
              VTHIETBI_N_ID = src[1]
              VMAT_N = 2
              break
          }
        } else {
          VLOAITBI_N_ID = 'null'
          VTHIETBI_N_ID = 'null'
          VMAT_N = 'null'
        }

        if (dst.length > 0) {
          switch (dst[0].toString()) {
            case 'MAT':
              VLOAITBI_D_ID = 25
              VTHIETBI_D_ID = dst[1]
              VMAT_D = dst[2]
              break
            case 'PHIEN_DOC':
              VLOAITBI_D_ID = 23
              VTHIETBI_D_ID = dst[1]
              VMAT_D = 2
              break
            case 'ODF':
              VLOAITBI_D_ID = 18
              VTHIETBI_D_ID = dst[1]
              VMAT_D = 2
              break
          }
        } else {
          VLOAITBI_D_ID = 'null'
          VTHIETBI_D_ID = 'null'
          VMAT_D = 'null'
        }
        var data = {
          P_PHANVUNG_ID: this.$root.token.getPhanVungID(),
          DATA: sData,
          VCAP_ID: vcap_id,
          VDAUCAPVAO: vdaucapvao,
          VDAUCAPRA: vdaucapra,
          VKTTRUOCKHIDAUNOI: ktTruocKhiDauNoi === true ? 1 : 0,
          VMIDSPAN_ID: vmidspan_id,
          VLOAITBI_N_ID: VLOAITBI_N_ID,
          VTHIETBI_N_ID: VTHIETBI_N_ID,
          VMAT_N: VMAT_N,
          VLOAITBI_D_ID: VLOAITBI_D_ID,
          VTHIETBI_D_ID: VTHIETBI_D_ID,
          VMAT_D: VMAT_D,
          PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.DAUNOI_CAP'
        }
        console.log('🚀 ~ file: GraphVizControl.vue ~ line 738 ~ DAUNOI_CAP ~ data', data)
        var rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/execute1', data
        )
        if (rs.data.length > 0) {
          if (rs.data[0].KETQUA > 0) return true
          else return false
        } else return false
      } catch (error) {
        return false
      }
    },
    async TAO_KETNOI_DN_V2 (startPort, endPort) {
      try {
        var data = {
          P_PHANVUNG_ID: this.$root.token.getPhanVungID(),
          VKIEU: startPort[0] === endPort[0] && startPort[2] !== endPort[2] ? 1 : 2,
          VTHIETBI_N_ID: startPort[0],
          VVITRI_N: startPort[1],
          VMAT_N: startPort[2],
          VLOAITBI_N_ID: startPort[3],
          VTHIETBI_D_ID: endPort[0],
          VVITRI_D: endPort[1],
          VMAT_D: endPort[2],
          VLOAITBI_D_ID: endPort[3],
          VCAPTD_ID: 0,
          PROCEDURE_NAME: 'CABMAN.PKG_GIANDO_CAP.TAO_KETNOI_DN'
        }
        console.log('🚀 ~ file: GraphVizControl.vue ~ line 268 ~ TAO_KETNOI_DN_V2 ~ data', data)
        var rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/execute1', data
        )
        console.log('🚀 ~ file: GraphVizControl.vue ~ line 271 ~ TAO_KETNOI_DN_V2 ~ rs', rs)
        if (rs.data.length > 0) {
          if (rs.data[0].KETQUA > 0) return true
          else return false
        } else return false
      } catch (error) {
        console.log('🚀 ~ file: GraphVizControl.vue ~ line 275 ~ TAO_KETNOI_DN_V2 ~ error', error)
        return false
      }
    },
    CHECK_PERMIT_AND_MESSAGE () {
      return true
    },
    handleRightClickNode (d, i) {
      document.activeElement.blur()
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 836 ~ handleRightClickNode ~ event', event)
      var e = event
      event.preventDefault()
      event.stopPropagation()
      this.unSelectComponents()
      this.graphviz.removeDrawnEdge()
      // this.startNode = d3_select(`#${i.attributes.id}`)
      var [x0, y0] = d3_pointer(event, this.graph0.node())
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 805 ~ handleRightClickNode ~ x0, y0', x0, y0)
      if (this.edgeIndex === null) {
        this.edgeIndex = d3_selectAll('.edge').size()
      } else {
        this.edgeIndex += 1
      }
      this.latestEdgeAttributes = Object.assign({}, this.defaultEdgeAttributes)
      this.latestEdgeAttributes.id = 'edge' + (this.edgeIndex + 1)
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 223 ~ handleRightClickNode ~ latestEdgeAttributes', this.latestEdgeAttributes)
      try {
        this.graphviz.drawEdge(x0, y0, x0, y0, this.latestEdgeAttributes)
      } catch (error) {
        console.log('🚀 ~ file: DotLanguage.vue ~ line 429 ~ drawEdge error', error)
      }
      if (!this.isDrawingEdge && event.which === 3) {
        let extendSelection = event.ctrlKey || event.shiftKey
        this.selectComponents(d3_select(`#${i.attributes.id}`), extendSelection)
      }
      this.isDrawingEdge = false
      setTimeout(() => {
        this.dispatch.call('contextmenu', this, { e: e, node: d3_select(`#${i.attributes.id}`) })
      }, 10)
    },
    handleClickNode (d, i) {
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 205 ~ handleClickNode ~ d, i', d, i)
      document.activeElement.blur()
      event.preventDefault()
      event.stopPropagation()
      this.$refs.menuNodeDauNoi && this.$refs.menuNodeDauNoi.hideContextMenu()
      this.dispatch.apply('start', this, [event])
      if (!this.isDrawingEdge && event.which === 1) {
        let extendSelection = event.ctrlKey || event.shiftKey
        this.selectComponents(d3_select(`#${i.attributes.id}`), extendSelection)
      }
    },
    handleRightClickDiv (d) {
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 216 ~ handleRightClickDiv ~ d', d)
      event.preventDefault()
      event.stopPropagation()
      this.$refs.menuNodeDauNoi && this.$refs.menuNodeDauNoi.hideContextMenu()
      this.unSelectComponents()
    },
    unSelectComponents () {
      this.selectRects.remove()
      this.selectRects = d3_select(null)
      if (this.selectedComponents.size() > 0) {
        this.selectedComponents = d3_selectAll(null)
      }
    },
    selectComponents (components, extendSelection = false) {
      if (extendSelection) {
        this.selectedComponents = d3_selectAll(this.selectedComponents.nodes().concat(components.nodes()))
      } else {
        this.unSelectComponents()
        this.selectedComponents = components
      }
      this.markSelectedComponents(components, extendSelection)
    },
    initContextMenu () {
      const svgDom = document.querySelector('#graph svg')
      this.dispatch = d3_dispatch('start', 'contextmenu')
        .on('start', (event) => {
          this.point = { x: event.x, y: event.y }
        })
        .on('contextmenu', (target) => {
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 871 ~ .on ~ target', target)
          const svgRect = svgDom.getBoundingClientRect()
          this.$refs.menuNodeDauNoi.showMenu(target.e, target.node)
          var menu = document.getElementById('menuNodeDauNoi')
          menu.style.left = `${this.point.x - svgRect.x}px`
          menu.style.top = `${this.point.y - svgRect.y}px`
          menu.position = 'fixed'
          menu.classList.add('menu-context')
          console.log('🚀 ~ file: GraphVizControl.vue ~ line 876 ~ .on ~ this.contextmenu contextmenu', menu)
        })
      document.oncontextmenu = (event) => {
        console.log('document.oncontextmenu')
      }
      document.onmousedown = (event) => {
        console.log('document.onmousedown')
      }
    },
    handleRenderGraphReady () {
      this.svg = this.div.selectWithoutDataPropagation('svg')
      this.graph0 = this.svg.selectWithoutDataPropagation('g')
      this.dotGraph = this.prelDotGraph
      this.addEventHandlers()
      this.initContextMenu()
      this.rendering = false

      if (!this.renderGraphReady) {
        this.renderGraphReady = true
        this.setZoomScale(1, true)
        this.graphviz.transition(() => d3_transition().duration(this.transitionDuration * 1000))
        this.$emit('onInitialized')
      }
      this.setState({ busy: false })
      if (this.pendingUpdate) {
        this.pendingUpdate = false
        this.renderGraph()
      }
    },
    handleDotLayoutReady () {
      let [, , width, height] = this.graphviz.data().attributes.viewBox.split(' ')
      this.originalViewBox = { width, height }
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 868 ~ handleDotLayoutReady ~ this.originalViewBox ', this.originalViewBox)
    },
    handleRenderStaged () {
      if (this.renderGraphReady) {
        this.markSelectedComponents(this.selectedComponents)
      }
    },
    markSelectedComponents (components, extendSelection = false) {
      let scale = (this.graph0.node().getCTM().a * 3) / 4
      let dashLength = Math.max(4 / scale, 2)
      let dashWidth = Math.max(4 / scale, 2)
      let rectNodes = []
      let titles = []
      const self = this
      console.log('🚀 ~ file: GraphVizControl.vue ~ line 267 ~ markSelectedComponents ~ components', components)
      components.each(function (d, i) {
        let component = d3_select(this)
        let color = 'red'
        let bbox = component.node().getBBox()
        let rect = component
          .append('rect')
          .attr('x', bbox.x)
          .attr('y', bbox.y)
          .attr('width', bbox.width)
          .attr('height', bbox.height)
          .attr('stroke', color)
          .attr('fill', 'transparent')
          .attr('opacity', 0.5)
          .attr('stroke-dasharray', dashLength)
          .attr('stroke-width', dashWidth)
        rectNodes.push(rect.node())
      })
      if (extendSelection) {
        this.selectRects = d3_selectAll(this.selectRects.nodes().concat(rectNodes))
        this.selectNames = this.selectNames.concat(titles)
      } else {
        this.selectRects = d3_selectAll(rectNodes)
        this.selectNames = titles
      }
    },
    handleZoomOutMapButtonClick () {
      let viewBox = this.svg.attr('viewBox').split(' ')
      let bbox = this.graph0.node().getBBox()
      let xRatio = viewBox[2] / bbox.width
      let yRatio = viewBox[3] / bbox.height
      let scale = Math.min(xRatio, yRatio)
      this.setZoomScale(scale, true)
    }
  }
}
</script>
<style>
</style>
