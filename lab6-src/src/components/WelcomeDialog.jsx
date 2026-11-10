import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from './Dialog.jsx'

// The welcome message from Lab 4's index.html. "Don't show this again" is saved by the
// parent (Home) when the pop-up closes.
export default function WelcomeDialog({ onClose }) {
  const titleRef = useRef(null)
  const [hideNextTime, setHideNextTime] = useState(false)

  return (
    <Dialog
      className="welcome-dialog"
      labelledBy="welcomeTitle"
      describedBy="welcomeText"
      onClose={() => onClose(hideNextTime)}
      initialFocusRef={titleRef}
    >
      <div className="welcome-card">
        <h2 id="welcomeTitle" tabIndex={-1} ref={titleRef}>
          Welcome!
        </h2>
        <p id="welcomeText">
          Flip through my stats, then press <strong>Play</strong> to play a fun game! <br />
          <br />
          You can navigate the page with a mouse, via touchscreen, or with a keyboard using the Tab, Enter, and Esc
          keys.
        </p>
        <div className="welcome-actions">
          <button className="dialog-button" type="button" onClick={() => onClose(hideNextTime)}>
            Let's go
          </button>
          <Link className="dialog-link" to="/help">
            Read the guide first
          </Link>
        </div>
        <label className="welcome-check">
          <input type="checkbox" checked={hideNextTime} onChange={(event) => setHideNextTime(event.target.checked)} />{' '}
          Don't show this again
        </label>
      </div>
    </Dialog>
  )
}
