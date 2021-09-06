import type { Node } from "@/core/DSL/interface/node";
import type { RootNode } from "@/store/tree";

export const injectNode = <T extends Record<string, any>>(
  node: Node,
  injectProp: T
) => {
  return { ...node, ...injectProp };
};
export const commonInject = (node: Node, root: RootNode, setTree: any) => {
  return { node, root, setTree };
};
