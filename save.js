const SAVE_KEY = "betaIslandSave";

export function savePlayer(player) {
  const data = {
    name: player.name,
    level: player.level,
    xp: player.xp,
    gold: player.gold,
    health: player.health,
    baseDamage: player.baseDamage,
    skin: player.skin,
    inventory: player.inventory,
    slots: player.slots,
    slotCooldowns: player.slotCooldowns,
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadPlayer() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    return {
      ...data,
      x: 512,
      y: 384,
      visible: true,
    };
  } catch (e) {
    console.error("Failed to load save:", e);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
