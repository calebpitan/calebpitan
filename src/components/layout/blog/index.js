import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import SEO from '../../seo'
import Presentation from './presentation'
import {
  gcx,
  formatLargeNumber,
  existsInFavorite,
  saveFavorite,
} from '../../../utils'
import Layout from '..'
import { useAvatar, useFav } from '../../hooks'

import IntentShare from './share'
import RecentPost from '../../recent-post'
import H from '../../heading'
import Tape from '../../tape'
import Callout from '../../callout'

import * as blog from './blog.mod.scss'

const shortcodes = { Link, SEO, Callout }

const cx = gcx(blog)

const runAnimation = () => {
  const options = { root: null, rootMargin: '0px', threshold: 1.0 }
  const codeTitles = document.querySelectorAll('.ninja-code-title')
  const animationClass = 'ninja-code-title-animate'
  let [inFrameId, outFrameId] = [-1, -1]

  codeTitles.forEach(codeTitleLabel => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const targetClassList = entry.target.classList

        if (entry.isIntersecting) {
          if (!targetClassList.contains(animationClass)) {
            window.cancelAnimationFrame(inFrameId)
            inFrameId = window.requestAnimationFrame(() => {
              targetClassList.add(animationClass)
            })
          }
        } else if (targetClassList.contains(animationClass)) {
          window.cancelAnimationFrame(outFrameId)
          outFrameId = window.requestAnimationFrame(() => {
            targetClassList.remove(animationClass)
          })
        }
      })
    }, options)

    observer.observe(codeTitleLabel)
  })
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const BlogLayout = ({ data: { mdx, site }, children }) => {
  const [faves, setFaves] = React.useState({ count: null, isFaved: false })
  const { avatar } = useAvatar()
  const { fav, favCount } = useFav()

  React.useEffect(() => {
    favCount(mdx.frontmatter.title)
      .then(res =>
        setFaves({
          count: formatLargeNumber(res.favorite),
          isFaved: res.favorite && existsInFavorite(mdx.frontmatter.title),
        })
      )
      .catch(() => {})
  }, [favCount, mdx.frontmatter.title])

  useEnhancedEffect(() => {
    // changeSectionIcon()
    runAnimation()
  }, [])

  const { title, date, desc, featuredImage } = mdx.frontmatter
  const author = mdx.frontmatter.author || site.siteMetadata.author
  const postUrl = `${site.siteMetadata.siteUrl}${
    mdx.frontmatter?.slug ? `/blog/${mdx.frontmatter.slug}` : mdx.fields.slug
  }`

  const onFav = () => {
    if (existsInFavorite(title, postUrl)) return

    fav(title, postUrl)
      .then(res => {
        setFaves({ count: formatLargeNumber(res.favorite), isFaved: true })
        saveFavorite(title, postUrl)
      })
      .catch(console.log)
  }

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
        description={mdx.frontmatter.desc}
        image={featuredImage.childImageSharp.fixed.src}
        keywords={mdx.frontmatter.tags}
        url={postUrl}
      />
      <div className={cx('pb5')} style={{ background: `var(--bg)` }}>
        <article style={{ maxWidth: `var(--compact-width)`, margin: `0 auto` }}>
          <Presentation
            {...{
              title,
              author,
              date,
              desc,
              timeToRead: mdx.fields.timeToRead,
              featuredImage,
              authorAvatar: avatar,
              isFaved: faves.isFaved,
              faves: faves.count,
              onFav,
            }}
          />

          <div className={cx('article')}>
            <main
              className={cx('articleContentMain', 'px3', 'pxMd5', 'pt5', 'pb3')}
              role="main"
            >
              <MDXProvider components={shortcodes}>{children}</MDXProvider>
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
          <H as="3" serif={true}>
            Recent Stunts
          </H>
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
        timeToRead {
          minutes
          text
          time
          words
        }
      }
      tableOfContents
    }

    site {
      siteMetadata {
        title
        siteUrl
        author
      }
    }
  }
`

export default BlogLayout
