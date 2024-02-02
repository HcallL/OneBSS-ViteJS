<template>
  <div class="page">
    <Header :citycode="citycode" :userName="userName" :nhanVien="nhanVien" />
    <SideBar :menuItems="menuItems" @tokenchanged="tokenChanged" />
    <div class="main-wrapper">
      <Breadcrumb :pathItems="currentPathItems" />
      <div class="main-content">
        <transition name="router-anim">
          <router-view :key="keyidx" />
        </transition>
      </div>
      <Footer :citycode="citycode" :userName="userName" />
    </div>
    <Loader />
  </div>
</template>
<script>
import "../../node_modules/@syncfusion/ej2-vue-layouts/styles/bootstrap4.css";
import Loader from "@/components/Loader";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/BreadCrumb";
export default {
  name: "main-layout",
  components: {
    Header,
    Footer,
    SideBar,
    Loader,
    Breadcrumb,
  },
  data: function () {
    return {
      flag: false,
      citycode: "",
      userName: "",
      nhanVien: "",
      keyidx: 0,
    };
  },
  created: async function () {
    let s = false;
    if (this.$root.context.isAuthenticated()) {
      try {
        let startUpInfoJSON = localStorage.getItem('startUpInfo');
        let startUpInfo = null;
        if(startUpInfoJSON) startUpInfo = JSON.parse(startUpInfoJSON);
        if(!startUpInfo || !startUpInfo.data) {
          startUpInfo = await this.$root.context.get(
            "/quantri/user/khoitao_ungdung",
            {
              p_idmodule: 12,
            }
          );
          localStorage.setItem('startUpInfo', JSON.stringify(startUpInfo));
        }
        // let menuInfo = await this.$root.context.get(
        //   "web-quantri/nguoidung/lay_ds_main_menu_dagan_nd",
        //   {
        //     loai_ct_id: 12,
        //   }
        // );
        if (!(startUpInfo.data == null || startUpInfo.data == undefined)) {
          this.$root.context.configApplication(
            startUpInfo.data.ds_chucnang,
            // menuInfo.data.map(x=>({"stt":x.vitri,"name":x.ten_menu,"mota_cn":x.ten_hienthi,"icon":x.icon,"id":x.menu_id,"p_id":x.menu_cha_id,"url":x.url})),
            startUpInfo.data.thongtin
          );
          this.flag = !this.flag;
          s = true;
        }
        // if (!(startUpInfo.data == null || startUpInfo.data == undefined)) {
        //   this.$root.context.configApplication(
        //     startUpInfo.data.ds_chucnang,
        //     startUpInfo.data.thongtin
        //   );
        //   this.flag = !this.flag;
        //   s = true;
        // }
      } catch (e) {}
    }
    if(s) {
      try {
        s = false;
        var check_token = await this.$root.context.get("/web-hopdong/lapdatmoi/check_token", {});
        s = check_token.data=="ok";
      } catch (e) { s = false;}
    }
    if (!s) {
      if (this.$route.name != "Login") this.$router.push({ name: "Login" });
    }
  },
  mounted: function () {
    this.addCssFile("/static/vendor/font-awesome/css/font-awesome.min.css");
    this.addCssFile("/static/vendor/bootstrap/css/bootstrap.min.css");
    this.addCssFile("/static/vendor/ap8/css/style.css");
    this.addCssFile("/static/vendor/nucleo/outline/css/style.css");
    this.addCssFile("/static/vendor/nucleo/glyph/css/style.css");
    this.addCssFile("/static/vendor/treegrid/css/jquery.treegrid.css");
    this.addCssFile("/static/vendor/select2/css/select2.min.css");
    this.addCssFile("/static/vendor/oneicon/style.css");
    this.addCssFile("/static/css/style.css");
    this.addCssFile("/static/css/app.css");
    this.addCssFile("/static/css/custom.css");
    this.citycode = (this.$root.token.getMaTinh()?this.$root.token.getMaTinh():this.$root.token.getPhanVungID());
    this.userName = this.$root.token.getUserName();
    this.nhanVien = this.$root.context.user.getTenNhanVien();
  },
  computed: {
    menuItems: function(){
      if (this.flag) return this.getMenuFromStorage();
      return this.getMenuFromStorage();
    },
    currentPathItems: function () {
      if (this.flag) return this.getMenuPath();
      return this.getMenuPath();
    },
    // userName: function () {
    //   this.citycode = (this.$root.token.getMaTinh()?this.$root.token.getMaTinh():this.$root.token.getPhanVungID());
    //   if (this.flag) return this.$root.token.getUserName();
    //   return this.$root.token.getUserName();
    // },
    // nhanVien: function () {
    //   this.citycode = (this.$root.token.getMaTinh()?this.$root.token.getMaTinh():this.$root.token.getPhanVungID());
    //   if (this.flag) return this.$root.token.getUserName();
    //   return this.$root.context.user.getTenNhanVien();
    // },
  },
  methods: {
    addCssFile: function (path) {
      let style = document.createElement("link");
      style.type = "text/css";
      style.rel = "stylesheet";
      style.href = path;
      document.head.appendChild(style);
    },
    getMenuPath: function () {
      let url = this.getCurrentPath();
      if (url != "/#/") {
        return this.$root.context.getMenuPath(url).reverse();
      } else return [];
    },
    getCurrentPath: function () {
      let path = this.$route.fullPath;
      return "/#" + path;
    },
    getMenuFromStorage: function () {
      return this.$root.context.getMenu();
    },
    tokenChanged() {
      this.flag = !this.flag;
      this.citycode = (this.$root.token.getMaTinh()?this.$root.token.getMaTinh():this.$root.token.getPhanVungID());
      this.userName = this.$root.token.getUserName();
      this.nhanVien = this.$root.context.user.getTenNhanVien();
      this.keyidx += 1;
    },
  },
};
</script>
