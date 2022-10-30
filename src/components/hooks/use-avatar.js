import { graphql, useStaticQuery } from 'gatsby'

const useAvatar = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(
        relativePath: { eq: "81153E5A-244B-459D-8B8D-E3AB6355C0AD.jpeg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 600, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  return data
}

export default useAvatar
