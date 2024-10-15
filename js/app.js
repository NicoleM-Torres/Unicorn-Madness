// GET CANVAS ELMENT AND CONTEXT FOR DRAWING ON CANVAS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// CANVAS SIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//#region PLAYER CLASS -- DEFINED
// GRAVITY -- SIMULATES PLAYER FALLING (GOING DOWN)
const gravity = 0.5;

const unicornImg = new Image();
<<<<<<< HEAD
<<<<<<< HEAD
unicornImg.onload = assetLoaded;
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
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
    this.jumpCount = 0; // Track the number of jumps

    this.health = 100; // Initial health
    this.points = 0; // Initial points
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
      this.jumpCount = 0; // Reset jump count when landing
    } //END IF STATEMENT

    checkPlatformCollisions(); // Check for collisions with platforms

    // Call the draw method to render the player on the screen
    this.draw();
  } //END UPDATE METHOD

  // METHOD -- PLAYER JUMPING
  jump() {
<<<<<<< HEAD
    // Allows player to jump if they haven't exceeded the jump limit (double jump)
    if (this.jumpCount < 2) {
      this.velocityY = -15; // Set jumping (up) speed
      this.jumping = true; // Set jumping state to true
      this.jumpCount++; // Increment the jump count
      jumpSound.play(); // Play jump sound
=======
    // Allows player to jump if they're not already in the air
    if (!this.jumping) {
      this.velocityY = -15; // Set jumping(up) speed
      this.jumping = true; //  returns boolean true if the player is jumping
<<<<<<< HEAD
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
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

// CREATES INSTANCE PLAYER
const player = new Player();
//#endregion

//#region Health Bar

const maxHealth = 100; // Max health

function drawHealthBar() {
  // Clear the previous health bar
  ctx.fillStyle = "black";
  ctx.fillRect(10, 10, 200, 20); // Background for the health bar

  // Draw background
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 200, 20);

  // Draw current health
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, (player.health / 100) * 200, 20); // Scale the health bar
}

//#endregion

//#region Point Bar

player.starsCollected = 0; // Add this to the Player class constructor

function drawPointBar() {
  // Clear the previous point bar area
  ctx.fillStyle = "black";
  ctx.fillRect(10, 40, 220, 20); // Background for the point bar

  // Draw the collected stars
  for (let i = 0; i < 5; i++) {
    if (i < player.starsCollected) {
      ctx.fillStyle = "yellow"; // Color for collected stars
    } else {
      ctx.fillStyle = "gray"; // Color for empty stars
    }
    ctx.fillRect(10 + i * 40, 40, 30, 20); // Draw each star's rectangle
  }
}

const starItems = [];

class StarItem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.image = new Image();
    this.image.src = "media/star.png"; // Path to the star image
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function createStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * (canvas.width - 20);
    const y = Math.random() * (canvas.height - 20);
    starItems.push(new StarItem(x, y));
  }
}

function checkStarCollisions() {
  starItems.forEach((star, index) => {
    if (
      player.x < star.x + star.width &&
      player.x + player.width > star.x &&
      player.y < star.y + star.height &&
      player.y + player.height > star.y
    ) {
      // Player collects the star
      player.starsCollected++;
      starItems.splice(index, 1); // Remove the star from the array
      console.log("Star collected! Total stars: " + player.starsCollected);

      // Cap starsCollected at 5
      if (player.starsCollected > 5) {
        player.starsCollected = 5;
      }
    }
  });
}

//#endregion

//#region CLASS FOR STARS -- Background
class Star {
  constructor(x, y, size, starSpeed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.blinkSpeed = starSpeed; // Controls how fast the star blinks
    this.opacity = Math.random(); // Random opacity
    this.blinking = Math.random() < 0.5 ? 1 : -1; // Randomly start increasing or decreasing opacity
  }

  //   METHOD -- DRAWS THE STAR
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

<<<<<<< HEAD
<<<<<<< HEAD
// #endregion

// #region Platforms
class Platform {
  constructor(x, y, width, height, type = "normal") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // "cloud" or "dissolve"
    this.isSteppedOn = false; // For dissolving platforms
    this.opacity = 1; // For fading effect of the platform
  }

