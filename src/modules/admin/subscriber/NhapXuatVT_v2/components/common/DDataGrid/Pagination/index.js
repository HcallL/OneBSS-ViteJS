export default function(grid) {
  return {
    template: {
      template: `
          <div @click="next">next</div>
        `,
      data() {
        return {
          last: [],
          filterText: ''
        }
      },
      computed: {
        value() {
          return this.$data.data.currentPage
        }
      },
      methods: {
        change: function(args) {
          console.log('args')
          console.log(args)
          console.log(grid)
          grid.goToPage(args.value)
        },
        next() {
          console.log('next click')
          console.log(grid)
          grid.goToPage(2)
          console.log(grid.getPager())
        }
      },
      async mounted() {
        console.log('template pagination')
        console.log(grid)
        console.log(this.$data)
      }
    }
  }
}

{
  /* <template>
  <div class="e-gridpager e-control e-pager e-lib" v-if="totalRecords > 0">
    <!-- <div class="e-pagercontainer" role="navigation"><button
      class="e-first e-icons e-icon-first e-firstpage e-pager-default" title="Đi đến trang đầu"
      aria-label="Đi đến trang đầu" tabindex="-1" index="1" :disabled="!enabledFirstPage"
      @click="gotoFirstPage()"></button><button class="e-prev e-icons e-icon-prev e-prevpage e-pager-default"
      title="Đi đến trang trước" aria-label="Đi đến trang trước" tabindex="-1" index="2" :disabled="!enabledPrevPage"
      @click="gotoPrevPage()"></button><button class="e-link e-pp e-spacing e-numericitem e-pager-default"
      title="Đi đến danh sách trang trước" role="link" aria-label="Đi đến danh sách trang trước" tabindex="-1"
      :disabled="!enabledPrevPageList" @click="gotoPrevPageList()" index="3">...</button><button
      v-for="page in currentPageListItems"
      :class="'e-link e-numericitem e-spacing ' + (page == pageIndexData ? 'e-currentitem e-active' : 'e-pager-default')"
      role="link" tabindex="-1" :aria-label="'Đi đến trang ' + (page + 1)" :title="'Đi đến trang ' + (page + 1)"
      :index="page" @click="gotoPage(page)">{{(page + 1).toLocaleString('vi-VN')}}</button><button
      class="e-link e-np e-spacing e-numericitem e-pager-default" title="Đi đến danh sách trang sau" role="link"
      aria-label="Đi đến danh sách trang sau" tabindex="-1" :disabled="!enabledNextPageList" index="4"
      @click="gotoNextPageList()">...</button><template v-if="!(commands == null || commands == undefined || commands.length == 0)">
        <button v-for="command in commands" class="e-link e-numericitem" :class="command.cssClass" @click="command_Click(command, $event)">{{command.text}}</button>
      </template><button class="e-next e-icons e-icon-next e-nextpage e-pager-default"
      title="Đi đến trang sau" aria-label="Đi đến trang sau" tabindex="-1" index="5" :disabled="!enabledNextPage"
      @click="gotoNextPage()"></button><button class="e-last e-icons e-icon-last e-lastpage e-pager-default"
      title="Đi đến trang cuối" aria-label="Đi đến trang cuối" tabindex="-1" index="6" :disabled="!enabledLastPage"
      @click="gotoLastPage()"></button>
  </div>
  <div class="e-pagesizes">
    <div class="e-pagerdropdown">
      <ejs-dropdownlist :dataSource="pageSizeList" v-model="pageSizeData" :enabled="totalRecords > 0">
      </ejs-dropdownlist>
    </div>
    <div class="e-pagerconstant"><span class="e-constant">bản ghi trên trang</span></div>
  </div>
  <button class="e-mfirst e-icons e-icon-first e-firstpage e-pager-default" title="Đi đến trang đầu" tabindex="-1"
    index="1" aria-label="Đi đến trang đầu" :disabled="!enabledFirstPage" @click="gotoFirstPage()"></button><button
    class="e-mprev e-icons e-icon-prev e-prevpage e-pager-default" title="Đi đến trang trước" tabindex="-1" index="7"
    aria-label="Đi đến trang trước" :disabled="!enabledPrevPage" @click="gotoPrevPage()"></button>
  <span class="e-mspace"><span
      class="row-number row-begin-number">{{currentBeginRecord.toLocaleString('vi-VN')}}</span>-<span
      class="row-number row-end-number">{{currentEndRecord.toLocaleString('vi-VN')}}</span> (<span
      class="row-number row-total-number">{{totalRecords.toLocaleString('vi-VN')}}</span>)</span> -->
    <button class="e-mnext e-icons e-icon-next e-nextpage e-pager-default" title="Đi đến trang sau" tabindex="-1" index="9" aria-label="Đi đến trang sau" :disabled="!enabledNextPage" @click="gotoNextPage()"></button>
    <button class="e-mlast e-icons e-icon-last e-lastpage e-pager-default" title="Đi đến trang cuối" tabindex="-1" index="70" aria-label="Đi đến trang cuối" :disabled="!enabledLastPage" @click="gotoLastPage()"></button>
    <div class="e-parentmsgbar">
      <div class="e-pagecountmsg">
        Tổng cộng <span class="row-number row-total-number">{{ totalRecords.toLocaleString('vi-VN') }}</span> bản ghi. Đang hiển thị bản ghi số <span class="row-number row-begin-number">{{ currentBeginRecord.toLocaleString('vi-VN') }}</span> đến
        <span class="row-number row-end-number">{{ currentEndRecord.toLocaleString('vi-VN') }}</span
        >.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaginationTemplate',
  props: {
    test: {
      type: String
    }
  },
  d
}
</script>
<style scoped>
.e-pagertemplate {
  display: inline-block;
  overflow: hidden;
}

.control-section {
  margin-left: 20px;
  width: 25%;
}

.content-wrapper {
  width: 25%;
  margin: 0 auto;
  min-width: 185px;
}

.e-float-input.e-numeric.e-input-group {
  margin-top: 12px;
  display: inline-flex;
  width: 180px;
}
</style> */
}
