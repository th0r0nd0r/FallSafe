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
    this.Fx = options.Fx || 0;
    this.Fy = options.Fy || 0;
  }

  updatePos(timeElapsed) {
    let aX = this.Fx / this.mass;
    let aY = 9.81 + (this.Fy / this.mass);

    let deltaX = this.position.x - this.lastX;
    let deltaY = this.position.y - this.lastY;

    this.nextX = this.position.x + deltaX + aX * (timeElapsed / 100);
    this.nextY = this.position.y + deltaY + aY * (timeElapsed / 100);

    this.lastX = this.position.x;
    this.lastY = this.position.y;

    this.position.x = this.nextX;
    this.position.y = this.nextY;
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
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Point);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map