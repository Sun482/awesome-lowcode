import type { Node } from "@/core/DSL/interface/node";

export interface componentUtils {
  beShown: (nodeID: string) => boolean; // 用于useDidShow Hook的判定
  setShown: (nodeID: string, shown: boolean) => boolean;
  initializeComponent: (node: Node) => boolean; // 初始化组件信息
  didInitialize: (node: Node) => boolean; // 判定组件是否注册
}
