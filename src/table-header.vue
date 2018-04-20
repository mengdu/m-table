<template>
  <table class="m-table m-table-head"
    :class="{
      'm-table__border': border
    }"
    :style="{
      width: width
    }"
    >
    <thead>
      <th class="m-table-column"
        v-for="(column, index) in columns"
        :key="column.label + index"
        :style="{
          width: column.width,
          height: headHeight
        }"
        :class="cellClass(column, index)"
        @mousemove="thMouseMove"
        @mousedown="thMouseDown($event, index)"
        >{{column.label}}</th>
    </thead>
  </table>
</template>
<script>
export default {
  name: 'MTableHeader',
  props: {
    columns: Array,
    width: [String, Number],
    border: Boolean,
    headHeight: [String, Number]
  },
  methods: {
    cellClass (col, index) {
      let name = ''
      switch (col.align) {
        case 'center':
          name = 'is-center'
          break
        case 'right':
          name = 'is-right'
          break
        default:
          name = col.index ? 'is-center' : 'is-left'
      }
      let thClass = typeof col.labelClassName === 'function'
        ? col.labelClassName({column: {...col}, index})
        : col.labelClassName
      return [name, thClass]
    },
    thMouseMove (e) {
      let offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight < 10) {
        e.target.style.cursor = 'col-resize'
      } else {
        e.target.style.cursor = ''
      }
    },
    thMouseDown (e, index) {
      let offsetRight = e.target.offsetWidth - e.offsetX
      if (offsetRight > 10) return null
      this.$emit('col-resize', {
        event: e,
        column: this.columns[index]
      })
    }
  }
}
</script>
