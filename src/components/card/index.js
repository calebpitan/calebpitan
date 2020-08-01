import * as React from 'react'

import { Link } from 'gatsby'

import { gcx } from '../../utils'
import H from '../heading'

import card from './card.mod.scss'
import SubjectImage from '../subject-image'
import Img from 'gatsby-image'

const cx = gcx(card)

const Card = ({ title, excerpt, author, avatar, slug, date, className }) => {
  return (
    <div className={cx('card', 'dFlex', 'flexColumn', className)}>
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
          <Img fluid={avatar.childImageSharp.fluid} draggable={false} />
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
