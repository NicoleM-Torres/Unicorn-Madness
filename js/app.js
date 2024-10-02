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
unicornImg.onload = assetLoaded;

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
      jumpSound.play(); // Play jump sound
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
  constructor(x, y, size, starBlink) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.blinkSpeed = starBlink; // Controls how fast the star blinks
    this.opacity = Math.random(); // Random initial opacity
    this.blinking = Math.random() < 0.5 ? 1 : -1; // Randomly start increasing or decreasing opacity
  }

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
      this.blinking = -1; // fade star in opposite directions
    } else if (this.opacity <= 0) {
      this.opacity = 0;
      this.blinking = 1; // fade star in opposite directions
    }
    this.draw();
  } //END IF
} //END Star CLASS

const stars = [];
//FUNCTION -- CREATES RANDOMIZED DOTS (STARS) AND
function nightSky() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2 + 1;
    const starBlink = Math.random() * 0.02 + 0.01; //gen random bliking speeds for stars
    stars.push(new Star(x, y, size, starBlink)); //stores new stars generated in arr
  } //END OF FOR LOOP
} //END OF nightSky FUNCTION

function makeStars() {
  stars.forEach((star) => star.update());
} // END makeStars FUNCTION

// #region Platforms
class Platform {
  constructor(x, y, width, height, type = "normal") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; //platforms that are normal or disintegrate
    this.image = new Image();
    this.image.src = "media/platform.png";
    this.image.onload = assetLoaded;
    this.isSteppedOn = false; // For disintegrating platforms
    this.opacity = 1; // For fading effect of the platform
  } //END CONSTRUCTOR

  draw() {
    if (this.type === "disintegrate" && this.isSteppedOn) {
      ctx.globalAlpha = this.opacity;
    } //END IF
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1; // Reset opacity
  } //END DRAW METHOD

  update() {
    // Handle disintegration of platforms
    if (this.type === "disintegrate" && this.isSteppedOn) {
      this.opacity -= 0.02;
      if (this.opacity <= 0) {
        // Remove the platform from the array
        platforms.splice(platforms.indexOf(this), 1);
      } //END IF
    } //END IF
    this.draw();
  } //END UPDATE METHOD
} //END PLATFORM CLASS

const platforms = [];

function createPlatforms() {
  platforms.push(new Platform(200, canvas.height - 200, 150, 30)); // Normal platform
  platforms.push(
    new Platform(400, canvas.height - 300, 150, 30, "disintegrate")
  ); // Disintegrating platform
} //END CREATEPLATFORMS FUNCTION

function checkPlatformCollisions() {
  platforms.forEach((platform) => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height <= platform.y &&
      player.y + player.height + player.velocityY >= platform.y
    ) {
      // Collision detected
      if (platform.type === "disintegrate") {
        platform.isSteppedOn = true;
      } //END IF

      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.jumping = false;
    } //END PLATFORM FOR EACH
    else if (
      player.x + player.width > platform.x && // Player's right side is to the left of platform's left side
      player.x < platform.x + platform.width && // Player's left side is to the right of platform's right side
      player.y + player.height > platform.y && // Player is below platform's top
      player.y < platform.y + platform.height // Player is above platform's bottom
    ) {
      //COLLISION LOG
    }
  }); //END PLATFORM CONTS;
} //END PlatformCollision FUCNTION
// #endregion

// #region Enemies
const enemies = [];

class Enemy {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 1; // 1 for right, -1 for left
    this.image = new Image();
    this.image.src = "media/villain.png";
    this.image.onload = assetLoaded;
  } //END OF CONTRUSTOR

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  } //END OF DRAW

  update() {
    // Move enemy back and forth
    this.x += this.speed * this.direction;

    // Change direction at canvas & movement limits
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.direction *= -1; // Change direction when reaching the screen edges
    } //END IF

    this.draw();
  } //END FO UPDATE
} //END OF CLASS ENEMY

function createEnemies() {
  enemies.push(new Enemy(500, canvas.height - 150, 80, 80, 2)); // Example enemy
  enemies.push(new Enemy(600, canvas.height - 200, 100, 100, 1.5)); // other enemy

  //enemyImage.onload = assetLoaded;
}

function checkEnemyCollisions() {
  enemies.forEach((enemy) => {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Collision with enemy detected
      enemyHitSound.play(); // Play enemy hit sound
      console.log("Collision with enemy!");
    } //END IF
  });
} //END checkEnemyCOllision Function

// #endregion

const jumpSound = new Audio("sounds/jump.mp3");
const enemyHitSound = new Audio("sounds/enemy-hit.mp3");

// FUNCTION -- MAIN GAME LOOP THAT CONTINUOUSLY RUNS THE GAME
function gameLoop() {
  ctx.fillStyle = "black"; // Set background color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with black

  //Background
  makeStars();

  // Update and draw platforms
  platforms.forEach((platform) => platform.update());

  // Update and draw enemies
  enemies.forEach((enemy) => enemy.update());

  // Check for collisions
  checkPlatformCollisions();
  checkEnemyCollisions();
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

// START GAME LOOP AFTER UNICORN IMAGE LOADS
unicornImg.onload = function () {
  nightSky(); // Create stars once
  gameLoop(); // Start the game
};

let assetsLoaded = 0;
const totalAssets = 3 + platforms.length + enemies.length; // Adjust based on the number of images

function assetLoaded() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    nightSky();
    createPlatforms();
    createEnemies();
    gameLoop();
  }
}
