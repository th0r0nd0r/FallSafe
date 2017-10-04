import Point from './point';

const canvas = document.getElementById("canvas");
// console.log("canvas",canvas);
const ctx = canvas.getContext("2d");


const width = canvas.width;
const height = canvas.height;

let startTime;
let lastTime;
let timeElapsed = 0;


const requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;


const point = new Point({
  lastX: width/2,
  lastY: height/2,
  nextX: width/2,
  nextY: height/2,
  position: {x: width/2, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 700,
  radius: 20
});

const point2 = new Point({
  lastX: width/3,
  lastY: height/2,
  nextX: width/3,
  nextY: height/2,
  position: {x: width/3, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 70000,
  radius: 20
});

const point3 = new Point({
  lastX: width/3,
  lastY: height/2,
  nextX: width/4,
  nextY: height/3,
  pinned: true,
  position: {x: width/4, y: height/6},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 10
});

const points = [point, point2, point3];
const g = 9.81;

point.addLinkTo(point3);
point.addLinkTo(point2);

const checkCollisions = (points) => {
  for (let i = 0; i < points.length; i++) {
    for (let j = 1; j < points.length; j++) {
      const pt1 = points[i];
      const pt2 = points[j];

      if (isCollidedWith(pt1, pt2)) {
        pt1.collideWith(pt2);
        pt2.collideWith(pt1);
      }
    }
  }
};

const isCollidedWith = (point, point2) => {
  const pos1 = {x: point.position.x, y: point.position.y};
  const pos2 = {x: point2.position.x, y: point2.position.y};
  if (pos1 === pos2) {
    return true;
  } else {
    return false;
  }
};

const animate = (currentTime) => {
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
  } else {
    timeElapsed = currentTime - lastTime;
    lastTime = currentTime;

    ctx.clearRect(0,0,width, height);

    for (let i = 0; i < points.length; i++) {
      points[i].solveLinkConstraints();
    }

    for (let i = 0; i < points.length; i++) {
      points[i].updatePos(timeElapsed);
    }

    checkCollisions(points);

    for (let i = 0; i < points.length; i++) {
      points[i].render();
    }
  }

  //
  // ctx.save();
  //
  // ctx.restore();



  requestAnimationFrame(animate);
};

animate();
