import * as React from 'react'

import { gcx } from '../../utils'

import footer from './footer.mod.scss'
import FindMeOn from '../find-me-on'

const cx = gcx(footer)

const Footer = () => {
  return (
    <>
      <div className={cx('mt5')}></div>
      <footer className={cx('footer', 'pb4')}>
        <FindMeOn />
        <div
          className={cx(
            'footerContent',
            'dFlex',
            'flexColumn',
            'alignItemsCenter',
            'p3'
          )}
        >
          <p className={cx('textCenter')}>
            Built with all the love in the world and outside it. I mean aliens
            are capable of love too!
          </p>
          &copy; Caleb Adepitan {new Date().getFullYear()}
        </div>
      </footer>
    </>
  )
}

export default Footer
