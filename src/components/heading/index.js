import * as React from 'react'

import heading from './heading.mod.scss'

const H = ({ as, serif = false, children, className: cn, ...rest }) => {
  const className = `${heading.heading} ${
    serif ? heading.headingSerifGlyph : ''
  } ${cn || ''}`
  const component = React.createElement(
    `h${as}`,
    { className, ...rest },
    children
  )
  return component
}

export default H
