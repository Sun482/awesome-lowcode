import type { Node } from "@/core/DSL/interface/node";

import type { CSSProperties } from "react";

export interface ViewRenderProps {
  root: RootNode;
  setTree: any; // 能够更新界面的函数
  handleOnDrop?: (source: Node, target: Node) => any; // 当ViewRender元素发生拖动时调用
  style?: CSSProperties | undefined;
  [x: string]: any;
}
