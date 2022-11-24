import * as flex from './styles/flex.mod.scss'
import * as display from './styles/display.mod.scss'
import * as screenreader from './styles/screenreader.mod.scss'
import * as spacing from './styles/spacing.mod.scss'
import * as text from './styles/text.mod.scss'
import * as typo from './styles/type.mod.scss'

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
      ? localStorage.getItem(THEME_KEY) || THEMES.LIGHT
      : THEMES.LIGHT
  } catch {
    return THEMES.LIGHT
  }
}

export const gcx = style => {
  return classNames.bind(Object.assign({}, utilStyles, style || {}))
}

export const formatLargeNumber = num => {
  const baseExp = 3
  const units = {
    3: 'K',
    6: 'M',
    9: 'G',
    12: 'T',
  }

  let exp = Math.floor(Math.log10(num))
  exp -= exp % baseExp

  if (!num) {
    return
  }

  if (num < 10 ** baseExp) {
    return num
  }

  const reducedNumber = num / 10 ** exp
  return `${reducedNumber.toFixed(1)}${units[exp]}`
}

export const existsInFavorite = (title, postUrl = null) => {
  try {
    /**
     * @type { {title: string, postUrl: string}[] }
     */
    const faves = JSON.parse(localStorage.getItem('faves'))

    if (!faves) {
      return false
    }

    return faves.some(({ title: fTitle, postUrl: fPostUrl }) => {
      if (!postUrl) {
        return title === fTitle
      }

      return title === fTitle && postUrl === fPostUrl
    })
  } catch {
    return false
  }
}

export const saveFavorite = (title, postUrl) => {
  try {
    let faves = JSON.parse(localStorage.getItem('faves'))

    if (!faves) {
      faves = []
    }

    if (existsInFavorite(title, postUrl)) {
      return false
    }

    faves.push({ title, postUrl })

    localStorage.setItem('faves', JSON.stringify(faves))

    return true
  } catch {
    return false
  }
}
