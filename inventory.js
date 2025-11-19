import { petals } from "./petal.js";

export const MAX_SLOTS = 6;

export function initializeInventory(player) {
  player.inventory = {}; // raw item counts
  player.slots = Array(MAX_SLOTS).fill(null); // equipped petals
  player.slotCooldowns = Array(MAX_SLOTS).fill(0); // cooldown timers
}

export function pickupItem(player, item) {
  if (!player.inventory[item]) {
    player.inventory[item] = 1;
  } else {
    player.inventory[item]++;
  }
}

export function equipToSlot(player, item, slotIndex) {
  if (slotIndex < 0 || slotIndex >= MAX_SLOTS) return;
  if (!player.inventory[item] || !petals[item]) return;

  player.slots[slotIndex] = item;
  player.slotCooldowns[slotIndex] = 0;
}

export function useSlot(player, slotIndex, targetMob) {
  const itemKey = player.slots[slotIndex];
  const petal = petals[itemKey];
  if (!petal || !targetMob) return;

  const now = Date.now();
  if (now - player.slotCooldowns[slotIndex] < petal.reload) return;

  targetMob.health -= petal.damage;
  player.slotCooldowns[slotIndex] = now;

  if (targetMob.health <= 0) {
    pickupItem(player, ...targetMob.drops);
  }

  // Apply petal abilities here if needed
}
