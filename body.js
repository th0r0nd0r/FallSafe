import Point from './point';

class Body {
  constructor(pelvis, XModifier, YModifier) {
    this.pelvis = pelvis;
    console.log("pelvis:", this.pelvis);
    this.shoulder = new Point({
      // aY: .0001
      lastX: this.pelvis.lastX - (15 * XModifier),
      lastY: this.pelvis.lastY - (15 * YModifier),
      nextX: this.pelvis.lastX - (15 * XModifier),
      nextY: this.pelvis.lastY - (15 * YModifier),
      position: {x: this.pelvis.position.x - (15 * XModifier), y: this.pelvis.position.y - (15 * YModifier)},
      mass: 10,
      radius: 1
    });
    this.head = new Point({
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
    this.leftElbow = new Point({
      // aY: .0001
      lastX: this.shoulder.lastX + (7 * XModifier),
      lastY: this.shoulder.lastY - (7 * YModifier),
      nextX: this.shoulder.lastX + (7 * XModifier),
      nextY: this.shoulder.lastY - (7 * YModifier),
      position: {x: this.shoulder.position.x + (7 * XModifier), y: this.shoulder.position.y - (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightElbow = new Point({
      // aY: .0001
      lastX: this.shoulder.lastX + (6 * XModifier),
      lastY: this.shoulder.lastY - (8 * YModifier),
      nextX: this.shoulder.lastX + (6 * XModifier),
      nextY: this.shoulder.lastY - (8 * YModifier),
      position: {x: this.shoulder.position.x + (6 * XModifier), y: this.shoulder.position.y - (8 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftHand = new Point({
      // aY: .0001
      lastX: this.leftElbow.lastX + (6 * XModifier),
      lastY: this.leftElbow.lastY - (8 * YModifier),
      nextX: this.leftElbow.lastX + (6 * XModifier),
      nextY: this.leftElbow.lastY - (8 * YModifier),
      position: {x: this.leftElbow.position.x + (6 * XModifier), y: this.leftElbow.position.y - (8 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightHand = new Point({
      // aY: .0001
      lastX: this.rightElbow.lastX + (7 * XModifier),
      lastY: this.rightElbow.lastY - (7 * YModifier),
      nextX: this.rightElbow.lastX + (7 * XModifier),
      nextY: this.rightElbow.lastY - (7 * YModifier),
      position: {x: this.rightElbow.position.x + (7 * XModifier), y: this.rightElbow.position.y - (7 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.leftKnee = new Point({
      // aY: .0001
      lastX: this.pelvis.lastX + (7 * XModifier),
      lastY: this.pelvis.lastY + (7 * YModifier),
      nextX: this.pelvis.lastX + (7 * XModifier),
      nextY: this.pelvis.lastY + (7 * YModifier),
      position: {x: this.pelvis.position.x + (7 * XModifier), y: this.pelvis.position.y + (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightKnee = new Point({
      // aY: .0001
      lastX: this.pelvis.lastX + (5 * XModifier),
      lastY: this.pelvis.lastY + (9 * YModifier),
      nextX: this.pelvis.lastX + (5 * XModifier),
      nextY: this.pelvis.lastY + (9 * YModifier),
      position: {x: this.pelvis.position.x + (5 * XModifier), y: this.pelvis.position.y + (9 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftFoot = new Point({
      // aY: .0001
      lastX: this.leftKnee.lastX + (5 * XModifier),
      lastY: this.leftKnee.lastY + (9 * YModifier),
      nextX: this.leftKnee.lastX + (5 * XModifier),
      nextY: this.leftKnee.lastY + (9 * YModifier),
      position: {x: this.leftKnee.position.x + (5 * XModifier), y: this.leftKnee.position.y + (9 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightFoot = new Point({
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

export default Body;
