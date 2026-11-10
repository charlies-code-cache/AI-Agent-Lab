import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// React swaps the page without a reload, so a screen reader would not hear that the page
// changed. This hook sets the tab title and, after a route change, moves focus to the page's <h1>.
// Put the returned ref on the <h1> and give that <h1> tabIndex={-1}.
//
// The very first page load keeps the browser's normal focus behaviour; only in-app route
// changes move focus. Pass skipFocus when something else (like the welcome pop-up) should
// own focus on arrival.
let lastPath = null

export default function usePageHeading(title, { skipFocus = false } = {}) {
  const headingRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title

    const routeChanged = lastPath !== null && lastPath !== pathname
    lastPath = pathname

    if (routeChanged && !skipFocus) {
      headingRef.current?.focus()
    }
  }, [title, pathname, skipFocus])

  return headingRef
}
