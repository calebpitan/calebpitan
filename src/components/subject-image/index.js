import * as React from 'react'
import classNames from 'classnames/bind'
import { composeUtilStyles } from '../../utils'

import subImg from './subject-image.mod.scss'

const cx = classNames.bind(
  composeUtilStyles(
    {
      display: true,
      flex: true,
      spacing: true,
    },
    subImg
  )
)

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
      setClass((current) => {
        if (current === animationClass) {
          return 'linerAnimateDraw2'
        }
        return animationClass
      })
    }
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  const widthFlex = 100
  const heightFlex = 100

  const flexWidth = refWidth - widthFlex
  const flexHeight = refHeight - heightFlex

  const erx = flexWidth / 2 + 10
  const ery = flexHeight / 2 + 10
  const ecx = erx + (refWidth - erx * 2) / 2
  const ecy = ery + (refHeight - ery * 2) / 2

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

export default SubjectImage
