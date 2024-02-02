export default{
  getDsFileTheoMaTb: (axios, data) => axios.post(`/web-tracuu/pttb/ds_hoso_theotb`, data),
  traCuuHoSo: (axios, data) => axios.post(`/web-tracuu/pttb/tracuu_hoso`, data),
  getFileBase64: (axios, data) => axios.get(`/tichhop/util/download?fileType=base64&url=${data.dataUrl}`)
}
