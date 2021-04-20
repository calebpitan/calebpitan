import * as React from 'react'
import { FiGithub, FiTwitter, FiLinkedin, FiCodepen } from 'react-icons/fi'

import { gcx } from '../../utils'

import findMe from './find-me.mod.scss'

const cx = gcx(findMe)

export const findMeOn = [
  {
    link: 'https://github.com/calebpitan',
    name: 'Github',
    Icon: FiGithub,
  },
  {
    link: 'https://codepen.io/calebpitan',
    name: 'CodePen',
    Icon: FiCodepen,
  },
  {
    link: 'https://twitter.com/realongman',
    name: 'Twitter',
    Icon: FiTwitter,
  },
  {
    link: 'https://linkedin.com/in/caleb-adepitan',
    name: 'LinkedIn',
    Icon: FiLinkedin,
  },
]

const FindMeOn = () => {
  return (
    <div className={cx('dFlex flexWrap justifyContentCenter mt3'.split(' '))}>
      {findMeOn.map(({ link, name, Icon }) => {
        return (
          <a
            href={link}
            className={cx('findMeLink')}
            target="_blank"
            rel="noreferrer noopener"
            key={name}
          >
            <Icon role="img" aria-label={name} />
          </a>
        )
      })}
    </div>
  )
}

export default FindMeOn
