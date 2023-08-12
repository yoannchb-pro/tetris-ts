import GameHandler from "../../game/core/GameHandler";

class AI {
  private fps = 10;
  private clock: NodeJS.Timeout;

  constructor(private gameHandler: GameHandler) {}

  main() {}

  start() {
    if (!this.clock) {
      this.clock = setTimeout(() => this.main(), 1000 / this.fps);
    }
  }

  stop() {
    if (this.clock) clearTimeout(this.clock);
  }

  setFps(fps: number) {
    this.fps = fps;
  }
}

export default AI;
