import LayoutMain from '@/layouts/LayoutMain'

export default [
  {
    path: '/ipcc',
    name: 'ipcc',
    component: LayoutMain,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: 'Tiếp nhận cuộc gọi tổng đài'
        },
        component: () => import('./Home/index.js')
      },
    ]
  }
]
