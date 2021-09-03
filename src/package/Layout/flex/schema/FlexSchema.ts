import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";

export const FlexSchema: ComponentSchema = {
  type: componentType.Layout,
  name: "Flex",
  alia: "Flex布局",
  total: 5,
  style: { padding: "10px" }
};
