import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";

export const root: Node = {
  name: "flex",
  type: componentType.Layout,
  val: "root",
  children: [],
  dragID: "root",
  total: 5
};
