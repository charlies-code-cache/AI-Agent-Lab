import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageHeading from '../hooks/usePageHeading.js'

// Lab 4's support.html + support.js. Nothing is sent anywhere (class demo).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RULES = {
  name: (value) => (value ? '' : 'Enter your name'),
  email: (value) => {
    if (!value) {
      return 'Enter your email address'
    }
    return EMAIL_PATTERN.test(value) ? '' : 'Enter an email address like name@example.com'
  },
  message: (value) => {
    if (!value) {
      return 'Enter a message'
    }
    return value.length >= 20 ? '' : `Your message needs at least 20 characters (it has ${value.length})`
  },
}

const FIELD_IDS = ['name', 'email', 'message']
const EMPTY = { name: '', email: '', message: '' }

export default function Support() {
  const headingRef = usePageHeading('Support & Contact | AI Agent Lab Trading Card')

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({}) // field id -> message
  const [problems, setProblems] = useState([]) // what the error summary lists
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const [thanksName, setThanksName] = useState(null)

  // Focus moves to the summary / status message each time it appears, as in Lab 4.
  const [summaryTick, setSummaryTick] = useState(0)
  const [statusTick, setStatusTick] = useState(0)
  const summaryRef = useRef(null)
  const statusRef = useRef(null)
  const fieldRefs = { name: useRef(null), email: useRef(null), message: useRef(null) }

  useEffect(() => {
    if (summaryTick > 0) {
      summaryRef.current?.focus()
    }
  }, [summaryTick])

  useEffect(() => {
    if (statusTick > 0) {
      statusRef.current?.focus()
    }
  }, [statusTick])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))

    // After the first submit, clear each error as soon as the field is fixed.
    if (submittedOnce && !RULES[name](value.trim())) {
      setErrors((current) => ({ ...current, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedOnce(true)
    setThanksName(null)

    const nextErrors = {}
    const nextProblems = []
    FIELD_IDS.forEach((id) => {
      const message = RULES[id](values[id].trim())
      nextErrors[id] = message
      if (message) {
        nextProblems.push({ id, message })
      }
    })
    setErrors(nextErrors)

    if (nextProblems.length) {
      setProblems(nextProblems)
      setSummaryTick((tick) => tick + 1)
      return
    }

    setProblems([])
    setThanksName(values.name.trim())
    setStatusTick((tick) => tick + 1)
    setValues(EMPTY)
    setSubmittedOnce(false)
  }

  const fieldProps = (id) => ({
    id,
    name: id,
    value: values[id],
    onChange: handleChange,
    ref: fieldRefs[id],
    'aria-invalid': errors[id] ? 'true' : undefined,
  })

  const fieldError = (id) => (
    <p className="field-error" id={`${id}-error`} hidden={!errors[id]}>
      {errors[id] && (
        <>
          {/* The hidden "Error:" prefix tells screen reader users why the text is there. */}
          <span className="visually-hidden">Error: </span>
          {errors[id]}
        </>
      )}
    </p>
  )

  return (
    <main className="doc-main" id="main" tabIndex={-1}>
      <section className="panel" aria-labelledby="pageTitle">
        <h1 id="pageTitle" tabIndex={-1} ref={headingRef}>
          Support
        </h1>
        <p className="lede">
          Having trouble? Ask a question or report a bug here. Fields marked with * are required. Before submitting,
          check if the <Link to="/help">How to Play Guide</Link> has the answer to your question.
        </p>
      </section>

      <div className="support-grid">
        <section className="panel" aria-labelledby="formTitle">
          <div className="section-head">
            <h2 id="formTitle">Contact Us</h2>
          </div>

          {/* Added after Lab 5 testing: say where the message goes before it is sent, not just after. */}
          <p className="hint" id="formNote">
            Where does my message go? This site is a class project, so nothing is actually sent. When you press Send
            message, a confirmation appears on this page.
          </p>

          {problems.length > 0 && (
            <div
              className="error-summary"
              role="alert"
              tabIndex={-1}
              aria-labelledby="errorSummaryTitle"
              ref={summaryRef}
            >
              <h3 id="errorSummaryTitle">There is a problem with your message, try again.</h3>
              <ul>
                {problems.map((problem) => (
                  <li key={problem.id}>
                    <a
                      href={`#${problem.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        fieldRefs[problem.id].current?.focus()
                      }}
                    >
                      {problem.message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-describedby="formNote">
            <div className="field">
              <label htmlFor="name">Name *</label>
              <input {...fieldProps('name')} type="text" autoComplete="name" required aria-describedby="name-error" />
              {fieldError('name')}
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <p className="hint" id="email-hint">
                Example: name@example.com
              </p>
              <input
                {...fieldProps('email')}
                type="email"
                autoComplete="email"
                required
                aria-describedby="email-hint email-error"
              />
              {fieldError('email')}
            </div>

            <div className="field">
              <label htmlFor="message">Message *</label>
              <textarea {...fieldProps('message')} required aria-describedby="message-error" />
              {fieldError('message')}
            </div>

            <button className="submit-button" type="submit">
              Send message
            </button>
          </form>

          {thanksName !== null && (
            <p className="form-status" role="status" tabIndex={-1} ref={statusRef}>
              Thanks, {thanksName}! Your message is ready. This page is a class demo, so nothing was actually sent. For
              a real reply, open an issue on GitHub.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
