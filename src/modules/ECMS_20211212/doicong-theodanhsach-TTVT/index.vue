<template src="./index.template.html"></template>
<script>
import XLSX from "xlsx";
export default {
  data: function () {
    return {
      DONGBO_TEST: false,
      div_search: false,
      activetab: 1,
      ttcc_id: "",
      hscc_id: "",
      dslamSelected: {},
      enableButtonTab1: true,
      enableSelectFollowPortTD: false,
      sPort_TD: false,
      reloadAfterDelete: 0,
      reloadAfterUpdate: 0,
      isNew: false,
      checkMaTB: false,
      visibleGridTab3: false,
      SetOutput: "",
      ok: true,
      isError: false,
      resultKichHoat: "",
      selectedDSTab3: [],
      selectedPortFix: [],
      selectedDSTab2: [],
      buttonState: {
        isDisableBtnXoa: true,
      },
      arraySelectedItem: {
        soChonAcc: 0,
        soPort: 0,
        soVciVpi: 0,
      },
      arrayImportFile: {
        filexcel: null,
        ok: false,
        dsImportExcel: [],
        dataExcel: [],
        ds_file: [],
      },
      arrayDataXoa: {
        modalXoa: false,
        soTBDK: "",
      },
      arrayDataExcelExport: {
        dataExport: [],
        dataVisa: [],
        dataVisaCu: [],
      },
      arrayDataToCbo: {
        dsTTCC: [],
        dsTTCCIn: [],
        dsHoSoCC: [],
        dsKieuCC: [],
        dsHoSoCCTab2: [],
        dsHSCCTab2Inp: [],
        dsHoSoCCTab3: [],
        dsTramTBTab3: [],
        dsDslamTab3: [],
        dsKieuQuyhoachTab3: [],
        dsLoaiQuyhoachTab3: [],
        dsTTVciVpiTab3: [],
      },
      arrayCBO: {
        cboTTHS: 1,
        cboKieuCC: -1,
        cboTrangThai: -1,
        cboHoSo: -1,
        cboHoSoTab2: -1,
        cboHoSoTab3: 1,
        cboTramTBTab3: 1,
        cboDslamTab3: -1,
        cboKieuQuyhoachTab3: 0,
        cboLoaiQuyhoachTab3: 0,
        cboTrangthaiVCIVPITab3: null,
        cboDslamIDDsPort: -1,
        cboDslamPort: [],
      },
      arrayDate: {
        toDate: new Date(),
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        startDate: new Date(),
        endDate: new Date(),
      },
      arrayInputTab1: {
        soMayAcc: "",
        tenHoSo: "",
        chkChuyen119: false,
        chkCungDoiCap: false,
        ghiChu: "",
      },
      arrayInputTab3: {
        ckbAuto_BNM: false,
        ckbAuto_KH: false,
      },
      arrayDataGrids: {
        dsHoSoTab1: [],
        dsHoSoTab2: [],
        dsHoSoTab3: [],
        dsLuoiPortTab3: [],
        dsVCIVPITab3: [],
        dsPortFixTab3: [],
      },
      dataExcelEx: [],
      errExcel: {
        dataEx: [],
        dataIn: [],
      },
    };
  },
  created: function () {
    this.layDSTrangThaiCC();
    this.layDSKieuCC();
    this.layDSHoSoCC();
    this.NAP_DS_HOSO();
    this.hienThiDanhSachCatChuyen(1, 0);
  },
  methods: {
    tonggle_div: function () {
      this.div_search = !this.div_search;
    },
    layDSTrangThaiCC: async function () {
      let rs = await this.$root.context.get(
        "/web-ecms/doicong-danhsach/lay_ds_trangthai_cc"
      );
      this.arrayDataToCbo.dsTTCC = rs.data;
      this.arrayDataToCbo.dsTTCCIn = rs.data;
    },
    onclickTab: function (currentActivetab) {
      try {
        this.loading(true)
        this.activetab = currentActivetab;
        this.hienThiDanhSachCatChuyen(currentActivetab, 0);
      } catch (error) {
        this.$root.toastError(' '+error);
      }
      finally {
        this.loading(false)
      }

    },
    layDSKieuCC: async function () {
      let rs = await this.$root.context.get(
        "/web-ecms/doicong-danhsach/nap_cbo_kieu_cc"
      );
      this.arrayDataToCbo.dsKieuCC = rs.data;
    },
    layDSHoSoCC: async function () {
      let rs = await this.$root.context.get(
        "/web-ecms/doicong-danhsach/nap_cbo_hoso_cc"
      );
      this.arrayDataToCbo.dsHoSoCC = rs.data;
    },
    nhapMoiAction: async function () {
      this.enableButtonTab1 = false;
      this.isNew = true;
      this.clear();
    },
    clear: function () {
      this.arrayInputTab1.tenHoSo = "";
      this.arrayCBO.cboHoSo = -1;
      this.arrayCBO.cboKieuCC = -1;
      this.arrayCBO.cboTrangThai = -1;
      this.arrayInputTab1.chkChuyen119 = false;
      this.arrayInputTab1.ghiChu = "";
      this.arrayDate.startDate = new Date();
      this.arrayDate.endDate = new Date();
    },
    huybo: function () {
      this.clear();
    },
    xoaPhieu: async function () {
      if (!this.buttonState.isDisableBtnXoa) {
        this.arrayDataXoa.modalXoa = !this.arrayDataXoa.modalXoa;
      }
    },
    xacNhanXoa: async function () {
      try {
        this.arrayDataXoa.modalXoa = !this.arrayDataXoa.modalXoa;
        this.loading(true);
        let sl_tb = this.arrayDataXoa.soTBDK;
        if (sl_tb.toLowerCase() !== "0 thuê bao") {
          this.$toast.error("Hồ sơ đang có thuê bao đăng ký, không thể xóa!");
          return;
        } else {
          let ck = await this.$root.context.get(
            "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
            { hscc_id: this.ttcc_id }
          );
          if (ck == null || ck.data.length == 0) {
            this.$root.$toast.error(
              "Không lấy được trạng thái thông tin hồ sơ"
            );
            return;
          }
          if (ck.data.TTCC_ID == 6) {
            this.$root.$toast.error(
              "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
            );
            return;
          }
        }
        let kq = await this.$root.context.post(
          `/web-ecms/doicong-danhsach/xoa-phieu-tab1?hsccId= ${this.hscc_id}`
        );
        if (kq.data.result) {
          this.$toast.success("Xóa thông thành công");
          this.reloadAfterDelete = 1;
          this.NAP_DS_HOSO();
        } else {
          this.$toast.error("Xóa thất bại!");
        }
      } catch (error) {
        this.$toast.error("Xóa thất bại!");
      } finally {
        this.loading(false);
      }
    },
    capNhatAction: async function () {
      try {
        this.loading(true);
        if (this.kiemTra()) {
          let result = null;
          if (this.isNew) {
            let dataInsert = {
              tenHoso: this.arrayInputTab1.tenHoSo,
              loaihsId: this.arrayCBO.cboHoSo,
              kieuhsId: this.arrayCBO.cboKieuCC,
              ttccId: this.arrayCBO.cboTrangThai,
              ngayBd: this.convertDate2String(this.arrayDate.startDate),
              ngayKt: this.convertDate2String(this.arrayDate.endDate),
              ttvtId: -1,
              chanBaohong: this.arrayInputTab1.chkChuyen119 ? 1 : 0,
              ghiChu: this.arrayInputTab1.ghiChu,
            };
            result = await this.themMoi(dataInsert);
          } else {
            let ck = await this.$root.context.get(
              "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
              { hscc_id: this.ttcc_id }
            );
            if (ck == null || ck.data.length == 0) {
              this.$root.$toast.error(
                "Không lấy được trạng thái thông tin hồ sơ"
              );
              return;
            }
            if (ck.data.TTCC_ID == 6) {
              this.$root.$toast.error(
                "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
              );
              return;
            }
            let dataUpdate = {
              tenHoso: this.arrayInputTab1.tenHoSo,
              hsccId: this.hscc_id,
              thietbiId: null,
              ngayBd: this.convertDate2String(this.arrayDate.startDate),
              ngayKt: this.convertDate2String(this.arrayDate.endDate),
              ghiChu: this.arrayInputTab1.ghiChu,
            };
            result = await this.capNhat(dataUpdate);
            this.reloadAfterUpdate = 1;
          }
          this.$toast.success(result);
          this.NAP_DS_HOSO();
        }
      } catch (err) {
        this.$root.toastError(err.response.data.message_detail);
        return;
      } finally {
        this.loading(false);
      }
    },
    async themMoi(data) {
      try {
        let response = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/them-hoso-catchuyen",
          data
        );
        if (response.error_code === "BSS-00000000") {
          return "Nhập mới thành công";
        }

        let message = response.message;

        if (response.message_detail) {
          message += "\n" + response.message_detail;
        }

        if (response.data) {
          let detailMessage = Object.getOwnPropertyNames(response.data).map(
            (item) => response.data[item]
          );
          message = message + "\n" + [...new Set(detailMessage)].join("\n");
        }

        throw message;
      } catch (err) {
        let responseData = err.response.data;
        let message = responseData.message;

        if (responseData.message_detail) {
          message += "\n" + responseData.message_detail;
        }

        if (responseData.data) {
          let detailMessage = Object.getOwnPropertyNames(responseData.data).map(
            (item) => responseData.data[item]
          );
          message = message + "\n" + [...new Set(detailMessage)].join("\n");
        }

        throw message;
      }
    },
    async capNhat(data) {
      try {
        let response = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/capnhat-hoso-catchuyen",
          data
        );
        if (response.error_code === "BSS-00000000") {
          return "Cập nhật thành công";
        }

        let message = response.message;

        if (response.message_detail) {
          message += "\n" + response.message_detail;
        }

        if (response.data) {
          let detailMessage = Object.getOwnPropertyNames(response.data).map(
            (item) => response.data[item]
          );
          message = message + "\n" + [...new Set(detailMessage)].join("\n");
        }

        throw message;
      } catch (err) {
        let responseData = err.response.data;
        let message = responseData.message;

        if (responseData.message_detail) {
          message += "\n" + responseData.message_detail;
        }

        if (responseData.data) {
          let detailMessage = Object.getOwnPropertyNames(responseData.data).map(
            (item) => responseData.data[item]
          );
          message = message + "\n" + [...new Set(detailMessage)].join("\n");
        }

        throw message;
      }
    },
    kiemTra: function () {
      if (this.arrayInputTab1.tenHoSo === "") {
        this.$root.$toast.error("Chưa nhập tên hồ sơ");
        return false;
      }

      if (this.arrayInputTab1.tenHoSo.length > 200) {
        this.$root.$toast.error("Tên hồ sơ không đươc vượt quá 200 ký tự");
        return false;
      }
      if (this.isNew) {
        if (this.arrayCBO.cboHoSo === -1) {
          this.$root.$toast.error("Chưa chọn loại hồ sơ");
          return false;
        }

        if (this.arrayCBO.cboKieuCC === -1) {
          this.$root.$toast.error("Chưa chọn hình thức đấu chuyển");
          return false;
        }
        if (this.arrayCBO.cboTrangThai == -1) {
          this.$root.$toast.error("Chưa chọn trạng thái cắt chuyển");
          return false;
        }
      }

      if (this.arrayDate.startDate === null) {
        this.$root.$toast.error("Chưa chọn ngày bắt đầu hoặc không đúng định dạng dd/mm/yyyy");
        return false;
      }

      if (this.arrayDate.endDate === null) {
        this.$root.$toast.error("Chưa chọn ngày kết thúc hoặc không đúng định dạng dd/mm/yyyy");
        return false;
      }

      if(!this.checkDateInput(this.arrayDate.startDate)){
        this.$root.$toast.error("Từ ngày không đúng định dạng dd/mm/yyyy.")
        return false;
      }

      if(!this.checkDateInput(this.arrayDate.endDate)){
        this.$root.$toast.error("Ngày đến không đúng định dạng dd/mm/yyyy.")
        return false;
      }
      if (this.arrayDate.startDate > this.arrayDate.endDate) {
        this.$root.$toast.error("Ngày bắt đầu không được sau ngày kết thúc");
        return false;
      }

      return true;
    },
    layThongTin: async function () {
      let tabactive = this.activetab;
      this.hienThiDanhSachCatChuyen(tabactive, 1);
    },
    convertDate2String(date) {
      let dd = String(date.getDate()).padStart(2, "0");
      let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = date.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    },
    checkDateInput: function (date){
      let dd = String(date.getDate()).padStart(2, "0");
      let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = date.getFullYear();
      let newDate =  dd + "/" + mm + "/" + yyyy;
      let val = newDate ? true : false;
      console.log('valllllllllll ',val)
      return val
    },
    minusOneMonth: function (d) {
      const month = d.getMonth();
      d.setMonth(d.getMonth() - 1);
      while (month === d.getMonth()) {
        d.setDate(d.getDate() - 1);
      }
      return d;
    },
    xuatVisa: async function () {
      try {
        this.$root.showLoading(true);
        let dtDanhSachCapCong = this.selectedDSTab3;
        if (dtDanhSachCapCong.length <= 0){
          this.$root.$toast.error("Chưa chọn danh sách để tải.");
          return;
        }
        let lstDanhSachThueBaoCatChuyen = dtDanhSachCapCong.filter(function (el) {
          return el.CHON == "s1" &&
            el.PORTVL_ID != null &&
            (el.LOAITB_ID == 58 || el.LOAITB_ID == 11)
        });
        if (lstDanhSachThueBaoCatChuyen.length == 0) {
          this.$root.$toast.error("Không có dữ liệu để xuất");
          return;
        }
        let data = lstDanhSachThueBaoCatChuyen.map((item) => ({ DKCC_ID: item.DKCC_ID }));
        let temp = [];
        let dkcc_id = 0;
        for (let i = 0; i < data.length; i++) {
          dkcc_id = data[i].DKCC_ID;
          let ck = await this.$root.context.post(`/web-ecms/doicong-danhsach/tao-dulieu-visa?dkcc_id=${dkcc_id}`);
          if (ck.data.length > 0) {
            let temp2 = ck.data;
            for (let j = 0; j < temp2.length; j++) {
              let data = {
                ACCOUNT: temp2[j].ACCOUNT,
                IP_BRAS: temp2[j].IP_BRAS,
                MA_DSLAM: temp2[j].MA_DSLAM,
                THAMSO_DSLAM: temp2[j].THAMSO_DSLAM,
              };
              temp.push(data);
            }
          }
        }
        //Xuất datatable này ra file excel


        if (temp.length > 0) {
          var ma_thuebao = XLSX.utils.json_to_sheet(Object.values(temp));
          var wb = XLSX.utils.book_new(); // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, ma_thuebao, "VISA"); // sheetAName is name of Worksheet
          // export Excel file
          XLSX.writeFile(wb, "export.xlsx");
        } else {
          let data = {ACCOUNT: '',
            IP_BRAS:'',
            MA_DSLAM: '',
            THAMSO_DSLAM: ''}
          let arr = []
          arr.push(data)
          this.dataExcelEx = Object.values(arr);
          var ma_thuebao = XLSX.utils.json_to_sheet(Object.values(this.dataExcelEx));
          var wb = XLSX.utils.book_new(); // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
          // export Excel file
          XLSX.writeFile(wb, "export.xlsx");
        }

      } catch (ex) {
        this.$root.$toast.error(
          "Có lỗi trong quá trình tạo file Visa. Lỗi: " + ex
        );
      } finally {
        this.$root.showLoading(false);
      }
    },
    xuatVisaCu: async function () {
      try {
        this.$root.showLoading(true);
        let dtDanhSachCapCong = this.selectedDSTab3;
        if (dtDanhSachCapCong.length <= 0){
          this.$root.$toast.error("Chưa chọn danh sách để tải.");
          return;
        }
        let lstDanhSachThueBaoCatChuyen = dtDanhSachCapCong.filter(function (el) {
          return el.CHON == "s1" &&
            el.PORTVL_ID_CU != null &&
            (el.LOAITB_ID == 58 || el.LOAITB_ID == 11)
        });
        if (lstDanhSachThueBaoCatChuyen.length == 0) {
          this.$root.$toast.error("Không có dữ liệu để xuất");
          return;
        }
        let data = lstDanhSachThueBaoCatChuyen.map((item) => ({ DKCC_ID: item.DKCC_ID }));
        let json_list = data
        let ck = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/tao-dulieu-visa-cu",
          json_list
        );
        if (ck.data.length > 0) {
          var ma_thuebao = XLSX.utils.json_to_sheet(Object.values(dem.data));
          var wb = XLSX.utils.book_new(); // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, ma_thuebao, "VISA"); // sheetAName is name of Worksheet
          // export Excel file
          XLSX.writeFile(wb, "ma_thue_bao.xlsx");
        } else {
          let data = {ACCOUNT: '',
            IP_BRAS:'',
            MA_DSLAM: '',
            THAMSO_DSLAM: ''}
          let arr = []
          arr.push(data)
          this.dataExcelEx = Object.values(arr);
          var ma_thuebao = XLSX.utils.json_to_sheet(Object.values(this.dataExcelEx));
          var wb = XLSX.utils.book_new(); // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, ma_thuebao, "VISA"); // sheetAName is name of Worksheet
          // export Excel file
          XLSX.writeFile(wb, "export.xlsx");
        }
      } catch (ex) {
        this.$root.$toast.error("Có lỗi trong quá trình tạo file Visa ! " + ex);
      } finally {
        this.$root.showLoading(false);
      }
    },
    xuatExcel: function () {
      try {
        if (this.activetab == 2) {
          if (this.arrayDataGrids.dsHoSoTab2.length == 0) {
            this.$toast.error("Không có dữ liệu để xuất Excel !");
            return;
          }
          this.dataExcelEx = Object.values(this.arrayDataGrids.dsHoSoTab2);
        } else if (this.activetab == 3) {
          if (this.arrayDataGrids.dsHoSoTab3 == 0) {
            this.$toast.error("Không có dữ liệu để xuất Excel !");
            return;
          }
          this.dataExcelEx = Object.values(this.arrayDataGrids.dsHoSoTab3);

        }
        console.log(this.dataExcelEx)
        //document.getElementById("exportexcel").click();
        var ma_thuebao = XLSX.utils.json_to_sheet(Object.values(this.dataExcelEx));
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
        // export Excel file
        XLSX.writeFile(wb, "export.xlsx");
      } catch (ex) {
        this.$toast.error("Có lỗi trong quá trình xuất file Excel !" + ex);
      }
    },
    kichHoat: async function () {
      try {
        let hscc_id = this.arrayCBO.cboHoSoTab3;
        var check = await this.KICHHOAT();
        if (check !== "1") {
          let loi = this.resultKichHoat;
          if (loi != "") {
            this.NAP_DS_THUEBAO_CAPCONG(hscc_id);
          }
        } else {
          this.NAP_DS_THUEBAO_CAPCONG(hscc_id);
        }
      } catch (ex) {
        this.$root.$toast.error("Lỗi: " + ex);
      }
    },
    KICHHOAT: async function () {
      try {
        this.$root.showLoading(true);
        var check = await this.KIEMTRA_GANCONG(0);
        if (!check) {
          return "-404";
        } else {
          this.$bvModal
            .msgBoxConfirm(
              "Bạn có chắc chắn thực hiện đổi cổng danh sách các Account lên trên Visa hay không?",
              {
                title: "Xác nhận hành động",
                centered: true,
                size: "sm",
              }
            )
            .then((value) => {
              if (value) {
                if (this.fKICHHOAT() === "1") {
                  return "1";
                } else {
                  return "-404";
                }
              } else {
                return "-404";
              }
            });
        }
      } catch (ex) {
        this.resultKichHoat = "Có lỗi khi kích hoạt " + ex;
        return "-404";
      } finally {
        this.$root.showLoading(false);
      }
    },
    fKICHHOAT: async function () {
      try {
        let hscc_id = this.arrayCBO.cboHoSoTab3;
        let ds = [...this.selectedDSTab3];
        let cop = ds.filter(
          (item) => item.CHON === "s1" && item.DKCC_CHA_ID === null
        );
        let json_list = cop.map((item) => ({ DKCC_ID: item.DKCC_ID }));
        let dem = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/kiemtra-list-inp-gocong-tab3",
          json_list
        );
        if (dem.data[0].COUNT !== 0) {
          this.resultKichHoat =
            "Trong danh sách có thuê bao có trạng thái hoàn thành hoặc chưa cấp cổng. Bạn hãy kiểm tra lại";
          this.$root.$toast.error(this.resultKichHoat);

          return "-404";
        }

        let loi_kh = [];
        let header = {
          MA_TB: "MA_TB",
          THONGTIN_LOI: "THONGTIN_LOI",
        };
        loi_kh.push(header);
        var ds_con = [...this.arrayDataGrids.dsHoSoTab3];
        let ds_con_dc = [];
        //VASCService vasc = new VASCService(tt_nd.user_vasc, tt_nd.pass_vasc, tt_nd.diemgiaodich_vasc);
        let count = ds_con.filter(function (item) {
          return item.DKCC_CHA_ID != null;
        });
        if (count.length > 0) {
          ds_con_dc = ds_con;
        }
        for (let i = 0; i < ds.length; i++) {
          let dr = ds[i];
          if (ds_con_dc != null && ds_con_dc.length > 0) {
            var l = ds_con_dc.filter(function (item) {
              return item.DKCC_CHA_ID == ds[i].DKCC_ID;
            });
            console.log("l:",l)
            if (l.length > 0) {
              for (let row in l) {
                //#region Kích hoạt con
                if (row.PORT_ID == null || row.NGAY_KH != null) {
                  continue;
                }
                if (
                  row.LOAITB_ID == 11 ||
                  row.LOAITB_ID == 58 ||
                  row.LOAITB_ID == 79
                ) {
                  //#region Thực hiện đổi cổng
                  let kieu_mega = row.KIEU_MEGA;
                  if (this.DONGBO_TEST == false && kieu_mega != 0) {
                    console.log('1111',row)
                    let res = this.DoiCongAcccountVisa(row);
                    if (res != "") {
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                      };
                      loi_kh.push(errr);
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID,
                        vci_vpi_id: row.VCI_VPI_ID,
                        dslam_vdc_id: row.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Lỗi kích hoạt visa " + res,
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    } else {
                      //#region cập nhật status và lưu log
                      try {
                        await this.$root.context.post(
                          `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                        );
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt thành công",
                          status: 1,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } catch (ex) {
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                        };
                        loi_kh.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                          status: 1,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      }
                      //#endregion
                    }
                  }
                  //#endregion
                } else if (row.LOAITB_ID == 61) {
                  //LoaiHinhTB.INTERNET_MYTV
                  //#region Vasc
                  if (row.IP == "") {
                    let errr = {
                      MA_TB: row.MA_TB,
                      THONGTIN_LOI:
                        "Chưa có thông tin về IP. Hãy kiểm tra lại !",
                    };
                    loi_kh.push(errr);
                    continue;
                  }
                  if (this.DONGBO_TEST == false) {
                    let sPortDSL = "";
                    let shelf = "0";
                    if (row.SHELF !== null && row.SHELF.trim() !== "")
                      shelf = row.SHELF.trim();
                    let vloaitbi_id = row.LOAITBI_ID;
                    if (vloaitbi_id == 3) {
                      sPortDSL =
                        row.IP +
                        "/" +
                        row.RACK +
                        "/" +
                        row.SLOT +
                        "/" +
                        row.PORT +
                        "/" +
                        row.VPI;
                    } else
                      sPortDSL =
                        row.IP + "/" + shelf + "/" + row.SLOT + "/" + row.PORT;

                    let sDeviceName = row.SYSTEM;

                    // hoangpkn : 30/07/2015 : Không cần truyền sPortDSL vẫn chạy (HCM vẫn truyền null). Do có truyền mà IP dslam sai. Vasc sẽ báo lỗi
                    //int result = vasc.UpdateDeviceInfo(txtMaTB.Text.Trim(), sDeviceName, "");
                    let loi_ = "";
                    //int result = vasc.UpdateDeviceInfo(row["MA_TB"].ToString(), sDeviceName, sPortDSL, out loi_); //nhapt mở 29/09/2016
                    let result = await this.UpdateDeviceInfo(
                      row.MA_TB,
                      sDeviceName,
                      sPortDSL
                    ); //nhapt mở 29/09/2016
                    if (result.res != 0) {
                      //lỗi
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI:
                          "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                          row.MA_TB +
                          " trên VASC !",
                      };
                      loi_kh.push(errr);
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID,
                        vci_vpi_id: row.VCI_VPI_ID,
                        dslam_vdc_id: row.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Lỗi kích hoạt  " + result.err + "",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    } else {
                      //#region cập nhật status và lưu log
                      try {
                        await this.$root.context.post(
                          `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                        );
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt thành công",
                          status: 1,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } catch (ex) {
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                        };
                        loi_kh.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                          status: 0,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      }
                      //#endregion
                    }
                  }
                  //#endregion
                } else {
                  //#region cập nhật status và lưu log
                  try {
                    await this.$root.context.post(
                      `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                    );
                    let log = {
                      ma_tb: row.MA_TB,
                      dkcc_id: row.DKCC_ID,
                      port_id: row.PORT_ID,
                      vci_vpi_id: row.VCI_VPI_ID,
                      dslam_vdc_id: row.DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Kích hoạt thành công",
                      status: 1,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  } catch (ex) {
                    let errr = {
                      MA_TB: row.MA_TB,
                      THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                    };
                    loi_kh.push(errr);
                    let log = {
                      ma_tb: row.MA_TB,
                      dkcc_id: row.DKCC_ID,
                      port_id: row.PORT_ID,
                      vci_vpi_id: row.VCI_VPI_ID,
                      dslam_vdc_id: row.DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  }
                  //#endregion
                }
                //#endregion
              }
            }
          }
          if (dr.PORT_ID == null || dr.NGAY_KH != null) {
            continue;
          }
          if (dr.LOAITB_ID == 11 || dr.LOAITB_ID == 58 || dr.LOAITB_ID == 79) {
            // dr.THAMSO_CU = 4
            //#region Thực hiện đổi cổng
            let kieu_mega = dr.KIEU_MEGA;
            if (this.DONGBO_TEST === false && kieu_mega !== 0) {
              let res = this.DoiCongAcccountVisa(dr);
              console.log(res)
              if (res !== "") {
                let errr = {
                  MA_TB: dr.MA_TB,
                  THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                };
                loi_kh.push(errr);
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  dslam_vdc_id: dr.DSLAM_VDC_ID,
                  flag: 2,
                  nd: "Lỗi kích hoạt visa " + res,
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              } else {
                //#region cập nhật status và lưu log
                try {
                  await this.$root.context.post(
                    `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${dr.DKCC_ID}`
                  );
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt thành công",
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                } catch (ex) {
                  let errr = {
                    MA_TB: dr.MA_TB,
                    THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                  };
                  loi_kh.push(errr);
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                }
                //#endregion
              }
            }
            //#endregion
          } else if (dr.LOAITB_ID == 61) {
            //LoaiHinhTB.INTERNET_MYTV
            //#region Vasc
            if (dr.IP == "") {
              let errr = {
                MA_TB: dr.MA_TB,
                THONGTIN_LOI: "Chưa có thông tin về IP. Hãy kiểm tra lại !",
              };
              loi_kh.push(errr);
              continue;
            }
            if (this.DONGBO_TEST == false) {
              let sPortDSL = "";
              let shelf = "0";
              if (dr.SHELF !== null && dr.SHELF.trim() !== "")
                shelf = dr.SHELF.trim();
              let vloaitbi_id = dr.LOAITBI_ID;
              if (vloaitbi_id == 3) {
                sPortDSL =
                  dr.IP +
                  "/" +
                  dr.RACK +
                  "/" +
                  dr.SLOT +
                  "/" +
                  dr.PORT +
                  "/" +
                  dr.VPI;
              } else
                sPortDSL = dr.IP + "/" + shelf + "/" + dr.SLOT + "/" + dr.PORT;

              let sDeviceName = dr.SYSTEM;

              let result = await this.UpdateDeviceInfo(
                dr.MA_TB,
                sDeviceName,
                sPortDSL
              ); //nhapt mở 29/09/2016

              if (result.res != 0) {
                //lỗi
                let errr = {
                  MA_TB: dr.MA_TB,
                  THONGTIN_LOI:
                    "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                    dr.MA_TB +
                    " trên VASC !",
                };
                loi_kh.push(errr);
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  dslam_vdc_id: dr.DSLAM_VDC_ID,
                  flag: 2,
                  nd: "Lỗi kích hoạt  " + result.err,
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              } else {
                //#region cập nhật status và lưu log
                try {
                  await this.$root.context.post(
                    `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${dr.DKCC_ID}`)
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt thành công",
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                } catch (ex) {
                  let errr = {
                    MA_TB: dr.MA_TB,
                    THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                  };
                  loi_kh.push(errr);
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                }
                //#endregion
              }
            }
            //#endregion
          } else {
            //#region cập nhật status và lưu log
            try {
              await this.$root.context.post(
                `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${dr.DKCC_ID}`
              );
              let log = {
                ma_tb: dr.MA_TB,
                dkcc_id: dr.DKCC_ID,
                port_id: dr.PORT_ID,
                vci_vpi_id: dr.VCI_VPI_ID,
                dslam_vdc_id: dr.DSLAM_VDC_ID,
                flag: 2,
                nd: "Kích hoạt ảo thành công",
                status: 1,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
            } catch (ex) {
              let errr = {
                MA_TB: dr.MA_TB,
                THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
              };
              loi_kh.push(errr);
              let log = {
                ma_tb: dr.MA_TB,
                dkcc_id: dr.DKCC_ID,
                port_id: dr.PORT_ID,
                vci_vpi_id: dr.VCI_VPI_ID,
                dslam_vdc_id: dr.DSLAM_VDC_ID,
                flag: 2,
                nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                status: 0,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
            }
            //#endregion
          }
        }
        this.errExcel.dataEx = loi_kh;
        let dataExcel = this.errExcel.dataEx;

        if (dataExcel != null && dataExcel.length > 1) {
          this.$bvModal
            .msgBoxConfirm(
              "Đã thực hiện kích hoạt. Bạn có muốn xuất file danh sách bị lỗi không?",
              {
                title: "Xác nhận hành động",
                centered: true,
                size: "sm",
              }
            )
            .then(async (value) => {
              if (value) {
                document.getElementById("exporterror").click();
              } else {
                return "404";
              }
            });
        } else {
          this.$toast.success("Đã thực hiện kích hoạt");
        }
        await this.NAP_DS_THUEBAO_CAPCONG(hscc_id);
        return "1";
      } catch (error) {
        this.SetOutput = "Có lỗi khi cấu hình " + error;
        console.log(this.SetOutput);
      } finally {
      }
    },
    guiCauHinh: async function () {
      await this.CAUHINH_BNM();
    },
    CAUHINH_BNM: async function () {
      try {
        // loi_bnm = new DataTable();
        // loi_bnm.Columns.Add("MA_TB");
        // loi_bnm.Columns.Add("THONGTIN_LOI");
        let check = await this.KIEMTRA_GANCONG(0);
        if (!check) {
          return;
        }
        let ds = this.selectedDSTab3;
        let cop = ds.filter(function (item) {
          return item.CHON === "s1" && item.DKCC_CHA_ID === null;
        });
        let json_list = cop.map((item) => ({ DKCC_ID: item.DKCC_ID }));
        let dem = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/kiemtra-list-inp-gocong-tab3",
          json_list
        );
        if (dem.data[0].COUNT !== 0) {
          this.$root.$toast.error(
            "Trong danh sách có thuê bao có trạng thái hoàn thành hoặc chưa cấp cổng không thể gửi cấu hình"
          );
          return;
        }let dsSend = ds.filter(function (item) {
          return item.CHON === "s1" && item.DKCC_CHA_ID === null;
        });
        this.$bvModal
          .msgBoxConfirm(
            "Bạn có chắc chắn thực hiện gửi tự động cấu hình không?",
            {
              title: "Xác nhận hành động",
              centered: true,
              size: "sm",
            }
          )
          .then((value) => {
            if (value) {
              this.fCAUHINH_BNM(dsSend);
            } else {
              return;
            }
          });
      } catch (ex) {
        this.$root.$toast.error("Có lỗi khi cấu hình BNM " + ex);
      } finally {
      }
    },
    fCAUHINH_BNM: async function (ds) {
      try {
        let loi_bnm = [];
        let header = {
          MA_TB: "MA_TB",
          THONGTIN_LOI: "THONGTIN_LOI",
        };
        loi_bnm.push(header);
        let dem = 0;
        let SetOutput = "";
        //mã tb sẽ set lại
        let getvisapass = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/func-get-pass-visa?maTB=1"
        );
        let pass_ftth = getvisapass.data;

        var ds_con = [...this.arrayDataGrids.dsHoSoTab3];

        let ds_con_dc = [];
        let count = ds_con.filter(function (item) {
          return item.DKCC_CHA_ID != null;
        });
        if (count.length > 0) {
          ds_con_dc = ds_con.filter(function (item) {
            return item.DKCC_CHA_ID != null;
          });
        }
        let tong = ds.length;


        for (let i = 0; i < tong; i++) {

          let dr = ds[i];
          if (dr.PORT_ID === null || dr.NGAY_CH !== null) {
            continue;
          }
          try {
            let dstb = ds[i].THUEBAO_ID + ";";
            let vchuyenall = 0;
            console.log("4");
            if (ds_con_dc != null && ds_con_dc.length > 0) {
              console.log("3");
              var l = ds_con_dc.filter(function (item) {
                return item.DKCC_CHA_ID == ds[i].DKCC_ID;
              });
              if (l.length > 0) {
                vchuyenall = 1;
                for (let row in l) {
                  dstb = dstb + row.THUEBAO_ID + ";";
                }
              }
            }
            dstb = dstb.slice(0, -1);
            console.log("dstb", dstb);
            let data = {
              thuebao_id: dr.THUEBAO_ID,
              port_id: dr.PORT_ID,
              vci_vpi_id: dr.VCI_VPI_ID,
              loai_td: 1,
              nguoi_kh: this.$auth.getUserName(),
              chuyen_all: vchuyenall,
              ds_tb: dstb,
              trangthai: 0,
              dkcc_id: dr.DKCC_ID,
              pass_ftth: pass_ftth,
            };

            console.log("data-cauhinh ",data);
            let kq = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/cauhinh-bnm",
              data
            );
            console.log("ketqua-cauhinh ",kq.data.RESULT);
            if (kq.data.RESULT == "ok") {
              console.log("ketqua-cauhinh2222 ",kq);
              try {
                await this.$root.context.post(
                  `/web-ecms/doicong-danhsach/capnhat10-catchuyen-hoanthien-tab3?dkcc_id=${dr.DKCC_ID}`
                );
                console.log("hoanthien-cauhinh ");
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  dslam_vdc_id: dr.DSLAM_VDC_ID,
                  flag: 3,
                  nd:
                    "Đã gửi cấu hình thành công " +
                    dstb +
                    ": Cấu hình " +
                    vchuyenall,
                  status: 1,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              } catch (exxx) {
                dem += 1;
                let errr = {
                  MA_TB: dr.MA_TB,
                  THONGTIN_LOI:
                    "Cấu hình thành công không lưu được trạng thái !" + exxx,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  dslam_vdc_id: dr.DSLAM_VDC_ID,
                  flag: 3,
                  nd:
                    "Cấu hình thành công " +
                    dstb +
                    " (" +
                    vchuyenall +
                    ") không lưu được trạng thái !" +
                    exxx +
                    "",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              }
            } else {
              dem += 1;
              let errr = {
                MA_TB: dr.MA_TB,
                THONGTIN_LOI:
                  "Có lỗi trong quá trình cấu hình !" + kq.data.RESULT,
              };
              loi_bnm.push(errr);
              let log = {
                ma_tb: dr.MA_TB,
                dkcc_id: dr.DKCC_ID,
                port_id: dr.PORT_ID,
                vci_vpi_id: dr.VCI_VPI_ID,
                dslam_vdc_id: dr.DSLAM_VDC_ID,
                flag: 3,
                nd:
                  "Có lỗi trong quá trình gửi cấu hình !" +
                  kq.data.RESULT +
                  "",
                status: 0,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
            }

            // 17-10-2019 AnhDt: Cập nhật thông tin view temp sau khi gửi kích hoạt
            //Bo
            let _kq = ""; //need check//_temp_content(Convert.ToInt64(dr["THUEBAO_ID"]), Convert.ToInt64(dr["PORT_ID"]), Convert.ToInt64(dr["VCI_VPI_ID"]));
            //End AnhDt
          } catch (exx) {
            dem += 1;
            let errr = {
              MA_TB: dr.MA_TB,
              THONGTIN_LOI: "Có lỗi trong quá trình cấu hình !" + exx,
            };
            loi_bnm.push(errr);
            let log = {
              ma_tb: dr.MA_TB,
              dkcc_id: dr.DKCC_ID,
              port_id: dr.PORT_ID,
              vci_vpi_id: dr.VCI_VPI_ID,
              dslam_vdc_id: dr.DSLAM_VDC_ID,
              flag: 3,
              nd: "Có lỗi trong quá trình cấu hình !" + exx + "",
              status: 0,
            };
            await this.$root.context.post(
              "/web-ecms/doicong-danhsach/them-log-catchuyen",
              log
            );
          }
        }

        if (dem > 0) {
          SetOutput = "0";
        } else {
          SetOutput = "1";
        }

        if (SetOutput === "1") {
          this.$toast.success("Đã thực hiện xong cấu hình");
          await this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
        } else {

          if (loi_bnm != null && loi_bnm.length > 0) {
            this.errExcel.dataEx = [];
            this.errExcel.dataEx = loi_bnm;
            this.$bvModal
              .msgBoxConfirm(
                "Đã thực hiện cấu hình. Bạn có muốn xuất file danh sách bị lỗi không?",
                {
                  title: "Xác nhận hành động",
                  centered: true,
                  size: "sm",
                }
              )
              .then(async (value) => {
                if (value) {
                  document.getElementById("exporterror").click();
                } else {
                  return;
                }
              });
          } else {
            this.$root.$toast.error("Có lỗi khi cấu hình BNM " + SetOutput);
          }
        }
      } catch (ex) {
        this.SetOutput = "Có lỗi khi cấu hình " + ex;
        console.log("xx", this.SetOutput);
      }
      //Lấy ra bất kỳ thuê bao nào
    },
    huyCongCu: async function () {
      await this.HUY_CAUHINH_BNM();
    },
    HUY_CAUHINH_BNM: async function () {
      try {
        let check = await this.KIEMTRA_GANCONG(0);
        if (!check) {
          return;
        }

        //#region Danh sách đổi cổng
        let ds = this.selectedDSTab3;
        let ds_check = ds.filter(function (item) {
          return (item.CHON = "s1" && item.DKCC_CHA_ID == null);
        });
        //#endregion

        this.$bvModal
          .msgBoxConfirm(
            "Bạn có chắc chắn thực hiện hủy cấu hình cổng cũ không?",
            {
              title: "Xác nhận hành động",
              centered: true,
              size: "sm",
            }
          )
          .then(value => {
            if (value) {
              this.fHUY_CAUHINH_BNM(ds, ds_check);
            } else {
              return;
            }
          });
      } catch (ex) {
        this.$root.$toast.success("Có lỗi khi hủy cấu hình BNM " + ex);
      } finally {
        this.$root.showLoading(false);
      }
    },
    fHUY_CAUHINH_BNM: async function (dsi, ds_check) {
      //#region Tự động giải phóng nếu có
      try {
        this.$root.showLoading(true);
        let loi_bnm = [];
        let header = {
          MA_TB: "MA_TB",
          THONGTIN_LOI: "THONGTIN_LOI",
        };
        loi_bnm.push(header);
        let ds = ds_check;
        let ds_con_dc = dsi;
        let getvisapass = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/func-get-pass-visa?maTB=1"
        );
        let pass_ftth = getvisapass.data;

        console.log('huykickhoat-ds_con_dc ',ds_con_dc)
        let count = ds_con_dc.filter(function (item) {
          return item.DKCC_CHA_ID != null;
        });
        if (count.length > 0) {
          ds_con_dc = count;
        }
        console.log('huykickhoat-count ',count)
        let tong = ds.length;
        console.log('huykickhoat-tong ',tong)
        for (let i = tong - 1; i >= 0; i--) {
          let dr = ds[i];
          if (
            dr.PORT_ID == null ||
            dr.NGAY_CH == null ||
            dr.PORT_ID_CU == 0 ||
            dr.VCI_VPI_ID_CU == 0 ||
            dr.NGAY_GP != null
          ) {
            console.log('huykickhoat-drdrdrdrdrdr ',dr)
            let errr = {
              MA_TB: dr.MA_TB,
              THONGTIN_LOI:
                "Chưa có ngày cấu hình cổng mới hoặc không có port cũ, hoặc đã có ngày hủy cấu hình rồi không thể thực hiện tiếp",
            };
            loi_bnm.push(errr);
          }
          try {
            let dstb = ds[i].THUEBAO_ID + ";";
            let vchuyenall = 0;
            if (ds_con_dc != null && ds_con_dc.length > 0) {
              var l = ds_con_dc.filter(function (item) {
                return item.DKCC_CHA_ID == ds[i].DKCC_ID;
              });
              if (l.length > 0) {
                vchuyenall = 1;
                for (let row in l) {
                  dstb = dstb + row.THUEBAO_ID + ";";
                }
              }
            }
            dstb = dstb.slice(0, -1);
            console.log('huykickhoat-dstbdstbdstb ',dstb)
            let data = {
              thuebao_id: dr.THUEBAO_ID,
              port_id: dr.PORT_ID_CU,
              vci_vpi_id: dr.VCI_VPI_ID_CU,
              loai_td: 2,
              nguoi_kh: this.$auth.getUserName(),
              chuyen_all: vchuyenall,
              ds_tb: dstb,
              trangthai: 0,
              pass_ftth: pass_ftth,
            };
            console.log('data-cauhinh ',data)
            let kq = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/cauhinh-bnm",
              data
            );
            console.log('ketqua-cauhinh ',kq)
            if (kq.data.RESULT == "ok") {
              try {
                console.log('ketqua-cauhinh222222 ',kq.data.RESULT)
                await this.$root.context.post(
                  `/web-ecms/doicong-danhsach/capnhat11-catchuyen-huycauhinh-tab3?dkcc_id=${dr.DKCC_ID}`);
                console.log('thanhcong-cauhinh222222 ')
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID_CU,
                  vci_vpi_id: dr.VCI_VPI_ID_CU,
                  dslam_vdc_id: 0,
                  flag: 3,
                  nd:
                    "Đã gửi giải phóng cổng thành công " +
                    dstb +
                    ": Cấu hình " +
                    vchuyenall,
                  status: 1,
                };
                console.log('thanhcong-log ',log)
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              } catch (exxx) {
                let errr = {
                  MA_TB: dr.MA_TB,
                  THONGTIN_LOI:
                    "Giải phóng cổng cũ thành công không lưu được trạng thái !" +
                    exxx,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID_CU,
                  vci_vpi_id: dr.VCI_VPI_ID_CU,
                  dslam_vdc_id: 0,
                  flag: 3,
                  nd:
                    "Giải phóng cổng thành công " +
                    dstb +
                    " (" +
                    vchuyenall +
                    ") không lưu được trạng thái !" +
                    exxx +
                    "",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              }
            } else {
              let errr = {
                MA_TB: dr.MA_TB,
                THONGTIN_LOI:
                  "Có lỗi trong quá trình giải phóng cổng: " +
                  kq.message_detail,
              };
              loi_bnm.push(errr);
              let log = {
                ma_tb: dr.MA_TB,
                dkcc_id: dr.DKCC_ID,
                port_id: dr.PORT_ID_CU,
                vci_vpi_id: dr.VCI_VPI_ID_CU,
                dslam_vdc_id: 0,
                flag: 3,
                nd:
                  "Có lỗi trong quá trình gửi  giải phỏng cổng !" +
                  kq.message_detail +
                  "",
                status: 0,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
            }
          } catch (exx) {
            let errr = {
              MA_TB: dr.MA_TB,
              THONGTIN_LOI: "Có lỗi trong quá trình  giải phóng cổng !" + exx,
            };
            loi_bnm.push(errr);
            let log = {
              ma_tb: dr.MA_TB,
              dkcc_id: dr.DKCC_ID,
              port_id: dr.PORT_ID_CU,
              vci_vpi_id: dr.VCI_VPI_ID_CU,
              dslam_vdc_id: 0,
              flag: 3,
              nd: "Có lỗi trong quá trình giải phóng cổng !" + exx + "",
              status: 0,
            };
            await this.$root.context.post(
              "/web-ecms/doicong-danhsach/them-log-catchuyen",
              log
            );
          }
        }
        console.log('loi_bnm-length ',loi_bnm)
        if (loi_bnm.length > 1) {
          this.SetOutput = "0";
        } else {
          this.SetOutput = "1";
        }
        console.log("this.SetOutput ", this.SetOutput);
        if (this.SetOutput == "1") {
          this.$toast.success("Đã thực hiện xong hủy cấu hình");
          this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSo);
        }
        else {
          if (loi_bnm != null && loi_bnm.length > 1)
          {
            this.errExcel.dataEx = [];
            this.errExcel.dataEx = loi_bnm;
            this.$bvModal
              .msgBoxConfirm(
                "Đã thực hiện hủy cấu hình. Bạn có muốn xuất file danh sách bị lỗi không?",
                {
                  title: "Xác nhận hành động",
                  centered: true,
                  size: "sm",
                }
              )
              .then(async (value) => {
                if (value) {
                  document.getElementById("exporterror").click();
                } else {
                  return;
                }
              });
          }
          else
          {
            // Message_Box.ShowWarning(frm.Output.ToString());
            this.$root.$toast.success(
              "Tính năng không thực hiện ở giai đoạn này"
            );
          }
          this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSo);
        }
      } catch (ex) {
        this.$root.$toast.error("Có lỗi khi cấu hình" +ex);
      }
      finally {
        this.$root.showLoading(false);
      }
      //#endregion
    },
    themDS: function () {
      this.$root.$toast.success("Tính năng không thực hiện ở giai đoạn này");
      return;
    },
    NAP_DS_HOSO: async function () {
      this.loading(true);
      try {
        let maTB = "";
        let input = this.arrayInputTab1.soMayAcc;

        if (input != "") {
          let dsTB = await this.$root.context.get(
            "/web-ecms/doicong-danhsach/lay-ds-thuebao",
            { matb: input }
          );
          if (dsTB.data.length > 0) {
            maTB = dsTB.data[0].MA_TB;
          } else {
            this.$root.toastError(
              "Không tìm thấy số máy/acc/ mã men " + input + " "
            );
            return;
          }
        }
        let data = {
          maThueBao: maTB,
          cboTths: this.arrayCBO.cboTTHS,
          tuNgay:
            this.reloadAfterDelete == 1
              ? this.convertDate2String(this.arrayDate.fromDate)
              : this.reloadAfterUpdate == 1
              ? this.convertDate2String(this.arrayDate.fromDate)
              : this.convertDate2String(this.arrayDate.fromDate),
          denNgay:
            this.reloadAfterDelete == 1
              ? this.convertDate2String(this.arrayDate.toDate)
              : this.reloadAfterUpdate == 1
              ? this.convertDate2String(this.arrayDate.toDate)
              : this.convertDate2String(this.arrayDate.toDate),
        };
        console.log("data ", data);
        let rs = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/lay-ds-hoso",
          data
        );
        console.log("rs ", rs);
        if (rs.error_code === "BSS-00000000") {
          this.arrayDataGrids.dsHoSoTab1 = rs.data;
        } else {
          this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.");
        }
      } catch (e) {
        // this.$root.$toast.error('err '+e)
        this.$root.toastError(e.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    cbb_selectedChanged: async function (data) {
      try {
        this.loading(true);
        this.arrayCBO.cboHoSoTab2 = data.HSCC_ID;
        console.log("data", data);
        await this.NAP_DS_THUEBAO_CATCHUYEN();
      } catch (error) {
        // this.$toast.error(error)
        this.$root.toastError(error.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    cbbDslam_selectedChanged: async function (data) {
      try {
        this.loading(true);
        let selectedDslam = data;
        this.dslamSelected = data
        this.enableSelectFollowPortTD = false;
        this.enableSelectFollowPortTD = false;
        if (data == null) {
          this.arrayDataGridsdsLuoiPortTab3 = [];
          return;
        }
        this.arrayCBO.cboDslamTab3 = data.DSLAM_ID;
        if (selectedDslam != null) {
          this.arrayCBO.cboDslamIDDsPort = selectedDslam.DSLAM_ID;
          this.arrayCBO.cboDslamPort = selectedDslam;
          let port_td = selectedDslam.PORT_TD;
          this.sPort_TD = selectedDslam.PORT_TD;
          if (port_td === -1) return;
          if (port_td === 1) {
            this.sPort_TD = true;
            await this.NAP_DS_PORT_FIX();
          } else {
            this.sPort_TD = false;
            this.enableSelectFollowPortTD = true;
            this.enableSelectFollowPortTD = true;
            await this.NAP_DS_LUOI_PORT();
            await this.NAP_DS_LUOI_VCIVPI();
          }
        }
      } catch (ex) {
        this.$root.toastError(ex.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    NAP_DS_THUEBAO_CATCHUYEN: async function () {
      try {
        this.loading(true);
        let hscc_id = this.arrayCBO.cboHoSoTab2;
        console.log("hscc_id ", hscc_id);
        let rs = await this.$root.context.get(
          `/web-ecms/doicong-danhsach/lay-ds-thuebao-catchuye-tab2?hsccId=${hscc_id}`
        );
        console.log("rsrsrsrsrsrs ", rs);
        if (rs.data.length > 0) {
          let result = rs.data;
          const newState = result.map((obj) =>
            obj.HOLD_VCI_VPI == "1"
              ? {
                ...obj,
                HOLD_VCI_VPI:
                  '<span style="margin-left: 45%"><i class="fa fa-check"></i></span>',
              }
              : obj
          );
          this.arrayDataGrids.dsHoSoTab2 = newState;
        } else {
          this.arrayDataGrids.dsHoSoTab2 = [];
        }
      } catch (error) {
        // this.$toast.error(error)
        this.$root.toastError(error.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    chooseFiles: function () {
      try {
        this.$root.showLoading(true);
        if (this.arrayCBO.cboHoSoTab2 == 0 || this.arrayCBO.cboHoSoTab2 == -1) {
          this.$refs.cboHSCC.focus();
          this.isError = true;
          this.$toast.error("Chưa chọn hồ sơ cắt chuyển");
          return;
        }
        document.getElementById("fileUpload").click();
      } catch (error) {
        this.$toast.error(' '+error);
      }
      finally {
        this.$root.showLoading(false);
      }

    },
    onChange: async function () {

      try {
        this.$root.showLoading(true);
        this.arrayImportFile.filexcel =
          this.$refs.fileUpload.$refs.input.files[0];

        let json_list = [];
        if (this.checkfile()) {
          let tencot;
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
            tencot = data[0];
            if (this.kiemTraDuLieu(tencot)) {
              for (let i = 1; i < data.length; i++) {
                json_list.push(data[i]);
              }
            }
          };
          reader.readAsBinaryString(this.arrayImportFile.filexcel);
          let ck = await this.$root.context.get(
            "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
            { hscc_id: this.ttcc_id }
          );
          if (ck == null || ck.data.length == 0) {
            this.$root.$toast.error(
              "Không lấy được trạng thái thông tin hồ sơ"
            );
            return;
          }
          if (ck.data.TTCC_ID == 6) {
            this.$root.$toast.error(
              "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
            );
            return;
          }
          //Check Mã TB
          let checkPopup = true;
          if (tencot[0].toUpperCase() == "MA_TB") {
            json_list = json_list.map(function (x) {
              return {
                MA_TB: x[0],
              };
            });
            if (json_list.length == 0) {
              this.$root.$toast.error("Không có dữ liệu trong file excel");
              return;
            }
            this.checkMaTB = true;
            let dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-matb1-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã thuê bao chưa có trong trong danh bạ\r\n" +
                  " hoặc không đúng dịch vụ. Bạn có muốn xuất file không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }

            dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-matb2-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã thuê bao đang thực hiển dở bạn không thể tiếp tục đổi cổng.Bạn có muốn file execl không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }

            dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-matb3-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã thuê bao không thuộc dịch vụ cho phép thực hiện \r\n" +
                  " hoặc không đúng dịch vụ. Bạn có muốn xuất file không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }
          }
          // Check Mã LT
          if (tencot[0].toUpperCase() == "MA_LT") {
            json_list = json_list.map(function (x) {
              return {
                MA_LT: x[0],
              };
            });

            if (json_list.length == 0) {
              this.$root.$toast.error("Không có dữ liệu trong file excel");
              return;
            }
            this.checkMaTB = false;

            let dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-malt1-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã ảo chưa có trong trong danh bạ\r\n" +
                  " hoặc không đúng dịch vụ. Bạn có muốn xuất file không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }

            dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-malt2-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã thuê bao đang thực hiển dở bạn không thể tiếp tục đổi cổng.Bạn có muốn file execl không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }

            dem = await this.$root.context.post(
              "/web-ecms/doicong-danhsach/kiemtra-malt3-madoicap-ins-tab2",
              json_list
            );
            if (dem != null && dem.data.length > 0) {
              checkPopup = false;
              this.$bvModal
                .msgBoxConfirm(
                  "Có " +
                  dem.data.length +
                  " mã thuê bao không thuộc dịch vụ cho phép thực hiện \r\n" +
                  " hoặc không đúng dịch vụ. Bạn có muốn xuất file không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then((value) => {
                  if (value) {
                    this.errExcel.dataEx = Object.values(dem.data)
                    var ma_thuebao = XLSX.utils.json_to_sheet(this.errExcel.dataEx);
                    var wb = XLSX.utils.book_new(); // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, ma_thuebao, "MA_TB"); // sheetAName is name of Worksheet
                    // export Excel file
                    XLSX.writeFile(wb, "ma_thue_bao.xlsx");
                    return;
                  } else {
                    return;
                  }
                });
            }
          }

          this.arrayImportFile.dsImportExcel = json_list;
          if (checkPopup) {
            this.$bvModal
              .msgBoxConfirm(
                "Bạn có muốn thêm danh sách thuê bao vào hồ sơ " +
                this.arrayCBO.cboHoSoTab2 +
                " không?",
                {
                  title: "Xác nhận hành động",
                  centered: true,
                  size: "sm",
                }
              )
              .then((value) => {
                if (value) {
                  this.okThemDS();
                } else {
                  return;
                }
              });
          }
        }
      } catch (error) {
        //this.$toast.error("Có lỗi xảy ra: " + error)
        this.$root.toastError(
          "Có lỗi xảy ra: " + error.response.data.message_detail
        );
        return;
      } finally {
        this.$root.showLoading(false);
      }
    },
    okThemDS: async function () {
      let json_list = this.arrayImportFile.dsImportExcel;
      let dsDL_imp;
      if (this.checkMaTB) {
        dsDL_imp = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/get-infor-matb-madoicap-ins-tab2",
          json_list
        );
      } else {
        dsDL_imp = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/get-infor-malt-madoicap-ins-tab2",
          json_list
        );
      }
      for (let i = 0; i < dsDL_imp.data.length; i++) {
        let data = {
          THUEBAO_ID: dsDL_imp.data[i].THUEBAO_ID,
          MA_TB: dsDL_imp.data[i].MA_TB,
          TEN_TB: dsDL_imp.data[i].TEN_TB,
          DIACHI_LD: dsDL_imp.data[i].DIACHI_LD,
          PORTVL_ID: dsDL_imp.data[i].PORTVL_ID,
          VCI_VPI_ID: dsDL_imp.data[i].VCI_VPI_ID,
          PORT_ID: dsDL_imp.data[i].PORT_ID,
          MADOICAP: dsDL_imp.data[i].MADOICAP,
        };
        this.arrayImportFile.ds_file.push(data);
      }
      let kq = await this.$root.context.post(
        `/web-ecms/doicong-danhsach/them-ds-madoicap?hsccId=${this.arrayCBO.cboHoSoTab2}&cungdoiCap=${this.arrayInputTab1.chkCungDoiCap}`,
        this.arrayImportFile.ds_file
      );

      if (kq.error_code === "BSS-00000000") {
        this.$toast.success("Thêm danh sách thuê bao thành công!");
        this.NAP_DS_THUEBAO_CATCHUYEN();
      } else {
        this.$toast.error(kq.message_detail);
      }
    },
    kiemTraDuLieu: function (tencot) {
      if (tencot.length > 1) {
        this.$toast.error("Dữ liệu file excel chưa đúng số lượng cột");
        return false;
      }
      if (tencot === null) {
        this.$toast.error("Không đọc được dữ liệu từ file");
        return false;
      }
      if (tencot.length == 1) {
        if (tencot[0] != "MA_TB" && tencot[0] != "MA_LT") {
          this.$toast.error("Không tìm thấy cột mã TB hoặc mã LT");
          return false;
        }
      }
      return true;
    },
    xoaDSHS: async function () {
      if (this.arrayDataGrids.dsHoSoTab2 == null) {
        this.$toast.error("Không có danh sách để thực hiện xóa");
        return;
      }
      if (this.arrayCBO.cboHoSoTab2 == 0 || this.arrayCBO.cboHoSoTab2 == -1) {
        this.$refs.cboHSCC.focus();
        this.isError = true;
        this.$toast.error("Chưa chọn hồ sơ cắt chuyển");
        return;
      }
      let ck = await this.$root.context.get(
        "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
        { hscc_id: this.ttcc_id }
      );
      if (ck == null || ck.data.length == 0) {
        this.$root.$toast.error("Không lấy được trạng thái thông tin hồ sơ");
        return;
      }
      if (ck.data.TTCC_ID == 6) {
        this.$root.$toast.error(
          "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
        );
        return;
      }
      let dshoso = this.selectedDSTab2;
      let ds_check = dshoso.filter(function (item) {
        return (item.CHON = "s1");
      });
      if (ds_check.length == 0) {
        this.$toast.error("Bạn chưa chọn thuê bao để xóa");
        return;
      }

      let result = ds_check.map((item) => ({
        DKCC_CHA_ID: item.DKCC_CHA_ID,
        DKCC_ID: item.DKCC_ID,
        HSCC_ID: item.HSCC_ID
      }));
      let rs = await this.$root.context.post(
        "/web-ecms/doicong-danhsach/check-infor-before-xoads-tab2",
        result
      );
      if (rs.data.RESULTS != 0) {
        this.$toast.error(
          "Có thuê bao đã bị thay đổi trạng thái bạn không thể xóa khỏi danh sách"
        );
      }
      this.$bvModal
        .msgBoxConfirm(
          "Bạn có muốn xóa những thuê bao đã chọn khỏi danh sách cắt chuyển cổng ?",
          {
            title: "Xác nhận hành động",
            centered: true,
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy',
            size: "sm",
          }
        )
        .then(async (value) => {
          if (value) {
            await this.confirmXoaDSHS(result);
          } else {
            return;
          }
        });
    },
    confirmXoaDSHS: async function (result) {
      let rs = await this.$root.context.post(
        "/web-ecms/doicong-danhsach/xoa-ds-catchuyen",
        result
      );
      console.log("rsrsrsrs ", rs);
      if (rs.error_code === "BSS-00000000") {
        await this.NAP_DS_THUEBAO_CATCHUYEN();
        this.$toast.success("Đã xóa thành công " + rs.data[0].RESULT);
      } else {
        this.$toast.error(rs.message_detail);
      }
    },
    confirmGiuVCICPI: async function (result) {
      try {
        this.loading(true);

        let rs = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/giu-vci-cpi",
          result
        );
        console.log('ressult ',rs)
        if (rs.error_code === "BSS-00000000") {
          await this.NAP_DS_THUEBAO_CATCHUYEN();
          this.$toast.success(
            "Đã giữ vci vpi thành công " +
            rs.data[0].RESULT +
            " / " +
            result.length +
            " thuê bao"
          );
        } else {
          this.$toast.error(rs.message_detail);
        }
      } catch (error) {
        this.$root.toastError("Error " + error.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    checkfile: function () {
      if (this.arrayImportFile.filexcel == null) {
        this.$toast.error("Chưa chọn file nào!");
        return false;
      }
      if (
        this.arrayImportFile.filexcel.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.$toast.error("File không phải định dạng xlsx hoặc xls!");
        return false;
      }
      return true;
    },
    onClickdsHoSoTab1: async function (data) {
      if (data != null) {
        this.buttonState.isDisableBtnXoa = false;
        this.hscc_id = data.HSCC_ID;
        this.ttcc_id = data.HSCC_ID;
        this.arrayInputTab1.tenHoSo = data.TEN_HS;
        this.arrayDate.startDate = data.NGAYBD_DK;
        this.arrayDate.endDate = data.NGAYKT_DK;
        this.arrayInputTab1.ghiChu = data.GHICHU;
        this.arrayDataXoa.soTBDK = data.SO_TB_DK;
      }
    },
    onClickdsHoSoTab2: async function (data) {
      if (data != null) {
      }
    },
    selectedItemsTab2: async function (data) {
      this.selectedDSTab2 = [];
      this.arrayDataGrids.dsHoSoTab2.forEach((item) => {
        if (data.includes(item.MA_TB)) {
          item.CHON = "s1";
        } else {
          item.CHON = "s0";
        }
      });
      this.selectedDSTab2 = this.arrayDataGrids.dsHoSoTab2.filter(function (
        el
      ) {
        return el.CHON != "s0";
      });
    },
    selectedItemsHso: async function (data) {
      this.arraySelectedItem.soChonAcc = data.length;
      this.selectedDSTab3 = [];
      this.arrayDataGrids.dsHoSoTab3.forEach((item) => {
        if (data.includes(item.DKCC_ID)) {
          item.CHON = "s1";
        } else {
          item.CHON = "s0";
        }
      });
      this.selectedDSTab3 = this.arrayDataGrids.dsHoSoTab3.filter(function (
        el
      ) {
        return el.CHON != "s0";
      });
    },
    selectedItemsPort: async function (data) {
      this.arraySelectedItem.soPort = data.length;
    },
    selectedItemsPortFix: async function (data) {
      this.arraySelectedItem.soPort = data.length;
      this.selectedPortFix = [];
      let arraySelected = [];
      // this.selectedPortFix = this.arrayDataGrids.dsPortFixTab3.forEach(item =>{
      //   if(data.includes(item.PORT_ID)){
      //     item.CHON = "1"
      //   }else{
      //     item.CHON = "0"
      //   }
      // })
      arraySelected = this.arrayDataGrids.dsPortFixTab3;
      for (let i = 0; i < data.length; i++) {
        let row = data[i];
        const check = (obj) => obj.PORT_ID === row;
        if (arraySelected.some(check)) {
          //Find index of specific object using findIndex method.
          let objIndex = arraySelected.findIndex(check);
          //Update object's name property.
          arraySelected[objIndex].ISCHECK = "1";
        }
      }
      var filtered = arraySelected.filter(function (el) {
        return el.ISCHECK != "0";
      });
      this.selectedPortFix = filtered;
    },
    selectedItemsVCI: async function (data) {
      this.arraySelectedItem.soVciVpi = data.length;
    },
    giuVciVpi: async function () {
      if (this.arrayDataGrids.dsHoSoTab2 == null) {
        this.$toast.error("Không có danh sách để thực hiện giữ vci vpi");
        return;
      }
      if (this.arrayCBO.cboHoSoTab2 == 0 || this.arrayCBO.cboHoSoTab2 == -1) {
        this.$refs.cboHSCC.focus();
        this.isError = true;
        this.$toast.error("Chưa chọn hồ sơ cắt chuyển");
        return;
      }
      let ck = await this.$root.context.get(
        "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
        { hscc_id: this.ttcc_id }
      );
      if (ck == null || ck.data.length == 0) {
        this.$root.$toast.error("Không lấy được trạng thái thông tin hồ sơ");
        return;
      }
      if (ck.data.TTCC_ID == 6) {
        this.$root.$toast.error(
          "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
        );
        return;
      }
      let ds_check = this.selectedDSTab2;
      if (ds_check.length == 0) {
        this.$toast.error("Bạn chưa chọn thuê bao để giữ danh sách");
        return;
      }
      let result = ds_check.map((item) => ({
        DKCC_CHA_ID: item.DKCC_CHA_ID,
        DKCC_ID: item.DKCC_ID
      }));
      let rs = await this.$root.context.post(
        "/web-ecms/doicong-danhsach/check-infor-before-xoads-tab2",
        result
      );
      if (rs.data.RESULTS != 0) {
        this.$toast.error(
          "Có thuê bao đã bị thay đổi trạng thái bạn không thể chọn giữ port vci vpi hay không"
        );
      }
      this.$bvModal
        .msgBoxConfirm(
          "Bạn có muốn giữ vci vpi các thuê bao đã chọn trong danh sách cắt chuyển cổng không?",
          {
            title: "Xác nhận hành động",
            centered: true,
            size: "sm",
          }
        )
        .then(value => {
          if (value) {
            this.confirmGiuVCICPI(result);
          } else {
            return;
          }
        });
    },
    LOAD_HOSO_CATCHUYEN: async function () {
      try {
        this.loading(true);
        let maTB = "";
        let input = this.arrayInputTab1.soMayAcc;
        if (input != "") {
          let dsTB = await this.$root.context.get(
            "/web-ecms/doicong-danhsach/lay-ds-thuebao",
            { matb: input }
          );
          if (dsTB.data.length > 0) {
            maTB = dsTB.data[0].MA_TB;
          } else {
            this.$root.toastError(
              "Không tìm thấy số máy/acc/ mã men " + input + " "
            );
            return;
          }
        }
        let data = {
          maThueBao: maTB,
          cboTths: this.arrayCBO.cboTTHS,
          tuNgay:
            this.activetab == 2
              ? this.convertDate2String(this.arrayDate.fromDate)
              : this.convertDate2String(this.arrayDate.fromDate),
          denNgay:
            this.activetab == 2
              ? this.convertDate2String(this.arrayDate.toDate)
              : this.convertDate2String(this.arrayDate.toDate),
        };
        let rs = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/lay-ds-hoso-catchuyen",
          data
        );
        if (rs.error_code === "BSS-00000000") {
          this.arrayDataToCbo.dsHoSoCCTab2 = rs.data;
          if (rs.data.length > 0) {
            this.arrayCBO.cboHoSoTab2 = rs.data[0].HSCC_ID;
          }
          this.arrayDataGrids.dsHSCCTab2Inp = rs.data;
        } else {
          this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.");
        }
      } catch (e) {
        this.$root.toastError("Error " + e.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    NAP_DS_TRAMTBI: async function () {
      try {
        let ck = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/lay-ds-tramtbi"
        );
        console.log('NAP_DS_TRAMTBI ',ck)
        this.arrayDataToCbo.dsTramTBTab3 = ck.data;
        this.arrayCBO.cboTramTBTab3 = ck.data[0].DONVI_ID;
        if (ck.data[0].DONVI_ID > 0) {
          await this.NAP_DS_DSLAM();
        }
      } catch (e) {
        this.$root.toastError("Error " + e.response.data.message_detail);
      } finally {
      }
    },
    NAP_DS_TRANGTHAI_VCIVPI: async function () {
      try {
        let ck = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/lay-ds-trangthai-vcivpi"
        );
        this.arrayDataToCbo.dsTTVciVpiTab3 = ck.data;
        console.log("dstrangthai ", ck.data);
        this.arrayCBO.cboTrangthaiVCIVPITab3 = ck.data[0].TT_PORT_ID;
      } catch (e) {
        this.$root.toastError("Error " + e.response.data.message_detail);
      } finally {
      }
    },
    NAP_DS_QUYHOACH: async function () {
      this.arrayDataToCbo.dsKieuQuyhoachTab3 = [
        { QUYHOACH_ID: "2", QUYHOACH: "2 lớp" },
        { QUYHOACH_ID: "1", QUYHOACH: "1 lớp" },
      ];
      this.arrayCBO.cboKieuQuyhoachTab3 =
        this.arrayDataToCbo.dsKieuQuyhoachTab3[0].QUYHOACH_ID;
    },
    NAP_DS_QH: async function () {
      this.arrayDataToCbo.dsLoaiQuyhoachTab3 = [
        { LOAIKN_ID: "1", KETNOI: "Nội tỉnh" },
        { LOAIKN_ID: "2", KETNOI: "Liên tỉnh" },
        { LOAIKN_ID: "3", KETNOI: "Internet trực tiếp" },
        { LOAIKN_ID: "4", KETNOI: "Fiber" },
      ];
      console.log("a ", this.arrayDataToCbo.dsLoaiQuyhoachTab3);
      this.arrayCBO.cboLoaiQuyhoachTab3 =
        this.arrayDataToCbo.dsLoaiQuyhoachTab3[0].LOAIKN_ID;
    },
    LAY_TS_PORTD: async function () {
      try {
        let t = this.arrayCBO.cboDslamPort;
        if (t == null || t.length == 0) {
          return "-1";
        }
        if(this.arrayCBO.cboDslamTab3 > 0){
          let selected = t.filter(obj => {
            return obj.PORT_TD === this.arrayCBO.cboDslamTab3
          })
          return selected.PORT_TD
        }
      } catch (e) {
        return "-1";
      }
    },
    NAP_DS_PORT_FIX: async function () {
      try {
        this.loading(true);
        let dslamID = this.arrayCBO.cboDslamIDDsPort;
        if (dslamID == null || dslamID == -1) {
          return;
        }
        let ck = await this.$root.context.post(
          `web-ecms/doicong-danhsach/lay-ds-port-fix?dslamId=${dslamID}`
        );
        this.arrayDataGrids.dsPortFixTab3 = ck.data;
      } catch (e) {
        this.$root.$toast.error(e.error);
      } finally {
        this.loading(false);
      }
    },
    NAP_DS_LUOI_VCIVPI: async function () {
      try {
        if (
          this.arrayDataToCbo.dsDslamTab3 == null ||
          this.arrayDataToCbo.dsKieuQuyhoachTab3 == null ||
          this.arrayDataToCbo.dsLoaiQuyhoachTab3 == null
        )
          return;
        this.arrayDataGrids.dsVCIVPITab3 = []
        //grcVciVpi.DataSource = null;
        //colVPI.Visible = true;
        // if (cboQuyHoach.EditValue == "1")
        // {
        //     colVPI.Visible = false;
        // }
        let trangthai = 1;
        if (this.arrayDataToCbo.dsTTVciVpiTab3 != null) {
          trangthai = this.arrayCBO.cboTrangthaiVCIVPITab3;
        }
        if (trangthai == 4) {
          // giỮ vci vpi THÌ KO VIEW RA NỮA
          this.arrayDataGrids.dsVCIVPITab3 = [];
          return;
        }
        console.log("trangthai ", trangthai);
        let data = {
          dslamId: this.arrayCBO.cboDslamTab3,
          quyhoachId: this.arrayCBO.cboKieuQuyhoachTab3,
          kieuKn: this.arrayCBO.cboLoaiQuyhoachTab3,
          trangThaiId: trangthai,
          vciVpiId: 0,
        };
        let ck = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/nap_ds_luoi_vcivpi",
          data
        );
        if (ck.data.length > 0) {
          this.arrayDataGrids.dsVCIVPITab3 = ck.data;
        }
      } catch (e) {
        this.$root.toastError(
          "Có lỗi khi nạp danh sách port " + e.response.data.message_detail
        );
      }
    },
    hoanThien: async function () {
      try {
        this.$root.showLoading(true);
        await this.THUCTHI();
      } catch (ex) {
        this.$root.toastError("Lỗi " + ex.response.data.message_detail);
      } finally {
        this.$root.showLoading(false);
      }
    },
    THUCTHI: async function () {
      try {
        this.loading(true);
        let check = await this.KIEMTRA_GANCONG(0);
        if (!check) {
          return;
        }
        let thongbao = "Bạn có muốn";
        if (this.arrayInputTab3.ckbAuto_KH) {
          thongbao += " tự động kích hoạt";
        }
        if (this.arrayInputTab3.ckbAuto_BNM) {
          thongbao += " tự động gửi cấu hình";
        }
        if (this.arrayInputTab3.ckbAuto_BNM || this.arrayInputTab3.ckbAuto_KH) {
          thongbao += " khi";
        }
        thongbao += " hoàn thiện đổi cổng không?";
        this.$bvModal
          .msgBoxConfirm(thongbao, {
            title: "Xác nhận hành động",
            centered: true,
            size: "sm",
          })
          .then((value) => {
            if (value) {
              this.xacNhanThucThi();
            } else {
              return;
            }
          });
      } catch (ex) {
        this.$root.toastError("Lỗi " + ex.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    xacNhanThucThi: async function () {
      try {
        let loi_bnm = [];
        let header = {
          MA_TB: "MA_TB",
          THONGTIN_LOI: "THONGTIN_LOI",
        };
        let getvisapass = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/func-get-pass-visa?maTB=1"
        );
        let pass_ftth = getvisapass.data;
        this.$root.showLoading(true);
        loi_bnm.push(header);
        //#region Danh sách đổi cổng
        let ds = this.selectedDSTab3;
        let ds_check = ds.filter(function (item) {
          return item.CHON == "s1" && item.DKCC_CHA_ID == null;
        });
        let dt_ch = ds_check;
        //#endregion

        //#region Thực thi
        let ds_con_dc = ds_check;
        //VASCService vasc = new VASCService(tt_nd.user_vasc, tt_nd.pass_vasc, tt_nd.diemgiaodich_vasc);
        let countDKCC = ds_con_dc.filter(function (item) {
          return item.DKCC_CHA_ID != null;
        });
        if (countDKCC.length > 0) {
          ds_con_dc = ds_con_dc.filter(function (item) {
            return item.DKCC_CHA_ID != null;
          });
        }
        if (this.arrayInputTab3.ckbAuto_BNM) {
          //#region Tự động cấu hình BNM
          try {
            let tong = ds.length;
            for (let i = tong - 1; i >= 0; i--) {
              let dr = ds[i];

              if (dr.PORT_ID == null || dr.NGAY_CH != null) {
                continue;
              }
              try {
                let dstb = ds[i].THUEBAO_ID + ";";
                let vchuyenall = 0;
                if (ds_con_dc != null && ds_con_dc.length > 0) {
                  let l = ds_con_dc.filter(function (item) {
                    return item.DKCC_CHA_ID == ds[i].DKCC_ID;
                  });
                  if (l.length > 0) {
                    vchuyenall = 1;
                    for (let row in l) {
                      dstb = dstb + row.THUEBAO_ID + ";";
                    }
                  }
                }
                dstb = dstb.slice(0, -1);
                let data = {
                  thuebao_id: dr.THUEBAO_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  loai_td: 1,
                  nguoi_kh: this.$auth.getUserName(),
                  chuyen_all: vchuyenall,
                  ds_tb: dstb,
                  trangthai: 0,
                  dkcc_id: dr.DKCC_ID,
                  pass_ftth: pass_ftth,
                };
                let kq = await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/cauhinh-bnm",
                  data
                );
                if (kq.data.RESULT === "ok") {
                  try {
                    await this.$root.context.post(
                      `/web-ecms/doicong-danhsach/capnhat10-catchuyen-hoanthien-tab3?dkcc_id=${dr.DKCC_ID}`
                    );
                    let log = {
                      ma_tb: dr.MA_TB,
                      dkcc_id: dr.DKCC_ID,
                      port_id: dr.PORT_ID,
                      vci_vpi_id: dr.VCI_VPI_ID,
                      dslam_vdc_id: dr.DSLAM_VDC_ID,
                      flag: 3,
                      nd:
                        "Đã gửi cấu hình thành công " +
                        dstb +
                        ": Cấu hình " +
                        vchuyenall,
                      status: 1,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  } catch (exxx) {
                    let errr = {
                      MA_TB: dr.MA_TB,
                      THONGTIN_LOI:
                        "Cấu hình thành công không lưu được trạng thái !" +
                        exxx,
                    };
                    loi_bnm.push(errr);
                    let log = {
                      ma_tb: dr.MA_TB,
                      dkcc_id: dr.DKCC_ID,
                      port_id: dr.PORT_ID,
                      vci_vpi_id: dr.VCI_VPI_ID,
                      dslam_vdc_id: dr.DSLAM_VDC_ID,
                      flag: 3,
                      nd:
                        "Cấu hình thành công " +
                        dstb +
                        " (" +
                        vchuyenall +
                        ") không lưu được trạng thái !" +
                        exxx +
                        "",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  }
                } else {
                  let errr = {
                    MA_TB: dr.MA_TB,
                    THONGTIN_LOI:
                      "Có lỗi trong quá trình cấu hình !" +
                      kq.data.message_detail,
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 3,
                    nd: "Có lỗi trong quá trình gửi cấu hình ! " + kq + "",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                }
              } catch (exx) {
                let errr = {
                  MA_TB: dr.MA_TB,
                  THONGTIN_LOI: "Có lỗi trong quá trình cấu hình !" + exx,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: dr.MA_TB,
                  dkcc_id: dr.DKCC_ID,
                  port_id: dr.PORT_ID,
                  vci_vpi_id: dr.VCI_VPI_ID,
                  dslam_vdc_id: dr.DSLAM_VDC_ID,
                  flag: 3,
                  nd: "Có lỗi trong quá trình cấu hình !" + exx + "",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
                ds.splice(dr, 1);
              }
            }
          } catch (ex) {
            let errr = {
              MA_TB: "ALL",
              THONGTIN_LOI: "Lỗi thoát vòng lặp " + ex,
            };
            loi_bnm.push(errr);
          }
          //#endregion
        }

        if (this.arrayInputTab3.ckbAuto_KH) {
          console.log(
            "this.arrayInputTab3.ckbAuto_KH ",
            this.arrayInputTab3.ckbAuto_KH
          );
          //#region Tự động KH
          try {
            console.log("vao day roi2222222222 ");
            //#region Tự động kích hoạt

            let tong = ds.length;

            for (let i = tong - 1; i >= 0; i--) {
              let dr = ds[i];

              console.log("ds_con_dc-Kichhoat ", ds_con_dc);
              let dem = 0;
              // sender.SetText("Đang kích hoạt ", (i + 1) + " / " + tong);
              if (ds_con_dc != null && ds_con_dc.length > 0) {
                let l = ds_con_dc.filter(function (item) {
                  return item.DKCC_CHA_ID == ds[i].DKCC_ID;
                });
                if (l.length > 0) {
                  for (let row in l) {
                    //#region Kích hoạt con
                    if (row.PORT_ID == null || row.NGAY_KH != null) {
                      continue;
                    }
                    console.log("row-kichhoat ", row);
                    console.log("row-LOAITB_ID ", row.LOAITB_ID);
                    // if (row.LOAITB_ID == LoaiHinhTB.INTERNET_ADSL || row.LOAITB_ID == LoaiHinhTB.INTERNET_FTTH || row.LOAITB_ID == LoaiHinhTB.WIFI_FIBER)
                    if (
                      row.LOAITB_ID == 11 ||
                      row.LOAITB_ID == 58 ||
                      row.LOAITB_ID == 79
                    ) {
                      //#region Thực hiện đổi cổng
                      let kieu_mega = row.KIEU_MEGA;
                      if (this.DONGBO_TEST == false && kieu_mega != 0) {
                        let loi_ = "";
                        let res = this.DoiCongAcccountVisa(row);
                        if (res != "") {
                          dem += 1;
                          let errr = {
                            MA_TB: row.MA_TB,
                            THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                          };
                          loi_bnm.push(errr);
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID,
                            vci_vpi_id: row.VCI_VPI_ID,
                            dslam_vdc_id: row.DSLAM_VDC_ID,
                            flag: 2,
                            nd: "Lỗi kích hoạt visa " + res,
                            status: 0,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        } else {
                          //#region cập nhật status và lưu log
                          try {
                            await this.$root.context.post(
                              `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                            );
                            let log = {
                              ma_tb: row.MA_TB,
                              dkcc_id: row.DKCC_ID,
                              port_id: row.PORT_ID,
                              vci_vpi_id: row.VCI_VPI_ID,
                              dslam_vdc_id: row.DSLAM_VDC_ID,
                              flag: 2,
                              nd: "Kích hoạt thành công",
                              status: 1,
                            };
                            await this.$root.context.post(
                              "/web-ecms/doicong-danhsach/them-log-catchuyen",
                              log
                            );
                          } catch (ex) {
                            dem += 1;
                            let errr = {
                              MA_TB: row.MA_TB,
                              THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                            };
                            loi_bnm.push(errr);
                            let log = {
                              ma_tb: row.MA_TB,
                              dkcc_id: row.DKCC_ID,
                              port_id: row.PORT_ID,
                              vci_vpi_id: row.VCI_VPI_ID,
                              dslam_vdc_id: row.DSLAM_VDC_ID,
                              flag: 2,
                              nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                              status: 0,
                            };
                            await this.$root.context.post(
                              "/web-ecms/doicong-danhsach/them-log-catchuyen",
                              log
                            );
                          }
                          //#endregion
                        }
                      }
                      //#endregion
                    } else if (row.LOAITB_ID == 61) {
                      //LoaiHinhTB.INTERNET_MYTV
                      //#region Vasc
                      if (row.IP == "") {
                        dem += 1;
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI:
                            "Chưa có thông tin về IP. Hãy kiểm tra lại !",
                        };
                        loi_bnm.push(errr);
                        continue;
                      }
                      if (this.DONGBO_TEST == false) {
                        let sPortDSL = "";
                        let shelf = "0";
                        if (row.SHELF.trim() != "") shelf = row.SHELF.trim();
                        let vloaitbi_id = row.LOAITBI_ID;
                        if (vloaitbi_id == 3) {
                          sPortDSL =
                            row.IP +
                            " / " +
                            row.RACK +
                            " / " +
                            row.SLOT +
                            " / " +
                            row.PORT +
                            " / " +
                            row.VPI;
                        } else
                          sPortDSL =
                            row.IP +
                            "/" +
                            shelf +
                            "/" +
                            row.SLOT +
                            "/" +
                            row.PORT;

                        let sDeviceName = row.SYSTEM;

                        let result = await this.UpdateDeviceInfo(
                          row.MA_TB,
                          sDeviceName,
                          sPortDSL
                        ); //nhapt mở 29/09/2016
                        if (result.res != 0) {
                          //lỗi
                          dem += 1;
                          let errr = {
                            MA_TB: row.MA_TB,
                            THONGTIN_LOI:
                              "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                              row.MA_TB +
                              " trên VASC !",
                          };
                          loi_bnm.push(errr);
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID,
                            vci_vpi_id: row.VCI_VPI_ID,
                            dslam_vdc_id: row.DSLAM_VDC_ID,
                            flag: 2,
                            nd: "Lỗi kích hoạt  " + result.err + "",
                            status: 0,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        } else {
                          //#region cập nhật status và lưu log
                          try {
                            await this.$root.context.post(
                              `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                            );
                            let log = {
                              ma_tb: row.MA_TB,
                              dkcc_id: row.DKCC_ID,
                              port_id: row.PORT_ID,
                              vci_vpi_id: row.VCI_VPI_ID,
                              dslam_vdc_id: row.DSLAM_VDC_ID,
                              flag: 2,
                              nd: "Kích hoạt thành công",
                              status: 1,
                            };
                            await this.$root.context.post(
                              "/web-ecms/doicong-danhsach/them-log-catchuyen",
                              log
                            );
                          } catch (ex) {
                            dem += 1;
                            let errr = {
                              MA_TB: row.MA_TB,
                              THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                            };
                            loi_bnm.push(errr);
                            let log = {
                              ma_tb: row.MA_TB,
                              dkcc_id: row.DKCC_ID,
                              port_id: row.PORT_ID,
                              vci_vpi_id: row.VCI_VPI_ID,
                              dslam_vdc_id: row.DSLAM_VDC_ID,
                              flag: 2,
                              nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                              status: 0,
                            };
                            await this.$root.context.post(
                              "/web-ecms/doicong-danhsach/them-log-catchuyen",
                              log
                            );
                          }
                          //#endregion
                        }
                      }
                      //#endregion
                    } else {
                      //#region cập nhật status và lưu log
                      try {
                        await this.$root.context.post(
                          `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                        );
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt ảo thành công",
                          status: 1,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } catch (ex) {
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                        };
                        loi_bnm.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                          status: 0,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      }
                      //#endregion
                    }
                    //#endregion
                  }
                }
              }
              if (dem > 0) {
                ds.splice(dr, 1);
                continue;
              }

              if (dr.PORT_ID == null || dr.NGAY_KH != null) {
                continue;
              }
              // if (dr.LOAITB_ID == LoaiHinhTB.INTERNET_ADSL || dr.LOAITB_ID == LoaiHinhTB.INTERNET_FTTH || dr.LOAITB_ID == LoaiHinhTB.WIFI_FIBER)
              console.log("dr-kichhoat ", dr.LOAITB_ID);
              if (
                row.LOAITB_ID == 11 ||
                row.LOAITB_ID == 58 ||
                row.LOAITB_ID == 79
              ) {
                //#region Thực hiện đổi cổng
                let kieu_mega = dr.KIEU_MEGA;
                if (this.DONGBO_TEST == false && kieu_mega != 0) {
                  let loi_ = "";
                  let res = this.DoiCongAcccountVisa(row);
                  if (res != "") {
                    let log = {
                      ma_tb: dr.MA_TB,
                      dkcc_id: dr.DKCC_ID,
                      port_id: dr.PORT_ID,
                      vci_vpi_id: dr.VCI_VPI_ID,
                      dslam_vdc_id: dr.DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Lỗi kích hoạt visa " + res,
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                    let errr = {
                      MA_TB: dr.MA_TB,
                      THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                    };
                    loi_bnm.push(errr);
                    ds.splice(dr, 1);
                  } else {
                    //#region cập nhật status và lưu log
                    try {
                      await this.$root.context.post(
                        `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                      );
                      let log = {
                        ma_tb: dr.MA_TB,
                        dkcc_id: dr.DKCC_ID,
                        port_id: dr.PORT_ID,
                        vci_vpi_id: dr.VCI_VPI_ID,
                        dslam_vdc_id: dr.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Kích hoạt thành công",
                        status: 1,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    } catch (ex) {
                      let errr = {
                        MA_TB: dr.MA_TB,
                        THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                      };
                      loi_bnm.push(errr);
                      let log = {
                        ma_tb: dr.MA_TB,
                        dkcc_id: dr.DKCC_ID,
                        port_id: dr.PORT_ID,
                        vci_vpi_id: dr.VCI_VPI_ID,
                        dslam_vdc_id: dr.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                      ds.splice(dr, 1);
                    }
                    //#endregion
                  }
                }
                //#endregion
              } else if (dr.LOAITB_ID == 61) {
                //LoaiHinhTB.INTERNET_MYTV
                //#region Vasc
                if (dr.IP == "") {
                  let errr = {
                    MA_TB: dr.MA_TB,
                    THONGTIN_LOI: "Chưa có thông tin về IP. Hãy kiểm tra lại !",
                  };
                  loi_bnm.push(errr);
                  ds.splice(dr, 1);
                  continue;
                }
                if (this.DONGBO_TEST == false) {
                  let sPortDSL = "";
                  let shelf = "0";
                  if (dr.SHELF.trim() != "") shelf = dr.SHELF.trim();
                  let vloaitbi_id = dr.LOAITBI_ID;
                  if (vloaitbi_id == 3) {
                    sPortDSL =
                      dr.IP +
                      "/" +
                      dr.RACK +
                      "/" +
                      dr.SLOT +
                      "/" +
                      dr.PORT +
                      "/" +
                      dr.VPI;
                  } else
                    sPortDSL =
                      dr.IP + "/" + shelf + "/" + dr.SLOT + "/" + dr.PORT;

                  let sDeviceName = dr.SYSTEM;
                  let result = await this.UpdateDeviceInfo(
                    dr.MA_TB,
                    sDeviceName,
                    sPortDSL
                  ); //nhapt mở 29/09/2016

                  if (result.res != 0) {
                    //lỗi
                    let log = {
                      ma_tb: dr.MA_TB,
                      dkcc_id: dr.DKCC_ID,
                      port_id: dr.PORT_ID,
                      vci_vpi_id: dr.VCI_VPI_ID,
                      dslam_vdc_id: dr.DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Lỗi kích hoạt  " + result.err + "",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                    let errr = {
                      MA_TB: dr.MA_TB,
                      THONGTIN_LOI:
                        "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                        dr.MA_TB +
                        " trên VASC !",
                    };
                    loi_bnm.push(errr);
                    ds.splice(dr, 1);
                  } else {
                    //#region cập nhật status và lưu log
                    try {
                      await this.$root.context.post(
                        `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                      );
                      let log = {
                        ma_tb: dr.MA_TB,
                        dkcc_id: dr.DKCC_ID,
                        port_id: dr.PORT_ID,
                        vci_vpi_id: dr.VCI_VPI_ID,
                        dslam_vdc_id: dr.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Kích hoạt thành công",
                        status: 1,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    } catch (ex) {
                      let errr = {
                        MA_TB: dr.MA_TB,
                        THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                      };
                      loi_bnm.push(errr);
                      let log = {
                        ma_tb: dr.MA_TB,
                        dkcc_id: dr.DKCC_ID,
                        port_id: dr.PORT_ID,
                        vci_vpi_id: dr.VCI_VPI_ID,
                        dslam_vdc_id: dr.DSLAM_VDC_ID,
                        flag: 2,
                        nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                      ds.splice(dr, 1);
                    }
                    //#endregion
                  }
                }
                //#endregion
              } else {
                //#region cập nhật status và lưu log
                try {
                  await this.$root.context.post(
                    `/web-ecms/doicong-danhsach/capnhat9-catchuyen-hoanthien-tab3?dkcc_id=${row.DKCC_ID}`
                  );
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt ảo thành công",
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                } catch (ex) {
                  let errr = {
                    MA_TB: dr.MA_TB,
                    THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: dr.MA_TB,
                    dkcc_id: dr.DKCC_ID,
                    port_id: dr.PORT_ID,
                    vci_vpi_id: dr.VCI_VPI_ID,
                    dslam_vdc_id: dr.DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                }
                //#endregion
              }
            }
            //#endregion
          } catch (ex) {
            let errr = {
              MA_TB: "ALL",
              THONGTIN_LOI: "Lỗi thoát vòng lặp  " + ex,
            };
            loi_bnm.push(errr);
          }
          //#endregion
        }
        this.errExcel.dataEx = [];
        this.errExcel.dataEx = loi_bnm;

        if (ds.length > 0) {
          let dt_ch = ds;
          let json = dt_ch.map((item) => ({
            DKCC_ID: item.DKCC_ID,
            PORT_ID: item.PORT_ID,
            PORTVL_ID: item.PORTVL_ID,
            VCI_VPI_ID: item.VCI_VPI_ID,
            ONT_ID: item.ONT_ID,
            MA_TB: item.MA_TB,
            THIETBI_ID: item.THIETBI_ID,
            THUEBAO_ID: item.THUEBAO_ID,
            DICHVUVT_ID: item.DICHVUVT_ID,
          }));
          //#region TẠo dữ liệu phiếu hoàn thiện
          let kq = await this.$root.context.post(
            `/web-ecms/doicong-danhsach/hoanthien-catchuyen?hsccId=${this.arrayCBO.cboHoSoTab3}`,
            json
          );

          if (kq.data.KETQUA == 1) {
            console.log("lỗi1 ",loi_bnm)
            if (loi_bnm.length == 1) {
              this.$toast.success("Hoàn thiện đổi cổng thành công");
            } else {
              this.$bvModal
                .msgBoxConfirm(
                  "Đã thực hiện xong. Bạn có muốn xuất file danh sách bị lỗi không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then(async (value) => {
                  if (value) {
                    document.getElementById("exporterror").click();
                  } else {
                    return;
                  }
                });
            }
            await this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
            await this.NAP_DS_PORT_FQH();
          } else {
            if (loi_bnm.length == 1) {
              this.$toast.error("Có lỗi khi hoàn thiện " + kq.message_detail);
              await this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
              await this.NAP_DS_PORT_FQH();
            } else {
              this.$bvModal
                .msgBoxConfirm(
                  "Đã thực hiện xong. Bạn có muốn xuất file danh sách bị lỗi không?",
                  {
                    title: "Xác nhận hành động",
                    centered: true,
                    size: "sm",
                  }
                )
                .then(async (value) => {
                  if (value) {
                    document.getElementById("exporterror").click();
                  } else {
                    return;
                  }
                });
              await this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
              await this.NAP_DS_PORT_FQH();
            }
          }
        } else {
          this.$toast.error("Có lỗi khi kích hoạt/ cấu hình ");
        }
        //#endregion

        //#endregion
      } catch (error) {
        this.$root.toastError("Lỗi " + error);
      } finally {
        this.$root.showLoading(false);
      }
    },
    NAP_DS_PORT_FQH: async function () {
      try {
        this.$root.showLoading(true);
        let port_td = this.arrayCBO.cboDslamPort.PORT_TD; //LAY_TS_PORTD();
        if (port_td == "-1") {
          return;
        }
        if (port_td == "0") {
          await this.NAP_DS_LUOI_PORT();
          await this.NAP_DS_LUOI_VCIVPI();
        } else {
          await this.NAP_DS_PORT_FIX();
        }
      } catch (error) {
        this.$root.toastError("Lỗi " + error);
      } finally {
        this.$root.showLoading(false);
      }
    },
    dongHoSo: async function () {
      try {
        let hscc_id = this.arrayCBO.cboHoSoTab3;
        if (hscc_id == -1 || hscc_id == 0) {
          this.$root.$toast.error("Không lấy được thông tin hồ sơ");
          return;
        }
        let ck = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
          { hscc_id: hscc_id }
        );
        if (ck == null || ck.data.length == 0) {
          this.$root.$toast.error("Không lấy được trạng thái thông tin hồ sơ");
          return;
        }
        if (ck.data.TTCC_ID == 6) {
          this.$root.$toast.error(
            "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
          );
          return;
        }

        let ck_sl = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/check-ttcc-donghoso-tab3",
          { hscc_id: hscc_id }
        );
        if (ck_sl == null) {
          this.$root.$toast.error("Không lấy được danh sách cắt chuyển");
          return;
        }
        if (ck_sl.data.length > 0) {
          this.$root.$toast.error(
            "Trong danh sách hồ sơ vẫn còn thuê bao chưa hoàn thiện không thể đóng hồ sơ"
          );
          return;
        }
        this.$bvModal
          .msgBoxConfirm("Bạn có chắc chắn muốn đóng hồ sơ này ", {
            title: "Xác nhận hành động",
            centered: true,
            size: "sm",
          })
          .then(async (value) => {
            if (value) {
              try {
                await this.$root.context.post(
                  `/web-ecms/doicong-danhsach/donghoso-tab3?hscc_id=${hscc_id}`
                );
                this.$toast.success("Đóng hồ sơ thành công");
                this.LOAD_HOSO_CATCHUYEN2();
              } catch (ex1) {
                this.$root.$toast.error("Có lỗi khi đóng hồ sơ " + ex1);
              }
            } else {
              return;
            }
          });
      } catch (ex) {
        this.$root.toastError(
          "Có lỗi khi hoàn thiện hồ sơ " + ex.response.data.message_detail
        );
      }
    },
    GO_CONG: async function () {
      try {
        let getvisapass = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/func-get-pass-visa?maTB=1"
        );
        let pass_ftth = getvisapass.data;
        let loi_bnm = [];
        let header = {
          MA_TB: "MA_TB",
          THONGTIN_LOI: "THONGTIN_LOI",
        };
        loi_bnm.push(header);
        let check = await this.KIEMTRA_GANCONG(0);
        if (!check) {
          return;
        }

        //#region Lấy thông tin mã tb cần gán cổng
        let ds1 = this.selectedDSTab3;
        let ds_check = ds1.map((item) => {
          return { ...item };
        });
        ds_check = ds_check.filter(function (item) {
          return item.CHON === "s1" && item.DKCC_CHA_ID === null;
        });

        let json_list = ds_check.map((item) => ({ DKCC_ID: item.DKCC_ID }));
        let dem = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/kiemtra-list-inp-gocong-tab3",
          json_list
        );
        if (dem.data[0].COUNT !== 0) {
          this.$root.$toast.error(
            "Trong danh sách có thuê bao có trạng thái hoàn thành hoặc chưa cấp cổng không thể gỡ cổng"
          );
          return;
        }
        //#endregion
        this.$root.showLoading(true);
        let ds_con = this.selectedDSTab3;
        let ds = ds_con.map((item) => {
          return { ...item };
        });
        ds = ds.filter(function (item) {
          return item.CHON === "s1" && item.DKCC_CHA_ID === null;
        });
        let ds_con_dc = [];
        //VASCService vasc = new VASCService(tt_nd.user_vasc, tt_nd.pass_vasc, tt_nd.diemgiaodich_vasc);
        let count = ds_con.filter(function (item) {
          return item.DKCC_CHA_ID != null;
        });
        if (count.length > 0) {
          ds_con_dc = ds_con.filter(function (item) {
            return item.DKCC_CHA_ID != null;
          }); // === null
        }

        let tong = ds.length;
        //#region Quét từng row kiểm tra để quay ngược
        for (let i = ds.length - 1; i >= 0; i--) {
          //#region GOM LẠI

          //#region Check dữ liệu con
          let dem = 0;
          if (ds_con_dc != null && ds_con_dc.length > 0) {
            let dr = ds[i];
            let l = ds_con_dc.filter(function (item) {
              return (
                item.DKCC_CHA_ID !== dr.DKCC_ID &&
                item.PORT_ID_CU != 0 &&
                item.VCI_VPI_ID_CU != 0 &&
                (item.PORT_ID_CU != dr.PORT_ID_CU ||
                  item.VCI_VPI_ID_CU != dr.VCI_VPI_ID_CU)
              );
            });
            if (l.length > 0) {
              for (let j = 0; j < l.length; j++) {
                let row = l[j];
                if (row.NGAY_GP != null) {
                  try {
                    //#region cấu hình cổng cũ
                    let data = {
                      thuebao_id: row.THUEBAO_ID,
                      port_id: row.PORT_ID_CU,
                      vci_vpi_id: row.VCI_VPI_ID_CU,
                      loai_td: 1,
                      nguoi_kh: this.$auth.getUserName(),
                      chuyen_all: 0,
                      ds_tb: "",
                      trangthai: 0,
                      pass_ftth: pass_ftth,
                    };
                    let kq = await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/cauhinh-bnm",
                      data
                    );
                    console.log("cauhinh-bnm ", kq);
                    if (kq.data.RESULT == "ok") {
                      try {
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID_CU,
                          vci_vpi_id: row.VCI_VPI_ID_CU,
                          dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                          flag: 3,
                          nd:
                            "Đã gửi cấu hình cổng cũ thành công " +
                            row.THUEBAO_ID +
                            ": Cấu hình " +
                            0,
                          status: 1,
                        };
                        await this.$root.context.post(
                          `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                        );
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } catch (exxx) {
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID_CU,
                          vci_vpi_id: row.VCI_VPI_ID_CU,
                          dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                          flag: 3,
                          nd:
                            "Cấu hình cổng cũ thành công " +
                            row.THUEBAO_ID +
                            " không lưu được trạng thái ! " +
                            exxx +
                            "",
                          status: 0,
                        };
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI:
                            "Cấu hình cổng cũ thành công không lưu được trạng thái !" +
                            exxx,
                        };
                        loi_bnm.push(errr);
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                        dem += 1;
                      }
                    } else {
                      dem += 1;
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI:
                          "Có lỗi trong quá trình cấu hình !" +
                          kq.data.message_detail,
                      };
                      loi_bnm.push(errr);
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID_CU,
                        vci_vpi_id: row.VCI_VPI_ID_CU,
                        dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                        flag: 3,
                        nd:
                          "Có lỗi trong quá trình gửi cấu hình cổng cũ ! " +
                          kq.data.message_detail +
                          "",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    }
                    //#endregion
                  } catch (ex) {
                    dem += 1;
                    let errr = {
                      MA_TB: row.MA_TB,
                      THONGTIN_LOI: "Có lỗi trong quá trình cấu hình !" + ex,
                    };
                    loi_bnm.push(errr);
                    let log = {
                      ma_tb: row.MA_TB,
                      dkcc_id: row.DKCC_ID,
                      port_id: row.PORT_ID_CU,
                      vci_vpi_id: row.VCI_VPI_ID_CU,
                      dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                      flag: 3,
                      nd:
                        "Có lỗi trong quá trình gửi cấu hình cổng cũ !" +
                        ex +
                        "",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  }
                }
              }
            } else {
              let l_ = ds_con_dc.filter(function (item) {
                return (
                  item.DKCC_CHA_ID === ds[i].DKCC_ID &&
                  item.PORT_ID_CU != 0 &&
                  item.VCI_VPI_ID_CU != 0 &&
                  (item.PORT_ID_CU == ds[i].PORT_ID_CU ||
                    item.VCI_VPI_ID_CU == ds[i].VCI_VPI_ID_CU)
                );
              });
              if (l_.length > 0) {
                for (let row in l_) {
                  if (row.NGAY_GP != null) {
                    try {
                      //#region cấu hình cổng cũ
                      let data = {
                        thuebao_id: row.THUEBAO_ID,
                        port_id: row.PORT_ID_CU,
                        vci_vpi_id: row.VCI_VPI_ID_CU,
                        loai_td: 1,
                        nguoi_kh: this.$auth.getUserName(),
                        chuyen_all: 0,
                        ds_tb: "",
                        trangthai: 0,
                        pass_ftth: pass_ftth,
                      };
                      let kq = await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/cauhinh-bnm",
                        data
                      );
                      if (kq.data.RESULT == "ok") {
                        try {
                          await this.$root.context.post(
                            `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                          );

                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID_CU,
                            vci_vpi_id: row.VCI_VPI_ID_CU,
                            dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                            flag: 3,
                            nd:
                              "Đã gửi cấu hình cổng cũ thành công " +
                              row.THUEBAO_ID +
                              ": Cấu hình " +
                              0,
                            status: 1,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        } catch (exxx) {
                          let errr = {
                            MA_TB: row.MA_TB,
                            THONGTIN_LOI:
                              "Cấu hình cổng cũ thành công không lưu được trạng thái !" +
                              exxx,
                          };
                          loi_bnm.push(errr);
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID_CU,
                            vci_vpi_id: row.VCI_VPI_ID_CU,
                            dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                            flag: 3,
                            nd:
                              "Cấu hình cổng cũ thành công " +
                              row.THUEBAO_ID +
                              " không lưu được trạng thái !" +
                              exxx +
                              "",
                            status: 0,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                          dem += 1;
                        }
                      } else {
                        dem += 1;
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI:
                            "Có lỗi trong quá trình cấu hình !" +
                            kq.data.message_detail,
                        };
                        loi_bnm.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID_CU,
                          vci_vpi_id: row.VCI_VPI_ID_CU,
                          dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                          flag: 3,
                          nd:
                            "Có lỗi trong quá trình gửi cấu hình cổng cũ !" +
                            kq.data.message_detail +
                            "",
                          status: 0,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      }
                      //#endregion
                    } catch (ex) {
                      dem += 1;
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI: "Có lỗi trong quá trình cấu hình !" + ex,
                      };
                      loi_bnm.push(errr);
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID_CU,
                        vci_vpi_id: row.VCI_VPI_ID_CU,
                        dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                        flag: 3,
                        nd:
                          "Có lỗi trong quá trình gửi cấu hình cổng cũ !" +
                          ex +
                          "",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    }
                  }
                }
              }
            }
          }
          if (dem > 0) {
            ds.splice(ds[i], 1);
            continue;
          }
          //#endregion

          //#region Nếu ngày giải phóng có thì cấu hình lại cổng cũ
          if (ds[i].NGAY_GP != null) {
            try {
              //#region cấu hình cổng cũ
              let data = {
                thuebao_id: ds[i].THUEBAO_ID,
                port_id: ds[i].PORT_ID_CU,
                vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                loai_td: 1,
                nguoi_kh: this.$auth.getUserName(),
                chuyen_all: 0,
                ds_tb: "",
                trangthai: 0,
                pass_ftth: pass_ftth,
              };
              console.log("cauhinh data ", data);
              let kq = await this.$root.context.post(
                "/web-ecms/doicong-danhsach/cauhinh-bnm",
                data
              );
              if (kq.data.RESULT == "ok") {
                try {
                  await this.$root.context.post(
                    `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=0`
                  );
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID_CU,
                    vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                    flag: 3,
                    nd:
                      "Đã gửi cấu hình cổng cũ thành công " +
                      ds[i].THUEBAO_ID +
                      ": Cấu hình " +
                      0,
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                } catch (exxx) {
                  let errr = {
                    MA_TB: ds[i].MA_TB,
                    THONGTIN_LOI:
                      "Cấu hình cổng cũ thành công không lưu được trạng thái !" +
                      exxx,
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID_CU,
                    vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                    flag: 3,
                    nd:
                      "Cấu hình cổng cũ thành công " +
                      ds[i].THUEBAO_ID +
                      " không lưu được trạng thái !" +
                      exxx +
                      "",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                  ds.splice(ds[i], 1);
                  continue;
                }
              } else {
                let errr = {
                  MA_TB: ds[i].MA_TB,
                  THONGTIN_LOI:
                    "Có lỗi trong quá trình cấu hình  cổng cũ !" + kq,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: ds[i].MA_TB,
                  dkcc_id: ds[i].DKCC_ID,
                  port_id: ds[i].PORT_ID_CU,
                  vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                  dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                  flag: 3,
                  nd:
                    "Cấu hình cổng cũ thành công " +
                    ds[i].THUEBAO_ID +
                    " không lưu được trạng thái !" +
                    exxx +
                    "",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
                ds.splice(ds[i], 1);
                continue;
              }
              //#endregion
            } catch (ex) {
              let errr = {
                MA_TB: ds[i].MA_TB,
                THONGTIN_LOI: "Có lỗi trong quá trình cấu hình cổng cũ  !" + ex,
              };
              loi_bnm.push(errr);
              let log = {
                ma_tb: ds[i].MA_TB,
                dkcc_id: ds[i].DKCC_ID,
                port_id: ds[i].PORT_ID_CU,
                vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                flag: 3,
                nd: "Có lỗi trong quá trình gửi cấu hình cổng cũ !" + ex + "",
                status: 0,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
              ds.splice(ds[i], 1);
              continue;
            }
          }

          //#endregion

          //#region Nếu ngày cấu hình có thì giải phóng cổng mới
          if (ds[i].NGAY_CH != null) {
            try {
              let dstb = ds[i].THUEBAO_ID + ";";
              let vchuyenall = 0;
              if (ds_con_dc != null && ds_con_dc.length > 0) {
                var l = ds_con_dc.filter(function (item) {
                  return item.DKCC_CHA_ID == ds[i].DKCC_ID;
                });
                if (l.length > 0) {
                  vchuyenall = 1;
                  for (let row in l) {
                    dstb = dstb + row.THUEBAO_ID + ";";
                  }
                }
              }
              dstb = dstb.slice(0, -1);

              //#region cấu hình giải phóng cổng mới
              let data = {
                thuebao_id: ds[i].THUEBAO_ID,
                port_id: ds[i].PORT_ID,
                vci_vpi_id: ds[i].VCI_VPI_ID,
                loai_td: 1,
                nguoi_kh: this.$auth.getUserName(),
                chuyen_all: 0,
                ds_tb: "",
                trangthai: 0,
                pass_ftth: pass_ftth,
              };
              let kq = await this.$root.context.post(
                "/web-ecms/doicong-danhsach/cauhinh-bnm",
                data
              );
              if (kq.data.RESULT == "ok") {
                try {
                  await this.$root.context.post(
                    `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=0`
                  );
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID,
                    vci_vpi_id: ds[i].VCI_VPI_ID,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                    flag: 3,
                    nd:
                      "Đã gửi cấu hình giải phóng cổng mới thành công " +
                      ds[i].THUEBAO_ID +
                      ": Cấu hình " +
                      0,
                    status: 1,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                } catch (exxx) {
                  let errr = {
                    MA_TB: row.MA_TB,
                    THONGTIN_LOI:
                      "Cấu hình cổng cũ thành công không lưu được trạng thái !" +
                      exxx,
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID,
                    vci_vpi_id: ds[i].VCI_VPI_ID,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                    flag: 3,
                    nd:
                      "Cấu hình giải phóng cổng mới thành công " +
                      ds[i].THUEBAO_ID +
                      " không lưu được trạng thái !" +
                      exxx +
                      "",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                  ds.splice(ds[i], 1);
                  continue;
                }
              } else {
                let errr = {
                  MA_TB: ds[i].MA_TB,
                  THONGTIN_LOI:
                    "Có lỗi trong quá trình cấu hình giải phóng cổng mới !" +
                    kq,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: ds[i].MA_TB,
                  dkcc_id: ds[i].DKCC_ID,
                  port_id: ds[i].PORT_ID,
                  vci_vpi_id: ds[i].VCI_VPI_ID,
                  dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                  flag: 3,
                  nd:
                    "Có lỗi trong quá trình gửi cấu hình giải phóng cổng mới ! " +
                    kq +
                    "",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
                ds.splice(ds[i], 1);
                continue;
              }
              //#endregion
            } catch (ex) {
              let errr = {
                MA_TB: ds[i].MA_TB,
                THONGTIN_LOI:
                  "Có lỗi trong quá trình cấu hình giải phóng cổng mới  !" + ex,
              };
              loi_bnm.push(errr);
              let log = {
                ma_tb: ds[i].MA_TB,
                dkcc_id: ds[i].DKCC_ID,
                port_id: ds[i].PORT_ID,
                vci_vpi_id: ds[i].VCI_VPI_ID,
                dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                flag: 3,
                nd:
                  "Có lỗi trong quá trình gửi cấu hình giải phóng cổng mới! " +
                  ex +
                  "",
                status: 0,
              };
              await this.$root.context.post(
                "/web-ecms/doicong-danhsach/them-log-catchuyen",
                log
              );
              ds.splice(ds[i], 1);
              continue;
            }
          }
          //#endregion

          //#region Nếu ngày kích hoạt có
          if (ds[i].NGAY_KH != null) {
            let dem_vasc = 0;
            if (ds_con_dc != null && ds_con_dc.length > 0) {
              var l = ds_con_dc.filter(function (item) {
                return item.DKCC_CHA_ID == ds[i].DKCC_ID;
              });
              if (l.length > 0) {
                for (let row in l) {
                  //#region Kích hoạt con
                  if (row.PORT_ID_CU == null || row.NGAY_KH != null) {
                    continue;
                  }
                  if (
                    row.LOAITB_ID == 11 ||
                    row.LOAITB_ID == 58 ||
                    row.LOAITB_ID == 79
                  ) {
                    //LoaiHinhTB.INTERNET_ADSL  LoaiHinhTB.INTERNET_FTTH   LoaiHinhTB.WIFI_FIBER
                    //#region Thực hiện đổi cổng
                    let kieu_mega = row.KIEU_MEGA;
                    if (this.DONGBO_TEST == false && kieu_mega != 0) {
                      let loi_ = "";
                      let res = this.DoiCongAcccountVisa_cu(row);
                      if (res != "") {
                        dem_vasc += 1;
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                        };
                        loi_bnm.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Lỗi kích hoạt visa " + res,
                          status: 0,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } else {
                        //#region cập nhật status và lưu log
                        try {
                          await this.$root.context.post(
                            `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                          );
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID,
                            vci_vpi_id: row.VCI_VPI_ID,
                            dslam_vdc_id: row.DSLAM_VDC_ID,
                            flag: 2,
                            nd: "Kích hoạt thành công",
                            status: 1,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        } catch (ex) {
                          dem_vasc += 1;
                          let errr = {
                            MA_TB: row.MA_TB,
                            THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                          };
                          loi_bnm.push(errr);
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID,
                            vci_vpi_id: row.VCI_VPI_ID,
                            dslam_vdc_id: row.DSLAM_VDC_ID,
                            flag: 2,
                            nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                            status: 1,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        }
                        //#endregion
                      }
                    }
                    //#endregion
                  } else if (row.LOAITB_ID == 61) {
                    //LoaiHinhTB.INTERNET_MYTV
                    //#region Vasc
                    if (row.IP_CU == "") {
                      dem_vasc += 1;
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI:
                          "Chưa có thông tin về IP. Hãy kiểm tra lại !",
                      };
                      loi_bnm.push(errr);
                      continue;
                    }
                    if (this.DONGBO_TEST == false) {
                      let sPortDSL = "";
                      let shelf = "0";
                      if (row.SHELF_CU.trim() != "")
                        shelf = row.SHELF_CU.trim();
                      let vloaitbi_id = row.LOAITBI_ID_CU;
                      if (vloaitbi_id == 3) {
                        sPortDSL =
                          row.IP_CU +
                          " / " +
                          row.RACK_CU +
                          " / " +
                          row.SLOT_CU +
                          " / " +
                          row.PORT_OLD +
                          " / " +
                          row.VPI_CU;
                      } else
                        sPortDSL =
                          row.IP_CU +
                          " / " +
                          shelf +
                          " / " +
                          row.SLOT_CU +
                          " / " +
                          row.PORT_OLD;

                      let sDeviceName = row.SYSTEM_CU;
                      // hoangpkn : 30/07/2015 : Không cần truyền sPortDSL vẫn chạy (HCM vẫn truyền null). Do có truyền mà IP dslam sai. Vasc sẽ báo lỗi
                      //int result = vasc.UpdateDeviceInfo(txtMaTB.Text.Trim(), sDeviceName, "");
                      let loi_ = "";
                      let result = await this.UpdateDeviceInfo(
                        row.MA_TB,
                        sDeviceName,
                        sPortDSL
                      ); //nhapt mở 29/09/2016

                      if (result.res != 0) {
                        //lỗi
                        dem_vasc += 1;
                        let errr = {
                          MA_TB: row.MA_TB,
                          THONGTIN_LOI:
                            "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                            row.MA_TB +
                            " trên VASC !",
                        };
                        loi_bnm.push(errr);
                        let log = {
                          ma_tb: row.MA_TB,
                          dkcc_id: row.DKCC_ID,
                          port_id: row.PORT_ID,
                          vci_vpi_id: row.VCI_VPI_ID,
                          dslam_vdc_id: row.DSLAM_VDC_ID,
                          flag: 2,
                          nd: "Lỗi kích hoạt  " + result.err + "",
                          status: 0,
                        };
                        await this.$root.context.post(
                          "/web-ecms/doicong-danhsach/them-log-catchuyen",
                          log
                        );
                      } else {
                        //#region cập nhật status và lưu log
                        try {
                          await this.$root.context.post(
                            `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                          );
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID_CU,
                            vci_vpi_id: row.VCI_VPI_ID_CU,
                            dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                            flag: 2,
                            nd: "Kích hoạt thành công",
                            status: 1,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        } catch (ex) {
                          dem_vasc += 1;
                          let errr = {
                            MA_TB: row.MA_TB,
                            THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                          };
                          loi_bnm.push(errr);
                          let log = {
                            ma_tb: row.MA_TB,
                            dkcc_id: row.DKCC_ID,
                            port_id: row.PORT_ID_CU,
                            vci_vpi_id: row.VCI_VPI_ID_CU,
                            dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                            flag: 2,
                            nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                            status: 0,
                          };
                          await this.$root.context.post(
                            "/web-ecms/doicong-danhsach/them-log-catchuyen",
                            log
                          );
                        }
                        //#endregion
                      }
                    }
                    //#endregion
                  } else {
                    //#region cập nhật status và lưu log
                    try {
                      await this.$root.context.post(
                        `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                      );
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID_CU,
                        vci_vpi_id: row.VCI_VPI_ID_CU,
                        dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                        flag: 2,
                        nd: "Kích hoạt ảo thành công",
                        status: 1,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    } catch (ex) {
                      dem_vasc += 1;
                      let errr = {
                        MA_TB: row.MA_TB,
                        THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                      };
                      loi_bnm.push(errr);
                      let log = {
                        ma_tb: row.MA_TB,
                        dkcc_id: row.DKCC_ID,
                        port_id: row.PORT_ID_CU,
                        vci_vpi_id: row.VCI_VPI_ID_CU,
                        dslam_vdc_id: row.DSLAM_VDC_ID_CU,
                        flag: 2,
                        nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                        status: 0,
                      };
                      await this.$root.context.post(
                        "/web-ecms/doicong-danhsach/them-log-catchuyen",
                        log
                      );
                    }
                    //#endregion
                  }
                  //#endregion
                }
              }
            }
            if (dem_vasc > 0) {
              ds.splice(ds[i], 1);
              continue;
            }
            //#region Kích hoạt con
            if (ds[i].PORT_ID_CU == null) {
              continue;
            }
            //if (ds[i].LOAITB_ID == LoaiHinhTB.INTERNET_ADSL || ds[i].LOAITB_ID == LoaiHinhTB.INTERNET_FTTH || ds[i].LOAITB_ID == LoaiHinhTB.WIFI_FIBER)
            if (
              ds[i].LOAITB_ID == 11 ||
              ds[i].LOAITB_ID == 58 ||
              ds[i].LOAITB_ID == 79
            ) {
              //LoaiHinhTB.INTERNET_ADSL  LoaiHinhTB.INTERNET_FTTH   LoaiHinhTB.WIFI_FIBER
              //#region Thực hiện đổi cổng
              let kieu_mega = ds[i].KIEU_MEGA;
              if (this.DONGBO_TEST == false && kieu_mega != 0) {
                let loi_ = "";
                let res = this.DoiCongAcccountVisa_cu(ds[i]);
                if (res != "") {
                  let errr = {
                    MA_TB: ds[i].MA_TB,
                    THONGTIN_LOI: "Lỗi kích hoạt :" + res,
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID,
                    vci_vpi_id: ds[i].VCI_VPI_ID,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                    flag: 2,
                    nd: "Lỗi kích hoạt visa " + res,
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                  ds.splice(ds[i], 1);
                  continue;
                } else {
                  //#region cập nhật status và lưu log
                  try {
                    await this.$root.context.post(
                      `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                    );
                    let log = {
                      ma_tb: ds[i].MA_TB,
                      dkcc_id: ds[i].DKCC_ID,
                      port_id: ds[i].PORT_ID,
                      vci_vpi_id: ds[i].VCI_VPI_ID,
                      dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Kích hoạt thành công",
                      status: 1,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  } catch (ex) {
                    let errr = {
                      MA_TB: ds[i].MA_TB,
                      THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                    };
                    loi_bnm.push(errr);
                    let log = {
                      ma_tb: ds[i].MA_TB,
                      dkcc_id: ds[i].DKCC_ID,
                      port_id: ds[i].PORT_ID,
                      vci_vpi_id: ds[i].VCI_VPI_ID,
                      dslam_vdc_id: ds[i].DSLAM_VDC_ID,
                      flag: 2,
                      nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                    ds.splice(ds[i], 1);
                    continue;
                  }
                  //#endregion
                }
              }
              //#endregion
            } else if (ds[i].LOAITB_ID == 61) {
              //LoaiHinhTB.INTERNET_MYTV
              //else if (Convert.ToInt32(dr["LOAITB_ID"]) == LoaiHinhTB.INTERNET_MYTV)
              //#region Vasc
              if (ds[i].IP_CU == "") {
                let errr = {
                  MA_TB: ds[i].MA_TB,
                  THONGTIN_LOI: "Chưa có thông tin về IP. Hãy kiểm tra lại !",
                };
                loi_bnm.push(errr);
                ds.splice(ds[i], 1);
                continue;
              }
              if (this.DONGBO_TEST == false) {
                let sPortDSL = "";
                let shelf = "0";
                if (ds[i].SHELF_CU.trim() != "") shelf = ds[i].SHELF_CU.trim();
                let vloaitbi_id = ds[i].LOAITBI_ID_CU;
                if (vloaitbi_id == 3) {
                  sPortDSL =
                    ds[i].IP_CU +
                    " / " +
                    ds[i].RACK_CU +
                    " / " +
                    ds[i].SLOT_CU +
                    " / " +
                    ds[i].PORT_OLD +
                    " / " +
                    ds[i].VPI_CU;
                } else
                  sPortDSL =
                    ds[i].IP_CU +
                    " / " +
                    shelf +
                    " / " +
                    ds[i].SLOT_CU +
                    " / " +
                    ds[i].PORT_OLD;
                let sDeviceName = ds[i].SYSTEM_CU;

                // hoangpkn : 30/07/2015 : Không cần truyền sPortDSL vẫn chạy (HCM vẫn truyền null). Do có truyền mà IP dslam sai. Vasc sẽ báo lỗi
                //int result = vasc.UpdateDeviceInfo(txtMaTB.Text.Trim(), sDeviceName, "");
                let loi_ = "";
                //let result = vasc.UpdateDeviceInfo(ds[i].MA_TB, sDeviceName, sPortDSL, out loi_); //nhapt mở 29/09/2016
                let result = await this.UpdateDeviceInfo(
                  row.MA_TB,
                  sDeviceName,
                  sPortDSL
                ); //nhapt mở 29/09/2016

                if (result.res != 0) {
                  //lỗi
                  let errr = {
                    MA_TB: ds[i].MA_TB,
                    THONGTIN_LOI:
                      "Có lỗi trong quá trình cập nhật thông tin cổng thuê bao " +
                      dr["MA_TB"] +
                      " trên VASC !",
                  };
                  loi_bnm.push(errr);
                  let log = {
                    ma_tb: ds[i].MA_TB,
                    dkcc_id: ds[i].DKCC_ID,
                    port_id: ds[i].PORT_ID_CU,
                    vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                    dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                    flag: 2,
                    nd: "Lỗi kích hoạt  " + result.err + "",
                    status: 0,
                  };
                  await this.$root.context.post(
                    "/web-ecms/doicong-danhsach/them-log-catchuyen",
                    log
                  );
                  ds.splice(ds[i], 1);
                  continue;
                } else {
                  //#region cập nhật status và lưu log
                  try {
                    await this.$root.context.post(
                      `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                    );
                    let log = {
                      ma_tb: ds[i].MA_TB,
                      dkcc_id: ds[i].DKCC_ID,
                      port_id: ds[i].PORT_ID_CU,
                      vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                      dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                      flag: 2,
                      nd: "Kích hoạt thành công",
                      status: 1,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                  } catch (ex) {
                    let errr = {
                      MA_TB: ds[i].MA_TB,
                      THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                    };
                    loi_bnm.push(errr);
                    let log = {
                      ma_tb: ds[i].MA_TB,
                      dkcc_id: ds[i].DKCC_ID,
                      port_id: ds[i].PORT_ID_CU,
                      vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                      dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                      flag: 2,
                      nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                      status: 0,
                    };
                    await this.$root.context.post(
                      "/web-ecms/doicong-danhsach/them-log-catchuyen",
                      log
                    );
                    ds.splice(ds[i], 1);
                    continue;
                  }
                  //#endregion
                }
              }
              //#endregion
            } else {
              //#region cập nhật status và lưu log
              try {
                await this.$root.context.post(
                  `/web-ecms/doicong-danhsach/capnhat-dk-catchuyen?dkcc_id=${row.DKCC_ID}&type=1`
                );
                let log = {
                  ma_tb: ds[i].MA_TB,
                  dkcc_id: ds[i].DKCC_ID,
                  port_id: ds[i].PORT_ID_CU,
                  vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                  dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                  flag: 2,
                  nd: "Kích hoạt ảo thành công",
                  status: 1,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
              } catch (ex) {
                let errr = {
                  MA_TB: ds[i].MA_TB,
                  THONGTIN_LOI: "Lỗi đổi trạng thái " + ex,
                };
                loi_bnm.push(errr);
                let log = {
                  ma_tb: ds[i].MA_TB,
                  dkcc_id: ds[i].DKCC_ID,
                  port_id: ds[i].PORT_ID_CU,
                  vci_vpi_id: ds[i].VCI_VPI_ID_CU,
                  dslam_vdc_id: ds[i].DSLAM_VDC_ID_CU,
                  flag: 2,
                  nd: "Kích hoạt thành công, lỗi thay đổi trạng thái",
                  status: 0,
                };
                await this.$root.context.post(
                  "/web-ecms/doicong-danhsach/them-log-catchuyen",
                  log
                );
                ds.splice(ds[i], 1);
                continue;
              }
              //#endregion
            }
            //#endregion
          }
          //#endregion
          //#endregion
        }
        //#endregion

        if (ds.length > 0) {

          let json_list = ds.map((item) => ({ DKCC_ID: item.DKCC_ID, MA_TB: item.MA_TB,
            ONT_ID: item.ONT_ID, PORTVL_ID: item.PORTVL_ID, PORT_ID: item.PORT_ID,
            THIETBI_ID: item.THIETBI_ID, VCI_VPI_ID: item.VCI_VPI_ID}));
          let hscc_id = this.arrayCBO.cboHoSoTab3;
          try {
            let kq = await this.$root.context.post(
              `/web-ecms/doicong-danhsach/capnhat-go-cong-catchuyen?kieu=2&hsccId=${hscc_id}`,
              json_list
            );
            if (kq.data.result == true) {
              this.$root.$toast.success("Đã thực hiện xong gỡ cổng");
              if (loi_bnm != null && loi_bnm.length > 1) {
                this.errExcel.dataEx = []
                this.errExcel.dataEx = loi_bnm;
                this.$bvModal
                  .msgBoxConfirm(
                    "Đã thực hiện xong. Bạn có muốn xuất file danh sách bị lỗi không?",
                    {
                      title: "Xác nhận hành động",
                      centered: true,
                      size: "sm",
                    }
                  )
                  .then(async (value) => {
                    if (value) {
                      document.getElementById("exporterror").click();
                    } else {
                      return "404";
                    }
                  });
              }
              await this.NAP_DS_THUEBAO_CAPCONG(hscc_id);
              await this.NAP_DS_PORT_FQH();
              // this.NAP_DS_LUOI_VCIVPI();
            } else {
              if (loi_bnm != null && loi_bnm.length > 1) {
                this.errExcel.dataEx = []
                this.errExcel.dataEx = loi_bnm;
                this.$bvModal
                  .msgBoxConfirm(
                    "Đã thực hiện xong. Bạn có muốn xuất file danh sách bị lỗi không?",
                    {
                      title: "Xác nhận hành động",
                      centered: true,
                      size: "sm",
                    }
                  )
                  .then(async (value) => {
                    if (value) {
                      document.getElementById("exporterror").click();
                    } else {
                      return "404";
                    }
                  });
              } else {
                this.$root.$toast.error(
                  "Có lỗi khi gỡ cổng: " + kq.message_detail
                );
              }
            }
          } catch (error) {
            this.$root.$toast.error(error);
          }
        } else {
          this.$root.$toast.error("Có lỗi khi  gỡ cổng");
        }
      } catch (ex) {
        this.$root.toastError(
          "Có lỗi khi gỡ cổng " + ex.response.data.message_detail
        );
      } finally {
        this.$root.showLoading(false);
      }
    },
    goCong: async function () {
      await this.GO_CONG();
    },
    ganCong: async function () {
      try {
        let check = await this.KIEMTRA_GANCONG(1);
        if (!check) {
          return;
        }
        //Lấy thông tin mã tb cần gán cổng
        let ds = this.selectedDSTab3;
        let ds_check = ds.map((item) => {
          return { ...item };
        });
        ds_check = ds_check.filter(function (item) {
          return item.CHON == "s1" && item.DKCC_CHA_ID == null;
        });

        const key = [
          "BRAS_VDC_ID",
          "BRAS_VDC_ID_CU",
          "CHON",
          "DIACHI_LD",
          "DICHVUVT_ID",
          "DKCC_CHA_ID",
          "DSLAM",
          "DSLAM_CU",
          "DSLAM_VDC_ID",
          "DSLAM_VDC_ID_CU",
          "IP",
          "IP_CU",
          "KIEU_MEGA",
          "LOAIHINH_TB",
          "LOAITBI_ID",
          "LOAITBI_ID_CU",
          "LOAITB_ID",
          "LOG_KH",
          "MADOICAP",
          "MA_LT",
          "ONT_ID",
          "ONT_ID_CU",
          "ONT_ID_MOI",
          "PORT",
          "PORTVL_ID",
          "PORTVL_ID_CU",
          "PORT_CU",
          "PORT_ID",
          "PORT_ID_CU",
          "PORT_MOI",
          "PORT_OLD",
          "RACK",
          "RACK_CU",
          "RACK_VDC",
          "TRANGTHAI_KH_ID",
          "TRANGTHAI_CC",
          "TOCDO",
          "THUEBAO_ID",
          "THIETBI_ID",
          "THAMSO_CU",
          "THAMSO",
          "TEN_TB",
          "TEMP_KH",
          "SYSTEM_VDC",
          "SYSTEM_CU",
          "SYSTEM",
          "STATUS",
          "SLOT_CU",
          "SLOT",
          "SHELF_CU",
          "SHELF",
          "TRANGTHAI_TB",
          "VCI",
          "VCI_CU",
          "VCI_VPI_ID",
          "VCI_VPI_ID_CU",
          "VPI",
          "VPI_CU",
          "VPI_VCI_CU",
          "VPI_VCI_MOI",
        ];

        let dt_ch = ds_check.map((item) => {
          return { ...item };
        });

        dt_ch.forEach((entry) => {
          key.forEach((e) => delete entry[e]);
        });
        let ds_gancong = [];
        let port_td = this.LAY_TS_PORTD()//this.arrayCBO.cboDslamPort.PORT_TD; //this.LAY_TS_PORTD()
        console.log('port_tdport_tdport_tdport_td ',port_td)
        let ds_p = [];
        let ds_vcivpi = [];
        if (port_td == 0) {
          //#region Lấy thông tin port và vci_vpi quy hoạch
          ds_p = this.arrayDataGrids.dsLuoiPortTab3;
          let ds_check_vcivpi = [];
          let ds_check_port = ds_p.filter(function (item) {
            return item.ISCHECK == "1";
          });
          if (this.arrayDataToCbo.cboTrangthaiVCIVPITab3 != 4) {
            ds_vcivpi = this.arrayDataGrids.dsVCIVPITab3;
            ds_check_vcivpi = ds_vcivpi.filter(function (item) {
              return item.CHON == "1";
            });
          } else {
            for (let i = 0; i < ds_check.length; i++) {
              let data = {
                DKCC_ID: ds_check[i].DKCC_ID,
                VCI_VPI_ID: ds_check[i].VCI_VPI_ID_CU,
              };
              ds_check_vcivpi.push(data);
            }
          }

          for (let i = 0; i < dt_ch.length; i++) {
            let data = {
              DKCC_ID: dt_ch[i].DKCC_ID,
              PORTVL_ID: ds_check_port[i].PORTVL_ID,
              PORT_ID: ds_check_port[i].PORT_ID,
              VCI_VPI_ID:
                this.arrayDataToCbo.cboTrangthaiVCIVPITab3 !== "4"
                  ? ds_check_vcivpi[i].VCI_VPI_ID
                  : ds_check_vcivpi.filter(function (item) {
                    return item.DKCC_ID == dt_ch[i].DKCC_ID;
                  })[0].VCI_VPI_ID,
              MA_TB: dt_ch[i].MA_TB,
              ONT_ID: ds_check_port[i].ONT_ID,
              THIETBI_ID: this.arrayDataToCbo.cboDslamTab3,
              ADSL_PORT: "",
            };
            ds_gancong.push(data);
          }
          //#endregion
        } else {
          //#region Lấy thông tin port và vci_vpi fix
          ds_p = this.selectedPortFix;
          let ds_check_port = ds_p.filter(function (item) {
            return item.ISCHECK == "1";
          }); //1

          for (let i = 0; i < dt_ch.length; i++) {
            let data = {
              DKCC_ID: dt_ch[i].DKCC_ID,
              PORTVL_ID: ds_check_port[i].PORTVL_ID,
              PORT_ID: ds_check_port[i].PORT_ID,
              VCI_VPI_ID: ds_check_port[i].VCI_VPI_ID,
              MA_TB: dt_ch[i].MA_TB,
              ONT_ID: ds_check_port[i].PORT_MDF,
              THIETBI_ID: this.arrayCBO.cboDslamIDDsPort,
              ADSL_PORT: ds_check_port[i].ADSL_PORT,
            };

            ds_gancong.push(data);
          }
          //#endregion
        }
        let hscc_id = this.arrayCBO.cboHoSoTab3;
        let json_list = ds_gancong;
        let rs = await this.$root.context.post(
          `/web-ecms/doicong-danhsach/capnhat-gan-cong-catchuyen?kieu=1&hsccId=${hscc_id}`,
          json_list
        );
        if (rs.data.result === true) {
          this.$root.$toast.success("Gán cổng thành công");
          if (port_td == 0) {
            //#region Port QH
            let t = ds_p.filter(function (item) {
              return item.ISCHECK == "0";
            });
            if (t.length == 0) {
              this.arrayDataGrids.dsLuoiPortTab3 = [];
            } else {
              this.arrayDataGrids.dsLuoiPortTab3 = t;
            }
            if (this.arrayCBO.cboTrangthaiVCIVPITab3 != 4) {
              let t_ = ds_vcivpi.filter(function (item) {
                return item.CHON == "0";
              });
              if (t_.length == 0) {
                this.arrayDataGrids.dsVCIVPITab3 = [];
              } else {
                this.arrayDataGrids.dsVCIVPITab3 = _t;
              }
            } else {
              this.arrayDataGrids.dsVCIVPITab3 = [];
            }
            //#endregion
          } else {
            //#region Port Fixx
            var t = ds_p.filter(function (item) {
              return item.ISCHECK == "0";
            });
            if (t.length == 0) {
              this.arrayDataGrids.dsPortFixTab3 = [];
            } else {
              this.arrayDataGrids.dsPortFixTab3 = t;
            }
            //#endregion
          }
          if (this.dslamSelected != null) {
            this.arrayCBO.cboDslamIDDsPort = this.dslamSelected.DSLAM_ID;
            this.arrayCBO.cboDslamPort = this.dslamSelected;
            let port_td = this.dslamSelected.PORT_TD;
            this.sPort_TD = this.dslamSelected.PORT_TD;
            if (port_td === -1) return;
            if (port_td === 1) {
              this.sPort_TD = true;
              await this.NAP_DS_PORT_FIX();
            } else {
              this.sPort_TD = false;
              this.enableSelectFollowPortTD = true;
              this.enableSelectFollowPortTD = true;
              await this.NAP_DS_LUOI_PORT();
              await this.NAP_DS_LUOI_VCIVPI();
            }
          }
          await this.NAP_DS_THUEBAO_CAPCONG(hscc_id);
        } else {
          this.$root.$toast.error("Có lỗi khi gán cổng: " + rs.message_detail);
        }
      } catch (error) {
        this.$root.toastError(
          "Có lỗi khi gán cổng " + error.response.data.message_detail
        );
      }
    },
    KIEMTRA_GANCONG: async function (kieu) {
      try {
        let ck = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/lay_trangthai_catchuyen_id",
          { hscc_id: this.ttcc_id }
        );
        if (ck == null || ck.data.length == 0) {
          this.$root.$toast.error("Không lấy được trạng thái thông tin hồ sơ");
          return false;
        }

        console.log("1");
        if (ck.data.TTCC_ID == 6) {
          this.$root.$toast.error(
            "Trạng thái hồ sơ đã hoàn thành không thể cập nhật"
          );
          return false;
        }
        console.log("2");

        //#region Kiểm tra số lượng cổng chọn với số lượng thuê bao khớp nhau không
        let ds = [...this.selectedDSTab3]; //this.arrayDataGrids.dsHoSoTab3
        //let ds = this.arrayDataGrids.dsHoSoTab3.filter(item => item.CHON === "s1")
        if (ds == null) {
          this.$root.$toast.error(
            "Chưa có thuê bao không thể gán/gỡ/hoàn thiện/kích hoạt khi đổi cổng"
          );
          return false;
        }
        console.log("3");

        console.log("dsgancongcheck before ", ds);
        let t = ds.filter(function (item) {
          return item.CHON == "s1" && item.DKCC_CHA_ID == null;
        }); //s1
        console.log("dsgancongcheck ", t);
        if (t.length == 0) {
          this.$root.$toast.error(
            "Chưa có thuê bao được chọn không thể gán/gỡ/hoàn thiện/kích hoạt khi đổi cổng"
          );
          return false;
        }
        console.log("4");
        let dem_tb = t.length;
        let ds_port_chon = 0;
        let ds_vci_chon = 0;

        if (kieu == 1) {
          // gán
          let port_td = this.arrayCBO.cboDslamPort.PORT_TD; //this.LAY_TS_PORTD();
          console.log("port_td GanCong ", port_td);
          if (port_td == -1) {
            this.$root.$toast.error("Không lấy được thông tin port td");
            return false;
          }
          if (port_td == 0) {
            //#region Port Quy hoạch
            let port = this.arrayDataGrids.dsLuoiPortTab3;
            if (port == null) {
              this.$root.$toast.error("Chưa có port không thể gán cổng");
              return false;
            }

            let t_p = port.filter(function (item) {
              return item.ISCHECK == "1";
            });
            if (t_p.length == 0) {
              this.$root.$toast.error(
                "Chưa có port được chọn không thể gán cổng"
              );
              return false;
            }
            ds_port_chon = t_p.length;

            let vci = this.arrayDataGrids.dsVCIVPITab3;
            if (this.arrayCBO.cboTrangthaiVCIVPITab3 != 4) {
              if (vci == null) {
                this.$root.$toast.error("Chưa có vci/vpi không thể gán cổng");
                return false;
              }

              let t_v = vci.filter(function (item) {
                return item.CHON == "1";
              });

              if (
                t_v.length == 0 &&
                this.arrayCBO.cboTrangthaiVCIVPITab3 != 4
              ) {
                this.$root.$toast.error(
                  "Chưa có vci/vpi được chọn không thể gán cổng"
                );
                return false;
              }
              ds_vci_chon = t_v.length;
            } else {
              if (vci != null && vci.length > 0) {
                this.$root.$toast.error(
                  "Với trạng thái giữ vci/vpi. Không được phép chọn"
                );
                return false;
              }
            }

            if (
              dem_tb != ds_port_chon ||
              (dem_tb != ds_vci_chon &&
                this.arrayCBO.cboTrangthaiVCIVPITab3 != 4)
            ) {
              this.$root.$toast.error(
                "Số lượng port, vci vpi không khớp với số lượng thuê bao"
              );
              return false;
            }
            //#endregion
          } else {
            //#region Port fix
            var port = this.selectedPortFix;
            //let port = this.arrayDataGrids.dsPortFixTab3.filter(item => item.ISCHECK === "1")
            if (port.length == 0) {
              this.$root.$toast.error("Chưa có port không thể gán cổng");
              return false;
            }

            let t_p = this.selectedPortFix.filter(
              (item) => item.ISCHECK === "1"
            );
            if (t_p.length == 0) {
              this.$root.$toast.error(
                "Chưa có port được chọn không thể gán cổng"
              );
              return false;
            }
            ds_port_chon = t_p.length;
            console.log("dem_tb ", dem_tb);
            console.log("ds_port_chon ", ds_port_chon);
            if (dem_tb != this.arraySelectedItem.soPort) {
              this.$root.$toast.error(
                "Số lượng port vci vpi không khớp với số lượng thuê bao"
              );
              return false;
            }
            //#endregion
          }
        }
        //#endregion
        // Kiểm tra trạng thái port chọn có đúng ko, đúng mới làm

        return true;
      } catch (ex) {
        this.$root.toastError(
          "Có lỗi khi kiểm tra gán cổng " + ex.response.data.message_detail
        );
        return false;
      }
    },
    ChuanHoa_XML: function (Xau) {
      let result = "";
      result = Xau.replace("&", "&amp;");
      result = result.replace("<", "&lt;");
      result = result.Replace(">", "&gt;");
      result = result.Replace("'", "&apos;");
      return result;
    },
    UpdateDeviceInfo: async function (iptvac, devicename, portID) {
      let l = "";
      let kq = await this.$root.context.post(
        `/web-ecms/doicong-danhsach/update-device-info?iptvac=${iptvac}&devicename=${devicename}&portID=${portID}`
      );

      // if (kq.Result != 0)
      // {
      //     if (obj.Result == 1)
      //     {
      //         l="Tài khoản " + IPTVAccount + " không tồn tại trên hệ thống !";
      //     }
      //     else
      //     {
      //         l=obj.Errordesc.ToString();
      //     }
      // }
      // return obj.Result;
      return {
        res: kq.data,
        err: "",
      };
    },
    DangNhapVisa: async function () {},
    DoiCongMegavnn4: async function (
      account,
      PORT,
      VCI,
      VPI,
      SLOT,
      BrasId,
      DslamId
    ) {
      try {
        let serviceObj = [
          { type: "PORT", value: PORT },
          { type: "VCI", value: VCI },
          { type: "VPI", value: VPI },
          { type: "SLOT", value: SLOT },
          { type: "DSLAM-ID", value: DslamId },
          { type: "BRAS-ID", value: BrasId },
          { type: "PARAMETER", value: "VISANEW" },
        ];

        let visaLogin = {
          userId: "111",
          password: "2222",
        };
        let data = {
          visaLogin: visaLogin,
          account: account,
          serviceObj: serviceObj,
        };
        this.DangNhapVisa();
        await this.$root.context.post(
          "/web-ecms/danhmuc/cap-nhat-port/change-port-megavnn",
          data
        );
      } catch (error) {
        if (
          error.includes("Không có sự thay đổi") ||
          error.includes("Đối tượng [Dịch vụ khách hàng] không tồn tại")
        )
          //Đã tồn tại ngày rồi
          return {
            rs: true,
            errr: "",
          };
        else {
          this.$root.$toast.error("Có lỗi xảy ra: " + error);
          return {
            rs: false,
            errr: error,
          };
        }
      }
      return {
        rs: true,
        errr: "",
      };
    },
    DoiCongAcccountVisa: async function (dr) {
      let loi = "";
      try {
        // CheckDataFacade obj = new CheckDataFacade();
        // VDCService vdcService = new VDCService(tt_nd.user_visa, tt_nd.pass_visa);
        console.log("dr",dr)
        let account = dr.MA_TB;
        let port = dr.PORT;
        // let vci = this.ChuanHoa_XML(dr.VCI);
        // let vpi = this.ChuanHoa_XML(dr.VPI);
        // let slot = this.ChuanHoa_XML(dr.SLOT);
        let vci = dr.VCI;
        let vpi = dr.VPI;
        let slot = dr.SLOT;
        let brasId = dr.BRAS_VDC_ID;
        let dslam_vdc_Id = dr.DSLAM_VDC_ID;

        //Tham so them cho dang ky 7 tham so

        //Kiem tra xem dang ky 4 tham so hay 7 tham so
        let thamso = dr.THAMSO_CU;
        console.log("thamso:", thamso)

        let l = "";
        if (thamso == 4) {
          let res = this.DoiCongMegavnn4(
            account,
            port,
            vci,
            vpi,
            slot,
            brasId,
            dslam_vdc_Id
          );
          if (!res.rs) {
            loi = res.errr;
            return loi;
          } else {
            loi = "";
            return loi;
          }
        } else {
          loi = "Khác 4 tham số chưa được xây dựng";
          return loi;
        }
        return loi;
      } catch (ex) {
        loi =
          "Có lỗi xảy ra trong quá trình đổi cổng account trên Visa.\n" + ex;
        return loi;
      }
    },
    DoiCongAcccountVisa_cu: async function (dr) {
      let loi = "";
      try {
        // CheckDataFacade obj = new CheckDataFacade();
        // VDCService vdcService = new VDCService(tt_nd.user_visa, tt_nd.pass_visa);
        let account = this.ChuanHoa_XML(dr.MA_TB);
        let port = dr.PORT_OLD;
        let vci = this.ChuanHoa_XML(dr.VCI_CU);
        let vpi = this.ChuanHoa_XML(dr.VPI_CU);
        let slot = this.ChuanHoa_XML(dr.SLOT_CU);
        let brasId = dr.BRAS_VDC_ID_CU;
        let dslam_vdc_Id = dr.DSLAM_VDC_ID_CU;

        //Tham so them cho dang ky 7 tham so

        //Kiem tra xem dang ky 4 tham so hay 7 tham so
        let thamso = dr.THAMSO_CU;
        let l = "";
        if (thamso == 4) {
          let res = this.DoiCongMegavnn4(
            account,
            port,
            vci,
            vpi,
            slot,
            brasId,
            dslam_vdc_Id
          );
          if (!res.rs) {
            loi = res.errr;
            return loi;
          } else {
            loi = "";
            return loi;
          }
        } else {
          loi = "Khác 4 tham số chưa được xây dựng";
          return loi;
        }
      } catch (ex) {
        loi =
          "Có lỗi xảy ra trong quá trình đổi cổng account trên Visa.\n" + ex;
        return loi;
      }
    },
    changeTramTbi: async function () {
      await this.NAP_DS_DSLAM();
    },
    changeDslam: async function (selectedIndex) {
      try {
        this.loading(true);
        let dslamTinh = this.arrayDataToCbo.dsDslamTab3;
        console.log("dslamTinh ", dslamTinh);
        let selectedDslam = dslamTinh[selectedIndex];
        this.enableSelectFollowPortTD = false;
        this.enableSelectFollowPortTD = false;
        if (dslamTinh == null) {
          this.arrayDataGridsdsLuoiPortTab3 = [];
          return;
        }
        if (dslamTinh.length > 0) {
          if (selectedDslam != null) {
            this.arrayCBO.cboDslamIDDsPort = selectedDslam.DSLAM_ID;
            this.arrayCBO.cboDslamPort = selectedDslam;
            let port_td = selectedDslam.PORT_TD;
            console.log("aaaaaaaaaaaaaaaaaaaaaaa ", port_td);
            if (port_td == -1) return;
            if (port_td === 1) {
              this.NAP_DS_PORT_FIX();
            } else {
              this.enableSelectFollowPortTD = true;
              this.enableSelectFollowPortTD = true;
              this.NAP_DS_LUOI_PORT();
              this.NAP_DS_LUOI_VCIVPI();
            }
          }
        }
      } catch (ex) {
        this.$root.toastError(
          "Có lỗi khi kiểm tra gán cổng " + ex.response.data.message_detail
        );
      } finally {
        this.loading(false);
      }
    },
    changeCboTrangthaiVCIVPI: async function () {
      this.NAP_DS_LUOI_VCIVPI();
    },
    changeCboKieuQH: async function () {
      this.NAP_DS_LUOI_VCIVPI();
    },
    changeCboLoaiQH: async function () {
      this.NAP_DS_LUOI_VCIVPI();
    },
    NAP_DS_DSLAM: async function () {
      try {
        this.loading(true);
        let tramtbId = this.arrayCBO.cboTramTBTab3;
        console.log('tramtbId ',tramtbId)
        let ck = await this.$root.context.get("/web-ecms/doicong-danhsach/lay-ds-dslam",{ tramtbId: tramtbId });
        console.log('dslam ',ck)
        if (ck.data.length > 0) {
          this.visibleGridTab3 = true;
          this.arrayDataToCbo.dsDslamTab3 = ck.data;
          this.arrayCBO.cboDslamTab3 = ck.data[0].DSLAM_ID;
          let port_td = ck.data[0].PORT_TD;
          if (port_td === 1) {
            this.sPort_TD = true;
          } else {
            this.sPort_TD = false;
          }
        } else {
          this.visibleGridTab3 = false;
          this.arrayDataToCbo.dsDslamTab3 = [];
          this.arrayCBO.cboDslamTab3 = -1;
        }
        console.log('ckckckck',this.arrayCBO.cboDslamTab3)
      } catch (e) {
        this.$root.toastError("Có lỗi " + e.response.data.message_detail);
      } finally {
        this.loading(false);
      }
    },
    NAP_DS_LUOI_PORT: async function () {
      try {
        this.loading(true);
        let dtDslam = this.arrayDataToCbo.dsDslamTab3;
        let loatb_id;
        if (dtDslam.length > 0) {
          loatb_id = dtDslam[0].LOAITBI_ID;
        }
        let dslamId = this.arrayCBO.cboDslamTab3;
        if (loatb_id != null && dslamId != null) {
          let ck = await this.$root.context.get(
            `/web-ecms/doicong-danhsach/lay-ds-luoi-port?dslamId=${dslamId}&loaitbId=${loatb_id}`
          );
          //let ck = await this.$root.context.get(`/web-ecms/doicong-danhsach/lay-ds-luoi-port?dslamId=40284&loaitbId=3`)
          console.log("ckkkkkkkkkkkkkkkkkkkk1 ", ck);
          if (ck.error_code == "BSS-00000000") {
            this.arrayDataGrids.dsLuoiPortTab3 = ck.data;
          } else {
            this.$root.$toast.error(ck.message_detail);
          }
        }
      } catch (e) {
        this.$root.toastError(
          "Có lỗi xẩy ra: " + e.response.data.message_detail
        );
      } finally {
        this.loading(false);
      }
    },
    LOAD_HOSO_CATCHUYEN2: async function () {
      try {
        this.loading(true);
        let maTB = "";
        let input = this.arrayInputTab1.soMayAcc;
        if (input != "" && this.activetab == 3) {
          let dsTB = await this.$root.context.get(
            "/web-ecms/doicong-danhsach/lay-ds-thuebao",
            { matb: input }
          );
          if (dsTB.data.length > 0) {
            maTB = dsTB.data[0].MA_TB;
          } else {
            this.$root.toastError(
              "Không tìm thấy số máy/acc/ mã men " + input + " "
            );
            return;
          }
        }
        let data = {
          maThueBao: maTB,
          cboTths: this.arrayCBO.cboTTHS,
          tuNgay:
            this.activetab == 3
              ? this.convertDate2String(this.arrayDate.fromDate)
              : this.convertDate2String(this.arrayDate.fromDate),
          denNgay:
            this.activetab == 3
              ? this.convertDate2String(this.arrayDate.toDate)
              : this.convertDate2String(this.arrayDate.toDate),
        };
        let rs = await this.$root.context.post(
          "/web-ecms/doicong-danhsach/lay-ds-hoso-catchuyen",
          data
        );
        if (rs.error_code === "BSS-00000000") {
          this.arrayDataToCbo.dsHoSoCCTab3 = rs.data;
          if (rs.data.length > 0) {
            this.arrayCBO.cboHoSoTab3 = rs.data[0].HSCC_ID;
            this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
          }
        } else {
          this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.");
        }
      } catch (e) {
        this.$root.toastError(
          "Có lỗi xẩy ra: " + e.response.data.message_detail
        );
      } finally {
        this.loading(false);
      }
    },
    changeHSCCTab3: async function () {
      try {
        await this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3);
      } catch (e) {
        this.$root.toastError(
          "Có lỗi xẩy ra: " + e.response.data.message_detail
        );
      } finally {
        this.loading(false);
      }
    },
    NAP_DS_THUEBAO_CAPCONG: async function (hscc_id) {
      try {
        this.loading(true);
        let ck = await this.$root.context.get(
          "/web-ecms/doicong-danhsach/lay-ds-thuebao-catchuyen-tab3",
          { hsccId: hscc_id }
        );
        if (ck.data !== null) {
          this.arrayDataGrids.dsHoSoTab3 = ck.data;
        }
      } catch (e) {
        this.$root.toastError(
          "Có lỗi xẩy ra: " + e.response.data.message_detail
        );
      } finally {
        this.loading(false);
      }
    },
    hienThiDanhSachCatChuyen: async function (index, kieu) {
      if (index == 1) {
        await this.NAP_DS_HOSO();
      } else if (index == 2) {
        await this.LOAD_HOSO_CATCHUYEN();

        // if (tt_nd.tentat == "HNI")
        // {
        //   tsbtnGiuVciVpi.Visible = true;
        // }
      } else {
        if (kieu == 0) {
          // load het
          await this.NAP_DS_TRAMTBI();
          await this.NAP_DS_TRANGTHAI_VCIVPI();
          await this.NAP_DS_QUYHOACH();
          await this.NAP_DS_QH();
          //region Load lưới port fix và vci vpi
          try {
            var port_td = await this.LAY_TS_PORTD()//this.arrayCBO.cboDslamPort;
            console.log("_______aaaa", port_td);

            if (port_td === "1")
            {
              await this.NAP_DS_PORT_FIX();
            }
            else
            {
              await this.NAP_DS_LUOI_VCIVPI();
              await this.NAP_DS_LUOI_PORT();
            }
            await this.LOAD_HOSO_CATCHUYEN2();
            // }
            // else
            // {
            // }
          }
          catch (error) {
          }
          finally {
          }
        } else if (kieu == 1) {
          //if (ttcc_ht_id != cboTTHS.EditValue.ToString())
          {
            this.LOAD_HOSO_CATCHUYEN2();
          }
          //#region Load lưới port fix và vci vpi

          var port_td = await this.LAY_TS_PORTD()//this.arrayCBO.cboDslamPort.PORT_TD; //this.LAY_TS_PORTD();
          if (port_td == "-1") return;
          if (port_td == "1") {
            this.NAP_DS_PORT_FIX();
          } else {
            this.NAP_DS_LUOI_VCIVPI();
            this.NAP_DS_LUOI_PORT();
          }
          //#endregion
          if (this.arrayDataToCbo.dsHoSoCCTab3 !== null) {
            this.NAP_DS_THUEBAO_CAPCONG(this.arrayCBO.cboHoSoTab3); //Convert.ToInt64(cboHS.EditValue)
          }
        }
      }
    },
  },
};
</script>


