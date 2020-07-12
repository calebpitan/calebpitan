/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "whatwg-fetch"
import "./src/components/layouts/layout.global.scss"

import React from "react"
import BlogWrapper from "./src/components/wrapper"

export const wrapPageElement = ({ element, props }) => (
  <BlogWrapper {...props}>{element}</BlogWrapper>
)

