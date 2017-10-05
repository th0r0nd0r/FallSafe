import Link from './link';

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
    const newLink = new Link({point1: this, point2: otherPoint, restingDistance});
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
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = '#000000';
    // ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
    // ctx.fill();
    // ctx.closePath();

    const links = this.links;

    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        links[i].render();
      }
    }
  }
}

export default Point;
