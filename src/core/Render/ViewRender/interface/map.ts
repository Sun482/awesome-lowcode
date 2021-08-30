import { Node } from "@/core/DSL/interface/node";

export interface componentUtils {
  beShown: (nodeID: string) => boolean; // 用于useDidShow Hook的判定
  initializeComponent: (node: Node) => boolean; // 初始化组件信息
}
