import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

import Grid from "./Grid";
import Module from "./Module";
import { GUTTER_SIZE } from "../constants";
import { data } from "../data/modules";
import useGetHeight from "../hooks/useGetHeight";

const Page = () => {
  const modules = data;
  const containerRef = React.useRef<HTMLDivElement>();
  const [, drop] = useDrop({ accept: "module" });
  drop(containerRef);
  let { containerHeight } = useGetHeight();
  const [realH, setRealH] = React.useState(containerHeight);

  return (
    <Box
      ref={containerRef}
      position="relative"
      width={1024}
      height={realH}
      margin="auto"
      sx={{
        overflow: "hidden",
        outline: "1px dashed #ccc",
        transition: "height 0.2s",
      }}
    >
      <Grid height={realH} />
      {modules.map((module) => (
        <Module
          key={module.id}
          data={module}
          realH={realH}
          setRealH={setRealH}
        />
      ))}
    </Box>
  );
};

export default React.memo(Page);
