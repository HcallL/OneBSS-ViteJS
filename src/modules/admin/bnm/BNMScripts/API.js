export default {
  GetListProvince: async (axios, data) => axios.get('/tichhop/bnm/GetListProvince'),
  GetListConfig: async (axios, data) => axios.get('tichhop/bnm/GetListConfig'),
  GetListVendor: async (axios, data) => axios.get('/tichhop/bnm/GetListVendor'),
  GetListService: async (axios, data) => axios.get('/tichhop/bnm/GetListService'),
  GetListScriptTempBNM: async (axios, data) => axios.get(`/tichhop/bnm/GetListScriptTempBNM?province_id=${data.province_id}&vendor_id=${data.vendor_id}&service_id=${data.service_id}&config_type=${data.config_type}`),

}