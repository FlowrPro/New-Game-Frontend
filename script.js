// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height); // Draw player
}

function update() {
    // Update game state (e.g., player movement based on input)
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Loop continuously
}

// Start the game loop
gameLoop();

// Example of basic movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        player.x += player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.x -= player.speed;
    }
});
