import Board from "../../game/core/Board";
import GameHandler from "../../game/core/GameHandler";
import Branch from "./Branch";

type Action = "rotate" | "right" | "left" | "down";

class AI {
  private fps = 10;
  private clock: NodeJS.Timeout;

  constructor(private gameHandler: GameHandler) {}

  ai(board: Board) {}

  main() {
    const originalBoard = this.gameHandler.getBoard();
    const shape = originalBoard.getActualShape();
    // const originalShape = originalBoard.getActualShape();

    console.log(1);
    //We make the shape start on left side first
    while (shape.canGoLeft()) {
      shape.goLeft();
    }
    console.log(2);

    const boardCopy = originalBoard.copy();

    let betterScore = -1;
    let betterPath: Action[] = null;

    //AI
    for (let r = 0; r < 4; ++r) {
      let path: Action[] = [];

      let shapeCopy = shape.copy();

      for (let i = 0; i < r; ++i) {
        const rotationValid = shapeCopy.rotate();
        if (rotationValid) path.push("rotate");
      }

      while (shapeCopy.canGoRiht()) {
        while (shapeCopy.canGoDown()) {
          path.push("down");
          shapeCopy.goDown();
          console.log("d");
        }

        path.push("right");
        console.log("r");
        // shapeCopy = shape.copy();
        shapeCopy.goRight();
      }

      console.log("f");

      boardCopy.setActualShape(shapeCopy);
      boardCopy.displayShape();
      const score = boardCopy.getScore();
      boardCopy.removeLastShapeDraw();
      if (score > betterScore) {
        betterScore = score;
        betterPath = path;
      }
    }

    console.log(3);

    //Apply actions to the shape
    for (const action of betterPath) {
      switch (action) {
        case "rotate":
          shape.rotate();
          break;
        case "down":
          shape.goDown();
          break;
        case "right":
          shape.goRight();
          break;
      }
    }
    console.log(4);

    /* Refreshing and game status handling */
    if (originalBoard.haveLoose()) {
      this.stop();
      this.gameHandler.loose();
    } else {
      this.gameHandler.drawGame();
      // this.clock = setTimeout(() => this.main(), 1000 / this.fps);
      window.requestAnimationFrame(() => this.main());
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
