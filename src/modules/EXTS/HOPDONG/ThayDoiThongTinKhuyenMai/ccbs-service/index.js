export default {
    async ts_hoanthien_hd_cn_danhba(context, ip,
        so_nha, phuong_id, ma_tinh, ma_kh, loai_dc_bao_cuoc, ngay_cn,
        doituong, inma_baocuoc, tyle_vat, so_giay_to, user_id,
        doi_tuong_su_dung, loai_gt, khach_hang_cu, nhanvien_ql, noi_cap,
        loai_tb, dia_chi_thuongtru, inchitiet, thutu_in, quoc_tich, ten_db,
        ngay_sn, ghichu, dvi_ql_id, quan_id, email, ma_bc, dangky_db,
        ten_tb, tra_cuu_trong_db, trang_thai, ngay_thu_hoi, pho_id, kieu_bao_cuoc,
        ngay_sinh, nhanvien_pt, so_tb, ngay_ld, ngay_cap, cuoc_tb, diachi) {

        let data = {
            so_nha: so_nha,
            phuong_id: phuong_id,
            ma_tinh: ma_tinh,
            ma_kh: ma_kh,
            loai_dc_bao_cuoc: loai_dc_bao_cuoc,
            ngay_cn: ngay_cn,
            doituong: doituong,
            inma_baocuoc: inma_baocuoc,
            tyle_vat: tyle_vat,
            so_giay_to: so_giay_to,
            userid: user_id,
            doi_tuong_su_dung: doi_tuong_su_dung,
            loaigt: loai_gt,
            khach_hang_cu: khach_hang_cu,
            nhanvien_ql: nhanvien_ql,
            noi_cap: noi_cap,
            loai_tb: loai_tb,
            dia_chi_thuongtru: dia_chi_thuongtru,
            inchitiet: inchitiet,
            thutu_in: thutu_in,
            quoc_tich: quoc_tich,
            ten_db: ten_db,
            ngay_sn: ngay_sn,
            ghi_chu: "from DHSXKD:" + ghichu,
            donv_ql_id: dvi_ql_id,
            quan_id: quan_id,
            email: email,
            ma_bc: ma_bc,
            dangky_db: dangky_db,
            ten_tb: ten_tb,
            ip: ip,
            tra_cuu_trong_db_0_1: tra_cuu_trong_db,
            trang_thai: trang_thai,
            ngay_thuhoi: ngay_thu_hoi,
            pho_id: pho_id,
            kieu_bao_cuoc: kieu_bao_cuoc,
            ngay_sinh: ngay_sinh,
            nhan_vien_pt: nhanvien_pt,
            so_tb: so_tb,
            ngay_ld: ngay_ld,
            ngay_cap: ngay_cap,
            cuoc_tb: cuoc_tb,
            dia_chi: diachi
        }

        let response = await context.$root.context.post(`/ccbs/executor/ts_hoanthien_hd_cn_danhba`, data)
        return response.data
    },
    async ts_hoanthien_hd_cn_kh(context, ip,
        ma_tuyen, dangky_tv, phoct_id, user_id, taikhoan, kh_lon, ghi_chu, phuongct_id, ma_qhns, noi_cap1, ten_nv,
        nganhang_id, ky_ten, quantt_id, dangky_db, loai_kh, dvi_ql_tb, sonha_tt, nganhnghe, so_giay_to1, phott_id,
        uutien, lydo_anh, ngay_cap_gt, diachi_tt, quanct_id, ma_tinh, gender, ma_kh, ms_thue, so_giay_to, ngay_cap1,
        dia_chi_ct, sodaidien, dienthoai_lh, ma_cq, ten_tt, donv_ql_id, nguoidaidien, phuongtt_id, sonhact_id, email,
        ma_bc, noi_cap_gt, diadiem_tt_id, tentuyen, ma_kh_cu, loaigt_id, nguoi_gioi_thieu, loaigt_id1, ngay_sinh, kh_rr,
        coquan, chuyenkhoan_id, ma_nv) {

        let data = {
            ma_tuyen: ma_tuyen,
            dangky_tv_0_1: dangky_tv,
            phoct_id: phoct_id,
            userid: user_id,
            tai_khoan: taikhoan,
            kh_lon: kh_lon,
            ghi_chu: ghi_chu,
            phuongct_id: phuongct_id,
            ma_qhns: ma_qhns,
            noi_cap1: noi_cap1,
            ten_nv: ten_nv,
            ngan_hang_id: nganhang_id,
            ky_ten: ky_ten,
            quantt_id: quantt_id,
            dangky_db_0_1: dangky_db,
            loai_kh: loai_kh,
            donv_ql_tb: dvi_ql_tb,
            sonha_tt: sonha_tt,
            ip: ip,
            nganhnghe: nganhnghe,
            so_giay_to1: so_giay_to1,
            phott_id: phott_id,
            uutien: uutien,
            ly_do_anh: lydo_anh,
            ngay_cap_giay_to: ngay_cap_gt,
            dia_chi_tt: diachi_tt,
            quanct_id: quanct_id,
            ma_tinh: ma_tinh,
            gender: gender,
            ma_kh: ma_kh,
            ms_thue: ms_thue,
            so_giay_to: so_giay_to,
            ngay_cap1: ngay_cap1,
            dia_chi_ct: dia_chi_ct,
            sodaidien: sodaidien,
            dienthoai_lh: dienthoai_lh,
            ma_cq: ma_cq,
            ten_tt: ten_tt,
            donv_ql_id: donv_ql_id,
            nguoidaidien: nguoidaidien,
            phuongtt_id: phuongtt_id,
            sonhact_id: sonhact_id,
            email: email,
            ma_bc: ma_bc,
            noi_cap_giay_to: noi_cap_gt,
            diadiem_tt_id: diadiem_tt_id,
            ten_tuyen: tentuyen,
            ma_kh_cu: ma_kh_cu,
            loaigt_id: loaigt_id,
            nguoi_gioi_thieu: nguoi_gioi_thieu,
            loaigt_id1: loaigt_id1,
            ngay_sinh: ngay_sinh,
            kh_rr: kh_rr,
            coquan: coquan,
            chuyen_khoan_id: chuyenkhoan_id,
            ma_nv: ma_nv
        }

        let response = await context.$root.context.post(`/ccbs/executor/ts_hoanthien_hd_cn_kh`, data)
        return response.data
    }
}
