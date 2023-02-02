import React from "react";
import { GUTTER_SIZE } from "../constants";
import { data } from "../data/modules";

const useGetHeight = () => {
  const containerHeight = React.useMemo(
    () =>
      Math.max(...data.map(({ coord: { y, h } }) => y + h)) + GUTTER_SIZE * 2,
    [data]
  );
  return { containerHeight };
};
export default useGetHeight;
