import Board from "../../game/core/Board";

type Action = "left" | "right" | "down" | "initial";

class Branch {
  private childs: Branch[] = [];

  constructor(private board: Board, private action: Action) {
    this.appendChilds();
  }

  evaluate() {
    //we don't care about not finished board
    if (this.board.getActualShape().canGoDown()) return 0;

    return this.board.getScore();
  }

  evaluteAllBranch() {
    let score = 0;
    for (const child of this.childs) {
      score += child.evaluteAllBranch();
    }
    return score;
  }

  getBetterChild() {
    let max = -1;
    let betterChild = null;
    for (const child of this.childs) {
      const score = child.evaluate();
      if (score > max) {
        betterChild = child;
        max = score;
      }
    }
    return betterChild;
  }

  appendChilds() {
    const shape = this.board.getActualShape();
    if (shape.canGoDown()) {
      const copy = this.board.copy();
      this.board.getActualShape().goDown();
      this.childs.push(new Branch(copy, "down"));
    }
    if (shape.canGoRiht()) {
      const copy = this.board.copy();
      this.board.getActualShape().goRight();
      this.childs.push(new Branch(copy, "right"));
    }
    if (shape.canGoLeft()) {
      const copy = this.board.copy();
      this.board.getActualShape().goLeft();
      this.childs.push(new Branch(copy, "left"));
    }
  }

  getBetterPath() {
    const path: Action[] = ["down", "right"];
    return path;
  }
}

export default Branch;
