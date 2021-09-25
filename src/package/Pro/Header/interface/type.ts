import type { ComponentProps } from "@/package/common";
// import type { CSSProperties } from "react";

export interface HeaderProps {
  title: string; // header标题
  subTitle: string; // header副标题
  backgroundMode: "img" | "color";
  backgroundImg: string;
  icon: string; // base64
  [key: string]: any;
}

export type HeaderType = ComponentProps<HeaderProps>;
