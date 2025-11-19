const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const socket = io();

let player = {
  x: 512,
  y: 384,
  speed: 2,
  level: 1,
  xp: 0,
  nextLevelXP: 50,
  health: 50,
  baseDamage: 10,
  skin: "default",
  gold: 0,
  petals: [],
  visible: true,
};

let keys = {};
let mapObjects = [];
let mobs = [];

document.getElementById("playBtn").addEventListener("click", () => {
  document.getElementById("homescreen").style.display = "none";
  canvas.style.display = "block";
  player.name = document.getElementById("username").value || "Player";
  socket.emit("join", player.name);
});

window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

function updatePlayerMovement() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

function drawPlayer() {
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(player.x, player.y, 15, 0, Math.PI * 2);
  ctx.fill();
}

function drawMap() {
  mapObjects.forEach((obj) => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  });
}

function drawUI() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Level: ${player.level}`, 10, 20);
  ctx.fillText(`XP: ${player.xp}/${player.nextLevelXP}`, 10, 40);
  ctx.fillText(`Gold: ${player.gold}`, 10, 60);
}

function checkLevelUp() {
  if (player.xp >= player.nextLevelXP) {
    player.level++;
    player.xp = 0;
    player.nextLevelXP *= 2;
    player.health += 200;
    player.baseDamage += 30;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayerMovement();
  drawMap();
  drawPlayer();
  drawUI();
  checkLevelUp();
  requestAnimationFrame(gameLoop);
}

function initMap() {
  mapObjects.push({
    x: 400,
    y: 300,
    width: 100,
    height: 100,
    color: "#8b5a2b", // Ruined Temple
  });

  for (let i = 0; i < 10; i++) {
    mapObjects.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: 30,
      height: 30,
      color: "#228b22", // Tree
    });
    mapObjects.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: 40,
      height: 40,
      color: "#808080", // Rock
    });
  }
}

initMap();
gameLoop();
