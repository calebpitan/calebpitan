/**
 * Implement Gatsby's SSR APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import 'node-fetch'
import './src/styles/root.global.scss'

import React from 'react'
import BlogWrapper from './src/components/wrapper'

export const wrapPageElement = ({ element, props }) => (
  <BlogWrapper {...props}>{element}</BlogWrapper>
)

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents()
  
  const themeScript = (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(c,t,d){c.remove(d),c.add(t||d)})(document.querySelector('html').classList,(localStorage && localStorage.getItem('theme-mode')),'dark');`,
      }}
    />
  )

  headComponents.push(themeScript)

  replaceHeadComponents(headComponents)
}
