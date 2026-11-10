import { useEffect, useRef } from 'react'

const FOCUSABLE = 'button, a[href], input'

// Modal dialog used for the welcome, start and win pop-ups. Same behaviour as Lab 4:
// focus moves in when it opens, Tab stays inside, and Esc closes. It is rendered only
// while open, so mounting = opening and unmounting = closing. The page that owns the
// dialog hands focus back to the right control when it closes.
export default function Dialog({ className, labelledBy, describedBy, onClose, initialFocusRef, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const first = initialFocusRef?.current ?? dialogRef.current.querySelector(FOCUSABLE)
    first?.focus()
  }, [initialFocusRef])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      ref={dialogRef}
      className={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
