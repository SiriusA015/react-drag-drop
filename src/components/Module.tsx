import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrag, useDrop, useDragDropManager } from "react-dnd";
import { useRafLoop, useStartTyping } from "react-use";

import ModuleInterface from "../types/ModuleInterface";
import { moduleW2LocalWidth, moduleX2LocalX, moduleY2LocalY } from "../helpers";
import { validatePosition } from "../guard/module.gaurd";
import useGetHeight from "../hooks/useGetHeight";
import { GUTTER_SIZE } from "../constants";
import { data } from "../data/modules";

type ModuleProps = {
  data: ModuleInterface;
  realH: number;
  setRealH: (h: number) => void;
};

const Module = (props: ModuleProps) => {
  const {
    data: {
      id,
      coord: { x, y, w, h },
    },
    realH,
    setRealH,
  } = props;

  const ref = React.useRef(null);
  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleY2LocalY(y),
    left: moduleX2LocalX(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();
  const { containerHeight } = useGetHeight();
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Update new position of the module
    let y0 = initialPosition.current.top + movement.y;
    let x0 = initialPosition.current.left + movement.x;
    const { newX, newY } = validatePosition(
      { x: x0, y: y0, w: w, h: h },
      realH
    );
    console.log("comparison height: ", newY + h, realH);
    if (newY + h > realH) {
      setRealH(realH + GUTTER_SIZE);
    }

    setPosition({
      top: newY,
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

  const [{ handlerId }, drop] = useDrop({
    accept: "module",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.id;
      const hoverIndex = id;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset: any = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
    },
  });

  drag(drop(ref));
  return (
    <Box
      ref={ref}
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
