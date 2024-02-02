export default {
    getDanhSachQuyTrinh: async (axios, data) => axios.get('web-thuno/api/thu-no/xu-ly-thue-bao/ds-quy-trinh', { params: data }),
    getDanhSachHopDongTBKhoaMoMayHC: async (axios, data) => axios.get('web-thuno/api/thu-no/xu-ly-thue-bao/ds-hdtb-khoa-may-hoan-cong', { params: data }),
    getDSHDTBThanhLyHoanCong: async (axios, data) => axios.get('web-thuno/api/thu-no/css/ds-hdtb-thanh-ly-hoan-cong', { params: data }),  
    getDanhSachNhanVienTheoPhieuId: async (axios, data) => axios.get('web-thuno/api/thu-no/xu-ly-thue-bao/ds-nhan-vien-theo-phieu-id', { params: data }),
    getDanhSachLyDoHuy: async (axios, id) => axios.get('web-thuno/api/thu-no/xu-ly-thue-bao/ly-do-huy/hop-dong-thue-bao/' + id),
    getHuongGiaoTheoQuyTrinh: async (axios, data) => axios.get('web-thuno/api/thu-no/css/huong-giao/quy-trinh', { params: data }),
    updateNoiDungTH: async (axios, data) => axios.put('web-thuno/api/thu-no/css/cap-nhat-noi-dung-theo-phieu-giao', data),
    updateGiaoViec: async (axios, data) => axios.put('web-thuno/api/thu-no/xu-ly-thue-bao/cap-nhat-giao-viec', data),
    updateKiemTraHoanCong: async (axios, id) => axios.put('web-thuno/api/thu-no/xu-ly-thue-bao/hoan-thien-ho-so-thay-doi-dv/' + id),
    updateHoanCong: async (axios, data) => axios.put('web-thuno/api/thu-no/xu-ly-thue-bao/hoan-cong', data),
    deleteHopDongKhachHang: async (axios, data) => axios.delete('web-thuno/api/thu-no/xu-ly-thue-bao/hop-dong-khach-hang', { params: data }),
    deleteLyDoHuy: async (axios, data) => axios.delete('web-thuno/api/thu-no/css/ly-do-huy', { params: data }),
    updateKichHoatDichVu: async (axios, id) => axios.put('web-thuno/api/thu-no/xu-ly-thue-bao/kich-hoat-dich-vu/hop-dong-thue-bao/' + id),
    updateNgayHoanThien: async (axios, data) => axios.put('web-thuno/api/thu-no/xu-ly-thue-bao/cap-nhat-ngay-hoan-thien', data),
    getDSThaoTacControl: async (axios) => axios.get('web-quantri/quan-ly-danh-ba/lay-danhmuc/THAOTAC_CONTROL'),
    getHuongGiaoTheoLuong: async (axios, data) => axios.post('web-hopdong/khaibaotsl/lay_huonggiao_theo_luong_id', data),
    updateKichHoat: async (axios, data) => axios.post('web-thuno/api/thu-no/xu-ly-thue-bao/kich-hoat', data)
}