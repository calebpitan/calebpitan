import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
                try {
                  var mode = localStorage.getItem('theme-mode');
                  var supportDarkMode =
                    window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                    console.log('init', mode, supportDarkMode)
                  if(mode === 'light'){
                    document.querySelector('html').classList.remove('dark')  
                    document.querySelector('html').classList.add('light')
                  }
                  else if(mode === 'dark'){
                    document.querySelector('html').classList.remove('light')
                    document.querySelector('html').classList.add('dark')
                  }
                  else if(mode === 'auto'){
                      document.querySelector('html').classList.remove('light')
                      document.querySelector('html').classList.remove('dark')
                  }
                  else if(supportDarkMode){
                    document.querySelector('html').classList.remove('light')
                    document.querySelector('html').classList.add('dark')
                  }
                  else{
                    document.querySelector('html').classList.remove('light')
                    document.querySelector('html').classList.add('dark')
                  }
                } catch (e) {
                  document.querySelector('html').classList.remove('light')
                    document.querySelector('html').classList.add('dark')
                  console.log(e)
                }
              })();`,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
