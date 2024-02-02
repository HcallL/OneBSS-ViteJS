export const mutations = {
  clearState (state) {
    state.dsRack = null
  },
  setDsRack (state, dsRack) {
    state.dsRack = dsRack
  },
  setDsTTVT (state, dsTtvt) {
    state.dsTtvt = dsTtvt
  },
  setDsTaiSan (state, dsTaiSan) {
    state.dsTaiSan = dsTaiSan
  },
  setDsTaiSanTimKiem (state, dsTaiSanTimKiem) {
    state.dsTaiSanTimKiem = dsTaiSanTimKiem
  }
}
