import type { Node } from "@/core/DSL/interface/node";

import { atom } from "recoil";

export interface RootNode {
  children: Node[];
  id: string;
}
export const DataTree = atom({
  key: "DataTree",
  default: {
    children: [],
    id: "root"
  } as RootNode
});
