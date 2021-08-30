/* eslint-disable no-param-reassign */
import { injectable } from "inversify";

import type { Node, NodeUtil } from "../interface/node";

@injectable()
export class Noder implements NodeUtil {
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
}
