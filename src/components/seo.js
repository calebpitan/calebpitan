/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useIcon } from './hooks'
import { getTheme } from '../utils'
import { ThemeContext } from './wrapper'

const HOST = `https://calebpitan.dev`
const TWITTER_USER = `@realongman`

const THEME = getTheme()

function SEO({ description, lang, themeMode, meta, keywords = [], title, image, isHome, url }) {
  const [prefersDarkScheme, setPrefersDarkScheme] = React.useState(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  })

  React.useEffect(() => {
    const mediaEventHandler = ev => {
      console.log('MediaQueryListEvent %o', ev)
      setPrefersDarkScheme(ev.matches)
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQueryList.addEventListener('change', mediaEventHandler)

    return () => mediaQueryList.removeEventListener('change', mediaEventHandler)
  }, [])

  const theme = React.useContext(ThemeContext)
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  const { icon } = useIcon()
  const defaultImage = icon.childImageSharp.fixed.src

  const host = site.siteMetadata.siteUrl || HOST
  const metaDescription = description || site.siteMetadata.description
  const og = [
    {
      name: `title`,
      property: `og:title`,
      content: title,
    },
    {
      name: `description`,
      property: `og:description`,
      content: metaDescription,
    },
    {
      name: `type`,
      property: `og:type`,
      content: `website`,
    },
  ]

  const twitter = [
    {
      name: `twitter:card`,
      content: image && !isHome ? `summary_large_image` : `summary`,
    },
    {
      name: `twitter:creator`,
      content: TWITTER_USER,
    },
    {
      name: `twitter:site`,
      content: TWITTER_USER,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  image = image ? image : defaultImage

  if (image) {
    twitter.push({ name: `twitter:image`, content: `${host}${image}` })
    og.push({ name: `image`, property: `og:image`, content: `${host}${image}` })
  }

  if (url) {
    og.push({ name: `url`, property: `og:url`, content: url })
  }

  console.log('ThemeMode %s', theme)
  console.log('PrefersDarkScheme %s', prefersDarkScheme)

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: theme || themeMode,
      }}
      title={title}
      titleTemplate={!isHome ? `%s | ${site.siteMetadata.title}` : `%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          name: `theme-color`,
          content:
            theme === 'light'
              ? '#ffffff'
              : theme === 'dark' || prefersDarkScheme
                ? '#010001'
                : '#ffffff',
        },
      ]
        .concat(og, twitter)
        .concat({ name: `keywords`, content: keywords.join(`,`) })
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  themeMode: THEME,
  meta: [],
  description: ``,
  isHome: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  isHome: PropTypes.bool,
  url: PropTypes.string,
}

export default SEO
