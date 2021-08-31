/* eslint-disable no-param-reassign */
import type { Node } from "@/core/DSL/interface/node";
import { injectable } from "inversify";
import type { componentUtils } from "../interface/map";

@injectable()
export class ComUtils implements componentUtils {
  didShowMap: Map<string, boolean>;
  constructor() {
    this.didShowMap = new Map();
  }

  beShown(nodeID: string) {
    if (this.didShowMap.has(nodeID)) {
      return this.didShowMap.get(nodeID) as boolean;
    }
    return false;
  }
  didInitialize(node: Node) {
    return this.beShown(node.id);
  }
  initializeComponent(node: Node) {
    if (this.beShown(node.id)) return false;
    this.didShowMap.set(node.id, false);
    return true;
  }
  setShown(nodeID: string, shown: boolean) {
    if (this.didShowMap.has(nodeID)) {
      this.didShowMap.set(nodeID, shown);
      return true;
    }
    return false;
  }
}
