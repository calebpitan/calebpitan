import { graphql, useStaticQuery } from 'gatsby'

const useAvatar = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { eq: "pitan.jpg" }) {
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
