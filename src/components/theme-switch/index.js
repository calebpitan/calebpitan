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
const icons = {
  light: MdBrightnessHigh,
  dark: MdBrightness4,
  auto: MdBrightnessAuto,
}

const ThemeSwitch = () => {
  const currentTheme = React.useContext(ThemeContext)
  const setCurrentTheme = useThemeToggle()
  const [iconKey, setIconKey] = React.useState(currentTheme)

  React.useEffect(() => {
    /**
     * ### Force Update `Icon` component.
     *
     * Icon component is SSR rendered in the context of the `currentTheme`
     * from `ThemeContext` which is dark by default and in the SSR stage.
     *
     * Client side, when hydration occurs, React does a render and don't see
     * any changes in the virtual DOM when constructed because this was initially
     * prerendered in a context (server) React is oblivious to (client).
     *
     * Using `key={...}` in combination with `setIconKey` in `React.useEffect`
     * forces a rerender after components mount, making React to update the DOM
     * with the correct Icon that was rendered.
     *
     */
    setIconKey(Math.random())
  }, [])

  const getNextTheme = () => {
    const orderOfThemeSelection = Object.values(THEMES)
    const indexOfNextTheme =
      (orderOfThemeSelection.indexOf(currentTheme) + 1) %
      orderOfThemeSelection.length
    const nextTheme = orderOfThemeSelection[indexOfNextTheme]
    return nextTheme
  }

  const switchTheme = () => {
    const nextTheme = getNextTheme()
    setCurrentTheme(nextTheme)
  }

  const nextTheme = getNextTheme()

  const ThemeIcon = icons[currentTheme]

  return (
    <>
      <div className={tswitch.switchWrapper}>
        <Button
          className={tswitch.switchButton}
          onClick={switchTheme}
          aria-label={`Switch color scheme to ${nextTheme}`}
        >
          <ThemeIcon aria-hidden="true" key={iconKey} />
        </Button>
      </div>
    </>
  )
}

export default ThemeSwitch
