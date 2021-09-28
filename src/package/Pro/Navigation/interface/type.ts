import { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
// import type { CSSProperties } from "react";

export interface NabigationProps {
  height: string; // header标题
  node: Node; // render对应的node节点
  [key: string]: any;
}

export type NavigationType = ComponentProps<NabigationProps>;
