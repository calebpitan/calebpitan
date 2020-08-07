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
import IntentShare from './share'
import RecentPost from '../../recent-post'
import H from '../../heading'
import Tape from '../../tape'

const shortcodes = { Link, SEO }

const cx = gcx(blog)

const changeSectionIcon = () => {
  const postHeading = document.querySelectorAll('h2, h3, h4, h5')
  postHeading.forEach((heading) => {
    const svg = heading.querySelector('a > svg')
    svg && (svg.outerHTML = `#`)
  })
}

const BlogLayout = ({ data: { mdx, site } }) => {
  const { avatar } = useAvatar()
  const { title, author, date, desc, featuredImage } = mdx.frontmatter

  React.useEffect(() => {
    changeSectionIcon()
  }, [])

  const postUrl = `${site.siteMetadata.siteUrl}/blog${
    mdx.frontmatter?.slug || mdx.fields.slug
  }`

  const sharerIntents = [
    {
      name: 'mail',
      text: `${mdx.frontmatter.title}&body=${mdx.frontmatter.desc}\n${postUrl}`,
      url: true,
    },
    {
      name: 'twitter',
      text: `${mdx.frontmatter.desc}\n${postUrl}`,
    },
    {
      name: 'facebook',
      text: postUrl,
    },
    {
      name: 'linkedin',
      text: `url=${postUrl}&summary=${mdx.frontmatter.desc}`,
      url: true,
    },
  ]

  return (
    <Layout>
      <SEO
        title={title}
        image={featuredImage.childImageSharp.fixed.src}
        keywords={mdx.frontmatter.tags}
      />
      <div className={cx('pb5')} style={{ background: `var(--bg)` }}>
        <article style={{ maxWidth: `var(--compact-width)`, margin: `0 auto` }}>
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
        <div
          style={{
            maxWidth: `var(--compact-width)`,
            margin: `2rem auto 0`,
            fontSize: `1.5rem`,
            overflow: `hidden`,
          }}
          className={cx('px3', 'pxMd5')}
        >
          <IntentShare intents={sharerIntents} className="mb5" />
          <H as="3">Recent Stunts</H>
          <Tape small />
          <RecentPost except={mdx.id} />
        </div>
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
            fixed(width: 800, quality: 80) {
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
