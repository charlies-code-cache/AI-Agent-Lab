import { useState } from 'react'

// The card from Lab 4's index.html. It tilts toward the pointer; the tilt lives in state
// and is passed to the CSS as custom properties (--rotateX / --rotateY).
export default function TradingCard({ level, onPlay, playButtonRef, headingRef }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    setTilt({ x: (0.5 - y) * 16, y: (x - 0.5) * 16 })
  }

  return (
    <article
      className="trading-card"
      aria-label="Digital trading card"
      style={{ '--rotateX': `${tilt.x}deg`, '--rotateY': `${tilt.y}deg` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="card-topbar">
        <span className="set-name">AI Agent Lab</span>
        <span className="rarity">🌱 Type</span>
      </div>

      <div className="portrait-wrap">
        <div className="portrait" aria-hidden="true">
          <span>CG</span>
        </div>
      </div>

      <div className="info-block">
        <p className="label">Name</p>
        {/* The page's h1. After a route change, focus moves here (see usePageHeading). */}
        <h1 tabIndex={-1} ref={headingRef}>
          Charlie G.
        </h1>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <p className="label">Major</p>
          <p className="value">COMM &amp; CSEN</p>
        </div>
        <div className="stat">
          <p className="label">Level</p>
          <p className="value">{level}</p>
        </div>
      </div>

      <div className="ability-box">
        <p className="label">Special Ability</p>
        <p className="ability">AI Agent Wizard</p>
      </div>

      <button className="play-button" type="button" onClick={onPlay} ref={playButtonRef}>
        Play!
      </button>
    </article>
  )
}
