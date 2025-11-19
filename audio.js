const sounds = {
  attack: new Audio("assets/sounds/attack.wav"),
  pickup: new Audio("assets/sounds/pickup.wav"),
  levelUp: new Audio("assets/sounds/levelup.wav"),
  background: new Audio("assets/sounds/ambient.mp3"),
};

sounds.background.loop = true;
sounds.background.volume = 0.3;

export function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}

export function startBackgroundMusic() {
  sounds.background.play();
}

export function stopBackgroundMusic() {
  sounds.background.pause();
  sounds.background.currentTime = 0;
}
