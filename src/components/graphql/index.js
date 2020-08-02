import * as React from 'react'
import { graphql, StaticQuery } from 'gatsby'

export const First6ixPosts = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx(
            sort: { fields: frontmatter___date, order: DESC }
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
