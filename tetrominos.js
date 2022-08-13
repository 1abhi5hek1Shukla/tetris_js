import {
  outBound,
  outBound_y,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  fieldArray,
  occupied,
} from "./field.js";
import { setGameOver } from "./game.js";
export const BLOCK_SPEED = 2;
export const BLOCK_SIZE = 4;

// Seven Kinds of Blocks
//I
// . . X .  // [2,6,10,14]
// . . X .  //
// . . X .  //
// . . X .  //
//J
// . . X .  //[2,6,9,10]
// . . X .  //
// . X X .  //
// . . . .  //
//L
// . X . .  //
// . X . .  //
// . X X .  //
// . . . .  //
//O
// . . . .  //
// . X X .  //
// . X X .  //
// . . . .  //
//S
// . . . .  //
// . X X .  //
// X X . .  //
// . . . .  //
//T
// . . . .  //
// . X . .  //
// X X X .  //
// . . . .  //
//Z
// . . . .  //
// X X . .  //
// . X X .  //
// . . . .  //
const blocks = [
  [2, 6, 10, 14], // I
  [2, 6, 9, 10], // J
  [1, 5, 9, 10], // L
  [5, 6, 9, 10], // O
  [5, 6, 8, 9], // S
  [5, 8, 9, 10], // T
  [4, 5, 9, 10], // Z
];
var idx;
var tetromino;
var X_offset;
var Y_offset;
var falling;
export var blockCount;

export function start_move() {
  X_offset = 0;
  Y_offset = 0;
  falling = true;
  blockCount = 0;
  tetromino = generateNewBlock();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateNewBlock() {
  let block;
  let blockType = getRandomInt(7);
  // let blockType = 0;
  idx = blockType;
  block = [...blocks[blockType]];
  let x = getRandomInt(7);
  Y_offset = 0;
  X_offset = x;
  return block;
}

function displayTetromino(field) {
  if (!tetromino) return;
  for (let i = 0; i < tetromino.length; i++) {
    const cell = document.createElement("div");

    //Displaying the dropping block at the screen
    cell.style.gridRowStart =
      Math.floor(tetromino[i] / BLOCK_SIZE) + Y_offset + 1;
    cell.style.gridColumnStart = (tetromino[i] % BLOCK_SIZE) + X_offset + 1;

    cell.classList.add("tetromino");
    cell.classList.add(`tetromino-${idx}`);
    field.appendChild(cell);
  }
}
function displayGround(field) {
  if (!fieldArray) return;
  for (let i = 0; i < fieldArray.length; i++) {
    if (fieldArray[i] == -1) continue;

    const cell = document.createElement("div");

    //Displaying the dropping block at the screen
    cell.style.gridRowStart = Math.floor(i / FIELD_WIDTH) + 1;
    cell.style.gridColumnStart = (i % FIELD_WIDTH) + 1;

    cell.classList.add("tetromino");
    cell.classList.add(`tetromino-${fieldArray[i]}`);
    field.appendChild(cell);
  }
}

export function draw(field) {
  displayTetromino(field);
  displayGround(field);
}
function checkCollision() {
  if (!tetromino) return;
  for (let c of tetromino) {
    if (outBound_y(Math.floor(c / BLOCK_SIZE) + Y_offset + 1)) {
      return true;
    }
    if (occupied(c, X_offset, Y_offset + 1)) {
      return true;
    }
  }
  return false;
}

function updateFallingBlock() {
  setTranslation_Y(1);
}
function storeTetromino() {
  if (!fieldArray) return;
  for (let i = 0; i < tetromino.length; i++) {
    let y = Math.floor(tetromino[i] / BLOCK_SIZE) + Y_offset;
    let x = (tetromino[i] % BLOCK_SIZE) + X_offset;
    fieldArray[y * FIELD_WIDTH + x] = idx;
    // console.log(tetromino[i]);
  }
  // console.log("Offsets", X_offset, Y_offset);
  falling = false;
  X_offset = 0;
  Y_offset = 0;
  tetromino = [];
  blockCount += 1;
  // console.log(fieldArray);
}
export function update() {
  if (checkCollision()) {
    // fieldArray
    falling = false;

    storeTetromino();
  }
  if (falling) {
    updateFallingBlock();
  } else {
    tetromino = generateNewBlock();
    for (let c of tetromino) {
      if (occupied(c, X_offset, Y_offset)) {
        setGameOver();
        return;
      }
    }
    falling = true;
  }
}

function rotate(block) {
  console.log("Rotating");
  if (!block) {
    block = tetromino;
  }

  // first Checking boundaies for rotation if out of bound dont rotate
  for (let c of tetromino) {
    c = 3 - Math.floor(c / 4) + 4 * (c % 4);
    if (outBound((c % BLOCK_SIZE) + X_offset)) {
      return;
    }
    if (occupied(c, X_offset, Y_offset)) {
      return;
    }
  }

  // function to rotate clockwise 90 degree
  for (let i = 0; i < block.length; i++) {
    // block[i] =
    //   12 + Math.floor(block[i] / 4) - 4 * (block[i] % 4);
    block[i] = 3 - Math.floor(block[i] / 4) + 4 * (block[i] % 4);
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      setTranslation_X(-1);
      break;
    case "ArrowRight":
      setTranslation_X(1);
      break;
    case "ArrowUp":
      rotate();
      break;
  }
});

function setTranslation_X(val) {
  for (let c of tetromino) {
    if (outBound((c % BLOCK_SIZE) + X_offset + val)) {
      return;
    }
    if (occupied(c, X_offset + val, Y_offset)) {
      return;
    }
  }
  X_offset += val;
}
function setTranslation_Y(val) {
  Y_offset += val;
}
