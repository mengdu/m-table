import MTable from './table'
import MTableColumn from './table-column'
import './table.less'

MTable.install = function (Vue, options) {
  Vue.component(MTable.name, MTable)
  Vue.component(MTableColumn.name, MTableColumn)
}

export {
  MTable as default,
  MTable,
  MTableColumn
}
