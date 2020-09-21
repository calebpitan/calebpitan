import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { FiTag } from 'react-icons/fi'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import H from '../../components/heading'
import Tape from '../../components/tape'
import { gcx } from '../../utils'

const cx = gcx()

const TagsLayout = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged "${tag}"`

  return (
    <Layout>
      <SEO title={`Tags`} />
      <div className={cx('global-compact--layout--sm', 'p4', 'pMd5')}>
        <H as="1">{tagHeader}</H>
        <Tape />

        <div>
          <style>
            {`
              .posts-list {
                list-style: upper-roman;
              }
              .list {
                margin: 0 1rem 1rem 0;
              }
              .link {
                font-size: var(--font-xxlarge);
                margin-bottom: 1rem;
                color: var(--fg) !important;
              }
            `}
          </style>
          <ol type="I" className={cx('listUnstyled', 'posts-list')}>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter

              return (
                <li key={slug} className="list">
                  <Link to={slug} className={cx('dFlex', 'link')}>
                    {title}
                  </Link>
                  <div className={cx('excerpt')}>
                    {node.excerpt}
                    <small className={cx('dBlock', 'textMuted')}>
                      {node.frontmatter.author} &middot; {node.frontmatter.date}
                    </small>
                  </div>
                </li>
              )
            })}
          </ol>
          <Link to="/tag"><FiTag aria-hidden="true" /> All Tags</Link>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagsQuery($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, publish: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 250, truncate: false)
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "ddd. MMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

export default TagsLayout
