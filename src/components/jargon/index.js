import * as React from 'react'
// import PropTypes from 'prop-types'
import { gcx } from '../../utils'

import jargon from './jargon.mod.scss'

const cx = gcx(jargon)

const Jargon = () => {
  const someJargon = [
    'Object Oriented Programming',
    'Functional Programming',
    'Reactive Programming',
    'Microservices',
    'Monolith',
    'Containerization',
  ]
  return (
    <div className={cx('jargon')}>
      <ul className={cx('jargonList')}>
        {someJargon.map(jargon => (
          <li className={cx('jargonListItem')} key={jargon}>
            {jargon}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Jargon
