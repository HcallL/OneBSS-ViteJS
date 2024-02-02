<template src="./StaffMapCountry.html"></template>
<style src="./StaffMapCountry.css"></style>
<script>
import breadcrumb from '@/components/breadcrumb'
import ActionTop from "@/components/kylq_components/ActionTop.vue";
import moment from 'moment';
import api from './api'
import apiHelper from "./api.helper"
import themmoi from "./popup/themmoi.vue"
import axios from 'axios';
import { x } from 'caniuse-lite/data/browserVersions';
import { async } from 'pdfmake/build/pdfmake';


export default {
    name: "StaffMapCountry",
    components: {
        api,
        ActionTop,
        apiHelper,
        moment,
        breadcrumb,
        themmoi,
    },
    data(){
        return{
            header: {
                title: 'KHAI BÁO NHÓM NHÂN VIÊN - TỈNH/THÀNH PHỐ',
                list: [
                    { name: 'KHAI BÁO NHÓM NHÂN VIÊN - TỈNH/THÀNH PHỐ', link: { name: 'Ui.cards' } },
                    {
                        name: 'KHAI BÁO NHÓM NHÂN VIÊN - TỈNH/THÀNH PHỐ',
                        link: { name: 'Ui.buttons' }
                    }
                ]
            },
            Loading: false,
            actions: [
                {
                    id: "tracuu",
                    name: "Tra cứu",
                    active: true,
                    icon_class: "one-search"
                },
                {
                    id: "them",
                    name: "Thêm mới",
                    active: true,
                    icon_class: "icon one-file-plus"
                },
                {
                    id: "capnhat",
                    name: "Cập nhật",
                    active: true,
                    icon_class: "one-edit"
                },
                {
                    id: "xoa",
                    name: "Xóa",
                    active: true,
                    icon_class: "one-trash"
                }
            ],
            NhanVienDaGan: {
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
                selectedItems: []
            },
            NhanVienChuaGan: {
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
            },
            ThongTinTraCuu: {
                columns: [
                    {
                        fieldName: 'nhanvien_id', headerText: "ID Nhóm",allowFiltering: true, allowSorting: false, width: 90
                    },
                    {
                        fieldName: 'ten_nhom', headerText: "Tên nhóm",allowFiltering: true, allowSorting: false, width: 90
                    },
                    {
                        fieldName: 'nguoi_cn', headerText: "Người cập nhật",allowFiltering: true, allowSorting: false, width: 90
                    },
                    {
                        fieldName: 'may_cn', headerText: "Máy cập nhật",allowFiltering: true, allowSorting: false, width: 90
                    },
                    {
                        fieldName: 'ngay_cn', headerText: "Ngày cập nhật",allowFiltering: true, allowSorting: false, width: 90
                    },
                    {
                        fieldName: 'ip_cn', headerText: "IP cập nhật",allowFiltering: true, allowSorting: false, width: 90
                    },
                ],
                data: [],
                value :""
            },
            cboThongTinTraCuu:{
                value :"",
                list: []
            },
            txtDuLieuTraCuu: {
                text: "",
                value: ""
            },
            txtTenNhom: {
                value: "",
                text: "Tên nhóm"
            },
            ID_nhom: "",
        }
    },
    watch: {
        Loading: function(val) {
            this.$root.showLoading(val)
        }
            
    },
    created(){
        // this.getDsNhanVien()
        this.getLoaiTraCuu()
    },
    methods: {
        onActionClick(action){
            switch(action.id){
                case "tracuu":
                    this.TraCuu()
                    break;
                case "capnhat":
                    this.CapNhat()
                    break;
                case "them":
                    this.Them()
                break;
                case "xoa":
                    this.Xoa()
                break;
                case "default":
                    break;
            }
        },
        async getLoaiTraCuu(){
            this.Loading = true
            try{
                const response = await api.Ds_tt_tracuu(this.axios)
                this.cboThongTinTraCuu.list = apiHelper.getDataFromResponseApiReturnArray(response) || []
            }
            catch(e){}
            finally{
                this.Loading = false
            }
        },
        async getDsNhanVien(){
            let data = {
                phanvung_id: this.$root.token.getPhanVungID()
            }
            try{
                this.Loading = true
                const response = await api.Lay_ds_nv_chuagan(this.axios,data)
                this.NhanVienChuaGan.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                this.Loading = false
            }
            catch(e){
                console.log("Error",e);
            }
        },
        select_selectedItemsChangedDagan: function(selectedItems) {
            this.NhanVienDaGan.selectedItems = selectedItems
        },
        select_selectedItemsChangedChuagan: function(selectedItems) {
            this.NhanVienChuaGan.selectedItems = selectedItems
        },
        async RightOne(){
            try{
                if (this.NhanVienDaGan.data.length > 0) {
                    var self = this
                    let selectedItems = this.NhanVienDaGan.selectedItems
                    if (selectedItems.length === 0) {
                        self.ShowError("Chưa chọn nhân viên")
                        
                    }
                    else{
                        var arr=[]
                        for(var i=0;i<selectedItems.length;i++){
                            // console.log(selectedItems[i]["nhanvien_id"]);
                            arr.push(selectedItems[i]["nhanvien_id"]);
                        }
                        // console.log(arr);
                        const arr2 = arr.map((x) => `{\"NHANVIEN_ID\": ${x}}` )
                        // console.log(arr2);
                        const stringData =  "["+ arr2.toString() + "]"
                        // console.log(stringData);
                        let input = {
                            nhanvien_id: this.ThongTinTraCuu.data[0].nhanvien_id,
                            p_data: stringData
                        }
                        let res = []
                        const response = await api.Xoa_nhanvien(this.axios,input)
                        res = apiHelper.getDataFromResponseApiReturnArray(response) || []
                        if(res == "OK"){
                            this.$toast.success("Thành công")
                            this.NhanVienDaGan.data.checked = []
                            selectedItems.forEach(function(item) {
                                if(self.NhanVienChuaGan.data.filter((x) => x.nhanvien_id === item.nhanvien_id).length===0){
                                    // self.NhanVienChuaGan.data.push(item);
                                    item.ischecked = false;
                                    self.NhanVienChuaGan.data.unshift(item);
                                }
                            })
                        }
                        else{
                            this.$toast.info("Thất bại")
                        }
                        
                    }
                    self.NhanVienDaGan.data = self.NhanVienDaGan.data.filter((y) => selectedItems.filter((x) => x.nhanvien_id === y.nhanvien_id).length === 0)
                    let a = this.NhanVienDaGan.data.slice(0)
                    this.NhanVienDaGan.data = a.slice(0)
                    return 
                }
                else{
                    this.ShowError("Không có dữ liệu");
                    this.NhanVienChuaGan.data = []
                }
            }
            catch(e){
                console.log("Error",e);
                this.$toast.info("Lỗi")
                this.Loading = false;
            }
            
        },
        
        LeftOne: async function(){
            try{

                var self = this;
                if(this.NhanVienChuaGan.data.length > 0){
                    let selectedItems = this.NhanVienChuaGan.selectedItems;
                    if (selectedItems.length === 0) {
                        self.ShowError("Chưa chọn nhân viên")
                    }
                    else{
                        var arr=[]
                        for(var i=0;i<selectedItems.length;i++){
                            // console.log(selectedItems[i]["nhanvien_id"]);
                            arr.push(selectedItems[i]["nhanvien_id"]);
                        }
                        // console.log(arr);
                        const arr2 = arr.map((x) => `{\"NHANVIEN_ID\": ${x}}` )
                        // console.log(arr2);
                        const stringData =  "["+ arr2.toString() + "]"
                        // console.log(stringData);
                        let input = {
                            p_phanvung_id: this.$root.token.getPhanVungID(),
                            p_tennhom: this.ThongTinTraCuu.data[0].ten_nhom,
                            p_data: stringData,
                            p_nhanvien_id: this.ThongTinTraCuu.data[0].nhanvien_id,
                            p_ngay_cn: this.ThongTinTraCuu.data[0].ngay_cn,
                            nguoi_cn: this.ThongTinTraCuu.data[0].nguoi_cn,
                            ip_cn: this.ThongTinTraCuu.data[0].ip_cn,
                            may_cn: this.ThongTinTraCuu.data[0].may_cn,
                        }
                        
                        let res = []
                        const response = await api.Chuyen_doi(this.axios,input)
                        res = apiHelper.getDataFromResponseApiReturnArray(response) || []
                        if(res == "OK"){
                            this.$toast.success("Thành công")
                            this.NhanVienChuaGan.data.checked = []
                            selectedItems.forEach(function(item) {
                                if(self.NhanVienDaGan.data.filter((x) => x.nhanvien_id === item.nhanvien_id).length === 0){
                                    item.ischecked = false
                                    self.NhanVienDaGan.data.unshift(item);
                                }
                            });
                        }
                        else{
                            this.$toast.info("Thất bại")
    
                        }
                    }
                    self.NhanVienChuaGan.data = self.NhanVienChuaGan.data.filter((y) => selectedItems.filter((x) => x.nhanvien_id === y.nhanvien_id).length === 0)
                    let a = this.NhanVienChuaGan.data.slice(0);
                    this.NhanVienChuaGan.data = a.slice(0);
                    return
                }
                else{
                    this.ShowError("Không có dữ liệu");
                    this.NhanVienChuaGan.data = []
                }
            }
            catch(e){
                console.log("Error",e);
                this.$toast.info("Lỗi")
                this.Loading = false;
            }
        },
        RightAll: async function(){
            try{

                var self = this
                
                if(this.NhanVienDaGan.data.length > 0){
                    this.Loading = true;
                    var arr=[]
                    for(var i=0;i<this.NhanVienDaGan.data.length;i++){
                        // console.log(this.NhanVienDaGan.data[i]["nhanvien_id"]);
                        arr.push(this.NhanVienDaGan.data[i]["nhanvien_id"]);
                    }
                    // console.log(arr);
                    const arr2 = arr.map((x) => `{\"NHANVIEN_ID\": ${x}}` )
                    // console.log(arr2);
                    const stringData =  "["+ arr2.toString() + "]"
                    // console.log(stringData);
                    let input = {
                        nhanvien_id: this.ThongTinTraCuu.data[0].nhanvien_id,
                        p_data: stringData
                    }
                    let res = []
                    const response = await api.Xoa_nhanvien(this.axios,input)
                    res = apiHelper.getDataFromResponseApiReturnArray(response) || []
                    // console.log(res);
                    if(res == "OK"){
                        this.$toast.success("Thành công")
                        let listItems = this.NhanVienDaGan.data
                        for(const item of listItems){
                            self.NhanVienChuaGan.data.unshift(item)
                        }
                        this.NhanVienDaGan.data = []
                        this.Loading = false;
                    }
                    else{
                        this.$toast.error("Error")
                        this.Loading = false;
                    }
                }
                else{
                    this.ShowError("Không có dữ liệu");
                    this.NhanVienChuaGan.data = []
                    this.Loading = false;
                }
            }
            catch(e){
                console.log("Error",e);
                this.$toast.info("Lỗi")
                this.Loading = false;
            }
            
        },
        LeftAll: async function(){
            try{

                var self = this
                if(this.NhanVienChuaGan.data.length > 0){
                    this.Loading = true;
                    var arr=[]
                    for(var i=0;i<this.NhanVienChuaGan.data.length;i++){
                        // console.log(this.NhanVienDaGan.data[i]["nhanvien_id"]);
                        arr.push(this.NhanVienChuaGan.data[i]["nhanvien_id"]);
                    }
                    const arr2 = arr.map((x) => `{\"NHANVIEN_ID\": ${x}}` )
                    const stringData =  "["+ arr2.toString() + "]"
                    let input = {
                        p_phanvung_id: this.$root.token.getPhanVungID(),
                        p_tennhom: this.ThongTinTraCuu.data[0].ten_nhom,
                        p_data: stringData,
                        p_nhanvien_id: this.ThongTinTraCuu.data[0].nhanvien_id,
                        p_ngay_cn: this.ThongTinTraCuu.data[0].ngay_cn,
                        nguoi_cn: this.ThongTinTraCuu.data[0].nguoi_cn,
                        ip_cn: this.ThongTinTraCuu.data[0].ip_cn,
                        may_cn: this.ThongTinTraCuu.data[0].may_cn,
                        
    
                    }
                    let res = []
                    const response = await api.Chuyen_doi(this.axios,input)
                    res = apiHelper.getDataFromResponseApiReturnArray(response) || []
                    // console.log(res);
                    if(res == "OK"){
                        this.$toast.success("Thành công")
                        let listItems = this.NhanVienDaGan.data
                        for(const item of listItems){
                            self.NhanVienDaGan.data.unshift(item)
                        }
                        this.NhanVienDaGan.data = []
                        this.Loading = false;
                    }
                    else{
                        this.$toast.error("Error")
                        this.Loading = false;
                    }
    
                    
                }
                else{
                    this.ShowError("Không có dữ liệu");
                    this.NhanVienChuaGan.data = []
                    this.Loading = false;
                }
            }
            catch(e){
                console.log("Error",e);
                this.$toast.info("Lỗi")
            }
        },
        async TraCuu(){
            this.Loading = true;
            try{
                if(this.cboThongTinTraCuu.value == "" || this.txtDuLieuTraCuu.value == ""){
                    if(this.cboThongTinTraCuu.value == ""){
                        this.$toast.error("Bạn phải chọn loại tra cứu")
                    }
                    else{
                        this.$toast.error("Bạn phải nhập dữ liệu cần tra cứu")
                        this.$refs.txtDuLieuTraCuu.focus()
                    }
                }
                else{ 
                    let input = {
                         p_nhom_id: this.cboThongTinTraCuu.value,
                         p_noidung: this.txtDuLieuTraCuu.value
                    }
                    const response = await api.Tracuu_cbo(this.axios,input)
                    this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                    if(this.ThongTinTraCuu.data.length > 0){
                        this.$toast.success("Tra cứu thành công")
                    }
                    else{
                            this.$toast.info("Không có dữ liệu")
                            this.ThongTinTraCuu.data = []
                            this.NhanVienDaGan.data = []
                            this.NhanVienChuaGan.data = []
                    }
                }
            }
            catch(e){}
            finally{
                this.Loading = false
            }
        },
        // async TraCuu(){
        //     if(this.cboThongTinTraCuu.value == "" || this.txtDuLieuTraCuu.value == ""){
        //         if(this.cboThongTinTraCuu.value == ""){
        //         this.$toast.error("Bạn phải chọn loại tra cứu")
        //         }
        //         else if(this.txtDuLieuTraCuu.value == "" ){
        //             this.$toast.error("Bạn phải nhập dữ liệu cần tra cứu")
        //         }
        //     }
        //     else{
        //         this.Loading = true;
        //         if(this.cboThongTinTraCuu.value == "1"){
        //             let input = {
        //                 p_nhanvien_id: this.txtDuLieuTraCuu.value,  
        //                 p_tennhom: ""
        //             }
        //             try{
        //                 const response = await api.Tracuu(this.axios,input)
        //                 this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                        
        //                 if(this.ThongTinTraCuu.data.length > 0){
        //                     // this.getDsNhanVien()
        //                     this.$toast.success("Tra cứu thành công")
        //                     // let nhanvien_id = {
        //                     //     nhom_id: this.ThongTinTraCuu.data[0].nhanvien_id
        //                     // }
        //                     // const response = await api.Lay_ds_nv_dagan(this.axios,nhanvien_id)
        //                     // this.NhanVienDaGan.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
        //                     // this.txtTenNhom.value = this.NhanVienDaGan.data[0].ten_nhom
        //                 }else{
        //                     this.$toast.error("Không có dữ liệu")
        //                     this.ThongTinTraCuu.data = []
        //                     this.NhanVienDaGan.data = []
        //                     this.NhanVienChuaGan.data = []
        //                 }
        //                 this.Loading = false;
        //             }
        //             catch(e){
        //                 this.NhanVienDaGan.data = []
        //                 this.ThongTinTraCuu.data = []
        //                 this.NhanVienChuaGan.data = []
        //                 this.$toast.error("Không có dữ liệu")
        //                 this.Loading = false;
        //             }
                    
        //         }
        //         else if(this.cboThongTinTraCuu.value == "2"){
        //             let input = {
        //                 p_nhanvien_id: "",  
        //                 p_tennhom: this.txtDuLieuTraCuu.value
        //             }
        //             try{
        //                 const response = await api.Tracuu(this.axios,input)
        //                 this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
        //                 if(this.ThongTinTraCuu.data.length > 0){
        //                     this.$toast.success("Tra cứu thành công")
        //                     // let nhanvien_id = {
        //                     //     nhom_id: this.ThongTinTraCuu.data[0].nhanvien_id
        //                     // }
        //                     // const response = await api.Lay_ds_nv_dagan(this.axios,nhanvien_id)
        //                     // this.NhanVienDaGan.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
        //                     // this.txtTenNhom.value = this.NhanVienDaGan.data[0].ten_nhom
        //                 }
        //                 else{
        //                     this.$toast.error("Không có dữ liệu")
        //                     this.NhanVienDaGan.data = []
        //                     this.ThongTinTraCuu.data = []
        //                     this.NhanVienChuaGan.data = []
        //                 }
        //                 this.Loading = false;
        //             }
        //             catch(e){
        //                 this.NhanVienDaGan.data = []
        //                 this.NhanVienChuaGan.data = []
        //                 this.ThongTinTraCuu.data = []
        //                 // console.log("Error",e);
        //                 this.$toast.error("Không có dữ liệu")
        //                 this.Loading = false;
        //             }
        //         }
        //         else if(this.cboThongTinTraCuu.value == "3"){
        //             let input = {
        //                 p_phanvung_id: this.$root.token.getPhanVungID(),  
        //                 ma_nv: this.txtDuLieuTraCuu.value
        //             }
        //             try{
        //                 const response = await api.Tracuu_ma_nv(this.axios,input)
        //                 this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
        //                 if(this.ThongTinTraCuu.data.length > 0){
        //                     this.$toast.success("Tra cứu thành công")
                            
        //                 }
        //                 else{
        //                     this.$toast.error("Không có dữ liệu")
        //                     this.NhanVienDaGan.data = []
        //                     this.NhanVienChuaGan.data = []
        //                     this.ThongTinTraCuu.data = []
        //                 }
        //                 this.Loading = false;
        //             }
        //             catch(e){
        //                 this.NhanVienDaGan.data = []
        //                 this.ThongTinTraCuu.data = []
        //                 this.NhanVienChuaGan.data = []
        //                 // console.log("Error",e);
        //                 this.$toast.error("Không có dữ liệu")
        //                 this.Loading = false;
        //             }
        //         }
        //         else if(this.cboThongTinTraCuu.value == "4"){
        //             let input = {
        //                 p_phanvung_id: this.$root.token.getPhanVungID(),  
        //                 ma_nd: this.txtDuLieuTraCuu.value
        //             }
        //             try{
        //                 const response = await api.Tracuu_ma_user(this.axios,input)
        //                 this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
        //                 if(this.ThongTinTraCuu.data.length > 0){
        //                     this.$toast.success("Tra cứu thành công")
                            
        //                 }
        //                 else{
        //                     this.$toast.error("Không có dữ liệu")
        //                     this.NhanVienDaGan.data = []
        //                     this.NhanVienChuaGan.data = []
        //                     this.ThongTinTraCuu.data = []
        //                 }
        //                 this.Loading = false;
        //             }
        //             catch(e){
        //                 this.NhanVienDaGan.data = []
        //                 this.ThongTinTraCuu.data = []
        //                 this.NhanVienChuaGan.data = []
        //                 // console.log("Error",e);
        //                 this.$toast.error("Không có dữ liệu")
        //                 this.Loading = false;
        //             }
        //         }
        //     }
        // },
        async Them(){
            this.$refs['refThemMoi'].showModal()
        },
        async loadThemMoi(value){
            let input = {
                p_nhom_id: 2,  
                p_noidung: value
            }
            try{
                const response = await api.Tracuu_cbo(this.axios,input)
                this.ThongTinTraCuu.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                if(this.ThongTinTraCuu.data.length > 0){
                    this.getDsNhanVien()
                    this.$toast.success("Tra cứu thành công")
                    let nhanvien_id = {
                        nhom_id: this.ThongTinTraCuu.data[0].nhanvien_id
                    }
                    const response = await api.Lay_ds_nv_dagan(this.axios,nhanvien_id)
                    this.NhanVienDaGan.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                    this.txtTenNhom.value = this.NhanVienDaGan.data[0].ten_nhom
                    this.Loading = false;
                }
                else{
                    this.$toast.error("Không có dữ liệu")
                    this.NhanVienDaGan.data = []
                    this.ThongTinTraCuu.data = []
                    this.Loading = false;
                }
            }
            catch(e){
                this.NhanVienDaGan.data = []
                this.ThongTinTraCuu.data = []
                // console.log("Error",e);
                this.$toast.error("Không có dữ liệu")
                this.Loading = false;
            }
        },
        async Xoa(){
            try{
                if(this.ThongTinTraCuu.data <= 0){
                    this.$toast.info("Không có thông tin nhóm để xóa")
                }
                else{
                    if(this.ID_nhom != ""){
                        const confirm = await this.$confirm(
                        `Bạn có chắc chắn muốn xóa nhóm`,
                        'Xóa nhóm',
                            {
                                confirmButtonText: 'Đồng ý',
                                cancelButtonText: 'Hủy',
                                type: 'warning',
                            },
                        );
                        if(confirm){
                            let input = {
                                nhom_id: this.ID_nhom
                            }
                            const response = await api.Xoa_nhom(this.axios,input)
                            let result = apiHelper.getDataFromResponseApiReturnArray(response) || []
                            if(result == "OK"){
                                this.$toast.success("Xóa thành công")
                                this.NhanVienChuaGan.data = []
                                this.NhanVienDaGan.data = []
                                this.ThongTinTraCuu.data = []
                                this.txtDuLieuTraCuu.value = ""
                            }
                            else{
                                this.$toast.info("Xóa thất bại")
                            }   
                        }
                    }
                    else{
                        this.$toast.error("Bạn hãy chọn 1 nhóm muốn xóa")
                    }
                }
            }
            catch(e){
                console.log("Error");
                
            }
            
        },
        async select_selectedItemsChangedThongTinTraCuu(selectedItem){
            this.Loading = true;
            this.ID_nhom = selectedItem[0].nhanvien_id
            try{
                this.getDsNhanVien()
                let nhanvien_id = {
                    nhom_id: this.ID_nhom
                }
                const response = await api.Lay_ds_nv_dagan(this.axios,nhanvien_id)
                this.NhanVienDaGan.data = apiHelper.getDataFromResponseApiReturnArray(response) || []
                this.txtTenNhom.value = selectedItem[0].ten_nhom
                this.Loading = false;
            }
            catch(e){
                console.log("Error",e);
                this.Loading = false;
            }
        },
        async CapNhat(){
            try{
                this.Loading = true;
                if(this.NhanVienDaGan.data.length > 0){
                    if( this.ID_nhom != ""){

                        if(this.txtTenNhom.value != "" && this.txtTenNhom.value != null){

                            const confirm = await this.$confirm(
                            `Bạn có chắc chắn muốn đổi tên nhóm thành: ${this.txtTenNhom.value}`,
                            'Cập nhật tên nhóm',
                                {
                                    confirmButtonText: 'Đồng ý',
                                    cancelButtonText: 'Hủy',
                                    type: 'warning',
                                },
                            );
                            if(confirm){
                                let input = {
                                    p_nhanvien_id:  this.ID_nhom, 
                                    p_tennhom: this.txtTenNhom.value
                                }
                                const response = await api.Capnhat(this.axios,input)
                                let result = apiHelper.getDataFromResponseApiReturnArray(response) || []
                                if(result == "OK"){
                                    this.txtDuLieuTraCuu.value = this.txtTenNhom.value
                                    this.cboThongTinTraCuu.value = "2"
                                    this.$toast.success(`Cập nhật thành công`)
                                    this.Loading = false;
                                    this.TraCuu()
                                }
                                else{
                                    this.$toast.info(`Cập nhật thất bại`)
                                    this.Loading = false;
                                }
                            }
                            this.Loading = false;
                        }
                        else{
                            this.$toast.error("Bạn phải nhập tên nhóm muốn cập nhật")
                            this.Loading = false;
                            this.$refs.txtTenNhom.focus()
                        }
                    }
                    else{
                        this.$toast.error("Chọn nhóm muốn cập nhật")
                    }
                }
                else{
                    this.$toast.error("Bạn hãy tra cứu trước")
                    this.Loading = false;
                }
                
            }
            catch(e){
                console.log("Error",e);
                this.Loading = false;
            }
        },
        ShowSuccess(message){
            this.$toast.success(message);
        },
        ShowError(message){
            this.$toast.error(message)
        }


    }
}

</script>

