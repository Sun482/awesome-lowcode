import { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
// import type { CSSProperties } from "react";

export interface CarouselProps {
  height: string; // header标题
  width: string;
  node: Node; // render对应的node节点
  [key: string]: any;
}

export type CarouselType = ComponentProps<CarouselProps>;
