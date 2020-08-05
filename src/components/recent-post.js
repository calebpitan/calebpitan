import * as React from 'react'
import { First6ixPosts } from './graphql'
import StuntList from './stunt-list'

const RecentPost = ({ except }) => {
  return (
    <First6ixPosts>
      {({ allMdx }) => {
        const stunts = allMdx.edges
          .filter(({ node: { id } }) => id !== except)
          .map(
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
