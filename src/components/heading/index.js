import * as React from 'react'

import heading from './heading.mod.scss'

const H = ({ as, children, className: cn, ...rest }) => {
  const className = `${heading.heading} ${cn || ''}`
  const component = React.createElement(
    `h${as}`,
    { className, ...rest },
    children
  )
  return component
}

export default H
