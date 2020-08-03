import * as React from 'react'
import { gcx } from '../../utils'

import input from './input.mod.scss'

const cx = gcx(input)

/**
 * @param param1 {React.InputHTMLAttributes<HTMLInputElement>}
 */
const Input = ({ className, ...rest }) => {
  return <input className={cx('input')} {...rest} />
}

export default Input
