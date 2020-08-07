/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import 'whatwg-fetch'
import './src/styles/root.global.scss'
import './src/styles/prism-one-dark.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import React from 'react'
import BlogWrapper from './src/components/wrapper'

export const wrapPageElement = ({ element, props }) => (
  <BlogWrapper {...props}>{element}</BlogWrapper>
)
