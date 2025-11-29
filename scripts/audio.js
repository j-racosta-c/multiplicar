const SOUND_URLS = {
  correct: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_31b2c40977.mp3?filename=short-success-sound-glockenspiel-treasure-video-game-6346.mp3',
  wrong: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_5b457769c4.mp3?filename=retro-arcade-lose-1-230538.mp3',
  gameOver: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f053218497.mp3?filename=retro-game-over-arcade-21392.mp3',
  tick: 'https://cdn.pixabay.com/download/audio/2022/03/23/audio_2b19bc9f68.mp3?filename=clock-ticking-fast-137469.mp3',
};

function buildAudio(url, volume = 0.65, loop = false) {
  const audio = new Audio(url);
  audio.preload = 'auto';
  audio.volume = volume;
  audio.loop = loop;
  return audio;
}

export class AudioManager {
  constructor() {
    this.correct = buildAudio(SOUND_URLS.correct, 0.7);
    this.wrong = buildAudio(SOUND_URLS.wrong, 0.7);
    this.gameOver = buildAudio(SOUND_URLS.gameOver, 0.8);
    this.tick = buildAudio(SOUND_URLS.tick, 0.4, true);
  }

  playCorrect() {
    this.#safePlay(this.correct);
  }

  playWrong() {
    this.#safePlay(this.wrong);
  }

  playGameOver() {
    this.#safePlay(this.gameOver);
  }

  startTick() {
    this.#safePlay(this.tick);
  }

  stopTick() {
    this.tick.pause();
    this.tick.currentTime = 0;
  }

  #safePlay(audio) {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      /* La reproducción puede ser bloqueada; no es crítico. */
    });
  }
}
