import GameHandler from "./core/GameHandler";

const canvas = document.querySelector("canvas");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");

const game = new GameHandler(canvas);

playBtn.addEventListener("click", () => game.start());
pauseBtn.addEventListener("click", () => game.stop());
resetBtn.addEventListener("click", () => game.reset());
