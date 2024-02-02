<template src="./index.template.html"></template>
<script>
import CaySoDoThietBi from "../CaySoDoThietBi/index.vue";
import ThietBi from "../CaySoDoThietBi/ThietBi";
import FormTuRack from "./turack";
import FormShelf from "./shelf";
import FormCard from "./card";
import FormEWSD from "./ewsd";
const ACTION_VIEW = "VIEW";
const ACTION_NEW = "NEW";
export default {
  components: { CaySoDoThietBi, FormTuRack, FormShelf, FormCard, FormEWSD },
  data: function () {
    return {
      currentItem: {},
      kieuTu: 1,
    };
  },
  computed: {
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
      return this.currentItem.itemID == undefined;
    },
    showTuRack: function () {
      return (
        this.currentItem.itemID != undefined &&
        this.currentItem.itemType == ThietBi.PRE_TURACK
      );
    },
    showShelf: function () {
      return (
        this.currentItem.itemID != undefined &&
        this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF
      );
    },
    showEwsd: function () {
      return (
        this.currentItem.itemID != undefined &&
        this.currentItem.itemType == ThietBi.PRE_EWSD
      );
    },
    showEwsdCard: function () {
      return (
        this.currentItem.itemID != undefined &&
        this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF_CARD
      );
    },
  },
  mounted: async function () {
    this.$root.showLoading(true);
    try {
      await this.$refs.caySoDoThietBi.loadNodes();
      //TURACK
      await this.$refs.formTuRack.bindTTVT();
      await this.$refs.formTuRack.bindLoaiTu();
      //EWSD
      // await this.$refs.formEwsd.bindOther();
    } finally {
      this.$root.showLoading(false);
    }
  },
  methods: {
    caySoDoThietBi_nodeSelected: async function (args) {
      this.$root.showLoading(true);
      try {
        if (args.itemData.itemType == ThietBi.PRE_TURACK) {
          this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_TURACK,
            action: ACTION_VIEW,
          };
          await this.$refs.formTuRack.bindData(args.itemData.itemID);
        } else if (args.itemData.itemType == ThietBi.PRE_EWSD_SHELF) {
          this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_EWSD_SHELF,
            action: ACTION_VIEW,
          };
          await this.$refs.formShelf.bindData(args.itemData.itemID);
        }
        else if (args.itemData.itemType == ThietBi.PRE_EWSD_SHELF_CARD) {
          this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_EWSD_SHELF_CARD,
            action: ACTION_VIEW,
          };
          await this.$refs.formCard.bindData(args.itemData.itemID);
        }
        else if (args.itemData.itemType == ThietBi.PRE_EWSD) {
          this.currentItem = {
            itemID: args.itemData.itemID,
            itemType: ThietBi.PRE_EWSD,
            action: ACTION_VIEW,
          };
          await this.$refs.formEwsd.bindData(args.itemData.itemID);
        } else {
          this.currentItem = {};
        }
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnNhapMoi_Click: function () {
      this.currentItem.itemID = 0;
      this.currentItem.action = ACTION_NEW;
      if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
        this.$refs.formTuRack.formNhapMoi();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF) {
        this.$refs.formShelf.formNhapMoi();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD) {
        this.$refs.formEwsd.formNhapMoi();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF_CARD) {
        this.$refs.formCard.formNhapMoi();
      } 
    },
    btnGhiLai_Click: async function () {
      this.$root.showLoading(true);
      try {
        if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
          let rs = await this.$refs.formTuRack.formGhiLai();
          if (rs == true) {
            if (this.currentItem.itemID == 0) {
              this.$refs.caySoDoThietBi.addNode(
                this.$refs.formTuRack.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                this.$refs.formTuRack.currentItem.TEN_TU,
                this.$refs.formTuRack.currentItem.DONVI_ID,
                ThietBi.PRE_DONVI,
                true
              );
              this.currentItem.itemID =
                this.$refs.formTuRack.currentItem.TURACK_ID;
            } else {
              this.$refs.caySoDoThietBi.updateNode(
                this.$refs.formTuRack.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                this.$refs.formTuRack.currentItem.TEN_TU,
                this.$refs.formTuRack.currentItem.DONVI_ID,
                ThietBi.PRE_DONVI,
                true
              );
            }
            this.currentItem.action = ACTION_VIEW;
          }
        } else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF) {
          let rs = await this.$refs.formShelf.formGhiLai();
          if (rs == true) {
            if (this.currentItem.itemID == 0) {
              this.$refs.caySoDoThietBi.addNode(
                this.$refs.formShelf.currentItem.SHELF_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF,
                this.$refs.formShelf.currentItem.TEN_SHELF,
                this.$refs.formShelf.currentItem.EWSD_ID,
                ThietBi.PRE_EWSD,
                true
              );
              this.currentItem.itemID =
                this.$refs.formShelf.currentItem.SHELF_EWSD_ID;
            } else {
              this.$refs.caySoDoThietBi.updateNode(
                this.$refs.formShelf.currentItem.SHELF_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF,
                this.$refs.formShelf.currentItem.TEN_SHELF,
                this.$refs.formShelf.currentItem.EWSD_ID,
                ThietBi.PRE_EWSD,
                true
              );
            }
            this.currentItem.action = ACTION_VIEW;
          }
        }
        else if (this.currentItem.itemType == ThietBi.PRE_EWSD) {
          let rs = await this.$refs.formEwsd.formGhiLai();
          if (rs == true) {
            if (this.currentItem.itemID == 0) {
              this.$refs.caySoDoThietBi.addNode(
                this.$refs.formEwsd.currentItem.EWSD_ID,
                ThietBi.PRE_EWSD,
                this.$refs.formEwsd.currentItem.TEN_EWSD,
                this.$refs.formEwsd.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                true
              );
              this.currentItem.itemID =
                this.$refs.formEwsd.currentItem.EWSD_ID;
            } else {
              this.$refs.caySoDoThietBi.updateNode(
                this.$refs.formEwsd.currentItem.EWSD_ID,
                ThietBi.PRE_EWSD,
                this.$refs.formEwsd.currentItem.TEN_EWSD,
                this.$refs.formEwsd.currentItem.TURACK_ID,
                ThietBi.PRE_TURACK,
                true
              );
            }
            this.currentItem.action = ACTION_VIEW;
          }
        }
        else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF_CARD) {
          let rs = await this.$refs.formCard.formGhiLai();
          if (rs == true) {
            if (this.currentItem.itemID == 0) {
              this.$refs.caySoDoThietBi.addNode(
                this.$refs.formCard.currentItem.CARD_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF_CARD,
                this.$refs.formCard.currentItem.TEN_CARD,
                this.$refs.formCard.currentItem.SHELF_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF,
                true
              );
              this.currentItem.itemID =
                this.$refs.formCard.currentItem.CARD_EWSD_ID;
            } else {
              this.$refs.caySoDoThietBi.updateNode(
                this.$refs.formCard.currentItem.CARD_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF_CARD,
                this.$refs.formCard.currentItem.TEN_CARD,
                this.$refs.formCard.currentItem.SHELF_EWSD_ID,
                ThietBi.PRE_EWSD_SHELF,
                true
              );
            }
            this.currentItem.action = ACTION_VIEW;
          }
        }
      } finally {
        this.$root.showLoading(false);
      }
    },
    btnHuy_Click: function () {
      if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
        this.$refs.formTuRack.formHuy();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF) {
        this.$refs.formShelf.formHuy();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD) {
        this.$refs.formEwsd.formHuy();
      } else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF_CARD) {
        this.$refs.formCard.formHuy();
      }
      this.currentItem = {};
    },
    btnXoa_Click: async function () {
      this.$root.showLoading(true);
      try {
        
        if (this.currentItem.itemType == ThietBi.PRE_TURACK) {
          let rs = await this.$refs.formTuRack.formXoa();
          if (rs == true) {
            this.$refs.caySoDoThietBi.deleteNode(
              this.currentItem.itemID,
              ThietBi.PRE_TURACK
            );
            this.currentItem = {};
          }
        }
        else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF) {
          let rs = await this.$refs.formShelf.formXoa();
          if (rs == true) {
            this.$refs.caySoDoThietBi.deleteNode(
              this.currentItem.itemID,
              ThietBi.PRE_EWSD_SHELF
            );
            this.currentItem = {};
          }
        }
        else if (this.currentItem.itemType == ThietBi.PRE_EWSD) {
          this.$bvModal.msgBoxConfirm('Bạn chắc chắn muốn xóa?', {
          size: 'sm',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy',
          }).then( async v => {
              if(v) 
              {
                let rs = await this.$refs.formEwsd.formXoa();
                console.log('rs xoa', rs)
                if (rs == true) 
                {
                  console.log('this.currentItem.itemID ',this.currentItem.itemID)
                  this.$refs.caySoDoThietBi.deleteNode(
                    this.currentItem.itemID,
                    ThietBi.PRE_EWSD
                  );
                  this.currentItem = {};
                }
              }
              }).catch(err => {
                this.$toast.toastError('Xóa thất bại');
              })
        }
        else if (this.currentItem.itemType == ThietBi.PRE_EWSD_SHELF_CARD) {
          this.$bvModal.msgBoxConfirm('Bạn chắc chắn muốn xóa?', {
          size: 'sm',
          okTitle: 'Đồng ý',
          cancelTitle: 'Hủy',
          }).then( async v => {
              if(v) 
              {
                let rs = await this.$refs.formCard.formXoa();
                console.log('rs xoa', rs)
                if (rs == true) 
                {
                  console.log('this.currentItem.itemID ',this.currentItem.itemID)
                  this.$refs.caySoDoThietBi.deleteNode(
                    this.currentItem.itemID,
                    ThietBi.PRE_EWSD_SHELF_CARD
                  );
                  this.currentItem = {};
                }
              }
              }).catch(err => {
                this.$toast.toastError('Xóa thất bại');
              })
        }
      } finally {
        this.$root.showLoading(false);
      }
    },
  },
};
</script>
