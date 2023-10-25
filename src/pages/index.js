import * as React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import SubjectImage from '../components/subject-image'
import Tape from '../components/tape'
import H from '../components/heading'

import Intro from './intro.md'
import FindMeOn from '../components/find-me-on'
import Hr from '../components/hr'
import RecentPost from '../components/recent-post'
import AltText from '../components/alt-text'
import { useAvatar } from '../components/hooks'
import { gcx } from '../utils'

const cx = gcx()

const IndexPage = () => {
  const { avatar } = useAvatar()

  return (
    <Layout>
      <SEO title="Caleb Adepitan" isHome />

      <div className={cx('dMdFlex')}>
        <div className={cx('px3')}>
          <SubjectImage>
            <Img fluid={avatar.childImageSharp.fluid} draggable={false} />
          </SubjectImage>

          <div className={cx('px3')}>
            <H as="5" className={cx('textCenter')} style={{ color: `var(--theme-color)` }}>
              Caleb Adepitan
            </H>

            <H as="6" className={cx('textMuted', 'textCenter')}>
              Full Stack Software Engineer
            </H>

            <FindMeOn />

            <Hr />
          </div>
        </div>

        <div className={cx('compact-content', 'flexMdShrink1', 'mtMd5', 'px3')}>
          <H as="2" style={{ margin: 0 }} serif={true}>
            Hola, bienvenido!
          </H>
          <AltText text="Hello, welcome!" />
          <Tape />
          <Intro />
          <Hr />
          <H as="4" serif={false}>
            Recent Stunts
          </H>
          <Tape small />
          <RecentPost />

          {/* <H as="4" serif={true}>
            Some Jargon I know
          </H>
          <Tape small />
          <Jargon /> */}
        </div>

        <div
          className={cx('flexShrink0', 'dMdNone', 'dXlBlock')}
          style={{ width: `270px`, height: `100%` }}
        />
      </div>
    </Layout>
  )
}

export default IndexPage
