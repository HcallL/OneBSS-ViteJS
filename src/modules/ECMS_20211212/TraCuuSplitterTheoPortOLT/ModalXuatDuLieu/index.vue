<template src="./index.template.html"></template>
<script>
import BssPagination1 from '@/components/BssPagination_1'
import XLSX from "xlsx"
import { Edit, Sort, Filter, ForeignKey, Resize, Freeze } from "@syncfusion/ej2-vue-grids"
import { L10n } from '@syncfusion/ej2-base'

L10n.load({
    'vi-VN': {
        grid: {
            FilterButton: 'Lọc',
            ClearButton: 'Đóng',
            SelectAll: 'Chọn tất cả'
        }
    }
})

export default {
    provide: {
        grid: [Edit, Sort, Filter, ForeignKey, Resize, Freeze ]
    },
    name: 'ModalXuatDuLieu',
    components: { BssPagination1 },
    props: [ 'id', 'thuocTinh', 'data' ],
    data() {
        return {
            dsThuocTinh: [],
            dsThuocTinhHeader: [],
            thuocTinhDuocChonIndex: 0,
            key: 1,
            tableDuLieu: {
                dataSource: [],
                pagerData: [],
                selectedRowIndexOnPage: 0,
                tableKey: 1
            },
            columnTemplate: function () {
                return { 
                    template: {
                        template: '<span :id="data.index" :style="{display: display }" style="font-size: 12px;" class="col-mark-selected-row fa fa-play text-main"></span>',
                        data() {
                            return { 
                                data: { } 
                            }
                        },
                        computed: {
                            display() {
                                return parseInt(this.data.index) == this.$parent.getSelectedRowIndexes()[0] ? 'block' : 'none'
                            }
                        }
                    }
                }
            },
        }
    },
    methods: {
        onModalShown() {

            let dsThuocTinh = []
            let dsThuocTinhHeader = []

            this.thuocTinh.forEach(item => {
                
                let thuocTinh

                if (typeof item == 'string') {
                    thuocTinh = {
                        name: item,
                        width: 100,
                        textAlign: 'Left'
                    }
                } else {
                    thuocTinh = {...item}
                }

                dsThuocTinh.push(thuocTinh.name)
                dsThuocTinhHeader.push(thuocTinh)
            })

            this.dsThuocTinh = dsThuocTinh
            this.dsThuocTinhHeader = dsThuocTinhHeader
            this.tableDuLieu.dataSource = [...this.data]
            this.tableDuLieu.tableKey++
        },
        onModalHidden() {
            this.dsThuocTinh = []
            this.dsThuocTinhHeader = []
            this.tableDuLieu.dataSource = []
            ++this.key
        },
        onRowSelected(args) {
            let refValue = args.row.closest(".e-grid").getAttribute('ref-value')
            this.$refs[refValue].$el.querySelectorAll('.col-mark-selected-row').forEach(item => {
                item.style.display = args.rowIndex == parseInt(item.id) ? 'block' : 'none'
            })
        },
        onDataBound() {
            this.$refs['grid-data'].selectRow(0)
        },
        onClickButtonXuatFile() {

            if (this.dsThuocTinh.length == 0) {
                this.$toast.error('Bạn đã xóa hết các cột lấy DL!')
                return
            }

            let exportData = []

            this.tableDuLieu.dataSource.forEach(item => {

                let data = {}

                this.dsThuocTinh.forEach(item1 => {
                    data[item1] = item[item1]
                })

                exportData.push(data)
            })

            let worksheet = XLSX.utils.json_to_sheet(exportData)
            let workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
            XLSX.writeFile(workbook, "export.xlsx")
        },
        onClickRowTableDuLieu(index) {
            this.tableDuLieu.selectedRowIndexOnPage = index
        },
        onPageChange (data) {
            let to = data.pageIndex * data.pageSize
            let from = to - data.pageSize
            this.tableDuLieu.selectedRowIndexOnPage = data.rowIndexOnPage
            this.tableDuLieu.pagerData = this.tableDuLieu.dataSource.slice(from, to)
        },
        onRowChange (rowIndexOnPage) {
            this.tableDuLieu.selectedRowIndexOnPage = rowIndexOnPage
        },
        onClickButtonXemDuLieu() {
            this.dsThuocTinhHeader = this.dsThuocTinhHeader.filter(item => {
                return this.dsThuocTinh.indexOf(item.name) >= 0
            })
        },
        onClickRowTableThuocTinh(index) {
            this.thuocTinhDuocChonIndex = index
        },
        onClickButtonXoaThuocTinh(thuocTinh, index) {
            
            this.dsThuocTinh = this.dsThuocTinh.filter(item => item != thuocTinh)

            if (this.thuocTinhDuocChonIndex >= this.dsThuocTinh.length) {
                this.thuocTinhDuocChonIndex = this.dsThuocTinh.length - 1
            }
        },
    }
}
</script>
<style>
    .tracuu-splitter-theo-port-olt-xuat-excel .gutter {
        background-color: transparent;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid {
        font-family: "Roboto", Arial !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid .e-filterbarcell {
        padding: 5px 7px !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid th.e-headercell, 
    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid th.e-filterbarcell {
        background-color: #BAE7FF !important;
        border-color: white !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid th.e-filterbarcell {
        border-width: 1px 0 0 1px !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid td.e-active {
        background: #F9E1A9 !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid.e-gridhover tr[role='row']:not(.e-editedrow):hover .e-rowcell:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid.e-gridhover tr[role='row']:hover .e-detailrowcollapse:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid.e-gridhover tr[role='row']:hover .e-rowdragdrop:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid.e-rtl .e-gridhover tr[role='row']:hover .e-rowdragdrop:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid.e-gridhover tr[role='row']:hover .e-detailrowexpand:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell) {
        background-color: #FFF9EB !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid td.e-rowcell { 
        line-height: 20px !important;
        padding: 5px 7px !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid .e-filterdiv.e-fltrinputdiv .e-input-group.e-control-wrapper {
        border: 0 !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid .e-filtertext.e-input.e-disable {
        display: none !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid tr.e-emptyrow td {
        text-align: center !important;
    }

    .tracuu-splitter-theo-port-olt-xuat-excel .e-grid .e-gridheader .e-sortfilter .e-fltr-icon .e-headercelldiv {
        margin-right: 0 !important;
    }

    .e-checkboxfilter .e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check {
        background-color: white !important;
        padding-top: 2px !important;
    }
</style>>