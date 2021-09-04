import { ButtonSchema } from "./Base/Button/schema/ButtonSchema";
import { FlexSchema } from "./Layout/Flex/schema/FlexSchema";
import { TimerSchema } from "./Pro/Timer/schema/TimerSchema";

export const Package = {
  Base: [ButtonSchema],
  Layout: [FlexSchema],
  Pro: [TimerSchema]
};
export type PackageItem = keyof typeof Package;
