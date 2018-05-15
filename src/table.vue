<template>
  <div class="m-table-block">
    <div class="m-table-title" vif="$slot.title || title"><slot name="title">{{title}}</slot></div>
    <div class="m-table-slot"><slot></slot></div>
    <div class="m-table-header" ref="tableHeader">
    <m-table-header
      ref="head"
      :columns="doColumns"
      :width="doWidth"
      :border="border"
      :headHeight="toCssVal(headHeight)"
      :has-gutter="hasGutter"
      :gutter-width="scrollWidth"
      @col-resize="thColResize"
      ></m-table-header>
    </div>
    <div class="m-table-body"
      :style="{
        height: toCssVal(height),
        maxHeight: toCssVal(maxHeight),
        width: toCssVal(width),
        maxWidth: toCssVal(maxWidth)
      }"
      @scroll="onscroll"
      ref="tableBody"
      >
    <table class="m-table" ref="table"
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
          :width="column.width"
          >
      </colgroup>
      <m-table-body :row-class="rowClass" :columns="doColumns" :data="data" v-on="$listeners"></m-table-body>
    </table>
    <div class="m-table-void" v-if="data.length === 0">{{voidText}}</div>
    </div>
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
    title: String,
    data: Array,
    stripe: Boolean,
    border: Boolean,
    rowClass: [String, Function],
    height: [String, Number],
    maxHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    headHeight: [String, Number],
    scrollWidth: {
      type: Number,
      default: 17
    },
    voidText: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {
      columns: [],
      isColResize: false,
      startOffsetX: 0,
      startWidth: 0,
      currentColumn: null,
      tableWidth: null,
      scrollTop: 0,
      scrollLeft: 0,
      hasGutter: false
    }
  },
  watch: {
    scrollLeft (val) {
      this.$refs.tableHeader.scrollLeft = val
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
          this.currentColumn.width = width
          this.tableWidth = this.oldTableWidth + e.clientX - this.startOffsetX
        }
      }
    },
    onscroll (e) {
      this.scrollLeft = e.target.scrollLeft
      this.scrollTop = e.target.scrollTop
    },
    setGutter () {
      let tableBody = this.$refs.tableBody
      setTimeout(() => {
        if (tableBody.offsetHeight < tableBody.scrollHeight) {
          this.hasGutter = true
        } else {
          this.hasGutter = false
        }
      })
    }
  },
  updated () {
    this.setGutter()
  },
  mounted () {
    document.addEventListener('mousemove', this.docMousemove)
    document.addEventListener('mouseup', this.docMouseUp)
    this.removeListen = () => {
      document.removeEventListener('mousemove', this.docMousemove)
      document.removeEventListener('mouseup', this.docMouseUp)
    }
    this.setGutter()
  },
  beforeDestroy () {
    this.removeListen()
  }
}
</script>
