export default {
  GetListProvince: async (axios, data) => axios.get('/tichhop/bnm/GetListProvince'),
  GetListConfig: async (axios, data) => axios.get('tichhop/bnm/GetListConfig'),
  GetListVendor: async (axios, data) => axios.get('/tichhop/bnm/GetListVendor'),
  GetListService: async (axios, data) => axios.get('/tichhop/bnm/GetListService'),
  GetListLogUpdateScript: async (axios, data) => axios.get(`/tichhop/bnm/GetListLogUpdateScript?province_id=${data.province_id}&vendor_id=${data.vendor_id}&service_id=${data.service_id}&config_type=${data.config_type}`),
  GetDetailLogUpdateScript: async (axios, data) => axios.get(`/tichhop/bnm/GetDetailLogUpdateScript?province_id=${data.province_id}&vendor_id=${data.vendor_id}&service_id=${data.service_id}&config_type=${data.config_type}`),
  GetListMessageQueue: async (axios, data) => axios.get(`/tichhop/bnm/GetListMessageQueue?id_kich_ban=${data.id_kich_ban}`),
  GetDetailMessageQueue: async (axios, data) => axios.get(`/tichhop/bnm/GetDetailMessageQueue?id_request=${data.id_request}`),
}