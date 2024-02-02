<template src="./index.html">
</template>

<script>
export default {
    data() {
        return {
            kieu: null,
            dsTramTb: [],
            dsThietBi: [],
            dsLoaiKn: [],
            dsHuongKn: [],
            dsPhuongThucKn: [
                {
                    METHOD_ID: 0,
                    METHOD: "PPPoE"
                },
                {
                    METHOD_ID: 1,
                    METHOD: "IPoE"
                }
            ],
            dsSCVLAN: [],
            tramTb: {
                tramTbId: null,
                vung_id: null,
            },
            thietBi: null,
            loaiKetNoi: null,
            phuongThucKn: 0,
            huongKn: null,
            svlan: null,
            cvlan_tu: null,
            cvlan_den: null,
            svlan_tu: null,
            svlan_den: null,
            quyHoachId: null,
            isErorSvlan_tu: false,
            isErorSvlan_den: false,
            isErorTramTb: false,
            isErorSvlan: false,
            isErorThietBi: false,
            isErorCvlan_tu: false,
            isErorLoaiKn: false,
            isErorCvlan_den: false,
            isErorPhuongThucKn: false,
            isErorHuongKn: false
        }
    },
    methods: {
        layDsHuongKetNoi: async function(vung_id, loaikn_id) {
            var rsHuongKn = await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/dshuongketnoi', {
                kieu: this.kieu,
                vung_id: vung_id
            })
            this.dsHuongKn = rsHuongKn.data.filter(v => v.LOAIKN_ID == loaikn_id);
            this.huongKn = this.dsHuongKn.length > 0 ? this.dsHuongKn[0].HUONGKN_ID : null;
        },
        layDsSCVLAN: async function() {
            var rsSCVLAN = await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/danhsach', {
                kieu: this.kieu,
                svlan_tu: 0,
                svlan_den: 100000
            });
            this.dsSCVLAN = rsSCVLAN.data;
        },
        grid_selectedRowChanged: function(dataItem) {
            if(dataItem) {
                this.quyHoachId = dataItem.QUYHOACH_ID;
                this.svlan = dataItem.SVLAN;
                this.cvlan_tu = dataItem.CVLAN_TU;
                this.cvlan_den = dataItem.CVLAN_DEN;
                this.tramTb = {
                    tramTbId: dataItem.DONVI_ID,
                    vung_id: dataItem.DONVI_ID
                };
                this.thietBi = dataItem.DSLAM_ID;
                this.loaiKetNoi = dataItem.LOAIKN_ID;
                this.phuongThucKn = dataItem.METHOD;
                this.huongKn = dataItem.HUONGKN_ID;
            }
        },
        timKiem: async function() {
            if(!this.svlan_tu) {
                this.isErorSvlan_tu = true;
                this.$refs.svlan_tu_inp.focus();
                this.$toast.error('Chưa nhập SVLAN từ');
            }
            else if(!this.svlan_den) {
                this.isErorSvlan_den = true;
                this.$refs.svlan_den_inp.focus();
                this.$toast.error('Chưa nhập SVLAN đến');
            }
            else {
                this.loading(true);
                try {
                    var rsSCVLAN = await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/danhsach', {
                        kieu: this.kieu,
                        svlan_tu: this.svlan_tu,
                        svlan_den: this.svlan_den
                    });
                    this.dsSCVLAN = rsSCVLAN.data;
                    this.resetError();
                } catch (error) {
                    this.$toast.error('Xảy ra lỗi');
                } finally {
                    this.loading(false);
                }
            }
        },
        checkForm: function() {
            var check = true;
            if(!this.tramTb.tramTbId) {
                this.isErorTramTb = true;
                check = false;
            }
            else {
                this.isErorTramTb = false;
            }

            if(!this.svlan) {
                this.isErorSvlan = true;
                check = false;
            }
            else {
                this.isErorSvlan = false;
            }

            if(!this.thietBi) {
                this.isErorThietBi = true;
                check = false;
            }
            else {
                this.isErorThietBi = false;
            }

            if(!this.cvlan_tu || this.cvlan_tu < 0) {
                this.isErorCvlan_tu = true;
                check = false;
            }
            else {
                this.isErorCvlan_tu = false;
            }

            if(!this.loaiKetNoi) {
                this.isErorLoaiKn = true;
                check = false;
            }
            else {
                this.isErorLoaiKn = false;
            }

            if(!this.cvlan_den) {
                this.isErorCvlan_den = true;
                check = false;
            }
            else {
                this.isErorCvlan_den = false;
            }

            if(this.phuongThucKn == null) {
                this.isErorPhuongThucKn = true;
                check = false;
            }
            else {
                this.isErorPhuongThucKn = false;
            }

            if(!this.huongKn) {
                this.isErorHuongKn = true;
                check = false;
            }
            else {
                this.isErorHuongKn = false;
            }
            return check;
        },
        nhapMoi: function() {
            this.quyHoachId = null;
            this.svlan = null;
            this.cvlan_tu = null;
            this.cvlan_den = null;
        },
        ghiLai: async function() {
            if(this.checkForm()) {
                if(this.quyHoachId) {
                    try {
                        this.loading(true);
                        await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/sua', {
                            quyhoach_id: this.quyHoachId,
                            donvi_id: this.tramTb.tramTbId,
                            dslam_id: this.thietBi,
                            svlan: this.svlan,
                            cvlan_tu: this.cvlan_tu,
                            cvlan_den: this.cvlan_den,
                            huongkn_id: this.huongKn,
                            method: this.phuongThucKn
                        });
                        this.$toast.success('Cập nhật thành công');
                        this.layDsSCVLAN();
                        this.resetError();
                    } catch (error) {
                        console.log(error)
                        this.$toast.error('Cập nhật thất bại');
                    } finally {
                        this.loading(false);
                    }
                }
                else {
                    try {
                        this.loading(true);
                        await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/them', {
                            donvi_id: this.tramTb.tramTbId,
                            dslam_id: this.thietBi,
                            svlan: this.svlan,
                            cvlan_tu: this.cvlan_tu,
                            cvlan_den: this.cvlan_den,
                            huongkn_id: this.huongKn,
                            method: this.phuongThucKn
                        });
                        this.$toast.success('Thêm mới thành công');
                        this.layDsSCVLAN();
                        this.resetError();
                    } catch (error) {
                        this.$toast.error('Thêm mới thất bại');
                    } finally {
                        this.loading(false);
                    }
                }
            }
        },
        huy: function() {

        },
        xoa: function() {
            if(this.quyHoachId) {
                this.$bvModal.msgBoxConfirm('Xác nhận hành động', {
                    title: 'Bạn có chắc chắn xóa dữ liệu không ?',
                    size: 'sm',
                    okTitle: 'Đồng ý',
                    cancelTitle: 'Hủy',
                }).then(async v => {
                    if(v) {
                        try {
                            await this.$root.context.post(`/web-ecms/danhmuc/quyhoach_scvlan/xoa/${this.quyHoachId}`);
                            this.$toast.success("Xóa thành công");
                            this.layDsSCVLAN();
                        } catch (error) {
                            this.$toast.success('Xóa thất bại');
                        } finally {
                            this.loading(false);
                        }
                    }
                }).catch(err => {
                    this.$toast.error('Xóa thất bại');
                })
            }
        },
        resetError: function() {
            this.isErorSvlan_tu = false,
            this.isErorSvlan_den = false,
            this.isErorTramTb = false,
            this.isErorSvlan = false,
            this.isErorThietBi = false,
            this.isErorCvlan_tu = false,
            this.isErorLoaiKn = false,
            this.isErorCvlan_den = false
        },
        resetForm: function() {
            this.quyHoachId = null;
            this.svlan = null;
            this.cvlan_tu = null;
            this.cvlan_den = null;
            this.tramTb = {
                tramTbId: null,
                vung_id: null
            };
            this.thietBi = null;
            this.loaiKetNoi = null;
            this.phuongThucKn = 0;
            this.huongKn = null;
            this.svlan_tu = null;
            this.svlan_den = null;
            this.resetError();
        }
    },
    // async mounted() {
    //     try {
    //         this.loading(true);
    //         var rsTramTb = await this.$root.context.get('web-ecms/danhmuc/quyhoach_scvlan/dstram_tbi');
    //         this.dsTramTb = rsTramTb.data;
    //         if(this.dsTramTb.length > 0) {
    //             this.tramTb.tramTbId = this.dsTramTb[0].DONVI_ID;
    //             this.tramTb.vung_id = this.dsTramTb[0].DONVI_QL_ID;
    //         }
    //         this.layDsSCVLAN();
    //     } catch (error) {
            
    //     } finally {
    //         this.loading(false);
    //     }
    // },
    created: function() {
        if(this.$route.name == 'QuyHoachSCVLANLienTinh') {
            this.kieu = 2;
        }
        else if(this.$route.name == 'QuyHoachSCVLANInternetTrucTiep') {
            this.kieu = 3;
        }
        else if(this.$route.name == 'QuyHoachSCVLANFiber') {
            this.kieu = 4;
        }
    },
    watch: {
        'tramTb.tramTbId': async function(newVal) {
            if(newVal) {
                var rsThietBi = await this.$root.context.post('/web-ecms/danhmuc/quyhoach_scvlan/dmthietbi', {
                    kieu: this.kieu,
                    donvi_id: newVal
                });
                this.dsThietBi = rsThietBi.data;
                this.thietBi = this.dsThietBi.length > 0 ? this.dsThietBi[0].DSLAM_ID : null;

                var rsLoaiKn = await this.$root.context.get('/web-ecms/danhmuc/quyhoach_scvlan/dmhuongketnoi');
                this.dsLoaiKn = rsLoaiKn.data.loai_kn;
                this.loaiKetNoi = this.dsLoaiKn.length > 0 ? this.dsLoaiKn[0].LOAIKN_ID : null;

                await this.layDsHuongKetNoi(this.tramTb.vung_id, this.loaiKetNoi);
            }
        },
        loaiKetNoi: async function(newVal) {
            if(newVal)
                await this.layDsHuongKetNoi(this.tramTb.vung_id, newVal);
        },
        kieu: async function(newVal) {
            try {
                this.loading(true);
                var rsTramTb = await this.$root.context.get('web-ecms/danhmuc/quyhoach_scvlan/dstram_tbi');
                this.dsTramTb = rsTramTb.data;
                if(this.dsTramTb.length > 0) {
                    this.tramTb.tramTbId = this.dsTramTb[0].DONVI_ID;
                    this.tramTb.vung_id = this.dsTramTb[0].DONVI_QL_ID;
                    await this.layDsHuongKetNoi(this.tramTb.vung_id, this.loaiKetNoi);
                }
                this.layDsSCVLAN();
            } catch (error) {
                
            } finally {
                this.loading(false);
            }
        },
        '$route.name': function(newVal) {
            this.resetForm();
            if(this.$route.name == 'QuyHoachSCVLANLienTinh') {
                this.kieu = 2;
            }
            else if(this.$route.name == 'QuyHoachSCVLANInternetTrucTiep') {
                this.kieu = 3;
            }
            else if(this.$route.name == 'QuyHoachSCVLANFiber') {
                this.kieu = 4;
            }
        }
    }
}
</script>
