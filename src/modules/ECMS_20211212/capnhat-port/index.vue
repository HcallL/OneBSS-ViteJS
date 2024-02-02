<template src="./index.template.html">
</template>
<script>
export default {
    data: function () {
        return {
           indexGrid: -1,  
           arrayDataToCbo: {
            dataDVQL: [],
            dataDslamTinh: [],
            dataTramTC: [],
            dataCard: [],
            dataTramTB: [],
            dataBras: [],
            dataDslam: [],
           },
           arrayCBO: {
            cboDVQL: 0,
            cboTramTC: -1,
            chkCard: false,
            cboDslamTinh: 0,
            cboCard: -1,
            cboTramTB: -1,
            cboBras: -1,
            cboDslam: -1
           },
           arrayDataGrids: {
            dsPort: [],
            dsThueBao: []
           },
           kt_load: true,
           thamso: "0",
           lblTongSo: '',
           ds_id_port: []
        }
    },
    created: function () {
        try
        {
            this.loading(true)
            this.layDsDVQL()
            this.kt_load = false
            this.layDsBras()
            this.layDsDslamVDC()
        }
        catch (ex)
        {
            this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu: " +ex)
        }
        finally{
            this.loading(false)
        }   
    },
    methods: {
        layDsDVQL: async function(){
            let donvi_id = 0
            let loaidv_id = 3
            let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-donvi-qli?p_donvi_id=${donvi_id}&p_loaidv_id=${loaidv_id}`)
            if  (rs.error_code === 'BSS-00000000'){
                this.arrayDataToCbo.dataDVQL = rs.data
                if (rs.data.length > 0) {
                    this.arrayCBO.cboDVQL = rs.data[0].DONVI_ID    
                }
                //if (this.arrayCBO.cboDVQL > 0) 
                {
                    this.layDsTramTC()
                }
            }
            else{
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
            }
        },
        layDsTramTC: async function(){
            let donvi_id = this.arrayCBO.cboDVQL
            let loaidv_id = 5
            this.arrayCBO.cboTramTC = []
            let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-donvi-qli?p_donvi_id=${donvi_id}&p_loaidv_id=${loaidv_id}`)
            if  (rs.error_code === 'BSS-00000000'){
                this.arrayDataToCbo.dataTramTC = rs.data
                if (rs.data.length > 0) {
                    this.arrayCBO.cboTramTC = rs.data[0].DONVI_ID    
                }
                //if (this.arrayCBO.cboTramTC > 0) 
                {
                    this.layDsTramTB()
                }
            }
            else{
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
            }
        },
        layDsTramTB: async function(){
            let donvi_id = this.arrayCBO.cboTramTC
            let loaidv_id = 39
            this.arrayCBO.cboTramTB = []
            let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-tramtbi?p_donvi_id=${donvi_id}&p_loaidv_id=${loaidv_id}`)
            if  (rs.error_code === 'BSS-00000000'){
                this.arrayDataToCbo.dataTramTB = rs.data
                if (rs.data.length > 0) {
                    this.arrayCBO.cboTramTB = rs.data[0].DONVI_ID    
                }
                //if (this.arrayCBO.cboTramTB > 0) 
                {
                    this.layDsDslamTinh()
                    let ds_dslam = this.arrayDataToCbo.dataDslamTinh
                    if (ds_dslam.length <= 0) {
                        this.arrayDataGrids.dsPort = []
                        this.arrayDataGrids.dsThueBao = []
                        this.arrayCBO.chkCard = false
                        this.arrayDataToCbo.dataCard = []
                    }
                }
            }
            else{
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
            }
        },
        cboDslamTinh_Changed: async function(){
            try {      
                let dslamTinh = this.arrayDataToCbo.dataDslamTinh
                let selectedDslamTemp = dslamTinh.filter(obj=>obj.DSLAM_ID == this.arrayCBO.cboDslamTinh);
                
                console.log('dslamTinh',dslamTinh)
                console.log('cboDslamTinh',this.arrayCBO.cboDslamTinh)
                
                let selectedDslam = [...selectedDslamTemp][0]
                console.log('selectedDslam',selectedDslam)
                if (dslamTinh.length > 0) {
                    if (selectedDslam != []) {
                        // if (selectedDslam.id == -1 || dslamCbo.id == null) {
                        //     return
                        // }
                        this.thamso = selectedDslam.THAMSO
                        this.layDsDslamVDC()
                        let loaitbi_id = 0
                        loaitbi_id = selectedDslam.LOAITBI_ID
                        
                        if (loaitbi_id == 3 || loaitbi_id == 1) {
                            let gpon_id = selectedDslam.DSLAM_ID //selectedDslam.DSLAM_ID
                            let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-dscard-theo-dslam?p_dslam_id=${gpon_id}&p_loaitbi_id=${loaitbi_id}`)
                            if  (rs.error_code === 'BSS-00000000'){
                                console.log(rs)
                                this.arrayDataToCbo.dataCard = rs.data
                                if (rs.data.length > 0) {
                                    this.arrayCBO.cboCard = rs.data[0].CARD_ID    
                                }
                            }
                            else{
                                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
                            }
                        } else {
                            this.arrayDataToCbo.dataCard = []
                        }
                        this.hienthi_ds_port()
                    }
                    
                }
                
            } catch (error) {
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu." +error)
            }
        },
        cboCard_Changed: async function(){
            try
            {
                this.loading(true)
                if (this.arrayCBO.cboCard > 0)
                {
                    this.arrayDataGrids.dsThueBao = []
                    this.hienthi_ds_port()
                }
            }
            catch (ex)
            {
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu: "+ex)
            }
            finally{
                this.loading(false)
            }
        },
        chkCard_Changed: async function(){
            try
            {
                this.loading(true)
                 this.arrayCBO.chkCard = !this.arrayCBO.chkCard
                this.arrayDataGrids.dsThueBao = []
                this.hienthi_ds_port()
            }
            catch (ex)
            {
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu: " +ex)
            }
            finally{
                this.loading(false)
            }
        },
        layDsDslamTinh: async function(){
            let donvi_id = this.arrayCBO.cboTramTB//3
            let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-dslam-tinh?p_donvi_id=${donvi_id}`)
            if  (rs.error_code === 'BSS-00000000'){
                this.arrayDataToCbo.dataDslamTinh = rs.data
                if (rs.data.length > 0) {
                    this.arrayCBO.cboDslamTinh = rs.data[0].DSLAM_ID
                    this.hienthi_ds_port()
                }
            }
            else{
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
            }
        },
        layDsBras: async function(){
            let rs = await this.$root.context.get("/web-ecms/danhmuc/cap-nhat-port/lietke-bras")
            if  (rs.error_code === 'BSS-00000000'){
                this.arrayDataToCbo.dataBras = rs.data
            }
            else{
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu.")
            }
        },
        layDsDslamVDC: async function(){
            if (!this.kt_load) {
                this.HT_DSLAM()
            }
        },
        HT_DSLAM: async function(){
            try {
                let bras_id = this.arrayCBO.cboBras
                let kieu = 2
                console.log('aaaaaaaaaaa');
                let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/lietke-dslam?p_bras_id=${bras_id}&p_kieu=${kieu}&p_thamso=${this.thamso}`)
                if  (rs.error_code === 'BSS-00000000'){
                    this.arrayDataToCbo.dataDslam = rs.data
                    if (rs.data.length > 0) {
                        this.arrayCBO.cboDslam = rs.data[0].DSLAM_ID    
                    }
                }
                else{
                    this.$root.$toast.error("Lỗi: "+rs.message_detail)
                }    
            } catch (error) {
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu: "+error)
            }
        },
        HT_DS_THUEBAO: async function(){
            try {

                if (this.arrayDataGrids.dsPort.length == 0){
                    return
                }
                let dslam_id = this.arrayCBO.cboDslamTinh//40326
                let ds_id = this.ds_id_port//'667134,667147'
                if (ds_id.length > 0) {
                    let rs = await this.$root.context.post(`/web-ecms/danhmuc/cap-nhat-port/lay-ds-thuebao-theo-port?p_dslam_id=${dslam_id}&p_ds_port_id=${ds_id}`)
                    
                    if  (rs.error_code === 'BSS-00000000'){
                        this.arrayDataGrids.dsThueBao = rs.data
                    }
                }
                else {
                    this.arrayDataGrids.dsThueBao = []
                }
            } 
            catch (error) {
                this.$root.$toast.error("Có lỗi: "+error)
            }
            
        },
        hienthi_ds_port: async function(){
            try
            {
                this.arrayDataGrids.dsPort = []
                let card_id = -1;
                if (this.arrayCBO.chkCard && this.arrayCBO.cboCard > 0)
                    card_id = this.arrayCBO.cboCard
                let dslam_id = this.arrayCBO.cboDslamTinh//this.arrayCBO.cboDslamTinh//39325
                let tt_port_id = ''
                let donvi_id = this.arrayCBO.cboTramTB//this.arrayCBO.cboTramTB//482
                let dt_list = await this.$root.context.post(`/web-ecms/danhmuc/cap-nhat-port/lay-ds-port-logic-v3?p_donvi_id=${donvi_id}&p_tt_port_id=${tt_port_id}&p_dslam_id=${dslam_id}&p_card_id=${card_id}`)
                if (dt_list.data.length > 0)
                {
                    let listfilter = dt_list.data
                    this.arrayDataGrids.dsPort = dt_list.data
                    let chuasd = listfilter.filter(function(item) {
                        return item.TT_PORT_ID == 1}).length
                    let dasd = listfilter.filter(function(item) {
                        return item.TT_PORT_ID == 3}).length
                    let duphong = listfilter.filter(function(item) {
                        return item.TT_PORT_ID == 5}).length
                    let hong = listfilter.filter(function(item) {
                        return item.TT_PORT_ID === 4}).length
                    let tamcap = listfilter.filter(function(item) {
                        return item.TT_PORT_ID === 2}).length                    
                    this.lblTongSo = "Tổng số : " + dt_list.data.length + " - Chưa SD : " + chuasd + " - Đã SD : " + dasd + " - Dự phòng : " + duphong + " - Hỏng : " + hong + " - Tạm cấp : " + tamcap;
                }
                else
                {
                    this.arrayDataGrids.dsPort = []
                }
            }
            catch (ex)
            {
                this.$root.$toast.error("Có lỗi xẩy ra trong quá trình lấy dữ liệu. " + ex)
            }
        },
        selectedItemsDsHoSo: async function(data){
            this.ds_id_port = data
            // this.indexGrid = this.$refs['grid'].getCurrentSelectedRow()
            // console.log('index ', this.$refs['grid'].getCurrentSelectedRow())
            this.HT_DS_THUEBAO()
        },
        onClickdsThueBao: async function(data){
            
        },
        capNhat: async function(){
            let gridviewDanhSach = this.arrayDataGrids.dsPort
            let selected_item = this.ds_id_port
            if (gridviewDanhSach.length == 0) return
            if (selected_item <= 0)
            {
                this.$root.$toast.error("Bạn chưa chọn port để cập nhật !")
                return
            }
            
            
            this.$bvModal.msgBoxConfirm("Bạn có chắc chắn thực hiện thay đổi Dslam VDC cho port không ?",
            {
            okTitle: 'Đồng ý',
            cancelTitle: 'Hủy',
            title: "Xác nhận hành động",
            centered: true,
            size: "sm"
            }).then((value) => {
                if (value){
                    this.confirmUpdate(gridviewDanhSach)
                }
                else{
                    return
                }
            })
        },
        confirmUpdate: async function(gridviewDanhSach){
            let vport_id = 0
            let selected_Item =  this.ds_id_port
            let gridviewThueBao = this.arrayDataGrids.dsThueBao
            let dslam_id = this.arrayCBO.cboDslamTinh
            let dslam_vdc_id_moi = this.arrayCBO.cboDslam
            let logObj = {}
            for (let i = 0; i < gridviewDanhSach.length; i++)
            {
                
                if (selected_Item.includes(gridviewDanhSach[i].PORT_ID))
                {   
                    vport_id = gridviewDanhSach[i].PORT_ID

                    for (let j = 0; j < gridviewThueBao.length; j++)
                    {
                        if (gridviewThueBao[j].PORT_ID == vport_id)
                        {
                            if (gridviewThueBao[j].KIEU_MEGA != 0)
                            {
                                let vaccount = gridviewThueBao[j].MA_TB
                                let vport = gridviewDanhSach[i].PORT
                                let vvci = gridviewThueBao[j].VCI
                                let vvpi = gridviewThueBao[j].VPI
                                let vslot = gridviewDanhSach[i].SLOT
                                let vsystemId = gridviewDanhSach[i].SYSTEM
                                let vrackid = gridviewDanhSach[i].RACK
                                let vshelfId = gridviewDanhSach[i].SHELF
                                let vself01 = gridviewDanhSach[i].SELFID01
                                let vself02 = gridviewDanhSach[i].SELFID02
                                let vself03 = gridviewDanhSach[i].SELFID03
                                let vself04 = gridviewDanhSach[i].SELFID04
                                let vloaitb_id = gridviewThueBao[j].LOAITB_ID

                                if (!this.DoiCongAcccountVisa(vaccount, vport, vvci, vvpi, vslot, vsystemId, vrackid, vshelfId, vself01, vself02, vself03, vself04, vloaitb_id))
                                {
                                    this.$root.$toast.error("Có lỗi trong quá trình đồng bộ port cho Account " + vaccount + " trên Visa !")
                                    return
                                }
                                
                                logObj = {
                                    "port_id": vport_id,
                                    "dslam_id": dslam_id,
                                    "dslam_vdc_id_moi": dslam_vdc_id_moi,
                                    "dslam_vdc_id_cu": gridviewThueBao[j].DSLAM_VDC_ID,
                                    "thuebao_id": gridviewThueBao[j].THUEBAO_ID,
                                    "hdtb_id":gridviewThueBao[j].HDTB_ID,
                                    "ma_tb": gridviewThueBao[j].MA_TB
                                }
                                try {
                                    let rs = await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/log-ins',logObj)
                                } catch (error) {
                                    this.$root.$toast.error("Có lỗi: " + error)
                                }
                            }
                        }
                    }
                    logObj = {
                        "port_id": vport_id,
                        "dslam_id": dslam_id,
                        "dslam_vdc_id_moi": dslam_vdc_id_moi,
                        "dslam_vdc_id_cu": gridviewDanhSach[i].DSLAM_VDC_ID,
                        "thuebao_id": 0,
                        "hdtb_id":0,
                        "ma_tb": ""
                    }
                    try {
                        let rs = await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/log-ins',logObj)
                    } catch (error) {
                        this.$root.$toast.error("Có lỗi: " + error)
                    }
                    try {
                        let rs = await this.$root.context.post(`/web-ecms/danhmuc/cap-nhat-port/cap-nhat?p_dslam_vdc_id=${dslam_vdc_id_moi}&p_port_id=${vport_id}`)
                    } catch (error) {
                        this.$root.$toast.error("Có lỗi: " + error)
                        
                    }
                }
            }
            this.$toast.success('Cập nhật thành công.')
            this.hienthi_ds_port()
            // this.$refs.grid.setCurrentSelectedRow(this.indexGrid)
            this.arrayDataGrids.dsPort = []
        },
        DoiCongAcccountVisa: async function(account, port, vci, vpi, slot, systemId, rackid, shelfId, self01, self02, self03, self04, loaitb_id){
            try {
                let brasId = this.arrayCBO.cboBras
                let rs = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/get-bras-infor?bras_id=${brasId}`)
                if (rs.data.length > 0) {
                    brasId = rs.data.BRAS_ID 
                }
                let dslamId = this.arrayCBO.cboDslam
                let dslam = await this.$root.context.get(`/web-ecms/danhmuc/cap-nhat-port/get-dslam-infor?dslam_id=${dslamId}`)
                let dslam_vdc_Id
                let thamso
                if (dslam.data.length > 0) {
                    dslam_vdc_Id = dslam.data.DSLAM_ID
                    thamso = dslam.data.THAMSO
                }
                //Kiem tra xem dang ky 4 tham so hay 7 tham so
                if (thamso == 4)
                {
                    if (!this.DoiCongMegavnn4(account, port, vci, vpi, slot, brasId, dslam_vdc_Id))
                        return false;
                    else
                    {
                        this.$root.$toast.success("Đổi cổng Account " + account + " trên Visa thành công !")
                        return true;
                    }
                }
                else if (thamso == 7)
                {
                    if (!this.DoiCongMegavnn7(account, port, vci, vpi, slot, brasId, dslam_vdc_Id, systemId, rackid, shelfId))
                        return false;
                    else
                    {
                        this.$root.$toast.success("Đổi cổng Account " + account + " trên Visa thành công !")
                        return true;
                    }
                }
                else if (thamso == 9)
                {
                    if (loaitb_id == 11)
                    {
                        if (!this.DoiCongMegavnn9_Mega(account, port, vci, vpi, slot, brasId, dslam_vdc_Id, systemId, self01, self02, self03, self04))
                            return false;
                        else
                        {
                            this.$root.$toast.success("Đổi cổng Account " + account + " trên Visa thành công !")
                            return true;
                        }
                    }
                    else
                    {
                        if (!this.DoiCongMegavnn9_ADSL(account, port, vci, vpi, slot, brasId, dslam_vdc_Id, systemId, self01, self02, self03, self04))
                            return false;
                        else
                        {
                            this.$root.$toast.success("Đổi cổng Account " + account + " trên Visa thành công !")
                            return true;
                        }
                    }

                }
                return true;
            } catch (error) {
                this.$root.$toast.error("Có lỗi xảy ra trong quá trình đổi cổng account trên Visa.\n" + error)
                return false;
            }
        },
        DangNhapVisa: async function(){},
        DoiCongMegavnn4: async function (account, PORT, VCI, VPI, SLOT, BrasId, DslamId){
            try {
                let serviceObj = [
                    {type:"PORT", value:PORT},
                    {type:"VCI", value:VCI},
                    {type:"VPI", value:VPI},
                    {type:"SLOT", value:SLOT},
                    {type:"DSLAM-ID", value:DslamId},
                    {type:"BRAS-ID", value:BrasId},
                    {type:"PARAMETER", value:"VISANEW"},
                ]
               
                let visaLogin = {
                    userId: '111',
                    password: '2222'
                }
                let data = {
                    visaLogin: visaLogin,
                    account: account,
                    serviceObj: serviceObj,
                }
                this.DangNhapVisa()
                await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/change-port-megavnn', data)
            } 
            catch (error) {
                if (error.includes("Không có sự thay đổi") || error.includes("Đối tượng [Dịch vụ khách hàng] không tồn tại")) //Đã tồn tại ngày rồi
                    return true;
                else
                {
                    this.$root.$toast.error("Có lỗi xảy ra: " + error)
                    return false;
                }
            }
            return true
        },
        DoiCongMegavnn7: async function (account, PORT, VCI, VPI, SLOT, BrasId, DslamId, SYSTEMID, RACKID, SHELFID){
            try {
                let serviceObj = [
                    {type:"PORT", value:PORT},
                    {type:"VCI", value:VCI},
                    {type:"VPI", value:VPI},
                    {type:"SLOT", value:SLOT},
                    {type:"DSLAM-ID", value:DslamId},
                    {type:"BRAS-ID", value:BrasId},
                    {type:"RACKID", value:RACKID},
                    {type:"SYSTEMID", value:SYSTEMID},
                    {type:"SELFID", value:SHELFID},
                    {type:"PARAMETER", value:"VISANEW"},
                ]
               
                let visaLogin = {
                    userId: '111',
                    password: '2222'
                }
                let data = {
                    visaLogin: visaLogin,
                    account: account,
                    serviceObj: serviceObj,
                }
                this.DangNhapVisa()
                await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/change-port-megavnn', data)
            } 
            catch (error) {
                if (error.includes("Không có sự thay đổi") || error.includes("Đối tượng [Dịch vụ khách hàng] không tồn tại")) //Đã tồn tại ngày rồi
                    return true;
                else
                {
                    this.$root.$toast.error("Có lỗi xảy ra: " + error)
                    return false;
                }
            }
            return true
        },
        DoiCongMegavnn9_Mega: async function (account, PORT, VCI, VPI, SLOT, BrasId, DslamId, SYSTEMID, SELFID01, SELFID02, SELFID03, SELFID04){
            try {
                let serviceObj = [
                    {type:"PORT", value:PORT},
                    {type:"VCI", value:VCI},
                    {type:"VPI", value:VPI},
                    {type:"SLOT", value:SLOT},
                    {type:"DSLAM-ID", value:DslamId},
                    {type:"BRAS-ID", value:BrasId},
                    {type:"RACKID", value:RACKID},
                    {type:"SYSTEMID", value:SYSTEMID},
                    {type:"SELFID01", value:SELFID01},
                    {type:"SELFID02", value:SELFID02},
                    {type:"SELFID03", value:SELFID03},
                    {type:"SELFID04", value:SELFID04},
                    {type:"PARAMETER", value:"VISANEW"},
                ]
               
                let visaLogin = {
                    userId: '111',
                    password: '2222'
                }
                let data = {
                    visaLogin: visaLogin,
                    account: account,
                    serviceObj: serviceObj,
                }
                this.DangNhapVisa()
                await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/change-port-megavnn', data)
            } 
            catch (error) {
                if (error.includes("Không có sự thay đổi") || error.includes("Đối tượng [Dịch vụ khách hàng] không tồn tại")) //Đã tồn tại ngày rồi
                    return true;
                else
                {
                    this.$root.$toast.error("Có lỗi xảy ra: " + error)
                    return false;
                }
            }
            return true
        },
        DoiCongMegavnn9_ADSL: async function (account, PORT, VCI, VPI, SLOT, BrasId, DslamId, SYSTEMID, SELFID01, SELFID02, SELFID03, SELFID04){
            try {
                let serviceObj = [
                    {type:"PORT", value:PORT},
                    {type:"VCI", value:VCI},
                    {type:"VPI", value:VPI},
                    {type:"SLOT", value:SLOT},
                    {type:"DSLAM-ID", value:DslamId},
                    {type:"BRAS-ID", value:BrasId},
                    {type:"RACKID", value:RACKID},
                    {type:"SYSTEMID", value:SYSTEMID},
                    {type:"SELFID01", value:SELFID01},
                    {type:"SELFID02", value:SELFID02},
                    {type:"SELFID03", value:SELFID03},
                    {type:"SELFID04", value:SELFID04},
                    {type:"PARAMETER", value:"VISANEW"},
                ]
               
                let visaLogin = {
                    userId: '111',
                    password: '2222'
                }
                let data = {
                    visaLogin: visaLogin,
                    account: account,
                    serviceObj: serviceObj,
                }
                this.DangNhapVisa()
                await this.$root.context.post('/web-ecms/danhmuc/cap-nhat-port/change-port-megavnn', data)
            } 
            catch (error) {
                if (error.includes("Không có sự thay đổi") || error.includes("Đối tượng [Dịch vụ khách hàng] không tồn tại")) //Đã tồn tại ngày rồi
                    return true;
                else
                {
                    this.$root.$toast.error("Có lỗi xảy ra: " + error)
                    return false;
                }
            }
            return true
        },
    }
}
</script>
