const refs = {
  levelIndicator: document.getElementById('level-indicator'),
  timerDisplay: document.getElementById('timer-display'),
  streakIndicator: document.getElementById('streak-indicator'),
  livesContainer: document.getElementById('lives-container'),
  multiplicationDisplay: document.getElementById('multiplication-display'),
  optionsGrid: document.getElementById('options-grid'),
  problemCard: document.getElementById('problem-card'),
  statusMessage: document.getElementById('status-message'),
  modal: document.getElementById('game-over-modal'),
  modalSummary: document.getElementById('game-over-summary'),
};

let totalLives = 3;

export function setTotalLives(count) {
  totalLives = count;
  updateLives(count);
}

export function updateLevel(level) {
  refs.levelIndicator.textContent = level;
}

export function updateTimer(seconds) {
  const clamped = Math.max(0, seconds);
  refs.timerDisplay.textContent = clamped.toString().padStart(2, '0');
}

export function setTimerDanger(isDanger) {
  refs.timerDisplay.classList.toggle('danger', isDanger);
}

export function updateStreak(streak) {
  refs.streakIndicator.textContent = streak;
}

export function updateLives(lives) {
  refs.livesContainer.innerHTML = '';
  for (let i = 0; i < totalLives; i += 1) {
    const span = document.createElement('span');
    span.innerHTML = '&hearts;';
    span.className = `life${i < lives ? ' is-active' : ''}`;
    refs.livesContainer.appendChild(span);
  }
}

export function renderProblem({ a, b }) {
  refs.multiplicationDisplay.textContent = `${a} × ${b}`;
}

export function renderOptions(values) {
  refs.optionsGrid.innerHTML = '';
  const buttons = values.map((value, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.dataset.value = value.toString();
    button.setAttribute('aria-label', `Respuesta ${index + 1}: ${value}`);
    button.textContent = value;
    refs.optionsGrid.appendChild(button);
    return button;
  });
  return buttons;
}

export function flashProblemResult(type) {
  refs.problemCard.classList.remove('is-correct', 'is-wrong');
  if (!type) return;
  refs.problemCard.classList.add(type === 'correct' ? 'is-correct' : 'is-wrong');
  setTimeout(() => refs.problemCard.classList.remove('is-correct', 'is-wrong'), 700);
}

export function setStatusMessage(message, kind = '') {
  refs.statusMessage.textContent = message;
  refs.statusMessage.classList.remove('success', 'error');
  if (kind) refs.statusMessage.classList.add(kind);
}

export function showGameOver(summary) {
  refs.modalSummary.textContent = summary;
  refs.modal.classList.add('is-visible');
  refs.modal.setAttribute('aria-hidden', 'false');
}

export function hideGameOver() {
  refs.modal.classList.remove('is-visible');
  refs.modal.setAttribute('aria-hidden', 'true');
}
