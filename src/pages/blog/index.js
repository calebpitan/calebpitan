import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { FiTag } from 'react-icons/fi'

import Layout from '../../components/layout'
import Card from '../../components/card'
import SEO from '../../components/seo'
import H from '../../components/heading'
import Tape from '../../components/tape'
import AltText from '../../components/alt-text'
import { useAvatar, useSiteMetadata } from '../../components/hooks'
import { gcx } from '../../utils'

import blog from './index.mod.scss'

const cx = gcx(blog)

const Blog = ({ data }) => {
  const { avatar } = useAvatar()
  const {
    site: { siteMetadata },
  } = useSiteMetadata()

  return (
    <Layout>
      <SEO title={`Blog`} />
      <div className={cx('blog', 'p4', 'pMd5')}>
        <H as="1" serif={true}>
          Blog
        </H>
        <AltText text="Explore my stunts" />
        <Tape />

        <div className={cx('blogPostLayout')}>
          {data.allMdx.edges.map(
            ({
              node: {
                id,
                fields: { slug },
                frontmatter: { title, author, date },
              },
            }) => {
              author = author || siteMetadata.author
              return (
                <Card
                  {...{ title, author, slug, avatar, date }}
                  className={cx('mb3')}
                  key={`${title}-${author}-${id}`}
                />
              )
            }
          )}
        </div>
        <Link to="/tag">
          <FiTag aria-hidden="true" /> All Tags
        </Link>
      </div>
    </Layout>
  )
}

export const allMdxFragment = graphql`
  fragment AllMdxFrag on MdxConnection {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          author
          tags
          date(formatString: "ddd. MMM DD, YYYY")
        }
        excerpt(pruneLength: 25)
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 20
      filter: { frontmatter: { publish: { eq: true } } }
    ) {
      ...AllMdxFrag
    }
  }
`

export default Blog
