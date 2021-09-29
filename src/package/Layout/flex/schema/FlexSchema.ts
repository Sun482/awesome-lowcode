import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";
import type { ComponentSchema } from "@/package/common";
import { PropEditor as propEditor } from "./PropEditor";

const handleInjectNode = (propValue: any, node: Node) => {
  // 这里的propValue是object
  Object.assign(node, { style: propValue });
};
const justifyContentArr = ["space-around", "space-between", "center"];
export const FlexSchema: ComponentSchema = {
  type: componentType.Layout,
  name: "Flex",
  alia: "Flex布局",
  editableProp: {
    style: {
      value: { padding: "10px" },
      propName: "style",
      propType: "other",
      propEditor,
      handleInjectNode
    },
    total: { value: 3, propName: "total", propType: "number" }
  }
};
