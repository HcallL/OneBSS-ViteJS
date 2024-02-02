<template src="./index.html"></template>
<script>
import PhanViTriKetCuoiChoNhanVien from './modal'
export default {
  name: "index",
  components:{PhanViTriKetCuoiChoNhanVien},
  data: function (){
    return {

    }
  },
  methods:{
    btnPhanKCNV(){
      this.$bvModal.show('phan_vitri_kc_cho_nv')
    }
  }
}
</script>

<style scoped>

</style>
