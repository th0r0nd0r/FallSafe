import Point from './point';
import SeedData from './seed_data';
import Body from './body';

const canvas = document.getElementById("canvas");
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
let body;
const seeds = new SeedData({
  numPoints: 50,
  anchorValue: 25,
  climberMass: 300,
  strengthRating: 12
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
  animate();
});

const strengthRating = document.getElementById("strength-rating");
strengthRating.addEventListener("change", (e) => {
  seeds.strengthRating = parseInt(e.target.value);
  if (req) {
    cancelAnimationFrame(req);
  }
  loops = 0;
  startTime = undefined;
  seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
  animate();
});




const seedPoints = (numPoints, anchorValue, cMass) => {
  ctx.clearRect(0,0,width, height);
  points = [];

  const xModifier = 0.00125;
  const yModifier = 0.0025;

  let lastX = (.7 * width);
  let lastY = (0.8 * height);
  var x = lastX;
  var y = lastY;
  let nextX = lastX;
  let nextY = lastY;
  let velocity = {x: 0, y: 0};
  let mass = 20;
  let radius = 1;

  const restingDistance = Math.sqrt((yModifier * height) * (yModifier * height) + (xModifier * width) * (xModifier * width));
  for (let i = 0; i < numPoints; i++) {

    const position = {
      x,
      y
    };
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

    Object.freeze(pointObj);
    const newPoint = new Point(pointObj);


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

    if (i === 0) {
      newPoint.pinned = true;
      newPoint.isAnchor = true;
    }

    if (i < anchorValue) {
      newPoint.mass = 1;
      newPoint.aY = 2;
    }

    if (i === (numPoints - 1)) {
      newPoint.mass = cMass;
    }

    if (i === anchorValue) {
      newPoint.pinned = true;
      newPoint.isAnchor = true;
    } else {
      // newPoint.pinned = false;
      // newPoint.isAnchor = false;
    }

    points.push(newPoint);

    if (i > numPoints / 2) {
      lastX -= (xModifier * width);
      lastY -= (yModifier * height);
      console.log("currentPoint:", newPoint, "i:", i, "lastY:", lastY);
      nextX -= (xModifier * width);
      nextY -= (yModifier * height);
      x -= (xModifier * width);
      y -= (yModifier * height);
    } else {
      lastX -= (xModifier * width * 8);
      lastY -= (yModifier * height * 8);
      console.log("currentPoint:", newPoint, "i:", i, "lastY:", lastY);
      nextX -= (xModifier * width * 8);
      nextY -= (yModifier * height * 8);
      x -= (xModifier * width * 8);
      y -= (yModifier * height * 8);
    }

    if (points.length > 1) {
      points[i].addLinkTo({otherPoint: points[i - 1], restingDistance});
    }

  }
  console.log("points before body:", points);
  body = new Body(points[points.length - 1], 1, 1);
  console.log("points:", points);
  console.log("body:", body);
};

const checkCollisions = (points) => {
  for (let i = 0; i < (points.length - 1); i++) {
    for (let j = (i + 1); j < points.length; j++) {
      const pt1 = points[i];
      const pt2 = points[j];

      if ((pt1 !== pt2) && isCollidedWith(pt1, pt2) && (pt1.pinned || pt2.pinned)) {
        pt1.collideWith(pt2);
        pt2.collideWith(pt1);
      }
    }
  }
};



const isCollidedWith = (point, point2) => {
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
const climberStartHeight = points[points.length - 1].position.y;



animate = (currentTime) => {
  const {numPoints, anchorValue, climberMass, strengthRating} = seeds;
  const g = points[points.length - 1].aY;
  // force of fall
  const forceIsh = 2 * climberMass * g * numPoints / 2;
  // force piece can take
  const compareForce = 2 * climberMass * g * anchorValue * (strengthRating / 8);

  loops++;
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
  } else {
    timeElapsed = currentTime - lastTime;
    lastTime = currentTime;


    ctx.clearRect(0,0,width, height);
    for (let i = 0; i < points.length; i++) {
      points[i].updatePos(timeElapsed);
      const climberHeight = points[points.length - 1].position.y;
      const pHeight = points[seeds.anchorValue].position.y;
      const fallDist = (pHeight - climberStartHeight);
      const isCaught = Boolean(climberHeight > (pHeight + fallDist));

      if (isCaught) {
        if (forceIsh <= compareForce) {
          for (let j = 0; j < seeds.anchorValue; j++) {
            points[j].mass = 10;
            points[j].aY = 0;
        }
      } else if (climberHeight > points[points.length - 2].position.y){
        points[seeds.anchorValue].pinned = false;
      }
      }
    }
    body.updatePos(timeElapsed);

    for (let i = 0; i < points.length; i++) {
      points[i].solveLinkConstraints();
    }
    body.solveLinkConstraints();
    for (let i = 0; i < points.length; i++) {
      points[i].solveLinkConstraints();
    }
    body.solveLinkConstraints();
    for (let i = 0; i < points.length; i++) {
      points[i].solveLinkConstraints();
    }
    body.solveLinkConstraints();

    for (let i = 0; i < points.length; i++) {
      points[i].render();
    }
    body.render();
  }

  //
  // ctx.save();
  //
  // ctx.restore();



  if (loops <= 200) {
    req = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(req);
    startTime = undefined;
    loops = 0;
    if (forceIsh <= compareForce) {
      alert("safe!");
    } else {
      alert("not safe!");
    }
  }

};

animate();
