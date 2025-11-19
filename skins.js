export const skins = {
  default: {
    name: "Default",
    cost: 0,
    modifiers: {
      healthMultiplier: 1,
      damageMultiplier: 1,
      speedMultiplier: 1,
      goldPerHour: 10,
    },
  },
  native: {
    name: "Native",
    cost: 100,
    modifiers: {
      healthMultiplier: 0.75,
      damageMultiplier: 2,
      speedMultiplier: 1,
      goldPerHour: 10,
    },
  },
  tourist: {
    name: "Tourist",
    cost: 200,
    modifiers: {
      healthMultiplier: 1,
      damageMultiplier: 1,
      speedMultiplier: 1,
      goldPerHour: 20,
    },
  },
  lizard: {
    name: "Lizard",
    cost: 250,
    modifiers: {
      healthMultiplier: 1,
      damageMultiplier: 1,
      speedMultiplier: 1.1,
      goldPerHour: 10,
    },
  },
  armadillo: {
    name: "Armadillo",
    cost: 500,
    modifiers: {
      healthMultiplier: 2,
      damageMultiplier: 1,
      speedMultiplier: 0.95,
      goldPerHour: 10,
    },
  },
  aztec: {
    name: "Aztec",
    cost: 1000,
    modifiers: {
      healthMultiplier: 1.5, // 2x then -25%
      damageMultiplier: 2,
      speedMultiplier: 1.1,
      goldPerHour: 10,
    },
  },
};

export function applySkinModifiers(player, skinKey) {
  const skin = skins[skinKey] || skins.default;
  const mod = skin.modifiers;

  return {
    ...player,
    health: 50 * mod.healthMultiplier + (player.level - 1) * 200 * mod.healthMultiplier,
    baseDamage: 10 * mod.damageMultiplier + (player.level - 1) * 30 * mod.damageMultiplier,
    speed: 2 * mod.speedMultiplier,
    goldPerHour: mod.goldPerHour,
    skin: skinKey,
  };
}
