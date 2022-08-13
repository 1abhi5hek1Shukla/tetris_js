import { blockCount, BLOCK_SIZE } from "./tetrominos.js";
export const FIELD_WIDTH = 10;
export const FIELD_HEIGHT = 20;

export const fieldArray = Array(FIELD_HEIGHT * FIELD_WIDTH).fill(-1);

export function outBound(x) {
  // console.log(x);
  if (x == -1 || x == FIELD_WIDTH) {
    return true;
  }
  return false;
}

export function outBound_y(y) {
  if (y == FIELD_HEIGHT) {
    return true;
  }
  return false;
}

export function occupied(coord, X, Y) {
  let y = Math.floor(coord / BLOCK_SIZE) + Y;
  let x = (coord % BLOCK_SIZE) + X;
  return fieldArray[y * FIELD_WIDTH + x] !== -1;
}
