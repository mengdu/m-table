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
  computed: {
    html () {
      return <h1>xxx</h1>
    },
    text () {
      return 'xxx'
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
                      <td class="m-table-column" key={rindex + '-' + cindex}>{column.index ? rindex + 1 : row[column.prop]}</td>
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
