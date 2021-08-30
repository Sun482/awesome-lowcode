import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";
import type { ButtonInject } from "@/package/Base/Button/interface/inject";
import type { onDropInject } from "@/package/Layout/flex/interface/inject";
import { atom } from "recoil";

export const sonButton: Node = {
  name: "Button",
  type: componentType.Base,
  val: "sonButton",
  children: [],
  dragID: "sonButton",
  id: "Button#1"
};
const sonFlex: Node = {
  name: "flex",
  type: componentType.Layout,
  val: "sonFlex",
  children: [
    injectNode<ButtonInject>(sonButton, {
      onClick: () => {
        // alert("点击了!");
      },
      text: "勿忘我"
    })
  ],
  id: "flex#1",
  dragID: "sonFlex",
  total: 1,
  style: { margin: "10px" }
};
export const DataTree = atom({
  key: "DataTree",
  default: {
    name: "flex",
    type: componentType.Layout,
    children: [
      injectNode<onDropInject>(sonFlex, {
        onDrop: (source) => {
          console.log(source);
        }
      })
    ],
    dragID: "root",
    total: 5,
    id: "root"
  } as Node
});
