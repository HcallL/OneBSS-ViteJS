import { BIconTextCenter } from "bootstrap-vue"
import moment from "moment"
export default {
    actions: [
        {
          id: 'tracuu',
          name: 'Tra cứu',
          active: true,
          icon_class: 'one-search',
          visible: true
        },
        {
          id: 'dongbo',
          name: 'Đồng bộ TT',
          active: true,
          icon_class: 'one-sync1',
          visible: true
        }
    ],    
    Tag:"", 
    enableTTDongBo:false,
    userNeo:"",
    thuebao_id:0,
    isShowDCLD:false,
    isShowLSTB:false,
    dtLichSuTb:null,
    isDongbo:false,
    dsLS:[],
    options:{
        cbxThang: [],
        cbxNam: [],        
    },    
    formTT: {
        ma_tb:'',
        loai_tb:'',
        ma_tinh:'',
        pin:'',
        puk:'',
        ngay_sinh:'',
        phai:'',
        doituong:'',
        so_msin:'',
        goi_di:false,
        goi_den:false,
        ngay_kh:'',
        pin2:'',
        puk2:'',
        so_gt:'',
        ngaycap_gt:'',
        ten_tb:'',
        diachi_chungtu:'',
        diachi:'',
        diachi_thuongtru:'',
        tk_chinh:'',
        tk_km:'',
        tk_km1:'',
        tk_km2:'',
    },
    diachi_ld:{
        diachi:"",
        diachitb_id:0,
        diachild_id:0,
        diachi_id:0,        
        tinh_id : 0,
        quan_id : 0,
        phuong_id : 0,
        pho_id : 0,
        ap_id : 0,
        khu_id : 0,
        dacdiem_id : 0,
        so_nha : null,        
        kinhdo:null,
        vido:null,
        lng:null,
        lat:null,
        block:null,
        tang:null,
        phong:null,
        mota:null,
    },
    formCuocNong:{
        thang:'',
        nam:'',
    },
    gvLichSuTB: {
        tableCollumns: [
            {
                fieldName: "NGAY_THANG",
                headerText: "Ngày thực hiện",
                allowSorting: false,
                allowFiltering: true,
                width: "100",
                textAlign:'Right',
                autoFit: "true",
            },
            {
                fieldName: "MA_DV",
                headerText: "Mã dịch vụ",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "THAO_TAC",
                headerText: "Thao tác",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "GHI_CHU",
                headerText: "Ghi chú",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "NGUOI_DUNG",
                headerText: "Người dùng",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "SO_MSIN_CU",
                headerText: "MSIN cũ",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "SO_MSIN_MOI",
                headerText: "MSIN mới",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "MA_TINH_CU",
                headerText: "Tỉnh cũ",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
            {
                fieldName: "MA_TINH_MOI",
                headerText: "Tỉnh mới",
                allowFiltering: true,
                width: "100",
                autoFit: "true",
                textAlign: 'left',
            },
        ],
        tableData:[],
    },
    gvBienDongKH: {
        tableCollumns: [
            {
                fieldName: "STT",
                headerText: "STT",
                allowFiltering: true,
                allowSorting: false, 
                textAlign: "Center",               
            },
            {
                fieldName: "LOAI",
                headerText: "Loại biến động",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "NGUOI_TH",
                headerText: "Người thực hiện",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "NGAY_TH",
                headerText: "Ngày thực hiện",
                allowFiltering: true,
                allowSorting: false,
                textAlign:'Right'
            }
        ],
        tableData: []
    },
    gvLichSu3G: {
        tableCollumns: [
            {
                fieldName: "STT",
                headerText: "STT",
                allowFiltering: true,
                allowSorting: false,
                textAlign: "Center",
            },
            {
                fieldName: "SERVICE_CODE",
                headerText: "Mã Dv",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "DICHVU",
                headerText: "Dịch vụ",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "GOI",
                headerText: "Gói",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "THAO_TAC",
                headerText: "Thao tác",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "BATDAU",
                headerText: "Ngày bắt đầu",
                allowFiltering: true,
                allowSorting: false,
                textAlign:'Right'
            },
            {
                fieldName: "KETTHUC",
                headerText: "Ngày kết thúc",
                allowFiltering: true,
                allowSorting: false,
                textAlign:'Right'
            },
            {
                fieldName: "NGUOITH",
                headerText: "Người cập nhật",
                allowFiltering: true,
                allowSorting: false,
            },
        ],
        tableData: []
    },
    gv3GTuongLai: {
        tableCollumns: [
            {
                fieldName: "thaotac",
                headerText: "Thao tác",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "batdau",
                headerText: "Ngày bắt đầu",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "ketthuc",
                headerText: "Ngày kết thúc",
                allowFiltering: true,
                allowSorting: false,
            },
            {
                fieldName: "nguoith",
                headerText: "Người cập nhật",
                allowFiltering: true,
                allowSorting: false,
            },
        ],
        tableData: []
    },
    lvCuocNong: {},
    lvDichvu: [],
}