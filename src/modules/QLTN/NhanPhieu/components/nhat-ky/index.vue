<template src="./index.html"></template>
<style scoped>
.popup-box .popup-header {
  padding: 10px 15px;
  font-size: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}
</style>
<script>
import moment from "moment";
import CommonsAPI from "@/modules/QLTN/api/Commons";

const msg = {
  success: {
    0: "Thêm mới dữ liệu thành công",
    2: "Cập nhật dữ liệu thành công",
    "-1": "Xóa dữ liệu thành công"
  },
  error: {
    0: "Thêm mới dữ liệu thất bại",
    2: "Có lỗi khi Sửa dữ liệu",
    "-1": "Có xóa khi Sửa dữ liệu"
  },
  confirm: {
    0: "Bạn có muốn thêm mới dữ liệu nhật ký không",
    2: "Bạn có muốn sửa dữ liệu nhật ký không",
    "-1": "Bạn có muốn xóa dữ liệu nhật ký không"
  }
};

export default {
  name: "NhatKy",
  components: {},
  props: ["dsDichVu", "kyCuoc", "dsLyDoTra", "rowData", "passParam"],
  data: function() {
    return {
      kyHD: [],
      chuKy: [],
      kyHDId: "",
      chuKyId: "",
      lyDo: [],
      formData: {},
      dsNK: [],
      formUpdate: {
        ghiChu: "",
        lyDoId: "",
        ngayDen: new Date(),
        lanThu: 0 //0: addnew, 2 update , -1 delete
      },
      selectedRow: {}
    };
  },
  validations: {},
  watch: {},
  created: async function() {
    this.getDsKyHD();
    this.makeLyDo();
    this.getFormInfo({
      pMaTK: this.passParam.maTT,
      pKyHoaDon: this.passParam.kyHoaDon,
      pTrangThaiHDId: this.passParam.trangThaiHDId
    });
    this.getGridData({
      pMaTT:this.passParam.maTT,
      pKyHoaDon: this.passParam.kyHoaDon,
      pTrangThaiHDId: this.passParam.trangThaiHDId
    });
  },
  async mounted() {},
  methods: {
    onClose() {
      this.$emit("close");
    },
    onClickAddNew() {
      this.formUpdate.lanThu = 0;
      if (this.validateData()) {
        
        this.$bvModal
          .msgBoxConfirm(msg.confirm[this.formUpdate.lanThu], {
            title: "Thông báo",
            size: "sm",
            buttonSize: "md",
            okVariant: "primary",
            headerClass: "p-2 pb-0 border-bottom-0",
            footerClass: "p-2 pt-0 border-top-0 justify-content-center",
            centered: true,
            noCloseOnBackdrop: true,
            okTitle: "Đồng ý",
            cancelTitle: "Không đồng ý"
          })
          .then(value => {
            value && this.excuteAddNew();
          });
      }
    },
    onClickUpdate() {
      this.formUpdate.lanThu = 2;
      if (this.validateData()) {

        if(this.selectedRow === null)
        {
          this.$toast.error('Chưa chọn trong danh sách.')
          return
        }
        this.$bvModal
          .msgBoxConfirm(msg.confirm[this.formUpdate.lanThu], {
            title: "Thông báo",
            size: "sm",
            buttonSize: "md",
            okVariant: "primary",
            headerClass: "p-2 pb-0 border-bottom-0",
            footerClass: "p-2 pt-0 border-top-0 justify-content-center",
            centered: true,
            noCloseOnBackdrop: true,
            okTitle: "Đồng ý",
            cancelTitle: "Không đồng ý"
          })
          .then(value => {
            value && this.excuteUpdate();
          });
      }
    },
    onClickDelete() {
      this.formUpdate.lanThu = -1;

      if(this.selectedRow === null)
        {
          this.$toast.error('Chưa chọn trong danh sách.')
          return
        }
        
      if (this.validateData()) {
        this.$bvModal
          .msgBoxConfirm(msg.confirm[this.formUpdate.lanThu], {
            title: "Thông báo",
            size: "sm",
            buttonSize: "md",
            okVariant: "primary",
            headerClass: "p-2 pb-0 border-bottom-0",
            footerClass: "p-2 pt-0 border-top-0 justify-content-center",
            centered: true,
            noCloseOnBackdrop: true,
            okTitle: "Đồng ý",
            cancelTitle: "Không đồng ý"
          })
          .then(value => {
            value && this.excuteUpdate();
          });
      }
    },
    validateData() {
       if (this.formData.maTT==="") {
        this.$toast.error("Hãy tìm kiếm thông tin trước khi cập nhật!");
        return false;
      }
      if (!this.formUpdate.lyDoId) {
        this.$toast.error("Bạn chưa chọn lý do trả!");
        return false;
      }
      if (this.formUpdate.ngayDen > new Date()) {
        this.$toast.error("Ngày cập nhật không được lớn hơn ngày hiện tại");
        return false;
      }
      if (this.formUpdate.ghiChu==="") {
        this.$toast.error("Ghi chú không được để trống");
        return false;
      }


     
      return true;
    },
    excuteAddNew() {
      const body = {
        pNhatKyTNId: 0,
        pThanhToanId: this.formData.THANHTOAN_ID,
        pTrangThaiHDId: this.passParam.trangThaiHDId,
        pNgayDen: moment(this.formUpdate.ngayDen).format("DD/MM/YYYY"), //"01/03/2021",
        pLanThu: this.formUpdate.lanThu,
        pMayCN: "maythuc",
        pIPCN: "maythuc",
        pLyDoTraId: this.formUpdate.lyDoId,
        pKyHoaDon: `${this.kyHDId}${this.chuKyId}`,//this.passParam.kyHoaDon,
        pGhiChu: this.formUpdate.ghiChu
      };
      this.updateData(body);
    },
    excuteUpdate() {
      const body = {
        pNhatKyTNId: this.selectedRow.NHATKYTN_ID,
        pThanhToanId: this.formData.THANHTOAN_ID,
        pTrangThaiHDId: this.passParam.trangThaiHDId,
        pNgayDen: moment(this.formUpdate.ngayDen).format("DD/MM/YYYY"), //"01/03/2021",
        pLanThu: this.formUpdate.lanThu,
        pMayCN: "maythuc",
        pIPCN: "maythuc",
        pLyDoTraId: this.formUpdate.lyDoId,
        pKyHoaDon: `${this.kyHDId}${this.chuKyId}`,//this.passParam.kyHoaDon,
        pGhiChu: this.formUpdate.ghiChu
      };
      this.updateData(body);
    },
    onSelectRowGrid(value) {
      if (value) {
        this.formUpdate.ngayDen = moment(
        value.NGAY_DEN,
         "DD/MM/YYYY"
        // "YYYY/MM/DD HH:mm:ss"
        ).toDate();
        this.formUpdate.lyDoId = value.LYDOTRA_ID;
        this.formUpdate.ghiChu = value.GHICHU;
      }
      this.selectedRow = value;
    },
    makeLyDo() {
      const lyDoCopy = JSON.parse(JSON.stringify(this.dsLyDoTra));
      this.lyDo = lyDoCopy.map(item => ({
        LYDOTRA_ID: item.LYDOTRA_ID,
        NOIDUNG: item.NOIDUNG
      }));
      //this.formUpdate.lyDoId = this.lyDo[0].LYDOTRA_ID;
    },
    getDsKyHD: async function() {
      try {
        const { data } = await this.axios.get(
          "/web-thuno/api/thu-no/common/ky-hoa-don"
        );
        if (data && data.error == "200") {
          if (data.data.length > 0) {
            // this.kyHDId = data.data[0].ID.toString().slice(0, -2);
            // this.getChuKyNoByKyHD(this.kyHDId);
            this.kyHD = data.data.map(item => ({
              ID: item.ID.toString().slice(0, -2),
              CHUKYNO: item.CHUKYNO.split(" ")[2].slice(0, -1)
            }));
            this.kyHDId = this.passParam.kyHoaDon.toString().slice(0, -2);
            this.getChuKyNoByKyHD(this.kyHDId);
          }
        }
      } catch (error) {}
    },
    getChuKyNoByKyHD: async function() {
      CommonsAPI.getChuKyNoTheoKyCuoc(this.axios, this.kyHDId)
        .then(response => {
          const { data } = response;
          if (data && data.error == "200") {
            if (data.data.length > 0) {
              console.log(data)
              this.chuKyId = data.data[0].CHUKY;
              this.chuKy = data.data;
              this.getGridData({
                pMaTT:this.passParam.maTT,
                pKyHoaDon: `${this.kyHDId}${this.chuKyId}`,
                pTrangThaiHDId: this.passParam.trangThaiHDId
              });

              console.log(this.kyHDId)
            }
          }
        }).catch(function(err) {});
    },
    getFormInfo: async function(param) {
      try {
        const rs = await this.$root.context.get(
          "/web-thuno/api/thu-no/nhan-phieu/cap-nhat-nhat-ky/lay-thanh-toan-theo-dieu-kien",
          param
        );
        if (rs && rs.error == "200" && rs.data.length > 0) {
          this.formData = rs.data[0];
          this.formData = {
            ...rs.data[0],
            TIENNO: Number(rs.data[0].TIENNO).toLocaleString("en-En")
          };
        }
      } catch (error) {}
    },
    getGridData: async function(param) {
      console.log(param);
      try {
        const rs = await this.$root.context.get(
          "/web-thuno/api/thu-no/nhan-phieu/cap-nhat-nhat-ky/lay-nhat-ky-thu-no-theo-ma-thanh-toan-v2",
          param
        );
        // console.log(rs.data);
        if (rs && rs.error == "200") {
          this.dsNK = rs.data.map(item=> ({
            ...item,
            NGAYDEN_CONVERT : item.NGAY_DEN//moment(item.NGAY_DEN).format('DD/MM/YYYY')
          }));
        }
      } catch (error) {}
    },
    updateData: async function(body) {
      console.log('updateData', body);
      try {
        const { data } = await this.axios.put(
          "/web-thuno/api/thu-no/nhan-phieu/cap-nhat-nhat-ky/thao-tac-nhat-ky-thu-no-theo-thanh-toan-v2",
          body
        );
        if (data && data.error == "200") {
          this.$toast.success(msg.success[this.formUpdate.lanThu]);
          this.getGridData({
            pMaTT: this.passParam.maTT,
            pKyHoaDon: `${this.kyHDId}${this.chuKyId}`,//this.passParam.kyHoaDon,
            pTrangThaiHDId: this.passParam.trangThaiHDId
          });
        }
      } catch (error) {
        if(error.data && error.data.message_detail) {
          this.$toast.error(error.data.message_detail);
        } else {
          this.$toast.error(msg.error[this.formUpdate.lanThu]);
        }
      }
    }
  }
};
</script>
