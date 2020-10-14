import * as React from 'react'
import Layout from '../../components/layout'
import { gcx } from '../../utils'
import SEO from '../../components/seo'
import H from '../../components/heading'
import Tape from '../../components/tape'

import projects from './projects.mod.scss'
import { FiActivity, FiLink } from 'react-icons/fi'
import { AiOutlineGithub } from 'react-icons/ai'
import { BsFolder } from 'react-icons/bs'

const REPO_BASE = `https://github.com`
const USER_REPO_BASE = `${REPO_BASE}/calebpitan`

const cx = gcx(projects)

const featuredProjectx = [
  {
    name: `Eaveswall`,
    desc: `A society and campus blog built with Gatsby deployed on Netlify and has dynamism built in, beyond SSG`,
    url: `https://eaveswall.com`,
    repo: `${REPO_BASE}/eaveswall/eaveswall`,
    tags: [
      'Gatsby',
      'JavaScript',
      'React',
      'Netlify',
      'Styled Components',
      'NodeJs',
    ],
    contributors: 2,
  },
  {
    name: `ContextMenu`,
    desc: `A Javascript library for managing contextmenu across all devices written in Typescript`,
    url: `${USER_REPO_BASE}/contextmenu`,
    repo: `${USER_REPO_BASE}/contextmenu`,
    contributors: 1,
    tags: ['TypeScript', 'Frontend'],
  },
  {
    name: `Chat`,
    desc: `A collaborative project that debut a chat application built with NodeJs and WebSockets, all vanilla on the front`,
    url: `https://oluwakeye-chat.herokuapp.com`,
    repo: `${USER_REPO_BASE}/contextmenu`,
    contributors: 2,
    tags: ['WebSocket', 'NodeJs'],
  },
  {
    name: `nodejs-firebase-app`,
    desc: `A NodeJs Firebase app with Real Time Database and Firebase functions`,
    url: `${USER_REPO_BASE}/nodejs-firebase-app`,
    repo: `${USER_REPO_BASE}/nodejs-firebase-app`,
    contributors: 1,
    tags: ['Firebase', 'Serverless', 'NodeJs'],
  },
]

const Projects = () => {
  return (
    <Layout>
      <SEO title={`Projects`} />
      <div className={cx('global-compact--layout', 'p4', 'pMd5')}>
        <H as="1">Projects</H>
        <Tape />

        <div className={cx('projects')}>
          {featuredProjectx.map(
            ({ name, desc, url, repo, tags, contributors }) => {
              return (
                <div
                  className={cx('dFlex', 'flexColumn', 'project', 'p3', 'pMd4')}
                  key={`${name}-{repo}`}
                >
                  <div className={cx('dFlex', 'pb4')}>
                    <div className={cx('flexGrow1')}>
                      <BsFolder
                        aria-hidden="true"
                        style={{
                          fontSize: `3rem`,
                          fill: `var(--theme-color-sat)`,
                        }}
                      />
                    </div>

                    <div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cx('projectLink')}
                      >
                        <span className={cx('srOnly')}>Project Link</span>
                        <FiLink aria-hidden="true" />
                      </a>

                      <a
                        href={repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cx('projectLink')}
                      >
                        <span className={cx('srOnly')}>Github Repo</span>
                        <AiOutlineGithub aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <H as="2">{name}</H>
                  <div className={cx('projectDescription')}>{desc}</div>

                  <div className={cx('dFlex', 'flexWrap', 'mtAuto', 'mb3')}>
                    {tags.map(tag => {
                      return (
                        <div className={cx('projectTag')} key={tag}>
                          {tag}
                        </div>
                      )
                    })}
                  </div>

                  <div className={cx('dFlex', 'mtAuto')}>
                    <div className={cx('contributorCount')}>
                      <FiActivity aria-hidden="true" />
                      <span>{`${contributors} contributor${
                        contributors > 1 ? 's' : ''
                      } `}</span>
                    </div>
                    <div></div>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Projects
