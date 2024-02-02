// khai báo 1 store
import { actions } from './actions'
// import { getters } from './getters'
import { mutations } from './mutations'
//vue2-vite-starter/node_modules/gmap-vue/dist/components/autocomplete-input.vue
const state = {
  user_ca_infor: {},
  matkhau_smca: "",
  dulieu_smca: {}
}

export const KySmartCA = {
  state,
  actions,
  mutations
}
