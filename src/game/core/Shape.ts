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
        x: Math.floor(this.board.getWidth() / 2 - this.shape[0].length / 2),
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

    const newY =
      this.position.y +
      Math.floor(this.shape.length / 2) -
      Math.floor(rotated.length / 2);
    const newX =
      this.position.x +
      Math.floor(this.shape[0].length / 2) -
      Math.floor(rotated[0].length / 2);

    const canRotateX =
      newX + rotated[0].length <= this.board.getWidth() && newX >= 0;
    const canRotateY = newY + rotated.length <= this.board.getHeight();

    if (canRotateX && canRotateY) {
      const board = structuredClone(this.board.getBoard());

      //We simulate the removing of the original shape
      for (let i = 0; i < this.shape.length; ++i) {
        for (let j = 0; j < this.shape[i].length; ++j) {
          if (this.position.y + i >= 0)
            board[i + this.position.y][j + this.position.x] = 0;
        }
      }

      //checking we dont make conflict with other shapes
      for (let i = 0; i < rotated.length; ++i) {
        for (let j = 0; j < rotated[i].length; ++j) {
          if (newY + i >= 0 && board[i + newY][j + newX] !== 0) return;
        }
      }

      this.position.y = newY;
      this.position.x = newX;
      this.shape = rotated;
    }

    this.board.update(false);
  }

  canGoLeft() {
    const shape = this.shape;
    const position = this.position;
    const board = this.board.getBoard();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        const isIntersectingLeft =
          position.y + i >= 0 &&
          (shape[i][j - 1] === 0 || shape[i][j - 1] === undefined) &&
          board[i + position.y]?.[j + position.x - 1] !== 0 &&
          position.x !== 0;

        if (isIntersectingLeft && shape[i][j] !== 0) return false;
      }
    }

    return true;
  }

  canGoRiht() {
    const shape = this.shape;
    const position = this.position;
    const board = this.board.getBoard();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        const isIntersectingRight =
          position.y + i >= 0 &&
          (shape[i][j + 1] === 0 || shape[i][j + 1] === undefined) &&
          board[i + position.y]?.[j + position.x + 1] !== 0 &&
          position.x !== this.board.getWidth() - shape[0].length;

        if (isIntersectingRight && shape[i][j] !== 0) return false;
      }
    }

    return true;
  }

  canGoDown() {
    if (this.haveReachedBottom()) return false;

    const shape = this.shape;
    const position = this.position;
    const board = this.board.getBoard();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        const isIntersectingDown =
          position.y + i + 1 >= 0 &&
          (shape[i + 1]?.[j] === 0 || shape[i + 1]?.[j] === undefined) &&
          board[i + position.y + 1]?.[j + position.x] !== 0;

        if (isIntersectingDown && shape[i][j] !== 0) return false;
      }
    }

    return true;
  }

  goDown() {
    if (this.position.y !== this.board.getHeight() - this.shape.length)
      ++this.position.y;
    this.board.update(false);
  }

  goRight() {
    if (!this.canGoRiht()) return;

    if (this.position.x !== this.board.getWidth() - this.shape[0].length)
      ++this.position.x;
    this.board.update(false);
  }

  goLeft() {
    if (!this.canGoLeft()) return;

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
