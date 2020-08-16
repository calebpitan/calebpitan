import * as React from 'react'
import { THEME_KEY, THEMES } from '../utils'

const ThemeContext = React.createContext(THEMES.DARK)

const { Provider: ThemeProvider } = ThemeContext
const ThemeUpdaterContext = React.createContext()

const useThemeToggle = () => {
  const setTheme = React.useContext(ThemeUpdaterContext)
  const toggle = React.useCallback((nextTheme) => {
    return setTheme(() => {
      localStorage.setItem(THEME_KEY, nextTheme)
      return nextTheme
    })
  }, [setTheme])
  return toggle
}

const getTheme = () => {
  try {
    return (
      undefined !== typeof window
        ? localStorage.getItem(THEME_KEY) || THEMES.DARK
        : THEMES.DARK
    )
  } catch {
    return THEMES.DARK
  }
}
  
const BlogWrapper = ({ children }) => {
  // implement some stuff like site-wide alert here
  const [currentTheme, setCurrnetTheme] = React.useState(getTheme)

  return (
    <ThemeProvider value={currentTheme}>
      <ThemeUpdaterContext.Provider value={setCurrnetTheme}>
        <div
          style={{
            minHeight: `100vh`,
            background: `var(--bg)`,
            color: `var(--fg-alt)`,
          }}
        >
          {children}
        </div>
      </ThemeUpdaterContext.Provider>
    </ThemeProvider>
  )
}

export {useThemeToggle, ThemeContext}

export default BlogWrapper
