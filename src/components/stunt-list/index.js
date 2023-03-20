import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react'

import { gcx } from '../../utils'
import Card from '../card'
import { useAvatar, useSiteMetadata } from '../hooks'

import * as stunt from './stunt.mod.scss'

import 'swiper/css'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const SNAP_ACTION = {
  NEXT: 'next',
  PREV: 'prev',
}

const cx = gcx(stunt)

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
  const containerRef = useRef(null)
  const frame = useRef(-1)
  /** @type {[import("swiper").Swiper, import('react').Dispatch<import('react').SetStateAction<import("swiper").Swiper|null>>]} */
  const [swiper, setSwiper] = useState(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [height, setHeight] = useState('auto')

  const slide = useSwiperSlide()

  useEffect(() => {
    swiper
  }, [swiper])

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    window.cancelAnimationFrame(frame.current)

    frame.current = window.requestAnimationFrame(() => {
      /** @type {DOMRect} */
      const rect = container.getBoundingClientRect()

      setHeight(rect.height)
    })
  }, [])

  const { avatar } = useAvatar()
  const {
    site: { siteMetadata },
  } = useSiteMetadata()

  return (
    <div className={cx('stuntlist')} ref={containerRef}>
      {canPrev && (
        <StuntScrollButton
          style={{ zIndex: 2, marginInlineStart: '1rem' }}
          onClick={() => swiper.slidePrev()}
        />
      )}
      <Swiper
        autoplay={true}
        cssMode={false}
        grabCursor={true}
        // modules={[Mousewheel, Pagination, Scrollbar]}
        // mousewheel={true}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        slidesPerView={3}
        spaceBetween={20}
        onSwiper={swiper => setSwiper(swiper)}
        onReachBeginning={() => setCanPrev(false)}
        onReachEnd={() => setCanNext(false)}
        onActiveIndexChange={swiper =>
          !swiper.isBeginning && !swiper.isEnd && (setCanPrev(true), setCanNext(true))
        }
        onTouchStart={() => {
          navigator.maxTouchPoints > 0 && (document.body.style.overflowY = `hidden`)
        }}
        onTouchEnd={() => {
          navigator.maxTouchPoints > 0 && (document.body.style.overflowY = `initial`)
        }}
      >
        {data.map(({ slug, title, author, date }) => {
          author = author || siteMetadata.author
          return (
            <SwiperSlide key={`${slug}-${author}`}>
              <Card {...{ title, author, slug, avatar, date }} height={height} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {canNext && (
        <StuntScrollButton
          style={{ zIndex: 2, marginInlineEnd: '1rem' }}
          onClick={() => swiper.slideNext()}
          right
        />
      )}
    </div>
  )
}

export default StuntList
