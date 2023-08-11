import Shape from "./Shape";

class Board {
  private board: number[][] = [];

  private score = 0;

  private actualShape = Shape.randomShape(this);
  private nextShape = Shape.randomShape(this);
  private backShape: Shape;

  constructor(private width = 12, private height = 24) {
    this.buildBoard();
  }

  /**
   * Build the board
   */
  private buildBoard() {
    for (let i = 0; i < this.width * this.height; ++i) {
      if (i % this.width === 0) this.board.push([]);
      this.board[this.board.length - 1].push(0);
    }
  }

  /**
   * Remove the last position of the actual shape from the board
   * @returns
   */
  removeLastShapeDraw() {
    if (!this.backShape) return;

    const shape = this.backShape.getShape();
    const position = this.backShape.getPosition();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (position.y + i < 0) continue;
        if (shape[i][j] !== 0) this.board[i + position.y][j + position.x] = 0;
      }
    }
  }

  /**
   * Append the actual shape to the board
   */
  displayShape() {
    const shape = this.actualShape.getShape();
    const position = this.actualShape.getPosition();

    for (let i = 0; i < shape.length; ++i) {
      for (let j = 0; j < shape[i].length; ++j) {
        if (position.y + i < 0) continue;
        if (shape[i][j] !== 0)
          this.board[i + position.y][j + position.x] = shape[i][j];
      }
    }
  }

  /**
   * Check if the game is loose
   * @returns
   */
  haveLoose() {
    const topLine = this.board[0];
    return topLine.some((col) => col !== 0) && !this.actualShape.canGoDown();
  }

  /**
   * Remove completed lines and set the score based on it
   */
  removeCompletedLines() {
    for (let i = 0; i < this.board.length; ++i) {
      const line = this.board[i];

      const lineCompleted = line.every((col) => col !== 0);

      if (!lineCompleted) continue;

      this.score += 10;
      this.board.splice(i, 1);
      this.board.unshift(Array(this.width).fill(0));
    }
  }

  /**
   * Update the board (make shape go down, ...)
   * @param goDown
   */
  update(goDown = true) {
    this.removeLastShapeDraw();

    if (!this.actualShape.canGoDown()) {
      this.displayShape();
      setTimeout(() => this.removeCompletedLines(), 0);
      this.actualShape = this.nextShape;
      this.nextShape = Shape.randomShape(this);
    }

    this.backShape = this.actualShape.copy();

    if (goDown) this.actualShape.goDown();

    this.displayShape();
  }

  getScore() {
    return this.score;
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

  getNextShape() {
    return this.nextShape;
  }

  /**
   * Reset the board
   */
  reset() {
    this.board = [];

    this.actualShape = Shape.randomShape(this);
    this.nextShape = Shape.randomShape(this);
    this.backShape = null;

    this.score = 0;

    this.buildBoard();
  }
}

export default Board;
