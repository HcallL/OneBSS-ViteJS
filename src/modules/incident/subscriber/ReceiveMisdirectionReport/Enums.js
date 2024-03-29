export const DichVuVienThong = {
    CO_DINH:1,
    DI_DONG:2,
    ADSL:4,
    DD_TRATRUOC:5,
    EMAIL:6,
    METRONET:7,
    MEGAWAN:8,
    TSL:9,
    GPHONE:10,
    IMS:11,
    MEGA_EYES:12,
    HOINGHI_TRUYENHINH:13,
    ANTOAN_BAOMAT_TT:14,
    DICHVU_CNTT:15,
    TRUNGTAM_DULIEU:16,
    HATANG_VIENTHONG:19,
    IMS_DOITAC:21,
    BRCD_DOITAC:22,
    MGW_DOITAC:23,
    TSL_DOITAC:24,
    listDichVuCoCap: function() { return [CO_DINH,ADSL,MEGAWAN,TSL,IMS] },
    listDichVuCNTT: function() { return [DICHVU_CNTT,TRUNGTAM_DULIEU,ANTOAN_BAOMAT_TT,HOINGHI_TRUYENHINH] },
}
export const TRANGBI = {
    MUA_THIETBI:1,
    THUE_THIETBI:2,
    KHACHHANG_TU_TRANGBI:3,
    VIENTHONG_TRANGBI:4,
    TTKD_TRANGBI:5,
    KHONG_SUDUNG_STB:7,
    VIENTHONG_TRANGBI_TSD_VT:9,
}
export const DUNG_THU = {
    DOITUONG_TB:190,
    THIETBI_DC_ID:145,
    KHUYENMAI_ID:2999,
    CHITIETKM_ID:12999,
    LOAI_TBI_MYTV:5800,
    KHUYENMAI_DN_ID:2998,
    CHITIETKM_DN_ID:12998,
}

export const LoaiHopDong = {
    KHONG_DUNG:0,
    DAT_MOI:1,
    CHUYEN_QUYEN:2,
    DI_CHUYEN:3,
    CHAMDUT_SD:4,
    THAYDOI_THONGSO_MEGAWAN:5,
    CHUYENDOI_LH:6,
    THAY_DOI_DV:7,
    THAY_DOI_TOCDO_ADSL:8,
    THAY_DOI_SOMAY_TN:9,
    TACHNHAP_TB:10,
    THAY_TT_KHAC:11,
    THAY_DOI_SO_SIM:12,
    THUEBAO_TRATRUOC:13,
    THAY_DAY_MAY:13,
    VATTU_THUEBAO:13,
    DOISO_TB:14,
    BAN_THIETBI:15,
    THAY_DOI_TOCDO_TSL:16,
    THU_KHAC:17,
    KHAO_SAT:18,
    TDTT_DV_CNTT:19,
    GHEP_MA_KHACHHANG:20,
    KY_LAI_HD_GOC:24,
    TAMDUNG_SD:25,
    THAYDOI_THONGSO_MYTV:25,
    TIEPNHAN_DATMOI:26,
    DOIGOICUOC_DD:27,
    TIEPNHAN_CDLH:28,
    TIEPNHAN_DC:29,
    KHOIPHUC_SD:30,
    DANGKY_GOI_DADV:27,
    THAYDOI_GOI_DADV:28,
    DATCOC_MOI:31,
    THAYDOI_DATCOC:32,
    KHAOSATDATMOI:33,
    KHAOSATCDLH:34,
    KHAOSATDC:35,
    TIEPNHANHD:36,
    THUCUOC_THUHOIVT:37,
    TUVAN_DV:38,
    THAYDOI_TT_DD:100,
    DD_SIPTRUNKING:40,
    DD_HUYSTKING:42,
    DD_DKVCC:43,
    DD_HUYVCC:44,
    DD_TAMDUNGVCC:45,
    DD_KICHVCC:46,
    DD_CAPNHATGOI:47,
    DD_XOAGOI:48,
    DD_CAPNHATDATA:49,
    DD_XOADATA:50,
    DD_HSSV:101,
    DD_DOANVIEN:102,
    DK_MULTISIM:39,
    GIAHAN:41,
}
export const TRANGTHAI_PORT =
    {
         CHUA_SD : 1,
         TAM_CAP : 2,
         DA_SD : 3,
         HONG : 4,
         DU_PHONG : 5,
         UPLINK : 7,
}
export const TrangThaiHD = {
    MOI:1, 
    THANH_TOAN:2, 
    DIEUHANH_THI_CONG:3, 
    DANG_THI_CONG:4, 
    DA_THI_CONG_XONG:5, 
    HOAN_THANH:6, 
    THOAITRA:7, 
    DA_LAY_DU_LIEU:8, 
    KHAIBAO_TONGDAI:9, 
    DANGCHO_HOANCONG:10, 
    DOISOAT_HOSO:11, 
    TTVT_XACMINH_NO:14, 
    THOAITRA_TMP:17, 
    TTVT_HOANCONG_DICHVU:23, 
    HTHS_BANCHEO:26, 
    NVKD_XACMINH:27,
}

