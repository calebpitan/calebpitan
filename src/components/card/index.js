import * as React from 'react'

import { Link } from 'gatsby'

import { gcx } from '../../utils'
import H from '../heading'

import card from './card.mod.scss'
import SubjectImage from '../subject-image'
import Img from 'gatsby-image'

const cx = gcx(card)

const Card = ({ title, author, avatar, slug, className }) => {
  return (
    <div className={cx('card', 'dFlex', 'flexColumn', className)}>
      <div className={cx('cardMain')}>
        <H as="5">
          <Link to={slug} className={cx('cardLink')}>
            {title}
          </Link>
        </H>
      </div>
      <div className={cx('dFlex', 'alignItemsCenter', 'cardMeta', 'mtAuto')}>
        <SubjectImage className={cx('cardAvatar')} avatar>
          <Img fluid={avatar.childImageSharp.fluid} draggable={false} />
        </SubjectImage>
        <span className={cx('cardAuthor')}>{author}</span>
      </div>
    </div>
  )
}

export default Card
