<template src="./index.template.html"></template>
<script>
import { required, numeric, minValue } from "@vuelidate/validators";
export default {
  components: {},
  data: function () {
    return {
      dsCard: [],
      currentItem: {},
    };
  },
  computed: {
    tenShelfEwsdInvalidStatus: function () {
      if (this.currentItem.SHELF_EWSD_ID != undefined) {
        return this.$v.currentItem.TEN_SHELF.$invalid;
      } else return false;
    },
    soSlotInvalidStatus: function () {
      if (this.currentItem.SHELF_EWSD_ID != undefined) {
        return this.$v.currentItem.SO_SLOT.$invalid;
      } else return false;
    },
  },
  validations: {
    currentItem: {
      TEN_SHELF: {
        required,
      },
      SO_SLOT: {
        required,
        numeric,
        minValue: minValue(0),
      },
    },
  },
  methods: {
    getDsCard: async function (shelf_ewsd_id) {
      let result = await this.$root.context.get(
        "/web-ecms/thietbichuyenmach/layCardEwsdTheoShelf",
        {
          shelfEwsdId: shelf_ewsd_id,
        }
      );
      return result.data;
    },
    layShelfEwsd: async function (shelfEwsdID) {
      let result = await this.$root.context.post(
        "/web-ecms/thietbichuyenmach/layShelfEwsd",
        {
          id: shelfEwsdID,
        }
      );
      return result.data;
    },
    xoaShelfEwsd: async function (id) {
      let result = await this.$root.context.post(
        "/web-ecms/thietbichuyenmach/XoaEwsdShelf",
        {
          id: id,
        }
      );
      return result.data;
    },
    capNhatShelfEwsd: async function (itemData) {
      let result = await this.$root.context.post(
        "/web-ecms/thietbichuyenmach/capNhatEWSDSHELF",
        {
          ewsd_id: itemData.EWSD_ID,
          shelf_ewsd_id: itemData.SHELF_EWSD_ID,
          so_slot: itemData.SO_SLOT,
          ten_shelf: itemData.TEN_SHELF,
          vi_tri: itemData.VITRI,
        }
      );
      return result.data;
    },
    themShelfEwsd: async function (itemData) {
      let result = await this.$root.context.post(
        "/web-ecms/thietbichuyenmach/themEWSDSHELF",
        {
          ewsd_id: itemData.EWSD_ID,
          so_slot: itemData.SO_SLOT,
          ten_shelf: itemData.TEN_SHELF,
          vi_tri: itemData.VITRI,
        }
      );
      return result.data;
    },
    bindData: async function (itemID) {
      let itemData = await this.layShelfEwsd(itemID);
      if (itemData != null) {
        this.currentItem = {
          SHELF_EWSD_ID: itemData.SHELF_EWSD_ID,
          TEN_SHELF: itemData.TEN_SHELF,
          EWSD_ID: itemData.EWSD_ID,
          SO_SLOT: itemData.SO_SLOT,
          DADUNG: itemData.DADUNG,
          VITRI: itemData.VITRI,
        };
        this.dsCard = await this.getDsCard(itemData.SHELF_EWSD_ID);
      } else this.currentItem = {};
    },
    formNhapMoi: function () {
      if (this.currentItem.EWSD_ID != undefined) {
        let ewsdID = this.currentItem.EWSD_ID;
        this.currentItem = {
          SHELF_EWSD_ID: 0,
          TEN_SHELF: "",
          EWSD_ID: ewsdID,
          SO_SLOT: 0,
          DADUNG: 0,
          VITRI: 0,
        };
        this.dsCard = [];
      } else {
        this.$root.toastError("Bạn chưa chọn thiết bị");
      }
    },
    formGhiLai: async function () {
      let result = false;
      if (this.currentItem.EWSD_ID != undefined) {
        this.$v.$touch();
        if (this.$v.$invalid) {
          let msg = "";
          if (this.$v.currentItem.TEN_SHELF.$invalid) {
            msg += "Tên Shelf không được để trống";
          }
          if (this.$v.currentItem.SO_SLOT.$invalid) {
            if (msg != "") msg += "\n";
            msg += "Số slot không không hợp lệ";
          }
          this.$root.toastError(msg);
        } else {
          if (this.currentItem.SHELF_EWSD_ID == 0) {
            let rs = await this.themShelfEwsd(this.currentItem);
            if (rs != null) {
              result = true;
              this.currentItem.SHELF_EWSD_ID = rs.SHELF_EWSD_ID;
              this.$root.toastSuccess("Thêm mới thành công");
            }
          } else {
            let rs = await this.capNhatShelfEwsd(this.currentItem);
            if (rs.result) {
              result = true;
              this.$root.toastSuccess("Cập nhật thành công");
              //await this.reloadDonVi();
            }
          }
        }
      } else {
        this.$root.toastError("Bạn chưa chọn thiết bị");
      }
      return result;
    },
    formHuy: function () {
      if (this.currentItem.EWSD_ID != undefined) {
        this.currentItem = {};
        this.dsCard = [];
      } else {
        this.$root.toastError("Bạn chưa chọn thiết bị");
      }
    },
    formXoa: async function () {
      let result = false;
      if (
        !(
          this.currentItem.SHELF_EWSD_ID == undefined ||
          this.currentItem.SHELF_EWSD_ID == 0
        )
      ) {
        let rs = await this.xoaShelfEwsd(this.currentItem.SHELF_EWSD_ID);
        if (rs.result) {
          result = true;
          this.$root.toastSuccess("Xóa thành công");
        }
        this.dsCard = [];
      } else {
        this.$root.toastError("Bạn chưa chọn thiết bị");
      }
      return result;
    },
  },
};
</script>
<style>
</style>
