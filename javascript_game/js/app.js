// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 505 - 101;
    this.y = Math.random() * 166 + 83;
    this.speed = Math.random() * 70 + 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
    }
    if (Math.abs(this.x - player.x * 101) < 70 && Math.abs(this.y - player.y * 83) < 70) {
        player.y = 5;
        player.x = 2;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2
    this.y = 5;
    this.xvel = 0;
    this.yvel = 0;
    this.score = 0;
}

Player.prototype.update = function() {
    if (this.y === 0) {
        this.x = 2;
        this.y = 5;
        for (enemy in allEnemies) {
            allEnemies[enemy].speed = allEnemies[enemy].speed + 5;
        }
        if (allEnemies.length < 9) {
            allEnemies.push(new Enemy);
        }
        this.score++;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
}

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x--;
    } else if (direction === 'right' && this.x < 4) {
        this.x++;
    } else if (direction === 'up' && this.y > 0) {
        this.y--;
    } else if (direction === 'down' && this.y < 5) {
        this.y++;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy);
}

var player = new Player;

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
