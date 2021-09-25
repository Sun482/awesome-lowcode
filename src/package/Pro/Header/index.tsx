/* eslint-disable react/no-array-index-key */

import type { HeaderType } from "./interface/type";

import { memo } from "react";

import { dslEngine } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";

export const Render: HeaderType = memo(({ title }) => {
  return <div>{title}</div>;
});

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
