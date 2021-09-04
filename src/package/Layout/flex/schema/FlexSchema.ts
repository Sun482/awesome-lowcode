import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";
import type { CSSProperties } from "@umijs/renderer-react/node_modules/@types/react";

type FlexSchemaInject = {
  total: number;
  style?: CSSProperties | undefined;
};
export const FlexSchema: ComponentSchema<FlexSchemaInject> = {
  type: componentType.Layout,
  name: "Flex",
  alia: "Flex布局",
  total: 5,
  style: { padding: "10px", width: "400px" }
};
