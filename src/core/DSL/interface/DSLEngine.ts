import { DSLOutput, DSLRender } from "@/package/dslRender";
import { Node } from "./node";

export interface DSLEngineInterface {
  Node2Code: (node: Node, targetPlatform: string) => DSLOutput;
}
