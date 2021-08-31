import { componentType } from "@/constants/componentType";
import type { FC } from "react";

export type ComponentProps<T> = FC<T & Record<string, any>>;

// 基本的组件Schema
export interface ComponentSchema {
  type: componentType;
  name: string;
  alia: string; // 别名
}