export const LoaiHinhTB = {
    DIENTHOAI_CD:1,
    TRUNGKE_THUONG:3,
    TRUNGKE_TUONGTU:4,
    TRUNGKE_2M:5,
    PABX:8,
    MAIL_SMD:9,
    INTERNET:10,
    INTERNET_1260:10,
    MEGA:11,
    INTERNET_ADSL:11,
    Web_Hosting:12,
    EMAIL:13,
    ISDN2B_CD:14,
    ISDN30B_CD:15,
    ISDN2B_CQ:16,
    ISDN30B_CQ:17,
    HTVC_FIBERVNN_ANALOG:18,
    HTVC_FIBERVNN_DIGITAL:19,
    DIDONGTRASAU:20,
    DIDONGTRATRUOC:21,
    LEASEDLINE:22,
    MEGAWAN_ADSL:23,
    FSECURE:24,
    MEGAWAN_SHDSL:25,
    MEGAWAN_QUANG_FE:26,
    METRONET_FE:27,
    METRONET_GE:28,
    MEGAWAN_QUANG_GE:30,
    MEGACAMERA:31,
    GPHONE:32,
    GPHONE_TRATRUOC:34,
    IOFFICE:35,
    TD_1800:38,
    VNPT_COLOCATION:39,
    INTERNET_ADSL_TINH_KHAC:57,
    INTERNET_FTTH:58,
    INTERNET_FIBER_TINH_KHAC:59,
    INTERNET_MYTV:61,
    INTERNET_MYTV_B2B:171,
    IMS_POTS:62,
    IMS_SIP:63,
    IMS_RGW:64,
    INTERNET_SGTV:65,
    CAMERA_HOCDUONG:70,
    MEGAWAN_ADSL_2M:74,
    METRONET_2FE:75,
    MEGA_CONFERENCE:76,
    IMS_SIPTRUNKING:77,
    SSL:78,
    WIFI_FIBER:79,
    VNPT_MEETING:89,
    HNTH_NGN:90,
    KTR_Leasedline_GE:96,
    KTR_Leasedline_E1:97,
    KTR_Leasedline_STM1:98,
    KTR_Leasedline_nx64k:99,
    KTR_TRUCTHONG_DONG:100,
    KTR_TRUCTHONG_QUANG:101,
    KTR_DOICAP_QUANG:102,
    KTR_DOICAP_DONG:103,
    KTR_Leasedline_FE:104,
    KTR_Nail_up:105,
    CDN:112,
    CA:116,
    CA_IVAN:117,
    VN_EDU:118,
    VNPT_PORTAL:120,
    TTDL_HDDT:122,
    TTDL_MAIL_OFFICE:124,
    TD_1900:127,
    BRANDNAME:131,
    IVAN:132,
    DEDICATED_SERVER:139,
    TDTH_THUYENHINH:146,
    VCC:149,
    MGW_INTERNET_TRUCTIEP:134,
    COSO_HATANG:158,
    CAPQUANG_TRANG_TSL:123,
    MEGAEYES_CLOUD_CAMERA:83,
    WIFI_MESH:210,
    INDOOR_CAM:222,
    OUTDOOR_CAM:224,
    TIVI_SAMSUNG:266,
    IMS_DT:228,
    BRCD_FBDT:229,
    BRCD_THDT:230,
    MGW_DT:231,
    TSL_DT:232,
    ECABINET:200,
    ELEARNING:208,
    ORM:160,
    VXP:235,
    VNPT_HIS:136,
    VNPT_HMIS:156,
    BIENLAIDT:175,
    VNPT_MCAP:267,
    VNPT_HCSN:202,
    VNPT_SMART_TOURIST:223,
    VNPT_SMCC:268,
    VEDU_LIB:205,
    VNPT_SLL:215,
    VNPT_LIS:261,
}

