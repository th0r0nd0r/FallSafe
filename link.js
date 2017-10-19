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

export default Link;
