/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { IDENTIFIERS } from "@/common/container/identifiers";
import type { componentType } from "@/constants/componentType";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";

import type { ComponentSchema } from "@/package/common";
import { warn } from "@/utils/logger";
import { inject, injectable } from "inversify";
import type { MapUtilsInterface } from "../interface/map";

import type { Node, NodeUtil } from "../interface/node";

@injectable()
export class Noder implements NodeUtil {
  private componentCountMap: Map<string, number>;
  private mapUtils: MapUtilsInterface;

  constructor(@inject(IDENTIFIERS.MapUtils) mapUtils: MapUtilsInterface) {
    this.mapUtils = mapUtils;

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
      target.children = [
        ...target.children,
        injectNode(node, { fatherNode: target.id })
      ];
    }
  }
  getCountByName(name: string) {
    return this.componentCountMap.get(name) || 0;
  }
  getValidID(type: componentType, name: string) {
    return `${name}#${this.getCountByName(name) + 1}`;
  }
  fromSchema(schema: ComponentSchema) {
    const { name, type, alia, editableProp, ...config } = schema;
    const target: Node = {
      name,
      type,
      children: [],
      id: this.getValidID(type, name),
      ...config
    };

    Object.keys(editableProp).map((prop) => {
      const { handleInjectNode, value, propName } = editableProp[prop];

      if (handleInjectNode) {
        handleInjectNode(value, target);
      } else {
        Object.assign(target, { [propName]: value });
      }
    });
    return target;
  }
  getParent(node: Node) {
    if (node.fatherNode) {
      return node.fatherNode;
    }
    warn(`${node.id}不存在parent!`);
    return null;
  }
  moveNode(target: Node, source: Node, sourceParent: Node) {
    // 原父节点删除指定节点
    sourceParent.children = [
      ...sourceParent.children.filter((v) => v.id !== source.id)
    ];

    // 将source添加至目标节点children
    target.children = [...target.children, source];
  }
}
