import GameHandler from "./core/GameHandler";

const canvas = document.querySelector("canvas");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

const game = new GameHandler(canvas);

playBtn.addEventListener("click", () => game.start());
stopBtn.addEventListener("click", () => game.stop());
resetBtn.addEventListener("click", () => game.reset());
