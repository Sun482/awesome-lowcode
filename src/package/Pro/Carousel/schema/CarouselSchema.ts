import { componentType } from "@/constants/componentType";
import type { ComponentSchema } from "@/package/common";

export const CarouselSchema: ComponentSchema = {
  type: componentType.Pro,
  name: "Carousel",
  alia: "轮播",
  editableProp: {
    height: { value: 430, propName: "height", propType: "number" },
    width: { value: 1200, propName: "width", propType: "number" }
  }
};
