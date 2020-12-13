import * as React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { gcx } from '../../utils'
import Card from '../card'
import { useAvatar, useSiteMetadata } from '../hooks'

import stunt from './stunt.mod.scss'

const SNAP_ACTION = {
  NEXT: 'next',
  PREV: 'prev',
}

const THRESHOLD = 0.4
const ELASTICITY = 0.6
const TRANSITION = `transform linear var(--trans-time)`
const THRESHOLD_SPEED = 700

const cx = gcx(stunt)

/**
 * Compute total _x_ margin of an element given
 * a CSSStyleDeclaration object
 *
 * @param {CSSStyleDeclaration} cssStyleDeclaration
 */
const getTotalMarginX = cssStyleDeclaration => {
  const { marginLeft, marginRight } = cssStyleDeclaration
  return parseFloat(marginLeft) + parseFloat(marginRight)
}

const StuntScrollButton = ({ right, onClick, ...rest }) => {
  return (
    <button
      className={cx(
        'stuntScrollButton',
        'dInlineFlex',
        'alignItemsCenter',
        'justifyContentCenter',
        {
          scrollLeft: !right,
          scrollRight: right,
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {right ? (
        <FiChevronRight role="img" aria-label="Click to scroll left" />
      ) : (
        <FiChevronLeft role="img" aria-label="Click to scroll left" />
      )}
    </button>
  )
}

const StuntList = ({ data }) => {
  const [{ canNext, canPrev }, setActionState] = React.useState({
    canNext: true,
    canPrev: false,
  })
  const touchList = React.useRef({
    position: 0,
    intermediatePosition: 0,
    finalPosition: 0,
    DOM_Position: 0,
    t_nought: null,
    t_one: null,
  })
  const wrapperRef = React.useRef(null)

  React.useEffect(() => {
    const canNext =
      !navigator.maxTouchPoints &&
      wrapperRef.current.scrollWidth > wrapperRef.current.offsetWidth
    setActionState({ canNext, canPrev: false })
  }, [])

  const { avatar } = useAvatar()
  const {
    site: { siteMetadata },
  } = useSiteMetadata()

  console.log(siteMetadata)

  /**
   *
   * @param {TouchEvent} e
   */
  const touchStartHandler = e => {
    const target = e.currentTarget
    touchList.current.touchStart = e.changedTouches[0]
    touchList.current.position =
      target.getBoundingClientRect().x - target.offsetParent.offsetLeft
    touchList.current.t_nought = Date.now()
    target.style.transition = `none`
    document.body.style.overflow = 'hidden'
  }
  /**
   *
   * @param {TouchEvent} e
   */
  const touchMoveHandler = e => {
    const touchMove = e.changedTouches[0]
    const position = touchMove.clientX - touchList.current.touchStart.clientX
    const calculatedPosition =
      touchList.current.position + position * ELASTICITY

    Object.assign(touchList.current, {
      touchMove,
      intermediatePosition: calculatedPosition,
    })

    e.currentTarget.style.transform = `translate(${calculatedPosition}px)`
  }
  /**
   *
   * @param {TouchEvent} e
   */
  const touchEndHandler = e => {
    const target = e.currentTarget
    const { width } = target.getBoundingClientRect()
    const { scrollWidth } = target
    const touchEnd = e.changedTouches[0]
    const position = touchEnd.clientX - touchList.current.touchStart.clientX
    const calculatedPosition =
      touchList.current.position + position * ELASTICITY

    Object.assign(touchList.current, {
      touchEnd,
      finalPosition: calculatedPosition,
    })

    const action =
      touchList.current.touchStart.clientX > touchEnd.clientX
        ? SNAP_ACTION.NEXT
        : SNAP_ACTION.PREV
    /**
     * **Period _(T)_:** Change in time _(t)_ in `ms`
     */
    const period = Date.now() - touchList.current.t_nought
    /**
     * **Displacement _(x)_:** Change in displacement
     * _(x1 - x0)_ in `px`
     */
    const displacement =
      touchList.current.touchEnd.clientX - touchList.current.touchStart.clientX
    /**
     * Velocity in pixels per second `px/s`
     */
    const velocity = displacement / (period * 1e-3)

    document.body.style.overflow = 'initial'

    if (
      action === SNAP_ACTION.NEXT &&
      touchList.current.DOM_Position > width - scrollWidth &&
      (Math.abs(displacement) >= width * THRESHOLD ||
        Math.abs(velocity) >= THRESHOLD_SPEED)
    ) {
      touchList.current.DOM_Position -= width
      Object.assign(e.currentTarget.style, {
        transform: `translate(${touchList.current.DOM_Position}px)`,
        transition: TRANSITION,
      })
    } else if (
      action === SNAP_ACTION.PREV &&
      touchList.current.DOM_Position < 0 &&
      (Math.abs(displacement) >= width * THRESHOLD ||
        Math.abs(velocity) >= THRESHOLD_SPEED)
    ) {
      touchList.current.DOM_Position += width
      Object.assign(e.currentTarget.style, {
        transform: `translate(${touchList.current.DOM_Position}px)`,
        transition: TRANSITION,
      })
    } else {
      Object.assign(e.currentTarget.style, {
        transform: `translate(${touchList.current.DOM_Position}px)`,
        transition: TRANSITION,
      })
    }
  }

  const clickHandler = (action, e) => {
    /**
     * The scroll buttons are siblings of the wrapper element
     */
    const wrapper =
      e.currentTarget.previousElementSibling ||
      e.currentTarget.nextElementSibling
    /**
     * Get the first child of the wrapper element, likely a Card
     */
    const wrapperChild = wrapper.firstChild

    const { width } = wrapper.getBoundingClientRect()
    const { scrollWidth } = wrapper
    /**
     * Compute _x_ margin of wrapper first child representing all children
     */
    const wrapperChildMargin = getTotalMarginX(
      window.getComputedStyle(wrapperChild)
    )
    /**
     * Total width: width + _x_ margin of wrapper child element
     */
    const wrapperChildWidth =
      wrapperChild.getBoundingClientRect().width + wrapperChildMargin
    /**
     * Amount of completely visible children the viewport can accommodate
     */
    const visibleChildren = Math.floor(width / wrapperChildWidth)
    /**
     * Amount of children beyond the viewport accommodation
     */
    const hiddenChildren = wrapper.childElementCount - visibleChildren
    /**
     * Dimension to scroll away from visible children
     */
    const fromVisibleChildren = wrapperChildWidth * visibleChildren
    /**
     * Dimension to scroll towards hidden children
     */
    const toHiddenChildren = wrapperChildWidth * hiddenChildren
    /**
     * Scroll away from visible children `if` total dimension of
     * hidden children  is greater than wrapper width `else` scroll
     * towards hidden children
     */
    const nextScrollStop =
      toHiddenChildren > width ? fromVisibleChildren : toHiddenChildren

    const canNext = touchList.current.DOM_Position > width - scrollWidth

    const getActionState = () => {
      const canNext = touchList.current.DOM_Position > width - scrollWidth
      const canPrev = touchList.current.DOM_Position < 0
      return { canNext, canPrev }
    }

    touchList.current.DOM_Position =
      canNext && action === SNAP_ACTION.NEXT
        ? touchList.current.DOM_Position - nextScrollStop
        : touchList.current.DOM_Position + nextScrollStop

    Object.assign(wrapper.style, {
      transform: `translate(${touchList.current.DOM_Position}px)`,
      transition: TRANSITION,
    })

    setActionState(actionState => {
      const { canNext, canPrev } = getActionState()
      if (actionState.canNext !== canNext && actionState.canPrev !== canPrev) {
        return { canNext, canPrev }
      } else if (actionState.canNext !== canNext) {
        return { canNext, canPrev: actionState.canPrev }
      }
      return { canNext: actionState.canNext, canPrev }
    })
  }

  return (
    <div className={cx('stuntlist')}>
      {canPrev && (
        <StuntScrollButton
          onClick={clickHandler.bind(null, SNAP_ACTION.PREV)}
        />
      )}
      <div
        className={cx('stuntlistWrapper', 'dFlex', 'mb5')}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        ref={wrapperRef}
      >
        {data.map(({ slug, title, author, date }) => {
          author = author || siteMetadata.author
          return (
            <Card
              {...{ title, author, slug, avatar, date }}
              key={`${slug}-${author}`}
            />
          )
        })}
      </div>
      {canNext && (
        <StuntScrollButton
          onClick={clickHandler.bind(null, SNAP_ACTION.NEXT)}
          right
        />
      )}
    </div>
  )
}

export default StuntList
