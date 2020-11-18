//set up canvas





const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //shortcut for canvas
canvas.width = 300;
canvas.height = 500;

function topCurve() {
    c.beginPath();
    c.arc(150, 150, 150, 0, Math.PI, true);
    c.closePath();
    c.lineWidth = 5;
    c.fillStyle = 'purple';
    c.fill();
    c.strokeStyle = '#550000';
    c.stroke();
}
     




//cursor & mouse letiables
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })


//make a circle

function Circle (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.vel = .50;

    this.draw = function() {
        //board area
        c.globalAlpha = .1;
        c.beginPath();
        c.moveTo(300,500);
        c.arc(150, 150, 150, 0, Math.PI, true);
        c.lineTo(0, 500);
        c.closePath();
        c.lineWidth = 5;
        c.fillStyle = 'green';
        c.fill();
        c.strokeStyle = '#550000';
        c.stroke();

        //back ground circles
        c.beginPath();
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'white';
        c.fillStyle = 'white';
        c.stroke(); 
        c.fill();

        //left bar
        c.fillRect(20, 300, 40, 250);
        

        //right bar
        c.fillRect(240,300, 40, 250);

        
        
    }

    //circle behaviors
    this.update = function(dt) {
        if (this.x + this.radius > c.innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > c.innerHeight  || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx * this.vel ; //
        this.y += this.dy * this.vel //

        //interactivity
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


var circleArray = [];
var lastTS = 0;
for (var i = 0; i <300; i++) {
    var radius = 20;
    var x = Math.random() * (innerWidth - radius*2) + radius; //keeps off the edge left & right
    var y = Math.random() * (innerHeight - radius*2) + radius; //keeps of the edge top & bottom
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    
        circleArray.push(new Circle(x,y,dx,dy,radius));
}


function animate() {
    var curTime = new Date().getTime();//
    var deltaMillis = curTime - lastTS;//
    lastTS = curTime;
    var dt = deltaMillis/1000.0;

    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);

        for (var i = 0; i<circleArray.length; i++){
            circleArray[i].update(dt);
        }
    }
    topCurve()
    animate();