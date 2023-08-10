import ShapeObject from "../types/shape";
import { getRandomShape } from "./shapes";

class Shape {
  constructor(public shape: ShapeObject) {}

  static randomShape() {
    return new Shape(getRandomShape());
  }

  rotate() {}

  isIntersecting(shape: Shape) {}
}

export default Shape;
