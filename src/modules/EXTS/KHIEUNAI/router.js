import MainLayout from "@/layouts/MainLayout";
import Home from "./Home";
import TiepNhanKN from "./TiepNhanKN/TiepNhanKN";
import TraPhieuKN from './TraPhieuKhieuNai';
import GiaoPhieuKN from './GiaoPhieuKhieuNai';
export default [
  {
    path: "/ext-khieunai",
    name: "ext-khieunai",
    component: MainLayout,
    redirect: "/ext-khieunai/home",
    children: [
      {
        path: "home",
        name: "Khiếu nại",
        component: Home,
        meta: {
          title: "Trang chủ: Quản lý khiếu nại"
        }
      },
      {
        path: "tiep-nhan-khieu-nai",
        name: "Tiếp nhận khiếu nại",
        component: TiepNhanKN,
        meta: {
          title: "Tiếp nhận khiếu nại"
        }
      },
      {
        path: 'traphieu-khieunai',
        name: 'TraPhieuKN',
        component: TraPhieuKN,
        meta: {
          title: 'Trả phiếu khiếu nại'
        }
      },
      {
        path: 'giaophieu-khieunai',
        name: 'GiaoPhieuKN',
        component: GiaoPhieuKN,
        meta: {
          title: 'Giao phiếu xử lý khiếu nại'
        }
      },
      {
        path: 'xu-ly-khieu-nai',
        name: 'xu-ly-khieu-nai',
        component: () => import('./xu-ly-khieu-nai'),
        meta: {
          title: 'Xử lý khiếu nại'
        }
      },
      {
        path: 'nghiem-thu-khieu-nai',
        name: 'nghiem-thu-khieu-nai',
        component: () => import('./nghiem-thu-khieu-nai'),
        meta: {
          title: 'Nghiệm thu khiếu nại'
        }
      },
      {
        path: 'phong-ban-xac-minh-khieu-nai',
        name: 'phong-ban-xac-minh-khieu-nai',
        component: () => import('./phong-ban-xac-minh-khieu-nai'),
        meta: {
          title: 'Phòng ban - Xác minh khiếu nại'
        }
      },
      {
        path: 'tiepnhan-xm-khdn',
        name: 'tiepnhan-xm-khdn',
        component: () => import('./tiepnhan-xm-khdn'),
        meta: {
          title: 'Tiếp nhận - Xác minh khiếu nại KHDN'
        }
      },
      {
        path: 'xu-ly-khieu-nai-khdn',
        name: 'xu-ly-khieu-nai-khdn',
        component: () => import('./xu-ly-khieu-nai-khdn'),
        meta: {
          title: 'Xử lý khiếu nại KHDN'
        }
      },
      {
        path: 'xacminh-khdn',
        name: 'xacminh-khdn',
        component: () => import('./xacminh-khdn'),
        meta: {
          title: 'Xác minh khiếu nại KHDN'
        }
      },
      {
        path: 'nghiemthu-khdn',
        name: 'nghiemthu-khdn',
        component: () => import('./nghiemthu-khdn'),
        meta: {
          title: 'Nghiệm thu khiếu nại KHDN'
        }
      },
      {
        path: 'xu-ly-khieu-nai-net',
        name: 'xu-ly-khieu-nai-net',
        component: () => import('./xu-ly-khieu-nai-net'),
        meta: {
          title: 'Xử lý khiếu nại NET'
        }
      },
      {
        path: 'xu-ly-khieu-nai-media',
        name: 'xu-ly-khieu-nai-media',
        component: () => import('./xu-ly-khieu-nai-media'),
        meta: {
          title: 'Xử lý khiếu nại MEDIA'
        }
      },
    ]
  }
];
