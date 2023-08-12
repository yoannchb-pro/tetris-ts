import game from "../game";
import AI from "./core/AI";

const ai = new AI(game);

const fpsRange: HTMLInputElement = document.querySelector("#fps");
const startBtn = document.querySelector("#start-ai");
const stopBtn = document.querySelector("#stop-ai");

fpsRange.addEventListener("change", () => ai.setFps(Number(fpsRange.value)));
startBtn.addEventListener("click", () => ai.start());
stopBtn.addEventListener("click", () => ai.stop());

export default ai;