  draw() {
    if (this.type === "cloud") {
      this.drawCloud();
    } else {
      // Draw regular platform (you can customize this as needed)
      ctx.fillStyle = "brown"; // Color for normal platform
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  drawCloud() {
    ctx.fillStyle = "white"; // Cloud color
    ctx.beginPath();
    ctx.arc(
      this.x + this.width / 4,
      this.y + this.height / 2,
      this.width / 4,
      Math.PI,
      0,
      false
    ); // Left part of cloud
    ctx.arc(
      this.x + (3 * this.width) / 4,
      this.y + this.height / 2,
      this.width / 4,
      Math.PI,
      0,
      false
    ); // Right part of cloud
    ctx.arc(this.x + this.width / 2, this.y, this.width / 4, 0, Math.PI, false); // Top part of cloud
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.type === "dissolve" && this.isSteppedOn) {
      this.opacity -= 0.02;
      if (this.opacity <= 0) {
        platforms.splice(platforms.indexOf(this), 1); // Remove platform
      }
    }
    ctx.globalAlpha = this.opacity; // Apply opacity
    this.draw(); // Draw the platform
    ctx.globalAlpha = 1; // Reset opacity
  }
} //END PLATFORM CLASS

const platforms = [];

function createRandomPlatforms(numPlatforms) {
  const minWidth = 50; // Minimum platform width
  const maxWidth = 200; // Maximum platform width
  const minHeight = 20; // Minimum platform height
  const maxHeight = 50; // Maximum platform height

  for (let i = 0; i < numPlatforms; i++) {
    const width =
      Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth; // Random width
    const height =
      Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight; // Random height
    const x = Math.floor(Math.random() * (canvas.width - width)); // Random x position
    const y = Math.floor(Math.random() * (canvas.height - height)); // Random y position

    // Randomly decide if the platform should dissolve
    const type = Math.random() < 0.5 ? "dissolve" : "normal"; // 50% chance for dissolve type
    platforms.push(new Platform(x, y, width, height, type)); // Add the platform to the platforms array
  }
}

function isOverlapping(newPlatform) {
  return platforms.some((platform) => {
    return (
      newPlatform.x < platform.x + platform.width &&
      newPlatform.x + newPlatform.width > platform.x &&
      newPlatform.y < platform.y + platform.height &&
      newPlatform.y + newPlatform.height > platform.y
    );
  });
}

function checkPlatformCollisions() {
  platforms.forEach((platform) => {
    // Check if the player is above the platform
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height <= platform.y &&
      player.y + player.height + player.velocityY >= platform.y
    ) {
      // Collision detected
      player.y = platform.y - player.height; // Position the player on top of the platform
      player.velocityY = 0; // Reset vertical velocity
      player.jumping = false; // Player is no longer jumping

      // Handle dissolving platforms
      if (platform.type === "dissolve") {
        platform.isSteppedOn = true; // Set as stepped on for dissolving
      }
    }
  });
}
//END PlatformCollision FUCNTION
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
    this.image.src = "media/spikeBall.png";
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

    // Keep the enemy within the visible bounds above platforms
    if (this.y <= 50 || this.y + this.height >= canvas.height) {
      this.direction *= -1; // Change direction if hitting the top or bottom
    }

    this.draw();
  } //END FO UPDATE
} //END OF CLASS ENEMY

function createEnemies() {
  // Only create enemies if there are fewer than 5
  while (enemies.length < 5) {
    const minY = 50; // Minimum y position above the ground
    const maxY = canvas.height - 100; // Maximum y position to allow some space above the bottom
    const x = Math.random() * (canvas.width - 80); // Random x position
    const y = Math.random() * (maxY - minY) + minY; // Random y position, between minY and maxY
    const speed = Math.random() * 2 + 1; // Random speed for enemies
    enemies.push(new Enemy(x, y, 80, 80, speed)); // Adjust width and height as necessary
  }
}

