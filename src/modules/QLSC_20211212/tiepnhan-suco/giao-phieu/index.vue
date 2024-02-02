<template src="./index.template.html"></template>
<style>
    .tiepnhan-suco-giaophieu .page-content {
        overflow: visible !important;
        height: fit-content;
        background-color: white;
    }
</style>
<script>
import GiaoPhieu from '../../giao-phieu'
export default {
    components: { GiaoPhieu },
    props: {
        parent: Object
    },
    data() {
        return {

        }
    },
    methods: {
        show() {
            return this.$refs['ref-modal'].show()
        },
        hide() {
            this.$refs['ref-modal'].hide()
        },
        onModalHidden() {
            
        },
        onModalShown() {

        },
        onSuccessGiaoPhieu() {
            this.parent.napDsSuCoDpn()
            this.hide()
        }
     }
}
</script>

