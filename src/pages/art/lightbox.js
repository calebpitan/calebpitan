import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app

const LightboxComponent = ({
  isOpen,
  setIsOpen,
  photoIndex,
  setPhotoIndex,
}) => {
  const data = useStaticQuery(graphql`
        query ArtImages {
    allFile(filter: {relativePath: {regex: "/.*?\\.art\\.jpe?g$/i"}}) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              presentationHeight
              presentationWidth
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
    
    `)
  const images = data.allFile.edges

  const handlePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length)
  }

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length)
  }

  return (
    <div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].node.childImageSharp.fluid.src}
          nextSrc={
            images[(photoIndex + 1) % images.length].node.childImageSharp.fluid
              .src
          }
          prevSrc={
            images[(photoIndex + images.length - 1) % images.length].node
              .childImageSharp.fluid.src
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={handlePrev}
          onMoveNextRequest={handleNext}
        />
      )}
    </div>
  )
}

export default LightboxComponent
