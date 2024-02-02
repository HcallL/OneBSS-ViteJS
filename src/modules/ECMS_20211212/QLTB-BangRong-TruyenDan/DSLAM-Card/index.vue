<template src="./index.html">
</template>

<script>
import EventBus from '../../../../utils/eventBus'
export default {
    data() {
        return {
            shelfdsl_id: 0,
            carddsl_id: 0,
            vitri: 0,
            nhomCard_id: null,
            tenCard: null,
            loaiCard_id: null,
            slot: null,
            soPort: null,
            serial: null,
            serial_cu: null,
            partNumber: null,
            phienTB: null,
            phienTD: null,
            doiDayTBTu: null,
            doiDayTDTu: null,
            portSuDung: null,
            dsNhomCard: [],
            dsLoaiCard: [],
            dsPort: [],
            isLoading: false,
            isThemMoi: false,
            currentItem: {}
        }
    },
    methods: {
        loadDsNhomCard: async function() {
            try {
                var rs = await this.$root.context.get('/web-ecms/danhmuc/dslam-card/get-nhomcard-by-loaitb_id/6');
                this.dsNhomCard = rs.data;
                if(!this.isLoading) {
                    this.nhomCard_id = this.dsNhomCard.length > 0 ? this.dsNhomCard[0].NHOMCARD_ID : null;
                }
            } catch (error) {

            }
        },
        loadDsLoaiCard: async function() {
            try {
                var rs = await this.$root.context.get(`/web-ecms/danhmuc/dslam-card/get-loaicard-by-nhomcardid?nhomcard_id=${this.nhomCard_id}&loaitb_id=6`);
                this.dsLoaiCard = rs.data;
                if(!this.isLoading) {
                    this.loaiCard_id = this.dsLoaiCard.length > 0 ? this.dsLoaiCard[0].LOAICARD_ID : null;
                }
            } catch (error) {

            }
        },
        loadLoaiCard: async function() {
            try {
                let rs = await this.$root.context.get(`/web-ecms/danhmuc/dslam-card/get-loaicard-by-id/${this.loaiCard_id}`);
                return rs.data;
            } catch (error) {

            }
        },
        loadDsLamCard: async function() {
            try {
                this.loading(true);
                await this.loadDsNhomCard();
                let rs = await this.$root.context.get(`/web-ecms/danhmuc/dslam-card/chi-tiet/${this.carddsl_id}`);
                if(rs.data) {
                    this.nhomCard_id = rs.data.NHOMCARD_ID;
                    this.tenCard = rs.data.TEN_CARD;
                    this.loaiCard_id = rs.data.LOAICARD_ID;
                    this.soPort = rs.data.SO_PORT;
                    this.serial = rs.data.SERIAL;
                    this.serial_cu = rs.data.SERIAL;
                    this.partNumber = rs.data.PARTNUMBER;
                    this.phienTB = rs.data.PHIEN_TB;
                    this.phienTD = rs.data.PHIEN_TD;
                    this.doiDayTBTu = rs.data.DOIDAYTB_TU;
                    this.doiDayTDTu = rs.data.DOIDAYTD_TU;
                }
                let rsPortSD = await this.$root.context.get(`/web-ecms/danhmuc/dslam-card/get-port-carddslam-sudung?carddsl_id=${this.carddsl_id}`);
                this.portSuDung = rsPortSD.data.KQ;
                let rsDsPort = await this.$root.context.get(`/web-ecms/danhmuc/dslam-card/lay-port-theo-card/${this.carddsl_id}`);
                this.dsPort = rsDsPort.data;
            } catch (error) {
                
            } finally {
                this.loading(false);
            }
        },
        clearForm: function() {
            this.tenCard = null;
            this.serial = null;
            this.soPort = null;
            this.partNumber = null;
            this.phienTB = null;
            this.doiDayTBTu = null;
            this.phienTD = null;
            this.doiDayTDTu = null;
        },
        checkForm: async function() {
            let check = true;
            let error = '';

            if(this.doiDayTDTu == null || this.doiDayTDTu == '') {
                check = false;
                error = 'Chưa nhập thông tin đôi dây TD từ';
            }

            if(this.phienTD == null || this.phienTD == '') {
                check = false;
                error = 'Chưa nhập thông tin phiến TD\n'.concat(error);
            }

            if(this.doiDayTBTu == null || this.doiDayTBTu == '') {
                check = false;
                error = 'Chưa nhập thông tin đôi dây TB từ\n'.concat(error);
            
            }
            if(this.phienTB == null || this.phienTB == '') {
                check = false;
                error = 'Chưa nhập thông tin phiến TB\n'.concat(error);
            }

            if(this.serial == null || this.serial == '') {
                check = false;
                error = 'Chưa nhập serial!\n'.concat(error);
            }
            else if(this.serial != this.serial_cu) {
                let kq = await this.$root.context.get(`/web-ecms/danhmuc/DslamModule/kiemtra-trung-serial?serial=${this.serial}`);
                if(kq.data.result) {
                    check = false;
                    error = 'Serial này đã được sử dụng !\n'.concat(error);
                }
            }

            if(!this.loaiCard_id) {
                check = false;
                error = 'Chưa chọn loại card!\n'.concat(error);
            }

            if(!this.nhomCard_id) {
                check = false;
                error = 'Chưa chọn nhóm card!\n'.concat(error);
            }

            if(!check) {
                this.$root.toastError(error);
            }
            return check;
        },
        taoDuLieuDslamCard: function() {
            return {
                shelfDslId: this.shelfdsl_id,
                cardDslId: this.carddsl_id,
                doiDayTbTu: this.doiDayTBTu,
                doiDayTdTu: this.doiDayTDTu,
                loaiCardId: this.loaiCard_id,
                partNumber: this.partNumber,
                phienTb: this.phienTB,
                phienTd: this.phienTD,
                serial: this.serial,
                tenCard: this.tenCard,
                viTri: this.vitri
            }
        },
        themMoi: function() {
            this.isThemMoi = true;
            this.clearForm();
        },
        ghiLai: async function() {
            let kq = await this.checkForm();
            if(kq) {
                if(this.isThemMoi) {
                    try {
                        this.loading(true);
                        var rs = await this.$root.context.post('/web-ecms/danhmuc/dslam-card/them', this.taoDuLieuDslamCard());
                        if(rs.data) {
                            this.$root.toastSuccess("Thêm mới thành công");
                            this.serial_cu = this.serial;
                            this.isThemMoi = false;
                            this.currentItem = {
                                carddsl_id: rs.data.CARDDSL_ID,
                                shelfdsl_id: this.shelfdsl_id,
                                tenCard: this.tenCard
                            };
                            return true;
                        }
                    } catch (error) {
                        this.$root.toastError(error.response.data.message_detail);
                    } finally {
                        this.loading(false);
                    }
                }
                else {
                    try {
                        this.loading(true);
                        var rs = await this.$root.context.post('/web-ecms/danhmuc/dslam-card/cap-nhat', this.taoDuLieuDslamCard());
                        if(rs.data) {
                            this.$root.toastSuccess("Cập nhật thành công");
                            this.serial_cu = this.serial;
                             this.currentItem = {
                                carddsl_id: this.carddsl_id,
                                shelfdsl_id: this.shelfdsl_id,
                                tenCard: this.tenCard
                            };
                            return true;
                        }
                    } catch (error) {
                        this.$root.toastError(error.response.data.message_detail);
                    } finally {
                        this.loading(false);
                    }
                }
            }
        },
        xoa: async function() {
            // this.$bvModal.msgBoxConfirm('Bạn chắc chắn muốn xóa?', {
            //     size: 'sm',
            //     okTitle: 'Đồng ý',
            //     cancelTitle: 'Hủy',
            // }).then(async v => {
            //     if(v) {
                    
            //     }
            // }).catch(err => {
            //     this.$toast.toastError('Xóa thất bại');
            // })
            try {
                this.loading(true);
                var rs = await this.$root.context.post(`/web-ecms/danhmuc/dslam-card/xoa/${this.carddsl_id}`);
                if(rs.data.result) {
                    this.$root.toastSuccess("Xóa dữ liệu thành công!");
                    return true;
                }
            } catch (error) {
                this.$root.toastError(error.response.data.message_detail);
            } finally {
                this.loading(false);
            }
        },
        bindData: async function(data) {
            this.isLoading = true;
            this.carddsl_id = data.itemID;
            this.shelfdsl_id = data.shelfdsl_id;
            this.vitri = data.vitri;
            await this.loadDsLamCard();
            if(this.carddsl_id == 0) {
                this.themMoi();
            }
            this.isLoading = false;
        }
    },
    watch: {
        nhomCard_id: async function(val) {
            if(val) {
                try {
                    await this.loadDsLoaiCard();
                } catch (error) {
                    
                }
            }
        },
        loaiCard_id: async function(val) {
            if(val) {
                let rs = await this.loadLoaiCard();
                if(rs) {
                    this.soPort = rs.SO_PORT;
                }
            }
        }
    },
    mounted: async function() {
        try {
            let vm = this;
            EventBus.$on('thongTinDsLamCard', async data => {
                this.isLoading = true;
                this.shelfdsl_id = data.shelfdsl_id;
                this.carddsl_id = data.carddsl_id;
                this.vitri = data.vitri;
                await this.loadDsLamCard();
                this.isLoading = false;
            })

            EventBus.$on('themMoi', () => {
                vm.clearForm();
                vm.isThemMoi = true;
            })

            EventBus.$on('ghiLai', () => {
                vm.ghiLai();
            })

            EventBus.$on('xoa', () => {
                vm.xoa();
            })

            EventBus.$on('huyBo', () => {
                vm.clearForm();
            })
        } catch (error) {
            
        }
    },
    destroyed() {
        EventBus.$off("themMoi");
        EventBus.$off("ghiLai");
        EventBus.$off("huyBo");
        EventBus.$off("xoa");
    }
}
</script>
