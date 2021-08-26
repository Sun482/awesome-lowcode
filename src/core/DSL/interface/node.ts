import type { componentType } from "@/constants/componentType";
import type { ReactNode } from "react";

export type NodeType = "normal";

export interface LNODE {
  name: string;
  val: unknown;
  type: componentType;
  children: Node[] | ReactNode[];
}

export type Node = LNODE & Record<string, any>;
