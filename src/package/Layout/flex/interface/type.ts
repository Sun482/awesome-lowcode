import type { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
import type { CSSProperties, ReactNode } from "react";

export interface FlexProps {
  children: Node[];
  dragID: string;
  total: number;
  style?: CSSProperties | undefined;
}

export interface FlexItemProps {
  index: number;
  total: number;
  children: ReactNode;
  onDrop: (source: Node, target: Node) => any;
}
export type FlexItemType = ComponentProps<FlexItemProps>;
export type FlexType = ComponentProps<FlexProps>;
