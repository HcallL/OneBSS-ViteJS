export const mutations = {
  setDsQuyHoachVlanUpe(state, data) {
    state.dsQuyHoachVlanUpe = data;
  },
  setUpe(state, data) {
    state.upe = data.map(
      (upe) => upe.DSLAM_ID + ',' + upe.TENDSLAM
    );
  },
  clearState(state) {
    state.dsQuyHoachVlanUpe = null
    state.upe = null
  }
}
