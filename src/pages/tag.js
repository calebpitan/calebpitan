import * as React from 'react'
import kebabCase from 'lodash/kebabCase'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import H from '../components/heading'
import Tape from '../components/tape'
import { gcx } from '../utils'

const cx = gcx()

const sortAtoZ = (a, b) =>
  a.fieldValue.toLowerCase() > b.fieldValue.toLowerCase() ? 1 : -1

const Tag = ({
  data: {
    allMdx: { group },
  },
}) => {
  return (
    <Layout>
      <SEO title={`Tag`} />
      <div className={cx('global-compact--layout', 'p4', 'pMd5')}>
        <H as="1">Tag</H>
        <Tape />

        <div>
          <ul
            className={cx(
              'dFlex',
              'flexWrap',
              'justifyContentEvenly',
              'listUnstyled'
            )}
          >
            {group.sort(sortAtoZ).map(tag => (
              <li
                className={cx('flexShrink0', 'mr2')}
                style={{ padding: `0.4rem` }}
                key={tag.fieldValue}
              >
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000, filter: { frontmatter: { publish: { eq: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Tag
