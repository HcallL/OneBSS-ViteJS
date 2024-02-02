<template src='./TraCuuTTDongBo.html'></template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import breadcrumb from "@/components/breadcrumb";
import {
  getterName,
  actionName,
  statePropertyName,
  mutationName,
} from "../store/tracuuttdongbo";

export default {
  components: { breadcrumb },
  name: "TraCuuTTDongBo",

  data() {
    return {
     
    
      txtSoPhieu: "",
      vchungtu_id: 0,
      DSTT:[],
      animationSettings: { effect: 'Zoom' },
      target: '.main-wrapper',
      
    };
  },
  
  computed: {
    // ...mapState("tracuuttdongbo", statePropertyName),
    // ...mapGetters("tracuuttdongbo", getterName),
   
  },
  watch: {
   
  },
  mounted: async function () {
     
  },
  methods: {
    ...mapActions("tracuuttdongbo", actionName),
    // ...mapMutations("tracuuttdongbo", mutationName),

    async OpenDialog(){
      await this.tsbtnTimKiem_Click()
      this.$refs.popupTraCuuTTDongBo.show()
    },
    async tsbtnTimKiem_Click(){
      var area = ""
      if(this.$auth.getMaTinh() == "BCN"){
        area = "BKN"
      }else if(this.$auth.getMaTinh() == "VTU"){
        area = "BRA"
      }else if(this.$auth.getMaTinh() == "HAG"){
        area = "HGI"
      }else if(this.$auth.getMaTinh() == "DAN"){
        area = "DNO"
      }else{
        area = this.$auth.getMaTinh()
      }
      var dongbo = await this.kiemTraTrangThaiIMS({
        soPhieu: this.txtSoPhieu + "|" + area,
        iMode: "0"
      })
     
      this.DSTT = await  this.getDSTTDongBo({
        soPhieu: this.txtSoPhieu,
        kqIms: dongbo
      })    
    }
  },
 
  created: async function () {
   
  },
  
};
</script>
