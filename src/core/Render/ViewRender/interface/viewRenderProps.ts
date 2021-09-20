import type { Node } from "@/core/DSL/interface/node";
import type { EditingInfo } from "@/store/node";
import type { CSSProperties } from "react";
import type { SetterOrUpdater } from "recoil";

export interface ViewRenderProps {
  root: Node;
  setTree: any; // 能够更新界面的函数
  setEditingInfo: SetterOrUpdater<EditingInfo>; // 更新正在编辑的信息
  editingInfo: EditingInfo;
  handleOnDrop?: (source: Node, target: Node) => any; // 当ViewRender元素发生拖动时调用
  style?: CSSProperties | undefined;
  [x: string]: any;
}
