export default {
  name: 'MTableColumn',
  componentName: 'MTableColumn',
  props: {
    prop: String,
    label: String,
    algin: String,
    width: [Number, String],
    index: [Boolean, Function],
    minWidth: [Number, String]
  },
  data () {
    return {
      column: null
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
  created () {
    // this.$options.render = h => h('div', this.$slots.default)
    // console.log(this.$slots)
    let column = {...this.$props}
    this.column = column
    let that = this
    column.render = function (h, data) {
      let render = (h, data) => {
        return column.index ? data.index + 1 : data.row[column.prop]
      }

      if (that.$scopedSlots.default) {
        render = () => that.$scopedSlots.default(data)
      }
      return <div class="cell">{ render(h, data) }</div>
    }
  },
  mounted () {
    let parent = this.getParent('MTable')
    parent.columns.push(this.column)
  },
  render () {
    return null
  }
}
