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
  mass: 70,
  radius: 20
});

const point2 = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
  lastX: width/3,
  lastY: height/2,
  nextX: width/3,
  nextY: height/2,
  position: {x: width/3, y: height/2},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 20
});

const point3 = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* default */]({
  lastX: width/3,
  lastY: height/2,
  nextX: width/4,
  nextY: height/3,
  position: {x: width/4, y: height/3},
  velocity: {x: 0, y: 0},
  mass: 70,
  radius: 10
});

const points = [point, point2];
const g = 9.81;

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
      points[i].render();
    }

    point3.render();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__link__);


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
    this.Fx = options.Fx || 0;
    this.Fy = options.Fy || 0;
    this.links = options.links || [];
  }

  updatePos(timeElapsed) {
    let aX = this.Fx / this.mass;
    let aY = 9.81 + (this.Fy / this.mass);
    const seconds = timeElapsed / 100;

    let deltaX = this.position.x - this.lastX;
    let deltaY = this.position.y - this.lastY;

    // damping velocity
    deltaX *= 1;
    deltaY *= 1;

    this.nextX = this.position.x + deltaX + (0.5 * aX * seconds * seconds);
    this.nextY = this.position.y + deltaY + (0.5 * aY * seconds * seconds);

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    this.position.x = this.nextX;
    this.position.y = this.nextY;
  }

  addLinkTo(point2) {
    const newLink = new __WEBPACK_IMPORTED_MODULE_0__link___default.a({p1: this, p2: point2});
    this.links.push(newLink);
    point2.links.push(newLink);
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
/***/ (function(module, exports) {

// this method of constructing links using verlet integration was adopted from
// this tutorial by Jared Counts https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519

class Link {
  constructor(options) {
    this.point1 = options.point1;
    this.point2 = options.point2;
    this.restingDistance = options.restingDistace || 100;
    this.stiffness = options.stiffness || 1;
  }

  solve() {
    const p1 = this.point1.position;
    const p2 = this.point2.position;
    const m1 = this.point1.mass;
    const m2 = this.point2.mass;

    const difference = { x: p1.x - p2.x, y: p1.y - p2.y };
    const d = Math.sqrt(difference.x * difference.x + difference.y * difference.y);

    const scalarD = (this.restingDistance - d) / d;

    const invMass1 = 1 / m1;
    const invMass2 = 1/ m2;
    const scalarP1 = (invMass1 / (invMass1 + invMass2)) * this.stiffness;
    const scalarP2 = this.stiffness - scalarP1;

    if (!this.point1.pinned) {
      p1.x += difference.x * scalarP1 * scalarD;
      p1.y += difference.y * scalarP1 * scalarD;
    }

    if (!this.point2.pinned) {
      p2.x += difference.x * scalarP2 * scalarD;
      p2.y += difference.y * scalarP2 * scalarD;
    }
  }
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map