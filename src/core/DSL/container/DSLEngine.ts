import type { componentType } from "@/constants/componentType";
import { componentPathObj } from "@/constants/componentType";
import type { targetPlatform } from "@/package/dslRender";
import { dslRender } from "@/package/dslRender";
import { injectable } from "inversify";
import type { DSLEngineInterface } from "../interface/DSLEngine";
import type { Node } from "../interface/node";

@injectable()
export class DSLEngine implements DSLEngineInterface {
  getDSLRender(
    target: targetPlatform,
    comName: string,
    comType: componentType
  ) {
    const type = Object.keys(componentPathObj)[comType];
    if (
      dslRender &&
      dslRender[type] &&
      dslRender[type][comName] &&
      dslRender[type][comName][target]
    )
      return dslRender[type][comName][target];
    return () => "未识别组件";
  }
  Node2Code(node: Node, target: targetPlatform) {
    const render = this.getDSLRender(target, node.name, node.type);
    return render({ node });
  }
}
