<template src='./index.html'></template>

<script>
import ThietBi from "./ThietBi";
export default {
  props: {
    loadDataWhenCreate: false,
    kieuTu: {
      type: Number,
      default: 1,
    },
  },
  data: function () {
    return {
      txtSearch: "",
      dsNodes: [],
    };
  },
  created: async function () {
    if (this.loadDataWhenCreate == true) {
      this.$emit("beginCreate");
      try {
        await this.loadNodes();
      } finally {
        this.$emit("endCreate");
      }
    }
  },
  computed: {
    treeFields: function () {
      return {
        dataSource: this.dsNodesFiltered,
        id: "id",
        text: "text",
        parentID: "parentID",
        hasChildren: "hasChildren",
        expanded: "expanded",
        selected: "selected",
      };
    },
    dsNodesFiltered: function () {
      // let result = [];
      // if (this.dsNodes != null) {
      //   let items = this.dsNodes.filter((item) => {
      //     return item.text.toLowerCase().includes(this.txtSearch.toLowerCase());
      //   });
      //   if (!(items == null || items.length == 0)) {
      //     for (let i = 0; i < items.length; i++) {
      //       const item = items[i];
      //       result.push(item);
      //       if (item.parentID != null) {
      //         let ps = this.getParents(item.parentID);
      //         if (!(ps == null || ps.length == 0)) {
      //           for (let j = 0; j < ps.length; j++) {
      //             let ck = result.findIndex((x) => x.id == ps[j].id);
      //             if (ck < 0) result.push(ps[j]);
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // return result;
      //return this.dsNodes;
      return this.dsNodes.filter((item) => {
        //return item.text.toString().toLowerCase().includes(this.txtSearch.toLowerCase());
        if (item.text == undefined || item.text == null) return true;
        else return item.text != this.txtSearch;
      });
    },
  },
  methods: {
    tree_nodeSelected: function (args) {
      let item = this.dsNodes.find((x) => x.id == args.nodeData.id);
      if (item != null) {
        let newArgs = {
          node: args.node,
          expanded: args.nodeData.expanded,
          hasChildren: args.nodeData.hasChildren,
          selected: args.nodeData.selected,
          text: args.nodeData.text,
          itemData: {
            itemID: item.itemID,
            itemType: item.itemType,
            itemParentID: item.itemParentID,
            itemParentType: item.itemParentType,
          },
        };
        this.$emit("nodeSelected", newArgs);
      }
    },
    btnReload_click: async function () {
      this.$root.showLoading(true);
      try {
        await this.loadNodes();
      } finally {
        this.$root.showLoading(false);
      }
    },
    loadNodes: async function () {
      let nodes = [];
      let dsDonVi = await this.getDsDonVi();
      if (!(dsDonVi == null || dsDonVi.length == 0)) {
        dsDonVi.forEach((donVi) => {
          let node_DONVI = this.createNode(
            donVi.DONVI_ID,
            ThietBi.PRE_DONVI,
            donVi.TEN_DV,
            donVi.DONVI_CHA_ID,
            ThietBi.PRE_DONVI
          );
          nodes.push(node_DONVI);
        });
      }
      // let dsThietBi = await this.getDsThietBi();
      // if (dsThietBi != null) {
      //   let dsTuRack = dsThietBi.TuRack;
      //   if (!(dsTuRack == null || dsTuRack.length == 0)) {
      //     dsTuRack.forEach((item) => {
      //       let node_id = ThietBi.PRE_TURACK + SEPARATOR + item.TURACK_ID.toString();
      //       let node_parentID = null;
      //       if (item.DONVI_ID != null)
      //         node_parentID = ThietBi.PRE_DONVI + SEPARATOR + item.DONVI_ID.toString();
      //       let node = this.createNode(node_id, item.TEN_TU, node_parentID);
      //       nodes.push(node);
      //     });
      //   }
      // }
      // let dsThietBi_TuRack = await this.getDsTuRack();
      // if (dsThietBi_TuRack != null) {
      //   let items = dsThietBi_TuRack.TuRack;
      //   if (!(items == null || items.length == 0)) {
      //     items.forEach((item) => {
      //       let node = this.createNode(
      //         item.TURACK_ID,
      //         ThietBi.PRE_TURACK,
      //         item.TEN_TU,
      //         item.DONVI_ID,
      //         ThietBi.PRE_DONVI
      //       );
      //       nodes.push(node);
      //     });
      //   }
      // }

      let dsThietBi_TuRack = await this.getDsTuRackTheoKieuTu(this.kieuTu);
      if (dsThietBi_TuRack != null) {
        let items = dsThietBi_TuRack.TuRack;
        if (!(items == null || items.length == 0)) {
          items.forEach((item) => {
            let node = this.createNode(
              item.TURACK_ID,
              ThietBi.PRE_TURACK,
              item.TEN_TU,
              item.DONVI_ID,
              ThietBi.PRE_DONVI
            );
            nodes.push(node);
          });

          // Chuyển mạch
          if (this.kieuTu == 1) {
            //EWSD
            let dsThietBi_Ewsd = await this.getDsEwsd();
            if (dsThietBi_Ewsd != null) {
              let ewsd = dsThietBi_Ewsd.Ewsd;
              if (ewsd != null) {
                if (!(ewsd == null || ewsd.length == 0)) {
                  ewsd.forEach((item) => {
                    let node = this.createNode(
                      item.EWSD_ID,
                      ThietBi.PRE_EWSD,
                      item.TEN_EWSD,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }
              let ewsdShelfEwsd = dsThietBi_Ewsd.ShelfEwsd;
              if (ewsdShelfEwsd != null) {
                if (!(ewsdShelfEwsd == null || ewsdShelfEwsd.length == 0)) {
                  ewsdShelfEwsd.forEach((item) => {
                    let node = this.createNode(
                      item.SHELF_EWSD_ID,
                      ThietBi.PRE_EWSD_SHELF,
                      item.TEN_SHELF,
                      item.EWSD_ID,
                      ThietBi.PRE_EWSD
                    );
                    nodes.push(node);
                  });
                }
              }
              let ewsdCardEwsd = await this.getDsCardEwsd();
              if (ewsdCardEwsd != null) {
                if (!(ewsdCardEwsd == null || ewsdCardEwsd.length == 0)) {
                  ewsdCardEwsd.forEach((item) => {
                    let node = this.createNode(
                      item.CARD_EWSD_ID,
                      ThietBi.PRE_EWSD_SHELF_CARD,
                      item.TEN_CARD,
                      item.SHELF_EWSD_ID,
                      ThietBi.PRE_EWSD_SHELF
                    );
                    nodes.push(node);
                  });
                }
              }
            }
          } else if (this.kieuTu == 2) {
            let dsThietBi_Odf = await this.getDsOdf();
            if (dsThietBi_Odf != null) {
              let items = dsThietBi_Odf.Odf;
              if (!(items == null || items.length == 0)) {
                items.forEach((item) => {
                  let node = this.createNode(
                    item.ODF_ID,
                    ThietBi.PRE_ODF,
                    item.TEN_ODF,
                    item.TURACK_ID,
                    ThietBi.PRE_TURACK
                  );
                  nodes.push(node);
                });
              }
            }
            //BRAS
            let dsThietBi_Bras_full = await this.getDsBras();
            if (dsThietBi_Bras_full != null) {
              let dsThietBi_Bras = dsThietBi_Bras_full.Bras;
              if (dsThietBi_Bras != null) {
                let items = dsThietBi_Bras;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.BRAS_ID,
                      ThietBi.PRE_BRAS,
                      item.TENBRAS,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }

              let dsThietBi_CardBras = dsThietBi_Bras_full.CardBras;
              if (dsThietBi_CardBras != null) {
                let items = dsThietBi_CardBras;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.CARDBRAS_ID,
                      ThietBi.PRE_BRAS_CARD,
                      item.TEN_CARD,
                      item.BRAS_ID,
                      ThietBi.PRE_BRAS
                    );
                    nodes.push(node);
                  });
                }
              }

              let dsThietBi_PortBras = dsThietBi_Bras_full.PortBras;
              if (dsThietBi_PortBras != null) {
                let items = dsThietBi_PortBras;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.PORTBRAS_ID,
                      ThietBi.PRE_BRAS_CARD_PORT,
                      item.VITRI,
                      item.BRAS_ID,
                      ThietBi.PRE_BRAS_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
            }
            //GPON
            let dsThietBi_Gpon_full = await this.getDsGpon();
            if (dsThietBi_Gpon_full != null) {
              let dsThietBi_Gpon = dsThietBi_Gpon_full.Gpon;
              if (dsThietBi_Gpon != null) {
                let items = dsThietBi_Gpon;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.DSLAM_ID,
                      ThietBi.PRE_GPON,
                      item.TENDSLAM,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }

              let dsThietBi_CardGpon = dsThietBi_Gpon_full.CardGpon;
              if (dsThietBi_CardGpon != null) {
                let items = dsThietBi_CardGpon;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.CARDGP_ID,
                      ThietBi.PRE_GPON_CARD,
                      item.TEN_CARD,
                      item.DSLAM_ID,
                      ThietBi.PRE_GPON
                    );
                    nodes.push(node);
                  });
                }
              }

              let dsThietBi_PortGpon = dsThietBi_Gpon_full.PortGpon;
              if (dsThietBi_PortGpon != null) {
                let items = dsThietBi_PortGpon;
                if (!(items == null || items.length == 0)) {
                  items.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_GPON_CARD_PORT,
                      item.VITRI,
                      item.CARDGP_ID,
                      ThietBi.PRE_GPON_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
            }

            //MANE
            let dsThietBi_Mane = await this.getDsMane();
            if (dsThietBi_Mane != null) {
              let mane = dsThietBi_Mane.Mane;
              if (mane != null) {
                if (!(mane == null || mane.length == 0)) {
                  mane.forEach((item) => {
                    let node = this.createNode(
                      item.DSLAM_ID,
                      ThietBi.PRE_MANE,
                      item.TENDSLAM,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }
              let maneCard = dsThietBi_Mane.CardMane;
              if (maneCard != null) {
                if (!(maneCard == null || maneCard.length == 0)) {
                  maneCard.forEach((item) => {
                    let node = this.createNode(
                      item.CARDMANE_ID,
                      ThietBi.PRE_MANE_CARD,
                      item.TEN_CARD,
                      item.DSLAM_ID,
                      ThietBi.PRE_MANE
                    );
                    nodes.push(node);
                  });
                }
              }
              let manePort = dsThietBi_Mane.PortMane;
              if (manePort != null) {
                if (!(manePort == null || manePort.length == 0)) {
                  manePort.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_MANE_CARD_PORT,
                      item.VITRI,
                      item.CARDMANE_ID,
                      ThietBi.PRE_MANE_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
              let maneModule = dsThietBi_Mane.ModuleMane;
              if (maneModule != null) {
                if (!(maneModule == null || maneModule.length == 0)) {
                  maneModule.forEach((item) => {
                    let node = this.createNode(
                      item.MODULEMANE_ID,
                      ThietBi.PRE_MANE_CARD_MODULE,
                      item.SERIAL,
                      item.CARDMANE_ID,
                      ThietBi.PRE_MANE_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
              let maneModulePort = dsThietBi_Mane.PortModuleMane;
              if (maneModulePort != null) {
                if (!(maneModulePort == null || maneModulePort.length == 0)) {
                  maneModulePort.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_MANE_CARD_MODULE_PORT,
                      item.VITRI,
                      item.MODULEMANE_ID,
                      ThietBi.PRE_MANE_CARD_MODULE
                    );
                    nodes.push(node);
                  });
                }
              }
            }
            //SWITCH
            let dsThietBi_Switch = await this.getDsSwitch();
            if (dsThietBi_Switch != null) {
              let sw = dsThietBi_Switch.Switch;
              if (sw != null) {
                if (!(sw == null || sw.length == 0)) {
                  sw.forEach((item) => {
                    let node = this.createNode(
                      item.DSLAM_ID,
                      ThietBi.PRE_SWITCH,
                      item.TENDSLAM,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }
              let swPort = dsThietBi_Switch.PortSwitch;
              if (swPort != null) {
                if (!(swPort == null || swPort.length == 0)) {
                  swPort.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_SWITCH_PORT,
                      item.VITRI,
                      item.DSLAM_ID,
                      ThietBi.PRE_SWITCH
                    );
                    nodes.push(node);
                  });
                }
              }
              let swCard = dsThietBi_Switch.CardSwitch;
              if (swCard != null) {
                if (!(swCard == null || swCard.length == 0)) {
                  swCard.forEach((item) => {
                    let node = this.createNode(
                      item.CARDSW_ID,
                      ThietBi.PRE_SWITCH_CARD,
                      item.TEN_CARD,
                      item.DSLAM_ID,
                      ThietBi.PRE_SWITCH
                    );
                    nodes.push(node);
                  });
                }
              }
              let swCardPort = dsThietBi_Switch.PortCardSw;
              if (swCardPort != null) {
                if (!(swCardPort == null || swCardPort.length == 0)) {
                  swCardPort.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_SWITCH_CARD_PORT,
                      item.VITRI,
                      item.CARDSW_ID,
                      ThietBi.PRE_SWITCH_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
            }
            //DSLAM
            let dsThietBi_Dslam = await this.getDsDslam();
            if (dsThietBi_Dslam != null) {
              let dslam = dsThietBi_Dslam.Dslam;
              if (dslam != null) {
                if (!(dslam == null || dslam.length == 0)) {
                  dslam.forEach((item) => {
                    let node = this.createNode(
                      item.DSLAM_ID,
                      ThietBi.PRE_DSLAM,
                      item.TENDSLAM,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamFrameDsl = dsThietBi_Dslam.FrameDsl;
              if (dslamFrameDsl != null) {
                if (!(dslamFrameDsl == null || dslamFrameDsl.length == 0)) {
                  dslamFrameDsl.forEach((item) => {
                    let node = this.createNode(
                      item.FRAMEDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME,
                      item.TEN_FRAME,
                      item.DSLAM_ID,
                      ThietBi.PRE_DSLAM
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamShelfDsl = dsThietBi_Dslam.ShelfDsl;
              if (dslamShelfDsl != null) {
                if (!(dslamShelfDsl == null || dslamShelfDsl.length == 0)) {
                  dslamShelfDsl.forEach((item) => {
                    let node = this.createNode(
                      item.SHELFDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF,
                      item.TEN_SHELF,
                      item.FRAMEDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamCardDsl = dsThietBi_Dslam.CardDsl;
              if (dslamCardDsl != null) {
                if (!(dslamCardDsl == null || dslamCardDsl.length == 0)) {
                  dslamCardDsl.forEach((item) => {
                    let node = this.createNode(
                      item.CARDDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD,
                      item.TEN_CARD,
                      item.SHELFDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamPortCardDsl = dsThietBi_Dslam.PortCardDsl;
              if (dslamPortCardDsl != null) {
                if (
                  !(dslamPortCardDsl == null || dslamPortCardDsl.length == 0)
                ) {
                  dslamPortCardDsl.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_PORT,
                      item.VITRI,
                      item.CARDDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamModuleDsl = dsThietBi_Dslam.ModuleDsl;
              if (dslamModuleDsl != null) {
                if (!(dslamModuleDsl == null || dslamModuleDsl.length == 0)) {
                  dslamModuleDsl.forEach((item) => {
                    let node = this.createNode(
                      item.MODULEDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE,
                      item.VITRI,
                      item.CARDDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD
                    );
                    nodes.push(node);
                  });
                }
              }
              let dslamPortModuleDsl = dsThietBi_Dslam.PortModuleDsl;
              if (dslamPortModuleDsl != null) {
                if (
                  !(
                    dslamPortModuleDsl == null || dslamPortModuleDsl.length == 0
                  )
                ) {
                  dslamPortModuleDsl.forEach((item) => {
                    let node = this.createNode(
                      item.PORTVL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE_PORT,
                      item.VITRI,
                      item.MODULEDSL_ID,
                      ThietBi.PRE_DSLAM_FRAME_SHELF_CARD_MODULE
                    );
                    nodes.push(node);
                  });
                }
              }
            }
            //FRAME
            let dsThietBi_Frame = await this.getDsFrame();
            if (dsThietBi_Frame != null) {
              let frame = dsThietBi_Frame.FrameTD;
              if (frame != null) {
                if (!(frame == null || frame.length == 0)) {
                  frame.forEach((item) => {
                    let node = this.createNode(
                      item.FRAMETD_ID,
                      ThietBi.PRE_FRAME,
                      item.TEN_FRAME,
                      item.TURACK_ID,
                      ThietBi.PRE_TURACK
                    );
                    nodes.push(node);
                  });
                }
              }
              let frameCard = dsThietBi_Frame.CardTD;
              if (frameCard != null) {
                if (!(frameCard == null || frameCard.length == 0)) {
                  frameCard.forEach((item) => {
                    let node = this.createNode(
                      item.CARDTD_ID,
                      ThietBi.PRE_FRAME_CARD,
                      item.VITRI,
                      item.FRAMETD_ID,
                      ThietBi.PRE_FRAME
                    );
                    nodes.push(node);
                  });
                }
              }
            }
          }
        }
      }

      //Set hasChildren
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let ck = nodes.findIndex((x) => x.parentID == node.id);
        if (ck >= 0) {
          node.hasChildren = true;
        }
      }
      this.dsNodes = nodes;
    },
    createNode: function (nodeID, nodeType, nodeText, parentID, parentType) {
      let id = nodeType + ThietBi.SEPARATOR + nodeID.toString();
      if (nodeText == null) nodeText = "(null)";
      let parent = null;
      if (parentID != null)
        parent = parentType + ThietBi.SEPARATOR + parentID.toString();
      return {
        id: id,
        text: nodeText,
        parentID: parent,
        hasChildren: false,
        expanded: false,
        selected: false,
        itemID: nodeID,
        itemType: nodeType,
        itemParentID: parentID,
        itemParentType: parentType,
      };
    },
    addNode: function (
      nodeID,
      nodeType,
      nodeText,
      parentID,
      parentType,
      selected
    ) {
      let node = this.createNode(
        nodeID,
        nodeType,
        nodeText,
        parentID,
        parentType
      );
      this.dsNodes.push(node);
      if (selected === true) this.selectedItem(nodeID, nodeType);
    },
    updateNode: function (
      nodeID,
      nodeType,
      nodeText,
      parentID,
      parentType,
      selected
    ) {
      let id = nodeType + ThietBi.SEPARATOR + nodeID.toString();
      let node = this.dsNodes.find((x) => x.id == id);
      if (node != null) {
        node.text = nodeText;
        if (!(parentType == undefined || parentType == null)) {
          let parent = null;
          if (parentID != null)
            parent = parentType + ThietBi.SEPARATOR + parentID.toString();
          node.parentID = parent;
          node.itemParentID = parentID;
          node.itemParentType = parentType;
        }
        if (selected === true) this.selectedItem(nodeID, nodeType);
      }
    },
    deleteNode: function (nodeID, nodeType) {
      let id = nodeType + ThietBi.SEPARATOR + nodeID.toString();
      this.dsNodes = this.dsNodes.filter((x) => x.id != id);
      let filters = this.dsNodes.filter((x) => x.selected == true);
      if (!(filters == null || filters.length == 0)) {
        for (let i = 0; i < filters.length; i++) {
          filters[i].selected = false;
        }
      }
    },
    selectedItem: function (nodeID, nodeType) {
      let id = nodeType + ThietBi.SEPARATOR + nodeID.toString();
      let node = this.dsNodes.find((x) => x.id == id);
      if (node != null) {
        if (node.parentID != null) {
          let ps = this.getParents(node.parentID);
          if (!(ps == null || ps.length == 0)) {
            for (let i = 0; i < ps.length; i++) {
              ps[i].expanded = true;
            }
          }
        }
        node.selected = true;
        let filters = this.dsNodes.filter(
          (x) => x.selected == true && x.id != node.id
        );
        if (!(filters == null || filters.length == 0)) {
          for (let i = 0; i < filters.length; i++) {
            filters[i].selected = false;
          }
        }
      }
    },
    getParents: function (parentID) {
      let rs = [];
      let parent = this.dsNodes.find((x) => x.id == parentID);
      if (parent != null) {
        rs.push(parent);
        if (parent.parentID != null) {
          let ps = this.getParents(parent.parentID);
          if (!(ps == null || ps.length == 0)) {
            for (let i = 0; i < ps.length; i++) {
              rs.push(ps[i]);
            }
          }
        }
      }
      return rs;
    },
    getDsDonVi: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/danhmuc/layCayDonVi"
      );
      return result.data;
    },
    getDsThietBi: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getCayDanhMucThietBi"
      );
      return result.data;
    },
    getDsTuRackTheoKieuTu: async function (kieu) {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucTuRackTheoKieuTu",
        {
          id: kieu,
        }
      );
      return result.data;
    },
    getDsTuRack: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucTuRack"
      );
      return result.data;
    },
    getDsOdf: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucOdf"
      );
      return result.data;
    },
    getDsBras: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucBras"
      );
      return result.data;
    },
    getDsGpon: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucGpon"
      );
      return result.data;
    },
    getDsMane: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucMane"
      );
      return result.data;
    },
    getDsSwitch: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucSwitch"
      );
      return result.data;
    },
    getDsDslam: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucDslam"
      );
      return result.data;
    },
    getDsFrame: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucFrame"
      );
      return result.data;
    },
    getDsEwsd: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDanhMucEwsd"
      );
      return result.data;
    },
    getDsCardEwsd: async function () {
      let result = await this.$root.context.post(
        "/web-ecms/quanlythietbi/getDsCardEwsd"
      );
      return result.data;
    },
  },
};
</script>
