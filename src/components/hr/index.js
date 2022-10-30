import * as React from 'react'

import * as hr from './hr.mod.scss'

const Hr = ({ ...rest }) => {
  return <hr className={hr.hr} {...rest} />
}

export default Hr
