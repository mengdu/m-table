
## Button

数据表格组件

例子：[Example](https://mengdu.github.io/m-table/example/)

打包工具： [vue-component-devtool](https://github.com/mengdu/vue-component-devtool)


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
| head-height | 表头高度   | String\Number |  —  |  —  |

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


