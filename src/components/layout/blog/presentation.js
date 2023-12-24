import * as React from 'react'
import {GatsbyImage} from 'gatsby-plugin-image'

import SubjectImage from '../../subject-image'
import { gcx } from '../../../utils'
import { findMeOn } from '../../find-me-on'

import { FiHeart } from 'react-icons/fi'

import * as blog from './blog.mod.scss'

const cx = gcx(blog)

const Presentation = ({
  title,
  author,
  date,
  desc,
  timeToRead,
  featuredImage,
  authorAvatar,
  isFaved,
  faves,
  onFav,
}) => {
  const underlay = `
    url(${featuredImage.childImageSharp.fixed.src}),
    url(${featuredImage.childImageSharp.fixed.srcWebp})
  `

  return (
    <div className={cx('presentation')}>
      <style>
        {`
          .${cx('presentationLayout')}::before {
            content: "";
            background-image: radial-gradient(
              ellipse closest-side,
              var(--presentation-stop-alpha) 0,
              var(--presentation-stop-beta) 50%,
              var(--presentation-stop-gamma) 70%
            ), ${underlay};
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            position: absolute;
            filter: blur(var(--blur-radius));
            clip-path: inset(0 0 0 0);
            width: 100%;
            height: 100%;
            display: block;
            right: 0;
            top: 0;
            opacity: 0.75;
          }
        `}
      </style>
      <div className={cx('presentationLayout', 'px3', 'pxMd5', 'pt5', 'pb3')}>
        <div className={cx('presentationDetails')}>
          <div className={cx('dFlex', 'flexColumn')} style={{ zIndex: 1 }}>
            <span className={cx('title')} aria-current="page">
              {title}
            </span>

            <div
              className={cx('articleDescription', 'textMuted', 'mtN3', 'mb4')}
            >
              {desc}
            </div>

            <div className={cx('dFlex', 'alignItemsCenter', 'mrAuto')}>
              <div className={cx('metaItem')}>
                <SubjectImage className={cx('authorAvatar')}>
                  <GatsbyImage image={authorAvatar.childImageSharp.gatsbyImageData} />
                </SubjectImage>
              </div>

              <div className={cx('dFlex', 'flexWrap')}>
                <div className={cx('metaItem')}>
                  <div className={cx('metaItemItem', 'textMuted')}>Author</div>
                  <a
                    href={findMeOn.find(({ name }) => name === 'Twitter')?.link}
                    className={cx('articleAuthorLink')}
                  >
                    <div>{author}</div>
                  </a>
                </div>

                <div className={cx('metaItem')}>
                  <div className={cx('metaItemItem', 'textMuted')}>Date</div>
                  <div>{date}</div>
                </div>

                <div className={cx('metaItem')}>
                  <div
                    className={cx('metaItemItem', 'textMuted')}
                    aria-label="Estimated Time to Read (E.T.R)"
                    title="Estimated Time to Read"
                  >
                    E.T.R
                  </div>
                  <div>{timeToRead.text}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('actionablePresentation')}>
            <div className={cx('dFlex', 'flexColumn', 'mb3')}>
              <button
                className={cx('favButton', { faved: isFaved }, 'mxAuto')}
                onClick={() => onFav()}
              >
                <FiHeart />
              </button>
              <span
                style={{
                  fontSize: `var(--font-xxsmall)`,
                }}
              >
                {faves}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Presentation
