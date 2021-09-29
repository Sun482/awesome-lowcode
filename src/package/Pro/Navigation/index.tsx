/* eslint-disable react/no-array-index-key */

import type { NavigationType } from "./interface/type";

import { memo, useMemo } from "react";

import { dslEngine, resourceUtil } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";
import "./index.less";

export const Render: NavigationType = memo(({ node, menuItem, fontSize }) => {
  const height = useMemo(() => {
    return node.height || 100;
  }, [node.height]);
  const commonMenuProp = {
    lineHeight: `${height}px`,
    height: `${height}px`,
    fontSize: `${fontSize}px`
  };
  return (
    <div
      className="navigation"
      style={{ height: `${height}px`, lineHeight: `${height}px` }}
    >
      <div className="navigation-menu" style={{ ...commonMenuProp }}>
        普通菜单
      </div>
      <div
        className="navigation-menu"
        style={{
          ...commonMenuProp,
          backgroundColor: menuItem.menuBackground,
          color: "white"
        }}
      >
        激活菜单
      </div>
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
