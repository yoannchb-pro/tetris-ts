import colors from "./constants/colors";
import Board from "./core/Board";
import KeyHandler from "./core/KeyHandler";

const GAME_OPTIONS = {
  TICK: 500,
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
  private keyHandler: KeyHandler;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.keyHandler = new KeyHandler(this, GAME_OPTIONS.KEYS);

    this.drawBoard();
  }

  drawBoard() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const blockSizeWidth = this.canvasWidth / this.board.getWidth();
    const blockSizeHeight = this.canvasHeight / this.board.getHeight();

    const boardMatrix = this.board.getBoard();

    for (let i = 0; i < boardMatrix.length; ++i) {
      for (let j = 0; j < boardMatrix[i].length; ++j) {
        const dontNeedDraw = boardMatrix[i][j] === 0;

        if (dontNeedDraw) continue;

        //We set -1 because 0 was reserved for empty
        this.ctx.fillStyle = colors[boardMatrix[i][j] - 1];
        this.ctx.fillRect(
          i * blockSizeWidth,
          j * blockSizeHeight,
          blockSizeWidth,
          blockSizeHeight
        );
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
