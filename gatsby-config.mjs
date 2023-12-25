import { readFileSync } from 'node:fs'

import { shouldTransform, getHTML } from 'gatsby-remark-embedder/dist/transformers/GIPHY.js'
import * as parse5 from 'parse5'
import remarkGfm from 'remark-gfm'
import * as sass from 'sass'

const SITE_URL = 'https://www.calebpitan.com'
const LINK_ICON = readFileSync('./src/images/link-icon.svg').toString('utf-8')

const config = {
  trailingSlash: 'never',
  siteMetadata: {
    title: `Caleb Adepitan`,
    author: `Caleb Adepitan`,
    description: [
      `Hi, I am Caleb!`,
      `This is just one of the places where I'm domiciled on the internet`,
      `as a proprietor not a tenant. A place where I write about all the things I can think of,`,
      `and sometimes, even those I can't think of.`,
    ].join(' '),
    siteUrl: SITE_URL,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/blog/`,
      },
    },

    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Caleb Adepitan`,
        short_name: `Caleb Adepitan`,
        start_url: `/`,
        background_color: `#010001`,
        theme_color: `#010001`,
        display: `standalone`,
        icon: `src/images/ninja.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: sass,
        // Override the file regex for SASS
        sassRuleTest: /\.global\.s(a|c)ss$/,
        // Override the file regex for CSS modules
        sassRuleModulesTest: /\.mod\.s(a|c)ss$/,
        useResolveUrlLoader: {
          options: {
            sourceMap: true, //default is false
          },
        },
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-smartypants`,
          { resolve: `gatsby-remark-images`, options: { maxWidth: 1200 } },

          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                {
                  name: 'GIPHY',
                  shouldTransform,
                  getHTML: async url => {
                    const html = await getHTML(url)
                    const div = parse5.parseFragment(html).childNodes[0]
                    if (div.nodeName === 'div') {
                      div.attrs.push({
                        name: 'class',
                        value: 'giphy-embedder giphy-gif-embed',
                      })
                    }
                    const value = parse5.serializeOuter(div)
                    console.log(value)
                    return value
                  },
                },
              ],
            },
          },

          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: LINK_ICON,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-code-titles',
            options: { className: 'ninja-code-title' },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: { rel: 'nofollow noreferrer' },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['G-L8HKZQS2TK'],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-W6W7XBT',
        includeInDevelopment: true,
        defaultDataLayer: { platform: 'gatsby' },
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `var(--theme-color)`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        entryLimit: 5000,
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: SITE_URL + path + '/',
            lastmod: modifiedGmt,
          }
        },
      },
    },
  ],
}

export default config
