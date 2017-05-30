var CANVAS_WIDTH = 907;
var CANVAS_HEIGHT = 140;
var CANVAS_BOTTOM = 383;
var CANVAS_RIGHT = 915;
var CANVAS_LEFT = 2.5;
var PLAYER_SPEED = 25;
var ENEMYPATH_TOP = 184;
var ENEMYPATH_BOTTOM = 50;
var TOP_ENEMY_SPEED = 350;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-zombie.png';
    //collision
    this.width = 20;
    this.height = 75;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this. updatePosition(dt);
};

// make enemies loop to left side of canvas after reaching canvas.width
Enemy.prototype.updatePosition = function(dt) {
	this.x += this.speed * dt;
	if (this.x >= CANVAS_WIDTH){
		this.x = 0;
	}
    detectCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/char-scott.png';
    //collision
    this.width = 20;
    this.height = 75;

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function () {
    // function not needed right now
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//KeyPress Function

Player.prototype.handleInput = function(keyPress) {
	if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed;
    }
    console.log('keyPress is: ' + keyPress);
};




// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + aScore
        + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

var detectCollision = function(anEnemy) {
    // check for collision between enemy and player

    if (player.x < enemy.x + enemy.width && 
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.height + player.y > enemy.y) {

        console.log('collided');
        player.x = (CANVAS_WIDTH/2);
        player.y = CANVAS_BOTTOM;
        score -= 1;
    }
    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y <= 0) {        
        player.x = (CANVAS_WIDTH/2);
        player.y = CANVAS_BOTTOM;
        console.log('Level Completed!');

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);

    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > CANVAS_BOTTOM) {
        player.y = CANVAS_BOTTOM;
    }
    if (player.x > CANVAS_RIGHT) {
        player.x = CANVAS_RIGHT;
    }
    if (player.x < CANVAS_LEFT) {
        player.x = CANVAS_LEFT;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * (ENEMYPATH_TOP + ENEMYPATH_BOTTOM), Math.random() * TOP_ENEMY_SPEED);
        
        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player((CANVAS_WIDTH/2), CANVAS_BOTTOM, PLAYER_SPEED);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * (ENEMYPATH_TOP + ENEMYPATH_BOTTOM), Math.random() * TOP_ENEMY_SPEED);

allEnemies.push(enemy);


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
