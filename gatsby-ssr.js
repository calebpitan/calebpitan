import "./src/components/layouts/layout.global.scss"

import React from "react"
import BlogWrapper from "./src/components/wrapper"

export const wrapPageElement = ({ element, props }) => (
  <BlogWrapper {...props}>{element}</BlogWrapper>
)

