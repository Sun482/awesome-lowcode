import type { ComponentProps } from "@/package/common";
import type { ButtonInject } from "./inject";

interface ButtonProps {}
export type ButtonType = ComponentProps<ButtonProps & ButtonInject>;
