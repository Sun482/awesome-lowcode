import type { Node } from "@/core/DSL/interface/node";

export const injectNode = <T extends Record<string, any>>(
  node: Node,
  injectProp: T
) => {
  return { ...node, ...injectProp };
};
