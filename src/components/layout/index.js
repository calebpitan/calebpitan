import * as React from 'react'
import { gcx } from '../../utils'
import Header from '../header'
import layout from './layout.mod.scss'
import Footer from '../footer'
import Hr from '../hr'

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
