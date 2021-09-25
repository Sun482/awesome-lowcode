import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";
import { BgModePropEditor, BgImgPropEditor } from "./PropEditor";

export const HeaderSchema: ComponentSchema = {
  type: componentType.Pro,
  name: "Header",
  alia: "网站Header",
  editableProp: {
    title: { value: "标题", propName: "title", propType: "string" },
    subTitle: { value: "副标题", propName: "subTitle", propType: "string" },
    backgroundMode: {
      value: { mode: "color", value: "red" },
      propName: "backgroundMode",
      propType: "other",
      propEditor: BgModePropEditor
    },
    backgroundImg: {
      value: { base64: "" },
      propName: "backgroundImg",
      propType: "other",
      propEditor: BgImgPropEditor
    },
    icon: {
      value: { base64: "" },
      propName: "icon",
      propType: "other"
    }
  }
};
