import * as React from 'react'
import { First6ixPosts } from './graphql'
import StuntList from './stunt-list'

const RecentPost = () => {
  return (
    <First6ixPosts>
      {({ allMdx }) => {
        const stunts = allMdx.edges.map(
          ({
            node: {
              frontmatter: { title, author, date },
              fields: { slug },
            },
          }) => ({
            title,
            author,
            date,
            slug,
          })
        )
        return <StuntList data={stunts} />
      }}
    </First6ixPosts>
  )
}

export default RecentPost
