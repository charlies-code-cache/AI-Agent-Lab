import { NavLink } from 'react-router-dom'

// Shared by the header and the footer. NavLink sets aria-current="page" on the
// link for the page you are on, which is what the Lab 4 CSS styles.
const LINKS = [
  { to: '/', label: 'Card', end: true },
  { to: '/help', label: 'How to Use' },
  { to: '/support', label: 'Support' },
]

export default function SiteNav({ label, linkClassName }) {
  return (
    <nav aria-label={label}>
      <ul className={linkClassName ? 'nav-list' : undefined}>
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} end={link.end} className={linkClassName}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
