import * as React from 'react'
import PropTypes from 'prop-types'

import * as tape from './tape.mod.scss'

const Tape = ({ small }) => {
  return <div className={small ? tape.tapeSmall : tape.tape} aria-hidden="true" />
}

Tape.propTypes = {
  small: PropTypes.bool,
}

export default Tape
