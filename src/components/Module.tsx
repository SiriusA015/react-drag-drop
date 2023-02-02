import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrag, useDrop, useDragDropManager } from "react-dnd";
import { useRafLoop, useStartTyping } from "react-use";

import ModuleInterface from "../types/ModuleInterface";
import {
  localX2ModuleX,
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
} from "../helpers";
import { validatePosition } from "../guard/module.gaurd";
import { GUTTER_SIZE } from "../constants";

type ModuleProps = {
  data: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (modules: ModuleInterface[]) => void;
};

const Module = (props: ModuleProps) => {
  const {
    data: {
      id,
      coord: { x, y, w, h },
    },
    modules,
    setModules,
  } = props;

  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleY2LocalY(y),
    left: moduleX2LocalX(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Update new position of the module
    let y0 = initialPosition.current.top + movement.y;
    let x0 = initialPosition.current.left + movement.x;
    const { newX, newY } = validatePosition(
      id,
      { x: x0, y: y0, w: w, h: h },
      modules,
      { x: initialPosition.current.left, y: initialPosition.current.top }
    );
    let temp = [...modules];
    temp[id - 1].coord.x = localX2ModuleX(newX);
    temp[id - 1].coord.y = newY;
    setModules(temp);
    setPosition({
      top: newY + GUTTER_SIZE,
      left: newX,
    });
  }, false);

  // Wire the module to DnD drag system
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "module",
      item: () => {
        // Track the initial position at the beginning of the drag operation
        initialPosition.current = { top, left };

        // Start raf
        start();
        return { id };
      },
      end: stop,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [top, left]
  );

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor={isDragging ? "grey.100" : "grey.500"}
      padding="10px"
      bgcolor={isDragging ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.5)"}
      top={top}
      left={left}
      width={moduleW2LocalWidth(w)}
      height={h}
      sx={{
        transitionProperty: "top, left",
        transitionDuration: "0.1s",
        "& .resizer": {
          opacity: 0,
        },
        "&:hover .resizer": {
          opacity: 1,
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={40}
        color="#fff"
        sx={{ cursor: "move" }}
        draggable
      >
        <Box sx={{ userSelect: "none", pointerEvents: "none" }}>{id}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(Module);