export const ThoiHan = {
    Ngan_Han : 1,
    Dai_Han: 2,
}

export const KHOANMUC_TT = {
    KMTT_DATMOI:1,
    KMTT_CHUYENDICH:2,
    KMTT_DOITOCDO:3,
    KMTT_DICHVU:4,
    KMTT_MUATHIETBI:5,
    KMTT_DOISIM:6,
    KMTT_DOISO:7,
    KMTT_DOITS:8,
    KMTT_CAIDAT:9,
    KMTT_DATCOC:11,
    KMTT_KHOIPHUCSD:13,
    KMTT_CHUYENQUYEN:14,
    KMTT_TNTHUEBAO:15,
    KMTT_DOITD_MB:16,
    KMTT_TDLOAIHINHTB:17,
    KMTT_TDDICHVU:18,
    KMTT_KM_LAPDAT:19,
    KMTT_KM_THIETBI:20,
    KMTT_KM_DATCOC:21,
    KMTT_DATCOC_KM:22,
    KMTT_KM_DVGT:28,
    KMTT_TRAGOP_THIETBI:24,
    KMTT_TRATRUOC_THIETBI:25,
    KMTT_TIENTHOAI_DC:26,
    KMTT_THAYTHE_THUHOI:30,
    KMTT_CUOC_TAMUNG:3130,
    KMTT_HOAMANG_DD_TRASAU:33,
    KMTT_TIENTHOAI_DC_DOI_TD:35,
    KMTT_TIENTHOAI_TDDC:36,
    KMTT_TDTT_DV_CNTT:46,
    KMTT_DK_MULTISIM:49,
    KMTT_HUY_MULTISIM:50,
    KMTT_SODEP:23,
    KMTT_UUDAI_LANTOA:8800,
}

export const KieuCaiDatDVGT = {
    KIEU_CD_HUY_DVGT: 0,
    KIEU_CD_THEM_MOI_DVGT: 1,
    KIEU_CD_SUA_DVGT: 2,
}

export const THUESO = {
    TRUOTSO: 1,
    THONGBAO: 2,
}

export const TRANGTHAI_DONGBO = {
    KHONGPHAI_DB:-1,
    CHUADONGBO:0,
    DONGBO_LHD:1,
    DONGBO_TT:2,
    KICH_HOAT_CA:3,
    DONGBO_CM:5,
    DONGBO_HT:6,
    DONGBO_SERVICE:7,
    OPEN_SYNC_VINA:false,
    OPEN_SYNC_VINA_TRASAU:false,
}

