<template src="./StaffArea.html"></template>
<style  scoped  src="./StaffArea.scss"></style>
<script>
import breadcrumb from '@/components/breadcrumb'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import bssFlatPicker from '@/components/BssDatePicker'
import { DataManager, Query, ODataAdaptor, Predicate } from '@syncfusion/ej2-data'
import moment from 'moment'
import api from './API'
export default {
  components: {
    breadcrumb,
    bssFlatPicker,
    moment,
    DataManager,
    Query,
    ODataAdaptor,
    Predicate
  },
  name: 'StaffArea',
  props: {
    tag: {
      type: Number,
      default: 1
    },
    ispopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      header: {
        title: 'Gán nhân viên khu vực',
        list: [
          { name: 'Quản lý người dùng', link: { name: 'admin' } },
          {
            name: 'Gán nhân viên khu vực',
            link: { name: 'Ui.buttons' }
          }
        ]
      },
      target: '#app',
      animationSettings: { effect: 'Zoom' },
      position: { X: 'center', Y: 'top' },
      khuvuc_selected: {},
      KhuVucId: '',
      LoaiKhuVucId: '',
      CheckLoaiKV: true,
      txtMaKV: '',
      selIndex: [],
      txtKV: '',
      pageSize: 20,
      DmLoaiKhuVuc: [],
      DsDonViByNhom: [],
      filterOptions: {
        enableCaseSensitivity: false,
        mode: 'Immediate',
        ignoreAccent: true
      },
      pageSettings: { pageSize: 5 },
      DmKhuVuc: {
        headers: [],
        data: []
      },
      LogsKhuVucNhanVien: {
        headers: [
          {
            fieldName: 'loai_kv',
            headerText: 'Loại KV',
            allowFiltering: true
          },
          { fieldName: 'ma_kv', headerText: 'Mã KV', allowFiltering: true },
          {
            fieldName: 'ten_kv',
            headerText: 'Khu vực',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'loai_nv',
            headerText: 'Loại nhân viên',
            allowFiltering: true
          },
          {
            fieldName: 'ten_nv',
            headerText: 'Nhân viên',
            allowFiltering: true
          },
          {
            fieldName: 'thaotac',
            headerText: 'Thao tác',
            allowFiltering: true
          },
          {
            fieldName: 'nguoi_cn',
            headerText: 'Người CN',
            allowFiltering: true
          },
          { fieldName: 'may_cn', headerText: 'Máy CN', allowFiltering: true },
          {
            fieldName: 'ngay_cn',
            headerText: 'Thời gian CN',
            allowFiltering: true
          },
          {
            fieldName: 'nhiemvu',
            headerText: 'Nhiệm vụ',
            allowFiltering: true
          }
        ],
        data: []
      },
      KhuVuc: {
        headers: [
          { name: 'stt', text: 'STT', value: '' },
          { name: 'ma_kv', text: 'Mã KV', value: '' },
          { name: 'ten_kv', text: 'Tên KV', value: '' }
        ],
        height: 700,
        headers2: [
          {
            fieldName: 'stt',
            headerText: 'STT',
            allowFiltering: true,
            width: 50
          },
          { fieldName: 'ma_kv', headerText: 'Mã KV', allowFiltering: true },
          {
            fieldName: 'ten_kv',
            headerText: 'Tên KV',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'ma_kv_cha',
            headerText: 'Mã KV cha',
            allowFiltering: true
          },
          {
            fieldName: 'ten_kv_cha',
            headerText: 'Tên KV cha',
            allowFiltering: true
          }
        ],
        data: []
      },
      gridviewKhuVuc: {
        headers: [
          { name: 'stt', text: 'STT', value: '' },
          { name: 'ma_kv', text: 'Mã KV', value: '' },
          { name: 'ten_kv', text: 'Tên KV', value: '' },
          { name: 'khuvuc_id', text: 'Khu vực Id', value: '' },
          { name: 'ten_kv', text: 'Tên KV', value: '' }
        ],
        data: []
      },
      KhuVucTree: {
        dataSource: null,
        id: 'khuvuc_id',
        parentID: 'khuvuc_cha_id',
        text: 'ten_kv',
        hasChildren: 'hasChild'
      },
      NhanVienDaGan: {
        headers: [
          { fieldName: 'loai_nv', headerText: 'Loại NV', allowFiltering: true, width: 90 },
          { fieldName: 'ma_nv', headerText: 'Mã NV', allowFiltering: true },
          { fieldName: 'ten_nv', headerText: 'Tên NV', allowFiltering: true },
          { fieldName: 'ten_nhiemvu', headerText: 'Nhiệm vụ', allowFiltering: true },
          { fieldName: 'ten_dv', headerText: 'Đơn vị', allowFiltering: true },
          { fieldName: 'so_dt', headerText: 'Số ĐT', allowFiltering: true },
          { fieldName: 'email', headerText: 'Email', allowFiltering: true }
        ],
        data: [],
        daGan: [],
        selected: 0,
        checked: [],
        selectAll: false
      },
      NhanVienChuaGan: {
        headers: [
          { name: 'ma_nv', text: 'Mã NV', value: '' },
          { name: 'ten_nv', text: 'Tên nhân viên', value: '' },
          { name: 'ten_dv', text: 'Đơn vị', value: '' },
          { name: 'so_dt', text: 'Số ĐT', value: '' }
        ],
        headers2: [
          { fieldName: 'ma_nv', headerText: 'Mã NV', allowFiltering: true },
          {
            fieldName: 'ten_nv',
            headerText: 'Tên nhân viên',
            allowFiltering: true
          },
          {
            fieldName: 'ten_dv',
            headerText: 'Đơn vị',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'so_dt',
            headerText: 'Số ĐT',
            allowFiltering: true,
            allowHtml: true
          }
        ],
        data: [],
        selected: 0,
        checked: []
      },
      DsPhongBH: [],
      PopUpNhanVienQLDH: {
        headers: [
          { name: 'ten_dv', text: 'Phòng bán hàng', value: '' },
          { name: 'ma_nv', text: 'Mã nhân viên', value: '' },
          { name: 'ten_nv', text: 'Tên nhân viên', value: '' },
          { name: 'so_dt', text: 'Số điện thoại', value: '' },
          { name: 'email', text: 'Email', value: '' }
        ],
        headers2: [
          {
            fieldName: 'ten_dv',
            headerText: 'Phòng bán hàng',
            allowFiltering: true
          },
          {
            fieldName: 'ma_nv',
            headerText: 'Mã nhân viên',
            allowFiltering: true
          },
          {
            fieldName: 'ten_nv',
            headerText: 'Tên nhân viên',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'so_dt',
            headerText: 'Số điện thoại',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'email',
            headerText: 'Email',
            allowFiltering: true,
            allowHtml: true
          }
        ],
        data: [],
        NhanVienId: -1,
        DsNhanVien: [],
        DsNhanVien2: []
      },
      PopUpNhanVienQL: {
        // ID Nhân viên	Tên nhân viên	Mã KV	Tên KV	Loại khu vưc	Loại KV	Mã KV
        headers: [
          { name: 'nhanvien_id', text: 'ID Nhân viên', value: '' },
          { name: 'ten_nv', text: 'Tên nhân viên', value: '' },
          { name: 'ma_kv', text: 'Mã KV', value: '' },
          { name: 'ten_kv', text: 'Tên KV', value: '' },
          { name: 'loai_kv', text: 'Loại khu vưc', value: '' },
          { name: 'loai_nv', text: 'Loại NV', value: '' },
          { name: 'ma_kv_cha', text: 'Mã KV cha', value: '' },
          { name: 'ten_kv_cha', text: 'Tên KV cha', value: '' }
        ],
        headers2: [
          {
            fieldName: 'nhanvien_id',
            headerText: 'ID Nhân viên',
            allowFiltering: true,
            width: 90
          },
          {
            fieldName: 'ten_nv',
            headerText: 'Tên nhân viên',
            allowFiltering: true
          },
          {
            fieldName: 'ma_kv',
            headerText: 'Mã KV',
            allowFiltering: true,
            allowHtml: true,
            width: 90
          },
          {
            fieldName: 'ten_kv',
            headerText: 'Tên KV',
            allowFiltering: true,
            allowHtml: true
          },
          {
            fieldName: 'loai_kv',
            headerText: 'Loại KV',
            allowFiltering: true,
            allowHtml: true
          },
          { fieldName: 'loai_nv', headerText: 'Loại NV', allowFiltering: true },
          {
            fieldName: 'ma_kv_cha',
            headerText: 'Mã KV cha',
            allowFiltering: true
          },
          {
            fieldName: 'ten_kv_cha',
            headerText: 'Tên KV cha',
            allowFiltering: true,
            allowHtml: true
          }
        ],
        data: [],
        manhanvien: ''
      },
      Loading: false,
      LoaiNhanVienId: '',
      MaNhanVien: '',
      MaDonVi: '',
      DonViId: '',
      NhiemVuId: '1',
      DmDonVi: [],
      DmDonVi2: {
        data: [],
        textField: 'TEN_DV',
        valueField: 'DONVI_ID',
        panelDataHeight: 'auto',
        headers: [
          {
            fieldName: 'MA_DV',
            headerText: 'Mã đơn vị',
            allowFiltering: true,
            allowSorting: false
          },
          {
            fieldName: 'TEN_DV',
            headerText: 'Tên đơn vị',
            allowFiltering: true,
            allowSorting: false
          }
        ]
      },
      DmLoaiNhanVien: [],
      PhongBhId: -1,
      btnGhiLaiStatus: true,
      USE_LOG_KHUVUC_NV: 0,
      // Fixed
      DmNhiemVu: [
        { id: '1', text: 'Lắp đặt + xử lý sự cố dịch vụ' },
        { id: '2', text: 'Lắp đặt dịch vụ' },
        { id: '3', text: 'Xử lý sự cố dịch vụ' },
        { id: '4', text: 'Điều hành địa bàn' }
      ]
    }
  },
  watch: {
    LoaiKhuVucId: async function (val) {
      try {
        this.Loading = true
        await this.getDmKhuVucByLoaiKV(val)
      } catch (ex) {
        console.error('LoaiKhuVucId', ex)
      } finally {
        this.Loading = false
      }
    },
    DonViId: function (val) {
      console.log('DonViId_Changed:', val)
      this.Loading = true
      Promise.all([this.getDanhSachNhanVienChuaGan(), this.getDmPhongBanHang(0)])
        .then(() => {})
        .catch((err) => {
          console.log('DonViId:', err)
        })
        .finally(() => {
          this.Loading = false
        })
      /*
      this.Loading = true
      try {
        Promise.all([this.getDanhSachNhanVienChuaGan(), this.getDmPhongBanHang(0)])
        this.Loading = false
      } catch (ex) {
        this.Loading = false
      }
      */
    },
    /*
    PhongBhId: async function (val) {
      this.Loading = true
      try {
        await this.getDsNhanVien(val)
        let input = {
          donvi_id: val,
          kieu: 3
        }
        this.PopUpNhanVienQLDH.data = this.GetData(await api.getDmPhongBanHang(this.axios, input))
        this.Loading = false
      } catch (ex) {
        this.Loading = false
      }
    },
    */
    LoaiNhanVienId: async function (val) {
      this.Loading = true
      try {
        await this.getDanhSachNhanVienChuaGan()
        this.Loading = false
      } catch (ex) {
        this.Loading = false
      }
    },
    CheckLoaiKV: async function (val) {
      if (!val) {
        this.Loading = true
        try {
          await this.getDmKhuVucTree()
          this.Loading = false
        } catch (ex) {
          this.Loading = false
        }
      }
    },
    Loading: function (val, oldval) {
      this.$root.showLoading(val)
    }
  },
  created() {
    Promise.all([
      this.getThamSo(),
      this.getDmLoaiKhuVuc(),
      this.getDmLoaiNhanVien(9), //  CHAM_SOC_KH
      this.getDsDonVi(9), //  CHAM_SOC_KH
      this.getDmKhuVucTree(),
      this.getDmPhongBanHang(0)
    ])
      .then((r) => {})
      .catch((errs) => {
        console.log('created', errs)
      })
      .finally(() => {
        this.Loading = false
      })
  },
  validations: {
    LoaiNhanVienId: {
      required,
      minLength: minLength(1)
    },
    PopUpNhanVienQL: {
      manhanvien: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    validateData: function () {
      this.$v.$touch()
      let errorMessage = []
      if (!this.CheckLoaiKV) {
        errorMessage.push(`Bạn phải check và chọn loại khu vực `)
      }
      if (this.CheckLoaiKV && !this.LoaiKhuVucId) {
        errorMessage.push(`Chưa chọn loại khu vực `)
      }
      if (!(this.LoaiNhanVienId > 0)) {
        errorMessage.push(`Chưa chọn loại nhân viên `)
      }
      if (!(this.KhuVucId > 0)) {
        errorMessage.push(`Chưa chọn khu vực `)
      }
      if ((this.KhuVuc.data == null || this.KhuVuc.data.length <= 0) && this.CheckLoaiKV) {
        errorMessage.push(`Chưa có khu vực để gán NV! `)
      }

      if (errorMessage.length > 0) {
        this.$toast.error(errorMessage.join('\n'))
        return false
      } else {
        return true
      }
    },
    getDmLoaiKhuVuc: async function () {
      var input = {}
      let data = this.GetData(await api.getDmLoaiKhuVuc(this.axios, input))
      this.DmLoaiKhuVuc = data.map((x) => ({
        id: x.LOAIKV_ID,
        text: x.LOAI_KV == null ? '' : x.LOAI_KV
      }))
      if (this.DmLoaiKhuVuc.length > 0) this.LoaiKhuVucId = this.DmLoaiKhuVuc[0].id
    },
    getDmKhuVucByLoaiKV: async function (loaikvId) {
      let donviId = parseInt(this.$root.token.getDonViID())
      let nhanvienId = parseInt(this.$root.token.getNhanVienID())
      let username = this.$root.token.getUserName()
      let matinh = this.$root.token.getMaTinh()
      var input = {
        loaikv_id: loaikvId,
        donvi_id: donviId,
        nhanvien_id: nhanvienId,
        ttkd: matinh
      }
      // this.Loading = true
      this.KhuVuc.data = this.GetData(await api.getDmKhuVucByLoaiKV(this.axios, input))
      if (this.KhuVuc.data != null && this.KhuVuc.data.length > 0) {
        this.KhuVucId = this.KhuVuc.data[0].khuvuc_id
        try {
          await this.select_selectedItemKhuVuc(0, this.KhuVuc.data[0])
        } catch (ex) {
          console.error(ex)
        } finally {
        }
      } else {
        this.KhuVucId = ''
        this.NhanVienDaGan.data = []
      }
    },
    getDmKhuVucTree: async function () {
      var input = {}
      let data = this.GetData(await api.getDmKhuVucTree(this.axios, input))
      this.KhuVucTree.dataSource = data
      data.forEach(function (item) {
        item.hasChild = data.filter((x) => x.khuvuc_cha_id == item.khuvuc_id).length > 0
        if (item.khuvuc_cha_id == 0 || item.khuvuc_cha_id == null || item.unitlevel < 2) {
          item.expanded = true
        }
      })
      // this.KhuVucTree.dataSource = data.sort((a, b) => a.ten_kv.localeCompare(b.ten_kv))

      this.KhuVucTree = {
        dataSource: data.sort((a, b) => a.ten_kv.localeCompare(b.ten_kv)),
        id: 'khuvuc_id',
        parentID: 'khuvuc_cha_id',
        text: 'ten_kv',
        hasChildren: 'hasChild'
      }
    },
    getDmLoaiNhanVien: async function (id) {
      var input = { id: id }
      let data = this.GetData(await api.getDmLoaiNhanVien(this.axios, input))
      this.DmLoaiNhanVien = data
        .filter((x) => x.TEN != null)
        .map((x) => ({
          id: x.LOAINV_ID,
          text: x.TEN == null ? '' : x.TEN
        }))
      if (this.DmLoaiNhanVien != null && this.DmLoaiNhanVien.length > 0) {
        this.LoaiNhanVienId = this.DmLoaiNhanVien[0].id
      }
    },
    select_selectedItemsChangedDagan: function (dataKeys) {
      this.NhanVienDaGan.checked = dataKeys
      this.NhanVienDaGan.data.forEach(function (item) {
        if (dataKeys.filter((x) => x == item.nhanvien_id).length > 0) {
          item.ischecked = true
        } else {
          item.ischecked = false
        }
      })
    },
    select_selectedItemsChangedChuagan: function (dataKeys) {
      this.NhanVienChuaGan.checked = dataKeys
      this.NhanVienChuaGan.data.forEach(function (item) {
        if (dataKeys.filter((x) => x == item.nhanvien_id).length > 0) {
          item.ischecked = true
        } else {
          item.ischecked = false
        }
      })
    },
    async grid_selectedItemKhuVuc(i, item) {
      try {
        this.Loading = true
        await this.select_selectedItemKhuVuc(i, item)
      } catch (err) {
        this.Loading = true
      } finally {
        this.Loading = false
      }
    },
    select_selectedItemKhuVuc: async function (i, item) {
      if (item) {
        console.log('item', i, item)
        this.KhuVucId = item.khuvuc_id
        this.khuvuc_selected = item
        if (this.KhuVucId > 0) {
          this.Loading = true
          try {
            await Promise.all([this.getDanhSachNhanVienChuaGan(), this.getDanhSachNhanVienDaGan()])
          } catch (ex) {
            this.Loading = true
            console.log(ex)
          } finally {
            this.Loading = false
          }
        }
      }
    },
    gridnvDaGan_DataBound: function (args) {
      // this.Loading =true
      console.log('gridnvDaGan_DataBoundargs', args)
      if (this.NhanVienDaGan.selectAll || true) {
        var grid = this.$refs.nvdaGan.grid
        var rows = grid.getRows()
        var arr = rows.map((x) => x.rowIndex)
        console.log('arr', arr)
        grid.selectRows(arr)
        this.NhanVienDaGan.selectAll = false
      }
      if (this.NhanVienDaGan.data != null && this.NhanVienDaGan.data.length > 0) this.$refs.nvdaGan.grid.autoFitColumns([])
    },
    gridnvDaGan_RowDataBound(args) {
      // this.Loading = true
    },
    getDanhSachNhanVienDaGan: async function () {
      if (!(this.KhuVucId > 0)) {
        return
      }
      // this.NhanVienDaGan.data = []
      // this.NhanVienDaGan.daGan = []
      let loaikvId = this.CheckLoaiKV ? this.LoaiKhuVucId : 0
      let donviId = 0
      var input = {
        ma_dv: '',
        loaikv_id: loaikvId,
        khuvuc_id: this.KhuVucId,
        loainv_id: this.LoaiNhanVienId,
        donvi_id: donviId,
        type: 1,
        ma_nv: '',
        page_num: 1,
        page_size: 2000,
        total_row: 1
      }
      try {
        // this.Loading = true
        var response = this.GetData(await api.getDanhSachNhanVienByKhuVuc(this.axios, input))
        this.NhanVienDaGan.data = response.data
        this.NhanVienDaGan.daGan = JSON.parse(JSON.stringify(response.data)) // Object.assign({}, response.data);
        this.NhanVienDaGan.data.forEach(function (item) {
          item.checked = true
        })
        this.NhanVienDaGan.selectAll = true
      } catch (err) {
        this.NhanVienDaGan.data = []
        this.NhanVienDaGan.daGan = []
      } finally {
      }
    },
    getDanhSachNhanVienChuaGan: async function () {
      if (!(this.KhuVucId > 0)) {
        return
      }
      // this.NhanVienChuaGan.data = []
      let loaikvId = this.LoaiKhuVucId
      let donviId = this.DonViId == '' ? -2 : this.DonViId
      if (donviId == -1) {
        donviId = 0
      }
      var input = {
        ma_dv: this.MaDonVi,
        loaikv_id: loaikvId,
        khuvuc_id: this.KhuVucId,
        loainv_id: this.LoaiNhanVienId == '' || this.LoaiNhanVienId == '-1' ? 0 : this.LoaiNhanVienId,
        donvi_id: donviId,
        type: 0,
        ma_nv: this.MaNhanVien,
        page_num: 1,
        page_size: 2000,
        total_row: 1
      }
      try {
        // this.Loading = true
        let response = this.GetData(await api.getDanhSachNhanVienByKhuVuc(this.axios, input))
        this.NhanVienChuaGan.data = response.data
      } catch (err) {
        console.error('getDanhSachNhanVienChuaGan', err)
        this.NhanVienChuaGan.data = []
      } finally {
      }
    },
    // getDanhSachNhanVienChuaGan2: function () {
    //   this.Loading = true
    //   Promise.all([this.getDanhSachNhanVienChuaGan()])
    //     .then((values) => {
    //       console.log(values)
    //       this.Loading = false
    //     })
    //     .catch((error) => (this.Loading = false))
    // },
    getDsDonVi: async function (id) {
      var input = { id: id }
      let data = this.GetData(await api.getDsDonVi(this.axios, input))
      this.DmDonVi2.data = data
      this.DmDonVi = data.map((x) => ({
        id: x.DONVI_ID,
        text: x.TEN_DV == null ? '' : x.TEN_DV
      }))
    },
    getDmKhuVuc: async function (loaikv) {
      var input = { id: loaikv }
      this.KhuVuc.data = this.GetData(await api.getDmKhuVuc(this.axios, input))
      if (this.KhuVuc.data != null && this.KhuVuc.data.length > 0) {
        this.KhuVucId = this.KhuVuc.data[0].khuvuc_id
      } else {
      }
    },
    getDsKhuVucByMaNV: async function (manv) {
      var input = { ma_nv: manv }
      this.PopUpNhanVienQL.data = this.GetData(await api.getDsKhuVucByMaNV(this.axios, input))
    },
    getLogsKhuVucNhanVien: async function (loaikv) {
      var input = { khuvuc_id: this.KhuVucId }
      this.LogsKhuVucNhanVien.data = this.GetData(await api.getLogsKhuVucNhanVien(this.axios, input))
    },
    getThamSo: async function () {
      this.USE_LOG_KHUVUC_NV = 0
      let a = await this.getThamSoMacDinh('USE_LOG_KHUVUC_NV')
      if (a != null && a.length > 0) {
        this.USE_LOG_KHUVUC_NV = a[0].MACDINH
      }
    },
    getThamSoMacDinh: async function (mats) {
      var input = { ma_ts: mats }
      let a = this.GetData(await api.getThamSoMacDinh(this.axios, input))
      return a.filter((x) => x.MA_TS == mats)
    },
    ChangeKhuVuc: async function (data) {
      this.KhuVucId = data.khuvuc_id
      try {
        this.Loading = true
        await Promise.all([this.getDanhSachNhanVienDaGan(), this.getDanhSachNhanVienChuaGan()])
      } catch (ex) {
        console.error('ChangeKhuVuc', ex)
      } finally {
        this.Loading = false
      }
    },
    getDmPhongBanHang: async function (id) {
      var input = {
        donvi_id: id,
        kieu: 1
      }
      var arr = []
      var data = this.GetData(await api.sp_lay_tt_nv_macdinh(this.axios, input))
      data.forEach(function (item) {
        if (arr.length === 0 || arr.filter((x) => x.donvi_id === item.donvi_id).length === 0) {
          let a = { id: item.donvi_id, text: item.ten_dv }
          arr.push(a)
        }
      })
      this.DsPhongBH = arr
      this.PopUpNhanVienQLDH.DsPhongBH = arr
      if (arr != null && arr.length > 0) this.PhongBhId = arr[0].id
      await this.getDsNhanVien(this.PhongBhId)
    },
    getDsNhanVien: async function (donviid) {
      console.log('getDsNhanVien', donviid)
      var input = {
        donvi_id: donviid,
        kieu: 2
      }
      let data = this.GetData(await api.sp_lay_tt_nv_macdinh(this.axios, input))
      this.PopUpNhanVienQLDH.DsNhanVien2 = data
      // this.PopUpNhanVienQLDH.DsNhanVien = data.map((x) => ({
      //   id: x.nhanvien_id,
      //   text: x.ten_nv == null ? '' : x.ten_nv
      // }))
      if (this.PopUpNhanVienQLDH.DsNhanVien2 != null && this.PopUpNhanVienQLDH.DsNhanVien2.length > 0) {
        this.PopUpNhanVienQLDH.NhanVienId = this.PopUpNhanVienQLDH.DsNhanVien2[0].nhanvien_id
      } else {
        this.PopUpNhanVienQLDH.NhanVienId = null
      }
    },
    GetData: function (response) {
      if (response.data.error === 200 || response.data.error === '200') {
        return response.data.data
      } else {
        if (response.data.data) {
          return response.data.data
        }
        console.log(response.data.error_code)
      }
      return []
    },
    ChangeLoaiKhuVuc: async function () {
      this.Loading = true
      try {
        await this.getDmKhuVucByLoaiKV(this.LoaiKhuVucId)
        this.Loading = false
      } catch (ex) {
        this.Loading = false
      }
    },
    onKhuVucSelect: async function () {
      try {
        let treeObj = document.getElementById('treeviewKhuVuc').ej2_instances[0]
        let kvid = treeObj.selectedNodes[0]
        console.log('kvid:' + kvid)
        this.KhuVucId = kvid
        let item = this.KhuVucTree.dataSource.filter((x) => x.khuvuc_id == kvid)
        if (item != null && item.length > 0 && item[0].ma_kv != null) {
          this.txtMaKV = item[0].ma_kv
        } else {
          this.txtMaKV = ''
        }
        this.Loading = true
        // await Promise.all([this.getDanhSachNhanVienDaGan(), this.getDanhSachNhanVienChuaGan()])
        await Promise.all([this.getDanhSachNhanVienDaGan()])
          .then((r) => {
            console.log(r)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            // this.Loading = false
          })
      } catch (err) {
      } finally {
        this.Loading = false
      }
    },
    ShowTimKhuVuc: function (item) {
      //this.$bvModal.show("my-modal2");
      this.PopUpNhanVienQL.manhanvien = this.MaNhanVien
      this.PopUpNhanVienQL.data = []
      if (this.PopUpNhanVienQL.manhanvien.length > 0) {
        this.Loading = true
        try {
          this.getDsKhuVucByMaNV(this.PopUpNhanVienQL.manhanvien).then((response) => {
            this.Loading = false
            this.$refs.dialogObjGanKhuVuc.show()
          })
        } catch (ex) {
          this.Loading = false
          this.PopUpNhanVienQL.data = []
          this.$refs.dialogObjGanKhuVuc.show()
        }
      } else {
        this.PopUpNhanVienQL.data = []
        this.$refs.dialogObjGanKhuVuc.show()
      }
    },
    dialogObjGanKhuVucOpen: function () {
      //this.$refs.manhanvienpopup.focus();
      this.$nextTick(() => this.$refs.manhanvienpopup.focus())
    },
    CloseTimKhuVuc: function (item) {
      //this.$bvModal.hide("my-modal2");
      this.$refs.dialogObjGanKhuVuc.hide()
    },
    ShowGanNhanVien: function (item) {
      //this.$bvModal.show("my-modal1");
      this.$refs.dialogObjGanNhanVien.show()
    },
    CloseGanNhanVien: function (item) {
      //this.$bvModal.hide("my-modal1");
      this.$refs.dialogObjGanNhanVien.hide()
    },
    thoatNhanVienQLDH() {
      this.$refs.dialogObjGanNhanVien.hide()
    },
    thoatTimKhuVuc() {
      this.$refs.dialogObjGanKhuVuc.hide()
    },
    GhiLai: async function () {
      if (!this.validateData()) {
        return
      }
      let donviId = parseInt(this.$root.token.getDonViID())
      let nhanvienId = parseInt(this.$root.token.getNhanVienID())
      let username = this.$root.token.getUserName()
      let khuvucnvdata = []
      let loainvId = this.LoaiNhanVienId
      let nhiemvuId = this.NhiemVuId
      let loaikhuvucId = this.LoaiKhuVucId
      if (this.NhanVienDaGan.data && this.NhanVienDaGan.data.length > 0) {
        this.NhanVienDaGan.data.forEach(function (item) {
          let a = {
            NHANVIEN_ID: item.nhanvien_id,
            LOAINV_ID: item.loainv_id, //loainvId
            NHIEMVU: item.nhiemvu //nhiemvuId
          }
          if (khuvucnvdata.filter((x) => x.NHANVIEN_ID == item.nhanvien_id && x.LOAINV_ID == item.loainv_id).length == 0) khuvucnvdata.push(a)
        })
      }
      /*
      if (khuvucnvdata.length === 0) {
        this.$toast.error(`Chưa có dữ liệu cập nhật`);
        return;
      }
      */

      let input = {
        loaikv_id: loaikhuvucId,
        nguoi_cn: username,
        data: khuvucnvdata,
        khuvuc_id: this.KhuVucId,
        ip: '127.0.0.1',
        loainv_id: this.LoaiNhanVienId,
        ds_loainv_id: this.NhanVienDaGan.data.map((x) => x.loainv_id).join('#'),
        ds_nhanvien_id: this.NhanVienDaGan.data.map((x) => x.nhanvien_id).join('#'),
        may_cn: 'web',
        ds_nhiemvu: this.NhanVienDaGan.data.map((x) => x.nhiemvu).join('#')
      }
      try {
        this.Loading = true
        this.btnGhiLaiStatus = false
        let response = await api.capnhatKhuvuc_nv_nh(this.axios, input)
        console.log('GhiLai Response', response)
        this.Loading = false
        if ((response.data.error === 200 || response.data.error === '200') && response.data.error_code == 'BSS-00000000') {
          this.$toast.success(`Cập nhật thành công !`)
        } else {
          console.log(response.data.error_code)
          this.$toast.error(`${response.data.error_code} - ${response.data.message}`)
        }
        this.btnGhiLaiStatus = true
      } catch (ex) {
        this.Loading = false
        this.btnGhiLaiStatus = true
        console.log('ex', ex)
        this.$toast.error(`${ex.data.message}`)
      }
    },
    PopUpNhanVienQLDH_GhiLai: async function () {
      try {
        this.Loading = true
        let donviId = parseInt(this.$root.token.getDonViID())
        let nhanvienId = parseInt(this.$root.token.getNhanVienID())
        let username = this.$root.token.getUserName()
        let input = {
          vdonvi_id: this.PhongBhId,
          vmay_cn: 'web',
          vnguoi_cn: username,
          vip_cn: '127.0.0.1',
          vnhanvien_id: this.PopUpNhanVienQLDH.NhanVienId
        }
        var response = await api.capnhatNhanvienMacdinh(this.axios, input)
        if ((response.data.error === 200 || response.data.error === '200') && response.data.error_code == 'BSS-00000000') {
          this.$toast.success(`Cập nhật thành công !`)
        } else {
          console.log(response.data.error_code)
          this.$toast.error(response.data.error_code)
        }
        await this.ShowData()
        this.FocusGridViewRow()
      } catch (err) {
        console.error(err)
        this.ShowError(`${err}`)
      } finally {
        this.Loading = false
      }
    },
    PopUpNhanVienQLDH_Xoa: async function () {
      let donviId = parseInt(this.$root.token.getDonViID())
      let nhanvienId = parseInt(this.$root.token.getNhanVienID())
      let username = this.$root.token.getUserName()
      if (this.PopUpNhanVienQLDH.data == null || this.PopUpNhanVienQLDH.data.length == 0) {
        this.ShowError('Không có dữ liệu!')
        return
      }
      this.$bvModal
        .msgBoxConfirm('Bạn chắc chắn muốn xóa ?', {
          centered: true,
          title: 'Xác nhận xóa',
          // okVariant: 'danger',
          size: 'sm',
          cancelTitle: 'Hủy',
          okTitle: 'Đồng ý'
          // ststic: false
        })
        .then(async (v) => {
          if (v) {
            let input = {
              vdonvi_id: this.PhongBhId,
              vmay_cn: 'web',
              vnguoi_cn: username,
              vip_cn: '127.0.0.1',
              vnhanvien_id: -1
            }
            var response = await api.capnhatNhanvienMacdinh(this.axios, input)
            if ((response.data.error === 200 || response.data.error === '200') && response.data.error_code == 'BSS-00000000') {
              this.$toast.success(`Xóa dữ liệu thành công! !`)
            } else {
              console.log(response.data.error_code)
              this.$toast.error(response.data.error_code)
            }
            await this.ShowData()
          }
        })
    },
    PopUpNhanVienQL_ChapNhan: async function () {
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   this.$toast.error("Bạn chưa nhập mã thuê bao");
      //   return;
      // }
      if (this.PopUpNhanVienQL.manhanvien == '') {
        this.$toast.error('Bạn chưa nhập mã nhân viên !')
        this.$refs.PopUpNhanVienQL_manhanvien.focus()
        return
      }
      this.Loading = true
      try {
        await this.getDsKhuVucByMaNV(this.PopUpNhanVienQL.manhanvien)
        this.Loading = false
      } catch (ex) {
        this.Loading = false
      }
    },
    MoveLeft: function () {
      var self = this
      var data = this.NhanVienChuaGan.data.filter((x) => x.ischecked)
      if (!(this.LoaiNhanVienId > 0)) {
        this.ShowError(`Bạn chưa chọn loại nhân viên !`)
        return
      }
      // var data = this.NhanVienChuaGan.data.checked
      if (data.length > 0) {
        console.log('data->Gan', data)
        data.forEach(function (item) {
          item.loainv_id = self.LoaiNhanVienId
          item.loai_nv = self.DmLoaiNhanVien.filter((x) => x.id == self.LoaiNhanVienId)[0].text
          item.nhiemvu = self.NhiemVuId
          item.ten_nhiemvu = self.DmNhiemVu.filter((x) => x.id == self.NhiemVuId)[0].text
          if (self.NhanVienDaGan.data.filter((x) => x.nhanvien_id == item.nhanvien_id && x.loainv_id == item.loainv_id).length == 0) {
            // self.NhanVienDaGan.data.push(item)
            self.NhanVienDaGan.data.unshift(item)
            try {
              if (self.NhanVienDaGan.daGan.filter((x) => x.nhanvien_id == item.nhanvien_id && x.loainv_id == item.loainv_id).length == 0) {
                self.NhanVienDaGan.daGan.push(item)
              }
            } catch (ex) {}
          }
        })
        self.NhanVienDaGan.data = self.NhanVienDaGan.data.slice(0)
      }
      this.NhanVienChuaGan.data = this.NhanVienChuaGan.data.filter((x) => !x.ischecked)
    },
    MoveLeftAll: function () {
      if (!(this.LoaiNhanVienId > 0)) {
        this.ShowError(`Bạn chưa chọn loại nhân viên !`)
        return
      }
      var self = this
      var data = this.NhanVienChuaGan.data
      if (data.length > 0) {
        data.forEach(function (item) {
          item.loainv_id = self.LoaiNhanVienId
          item.loai_nv = self.DmLoaiNhanVien.filter((x) => x.id == self.LoaiNhanVienId)[0].text
          item.nhiemvu = self.NhiemVuId
          item.ten_nhiemvu = self.DmNhiemVu.filter((x) => x.id == self.NhiemVuId)[0].text
          if (self.NhanVienDaGan.data.filter((x) => x.nhanvien_id == item.nhanvien_id && x.loainv_id == item.loainv_id).length == 0) {
            // self.NhanVienDaGan.data.push(item)
            self.NhanVienDaGan.data.unshift(item)
            try {
              if (self.NhanVienDaGan.daGan.filter((x) => x.nhanvien_id == item.nhanvien_id && x.loainv_id == item.loainv_id).length == 0) {
                self.NhanVienDaGan.daGan.push(item)
              }
            } catch (ex) {}
          }
        })
        self.NhanVienDaGan.data = self.NhanVienDaGan.data.slice(0)
      }
      this.NhanVienChuaGan.data = []
    },
    MoveRight: function () {
      var self = this
      var data = this.NhanVienDaGan.data.filter((x) => x.ischecked)
      // var data = this.NhanVienDaGan.data.checked
      if (data.length > 0) {
        data.forEach(function (item) {
          // self.NhanVienChuaGan.data.push(item)
          self.NhanVienChuaGan.data.unshift(item)
        })
        self.NhanVienChuaGan.data = self.NhanVienChuaGan.data.slice(0)
      } else {
        this.ShowAlert(`Bạn chưa chọn nhân viên`)
      }
      this.NhanVienDaGan.data = this.NhanVienDaGan.data.filter((x) => !x.ischecked)
    },
    MoveRightAll: function () {
      var self = this
      var data = this.NhanVienDaGan.data
      if (data.length > 0) {
        data.forEach(function (item) {
          // self.NhanVienChuaGan.data.push(item)
          self.NhanVienChuaGan.data.unshift(item)
        })
        self.NhanVienChuaGan.data = self.NhanVienChuaGan.data.slice(0)
      }
      this.NhanVienDaGan.data = []
    },
    gridnvDaGan_ActionBegin(args) {
      console.log('🚀 ~ file: StaffArea.vue ~ line 1049 ~ gridnvDaGan_ActionBegin ~ gridnvDaGan_ActionBegin', gridnvDaGan_ActionBegin)
      this.Loading = true
    },
    ShowAlert: function (msg) {
      this.$toast.error(msg)
    },
    ShowError: function (msg) {
      this.$toast.error(msg)
    },
    filterMaKV: function () {
      this.searchNodes(this.txtMaKV, 'ma_kv')
    },
    filterKV: function () {
      this.searchNodes(this.txtKV, 'ten_kv')
    },
    searchNodes: function (searchText, col) {
      var _text = searchText // this.txtMaKV
      var seft = this
      // eslint-disable-next-line one-var
      var predicats = [],
        _array = [],
        _filter = []
      let treeObj = document.getElementById('treeviewKhuVuc').ej2_instances[0]
      if (_text == '') {
        this.changeDataSource(seft.KhuVucTree.dataSource)
      } else {
        // var predicate = new Predicate('ma_kv', 'contains', _text, true)
        var predicate = new Predicate(col, 'contains', _text, true)
        var filteredList = new DataManager(seft.KhuVucTree.dataSource).executeLocal(new Query().where(predicate))
        console.log(`filteredList:${filteredList.length}`)
        console.log(filteredList)
        for (var j = 0; j < filteredList.length; j++) {
          _filter.push(filteredList[j]['khuvuc_id'])
          var filters = this.getFilterItems(filteredList[j], seft.KhuVucTree.dataSource)

          for (var i = 0; i < filters.length; i++) {
            if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
              _array.push(filters[i])
              predicats.push(new Predicate('khuvuc_id', 'equal', filters[i], false))
            }
          }
        }
        if (predicats.length == 0) {
          this.changeDataSource([])
        } else {
          var query = new Query().where(new Predicate.or(predicats))
          var newList = new DataManager(this.KhuVucTree.dataSource).executeLocal(query)
          seft.changeDataSource(newList)
          setTimeout(function () {
            treeObj.expandAll()
          }, 100)
        }
      }
    },
    getFilterItems: function (fList, list) {
      var nodes = []
      nodes.push(fList['khuvuc_id'])
      var query2 = new Query().where('khuvuc_id', 'equal', fList['khuvuc_cha_id'], false)
      var fList1 = new DataManager(list).executeLocal(query2)
      if (fList1.length != 0) {
        var pNode = this.getFilterItems(fList1[0], list)
        for (var i = 0; i < pNode.length; i++) {
          if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null) {
            nodes.push(pNode[i])
          }
        }
        return nodes
      }
      return nodes
    },
    changeDataSource: function (data) {
      let treeObj = document.getElementById('treeviewKhuVuc').ej2_instances[0]
      treeObj.fields = {
        dataSource: data,
        id: 'khuvuc_id',
        text: 'ten_kv',
        parentID: 'khuvuc_cha_id',
        hasChildren: 'hasChild'
      }
      /*
      this.fields = {
        dataSource: this.TreeData,
        id: 'khuvuc_id',
        parentID: 'khuvuc_cha_id',
        text: 'ten_kv',
        hasChildren: 'hasChild'
      }
      */
    },
    ShowLichSuCapNhat: async function () {
      try {
        this.Loading = true
        await this.getLogsKhuVucNhanVien()
        this.Loading = false
        this.$refs.dialogObjLichSu.show()
      } catch (ex) {
        this.Loading = false
        this.ShowAlert('Lỗi lấy dữ liệu lịch sử !')
      }
    },
    CloseLichSuCapNhat: function () {
      this.LogsKhuVucNhanVien.data = []
      this.$refs.dialogObjLichSu.hide()
    },
    dialogObjLichSu_dataBound: function () {
      this.$refs.gridLogsKhuVucNhanVien.grid.autoFitColumns(['loai_kv', 'ma_kv', 'ten_kv', 'thaotac', 'nguoi_cn', 'may_cn'])
    },
    khuVuc_dataBound: function () {
      this.$refs.khuVuc.grid.autoFitColumns(['stt', 'ma_kv', 'ten_kv', 'ma_kv_cha'])
    },
    gridnvChuaGan_DataBound: function () {
      this.$refs.nvchuaGan.grid.autoFitColumns([])
    },
    cbb_DsNhanVienChanged(item) {
      console.log('cbb_DsNhanVienChanged', item)
      this.PopUpNhanVienQLDH.NhanVienId = item.nhanvien_id
    },
    async grvDanhSach_FocusedRowChanged(i, item) {
      try {
        this.Loading = true
        console.log('grvDanhSach_FocusedRowChanged', item)
        if (this.PhongBhId != item.donvi_id) {
          this.PhongBhId = item.donvi_id
          await this.cboPhongBH_EditValueChanged(item.donvi_id)
        }
        this.PopUpNhanVienQLDH.NhanVienId = item.nhanvien_id
        // await this.ShowData()
      } catch (err) {
        console.error(err)
      } finally {
        this.Loading = false
      }
    },
    async opendialogObjGanNhanVien() {
      console.log('opendialogObjGanNhanVien')
      try {
        this.Loading = true
        await this.ShowData()
      } catch (err) {
        console.log('opendialogObjGanNhanVien', err)
      } finally {
        this.Loading = false
      }
    },
    async ShowData() {
      let input = {
        donvi_id: this.PhongBhId,
        kieu: 3
      }
      let phanvungId = this.$root.token.getPhanVungID()
      console.log('ShowData', input)
      let data = this.GetData(await api.sp_lay_tt_nv_macdinh(this.axios, input))
      if (data != null && data.length > 0) data = data.filter((x) => x.phanvung_id == phanvungId)
      this.PopUpNhanVienQLDH.data = data
      // if (data != null && data.length > 0) await this.grvDanhSach_FocusedRowChanged(0, data[0])
    },
    async cboPhongBH_EditValueChanged(donviId) {
      try {
        this.Loading = true
        console.log('cboPhongBH_EditValueChanged', donviId)
        await this.getDsNhanVien(donviId)
        this.FocusGridViewRow()
      } catch (err) {
        console.error('cboPhongBH_EditValueChanged', err)
      } finally {
        this.Loading = false
      }
    },
    async grvDanhSach_RowDataBound(args) {
      // console.log('grvDanhSach_RowDataBound', args)
      if (args.data['donvi_id'] == this.PhongBhId) {
        this.selIndex.push(parseInt(args.row.getAttribute('aria-rowindex')))
        try {
          await this.grvDanhSach_FocusedRowChanged(parseInt(args.row.getAttribute('aria-rowindex')), args.data)
        } catch (err) {
          console.log('🚀 ~ file: StaffArea.vue ~ line 1247 ~ grvDanhSach_RowDataBound ~ err', err)
        }
      }
    },
    grvDanhSach_DataBound(args) {
      console.log('grvDanhSach_DataBound', args)
      if (this.selIndex.length > 0) {
        this.$refs.refgrvDanhSach.grid.selectRows(this.selIndex)
        this.selIndex = []
      }
    },
    FocusGridViewRow_Old() {
      try {
        let data = this.PopUpNhanVienQLDH.data.filter((x) => x.donvi_id == this.PhongBhId)
        console.log('FocusGridViewRow', data)
        if (data != null && data.length > 0) {
          // let i = this.$refs.refgrvDanhSach.grid.getRowIndexByPrimaryKey(data.map((x) => x.nhanvien_id))
          // console.log('getRowIndexByPrimaryKey', i)
          this.$refs.refgrvDanhSach.selectRowsByRowData(data)
        } else {
          console.log('FocusGridViewRow null', data)
        }
      } catch (err) {
        console.log('🚀 ~ file: StaffArea.vue ~ line 1260 ~ FocusGridViewRow ~ err', err)
      }
    },
    FocusGridViewRow() {
      try {
        this.PopUpNhanVienQLDH.data = this.PopUpNhanVienQLDH.data.slice(0)

        // console.log('FocusGridViewRow')
        // this.selIndex = []
        // for (let i = 0; i < this.PopUpNhanVienQLDH.data.length; i++) {
        //   if (this.PopUpNhanVienQLDH.data[i].donvi_id == this.PhongBhId) {
        //     this.selIndex.push(i)
        //     console.log('FocusGridViewRow', i, this.PopUpNhanVienQLDH.data[i], this.PhongBhId)
        //   }
        // }
        // this.$refs.refgrvDanhSach.grid.selectRows(this.selIndex)
        // this.selIndex = []
      } catch (err) {
        console.log('🚀 ~ file: StaffArea.vue ~ line 1260 ~ FocusGridViewRow ~ err', err)
      }
    }
  }
}
</script>
