
/* eslint-disable */
import { tuyenCot } from "./TuyenCot";
import { quanLyTaiSan } from "./QuanLyTaiSan";
import { danhsachCotCap } from "./../DanhSachCotCap/store";
import { daunoiThuebao } from "./../DauNoiThueBao/store";
import { BanDoMangCap } from "./../BanDoMangCap/store";
import { QuanLyMangTruyenDan } from "./../QuanLyMangTruyenDan/store";


export const cabman = {
  namespaced: true,
  modules: {
    tuyenCot,    
    quanLyTaiSan,
    danhsachCotCap,
    daunoiThuebao,
    BanDoMangCap,
    QuanLyMangTruyenDan
  }
};
