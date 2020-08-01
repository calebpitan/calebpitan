import * as React from 'react'

const AltText = ({ children, text, ...rest }) => (
  <small className="global-alt-text" {...rest}>
    {children || text}
  </small>
)

export default AltText
