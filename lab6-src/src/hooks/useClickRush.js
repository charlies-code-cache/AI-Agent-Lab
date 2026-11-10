import { useEffect, useReducer } from 'react'
import { STORAGE_KEYS, readNumber, write } from '../storage.js'

const ROUND_SECONDS = 10
const IDLE_STATUS = 'Click the button as fast as you can for 10 seconds. Beat your level target to win.'

// The Click Rush game from Lab 4's script.js, as React state.
// Win a round by scoring at least your level; a new best score raises the level by one.
// All the rules live in one reducer so every state change is a plain function of the last state.
function reducer(state, action) {
  switch (action.type) {
    case 'start':
      if (state.isPlaying) {
        return state
      }
      return {
        ...state,
        isPlaying: true,
        score: 0,
        timeLeft: ROUND_SECONDS,
        showWin: false,
        status: 'Go! Click as fast as you can for 10 seconds.',
      }

    case 'click':
      return state.isPlaying ? { ...state, score: state.score + 1 } : state

    case 'tick': {
      if (!state.isPlaying) {
        return state
      }

      const timeLeft = state.timeLeft - 1
      if (timeLeft > 0) {
        return { ...state, timeLeft }
      }

      // Time is up: score the round.
      const didWin = state.score >= state.level
      const isNewBest = state.score > state.bestScore
      return {
        ...state,
        timeLeft: 0,
        isPlaying: false,
        showWin: didWin,
        bestScore: isNewBest ? state.score : state.bestScore,
        level: isNewBest ? state.level + 1 : state.level,
        status: isNewBest
          ? `New high score! You reached ${state.score} clicks.`
          : `Time is up. Final score: ${state.score}.`,
      }
    }

    case 'closeWin':
      return state.showWin ? { ...state, showWin: false } : state

    default:
      return state
  }
}

function init() {
  return {
    bestScore: readNumber(STORAGE_KEYS.bestScore, 0),
    level: readNumber(STORAGE_KEYS.level, 21),
    score: 0,
    timeLeft: ROUND_SECONDS,
    isPlaying: false,
    showWin: false,
    status: IDLE_STATUS,
  }
}

export default function useClickRush() {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  // Remember best score and level between visits.
  useEffect(() => {
    write(STORAGE_KEYS.bestScore, state.bestScore)
    write(STORAGE_KEYS.level, state.level)
  }, [state.bestScore, state.level])

  // One tick per second while a round is running.
  useEffect(() => {
    if (!state.isPlaying) {
      return undefined
    }

    const timerId = setInterval(() => dispatch({ type: 'tick' }), 1000)
    return () => clearInterval(timerId)
  }, [state.isPlaying])

  return {
    ...state,
    startRound: () => dispatch({ type: 'start' }),
    // Pressing the big button before a round starts one, like Lab 4.
    click: () => dispatch({ type: state.isPlaying ? 'click' : 'start' }),
    closeWin: () => dispatch({ type: 'closeWin' }),
  }
}
