
//set up canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //shortcut for canvas
canvas.width = 300;
canvas.height = 500;



//cursor & mouse 
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    } )

class GameBoard {
    constructor(color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.moveTo(300, 500);
        c.arc(150, 150, 150, 0, Math.PI, true);
        c.lineTo(0, 500);
        c.closePath();
        c.lineWidth = 5;
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = this.color;
        c.stroke();
        c.globalAlpha = .1;
    }
    
}

class Bumpers {
    constructor(radius) {
        this.radius = radius
    }
    draw() {
        //bumper 1
        c.fillStyle = 'yellow';
        c.strokeStyle = 'yellow';
        c.beginPath();
        c.arc(150,150,radius,0, Math.PI * 2, false);
        c.stroke();
        c.fill();

        //bumper 2
        c.beginPath();
        c.arc(250,175,radius,0, Math.PI * 2, false);
        c.stroke();
        c.fill();

        //bumper 3
        c.beginPath();
        c.arc(60,175,radius,0, Math.PI * 2, false);
        c.stroke();
        c.fill();

        //bumper 4
        c.beginPath();
        c.arc(190,60,radius,0, Math.PI * 2, false);
        c.stroke();
        c.fill();

        //bumper 5
        c.beginPath();
        c.arc(90,76,radius,0, Math.PI * 2, false);
        c.stroke();
        c.fill();
    }
}

class Ball {
    
    constructor(x, y, radius, velX, velY) {
        this.x = x; 
        this.y = y;
        this.radius = radius;   
        this.velX = velX;
        this.velY = velY; 
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillstyle = 'silver';
        c.stroke();
        c.fill();
    }  

    update(dt) {
        this.velY += (gravity * dt);
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
        this.draw();        //do draw after physics
    }

}

class Launcher {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;    
    }

    draw() {
        c.fillRect(this.x, this.y, this.width, this.height);
        c.stroke();
        c.fillStyle = 'red';  
        
    }
    
    update(dt) {
        
        window.addEventListener('keydown', event => {
            if (event.key == 'ArrowDown') {
                this.y += (5 * (dt * .1));
                this.power += (5 * (dt * .2)) //adding power over time
                
            }

            
        });

        window.addEventListener('keyup', event => {
            if (event.key == 'ArrowDown') {
                    this.y = 300;
                }

        });

        this.draw();
    }
}

class Play {
    constructor(over, lifeCount){
    this.over = over;
    this.lifeCount = lifeCount;
    }

    
}

//background circles
function Circle (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.vel = .75;

    this.draw = function() {
        
        //back ground circles
        c.beginPath();
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'pink';
        c.fillStyle = 'pink';
        c.stroke(); 
        c.fill();

        //left bar
        c.fillStyle = 'yellow';
        c.fillRect(20, 300, 40, 250);
        

        //right bar
        c.fillRect(240,300, 40, 250);   
        
        
    }


    //background circle behaviors
    this.update = function(dt) {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > canvas.height  || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx * this.vel ; //
        this.y += this.dy * this.vel //

        //interactivity of background w/ mouse
          if  (mouse.x - this.x < 50 && mouse.x -this.x > - 50
            && mouse.y - this.y < 50 && mouse.y - this.y > - 50
            ) {
                if (this.radius < 20) {
                this.radius += 1;}
            }
            
            else if(this.radius > 2) {
                this.radius -= 1;
            }

        this.draw();
    }
}

//populate background circles
var circleArray = [];
var lastTS = 0;
for (var i = 0; i <33; i++) {
    var radius = 20;
    var x = Math.random() * (canvas.width - radius*2) + radius; //keeps off the edge left & right
    var y = Math.random() * (canvas.height - radius*2) + radius; //keeps of the edge top & bottom
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    
        circleArray.push(new Circle(x,y,dx,dy,radius));
}

const gravity = 1;
const gameboard = new GameBoard('gold');
const bumpers = new Bumpers(20);
const ball = new Ball(150, 200, 10, 0, 0);
const launcher = new Launcher(280, 300, 20, 200);







gameboard.draw();
bumpers.draw();
ball.draw();
launcher.draw();

function animate() {
    var curTime = new Date().getTime();//
    var deltaMillis = curTime - lastTS;//
    lastTS = curTime;
    let dt = deltaMillis/1000.0;
    dt = Math.min(dt, .1);

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.update(dt);
    gameboard.draw();
    bumpers.draw();
    launcher.update(dt);
    
        for (var i = 0; i < circleArray.length; i++){
            circleArray[i].update(dt);
        }
    }
    
    animate()