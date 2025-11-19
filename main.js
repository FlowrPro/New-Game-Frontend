import { loadPlayer, savePlayer } from "./save.js";
import { initializeInventory } from "./inventory.js";
import { applySkinModifiers } from "./skins.js";
import { generateMap, drawMap, checkCollision, checkTreeHiding } from "./map.js";
import { drawUI } from "./ui.js";
import { drawOtherPlayers, connectToServer, sendPlayerUpdate } from "./network.js";
import { setupInput } from "./input.js";
import { startBackgroundMusic } from "./audio.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = loadPlayer() || {
  name: "Player",
  level: 1,
  xp: 0,
  gold: 0,
  health: 50,
  baseDamage: 10,
  skin: "default",
  x: 512,
  y: 384,
  visible: true,
};

player = applySkinModifiers(player, player.skin);
initializeInventory(player);
generateMap(canvas.width, canvas.height);
startBackgroundMusic();

connectToServer(player, () => {});

const handleInput = setupInput(player, canvas, (slotIndex) => {
  // Slot usage logic placeholder
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleInput();
  checkTreeHiding(player);
  drawMap(ctx);
  drawOtherPlayers(ctx);
  drawUI(ctx, player);

  sendPlayerUpdate(player);
  savePlayer(player);

  requestAnimationFrame(gameLoop);
}

gameLoop();
