// các hàm dùng để gọi API, gọi hàm khác trong mutations để thay đổi state của của đối tượng trong store
import api from '@/modules/admin/category/ContractorRole/api'

export const actions = {
  async layDanhSachVaiTro ({commit, state}, postData) {
    commit('SET_IS_LOADING', true)
    let response = await api.layDanhSachVaiTro(this._vm.axios, postData)
    try {
      commit('SET_IS_LOADING', false)
      commit('GET_DANH_SACH_VAI_TRO', response.data.data)
    } catch (err) {
      throw err
    }
    return response
  }
}
