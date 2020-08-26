import * as React from 'react'
import kebabCase from 'lodash/kebabCase'
import { FIREBASE_CLOUD_FUNCTIONS_BASEURL } from '../../utils'

const useFav = () => {
  return React.useMemo(
    () => ({
      async fav(title, postUrl) {
        const res = await fetch(
          `${FIREBASE_CLOUD_FUNCTIONS_BASEURL}/favorite/`,
          {
            method: 'POST',
            body: JSON.stringify({ stunt: kebabCase(title), postUrl }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        return await res.json()
      },

      async favCount(title) {
        const res = await fetch(
          `${FIREBASE_CLOUD_FUNCTIONS_BASEURL}/favorite/${kebabCase(title)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        return await res.json()
      },

      async favTotalCount() {
        const res = await fetch(
          `${FIREBASE_CLOUD_FUNCTIONS_BASEURL}/favorite`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        return await res.json()
      },
    }),
    []
  )
}

export default useFav
