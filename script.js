class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.screen = canvas.getContext('2d')
        this.gameSize = { x: canvas.width, y: canvas.height }
        this.player = new Player(this)
        this.coin = new Coin(this)
    }

    update() {
        this.player.update()
    }

    draw() {
        this.screen.clearRect(0, 0, this.gameSize.x, this.gameSize.y)

        this.screen.lineWidth = 10
        this.screen.strokeStyle = 'white'
        this.screen.strokeRect(150, 150, 200, 200)

        this.player.draw()
        this.coin.draw()
    }

    tick() {
        this.draw()
        this.update()
        requestAnimationFrame(this.tick.bind(this))
    }

}

class Player {
    constructor(game) {
        this.game = game
        this.screen = game.screen
        this.center = { x: 250, y: 250 }
        this.size = { x: 40, y: 40 }
        this.keyboarder = new Keyboarder()
    }

    update() {
        if(this.keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.center.x > 185) {
            this.center.x -= 5
        } else if(this.keyboarder.isDown(Keyboarder.KEYS.RIGHT) && this.center.x < 315) {
            this.center.x += 5
        } else if(this.keyboarder.isDown(Keyboarder.KEYS.UP) && this.center.y > 185) {
            this.center.y -= 5
        } else if(this.keyboarder.isDown(Keyboarder.KEYS.DOWN) && this.center.y < 315) {
            this.center.y += 5
        }
    }

    draw() {
        this.screen.fillStyle = 'cyan'
        this.screen.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y)
    }
}

class Coin {
    constructor(game) {
        this.game = game
        this.screen = game.screen
        this.size = { x: 20, y: 20 }
        this.min = Math.ceil(185)
        this.max = Math.floor(315)
        this.xCord = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
        this.yCord = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
        this.center = { x: this.xCord, y: this.yCord }
        this.player = new Player(this.game)
    }

    draw() {
        this.screen.fillStyle = 'yellow'
        this.screen.fillRect(this.xCord, this.yCord, this.size.x, this.size.y)
    }
}

class Hazards {
    constructor(game) {
        this.game = game
        this.screen = game.screen

    }
}

class Keyboarder {
    constructor () {
      this.keyState = {}
      
      window.addEventListener('keydown', function(e) {
        this.keyState[e.keyCode] = true
      }.bind(this))
      
      window.addEventListener('keyup', function(e) {
        this.keyState[e.keyCode] = false
      }.bind(this))
    }
    
    isDown (keyCode) {
      return this.keyState[keyCode] === true
    }
    
    on (keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback()
        }
      })
    }                      
}
  
Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };

var colliding = function(b1, b2) {
    return !(
      b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    );
};

var canvas = document.getElementById('square')
var canvasRun = new Game(canvas)
window.addEventListener('load', function() {
    canvasRun.tick()
})