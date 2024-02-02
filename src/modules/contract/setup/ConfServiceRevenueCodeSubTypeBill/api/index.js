export default {
    layDanhSachMaDoanhThu: (axios, data) => axios.post('web-quantri/khoanmuc-thanhtoan/sp_lay_ds_madoanhthu', data),
    layDanhSachChuaGan: (axios) => axios.post('web-quantri/khoanmuc-thanhtoan/sp_lay_ds_dichvuvt'),
    khoitao: (axios, data) => axios.post('/web-quantri/khoanmuc-thanhtoan/tsbtnghilai_click_frmmadt_khtt', data),
    layDanhSachTBChuaGan: (axios, data) => axios.post('web-quantri/khoanmuc-thanhtoan/sp_lay_ds_loaihinhhtb_madt', data),
    layDanhSachTBDaGan: (axios, data) => axios.post('web-quantri/khoanmuc-thanhtoan/hienthidanhsach_lhtb_dagan_frmmadt_khtt', data),
    layDanhSachKMTTChuaGan: (axios, data) => axios.post('web-quantri/khoanmuc-thanhtoan/hienthidanhsach_khoanmuc_chuagan_frmmadt_khtt', data),
    layDanhSachKMTTDaGan: (axios, data) => axios.post('web-quantri/khoanmuc-thanhtoan/hienthidanhsach_khoanmuc_dagan_frmmadt_khtt', data),
}
