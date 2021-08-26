import { componentType } from "@/constants/componentType";

export type NodeType = "normal";

export interface BasicNode {
  name: string; // 节点对应的组件类名
  type: componentType; // 节点对应的组建类型
  children: Node[]; // 子节点
  id: symbol; // 节点标识
}

export type Node<T = null> = T extends null
  ? BasicNode & Record<string, any>
  : BasicNode & T;
