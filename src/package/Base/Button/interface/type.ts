import type { ComponentProps } from "@/package/common";
import { ButtonInject } from "./inject";

interface ButtonProps {}
export type ButtonType = ComponentProps<ButtonProps & ButtonInject>;
