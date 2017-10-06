import Point from './point';

class Body {
  constructor(options, XModifier, YModifier) {
    this.pelvis = options.pelvis;
    this.shoulder = new Point({
      lastX: this.pelvis.lastX - (15 * XModifier),
      lastY: this.pelvis.lastY - (15 * YModifier),
      nextX: this.pelvis.lastX - (15 * XModifier),
      nextY: this.pelvis.lastY - (15 * YModifier),
      position: {x: this.pelvis.position.x - (15 * XModifier), y: this.pelvis.position.y - (15 * YModifier)},
      mass: 10,
      radius: 1
    });
    this.head = new Point({
      lastX: this.shoulder.lastX - (5 * XModifier),
      lastY: this.shoulder.lastY - (5 * YModifier),
      nextX: this.shoulder.lastX - (5 * XModifier),
      nextY: this.shoulder.lastY - (5 * YModifier),
      position: {x: this.shoulder.position.x - (5 * XModifier), y: this.shoulder.position.y - (5 * YModifier)},
      mass: 6,
      radius: 4,
      isAnchor: true
    });
    this.leftElbow = new Point({
      lastX: this.shoulder.lastX + (7 * XModifier),
      lastY: this.shoulder.lastY - (7 * YModifier),
      nextX: this.shoulder.lastX + (7 * XModifier),
      nextY: this.shoulder.lastY - (7 * YModifier),
      position: {x: this.shoulder.position.x + (7 * XModifier), y: this.shoulder.position.y - (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightElbow = new Point({
      lastX: this.shoulder.lastX + (6 * XModifier),
      lastY: this.shoulder.lastY - (8 * YModifier),
      nextX: this.shoulder.lastX + (6 * XModifier),
      nextY: this.shoulder.lastY - (8 * YModifier),
      position: {x: this.shoulder.position.x + (6 * XModifier), y: this.shoulder.position.y - (8 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftHand = new Point({
      lastX: this.leftElbow.lastX + (6 * XModifier),
      lastY: this.leftElbow.lastY - (8 * YModifier),
      nextX: this.leftElbow.lastX + (6 * XModifier),
      nextY: this.leftElbow.lastY - (8 * YModifier),
      position: {x: this.leftElbow.position.x + (6 * XModifier), y: this.leftElbow.position.y - (8 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightHand = new Point({
      lastX: this.rightElbow.lastX + (7 * XModifier),
      lastY: this.rightElbow.lastY - (7 * YModifier),
      nextX: this.rightElbow.lastX + (7 * XModifier),
      nextY: this.rightElbow.lastY - (7 * YModifier),
      position: {x: this.rightElbow.position.x + (7 * XModifier), y: this.rightElbow.position.y - (7 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.leftKnee = new Point({
      lastX: this.pelvis.lastX + (7 * XModifier),
      lastY: this.pelvis.lastY + (7 * YModifier),
      nextX: this.pelvis.lastX + (7 * XModifier),
      nextY: this.pelvis.lastY + (7 * YModifier),
      position: {x: this.pelvis.position.x + (7 * XModifier), y: this.pelvis.position.y + (7 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.rightKnee = new Point({
      lastX: this.pelvis.lastX + (5 * XModifier),
      lastY: this.pelvis.lastY + (9 * YModifier),
      nextX: this.pelvis.lastX + (5 * XModifier),
      nextY: this.pelvis.lastY + (9 * YModifier),
      position: {x: this.pelvis.position.x + (5 * XModifier), y: this.pelvis.position.y + (9 * YModifier)},
      mass: 2,
      radius: 1,
    });
    this.leftFoot = new Point({
      lastX: this.leftKnee.lastX + (5 * XModifier),
      lastY: this.leftKnee.lastY + (9 * YModifier),
      nextX: this.leftKnee.lastX + (5 * XModifier),
      nextY: this.leftKnee.lastY + (9 * YModifier),
      position: {x: this.leftKnee.position.x + (5 * XModifier), y: this.leftKnee.position.y + (9 * YModifier)},
      mass: 4,
      radius: 1,
    });
    this.rightFoot = new Point({
      lastX: this.rightKnee.lastX + (5 * XModifier),
      lastY: this.rightKnee.lastY + (9 * YModifier),
      nextX: this.rightKnee.lastX + (5 * XModifier),
      nextY: this.rightKnee.lastY + (9 * YModifier),
      position: {x: this.rightKnee.position.x + (5 * XModifier), y: this.rightKnee.position.y + (9 * YModifier)},
      mass: 4,
      radius: 1,
    });

    const restingDistance = (p1, p2) => {
      Math.sqrt((p1.position.x - p2.position.x)(p1.position.x - p2.position.x) + (p1.position.y - p2.position.y)(p1.position.y - p2.position.y));
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

}

export default Body;
