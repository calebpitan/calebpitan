import * as React from 'react'
import {
  MdBrightnessAuto,
  MdBrightnessHigh,
  MdBrightness4,
} from 'react-icons/md'

import Button from '../button'
import { ThemeContext, useThemeToggle } from '../wrapper'
import { THEMES } from '../../utils'

import tswitch from './switch.mod.scss'

const ThemeSwitch = () => {
  const currentTheme = React.useContext(ThemeContext)
  const setCurrentTheme = useThemeToggle()

  const getNextAndForwardedNextTheme = () => {
    const orderOfThemeSelection = Object.values(THEMES)
    const indexOfNextTheme =
      (orderOfThemeSelection.indexOf(currentTheme) + 1) %
      orderOfThemeSelection.length
    const nextTheme = orderOfThemeSelection[indexOfNextTheme]
    const forwardedNextTheme = orderOfThemeSelection[indexOfNextTheme]
    return { nextTheme, forwardedNextTheme }
  }

  const switchTheme = () => {
    const { nextTheme } = getNextAndForwardedNextTheme()
    setCurrentTheme(nextTheme)
  }

  const { forwardedNextTheme } = getNextAndForwardedNextTheme()

  const icons = {
    light: MdBrightnessHigh,
    dark: MdBrightness4,
    auto: MdBrightnessAuto,
  }

  const ThemeIcon = icons[currentTheme]

  return (
    <>
      <div className={tswitch.switchWrapper}>
        <Button
          className={tswitch.switchButton}
          onClick={switchTheme}
          aria-label={`Switch color scheme to ${forwardedNextTheme}`}
        >
          <ThemeIcon role="presentation" />
        </Button>
      </div>
    </>
  )
}

export default ThemeSwitch
