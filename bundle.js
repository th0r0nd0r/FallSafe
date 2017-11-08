/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(3);


const canvas = document.getElementById("canvas");
// // // // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Point {
  constructor(options) {
    // // // console.log("options:", options);
    this.lastX = options.lastX;
    this.lastY = options.lastY;
    this.nextX = options.nextX;
    this.nextY = options.nextY;
    this.position = options.position;
    // // // console.log("pointPosition:", this.position);
    this.velocity = options.velocity;
    this.mass = options.mass;
    this.radius = options.radius;
    this.area = (Math.PI * this.radius * this.radius) / 10000;
    this.pinned = options.pinned || false;
    this.aX = 0;
    if (options.aY) {
      this.aY = options.aY;
    } else {
      this.aY = 20.81;
    }
    this.links = options.links || [];
    if (options.isAnchor) {
      this.isAnchor = options.isAnchor;
    } else {
      this.isAnchor = false;
    }

    this.updatePos = this.updatePos.bind(this);
    this.collideWith = this.collideWith.bind(this);
    this.applyForce = this.applyForce.bind(this);
    this.solveLinkConstraints = this.solveLinkConstraints.bind(this);
    this.addLinkTo = this.addLinkTo.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.render = this.render.bind(this);
  }

  updatePos(timeElapsed) {
    // this.applyForce({x: 0, y: })
    const seconds = timeElapsed / 100;
    // // // console.log("seconds", seconds);
    // // // console.log("this.aX", this.aX);

    let deltaX = this.position.x - this.lastX;
    let deltaY = this.position.y - this.lastY;

    // damping velocity
    deltaX *= .95;
    deltaY *= .95;
    // // // console.log("this.position.x", this.position.x);
    // // // console.log("acc component", (0.5 * this.aX * seconds * seconds));
    this.nextX = this.position.x + deltaX + (0.5 * this.aX * seconds * seconds);
    this.nextY = this.position.y + deltaY + (0.5 * this.aY * seconds * seconds);
    // // // console.log("NextX:", this.nextX);



    this.lastX = this.position.x;
    this.lastY = this.position.y;

    if (!this.pinned) {
      this.position.x = this.nextX;
      this.position.y = this.nextY;
    } else {
      this.nextX = this.position.x;
      this.nextY = this.position.y;
    }
  }

  collideWith(pt2) {
    if (!this.pinned) {
      this.position.x = this.lastX;
      this.position.y = this.lastY;
    }
  }

  // collideWithLink(link) {
  //   // // // console.log("collideLink:", link);
  //   debugger;
  //   link.point1.pinned = true;
  //   // link.point1.position.x = 1;
  //   // link.point1.position.y = 1;
  //   link.point2.pinned = true;
  // }

  applyForce(force) {
    this.aX += force.x / this.mass;
    this.aY += force.y / this.mass;
  }

  solveLinkConstraints() {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].solve();
    }


  }

  addLinkTo(options) {
    let drawThis;
    if (options.drawThis) {
      drawThis = options.drawThis;
    } else {
      drawThis = true;
    }
    const otherPoint = options.otherPoint;
    const restingDistance = options.restingDistance;
    // debugger;
    const newLink = new __WEBPACK_IMPORTED_MODULE_0__link__["a" /* default */]({point1: this, point2: otherPoint, drawThis, restingDistance});
    // // // console.log("newLink:", newLink);
    this.links.push(newLink);
    otherPoint.links.push(newLink);
    // // // console.log("links:", this.links);
  }

  removeLink(link) {
    this.links.splice(this.links.indexOf(link), 1);
  }

  render() {
    // debugger;
    // ctx.translate(point.position.x, point.position.y);
    // ctx.clearRect(0,0,width, height);
    if (this.isAnchor) {
      ctx.fillStyle = 'black';
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius * 5, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
    }

    const links = this.links;

    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        links[i].render();
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Point);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__physics_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modal_js__);





