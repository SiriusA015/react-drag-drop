import { COLUMN_WIDTH, GUTTER_SIZE } from "../constants";
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

export const validatePosition = (
  id: number,
  rect: RectType,
  modules: ModuleInterface[]
) => {
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
    newY = 0;
  }

  let newRect: RectType = {
    x: newX,
    y: newY,
    w: moduleW2LocalWidth(rect.w),
    h: rect.h,
  };
  console.log("test: ================================", modules);
  for (let i = 0; i < modules.length; i++) {
    if (i !== id - 1) {
      console.log(`hover test ids: (${id} --- > ${modules[i].id})`);
      let newCoord: any = preventHover(newRect, modules[i]);
      if (newCoord !== null) {
        newX = newCoord.x;
        newY = newCoord.y;
        console.log("hover catch! ===  ", modules[i]);
      }
    }
  }
  return { newX, newY };
};

export const preventHover = (module: RectType, target: ModuleInterface) => {
  let moduleRect = new Rectangle(module.x, module.y, module.w, module.h);
  let targetRect = new Rectangle(
    moduleX2LocalX(target.coord.x),
    target.coord.y,
    moduleW2LocalWidth(target.coord.w),
    target.coord.h
  );
  console.log("source Rectangle: ", moduleRect);
  console.log("target Rectangle: ", targetRect);
  let hover: any = moduleRect.isHover(targetRect);
  console.log("hover status: === ", hover);
  if (!hover) {
    return null;
  }
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
      newCoord.x = targetRect.x - moduleRect.w - GUTTER_SIZE;
      newCoord.y = targetRect.y - moduleRect.h - GUTTER_SIZE;
      break;
    case HOVER.RTHover:
      newCoord.x = targetRect.x - moduleRect.w - GUTTER_SIZE;
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    case HOVER.LBHover:
      newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      newCoord.y = targetRect.y - moduleRect.h - GUTTER_SIZE;
      break;
    case HOVER.LTHover:
      newCoord.x = targetRect.getRightTop().x + GUTTER_SIZE;
      newCoord.y = targetRect.getLeftBottom().y + GUTTER_SIZE;
      break;
    default:
      break;
  }
  return newCoord;
};
