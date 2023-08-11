import Shape from "./Shape";

class Board {
  private board: number[][] = [];
  private actualShape = Shape.randomShape(this);
  private nextShape = Shape.randomShape(this);

  private backShape: Shape;

  constructor(private width = 12, private height = 24) {
    this.buildBoard();
  }

  private buildBoard() {
    for (let i = 0; i < this.width * this.height; ++i) {
      if (i % this.height === 0) this.board.push([]);
      this.board[this.board.length - 1].push(0);
    }
  }

  removeLastShapeDraw() {
    if (!this.backShape) return;

    const shape = this.backShape.getShape();
    const position = this.backShape.getPosition();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (position.y + i < 0) continue;
        if (shape[i][j] !== 0) this.board[i + position.x][j + position.y] = 0;
      }
    }
  }

  displayShape() {
    const shape = this.actualShape.getShape();
    const position = this.actualShape.getPosition();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (position.y + i < 0) continue;
        if (shape[i][j] !== 0)
          this.board[i + position.x][j + position.y] = shape[i][j];
      }
    }
  }

  removeCompletedLines() {
    for (let i = 0; i < this.board.length; ++i) {
      const line = this.board[i];
      const lineCompleted = line.every((col) => col !== 0);

      if (!lineCompleted) continue;

      this.board.splice(i, 1);
      this.board.unshift(Array(this.width).fill(0));
    }
  }

  update(goDown = true) {
    this.removeLastShapeDraw();

    if (this.iShapeIntersecting()) {
      this.displayShape();
      this.actualShape = this.nextShape;
      this.nextShape = Shape.randomShape(this);
    }

    this.backShape = this.actualShape.copy();

    if (goDown) this.actualShape.goDown();

    this.displayShape();

    this.removeCompletedLines();
  }

  iShapeIntersecting() {
    if (this.actualShape.haveReachedBottom()) return true;

    const shape = this.actualShape.getShape();
    const position = this.actualShape.getPosition();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (
          this.board[i + position.x][j + position.y + 1] !== 0 &&
          shape[i][j] !== 0 &&
          position.y >= 0
        )
          return true;
      }
    }

    return false;
  }

  getBoard() {
    return this.board;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getActualShape() {
    return this.actualShape;
  }

  setBackShape() {}

  reset() {
    this.board = [];
    this.buildBoard();
  }
}

export default Board;
