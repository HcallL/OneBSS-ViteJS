<template>
  <ejs-dialog :header="'Thông tin loại nhà khách hàng'" showCloseIcon="true" :target="'.main-wrapper'" header-class="popup-header" :visible="false" ref="popupLoaiNhaKhachHang" :position="{ X: 'center', Y: 'top' }" width="60%" id="popupLoaiNhaKhachHang">
    <div class="popup-content">
      <div class="list-actions-top">
        <ul class="list">
          <li>
            <a title="Chấp nhận" ref="tsbtnNhapMoi" @click="tsbtnChapnhan_Click"> <span class="icon one-file-attach"></span> Chấp nhận </a>
          </li>
          <li>
            <a ref="tsbtnHuyBo" @click="tsbtnHuyBo_Click"> <span class="icon one-reload1"></span> Thoát </a>
          </li>
        </ul>
      </div>
      <div class="popup-body">
        <div class="box-form">
          <div class="row">
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100 nowrap">Nhóm loại nhà</div>
                <div class="value">
                  <div class="select-custom">
                    <Select2Ext ref="cboNhomLoaiNha" @change="checkValid()" :allowFiltering="true"></Select2Ext>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100 nowrap">Số tầng</div>
                <div class="value">
                  <input ref="txtSoTang" @input="checkValid()" type="number" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100 nowrap">Diện tích</div>
                <div class="value">
                  <input ref="txtDientich" @input="checkValid()" type="number" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100 nowrap">Số phòng</div>
                <div class="value">
                  <input ref="txtSoPhong" @input="checkValid()" type="number" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-12">
              <div class="info-row">
                <div class="key w100 nowrap">Tên loại nhà</div>
                <div class="value">
                  <div class="select-custom">
                    <Select2Ext ref="cboTenLoaiNha" @change="checkValid()" disable  :allowFiltering="true"></Select2Ext>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ejs-dialog>
</template>
<script>
import Select2Ext from '@/modules/contract/setup/DeclareLandline/components/Select2Ext'
export default {
    components: {
        Select2Ext
    },
    data() {
        return {
            thuebao_id: 0,
            hdtb_id : 0,
            type : 0,
            validate : false
        }
    },
    methods: {
        checkValid () {
            // if (this.$refs.cboNhomLoaiNha.value == null) {
            //     this.$refs.cboNhomLoaiNha.$refs.ele.classList.add("error")
            //     return false
            // }

            this.$refs.txtSoTang.classList.remove("error")
            this.$refs.txtDientich.classList.remove("error")
            this.$refs.txtSoPhong.classList.remove("error")
            this.$refs.cboNhomLoaiNha.$refs.ele.classList.remove("error")
            this.$refs.cboTenLoaiNha.$refs.ele.classList.remove("error")
            this.$refs.cboTenLoaiNha.disabled = true
            this.validate = false

            if (this.$refs.txtSoTang.value == "") {
                this.$refs.txtSoTang.classList.add("error")
            }
            if (this.$refs.txtDientich.value == "") {
                this.$refs.txtDientich.classList.add("error")
            }
            if (this.$refs.txtSoPhong.value == "") {
                this.$refs.txtSoPhong.classList.add("error")
            }

            if(!this.$refs.cboNhomLoaiNha.value) {
                this.$refs.cboNhomLoaiNha.$refs.ele.classList.add("error")
            }

            if(this.$refs.cboNhomLoaiNha.value && this.$refs.txtSoTang.value != "" && this.$refs.txtDientich.value != "" && this.$refs.txtSoPhong.value != "") {
                this.$refs.cboTenLoaiNha.disabled = false
                if(!this.$refs.cboTenLoaiNha.value) {
                    this.$refs.cboTenLoaiNha.$refs.ele.classList.add("error")
                }
            }

            this.changeLoaiNha()

            if(this.$refs.cboNhomLoaiNha.value && this.$refs.txtSoTang.value != "" && this.$refs.txtDientich.value != "" && this.$refs.txtSoPhong.value != "" && this.$refs.cboTenLoaiNha.value) {
                this.validate = true
                // this.changeLoaiNha()
            }
            
        },
        async tsbtnChapnhan_Click() {
            if(!this.validate) {
                this.$toast.error("Vui lòng nhập đầy đủ thông tin")
                return
            }
            try {
                let vjsLoaiNha = [{"HDTB_ID": this.hdtb_id,"LOAINHA_ID": this.$refs.cboTenLoaiNha.value ,"SOTANG": this.$refs.txtSoTang.value,
                "DIENTICH": this.$refs.txtDientich.value,"SOPHONG": this.$refs.txtSoPhong.value}]
                if(this.thuebao_id == 0 ){
                      let data = await this.axios.post("web-hopdong/hopdong/sp_capnhat_diachi_hdtb",
                  { vhdtb_id: this.hdtb_id, vjsLoaiNha: JSON.stringify(vjsLoaiNha) })
                }else{
                        let data = await this.axios.post("web-hopdong/hopdong/sp_capnhat_diachi_tb_loainha",
                                    { vthuebao_id: this.thuebao_id, vjsLoaiNha: JSON.stringify(vjsLoaiNha) })
                }
                if(data.data.data == "ok") {
                    this.$toast.success("Lưu thành công")
                } else {
                    this.$toast.error("Lưu không thành công")
                }
            } catch (error) {
                this.$toast.error("Lưu không thành công")
            }
        },
        tsbtnHuyBo_Click() {
            this.$refs.popupLoaiNhaKhachHang.hide();
        },
        showDialog () {
            this.init()
            this.$refs.popupLoaiNhaKhachHang.show();
        },
        async changeLoaiNha() {
          var rs = await this.$root.context.post(
            "/web-hopdong/lapdatmoi/sp_lay_loainha_theo_dieukien",
            { 
              p_nhomln_id: this.$refs.cboNhomLoaiNha.value,
              p_dientich: this.$refs.txtDientich.value,
              p_sotang: this.$refs.txtSoTang.value,
              p_sophong: this.$refs.txtSoPhong.value
            }
          );
          this.$refs.cboTenLoaiNha.dataSource = rs.data;
        },
        async init () {
            try {
                let data = await this.axios.get("web-hopdong/lapdatmoi/sp_nhom_loainha_lay_ds")
                this.$refs.cboNhomLoaiNha.HT_COMBOBOX(data.data.data, "nhom_ln", "nhomln_id");

                this.$refs.cboTenLoaiNha.HT_COMBOBOX([], "ten_loainha", "loainha_id");
                this.$refs.cboTenLoaiNha.value = null

                if(this.thuebao_id == 0 ){
                        data = await this.axios.get("web-hopdong/hopdong/sp_lay_diachi_thuebao_loainha", {
                                    params : {
                                              vdb_id : this.hdtb_id,
                                              vtype : this.type
                                          }
                                      })
                  }else{
                        data = await this.axios.get("web-hopdong/hopdong/sp_lay_diachi_thuebao_loainha", {
                                    params : {
                                              vdb_id : this.thuebao_id,
                                              vtype : this.type
                                          }
                                      })
                  }

                if(data.data.data.length > 0) {
                    this.$refs.txtSoTang.value = data.data.data[0].sotang
                    this.$refs.txtDientich.value = data.data.data[0].dientich
                    this.$refs.txtSoPhong.value = data.data.data[0].sophong
                    this.$refs.cboTenLoaiNha.value = data.data.data[0].loainha_id
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
    .error {
        border-color: red !important;
    }
</style>

