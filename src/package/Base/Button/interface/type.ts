import type { ComponentProps } from "@/package/common";

interface ButtonProps {
  text: string;
  onClick: any;
  children: any[];
}
export type ButtonType = ComponentProps<ButtonProps>;
