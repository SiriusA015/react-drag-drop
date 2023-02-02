import ModuleInterface from "./ModuleInterface";

export interface ModuleHookType {
  modules: ModuleInterface[];
  setModules: (module: ModuleInterface[]) => void;
}
