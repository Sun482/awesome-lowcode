import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";

import { atom } from "recoil";

export const DataTree = atom({
  key: "DataTree",
  default: {
    children: [],
    id: "Root",
    name: "Root",
    type: componentType.Layout
  } as Node
});
