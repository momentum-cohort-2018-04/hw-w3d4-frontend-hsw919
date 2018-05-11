class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.screen = canvas.getContext('2d')
        this.gameSize = { x: canvas.width, y: canvas.height }
        this.player = new Player(this);
        // console.log(this.draw)
        // this.update()
        // this.tick()
    }

    draw() {
        this.screen.lineWidth = 10;
        this.screen.strokeStyle = 'white';
        // console.log(this.gameSize.x)
        this.screen.strokeRect(150, 150, 200, 200)
        this.player.draw()
        
    }

    tick() {
        this.draw()
        // this.update()
        requestAnimationFrame(this.tick.bind(this));
    }

    update() {

    }
}

class Player {
    constructor(game) {
        this.game = game
        this.screen = game.screen
        this.keyboarder = new Keyboarder()
        this.center = { x: 250, y: 250 }
        this.size = { x: 40, y: 40 }

    }

    draw() {
        this.screen.fillStyle = 'red'
        this.screen.fillRect(230, 230, 40, 40)
    }

    update() {
        if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
            this.center.x 
        }
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
  
  Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };

var canvas = document.getElementById('square')
var canvasRun = new Game(canvas)
window.addEventListener('load', function() {
    canvasRun
    canvasRun.tick()
})