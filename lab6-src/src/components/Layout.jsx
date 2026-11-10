import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Shared page frame. In Lab 4 every HTML file repeated the skip link, header and footer;
// here they live once. The card page (/) has no footer, same as Lab 4's index.html.
export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={isHome ? 'app-shell' : 'app-shell doc-page'}>
      {/* A plain in-page anchor on purpose: the browser moves focus to <main id="main" tabindex="-1">. */}
      <a className="skip-link" href="#main">
        {isHome ? 'Skip to the card' : 'Skip to content'}
      </a>
      <Header />
      <Outlet />
      {!isHome && <Footer />}
    </div>
  )
}
