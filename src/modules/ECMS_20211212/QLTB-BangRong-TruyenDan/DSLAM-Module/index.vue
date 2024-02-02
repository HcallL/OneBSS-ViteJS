<template src="./index.html">
</template>

<script>
import EventBus from '../../../../utils/eventBus'
export default {
    data() {
        return {
            carddsl_id: 0,
            moduledsl_id: 0,
            vitri: null,
            vitri_cu: null,
            loaiModule_id: null,
            serial: null,
            serial_cu: null,
            soPort: null,
            portBD: null,
            partNumber: null,
            dsLoaiModule: [],
            isThemMoi: false,
            currentItem: {}
        }
    },
    methods: {
        loadDsLoaiModule: async function() {
            try {
                var rs = await this.$root.context.get('/web-ecms/danhmuc/module/danhsach'); 
                this.dsLoaiModule = rs.data;
            } catch (error) {
                
            }
        },
        loadDsLamModule: async function() {
            try {
                this.loading(true);
                await this.loadDsLoaiModule();
                var rs = await this.$root.context.get(`/web-ecms/danhmuc/DslamModule/ChiTiet?moduleDslId=${this.moduledsl_id}`);
                if(rs.data) {
                    this.vitri = rs.data.VITRI;
                    this.vitri_cu = rs.data.VITRI;
                    this.loaiModule_id = rs.data.LOAIMODULE_ID;
                    this.serial = rs.data.SERIAL;
                    this.serial_cu = rs.data.SERIAL;
                    this.soPort = rs.data.SO_PORT;
                    this.portBD = rs.data.PORT_BD;
                    this.partNumber = rs.data.PARTNUMBER;
                }
            } catch (error) {
                
            } finally {
                this.loading(false);
            }
        },
        clearForm: function() {
            this.vitri = null;
        },
        checkForm: async function() {
            var check = true;
            var error = '';

            if(this.partNumber == null || this.partNumber == '') {
                check = false;
                error = 'Chưa nhập Part Number';
            }

            if(this.serial == null || this.serial == '') {
                check = false;
                error = 'Chưa nhập serial\n'.concat(error);
            }
            else if(this.serial != this.serial_cu) {
                var kq = await this.$root.context.get(`/web-ecms/danhmuc/DslamModule/kiemtra-trung-serial?serial=${this.serial}`);
                if(kq.data.result) {
                    check = false;
                    error = 'Serial này đã được sử dụng !\n'.concat(error);
                }
            }

            if(this.vitri == null || this.vitri == '') {
                check = false;
                error = 'Nhập vị trí cắm Module\n'.concat(error);
            }
            else if(this.vitri != this.vitri_cu) {
                var kq = await this.$root.context.post('/web-ecms/danhmuc/DslamModule/kiemtra-trung-vitri-camcard', {
                    vitri: this.vitri,
                    cardDslId: this.carddsl_id
                });
                if(kq.data.result) {
                    check = false;
                    error = 'Serial này đã được sử dụng !\n'.concat(error);
                }
            }

            if(!this.loaiModule_id) {
                check = false;
                error = 'Chưa chọn loại module\n'.concat(error);
            }

            if(!check) {
                this.$root.toastError(error);
            }
            return check;
        },
        taoDuLieuDslamModule: function() {
            return {
                cardDslId: this.carddsl_id,
                loaiModuleId: this.loaiModule_id,
                partNumber: this.partNumber,
                serial: this.serial,
                viTri: this.vitri,
                moduleDslId: this.moduledsl_id
            }
        },
        themMoi: function() {
            this.isThemMoi = true;
            this.clearForm();
        },
        ghiLai: async function() {
            var kq = await this.checkForm();
            if(kq) {
                if(this.isThemMoi) {
                    try {
                        this.loading(true);
                        var rs = await this.$root.context.post('/web-ecms/danhmuc/DslamModule/Them', this.taoDuLieuDslamModule());
                        if(rs.data) {
                            this.$root.toastSuccess("Thêm mới thành công");
                            this.isThemMoi = false;
                            let loai_module = this.dsLoaiModule.find(v => v.LOAIMODULE_ID == this.loaiModule_id);
                            this.currentItem = {
                                moduledsl_id: rs.data.MODULEDSL_ID,
                                carddsl_id: this.carddsl_id,
                                loai_module:  loai_module ? loai_module.LOAI_MODULE : null
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
                        var rs = await this.$root.context.post('/web-ecms/danhmuc/DslamModule/CapNhat', this.taoDuLieuDslamModule());
                        if(rs.data) {
                            this.$root.toastSuccess("Cập nhật thành công");
                            this.vitri_cu = this.vitri;
                            this.serial_cu = this.serial;
                            let loai_module = this.dsLoaiModule.find(v => v.LOAIMODULE_ID == this.loaiModule_id);
                            this.currentItem = {
                                moduledsl_id: this.moduledsl_id,
                                carddsl_id: this.carddsl_id,
                                loai_module:  loai_module ? loai_module.LOAI_MODULE : null
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
                var rs = await this.$root.context.post(`/web-ecms/danhmuc/DslamModule/Xoa?moduleDslId=${this.moduledsl_id}`);
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
            this.moduledsl_id = data.itemID;
            this.carddsl_id = data.carddsl_id;
            await this.loadDsLamModule();
            if(this.moduledsl_id == 0) {
                this.themMoi();
            } 
        }
    },
    watch: {
        loaiModule_id: function(val) {
            if(val) {
                let rs = this.dsLoaiModule.find(v => v.LOAIMODULE_ID == val);
                if(rs) {
                    this.soPort = rs.SO_PORT;
                    this.portBD = rs.PORT_BD;
                }
            }
        }
    },
    mounted: function() {
        try {
            let vm = this;
            EventBus.$on('thongTinDsLamModule', async data => {
                this.carddsl_id = data.carddsl_id;
                this.moduledsl_id = data.moduledsl_id;
                await this.loadDsLamModule();
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
