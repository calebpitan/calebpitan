/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value: `/blog${node.frontmatter.slug || value}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allPosts: allMdx(filter: { frontmatter: { publish: { eq: true } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMdx(
        limit: 2000
        filter: { frontmatter: { publish: { eq: true } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('ERROR: Loading `createPages` query')
  }

  const posts = result.data.allPosts.edges
  const tags = result.data.tagsGroup.group

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/layout/blog/index.js`),
      context: { id: node.id },
    })
  })

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/components/layout/tags-layout.js`),
      context: { tag: tag.fieldValue },
    })
  })
}
