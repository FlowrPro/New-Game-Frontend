import { petals } from "./petal.js";
import { gainXP } from "./xp.js";

export function attackMob(player, mob, petalKey) {
  const petal = petals[petalKey];
  if (!petal || mob.health <= 0) return;

  const now = Date.now();
  if (petal.lastUsed && now - petal.lastUsed < petal.reload) return;

  petal.lastUsed = now;
  mob.health -= petal.damage;

  if (mob.health <= 0) {
    player = gainXP(player, mob.xpDrop);
    applyDrops(player, mob.drops);
  }

  if (petal.ability === "recoilMob") {
    mob.recoiling = true;
    setTimeout(() => (mob.recoiling = false), 1000);
  }

  if (petal.ability === "consumeHeal") {
    player.health = Math.min(player.health + petal.healAmount, getMaxHealth(player));
  }

  if (petal.ability === "consumeDamage") {
    mob.health -= petal.consumeEffect;
  }

  if (petal.ability === "revivePlayer") {
    // Placeholder: revive logic to be implemented
  }

  if (petal.ability === "summonCrow") {
    player.pets = player.pets || [];
    player.pets.push({
      type: "crow",
      damage: petal.crowStats.damage,
      health: petal.crowStats.health,
    });
  }

  return player;
}

function applyDrops(player, drops) {
  player.inventory = player.inventory || {};
  drops.forEach((item) => {
    player.inventory[item] = (player.inventory[item] || 0) + 1;
  });
}

function getMaxHealth(player) {
  return 50 + (player.level - 1) * 200;
}
