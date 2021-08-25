import type { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
import type { CSSProperties, ReactNode } from "react";

interface FlexProps {
  children: Node[];
  dragID: string;
  total: number;
  style?: CSSProperties | undefined;
}

interface FlexItemProps {
  index: number;
  total: number;
  children: ReactNode;
}
export type FlexItemType = ComponentProps<FlexItemProps>;
export type FlexType = ComponentProps<FlexProps>;
