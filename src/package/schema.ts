import { ButtonSchema } from "./Base/Button/schema/ButtonSchema";
import { FlexSchema } from "./Layout/Flex/schema/FlexSchema";
import { HeaderSchema } from "./Pro/Header/schema/HeaderSchema";

export const Package = {
  Base: [ButtonSchema],
  Layout: [FlexSchema],
  Pro: [HeaderSchema]
};
export type PackageItem = keyof typeof Package;
