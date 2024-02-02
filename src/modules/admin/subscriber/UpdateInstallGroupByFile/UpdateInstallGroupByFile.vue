<template src="./UpdateInstallGroupByFile.html"></template>
<style scoped src="./UpdateInstallGroupByFile.scss"></style>
<script>
import API from "./API";
import breadcrumb from "@/components/breadcrumb";
import ActionTop from "@/components/ActionTop.vue";
import KTable from "@/components/KTable.vue";
import DanhSachLoiModal from "./DanhSachLoiModal.vue";
import XLSX from "xlsx";
import moment from "moment";
export default {
  components: {
    breadcrumb,
    ActionTop,
    KTable,
    DanhSachLoiModal,
  },
  data: function () {
    return {
      header: {
        title: "Cập nhật tổ thi công theo file",
      },
      /* columns: [
        {
          field: "MA_TT",
          label: "Mã TB",
          allowFilter: true,
        },
        {
          field: "GIATRI",
          label: "DONVI_ID",
          allowFilter: true,
        },
        {
          field: "GHICHU",
          label: "Kiểu ĐV",
          allowFilter: true,
        },
      ], */
      dataSources: [],
      columnsError: [],
      columnsError1: [
        {
          field: "STT",
          label: "STT",
          allowFilter: false,
        },
        {
          field: "MA_TB",
          label: "Mã TB",
          allowFilter: false,
        },
        {
          field: "DONVI_ID",
          label: "DONVI_ID",
          allowFilter: false,
        },
        {
          field: "KIEUDV_ID",
          label: "Kiểu ĐV",
          allowFilter: false,
        },
        {
          field: "LOI",
          label: "Lỗi",
          allowFilter: false,
        },
      ],
      columnsError2: [
        {
          field: "STT",
          label: "STT",
          allowFilter: false,
        },
        {
          field: "ma_tb",
          label: "Mã TB",
          allowFilter: false,
        },
        {
          field: "donvi_id",
          label: "DONVI_ID",
          allowFilter: false,
        },
        {
          field: "kieudv_id",
          label: "Kiểu ĐV",
          allowFilter: false,
        },
        {
          field: "lydo_loi",
          label: "Lỗi",
          allowFilter: false,
        },
      ],
      dataSourcesError: [],
      file: null,
      file_full_path: "",
      danhsach_excel: [],
    };
  },
  validations: {},
  created() {},
  methods: {
    chooseFile() {
      this.dataSources = [];
      this.dataSourcesError = [];
      this.danhsach_excel = [];
      document.getElementById("file").click();
    },
    onChangeFile(event) {
      this.file_full_path = event.target.value;
      this.file = event.target.files[0];
      this.readFileExcel();
    },
    readFileExcel() {
      this.dataSources = [];
      this.dataSourcesError = [];
      this.danhsach_excel = [];
      let columns;
      try {
        this.loading(true);
        if (this.checkfile()) {
          const reader = new FileReader();
          reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            columns = data[0];
            if (this.kiemTraDuLieu(columns)) {
              for (var i = 1; i < data.length; i++) {
                this.danhsach_excel.push({
                  MA_TB: data[i][0],
                  DONVI_ID: data[i][1],
                  KIEUDV_ID: data[i][2],
                });
              }
              //check lỗi null
              this.danhsach_excel.forEach((item) => {
                if (
                  item.MA_TB == undefined ||
                  item.MA_TB == null ||
                  item.MA_TB.toString().trim() == ""
                ) {
                  this.dataSourcesError.push({
                    MA_TB: "",
                    DONVI_ID: item.DONVI_ID == undefined ? "" : item.DONVI_ID,
                    KIEUDV_ID:
                      item.KIEUDV_ID == undefined ? "" : item.KIEUDV_ID,
                    LOI: "Mã TB null",
                  });
                } else if (
                  item.DONVI_ID == undefined ||
                  item.DONVI_ID == null ||
                  item.DONVI_ID.toString().trim() == ""
                ) {
                  this.dataSourcesError.push({
                    MA_TB: item.MA_TB == undefined ? "" : item.MA_TB,
                    DONVI_ID: "",
                    KIEUDV_ID:
                      item.KIEUDV_ID == undefined ? "" : item.KIEUDV_ID,
                    LOI: "Đơn vị ID  null",
                  });
                } else if (
                  item.KIEUDV_ID == undefined ||
                  item.KIEUDV_ID == null ||
                  item.KIEUDV_ID.toString().trim() == ""
                ) {
                  this.dataSourcesError.push({
                    MA_TB: item.MA_TB == undefined ? "" : item.MA_TB,
                    DONVI_ID: item.DONVI_ID == undefined ? "" : item.DONVI_ID,
                    KIEUDV_ID: "",
                    LOI: "Kiểu đơn vị ID  null",
                  });
                } else if (
                  item.KIEUDV_ID == undefined ||
                  item.KIEUDV_ID == null ||
                  item.KIEUDV_ID.toString().trim()  > 2
                ) {
                  this.dataSourcesError.push({
                    MA_TB: item.MA_TB == undefined ? "" : item.MA_TB,
                    DONVI_ID: item.DONVI_ID == undefined ? "" : item.DONVI_ID,
                    KIEUDV_ID:  item.KIEUDV_ID == undefined ? "" : item.KIEUDV_ID,
                    LOI: "KIEUDV_ID = 1 (Đơn vị đầu), 2 (Đơn vị cuối)",
                  });
                }
              });

              //showModal lỗi null
              if (this.dataSourcesError.length > 0) {
                this.columnsError = this.columnsError1;
                this.dataSourcesError.forEach((item, index) => {
                  item.STT = index + 1;
                });
                this.$refs.danhsachloi.showModal();
                return;
              }

              //check lỗi trùng
              //let ds_trung=this.findDuplicates(this.danhsach_excel)
              let ds_trung = this.findDuplicates(this.danhsach_excel);
              console.log("ds_trung", ds_trung);
              if (ds_trung.length > 0) {
                this.columnsError = this.columnsError1;
                ds_trung.forEach((item, index) => {
                  this.dataSourcesError.push({
                    STT: index + 1,
                    MA_TB: item.MA_TB,
                    DONVI_ID: item.DONVI_ID,
                    KIEUDV_ID: item.KIEUDV_ID,
                    LOI: "MA_TB, DONVI_ID, KIEUDV_ID bị lặp lại",
                  });
                });
                this.$refs.danhsachloi.showModal();
                return;
              }
              //FN_INS_KIEMTRA_MA_TB
              var danhsach = [];
              this.danhsach_excel.forEach((item) => {
                danhsach.push({
                  MA_TT: item.MA_TB,
                  GIATRI: item.DONVI_ID,
                  KIEU_ID: "40",
                  NGUOIDUNG_ID: this.$root.token.getNguoiDungID(),
                  GHICHU: item.KIEUDV_ID
                });
              });
              this.insert_kiemtra(danhsach);
            }
          };
          reader.readAsBinaryString(this.file);
        }
      } catch (error) {
        this.$alert("Có lỗi xảy ra", "", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
      } finally {
        this.loading(false);
      }
    },
    checkfile: function () {
      if (this.file == null) {
        this.$alert("Chưa chọn file excel", "", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
        return false;
      }
      if (
        this.file.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.$alert("File upload không đúng định dạng", "", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
        return false;
      }
      return true;
    },
    kiemTraDuLieu: function (columns) {
      if (columns == null) {
        this.$alert("File có cấu trúc không hợp lệ!", "", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
        return false;
      }
      if (
        !(
          columns[0].toUpperCase() == "MA_TB" &&
          columns[1].toUpperCase() == "DONVI_ID" &&
          columns[2].toUpperCase() == "KIEUDV_ID"
        )
      ) {
        this.$alert("File có cấu trúc không hợp lệ!", "", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
        return false;
      }
      return true;
    },
    findDuplicates(array) {
      var result = [];
      array.forEach((item, index) => {
        if (
          array.findIndex(
            (x) =>
              x.MA_TB.toString().trim() == item.MA_TB.toString().trim() &&
              x.DONVI_ID.toString().trim() == item.DONVI_ID.toString().trim() && x.KIEUDV_ID.toString().trim() == item.KIEUDV_ID.toString().trim()
          ) != index
        ) {
          const index = result.findIndex(
            (r) =>
              r.MA_TB.toString().trim() == item.MA_TB.toString().trim() &&
              r.DONVI_ID.toString().trim() == item.DONVI_ID.toString().trim() && r.KIEUDV_ID.toString().trim() == item.KIEUDV_ID.toString().trim()
          );
          if (index == -1) {
            result.push(item);
          }
        }
      });
      return result;
    },
    async insert_kiemtra(data) {
      let apiParams = {
        nguoidung_id: this.$root.token.getNguoiDungID(),
        nhanvien_id: this.$root.token.getNhanVienID(),
        data: data,
      };
      try {
        this.dataSources = [];
        this.dataSourcesError = [];
        this.loading(true);
        let response = await API.layDSDocFile(this.axios, apiParams);
        if (
          response &&
          response.data &&
          response.data.error_code &&
          response.data.error_code == "BSS-00000000" &&
          response.data.data
        ) {
          if (response.data.data.loi.length > 0) {
            this.columnsError = this.columnsError2;
            response.data.data.loi.forEach((item, index) => {
              this.dataSourcesError.push({
                STT: index + 1,
                ma_tb: item.ma_tb,
                donvi_id: item.donvi_id,
                lydo_loi: item.lydo_loi,
              });
            });
            this.$refs.danhsachloi.showModal();
          } else {
            this.dataSources = data;
          }
        }
      } catch (e) {
        this.$alert("Đã có lỗi xảy ra" + e.toString(), "Lỗi", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
      } finally {
        this.loading(false);
      }
    },
    async capnhat_tram_hc_thuebao(nguoidungid, nhanvienid) {
      try {
        this.loading(true);
        let apiParams = {
          nguoidung_id: nguoidungid,
          nhanvien_id: nhanvienid,
        };
        let response = await API.btnCapNhat(this.axios, apiParams);
        if (
          response &&
          response.data &&
          response.data.error_code &&
          response.data.error_code == "BSS-00000000" &&
          response.data.data
        ) {
          if (response.data.data == "0") {
            this.$alert("Gán trạm cho thuê bao thành công!", "Thông báo", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "OK",
              type: "success",
            });
            this.file_full_path =null;
            this.dataSources =[];
          } else {
            this.$alert(response.data.data, "Lỗi", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "OK",
              type: "error",
            });
          }
        } else {
          this.$alert(response.data.data, "Lỗi", {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "OK",
            type: "error",
          });
        }
      } catch (e) {
        this.$alert("Đã có lỗi xảy ra không thể ghi dữ liệu", "Lỗi", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
      } finally {
        this.loading(false);
      }
    },
    onExcelExport: function () {
      if (this.dataSources.length <= 0)
        this.$toast.error('Chưa có dữ liệu trên lưới để xuất excel!');
      else {
         let excelExportProperties = {
           fileName:"DanhSachCanCapNhat.xlsx",
           dataSource: this.dataSources
         };
         this.$refs.grid.excelExport(excelExportProperties);   
      }    
    },
    async capNhat() {
      if (this.dataSources.length == 0) {
        this.$alert("Chưa có thông tin dữ liệu từ file để ghi", "Thông báo", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "OK",
          type: "error",
        });
        return;
      }
      this.capnhat_tram_hc_thuebao(
        this.$root.token.getNguoiDungID(),
        this.$root.token.getNhanVienID()
      );
    },
    async xuatFile() {
       this.onExcelExport();
    },
  },
};
</script>
