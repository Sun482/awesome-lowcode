import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";

export const NavigationSchema: ComponentSchema = {
  type: componentType.Pro,
  name: "Navigation",
  alia: "导航栏",
  editableProp: {
    height: { value: 100, propName: "height", propType: "number" },
    menuItem: { value: {}, propName: "menuItem", propType: "other" }
  }
};
