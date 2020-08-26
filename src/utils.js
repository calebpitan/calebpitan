import flex from './styles/flex.mod.scss'
import display from './styles/display.mod.scss'
import screenreader from './styles/screenreader.mod.scss'
import spacing from './styles/spacing.mod.scss'
import text from './styles/text.mod.scss'
import typo from './styles/type.mod.scss'

import classNames from 'classnames/bind'

export const FIREBASE_CLOUD_FUNCTIONS_BASEURL = `https://us-central1-caleb-97b50.cloudfunctions.net/app`

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

export const getTheme = () => {
  try {
    return typeof window !== undefined
      ? localStorage.getItem(THEME_KEY) || THEMES.DARK
      : THEMES.DARK
  } catch {
    return THEMES.DARK
  }
}

export const gcx = (style) => {
  return classNames.bind(Object.assign({}, utilStyles, style || {}))
}

export const largeNumber = (num) => {
  const baseExp = 3
  const units = {
    '3': 'K',
    '6': 'M',
    '9': 'G',
    '12': 'T',
  }

  let exp = Math.floor(Math.log10(num))
  exp -= exp % baseExp

  if (!num) return
  if (num < 10 ** baseExp) return num

  const reducedNumber = num / 10 ** exp
  return `${reducedNumber.toFixed(1)}${units[exp]}`
}
