<template src="./index.template.html"></template>
<style>
    .tracuu-splitter-theo-port-olt .vue-treeselect__control {
        height: 32px !important;
    }

    .tracuu-splitter-theo-port-olt .vue-treeselect--disabled .vue-treeselect__control {
        background-color: #f1f1f1;
    }

    .tracuu-splitter-theo-port-olt .vue-treeselect__placeholder,
    .tracuu-splitter-theo-port-olt .vue-treeselect__single-value {
        line-height: 30px;
    }

    .tracuu-splitter-theo-port-olt span.vue-treeselect__tip-text.vue-treeselect__no-options-tip-text {
        text-align: center;
        font-size: 14px;
        line-height: 30px;
    }

    .tracuu-splitter-theo-port-olt div.vue-treeselect__icon-container {
        display: none;
    }

    .tracuu-splitter-theo-port-olt .vue-treeselect__control-arrow {
        width: 7px;
        height: 6px;
        color: inherit;
        margin-left: 7px;
    }

    .tracuu-splitter-theo-port-olt-ejs-multiselect .e-control-wrapper .e-input-group-icon {
        border: 0;
        background-color: transparent !important;
        color: inherit !important;
        box-shadow: none;
    }
</style>
<script>
import { L10n } from '@syncfusion/ej2-base'
import { CheckBoxSelection } from "@syncfusion/ej2-vue-dropdowns"
import XLSX from "xlsx"
import ModalXuatDuLieu from './ModalXuatDuLieu/index.vue'
import BssErrorMarker from '@/components/BssErrorMarker'
import BssRequiredMarker from '@/components/BssRequiredMarker'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

L10n.load({
    'vi-VN': {
        'dropdowns': {
            'noRecordsTemplate': "Không có dữ liệu",
            'actionFailureTemplate': ""
        }
    }
})