document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // ctx.fillStyle = 'green';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__seed_data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__body__ = __webpack_require__(5);




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
const seeds = new __WEBPACK_IMPORTED_MODULE_1__seed_data__["a" /* default */]({
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
    const newPoint = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */](pointObj);
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
  body = new __WEBPACK_IMPORTED_MODULE_2__body__["a" /* default */](points[points.length - 1], 1, 1);
  belayer = new __WEBPACK_IMPORTED_MODULE_2__body__["a" /* default */](points[0], 1, 1);
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
      const isCaught = Boolean(climberHeight > (pHeight + fallDist));
      // // console.log("isCaught", isCaught);
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

    // checkCollisions(points);
    // checkLinkCollisions(points);

    for (let i = 0; i < points.length; i++) {
      points[i].render();
    }
    body.render();
    belayer.render();
    // console.log("body:", body);
    // debugger;
    ctx.beginPath();
        ctx.moveTo(820, 700);
        ctx.lineTo(1000, 700);
        ctx.lineTo(1000, 0);
        ctx.lineTo(320, 0);
        ctx.fill();
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// this method of constructing links using verlet integration was adopted from
// this tutorial by Jared Counts https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519

const canvas = document.getElementById("canvas");
// // // // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Link {
  constructor(options) {
    this.point1 = options.point1;
    this.point2 = options.point2;
    // // // // console.log("linkOptionsRestingDistance:", options.restingDistance);
    if (options.restingDistance) {
      this.restingDistance = options.restingDistance;
    } else {
      this.restingDistace = 100;
    }
    // // // // console.log("linkrestingDistance:", this.restingDistance);
    this.stiffness = options.stiffness || 1;
    this.tearDist = options.tearDist || 1000000;
    if (options.drawThis) {
      this.drawThis = options.drawThis;
    } else {
      this.drawThis = true;
    }
  }

  solve() {
    const p1 = this.point1.position;
    const p2 = this.point2.position;
    const m1 = this.point1.mass;
    const m2 = this.point2.mass;

    const difference = { x: p1.x - p2.x, y: p1.y - p2.y };
    const d = Math.sqrt(difference.x * difference.x + difference.y * difference.y);

    if (d > this.tearDist) {
      this.point1.removeLink(this);
    }

    const scalarD = (this.restingDistance - d) / d;


    const invMass1 = 1 / m1;
    const invMass2 = 1 / m2;
    const scalarP1 = (invMass1 / (invMass1 + invMass2)) * this.stiffness;
    const scalarP2 = this.stiffness - scalarP1;


    if (!this.point1.pinned) {
      p1.x += difference.x * scalarP1 * scalarD;
      p1.y += difference.y * scalarP1 * scalarD;
    }

    if (!this.point2.pinned) {
      p2.x -= difference.x * scalarP2 * scalarD;
      p2.y -= difference.y * scalarP2 * scalarD;
    }
  }

  render() {
    const p1 = this.point1.position;
    const p2 = this.point2.position;
    if (this.drawThis) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Link);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SeedData {
  constructor(options) {
    this.numPoints = options.numPoints;
    this.anchorValue = options.anchorValue;
    this.climberMass = options.climberMass;
    this.strengthRating = options.strengthRating;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SeedData);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(0);


class Body {
  constructor(pelvis, XModifier, YModifier) {
    this.pelvis = pelvis;
    // console.log("pelvis:", this.pelvis);
    this.shoulder = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.pelvis.lastX - (15 * XModifier),
      lastY: this.pelvis.lastY - (15 * YModifier),
      nextX: this.pelvis.lastX - (15 * XModifier),
      nextY: this.pelvis.lastY - (15 * YModifier),
      position: {x: this.pelvis.position.x - (15 * XModifier), y: this.pelvis.position.y - (15 * YModifier)},
      mass: 10,
      radius: 1
    });
    this.head = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.shoulder.lastX - (5 * XModifier),
      lastY: this.shoulder.lastY - (5 * YModifier),
      nextX: this.shoulder.lastX - (5 * XModifier),
      nextY: this.shoulder.lastY - (5 * YModifier),
      position: {x: this.shoulder.position.x - (5 * XModifier), y: this.shoulder.position.y - (5 * YModifier)},
      mass: 6,
      radius: 1.5,
      isAnchor: true
    });
    this.leftElbow = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.shoulder.lastX + (7 * XModifier),
      lastY: this.shoulder.lastY - (7 * YModifier),
      nextX: this.shoulder.lastX + (7 * XModifier),
      nextY: this.shoulder.lastY - (7 * YModifier),
      position: {x: this.shoulder.position.x + (7 * XModifier), y: this.shoulder.position.y - (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightElbow = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.shoulder.lastX + (6 * XModifier),
      lastY: this.shoulder.lastY - (8 * YModifier),
      nextX: this.shoulder.lastX + (6 * XModifier),
      nextY: this.shoulder.lastY - (8 * YModifier),
      position: {x: this.shoulder.position.x + (6 * XModifier), y: this.shoulder.position.y - (8 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftHand = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.leftElbow.lastX + (6 * XModifier),
      lastY: this.leftElbow.lastY - (8 * YModifier),
      nextX: this.leftElbow.lastX + (6 * XModifier),
      nextY: this.leftElbow.lastY - (8 * YModifier),
      position: {x: this.leftElbow.position.x + (6 * XModifier), y: this.leftElbow.position.y - (8 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightHand = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.rightElbow.lastX + (7 * XModifier),
      lastY: this.rightElbow.lastY - (7 * YModifier),
      nextX: this.rightElbow.lastX + (7 * XModifier),
      nextY: this.rightElbow.lastY - (7 * YModifier),
      position: {x: this.rightElbow.position.x + (7 * XModifier), y: this.rightElbow.position.y - (7 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.leftKnee = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.pelvis.lastX + (7 * XModifier),
      lastY: this.pelvis.lastY + (7 * YModifier),
      nextX: this.pelvis.lastX + (7 * XModifier),
      nextY: this.pelvis.lastY + (7 * YModifier),
      position: {x: this.pelvis.position.x + (7 * XModifier), y: this.pelvis.position.y + (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightKnee = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.pelvis.lastX + (5 * XModifier),
      lastY: this.pelvis.lastY + (9 * YModifier),
      nextX: this.pelvis.lastX + (5 * XModifier),
      nextY: this.pelvis.lastY + (9 * YModifier),
      position: {x: this.pelvis.position.x + (5 * XModifier), y: this.pelvis.position.y + (9 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftFoot = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.leftKnee.lastX + (5 * XModifier),
      lastY: this.leftKnee.lastY + (9 * YModifier),
      nextX: this.leftKnee.lastX + (5 * XModifier),
      nextY: this.leftKnee.lastY + (9 * YModifier),
      position: {x: this.leftKnee.position.x + (5 * XModifier), y: this.leftKnee.position.y + (9 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightFoot = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
      // aY: .0001
      lastX: this.rightKnee.lastX + (5 * XModifier),
      lastY: this.rightKnee.lastY + (9 * YModifier),
      nextX: this.rightKnee.lastX + (5 * XModifier),
      nextY: this.rightKnee.lastY + (9 * YModifier),
      position: {x: this.rightKnee.position.x + (5 * XModifier), y: this.rightKnee.position.y + (9 * YModifier)},
      mass: 4,
      radius: 1,
    });

    const restingDistance = (p1, p2) => {
      return(Math.sqrt((p1.position.x - p2.position.x) * (p1.position.x - p2.position.x) + (p1.position.y - p2.position.y) * (p1.position.y - p2.position.y)));
    };

    this.head.addLinkTo({otherPoint: this.shoulder, restingDistance: restingDistance(this.head, this.shoulder)});
    this.leftElbow.addLinkTo({otherPoint: this.shoulder, restingDistance: restingDistance(this.leftElbow, this.shoulder)});
    this.rightElbow.addLinkTo({otherPoint: this.shoulder, restingDistance: restingDistance(this.rightElbow, this.shoulder)});
    this.leftHand.addLinkTo({otherPoint: this.leftElbow, restingDistance: restingDistance(this.leftHand, this.leftElbow)});
    this.rightHand.addLinkTo({otherPoint: this.rightElbow, restingDistance: restingDistance(this.rightHand, this.rightElbow)});
    this.pelvis.addLinkTo({otherPoint: this.shoulder, restingDistance: restingDistance(this.pelvis, this.shoulder)});
    this.pelvis.addLinkTo({otherPoint: this.leftKnee, restingDistance: restingDistance(this.pelvis, this.leftKnee)});
    this.pelvis.addLinkTo({otherPoint: this.rightKnee, restingDistance: restingDistance(this.pelvis, this.rightKnee)});
    this.leftFoot.addLinkTo({otherPoint: this.leftKnee, restingDistance: restingDistance(this.leftFoot, this.leftKnee)});
    this.rightFoot.addLinkTo({otherPoint: this.rightKnee, restingDistance: restingDistance(this.rightFoot, this.rightKnee)});
  }

  updatePos(timeElapsed) {
    this.head.updatePos(timeElapsed);
    this.shoulder.updatePos(timeElapsed);
    this.pelvis.updatePos(timeElapsed);
    this.leftElbow.updatePos(timeElapsed);
    this.rightElbow.updatePos(timeElapsed);
    this.leftHand.updatePos(timeElapsed);
    this.rightHand.updatePos(timeElapsed);
    this.leftKnee.updatePos(timeElapsed);
    this.rightKnee.updatePos(timeElapsed);
    this.leftFoot.updatePos(timeElapsed);
    this.rightFoot.updatePos(timeElapsed);
  }

  render() {
    this.head.render();
    this.shoulder.render();
    this.pelvis.render();
    this.leftElbow.render();
    this.rightElbow.render();
    this.leftHand.render();
    this.rightHand.render();
    this.leftKnee.render();
    this.rightKnee.render();
    this.leftFoot.render();
    this.rightFoot.render();
  }

  solveLinkConstraints() {
    this.head.solveLinkConstraints();
    this.shoulder.solveLinkConstraints();
    this.pelvis.solveLinkConstraints();
    this.leftElbow.solveLinkConstraints();
    this.rightElbow.solveLinkConstraints();
    this.leftHand.solveLinkConstraints();
    this.rightHand.solveLinkConstraints();
    this.leftKnee.solveLinkConstraints();
    this.rightKnee.solveLinkConstraints();
    this.leftFoot.solveLinkConstraints();
    this.rightFoot.solveLinkConstraints();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Body);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const modal = document.getElementById("modal");
const btn = document.getElementById("open-modal");
const close = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = "block";
};

close.onclick = () => {
  modal.style.display = "none";
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map