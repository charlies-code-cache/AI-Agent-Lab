import { useRef } from 'react'
import Dialog from './Dialog.jsx'

// The Click Rush panel from Lab 4's index.html: scoreboard, the big click button, a live status
// line, and the "how to play" and "you win" pop-ups.
export default function GamePanel({
  game,
  isOpen,
  showStart,
  onCloseStart,
  clickButtonRef,
  playButtonRef,
}) {
  const startButtonRef = useRef(null)
  const continueButtonRef = useRef(null)

  const handleStartFromDialog = () => {
    game.startRound()
    onCloseStart()
    clickButtonRef.current?.focus()
  }

  const handleCloseWin = () => {
    game.closeWin()
    clickButtonRef.current?.focus()
  }

  return (
    // inert keeps the hidden (collapsed) panel out of the tab order until Play is pressed.
    <aside className="game-panel" aria-label="Game challenge panel" inert={!isOpen}>
      <div className="game-header">
        <p className="label">Challenge</p>
        <h2>Click Rush</h2>
      </div>

      <div className="scoreboard">
        <div className="score-box">
          <span>Time</span>
          <strong>{game.timeLeft}</strong>
        </div>
        <div className="score-box">
          <span>Score</span>
          <strong>{game.score}</strong>
        </div>
        <div className="score-box">
          <span>Best</span>
          <strong>{game.bestScore}</strong>
        </div>
      </div>

      <button className="click-button" type="button" onClick={game.click} ref={clickButtonRef}>
        {game.isPlaying ? 'Click!' : 'Start'}
      </button>
      <p className="game-status" aria-live="polite">
        {game.status}
      </p>
      {/* Added after Lab 5 testing: the tester was confused about what "level" means.
          Only rendered once the panel is open, so the collapsed card keeps its Lab 4 size. */}
      {isOpen && (
        <p className="game-status">
          Level target: score at least {game.level} clicks to win. Each new best score raises the target by one.
        </p>
      )}

      {showStart && (
        <Dialog
          className="start-dialog"
          labelledBy="startTitle"
          onClose={onCloseStart}
          initialFocusRef={startButtonRef}
          returnFocusRef={playButtonRef}
        >
          <div className="start-card">
            <p className="label">How to play</p>
            <h3 id="startTitle">Click Rush</h3>
            <p>Press Start, then click the button as fast as you can for 10 seconds. Beat your current level to win.</p>
            <button className="dialog-button" type="button" ref={startButtonRef} onClick={handleStartFromDialog}>
              Start
            </button>
          </div>
        </Dialog>
      )}

      {game.showWin && (
        <Dialog
          className="win-dialog"
          labelledBy="winTitle"
          onClose={handleCloseWin}
          initialFocusRef={continueButtonRef}
        >
          <div className="win-card">
            <p className="label">Victory</p>
            <h3 id="winTitle">You win!</h3>
            <p>You reached game level {game.level}. Keep pushing your best score.</p>
            <button className="dialog-button" type="button" ref={continueButtonRef} onClick={handleCloseWin}>
              Continue
            </button>
          </div>
        </Dialog>
      )}
    </aside>
  )
}
