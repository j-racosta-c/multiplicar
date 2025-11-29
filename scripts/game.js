import {
  setTotalLives,
  updateLives,
  updateLevel,
  updateTimer,
  setTimerDanger,
  updateStreak,
  renderProblem,
  renderOptions,
  flashProblemResult,
  setStatusMessage,
  showGameOver,
  hideGameOver,
} from './ui.js';
import { AudioManager } from './audio.js';

const MAX_LIVES = 3;
const BASE_TIME = 30;
const MIN_TIME = 1;
const SHORT_DELAY = 900;

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const audio = new AudioManager();

const state = {
  level: 1,
  lives: MAX_LIVES,
  streak: 0,
  bestStreak: 0,
  correctAnswers: 0,
  currentProblem: null,
  optionButtons: [],
  timerId: null,
  timeRemaining: BASE_TIME,
  tickingFast: false,
  inRound: false,
};

function init() {
  setTotalLives(MAX_LIVES);
  updateLevel(state.level);
  updateTimer(BASE_TIME);
  updateStreak(0);
  setStatusMessage('Presiona "Iniciar" para comenzar');

  startBtn?.addEventListener('click', startGame);
  restartBtn?.addEventListener('click', startGame);
}

function startGame() {
  resetState();
  hideGameOver();
  setStatusMessage('¡A jugar!', 'success');
  beginRound();
}

function resetState() {
  stopCountdown();
  Object.assign(state, {
    level: 1,
    lives: MAX_LIVES,
    streak: 0,
    bestStreak: 0,
    correctAnswers: 0,
    currentProblem: null,
    optionButtons: [],
    timerId: null,
    timeRemaining: BASE_TIME,
    tickingFast: false,
    inRound: false,
  });
  updateLevel(state.level);
  updateLives(state.lives);
  updateStreak(state.streak);
  updateTimer(BASE_TIME);
  setTimerDanger(false);
  flashProblemResult();
}

function beginRound() {
  state.inRound = true;
  const problem = createProblem();
  state.currentProblem = problem;
  renderProblem(problem);

  const options = renderOptions(buildOptions(problem.result));
  state.optionButtons = options;
  options.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', handleAnswer, { once: true });
  });

  startCountdown();
}

function createProblem() {
  const a = randomInt(1, 10);
  const b = randomInt(1, 10);
  return { a, b, result: a * b };
}

function buildOptions(correctAnswer) {
  const values = new Set([correctAnswer]);
  while (values.size < 3) {
    const offset = randomInt(2, 9) * (Math.random() > 0.5 ? 1 : -1);
    let candidate = correctAnswer + offset;
    if (candidate < 1) candidate = correctAnswer + Math.abs(offset);
    values.add(candidate);
  }
  return shuffle([...values]);
}

function handleAnswer(event) {
  if (!state.inRound) return;
  stopCountdown();
  const selectedValue = Number(event.currentTarget.dataset.value);
  const isCorrect = selectedValue === state.currentProblem.result;
  lockOptions();
  if (isCorrect) {
    processCorrect(event.currentTarget);
  } else {
    processIncorrect(event.currentTarget);
  }
}

function processCorrect(button) {
  state.correctAnswers += 1;
  state.streak += 1;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  updateStreak(state.streak);
  flashProblemResult('correct');
  button.classList.add('is-correct');
  setStatusMessage('¡Bien hecho!', 'success');
  audio.playCorrect();
  advanceLevel();
}

function processIncorrect(button) {
  state.streak = 0;
  updateStreak(state.streak);
  flashProblemResult('wrong');
  button.classList.add('is-wrong');
  setStatusMessage('Ups, intenta con la siguiente', 'error');
  audio.playWrong();
  loseLife();
}

function handleTimeout() {
  if (!state.inRound) return;
  lockOptions();
  state.inRound = false;
  state.streak = 0;
  updateStreak(state.streak);
  flashProblemResult('wrong');
  setStatusMessage('¡Tiempo agotado! Juego finalizado.', 'error');
  audio.playWrong();
  state.lives = 0;
  updateLives(state.lives);
  endGame();
}

function advanceLevel() {
  state.level += 1;
  updateLevel(state.level);
  proceedToNextRound();
}

function loseLife() {
  state.lives -= 1;
  updateLives(state.lives);
  if (state.lives <= 0) {
    endGame();
    return;
  }
  state.level += 1;
  updateLevel(state.level);
  proceedToNextRound();
}

function proceedToNextRound() {
  state.inRound = false;
  setTimerDanger(false);
  setTimeout(() => {
    state.optionButtons.forEach((btn) => btn.classList.remove('is-correct', 'is-wrong'));
    beginRound();
  }, SHORT_DELAY);
}

function lockOptions() {
  state.optionButtons.forEach((button) => {
    button.disabled = true;
  });
}

function startCountdown() {
  stopCountdown();
  const total = Math.max(MIN_TIME, BASE_TIME - (state.level - 1));
  state.timeRemaining = total;
  updateTimer(state.timeRemaining);
  setTimerDanger(false);
  state.tickingFast = false;

  state.timerId = setInterval(() => {
    state.timeRemaining -= 1;
    updateTimer(state.timeRemaining);

    if (state.timeRemaining <= 5) {
      setTimerDanger(true);
      if (!state.tickingFast) {
        audio.startTick();
        state.tickingFast = true;
      }
    }

    if (state.timeRemaining <= 0) {
      stopCountdown();
      handleTimeout();
    }
  }, 1000);
}

function stopCountdown() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  if (state.tickingFast) {
    audio.stopTick();
    state.tickingFast = false;
  }
}

function endGame() {
  state.inRound = false;
  stopCountdown();
  setTimerDanger(false);
  setStatusMessage('Presiona "Iniciar" para volver a jugar');
  audio.playGameOver();
  const summary = `Nivel alcanzado: ${state.level}. Respuestas correctas: ${state.correctAnswers}. Mejor racha: ${state.bestStreak}.`;
  showGameOver(summary);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

init();
