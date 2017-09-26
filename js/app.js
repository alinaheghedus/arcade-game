
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x >= 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.score = 0;
    this.lives = 5;
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x = 400;
        }
    }

    if (this.y < 5 || this.y > 400) {
        if (this.y < 5) {
            this.win();
        } else {
            this.reset();
        }
    }

    this.checkCollissions();
}    

// Draw the player on the screen, required method for game
Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = '30px serif';
    ctx.fillText("Score: " + this.score + " Lives: " + this.lives, 15, 90);
};

Player.prototype.handleInput = function(direction) {
     if (direction === "up") {
        this.y -= 50;
    } else if (direction === "down") {
        this.y += 50;
    } else if (direction === "left") {
        this.x -= 50;
    } else if (direction === "right") {
        this.x += 50;
    }
};    

Player.prototype.checkCollissions = function () {
    for (var i=0; i<allEnemies.length; i++) {
        if(this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.height + this.y > allEnemies[i].y) {
            console.log('collission detected');
            this.reset();
        }
    };

    if(this.x < gem.x + gem.width &&
       this.x + this.width > gem.x &&
       this.y < gem.y + gem.height &&
       this.height + this.y > gem.y) {
        console.log('you got 1 gem');

        gem.vanish();
    }

     if(this.x < heart.x + heart.width &&
       this.x + this.width > heart.x &&
       this.y < heart.y + heart.height &&
       this.height + this.y > heart.y) {
        console.log('you got 1 heart');

        heart.vanish();
    }


};

Player.prototype.reset = function (x,y) {
    window.alert('TRY AGAIN!');
    this.x = 200;
    this.y = 400;
    this.score -= 100;
    this.lives -= 1;

    if(this.lives === 0) {
        player.startNewGame();
    }
}

Player.prototype.startNewGame = function() {
    this.lives = 5;
    this.score = 0;
}

Player.prototype.win = function(x, y) {
    window.alert('YOU WON!');
    this.x = 200;
    this.y = 400;
    this.score += 100;
    this.lives += 1;
};
    

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy (-100, 65, 50);
var enemy2 = new Enemy (-100, 145, 85);
var enemy3 = new Enemy (-100, 230, 135);
var enemy4 = new Enemy (-100, 300, 100);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];


var player = new Player (200, 400);


var Gem = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/gem-orange.png';
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 15;
};

Gem.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Gem.prototype.vanish = function() {
   this.x = Math.floor(Math.random() * 200) + 1;
   this.y = Math.floor(Math.random() * 6) * 80;
   player.score += 50;
}

var gem = new Gem (200, 100);

var Heart = function (x, y) {
    this.sprite = 'images/heart.png';
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
}

Heart.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.vanish = function() {
   this.x = Math.floor(Math.random() * 100) + 6;
   this.y = Math.floor(Math.random() * 5) * 60;
   player.lives += 1;
}

var heart = new Heart (400, 400);


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

