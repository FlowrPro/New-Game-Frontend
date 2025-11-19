const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (can also be done in CSS)
canvas.width = 800;
canvas.height = 600;
function gameLoop() {
    // Update game state (e.g., player position, enemy movement)
    // Clear the canvas
    // Draw game elements

    requestAnimationFrame(gameLoop); // Call itself for the next frame
}

gameLoop(); // Start the game loop
class Player {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        // Update player position based on input or game logic
    }
}

const player = new Player(50, 50, 30, 'red');
document.addEventListener('keydown', (event) => {
    // Handle key presses (e.g., move player)
});
function checkCollision(obj1, obj2) {
    // Logic to determine if two objects are overlapping
    // Return true or false
}
