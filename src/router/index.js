import Vue from 'vue'
import Router from 'vue-router'
import menu from '../utils/menu'
// layouts
import MainLayout from '@/layouts/MainLayout'
import BlankLayout from '@/layouts/BlankLayout'
// public page
// import Home from '@/modules/Home'
import Login from '@/modules/AUTH/Login'
// module routes
// import QLTN from '@/modules/QLTN/router.js'
// // // module OB routes
// import CSKH from '@/modules/CSKH/router.js'
// // // module QLVT routes
// import QLVT from '@/modules/QLVT/router.js'
// // // module account
// import account from '@/modules/account/router.js'
// // module admin
// import admin from '@/modules/admin/router.js'
// import vnp08 from '@/modules/vnp08/router.js'
// // // module install
// import install from '@/modules/install/router.js'
// // // module contract
// import contract from '@/modules/contract/router.js'
// // // module quantri
// import quantri from '@/modules/quantri/router.js'
// // // module search
// import search from '@/modules/search/router.js'
//
// // // module common
// import common from '@/modules/common/router.js'
// import complaint from '@/modules/complaint/router.js'
// import prepaid from '@/modules/prepaid/router.js'
// // module ECMS routes
// import ECMS from '@/modules/ECMS/router.js'
// // module CABMAN routes
// import CABMAN from '@/modules/CABMAN/router.js'
// // module QLSC routes
// import QLSC from '@/modules/QLSC/router.js'
//
// import incident from '@/modules/incident/router.js'
// import report from '@/modules/report/router.js'
// // module HOPDONG routes
// import HOPDONG from '@/modules/EXTS/HOPDONG/router.js'
// // module KHIEUNAI routes
// import KHIEUNAI from '@/modules/EXTS/KHIEUNAI/router.js'
// // module QUANTRI routes
// import QUANTRI from '@/modules/EXTS/QUANTRI/router.js'
// // module TOANHA routes
// import TOANHA from '@/modules/EXTS/TOANHA/router.js'
// // module Payment routes
// import Payment from '@/modules/Payment/router.js'
// import print from '@/modules/print/router.js'
// // module HTKH
// import htkh from '@/modules/htkh/router.js'
// //module channel
// import channel from '@/modules/channel/router.js'
import ipcc from '@/modules/ipcc/router.js'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/modules/index') //Home
        },
        {
          path: 'home1',
          name: 'Home1',
          component: () => import('@/modules/index1') //Home
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: BlankLayout,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    // ...CSKH,
    // ...QLTN,
    // ...QLVT,
    // ...ECMS,
    // ...CABMAN,
    // ...QLSC,
    // ...account,
    // ...admin,
    // ...search,
    // ...install,
    // ...contract,
    // ...admin,
    // ...quantri,
    // ...incident,
    // ...common,
    // ...complaint,
    // ...prepaid,
    // ...report,
    // ...HOPDONG,
    // ...KHIEUNAI,
    // ...QUANTRI,
    // ...TOANHA,
    // ...Payment,
    // ...print,
    // ...vnp08,
    // ...htkh,
    // ...channel,
    ...ipcc,
    /*
    {
      path: '/qltn',
      name: 'qltn',
      component: LayoutMain
    },
    */
  ]
})
// Vue Router navigation guards
router.beforeEach((to, from, next) => {
  let path = to.fullPath
  if (!menu.checkExists(to.fullPath)) {
    if (menu.checkExists(to.path)) {
      path = to.path
    }
  }
  if (to.meta.requiresAuth == undefined || to.meta.requiresAuth == null || to.meta.requiresAuth == true) {
    var menuitems = Vue.auth.getMenuFromStorage()
    //console.info('to',to,'from',from,'menus',menuitems,menuitems.find(x=>x.url && (x.url.toLowerCase()==to.fullPath.toLowerCase() || x.url.toLowerCase()=='/#'+to.fullPath.toLowerCase() || x.url.toLowerCase()=='/#/'+to.fullPath.toLowerCase())));
    if(menuitems && menuitems.length>0 && to.fullPath && to.fullPath != "/" && to.fullPath != "/#" && to.fullPath != "/#/" && !menuitems.find(x=>x.url && (decodeURIComponent(x.url.toLowerCase())==decodeURIComponent(to.fullPath.toLowerCase()) || decodeURIComponent(x.url.toLowerCase())==decodeURIComponent('/#'+to.fullPath.toLowerCase()) || decodeURIComponent(x.url.toLowerCase())==decodeURIComponent('/#/'+to.fullPath.toLowerCase())))) {
      // Vue.$toast.error("TEST (BỎ QUA): Bạn không có quyền truy cập chức năng này! Vui lòng liên hệ admin. (Chức năng sẽ khoá từ ngày 24/04/2023)");
      console.info("Bạn không có quyền truy cập chức năng này! Vui lòng liên hệ admin.",to.fullPath, decodeURIComponent(to.fullPath.toLowerCase()), decodeURIComponent('/#'+to.fullPath.toLowerCase()), JSON.stringify(menuitems),menuitems.find(x=>x.url && (decodeURIComponent(x.url.toLowerCase())==decodeURIComponent(to.fullPath.toLowerCase()) || decodeURIComponent(x.url.toLowerCase())==decodeURIComponent('/#'+to.fullPath.toLowerCase()) || decodeURIComponent(x.url.toLowerCase())==decodeURIComponent('/#/'+to.fullPath.toLowerCase()))));
      // next({ name: 'Home' });
      // return;
    }

    var d = new Date(0) // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(Vue.auth.getProperty('exp'))
    var d1 = new Date().getTime() / 1000
    if (d && d > 0 && d < d1) {
      menu.setCurrentMenuItem(0)
      menu.setCurrentPath('')
      Vue.$toast.error('Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.')
      next({ name: 'Login' })
    } else if (Vue.auth.isAuthenticated()) {
      menu.setCurrentMenuItemFromRouter(path)
      next()
    } else {
      menu.setCurrentMenuItem(0)
      menu.setCurrentPath('')
      next({ name: 'Login' })
    }
  } else {
    menu.setCurrentMenuItemFromRouter(path)
    next()
  }

  //  if (
  //    (from.name == null && from.path == "/" && from.path == to.path)
  //    || (from.path == "/report/bi" && from.path == to.path)
  //    || (to.name == "Login" && to.path == "/auth/login")
  //    || (to.name == "Home" && to.path == "/")) {
  //    next();
  //  }
  //  else {
  //    let ck = false;
  //    let path = "";
  //    if (to.meta.requiresAuth == undefined || to.meta.requiresAuth == null || to.meta.requiresAuth == true) {
  //      if (Vue.auth.isAuthenticated()) {
  //        path = to.fullPath;
  //        ck = menu.checkExists(path);
  //        if(!ck){
  //          path = to.path;
  //          ck = menu.checkExists(path);
  //        }
  //      }
  //    }
  //    else {
  //      path = to.fullPath;
  //      ck = menu.checkExists(path);
  //      if(!ck){
  //        path = to.path;
  //        ck = menu.checkExists(path);
  //      }
  //	}
  //    if (ck) {
  //      menu.setCurrentMenuItemFromRouter(path);
  //      next();
  //    }
  //    else {
  //      menu.setCurrentMenuItem(0);
  //      next({ name: 'Login' });
  //    }
  //  }
})
export default router
