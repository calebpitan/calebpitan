import { graphql, useStaticQuery } from 'gatsby'

const useIcon = () => {
  const data = useStaticQuery(graphql`
    query {
      icon: file(relativePath: { eq: "caleb.jpg" }) {
        childImageSharp {
          fixed(width: 300, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return data
}
export default useIcon
