<template src="./index.html">
</template>

<script>
export default {
    data() {
        return {
            kyhieu: '',
            mat: 1,
            kieu: -1,
            vitri: 1,
            soDott: true,
            isAnDayNhayTrong: true,
            vitris: [],
            mats: [
                {ten: 'Mặt trước', id: 1},
                {ten: 'Mặt sau', id: 2}
            ],
            danDoCapChiTiet: [],
            tempdanDoCapRutGon: [],
            danDoCapRutGon: []
        }
    },
    mounted() {
        this.$refs.inputText.focus();
    },
    methods: {
        timKiemKetCuoi: async function() {
            if(this.kyhieu.trim()) {
                try {
                    this.loading(true);
                    var danDo_kc = this.$root.context.post('/web-cabman/tracuu/dan-do-cap-ketcuoi', {
                        kieu: this.kieu,
                        kyhieu: this.kyhieu,
                        mat: this.mat,
                        vitri: this.vitri
                    });
                    var viTri_kc = this.$root.context.post('/web-cabman/tracuu/dan-do-cap-ketcuoi/ds-vitri-ketcuoi', {
                        kyhieu: this.kyhieu,
                        mat: this.mat,
                    });

                    var rsDanDo = await danDo_kc;
                    var rsVitri = await viTri_kc;
                    if(rsDanDo.data) {
                        this.danDoCapChiTiet = rsDanDo.data.dando_chitiet;
                        this.danDoCapRutGon = rsDanDo.data.dando_rutgon;
                        if(this.isAnDayNhayTrong) {
                            this.tempdanDoCapRutGon = this.danDoCapRutGon.filter(x => x.KYHIEU != 'Dây nhảy trong' && x.LOAI_DT != 'Dây nhảy');
                        }
                        else {
                            this.tempdanDoCapRutGon = this.danDoCapRutGon;
                        }
                    }
                    this.vitris = rsVitri.data;
                   
                } catch (error) {
                    this.$toast.error(error.response.data.message_detail);
                } finally {
                    this.loading(false);
                }
            }
            else {
                this.$root.toastError("Ký hiệu kết cuối không được để trống")
            }
        },
        gridDanDoCT_selectedRowChanged: function() {

        },
        gridDanDoRG_selectedRowChanged: function() {
            
        },
        select_selectedItemsChanged: function(data) {
            
        },
        grid_dataGridCellCreated: function(e) {
            if(e.cellDataItem.LOAI_DT == 'Cáp' && this.soDott) {
                $(e.cellElement).addClass('font-weight-bold')
            }
            else {
                $(e.cellElement).removeClass('font-weight-bold')
            }
        }
    },
    watch: {
        'mat': async function(newVal) {
            try {
                this.kyhieu = this.kyhieu.trim();
                if(this.kyhieu) {
                    var rsVitri = await this.$root.context.post('/web-cabman/tracuu/dan-do-cap-ketcuoi/ds-vitri-ketcuoi', {
                        kyhieu: this.kyhieu,
                        mat: newVal,
                    });
                    this.vitris = rsVitri.data;
                    this.vitri = this.vitris.length > 0 ? this.vitris[0].VITRI : null
                }
            } catch (error) {
                this.$toast.error('Xảy ra lỗi');
            } finally {
                this.loading(false);
            }
        },
        isAnDayNhayTrong: function(newVal) {
            if(newVal) {
                this.tempdanDoCapRutGon = this.danDoCapRutGon.filter(x => x.KYHIEU != 'Dây nhảy trong' && x.LOAI_DT != 'Dây nhảy');
            }
            else {
                this.tempdanDoCapRutGon = this.danDoCapRutGon;
            }
        }
    }
}
</script>
