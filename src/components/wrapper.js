import * as React from 'react'

const BlogWrapper = ({ children }) => {
  // implement some stuff like site-wide alert here
  return (
    <div
      style={{
        minHeight: `100vh`,
        background: `var(--bg)`,
        color: `var(--fg-alt)`,
      }}
    >
      {children}
    </div>
  )
}

export default BlogWrapper
