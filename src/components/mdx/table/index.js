import * as React from 'react'
import * as table from './table.mod.scss'

import { gcx } from '../../../utils'

const cx = gcx(table)

export const Table = props => {
  return (
    <div className={cx('tableContainer')}>
      <table className={cx('table', props.className)}>{props.children}</table>
    </div>
  )
}