export const KieuLapDat = {
    DM_CODINH:1,
    DM_CD_CO_SAN_ADSL:152,
    DM_CD_CO_SAN_MYTV:201,
    DM_CD_CO_SAN_MGW:205,
    THAYDOI_TT_DICHVU_KHAC:17,
    DM_CD_KEM_ADSL:70,
    DM_CD_KEM_MYTV:203,
    DM_CD_KEM_MGW:204,
    DM_PABX:242,
    DM_MGW_KEM_THOAI:43,
    DM_MGW_KEM_ADSL:44,
    DM_MGW_TREN_THOAI:45,
    DM_MGW_TREN_ADSL:46,
    DM_MGW_DOCLAP:42,
    DM_TSL_LUONG:48,
    DM_DIDONG:2,
    DM_ADSL_CO_SAN_DT:4,
    DM_ADSL_KEM_DT:5,
    DM_ADSL_KHONG_SO:6,
    TD_LOAITBI_DC:912,
    TD_THAYTHE_STB:7000,
    DC_DIENTHOAI:8,
    STDC_DIENTHOAI:12,
    DC_DIENTHOAI_KHACDC:89,
    STDC_DIENTHOAI_KHACDC:90,
    DC_ADSL_CO_SAN_DT_CUNG_DC:31,
    DC_ADSL_CO_SAN_DT_KHAC_DC:9,
    DC_ADSL_KEM_DT:10,
    DC_ADSL_KHONG_SO:11,
    DC_THOAI_DENDUONG_ADSL_COSAN:207,
    DC_THOAI_DENDUONG_MYTV_COSAN:209,
    DC_THOAI_DENDUONG_MEGAWAN_COSAN:211,
    DC_THOAI_KEM_ADSL:206,
    DC_THOAI_KEM_MYTV:208,
    DC_MEGAWAN_KEM_THOAI:52,
    DC_MEGAWAN_KEM_ADSL:53,
    DC_MEGAWAN_DEN_THOAI_COSAN:54,
    DC_MEGAWAN_DEN_ADSL_COSAN:55,
    TACH_THUEBAO:19,
    NHAP_THUEBAO:167,
    HOAMANG_TRATRUOC:169,
    DOISIM_TRATRUOC:170,
    BAN_THIETBI:49,
    DICHVU_KHAC:17,
    THAYDOI_TT_THANHTOAN:18,
    THAYDOI_TT_KHACHHANG:21,
    STCD_DOI_DICHVU:36,
    STADSL_DOI_TOCDO:37,
    THAYDOI_TT_THUEBAO:75,
    THAYDOI_TOCDO_ADSL:24,
    THAYDOI_MUCCUOC_ADSL:76,
    THAYDOI_TOCDO_MUCCUOC_ADSL:77,
    THAYDOI_TOCDO_ADSL_TK:13080,
    THAYDOI_MUCCUOC_ADSL_TK:13081,
    THAYDOI_TOCDO_MUCCUOC_ADSL_TK:13082,
    THAYDOI_TOCDOTHUC_ADSL:655,
    THAYDOI_CONGNGHE_TOCDO_AON_GPON:885,
    THAYDOI_CONGNGHE_TOCDO_GPON_AON:886,
    THAYDOI_CONGNGHE_AON_GPON:934,
    THAYDOI_CONGNGHE_GPON_AON:935,
    KHAO_SAT_DICH_CHUYEN_ADSL:81,
    KHAO_SAT_DICH_CHUYEN_CD:79,
    KHAO_SAT_DICH_CHUYEN_GPHONE:88,
    KHAO_SAT_DATMOI_ADSL:80,
    KHAO_SAT_DATMOI_CD:78,
    KHAO_SAT_DATMOI_GPHONE:85,
    THANH_LY_DIDONG:156,
    THANH_LY_INTERNET:158,
    THANH_LY_CODINH:20,
    THANH_LY_GPHONE:84,
    THANH_LY_TSL:59,
    THANH_LY_MEGAWAN:58,
    THANH_LY_TELEX:34,
    THANH_LY_EMAIL:33,
    CHUYENDD_TRASAU_SANG_TRATRUOC:68,
    CHUYENGP_TRATRUOC_SANG_TRASAU:183,
    DM_ADSL_TREN_MYTV_COSAN:181,
    DM_MYTV_TREN_ADSL_COSAN:193,
    DM_MYTV_KEM_ADSL:195,
    DM_MYTV_TREN_FTTH_COSAN:194,
    DM_MYTV_KEM_FTTH:196,
    DC_MYTV_KEM_MEGA:12,
    DC_MEGA_KEM_MYTV:13,
    DM_ADSL_KEM_MYTV:202,
    TDLH_MEGA_FTTH:182,
    CHUYENTU_MEGAWAN_CAPQUANG_SANG_MEGAWAN_ADSL:188,
    CHUYENTU_MEGAWAN_ADSL_SANG_MEGAWAN_SHDSL:186,
    CHUYENTU_MEGAWAN_SDHSL_SANG_MEGAWAN_ADSL:187,
    CHUYENTU_MEGAWAN_CAPQUANG_SANG_MEGAWAN_SHDSL:189,
    CHUYENTU_MEGAWAN_ADSL_SANG_MEGAWAN_CAPQUANG:190,
    CHUYENTU_MEGAWAN_SDHSL_SANG_MEGAWAN_CAPQUANG:191,
    CHUYENTU_METRONET_FE_SANG_METRONET_GE:610,
    THUE_BAO_QUANG:51,
    MYTV_KHONGSO_CAPDONG:197,
    DOISO_CD_ISDN_SOMOI:35,
    THAYDOI_KIEUTRA_MYTV:270,
    CHUYENTU_CODINH_SANG_PABX:244,
    CHUYENTU_PABX_SANG_CODINH:245,
    CHUYENTU_FTTH_ADSL:246,
    DOISO_CHINH_PABX:275,
    DOISO_CHINH_ISDN:275,
    DOINHOM_ISDN:100,
    CHUYENTU_CODINH_SANG_ISDN:271,
    CHUYENTU_ISDN_SANG_CODINH:272,
    CHUYENTU_30B_SANG_2B:273,
    CHUYENTU_2B_SANG_30B:274,
    DANGKY_GOI_DADV:280,
    HUY_GOI_DADV:281,
    XOA_TB_GOI_DADV:282,
    THEM_TB_GOI_DADV:283,
    THAYDOI_TT_KHUYENMAI:312,
    THAYDOI_TT_LIENHE:586,
    THAYDOI_TT_DV_CNTT:863,
    GIAHAN_DV_CNTT:13131,
    THAYDOI_DVGT_GP:171,
    TAMDUNG_SD_GP:101,
    MOTAMDUNG_SD_GP:102,
    THAYDOI_DVGT_CD:23,
    TAMDUNG_SD_CD:103,
    MOTAMDUNG_SD_CD:104,
    CHUYENDOIIMS_CD:568,
    THAYDOI_DVGT_DD:165,
    TAMDUNG_SD_DD:79,
    MOTAMDUNG_SD_DD:80,
    HUYGOI_HSSSV:957,
    THAYDOI_DVGT_IMS:227,
    TAMDUNG_SD_IMS:109,
    MOTAMDUNG_SD_IMS:110,
    CHUYENDOICD_IMS:567,
    CHUYENDOICD_IMS_TREN_FIBER:677,
    CDLH_CD_IMS_MEGAWAN:703,
    CDLH_CD_IMS_FIBER_MOI:719,
    CDLH_CD_IMS_MYTV:701,
    THAYDOI_DVGT_MEGA:105,
    TAMDUNG_SD_MEGA:39,
    MOTAMDUNG_SD_MEGA:96,
    THAYDOI_DVGT_FIBER:106,
    TAMDUNG_SD_FIBER:99,
    MOTAMDUNG_SD_FIBER:100,
    TAMDUNG_SD_MYTV:97,
    MOTAMDUNG_SD_MYTV:98,
    CHUYEN_MYTV_THUONG_SANG_VMP:608,
    CHUYEN_VMP_SANG_MYTV:661,
    TAMDUNG_SD_SGTV:111,
    MOTAMDUNG_SD_SGTV:112,
    TAMDUNG_SD_TSL:61,
    MOTAMDUNG_SD_TSL:108,
    TAMDUNG_SD_MGWAN:60,
    MOTAMDUNG_SD_MGWAN:107,
    TAMDUNG_SD_METRONET:833,
    MOTAMDUNG_SD_METRONET:834,
    TAMDUNG_SD_KP_AO:697,
    MOTAMDUNG_SD_KP_AO:698,
    THUESO_DT_CU_SAU_DC:540,
    THUESO_DT_CU_SAU_TL:557,
    THUESO_DT_MOI:541,
    THANHLY_THUESO_DT:542,
    TAMDUNG_SD_EMAIL:40,
    MOTAMDUNG_SD_EMAIL:106,
    HA_TOCDO_DUYTRI:14,
    NANG_TOCDO:15,
    DATCOC_MOI:550,
    THAYDOIGOICUOC_DATCOC:551,
    TANGTHOIGIAN_DATCOC:552,
    HUYDATCOC:553,
    TACH_VLAN:581,
    THUE_NGAN_HAN:594,
    DATMOI_KENHPHU_AO:595,
    KHAOSATDATMOI:571,
    TL_KENHPHU_AO:613,
    DM_TINH_KHAC:649,
    DC_TINH_KHAC:650,
    DOIGOI_FSECURE:668,
    TDDV_IMS_BRG_KICHHOAT:669,
    CQ_SUDUNG_IMS:230,
    THAYDOI_MUCCUOC_TB:692,
    DICHCHUYEN_KP_AO:695,
    DM_DIDONG_C_P:27,
    DM_DIDONG_CHUYEN_TINH:217,
    DM_DIDONG_KHOI_TAO_LAI:218,
    YEUCAU_GOIGD:"YEUCAU_GOIGD",
    THANHTOAN_SUDUNG:686,
    THANHTOAN_TRA_TBI:687,
    THANHTOAN_KO_TRA_TBI:688,
    KO_THANHTOAN_CO_TRA_TBI:689,
    KO_TT_KO_TRA_TBI:690,
    KHAOSATCDLH:618,
    DOIGOI_CNTT_GTGT:806,
    HNI_DOI_GIA_CUOC:850,
    HNI_DOI_TOCDO:851,
    HNI_DOI_LOAIKENH:852,
    HNI_DOI_HUONG_KN:853,
    HNI_DOI_TOCDO_LOAIKENH:854,
    HNI_DOI_TOCDO_HUONGKN:855,
    HNI_LOAIKENH_HUONGKN:856,
    HNI_TOCDO_LOAIKENH_HUONGKN:857,
    HNI_DOI_WANIP_LAN_IP:903,
    TD_TBI_MYTV:875,
    TL_LUONG_ISDN:877,
    TL_SOPHU_ISDN:878,
    HNI_DOI_CONGNGHE_GPON:921,
    TAMDUNG_SD_CD_TK:13086,
    MOTAMDUNG_SD_CD_TK:13087,
    TAMDUNG_SD_INTERNET_TK:13088,
    MOTAMDUNG_SD_INTERNET_TK:13089,
    TAMDUNG_SD_IMS_TK:13090,
    MOTAMDUNG_SD_IMS_TK:13091,
    TAMDUNG_SD_MGWAN_TK:13092,
    MOTAMDUNG_SD_MGWAN_TK:13093,
    TAMDUNG_SD_TSL_TK:13098,
    MOTAMDUNG_SD_TSL_TK:13099,
    TDTB_GOIDADV:159,
    TDTB_NHOMDADV:13125,
    TD3_GOIDADV:13114,
    CHUANHOA_CNTT:13130,
    TNYC_THAYDOI_TT:13132,
    TNYC_CHUYENDICH:13133,
    TNYC_THANHLY:13134,
    TNYC_KHOIPHUC:13135,
    TNYC_THAYDOI_TOCDO:13136,
    TNYC_CD_LOAIHINH:13137,
    TNYC_TD_DVGTGT:13138,
    TNYC_GHEP_GOI_DADV:13139,
    TNYC_TACHGHEP_MA:13140,
    TNYC_KHOAMO_PAYTV:13141,
    TNYC_KHAC:13142,
    TNYC_TAMDUNG:13144,
    TNYC_DOI_GOI_DADV:13145,
    DM_CLOUDCAMERA_FTTH_CS:11000,
    DM_CLOUDCAMERA_KEM_FTTH:11001,
    CLOUDCAMERA_ADD_CAMERA:13146,
    CLOUDCAMERA_TAMNGUNG_CAMERA:11002,
    CLOUDCAMERA_KHOIPHUC_CAMERA:11003,
    CLOUDCAMERA_DEL_CAMERA:72,
    THAYDOI_TT_CAP:13172,
    DK_MULTISIM:13169,
    HUY_MULTISIM:13170,

}

