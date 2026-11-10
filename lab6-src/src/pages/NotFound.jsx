import { Link } from 'react-router-dom'
import usePageHeading from '../hooks/usePageHeading.js'

// Not in Lab 4 (a static site just shows the host's 404). With client-side routing the app
// has to answer unknown paths itself, so this page keeps the same look and nav.
export default function NotFound() {
  const headingRef = usePageHeading('Page not found | AI Agent Lab Trading Card')

  return (
    <main className="doc-main" id="main" tabIndex={-1}>
      <section className="panel" aria-labelledby="pageTitle">
        <h1 id="pageTitle" tabIndex={-1} ref={headingRef}>
          Page not found
        </h1>
        <p className="lede">There is nothing at this address.</p>
        <div className="cta-row">
          <Link className="cta-button" to="/">
            Back to the Card
          </Link>
        </div>
      </section>
    </main>
  )
}
