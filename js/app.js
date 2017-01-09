// Enemies our player must avoid
var originalEnemyX = -90;
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = originalEnemyX;
    this.y = y;
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 550) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = originalEnemyX;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// reset the player
Player.prototype.reset= function() {
    this.x = 200;
    this.y = 400;
};

// check collisions
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < this.x + 50 &&
            allEnemies[i].y < this.y + 50 &&
            allEnemies[i].x + 60 > this.x &&
            allEnemies[i].y + 50 > this.y) {
            // collision detected
            console.log("collision!");
            this.reset();
        }
    }
};

// reset the player when win
Player.prototype.update = function() {
    if (this.y <= 0) {
        alert("You Win!");
        this.reset();
    }
};

// render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// move the player by keys
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
      case "left":
            if (this.x > 0) {this.x = this.x - 101};
            break;
      case "right":
            if (this.x < 400) {this.x = this.x + 101};
            break;
      case "up":
            if (this.y > 0) {this.y = this.y - 80};
            break;
      case "down":
            if (this.y < 375) {this.y = this.y + 80};
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(60, 150);
var enemy2 = new Enemy(145, 180);
var enemy3 = new Enemy(222, 230);
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(200, 400);






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
