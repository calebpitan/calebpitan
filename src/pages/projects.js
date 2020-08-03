import * as React from 'react'
import Layout from '../components/layout'
import { gcx } from '../utils'
import SEO from '../components/seo'
import H from '../components/heading'
import Tape from '../components/tape'

import blog from './blog/index.mod.scss'

const cx = gcx(blog)

const Projects = () => {
  return (
    <Layout>
      <SEO title={`Projects`} />
      <div className={cx('global-compact--layout', 'p5')}>
        <H as="1">Projects</H>
        <Tape />
        Some side projects
      </div>
    </Layout>
  )
}

export default Projects
