/**
 * Implement Gatsby's SSR APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import BlogWrapper from './src/components/wrapper'
import './src/styles/root.global.scss'

export const wrapPageElement = ({ element, props }) => (
  <BlogWrapper {...props}>{element}</BlogWrapper>
)

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents()

  const fonts = (
    <React.Fragment key="google-fonts">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Domine:wght@500;600;700&family=Inconsolata:wght@400;500&family=Inter:wght@400;500&family=Poppins:ital,wght@0,400;0,500;1,400&family=Bodoni+Moda:wght@900&display=swap"
        rel="stylesheet"
      />
    </React.Fragment>
  )

  const themeScript = (
    <script
      key="prevent-FOIT-script"
      dangerouslySetInnerHTML={{
        __html: `(function(c,t,d){c.remove(d),c.add(t||d)})(document.querySelector('html').classList,(localStorage && localStorage.getItem('theme-mode')),'dark');`,
      }}
    />
  )

  headComponents.push(fonts, themeScript)

  replaceHeadComponents(headComponents)
}
