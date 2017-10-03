import Link from './link';

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
    const newLink = new Link({p1: this, p2: point2});
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

export default Point;
