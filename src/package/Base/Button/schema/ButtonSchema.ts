import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";
import type { ButtonInject } from "@/package/Pro/Timer/interface/inject";

export const ButtonSchema: ComponentSchema = {
  type: componentType.Base,
  name: "Button",
  alia: "按钮",
  editableProp: { text: "哈哈" } as ButtonInject
};
