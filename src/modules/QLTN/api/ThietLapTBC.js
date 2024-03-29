export default {
    getDSDanhMuc: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/danh-muc/' + data),
    getDSDonVi: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/ds-don-vi-cau-hinh-tbc'),
    getTTCauHinhChungTBC: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/thong-tin-cau-hinh-chung-tbc',{params:data}),
    getLayTTCauHinhTBC_v2: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/cau-hinh-tbc-v2',{params:data}),
    capNhatTTTBC_v3: (axios, data) => axios.put("/web-thuno/api/thu-no/quan-ly-dai-ly/cap-nhat-tt-tbc-v3", data),
    getDSSTK: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/ds-stk-cau-hinh-chung'),
    xoaCauHinhTBC: (axios, data) => axios.delete('/web-thuno/api/thu-no/quan-ly-dai-ly/cau-hinh-tbc/' + data),
    capNhatTBC_v4: (axios, data) => axios.put("/web-thuno/api/thu-no/quan-ly-dai-ly/cap-nhat-cau-hinh-tbc-v4", data),
    xoaDiemTNTBC: (axios, data) => axios.delete('/web-thuno/api/thu-no/quan-ly-dai-ly/diem-tn-tbc/' + data),
    updateDiemTNTBC: (axios, data) => axios.post('/web-thuno/api/thu-no/quan-ly-dai-ly/diem-tn-tbc', data),
    xoaTienNoTBC: (axios, data) => axios.delete('/web-thuno/api/thu-no/quan-ly-dai-ly/tien-no-tbc/' + data),
    updateTienNoTBC: (axios, data) => axios.post('/web-thuno/api/thu-no/quan-ly-dai-ly/tien-no-tbc', data),
    xoaLoaiTinTBC: (axios, data) => axios.delete('/web-thuno/api/thu-no/quan-ly-dai-ly/loai-tin-tbc/' + data),
    updateLoaiTinTBC: (axios, data) => axios.post('/web-thuno/api/thu-no/quan-ly-dai-ly/loai-tin-tbc', data),
    getDSNoiMang: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/ds-cau-truc-noi-mang/' + data),
    getDSNgoaiMang: (axios, data) => axios.get('/web-thuno/api/thu-no/quan-ly-dai-ly/ds-cau-truc-ngoai-mang/' + data),
    checkMapID: (axios, data) => axios.post('/web-thuno/api/thu-no/common/lay-id-theo-ma', data),
  }
