import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";

export const NoticeSchema: ComponentSchema = {
  type: componentType.Pro,
  name: "Notice",
  alia: "通知公告",
  editableProp: {
    height: { value: 415, propName: "height", propType: "number" },
    width: { value: 350, propName: "width", propType: "number" },
    title: { value: "通知公告", propName: "title", propType: "string" },
    moreText: { value: "更多", propName: "moreText", propType: "string" }
  }
};
