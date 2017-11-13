import Point from './point';
import SeedData from './seed_data';
import Body from './body';

const canvas = document.getElementById("canvas");
// // // // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");



const width = canvas.width;
const height = canvas.height;

let startTime;
let lastTime;
let timeElapsed = 0;
let req;
let animate;
let rock = new Image;
rock.src = "./rockedit.jpg";
let fieri = new Image;
fieri.src = "./fieri.jpg";


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
let belayer;
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
  // // // console.log("seeded");
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
  // // // console.log("seeded");
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
  // // // console.log("seeded");
  animate();
});

const bodyMass = document.getElementById("climber-mass");
bodyMass.addEventListener("change", (e) => {
  seeds.climberMass = parseInt(e.target.value);
  if (req) {
    cancelAnimationFrame(req);
  }
  loops = 0;
  startTime = undefined;
  seedPoints(seeds.numPoints, seeds.anchorValue, seeds.climberMass);
  animate();
});



const seedPoints = (numPoints, anchorValue, cMass) => {
  // // // console.log("numPoints", numPoints);
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
    // // // console.log("x, y:", x, y);



    const position = {
      x,
      y
    };
    // Object.freeze(position);
    // // // console.log("position:", position);
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
    // // // // console.log("pointObj:", pointObj);

    Object.freeze(pointObj);
    const newPoint = new Point(pointObj);
    // // // console.log("newPoint", newPoint);


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
      // console.log("currentPoint:", newPoint, "i:", i, "lastY:", lastY);
      nextX -= (xModifier * width);
      nextY -= (yModifier * height);
      x -= (xModifier * width);
      y -= (yModifier * height);
    } else {
      lastX -= (xModifier * width * 8);
      lastY -= (yModifier * height * 8);
      // console.log("currentPoint:", newPoint, "i:", i, "lastY:", lastY);
      nextX -= (xModifier * width * 8);
      nextY -= (yModifier * height * 8);
      x -= (xModifier * width * 8);
      y -= (yModifier * height * 8);
    }

    if (points.length > 1) {
      // if (points.length < 200) {
      //   points[i].addLinkTo({otherPoint: points[i - 1], drawThis: false, restingDistance});
      // } else {
        points[i].addLinkTo({otherPoint: points[i - 1], drawThis: false, restingDistance});
      // }
    }
    // debugger;

  }
  // console.log("points before body:", points);
  body = new Body(points[points.length - 1], 1, 1);
  belayer = new Body(points[0], 1, 1);
  // console.log("points:", points);
  // console.log("body:", body);
};

const checkCollisions = (points) => {
  for (let i = 0; i < (points.length - 1); i++) {
    for (let j = (i + 1); j < points.length; j++) {
      const pt1 = points[i];
      const pt2 = points[j];

      if ((pt1 !== pt2) && isCollidedWith(pt1, pt2) && (pt1.pinned || pt2.pinned)) {
        // // // // console.log("collision?", isCollidedWith(pt1, pt2));
        pt1.collideWith(pt2);
        pt2.collideWith(pt1);
      }
    }
  }
};



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
// // // console.log("initial seed");
const climberStartHeight = points[points.length - 1].position.y;



animate = (currentTime) => {
  const {numPoints, anchorValue, climberMass, strengthRating} = seeds;
  const g = points[points.length - 1].aY;
  // force of fall
  const forceIsh = 2 * climberMass * g * numPoints / 2;
  // // console.log("forceIsh", forceIsh);
  // force piece can take
  const compareForce = 2 * climberMass * g * anchorValue * (strengthRating / 8);
  // // console.log("compareForce", compareForce);

  loops++;
  // // // // console.log("loops", loops);
  // // // // console.log("animate");
  if (!startTime) {
    startTime = currentTime;
    lastTime = currentTime;
  } else {
    // // // console.log("currentTime", currentTime);
    timeElapsed = currentTime - lastTime;
    // // // console.log("timeElapsed", timeElapsed);
    lastTime = currentTime;


    ctx.clearRect(0,0,width, height);
    for (let i = 0; i < points.length; i++) {
      points[i].updatePos(timeElapsed);
      // // console.log("climberStartHeight", climberStartHeight);
      const climberHeight = points[points.length - 1].position.y;
      // // console.log("points", points);
      // // console.log("seeds", seeds);
      const pHeight = points[seeds.anchorValue].position.y;
      const fallDist = (pHeight - climberStartHeight);
      // // console.log("climberHeight", climberHeight);
      // // console.log("pHeight", pHeight);
      // // console.log("fallDist", fallDist);
      const isCaught = Boolean((climberHeight >= (pHeight + fallDist) * .95) || (climberHeight > height));
      // // console.log("isCaught", isCaught);
      if (isCaught) {
        if (forceIsh <= compareForce) {
          for (let j = 0; j < seeds.anchorValue; j++) {
            points[j].mass = 10;
            points[j].aY = 0;
        }
      } else {
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

    // checkCollisions(points);
    // checkLinkCollisions(points);

    for (let i = 0; i < points.length; i++) {
      points[i].render();
    }
    body.render();
    belayer.render();
    // console.log("body:", body);
    // debugger;
    ctx.strokeStyle = '#D03901';
    ctx.fillStyle = '	#D03901';
    ctx.beginPath();
        ctx.moveTo(820, 700);
        ctx.lineTo(1000, 700);
        ctx.lineTo(1000, 0);
        ctx.lineTo(320, 0);
        clippedBackgroundImage(ctx, fieri, rock.width, rock.height);
        // ctx.fill();
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

function clippedBackgroundImage( ctxt, img, w, h ){
  ctxt.save(); // Save the context before clipping
  ctxt.clip(); // Clip to whatever path is on the context

  var imgHeight = w / img.width * img.height;
  if (imgHeight < h){
    ctxt.fillStyle = '#000';
    ctxt.fill();
  }
  ctxt.drawImage(img,0,0,w,imgHeight);

  ctxt.restore(); // Get rid of the clipping region
}

animate();
