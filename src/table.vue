<template>
  <div class="m-table-block"
    :style="{
      height: toCssVal(height),
      maxHeight: toCssVal(maxHeight),
      width: toCssVal(width),
      maxWidth: toCssVal(maxWidth),
      position: isFixedHead ? 'relative' : null
    }"
    @scroll="onscroll"
    >
    <div class="m-table-slot"><slot></slot></div>
    <div class="m-table-seat" v-if="isFixedHead"
      :style="{
        height: headSeatHeight + 'px'
      }"
      ></div>
    <m-table-header
      ref="head"
      :columns="doColumns"
      :width="doWidth"
      :border="border"
      :headHeight="toCssVal(headHeight)"
      :style="{
        position: isFixedHead ? 'absolute' : null,
        top: isFixedHead ? headSeatTop : null,
        background: 'inherit'
      }"
      @col-resize="thColResize"
      ></m-table-header>
    <table class="m-table m-table-body" ref="table"
      :class="{
        'm-table__stripe': stripe,
        'm-table__border': border
      }"
      :style="{
        width: doWidth
      }"
      >
      <colgroup>
        <col
          v-for="(column, index) in doColumns"
          :key="column.label + index"
          :style="{
            width: column.width
          }"
          >
      </colgroup>
      <m-table-body :row-class="rowClass" :columns="doColumns" :data="data" v-on="$listeners"></m-table-body>
    </table>
  </div>
</template>
<script>
import MTableHeader from './table-header'
import MTableBody from './table-body'
export default {
  name: 'MTable',
  componentName: 'MTable',
  components: {
    MTableHeader,
    MTableBody
  },
  props: {
    data: Array,
    stripe: Boolean,
    border: Boolean,
    rowClass: [String, Function],
    height: [String, Number],
    maxHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    headHeight: [String, Number]
  },
  data () {
    return {
      columns: [],
      isColResize: false,
      startOffsetX: 0,
      startWidth: 0,
      currentColumn: null,
      tableWidth: null,
      isFixedHead: false,
      headSeatHeight: '',
      headSeatTop: 0
    }
  },
  watch: {
    headHeight () {
      this.setFixedHead()
    }
  },
  computed: {
    doWidth () {
      return this.tableWidth ? this.tableWidth + 'px' : null
    },
    doColumns () {
      return this.columns.filter(e => e.show)
    }
  },
  methods: {
    toCssVal (val) {
      if (!val) return null
      if (/(px|rem|rem)/.test(val.toString())) return val
      else return val + 'px'
    },
    thColResize (params) {
      let {event, column} = params
      this.isColResize = true
      this.startOffsetX = event.clientX
      this.startWidth = event.target.offsetWidth
      this.currentColumn = column
      this.oldTableWidth = this.$refs.table.offsetWidth
    },
    docMouseUp (e) {
      this.isColResize = false
    },
    docMousemove (e) {
      if (this.isColResize) {
        let width = this.startWidth + e.clientX - this.startOffsetX
        // 默认index列最新40，其他80
        let minWidth = parseInt(this.currentColumn.minWidth) || (this.currentColumn.index ? 40 : 80)

        if (width >= minWidth) {
          this.currentColumn.width = width + 'px'
          this.tableWidth = this.oldTableWidth + e.clientX - this.startOffsetX
        }
      }
    },
    setFixedHead () {
      // 设置了固定高度才固定表头
      this.isFixedHead = !!this.$el.style.height

      setTimeout(() => {
        this.headSeatHeight = this.$refs.head.$el.offsetHeight
      })
    },
    onscroll (e) {
      if (!this.$el.style.height) return null
      // console.log(e.target.scrollTop)
      this.headSeatTop = e.target.scrollTop + 'px'
    }
  },
  created () {
    window.table = this
  },
  mounted () {
    this.setFixedHead()
    document.addEventListener('mousemove', this.docMousemove)
    document.addEventListener('mouseup', this.docMouseUp)
    this.removeListen = () => {
      document.removeEventListener('mousemove', this.docMousemove)
      document.removeEventListener('mouseup', this.docMouseUp)
    }
  },
  beforeDestroy () {
    this.removeListen()
  }
}
</script>
<style lang="less">
  @import './table.less';
</style>
