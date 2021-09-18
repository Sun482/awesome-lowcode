import type { componentType } from "@/constants/componentType";
import type { FC } from "react";
import type { Node } from "@/core/DSL/interface/node";

export type ComponentProps<T = any> = FC<T & Record<string, any>>;
export type PropType = "string" | "number" | "object" | "other";
export type InjectNodeFn = (propValue: any, node: Node) => any;
export type PropEditorType = {
  value: any;
  setValue: any;
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
  editableProp: EditablePropType; // 暴露给编辑器的可修改字段
} & T;
