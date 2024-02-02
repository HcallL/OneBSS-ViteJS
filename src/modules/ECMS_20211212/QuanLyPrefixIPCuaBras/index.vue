<template src="./index.template.html"></template>
<style>
    .select-bras .vue-treeselect__control {
        height: 32px !important;
    }

    .quanly-prefix-cua-bras .disable-btn:hover {
        background-color: white !important;
    }

    .quanly-prefix-cua-bras .disable-btn a {
        color: #6c757d !important;
    }

    .quanly-prefix-cua-bras .disable-btn a:hover {
        cursor: default;
        color: #6c757d;
    }
</style>
<script>
    import BssLocalPagination1 from '@/components/BssLocalPagination_1'
    import BssPagination2 from '@/components/BssPagination_2'
    import BssErrorMarker from '@/components/BssErrorMarker'
    import BssRequiredMarker from '@/components/BssRequiredMarker'
    import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

    export default {
        name: 'QuanLyPrefixIPCuaBras',
        components: {BssLocalPagination1, BssErrorMarker, BssRequiredMarker, BssPagination2},
        computed: {
            treeSelectOptions () {
                return this.dsBras.map(item => { return { id: item.BRAS_ID, label: item.TENBRAS }})
            },
            sortIconLoaiHinhDaGan() {

                if (!this.tableDsLoaiTbDaGan.sortedTable) {
                    return 'fa-sort'
                }

                if (this.tableDsLoaiTbDaGan.sortedTable == 1) {
                    return 'btn-sorted fa-caret-up'
                }

                return 'btn-sorted fa-caret-down'
            },
            sortIconLoaiHinhChuaGan() {

                if (!this.tableDsLoaiTbChuaGan.sortedTable) {
                    return 'fa-sort'
                }

                if (this.tableDsLoaiTbChuaGan.sortedTable == 1) {
                    return 'btn-sorted fa-caret-up'
                }

                return 'btn-sorted fa-caret-down'
            }
        },
        methods: {
            async layDsPrefixIp () {
                try {
                    let response = await this.$root.context.get('/web-ecms/prefix-ip-bras/lay-ds-prefix-ip')
                    this.dsPrefixIp = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            async layDsLoaiTbDaGan (prefix) {
                try {
                    let response = await this.$root.context.get('/web-ecms/prefix-ip-bras/lay-ds-loaitb-dagan', { prefix: prefix })
                    this.dsLoaiTbDaGan = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            setDsLoaiTbDaGan (data) {
                this.dsLoaiTbDaGan = data
            },
            async layDsLoaiTbChuaGan (data) {
                try {
                    let response = await this.$root.context.post('/web-ecms/prefix-ip-bras/lay-ds-loaitb-chuagan', data)
                    this.dsLoaiTbChuaGan = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            setDsLoaiTbChuaGan (data) {
                this.dsLoaiTbChuaGan = data
            },
            async layDsIp (prefix) {
                try {
                    let response = await this.$root.context.get('/web-ecms/prefix-ip-bras/lay-ds-ip', { prefix: prefix })
                    this.dsIp = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            setDsIp (data) {
                this.dsIp =  data
            },
            async layDsBras () {
                try {
                    let response = await this.$root.context.get('/web-ecms/danhmuc/quanlybras/danhsach')
                    this.dsBras = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            async themMoi (data) {
                try {
                    let response = await this.$root.context.post('/web-ecms/prefix-ip-bras/themmoi', data)

                    if (response.error_code === 'BSS-00000000') {
                        return {
                            message: 'Cập nhật thành công',
                            data: response.data
                        }
                    }

                    throw {response: { data: response}}
                } catch (err) {
                    let responseData = err.response.data
                    let message = responseData.message

                    if (responseData.message_detail) {
                        message += '\n' + responseData.message_detail
                    }

                    if (responseData.data) {
                        let detailMessage = Object.getOwnPropertyNames(responseData.data).map(item => responseData.data[item])
                        message = message + '\n' +  [...new Set(detailMessage)].join('\n')
                    }

                    throw message
                }
            },
            async capNhat (data) {
                try {
                    let response = await this.$root.context.post('/web-ecms/prefix-ip-bras/capnhat', data)

                    if (response.error_code === 'BSS-00000000') {
                        return 'Cập nhật thành công'
                    }

                    throw {response: { data: response}}
                } catch (err) {
                    let responseData = err.response.data
                    let message = responseData.message

                    if (responseData.message_detail) {
                        message += '\n' + responseData.message_detail
                    }

                    if (responseData.data) {
                        let detailMessage = Object.getOwnPropertyNames(responseData.data).map(item => responseData.data[item])
                        message = message + '\n' +  [...new Set(detailMessage)].join('\n')
                    }

                    throw message
                }
            },
            async kiemTraPrefix (data) {
                try {
                    let response = await this.$root.context.post(`/web-ecms/prefix-ip-bras/kiemtra-prefix-ip?prefix=${data}`)

                    if (response.error_code !== 'BSS-00000000') {
                        throw {response: { data: response}}
                    }
                } catch (err) {
                    let message = response.data.message

                    if (response.data.message_detail) {
                        message += '\n' + response.data.message_detail
                    }

                    throw message
                }
            },
            async xoaPrefix(data) {
                try {
                    let response = await this.$root.context.post(`/web-ecms/prefix-ip-bras/xoa?prefix=${data}`)

                    if (response.error_code !== 'BSS-00000000') {
                        throw {response: { data: response}}
                    }
                } catch (err) {
                    let responseData = err.response.data
                    let message = []

                    if (responseData.message) {
                        message.push(responseData.message)
                    }

                    if (responseData.message_detail) {
                        message.push(responseData.message_detail)
                    }

                    if (responseData.data) {
                        let detailMessage = Object.getOwnPropertyNames(responseData.data).map(item => responseData.data[item])
                        message.push([...new Set(detailMessage)].join('\n'))
                    }

                    throw message.join('\n')
                }
            },
            async sinhIp (data) {
                try {
                    let response = await this.$root.context.post('/web-ecms/prefix-ip-bras/sinh-ip', data)

                    if (response.error_code !== 'BSS-00000000') {
                        throw {response: { data: response}}
                    }
                } catch (err) {
                    let response = err.response.data
                    let message = []

                    if (response.message) {
                        message.push(response.message)
                    }

                    if (response.message_detail) {
                        message.push(response.message_detail)
                    }

                    if (response.data) {
                        let detailMessage = Object.getOwnPropertyNames(response.data).map(item => response.data[item])
                        message.push([...new Set(detailMessage)].join('\n'))
                    }

                    throw message.join('\n')
                }
            },
            async layDsDichVuVt () {
                try {
                    let response = await this.$root.context.get('/web-ecms/prefix-ip-bras/dm-dichvu-vt')
                    this.dsDichVuVt = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            async layDsLoaiIp () {
                try {
                    let response = await this.$root.context.get('/web-ecms/prefix-ip-bras/dm-loai-ip')
                    this.dsLoaiIp = response.data != null ? response.data : []
                } catch (err) {
                    throw err
                }
            },
            onChangeComboDichvuvtId: async function (event) {
                try {
                    this.loading(true)
                    await this.layDsLoaiTbChuaGan({ prefix: this.tablePrefix.selectedData.PREFIX, dichvuvt_id: event.target.value })
                    this.tableDsLoaiTbChuaGan.sortedTable = null
                } catch (err) {

                } finally {
                    this.loading(false)
                }
            },
            onClickDongCuaBangDsLoaiTbChuaGan (loaiTbId, rowIndex) {
                this.tableDsLoaiTbChuaGan.selected = loaiTbId
                this.tableDsLoaiTbChuaGan.selectedRowIndex = rowIndex
            },
            onClickDongCuaBangDsLoaiTbDaGan (loaiTbId, rowIndex) {
                this.tableDsLoaiTbDaGan.selected = loaiTbId
                this.tableDsLoaiTbDaGan.selectedRowIndex = rowIndex
            },
            onClickDongCuaBangDsIp (ip, rowIndex) {
                this.tableDsIp.selected = ip
                this.tableDsIp.selectedRowIndex = rowIndex
            },
            onClickButtonGoGan () {
                let dsLoaiTbGo = this.dsLoaiTbDaGan.filter(item => this.tableDsLoaiTbDaGan.checked.includes(item.LOAITB_ID))
                this.setDsLoaiTbDaGan(this.dsLoaiTbDaGan.filter(item => !dsLoaiTbGo.includes(item)))
                this.setDsLoaiTbChuaGan(dsLoaiTbGo.concat(this.dsLoaiTbChuaGan))
            },
            onClickButtonGan () {
                let dsLoaiTbGan = this.dsLoaiTbChuaGan.filter(item => this.tableDsLoaiTbChuaGan.checked.includes(item.LOAITB_ID))
                this.setDsLoaiTbChuaGan(this.dsLoaiTbChuaGan.filter(item => !dsLoaiTbGan.includes(item)))
                this.setDsLoaiTbDaGan(dsLoaiTbGan.concat(this.dsLoaiTbDaGan))
            },
            onClickButtonNhapMoi () {
                if (!this.buttonState.btnNhapMoiEnabled) {
                    return
                }

                this.clear()
                this.tableDsLoaiTbChuaGan.searchData.LOAIHINH_TB = ''
                this.tableDsLoaiTbChuaGan.searchData.CHECKED = false
                this.tableDsLoaiTbDaGan.searchData.LOAIHINH_TB = ''
                this.tableDsLoaiTbDaGan.searchData.CHECKED = false
                this.setButton(0)

                let grid = this.$refs['grid-prefix']
                this.oldSelectedRowIndexPrefix = grid.getCurrentSelectedRow()
                grid.setCurrentSelectedRow(-1)
                this.tableDsIp.selectedRowIndex = 0
            },
            onClickButtonHuyBo () {

                if (!this.buttonState.btnNhapMoiEnabled) {
                    this.setButton(1)
                    this.$refs['grid-prefix'].setCurrentSelectedRow(this.oldSelectedRowIndexPrefix)
                    return
                }

                this.hienThiDsPrefix()
            },
            async onClickButtonCapNhat () {

                let errorMessage = []

                this.$v.$touch()

                if (this.$v.$invalid) {

                    if (!this.$v.brasId.required) {
                        errorMessage.push("Bạn chưa chọn bras")
                    }

                    if (!this.$v.prefix.required) {
                        errorMessage.push("Bạn chưa nhập prefix")
                    }

                    if (!this.$v.tuso.khongLonHonDenSo) {
                        errorMessage.push('Từ số không được lớn hơn Đến số')
                    }

                    if (!this.$v.loaiIpId.required) {
                        errorMessage.push("Bạn chưa chọn loại IP")
                    }
                }

                if (!this.dsLoaiTbDaGan || this.dsLoaiTbDaGan.length == 0) {
                    errorMessage.push("Bạn chưa nhập loại hình thuê bao")
                }

                if (errorMessage.length > 0) {
                    this.$toast.error(errorMessage.join('\n'))
                    return
                }

                let data = {
                    bras_id: this.brasId.join(','),
                    prefix: this.prefix,
                    tuso: this.tuso + '',
                    denso: this.denso + '',
                    loai_id: this.loaiIpId + '',
                    ds_loaitb_id: this.dsLoaiTbDaGan.map(item => item.LOAITB_ID).join()
                }

                try {
                    let result = null

                    this.loading(true)

                    if (!this.buttonState.btnNhapMoiEnabled) {
                        result = await this.themMoi(data)
                        this.dsPrefixIp.unshift(result.data)
                        this.$refs['grid-prefix'].setCurrentSelectedRow(0)
                        this.loading(false)
                        this.$toast.success(result.message)
                    } else {
                        result = await this.capNhat(data)
                        this.tablePrefix.selectedData.BRAS_ID = data.bras_id
                        this.tablePrefix.selectedData.PREFIX = data.prefix
                        this.tablePrefix.selectedData.TUSO = data.tuso
                        this.tablePrefix.selectedData.DENSO = data.denso
                        this.tablePrefix.selectedData.LOAI_ID = data.loai_id
                        this.tablePrefix.selectedData.LOAI = this.dsLoaiIp.filter(item => item.LOAI_ID == data.loai_id)[0].LOAI
                        this.tablePrefix.selectedData.TENBRAS = this.dsBras.filter(item => this.brasId.indexOf(item.BRAS_ID) >= 0).map(item => item.TENBRAS).join(', ')
                        this.loading(false)
                        this.$toast.success(result)
                    }
                } catch (err) {
                    this.loading(false)
                    this.$toast.error(err)
                }
            },
            async onClickButtonXoa () {
                if (!this.buttonState.btnXoaEnabled) {
                    return
                }

                try {
                    this.loading(true)
                    await this.kiemTraPrefix(this.tablePrefix.selectedData.PREFIX)
                } catch (err) {
                    this.$toast.error(err)
                    return
                } finally {
                    this.loading(false)
                }

                this.xacNhanXoa = true
            },
            async okXoaPrefix () {
                try {
                    this.loading(true)
                    await this.xoaPrefix(this.tablePrefix.selectedData.PREFIX)
                    this.$toast.success('Cập nhật thành công')
                } catch (err) {
                    this.$toast.error(err)
                    return
                } finally {
                    this.loading(false)
                }

                this.hienThiDsPrefix()
            },
            async onClickButtonSinhIp () {
                if (!this.buttonState.btnSinhIPEnabled) {
                    return
                }

                try {
                    this.loading(true)
                    await this.sinhIp({prefix: this.tablePrefix.selectedData.PREFIX})
                    this.$toast.success('Cập nhật thành công')
                    await this.layDsIp(this.tablePrefix.selectedData.PREFIX)
                } catch (err) {
                    this.$toast.error(err)
                } finally {
                    this.loading(false)
                }
            },
            onPageChangeDsLoaiTbChuaGan (data) {
                this.tableDsLoaiTbChuaGan.data = data.pageData

                if (data.pageData && data.pageData.length > 0) {
                    this.tableDsLoaiTbChuaGan.selected = data.selectedRowData.LOAITB_ID
                }
            },
            onPageChangeDsLoaiTbDaGan (data) {
                this.tableDsLoaiTbDaGan.data = data.pageData

                if (data.pageData && data.pageData.length > 0) {
                    this.tableDsLoaiTbDaGan.selected = data.selectedRowData.LOAITB_ID
                }
            },
            onPageChangeDsIp (data) {
                this.tableDsIp.data = data.pageData

                if (data.pageData && data.pageData.length > 0) {
                    this.tableDsIp.selected = data.selectedRowData.IP
                }
            },
            async hienThiDsPrefix () {
                try {
                    this.loading(true)
                    await this.layDsPrefixIp()
                } catch (err) {

                } finally {
                    this.loading(false)
                }

                if (!this.dsPrefixIp || this.dsPrefixIp.length == 0) {
                    this.setButton(0)
                } else {
                    this.setButton(1)
                    this.$refs['grid-prefix'].setCurrentSelectedRow(0)
                }
            },
            setButton (kieu) {
                if (kieu == 0) { //nhap moi, chua co du lieu
                    this.buttonState.btnNhapMoiEnabled = false
                    this.buttonState.btnCapNhatEnabled = true
                    this.buttonState.btnXoaEnabled = false
                    this.buttonState.btnSinhIPEnabled = false
                } else if (kieu == 1) { //sua
                    this.buttonState.btnNhapMoiEnabled = true
                    this.buttonState.btnCapNhatEnabled = true
                    this.buttonState.btnXoaEnabled = true
                    this.buttonState.btnSinhIPEnabled = true
                }
            },
            async clear () {
                this.brasId = []
                this.prefix = ''
                this.tuso = 0
                this.denso = 0

                this.setDsLoaiTbDaGan([])
                this.setDsIp([])

                try {
                    this.loading(true)
                    await this.layDsLoaiTbChuaGan({ prefix: '', dichvuvt_id: this.dichvuvtId })
                } catch (err) {

                } finally {
                    this.loading(false)
                }

                this.$v.$reset()
            },
            async hienThiThongTinPrefix () {
                let prefixInfo = this.tablePrefix.selectedData
                this.prefix = prefixInfo.PREFIX
                this.brasId = !prefixInfo.BRAS_ID ? [] : (prefixInfo.BRAS_ID + '').split(',').map(item => parseInt(item))
                this.loaiIpId = prefixInfo.LOAI_ID
                this.tuso = prefixInfo.TUSO
                this.denso = prefixInfo.DENSO

                try {
                    this.loading(true)
                    let loading1 = this.layDsLoaiTbDaGan(this.prefix)
                    let loading2 = this.layDsLoaiTbChuaGan({ prefix: this.prefix, dichvuvt_id: this.dichvuvtId })
                    let loading3 = this.layDsIp(this.prefix)
                    await loading1
                    await loading2
                    await loading3
                    this.tableDsLoaiTbDaGan.sortedTable = null
                    this.tableDsLoaiTbChuaGan.sortedTable = null
                } catch (err) {

                } finally {
                    this.loading(false)
                }
            },
            onFilterLoaiHinhChuaGan () {

                let loaiHinhTb = this.tableDsLoaiTbChuaGan.searchData.LOAIHINH_TB
                let checked = this.tableDsLoaiTbChuaGan.searchData.CHECKED

                if (!loaiHinhTb) {
                    loaiHinhTb = ''
                }

                this.pagerDsLoaiTbChuaGan = this.dsLoaiTbChuaGan.filter(item => {
                        return item.LOAIHINH_TB.toLowerCase().includes(loaiHinhTb.toLowerCase())
                                && (!checked || this.tableDsLoaiTbChuaGan.checked.indexOf(item.LOAITB_ID) >= 0)
                    })
            },
            onFilterLoaiHinhDaGan () {

                let loaiHinhTb = this.tableDsLoaiTbDaGan.searchData.LOAIHINH_TB
                let checked = this.tableDsLoaiTbDaGan.searchData.CHECKED

                if (!loaiHinhTb) {
                    loaiHinhTb = ''
                }

                this.pagerDsLoaiTbDaGan = this.dsLoaiTbDaGan.filter(item => {
                        return item.LOAIHINH_TB.toLowerCase().includes(loaiHinhTb.toLowerCase())
                                && (!checked || this.tableDsLoaiTbDaGan.checked.indexOf(item.LOAITB_ID) >= 0)
                    })
            },
            onFilterDsPrefix () {

                let tenBras = this.tablePrefix.searchData.TENBRAS
                let prefix = this.tablePrefix.searchData.PREFIX
                let tuSo = this.tablePrefix.searchData.TUSO
                let denSo = this.tablePrefix.searchData.DENSO
                let loai = this.tablePrefix.searchData.LOAI

                if (!tenBras) {
                    tenBras = ''
                }

                if (!prefix) {
                    prefix = ''
                }

                if (!tuSo) {
                    tuSo = ''
                }

                if (!denSo) {
                    denSo = ''
                }

                if (!loai) {
                    loai = ''
                }

                this.tablePrefix.dataSource = this.dsPrefixIp.filter(item => {
                    return (!item.TENBRAS ? '' : item.TENBRAS).toLowerCase().includes(tenBras.toLowerCase())
                            && item.PREFIX.toLowerCase().includes(prefix.toLowerCase())
                            && (item.TUSO + '').includes(tuSo.toLowerCase())
                            && (item.DENSO + '').includes(denSo.toLowerCase())
                            && item.LOAI.toLowerCase().includes(loai.toLowerCase())
                })

                this.tablePrefix.paginationKey++
            },
            onFilterDsIp () {
                let ip = this.tableDsIp.searchData.IP
                let trangThai = this.tableDsIp.searchData.TEN_TTSO

                if (!ip) {
                    ip = ''
                }

                if (!trangThai) {
                    trangThai = ''
                }

                this.pagerDsIp = this.dsIp.filter(item => {
                        return item.IP.toLowerCase().includes(ip.toLowerCase())
                                && item.TEN_TTSO.toLowerCase().includes(trangThai.toLowerCase())
                    })
            },
            onPageChangeTablePrefix (data) {
                this.tablePrefix.selectedRowIndexOnPage = data.rowIndexOnPage
                this.tablePrefix.selectedRowIndexOnData = data.rowIndexOnData

                if (data.pageIndex > 0) {
                    let to = data.pageIndex * data.pageSize
                    let from = to - data.pageSize
                    this.tablePrefix.pagerData = this.tablePrefix.dataSource.slice(from, to)
                    this.tablePrefix.selectedData = this.tablePrefix.pagerData[data.rowIndexOnPage - 1]
                    this.hienThiThongTinPrefix()
                    this.setButton(1)
                } else {
                    this.tablePrefix.pagerData = []
                    this.tablePrefix.selectedData = null
                    this.clear()
                }
            },
            onRowChangeTablePrefix (data) {
                this.tablePrefix.selectedRowIndexOnPage = data.rowIndexOnPage
                this.tablePrefix.selectedRowIndexOnData = data.rowIndexOnData
                this.tablePrefix.selectedData = this.tablePrefix.pagerData[data.rowIndexOnPage - 1]
                this.hienThiThongTinPrefix()
                this.setButton(1)
            },
            onClickRowTablePrefix (rowIndex) {
                this.tablePrefix.selectedRowIndexOnPage = rowIndex
            },
            onSelectRowPrefixIp (rowData) {

                this.tablePrefix.selectedData = rowData

                if (!this.tablePrefix.selectedData) {
                    return
                }

                this.hienThiThongTinPrefix()
                this.setButton(1)
            },
            onClickBtnSortLoaiHinhChuaGan() {

                if (!this.tableDsLoaiTbChuaGan.sortedTable) {
                    this.tableDsLoaiTbChuaGan.sortedTable = 1
                    return
                }

                this.tableDsLoaiTbChuaGan.sortedTable = this.tableDsLoaiTbChuaGan.sortedTable == 1 ? -1 : 1
            },
            onClickBtnSortLoaiHinhDaGan() {

                if (!this.tableDsLoaiTbDaGan.sortedTable) {
                    this.tableDsLoaiTbDaGan.sortedTable = 1
                    return
                }

                this.tableDsLoaiTbDaGan.sortedTable = this.tableDsLoaiTbDaGan.sortedTable == 1 ? -1 : 1
            },
        },
        async mounted () {
            this.$refs['prefix-input'].focus()

            try {
                this.loading(true)
                let loading1 = this.layDsBras()
                let loading2 = this.layDsLoaiIp()
                let loading3 = this.layDsDichVuVt()
                await loading1
                await loading2
                await loading3

                if (this.dsLoaiIp && this.dsLoaiIp.length > 0) {
                    this.loaiIpId = this.dsLoaiIp[0].LOAI_ID
                }

                if (this.dsDichVuVt && this.dsDichVuVt.length > 0) {
                    this.dichvuvtId = this.dsDichVuVt[0].DICHVUVT_ID
                    await this.layDsLoaiTbChuaGan({ prefix: '', dichvuvt_id: this.dichvuvtId })
                }
            } catch (err) {

            } finally {
                this.loading(false)
            }

            this.hienThiDsPrefix()
        },
        watch: {
            dsPrefixIp (newVal) {
                this.tablePrefix.searchData.TENBRAS = ''
                this.tablePrefix.searchData.PREFIX = ''
                this.tablePrefix.searchData.TUSO = ''
                this.tablePrefix.searchData.DENSO = ''
                this.tablePrefix.searchData.LOAI = ''
                this.tablePrefix.dataSource = [...newVal]
                this.tablePrefix.paginationKey++
            },
            dsLoaiTbChuaGan (newVal) {
                this.tableDsLoaiTbChuaGan.checked = []
                this.tableDsLoaiTbChuaGan.searchData.LOAIHINH_TB = ''
                this.tableDsLoaiTbChuaGan.searchData.CHECKED = false
                this.pagerDsLoaiTbChuaGan = [...newVal]
            },
            dsLoaiTbDaGan (newVal) {
                this.tableDsLoaiTbDaGan.checked = []
                this.tableDsLoaiTbDaGan.searchData.LOAIHINH_TB = ''
                this.tableDsLoaiTbDaGan.searchData.CHECKED = false
                this.pagerDsLoaiTbDaGan = [...newVal]
            },
            dsIp (newVal) {
                this.tableDsIp.searchData.IP = ''
                this.tableDsIp.searchData.TEN_TTSO = ''
                this.pagerDsIp = [...newVal]
            },
            checkAllLoaiHinhDaGan(newVal) {

                if (newVal) {
                    this.tableDsLoaiTbDaGan.checked = this.dsLoaiTbDaGan.map(item => item.LOAITB_ID)
                    return
                }

                if (this.tableDsLoaiTbDaGan.checked.length > 0
                    && this.tableDsLoaiTbDaGan.checked.length == this.dsLoaiTbDaGan.length) {
                    this.tableDsLoaiTbDaGan.checked = []
                }
            },
            'tableDsLoaiTbDaGan.checked': function(newVal) {
                this.checkAllLoaiHinhDaGan = newVal.length > 0 && newVal.length == this.dsLoaiTbDaGan.length
            },
            checkAllLoaiHinhChuaGan(newVal) {

                if (newVal) {
                    this.tableDsLoaiTbChuaGan.checked = this.dsLoaiTbChuaGan.map(item => item.LOAITB_ID)
                    return
                }

                if (this.tableDsLoaiTbChuaGan.checked.length > 0
                    && this.tableDsLoaiTbChuaGan.checked.length == this.dsLoaiTbChuaGan.length) {
                    this.tableDsLoaiTbChuaGan.checked = []
                }
            },
            'tableDsLoaiTbChuaGan.checked': function(newVal) {
                this.checkAllLoaiHinhChuaGan = newVal.length > 0 && newVal.length == this.dsLoaiTbChuaGan.length
            },
            'tableDsLoaiTbChuaGan.sortedTable': function (newVal) {

                if (this.dsLoaiTbChuaGan.length == 0 || !newVal) {
                    return
                }

                let dsLoaiHinh = [...this.dsLoaiTbChuaGan]

                dsLoaiHinh.sort((a, b) => {

                    var nameA = a.LOAIHINH_TB.toUpperCase()
                    var nameB = b.LOAIHINH_TB.toUpperCase()

                    if (nameA < nameB) {
                        return newVal == 1 ? -1 : 1
                    }

                    if (nameA > nameB) {
                        return newVal == 1 ? 1 : -1
                    }

                    return 0
                })

                this.pagerDsLoaiTbChuaGan = dsLoaiHinh
            },
            'tableDsLoaiTbDaGan.sortedTable': function (newVal) {

                if (this.dsLoaiTbDaGan.length == 0 || !newVal) {
                    return
                }

                let dsLoaiHinh = [...this.dsLoaiTbDaGan]

                dsLoaiHinh.sort((a, b) => {

                    var nameA = a.LOAIHINH_TB.toUpperCase()
                    var nameB = b.LOAIHINH_TB.toUpperCase()

                    if (nameA < nameB) {
                        return newVal == 1 ? -1 : 1
                    }

                    if (nameA > nameB) {
                        return newVal == 1 ? 1 : -1
                    }

                    return 0
                })

                this.pagerDsLoaiTbDaGan = dsLoaiHinh
            }
        },
        validations: {
            brasId: {
                required
            },
            prefix: {
                required
            },
            loaiIpId: {
                required
            },
            tuso: {
                khongLonHonDenSo: (tuso, vm) => tuso <= vm.denso
            }
        },
        data () {
            return {
                tableDsLoaiTbChuaGan: {
                    data: [],
                    selected: 0,
                    checked: [],
                    selectedRowIndex: 0,
                    searchData: {
                        LOAIHINH_TB: '',
                        CHECKED: false
                    },
                    sortedTable: null // -1: desc, 1: asc
                },
                tableDsLoaiTbDaGan: {
                    data: [],
                    selected: 0,
                    checked: [],
                    selectedRowIndex: 0,
                    searchData: {
                        LOAIHINH_TB: '',
                        CHECKED: false
                    },
                    sortedTable: null // -1: desc, 1: asc
                },
                tableDsIp: {
                    data: [],
                    selected: 0,
                    selectedRowIndex: 0,
                    searchData: {
                        IP: '',
                        TEN_TTSO: ''
                    }
                },
                pagerDsLoaiTbChuaGan: [],
                pagerDsLoaiTbDaGan: [],
                pagerDsIp: [],
                brasId: [],
                loaiIpId: null,
                prefix: '',
                tuso: 0,
                denso: 0,
                dichvuvtId: null,
                buttonState: {
                    btnNhapMoiEnabled: true,
                    btnCapNhatEnabled: true,
                    btnXoaEnabled: true,
                    btnHuyBoEnabled: true,
                    btnSinhIPEnabled: true
                },
                xacNhanXoa: false,
                dsPrefixIp: [],
                dsLoaiTbDaGan: [],
                dsLoaiTbChuaGan: [],
                dsIp: [],
                dsBras: [],
                dsLoaiIp: [],
                dsDichVuVt: [],
                tablePrefix: {
                    paginationKey: 1,
                    dataSource: [],
                    pagerData: [],
                    selectedRowIndexOnPage: 0,
                    selectedRowIndexOnData: 0,
                    selectedData: null,
                    searchData: {
                        TENBRAS: '',
                        PREFIX: '',
                        TUSO: '',
                        DENSO: '',
                        LOAI: ''
                    }
                },
                checkAllLoaiHinhDaGan: false,
                checkAllLoaiHinhChuaGan: false,
                oldSelectedRowIndexPrefix: 0
            }
        },
    }
</script>