export const LOAI_DV = {
    DONVI_QL:1,
    DONVIQL_TT:2,
    DONVIQL_LD:3,
    GIAODICH:4,
    TRAM_VT:5,
    VETINH:5,
    HOST:6,
    DONVIQL_TT_BUUDIEN:7,
    KHACHHANG:8,
    TRAM_ATM:9,
    TRAM_MINI:10,
    DHTC_QLDL:11,
    DONVI_TSL:12,
    HOST_VATLY:16,
    QUAYTHU:18,
    XULY_NO_KHODOI:19,
    GIAIQUYET_KHIEUNAI:20,
    TRAM_IP:21,
    TO_QUANLY:22,
    HOANTHIEN_HOSO:23,
    TRAM_VETINH:25,
    TRAM_IP_SWITCH:26,
    CONGTACVIEN:30,
    PHONGBAN_XM_KHIEUNAI:31,
    TO_THU_CUOC:32,
    DAI_BR:37,
    TRAM_PORT:39,
    DAILY_XLKN:45,
    PHONG_BANHANG_KV:46,
    XULY_YCKM:49,
    BANHANG_TRUCTIEP:54,
    GD_NHAN_BANGKE:61,
    KETOAN_NHAN_BANGKE:62,
    DIEUHANH_TRUNGTAM_VT:63,
    CUA_HANG:63,
    TTDH_NGHIEMTHU:64,
    TTKD_NGHIEMTHU:65,
    DONVI_LAPHOPDONG:72,
    DONVI_LAPHOPDONG_CHA:73,
    KHO_NHAN_TBI_BAOHANH:80,
    TO_BHSC:81,
    KHO_NHAN_TBI_BAOHANH_XONG:82,
    HOANTHIEN_BAOHANH:83,
    KENHBAN_THICONG_DV:98,
    TONGDAI_CABMAN:100,
    TIEPNHAN_BAOHONG:66,
    TOKD_XLKN:427,
    TRAM_CAP_PORT:504,
    CSHT_NHATRAM:555,
    NHOM_XLSC:620,
    BH_QLDH:635,
    BH_DVXLDH:636,
    TT_BANHANG_MIEN:890,
    TTKD_BAOHANH_VT:998,
    NET_SNOC1:432,
    PBH_KHAIBAO_DV:598,
    
}

