<template>
    <select ref="select" class="w-100">
        <slot></slot>
    </select>
</template>

<script>
export default {
    name: 'Select2',
    props: ["options", "value"],
    mounted: function () {
        var vm = this;
        window.$(this.$refs.select)
        // init select2
        .select2({ data: this.options })
        .val(this.value)
        .trigger("change")
        // emit event on change.
        .on("change", function () {
            vm.$emit("input", this.value);
        });
    },
    watch: {
        value: function (value) {
        // update value
            window.$(this.$el).val(value).trigger("change");
        },
        options: function (options) {
        // update options
            window.$(this.$el).empty().select2({ data: options });
        }
    },
    destroyed: function () {
        window.$(this.$el).off().select2("destroy");
    }
}
</script>
