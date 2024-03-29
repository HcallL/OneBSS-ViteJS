export default {
    get_projects: (axios, data) => axios.post('/tichhop/jira/get_project', data),
    get_issue_info: async (axios, data) => axios.post('/tichhop/jira/get_Issue_Info', data),
    get_issue_types_v2: (axios, data) => axios.post('/tichhop/jira/Get_IssueTypes_V2', data),
    creat_issue: (axios, data) => axios.post('/tichhop/jira/Creat_Issue', data),
    add_issue_attachments: (axios, data, header) => axios.post('/tichhop/jira/add_Issue_Attachments', data, header), 
    add_issue_participant: (axios, data) => axios.post('/tichhop/jira/add_Issue_Participant', data),

    lay_thongtin_jira: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_thongtin_jira', data),
    jira_get_customfield_options: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/jira_get_customfield_options', data),
    sp_lay_thongtin_tieudo_mota_baohong_frm_create_issue: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_thongtin_tieudo_mota_baohong_frm_create_issue', data),
    sp_vip_nap_thongtin_mota_tinh_frm_create_issue: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_vip_nap_thongtin_mota_tinh_frm_create_issue', data),
    fn_lay_thongtin_tieude_jira: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/fn_lay_thongtin_tieude_jira', data),
    lay_thongtin_kh_it_360: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_thongtin_kh_it_360', data),  
    sp_lay_mucdo_uutien_frmcreateissue: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_mucdo_uutien_frmcreateissue', data),
    kiemtra_gui_yc_it360: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/kiemtra_gui_yc_it360', data),
    kiemtra_attach_file_it360: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/kiemtra_attach_file_it360', data),
    sp_lay_thongtin_label_jira: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_lay_thongtin_label_jira', data),
    fn_insert_jira_giaophieu_issue: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/fn_insert_jira_giaophieu_issue', data),
    lay_tt_giao_vip_giamsat_it360: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/lay_tt_giao_vip_giamsat_it360', data),
    giaophieuvip_cntt: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/giaophieuvip_cntt', data),
    sp_nap_ds_bieumau_frm_qlbieumau: (axios, data) => axios.post('/web-thicong/hoinghi_truyenhinh/sp_nap_ds_bieumau_frm_qlbieumau', data),
}