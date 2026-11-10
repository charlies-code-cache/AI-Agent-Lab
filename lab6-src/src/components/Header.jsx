import { Link } from 'react-router-dom'
import SiteNav from './SiteNav.jsx'

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        Trading Card Lab
      </Link>
      <SiteNav label="Main" linkClassName="nav-link" />
    </header>
  )
}
