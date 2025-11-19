let socket;
let otherPlayers = {};

export function connectToServer(player, onPlayersUpdate) {
  socket = io("https://game-backend-9wuo.onrender.com"); 
  socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    socket.emit("join", player.name);
  });

  socket.on("players", (players) => {
    otherPlayers = { ...players };
    delete otherPlayers[socket.id]; // Remove self from others
    onPlayersUpdate(otherPlayers);
  });
}

export function sendPlayerUpdate(player) {
  if (socket && socket.connected) {
    socket.emit("update", {
      x: player.x,
      y: player.y,
      level: player.level,
      xp: player.xp,
      gold: player.gold,
      skin: player.skin,
    });
  }
}

export function drawOtherPlayers(ctx) {
  Object.values(otherPlayers).forEach((p) => {
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(p.name, p.x - 20, p.y - 20);
  });
}
