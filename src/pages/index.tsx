import { componentType } from "@/constants/componentType";

import type { Node } from "@/core/DSL/interface/node";
import { ViewRender } from "@/core/Render/ViewRender/ViewRender";
import { useMemo } from "react";
import { useState } from "react";

export default function IndexPage() {
  const button: Node = {
    name: "Button",
    type: componentType.Base,
    val: "test",
    children: [],
    dragID: "12"
  };
  const [newFlex, setNewFlex] = useState<Node>({
    name: "flex",
    val: "",
    type: componentType.Layout,
    children: [button],
    total: 5,
    dragID: "newFlex",
    setChildren: () => {
      setNewFlex((prev) => {
        const { children, ...others } = prev;
        return { ...others, children: [...children, ...children] };
      });
    },
    style: { margin: "10px" }
  });
  const [children, setChildren] = useState<Node[]>([button, newFlex]);
  const root: Node = useMemo(() => {
    return {
      name: "flex",
      val: "",
      type: componentType.Layout,
      children,
      total: 5,
      dragID: "drag",
      setChildren: () => {
        setChildren((prev) => [...prev, ...prev]);
      }
    };
  }, [newFlex, children]);

  return <ViewRender root={root} style={{ width: "80vw" }} />;
}
