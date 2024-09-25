// GET CANVAS ELMENT AND CONTEXT FOR DRAWING ON CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// CANVAS SIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GRAVITY -- SIMULATES PLAYER FALLING (GOING DOWN)
const gravity = 0.5;

// PLAYER CLASS -- DEFINED
class Player {
  constructor() {
    // PLAYER SIZE
    this.width = 50;
    this.height = 50;

    // SET INITIAN POSITION OF PLAYER (x, y)
    this.x = 100;
    this.y = canvas.height - this.height;

    // SET INITIAL SPEED TO 0 AND PLAYER RUNNING SPEED
    this.velocityY = 0;
    this.velocityX = 5;
    this.speed = 5;

    // BOOL -- check if player is jumping
    this.jumping = false;
  }

  // SETS PLAYER ON CANVAS
  draw() {
    // FILLS PLAYER SQUARE
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // FUNCTION/METHOD -- UPDATES PLAYERS POSITION
  update() {
    // Moves player vertically based on their vertical speed
    this.y += this.velocityY;

    // Applies gravity to increase the downward speed over time
    this.velocityY += gravity;

    // Ensure the player doesn't fall below the bottom of the canvas
    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height; // Stop the player at ground level
      this.velocityY = 0; // Reset vertical speed
      this.jumping = false; // Player is no longer jumping
    }

    // Call the draw method to render the player on the screen
    this.draw();
  }

  // METHOD -- PLAYER JUMPING
  jump() {
    // Allows player to jump if they're not already in the air
    if (!this.jumping) {
      this.velocityY = -15; // Set jumping(up) speed
      this.jumping = true; //  returns boolean true if the player is jumping
    }
  }

  // METHOD -- MOVE LEFT
  moveLeft() {
    this.x -= this.speed; // Decrease x position to move left
  }

  // METHOD -- MOVE RIGHT
  moveRight() {
    this.x += this.speed; // Increase x position to move right
  }
}

// CREATES INSTANCE OF PLAYER CLASS
const player = new Player();

// FUNCTION -- MAIN GAME LOOP THAT CONTINUOUSLY RUNS THE GAME
function gameLoop() {
  //RESTART -- Clear the entire canvas for redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the player's position and restart them
  player.update();

  // Repeats the game loop using requestAnimationFrame
  requestAnimationFrame(gameLoop);
}

// EVENT LISTENERS FOR KEYBOARD STROKES 
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    player.jump(); // Trigger jump -- spacebar
  }
  if (e.code === "ArrowLeft") {
    player.moveLeft(); // Move left -- left arrow key
  }
  if (e.code === "ArrowRight") {
    player.moveRight(); // Move  right -- right arrow key 
  }
});

// CALLS gameLoop FUCNTION TO START GAME 
gameLoop();
