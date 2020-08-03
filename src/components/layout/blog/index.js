import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'

import SEO from '../../seo'
import Presentation from './presentation'
import { gcx } from '../../../utils'
import Layout from '..'
import { useAvatar } from '../../hooks'

import blog from './blog.mod.scss'
import RecentPost from '../../recent-post'

const shortcodes = { Link, SEO }

const cx = gcx(blog)

const BlogLayout = ({ data: { mdx, site } }) => {
  const { title, author, date, desc, featuredImage } = mdx.frontmatter
  const { avatar } = useAvatar()

  return (
    <Layout>
      <SEO
        title={title}
        image={featuredImage.childImageSharp.fixed.src}
        keywords={mdx.frontmatter.tags}
      />
      <div className={cx('pb5')} style={{ background: `var(--bg)` }}>
        <article style={{ maxWidth: 960, margin: `0 auto` }}>
          <Presentation
            {...{
              title,
              author,
              date,
              desc,
              timeToRead: mdx.timeToRead,
              featuredImage,
              authorAvatar: avatar,
            }}
          />

          <div className={cx('article')}>
            <main
              className={cx('articleContentMain', 'px3', 'pxMd5', 'pt5', 'pb3')}
              role="main"
            >
              <MDXProvider components={shortcodes}>
                <MDXRenderer frontmatter={mdx.frontmatter}>
                  {mdx.body}
                </MDXRenderer>
              </MDXProvider>
            </main>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        author
        date(formatString: "MMM DD, YYYY")
        last_modified(formatString: "MMM DD, YYYY")
        desc
        tags
        slug
        featuredImage {
          childImageSharp {
            fixed(width: 800, quality: 80, grayscale: false) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      fields {
        slug
      }
      timeToRead
      tableOfContents
    }

    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

export default BlogLayout
