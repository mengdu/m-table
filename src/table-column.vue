<script>
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
  created () {
    let parent = this.getParent('MTable')
    // console.log(this.$slots)
    parent.columns.push({...this.$props, slot: this.$scopedSlots.default || this.$slots.default})
  },
  render (h) {
    // console.log(this.$scopedSlots)
    // if (!this.$scopedSlots.default) return null
    // // 不渲染任何内容
    // return h('div', [this.$slots.default, this.$scopedSlots.default({text: 'this is a test'})])
    return null
  }
}
</script>
