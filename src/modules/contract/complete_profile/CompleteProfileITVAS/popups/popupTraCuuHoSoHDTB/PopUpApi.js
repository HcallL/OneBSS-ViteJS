
export default {
      
    lay_ds_file_hdtb_duyet_toantrinh: (axios, data) => axios.get(`/web-tracuu/tracuu-thuebao/lay_ds_file_hdtb_duyet_toantrinh/${data}`),
    lay_ds_file_hdtb_v2: (axios, data) => axios.get(`/web-tracuu/tracuu-thuebao/lay_ds_file_hdtb_v2/${data}`),
    lay_ds_hoso_ekyc: (axios, data) => axios.post('/web-hopdong/dichvu-ca/sp_ds_file_ekyc_ca', data),
    //tai_file_ekyc: (axios, data) => axios.post('/tichhop/cntt/SmartCA/DownFileEKYC', data)
    tai_file_ekyc: (axios, data) => axios.post( '/tichhop/cntt/SmartCA/DownFileEKYC_V2', data)

    // GET: web-tracuu/tracuu-thuebao/lay_ds_file_hdtb_duyet_toantrinh/1474319
    // GET: web-tracuu/tracuu-thuebao/lay_ds_file_hdtb_v2/1474319
}
