import MTable from './table'
import MTableColumn from './table-column'

MTable.install = function (Vue, options) {
  Vue.component(MTable.name, MTable)
  Vue.component(MTableColumn.name, MTableColumn)
}

export default MTable
