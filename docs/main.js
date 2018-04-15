// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DemoBlock from './components/demo-block'
import MTable from '@/index'

Vue.use(MTable)


Vue.component('m-test', {
  methods: {
    test (h) {
      return this.$scopedSlots.default ?
      h('div', this.$scopedSlots.default({text: 'this is a test'}))
      : h('div', this.$slots.default)
    }
  },
  created () {
    console.log(this.test(this.$createElement))
  },
  render (h, data) {
    console.log(this.$slots, data)
    this.test(h)
  }
})

Vue.component('DemoBlock', DemoBlock)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
