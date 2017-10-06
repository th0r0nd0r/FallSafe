import Point from './point';

class Body {
  constructor(options, XModifier, YModifier) {
    this.pelvis = options.pelvis;
    this.shoulder = new Point({
      lastX: this.pelvis.lastX + (15 * XModifier),
      lastY: this.pelvis.lastY + (15 * YModifier),
      nextX: this.pelvis.lastX + (15 * XModifier),
      nextY: this.pelvis.lastY + (15 * YModifier),
      position: {x: this.pelvis.position.x + (15 * XModifier), y: this.pelvis.position.y + (15 * YModifier)},
      mass: 5,
      radius: 1
    });
    this.head = new Point({
      lastX: this.shoulder.lastX + (5 * XModifier),
      lastY: this.shoulder.lastY + (5 * YModifier),
      nextX: this.shoulder.lastX + (5 * XModifier),
      nextY: this.shoulder.lastY + (5 * YModifier),
      position: {x: this.shoulder.position.x + (5 * XModifier), y: this.shoulder.position.y + (5 * YModifier)},
      mass: 8,
      radius: 4,
      isAnchor: true
    });






    this.shoulder = {};
    this.leftElbow = {};
    this.rightElbow = {};
    this.leftHand = {};
    this.rightHand = {};
    this.leftKnee = {};
    this.rightKnee = {};
    this.leftFoot = {};
    this.rightFoot = {};
  }

}
