export default {
  name: 'MTableBody',
  props: {
    columns: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    },
    rowClass: [String, Function]
  },
  methods: {
    cellClass (column, row, rindex, cindex) {
      let name = ''
      switch (column.align) {
        case 'center':
          name = 'is-center'
          break
        case 'right':
          name = 'is-right'
          break
        default:
          name = column.index ? 'is-center' : 'is-left'
      }
      let cell = typeof column.className === 'function'
        ? column.className({column: {...column}, row: {...row}, rindex, cindex})
        : column.className
      return ['m-table-column', name, cell]
    },
    trClass (row, index) {
      let rowClass = typeof this.rowClass === 'function'
        ? this.rowClass({row: {...row}, index})
        : this.rowClass
      return ['m-table-row', rowClass]
    }
  },
  render (h) {
    return (
      <tbody>
        {
          this._l(this.data, (row, rindex) => {
            return (
              <tr
                class={this.trClass(row, rindex)}
                key={rindex}
                on-click={(event) => this.$emit('row-click', {event, row, index: rindex})}
                on-mouseover={(event) => this.$emit('row-hover', {event, row, index: rindex})}>
                {
                  this._l(this.columns, (column, cindex) => {
                    return (
                      <td
                        key={rindex + '-' + cindex}
                        class={[this.cellClass(column, row, rindex, cindex)]}
                      >
                        {
                          column.renderCell(h, {
                            row,
                            column,
                            index: rindex,
                            columnIndex: cindex
                          })
                        }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    )
  }
}
