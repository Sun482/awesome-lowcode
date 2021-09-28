import { ButtonSchema } from "./Base/Button/schema/ButtonSchema";
import { FlexSchema } from "./Layout/Flex/schema/FlexSchema";
import { HeaderSchema } from "./Pro/Header/schema/HeaderSchema";
import { NavigationSchema } from "./Pro/Navigation/schema/NavigationSchema";

export const Package = {
  Base: [ButtonSchema],
  Layout: [FlexSchema],
  Pro: [HeaderSchema, NavigationSchema]
};
export type PackageItem = keyof typeof Package;
