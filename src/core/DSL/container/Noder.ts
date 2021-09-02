/* eslint-disable no-param-reassign */
import { IDENTIFIERS } from "@/common/container/identifiers";
import type { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";
import { inject, injectable } from "inversify";
import { MapUtilsInterface } from "../interface/map";

import type { Node, NodeUtil } from "../interface/node";

@injectable()
export class Noder implements NodeUtil {
  private componentCountMap: Map<componentType, number>;
  private mapUtil: MapUtilsInterface;

  constructor(@inject(IDENTIFIERS.MapUtils) mapUtil: MapUtilsInterface) {
    this.mapUtil = mapUtil;
    this.componentCountMap = this.mapUtil.ComponentCountMap;
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
    if (node) target.children = [...target.children, node];
  }
  getCountByType(type: componentType) {
    return this.componentCountMap.get(type) || 0;
  }
  getValidID(type: componentType, name: string) {
    return `${name}#${this.getCountByType(type) + 1}`;
  }
  fromSchema(schema: ComponentSchema) {
    const { name, type } = schema;
    const target: Node = { name, type, children: [], id: "123" };
    return target;
  }
}
