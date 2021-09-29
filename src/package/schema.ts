import { ButtonSchema } from "./Base/Button/schema/ButtonSchema";
import { FlexSchema } from "./Layout/Flex/schema/FlexSchema";
import { CarouselSchema } from "./Pro/Carousel/schema/CarouselSchema";
import { HeaderSchema } from "./Pro/Header/schema/HeaderSchema";
import { NavigationSchema } from "./Pro/Navigation/schema/NavigationSchema";
import { NoticeSchema } from "./Pro/Notice/schema/NoticeSchema";

export const Package = {
  Base: [ButtonSchema],
  Layout: [FlexSchema],
  Pro: [HeaderSchema, NavigationSchema, CarouselSchema, NoticeSchema]
};
export type PackageItem = keyof typeof Package;
