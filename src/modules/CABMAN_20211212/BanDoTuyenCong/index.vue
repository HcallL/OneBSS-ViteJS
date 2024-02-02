<template src="./index.template.html"></template>

<script>
    import GianDo from "./GianDo"
    import ModalTreocap from './ChuiCapQuaOngCong/Modal'
    import ModalPhanChiaDoDai from './PhanChiaDoDaiDoanCongChenKetCuoi/Modal'
    import ModalQLBe from './QLBe/Modal'
    import ModalQLDoanCong from './QLDoanCong/Modal'
    import ModalQLDoanCongVaOngCong from './QLDoanCongVaCacOngCongNamTrongDoanCong/Modal'
    import ModalDsBe from './DanhSachBe/Modal'
    import ModalDsTuyenCB from './DanhSachTuyenCongBe/Modal'
    import {GridPlugin,Page ,Filter,CommandColumn, Resize  } from "@syncfusion/ej2-vue-grids"
    import MapControl from "./MapControl"
    import DiagramLib from "../../../utils/DiagramLib"
    import { Diagram } from '@syncfusion/ej2-diagrams'
    import BanDo from "./BanDo"
    import ModalTracnghiemExt from '../../CABMAN/BanDoMangCap/modal/TracNghiemExt'
    import EventBus from '@/utils/eventBus'
    //import Panzoom from '@panzoom/panzoom'
