import { data } from "../data/modules";
import ModuleInterface from "../types/ModuleInterface";

export const setPosition = (id: number, newY: number) => {
  function checkPicked(item: any) {
    return item.id === id;
  }
  if (data.find(checkPicked)) {
    let module: any = data.find(checkPicked);
    module.
  } else {
  }
};
