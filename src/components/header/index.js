import * as React from 'react'
import { FiFolder, FiMail, FiMessageCircle, FiPenTool } from 'react-icons/fi'
import { Link } from 'gatsby'

import { gcx } from '../../utils'

import header from './header.mod.scss'
import ThemeSwitch from '../theme-switch'

const cx = gcx(header)

export const links = [
  {
    to: '/blog/',
    text: 'Blog',
    icon: FiMessageCircle,
  },
  {
    to: '/projects/',
    text: 'Projects',
    icon: FiFolder,
  },
  {
    to: '/art/',
    text: 'My Art',
    icon: FiPenTool,
  },
  {
    to: '/get-in-touch/',
    text: 'Get in touch',
    icon: FiMail,
  },
]

const HeaderLink = ({ to, text, children, className, icon: Icon, ...rest }) => {
  return (
    <Link
      to={to}
      className={cx(
        'headerLink',
        'dFlex',
        'alignItemsCenter',
        'flexShrink0',
        'mt2',
        'mx2',
        'mtMd0',
        'mxMd3',
        className
      )}
      activeClassName={cx('active')}
      partiallyActive
      {...rest}
    >
      {Icon && (
        <span className={cx('dInlineFlex')} style={{ verticalAlign: `middle` }}>
          <Icon aria-hidden="true" />
        </span>
      )}
      <span className={cx('linkIconSeparator', 'mx1')} aria-hidden="true">
        &middot;&middot;
      </span>
      <span className={cx('flexShrink0')}>{children || text}</span>
    </Link>
  )
}

const Header = () => {
  const [firstname, lastname] = ['Caleb', 'Pitan']
  return (
    <div className={cx('header', 'pl3', 'plMd5', 'pr3')}>
      <header
        className={cx('dFlex', 'flexColumn', 'flexMdRow', 'alignItemsCenter')}
      >
        <Link to="/" className="index-link">
          <div
            className={cx(
              'headerName',
              'dInlineBlock',
              'flexShrink0',
              'prMd3',
              'mr3'
            )}
            aria-label={`${firstname} ${lastname}`}
          >
            <span className={cx('firstname')}>{firstname}</span> {lastname}
          </div>
        </Link>

        <div
          className={cx(
            'dFlex',
            'flexWrap',
            'justifyContentCenter',
            'mt3',
            'mtMd0',
            'mlMdAuto'
          )}
        >
          {links.map(({ to, text, icon }) => {
            return (
              <HeaderLink
                to={to}
                text={text}
                icon={icon}
                key={`key-for-${to}`}
              />
            )
          })}
        </div>
        <ThemeSwitch />
      </header>
    </div>
  )
}

export default Header
