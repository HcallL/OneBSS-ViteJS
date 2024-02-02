<template src="./template.html"> </template>

<script>
import breadcrumb from '@/modules/contract/setup/DeclareLandline/components/breadcrumb.vue'
import * as moment from 'moment'
import api from './API'
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      thoigian: moment()
        .subtract(1, 'months')
        .format('MM/YYYY'),
      max: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    }
  },
  methods: {
    async tinhThuLao() {
      const res = await api.tinhThuLao(this.axios, { p_chuky: moment(this.thoigian, 'MM/YYYY').format('YYYYMM') })
      if (res.data.data != 'ok') {
        this.$toast.error(res.data.data)
      } else {
        this.$toast.success('Tính thù lao thành công')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-time{
  max-width: 500px;
  min-width: 200px;
  padding: 20px 0px;
  position: relative;
  margin: 0 auto;
}
</style>
