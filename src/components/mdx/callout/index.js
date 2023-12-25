import * as React from 'react'
import { MdInfoOutline, MdErrorOutline } from 'react-icons/md'
import { FiAlertTriangle } from 'react-icons/fi'

import { gcx } from '../../../utils'

import * as callout from './callout.mod.scss'

const cx = gcx(callout)

const Signal = {
  info: <MdInfoOutline aria-hidden="true" />,
  warn: <FiAlertTriangle aria-hidden="true" />,
  danger: <MdErrorOutline aria-hidden="true" />,
  getSignal(type) {
    return this[type]
  },
}

export const Callout = ({ type = 'info', message, children }) => {
  return (
    <div className={cx('callout', type)}>
      <span className={cx('signal')}>{Signal.getSignal(type)}</span>
      <div className={cx('calloutInner')}>{children || message}</div>
    </div>
  )
}
