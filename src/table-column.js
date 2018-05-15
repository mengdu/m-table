let columnId = 0
export default {
  name: 'MTableColumn',
  componentName: 'MTableColumn',
  props: {
    prop: String,
    label: String,
    align: String,
    width: [Number, String],
    index: Boolean,
    minWidth: [Number, String],
    className: [String, Function],
    labelClassName: [String, Function],
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  watch: {
    prop (val) {
      this.column.prop = val
    },
    label (val) {
      this.column.label = val
    },
    align (val) {
      this.column.align = val
    },
    width (val) {
      this.column.width = val
    },
    index (val) {
      this.column.index = val
    },
    minWidth (val) {
      this.column.minWidth = val
    },
    className (val) {
      this.column.className = val
    },
    labelClassName (val) {
      this.column.labelClassName = val
    },
    show (val) {
      this.column.show = val
    }
  },
  methods: {
    getParent (name) {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== name) {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return null
    }
  },
  beforeCreate () {
    this.column = {}
  },
  render () {
    return null
  },
  created () {
    // this.customRender = this.$options.render
    // this.$options.render = h => h('div', this.$slots.default)

    let column = {
      ...this.$props,
      id: 'col-' + columnId++
    }
    let that = this
    column.renderCell = function (h, data) {
      let render = (h, data) => {
        return column.index ? data.index + 1 : data.row[column.prop]
      }

      if (that.$scopedSlots.default) {
        render = () => that.$scopedSlots.default(data)
      }
      return <div class="cell">{ render(h, data) }</div>
    }

    this.parent = this.getParent('MTable')
    this.column = column
  },
  mounted () {
    this.parent.columns.push(this.column)
  },
  destroyed () {
    if (this.parent) {
      let index = this.parent.columns.map(e => e.id).indexOf(this.column.id)

      if (index > -1) {
        this.parent.columns.splice(index, 1)
      }
    }
  }
}
