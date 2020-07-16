// next.config.js
const path = require("path")
const withOptimizedImages = require("next-optimized-images")

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  removeOriginalExtension: true,
  optimizeImagesInDev: true,
  mozjpeg: {
    quality: 90,
  },
  pngquant: {
    quality: [0.5, 1],
    strip: true,
  },
  // your config for other plugins or the general next.js here...
  target: "server",
  webpack(config) {
    config.resolve.modules.push(path.resolve("./"))
    return config
  },
})
