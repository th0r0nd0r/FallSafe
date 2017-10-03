const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = 'blue';
ctx.strokeStyle = '#000000';

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let startTime;
let lastTime;
let timeElapsed = 0;
let lastX;
let lastY;
let nextX;
let nextY;


const requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;


const point = {
  position: {x: canvasWidth/2, y: canvasHeight/2},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 20
};

const Area = (Math.PI * point.radius * point.radius) / 10000;
const g = 9.81;
const Fx = 0;
const Fy = 0;


const animate = (currentTime) => {
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
    lastX = point.position.x;
    lastY = point.position.y;
  } else {
    timeElapsed = currentTime - lastTime;
    lastTime = currentTime;

    let aX = Fx / point.mass;
    let aY = g + (Fy / point.mass);

    let deltaX = point.position.x - lastX;
    let deltaY = point.position.y - lastY;

    nextX = point.position.x + deltaX + aX * (timeElapsed / 100);
    nextY = point.position.y + deltaY + aY * (timeElapsed / 100);

    lastX = point.position.x;
    lastY = point.position.y;

    point.position.x = nextX;
    point.position.y = nextY;
    
    // point.velocity.x += aX * (timeElapsed / 1000);
    // point.velocity.y += aY * (timeElapsed / 1000);
    //
    // point.position.x += point.velocity.x * (timeElapsed / 1000);
    // point.position.y += point.velocity.y * (timeElapsed / 1000);
  }

  ctx.clearRect(0,0,canvasWidth, canvasHeight);

  ctx.save();

  ctx.translate(point.position.x, point.position.y);
  ctx.beginPath();
  ctx.arc(0, 0, point.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.closePath();

  ctx.restore();


  requestAnimationFrame(animate);
};

animate();
