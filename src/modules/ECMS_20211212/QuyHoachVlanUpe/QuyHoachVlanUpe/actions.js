import QuyHoachVlanUpeApi from '../QuyHoachVlanUpeApi'

export const actions = {
    createApiManager() {
    },
    async layDsQuyHoachVlanUpeAction({ commit }, data) {
        var response = await QuyHoachVlanUpeApi.layDsQuyHoachVlanUpe(this._vm.axios, data);
        try {
            commit('setDsQuyHoachVlanUpe', response.data.data);
        } catch (err) {
            throw err;
        }
        return response.data.data;
    },
  async layAllUpeAction({ commit }) {
    var response = await QuyHoachVlanUpeApi.layAllUpe(this._vm.axios);
    try {
      commit('setUpe', response.data.data);
    } catch (err) {
      throw err;
    }
    return response.data.data;
  },
    async layDsQuyHoachVlanUpeAll({ commit }) {
      var response = await QuyHoachVlanUpeApi.layDsQuyHoachVlanUpeAll(this._vm.axios);
      try {
        commit('setDsQuyHoachVlanUpe', response.data.data);
      } catch (err) {
        throw err;
      }
      return response.data.data;
    },
    async capNhatQuyHoachVlanUpe({ commit }, data) {
        try {
            var response = await QuyHoachVlanUpeApi.capNhatQuyHoachVlanUpe(this._vm.axios, data);
            return response.data.data;
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    async themMoiQuyHoachVlanUpe({ commit }, data) {
        try {
            var response = await QuyHoachVlanUpeApi.themMoiQuyHoachVlanUpe(this._vm.axios, data);
            return response.data.data;
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    async setUpe({ commit }, data) {
        try {
            commit('setUpe', data)
        } catch (err) {
            throw err
        }
    },
    async xoaQuyHoachVlanUpe({ commit }, data) {
        try {
            await QuyHoachVlanUpeApi.xoaQuyHoachVlanUpe(this._vm.axios, data);
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    clearState({ commit }) {
        console.log("clear")
        commit('clearState')
    }
}
