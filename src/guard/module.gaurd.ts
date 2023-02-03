import { prefetch } from "webpack";
import { COLUMN_WIDTH, CONTAINER_WIDTH, GUTTER_SIZE } from "../constants";
import { moduleW2LocalWidth, moduleX2LocalX } from "../helpers";
import ModuleInterface from "../types/ModuleInterface";
import { PointType, RectType } from "../types/rect.types";
import Rectangle, { HOVER } from "./rectangle";

export const makePixelY = (y: number) => {
  if (y < GUTTER_SIZE) {
    return GUTTER_SIZE;
  }
  return Math.floor(y / GUTTER_SIZE) * GUTTER_SIZE;
};

const makeValidateRect = (rect: RectType) => {
  let newX = rect.x;
  let rm = rect.x % COLUMN_WIDTH;

  if (rect.x < 0) {
    newX = GUTTER_SIZE;
  } else if (rect.x > CONTAINER_WIDTH - rect.w * COLUMN_WIDTH) {
    newX = CONTAINER_WIDTH - rect.w * COLUMN_WIDTH;
  } else if (rm === 0) {
    newX = rect.x + GUTTER_SIZE;
  } else {
    newX = Math.floor(rect.x / COLUMN_WIDTH) * COLUMN_WIDTH + GUTTER_SIZE;
  }
  let newY = Math.floor(rect.y / GUTTER_SIZE) * GUTTER_SIZE;
  if (rect.y < GUTTER_SIZE) {
    newY = 0;
  }

  let newRect: RectType = {
    x: newX,
    y: newY,
    w: moduleW2LocalWidth(rect.w),
    h: rect.h,
  };
  return newRect;
};

export const validatePosition = (
  id: number,
  rect: RectType,
  modules: ModuleInterface[],
  preValue: PointType
) => {
  let newRect: RectType = makeValidateRect(rect);

  for (let i = 0; i < modules.length; i++) {
    if (i !== id - 1) {
      console.log(`hover test ids: (${id} --- > ${modules[i].id})`);
      let newCoord: any = preventHover(newRect, modules[i]);
      if (newCoord !== null) {
        newRect.x = newCoord.x;
        newRect.y = newCoord.y;
        if (
          newCoord.y < GUTTER_SIZE ||
          newCoord.x < GUTTER_SIZE ||
          newCoord.x + newRect.w >= CONTAINER_WIDTH ||
          isIntersect(
            id,
            i,
            new Rectangle(newCoord.x, newCoord.y, newRect.w, newRect.h),
            modules
          )
        ) {
          newRect.x = preValue.x;
          newRect.y =
            Math.floor(preValue.y / GUTTER_SIZE) * GUTTER_SIZE - GUTTER_SIZE;
        }
      }
    }
  }
  return { newX: newRect.x, newY: newRect.y };
};

export const preventHover = (module: RectType, target: ModuleInterface) => {
  let moduleRect = new Rectangle(module.x, module.y, module.w, module.h);
  let targetRect = new Rectangle(
    moduleX2LocalX(target.coord.x),
    target.coord.y,
    moduleW2LocalWidth(target.coord.w),
    target.coord.h
  );

  let hover: any = moduleRect.isHover(targetRect);
  if (!hover) {
    return null;
  }
  console.log("hover status: === ", hover);
  let newCoord: PointType = { x: module.x, y: module.y };
  switch (hover) {
    case HOVER.AllHover:
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    case HOVER.RightHover:
      newCoord.x = targetRect.x - moduleRect.w - GUTTER_SIZE;
      break;
    case HOVER.LeftHover:
      newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      break;
    case HOVER.BottomHover:
      newCoord.y = targetRect.y - moduleRect.h - GUTTER_SIZE;
      break;
    case HOVER.TopHover:
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    case HOVER.RBHover:
      // newCoord.x = targetRect.x - moduleRect.w - GUTTER_SIZE;
      newCoord.y = targetRect.y - moduleRect.h - GUTTER_SIZE;
      break;
    case HOVER.RTHover:
      // newCoord.x = targetRect.x - moduleRect.w - GUTTER_SIZE;
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    case HOVER.LBHover:
      // newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      newCoord.y = targetRect.y - moduleRect.h - GUTTER_SIZE;
      break;
    case HOVER.LTHover:
      // newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    case HOVER.LineHover:
      // newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    default:
      break;
  }
  return newCoord;
};

export const isIntersect = (
  id: number,
  targetID: number,
  rect: Rectangle,
  modules: ModuleInterface[]
) => {
  for (let i = 0; i < modules.length; i++) {
    if (
      i !== id - 1 &&
      i !== targetID &&
      rect.intersectRect(
        new Rectangle(
          moduleX2LocalX(modules[i].coord.x),
          modules[i].coord.y,
          moduleW2LocalWidth(modules[i].coord.w),
          modules[i].coord.h
        )
      )
    ) {
      return true;
    }
  }
  return false;
};
