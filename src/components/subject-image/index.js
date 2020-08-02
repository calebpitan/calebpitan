import * as React from 'react'
import PropTypes from 'prop-types'
import { gcx } from '../../utils'

import subImg from './subject-image.mod.scss'

const cx = gcx(subImg)

const VIEWBOX = 24
// const ELLIPSE_PADDING_ON_A_SCALE_OF_300 = 10

// 1/30 or 10/300. Look at the preceeding constant
const PADDING_RATE = 0.0333

function scaleSizeToViewBox(size, virtualViewBox) {
  return (VIEWBOX * size) / virtualViewBox
}

const SubjectImage = ({ children, className }) => {
  const [animationClass, setClass] = React.useState('')
  const [[refWidth, refHeight], setSize] = React.useState([])
  const wrapperRef = React.useRef(null)

  React.useEffect(() => {
    const width = wrapperRef.current.offsetWidth
    const height = wrapperRef.current.offsetHeight
    const animationClass = 'linerAnimateDraw'

    setSize([width, height])
    setClass(animationClass)

    const handler = () => {
      const width = wrapperRef.current.offsetWidth
      const height = wrapperRef.current.offsetHeight
      setSize([width, height])
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  const widthFlex = refWidth / 3
  const heightFlex = refHeight / 3

  const flexWidth = refWidth - widthFlex
  const flexHeight = refHeight - heightFlex

  const erx = scaleSizeToViewBox(
    flexWidth / 2 + refWidth * PADDING_RATE,
    refWidth
  )
  const ery = scaleSizeToViewBox(
    flexHeight / 2 + refHeight * PADDING_RATE,
    refHeight
  )
  const ecx = scaleSizeToViewBox(erx + (refWidth - erx * 2) / 2, refWidth)
  const ecy = scaleSizeToViewBox(ery + (refHeight - ery * 2) / 2, refHeight)

  return (
    <>
      <div
        className={cx(
          'imageWrapper',
          className,
          'dFlex',
          'justifyContentCenter',
          'alignItemsCenter',
          'mxAuto',
          'mxMd0'
        )}
        ref={wrapperRef}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          width={refWidth}
          height={refHeight}
          className={cx('outline')}
          aria-hidden="true"
        >
          <ellipse
            className={cx('liner', animationClass)}
            cx={ecx || 1}
            cy={ecy || 1}
            rx={erx || 1}
            ry={ery || 1}
          />
        </svg>
        <div
          className={cx('imageWrapperInner')}
          style={{ width: flexWidth || 1, height: flexHeight || 1 }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

SubjectImage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default SubjectImage
