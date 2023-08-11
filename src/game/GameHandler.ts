import colors from "./constants/colors";
import Board from "./core/Board";
import KeyHandler from "./core/KeyHandler";

const GAME_OPTIONS = {
  TICK: 400,
  KEYS: {
    RIGHT: "D",
    DOWN: "S",
    LEFT: "Q",
    ROTATE: "R",
  },
};

class GameHandler {
  private clock: NodeJS.Timer;

  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;

  private board = new Board();

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    new KeyHandler(this, GAME_OPTIONS.KEYS);

    this.drawBoard();
  }

  drawBoard() {
    const darkColor = "#212129";

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = darkColor;
    this.ctx.fillRect(0, 0, this.canvasWidth / 2, this.canvasHeight);

    const blockSizeWidth = this.canvasWidth / 2 / this.board.getWidth();
    const blockSizeHeight = this.canvasHeight / this.board.getHeight();

    const boardMatrix = this.board.getBoard();

    /* Drawing main board */
    for (let i = 0; i < boardMatrix.length; ++i) {
      for (let j = 0; j < boardMatrix[i].length; ++j) {
        const dontNeedDraw = boardMatrix[i][j] === 0;

        if (dontNeedDraw) continue;

        //We set -1 because 0 was reserved for empty
        this.ctx.fillStyle = colors[boardMatrix[i][j] - 1];
        this.ctx.fillRect(
          j * blockSizeWidth,
          i * blockSizeHeight,
          blockSizeWidth,
          blockSizeHeight
        );
        this.ctx.stroke();
      }
    }

    const textX = this.canvasWidth / 2 + 10;

    /* Score */
    this.ctx.fillStyle = darkColor;
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText("Score: " + this.board.getScore(), textX, 30);

    /* Next Shape */
    this.ctx.fillText("Next Shape:", textX, 60);
    const nextShape = this.board.getNextShape().getShape();
    for (let i = 0; i < nextShape.length; ++i) {
      for (let j = 0; j < nextShape[i].length; ++j) {
        const dontNeedDraw = nextShape[i][j] === 0;

        if (dontNeedDraw) continue;

        //We set -1 because 0 was reserved for empty
        this.ctx.fillStyle = colors[nextShape[i][j] - 1];
        this.ctx.fillRect(
          j * blockSizeWidth + textX,
          i * blockSizeHeight + 70,
          blockSizeWidth,
          blockSizeHeight
        );
        this.ctx.stroke();
      }
    }
  }

  start() {
    this.clock = setInterval(() => {
      this.board.update();
      this.drawBoard();
    }, GAME_OPTIONS.TICK);
  }

  stop() {
    clearInterval(this.clock);
  }

  getBoard() {
    return this.board;
  }
}

const canvas = document.querySelector("canvas");
const game = new GameHandler(canvas);
game.start();

export default GameHandler;
