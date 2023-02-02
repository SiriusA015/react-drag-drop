import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrag, useDrop, useDragDropManager } from "react-dnd";
import { useRafLoop, useStartTyping } from "react-use";

import ModuleInterface from "../types/ModuleInterface";
import { moduleW2LocalWidth, moduleX2LocalX, moduleY2LocalY } from "../helpers";
import { validatePosition } from "../guard/module.gaurd";
import useGetHeight from "../hooks/useGetHeight";
import { GUTTER_SIZE } from "../constants";
import { initModule } from "../data";
import { ModuleHookType } from "../types/module-hook.type";

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
  // const { containerHeight } = useGetHeight();
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Update new position of the module
    let y0 = initialPosition.current.top + movement.y;
    let x0 = initialPosition.current.left + movement.x;
    const { newX, newY } = validatePosition({ x: x0, y: y0, w: w, h: h });
    let temp = [...modules];
    temp[id].coord.x = newX;
    temp[id].coord.y = newY;
    setModules(temp);

    setPosition({
      top: newY + GUTTER_SIZE,
      left: newX,
    });
  }, false);

  // Wire the module to DnD drag system
  const [, drag] = useDrag(
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
      collect: (monitor) => ({}),
    }),
    [top, left]
  );

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor="grey.500"
      padding="10px"
      bgcolor="rgba(0, 0, 0, 0.5)"
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