export default {
    provide: {
        grid: [Filter,Page,CommandColumn,Resize]
    },

    components: {GridPlugin, ModalPhanChiaDoDai, ModalTracnghiemExt, ModalTreocap, ModalDsTuyenCB, ModalQLBe, ModalQLDoanCong, ModalQLDoanCongVaOngCong, ModalDsBe, MapControl, GianDo, DiagramLib, BanDo},

    data: function () {
        return {
            isTaoDoanCong: false,
            showDataSearch: false,
            dsTTVT: [],
            dsToQL: [],
            dsTuyenCB:[],
            dsDataTem:[],
            dataSelected:{
                ttvt:0,
                toql:0,
                timKiem:1,
            },
            dsBeCap:[],
            dsDoanCong:[],
            dsBeChuaCoToaDo: [],
            dsBeToaDo: [],
            dsSearch:[],
            cboTimKiem: [{id:1, name: 'cống bể'},{id:2, name: 'bể'},{id:3, name: 'cống'}],
            dataSend:{},
            isSuccess:true,
            tuyenCongId:null,
            tuyenCongIdDoi:null,
            beId: null,
            doanCongId: null,
            doanCongIdThaoTac:null,
            beIdThaoTac: null,
            dataBeThaoTac:{},
            beMoiId: null,
            beSuaId:null,
            showBeChuaTD:false,
            txttimkiem:"",
            selected:false,
            url:"#/cabman/tuyen-cong-be?id=",
            countAction: 0,
            customAttributes: { class: "table" },
            isSearch: 0,
            isClose: false,
            ok: false,
            loaiBeDoi:1,//1:A,2:B
            loaiThaoTac: null, //1:doi be, 2:tao cong
            stateBtn: {
                isDisableBtnTaoCot: true,
            },
            commandTc: [
                {
                    type: "SuaTC",
                    buttonOption: {
                        content: "...",
                        cssClass: "btn btn-second pad3 lh14 button-not-bg",
                    },
                },
            ],
            customAttributes: {class: 'customcss'},
            search:{
                ma_tc:"",
                sl_cot:"",
                ten_tc:""
            },
            stateBtn:{
                isDisableBtnTaoBe:true
            },
            commands: [{type: 'SuaBeCap', buttonOption: { content: "...", cssClass: "btn btn-second pad3 lh14 button-not-bg" } }] ,
            commands1: [{type: 'GhiToaDo',buttonOption: { content: ">", cssClass: "btn btn-second pad3 lh14 button-not-bg" } }],
            //#region "Giản đồ"
            dsNodes: [],
            dsConnectors: [],
            gianDoRefresh: false,
            beChenId: null,
            zoomFactor:1,
            //#endregion
        };
    },

    created: async function () {
        await this.getTTVT()
    },

    mounted() {
        // this.panzoom = Panzoom(document.getElementById('gian-do'), {
        //     maxScale: 5
        // })
        //console.log('panzoom',this.panzoom)
    },

    watch: {
        tuyenCongId: function (newvalue, oldvalue) {
            if (newvalue != null) {
                this.setDisableBtn(false)
                //this.dataSend.cot=19335
                this.dataSend.tuyenCongId = newvalue
            }
            else
                this.setDisableBtn(true)
        },
        dsBeCap: function (value) {
            this.veGianDo();
        },
    },

    computed:{},

    methods: {
        keyDown: function (event) {
            if (this.isTaoDoanCong) {
                if (event.key == "Escape") {
                    this.isTaoDoanCong = false
                    this.beIdThaoTac = null
                    this.$toast.success("Đã hủy thao tác tạo cống")
                }
            }
        },
        zoomIn: function() {
            this.$refs.giando.ZoomIn()
        },
        zoomOut: function() {
            this.$refs.giando.ZoomOut()
        },
        zoomReset: function() {
            this.$refs.giando.ZoomReset()
        },
        // onClickZoom(loai) {
        //     switch (loai) {
        //         case 1:
        //             this.panzoom.zoomIn()
        //             break;
        //         case 2:
        //             this.panzoom.zoomOut()
        //             break;
        //         case 3:
        //             this.panzoom.reset()
        //             break;
        //     }
        // },
        setDisableBtn: function (isTaoBe) {
            this.stateBtn.isDisableBtnTaoBe = isTaoBe
        },

        getTTVT: async function () {
            try {
                var rs = await this.$root.context.get(
                    "/web-cabman/BanDoTuyenCong/ds-ttvt-theo-nhanvien"
                )
                this.dsTTVT = rs.data
            } catch (error) {
            } finally {
            }
        },

        getToQL: async function () {
            try {
                var rs = await this.$root.context.get(
                    "/web-cabman/BanDoTuyenCong/ds-to-kythuat-theo-nhanvien/" +
                    this.dataSelected.ttvt
                )
                this.dsToQL = rs.data
            } catch (error) {
            } finally {
            }
        },

        getdsTuyenCong: async function () {
            try {
                let rs = await this.$root.context.get(
                    "/web-cabman/BanDoTuyenCong/ds-tuyen-cong/" +
                    this.dataSelected.toql
                )
                this.dsTuyenCB = rs.data
                if (this.dsTuyenCB!=null && this.dsTuyenCB.length>0) {
                    this.tuyenCongId = this.dsTuyenCB[0].TUYENCB_ID
                }
            } catch (error) {
            } finally {
            }
        },

        commandClick: function (name, args) {
            console.log(args)
            // if (args.commandColumn.type == "SuaBeCap") {
            //     this.dataSend.beCapId = args.rowData.BECAP_ID
            //     document.getElementById("taoBeCap").click()
            // }
            // if (args.commandColumn.type == "GhiToaDo") {
            // }
            if (name == "SuaBe") {
                this.dataSend.beCapId = args.BECAP_ID
                this.$bvModal.show('popupQLBe')
                //document.getElementById("taoBeCap").click()
            }
            if (name == "GhiToaDo") {
                this.$root.toastError('Nhấn chuột trái lên vị trí bản đồ để ghim tọa độ bể.')
                EventBus.$emit("ghiToaDo",args);
            }
        },

        commandTCClick: function (name, args) {
            if (name == "SuaTC") {
                window.open(this.url + args.TUYENCB_ID, "_blank");
            }
        },

        // TCrow_selected: function (args) {
        //     this.tuyenCongId = args.data.TUYENCB_ID
        //     this.isClose = true
        // },

        tcDoubleClick: function (rowIndex, dataItem) {
            this.tuyenCongId = dataItem.TUYENCB_ID
            this.isClose = true
            this.getGianDoCong()
        },

        onChangeTTVT: async function () {
            await this.getToQL()
        },

        onChangeToQL: async function () {
            await this.getdsTuyenCong()
        },

        onChangeCboTimKiem: async function () {
            switch (this.dataSelected.timKiem) {
                case 1:
                    this.dsSearch = this.dsBeCap.concat(this.dsDoanCong)
                    break
                case 2:
                    this.dsSearch = this.dsBeCap
                    break
                case 3:
                    this.dsSearch = this.dsDoanCong
                    break
            }
        },

        toQLSelectEvent: function (event) {
            this.dataSend.dvql = {
                id: event.id,
                name: event.text,
            }
        },

        getGianDoCong: async function() {
            try {
                let rs = await this.$root.context.get(
                    "/web-cabman/BanDoTuyenCong/gian-do-cong/"+  this.tuyenCongId
                )
                rs.data.dsBeCap.sort(function (a, b) {
                    return a.BECAP_ID < b.BECAP_ID ? -1 : 1
                })
                this.dsBeCap = rs.data.dsBeCap
                this.dsBeChuaCoToaDo = this.dsBeCap.filter(item=> item.TUYENKHAC == 0 && (item.TOADO==null || item.TOADO == '0,0'))
                this.dsBeToaDo = this.dsBeCap.filter(item=> item.TOADO !=null && item.TOADO != '0,0')
                this.dsBeCap = rs.data.dsBeCap
                this.dsDoanCong = rs.data.dsDoanCong
                this.dsSearch = this.dsBeCap.concat(this.dsDoanCong)
                this.dataSelected.timKiem = 1
                this.sapXepGianDo()
                this.refreshGianDo()
                this.veGianDo()
            } catch (error) {
            } finally {
            }
        },

        print() {
            if(!this.showcotChuaTD){
                let diagramInstance=Diagram
                let diagramObj= document.getElementById("diagram")
                diagramInstance = diagramObj.ej2_instances[0]
                let printOptions = {}
                printOptions.mode = "Data"
                printOptions.region = "PageSettings"
                printOptions.multiplePage = true
                printOptions.pageHeight = 400
                printOptions.pageWidth = 400
                diagramInstance.print(printOptions)
            }else{
                let map = document.getElementById("container")
                //console.log( map.ej2_instances[0])
                map.ej2_instances[0].print()
            }
        },

        Refesh: function () {

            this.$confirm(`Bạn có chắc muốn nạp lại giản đồ/bản đồ?`,
                'Giản đồ tuyến cống',
                {
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                }).then(() => {
                try {
                    this.$root.showLoading(true)
                    if (!this.showcotChuaTD) {
                        this.refreshGianDo()
                        this.getGianDoCong()
                    } else {
                        this.getGianDoCong()
                    }
                } catch (er) {
                } finally {
                    this.$root.showLoading(false);
                }
            }).catch(() => {})
        },

        xacnhanBe: function (obj) {
            console.log('xacnhanbe', obj)
            this.dataSend.beCapId = null
            if (obj != null) {
                this.beIdThaoTac = obj.beId
                this.getGianDoCong()
                if (this.loaiThaoTac == 3) {
                    this.chenBeTaoMoi(obj)
                }
                if (obj.type == "MENU_ITEM_THUOC_TINH") {
                    this.dataSend.beCapId = obj.beId
                    this.$bvModal.show('popupQLBe')
                }
            }
        },

        xacnhanCong: function (obj) {
            if (obj != null) {
                this.doanCongIdThaoTac = obj.doanCongId
                if (obj.type == "MENU_ITEM_XOA_CONG") {
                    //this.doanCongIdThaoTac = obj.doanCongId
                }

                if (obj.type == "MENU_ITEM_DOI_BE_A") {
                    this.loaiBeDoi = 1
                    this.loaiThaoTac =1
                }

                if (obj.type == "MENU_ITEM_DOI_BE_B") {
                    this.loaiBeDoi = 2
                    this.loaiThaoTac = 1
                }
            }
        },

        taoDoanCongTuIcon: function () {
            this.isTaoDoanCong = true
        },

        taoDoanCong: function (obj) {
            try {

                if (obj != null) {
                    if (obj.type == "MENU_ITEM_LK_BE_TT_HUY") {
                        this.isTaoDoanCong = false
                        this.dataBeThaoTac = null
                    }

                    if (obj.type == "MENU_ITEM_LK_BE_TT") {
                        //this.isTaoDoanCong = false
                        this.dataBeThaoTac = obj.dataBe
                    }

                    if (obj.type == "MENU_ITEM_LK_BE_TK") {
                        this.loaiThaoTac = 2
                        let tracnghiem = {
                            title: 'Chọn chiều ',
                            caption: 'Chọn chiều đi của đoạn cống muốn tạo',
                            options: ['Đi từ bể hiện tại sang 1 bể thuộc tuyến khác', 'Đi từ bể thuộc tuyến khác sang bể hiện tại'],
                            data: obj.dataBe
                        }
                        this.$refs.ModalTracnghiemExt.show(tracnghiem)
                            .then(result => {
                                if (result.ok) {
                                    console.log('Tạo cống', result)
                                    if (result.option === 0) {
                                        this.dataSend.dataBeA = obj.dataBe
                                        this.loaiBeDoi = 1
                                    } else {
                                        this.dataSend.dataBeB = obj.dataBe
                                        this.loaiBeDoi = 2
                                    }
                                    this.$bvModal.show('popupDsBe')
                                } else {
                                    console.log('Cancel')
                                }
                            })
                    }

                    if (obj.type == "MENU_ITEM_LK_BE_TT_CHON") {
                        this.isTaoDoanCong = false
                        this.dataSend.dataBeB = obj.dataBe
                        this.dataSend.dataBeA = this.dataBeThaoTac
                        this.$bvModal.show('popupQLDoanCong')
                    }
                }
            } catch (e) {
                console.log(e)
                this.$toast.error('lỗi bất thường')
            }
        },

        chenBe: function (obj) {
            try {

                if (obj != null) {

                    if (obj.type == "MENU_ITEM_THEM_BE") {
                        this.doanCongId = obj.doanCongId
                        this.loaiThaoTac = 3
                        let tracnghiem = {
                            title: 'Chèn bể cáp',
                            caption: 'Bước 1: Chọn bể muốn chèn',
                            options: ['Chọn bể có sẵn', 'Tạo bể mới'],
                            data: obj.dataBe
                        }
                        this.$refs.ModalTracnghiemExt.show(tracnghiem)
                            .then(result => {
                                if (result.ok) {
                                    this.loaiThaoTac = 3
                                    if (result.option === 0) {
                                        this.$bvModal.show('popupDsBe')
                                    } else {
                                        this.dataSelected.beCapId = null
                                        this.$bvModal.show('popupQLBe')
                                    }
                                } else {
                                    console.log('Cancel')
                                }
                            })
                    }

                    if (obj.type == "MENU_ITEM_LK_BE_TT_CHON") {
                        this.dataSend.dataBeB = obj.dataBe
                        this.dataSend.dataBeA = this.dataBeThaoTac
                        this.$bvModal.show('popupQLDoanCong')
                    }
                }
            } catch (e) {
                console.log(e)
                this.$toast.error('lỗi bất thường')
            }
        },

        napLaiGianDo: function() {
            this.getGianDoCong()
        },

        xacNhanDoanCong: function (obj) {
            if (obj != null) {
                //this.beIdThaoTac = obj.beId;
                if (obj.type == "MENU_ITEM_THUOC_TINH_DC") {
                    this.dataSend.doanCongId = obj.doanCongId
                    this.$bvModal.show('popupQLDoanCongVaOngCong')
                }

                if (obj.type == "MENU_ITEM_LK_DAOCHIEU") {
                    this.doanCongIdThaoTac = obj.doanCongId
                    this.daoChieuDoanCong()
                }
            }
        },

        xoaCong: async function () {
            try {
                if (this.doanCongIdThaoTac != null) {
                    let rs = await this.$root.context.post(
                        "/web-cabman/BanDoTuyenCong/xoa-doan-cong",
                        {
                            doanCongId: this.doanCongIdThaoTac,
                        }
                    );
                    if (rs.error_code === "BSS-00000000") {
                        this.$toast.success(
                            "Xóa cống: " + this.doanCongIdThaoTac + " thành công"
                        );
                        if (!this.showBeChuaTD) {
                            this.getGianDoCong()
                        }
                    } else
                        this.$toast.error("Xóa cống: " + this.doanCongIdThaoTac + " thất bại");
                }
            } catch (error) {
                this.$toast.error("Xóa cống: " + this.doanCongIdThaoTac + " thất bại");
            } finally {
            }
        },

        xoaBe: async function () {
            try {
                if (this.beIdThaoTac != null) {
                    let rs = await this.$root.context.post(
                        "/web-cabman/BanDoTuyenCong/xoa-be-cap",
                        {
                            beCapId: this.beIdThaoTac,
                        }
                    );
                    if (rs.error_code === "BSS-00000000") {
                        this.$toast.success(
                            "Xóa bể thành công"
                        );
                        if (!this.showBeChuaTD) {
                            this.getGianDoCong()
                        }
                    } else
                        this.$toast.error("Xóa bể thất bại");
                }
            } catch (error) {
                this.$toast.error("Xóa bể thất bại");
            } finally {
            }
        },

        thayDoiBe: function (data) {
            //console.log('data doi be', data)
            this.beIdThaoTac = data.BECAP_ID
            if (this.loaiBeDoi == 1) {
                this.doiBeCapA()
            }

            if (this.loaiBeDoi == 2) {
                this.doiBeCapB()
            }
        },

        xacNhanDsBe: function (data) {
            switch (this.loaiThaoTac) {
                case  1:
                    this.thayDoiBe(data)
                    break
                case 2:
                    this.taoCongDenBeKhactuyen(data)
                    break
                case 3:
                    this.chenBeCoSan(data)
                    break
            }
        },

        chenBeTaoMoi: function(data) {
            this.dataSend.beCapId = data.beId
            this.dataSend.chieuDai = this.dsDoanCong.find(item => item.DOANCONG_ID == this.doanCongId).CHIEUDAI
            this.dataSend.doanCongId = this.doanCongId
            this.$bvModal.show('popupPhanChiaDoDai')
        },

        chenBeCoSan: function(data) {
            this.dataSend.beCapId = data.BECAP_ID
            this.dataSend.chieuDai = this.dsDoanCong.find(item => item.DOANCONG_ID == this.doanCongId).CHIEUDAI
            this.dataSend.doanCongId = this.doanCongId
            this.$bvModal.show('popupPhanChiaDoDai')
        },

        taoCongDenBeKhactuyen: function (data) {
            if (this.loaiBeDoi ==1) {
                this.dataSend.dataBeB = data
            } else {
                this.dataSend.dataBeA = data
            }
            this.$bvModal.show('popupQLDoanCong')
        },

        thayDoiTuyen: function (data) {
            //console.log('data doi tuyen', data)
            this.tuyenCongIdDoi = data.TUYENCB_ID
            this.chuyenTuyenBeCap()
        },

        daoChieuDoanCong: async function () {
            try {
                let rs = await this.$root.context.post(
                    "/web-cabman/BanDoTuyenCong/doa-chieu-doan-cong/",{
                        "doanCongId":this.doanCongIdThaoTac
                    }
                );
                if (rs.error_code === "BSS-00000000") {
                    this.$toast.success(
                        "Đảo chiều thành công"
                    );
                    if (!this.showBeChuaTD) {
                        this.getGianDoCong()
                    }
                } else
                    this.$toast.error("Đảo chiều thất bại");
            } catch (error) {
            } finally {
            }
        },

        doiBeCapA: async function () {
            try {
                let rs = await this.$root.context.post(
                    "/web-cabman/BanDoTuyenCong/thay-doi-be-cap-a/",{
                        "beCapId":this.beIdThaoTac,
                        "doanCongId":this.doanCongIdThaoTac
                    }
                );
                if (rs.error_code === "BSS-00000000") {
                    this.$toast.success(
                        "đổi bể cáp a thành công"
                    );
                    if (!this.showBeChuaTD) {
                        this.getGianDoCong()
                    }
                } else
                    this.$toast.error("đổi bể cáp a thất bại");
            } catch (error) {
            } finally {
            }
        },

        doiBeCapB: async function () {
            try {
                let rs = await this.$root.context.post(
                    "/web-cabman/BanDoTuyenCong/thay-doi-be-cap-b/",{
                        "beCapId":this.beIdThaoTac,
                        "doanCongId":this.doanCongIdThaoTac
                    }
                )
                if (rs.error_code === "BSS-00000000") {
                    this.$toast.success(
                        "đổi bể cáp b thành công"
                    );
                    if (!this.showBeChuaTD) {
                        this.getGianDoCong()
                    }
                } else
                    this.$toast.error("đổi bể cáp b thất bại");
            } catch (error) {
            } finally {
            }
        },

        chuyenTuyenBeCap: async function () {
            try {
                var rs = await this.$root.context.post(
                    "/web-cabman/BanDoTuyenCong/chuyen-tuyen-be-cap/",{
                        "beCapId":this.beIdThaoTac,
                        "tuyenCongBeId":this.tuyenCongIdDoi
                    }
                );
                if (rs.error_code === "BSS-00000000") {
                    this.$toast.success(
                        "chuyển tuyến bể cáp thành công"
                    );
                    if (!this.showBeChuaTD) {
                        this.getGianDoCong()
                    }
                } else
                    this.$toast.error("chuyển tuyến bể cáp thất bại");
            } catch (error) {
            } finally {
            }
        },
        //
        // huyLienketCot: async function (cot_id) {
        //     try {
        //         var rs = await this.$root.context.post(
        //             "/web-cabman/bando_tuyencot/tao_lienket_cot/",{
        //                 "cot_id":cot_id
        //             }
        //         );
        //         this.isSuccess = rs.data;
        //     } catch (error) {
        //     } finally {
        //     }
        // },
        //
        //
        getCongBe:async  function(data){
            this.beId = null
            this.doanCongId = null
            this.beId = data.BECAP_ID != null ? data.BECAP_ID : this.beId
            this.doanCongId = data.DOANCONG_ID != null? data.DOANCONG_ID : this.doanCongId
            if (this.doanCongId != null && this.beId == null) {
                this.beId = this.dsDoanCong.find(x => x.DOANCONG_ID == this.doanCongId).BECAP_A_ID
            }
            this.txttimkiem= data.KYHIEU
            this.showDataSearch = false
            // let id = this.beId != null ? this.beId : this.doanCongId
            this.$refs.giando.selectedBe(this.beId)
        },

        //#region "Hàm Giãn đồ"
        sapXepGianDo: function() {
            try {
                let len = this.dsDoanCong.length
                let level = 0
                for (let i = 0; i < len; i++) {
                    for (let j = i + 1; j < len; j++) {
                        if (this.dsDoanCong[j].BECAP_B_ID == this.dsDoanCong[i].BECAP_A_ID
                            && this.dsDoanCong[j].BECAP_A_ID != this.dsDoanCong[i].BECAP_B_ID) {
                            this.dsDoanCong.splice(i,0,this.dsDoanCong[j])
                            this.dsDoanCong.splice(j+1,1)
                        }
                    }
                }
                for (let i = 0; i < len; i++) {
                    this.dsDoanCong[i].level = level
                    this.dsDoanCong[i].diemDau = 0
                    if (i < len -1) {
                        if (this.dsDoanCong[i].BECAP_B_ID != this.dsDoanCong[i+1].BECAP_A_ID) {
                            level++
                            this.dsDoanCong[i].diemDau = 1
                        }
                    }
                }
                console.log('final',this.dsDoanCong)
            } catch (e) {
                console.log(e)
            }


        },

        veGianDo: function () {
            try {
                //this.sapXepGianDo()
                let nodes = []
                let connectors = []
                let slDoanCong = this.dsDoanCong.length
                //let dsDoanCongTmp = JSON.parse(JSON.stringify(this.dsDoanCong))
                //let slCot = this.dscot.length;
                let index = 0
                let dem = 0
                // let nodeDauTien = this.dsBeCap.filter((x) => x.TUYENKHAC == 1)
                // nodes.push(this.TaoDuLieuNode(nodeDauTien[0], ))
                //index++;
                for (let i = 0; i < slDoanCong; i++) {
                    let nodeN
                    let nodeD
                    let doanCong = this.dsDoanCong[i]
                    let beCapA = this.dsBeCap.filter((x) => x.BECAP_ID == doanCong.BECAP_A_ID)
                    let beCapB = this.dsBeCap.filter((x) => x.BECAP_ID == doanCong.BECAP_B_ID)

                    beCapA[0].level = doanCong.level
                    beCapB[0].level = doanCong.level
                    // if (doanCong.diemDau === 1) {
                    //     dem = 0
                    // }

                    nodeN = this.TaoDuLieuNode(beCapA[0], false, dem++, 0)
                    let checkN = nodes.find(x => x.id == nodeN.id)
                    if (checkN == null) {
                        nodes.push(nodeN)
                    }
                    nodeD = this.TaoDuLieuNode(beCapB[0], false, dem++, 0)
                    let checkD = nodes.find(x => x.id == nodeD.id)
                    if (checkD == null) {
                        nodes.push(nodeD)
                    }
                    // if (i == slDoanCong - 1) {
                    //     nodes.push(nodeD)
                    // }
                    if (beCapA == null || beCapB == null) {
                        continue
                    }

                    connectors.push(
                        this.taoKetNoi(
                            'DC_'+ doanCong.DOANCONG_ID.toString(),
                            nodeN,
                            nodeD,
                            doanCong.TEN_DC,
                            nodeN.ports[1].id,
                            nodeD.ports[0].id
                        )
                    )
                }
                let dsChuaLienKet = this.dsBeCap.filter((x) => x.DOANCONG_ID == null) // && x.TUYENKHAC == 0
                dsChuaLienKet.forEach(item => {
                    nodes.push(this.TaoDuLieuNode(item, true, index++, 0))
                })

                this.dsNodes = nodes
                this.dsConnectors = connectors
                console.log('nodes', nodes)
                console.log('connectors', connectors)
            } catch (err) {
                // console.log(err);
            }
        },
        taoNode: function (nodeID, text, stringStyle) {
            if (text == null) text = "null";
            text =
                "<div style='position: absolute; top: -40px; left: -20px;'><div class='text-nowrap' style='padding: 7px 10px; border: 1px solid #E0E0E0; background-color: #F5F5F5; display: inline-table; border-radius: 5px;'>" +
                text +
                "</div></div>"
            let ports = []
            ports.push(DiagramLib.taoPort(nodeID + "_port_1", DiagramLib.PORT_TRAI))
            ports.push(DiagramLib.taoPort(nodeID + "_port_2", DiagramLib.PORT_PHAI))
            ports.push(DiagramLib.taoPort(nodeID + "_port_3", DiagramLib.PORT_TREN))
            ports.push(DiagramLib.taoPort(nodeID + "_port_4", DiagramLib.PORT_DUOI))
            let annotations = []
            annotations.push({ template: text, style: { textWrapping: "NoWrap" } })
            let node = DiagramLib.taoNodeTheoStyle(
                stringStyle,
                nodeID,
                ports,
                annotations
            );
            return node
        },
        taoKetNoi: function (id, nodeSource, nodeTarget, text, portN, portD) {
            let sourceID = nodeSource.id
            let sourcePortID = portN  //nodeSource.ports[1].id;
            let targetID = nodeTarget.id
            let targetPortID = portD  //nodeTarget.ports[0].id;
            //let style = { strokeWidth: 4, strokeColor: "#0176FF", fill: "#0176FF", strokeDashArray: "20" };
            let annotations = [
                {
                    height: 20,
                    width: 30,
                    content: text,
                    margin: { top: 20 },
                    style: {
                        textWrapping: "NoWrap",
                        fill: "#F5F5F5",
                        strokeWidth: 1,
                        strokeColor: "#E0E0E0",
                    },
                },
            ]
            let ketNoi = DiagramLib.taoKetNoiTheoStyle(
                "0-1-4-0",
                id,
                sourceID,
                targetID,
                sourcePortID,
                targetPortID,
                annotations
            )
            ketNoi.targetDecorator = {
                shape: "None",
            }
            ketNoi.type = "Orthogonal";
            return ketNoi
        },
        refreshGianDo: function () {
            this.gianDoRefresh = !this.gianDoRefresh;
        },
        // getcotByID: function (Cot_id) {
        //     return this.dscot.filter((x) => x.COT_ID == Cot_id)[0];
        // },
        TaoDuLieuNode(data, khongLienKet, i, count) {
            try {
                let BECAP_ID = 'BC_'+data.BECAP_ID.toString()
                let icon = data.ICON_STYLE
                let ten = data.TEN_BC
                let level = data.level
                //icon = 4 //chua co icon be de tam = 4
                let node = this.taoNode(BECAP_ID, ten, icon, data)
                if (!khongLienKet){
                    node.offsetX = 100 * (i + 1)
                    node.offsetY = 200 + level*100
                } else {
                    node.offsetX = 100 * (i + 1)
                    node.offsetY = 100
                }
                node.dataBe = data
                return node
            } catch (e) {
                console.log(e)
                this.$toast.error('lỗi bất thường')
            }
        },

        // laydsCotDaLienKetKin: function () {},
        // laydsCot_DauCuaChuoiLienKet: function () {
        //     let list = [];
        //     let dsCotChuaLK = this.dscot.filter((x) => x.COTSAU_ID != null);
        //     for (let i = 0; i < dsCotChuaLK.length; i++) {
        //         if (
        //             this.dscot.filter((y) => y.COTSAU_ID == dsCotChuaLK[i].COT_ID)
        //                 .length == 0
        //         )
        //             list.push(dsCotChuaLK[i]);
        //     }
        //     return list;
        // },
        //#endregion
    },


};
</script>
<style>
  .grid-stack-box {
    background-color: transparent;
  }

  .disabled a {
    pointer-events: none;
    cursor: default;
    color: #6c757d !important;
  }

  .disabled a:hover {
    cursor: default;
    color: #6c757d;
  }
  .wrapper {
    display: flex;
    margin: 0 auto;
    position: relative;
  }
</style>
