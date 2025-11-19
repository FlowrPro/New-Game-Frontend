export const TILE_SIZE = 64;

export const terrain = {
  trees: [],
  rocks: [],
  temple: [],
};

export function generateMap(width, height) {
  terrain.trees = [];
  terrain.rocks = [];
  terrain.temple = [];

  // Ruined Temple (spawn)
  terrain.temple.push({
    x: 400,
    y: 300,
    width: 128,
    height: 128,
    color: "#8b5a2b",
    type: "temple",
    solid: true,
  });

  // Trees
  for (let i = 0; i < 20; i++) {
    terrain.trees.push({
      x: Math.random() * width,
      y: Math.random() * height,
      width: 48,
      height: 48,
      color: "#228b22",
      type: "tree",
      solid: false,
    });
  }

  // Rocks
  for (let i = 0; i < 15; i++) {
    terrain.rocks.push({
      x: Math.random() * width,
      y: Math.random() * height,
      width: 40,
      height: 40,
      color: "#808080",
      type: "rock",
      solid: true,
    });
  }
}

export function drawMap(ctx) {
  [...terrain.temple, ...terrain.trees, ...terrain.rocks].forEach((obj) => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    // Shade
    if (obj.type === "temple") {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(obj.x + 5, obj.y + 5, obj.width, obj.height);
    } else if (obj.type === "rock" || obj.type === "tree") {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.width, obj.height);
    }
  });
}

export function checkCollision(player) {
  const solids = [...terrain.rocks, ...terrain.temple];
  return solids.some((obj) =>
    player.x + 15 > obj.x &&
    player.x - 15 < obj.x + obj.width &&
    player.y + 15 > obj.y &&
    player.y - 15 < obj.y + obj.height
  );
}

export function checkTreeHiding(player) {
  const tree = terrain.trees.find(
    (t) =>
      player.x > t.x &&
      player.x < t.x + t.width &&
      player.y > t.y &&
      player.y < t.y + t.height
  );

  if (tree) {
    if (!player.hideTimer) player.hideTimer = Date.now();
    if (Date.now() - player.hideTimer > 3000) player.visible = false;
  } else {
    player.hideTimer = null;
    player.visible = true;
  }
}
