export function getXPForLevel(level) {
  return 50 * Math.pow(2, level - 1);
}

export function gainXP(player, amount) {
  player.xp += amount;

  while (player.xp >= getXPForLevel(player.level)) {
    player.xp -= getXPForLevel(player.level);
    player.level++;
    player.health += 200;
    player.baseDamage += 30;
  }

  return player;
}

export function getMobXP(rarityIndex) {
  return 10 * Math.pow(3, rarityIndex);
}
