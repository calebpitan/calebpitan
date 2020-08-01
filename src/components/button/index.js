import * as React from 'react'
import PropTypes from 'prop-types'
import { gcx } from '../../utils'

import button from './button.mod.scss'

const cx = gcx(button)

const BUTTONS = {
  SMALL: 'btnSmall',
  MED: 'btnMedium',
  LARGE: 'btnLarge',
}

const Button = ({ children, className, text, size, alt, disabled }) => {
  return (
    <button
      className={cx('btn', size, { default: alt }, className)}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  text: PropTypes.string,
  size: PropTypes.oneOf([BUTTONS.SMALL, BUTTONS.MED, BUTTONS.LARGE]),
  variant: PropTypes.oneOf([
    BUTTONS.PRIMARY,
    BUTTONS.SECONDARY,
    BUTTONS.DEFAULT,
  ]),
  alt: PropTypes.bool,
  disabled: PropTypes.bool,
}

export { BUTTONS }

export default Button
