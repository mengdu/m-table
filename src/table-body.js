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
    }
  },
  render (h) {
    return (
      <tbody>
        {
          this._l(this.data, (row, rindex) => {
            return (
              <tr class="m-table-row" key={rindex}>
                {
                  this._l(this.columns, (column, cindex) => {
                    return (
                      <td class="m-table-column" key={rindex + '-' + cindex}>
                        {
                          column.render(h, {
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
