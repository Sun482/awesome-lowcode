import type { componentType } from "@/constants/componentType";
import { ComponentSchema } from "@/package/common";

export type NodeType = "normal";

export interface BasicNode {
  name: string; // 节点对应的组件类名
  type: componentType; // 节点对应的组件类型
  children: Node[]; // 子节点
  id: string; // 节点标识(全局唯一)
  fatherNode?: string; // 父节点标识(全局唯一)
}

export type Node<T = null> = T extends null
  ? BasicNode & Record<string, any>
  : BasicNode & T;

export interface NodeUtil {
  /**
   * 获取指定nodeId的节点引用
   * @param root 根节点
   * @param nodeID 指定的nodeID
   */
  getNode: (root: Node, nodeID: string) => Node | null; // 由nodeID获取Node引用
  /**
   * 添加节点到指定节点的children里
   * @param target 目标节点
   * @param node 要添加的节点
   */
  appendChild: (target: Node, node: Node | null) => any;
  /**
   * 从schema初始化节点
   * @param schema schema 信息
   */
  fromSchema: (schema: ComponentSchema) => Node | null;
  /**
   * 获取指定节点的父节点nodeID
   * @param node 要查询的节点
   */
  getParent: (node: Node) => string | null;
}
