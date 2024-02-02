<template src="./index.template.html"></template>
<script>
export default {
  props: {
    dataSource: Array,
  },
  watch: {
    dataSource: function(value){
      console.log(1111);
      console.log(value);
      this.doDefaultSelect();
    }
  },
  computed: {
    grid: function(){
      return this.$refs.grid.grid;
    }
  },
  methods: {
    grid_selectedItemsChanged: function (dataItems) {
      this.$emit("selectedItemsChanged", dataItems);
    },
    doDefaultSelect: function(){
      let rows = this.grid.getRows();
      if(rows.length > 0){
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          console.log(row);
        }
      }
    },
    grid_dataBound: function(args){
      let rows = this.grid.getCurrentViewRecords();
      let rs = [];
      if(rows.length > 0){
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if(row.CHON == "s1")
            rs.push(i);
        }
      }
      this.grid.clearSelection();
      this.grid.selectRows(rs);
    },
  },
};
</script>
