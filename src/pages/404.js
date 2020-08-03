import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import H from '../components/heading'
import StuntList from '../components/stunt-list'
import Tape from '../components/tape'
import { First6ixPosts } from '../components/graphql'
import RecentPost from '../components/recent-post'

const LostInMars = () => {
  return (
    <Layout>
      <SEO
        title="404: Not found"
        meta={[{ name: `robots`, content: `noindex` }]}
      />
      <div
        style={{
          maxWidth: `var(--compact-width-small)`,
          margin: `5rem auto`,
          padding: `0 1rem`,
          overflow: `hidden`,
        }}
      >
        <div style={{ textAlign: `center` }}>
          <H as="1">404 Unlocked!</H>
          <p style={{ fontSize: `1.2rem` }}>
            Oh, ooops! Fellow Martian, seems your rover stopped pinging the
            radar, but I'm glad to tell; you just discovered a fourohfour
            artefact.
          </p>
        </div>

        <div style={{ marginTop: `2rem` }}>
          <H as="4">Rescue is here!</H>
          <Tape />
          <RecentPost />
        </div>
      </div>
    </Layout>
  )
}

export default LostInMars
