import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import SEO from '../../seo'
import Presentation from './presentation'
import { gcx, formatLargeNumber, existsInFavorite, saveFavorite } from '../../../utils'
import Layout from '../index'
import { useAvatar, useFav } from '../../hooks'

import IntentShare from './share'
import RecentPost from '../../recent-post'
import H from '../../heading'
import Tape from '../../tape'
import { Blockquote, Callout, Table } from '../../mdx'

import * as blog from './blog.mod.scss'

const shortcodes = { table: Table, Link, SEO, Callout, Blockquote }

const cx = gcx(blog)

const COPY_SVG = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <rect width="336" height="336" x="128" y="128" fill="none" stroke-linejoin="round" stroke-width="32" rx="57" ry="57"></rect>
  <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"></path>
</svg>
`

const runAnimation = () => {
  const options = { root: null, rootMargin: '0px', threshold: 0.9 }
  const codeTitles = document.querySelectorAll('.ninja-code-title')
  const animationClass = 'ninja-code-title-animate'

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const targetClassList = entry.target.classList
      if (entry.isIntersecting) {
        if (!targetClassList.contains(animationClass)) {
          targetClassList.add(animationClass)
        }
      } else {
        if (targetClassList.contains(animationClass)) {
          targetClassList.remove(animationClass)
        }
      }
    })
  }, options)

  codeTitles.forEach(codeTitleLabel => observer.observe(codeTitleLabel))
  return () => observer.disconnect()
}

const addCodeblockToolbar = () => {
  /** @type {NodeListOf<HTMLDivElement>} */
  const codeblockContainers = document.querySelectorAll('div.gatsby-highlight')
  codeblockContainers.forEach(codeblockContainer => {
    const langauge = codeblockContainer.dataset['language']

    const container = document.createElement('div')
    const toolbar = document.createElement('div')
    const label = document.createElement('div')
    const divider = document.createElement('div')
    const copyButton = document.createElement('button')

    toolbar.classList.add('codeblock-toolbar')

    copyButton.classList.add('copy-button')
    copyButton.innerHTML = COPY_SVG
    copyButton.addEventListener('click', () => {
      const code = codeblockContainer.querySelector('pre[class*=language-]').textContent
      navigator.clipboard.writeText(code)
    })

    divider.classList.add('divider')

    label.classList.add('language-name')
    label.innerText = langauge

    toolbar.appendChild(label)
    toolbar.appendChild(divider)
    toolbar.appendChild(copyButton)
    container.appendChild(toolbar)

    codeblockContainer.insertBefore(container, codeblockContainer.firstChild)
  })
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

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
    addCodeblockToolbar()
    const animationCleanup = runAnimation()

    return () => {
      animationCleanup()
    }
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
              id="article"
              data-article="blog"
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
          <H as="3" serif={false}>
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
            gatsbyImageData(layout: FIXED, quality: 80, width: 800)
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
