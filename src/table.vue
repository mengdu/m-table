<template>
  <div class="m-table-block">
    <table class="m-table m-table-head"
      :class="{
        'm-table__border': border
      }"
      >
      <thead>
        <th class="m-table-column"
          v-for="(column, index) in columns"
          :key="column.label + index"
          :data-index="index"
          :style="{
            width: column.width
          }"
          @mousemove="handleMouseMove"
          @mousedown="handleMouseDown($event, index)"
          @mouseup="handleMouseUp"
          >{{column.label}}</th>
      </thead>
    </table>
    <table class="m-table m-table-body"
      :class="{
        'm-table__stripe': stripe,
        'm-table__border': border
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
      <tbody>
        <tr class="m-table-row"
          v-for="(row, index) in data"
          :key="index"
          >
            <td class="m-table-column"
              v-for="(column, cindex) in columns"
              :key="index + '-' + cindex"
              ><demo :params="handleRender(column.slot, row)"></demo>{{column.index ? index + 1 : row[column.prop]}}</td>
          </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>
</template>
<script>
import Demo from './demo'
export default {
  name: 'MTable',
  componentName: 'MTable',
  components: {
    Demo
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
      currentColumn: null
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
      // console.log(this.isColResize)
      if (this.isColResize) {
        let width = this.startWidth + e.clientX - this.startOffsetX
        this.currentColumn.width = width + 'px'
        // console.log(width)
      }
    },
    handleMouseDown (e, index) {
      this.isColResize = true
      this.startOffsetX = e.clientX
      this.startWidth = e.target.offsetWidth
      this.currentColumn = this.columns[index]
      // console.log('down', index)
    },
    handleMouseUp (e) {
      this.isColResize = false
    },
    handleRender (slot, row) {
      let vnode = typeof slot === 'function' ? slot(row) : slot
      let el = this.$createElement('div', vnode)
      console.log(el)
      return el
    }
  },
  created () {
    window.table = this
  },
  beforeCreate () {
    // console.log(this.$parent)

  }
}
</script>
<style lang="less">
  @import './table.less';
</style>
