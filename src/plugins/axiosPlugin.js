import axios from "axios"
import { store } from "@/store"
import jwtdecode from "jwt-decode"
import menu from "../utils/menu";

// default
const baseUrl = import.meta.env.VNPT_API;
const TOKEN_KEY = 'OneBSS-Token'

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  "Content-Type": "application/json",
  "Token-id": "97388db0-6ce9-11ea-bc55-0242ac130003",
  "Mac-address": "WEB"
};
// doing something with the request

axios.interceptors.request.use(
  (request) => {
    var config = {}
    if (request.config) {
      config = request.config
    }
    config.start = Date.now()
    request.config = config

  //var token = store.getters['user/accessToken']
  var token =  localStorage.getItem("OneBSS-Token") ? localStorage.getItem("OneBSS-Token") : null
   if (token) {
     let access_token = JSON.parse(localStorage.getItem(TOKEN_KEY))
     request.headers.Authorization = `Bearer ${access_token.access_token}`;
	 request.headers.SelectedMenuId = menu.getCurrentMenuItemID();
	 request.headers.SelectedPath = menu.getCurrentPath();
     //request.headers['App-secret'] = "ewogICJkZXZpY2VfaWQiOiAiMTI0IiwKICAiZGV2aWNlX2lwIjogIjEuMS4xLjEiLAogICJkZXZpY2VfbmFtZSI6ICJJT1MxMzEiLAogICJtYWNfYWRkcmVzcyI6ICI2NC01RC04Ni1EQy04QS0xNSIsCiAgIm1vYmlsZV9pZCI6ICIxMTI0IiwKICAiYXBwX2lkIjogIjEiLAogICJhcHBfdmVyc2lvbiI6ICJJT1MuMi4wLjAiLAogICJvc192ZXJzaW9uIjogIjExIgp9";
   }
/*
  token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9uaGFudmllbl9kaHN4IjoiMTM0MzEiLCJpZGVudGlmeSI6IjYyPzY0NjU1NTU3ND03MzQxNTY9NjYyMzIzNjMwMTU3MDc1PzU3MDc1PzU8Mj83Pz89PT09PT0_IiwibWFfdGluaCI6IkhQRyIsInVzZXJfbmFtZSI6InRlc3RfYXBwLmhwZyIsImdyb3VwSWQiOiIwIiwiaXNzIjoiaHR0cDovL3F1YW50cmkvb2F1dGgvdG9rZW5fa2V5IiwiYXV0aG9yaXRpZXMiOlsiUFJFX0FVVEgiXSwiaWRfZG9udmkiOiIxODYiLCJjbGllbnRfaWQiOiJjbGllbnRhcHAiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm1hX25oYW52aWVuX2NjYnMiOiJodW9uZ2x0X3ZucCIsInNlbGxpbmdEZXBhcnRtZW50SWQiOiIwIiwiY3NzX3NjaCI6IkNTU19IUEcuIiwiZXhwIjoxNjM4MDA4MjM3LCJtYV9udiI6IlZOUDAxNjIzMiIsImlkX3Rpbmh0aGFuaCI6IjI2Iiwibmd1b2lkdW5nX2lkIjoiOTk5OTk5In0.hI3MbwJfkOTdwXNrt_j02ETQOpVhvmsc6bo5OwzqI7U2tOibsNstEebxT8cTYcePvfpgiQg2vs_zUOqLaTBVCSAZ99NScHaB7tG3YRRXW1C1f3i28_3wH9R_62td_RkXgevL9v2JzqUwSgKLiFTA3T3oCf7x6Cqi80WJx6RlXkKAt0R2rnWH8N711XpXvlChjs2h9V95VvmylQMBqG7j772EGKSHPvuTOmHkUO74s2rYZVu1HZs_32z_T8-mJxv8Gv1Nwb7yxEZ69K1EqUvIy6v2z--FP4T67wIbUUM6vNOVpqUdEzHiqa4c3kN6gocoHe-INg6rxONDAP7WgBzSTw";
  request.headers.Authorization = `Bearer ${token}`;
    request.headers['App-secret'] = "ewogICJkZXZpY2VfaWQiOiAiMTI0IiwKICAiZGV2aWNlX2lwIjogIjEuMS4xLjEiLAogICJkZXZpY2VfbmFtZSI6ICJJT1MxMzEiLAogICJtYWNfYWRkcmVzcyI6ICI2NC01RC04Ni1EQy04QS0xNSIsCiAgIm1vYmlsZV9pZCI6ICIxMTI0IiwKICAiYXBwX2lkIjogIjEiLAogICJhcHBfdmVyc2lvbiI6ICJJT1MuMS4wLjEiLAogICJvc192ZXJzaW9uIjogIjExIgp9";
  }
/*
  token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9uaGFudmllbl9kaHN4IjoiMTM0MzEiLCJpZGVudGlmeSI6IjYyPzY0NjU1NTU3ND03MzQxNTY9NjYyMzIzNjMwMTU3MDc1PzU3MDc1PzU8Mj83Pz89PT09PT0_IiwibWFfdGluaCI6IkhQRyIsInVzZXJfbmFtZSI6InRlc3RfYXBwLmhwZyIsImdyb3VwSWQiOiIwIiwiaXNzIjoiaHR0cDovL3F1YW50cmkvb2F1dGgvdG9rZW5fa2V5IiwiYXV0aG9yaXRpZXMiOlsiUFJFX0FVVEgiXSwiaWRfZG9udmkiOiIxODYiLCJjbGllbnRfaWQiOiJjbGllbnRhcHAiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm1hX25oYW52aWVuX2NjYnMiOiJodW9uZ2x0X3ZucCIsInNlbGxpbmdEZXBhcnRtZW50SWQiOiIwIiwiY3NzX3NjaCI6IkNTU19IUEcuIiwiZXhwIjoxNjM4MDA4MjM3LCJtYV9udiI6IlZOUDAxNjIzMiIsImlkX3Rpbmh0aGFuaCI6IjI2Iiwibmd1b2lkdW5nX2lkIjoiOTk5OTk5In0.hI3MbwJfkOTdwXNrt_j02ETQOpVhvmsc6bo5OwzqI7U2tOibsNstEebxT8cTYcePvfpgiQg2vs_zUOqLaTBVCSAZ99NScHaB7tG3YRRXW1C1f3i28_3wH9R_62td_RkXgevL9v2JzqUwSgKLiFTA3T3oCf7x6Cqi80WJx6RlXkKAt0R2rnWH8N711XpXvlChjs2h9V95VvmylQMBqG7j772EGKSHPvuTOmHkUO74s2rYZVu1HZs_32z_T8-mJxv8Gv1Nwb7yxEZ69K1EqUvIy6v2z--FP4T67wIbUUM6vNOVpqUdEzHiqa4c3kN6gocoHe-INg6rxONDAP7WgBzSTw";
  request.headers.Authorization = `Bearer ${token}`;
    request.headers['App-secret'] = "ewogICJkZXZpY2VfaWQiOiAiMTI0IiwKICAiZGV2aWNlX2lwIjogIjEuMS4xLjEiLAogICJkZXZpY2VfbmFtZSI6ICJJT1MxMzEiLAogICJtYWNfYWRkcmVzcyI6ICI2NC01RC04Ni1EQy04QS0xNSIsCiAgIm1vYmlsZV9pZCI6ICIxMTI0IiwKICAiYXBwX2lkIjogIjEiLAogICJhcHBfdmVyc2lvbiI6ICJJT1MuMS4wLjEiLAogICJvc192ZXJzaW9uIjogIjExIgp9";
*/
  return request;
});

// doing something with the response
axios.interceptors.response.use(
  response => {
    const now = Date.now();
    console.info(
      `Api Call ${response.config.url} took ${now -
        response.config.config.start}ms`
    );
    // all 2xx/3xx responses will end here
    return response;
  },
  error => {
    // all 4xx/5xx responses will end here
    console.log(error);
    const Vue = require('vue');

    if(error.response && error.response.status === 401) {
      Vue.default.$toast.error("Có lỗi xác thực phân quyền khi thực hiện chức năng. Nếu lỗi này lặp lại, vui lòng thử đăng xuất và đăng nhập lại.");
    }
    //return Promise.reject(error);
    return Promise.reject(error.response);
  }

);

export default axios;
