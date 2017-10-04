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
  radius: 10
});

const point2 = new Point({
  lastX: width/3,
  lastY: height/2,
  nextX: width/3,
  nextY: height/2,
  position: {x: width/3, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 70000,
  radius: 10
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

const point4 = new Point({
  lastX: width/6,
  lastY: height/12,
  nextX: width/6,
  nextY: height/12,
  position: {x: width/6, y: height/12},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 10
});

const point5 = new Point({
  lastX: (.75 * width),
  lastY: height/12,
  nextX: (.75 * width),
  nextY: height/12,
  position: {x: (.75 * width), y: height/12},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 20
});

const points = [point, point2, point3, point4, point5];
const g = 9.81;

point.addLinkTo({otherPoint: point3, restingDistance: 50});
point.addLinkTo({otherPoint: point2, restingDistance: 50});
point4.addLinkTo({otherPoint: point5, restingDistance: (Math.abs(point4.position.x - point5.position.x))});

const checkCollisions = (points) => {
  for (let i = 0; i < (points.length - 1); i++) {
    for (let j = (i + 1); j < points.length; j++) {
      const pt1 = points[i];
      const pt2 = points[j];

      if ((pt1 !== pt2) && isCollidedWith(pt1, pt2)) {
        console.log("collision?", isCollidedWith(pt1, pt2));
        pt1.collideWith(pt2);
        pt2.collideWith(pt1);
      }
    }
  }
};

// const checkLinkCollisions = (points) => {
//   const links = [];
//   const pinned = [];
//   for (let i = 0; i < points.length; i++) {
//     if (points[i].pinned) {
//       pinned.push(points[i]);
//     }
//     points[i].links.forEach((link) => {
//       links.push(link);
//     });
//   }
//   // debugger;
//   for (let i = 0; i < pinned.length; i++) {
//     for (let j = 0; j < links.length; j++) {
//       let pinnedPt = pinned[i];
//       let link = links[j];
//       if ((link.point1 !== pinnedPt) && (link.point2 !== pinnedPt)) {
//         if (isCollidedWithLink(pinnedPt, link)) {
//           pinnedPt.collideWithLink(link);
//         }
//       }
//     }
//   }
// };
//
// const isCollidedWithLink = (pinnedPt, link) => {
//   let lowX;
//   let highX;
//
//   console.log("pinnedPt:", pinnedPt);
//   console.log("pinnedPt.position:", pinnedPt.position);
//
//
//   const pinnedPos = pinnedPt.position;
//   const radius = pinnedPos.radius;
//   const p1Pos = link.point1.position;
//   const p2Pos = link.point2.position;
//   console.log("p1Pos:", p1Pos, "p2Pos:", p2Pos);
//
// // getting the x bounds of the right triangle to
// // compare with the circle
//   if (p1Pos.x < p2Pos.x) {
//     lowX = p1Pos.x;
//     highX = p2Pos.x;
//   } else {
//     lowX = p2Pos.x;
//     highX = p1Pos.x;
//   }
//
// // getting the values for bottom part of triangle and hypotenuse
//   const c = Math.sqrt((p1Pos.x - p2Pos.x) * (p1Pos.x - p2Pos.x) + (p1Pos.y - p2Pos.y) * (p1Pos.y - p2Pos.y));
//   const a = (highX - lowX);
//
//
//
//   if ((pinnedPos >= lowX && pinnedPos <= highX) ||
//   (pinnedPos <= lowX && ((pinnedPos + radius) >= lowX)) ||
//   (pinnedPos >= highX && (pinnedPos - radius <= highX))) {
//     if (pinnedPos.y === ((pinnedPos.x * c) / a)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

const isCollidedWith = (point, point2) => {
  // debugger;
  const pos1 = {x: point.position.x, y: point.position.y};
  const pos2 = {x: point2.position.x, y: point2.position.y};
  const deltaX = ((pos1.x - pos2.x) * (pos1.x - pos2.x));
  const deltaY = ((pos1.y - pos2.y) * (pos1.y - pos2.y));
  const d = Math.sqrt(deltaX + deltaY);

  if (d <= (point.radius + point2.radius)) {
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
      points[i].updatePos(timeElapsed);
    }

    for (let i = 0; i < points.length; i++) {
      points[i].solveLinkConstraints();
    }


    checkCollisions(points);
    // checkLinkCollisions(points);

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
