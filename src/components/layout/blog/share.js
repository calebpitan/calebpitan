import React from 'react'
import { FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiMail } from 'react-icons/fi'
import { gcx } from '../../../utils'

import * as blog from './blog.mod.scss'

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
  const capitalize = /** @type {(v: string) => string} */ v =>
    v.charAt(0).toUpperCase().concat(v.substring(1))

  const handleShare = media => /** @type {(evt: import('react').MouseEvent)} */ evt => {
    // const target = /** @type {HTMLAnchorElement} */ (evt.currentTarget)
    if (typeof window !== 'undefined' && 'dataLayer' in window && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'share_post',
        media: capitalize(media),
        page: window.location.href,
      })
      console.log('Shared to %s', capitalize(media))
    }
  }

  return (
    <div className={cx('dFlex', 'alignItemsCenter', className)} {...rest}>
      <FiShare2 role="presentation" />
      <div className={cx('ml3')}>
        {intents &&
          intents.map(({ name, text, url }) => {
            const Icon = allMedia[name].Icon
            return (
              <a
                href={`${allMedia[name].link}${!url ? encodeURIComponent(text) : text}`}
                onClick={handleShare(name)}
                className={cx('blogShareButton')}
                rel="noreferrer noopener nofollow"
                key={`${name}-share-button`}
                id={`${name}-share-button`}
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
