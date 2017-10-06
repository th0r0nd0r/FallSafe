import Point from './point';
import SeedData from './seed_data';

const canvas = document.getElementById("canvas");
// // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");


const width = canvas.width;
const height = canvas.height;

let startTime;
let lastTime;
let timeElapsed = 0;
let req;
let animate;


const requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame ||
                              window.mozCancelAnimationFrame ||
                              window.webkitCancelAnimationFrame ||
                              window.msCancelAnimationFrame;

// slider functions

const showRopeLength = (newLength) => {
  document.getElementById("rope-length-value").innerHTML=`${newLength} m`;
};

const showProHeight = (newHeight) => {
  document.getElementById("pro-height-value").innerHTML=`${newHeight} m`;
};

const showClimberMass = (newMass) => {
  document.getElementById("climber-mass-value").innerHTML=`${newMass} kg`;
};

const showStrengthRating = (newRating) => {
  document.getElementById("strength-rating-value").innerHTML=`${newRating} kN`;
};


window.showRopeLength = showRopeLength;
window.showProHeight = showProHeight;
window.showClimberMass = showClimberMass;
window.showStrengthRating = showStrengthRating;





let points = [];
const seeds = new SeedData({
  numPoints: 50,
  anchorValue: 25,
  climberMass: 300
});

const ropeLength = document.getElementById("rope-length");
ropeLength.addEventListener("change", (e) => {
  seeds.numPoints = parseInt(e.target.value);
  if (req) {
    cancelAnimationFrame(req);
  }
  loops = 0;
  startTime = undefined;
  seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
  // console.log("seeded");
  animate();
});

const proHeight = document.getElementById("pro-height");
proHeight.addEventListener("change", (e) => {
  seeds.anchorValue = parseInt(e.target.value);
  if (req) {
    cancelAnimationFrame(req);
  }
  loops = 0;
  startTime = undefined;
  seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
  // console.log("seeded");
  animate();
});

const climberMass = document.getElementById("climber-mass");
climberMass.addEventListener("change", (e) => {
  seeds.climberMass = parseInt(e.target.value) * 10;
  if (req) {
    cancelAnimationFrame(req);
  }
  loops = 0;
  startTime = undefined;
  seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
  // console.log("seeded");
  animate();
});





const seedPoints = (numPoints, anchorValue, cMass) => {
  // console.log("numPoints", numPoints);
  ctx.clearRect(0,0,width, height);
  points = [];

  const xModifier = 0.00125;
  const yModifier = 0.0025;

  let lastX = (.75 * width);
  let lastY = (0.4 * height);
  var x = lastX;
  var y = lastY;
  let nextX = lastX;
  let nextY = lastY;
  let velocity = {x: 0, y: 0};
  let mass = 20;
  let radius = 1;

  const restingDistance = Math.sqrt((yModifier * height) * (yModifier * height) + (xModifier * width) * (xModifier * width));
  let anchorPoint;
  for (let i = 0; i < numPoints; i++) {
    // console.log("x, y:", x, y);



    const position = {
      x,
      y
    };
    // Object.freeze(position);
    // console.log("position:", position);
    const pointObj = {
      lastX,
      lastY,
      nextX,
      nextY,
      x,
      y,
      position,
      velocity,
      mass,
      radius
    };
    // // console.log("pointObj:", pointObj);

    Object.freeze(pointObj);
    const newPoint = new Point(pointObj);
    // console.log("newPoint", newPoint);


  // puts pro at half of rope length
    // if (numPoints % 2 === 0) {
    //   if (i === (numPoints / 2)) {
    //     newPoint.pinned = true;
    //     newPoint.isAnchor = true;
    //   }
    // } else {
    //   if (i === (numPoints / 2 + 0.5)) {
    //     newPoint.pinned = true;
    //     newPoint.isAnchor = true;
    //   }
    // }
    //
    if (i === (numPoints - 1)) {
      newPoint.mass = cMass;
    }

    if (i === anchorValue) {
      newPoint.pinned = true;
      newPoint.isAnchor = true;
    }

    points.push(newPoint);

    lastX -= (xModifier * width);
    lastY -= (yModifier * height);
    nextX -= (xModifier * width);
    nextY -= (yModifier * height);
    x -= (xModifier * width);
    y -= (yModifier * height);

    if (points.length > 1) {
      points[i].addLinkTo({otherPoint: points[i - 1], restingDistance});
    }
  }
  // console.log("points:", points);
  // console.log("anchorPoint", anchorPoint);
  // anchorPoint = new Point({
  //     lastX: points[anchorValue].lastX,
  //     lastY: (points[anchorValue].lastY + 100),
  //     nextX: points[anchorValue].nextX,
  //     nextY: (points[anchorValue].lastY + 100),
  //     position: points[anchorValue].position,
  //     velocity: points[anchorValue].velocity,
  //     mass: points[anchorValue].mass,
  //     radius: points[anchorValue].radius
  // });
  // anchorPoint.pinned = true;
  // anchorPoint.isAnchor = true;
  // anchorPoint.position.y = (anchorPoint.lastY);
  // anchorPoint.nextY = (anchorPoint.lastY);
  // points.push(anchorPoint);
};


// point.addLinkTo({otherPoint: point3, restingDistance: 50});
// point.addLinkTo({otherPoint: point2, restingDistance: 50});
// point4.addLinkTo({otherPoint: point5, restingDistance: (Math.abs(point4.position.x - point5.position.x))});

const checkCollisions = (points) => {
  for (let i = 0; i < (points.length - 1); i++) {
    for (let j = (i + 1); j < points.length; j++) {
      const pt1 = points[i];
      const pt2 = points[j];

      if ((pt1 !== pt2) && isCollidedWith(pt1, pt2) && (pt1.pinned || pt2.pinned)) {
        // // console.log("collision?", isCollidedWith(pt1, pt2));
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
//   // console.log("pinnedPt:", pinnedPt);
//   // console.log("pinnedPt.position:", pinnedPt.position);
//
//
//   const pinnedPos = pinnedPt.position;
//   const radius = pinnedPos.radius;
//   const p1Pos = link.point1.position;
//   const p2Pos = link.point2.position;
//   // console.log("p1Pos:", p1Pos, "p2Pos:", p2Pos);
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

let loops = 0;

seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
// console.log("initial seed");



animate = (currentTime) => {
  loops++;
  // // console.log("loops", loops);
  // // console.log("animate");
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
  } else {
    // console.log("currentTime", currentTime);
    timeElapsed = currentTime - lastTime;
    // console.log("timeElapsed", timeElapsed);
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



  if (loops <= 200) {
    req = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(req);
    const {numPoints, anchorValue, climberMass, strengthRating} = seeds;
    startTime = undefined;
    const g = points[points.length - 1].aY;
    loops = 0;
    // force of fall
    const forceIsh = 2 * climberMass * g * numPoints * (strengthRating / 8);
    // force piece can take
    const compareForce = 2 * climberMass * g * anchorValue * (strengthRating / 8);
    if (forceIsh <= compareForce) {
      alert("safe!");
    } else {
      alert("not safe!");
    }
  }

};

animate();
