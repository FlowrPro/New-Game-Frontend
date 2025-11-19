export const rarityLevels = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Fabled",
  "Mythical",
  "Super",
];

export function getMobStats(baseDamage, baseHealth, rarityIndex) {
  const multiplier = Math.pow(3, rarityIndex);
  return {
    damage: baseDamage * multiplier,
    health: baseHealth * multiplier,
    xpDrop: 10 * multiplier,
    size: 1 + 0.5 * rarityIndex,
  };
}

export const mobTypes = {
  wasp: { baseDamage: 100, baseHealth: 25, drops: ["Stinger", "Antennae"] },
  stickbug: { baseDamage: 15, baseHealth: 15, drops: ["Stick", "Squash"] },
  crocodile: { baseDamage: 30, baseHealth: 50, drops: ["Tough Scale", "Tooth"] },
  snake: { baseDamage: 30, baseHealth: 20, drops: ["Scale", "Fang", "Light"] },
  coyote: { baseDamage: 20, baseHealth: 30, drops: ["Tooth", "Fur", "Tail"] },
  tameMutt: { baseDamage: 15, baseHealth: 20, drops: ["Tooth", "Fur", "Tail"] },
  zombie: {
    baseDamage: 5,
    baseHealth: 45,
    drops: ["Flesh", "Cloth"],
    infection: { damage: 5, duration: 5 },
  },
  witch: {
    baseDamage: 5,
    baseHealth: 30,
    drops: ["Strawberry", "Poisonous Flask", "Ygg"],
    hats: {
      red: { effect: "10/s for 3s" },
      blue: { effect: "5/s for 3s" },
      green: { effect: "none" },
    },
  },
  crow: { baseDamage: 15, baseHealth: 15, drops: ["Crow Egg", "Feather", "Pepper"] },
  mysteriousCreature: {
    baseDamage: 35,
    baseHealth: 50,
    drops: ["Sand", "Cucumber"],
    effect: "blind for 1s",
  },
  strawberryBush: { baseDamage: 10, baseHealth: 30, drops: ["Strawberry", "Stick"] },
  squashVine: {
    baseDamage: 10,
    baseHealth: 40,
    drops: ["Squash", "Vine"],
    effect: "10/s for 2s",
  },
  cucumberPlant: { baseDamage: 20, baseHealth: 40, drops: ["Cucumber", "Stick"] },
};

export function spawnMob(type, rarityIndex, x, y) {
  const base = mobTypes[type];
  const stats = getMobStats(base.baseDamage, base.baseHealth, rarityIndex);
  return {
    type,
    rarity: rarityLevels[rarityIndex],
    x,
    y,
    ...stats,
    drops: base.drops,
    behavior: "neutral", // default, can be overridden
  };
}
