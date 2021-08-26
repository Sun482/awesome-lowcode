import type { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
import type { CSSProperties } from "react";
import type { onDropInject } from "./inject";

export interface FlexProps {
  children: Node[];
  dragID: string;
  total: number;
  style?: CSSProperties | undefined;
}

export interface FlexItemProps {
  index: number;
  total: number;
  children: Node[];
}
export type FlexItemType = ComponentProps<FlexItemProps & onDropInject>;
export type FlexType = ComponentProps<FlexProps>;
