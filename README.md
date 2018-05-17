
## Table

数据表格组件

例子：[Example](https://mengdu.github.io/m-table/example/)


**install**

```ls
npm install -S vue-m-table
```

```js
import MTable from 'vue-m-table'

Vue.use(MTable) // 注册 m-table, m-table-column 组件
```

**template**
```html
<template>
  <div style="width: 800px; margin: 100px auto">
    <m-table :data="data" stripe border :row-class="rowCalss" max-height="400" head-height="35" title="数据表格">
      <m-table-column index label="编号" min-width="40px"></m-table-column>
      <m-table-column prop="name" label="名字" align="center" width="250"></m-table-column>
      <m-table-column prop="age" label="年龄" align="center"></m-table-column>
      <m-table-column prop="login" label="username"></m-table-column>
      <m-table-column label="操作" class-name="td-test" label-class-name="th-test">
        <template slot-scope="scope">
          <a href="#">{{scope.row.login}}</a>
        </template>
      </m-table-column>
    </m-table>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data: [
        {name: '张三', age: 19, login: 'zhangsan'},
        {name: '李四', age: 18, login: 'lisi'},
        {name: '王五', age: 20, login: 'wangwu'},
        {name: '测试员', age: 21, login: 'ceshi'},
      ]
    }
  },
  methods: {
    rowHover (row) {
      console.log(row)
    },
    rowCalss (row) {
      return ['test']
    }
  }
}
</script>
```



### MTable Attributes


| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 标题   | String |  —  |    —     |
| data     | 数据   | Array |  —  |    —     |
| stripe   | 斑马线   | Boolean    |   —    |    false   |
| border   | 边框   | Boolean    |  —  | false   |
| row-class | 行类名   | String\Function  |  —  |  —  |
| height | 高度   | String\Number  |  —  |  —  |
| max-height | 最大高度   | String\Number  |  —  |  —  |
| width | 宽   | String\Number |  —  |  —  |
| max-width | 最大宽   | String\Number |  —  |  —  |
| head-height | 表头高度   | String\Number |  —  |  17  |
| scroll-width | 滚动条宽度   | String\Number |  —  |  —  |
| void-text | 空时显示文字   | String\Number |  —  |  暂无数据  |


### MTable Events


| 参数      | 说明    | 参数      |  可选值  |
|---------- |-------- |---------- |--------- |
| row-click |  行被点击  | {event, row, index} |    —   |
| row-hover |  鼠标经过行  | {event, row, index} |    —   |




### MTable-column Attributes


| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| prop     | 列显示的字段   | string |  —  |    —     |
| label    | 表头显示名字 | string    |   —    |  —   |
| align    | 列对齐   | string    |  center,left,right  | left   |
| index    | 序号列   | Boolean  |  true/false  |  false  |
| minWidth | 列可缩小最小宽度   | string|number  |  —  |  80px  |
| className | 列td类名   | String, Function  |  —  |  —  |
| labelClassName | 列th类名   | String, Function  |  —  |  —  |
| width | 列宽   | String\Number |  —  |  —  |
| show | 是否显示列   | Boolean |  true/false  |  true  |


### MTable Solt


| 参数      | 说明    | 
|---------- |-------- |
| title     | 标题部分|


### Other

打包工具： [vue-component-devtool](https://github.com/mengdu/vue-component-devtool)
