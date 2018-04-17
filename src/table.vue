<template>
  <div class="m-table-block">
    <table class="m-table m-table-head" ref="table"
      :class="{
        'm-table__border': border
      }"
      :style="{
        width: doWidth
      }"
      >
      <thead>
        <th class="m-table-column"
          v-for="(column, index) in columns"
          :key="column.label + index"
          :style="{
            width: column.width
          }"
          @mousemove="handleMouseMove"
          @mousedown="handleMouseDown($event, index)"
          >{{column.label}}</th>
      </thead>
    </table>
    <table class="m-table m-table-body"
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
          v-for="(column, index) in columns"
          :key="column.label + index"
          :style="{
            width: column.width
          }"
          >
      </colgroup>
      <m-table-body :columns="columns" :data="data"></m-table-body>
    </table>
    <slot></slot>
  </div>
</template>
<script>
import MTableBody from './table-body'
export default {
  name: 'MTable',
  componentName: 'MTable',
  components: {
    MTableBody
  },
  props: {
    data: Array,
    stripe: Boolean,
    border: Boolean
  },
  data () {
    return {
      columns: [],
      isColResize: false,
      startOffsetX: 0,
      startWidth: 0,
      currentColumn: null,
      tableWidth: null
    }
  },
  computed: {
    doWidth () {
      return this.tableWidth ? this.tableWidth + 'px' : null
    }
  },
  methods: {
    handleMouseMove (e) {
      let offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight < 10) {
        e.target.style.cursor = 'col-resize'
      } else {
        e.target.style.cursor = ''
      }
    },
    handleMouseDown (e, index) {
      let offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight > 10) return null
      this.isColResize = true
      this.startOffsetX = e.clientX
      this.startWidth = e.target.offsetWidth
      this.currentColumn = this.columns[index]
      this.oldTableWidth = this.$refs.table.offsetWidth
    },
    docMouseUp (e) {
      this.isColResize = false
    },
    docMousemove (e) {
      if (this.isColResize) {
        let width = this.startWidth + e.clientX - this.startOffsetX
        let minWidth = this.currentColumn.index ? 40 : parseInt(this.currentColumn.minWidth) || 80
        if (width >= minWidth) {
          this.currentColumn.width = width + 'px'
          this.tableWidth = this.oldTableWidth + e.clientX - this.startOffsetX
        }
      }
    }
  },
  created () {
    window.table = this
  },
  mounted () {
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
