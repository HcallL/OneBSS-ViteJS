<template>
    <ejs-dialog
    :allowDragging="true"
    :animationSettings="animationSettings"
    :enableResize="false"
    :position="{X:'center', Y:'top'}"
    :visible="false"
    ref="popupThemMoi"
    :showCloseIcon="false"
    width="70%"
    minHeight="200"
    :isModal='true'
    :target="target">
    <div class="modal-content popup-box">
        <div class="popup-header">
            <div class="title">
                <span class="icon one-file-plus"></span> Thêm nhóm mới
            </div>
            <div class="close -ap icon-close" style="cursor: pointer;" @click="hideModal"></div>
        </div>
        <ActionTop :actions="actions" @onActionClick="onActionClick"/>
        <div class="popup-body">
            <div class="row">
                <div class="col-sm-12 col-12">
                    <div class="box-form">
                        <div class="row">
                            <div class="col-sm-12 col-12">
                                <div class="info-row">
                                    <div class="key">{{txtTenNhom.text}}:</div>
                                    <div class="value">
                                        <input class="input-group-name" v-on:keyup.enter="Them" ref="txtTenNhom" type="text" v-model="txtTenNhom.value" placeholder="Nhập tên nhóm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-12">
                                <div class="info-row">
                                    <DataGrid 
                                    v-bind:columns="DsNV.columns" v-bind:dataSource="DsNV.data"
                                    :showColumnCheckbox="true" :enable-paging-server="false" :allowPaging="true" :showFilter="true"
                                    ref="refDSTinh" panelDataHeight="200" :enabledSelectFirstRow="false" @selectedItemsChanged="select_selectedItemsChangedCDsNV"></DataGrid>
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
import api from '../api';
import apiHelper from '../api.helper';
import ActionTop from "@/components/kylq_components/ActionTop.vue";
import { log } from 'pdfmake/build/pdfmake';
export default{
name: "themmoi",
components: {
    ActionTop,
    apiHelper,
    api
},
data(){
    return {
        actions: [
            {
                id: "them",
                name: "Xác nhận",
                active: true,
                icon_class: "one-save"
            }
        ],
        txtTenNhom: {
            text: "Tên nhóm",
            value: ""
        },
        DsNV: {
            columns: [
                    {
                        fieldName: 'nhanvien_id', headerText: "Nhân viên ID",allowFiltering: true, allowSorting: false, width: "120"
                    },
                    {
                        fieldName: 'ma_nv', headerText: "Mã nhân viên",allowFiltering: true, allowSorting: false, width: "130"
                    },
                    {
                        fieldName: 'ten_nv', headerText: "Tên nhân viên",allowFiltering: true, allowSorting: false, width: "140"
                    },
                    {
                        fieldName: 'email', headerText: "Email",allowFiltering: true, allowSorting: false
                    },
                    {
                        fieldName: 'so_dt', headerText: "Số điện thoại",allowFiltering: true, allowSorting: false, width: "140"
                    },
                    {
                        fieldName: 'tentinh', headerText: "Tên tỉnh",allowFiltering: true, allowSorting: false, width: "140"
                    },
                ],
                data: [],
                selectedItems: [],
        }
    }
},
created(){
    this.getDSNV()
},
methods:{
    onActionClick(action){
        switch(action.id){
            case "them":
                this.Them()
                break;
            default:
                break;
        }
    },
    async Them(){
        try{
            if(this.txtTenNhom.value == "" || this.DsNV.selectedItems <= 0){
                if(this.txtTenNhom.value == ""){
                    this.$toast.error("Bạn phải nhập tên nhóm")
                    this.$refs.txtTenNhom.focus()
                }
                else if(this.DsNV.selectedItems <= 0){
                    this.$toast.error("Bạn phải nhập chọn ít nhất 1 nhân viên")
                }
            }
            else{
                var arr=[]
                for(var i=0;i<this.DsNV.selectedItems.length;i++){
                    // console.log(selectedItems[i]["nhanvien_id"]);
                    arr.push(this.DsNV.selectedItems[i]["nhanvien_id"]);
                }
                // console.log(arr);
                const arr2 = arr.map((x) => `{\"NHANVIEN_ID\": ${x}}` )
                // console.log(arr2);
                const stringData =  "["+ arr2.toString() + "]"
                let input = {
                    p_phanvung_id: this.$root.token.getPhanVungID(),
                    p_tennhom: this.txtTenNhom.value,
                    p_data: stringData
                }
                const response = await api.Them_nhom(this.axios,input)
                let result = apiHelper.getDataFromResponseApiReturnArray(response) || []
                if(result == "OK"){
                    this.$toast.success("Thêm mới thành công")
                    this.getDSNV()
                    this.$refs['popupThemMoi'].hide()
                    this.$emit('appect',this.txtTenNhom.value)
                }
                else {
                    this.$toast.info("Thêm mới thất bại")
                }
            }
        }
        catch(e){
            console.log("Error",e);
            this.$toast.info("Lỗi")
            
        }
    },
    async getDSNV(){
        let data = {
            phanvung_id: this.$root.token.getPhanVungID()
        }
        try{
            this.Loading = true
            const response = await api.Lay_ds_nv_chuagan(this.axios,data)
            this.DsNV.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
            this.Loading = false
        }
        catch(e){
            console.log("Error",e);
        }
    },
    select_selectedItemsChangedCDsNV: function(selectedItems) {
        this.DsNV.selectedItems = selectedItems
    },
    showModal(){
        this.$refs['popupThemMoi'].show()
    },
    hideModal(){
        this.$refs['popupThemMoi'].hide()
    }
}
}

</script>