import * as React from 'react'

import { Link } from 'gatsby'

import { gcx } from '../../utils'
import H from '../heading'

import SubjectImage from '../subject-image'
import { GatsbyImage } from 'gatsby-plugin-image'

import * as card from './card.mod.scss'

const cx = gcx(card)

const Card = ({ title, excerpt, author, avatar, slug, date, className, height }) => {
  return (
    <div
      className={cx('card', 'dFlex', 'flexColumn', className)}
      style={{ height, marginBlockEnd: '1rem' }}
    >
      <div>
        <H as="5">
          <Link to={slug} className={cx('cardLink')}>
            {title}
          </Link>
        </H>
        {excerpt && <div className={cx('cardExcerpt', 'py2')}>{excerpt}</div>}
      </div>

      <div className={cx('dFlex', 'alignItemsCenter', 'cardMeta', 'mtAuto')}>
        <SubjectImage className={cx('cardAvatar')} avatar>
          <GatsbyImage image={avatar.childImageSharp.gatsbyImageData} draggable={false} />
        </SubjectImage>

        <div className={cx('dFlex', 'flexColumn', 'mt3')}>
          <span className={cx('cardFooter', 'flexShrink0')}>{author}</span>
          <span className={cx('cardFooter', 'flexShrink0')}>{date}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
