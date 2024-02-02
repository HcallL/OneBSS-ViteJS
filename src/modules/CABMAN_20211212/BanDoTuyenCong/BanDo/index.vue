<template src="./index.template.html"></template>
<script>
    import './../../../../utils/gmaps'
    import GMap from '../components/GMap.vue'
    import GraphNode from '../structures/GraphNode'
    import GraphPolyline from '../structures/GraphPolyline'
    import GraphPolylines from '../structures/GraphPolylines'
    export default {
        //props:["gian_do_cong","dsDoanCong"],
        props: {
            gian_do_cong: null,
            dsDoanCong: null
        },
        name: 'rightPaneContent',
        components: {GMap},
        data() {
            return {
                showtabpane: false,
                nodes: [],
                polylines: [],
                cotsau_id: null
            }
        },
        computed: {
            getgian_do_cong() {
                let data = {
                    gian_do_cong: this.gian_do_cong,
                    dsDoanCong: this.dsDoanCong
                }
                return data
            }
        },
        watch: {
            getgian_do_cong: function (val) {
                let dsBe = val.gian_do_cong
                let dsDoanCong = val.dsDoanCong
                let map = this.$refs.map
                let nodes = []
                let polylines = []
                map.clear()
                for (let i = 0; i < dsDoanCong.length; i++) {
                    //Tạo node
                    let beA = dsBe.find(item => item.BECAP_ID == dsDoanCong[i].BECAP_A_ID)
                    let beB = dsBe.find(item => item.BECAP_ID == dsDoanCong[i].BECAP_B_ID)
                    if (beA != null && beB != null) {
                        let node_n = this.taoDuLieuNode(beA)
                        let objIndex = nodes.findIndex(obj => obj.id === node_n.id)
                        if (objIndex < 0) nodes.push(node_n)
                        let node_d = this.taoDuLieuNode(beB)
                        objIndex = nodes.findIndex(obj => obj.id === node_d.id)
                        if (objIndex < 0) nodes.push(node_d)
                        //tao ket noi
                        let polyline = new GraphPolyline()
                        let lat = parseFloat(beA.TOADO.split(',')[0])
                        let lng = parseFloat(beA.TOADO.split(',')[1])
                        polyline.path.push({id: beA.BECAP_ID, lat: lat, lng: lng})

                        let DAY_TOADO = dsDoanCong[i].DAY_TOADO
                        if (DAY_TOADO) {
                            let arr = DAY_TOADO.split(';')
                            for (let j = 0; j < arr.length; j++) {
                                let arr2 = arr[j].split(',')
                                let lat = parseFloat(arr2[0])
                                let lng = parseFloat(arr2[1])
                                let id = 'DIEMUON_' + this.create_UUID()
                                let node = new GraphNode()
                                node.id = id
                                node.visible = false
                                node.draggable = true
                                node.setPosition(arr[j])
                                node.isDiemuon = true
                                node.id_polyline = polyline.id
                                let objIndex = nodes.findIndex(obj => obj.id == node.id)
                                if (objIndex < 0) nodes.push(node)
                                polyline.path.push({id: id, lat: lat, lng: lng})
                            }
                        }

                        let lat2 = parseFloat(beB.TOADO.split(',')[0])
                        let lng2 = parseFloat(beB.TOADO.split(',')[1])
                        polyline.path.push({id: beB.BECAP_ID, lat: lat2, lng: lng2})

                        polyline.id = dsDoanCong[i].DOANCONG_ID//'LINK_' + beA.BECAP_ID + "_" + beB.BECAP_ID
                        polyline.label = dsDoanCong[i].KYHIEU
                        polyline.source = beA.BECAP_ID
                        polyline.dest = beB.BECAP_ID
                        polyline.style = "0-1-4-0"




                        objIndex = polylines.findIndex(obj => obj.id === polyline.id)
                        if (objIndex < 0) polylines.push(polyline)
                    }

                }
                console.log('nodes', nodes)
                console.log('polylines', polylines)
                map.setNodes(nodes.slice(0))

                map.setPolylines(polylines.slice(0))
                map.setLocationEx(null)
                this.nodes = nodes
                this.polylines = polylines
            }
        },
        methods: {
            taoDuLieuNode: function (data) {
                let node = new GraphNode()
                if (data != null) {
                    //console.log('data', data)
                    node.id = data.BECAP_ID
                    node.label = data.KYHIEU
                    node.style = data.ICON_STYLE
                    //node.symbol = data.KYHIEU
                    node.tooltipText = data.KYHIEU
                    node.setPosition(data.TOADO)
                    node.setIcon(data.ICON_STYLE)
                    node.draggable = true
                    node.dataBe = data
                }
                return node
            },
            getPosition: function (marker) {
                return {
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },
            kc2cot: function (obj) {
                try {
                    if (obj != null) {

                        this.$emit('Kc2Cot', obj);
                    }
                } catch (e) {
                }
            },
            create_UUID() {
                var dt = new Date().getTime()
                var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (dt + Math.random() * 16) % 16 | 0
                    dt = Math.floor(dt / 16)
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
                })
                return uuid
            },
            async xoaCap(id) {
                console.log('xoaCap', id)
                const vdoituongid = id.split('_')
                if (vdoituongid[2] === '0') {
                    this.$confirm(`Bạn có muốn xóa cáp đang chọn không ?`,
                        'Giản đồ mạng cáp',
                        {
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(() => {
                        this.loading(true)
                        this.api_set_xoa_cap({cap_id: vdoituongid[1], xoa_batbuoc: 1}).then((rep) => {
                            this.$refs.map.reload()
                            // Call Reload  gian do
                            this.loading(false)
                            this.$toast.info(rep.message)
                        }).catch((e) => {
                            this.loading(false)
                            this.$toast.error(e.message)
                        })
                    }).catch((e) => {
                    })
                } else {
                    if (vdoituongid[2] !== '0') {
                        this.$confirm(`Bạn có muốn xóa cáp mid-span đang chọn không ?`,
                            'Giản đồ mạng cáp',
                            {
                                confirmButtonText: 'Có',
                                cancelButtonText: 'Không'
                            }).then(() => {
                        }).catch((e) => {
                        })
                    }
                }
            },
            async daochieuCap(id) {
                console.log('daochieuCap', id)
                const vdoituongid = id.split('_')
                this.$confirm(`Sau khi đảo chiều cáp thành công, thông tin đấu nối vào 2 đầu của cáp hiện tại sẽ bị gỡ bỏ. Bạn có chắc muốn thực hiện ?`,
                    'Giản đồ mạng cáp',
                    {
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(() => {
                    this.loading(true)
                    this.api_set_daochieu_cap({cap_id: vdoituongid[1]}).then((rep) => {
                        this.$refs.map.reload()
                        // Call Reload  gian do
                        this.loading(false)
                        this.$toast.info(rep.message)
                    }).catch((e) => {
                        this.loading(false)
                        this.$toast.error(e.message)
                    })
                }).catch((e) => {
                })
            },
            async xoaKetcuoi(id) {
                console.log('xoaKetcuoi', id)
                const vdoituongid = id.split('_')
                this.$confirm(`Bạn có muốn xóa kết cuối đang chọn không ?`,
                    'Giản đồ mạng cáp',
                    {
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(() => {
                    this.loading(true)
                    this.api_set_xoa_ketcuoi({ketcuoi_id: vdoituongid[1], xoa_batbuoc: 1}).then((rep) => {
                        // this.$refs.map.reload()
                        // Call Reload  gian do
                        this.loading(false)
                        this.$toast.info(rep.message)
                    }).catch((e) => {
                        this.loading(false)
                        this.$toast.error(e.message)
                    })
                }).catch((e) => {
                })
            },
            async luuToaDoBanDo(nodes, polylines) {
                console.log('luuToaDoBanDo', nodes, polylines)
                if (polylines.length === 0 && nodes.length === 0) return
                this.$confirm(`Bạn có muốn lưu tọa bể cáp và đoạn cống ?`,
                    'Giản đồ tuyến cống',
                    {
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                        // type: 'warning'
                    }).then(() => {
                    try {
                        this.loading(true)
                        if (nodes && nodes.length > 0) {
                            // const myData = JSON.stringify(nodes)
                            // this.$emit('luuToaDoBanDo', myData);
                        }
                        if (polylines && polylines.length > 0) {
                            let json = []
                            for (let index = 0; index < polylines.length; index++) {
                                const element = polylines[index]
                                let day_toado = element.day_toado
                                let data = []
                                for (let index = 0; index < day_toado.length; index++) {
                                    const e = day_toado[index]
                                    data.push(e.lat + ',' + e.lng)
                                }
                                let dataInput = {
                                    doanCongId: element.id,
                                    dayToaDo: data.join(';')
                                }
                                this.$root.context.post('/web-cabman/BanDoTuyenCong/cap-nhat-toa-do-doan-cong', dataInput)
                            }
                        }
                        this.$root.$toast.success('Lưu thành công.')
                        this.loading(false)
                    } catch (e) {
                        this.loading(false)
                        this.$toast.error('Lưu thất bại.')
                    }
                }).catch(() => {
                })
            },
            isDuplicateKey(id, arr) {
                let isDupl = false
                for (let i = 0; i < arr.length; i += 1) {
                    const obj = arr[i]
                    if (obj.info.id === id) {
                        isDupl = true
                        break
                    }
                }
                return isDupl
            },
            getUniqueId(prefix) {
                var d = new Date().getTime()
                d += (parseInt(Math.random() * 100)).toString()
                if (undefined === prefix) {
                    prefix = 'uid-'
                }
                d = prefix + d
                return d
            },
            //#region "Hàm xử lý"
            node_action: function (data) {
                if (data != null) {
                    let value = data.value
                    console.log("DATA NODE: ", data)
                    console.log("DATA NODE: " + data.type + " ID: " + data.value)
                    if (data.type == 0) {
                        //let value = data.dataBe
                        let obj = {
                            dataBe: data.dataBe,
                            type: "MENU_ITEM_LK_BE_TT"
                        }
                        this.$toast.info("Chọn cột cần liên kết tới\r\nNhấn ESC để hủy");
                        this.$emit('taoDoanCong', obj);
                        //this.vueInstance.$root.$bvModal.show('popupQLDoanCong')
                    }
                    //Tạo cống khác tuyến
                    if (data.type == 1) {
                        let obj = {
                            dataBe: data.dataBe,
                            type: 'MENU_ITEM_LK_BE_TK',
                        }
                        this.$emit("taoDoanCong", obj)
                    }
                    //xoa be
                    if (data.type == 2) {
                        let beId= data.value
                        let obj={
                            beId:beId,
                            type:"MENU_ITEM_XOA_BE"
                        }
                        this.$emit('xacnhan',obj)
                        this.$root.$bvModal.show('modalXoa')
                    }
                    if (data.type == 3) {
                        let beId= data.value
                        let obj={
                            beId:beId,
                            type:"MENU_ITEM_XOA_BE"
                        }
                        this.$emit('xacnhan',obj)
                        this.$root.$bvModal.show('popupQLBe')
                    }
                    if (data.type == 4) {
                        let beId= data.value
                        let obj={
                            beId:beId,
                            type:"MENU_ITEM_CHUYEN_TUYENCB"
                        }
                        this.$emit('xacnhan',obj)
                        this.$root.$bvModal.show('popupDsTuyenCB')
                    }
                }
            },
            polyline_action: function (data) {
                if (data != null) {
                    let value = data.value
                    if (data.type == 0) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_THEM_BE"
                        }
                        this.$emit('chenBe', obj);
                    }
                    //Đảo chiều đoạn cống
                    if (data.type == 1) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_LK_DAOCHIEU"
                        }
                        this.$emit("xacnhanDC", obj)
                        //this.$root.$bvModal.show('popupDsCot');
                    }
                    //Đổi bể a
                    if (data.type == 2) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_DOI_BE_A"
                        }
                        this.$emit("xacnhanCong", obj)
                        this.$root.$bvModal.show('popupDsBe')
                    }
                    //Đổi bể b
                    if (data.type == 3) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_DOI_BE_B"
                        }
                        this.$emit("xacnhanCong", obj)
                        this.$root.$bvModal.show('popupDsBe')
                    }
                    //Xóa cống
                    if (data.type == 4) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_XOA_CONG"
                        }
                        this.$emit("xacnhanCong", obj)
                        this.$root.$bvModal.show('modalXoaCong')
                    }
                    //thuộc tính đoạn cống
                    if (data.type == 5) {
                        let doanCongId = value
                        let obj = {
                            doanCongId: doanCongId,
                            type: "MENU_ITEM_THUOC_TINH_DC"
                        }
                        this.$emit("xacnhanDC", obj)
                        this.$root.$bvModal.show('popupQLDoanCongVaOngCong')
                    }
                }
            },
            getcotSau: function (cot_id) {
                if (cot_id != null)
                    this.$emit('getcotSau', cot_id);
            }
        },

        //#endregion
        async mounted () {
            try {

            } catch (error) {
                console.log('error', error)
            }
        }

    };
</script>

<style>
</style>
