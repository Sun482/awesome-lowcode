import type { componentType } from "@/constants/componentType";
import type { DSLOutput, DSLRender, targetPlatform } from "@/package/dslRender";
import type { Node } from "./node";

export interface DSLEngineInterface {
  getDSLRender: (
    targetPlatform: targetPlatform,
    comName: string,
    comType: componentType
  ) => DSLRender;
  Node2Code: (node: Node, targetPlatform: targetPlatform) => DSLOutput;
}
