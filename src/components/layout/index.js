import * as React from 'react'
import { gcx } from '../../utils'
import Header from '../header'
import Footer from '../footer'
import Hr from '../hr'

import * as layout from './layout.mod.scss'

const cx = gcx(layout)

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={cx('main')}>{children}</div>
      <Hr />
      <Footer style={{ height: `3rem` }} />
    </>
  )
}

export default Layout
