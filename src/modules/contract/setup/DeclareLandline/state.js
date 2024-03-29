export default {
    target: '.main-wrapper',
    thuebao_id: 0,
    hdtb_id: 0,
    hdkh_id: 0,
    phieu_id: 0,
    loaihd_id: 0,
    loaitb_id: 0,
    kieuld_id: 0,
    dtList: [],
    ds: [],
    dsIn: [],
    ma_gd: "",
    CapVT: [],
    bangts: [],
    tchopdong: [],
    tcchung: [],
    tcdanhba: [],
    giaophieutc: [],
    hoancong: [],
    nhanvien: [],
    hths_dm: [],
    hths_dc: [],
    thamso_md: [],
    tt_nd: [],
    cmUlt: [],
    hths_kptl: [],
    lapHD: [],
    tdan: [],
    // ThanhToanHDFacade thanhtoan : [] ThanhToanHDFacade,
    //Hiếu bổ sung 1 số trường liên quan đến gói tích hợp ngày 28.09.2010
    checkdata: [],
    tb_mytv: "",
    tb_mega: "",
    tb_cd: "",
    daikv_id: 0,
    kt_load: false,
    host_id: 0,
    tramvt_id: 0,
    tramtb_id: 0,
    ne_id: 0,
    ne_id_cu: 0,
    status: "",
    labelFunctionTitle: "",
    dsnhanviengp: [],

    tthd_id: 4,
    dsloaihd_id: "1",
    quytrinh_id: 0,
    huonggiao_id: 0,
    luong_id: 0,
    dsdichvuvt_id: "1",
    lblLienHe: "",

    dtThaoTac: [],
    dtControl: [],
    hdtb_cha_id: 0,
    thuebao_cha_id: 0,
    sochinh: false,
    dsDanhMuc: [],
    //*:::::::::::::::
    //nhapt 10/07/2015
    n_hdkh_id: "",
    n_hdtb_id: "",
    n_phieu_id: "",
    kt_thaydoi: false,
    ds_tramvt: [],
    ds_donvi_timkiem: [],
    hoancong_luon: false,
    khong_hoancong_chua_thanhtoan: 0,
    matinh: "",
    madoicap: 0,
    selectedItem: {},
    //Tham số sử dụng cabman2.0
    _IS_USING_CABMAN_V2: -1,
    old_index: [],
    dataPopupKhuVuc: {
        quan_id: 0,
        phuong_id: 0,
        pho_id: 0,
        ap_id: 0,
        khu_id: 0,
        dacdiem_id: 0,
        khuvuc_id: 0,
        donviql_id: 0,
        hdtb_id: 0
    },
    thongtin: {},
    modelVatTu: {},
    collumnsDVTK: [
        {
            fieldName: "ma_dv",
            headerText: "Mã đơn vị",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ten_dv",
            headerText: "Tên đơn vị",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        }
    ],
    collumnsDVGT: [
        {
            fieldName: "ma_dvgt",
            headerText: "Mã DVGT",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "ten_dvgt",
            headerText: "Tên dịch vụ",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "kieu",
            headerText: "Kiểu yêu cầu",
            width: "100",
            autoFit: "true",
            textAlign: 'left',
        },
        {
            fieldName: "noidung",
            headerText: "Nội dung",
            allowSorting: false,
            autoFit: "true",
            textAlign: 'left',
        },
    ],
    collumnsNV: [
        {
            fieldName: "ten_nv",
            headerText: "Tên nhân viên",
            allowSorting: false,
            width: "100",
            textAlign: 'left',
            autoFit: "true",
        },
        {
            fieldName: "so_dt",
            headerText: "Số điện thoại",
            allowSorting: false,
            width: "100",
            textAlign: 'left',
            autoFit: "true",
        },
        {
            fieldName: "nhiemvu",
            headerText: "Nhiệm vụ",
            allowSorting: false,
            textAlign: 'left',
            width: "100",
            autoFit: "true",
        },
        {
            fieldName: "ghichu",
            headerText: "Ghi chú",
            allowSorting: false,
            textAlign: 'left',
            autoFit: "true",
        },
    ]
}