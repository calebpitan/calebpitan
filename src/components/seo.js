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

const HOST = `https://calebpitan.dev`
const TWITTER_USER = `@realongman`

function SEO({ description, lang, meta, keywords = [], title, image, isHome }) {
  const { site } = useStaticQuery(
    graphql`
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
    `
  )

  const host = site.siteMetadata.siteUrl || HOST
  const metaDescription = description || site.siteMetadata.description
  const og = [
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
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
      content: site.siteMetadata.author,
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
  if (image) {
    twitter.push({
      name: `twitter:image`,
      content: `${host}${image}`,
    })
    og.push({
      name: `og:image`,
      content: `${host}${image}`,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={!isHome ? `%s | ${site.siteMetadata.title}` : `%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
      ]
        .concat(og, twitter)
        .concat({
          name: `keywords`,
          content: keywords.join(`,`),
        })
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
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
}

export default SEO
