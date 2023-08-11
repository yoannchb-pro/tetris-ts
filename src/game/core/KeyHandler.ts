import GameHandler from "./GameHandler";

type Keys = {
  RIGHT: string;
  DOWN: string;
  LEFT: string;
  ROTATE: string;
};

class KeyHandler {
  constructor(private gameHandler: GameHandler, private keys: Keys) {
    this.initListener();
  }

  initListener() {
    const board = this.gameHandler.getBoard();

    document.addEventListener("keydown", (event) => {
      if (!this.gameHandler.isRunning()) return;

      const key = event.key;
      const cmd = Object.entries(this.keys).find(
        (arr) => arr[1].toLocaleLowerCase() === key.toLocaleLowerCase()
      );

      if (cmd) {
        const shape = board.getActualShape();

        switch (cmd[0]) {
          case "RIGHT":
            shape.goRight();
            break;
          case "LEFT":
            shape.goLeft();
            break;
          case "DOWN":
            shape.goDown();
            break;
          case "ROTATE":
            shape.rotate();
            break;
        }

        this.gameHandler.drawGame();
        if (board.haveLoose()) this.gameHandler.reset(false);
      }
    });
  }
}

export default KeyHandler;
