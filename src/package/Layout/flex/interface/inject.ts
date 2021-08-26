import type { Node } from "@/core/DSL/interface/node";

export type onDropInject = { onDrop: (source: Node, target: Node) => any };
