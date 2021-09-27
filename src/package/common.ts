import type { componentType } from "@/constants/componentType";
import type { FC } from "react";
import type { Node } from "@/core/DSL/interface/node";

export type ComponentProps<T = any> = FC<T & Record<string, any>>;
export type PropType = "string" | "number" | "select" | "object" | "other";
export type InjectNodeFn = (propValue: any, node: Node) => any;
export type Updater = (prev: any) => any | Record<string, unknown>;
export type PropEditorType = {
  value: any;
  // setValue
  // 注入属性到node节点里
  // 注意Updater的prev是可编辑prop的当前value
  // 而Updater的返回值是操作在node上而不是操作在可编辑prop上
  // 因此需要根据具体情况设计返回值
  setValue: (updater: Updater) => any;
  node?: Node;
};
export type EditablePropItem = {
  value: any;
  propName: string;
  propType: PropType;
  propEditor?: FC<PropEditorType>;
  handleInjectNode?: InjectNodeFn;
};
export type EditablePropType = Record<string, EditablePropItem>;
// 基本的组件Schema
export type ComponentSchema<T = Record<string, unknown>> = {
  type: componentType;
  name: string;
  alia: string; // 别名
  editableProp?: EditablePropType; // 暴露给编辑器的可修改字段
} & T;
