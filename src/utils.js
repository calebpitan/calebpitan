import flex from './styles/flex.mod.scss'
import display from './styles/display.mod.scss'
import screenreader from './styles/screenreader.mod.scss'
import spacing from './styles/spacing.mod.scss'
import text from './styles/text.mod.scss'
import typo from './styles/type.mod.scss'

import classNames from 'classnames/bind'

const utilStyles = {
  ...flex,
  ...display,
  ...screenreader,
  ...spacing,
  ...text,
  ...typo,
}

export const THEME_KEY = 'theme-mode'
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  AUTO: 'auto',
}

export const gcx = (style) => {
  return classNames.bind(Object.assign({}, utilStyles, style || {}))
}
