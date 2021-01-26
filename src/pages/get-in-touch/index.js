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
  const [requesting, setRequesting] = React.useState(false)

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setRequesting(true)

    const data = {
      'form-name': 'Get in Touch',
      name,
      email,
      message,
    }

    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode(data),
    })
      .then(() => {
        setRequesting(false)
        alert('Form submitted successfully')
      })
      .catch(() => {
        setRequesting(false)
        alert('Failed to submit')
      })
      .finally(() => {
        setName('')
        setEmail('')
        setMessage('')
      })
  }

  return (
    <Layout>
      <SEO title={`Contact`} />
      <div className={cx('global-compact--layout--sm', 'p4', 'pMd5')}>
        <H as="1" serif={true}>
          Contact
        </H>
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
            name="Get in Touch"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className={cx('contactMain')}
            onSubmit={handleSubmit}
          >
            <div>
              <label className={cx('srOnly')} htmlFor="n">
                Name
              </label>
              <Input
                id="n"
                type="text"
                value={name}
                name="name"
                placeholder="Jason Statham"
                onChange={e => setName(e.target.value)}
                autoCapitalize="false"
                autoComplete="false"
                autoCorrect="false"
                autoFocus
                required
              />
            </div>

            <div>
              <label className={cx('srOnly')} htmlFor="e">
                Email
              </label>
              <Input
                id="e"
                type="email"
                value={email}
                name="email"
                placeholder="jason@statham.com"
                onChange={e => setEmail(e.target.value)}
                autoCapitalize="false"
                autoComplete="false"
                autoCorrect="false"
                required
              />
            </div>
            <Textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ gridColumn: `1 / span 2` }}
              required
            />
            <input type="hidden" name="form-name" value="Reach Out" />
            <Button type="submit" disabled={requesting}>
              {requesting ? 'Sending...' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
