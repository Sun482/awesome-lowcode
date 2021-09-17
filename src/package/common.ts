import type { componentType } from "@/constants/componentType";
import type { FC } from "react";

export type ComponentProps<T = any> = FC<T & Record<string, any>>;
export type EditablePropType = Record<string, any>;
// 基本的组件Schema
export type ComponentSchema<T = Record<string, unknown>> = {
  type: componentType;
  name: string;
  alia: string; // 别名
  editableProp: EditablePropType; // 暴露给编辑器的可修改字段
} & T;
