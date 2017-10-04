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


const point = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
  lastX: width/2,
  lastY: height/2,
  nextX: width/2,
  nextY: height/2,
  position: {x: width/2, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 700,
  radius: 20
});

const point2 = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
  lastX: width/3,
  lastY: height/2,
  nextX: width/3,
  nextY: height/2,
  position: {x: width/3, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 70000,
  radius: 20
});

const point3 = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link__ = __webpack_require__(3);


const canvas = document.getElementById("canvas");
// console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Point {
  constructor(options) {
    this.lastX = options.lastX;
    this.lastY = options.lastY;
    this.nextX = options.nextX;
    this.nextY = options.nextY;
    this.position = options.position;
    this.velocity = options.velocity;
    this.mass = options.mass;
    this.radius = options.radius;
    this.area = (Math.PI * this.radius * this.radius) / 10000;
    this.pinned = options.pinned || false;
    this.aX = options.aX || 0;
    this.aY = options.aY || 9.81;
    this.links = options.links || [];
  }

  updatePos(timeElapsed) {
    // this.applyForce({x: 0, y: })
    const seconds = timeElapsed / 100;

    let deltaX = this.position.x - this.lastX;
    let deltaY = this.position.y - this.lastY;

    // damping velocity
    deltaX *= 1;
    deltaY *= 1;

    this.nextX = this.position.x + deltaX + (0.5 * this.aX * seconds * seconds);
    this.nextY = this.position.y + deltaY + (0.5 * this.aY * seconds * seconds);



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

  applyForce(force) {
    this.aX += force.x / this.mass;
    this.aY += force.y / this.mass;
  }

  solveLinkConstraints() {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].solve();
    }


  }

  addLinkTo(point2) {
    const newLink = new __WEBPACK_IMPORTED_MODULE_0__link__["a" /* default */]({point1: this, point2: point2});
    this.links.push(newLink);
    point2.links.push(newLink);
    console.log(this.links);
  }

  removeLink(link) {
    this.links.splice(this.links.indexOf(link), 1);
  }

  render() {
    // debugger;
    // ctx.translate(point.position.x, point.position.y);
    // ctx.clearRect(0,0,width, height);
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

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
// console.log("canvas",canvas);
const ctx = canvas.getContext("2d");

class Link {
  constructor(options) {
    this.point1 = options.point1;
    this.point2 = options.point2;
    this.restingDistance = options.restingDistace || 100;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map