export const LOAISO_ISDN = {
    SOCHINH: 1,
    SOPHU: 2,
}

export const Loai_KH = {
    CANHAN_HOGIADINH:1,
    HANHCHINH_SUNGHIEP:2,
    DAI_LY:3,
    TUNHAN_TRONGNUOC:4,
    KHACHHANG_DACBIET:5,
}

export const KIEU_HD = {
    TAI_GD: 1,
    TAI_NHA: 2,
}

export const HINHTHUC_TC = {
    TRONGOI_THEO_HD: 1,
}

export const KIEU_KH = {
    CA_NHAN: 0,
    DOANH_NGHIEP: 1,
}

export const PHANLOAI_KH = {
    CA_NHAN: 2,
    DOANH_NGHIEP: 1,
}

export const Loai_NV = {
    NHANVIEN_GD: 2,
    THICONG_DAYMAY: 6,
    LANHDAO_DV: 13,
    THUNGAN: 17,
    NHANVIEN_XULY_NO: 19,
    NHANVIEN_DIEUCHINH_NO: 22,
    CONGTACVIEN: 24,
    NHANVIEN_TC: 25,
    CHAM_SOC_KHACH_HANG: 32,
    NHANVIEN_PHAPLY: 34,
    NHANVIEN_TN: 39,
    NHANVIEN_QLDL: 40,
    NHAN_BANGKE: 45,
    NHANVIEN_KYTHUAT: 51,
    NHANVIEN_KINHDOANH: 52,
    NHANVIEN_KD_HENLD: 58,
    NHANVIEN_KHAOSAT_KH: 95,
    NHANVIEN_TTVT_KHAOSAT_KH: 96,
    NHANVIEN_QL_AM: 116,
    THANHLY: 33,
    THUKHO: 303,
    NHANVIEN_AM: 104,
}

