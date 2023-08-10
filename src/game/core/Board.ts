import Shape from "./Shape";

class Board {
  private board: number[][] = [];
  private shapePosition: { x: number; y: number } = { x: 0, y: 0 };
  private actualShape = Shape.randomShape();
  private nextShape = Shape.randomShape();

  constructor(private width = 10, private height = 24) {
    this.buildBoard();
  }

  private buildBoard() {
    for (let i = 0; i < this.width * this.height; ++i) {
      if (i % this.height === 0) this.board.push([]);
      this.board[this.board.length - 1].push(0);
    }
  }

  getBoard() {
    return this.board;
  }

  reset() {
    this.board = [];
    this.buildBoard();
  }
}
