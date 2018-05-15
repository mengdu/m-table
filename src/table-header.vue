<template>
  <table class="m-table m-table-head"
    :class="{
      'm-table__border': border
    }"
    :style="{
      width: width
    }"
    >
    <colgroup>
      <col
        v-for="(column, index) in columns"
        :key="column.label + index"
        :width="column.width"
        >
        <col name="gutter" :width="gutterWidth" v-if="hasGutter">
    </colgroup>
    <thead ref="thead">
      <th class="m-table-column" colspan="1" rowspan="1"
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
        <th class="gutter" v-if="hasGutter"></th>
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
    headHeight: [String, Number],
    hasGutter: Boolean,
    gutterWidth: [String, Number]
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
    },
    setCol () {
      let childs = this.$el.querySelectorAll('thead > th')
      if (!childs.length) return
      for (let i = 0, len = childs.length; i < len; i++) {
        let th = childs[i]
        if (th.className.indexOf('gutter') === -1) {
          this.columns[i].width = th.offsetWidth
        }
      }
    }
  },
  updated () {
    if (this.__updated__) return
    this.setCol()
    this.__updated__ = true
  },
  mounted () {
    this.setCol()
  }
}
</script>
