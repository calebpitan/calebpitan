import React from 'react'
import { gcx } from '../../../utils'

import * as blockquote from './blockquote.mod.scss'

const cx = gcx(blockquote)

export const Blockquote = ({ children, ...rest }) => {
  return (
    <blockquote className={cx('blockquote')} {...rest}>
      <div>{children}</div>
    </blockquote>
  )
}

