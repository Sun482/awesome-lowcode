import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/ViewRender";
import { atom } from "recoil";

const sonButton: Node = {
  name: "Button",
  type: componentType.Base,
  val: "sonButton",
  children: [],
  dragID: "sonButton",
  id: Symbol("Button#1")
};
const sonFlex: Node = {
  name: "flex",
  type: componentType.Layout,
  val: "sonFlex",
  children: [
    injectNode(sonButton, {
      onClick: () => {
        alert("点击了!");
      }
    })
  ],
  id: Symbol("flex#1"),
  dragID: "sonFlex",
  total: 10,
  style: { margin: "10px" }
};
export const DataTree = atom({
  key: "DataTree",
  default: {
    name: "flex",
    type: componentType.Layout,
    children: [injectNode(sonFlex, {})],
    dragID: "root",
    total: 10,
    id: Symbol("root")
  } as Node
});
