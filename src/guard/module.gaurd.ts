import { COLUMN_WIDTH, GUTTER_SIZE } from "../constants";
import ModuleInterface from "../types/ModuleInterface";
import { RectType } from "../types/rect.types";

export const modulePostionGuard = (data: ModuleInterface) => {
  if (data.coord.x) {
  }
  if (data.coord.y) {
  }
};

export const validatePosition = (rect: RectType, realH: number) => {
  let newX = rect.x;
  let rm = rect.x % COLUMN_WIDTH;

  if (rect.x < 0) {
    newX = GUTTER_SIZE;
  } else if (rect.x > 1024 - rect.w * COLUMN_WIDTH) {
    newX = 1024 - rect.w * COLUMN_WIDTH;
  } else if (rm === 0) {
    newX = rect.x + GUTTER_SIZE;
  } else if (rm < GUTTER_SIZE) {
    newX = Math.floor(rect.x / COLUMN_WIDTH) * COLUMN_WIDTH + GUTTER_SIZE;
  } else if (rm > GUTTER_SIZE) {
    newX = Math.floor(rect.x / COLUMN_WIDTH) * COLUMN_WIDTH + GUTTER_SIZE;
  }

  let newY = Math.floor(rect.y / GUTTER_SIZE) * GUTTER_SIZE;
  if (rect.y < GUTTER_SIZE) {
    newY = GUTTER_SIZE;
  } else if (newY + rect.h > realH - GUTTER_SIZE) {
    // newY = newY - GUTTER_SIZE;
  }
  return { newX, newY };
};
