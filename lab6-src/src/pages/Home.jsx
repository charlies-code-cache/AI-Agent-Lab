import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TradingCard from '../components/TradingCard.jsx'
import GamePanel from '../components/GamePanel.jsx'
import WelcomeDialog from '../components/WelcomeDialog.jsx'
import useClickRush from '../hooks/useClickRush.js'
import usePageHeading from '../hooks/usePageHeading.js'
import { STORAGE_KEYS, readFlag, write } from '../storage.js'

// Lab 4's index.html. The welcome message shows once per page load (like Lab 4, where
// each load of index.html showed it), unless the visitor chose "Don't show this again".
// Adding ?welcome to the address always shows it.
let welcomeShownThisLoad = false

export default function Home() {
  const [searchParams] = useSearchParams()
  const forceWelcome = searchParams.has('welcome')

  const [showWelcome, setShowWelcome] = useState(() => forceWelcome || (!welcomeShownThisLoad && !readFlag(STORAGE_KEYS.hideWelcome)))
  const [gameOpen, setGameOpen] = useState(false)
  const [showStart, setShowStart] = useState(false)

  const game = useClickRush()
  // When the welcome pop-up is showing, it owns focus instead of the h1.
  const headingRef = usePageHeading('AI Agent Lab Trading Card', { skipFocus: showWelcome })
  const playButtonRef = useRef(null)
  const clickButtonRef = useRef(null)

  useEffect(() => {
    welcomeShownThisLoad = true
  }, [])

  const closeWelcome = (dontShowAgain) => {
    if (dontShowAgain) {
      write(STORAGE_KEYS.hideWelcome, '1')
    }
    setShowWelcome(false)
    playButtonRef.current?.focus()
  }

  const handlePlay = () => {
    setGameOpen(true)
    game.closeWin()
    setShowStart(true)
  }

  const closeStart = () => {
    setShowStart(false)
  }

  return (
    <>
      <main className="page-shell" id="main" tabIndex={-1}>
        <div className={gameOpen ? 'game-layout active' : 'game-layout'}>
          <TradingCard level={21} onPlay={handlePlay} playButtonRef={playButtonRef} headingRef={headingRef} />
          <GamePanel
            game={game}
            isOpen={gameOpen}
            showStart={showStart}
            onCloseStart={closeStart}
            clickButtonRef={clickButtonRef}
            playButtonRef={playButtonRef}
          />
        </div>
      </main>

      {showWelcome && <WelcomeDialog onClose={closeWelcome} />}
    </>
  )
}
