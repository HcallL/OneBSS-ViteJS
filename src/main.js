// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// bootstrap vue
import bootstrapVuePlugin from './plugins/bootstrapVuePlugin'
// toast notification
import toastPlugin from './plugins/toastPlugin'
// axios
import VueAxios from 'vue-axios'
import axiosPlugin from './plugins/axiosPlugin'
import flatPickerPlugin from './plugins/flatPickerPlugin'
import VueSplit from 'vue-split-panel'
import moment from 'moment'
import JsonExcel from 'vue-json-excel'

import Select2 from 'v-select2-component'
import bssApiCaller from './utils/apiCaller'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import vueNumericPlugin from './plugins/vueNumericPlugin'
import Auth from './plugins/auth'

import BssDatePicker from './components/BssDatePicker'
import BssPagination from './components/BssPagination'
import BssLocalPagination from './components/BssLocalPagination'

import DataGrid from './components/Controls/DataGrid'
import DataGrid2 from './components/Controls/DataGrid2'
import DataGrid3 from './components/Controls/DataGrid3'
import SelectExt from './components/Controls/SelectExt'
import ComboboxGrid from './components/Controls/ComboboxGrid'
import requestContext from './utils/RequestContext'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale/lang/vi'
import TableC from './modules/QLTN/components/TableC'

// store
import { store } from './store'
// filters
import { currency } from './filters/currency'
import { numeral } from './filters/numeral'

import { loadCldr, setCulture, L10n } from '@syncfusion/ej2-base'
import 'vue2-datepicker/index.css'
import VueElement from '@/modules/contract/setup/DeclareLandline/components/VueElement.vue'
// require('erp-ui-element')

import ErpUI from 'erp-ui-element'
//global component
//import './modules/search/subscriber/components/register.js'

Vue.config.productionTip = false

import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json'
import * as gregorian from 'cldr-data/main/vi/ca-gregorian.json'
import * as numbers from 'cldr-data/main/vi/numbers.json'
import * as timeZoneNames from 'cldr-data/main/vi/timeZoneNames.json'

loadCldr(
  numberingSystems,
  gregorian,
  numbers,
  timeZoneNames
  //require('cldr-data/supplemental/weekdata.json')
) // To load the culture based first day of week

// loadCldr(
//   require('cldr-data/supplemental/numberingSystems.json'),
//   require('cldr-data/main/vi/ca-gregorian.json'),
//   require('cldr-data/main/vi/numbers.json'),
//   require('cldr-data/main/vi/timeZoneNames.json')
//   //require('cldr-data/supplemental/weekdata.json')
// ) // To load the culture based first day of week

setCulture('vi')

L10n.load({
  vi: {
    grid: {
      EmptyRecord: 'Không có dữ liệu để hiển thị',
      GroupDropArea: 'Vùng kéo thả các cột để gộp nhóm',
      UnGroup: 'Hủy gộp nhóm',
      SaveButton: 'Lưu',
      CancelButton: 'Hủy'
    },
    dropdowns: {
      noRecordsTemplate: 'Không có dữ liệu để chọn'
    },
    listbox: {
      noRecordsTemplate: ''
    }
  }
})

