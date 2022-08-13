import { fieldArray } from "./field.js";
import { blockCount, start_move } from "./tetrominos.js";
import {
  draw as drawBlock,
  update as updateBlock,
  BLOCK_SPEED,
} from "./tetrominos.js";

const FRAME_RATE = 10;
let lastRenderTime = 0;

function main(currentTime) {
  if (gameOver) {
    alert("Your Score is " + blockCount);
    setStartCondition();
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FRAME_RATE) return;
  draw();
  if (secondsSinceLastRender < 1 / BLOCK_SPEED) return;
  update();
  lastRenderTime = currentTime;
}

const field = document.getElementById("field");
const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
var gameOver = true;

setStartCondition();

function setStartCondition() {
  menu.style.display = "flex";
  field.style.display = "none";
}
startButton.addEventListener("click", () => {
  fieldArray.fill(-1);
  menu.style.display = "none";
  field.style.display = "grid";
  gameOver = false;
  start_move();
  window.requestAnimationFrame(main);
});

function update() {
  updateBlock();
}

function draw() {
  // document.getElementById("menu").style.display = "none";
  field.innerHTML = "";
  drawBlock(field);
}
export function setGameOver() {
  gameOver = true;
}
