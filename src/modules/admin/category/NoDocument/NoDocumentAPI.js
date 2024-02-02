export default{
    lay_loai_cv_vnp: async (axios, data) => axios.post('/web-tracuu/socongvan/lay_dulieu_combo_congvan', data),
    lay_loai_cv: async (axios, data) => axios.post('/web-tracuu/socongvan/sp_lay_loai_cv', data),
    tracuu: async (axios, data) => axios.post('/web-tracuu/socongvan/sp_lay_ds_socongvan', data),
    ghi_lai: async (axios, data) => axios.post('/web-tracuu/socongvan/fn_frmsocongvan_xuly', data),
}
    