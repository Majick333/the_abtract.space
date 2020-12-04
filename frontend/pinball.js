
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
    constructor(x, y, radius, velocity) {
        this.x = x; 
        this.y = y;
        this.radius = radius;   
        this.velocity = velocity;   
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillstyle = 'silver';
        c.stroke();
        c.fill();
    }  

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }

}

class Launcher {
    constructor(color) {
        this.color = color
    }

    draw() {
    c.fillStyle = this.color;
    c.fillRect(20,300,10,250);
    c.stroke();
    
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


const gameboard = new GameBoard('gold');
const bumpers = new Bumpers(20);
const ball = new Ball(150, 400, 10,)
const launcher = new Launcher('blue');

gameboard.draw();
bumpers.draw();
ball.draw();
launcher.draw();

function animate() {
    var curTime = new Date().getTime();//
    var deltaMillis = curTime - lastTS;//
    lastTS = curTime;
    var dt = deltaMillis/1000.0;

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    ball.draw();
    gameboard.draw();
    bumpers.draw();
    launcher.draw();
    
        for (var i = 0; i < circleArray.length; i++){
            circleArray[i].update(dt);
        }
    }
    
    animate();