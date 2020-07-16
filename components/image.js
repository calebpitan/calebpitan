import * as React from "react"

const MIN_SIZE = 300
const FRACTIONS = [0.25, 0.5, 1, 1.5, 2]

function generateSrcset(src, maxWidth) {
  let source = `${src}?resize`
  const sizes = FRACTIONS.map((ratio) => {
    let width = maxWidth * ratio
    width = width < MIN_SIZE ? MIN_SIZE : width
    source += `&sizes[]=${width}`
  })
  return [source, sizes]
}

export function getSources(src, maxWidth) {
  const [resizeSrc] = generateSrcset(src, maxWidth)
  const srcSet = require(resizeSrc).srcSet
  const trace = require(`${src}?trace`).trace
  const defaultSrc = require(src)
  return {
    srcSet,
    trace,
    defaultSrc,
    sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
  }
}

const Image = ({ srcSet, src, trace, sizes }) => {
  return (
    <>
      <img src={require("@images/listen.jpg?trace").trace} width="300" />
      <img src={trace} width="300" />
      <picture>
        <source sizes={sizes} srcSet={srcSet} />
        <img sizes={sizes} srcSet={srcSet} src={src} loading="lazy" />
      </picture>
    </>
  )
}

export default Image
