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

    this.drawGame();
  }

  drawPolygon(coordinates: { x: number; y: number }[], color: string) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(coordinates[0].x, coordinates[0].y);
    for (let i = 1; i < coordinates.length; ++i) {
      this.ctx.lineTo(coordinates[i].x, coordinates[i].y);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRect(x: number, y: number, color: string, suppX = 0, suppY = 0) {
    const blockSizeWidth = this.canvasWidth / 2 / this.board.getWidth();
    const blockSizeHeight = this.canvasHeight / this.board.getHeight();

    const BORDER_SIZE = 0.5;

    const fx = x * blockSizeWidth + suppX;
    const fy = y * blockSizeHeight + suppY;

    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      fx,
      fy,
      blockSizeWidth - BORDER_SIZE,
      blockSizeHeight - BORDER_SIZE
    );

    /* Fill polygons for best effect */
    const coordinatesSupp = [
      { x: fx, y: fy },
      { x: fx + blockSizeWidth, y: fy },
      { x: fx + blockSizeWidth - 2, y: fy + blockSizeHeight / 4 },
      { x: fx + 2, y: fy + blockSizeHeight / 4 },
    ];
    const coordinatesInf = [
      { x: fx, y: fy + blockSizeHeight },
      { x: fx + blockSizeWidth, y: fy + blockSizeHeight },
      {
        x: fx + blockSizeWidth - 2,
        y: fy + blockSizeHeight - blockSizeHeight / 4,
      },
      { x: fx + 2, y: fy + blockSizeHeight - blockSizeHeight / 4 },
    ];
    const coordinatesLeft = [
      { x: fx, y: fy },
      { x: fx + blockSizeWidth / 4, y: fy + 2 },
      {
        x: fx + blockSizeWidth / 4,
        y: fy + blockSizeHeight - 2,
      },
      { x: fx, y: fy + blockSizeHeight },
    ];
    const coordinatesRight = [
      { x: fx + blockSizeWidth, y: fy },
      { x: fx + blockSizeWidth - blockSizeWidth / 4, y: fy + 2 },
      {
        x: fx + blockSizeWidth - blockSizeWidth / 4,
        y: fy + blockSizeHeight - 2,
      },
      { x: fx + blockSizeWidth, y: fy + blockSizeHeight },
    ];
    this.drawPolygon(coordinatesSupp, "#ffffff80");
    this.drawPolygon(coordinatesInf, "#00000080");
    this.drawPolygon(coordinatesLeft, "#00000050");
    this.drawPolygon(coordinatesRight, "#00000050");
  }

  drawGame() {
    const darkColor = "#212129";

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = darkColor;
    this.ctx.fillRect(0, 0, this.canvasWidth / 2, this.canvasHeight);

    const boardMatrix = this.board.getBoard();

    /* Drawing main board */
    for (let i = 0; i < boardMatrix.length; ++i) {
      for (let j = 0; j < boardMatrix[i].length; ++j) {
        const dontNeedDraw = boardMatrix[i][j] === 0;

        if (dontNeedDraw) continue;

        //We set -1 because 0 was reserved for empty
        const color = colors[boardMatrix[i][j] - 1];
        this.drawRect(j, i, color);
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
        const color = colors[nextShape[i][j] - 1];
        this.drawRect(j, i, color, textX, 70);
      }
    }
  }

  start() {
    this.clock = setInterval(() => {
      this.board.update();
      this.drawGame();
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
