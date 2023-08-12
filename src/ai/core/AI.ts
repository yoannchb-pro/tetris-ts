import GameHandler from "../../game/core/GameHandler";

class AI {
  private fps = 10;
  private clock: NodeJS.Timeout;

  constructor(private gameHandler: GameHandler) {}

  main() {
    const boardClass = this.gameHandler.getBoard();
    const actualShapeClass = boardClass.getActualShape();
    const nextShapeClass = boardClass.getNextShape();

    const board = boardClass.getBoard();
    const actualShape = actualShapeClass.getShape();
    const nextShape = nextShapeClass.getShape();
    const position = actualShapeClass.getPosition();

    const boardCopy = boardClass.copy();

    for (let i = 0; i < board.length; ++i) {
      const isLineEmpty = board[i].every((col) => col === 0);
      if (isLineEmpty) continue;

      for (let j = 0; j < board[i].length; ++j) {
        //for each rotation
        for (let r = 0; r < 3; ++r) {
          //TODO
        }
      }
    }

    /* Refreshing and game status handling */
    if (boardClass.haveLoose()) {
      this.stop();
      this.gameHandler.loose();
    } else {
      this.gameHandler.drawGame();
      this.clock = setTimeout(() => this.main(), 1000 / this.fps);
    }
  }

  start() {
    //we stop the gameHandler to ensure we can't use key and the game dont refresh each GAME TICK
    this.gameHandler.stop();
    this.main();
  }

  stop() {
    if (this.clock) clearTimeout(this.clock);
  }

  setFps(fps: number) {
    this.fps = fps;
  }
}

export default AI;
