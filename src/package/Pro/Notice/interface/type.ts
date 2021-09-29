import { Node } from "@/core/DSL/interface/node";
import type { ComponentProps } from "@/package/common";
// import type { CSSProperties } from "react";

export interface NoticeProps {
  height: string; // header标题
  width: string;
  title: string;
  moreText: string;
  node: Node; // render对应的node节点
  [key: string]: any;
}

export type NoticeType = ComponentProps<NoticeProps>;
