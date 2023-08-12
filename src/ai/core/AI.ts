import GameHandler from "../../game/core/GameHandler";

class AI {
  private fps = 10;
  private clock: NodeJS.Timeout;

  constructor(private gameHandler: GameHandler) {}

  main() {
    const boardClass = this.gameHandler.getBoard();
    const shapeClass = boardClass.getActualShape();

    shapeClass.goDown();

    this.gameHandler.drawGame();
    this.clock = setTimeout(() => this.main(), 1000 / this.fps);
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
