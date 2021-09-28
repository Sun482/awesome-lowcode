/* eslint-disable react/no-array-index-key */

import type { NavigationType } from "./interface/type";

import { memo, useMemo } from "react";

import { dslEngine, resourceUtil } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";
import "./index.less";

export const Render: NavigationType = memo(({ node }) => {
  const headerHeight = useMemo(() => {
    return node.height || 100;
  }, [node.height]);

  return (
    <div className="navigation" style={{ height: `${headerHeight}px` }}>
      navigation
    </div>
  );
});

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
