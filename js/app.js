// GET CANVAS ELMENT AND CONTEXT FOR DRAWING ON CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// CANVAS SIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GRAVITY -- SIMULATES PLAYER FALLING (GOING DOWN)
const gravity = 0.5;

// PLAYER CLASS -- DEFINED

const unicornImg = new Image();
unicornImg.src = "media/unicorn-player.png";

class Player {
  constructor() {
    // PLAYER SIZE
    this.width = 100;
    this.height = 100;

    // SET INITIAN POSITION OF PLAYER (x, y)
    this.x = 100;
    this.y = canvas.height - this.height;

    // SET INITIAL SPEED TO 0 AND PLAYER RUNNING SPEED
    this.velocityY = 0;
    this.velocityX = 5;
    this.speed = 5;

    // BOOL -- check if player is jumping
    this.jumping = false;
  } //END OF CONSTRUCTOR

  // SETS PLAYER ON CANVAS
  draw() {
    ctx.drawImage(unicornImg, this.x, this.y, this.width, this.height);
  } //END DRAW METHOD

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
    } //END IF STATMENT

    // Call the draw method to render the player on the screen
    this.draw();
  } //END UPDATE METHOD

  // METHOD -- PLAYER JUMPING
  jump() {
    // Allows player to jump if they're not already in the air
    if (!this.jumping) {
      this.velocityY = -15; // Set jumping(up) speed
      this.jumping = true; //  returns boolean true if the player is jumping
    } //END IF STATEMENT
  } //END JUMP METHOD

  // METHOD -- MOVE LEFT
  moveLeft() {
    this.x -= this.speed; // Decrease x position to move left
  } //END OF MOVE LEFT METHOD

  // METHOD -- MOVE RIGHT
  moveRight() {
    this.x += this.speed; // Increase x position to move right
  } //END OF MOVE RIGHT METHOD
} //END OF PLAYER CLASS

// CREATES INSTANCE OF PLAYER CLASS
const player = new Player();

//CLASS FOR STARS -- Background
class Star {
  constructor (x, y, size, starBlink){
    this.x = x;
    this.y = y;
    this.size = size;
    this.blinkSpeed = blinkSpeed; // Controls how fast the star blinks
    this.opacity = Math.random(); // Random initial opacity
    this.blinking = Math.random() < 0.5 ? 1 : -1; // Randomly start increasing or decreasing opacity
  }

  
} //END Star CLASS

  // METHOD -- DRAWS THE STAR 
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Star with alternating opacity
    ctx.fill();
  }

  // METHOD -- UPDATES THE OPACITY OF STARTS (BLINK)
  update() {
    this.opacity += this.blinking * this.blinkSpeed;
    if (this.opacity >= 1) {
      this.opacity = 1;
      this.blinking= -1;  // fade star in opposite directions
    } else if (this.opacity <= 0) {
      this.opacity = 0;
      this.blinking= 1; // fade star in opposite directions
    }
    this.draw();
  }
}

// FUNCTION -- MAIN GAME LOOP THAT CONTINUOUSLY RUNS THE GAME
function gameLoop() {
  //RESTART -- Clear the entire canvas for redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Background
  createStarrySky();

  // Update the player's position and restart them
  player.update();

  // Repeats the game loop using requestAnimationFrame
  requestAnimationFrame(gameLoop);
} // END OF gameLoop FUNCTION

// EVENT LISTENERS FOR KEYBOARD STROKES
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    player.jump(); // Trigger jump -- spacebar
  } //END space IF
  if (e.code === "ArrowLeft") {
    player.moveLeft(); // Move left -- left arrow key
  } //END arrow Left IF
  if (e.code === "ArrowRight") {
    player.moveRight(); // Move  right -- right arrow key
  } //ND arrow right IF
}); //END OF KEYSTROKE EVENT LISTENERS

// CALLS gameLoop FUCNTION TO START GAME
gameLoop();
