export function setupInput(player, canvas, onSlotUse) {
  const keys = {};

  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;

    // Slot activation (1–6)
    const slotIndex = parseInt(e.key) - 1;
    if (slotIndex >= 0 && slotIndex < 6) {
      onSlotUse(slotIndex);
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    player.targetX = mouseX;
    player.targetY = mouseY;
  });

  return () => {
    // Movement logic
    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;
  };
}
