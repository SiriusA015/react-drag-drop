import React from "react";
import { GUTTER_SIZE } from "../constants";
import { initModule } from "../data";
import ModuleInterface from "../types/ModuleInterface";

const useGetHeight = (modules: ModuleInterface[]) => {
  const containerHeight = React.useMemo(
    () =>
      Math.max(...modules.map(({ coord: { y, h } }) => y + h)) +
      GUTTER_SIZE * 2,
    [modules]
  );
  return { containerHeight };
};
export default useGetHeight;
