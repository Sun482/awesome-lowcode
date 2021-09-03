import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";

import { atom } from "recoil";

export const DataTree = atom({
  key: "DataTree",
  default: {
    name: "Flex",
    type: componentType.Layout,
    children: [],
    dragID: "root",
    total: 5,
    id: "root"
  } as Node
});