export default {
    name: 'TraCuuSplitterTheoPortOLT',
    components: { XLSX, ModalXuatDuLieu, BssErrorMarker, BssRequiredMarker },
    data() {
        return {
            dsThueBao: [],
            dsTtvt: [],
            dsToQl: [],
            dsVeTinh: [],
            dsOlt: [],
            dsCardOlt: [],
            dsPortOlt: [],
            ttvtId: null,
            toQlId: null,
            veTinhId: null,
            oltId: null,
            cardOltId: null,
            portOltId: null,
            chkVeTinhChecked: true,
            chkOltChecked: true,
            chkCardOltChecked: true,
            chkPortOltChecked: true,
            kyHieu: null,
            diaChi: null,
            tuyChonXuatExcel: 1,
            dsThuocTinh: [
                {name: 'STT', width: 100, textAlign: 'Right'},
                {name: 'KETCUOI_ID', width: 130, textAlign: 'Right'},
                {name: 'CAP_SP', width: 100, textAlign: 'Right'},
                {name: 'TEN_KC', width: 130, textAlign: 'Left'},
                {name: 'KYHIEU', width: 130, textAlign: 'Left'},
                {name: 'DIACHI', width: 150, textAlign: 'Left'},
                {name: 'NGAY_CN', width: 130, textAlign: 'Right'},
                {name: 'DUNGLUONG', width: 100, textAlign: 'Right'},
                {name: 'DLSD', width: 100, textAlign: 'Right'},
                {name: 'DLROI', width: 100, textAlign: 'Right'},
                {name: 'TEN_OLT', width: 150, textAlign: 'Left'},
                {name: 'PORT_OLT', width: 100, textAlign: 'Right'},
                {name: 'KEY_FIELD', width: 150, textAlign: 'Left'},
                {name: 'PARENT_FIELD', width: 150, textAlign: 'Left'}
            ],
            dsThueBaoXuatExcel: [],
            sort: {
                TEN_KC: {
                    sortIcon: 'fa-sort',
                    sortDirection: null // -1: desc, 1: asc
                },
                STT: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                KETCUOI_ID: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                CAP_SP: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                NGAY_CN: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                DIACHI: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                DUNGLUONG: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                DLSD: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                DLROI: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                TEN_OLT: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
                PORT_OLT: {
                    sortIcon: 'fa-sort',
                    sortDirection: null
                },
            },
        }
    },
    validations: {
        ttvtId: {
            required
        },
        toQlId: {
            required
        }
    },
    provide: {
        multiselect: [CheckBoxSelection]
    },
    watch: {
        async ttvtId(newVal) {

            this.toQlId = null

            if (!newVal) {
                this.dsToQl = []
                return
            }

            try {
                this.loading(true)
                await this.layDmToQl(newVal)

            } catch (err) {

            } finally {
                this.loading(false)
            }

            if (this.dsToQl && this.dsToQl.length > 0) {
                this.toQlId = this.dsToQl[0].DONVI_ID
            }
        },
        async toQlId(newVal) {

            this.veTinhId = null

            if (!newVal) {
                this.dsVeTinh = []
                return
            }

            try {
                this.loading(true)
                await this.layDmVeTinh(newVal)
            } catch (err) {

            } finally {
                this.loading(false)
            }

            if (this.dsVeTinh && this.dsVeTinh.length > 0) {
                this.veTinhId = this.dsVeTinh[0].DONVI_ID
            }
        },
        async veTinhId(newVal) {

            this.oltId = null

            if (!newVal) {
                this.dsOlt = []
                return
            }

            try {
                this.loading(true)
                await this.layDmOlt(newVal)
            } catch (err) {

            } finally {
                this.loading(false)
            }

            if (this.dsOlt && this.dsOlt.length > 0) {
                this.oltId = this.dsOlt[0].THIETBI_ID
            }
        },
        async oltId(newVal) {

            this.cardOltId = null

            if (!newVal) {
                this.dsCardOlt = []
                return
            }

            try {
                this.loading(true)
                await this.layDmCardOlt(newVal)
            } catch (err) {

            } finally {
                this.loading(false)
            }
        },
        async cardOltId(newVal) {

            this.portOltId = null

            if (!newVal) {
                this.dsPortOlt = []
                return
            }

            try {
                this.loading(true)
                await this.layDmPortOlt(newVal.split('#')[1])
            } catch (err) {

            } finally {
                this.loading(false)
            }
        },
    },
    async mounted () {
        try {
            this.loading(true)
            await this.layDmTtvt()
        } catch (err) {

        } finally {
            this.loading(false)
        }

        if (this.dsTtvt && this.dsTtvt.length > 0) {
            this.ttvtId = this.dsTtvt[0].DONVI_ID
        }

        this.$refs['input-ten-kyhieu'].focus()
    },
    methods: {
        onClickBtnSort(colName) {

            let direction = this.sort[colName].sortDirection

            if (!direction) {
                this.sort[colName].sortDirection = 1
            } else {
                this.sort[colName].sortDirection = direction == 1 ? -1 : 1
            }

            Object.keys(this.sort).forEach(item => {
                if (item != colName) {
                    this.sort[item].sortDirection = null
                }
            })

            this.setSortIcon(colName)
            this.sortTable(colName)
        },
        setSortIcon(colName) {

            let direction = this.sort[colName].sortDirection
            let className = ''

            if (!direction) {
                className = 'fa-sort'
            } else if (direction == 1) {
                className = 'btn-sorted fa-caret-up'
            } else {
                className = 'btn-sorted fa-caret-down'
            }

            this.sort[colName].sortIcon = className

            Object.keys(this.sort).forEach(item => {
                if (item != colName) {
                    this.sort[item].sortIcon = 'fa-sort'
                }
            })
        },
        sortTable(colName) {

            let direction = this.sort[colName].sortDirection

            if (this.dsThueBao.length == 0 || !direction) {
                return
            }

            let dsThueBao = [...this.dsThueBao]

            dsThueBao.sort((a, b) => {

                var nameA = a[colName]
                var nameB = b[colName]

                nameA = !nameA ? '' : nameA.toString().toUpperCase()
                nameB = !nameB ? '' : nameB.toString().toUpperCase()

                if (nameA < nameB) {
                    return direction == 1 ? -1 : 1
                }

                if (nameA > nameB) {
                    return direction == 1 ? 1 : -1
                }

                return 0
            })

            let dsThueBaoRoot = dsThueBao.filter(item => item.PARENT_FIELD == null)

            let treeThueBao = []

            dsThueBaoRoot.forEach(item => {

                item.ROOT = true
                treeThueBao.push(item)

                dsThueBao.forEach(item1 => {
                    if (item.KEY_FIELD == item1.PARENT_FIELD) {
                        item.EXPANDED = true
                        treeThueBao.push(item1)
                    }
                })
            })

            this.dsThueBao = treeThueBao
        },
        okChonKieuXuatExcel() {

            if (this.tuyChonXuatExcel == 1) {
                this.dsThueBaoXuatExcel = [...this.dsThueBao].sort((a, b) => { return a.STT - b.STT })
                this.$bvModal.show('modal-xuat-dulieu-tracuu-splitter-theo-port-olt')
            }

            if (this.tuyChonXuatExcel == 2) {

                let data = []
                let isTree = this.dsThueBao.some(item => item.PARENT_FIELD)

                if (!isTree) {
                    this.dsThueBao.forEach(item => {
                        data.push({
                            'Tên Splitter': item.TEN_KC,
                            'STT': item.STT,
                            'ID': item.KETCUOI_ID,
                            'Cấp SP': item.CAP_SP,
                            'Ngày cập nhật': item.NGAY_CN,
                            'Địa chỉ': item.DIACHI,
                            'Dung lượng': item.DUNGLUONG,
                            'Đã dùng': item.DLSD,
                            'Chưa dùng': item.DLROI,
                            'Thiết bị OLT': item.TEN_OLT,
                            'Cổng OLT (slot/port)': item.PORT_OLT
                        })
                    })
                } else {
                    this.dsThueBao.forEach(item => {
                        data.push({
                            'Tên Splitter': !item.PARENT_FIELD ? item.TEN_KC : null,
                            '': item.PARENT_FIELD ? item.TEN_KC : null,
                            'STT': item.STT,
                            'ID': item.KETCUOI_ID,
                            'Cấp SP': item.CAP_SP,
                            'Ngày cập nhật': item.NGAY_CN,
                            'Địa chỉ': item.DIACHI,
                            'Dung lượng': item.DUNGLUONG,
                            'Đã dùng': item.DLSD,
                            'Chưa dùng': item.DLROI,
                            'Thiết bị OLT': item.TEN_OLT,
                            'Cổng OLT (slot/port)': item.PORT_OLT
                        })
                    })
                }

                let worksheet = XLSX.utils.json_to_sheet(data)

                if (isTree) {

                    worksheet["!merges"] = [
                        { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }
                    ]

                    worksheet["!cols"] = [
                        { width: 4},
                        { width: 20 },
                        { width: 10 },
                        { width: 10 },
                        { width: 10 },
                        { width: 20 },
                        { width: 40 },
                        { width: 10 },
                        { width: 10 },
                        { width: 10 },
                        { width: 30 },
                        { width: 30 }
                    ]
                } else {
                    worksheet["!cols"] = [
                        { width: 20 },
                        { width: 10 },
                        { width: 10 },
                        { width: 10 },
                        { width: 20 },
                        { width: 40 },
                        { width: 10 },
                        { width: 10 },
                        { width: 10 },
                        { width: 30 },
                        { width: 30 }
                    ]
                }

                let workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
                XLSX.writeFile(workbook, "export.xlsx")
            }
        },
        onClickButtonXuatExcel() {

            if (!this.dsThueBao || this.dsThueBao.length == 0) {
                this.$toast.error('Không có dữ liệu để xuất Excel !')
                return
            }
            this.tuyChonXuatExcel = 1
            this.$bvModal.show('modal-tuychon')
        },
        onClickButtonLamLai() {
            this.ttvtId = null
            this.kyHieu = null
            this.diaChi = null
        },
        async onClickButtonTraCuu() {
            try {
                this.loading(true)
                await this.layDsThueBao()

                Object.keys(this.sort).forEach(item => {
                    this.sort[item].sortDirection = null
                    this.sort[item].sortIcon = 'fa-sort'
                })
            } catch (err) {

            } finally {
                this.loading(false)
            }
        },
        async layDsThueBao() {
            try {

                let errorMessage = []

                this.$v.$touch()

                if (this.$v.$invalid) {

                    if (!this.$v.ttvtId.required) {
                        errorMessage.push("Bạn chưa chọn trung tâm viễn thông")
                    }

                    if (!this.$v.toQlId.required) {
                        errorMessage.push("Bạn chưa chọn tổ quản lý")
                    }
                }

                if (errorMessage.length > 0) {
                    this.$toast.error(errorMessage.join('\n'))
                    return
                }

                let data = {
                    ttvt_id: this.ttvtId,
                    tokt_id: this.toQlId,
                    tramtb_id: !this.chkVeTinhChecked ? '' : (!this.veTinhId ? '' : this.veTinhId),
                    olt_id: !this.chkOltChecked ? '' : (!this.oltId ? '' : this.oltId),
                    cardolt_id: !this.chkCardOltChecked ? '' : (!this.cardOltId ? '' : this.cardOltId.split('#')[1]),
                    lst_port_vl_id: !this.chkPortOltChecked ? '' : (!this.portOltId ? '' : this.portOltId.join(',')),
                    ky_hieu: this.kyHieu,
                    dia_chi: this.diaChi
                }

                let response = await this.$root.context.post('/web-ecms/tracuu/ds_splitter_theo_port_olt', data)

                if (response.error_code === 'BSS-00000000' && response.data != null && response.data.length > 0) {

                    let dsThueBao = response.data

                    dsThueBao.forEach(item => {
                        item.KEY_FIELD = `${item.KETCUOI_ID}-${item.PORT_OLT}-${item.TEN_OLT}`
                        item.PARENT_FIELD = null
                        item.COLOR = item.DLROI == 0 ? '#ED5050' : (item.DLROI == 1 ? '#F39738' : (item.DLROI == 2 ? '#EAC344' : ''))
                    })

                    dsThueBao.forEach(item => {

                        if (item.CAP_SP == 1) {
                            return
                        }

                        dsThueBao.forEach(item1 => {

                            if (item1.KETCUOI_ID == item.KETCUOI_ID) {
                                return
                            }

                            if (item1.CAP_SP == 1 && item1.PORT_OLT == item.PORT_OLT && item1.TEN_OLT == item.TEN_OLT) {
                                item.PARENT_FIELD = item1.KEY_FIELD
                            }
                        })
                    })

                    let dsThueBaoRoot = dsThueBao.filter(item => item.PARENT_FIELD == null)

                    let treeThueBao = []

                    dsThueBaoRoot.forEach(item => {

                        item.ROOT = true
                        treeThueBao.push(item)

                        dsThueBao.forEach(item1 => {
                            if (item.KEY_FIELD == item1.PARENT_FIELD) {
                                item.EXPANDED = true
                                treeThueBao.push(item1)
                            }
                        })
                    })

                    this.dsThueBao = treeThueBao
                } else {
                    this.dsThueBao = []
                }
            } catch (err) {
                this.dsThueBao = []
            }
        },
        async layDmPortOlt (cardOltId) {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsPortOltTheoCardOlt', {id: cardOltId})

                if (response.error_code === 'BSS-00000000' && response.data != null) {
                    this.dsPortOlt = response.data
                } else {
                    this.dsPortOlt = []
                }
            } catch (err) {
                this.dsPortOlt = []
            }
        },
        async layDmCardOlt (oltId) {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsCardOltTheoOlt', {id: oltId})

                if (response.error_code === 'BSS-00000000' && response.data != null) {

                    let dsCardOlt = response.data
                    let dsCardOltRoot = []

                    if (dsCardOlt.length > 0) {

                        dsCardOlt = dsCardOlt.map(item => {return {id: item.KEY, label: item.TEN_TB, pid: item.PKEY, children: []}})
                        let dsCardOltId = dsCardOlt.map(item => item.id)
                        dsCardOltRoot = dsCardOlt.filter(item => dsCardOltId.indexOf(item.pid) < 0)

                        dsCardOlt.forEach(item => {

                            dsCardOlt.forEach(item1 => {
                                if (item1.pid == item.id) {
                                    item.children.push(item1)
                                }
                            })

                            if (item.children.length == 0) {
                                delete item.children
                            } else {
                                item.isDisabled = true
                                item.isDefaultExpanded = true
                            }
                        })
                    }

                    this.dsCardOlt = dsCardOltRoot
                } else {
                    this.dsCardOlt = []
                }
            } catch (err) {
                this.dsCardOlt = []
            }
        },
        async layDmOlt (veTinhId) {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsOltTheoVeTinh', {id: veTinhId})

                if (response.error_code === 'BSS-00000000' && response.data != null) {
                    this.dsOlt = response.data
                } else {
                    this.dsOlt = []
                }
            } catch (err) {
                this.dsOlt = []
            }
        },
        async layDmTtvt () {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsTTVTTheoNVTrongToken')

                if (response.error_code === 'BSS-00000000' && response.data != null) {
                    this.dsTtvt = response.data
                } else {
                    this.dsTtvt = []
                }
            } catch (err) {
                this.dsTtvt = []
            }
        },
        async layDmToQl (ttvtId) {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsToKT', {id: ttvtId})

                if (response.error_code === 'BSS-00000000' && response.data != null) {
                    this.dsToQl = response.data
                } else {
                    this.dsToQl = []
                }
            } catch (err) {
                this.dsToQl = []
            }
        },
        async layDmVeTinh (toQlId) {
            try {
                let response = await this.$root.context.post('/web-ecms/danhmuc/layDsVeTinh', {id: toQlId})

                if (response.error_code === 'BSS-00000000' && response.data != null) {
                    this.dsVeTinh = response.data
                } else {
                    this.dsVeTinh = []
                }
            } catch (err) {
                this.dsVeTinh = []
            }
        },
    }
}
</script>
