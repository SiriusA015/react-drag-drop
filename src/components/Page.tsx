import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import useState from "react-usestateref";
import Grid from "./Grid";
import Module from "./Module";
import { GUTTER_SIZE } from "../constants";
import { initModule } from "../data";
import ModuleInterface from "../types/ModuleInterface";
import { makePixelY } from "../guard/module.gaurd";

const Page = () => {
  const [modules, setModules] = useState<ModuleInterface[]>(initModule);
  const containerRef = React.useRef<HTMLDivElement>();
  const [, drop] = useDrop({ accept: "module" });
  drop(containerRef);

  const containerHeight = React.useMemo(
    () =>
      Math.max(...modules.map(({ coord: { y, h } }) => makePixelY(y) + h)) +
      GUTTER_SIZE * 2,
    [modules]
  );

  return (
    <Box
      ref={containerRef}
      position="relative"
      width={1024}
      height={containerHeight}
      margin="auto"
      sx={{
        overflow: "hidden",
        outline: "1px dashed #ccc",
        transition: "height 0.2s",
      }}
    >
      <Grid height={containerHeight} />
      {modules.map((module) => (
        <Module
          key={module.id}
          data={module}
          modules={modules}
          setModules={setModules}
        />
      ))}
    </Box>
  );
};

export default React.memo(Page);
