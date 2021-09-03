/* eslint-disable no-param-reassign */
import { IDENTIFIERS } from "@/common/container/identifiers";
import type { componentType } from "@/constants/componentType";
// import { ComUtils } from "@/core/Render/ViewRender/container/ComUtils";
// import { componentUtils } from "@/core/Render/ViewRender/interface/comUtilsInterface";
import type { ComponentSchema } from "@/package/common";
import { inject, injectable } from "inversify";
import type { MapUtilsInterface } from "../interface/map";

import type { Node, NodeUtil } from "../interface/node";

@injectable()
export class Noder implements NodeUtil {
  private componentCountMap: Map<string, number>;
  private mapUtils: MapUtilsInterface;
  // private comUtils: componentUtils;

  constructor(
    @inject(IDENTIFIERS.MapUtils) mapUtils: MapUtilsInterface
    // @inject(IDENTIFIERS.ComponentUtils) comUtils: componentUtils
  ) {
    this.mapUtils = mapUtils;
    // this.comUtils = comUtils;
    this.componentCountMap = this.mapUtils.ComponentCountMap;
  }
  getNode(root: Node, nodeID: string) {
    const processArr = new Array<Node>();
    processArr.push(root);
    while (processArr.length) {
      const item = processArr.shift();
      if (item && item.id === nodeID) {
        return item;
      }
      if (item) processArr.push(...item.children);
    }
    return null;
  }
  appendChild(target: Node, node: Node | null) {
    if (node) {
      const exist = this.componentCountMap.get(node.name) || 0;
      this.componentCountMap.set(node.name, exist + 1);
      target.children = [...target.children, node];
    }
  }
  getCountByName(name: string) {
    return this.componentCountMap.get(name) || 0;
  }
  getValidID(type: componentType, name: string) {
    return `${name}#${this.getCountByName(name) + 1}`;
  }
  fromSchema(schema: ComponentSchema) {
    const { name, type, alia, ...config } = schema;
    console.log(config);
    const target: Node = {
      name,
      type,
      children: [],
      id: this.getValidID(type, name),
      ...config
    };
    return target;
  }
}
