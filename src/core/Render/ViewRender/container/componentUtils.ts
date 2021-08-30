/* eslint-disable no-param-reassign */
import type { BasicNode } from "@/core/DSL/interface/node";
import { injectable } from "inversify";
import type { componentUtils } from "../interface/map";

@injectable()
export class ComUtils implements componentUtils {
  didShowMap: Map<string, boolean>;
  constructor() {
    this.didShowMap = new Map();
  }
  beShown: (nodeID: string) => boolean;
  initializeComponent: (node: BasicNode & Record<string, any>) => boolean;
}
