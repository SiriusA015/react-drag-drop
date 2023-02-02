import { initModule } from "../data";
import ModuleInterface from "../types/ModuleInterface";

export const setPosition = (id: number, newY: number) => {
  function checkPicked(item: any) {
    return item.id === id;
  }
  if (initModule.find(checkPicked)) {
    let module: any = initModule.find(checkPicked);
  } else {
  }
};
