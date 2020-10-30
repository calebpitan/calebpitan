import * as React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import { gcx } from '../../utils'
import H from '../../components/heading'
import Layout from '../../components/layout'
import Button, { BUTTONS } from '../../components/button'

import art from './art.mod.scss'
import SEO from '../../components/seo'
import LightboxComponent from './lightbox'

const cx = gcx(art)

const MD_SCREEN_QUERY = `(min-width: 768px) and (max-width: 991.98px)`
const LG_SCREEN_QUERY = `(min-width: 992px)`

const useGetColumns = () => {
  return React.useCallback(() => {
    if (window.matchMedia(MD_SCREEN_QUERY).matches) {
      return 2
    } else if (window.matchMedia(LG_SCREEN_QUERY).matches) {
      return 4
    }
    return 1
  }, [])
}

const ArtPage = ({ data }) => {
  const edges = [].concat(data.allFile.edges)
  const totalNodes = edges.length
  const elementsPerColumn = React.useRef(totalNodes)
  const [columns, setColumns] = React.useState(1)
  const getColumns = useGetColumns()

  React.useEffect(() => {
    const setColumnsClient = () => {
      const columns = getColumns()
      elementsPerColumn.current = Math.ceil(totalNodes / columns)
      setColumns(columns)
    }
    setColumnsClient()
    window.addEventListener('resize', setColumnsClient)
    return () => window.removeEventListener('resize', setColumnsClient)
  }, [getColumns, totalNodes])

  const [isOpen, setIsOpen] = React.useState(false)
  const [photoIndex, setPhotoIndex] = React.useState(0)

  const handleClick = (val, res) => {
    setPhotoIndex(val)
    setIsOpen(true)
  }

  const handleOpen = () => {
    setPhotoIndex(0)
    setIsOpen(true)
  }

  edges.map((edge, i) => {
    edge.node.childImageSharp.fluid.number = i
    return edge
  })

  return (
    <Layout>
      <SEO title={`Explore my artworks`} />
      <LightboxComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        edges={edges}
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
      />
      <style>
        {`
          .${cx('galaxy')} {
            background-image: url('');
            background-size: 300px;
            background-repeat: repeat;
            background-position: center center;
          }
        `}
      </style>
      <div className={cx('galaxy', 'dFlex', 'flexColumn')}>
        <div className={cx('artHero', 'px3', 'py5', 'mxAuto')}>
          <H
            as="1"
            className={cx('textCenter', 'fontWeightBold', 'heroHeading')}
            serif={true}
          >
            Absorb the art to heart
          </H>
          <p>
            Every thing around us has some intrinsic values that takes a
            creative mind to explore. Even engineering is an art, tell me what's
            not.
          </p>
          <div
            className={cx(
              'actionButtons',
              'dFlex',
              'flexColumn',
              'flexMdRow',
              'justifyContentCenter',
              'mxAuto',
              'mt5'
            )}
          >
            <Button
              text="Launch Lightbox"
              size={BUTTONS.MED}
              className={['mb4', 'mbMd0', 'mrMd4']}
              onClick={handleOpen}
            />
            <Button
              to="/get-in-touch"
              text="Order your portrait"
              size={BUTTONS.MED}
              className={['mlMd4']}
              link
              alt
            />
          </div>
        </div>

        <div className={cx('artLayer')}>
          <div
            className={cx('artImages', 'py5', 'mx4', 'mxMd5')}
            style={{ '--columns': columns }}
          >
            {new Array(columns).fill(0).map((_, i) => {
              const column = edges.splice(0, elementsPerColumn.current)
              return (
                <div key={i}>
                  {column.map(
                    ({ node: { childImageSharp, relativePath } }, index) => {
                      return (
                        <div
                          className={cx('artImageView', 'my4')}
                          key={relativePath}
                          onClick={() =>
                            handleClick(childImageSharp.fluid.number, {
                              i,
                              column,
                              index,
                            })
                          }
                        >
                          <Img
                            fluid={childImageSharp.fluid}
                            draggable={false}
                          />
                          {/* <div className={cx('artImageCaption')}>
                          <span>
                            Yes! Here is a very dope caption for this art, wow
                            don't
                          </span>
                        </div> */}
                        </div>
                      )
                    }
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql` 
  query Art {
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
`
export default ArtPage
