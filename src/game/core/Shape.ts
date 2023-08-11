import shapes from "../constants/shapes";
import Board from "./Board";

class Shape {
  constructor(
    private board: Board,
    private shape: number[][],
    private position: { x: number; y: number } = null
  ) {
    if (!this.position) {
      this.position = {
        x: 0,
        y: -this.shape.length,
      };
    }
  }

  static randomShape(board: Board) {
    const rndShape = shapes[Math.floor(Math.random() * shapes.length)];
    return new Shape(board, rndShape);
  }

  rotate() {
    const matrix = this.shape;

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const rotated: number[][] = [];

    for (let col = 0; col < numCols; col++) {
      const newRow: number[] = [];
      for (let row = numRows - 1; row >= 0; row--) {
        newRow.push(matrix[row][col]);
      }
      rotated.push(newRow);
    }

    this.shape = rotated;
    this.board.update(false);
  }

  goDown() {
    if (this.position.y !== this.board.getHeight() - this.shape.length)
      ++this.position.y;
    this.board.update(false);
  }

  goRight() {
    if (this.position.x !== this.board.getWidth() - this.shape[0].length)
      ++this.position.x;
    this.board.update(false);
  }

  goLeft() {
    if (this.position.x !== 0) this.position.x--;
    this.board.update(false);
  }

  haveReachedBottom() {
    return this.position.y === this.board.getHeight() - this.shape.length;
  }

  getShape() {
    return this.shape;
  }

  getPosition() {
    return this.position;
  }

  copy() {
    return new Shape(this.board, this.shape, structuredClone(this.position));
  }
}

export default Shape;
