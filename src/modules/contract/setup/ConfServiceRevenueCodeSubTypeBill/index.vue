<template src="./index.html"></template>

<script>
import breadcrumb from "@/components/breadcrumb";
import gridview from "@/components/Shared/gridview";
import KDataGrid from '@/components/kylq_components/KDataGrid'
import api from "./api/index.js";
export default {
    components: { breadcrumb, gridview, KDataGrid },
    name: "",

    data() {
        return {
            header: {
                title: "Mã doanh thu - loại hình - khoản mục thanh toán",
                // list: [
                //     { name: "Lập hợp đồng", link: { name: "Ui.cards" } },
                //     {
                //         name: "Lắp đặt mới",
                //         link: { name: "Ui.buttons" },
                //     },
                // ],
            },
            thongTinDoanhThu: {},
            formDoanhThu: {
                id: '',
                maDt: "",
                muc: "",
                tenchitieu: "",
                ghiChu: "",
            },
            commit: {
                loaitb_id: '',
                madt_id: '',
                dskm_id: '',

            },
            columnsGan: [
                {
                    fieldName: 'ten_kmtt',
                    headerText: 'Khoản mục TT đã gán',
                    allowFiltering: true
                }
            ],
            dataSourcesGan: [],
            columnsChuaGan: [
                {
                    fieldName: 'ten_kmtt',
                    headerText: 'Khoản mục TT chưa gán',
                    allowFiltering: true
                }
            ],
            dataSourcesChuaGan: [],
            columnsMaDoanhThu: [
                {
                    fieldName: 'ten_chitieu',
                    headerText: 'Tên chỉ tiêu',
                    allowFiltering: true
                },
                {
                    fieldName: 'ma_dt',
                    headerText: 'Mã doanh thu',
                    allowFiltering: true
                },
                {
                    fieldName: 'ngay_cn',
                    headerText: 'Ngày CN',
                    allowFiltering: true
                },
                {
                    fieldName: 'muc',
                    headerText: 'Mức',
                    allowFiltering: true
                }
            ],
            dataSourcesMaDoanhThu: [

            ],
            columnsThueBaoChuaGan: [
                {
                    fieldName: 'loaihinh_tb',
                    headerText: 'Loại hình chưa gán',
                    allowFiltering: true
                },
                {
                    fieldName: 'ten_dvvt',
                    headerText: 'Dịch vụ',
                    allowFiltering: true
                },
            ],
            dataTBChuaGan: [
            ],
            columnsThueBaoGan: [
                {
                    fieldName: 'loaihinh_tb',
                    headerText: 'Loại hình đã gán',
                    allowFiltering: true
                },
                {
                    fieldName: 'ten_dvvt',
                    headerText: 'Dịch vụ',
                    allowFiltering: true
                }
            ],
            dataTBGan: [
            ],
            dataFilter: [],
            filterTB: "",
        };
    },
    created() {
        api.layDanhSachMaDoanhThu(this.axios, {}).then((res) => {
            if (res.data.data) {
                this.dataSourcesMaDoanhThu = res.data.data;
            }
        });
        api.layDanhSachChuaGan(this.axios, {}).then((res) => {
            if (res.data.data) {
                this.dataFilter = res.data.data;
            }
        });
    },
    mounted() { },
    computed: {
        getContextMenuItems() {
        }
    },
    watch: {
    },
    methods: {
        // filTB(item) {
        //     api.layDanhSachTBChuaGan(this.axios, {

        //     }).then((res) => {
        //         if (res.data.data) {
        //             this.dataTBChuaGan = res.data.data;
        //         }
        //     });
        // },
        ganQuyenTB() {
            let dataCheckedsChuaGan = this.$refs.gridChuaGan.getSelectedRecords()
            if (this.dataTBChuaGan.length == 0) {
                return
            }
            if (dataCheckedsChuaGan.length == 0) {
                return
            }

            dataCheckedsChuaGan.map((item) => {
                this.dataTBGan.push(item)
            })
            let uniqueArr = this.dataTBGan.filter((item, index) => this.dataTBGan.indexOf(item) === index);
            this.dataTBGan = uniqueArr
            let newArr = this.dataTBChuaGan.filter(item => !dataCheckedsChuaGan.includes(item));
            this.dataTBChuaGan = newArr
        },
        goQuyenTB() {
            if (this.dataTBGan.length == 0) {
                return
            }
            let dataCheckedsGan = this.$refs.gridDaGan.getSelectedRecords()
            if (dataCheckedsGan.length == 0) {
                return
            }
            dataCheckedsGan.map((item) => {
                this.dataTBChuaGan.push(item)
            })
            let uniqueArr = this.dataTBChuaGan.filter((item, index) => this.dataTBChuaGan.indexOf(item) === index);
            this.dataTBChuaGan = uniqueArr
            let newArr = this.dataTBGan.filter(item => !dataCheckedsGan.includes(item));
            this.dataTBGan = newArr
        },
        ganQuyenKMTT() {
            let dataCheckedsChuaGan = this.$refs.gridKMTTChuaGan.getSelectedRecords()
            if (this.dataSourcesChuaGan.length == 0) {
                return
            }
            if (dataCheckedsChuaGan.length == 0) {
                return
            }

            dataCheckedsChuaGan.map((item) => {
                this.dataSourcesGan.push(item)
            })
            let uniqueArr = this.dataSourcesGan.filter((item, index) => this.dataSourcesGan.indexOf(item) === index);
            this.dataSourcesGan = uniqueArr
            let newArr = this.dataSourcesChuaGan.filter(item => !dataCheckedsChuaGan.includes(item));
            this.dataSourcesChuaGan = newArr
        },
        goQuyenKMTT() {
            if (this.dataSourcesGan.length == 0) {
                return
            }
            let dataCheckedsGan = this.$refs.gridKMTTDaGan.getSelectedRecords()
            if (dataCheckedsGan.length == 0) {
                return
            }
            dataCheckedsGan.map((item) => {
                this.dataSourcesChuaGan.push(item)
            })
            let uniqueArr = this.dataSourcesChuaGan.filter((item, index) => this.dataSourcesChuaGan.indexOf(item) === index);
            this.dataSourcesChuaGan = uniqueArr
            let newArr = this.dataSourcesGan.filter(item => !dataCheckedsGan.includes(item));
            this.dataSourcesGan = newArr
        },
        chonMDT(item) {
            this.formDoanhThu.id = item.data.madt_id
            this.formDoanhThu.maDt = item.data.ma_dt
            this.formDoanhThu.ghiChu = item.data.ghichu
            this.formDoanhThu.muc = item.data.muc
            this.formDoanhThu.tenchitieu = item.data.ten_chitieu
            this.commit.madt_id = item.data.madt_id
            let dataDaGan = {
                vmadt_id: item.data.madt_id
            }
            api.layDanhSachTBChuaGan(this.axios, dataDaGan).then((res) => {
                if (res.data.data) {
                    this.dataTBChuaGan = res.data.data;
                }
            });
            api.layDanhSachTBDaGan(this.axios, dataDaGan).then((res) => {
                if (res.data.data) {
                    this.dataTBGan = res.data.data;
                }
            });
        },
        chonKMTT(item) {
            let dataDaGan = {
                vmadt_id: item.data.madt_id,
                vloaitb_id: item.data.loaitb_id
            }
            this.commit.loaitb_id = item.data.loaitb_id
            api.layDanhSachKMTTDaGan(this.axios, dataDaGan).then((res) => {
                if (res.data.data) {
                    this.dataSourcesGan = res.data.data;
                }
            });
            api.layDanhSachKMTTChuaGan(this.axios, dataDaGan).then((res) => {
                if (res.data.data) {
                    this.dataSourcesChuaGan = res.data.data;
                }
            });
        },
        async thucHien_Click() {
            if (this.formDoanhThu.maDt == "") {
                this.$toast.warning("Bạn chưa chọn mã doanh thu!");
                return false;
            }

            if (this.formDoanhThu.muc == null) {
                this.$toast.warning("Bạn chưa chọn mã doanh thu!");
                return false;
            }
            if (this.formDoanhThu.tenchitieu == "") {
                this.$toast.warning("Bạn chưa chọn mã doanh thu!");
                return false;
            }
            if (this.formDoanhThu.id == null) {
                this.$toast.warning("Vui lòng chọn lại doanh thu ở danh sách mã doanh thu");
                return false;
            }
            let dskm = [];
            this.dataSourcesGan.map((item) => {
                dskm.push(item.khoanmuctt_id)
            })
            if (
                confirm(
                    "Bạn có muốn khởi doanh thu " + this.formDoanhThu.tenchitieu + " không ?"
                )
            ) {
                let data = {
                    ds_para: `{\"LOAITB_ID\":${this.commit.loaitb_id},\"MADT_ID\":${this.commit.madt_id},\"DS_KHOANMUC_ID\":\"${dskm}\", \"VDS\":{\"MADT_ID\":${this.commit.madt_id},\"LOAITB_ID\":2}}`,
                };
                let res = await api.khoitao(this.axios, data);
                if (res.data && res.data.error_code == "BSS-00000000") {
                    this.$toast.success(
                        "Khởi tạo doanh thu thành công"
                    );
                } else {
                    this.$toast.error("Có lỗi xẩy ra!");
                }
            }
        },
    },
};
</script>

<style></style>
