import { Link } from 'react-router-dom'
import usePageHeading from '../hooks/usePageHeading.js'
import step1 from '../assets/tutorial/step-1-welcome.png'
import step2 from '../assets/tutorial/step-2-card.png'
import step3 from '../assets/tutorial/step-3-start.png'
import step4 from '../assets/tutorial/step-4-win.png'

// Lab 4's help.html ("How to Use").
export default function Help() {
  const headingRef = usePageHeading('How to Use | AI Agent Lab Trading Card')

  return (
    <main className="doc-main" id="main" tabIndex={-1}>
      <section className="panel" aria-labelledby="pageTitle">
        <h1 id="pageTitle" tabIndex={-1} ref={headingRef}>
          How to Use
        </h1>
        <p className="lede">
          Welcome to my trading card website! This page explains how to navigate and use the website, along with all
          of the accessability features we have.
        </p>
        {/* Added after Lab 5 testing: the tester wanted more on what the site actually is. */}
        <p className="lede">
          <strong>What is this site?</strong> It is a digital trading card for me, Charlie G., with a 10-second
          clicker game called Click Rush built into it. Press <strong>Play</strong> on the card to try the game.
        </p>
        <p className="lede">
          <strong>Still stuck?</strong> Check out our <Link to="/support">support page</Link>.
        </p>
      </section>

      <section className="panel" id="tutorial" aria-labelledby="tutorialTitle">
        <div className="section-head">
          <h2 id="tutorialTitle">Tutorial &amp; Walkthrough</h2>
          <p className="lede">Follow these steps to learn how to use the website.</p>
        </div>

        <ol className="steps">
          <li className="step">
            <figure>
              <img src={step1} width="960" height="780" alt="The welcome message on first visit." />
            </figure>
            <div>
              <h3>1. Review the Pop Up</h3>
              <p>
                When you open the card, a short welcome pop-up explains what the page does. Click{' '}
                <strong>Let's Go</strong> to close it. You can also click <strong>Read the Guide First</strong> to
                come here.
              </p>
              <p className="kbd-tip">
                Keyboard Shortcuts: <strong>Tab</strong> moves between buttons, <strong>Enter</strong> picks one,{' '}
                <strong>Esc</strong> closes the pop-up.
              </p>
            </div>
          </li>

          <li className="step">
            <figure>
              <img src={step2} width="960" height="780" alt="The card and its stats." />
            </figure>
            <div>
              <h3>2. Open the Card</h3>
              <p>
                The card lists Charlie's name, major, level, and special ability. Press <strong>Play</strong> to start
                open the game window.
              </p>
              <p className="kbd-tip">
                Keyboard Shortcuts: <strong>Tab</strong> moves between buttons or <strong>Enter</strong> picks one.
              </p>
            </div>
          </li>

          <li className="step">
            <figure>
              <img src={step3} width="960" height="780" alt="The game panel and the How to play pop-up." />
            </figure>
            <div>
              <h3>3. Press Start</h3>
              <p>
                Press <strong>Start</strong> when you're ready to start the game!
              </p>
              <p className="kbd-tip">
                Keyboard Shortcuts: <strong>Tab</strong> moves between buttons or <strong>Enter</strong> picks one.
              </p>
            </div>
          </li>

          <li className="step">
            <figure>
              <img src={step4} width="960" height="780" alt="Winning a round." />
            </figure>
            <div>
              <h3>4. Play the Game</h3>
              <p>
                Click or tap the big <strong>"Click"</strong> button as many times as you can before the timer hits
                zero. Score at least your level target to win. A new best score raises the target by one, so the next
                round is a little harder.
              </p>
              <p className="kbd-tip">
                Keyboard Shortcuts: <strong>Space</strong> or <strong>Enter</strong> on the "Click" button.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="panel" id="faq" aria-labelledby="faqTitle">
        <div className="section-head">
          <h2 id="faqTitle">FAQs</h2>
        </div>

        <div className="faq">
          <div className="faq-item">
            <h3>Can I play without a mouse?</h3>
            <p>
              Yes. <strong>Tab</strong> moves between buttons and <strong>Enter</strong> picks one. In the game, you
              can tap <strong>Space</strong> or <strong>Enter</strong> instead of clicking. <strong>Esc</strong>{' '}
              closes any pop-up.
            </p>
          </div>
          <div className="faq-item">
            <h3>Does it work on a phone?</h3>
            <p>Yes. Tap instead of clicking.</p>
          </div>
          <div className="faq-item">
            <h3>Does it work with a screen reader?</h3>
            <p>Yes, all interactive elements are properly labeled with alt text for screen reader accessibility.</p>
          </div>
          <div className="faq-item">
            <h3>Is there Alt Text for images?</h3>
            <p>All images have alt text for screen readers.</p>
          </div>
        </div>
      </section>

      <div className="cta-row">
        <Link className="cta-button" to="/support">
          Still stuck? Contact Support
        </Link>
        <Link className="cta-button light" to="/">
          Back to the Card
        </Link>
      </div>
    </main>
  )
}
