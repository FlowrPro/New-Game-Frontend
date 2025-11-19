import { MAX_SLOTS } from "./inventory.js";

export function drawUI(ctx, player) {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Level: ${player.level}`, 10, 20);
  ctx.fillText(`XP: ${player.xp}/${player.nextLevelXP}`, 10, 40);
  ctx.fillText(`Gold: ${player.gold}`, 10, 60);
  ctx.fillText(`Health: ${player.health}`, 10, 80);

  drawInventorySlots(ctx, player);
}

function drawInventorySlots(ctx, player) {
  const startX = 10;
  const startY = 100;
  const slotSize = 40;
  const gap = 10;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const x = startX + i * (slotSize + gap);
    const y = startY;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, slotSize, slotSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, slotSize, slotSize);

    const itemKey = player.slots[i];
    if (itemKey) {
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(itemKey.slice(0, 3), x + 5, y + 25);

      const cooldown = player.slotCooldowns[i];
      const now = Date.now();
      const remaining = Math.max(0, cooldown + 1000 - now);
      if (remaining > 0) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(x, y, slotSize, slotSize);
        ctx.fillStyle = "white";
        ctx.fillText(`${Math.ceil(remaining / 1000)}s`, x + 5, y + 35);
      }
    }
  }
}
