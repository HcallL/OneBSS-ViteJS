export default {
  delay (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  },
  async kiemtra_thuebao_lap_hopdong_khac (vmaTb, vloaiHDId) {
    var result = {isValid: false, message: "Thuê bao đã được lập hợp đồng bởi vuth.hth"}
    return result
  },
  async upload_anh (vmaTb, anh1, anh2, anh3, anh4, lydo) {
    await this.delay(1000)
    return {
      "error": "200",
      "error_code": "BSS-00000000",
      "message": "Success",
      "message_detail": null,
      "request_id": "0af9d690-dca1-4145-a446-2342bac41d13",
      "page_info": null,
      "data": null
    }
  },
  async ts_dk_hssv_dk (data) {
    await this.delay(1000)
    var result = {
      error_msg: null,
      data: []
    }
    console.log(result)
    return result
  },
  async tt_7_dk_hssv_lay_thongtin (vmaTb) {
    await this.delay(1000)
    return {
      error_msg: null,
      data: [
        {
          "SO_NHA": null,
          "TENBH": "NGUYỄN THỊ THÚY QUỲNH",
          "SO_GT": "111687623.22",
          "SO_TB": "84912020284",
          "HOTENCU": "Mai Tùng Lâm",
          "SO_THE": "1151010440",
          "KHOA_HOC": "2012-2018",
          "ID_TINHTRANG": "2",
          "QUAN_ID": null,
          "ID_LOAIGT": 1,
          "TRANSACTION_PHONE": null,
          "NGAYSINHBH": "26/06/1991",
          "PHO_ID": null,
          "NGAY_CAP_GT": "09/04/2019",
          "NGAY_SINH": "02/01/1993",
          "DIACHIBH": "Hồng Lạc Sơn Dương, Tuyên Quang",
          "GIOI_TINH": "female",
          "DIACHI_TB": "Bắc Lương -Thọ Xuân- Thanh Hóa",
          "NGAYCAPCU": "01/02/2010",
          "DIACHICU": "Bắc Lương -Thọ Xuân- Thanh Hóa",
          "PHUONG_ID": null,
          "CMT": "174324634",
          "LOP": "BSDK",
          "TRANSACTION_LOCATION": null,
          "NGAYSINHCU": "02/01/1993",
          "BAO_HO": "0",
          "GHI_CHU": null,
          "SO_SIM": null,
          "ID_TRUONG": "9",
          "SOTHUEBAO": "84912020284",
          "ID_PKG": 1,
          "NOICAPCU": "THA",
          "CUSTOMER_USE_ID": 1,
          "TEN_TB": "Mai Tùng Lâm",
          "NGAY_CAP_THE": "10/09/2012",
          "NATIONALITYID": 232,
          "NOI_CAP": "TQG",
          "PASSPORT": null
        }
      ]
    }
  },
  async tt_7_dk_hssv_lskm (vmaTb) {
    await this.delay(1000)
    return {
      error_msg: null,
      data: [
        {
          "NGUOI_TH": "duchtv_vnp",
          "DIACHI_TB": "57 huỳnh thúc kháng Phường Láng Hạ - Quận Đống Đa - Hà Nội",
          "SO_GT": "012859115",
          "SO_THE": "123456789",
          "TEN_TRUONG": "Cao đẳng nghề Sài Gòn",
          "LOP": "d10cn4",
          "NAME": "Sinh viên năm thứ 1",
          "TENLOAI": "Chứng Minh Nhân Dân",
          "GHI_CHU": "1",
          "NGAY_CN": "23/04/2021 02:22:38",
          "THAOTAC": "Cap nhat",
          "TEN_TB": "qlcl  test",
          "NGAY_CAP_THE": "20/03/2020",
          "NGUOI_SUA_DOI": null,
          "NGAY_CAP_GT": "22/04/2019",
          "NGAY_SINH": "22/04/2002",
          "NOI_CAP": "HNI"
        },
        {
          "NGUOI_TH": "duchtv_vnp",
          "DIACHI_TB": "57 huỳnh thúc kháng Phường Láng Hạ - Quận Đống Đa - Hà Nội",
          "SO_GT": "012859115",
          "SO_THE": "123456789",
          "TEN_TRUONG": "Cao đẳng nghề Sài Gòn",
          "LOP": "d10cn4",
          "NAME": "Sinh viên năm thứ 1",
          "TENLOAI": "Chứng Minh Nhân Dân",
          "GHI_CHU": null,
          "NGAY_CN": "23/04/2021 02:22:38",
          "THAOTAC": "Cap nhat",
          "TEN_TB": "qlcl  test",
          "NGAY_CAP_THE": "20/03/2020",
          "NGUOI_SUA_DOI": null,
          "NGAY_CAP_GT": "22/04/2019",
          "NGAY_SINH": "22/04/2002",
          "NOI_CAP": "HNI"
        },
        {
          "NGUOI_TH": "duchtv_vnp",
          "DIACHI_TB": "57 huỳnh thúc kháng Phường Láng Hạ - Quận Đống Đa - Hà Nội",
          "SO_GT": "012859115",
          "SO_THE": "123456789",
          "TEN_TRUONG": "ĐH Thăng Long",
          "LOP": "d10cn4",
          "NAME": "Sinh viên năm thứ 1",
          "TENLOAI": "Chứng Minh Nhân Dân",
          "GHI_CHU": "1",
          "NGAY_CN": "23/04/2021 01:13:50",
          "THAOTAC": "Xoa",
          "TEN_TB": "qlcl  test",
          "NGAY_CAP_THE": "20/03/2020",
          "NGUOI_SUA_DOI": null,
          "NGAY_CAP_GT": "22/04/2019",
          "NGAY_SINH": "22/04/2002",
          "NOI_CAP": "HNI"
        },
        {
          "NGUOI_TH": "duchtv_vnp",
          "DIACHI_TB": "57 huỳnh thúc kháng Phường Láng Hạ - Quận Đống Đa - Hà Nội",
          "SO_GT": "012859115",
          "SO_THE": "123456789",
          "TEN_TRUONG": "ĐH Thăng Long",
          "LOP": "d10cn4",
          "NAME": "Sinh viên năm thứ 1",
          "TENLOAI": "Chứng Minh Nhân Dân",
          "GHI_CHU": null,
          "NGAY_CN": "23/04/2021 01:13:50",
          "THAOTAC": "Xoa",
          "TEN_TB": "qlcl  test",
          "NGAY_CAP_THE": "20/03/2020",
          "NGUOI_SUA_DOI": null,
          "NGAY_CAP_GT": "22/04/2019",
          "NGAY_SINH": "22/04/2002",
          "NOI_CAP": "HNI"
        }
      ]
    }
  },
  async ts_lichsu_capnhat_thuebao_tratruoc (vmaTb) {
    await this.delay(1000)
    var result = {
      error_msg: null,
      data: [
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "31/12/2010",
          "PLACEOFISSUE": "CXN",
          "REGISTERDATE": "13/07/2021 08:59",
          "EMAIL": null,
          "IDNUMBER": "B4904030",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "APP CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Hộ Chiếu",
          "NOTE": "TTTB_RB",
          "ADDRESS": "Phú Yên",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 302584513,
          "JOB": null,
          "FULLNAME": "TR??NG QUANG VI NHÂN",
          "PASSPORT": "B4904030",
          "BIRTHDAY": "12/12/1974"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "22/02/2020",
          "PLACEOFISSUE": "NAN",
          "REGISTERDATE": "08/07/2021 08:38",
          "EMAIL": null,
          "IDNUMBER": "182127203",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "APP CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Hộ Chiếu",
          "NOTE": "tttb2",
          "ADDRESS": "Th? Tr?n Huy?n Nam ?àn, Ngh? An",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 300390429,
          "JOB": null,
          "FULLNAME": "PHAN XUÂN T??NG",
          "PASSPORT": "B4904030",
          "BIRTHDAY": "09/05/1955"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "31/12/2010",
          "PLACEOFISSUE": "CXN",
          "REGISTERDATE": "04/07/2021 11:04",
          "EMAIL": null,
          "IDNUMBER": "B4904030",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "APP CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Hộ Chiếu",
          "NOTE": "RB_tttb",
          "ADDRESS": "Phú Yên",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 299069957,
          "JOB": null,
          "FULLNAME": "TR??NG QUANG VI NHÂN",
          "PASSPORT": "B4904030",
          "BIRTHDAY": "12/12/1974"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "22/02/2020",
          "PLACEOFISSUE": "NAN",
          "REGISTERDATE": "02/07/2021 14:32",
          "EMAIL": null,
          "IDNUMBER": "182127203",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "APP CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Hộ Chiếu",
          "NOTE": "tttb",
          "ADDRESS": "Th? Tr?n Huy?n Nam ?àn, Ngh? An",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 295959514,
          "JOB": null,
          "FULLNAME": "PHAN XUÂN T??NG",
          "PASSPORT": "B4904030",
          "BIRTHDAY": "09/05/1955"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "31/12/2010",
          "PLACEOFISSUE": "C?c Qu?n lý xu?t nh?p c?nh",
          "REGISTERDATE": "14/05/2021 11:05",
          "EMAIL": null,
          "IDNUMBER": "B4904030",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "APP CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Hộ Chiếu",
          "NOTE": null,
          "ADDRESS": "Phú Yên",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 285057244,
          "JOB": null,
          "FULLNAME": "TR??NG QUANG VI NHÂN",
          "PASSPORT": "B4904030",
          "BIRTHDAY": "12/12/1974"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "07/11/2018 15:24",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 235529906,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "07/11/2018 15:16",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "Male",
          "ID": 235529057,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "20/10/2018 05:07",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "Male",
          "ID": 234704820,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "20/10/2018 05:07",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 234704819,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "07/10/2018 13:34",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "Male",
          "ID": 234212774,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "10/04/2018",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "12/06/2018 17:51",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "Male",
          "ID": 228527967,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "10/04/2018",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "12/04/2018 14:57",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web MyVNPT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "female",
          "ID": 213196611,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "13/05/2010",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "12/04/2018 14:23",
          "EMAIL": null,
          "IDNUMBER": "125003494",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Ph??ng V? Ninh - Thành ph? B?c Ninh - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "male",
          "ID": 213180046,
          "JOB": null,
          "FULLNAME": "?? Hoàng H?i",
          "PASSPORT": null,
          "BIRTHDAY": "29/04/1981"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "20/10/2016",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "12/04/2018 14:23",
          "EMAIL": null,
          "IDNUMBER": "125143589",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web CCBS",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "?ông Ti?n - Yên Phong - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "female",
          "ID": 213179739,
          "JOB": null,
          "FULLNAME": "Nguy?n Th? Di?u Lan",
          "PASSPORT": null,
          "BIRTHDAY": "08/09/1986"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "20/10/2016",
          "PLACEOFISSUE": "BNH",
          "REGISTERDATE": "06/03/2018 14:09",
          "EMAIL": null,
          "IDNUMBER": "125143589",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web DKTT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "?ông Ti?n - Yên Phong - B?c Ninh",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "female",
          "ID": 210827201,
          "JOB": null,
          "FULLNAME": "Nguy?n Th? Di?u Lan",
          "PASSPORT": null,
          "BIRTHDAY": "08/09/1986"
        },
        {
          "MSISDN": "84835750407",
          "PLACEDATE": "09/07/2012",
          "PLACEOFISSUE": "BPC",
          "REGISTERDATE": "15/06/2017 16:52",
          "EMAIL": null,
          "IDNUMBER": "285665047",
          "AGENTID": "nhantqv_hcm",
          "REGISTERMETHODID": "Web DKTT",
          "COMPANY": null,
          "ACTIVATIONTIME": null,
          "TENLOAI": "Chứng Minh Nhân Dân",
          "NOTE": null,
          "ADDRESS": "Thôn 4, ??ng Hà, Bù ??ng, Bình Ph??c",
          "NATIONALITYID": "Vi?t Nam",
          "GENDER": "female",
          "ID": 198670407,
          "JOB": null,
          "FULLNAME": "Vi Th? Ph?i",
          "PASSPORT": null,
          "BIRTHDAY": "21/11/1982"
        }
      ]
    }
    return result
  }
  // async app_tb_image_dktt (vmaTb) {

  // }

}