export const LOAISO = {
    THUONG: 1,
    KHONGSUDUNG: 2,
    AO: 3,
}

export const LOAI_KV = {
    KHUVUC_CHINHSACH: 1,
    KHUVUC_KHAC: 2,
    KHUVUC_THULAO_DAILY: 3,
    KHUVUC_DIABAN: 4,
    KHUVUC_DIABAN_VT: 5,
    KHUVUC_DIABAN_TT: 6,
    KHUVUC_DIABAN_TC: 7,
}

export const Loai_KM = {
    KhuyenMai:0,
    TraTruoc:1,
}

export const LOAINODE_MGWAN = {
    NODE_CHINH:1,
    NODE_PHU:2,
    NODE_DUPHONG_CONG_TOCDO:3,
    NODE_DUPHONG_TOCDO:4,
}

export const KIEULAP = {
    LAP_KHONG_SO:0,
    LAP_KEM:1,
    LAP_LINE_SAN:2,
    THAYDOI_TSO:3,
    PORT_THEO_CAP:4,
}

export const FSECURE_KM_12_MONTHS = {
    TOCDO_ID:3016,
    MUCUOCTB_ID:1000,
    TOCDO_ID_V2:3333,
    TOCDO_ID_CFreeFSD12M:3500,
    FreeFSD12M_2018:5555,
}

export const MUCCUOC = {
    TRON_GOI:1,
    LUU_LUONG:2,
}

export const LOAITBI_ADSL = {
    ADSL:1,
    SHDL:2,
    CPE:3,
    SET_TOP_BOX:4,
    CONG_FE:5,
    CONG_GE:6,
}
export const  TRANGTHAI_BH = {
      MOI_TIEPNHAN: 1,
      DANG_DIEUHANH_XU_LY: 3,
      DANG_GIAO_XULY: 4,
      DATHICONG: 5,
      HOANTHANH: 6,
      BAOTON: 7,
      CHO_XULY: 8,
      DANG_CHO_DOITAC_XULY: 17,//KieuNV:Trạng thái báo hỏng đang chờ đối tác xử lý
      /// Theo dõi chờ hoàn thiện      
      THEODOI_CHO_HT: 20,
    }
  