<template src="./index.template.html"></template>
<style scoped>
    pre {
        font-size: 1rem;
        line-height: 1.5;
        font-family: "Roboto", Arial;
        height: 300px;
        color: #666;
        font-weight: 400;
    }
</style>
<script>
export default {
    data() {
        return {
            title: null,
            content: null
        }
    },
    methods: {
        show() {
            return this.$refs['ref-modal'].show()
        },
        hide() {
            this.$refs['ref-modal'].hide()
        },
        setTitle(title) {
            this.title = title
        },
        setContent(content) {
            this.content = content
        },
        onModalHidden() {
            this.title = null
            this.content = null
        },
        onClickBtnSaoChep() {
            
            this.$refs['ref-textarea'].select()
            document.execCommand('copy')

            if (window.getSelection) {
                window.getSelection().removeAllRanges()
            }
            else if (document.selection) {
                document.selection.empty()
            }
        }
    }
}
</script>
