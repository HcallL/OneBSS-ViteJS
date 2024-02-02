<template src="./index.template.html"></template>
<script>

export default {
  components: { },
  name: 'ModalThueBaoCungDoiCap',
  props: {
    idModal: null
  },
  computed: {

  },
  async mounted () {
    try {

    } catch (error) {
      console.log('error', error)
    }
  },
  data () {
    return {
      resolvePromise: null,
      rejectPromise: null,
      thuebao: { IS_THUEBAO: null, THUEBAO_ID: null, DAUCUOI_ID: null },
      danhsach: []

    }
  },
  methods: {
    grid_selectedRowChanged () {},
    rowDoubleClicked (index, data) {
      console.log('rowDoubleClicked', data)
      this.resolvePromise({ok: true, data: data})
      this.$bvModal.hide(this.idModal)
    },
    shownModal () {
      console.log('thuebao', this.thuebao)
      this.getLichSuCap()
    },
    hiddenModal () {
      this.lichsucap = []
      this.thuebao = { IS_THUEBAO: null, DAUCUOI_ID: null, THUEBAO_ID: null }
    },
    show (thuebao) {
      return new Promise((resolve, reject) => {
        this.thuebao = thuebao
        this.$bvModal.show(this.idModal)
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    closeModal: function () {
      this.resolvePromise({ok: false, data: null})
      this.$bvModal.hide(this.idModal)
    },
    getLichSuCap: async function () {
      try {
        this.$root.showLoading(true)

        var vis_thuebao = this.thuebao.IS_THUEBAO === 1
        var vdb_id = vis_thuebao ? this.thuebao.THUEBAO_ID : this.thuebao.HDTB_ID
        var vdaucuoi_id = this.thuebao.DAUCUOI_ID

        var rs = await this.$root.context.post(
          '/web-cabman/ban-do-mang-cap/execute1', {P_PHANVUNG_ID: this.$root.token.getPhanVungID(), VDB_ID: vdb_id, VKIEU: vis_thuebao ? 0 : 1, VDAUCUOI_ID: vdaucuoi_id, PROCEDURE_NAME: 'CABMAN.PKG_DAUNOI_TB.LAY_DS_THUEBAO_CUNG_DOICAP'}
        )
        console.log('rs.data', rs.data)
        this.danhsach = rs.data
      } catch (error) {
        console.log('getLichSuCap', error)
        this.$root.showLoading(false)
      } finally {
        this.$root.showLoading(false)
      }
    }
  },
  watch: {
    thuebao_id (val) {
    }
  },
  created () {
  }
}
</script>

<style>
.modal-fullscreen .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
}
</style>