import { GridPlugin } from '@syncfusion/ej2-vue-grids'
import { DropDownTreePlugin, AutoCompletePlugin, DropDownListPlugin, ComboBoxPlugin, MultiSelectPlugin, ListBoxPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { TreeGridPlugin } from '@syncfusion/ej2-vue-treegrid'
import { TreeViewPlugin } from '@syncfusion/ej2-vue-navigations'
import { SplitterPlugin } from '@syncfusion/ej2-vue-layouts'
import { CheckBoxPlugin } from '@syncfusion/ej2-vue-buttons'
import { MapsPlugin, MapsComponent } from '@syncfusion/ej2-vue-maps'
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams'
import { TooltipPlugin, DialogPlugin } from '@syncfusion/ej2-vue-popups'
// import {ListViewPlugin } from '@syncfusion/ej2-vue-lists'
import { TextBoxPlugin, TextBoxComponent, NumericTextBoxPlugin, MaskedTextBoxPlugin } from '@syncfusion/ej2-vue-inputs'

import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars'
import * as VueGoogleMaps from 'gmap-vue'
// import Vuelidate from 'vuelidate'
// import { VuelidatePlugin } from '@vuelidate/core'
import constsPlugin from './plugins/consts'

Vue.use(DatePickerPlugin)
Vue.component(MapsPlugin.name, MapsComponent)
Vue.use(MapsPlugin)
Vue.use(GridPlugin)
Vue.use(DropDownTreePlugin)
Vue.use(TreeGridPlugin)
Vue.use(TreeViewPlugin)
Vue.use(AutoCompletePlugin)
Vue.use(DropDownListPlugin)
Vue.use(ComboBoxPlugin)
Vue.use(SplitterPlugin)
Vue.use(MultiSelectPlugin)
Vue.use(CheckBoxPlugin)
Vue.use(TooltipPlugin)
Vue.use(TextBoxPlugin)
Vue.use(NumericTextBoxPlugin)
Vue.use(DialogPlugin)
// register plugin
Vue.use(VueSplit)
Vue.use(ErpUI)
Vue.use(Auth)
Vue.use(toastPlugin)
Vue.use(VueAxios, axiosPlugin)
Vue.use(bootstrapVuePlugin)
Vue.use(flatPickerPlugin)
Vue.use(vueNumericPlugin)
Vue.use(ElementUI, { locale })
// Vue.use(VuelidatePlugin)
Vue.use(DiagramPlugin)
Vue.use(ListBoxPlugin)
Vue.use(MaskedTextBoxPlugin)
Vue.use(constsPlugin)

Vue.component('treeselect', Treeselect)
Vue.component('bss-date-picker', BssDatePicker)
Vue.component('bss-pagination', BssPagination)
Vue.component('bss-local-pagination', BssLocalPagination)
Vue.component('downloadExcel', JsonExcel)
Vue.component('DataGrid', DataGrid)
Vue.component('DataGrid2', DataGrid2)
Vue.component('DataGrid3', DataGrid3)
Vue.component('ComboboxGrid', ComboboxGrid)
// Vue.component('downloadExcel', JsonExcel)
Vue.component('Select2', SelectExt)
Vue.component('SelectExt', SelectExt)
Vue.component('table-c', TableC)
Vue.component('DataGrid3', DataGrid3)
Vue.component('DataGrid2', DataGrid2)

// register filter
Vue.filter('currency', currency)
Vue.filter('numeral', numeral)
Vue.component('vue-element', VueElement)

//multiselect
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
Vue.component('multiselect', Multiselect)
Vue.use(VueSplit)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBgZ1_U_7ju6PC-4aYULJN3Mexa6kkiE9Q',
    libraries: 'places',
    region: 'VI',
    language: 'vi'
  },
  installComponents: true
});

//Ẩn thông báo của google map khi key hết lượt request
const appendChild = Element.prototype.appendChild;
const urlCatchers = [
  "/AuthenticationService.Authenticate?",
  "/QuotaService.RecordEvent?"
];
Element.prototype.appendChild = function (element) {
  const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
  const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));
  if (!isGMapAccessScript)
    return appendChild.call(this, element);
  return element;
};

Vue.prototype.loading = function(type) {
  if (type) {
    $('.overlay-common').addClass('show')
  } else {
    $('.overlay-common').removeClass('show')
  }
}

