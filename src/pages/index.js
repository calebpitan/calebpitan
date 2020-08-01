import * as React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import SubjectImage from '../components/subject-image'
import Tape from '../components/tape'
import H from '../components/heading'

import Intro from './intro.md'
import FindMeOn from '../components/find-me-on'
import Hr from '../components/hr'
import StuntList from '../components/stunt-list'
import AltText from '../components/alt-text'
import { useAvatar } from '../components/hooks'
import { gcx } from '../utils'

const cx = gcx()

const IndexPage = ({ data }) => {
  const { avatar } = useAvatar()
  const { allMdx } = data

  const stunts = allMdx.edges.map(
    ({
      node: {
        frontmatter: { title, author, date },
        fields: { slug },
      },
    }) => ({
      title,
      author,
      date,
      slug,
    })
  )

  return (
    <Layout>
      <SEO title="Caleb Pitan" isHome />

      <div className={cx('dMdFlex')}>
        <div>
          <SubjectImage>
            <Img fluid={avatar.childImageSharp.fluid} draggable={false} />
          </SubjectImage>

          <div className={cx('px3')}>
            <H
              as="5"
              className={cx('textCenter')}
              style={{ color: `var(--theme-color)` }}
            >
              Caleb Adepitan
            </H>

            <H as="6" className={cx('textMuted', 'textCenter')}>
              Software engineer and full-stack web developer
            </H>

            <FindMeOn />

            <Hr />
          </div>
        </div>

        <div
          className={cx(
            'compact-content',
            'flexMdShrink1',
            'mtMd5',
            'mlMd3',
            'px3'
          )}
        >
          <H as="2" style={{ margin: 0 }}>
            Hola, bienvenido!
          </H>
          <AltText text="Hello, welcome!" />
          <Tape />
          <Intro />
          <Hr />
          <H as="4">Recent Stunts</H>
          <Tape small />
          <StuntList data={stunts} />
        </div>

        <div
          className={cx('flexShrink0', 'dMdNone', 'dLgBlock')}
          style={{ width: `270px`, height: `100%` }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 6
      filter: { frontmatter: { publish: { eq: true } } }
    ) {
      ...AllMdxFrag
    }
  }
`

export default IndexPage
