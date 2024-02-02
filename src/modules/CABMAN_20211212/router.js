import MainLayout from "@/layouts/MainLayout";
import Home from "./Home";
import DSThueBaoChoNhapCap from "./DSThueBaoChoNhapCap";
import TraCuuThueBaoChuaNhapCap from "./TraCuuThueBaoChuaNhapCap";
import TuyenCot from "./TuyenCot";
import QuanLyTaiSan from "./QuanLyTaiSan";
import TraCuuKetCuoiChuaPhanNhanVien from "./TraCuuKetCuoiChuaPhanNhanVien";
import DanhSachCotCap from "./DanhSachCotCap";
import TraCuuDanDoTruyenDanTheoMaFOS from "./TraCuuDanDoTruyenDanTheoMaFOS";
import DauNoiThueBao from "./DauNoiThueBao";
import BanDoMatDoPhanTuDanCu from "./BanDoMatDoPhanTuDanCu";
import DanhSachCapKetCuoi from "./DanhSachCapKetCuoi";
import DuAn from "./DuAn";
import PhanKetCuoiChoNhanVien from "./PhanKetCuoiChoNhanVien";
import PhanKCChoNVQLBangFile from "./PhanKCChoNVQLBangFile";
import CaiDatGiaoDien from "./CaiDatGiaoDien";
import BanDoTuyenCot from "./BanDoTuyenCot";
import KhoangCachHaiCot from "./BanDoTuyenCot/KhoangCachHaiCot";
import DanhSachCot from "./BanDoTuyenCot/DanhSachCot";
import BanDoMangCap from "./BanDoMangCap";
import DauNoiThueBaoTuyenCapTheoFile from "./DauNoiThueBaoTuyenCapTheoFile";
import NhapCapTrungGianChoThueBaoTSL from "./nhap-captrunggian-cho-thuebaotsl";
import CapNhatToaDoThueBao from "./CapNhatToaDoThueBao";
import TraCuuDoTruyenDanTheoThietBi from "./TraCuuDoTruyenDanTheoThietBi";
import BanDoTuyenCong from "./BanDoTuyenCong";
import TestPdf from "./test-pdf";
import QuanLyHoSoDauChuyen from "./quanly-hoso-dauchuyen";
import VeSoDoTruyenDan from "./VeSoDoMangTruyenDan";
import XetDuyetPhanTuMangHoDanThuThap from "./XetDuyetPhanTuMangHoDanThuThap";
import danhSachDoanCong from "./danhsach-doancong";
import DauNoiCap from "./DauNoiCap";
import danhSachBeCap from "./danhsach-becap";
import nhapCotDoanCongBeCapTheoFile from "./nhap-cot-doancong-becap-theofile";
import suaCotDoanCongBeCapTheoFile from "./sua-cot-doancong-becap-theofile";
import GanNhanVienQLCap from "./gan-nhanvien-quanly-cap";
import QuanLyCapReNhanh from "./QuanLyCapReNhanh";
import TuyenCongBe from "./TuyenCongBe";
import DaunoiThietbi from "./daunoi-thietbi";
import ChonDSKetCuoi from "./chon-danhsach-ketcuoi";
import TraCuuThueBaoTheoCap from "./tracuu-thuebao-theo-cap";
import TraCuuThueBaoTheoKetCuoi from "./tracuu-thuebao-theo-ketcuoi";
import NhapDuanTaiSanTheoFile from "./nhap-duan-taisan-theofile";
import CapNhatDuAnTaiSanTheoFile from "./capnhat-duan-taisan-theofile";
import QuanLyViPhamCSHT from "./QuanLyViPhamCSHT";
import TuyenCapTruyenDan from "./TuyenCapTruyenDan";
import suaCapKetCuoiTheoFile from "./sua-cap-ketcuoi-theofile";
import quanLyMangTruyenDan from "./QuanLyMangTruyenDan";
import GhiChuCongODF from "./GhiChuCongODF";
import ThongTinToaNha from "./ThongTinToaNha";
import DauNoiOdfDayNhay from "./QuanLyMangTruyenDan-Cuong/DauNoiODFDayNhay";
import ChonDoiTuongDich from "./QuanLyMangTruyenDan-Cuong/ChonDoiTuongDich";
import QLCap from './QLCap'
import quanLyMangTruyenDanHieuTest from "./QuanLyMangTruyenDan-Hieu"
import QuanLyTramThietBi from './QuanLyMangTruyenDan-Cuong/QuanLyTramThietBi'
import BanDoToaDo from './QuanLyMangTruyenDan-Cuong/BanDoToaDo'
import quanLyMangTruyenDanMinhTest from "./QuanLyMangTruyenDan-Minh/daunoi-thietbi"
import DauNoiOdf from './daunoiodf/index'
import DauNoiPhienDoc from './DauNoiPhienDoc'
import DanhMucTruyenDan from './DanhMucTuyenTruyenDan'
// import NhapCapKetCuoiTheoFile from './NhapCapKetCuoiTheoFile'
import QuanLyMangTruyenDanTrucTest from './QuanLyMangTruyenDan-Truc'
import PhanViTriKetCuoiChoNhienVien from './PhanViTriKetCuoiChoNhanVien'
import NhapCapKetCuoiTheoFile from './nhap-cap-ketcuoi-theofile'
export default [
  {
    path: "/cabman",
    name: "cabman",
    component: MainLayout,
    redirect: "/cabman/home",
    children: [
      {
        path: "home",
        name: "CABMAN home page",
        component: Home,
        meta: {
          title: "Trang chủ"
        }
      },
      {
        path: "test-pdf",
        component: TestPdf,
        meta: {
          title: "Thử nghiệm dùng PDF"
        }
      },
      {
        path: "danhsach-thuebao-cho-nhap-cap",
        name: "DSThueBaoChoNhapCap",
        component: DSThueBaoChoNhapCap,
        meta: {
          title: "DANH SÁCH THUÊ BAO CHỜ NHẬP CÁP"
        }
      },
      {
        path: "tracuu-thuebao-chua-nhapcap",
        name: "TraCuuThueBaoChuaNhapCap",
        component: TraCuuThueBaoChuaNhapCap,
        meta: {
          title:
            "Tra cứu danh sách các thuê bao chưa nhập cáp/cáp chưa phân tổ quản lý"
        }
      },
      {
        path: "tuyencot",
        name: "tuyencot",
        component: TuyenCot,
        meta: {
          title: "Quản lý tuyến cột"
        }
      },
      {
        path: "quanly-taisan",
        name: "QuanLyTaiSan",
        component: QuanLyTaiSan,
        meta: {
          title: "Tiếp nhận yêu cầu khoá máy cố định"
        }
      },
      {
        path: "tracuu-ketcuoi-chuaphan-nhanvien",
        name: "TraCuuKetCuoiChuaPhanNhanVien",
        component: TraCuuKetCuoiChuaPhanNhanVien,
        meta: {
          title: "Tra cứu kết cuối chưa phân nhân viên"
        }
      },
      {
        path: "danhsach-cot-cap",
        name: "DanhSachCotCap",
        component: DanhSachCotCap,
        meta: {
          title: "Tra cứu thông tin cột cáp"
        }
      },
      {
        path: "tra-cuu-dan-do-truyen-dan-theo-maFOS",
        name: "TraCuuDanDoTruyenDanTheoMaFOS",
        component: TraCuuDanDoTruyenDanTheoMaFOS,
        meta: {
          title: "Tra cứu dẫn độ truyền dẫn theo mã FOS"
        }
      },
      {
        path: "dau-noi-thue-bao-vao-tuyen-cap",
        name: "DauNoiThueBao",
        component: DauNoiThueBao,
        meta: {
          title: "Đấu nối thuê bao vào tuyến cáp"
        }
      },
      {
        path: "bando-matdo-phantu-dancu",
        name: "BanDoMatDoPhanTuDanCu",
        component: BanDoMatDoPhanTuDanCu,
        meta: {
          title: "PHÂN TÍCH THÔNG TIN CẢNH BÁO & DỰ BÁO"
        }
      },
      {
        path: "danhsach-cap-ketcuoi",
        name: "DanhSachCapKetCuoi",
        component: DanhSachCapKetCuoi,
        meta: {
          title: "Tra cứu đối tượng mạng ngoại vi"
        }
      },
      {
        path: "du-an",
        name: "DuAn",
        component: DuAn,
        meta: {
          title: "Quản lý dự án"
        }
      },
      {
        path: "phan-ketcuoi-cho-nhanvien",
        name: "PhanKetCuoiChoNhanVien",
        component: PhanKetCuoiChoNhanVien,
        meta: {
          title: "Phân kết cuối cho nhân viên"
        }
      },
      {
        path: "phan-ketcuoi-cho-nhanvien-bang-file",
        name: "PhanKCChoNVQLBangFile",
        component: PhanKCChoNVQLBangFile,
        meta: {
          title: "Phân kết cuối cho nhân viên bằng file"
        }
      },
      {
        path: "caidat-giaodien",
        name: "CaiDatGiaoDien",
        component: CaiDatGiaoDien,
        meta: {
          title: "QUẢN LÝ ĐỐI TƯỢNG THUỘC TÍNH"
        }
      },
      {
        path: "giando-tuyencot",
        name: "BanDoTuyenCot",
        component: BanDoTuyenCot,
        meta: {
          title: "Giản đồ tuyến cột"
        }
      },

      {
        path: "ban-do-mang-cap",
        name: "BanDoMangCap",
        component: BanDoMangCap,
        meta: {
          title: "GIẢN ĐỒ MẠNG CÁP"
        }
      },
      {
        path: "khoangcach-haicot",
        name: "KhoangCachHaiCot",
        component: KhoangCachHaiCot,
        meta: {
          title: "Khoảng cách giữa 2 cột liền kề"
        }
      },
      {
        path: "thongtin-cotcap",
        name: "DanhSachCot",
        component: DanhSachCot,
        meta: {
          title: "Tra cứu thông tin cột cáp"
        }
      },
      {
        path: "daunoi-thuebao-tuyencap-theofile",
        name: "DauNoiThueBaoTuyenCapTheoFile",
        component: DauNoiThueBaoTuyenCapTheoFile,
        meta: {
          title: "ĐẤU NỐI THUÊ BAO VÀO TUYẾN CÁP THEO FILE"
        }
      },
      {
        path: "nhap-captrunggian-cho-thuebaotsl",
        name: "NhapCapTrungGianChoThueBaoTSL",
        component: NhapCapTrungGianChoThueBaoTSL,
        meta: {
          title: "Nhập cáp trung gian"
        }
      },
      {
        path: "cap-nhat-toa-do-thue-bao",
        name: "CapNhatToaDoThueBao",
        component: CapNhatToaDoThueBao,
        meta: {
          title: "Bản đồ thuê bao"
        }
      },
      {
        path: "tra-cuu-dan-do-truyen-dan-theo-thiet-bi",
        name: "TraCuuDoTruyenDanTheoThietBi",
        component: TraCuuDoTruyenDanTheoThietBi,
        meta: {
          title: "Dẫn độ cáp truyền dẫn"
        }
      },
      {
        path: "ban-do-tuyen-cong",
        name: "BanDoTuyenCong",
        component: BanDoTuyenCong,
        meta: {
          title: "GIẢN ĐỒ TUYẾN CỐNG - BỂ"
        }
      },
      {
        path: "quanly-hoso-dauchuyen",
        name: "QuanLyHoSoDauChuyen",
        component: QuanLyHoSoDauChuyen,
        meta: {
          title: "QUẢN LÝ HỒ SƠ ĐẤU CHUYỂN 2"
        }
      },
      {
        path: "ve-so-do-truyen-dan",
        name: "VeSoDoTruyenDan",
        component: VeSoDoTruyenDan,
        meta: {
          title: "VẼ SƠ ĐỒ MẠNG TRUYỀN DẪN"
        }
      },
      {
        path: "xetduyet-phantu-mang-hodan-thuthap",
        name: "XetDuyetPhanTuMangHoDanThuThap",
        component: XetDuyetPhanTuMangHoDanThuThap,
        meta: {
          title: "DUYỆT PHẦN TỬ MẠNG/HỘ DÂN THU THẬP"
        }
      },
      {
        path: "danhsach-doancong",
        name: "danhSachDoanCong",
        component: danhSachDoanCong,
        meta: {
          title: "Tra cứu thông tin đoạn cống cáp"
        }
      },
      {
        path: "daunoi-cap",
        name: "DauNoiCap",
        component: DauNoiCap,
        meta: {
          title: "Đấu nối cáp"
        }
      },
      {
        path: "danhsach-becap",
        name: "danhSachBeCap",
        component: danhSachBeCap,
        meta: {
          title: "Danh sách bể cáp"
        }
      },
      {
        path: "nhap-cot-doancong-becap-theofile",
        name: "nhapCotDoanCongBeCapTheoFile",
        component: nhapCotDoanCongBeCapTheoFile,
        meta: {
          title: "Nhập cột, bể cáp, đoạn cống theo file"
        }
      },
      {
        path: "sua-cot-doancong-becap-theofile",
        name: "suaCotDoanCongBeCapTheoFile",
        component: suaCotDoanCongBeCapTheoFile,
        meta: {
          title: "Sửa cột, bể cáp, đoạn cống theo file"
        }
      },
      {
        path: "gan-nhanvien-quanly-cap",
        name: "GanNhanVienQLCap",
        component: GanNhanVienQLCap,
        meta: {
          title: "Gán nhân viên quản lý cáp"
        }
      },
      {
        path: "quanly-cap-re-nhanh",
        name: "QuanLyCapReNhanh",
        component: QuanLyCapReNhanh,
        meta: {
          title: "Quản lý cáp rẽ nhánh (Mid-Span)"
        }
      },
      {
        path: "tuyen-cong-be",
        name: "TuyenCongBe",
        component: TuyenCongBe,
        meta: {
          title: "Quản lý tuyến cống bể"
        }
      },
      {
        path: "daunoi-thietbi",
        name: "DaunoiThietbi",
        component: DaunoiThietbi,
        meta: {
          title: "Đấu nối thiết bị"
        }
      },
      {
        path: "chon-danhsach-ketcuoi",
        name: "ChonDSKetCuoi",
        component: ChonDSKetCuoi,
        meta: {
          title: "Chọn danh sách đã đấu cáp"
        }
      },
      {
        path: "tracuu-thuebao-theo-cap",
        name: "TraCuuThueBaoTheoCap",
        component: TraCuuThueBaoTheoCap,
        meta: {
          title: "Tra cứu thuê bao theo cáp"
        }
      },
      {
        path: "tracuu-thuebao-theo-ketcuoi",
        name: "TraCuuThueBaoTheoKetCuoi",
        component: TraCuuThueBaoTheoKetCuoi,
        meta: {
          title: "Tra cứu thuê bao theo kết cuối"
        }
      },
      {
        path: "nhap-duan-taisan-theofile",
        name: "NhapDuanTaiSanTheoFile",
        component: NhapDuanTaiSanTheoFile,
        meta: {
          title: "Nhập tài sản, dự án từ file"
        }
      },
      {
        path: "capnhat-duan-taisan-theofile",
        name: "CapNhatDuAnTaiSanTheoFile",
        component: CapNhatDuAnTaiSanTheoFile,
        meta: {
          title: "Sửa tài sản, dự án từ file"
        }
      },
      {
        path: "quanly-vipham-csht",
        name: "QuanLyViPhamCSHT",
        component: QuanLyViPhamCSHT,
        meta: {
          title: "Quản lý vi phạm cơ sở hạ tầng"
        }
      },
      {
        path: "tuyencap-truyendan",
        name: "TuyenCapTruyenDan",
        component: TuyenCapTruyenDan,
        meta: {
          title: "Quản lý tuyến cáp truyền dẫn"
        }
      },
      {
        path: "sua-cap-ketcuoi-theofile",
        name: "suaCapKetCuoiTheoFile",
        component: suaCapKetCuoiTheoFile,
        meta: {
          title: "Sửa cáp, kết cuối theo file"
        }
      },
      {
        path: "quan-ly-mang-truyen-dan",
        name: "QuanLyMangTruyenDan",
        component: quanLyMangTruyenDan,
        meta: {
          title: "Quản lý mạng truyền dẫn"
        }
      },
      {
        path: "ghichu-cong-odf",
        name: "GhiChuCongODF",
        component: GhiChuCongODF,
        meta: {
          title: "Ghi chú cổng ODF"
        }
      },
      {
        path: "thongtin-toanha",
        name: "ThongTinToaNha",
        component: ThongTinToaNha,
        meta: {
          title: "Thông tin tòa nhà"
        }
      },
      {
        path: "daunoi-odf-daynhay",
        name: "DauNoiOdfDayNhay",
        component: DauNoiOdfDayNhay,
        meta: {
          title: "Đấu nối ODF - Tab Dây nhảy"
        }
      },
      {
        path: "chon-doituong-dich",
        name: "ChonDoiTuongDich",
        component: ChonDoiTuongDich,
        meta: {
          title: "Chọn đối tượng đích"
        }
      },
      {
        path: 'quanly-mang-truyendan/quanly-cap',
        name: 'QuanLyCap',
        component: QLCap,
        meta: {
          title: 'Quản Lý Cáp'
        }
      },
      {
        path: "qlmtd-hieu-test",
        name: "quanLyMangTruyenDanHieuTest",
        component: quanLyMangTruyenDanHieuTest,
        meta: {
          title: "Quản lý mạng truyền dẫn Hiếu test"
        }
      },
      {
        path: 'quanly-tram-thietbi',
        name: 'QuanLyTramThietBi',
        component: QuanLyTramThietBi,
        meta: {
          title: 'Đọc file khoá mở thuê bao'
        }
      },
      {
        path: "bando-toado",
        name: "BanDoToaDo",
        component: BanDoToaDo,
        meta: {
          title: "Bản đồ tọa độ"
        }
      },
      {
        path: "qlmtd-minh-test",
        name: "quanLyMangTruyenDanMinhTest",
        component: quanLyMangTruyenDanMinhTest,
        meta: {
          title: "Quản lý mạng truyền dẫn Minh test"
        }
      },
      {
        path: "daunoi-odf",
        name: "DauNoiOdf",
        component: DauNoiOdf,
        meta: {
          title: "Đấu nối ODF"
        }
      },
      {
        path: "daunoi-phiendoc",
        name: "DauNoiPhienDoc",
        component: DauNoiPhienDoc,
        meta: {
          title: "Đấu nối phiến dọc"
        }
      },
      {
        path: "danh-muc-truyen-dan",
        name: "DanhMucTruyenDan",
        component: DanhMucTruyenDan,
        meta: {
          title: "Danh mục truyền dẫn"
        }
      },
      {
        path: "nhapcap-ketcuoi-theofile",
        name: "NhapCapKetCuoiTheoFile",
        component: NhapCapKetCuoiTheoFile,
        meta: {
          title: "Nhập cáp, kết cuối theo file"
        }
      },
      {
        path: "quan-ly-mang-truyen-dan-truc",
        name: "QuanLyMangTruyenDan",
        component: QuanLyMangTruyenDanTrucTest,
        meta: {
          title: "Quản lý mạng truyền dẫn trực test"
        }
      },
      {
        path: "phan-vitri-ketcuoi-cho-nhanvien",
        name: "PhanViTriKetCuoiChoNhienVien",
        component: PhanViTriKetCuoiChoNhienVien,
        meta: {
          title: "Phân vị trí kết cuối cho nhân viên"
        }
      },
    ]
  }
];
