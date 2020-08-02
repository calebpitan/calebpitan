import * as React from 'react'
import PropTypes from 'prop-types'
import { gcx } from '../../utils'

import button from './button.mod.scss'
import { Link } from 'gatsby'

const cx = gcx(button)

const BUTTONS = {
  SMALL: 'btnSmall',
  MED: 'btnMedium',
  LARGE: 'btnLarge',
}

const Button = ({
  children,
  className,
  text,
  size,
  alt,
  link,
  to,
  disabled,
  ...rest
}) => {
  return !link ? (
    <button
      className={cx('btn', size, { default: alt }, className)}
      disabled={disabled}
    >
      {children || text}
    </button>
  ) : (
    <Link
      to={to}
      className={cx('btn', size, { link, default: alt }, className)}
      {...rest}
    >
      {children || text}
    </Link>
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
  link: PropTypes.bool,
  to: PropTypes.string,
  disabled: PropTypes.bool,
}

export { BUTTONS }

export default Button
