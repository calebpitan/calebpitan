import React from 'react'
import {
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi'
import { gcx } from '../../../utils'

import blog from './blog.mod.scss'

const cx = gcx(blog)

const allMedia = {
  twitter: {
    link: 'https://twitter.com/intent/tweet?text=',
    Icon: FiTwitter,
  },
  facebook: {
    link: 'https://facebook.com/sharer/sharer.php?u=',
    Icon: FiFacebook,
  },
  linkedin: {
    link: 'https://www.linkedin.com/shareArticle?mini=false&',
    Icon: FiLinkedin,
  },
  mail: {
    link: 'mailto:?subject=',
    Icon: FiMail,
  },
}

const IntentShare = ({ intents, className, ...rest }) => {
  return (
    <div className={cx('dFlex', 'alignItemsCenter', className)} {...rest}>
      <FiShare2 role="presentation" />
      <div className={cx('ml3')}>
        {intents &&
          intents.map(({ name, text, url }) => {
            const Icon = allMedia[name].Icon
            return (
              <a
                href={`${allMedia[name].link}${
                  !url ? encodeURIComponent(text) : text
                }`}
                className={cx('blogShareButton')}
                rel="noreferrer noopener nofollow"
                key={`${name}-share-button`}
              >
                <span className={cx('srOnly')}>Share on {name}</span>
                <Icon role="presentation" />
              </a>
            )
          })}
      </div>
    </div>
  )
}

export default IntentShare
