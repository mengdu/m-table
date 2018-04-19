
## Button

Button常用的操作按钮。

例子：[Example](https://mengdu.github.io/m-button/example/)

打包工具： [vue-component-devtool](https://github.com/mengdu/vue-component-devtool)

## use


```ls
npm install vue-m-button
```

```js
import MButton from 'vue-m-button'
import 'vue-m-button/dist/css/default.css'

Vue.use(MButton)
```

会全局注册 `m-button-group`，`m-button` 组件。

```html
<m-button>defaut</m-button>
```

**按钮组：**

```html
<m-button-group>
  <m-button type="info">首页</m-button>
  <m-button type="info">热门</m-button>
  <m-button type="info">专栏</m-button>
</m-button-group>
```

### MTable Attributes


| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| date     | 数据   | Array |  —  |    —     |
| stripe   | 斑马线   | Boolean    |   —    |    false   |
| border   | 边框   | Boolean    |  —  | false   |
| row-class | 行类名   | String\Function  |  —  |  —  |
| height | 高度   | String\Number  |  —  |  —  |
| max-height | 最大高度   | String\Number  |  —  |  —  |
| width | 宽   | String\Number |  —  |  —  |
| max-width | 最大宽   | String\Number |  —  |  —  |


### MTable Events

row-click
row-hover


### MTable Column Attributes

prop
label
align
width
index
minWidth
className
labelClassName
show