Vue.prototype.$bssApiCaller = bssApiCaller
Vue.prototype.$requestContext = requestContext

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    // setCulture('vi')
  },
  data: {
    context: {
      get: async function(url, params) {
        return await requestContext.get(url, params)
      },
      post: async function(url, data) {
        return await requestContext.post(url, data)
      },
      getWithOutToken: async function(url, params) {
        return await requestContext.getWithOutToken(url, params)
      },
      postWithOutToken: async function(url, data) {
        return await requestContext.postWithOutToken(url, data)
      },
      viewImageUrl: function(url, module) {
        return requestContext.viewImageUrl(url, module)
      },
      getMenu: function() {
        return Vue.auth.getMenuFromStorage()
      },
      getMenuItemParents: function(parentID, menuItems) {
        return Vue.auth.getMenuItemParents(parentID, menuItems)
      },
      getMenuItem: function(url) {
        return Vue.auth.getMenuItem(url)
      },
      getMenuPath: function(url) {
        return Vue.auth.getMenuPath(url)
      },
      getHref: function(args) {
        if (args == null) return 'javascript:void(0)'
        else if (args.indexOf('tag=') >= 0) return args.substring(0, args.indexOf('tag=') + 4) + encodeURIComponent(args.substring(args.indexOf('tag=') + 4))
        else return args
      },
      isAuthenticated: function() {
        return Vue.auth.isAuthenticated()
      },
      authenticate: function(stringToken) {
        Vue.auth.authenticate(stringToken)
      },
      configApplication: function(menuItems, clientInfo) {
        Vue.auth.saveMenuToStorage(menuItems)
        Vue.auth.saveClientInfoToStorage(clientInfo)
      },
      logOut: function() {
        Vue.auth.destroy()
      },
      user: {
        getTenNhanVien: function() {
          return Vue.auth.getClientInfoProperty('ten_nv')
        },
        getTenDonVi: function() {
          return Vue.auth.getClientInfoProperty('ten_dv')
        },
        getSoDienThoai: function() {
          return Vue.auth.getClientInfoProperty('so_dt')
        },
        getMapConfigDefault: function() {
          return {
            zoom: Vue.auth.getClientInfoProperty('default_zoom'),
            longtitus: Vue.auth.getClientInfoProperty('longtitus'),
            latitus: Vue.auth.getClientInfoProperty('latitus')
          }
        },
        getProperty: function(name) {
          return Vue.auth.getClientInfoProperty(name)
        }
      }
    },
    token: {
      getMaTinh: function() {
        return Vue.auth.getMaTinh()
      },
      getPhanVungID: function() {
        return Vue.auth.getPhanVungID()
      },
      getUserName: function() {
        return Vue.auth.getUserName()
      },
      getNhanVienID: function() {
        return Vue.auth.getNhanVienID()
      },
      getMaNhanVien: function() {
        return Vue.auth.getMaNhanVien()
      },
      getDonViID: function() {
        return Vue.auth.getDonViID()
      },
      getDonViDuLieuID: function() {
        return Vue.auth.getDonViDuLieuID()
      },
      getNguoiDungID: function() {
        return Vue.auth.getNguoiDungID()
      },
      getMaCCBS: function() {
        return Vue.auth.getMaCCBS()
      },
      getProperty: function(name) {
        return Vue.auth.getProperty(name)
      },
      getIP: function() {
        return Vue.auth.getIP()
      },
      getMachine: function() {
        return Vue.auth.getMachine()
      },
      getDsQuyenChuquan: function() {
        return Vue.auth.getDsQuyenChuquan()
      },
      getThongTinNguoiDung: function() {
        return Vue.auth.getThongTinNguoiDung()
      },
      getNgayCapNhat: function() {
        return Vue.auth.getNgayCapNhat()
      },
      getNgayCN: function() {
        return Vue.auth.getNgayCN()
      }
    }
  },

  methods: {
    showLoading: function(value) {
      if (value) {
        $('.overlay-common').addClass('show')
      } else {
        $('.overlay-common').removeClass('show')
      }
    },
    toastSuccess: function(arg) {
      this.$toast.success(arg)
    },
    toastError: function(arg) {
      this.$toast.error(arg)
    },
    toastWarning: function(arg) {
      this.$toast.warning(arg)
    },
    toastInfo: function(arg) {
      this.$toast.info(arg)
    }
  }
})