function checkEnemyCollisions() {
  enemies.forEach((enemy) => {
    // Check for collision
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Check if the player is above the enemy -- jump
      if (
        player.velocityY > 0 &&
        player.y + player.height - player.velocityY <= enemy.y
      ) {
        // Collision with the enemy while jumping
        enemyHitSound.play();
        console.log("Enemy defeated!");

        player.points += 10; // Gain points for jumping on the enemy
        console.log("Points: " + player.points);

        // Remove the enemy
        enemies.splice(enemies.indexOf(enemy), 1);
      } else {
        // Collision with enemy without jumping
        enemyHitSound.play(); // Play enemy hit sound
        console.log("You were hit!");

        player.health -= 10; // Lose health on hit
        if (player.health < 0) player.health = 0; // Prevent health from going negative
        console.log("Health: " + player.health);

        // Update the health bar
        drawHealthBar();

        // Check if player health is zero or below
        if (player.health <= 0) {
          console.log("Game Over!");
        }
      }
    }
  });
}
//END checkEnemyCOllision Function

const jumpSound = new Audio("sounds/jump.mp3");
const enemyHitSound = new Audio("sounds/enemy-hit.mp3");
// #endregion

//#region Player Movements
const keys = {
  left: false,
  right: false,
  up: false,
};

// Key down event listener
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") keys.left = true;
  if (event.key === "ArrowRight") keys.right = true;
  if (event.key === "ArrowUp") keys.up = true;
});

// Key up event listener
window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft") keys.left = false;
  if (event.key === "ArrowRight") keys.right = false;
  if (event.key === "ArrowUp") keys.up = false;
});

//#endregion

//#region  FUNCTION -- MAIN GAME LOOP THAT CONTINUOUSLY RUNS THE GAME
=======
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
// FUNCTION -- MAIN GAME LOOP THAT CONTINUOUSLY RUNS THE GAME
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
function gameLoop() {
  ctx.fillStyle = "black"; // Set background color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with black

  // Check for input and move the player
  if (keys.left) {
    player.moveLeft();
  }
  if (keys.right) {
    player.moveRight();
  }
  if (keys.up) {
    player.jump();
  }

  // Background
  makeStars();

<<<<<<< HEAD
<<<<<<< HEAD
  // Update and draw platforms
  platforms.forEach((platform) => platform.update());

  // Update and draw enemies
  enemies.forEach((enemy) => enemy.update());

  // Update and draw star items
  starItems.forEach((star) => star.draw());

  // Check for collisions
  checkPlatformCollisions();
  checkEnemyCollisions();
  checkStarCollisions(); // Check for star collection

=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
  // Update the player's position and restart them
  player.update();

  // Draw HUD elements
  drawHealthBar();
  drawPointBar(); // Draw the point bar

  // Check for game over condition
  if (player.health <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    setTimeout(restartGame, 2000);
    return; // Stop the game loop
  }

  // Repeats the game loop using requestAnimationFrame
  requestAnimationFrame(gameLoop);
}
// END OF gameLoop FUNCTION

function restartGame() {
  // Reset player properties
  player.health = maxHealth; // Reset health
  player.points = 0; // Reset points
  player.starsCollected = 0; // Reset collected stars
  player.x = 100; // Reset player position
  player.y = canvas.height - player.height; // Reset player Y position

  // Clear existing enemies, platforms, and stars
  enemies.length = 0;
  platforms.length = 0;
  starItems.length = 0;

  createRandomPlatforms(5); // Recreate platforms
  createEnemies(); // Recreate enemies
  createStars(5); // Recreate stars
  gameLoop(); // Restart the game loop
}
 //END restartGame FUNCTION

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
  createRandomPlatforms();
  createEnemies();
  gameLoop(); // Start the game
};
<<<<<<< HEAD
<<<<<<< HEAD

let assetsLoaded = 0;
const totalAssets = 3 + platforms.length + enemies.length; // Adjust based on the number of images

function assetLoaded() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    startGame();
  }
}

function startGame() {
  nightSky();
  createRandomPlatforms(5); // Generate 5 random platforms
  createStars(5); // Create 5 stars when setting up the game
  drawPointBar();
  createEnemies();
  gameLoop(); // Start the game loop
}

//#endregion
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
=======
>>>>>>> parent of 9e3d6b1 (platform, villain and collision add)
