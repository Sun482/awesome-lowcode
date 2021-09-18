import { componentType } from "@/constants/componentType";
import type { ComponentSchema, InjectNodeFn } from "@/package/common";
import { ColorEditor } from "./ColorEditor";

const handleInjectNode: InjectNodeFn = (value, node) => {
  Object.assign(node, { style: { color: value } });
};

export const ButtonSchema: ComponentSchema = {
  type: componentType.Base,
  name: "Button",
  alia: "按钮",
  editableProp: {
    text: { propName: "text", propType: "string", value: "配置的注入" },
    color: {
      propName: "颜色",
      propType: "other",
      value: "red",
      handleInjectNode,
      propEditor: ColorEditor
    }
  }
};
