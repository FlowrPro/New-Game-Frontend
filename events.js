const activeEvents = {
  strawberryFestival: {
    name: "Strawberry Festival",
    start: new Date("2025-06-01"),
    end: new Date("2025-06-30"),
    bonusDrops: ["Strawberry", "Strawberry Hat"],
    mobBoosts: {
      witch: { dropRateBoost: 2 },
      strawberryBush: { spawnRateBoost: 1.5 },
    },
    playerBuffs: {
      xpMultiplier: 1.2,
      goldMultiplier: 1.5,
    },
  },
};

export function getActiveEvents() {
  const now = new Date();
  return Object.values(activeEvents).filter(
    (event) => now >= event.start && now <= event.end
  );
}

export function applyEventBonuses(player, mob) {
  const events = getActiveEvents();
  events.forEach((event) => {
    if (event.playerBuffs) {
      if (event.playerBuffs.xpMultiplier) {
        player.xp *= event.playerBuffs.xpMultiplier;
      }
      if (event.playerBuffs.goldMultiplier) {
        player.gold *= event.playerBuffs.goldMultiplier;
      }
    }

    if (event.mobBoosts && event.mobBoosts[mob.type]) {
      mob.dropRateBoost = event.mobBoosts[mob.type].dropRateBoost || 1;
    }

    if (event.bonusDrops) {
      mob.drops.push(...event.bonusDrops);
    }
  });
}
