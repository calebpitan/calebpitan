import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'

export const First6ixPosts = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx(
            sort: { frontmatter: { date: DESC } }
            limit: 6
            filter: { frontmatter: { publish: { eq: true } } }
          ) {
            ...AllMdxFrag
          }
        }
      `}
    >
      {children}
    </StaticQuery>
  )
}
