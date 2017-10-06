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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__physics_js__ = __webpack_require__(1);





document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  // ctx.fillStyle = 'green';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__seed_data__ = __webpack_require__(4);



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

const strengthRating = document.getElementById("strength-rating");
strengthRating.addEventListener("change", (e) => {
  seeds.strengthRating = parseInt(e.target.value);
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
    const newPoint = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */](pointObj);
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
    const forceIsh = 2 * climberMass * g * numPoints / 2;
    console.log("forceIsh", forceIsh);
    // force piece can take
    const compareForce = 2 * climberMass * g * anchorValue * (strengthRating / 8);
    console.log("compareForce", compareForce);
    if (forceIsh <= compareForce) {
      alert("safe!");
    } else {
      alert("not safe!");
    }
  }

};

animate();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(3);


const canvas = document.getElementById("canvas");
// // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Point {
  constructor(options) {
    // console.log("options:", options);
    this.lastX = options.lastX;
    this.lastY = options.lastY;
    this.nextX = options.nextX;
    this.nextY = options.nextY;
    this.position = options.position;
    // console.log("pointPosition:", this.position);
    this.velocity = options.velocity;
    this.mass = options.mass;
    this.radius = options.radius;
    this.area = (Math.PI * this.radius * this.radius) / 10000;
    this.pinned = options.pinned || false;
    this.aX = 0;
    this.aY = 20.81;
    this.links = options.links || [];
    this.isAnchor = false;

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
    // console.log("seconds", seconds);
    // console.log("this.aX", this.aX);

    let deltaX = this.position.x - this.lastX;
    let deltaY = this.position.y - this.lastY;

    // damping velocity
    deltaX *= .95;
    deltaY *= .95;
    // console.log("this.position.x", this.position.x);
    // console.log("acc component", (0.5 * this.aX * seconds * seconds));
    this.nextX = this.position.x + deltaX + (0.5 * this.aX * seconds * seconds);
    this.nextY = this.position.y + deltaY + (0.5 * this.aY * seconds * seconds);
    // console.log("NextX:", this.nextX);



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
  //   // console.log("collideLink:", link);
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
    const otherPoint = options.otherPoint;
    const restingDistance = options.restingDistance;
    // debugger;
    const newLink = new __WEBPACK_IMPORTED_MODULE_0__link__["a" /* default */]({point1: this, point2: otherPoint, restingDistance});
    // console.log("newLink:", newLink);
    this.links.push(newLink);
    otherPoint.links.push(newLink);
    // console.log("links:", this.links);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// this method of constructing links using verlet integration was adopted from
// this tutorial by Jared Counts https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519

const canvas = document.getElementById("canvas");
// // console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Link {
  constructor(options) {
    this.point1 = options.point1;
    this.point2 = options.point2;
    // // console.log("linkOptionsRestingDistance:", options.restingDistance);
    if (options.restingDistance) {
      this.restingDistance = options.restingDistance;
    } else {
      this.restingDistace = 100;
    }
    // // console.log("linkrestingDistance:", this.restingDistance);
    this.stiffness = options.stiffness || 1;
    this.tearDist = options.tearDist || 1000000;
    this.drawThis = options.drawThis || true;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map