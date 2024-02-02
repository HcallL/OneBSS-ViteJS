<template src="./template.html"> </template>

<script>
import breadcrumb from '@/modules/contract/setup/DeclareLandline/components/breadcrumb.vue'
import Vue from 'vue'
import ThongTinDonHang from './popups/ThongTinDonHang/ThongTinDonHang.vue'
import api from './API.js'
import moment from 'moment'
import xlsx from 'xlsx'
import FileSaver from 'file-saver'

export default {
  components: {
    breadcrumb,
    ThongTinDonHang,
  },
  data() {
    return {
      tbDSDonHang: {
        data: [],
        columns: [
          { fieldName: 'ma_gd', headerText: 'Mã đơn hàng', template: this.colMaDonHang(this) },
          { fieldName: 'ngay_yc', headerText: 'Ngày yêu cầu', allowFiltering: true, allowSorting: true },
          { fieldName: 'ten_kh', headerText: 'Tên khách hàng', allowFiltering: true, allowSorting: true },
          { fieldName: 'diachi_kh', headerText: 'Địa chỉ khách hàng', allowFiltering: true, allowSorting: true },
          { fieldName: 'so_dt', headerText: 'Số điện thoại', allowFiltering: true, allowSorting: true },
          { fieldName: 'loaihinh_tb', headerText: 'Loại hình', allowFiltering: true, allowSorting: true },
          { fieldName: 'goicuoc', headerText: 'Gói cước', allowFiltering: true, allowSorting: true },
          { fieldName: 'trangthai_hd', headerText: 'Trạng thái đơn', allowFiltering: true, allowSorting: true }
        ]
      },
      tbChiTietPhanGiao: {
        data: [],
        columns: [
          { fieldName: 'huonggiao', headerText: 'Hướng giao', isGroupedColumn: true},
          { fieldName: 'dvg', headerText: 'Đơn vị giao', allowFiltering: true, allowSorting: true },
          { fieldName: 'ngay_giao', headerText: 'Ngày giao', allowFiltering: true, allowSorting: true },
          { fieldName: 'nv_giao', headerText: 'Người giao', allowFiltering: true, allowSorting: true },
          { fieldName: 'nd_giao', headerText: 'Nội dung', allowFiltering: true, allowSorting: true },
          { fieldName: 'dvn', headerText: 'Đơn vị nhận', allowFiltering: true, allowSorting: true },
          { fieldName: 'nv_th', headerText: 'Người xử lý', allowFiltering: true, allowSorting: true },
          { fieldName: 'trangthai_ph', headerText: 'Trạng thái phiếu', allowFiltering: true, allowSorting: true }
        ]
      },
      dateFormat: 'dd/MM/yyyy',
      cbbNguonDon: {
        options: [],
        value: null
      },
      cbbLoaiKH: {
        options: [],
        value: null
      },
      cbbDichVuVT: {
        options: [],
        value: null
      },
      cbbLoaiHinh: {
        options: [],
        value: null,
        disable: false
      },
      cbbDonVi: {
        options: [],
        value: null,
        enabled: false
      },
      cbbNhanVien: {
        options: [],
        value: null,
        enabled: false,
        disableChk: true
      },
      cbbTrangThai: {
        options: [],
        value: null,
        enabled: false
      },
      dtpTuNgay: {
        value: new Date(),
        enabled: false
      },
      dtpDenNgay: {
        value: new Date(),
        enabled: false
      },
      phanvung_id: null,
      txtMaKenhBan: {
        value: null,
        enabled: false
      },
      txtDienThoaiKenh: {
        value: null,
        enabled: false
      },
      txtMaDonHang: {
        value: null,
        enabled: false
      },
      ma_nv: null,
      currentDH: null,
    }
  },
  methods: {
    colMaDonHang(parent) {
      return function() {
        return {
          template: Vue.component('tbDSDonHang_colMaDonHang', {
            template: `<a href="javascript:void(0)" @click="openThongTin">{{madonhang}}</a>`,
            mounted() {
              this.madonhang = this.data.ma_gd
            },
            data() {
              return {
                madonhang: ''
              }
            },
            methods: {
              openThongTin() {
                parent.$refs.ThongTinDonHangModal.hdkh_id = this.data.hdkh_id
                parent.$refs.ThongTinDonHangModal.phanvung_id = parent.phanvung_id
                parent.$refs.ThongTinDonHangModal.showModal()
              }
            }
          })
        }
      }
    },
    async LOAD_COMBO() {
      try {
        this.loading(true)
        let res = await api.getDSNguonDon(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbNguonDon.options = res.data.data.map((item) => {
            return {
              id: item.ungdung_id,
              text: item.ten_ungdung
            }
          })
          this.cbbNguonDon.value = this.cbbNguonDon.options[0].id
        }
        // this.cbbNguonDon.options = [{id: -1, text: '---Không chọn---'}].concat(this.cbbNguonDon.options)

        res = await api.getDSLoaiKH(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbLoaiKH.options = res.data.data.map((item) => {
            return {
              id: item.loaikh_id,
              text: item.loai_kh
            }
          })
          this.cbbLoaiKH.value = this.cbbLoaiKH.options[0].id
        }
        // this.cbbLoaiKH.options = [{id: -1, text: '---Không chọn---'}].concat(this.cbbLoaiKH.options)
        res = await api.getDSDichVuVT(this.axios, {})
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbDichVuVT.options = res.data.data.map((item) => {
            return {
              id: item.dichvuvt_id,
              text: item.ten_dvvt
            }
          })
          this.cbbDichVuVT.value = this.cbbDichVuVT.options[0].id
        }
        // this.cbbDichVuVT.options = [{id: -1, text: '---Không chọn---'}].concat(this.cbbDichVuVT.options)
        res = await api.getDSDonVi(this.axios)
        if(res.data.error_code == 'BSS-00000000') {
          this.cbbDonVi.options = res.data.data.map((item) => {
            return {
              id: item.donvi_id,
              text: item.ten_dv
            }
          })
          this.cbbDonVi.value = this.cbbDonVi.options[0].id
        }

        res = await api.getTrangThaiHD(this.axios)
        if(res.data.error_code == 'BSS-00000000') {
          this.cbbTrangThai.options = res.data.data.map((item) => {
            return {
              id: item.ID,
              text: item.NAME
            }
          })
          this.cbbTrangThai.value = this.cbbTrangThai.options[0].id
        }

      } catch (error) {
      } finally {
        this.loading(false)
      }
    },
    async LOAD_ORDERS(){
      try {
        this.loading(true)
        this.tbDSDonHang.data = []
        this.tbChiTietPhanGiao.data = []
        let res = await api.loadDonHang(this.axios,{
          p_phanvung_id: this.phanvung_id,
          p_ungdung_id: this.cbbNguonDon.value*1,
          p_khdn: this.cbbLoaiKH.value*1!=-1?this.cbbLoaiKH.value*1: -1,
          p_donvi_id: this.cbbDonVi.enabled ? this.cbbDonVi.value*1 : -1,
          p_nhanvien_id: this.cbbNhanVien.enabled ? this.cbbNhanVien.value*1 : -1,
          p_dichvuvt_id: this.cbbDichVuVT.value*1!=-1?this.cbbDichVuVT.value*1: -1,
          p_loaitb_id: this.cbbLoaiHinh.value*1!=-1?this.cbbLoaiHinh.value*1: -1,
          p_ma_nv: this.txtMaKenhBan.enabled ? this.txtMaKenhBan.value : "-1",
          p_so_dt: this.txtDienThoaiKenh.enabled ? this.txtDienThoaiKenh.value : "-1",
          p_tungay: this.dtpTuNgay.enabled ? moment(this.dtpTuNgay.value).format('DD/MM/yyyy'): "-1",
          p_dengay: this.dtpDenNgay.enabled ? moment(this.dtpDenNgay.value).format('DD/MM/yyyy'): "-1",
          p_ma_gd: this.txtMaDonHang.enabled ? this.txtMaDonHang.value.trim() : "-1",
          p_tthd_id: this.cbbTrangThai.enabled ? this.cbbTrangThai.value : -1,
        })

        if(res.data.error_code == 'BSS-00000000') {
          this.tbDSDonHang.data = res.data.data.map((item) => {
            return {
              ...item,
              ngay_yc: moment(item.ngay_yc).format('DD/MM/yyyy'),
            }
          })
        }
        else if(res.data.error_code == 'BSS-00000204')
        {
          this.$toast.info('Không tìm thấy dữ liệu đơn hàng!')
          this.tbDSDonHang.data = []
        }
        else{
          this.$root.toastError(res.data.message)
          this.tbDSDonHang.data = []
        }

      } catch (error) {

      } finally {
        this.loading(false)
      }
    },
    async tbDSDonHang_rowSelected(row){
      this.tbChiTietPhanGiao.data = []
      try {
        this.loading(true)
        const dh = row.data
        this.currentDH = dh;
      let res = await api.getDSChiTietPhanGiao(this.axios,{
        vphanvung_id: this.phanvung_id,
        vhdtb_id: dh.hdtb_id,
      })

      if(res.data.error_code == 'BSS-00000000') {
        this.tbChiTietPhanGiao.data = res.data.data
      }
      else{
        this.$root.toastError(res.data.message)
        this.tbChiTietPhanGiao.data = []
      }
      } catch (error) {

      } finally {
        this.loading(false)
      }

    },
    async excelExport(){
      const wookbook = xlsx.utils.book_new()
      const dt = [];
      for(let i = 0; i< this.tbDSDonHang.data.length; i++){
        const result = {
          'Mã đơn hàng': this.tbDSDonHang.data[i].ma_gd,
          'Ngày yêu cầu': this.tbDSDonHang.data[i].ngay_yc,
          'Tên khách hàng': this.tbDSDonHang.data[i].ten_kh,
          'Địa chỉ khách hàng': this.tbDSDonHang.data[i].diachi_kh,
          'Số điện thoại': this.tbDSDonHang.data[i].so_dt,
          'Loại hình': this.tbDSDonHang.data[i].loaihinh_tb,
          'Loại thuê bao': '',
          'Gói cước': this.tbDSDonHang.data[i].goicuoc,
          'Tổng giá': 0,
          'Nội dung': '',
          'Trạng thái đơn': this.tbDSDonHang.data[i].trangthai_hd,
        };
        if(this.tbDSDonHang.data[i].loaihinh_tb.toLowerCase().includes('di động')){
          result['Loại thuê bao'] = this.tbDSDonHang.data[i].loaihinh_tb.toLowerCase().includes('trả sau') ? 'Trả sau' : 'Trả trước'
        }
        const res = await api.getChiTietDonHang(this.axios,{
          p_hdkh_id:  this.tbDSDonHang.data[i].hdkh_id,
          p_phanvung_id: this.phanvung_id,
        })

        result['Tổng giá'] = res.data.data[0].tongtien;
        result['Nội dung'] = res.data.data[0].noidung;
        dt.push(result);
      }
      // console.log(dt);
      const wooksheet = xlsx.utils.json_to_sheet(dt)
      xlsx.utils.book_append_sheet(wookbook, wooksheet, 'Danh sách đơn hàng')
      xlsx.writeFile(wookbook, 'OrderList.xlsx');

      const blob = new Blob([wookbook], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});
    }
  },
  async mounted() {
    await this.LOAD_COMBO()
    this.phanvung_id = await this.$root.token.getPhanVungID() * 1;
    this.ma_nv = await this.$root.token.getNhanVienID() * 1;
    this.$refs.ThongTinDonHangModal.parent = this;
    // await this.LOAD_ORDERS()
  },
  watch: {
    'txtDienThoaiKenh.value': {
      handler: function(val, oldVal) {
        //just allow numberic value
        this.txtDienThoaiKenh.value = this.txtDienThoaiKenh.value.replace(/[^0-9]/g, '');
        if(this.txtDienThoaiKenh.value.length >  50)
          this.txtDienThoaiKenh.value = this.txtDienThoaiKenh.value.substring(0,50)
      },
      deep: true
    },
    'cbbDichVuVT.value': {
      handler: async function(val, oldVal) {
        // if(val == -1){
        //   this.cbbLoaiHinh.options = [{id: -1, text: '---Không chọn---'}]
        //   this.cbbLoaiHinh.value = -1
        //   this.cbbLoaiHinh.disable = true
        //   return
        // }
        // else
        //   this.cbbLoaiHinh.disable = false
        try {
          this.loading(true)
          this.cbbLoaiHinh.options = []
          let res = await api.getDSLoaiHinh(this.axios,this.cbbDichVuVT.value)
        if (res.data.error_code == 'BSS-00000000') {
          this.cbbLoaiHinh.options = res.data.data.map((item) => {
            return {
              id: item.loaitb_id,
              text: item.loaihinh_tb
            }
          })
          this.cbbLoaiHinh.value = this.cbbLoaiHinh.options[0].id
        }
        // this.cbbLoaiHinh.options = [{id: -1, text: '---Không chọn---'}].concat(this.cbbLoaiHinh.options)
        } catch (error) {

        } finally {
          this.loading(false)
        }
      },
      deep: true
    },
    'cbbDonVi.value': {
      handler: async function(val, oldVal) {
        try {
          this.loading(true)
          let res = await api.getDSNhanVienTheoDonVi(this.axios, {
            p_json_donvi: JSON.stringify({
              donvi_id: this.cbbDonVi.value
            })
          })
          if(res.data.error_code == 'BSS-00000000') {
            this.cbbNhanVien.options = res.data.data.map((item) => {
              return {
                id: item.nhanvien_id,
                text: item.ten_nv
              }
            })
            this.cbbNhanVien.value = this.cbbNhanVien.options[0].id
          }
        } catch (error) {

        } finally {
          this.loading(false)
        }
      },
      deep: true
    },
    'cbbDonVi.enabled': {
      handler: function(val, oldVal) {
        if(val)
          this.cbbNhanVien.disableChk = false
        else
          {
            this.cbbNhanVien.disableChk = true
            this.cbbNhanVien.enabled = false
          }
      },
      deep: true
    },
  }
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
