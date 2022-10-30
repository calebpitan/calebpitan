import * as React from 'react'
import { gcx } from '../../utils'

import * as input from './input.mod.scss'

const cx = gcx(input)

/**
 * @param param1 {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 */
const Textarea = ({ className, ...rest }) => {
  return <textarea className={cx('input')} {...rest} />
}

export default Textarea
