import { ButtonSchema } from "./Base/Button/schema/ButtonSchema";
import { FlexSchema } from "./Layout/Flex/schema/FlexSchema";

export const Package = {
  Base: [ButtonSchema],
  Layout: [FlexSchema]
};
export type PackageItem = keyof typeof Package;
