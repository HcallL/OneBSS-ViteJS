export default {
    getDSQuyenNguoiDung: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho-user/ds-quyen-nd/${data.nguoiDungId}`),
    getDanhMucLoaiCT: (axios, data) => axios.get(`/web-qlvt/api/chon-chung-tu-ccdc/danh-muc-loai-chung-tu`),
    getDanhMucKho: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-kho-nhap-xuat/${data.nhanVienId}`),
    getDanhMucMucDich: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-muc-dich-nhap-xuat/${data.nhomMdId}`),

    getDSCongTrinh: (axios, data) => axios.post(`/web-qlvt/api/dang-ky-cap-phat/ds-cong-trinh`,data),
    getDanhMucTinhTrangTB: (axios, data) => axios.get(`/web-qlvt/api/cap-phat-ccdc/tinh-trang-thiet-bi`),
    getDanhMucChatLuong: (axios, data) => axios.get(`/web-qlvt/api/danh-sach-vat-tu-ccdc/chat-luong`),
    getDanhMucNghiepVu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-nghiep-vu/${data.nhomMdId}`),

    getDSHopDongMuaSam: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-hop-dong-mua-sam`),
    getDSDuAn: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-du-an/${data.chkDuAn}`),
    getThamSoMacDinh: (axios, data) => axios.get(`/web-qlvt/api/tiep-nhan-thiet-bi-bao-hanh/tham-so-mac-dinh/${data.kieuId}`),
    getLayTenMenu: (axios, data) => axios.post(`/web-qlvt/api/dang-ky-cap-phat/ds-ten-menu`,data),

    getAnHienCot: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-show-cot-hien-thi/${data.kieu}`),
    getDSChungTuTheoLoai: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-chung-tu-theo-loai`,data),
    getDSVatTuChungTuV1: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-vat-tu-chung-tu-v1/${data.chungTuId}`),
    getThongTinNgayDH: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/thong-tin-ngay-don-hang/${data.chungTuId}`),

    getThongTinNgayChungTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/thong-tin-ngay-chung-tu/${data.chungTuId}`),
    getMaMucDichTheoID: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-ma-muc-dich-theo-muc-dich/${data.mucDichId}`),
    getKieuChungTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-kieu-chung-tu/${data.chungTuId}`),
    getDSVanBanChungTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-van-ban-ct/${data.chungTuId}`),

    getDSTraCuuVatTuChungTu: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-chung-tu/lay-ds-vattu-chungtu/${data.chungTuId}`),
    getDSVatTuChungTuSerial: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-vattu-chung-tu-serial/${data.chungTuId}`),
    KiemTraChungTuDieuChinh: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-ct-dieu-chinh`,data),
    KiemTraTonTaiChiTietVatTu: (axios, data) => axios.get(`/web-qlvt/api/gan-seri/kiem-tra-chi-tiet-vat-tu?chungtu-id=${data.chungTuId}`),

    NapDSVatTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-vat-tu-nhap-xuat/${data.chungTuId}`),
    getTenTatMucDich: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-ten-tat-theo-muc-dich/${data.mucDichId}`),
    getDSLoaiKhoTruyenDan: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-loai-kho-td/${data.mucDichId}`),
    getIDLoaiChungTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/loai-chung-tu-theo-muc-dich/${data.mucDichId}`),

    CapNhatChungTuV2: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-chung-tu-v2`,data),
    CapNhatChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-chung-tu-nhap`,data),
    getKeys: (axios, data) => axios.post(`/web-qlvt/api/cap-phat-ccdc/get-key`,data),
    SinhSoPhieuVatTuV5: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/sinh-so-phieu-vt-v5`,data),

    getIDChungTuCha: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-chung-tu-cha-theo-chung-tu/${data.chungTuId}`),
    getIDChungTuTheoSoPhieu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-chung-tu-theo-so-phieu?soPhieu=${data.soPhieu}`),
    CapNhatChungTuTheoKieu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ct-theo-kieu`,data),
    KiemTraCapNhatChungTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-cap-nhat-chung-tu/${data.chungTuId}`),

    KiemTraChiTietVatTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-chi-tiet-vt`,data),
    KiemTraXoaPhieuDaHoanThanh: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-xoa-phieu-hoan-thanh/${data.chungTuId}`),
    getThongTinChungTuTheoPhieuGop: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-chung-tu-theo-so-phieu-gop?soPhieuGop=${data.soPhieuGop}`),
    getThongTinChungTuTheoCTCha: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-chung-tu-theo-chung-tu-cha/${data.chungTuChaId}`),

    KiemTraKhoDenCoTonKho: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-kho-den-ton-kho/${data.khoId}`),
    KiemTraHanChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-han-chung-tu`,data),
    KiemTraSuaThuHoi: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-sua-thu-hoi/${data.chungTuId}`),
    getTonKhoTheoID: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/lay-ds-ton-kho/${data.khoId}`),

    getThongTinQuyenTrenKho: (axios, data) => axios.get(`/web-qlvt/api/duyet-dang-ky-cap-phat/kiem-tra-quyen-xn/${data.nhanVienId}/${data.khoId}`),
    KiemTraLoaiKhoMaKho: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-loai-ma-kho`,data),
    getThongTinTrangThaiPhieu: (axios, data) => axios.get(`/web-qlvt/api/duyet-dang-ky-cap-phat/kiem-tra-thay-doi/${data.chungTuId}`),
    XoaChungTuBaoHanh: (axios, data) => axios.post(`/web-qlvt/api/duyet-dang-ky-cap-phat/xoa-chung-tu-bao-hanh`,data),

    GuiSMSChungTu: (axios, data) => axios.get(`/web-qlvt/api/`),
    XoaPhieuDaHoanThanh: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/xoa-phieu-da-hoan-thanh`,data),
    CapNhatDangKy: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-dang-ky?chung-tu-id=${data.chungTuId}&dang-ky-id=${data.dangKyId}`),
    CapNhatVatTuDangKy: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-vat-tu-dang-ky`,data),

    getIDTrangThaiPhieu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/trang-thai-phieu-tu-chung-tu-id?chung-tu-id=${data.chungTuId}`),
    XoaTatCaChiTietChungTu: (axios, data) => axios.post(`/web-qlvt/api/duyet-dang-ky-cap-phat/xoa-tat-ca-chi-tiet-chung-tu?chung-tu-id=${data.chungTuId}`),
    XoaThongTinLienQuanCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/xoa-thong-tin-ct/${data.chungTuId}`),
    GiaoPhieuCTHoanTra: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/giao-phieu-hoan-tra`,data),

    getSoPhieu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/so-phieu-theo-chung-tu-id?chung-tu-id=${data.chungTuId}`),
    KiemTraXoaChungTu: (axios, data) => axios.get(`/web-qlvt/api/duyet-dang-ky-cap-phat/kiem-tra-xoa-chung-tu/${data.chungTuId}/${data.maNd}`),
    KiemTraCTXuatHoanTraTheoSoPhieu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-ct-xuat-nhap-hoan-tra?soPhieuGop=${data.soPhieuGop}`),
    KiemTraCTXuatHoanTraCoCTCon: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-ct-xuat-hoan-tra-theo-ct-cha/${data.chungTuChaId}`),

    KiemTraXoaDongBo: (axios, data) => axios.get(`/web-qlvt/api/`),
    XoaThongTinLienQuanCT_V2: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/xoa-thong-tin-ct-v2/${data.chungTuId}`),
    getIDNhomNguoiDung: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-nhom-nd-theo-ma?maNd=${data.maNd}`),
    KiemTraHanChungTuV2: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-han-chung-tu-v2`,data),

    getMaPrefixLoHang: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-prefix-lo-hang/${data.loHang}`),
    KiemTraThayDoiChiTietCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-thay-doi-ctct/${data.chungTuId}/${data.themMoi}`),
    getIDLoaiKho: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-loai-kho-theo-kho/${data.khoId}`),
    XoaChiTietChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/xoa-chi-tiet-chung-tu?ctct-id=${data.ctctId}`),

    getThongTinNgayNhanCT: (axios, data) => axios.get(`/web-qlvt/api/duyet-dang-ky-cap-phat/ds-ngay-nhan-thanhtoan-chungtu/${data.chungTuId}`),
    CapNhatSerialV2: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-serial`,data),
    CapNhatSerialV2_1: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-serial-v1`,data),
    getDSThietBiChungTu: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-chung-tu/lay-ds-thietbi-chungtu/${data.chungTuId}`),
    KiemTraMaVatTu: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-vat-tu-theo-ma?maVt=${data.maVt}`),

    KiemTraDonViTinh: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-don-vi-tinh/${data.donViTinh}`),
    KiemTraTonVatTuCT: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-ton-vattu-chung-tu`,data),
    CapNhatChungTuThietBi: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-chung-tu-thiet-bi-excel`,data),
    CapNhatChungTuThietBiV2: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-chung-tu-thiet-bi-v2`,data),
    getThongTinPhieuTheoCTCha: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-so-phieu-theo-ct-cha/${data.chungTuId}`),

    KiemTraHoanThienCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-hoan-thien-chung-tu-v1?chung-tu-id=${data.chungTuId}`),
    HoanThienChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/hoan-thien-chung-tu`,data),
    KiemTraHoanThanhCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-hoan-thien-chung-tu?chung-tu-id=${data.chungTuId}`),
    KiemTraIDChiTietQLTS: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-chi-tiet-qlts/${data.chungTuId}`),

    // CapNhatThongTinQLTS: (axios, data) => axios.get(`/web-qlvt/api/`),
    // CapNhatLog: (axios, data) => axios.get(`/web-qlvt/api/`),
    XoaTatCaChungTuThietBi: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/xoa-tat-ca-chung-tu-thiet-bi?chung-tu-id=${data.chungTuId}`),
    CapNhatSLChungTuVatTu: (axios, data) => axios.post(`/web-qlvt/api/gan-seri/cap-nhat-so-luong-chi-tiet-vat-tu`,data),

    CapNhatSoLanInCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-so-lan-in-ct?chungTuId=${data.chungTuId}&maNd=${data.maNd}`),
    CapNhatSoLanIn: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-so-lan-in?chungTuId=${data.chungTuId}`),
    KiemTraSerialTonTai: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-ton-tai-serial?serial=${data.serial}`),
    KiemTraSerialDangCap: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-serial-dang-cap?serial=${data.serial}`),

    KiemTraLoHangCuaSerial: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-lo-hang-serial?serial=${data.serial}&chung-tu-id=${data.chungTuId}`),
    XoaChungTuThietBiTheoTBI: (axios, data) => axios.delete(`/web-qlvt/api/nhap-xuat-vt/xoa-chung-tu-theo-ctct-va-tbi-id?ctct-id=${data.ctctId}&thiet-bi-id=${thietBiId}`),
    getKieuNhapCap: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kieu-nhap-cap?vat-tu-id=${data.vatTuId}&kho-id=${data.khoId}&lo-hang-id=${data.loHang}`),
    getDanhSachCap: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/danh-sach-cap?ctct-id=${data.ctctId}`),

    TachCuonCap: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/tach-cuon-cap`,data),
    getTongSoLuongTonTheoCTCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/so-luong-thiet-bi?ctct-id=${data.ctctId}`),
    XoaChiTietThietBi: (axios, data) => axios.delete(`/web-qlvt/api/nhap-xuat-chuyen-vt/xoa-thiet-bi-chi-tiet/${data.thietBiId}`),
    CopyChungTuV2: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/copy-chung-tu-v2?chung-tu-id=${data.chungTuId}&kieu=${data.kieu}`),

    getDSKhoVatTuLe: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/kho-vat-tu-le?nhan-vien-id=${data.nhanVienId}&don-vi-id=${data.donViId}`),
    getDSKieuPhieu: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-chung-tu/lay-ds-kieu-phieu/${data.loaiCtId}`),
    CapNhatGhiChuChiTietCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ghi-chu-ctct?ghiChu=${data.ghiChu}&ctctId=${data.ctctId}`),
    CapNhatTaiKhoanDoiUngNet: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-tk-doi-ung?tkDoiUng=${data.tkDoiUng}&maNd=${data.maNd}&tenTat=${data.tenTat}&ctCtId=${data.ctctId}`),

    CapNhatTaiKhoanDoiUngKhac: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-tk-doi-ung?tkDoiUng=${data.tkDoiUng}&maNd=${data.maNd}&tenTat=${data.tenTat}&ctCtId=${data.ctctId}`),
    KiemTraTonKho: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-ton-kho`,data),
    getSLDatCho: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/so-luong-dat-cho/${data.ctctId}`),
    getDSTonKhoTheoCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/ton-kho-theo-chung-tu?chung-tu-id=${data.chungTuId}`),

    KiemTraUpdateSerial: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/kiem-tra-cap-nhat-so-serial`,data),
    CapNhatMaThungCTTB: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-vt/cap-nhat-ma-thung-chung-tu-thiet-bi?ma-thung=${data.maThung}&ctct-id=${data.ctctId}&tbi-id=${data.thietBiId}`),
    CapNhatGhiChuCTTB: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-vt/cap-nhat-ghi-chu-chung-tu-thiet-bi?ghi-chu=${data.ghiChu}&ctct-id=${data.ctctId}&tbi-id=${data.thietBiId}`),
    getChungTuTapDoan: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-vt/id-chung-tu?chung-tu-id=${data.chungTuId}`),

    // KiemTraDongBo: (axios, data) => axios.get(`/web-qlvt/api/`),
    XoaDuLieuChungTu: (axios, data) => axios.delete(`/web-qlvt/api/nhap-xuat-vt/xoa-chung-tu-theo-id?chung-tu-id=${data.chungTuId}`),
    getTongSoLuongChuaGan: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/tong-so-luong-chua-gan/${data.chungTuId}`),
    getIDCongTrinh: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-cong-trinh-theo-chung-tu/${data.chungTuId}`),

    getThongTinNgayNhanNguoiNhan: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-ngay-nhan-nguoi-nhan-theo-ct/${data.chungTuId}`),
    KiemTraXacNhanChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-xac-nhan-ct`,data),
    CapNhatNgayGuiCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-gui-ct`,data),
    CapNhatNgayChungTuHCM: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-ct-hcm`,data),

    getIDPhieuKT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-phieu-kt-theo-ct/${data.chungTuId}`),
    getThongTinNgayGui: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ngay-gui-tt/${data.chungTuId}`),
    CapNhatNgayNhanCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-nhan-ct`,data),
    CapNhatNgayNhanTTChungTu: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-nhan-ct`,data),

    // InPhieuInKim: (axios, data) => axios.get(`/web-qlvt/api/`),
    getDSDuAnV1: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-du-an/${data.chkDuAn}`),
    GanHDDuAnChiTietCT: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/cap-nhat-thong-tin-ctct`,data),
    SinhQRCode: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/sinh-qr-code`,data),

    KiemTraHuyGanMaDuAn: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-huy-gan-ma-duan/?soHieuCt=${data.soHieuCt}`),
    GoGanHDDuAnCTCT: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-vt/xoa-thong-tin-du-an`),
    getDSDuAnV2: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ds-du-an-v2/${data.chkDuAn}`),
    getDSKhoTapDoan: (axios, data) => axios.get(`/web-qlvt/api/tra-cuu-ton-kho/danh-sach-vat-tu/${data.loaiKhoTdId}`),

    getDSDongThietBi: (axios, data) => axios.get(`/web-qlvt/api/danh-sach-vat-tu/dong-thiet-bi-theo-vat-tu?vattu-id=${data.vatTuId}`),
    getDSHeThong: (axios, data) => axios.get(`/web-qlvt/api/danh-sach-vat-tu/he-thong-theo-dong-thiet-bi?dongtbi-id=${data.dongThietBiId}`),
    getNoiDungGiaoCT: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/noi-dung-giao-ct/${data.chungTuId}`),
    CapNhatNgayChuyenCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-chuyen-ct`,data),

    CapNhatNgayChungTu: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-ct`,data),
    CapNhatNgayChungTuV2: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-ct-v2`,data),
    CapNhatLoaiKhoTapDoan: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-loai-kho-td?loaiKhoTdId=${data.loaiKhoTdId}&ctctId=${data.ctctId}`),
    CapNhatKhoTapDoan: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-kho-td?khoTdId=${data.khoTdId}&ctctId=${data.ctctId}`),

    KiemTraVatTuDocfile: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/kiem-tra-vt-doc-file`,data),
    CapNhatNoiDungGiaoSuaCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-noi-dung-giao-ct?chungTuId=${data.chungTuId}&ndGiao=${data.ndGiao}`),
    CapNhatChungTuVanBan: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ct-van-ban`,data),
    getThongTInTrangThaiPhieuV2: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/trang-thai-phieu-v2/${data.chungTuId}`),

    CapNhatNgayKyCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-ngay-ky-ct`,data),
    CapNhatSoPhieuIn: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-so-phieu-in?chungTuId=${data.chungTuId}&soPhieuIn=${data.soPhieuIn}`),
    getThongTinTrangThaiPhieuV3: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/trang-thai-phieu-v2/${data.chungTuId}`),
    CapNhatNguoiTiepNhanCT: (axios, data) => axios.put(`/web-qlvt/api/nhap-xuat-chuyen-vt/cap-nhat-so-phieu-in?chungTuId=${data.chungTuId}&soPhieuIn=${data.soPhieuIn}`),

    LayThongTinDuAn3rd: (axios, data) => axios.get(`/web-qlvt/api/`),
    getMaCoSoHaTang: (axios, data) => axios.get(`/web-qlvt/api/nhap-xuat-chuyen-vt/ma-co-so-ha-tang/${data.khoId}`),
    SinhCTQuanLyTaiSan: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/sinh-ct-qlts`,data),
    SinhChungTuIMSBienBan: (axios, data) => axios.post(`/web-qlvt/api/nhap-xuat-chuyen-vt/sinh-ct-ims-bbg`,data),
  };
  