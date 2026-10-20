const card = document.getElementById('tradingCard');
const gameLayout = document.getElementById('gameLayout');
const playButton = document.getElementById('playButton');
const clickButton = document.getElementById('clickButton');
const scoreValue = document.getElementById('scoreValue');
const timeValue = document.getElementById('timeValue');
const bestValue = document.getElementById('bestValue');
const gameStatus = document.getElementById('gameStatus');
const levelValue = document.querySelector('[data-role="level"]');
const winDialog = document.getElementById('winDialog');
const startDialog = document.getElementById('startDialog');
const startGameButton = document.getElementById('startGameButton');
const closeWinButton = document.getElementById('closeWinButton');
const winMessage = document.getElementById('winMessage');

const STORAGE_KEYS = {
  bestScore: 'ai-agent-lab-best-score',
  level: 'ai-agent-lab-level'
};

const state = {
  bestScore: Number(localStorage.getItem(STORAGE_KEYS.bestScore)) || 0,
  level: Number(localStorage.getItem(STORAGE_KEYS.level)) || 21,
  score: 0,
  timeLeft: 10,
  isPlaying: false,
  timerId: null
};

const updateLevelDisplay = () => {
  if (levelValue) {
    levelValue.textContent = '21';
  }
};

const updateBestDisplay = () => {
  if (bestValue) {
    bestValue.textContent = String(state.bestScore);
  }
};

const persistState = () => {
  localStorage.setItem(STORAGE_KEYS.bestScore, String(state.bestScore));
  localStorage.setItem(STORAGE_KEYS.level, String(state.level));
};

const resetRound = () => {
  state.score = 0;
  state.timeLeft = 10;
  scoreValue.textContent = '0';
  timeValue.textContent = '10';
  clickButton.textContent = 'Start';
  gameStatus.textContent = 'Click the button as fast as you can for 10 seconds. Beat your level target to win.';
  clickButton.disabled = false;
  hideStartDialog();
};

const closeWinDialog = () => {
  winDialog.classList.add('hidden');
};

const showStartDialog = () => {
  if (startDialog) {
    startDialog.classList.remove('hidden');
  }
};

const hideStartDialog = () => {
  if (startDialog) {
    startDialog.classList.add('hidden');
  }
};

const showWinDialog = () => {
  winMessage.textContent = `You reached game level ${state.level}. Keep pushing your best score.`;
  winDialog.classList.remove('hidden');
};

const finishRound = () => {
  const didWin = state.score >= state.level;
  const previousBest = state.bestScore;

  if (state.score > state.bestScore) {
    state.bestScore = state.score;
    state.level += 1;
    persistState();
    updateBestDisplay();
  }

  if (didWin) {
    showWinDialog();
  }

  if (state.score <= previousBest && !didWin) {
    gameStatus.textContent = `Time is up. Final score: ${state.score}.`;
  } else if (state.score > previousBest) {
    gameStatus.textContent = `New high score! You reached ${state.score} clicks.`;
  } else {
    gameStatus.textContent = `Time is up. Final score: ${state.score}.`;
  }

  state.isPlaying = false;
  clickButton.textContent = 'Start';
  clickButton.disabled = false;
  clearInterval(state.timerId);
};

const startRound = () => {
  if (state.isPlaying) {
    return;
  }

  closeWinDialog();
  hideStartDialog();
  state.isPlaying = true;
  state.score = 0;
  state.timeLeft = 10;
  scoreValue.textContent = '0';
  timeValue.textContent = '10';
  clickButton.textContent = 'Click!';
  gameStatus.textContent = 'Go! Click as fast as you can for 10 seconds.';
  clickButton.disabled = false;

  clearInterval(state.timerId);

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    timeValue.textContent = String(Math.max(0, state.timeLeft));

    if (state.timeLeft <= 0) {
      finishRound();
    }
  }, 1000);
};

if (card) {
  const updateTilt = (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;

    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  card.addEventListener('pointermove', updateTilt);
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  });
}

if (playButton) {
  playButton.addEventListener('click', () => {
    if (!gameLayout.classList.contains('active')) {
      gameLayout.classList.add('active');
    }

    showStartDialog();
    closeWinDialog();
  });
}

if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    startRound();
  });
}

if (clickButton) {
  clickButton.addEventListener('click', () => {
    if (!state.isPlaying) {
      startRound();
      return;
    }

    state.score += 1;
    scoreValue.textContent = String(state.score);
  });
}

if (closeWinButton) {
  closeWinButton.addEventListener('click', closeWinDialog);
}

updateLevelDisplay();
updateBestDisplay();
resetRound();
