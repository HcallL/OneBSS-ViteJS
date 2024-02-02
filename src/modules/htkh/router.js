
import LayoutMain from '@/layouts/LayoutMain'
export default [
  {
    path: '/htkh',
    name: 'htkh',
    component: LayoutMain,
    children: [
      //Mẫu route con
      // {
      //   path: 'inphieuchi',
      //   name: 'inphieuchi',
      //   meta: {
      //     title: '[UR2.2.005] - In phiếu chi'
      //   },
      //   component: () => import('./InPhieuChi/index.js')
      // },
      {
        path:'SurveyConcentrateCustomer',
        name: 'SurveyConcentrateCustomer',
        component: () => import('./SurveyConcentrateCustomer'),
        meta: {
          title:'BSS-79914 - Khảo sát khách hàng tập trung'
        }
      },
      {
        path: "ReceivingCallsSwitchboard",
        name: "ReceivingCallsSwitchboard",
        meta: {
          title: "[UR2.1.006] - Tiếp nhận yêu cầu tập trung"
        },
        component: () => import("./ReceivingCallsSwitchboard/index.js")
      },
      {
        path:'ManagementDamageInventory',
        name: 'ManagementDamageInventory',
        component: () => import('./ManagementDamageInventory'),
        meta: {
          title:'Phiếu tồn báo hỏng'
        }
      },
      {
        path:'Order',
        name: 'Order',
        component: () => import('./Order/Order.vue'),
        meta: {
          title:'BSS-80627 - Đơn hàng'
        }
      },
      {
        path:'LockIncidentReportProactive',
        name: 'LockIncidentReportProactive',
        component: () => import('./LockIncidentReportProactive/LockIncidentReportProactive.vue'),
        meta: {
          title:'BSS-- Khoá phiếu chủ động'
        }
      },
      {
        path:'ListConcentrateSurveyQuestionnaire',
        name: 'ListConcentrateSurveyQuestionnaire',
        component: () => import('./ListConcentrateSurveyQuestionnaire'),
        meta: {
          title:'Danh sách phiếu khảo sát tập trung'
        }
      },
      {
				path: 'TiepNhanDonHang',
				name: 'TiepNhanDonHang',
				component: () => import('./TiepNhanDonHang'),
				meta: {
					title: 'Tiếp nhận đơn hàng'
				}
			},
      {
        path: 'DivideOrdersRequest',
        name: 'DivideOrdersRequest',
        meta: { title: '[UR2.3.013] - Phân chia đơn  hàng' },
        component: () => import('./DivideOrdersRequest/index.js')
      },
      {
        path: 'ManagementOrderInventory',
        name: 'ManagementOrderInventory',
        meta: { title: 'Quản lý đơn  hàng' },
        component: () => import('./ManagementOrderInventory/index.js')
      },
      {
        path: 'ManagementIncidentInventory',
        name: 'ManagementIncidentInventory',
        meta: { title: 'Quản lý tồn báo hỏng' },
        component: () => import('./ManagementIncidentInventory/index.js')
      },
	  {
        path:'KiemSoatTonKhieuNai',
        name: 'KiemSoatTonKhieuNai',
        component: () => import('./KiemSoatTonKhieuNai'),
        meta: {
          title:'Kiểm soát tồn khiếu nại'
        }
      },
    ]
  }
]