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
   * Get the score from the completed lines as the same moment
   * @param completedLines
   * @returns
   */
  getScoreFromCompletedLine(completedLines: number) {
    switch (completedLines) {
      case 0:
        return 0;
      case 1:
        return 40;
      case 2:
        return 100;
      case 3:
        return 300;
      default:
        return 1200;
    }
  }

  /**
   * Remove completed lines and set the score based on it
   */
  removeCompletedLines() {
    let completedLines = 0;

    for (let i = 0; i < this.board.length; ++i) {
      const line = this.board[i];

      const lineCompleted = line.every((col) => col !== 0);

      if (!lineCompleted) continue;

      ++completedLines;
      this.board.splice(i, 1);
      this.board.unshift(Array(this.width).fill(0));
    }

    this.score += this.getScoreFromCompletedLine(completedLines);
  }

  /**
   * Update the board (make shape go down, ...)
   * @param goDown
   */
  update(goDown = true) {
    this.removeLastShapeDraw();

    if (!this.actualShape.canGoDown()) {
      this.score += this.actualShape.getShape().length + 1; //We had the numbers of rows + 1 to the score
      this.displayShape();
      this.removeCompletedLines();
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

  getBackShape() {
    return this.backShape;
  }

  setActualShape(shape: Shape) {
    this.actualShape = shape;
  }

  setNextShape(shape: Shape) {
    this.nextShape = shape;
  }

  setBackShape(shape: Shape) {
    this.backShape = shape;
  }

  setBoard(board: number[][]) {
    this.board = board;
  }

  setScore(score: number) {
    this.score = score;
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

  /**
   * Create a deep copy of the board
   * @returns
   */
  copy() {
    const copy = new Board(this.width, this.height);
    copy.setActualShape(this.actualShape.copy());
    copy.setNextShape(this.nextShape.copy());
    copy.setBackShape(this.backShape.copy());
    copy.setBoard(structuredClone(this.board));
    copy.setScore(this.score);
    return copy;
  }
}

export default Board;
