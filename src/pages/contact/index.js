import * as React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { gcx } from '../../utils'
import Tape from '../../components/tape'
import H from '../../components/heading'
import Input from '../../components/input'
import Textarea from '../../components/input/textarea'
import contact from './contact.mod.scss'
import Button from '../../components/button'

const cx = gcx(contact)

const Contact = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  return (
    <Layout>
      <SEO title={`Contact`} />
      <div className={cx('global-compact--layout--sm', 'p4', 'pMd5')}>
        <H as="1">Contact</H>
        <Tape />
        <p className={cx('contactMessage', 'mb5')}>
          Wanna reach out, work or do business with me, buy my products?
          <br />
          Here is one way to let me know!
        </p>
        <div>
          <form
            action="/"
            method="post"
            data-netlify="true"
            className={cx('contactMain')}
          >
            <label className={cx('srOnly')} htmlFor="n">
              Name
            </label>
            <Input
              id="n"
              type="text"
              value={name}
              name="name"
              placeholder="Jason Statham"
              onChange={(e) => setName(e.target.value)}
              autoCapitalize="false"
              autoComplete="false"
              autoCorrect="false"
              autoFocus
              required
            />

            <label className={cx('srOnly')} htmlFor="e">
              Email
            </label>
            <Input
              id="e"
              type="email"
              value={email}
              name="email"
              placeholder="jason@statham.com"
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="false"
              autoComplete="false"
              autoCorrect="false"
              required
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ gridColumn: `1 / span 2` }}
              required
            />
            <input type="hidden" name="form-name" value="Reach Out" />
            <Button type="submit">Send message</Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
