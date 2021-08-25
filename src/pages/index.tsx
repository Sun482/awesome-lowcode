import { componentType } from "@/constants/componentType";
import type { DragableItemProps } from "@/core/DragableItem/interface/type";
import type { Node } from "@/core/DSL/interface/node";
import { ViewRender } from "@/core/Render/ViewRender/ViewRender";
import { useState } from "react";

export default function IndexPage() {
  const handleOnDrop = (source: Node, target: Node) => {
    alert(`${source.name}拖动到了${target.name}上!`);
  };
  const [children, setChildren] = useState<Node[]>([
    {
      name: "Button",
      type: componentType.Base,
      children: [],
      val: null,
      text: "123"
    }
  ]);
  const root: Node = {
    name: "flex",
    type: componentType.Layout,
    children,
    setChildren,
    val: "val",
    total: 5,
    dragID: "sd",
    index: 1,
    style: { padding: "10px" }
  };

  return (
    <ViewRender
      root={root}
      handleOnDrop={handleOnDrop}
      style={{ width: "80vw" }}
    />
  );
}
