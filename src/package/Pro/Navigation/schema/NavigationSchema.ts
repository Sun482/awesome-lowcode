import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";
import { MenuBackgroundEditor } from "./PropEditor";

export const NavigationSchema: ComponentSchema = {
  type: componentType.Pro,
  name: "Navigation",
  alia: "导航栏",
  editableProp: {
    height: { value: 40, propName: "height", propType: "number" },
    fontSize: { value: 16, propName: "fontSize", propType: "number" },
    menuItem: {
      value: {
        menuBackground: "rgba(31,100,169,0.8)",
        subMenuBackground: "rgba(31,100,169,0.8)"
      },
      propName: "menuItem",
      propType: "other",
      propEditor: MenuBackgroundEditor
    }
  }
};
