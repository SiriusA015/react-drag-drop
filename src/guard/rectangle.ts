import { PointType } from "../types/rect.types";
export enum HOVER {
  LTHover = "LTHover",
  LBHover = "LBHover",
  RTHover = "RTHover",
  RBHover = "RBHover",
  TopHover = "TopHover",
  BottomHover = "BottomHover",
  LeftHover = "LeftHover",
  RightHover = "RightHover",
  AllHover = "AllHover",
  LineHover = "LineHover",
}
class Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  getLeftTop() {
    return { x: this.x, y: this.y };
  }
  getLeftBottom() {
    return { x: this.x, y: this.y + this.h };
  }
  getRightTop() {
    return { x: this.x + this.w, y: this.y };
  }
  getRightBottom() {
    return { x: this.x + this.w, y: this.y + this.h };
  }
  isHover(target: Rectangle) {
    let bLT = this.isInRect(this.getLeftTop(), target);
    let bLB = this.isInRect(this.getLeftBottom(), target);
    let bRT = this.isInRect(this.getRightTop(), target);
    let bRB = this.isInRect(this.getRightBottom(), target);
    let bLine =
      ((this.x >= target.x && this.x <= target.x + target.w) ||
        (this.x + this.w >= target.x &&
          this.x + this.w <= target.x + target.w)) &&
      target.y >= this.y &&
      target.y <= this.y + this.h &&
      target.y + target.h >= this.y &&
      target.y + target.h <= this.y + this.h;
    if (bLT && bLB && bRT && bRB) {
      return HOVER.AllHover;
    } else if (bLT && bLB) {
      return HOVER.LeftHover;
    } else if (bLT && bRT) {
      return HOVER.TopHover;
    } else if (bRT && bRB) {
      return HOVER.RightHover;
    } else if (bRB && bLB) {
      return HOVER.BottomHover;
    } else if (bLT) {
      return HOVER.LTHover;
    } else if (bRT) {
      return HOVER.RTHover;
    } else if (bLB) {
      return HOVER.LBHover;
    } else if (bRB) {
      return HOVER.RBHover;
    } else if (bLine) {
      return HOVER.LineHover;
    } else {
      return null;
    }
  }

  isInRect(pt: PointType, rect: Rectangle) {
    return (
      rect.x <= pt.x &&
      pt.x <= rect.x + rect.w &&
      rect.y <= pt.y &&
      pt.y <= rect.y + rect.h
    );
  }
  intersectRect(target: Rectangle) {
    return !(
      target.x > this.x + this.w ||
      target.x + target.w < this.x ||
      target.y > this.y + this.h ||
      target.y + target.h < this.y
    );
  }
}

export default Rectangle;
